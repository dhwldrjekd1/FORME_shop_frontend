<template>
  <Forme32Layout>
    <!-- 로딩 -->
    <div v-if="isLoading" class="dp-state">
      <span class="material-symbols-outlined dp-state__icon">hourglass_top</span>
      <p>Loading...</p>
    </div>

    <!-- 상품 없음 -->
    <div v-else-if="!product" class="dp-state">
      <span class="material-symbols-outlined dp-state__icon">search_off</span>
      <p>상품을 찾을 수 없습니다.</p>
      <RouterLink to="/products" class="dp-state__link">← 목록으로</RouterLink>
    </div>

    <!-- ═══ 상품 상세 ═══ -->
    <template v-else>
      <article class="dp" :style="{ '--b': brandColor }">

        <!-- ── 브레드크럼 ── -->
        <nav class="dp-crumb">
          <RouterLink to="/">HOME</RouterLink>
          <span>/</span>
          <RouterLink to="/products">PRODUCTS</RouterLink>
          <span>/</span>
          <RouterLink :to="`/${brandKey}`">{{ brandLabel }}</RouterLink>
          <span>/</span>
          <span class="dp-crumb__current">{{ product.name }}</span>
        </nav>

        <!-- ── 상단: 갤러리 + 정보 ── -->
        <div class="dp-top">

          <!-- 좌: 갤러리 -->
          <div class="dp-gallery">
            <!-- 메인 이미지 -->
            <div class="dp-gallery__main">
              <div
                class="dp-gallery__zoom"
                ref="zoomBox"
                @mousemove="onZoomMove"
                @mouseenter="zoomOn = true"
                @mouseleave="zoomOn = false"
              >
                <img :src="currentImage" :alt="product.name" @load="onImgLoad" />
                <div v-show="zoomOn" class="dp-gallery__lens" :style="lensPos" />
              </div>
              <div
                v-show="zoomOn"
                class="dp-gallery__magnified"
                :style="{ backgroundImage: `url(${currentImage})`, backgroundPosition: magBg, backgroundSize: magSize }"
              />
            </div>
            <!-- 썸네일 -->
            <div class="dp-gallery__thumbs">
              <button
                v-for="(img, i) in thumbs"
                :key="i"
                class="dp-gallery__thumb"
                :class="{ 'dp-gallery__thumb--on': thumbIdx === i }"
                @click="thumbIdx = i"
              >
                <img :src="img" :alt="`thumb ${i+1}`" />
              </button>
            </div>
          </div>

          <!-- 우: 상품 정보 -->
          <div class="dp-info">
            <div class="dp-info__tags">
              <span class="dp-info__brand" :style="{ backgroundColor: brandColor }">{{ brandLabel }}</span>
              <span v-if="product.gender" class="dp-info__gender" :class="'dp-info__gender--' + product.gender">{{ product.gender }}</span>
            </div>
            <p class="dp-info__style">No. {{ String(product.id).padStart(6, '0') }}</p>
            <p class="dp-info__cat">{{ product.category }}</p>
            <h1 class="dp-info__name">{{ product.name }}</h1>
            <div v-if="product.discountRate" class="dp-info__prices">
              <span class="dp-info__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="dp-info__was">₩{{ product.price?.toLocaleString() }}</span>
              <span class="dp-info__dc">-{{ product.discountRate }}%</span>
            </div>
            <p v-else class="dp-info__price">₩{{ product.price?.toLocaleString() }}</p>
            <div class="dp-info__divider"></div>

            <!-- 색상 -->
            <div class="dp-opt">
              <p class="dp-opt__label">Color</p>
              <div class="dp-opt__color" :style="{ backgroundColor: product.colorHex, outlineColor: brandColor }"></div>
            </div>

            <!-- 사이즈 -->
            <div class="dp-opt">
              <div class="dp-opt__label-row">
                <p class="dp-opt__label">Size</p>
                <span v-if="recommendedSize" class="dp-opt__rec-hint" :style="{ color: brandColor }">
                  FORME은 {{ recommendedSize }} 사이즈를 추천합니다.
                  <span class="dp-opt__rec-tooltip">체형 데이터 기반 AI 분석 · 국가별 사이즈 자동 변환 · 핏 선호도 반영</span>
                </span>
              </div>
              <div class="dp-opt__sizes">
                <button
                  v-for="ss in availableSizes"
                  :key="ss.size"
                  class="dp-size"
                  :class="{
                    'dp-size--on': selSize === ss.size,
                    'dp-size--out': ss.stock <= 0,
                    'dp-size--rec': ss.size === recommendedSize && selSize !== ss.size,
                  }"
                  :disabled="ss.stock <= 0"
                  @click="selSize = ss.size"
                >
                  {{ ss.size }}
                  <span v-if="ss.stock <= 0" class="dp-size__out">품절</span>
                  <span v-if="ss.size === recommendedSize" class="dp-size__rec-tip">추천 사이즈</span>
                </button>
              </div>
            </div>

            <!-- 수량 -->
            <div class="dp-opt">
              <p class="dp-opt__label">Quantity</p>
              <div class="dp-qty">
                <button @click="qty > 1 && qty--" :disabled="qty <= 1">−</button>
                <span>{{ qty }}</span>
                <button @click="qty++">+</button>
              </div>
            </div>

            <!-- 액션 버튼 -->
            <div class="dp-actions">
              <button class="dp-actions__cart" @click="addToCart">
                장바구니 담기 — ₩{{ (salePrice * qty).toLocaleString() }}
              </button>
              <button class="dp-actions__buy" @click="buyNow">바로 구매</button>
              <button class="dp-actions__wish" @click="toggleWish">
                <span
                  class="material-symbols-outlined"
                  :style="isWished ? 'font-variation-settings: &quot;FILL&quot; 1' : ''"
                >favorite</span>
              </button>
            </div>

            <!-- 요약 정보 -->
            <ul class="dp-perks">
              <li><span class="material-symbols-outlined">local_shipping</span>전 상품 무료 배송</li>
              <li><span class="material-symbols-outlined">sync</span>30일 이내 교환·반품</li>
              <li><span class="material-symbols-outlined">verified</span>정품 보증</li>
            </ul>
          </div>
        </div>

        <!-- ── 상세 탭 ── -->
        <div class="dp-tabs">
          <div class="dp-tabs__bar">
            <button
              v-for="t in tabs"
              :key="t.key"
              class="dp-tabs__btn"
              :class="{ 'dp-tabs__btn--on': activeTab === t.key }"
              @click="activeTab = t.key"
            >{{ t.label }}</button>
          </div>

          <!-- 상품 설명 -->
          <div v-show="activeTab === 'desc'" class="dp-tabs__panel">
            <p class="dp-desc">{{ product.description }}</p>
            <div class="dp-detail-grid" v-if="product.features?.length">
              <div class="dp-detail-grid__col">
                <h4>Features</h4>
                <ul>
                  <li v-for="f in product.features" :key="f">{{ f }}</li>
                </ul>
              </div>
              <div class="dp-detail-grid__col" v-if="product.composition?.length">
                <h4>Composition</h4>
                <p v-for="c in product.composition" :key="c">{{ c }}</p>
              </div>
            </div>
          </div>

          <!-- 사이즈 자세히 보기 -->
          <div v-show="activeTab === 'size'" class="dp-tabs__panel">
            <div class="dp-sz">
              <!-- 선택된 사이즈 정보 -->
              <div v-if="selectedSizeInfo" class="dp-sz__selected">
                <div class="dp-sz__selected-row">
                  <div class="dp-sz__selected-item">
                    <span class="dp-sz__selected-val">{{ selectedSizeInfo.KR || selSize }}</span>
                    <span class="dp-sz__selected-label">한국 사이즈</span>
                  </div>
                  <div class="dp-sz__selected-item" v-if="selectedSizeInfo.brandVal">
                    <span class="dp-sz__selected-val dp-sz__selected-val--sub">{{ selectedSizeInfo.brandVal }}</span>
                    <span class="dp-sz__selected-label">{{ selectedSizeInfo.brandLabel }}</span>
                  </div>
                </div>
                <div v-if="authStore.user?.height" class="dp-sz__user-info">
                  <span>{{ authStore.user.height }}cm</span>
                  <span>{{ authStore.user.weight }}kg</span>
                  <span>{{ {slim:'슬림',standard:'스탠다드',wide:'와이드'}[authStore.user.fit] || '스탠다드' }}</span>
                </div>
              </div>
              <p v-else class="dp-sz__no-size">사이즈를 선택하면 상세 정보를 확인할 수 있습니다.</p>

              <!-- 사이즈 추천 입력 폼 (비회원 포함) -->
              <div class="dp-sz__recommend">
                <h4 class="dp-sz__recommend-title" :style="{ color: brandColor }">
                  <span class="material-symbols-outlined">straighten</span>
                  AI 사이즈 추천
                </h4>
                <div class="dp-sz__recommend-form">
                  <input v-model.number="szForm.height" type="number" placeholder="키 (cm)" class="dp-sz__input" />
                  <input v-model.number="szForm.weight" type="number" placeholder="몸무게 (kg)" class="dp-sz__input" />
                  <select v-model="szForm.fit" class="dp-sz__select">
                    <option value="slim">슬림</option>
                    <option value="standard">스탠다드</option>
                    <option value="wide">와이드</option>
                  </select>
                  <button class="dp-sz__recommend-btn" :style="{ backgroundColor: brandColor }" @click="recommendSize" :disabled="szLoading">
                    {{ szLoading ? '추천 중...' : '추천 받기' }}
                  </button>
                </div>
                <div v-if="szResult" class="dp-sz__recommend-result" :style="{ borderColor: brandColor }">
                  <p class="dp-sz__recommend-size" :style="{ color: brandColor }">{{ szResult.recommendedSize }}</p>
                  <p class="dp-sz__recommend-msg">{{ szResult.message }}</p>
                </div>
              </div>

              <!-- 전체 사이즈 차트 -->
              <table v-if="sizeChartData.length" class="dp-sz__chart">
                <thead>
                  <tr>
                    <th>사이즈</th>
                    <th :class="{ 'dp-sz__chart-hl-col': brandCountryCode === 'US' }">US 🇺🇸</th>
                    <th :class="{ 'dp-sz__chart-hl-col': brandCountryCode === 'UK' }">UK 🇬🇧</th>
                    <th :class="{ 'dp-sz__chart-hl-col': brandCountryCode === 'EU' }">EU 🇪🇺</th>
                    <th class="dp-sz__chart-kr">KR 🇰🇷</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in sizeChartData" :key="row.size"
                    :class="{ 'dp-sz__chart-highlight': isSelectedRow(row) }"
                  >
                    <td>{{ row.size }}</td>
                    <td>{{ row.US }}</td>
                    <td>{{ row.UK }}</td>
                    <td>{{ row.EU }}</td>
                    <td class="dp-sz__chart-kr-cell">{{ row.KR }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 리뷰 -->
          <div v-show="activeTab === 'review'" class="dp-tabs__panel">
            <!-- 리뷰 요약 -->
            <div class="dp-rv-summary">
              <div class="dp-rv-summary__score">
                <span class="dp-rv-summary__num">{{ avgRating }}</span>
                <div class="dp-rv-summary__stars">
                  <span v-for="n in 5" :key="n" :class="n <= Math.round(avgRating) ? 'star-on' : 'star-off'">★</span>
                </div>
                <span class="dp-rv-summary__count">{{ reviews.length }}개 리뷰</span>
              </div>
            </div>

            <!-- 리뷰 작성 -->
            <div class="dp-rv-write">
              <div class="dp-rv-write__row">
                <div class="dp-rv-write__stars">
                  <button
                    v-for="n in 5" :key="n"
                    class="dp-rv-write__star"
                    :class="{ 'dp-rv-write__star--on': n <= (hoverR || newR) }"
                    @mouseenter="hoverR = n"
                    @mouseleave="hoverR = 0"
                    @click="newR = n"
                  >★</button>
                </div>
              </div>
              <textarea v-model="newTxt" placeholder="리뷰를 남겨주세요..." rows="3" />
              <button class="dp-rv-write__submit" @click="submitReview">등록</button>
            </div>

            <!-- 리뷰 목록 -->
            <div class="dp-rv-list">
              <div v-for="r in reviews" :key="r.id" class="dp-rv">
                <div class="dp-rv__head">
                  <div class="dp-rv__stars">
                    <span v-for="n in 5" :key="n" :class="n <= r.rating ? 'star-on' : 'star-off'">★</span>
                  </div>
                  <strong>{{ r.author }}</strong>
                  <span class="dp-rv__date">{{ r.date }}</span>
                  <template v-if="r.memberId === authStore.user?.id">
                    <button v-if="editingRvId !== r.id" class="dp-rv__edit-btn" @click="startEditRv(r)">수정</button>
                    <button class="dp-rv__edit-btn dp-rv__edit-btn--del" @click="deleteRv(r.id)">삭제</button>
                  </template>
                </div>
                <div v-if="editingRvId === r.id" class="dp-rv__editing">
                  <div class="dp-rv-write__stars" style="margin-bottom:0.5rem">
                    <button v-for="n in 5" :key="n" class="dp-rv-write__star" :class="{ 'dp-rv-write__star--on': n <= editRvRating }" @click="editRvRating = n">★</button>
                  </div>
                  <textarea v-model="editRvText" rows="3"></textarea>
                  <div class="dp-rv__editing-actions">
                    <button class="dp-rv__edit-btn" @click="editingRvId = null">취소</button>
                    <button class="dp-rv__edit-btn" @click="updateRv(r.id)">저장</button>
                  </div>
                </div>
                <p v-else class="dp-rv__text">{{ r.text }}</p>
                <div v-if="r.reply" class="dp-rv__reply">
                  <span class="dp-rv__reply-badge">FORME</span>
                  <p>{{ r.reply }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Q&A -->
          <div v-show="activeTab === 'qna'" class="dp-tabs__panel">
            <div class="dp-qna-write" v-if="authStore.isLoggedIn">
              <input v-model="newQnaTitle" type="text" placeholder="문의 제목" class="dp-qna-write__title" />
              <textarea v-model="newQnaContent" placeholder="상품에 대해 궁금한 점을 남겨주세요..." rows="3"></textarea>
              <div class="dp-qna-write__bottom">
                <label class="dp-qna-write__secret"><input v-model="newQnaSecret" type="checkbox" /> 비밀글</label>
                <button class="dp-qna-write__submit" @click="submitQna">문의 등록</button>
              </div>
            </div>
            <p v-else class="dp-qna-login">문의를 작성하려면 <RouterLink to="/login">로그인</RouterLink>하세요.</p>

            <div class="dp-qna-list">
              <div v-for="q in productQna" :key="q.id" class="dp-qna-item">
                <div class="dp-qna-item__head">
                  <span class="dp-qna-item__title">
                    <span v-if="q.isSecret" class="material-symbols-outlined dp-qna-item__lock">lock</span>
                    {{ q.title }}
                  </span>
                  <span class="dp-qna-item__badge" :class="q.isAnswered ? 'dp-qna-item__badge--done' : ''">{{ q.isAnswered ? '답변완료' : '대기중' }}</span>
                </div>
                <p class="dp-qna-item__content">{{ q.content }}</p>
                <div v-if="q.answer" class="dp-qna-item__answer">
                  <span class="dp-rv__reply-badge">FORME</span>
                  <p>{{ q.answer }}</p>
                </div>
                <div class="dp-qna-item__meta">
                  <span>{{ q.memberName }}</span>
                  <span>{{ q.createdAt?.slice(0, 10).replace(/-/g, '.') }}</span>
                </div>
              </div>
              <div v-if="!productQna.length" class="dp-qna-empty">등록된 문의가 없습니다</div>
            </div>
          </div>
        </div>

        <!-- ── 최근 본 상품 ── -->
        <section v-if="recentItems.length > 1" class="dp-recent">
          <div class="dp-recent__head">
            <h2 class="dp-recent__title">최근 본 상품</h2>
            <div class="dp-recent__nav">
              <button @click="scrollRecent(-1)" aria-label="이전"><span class="material-symbols-outlined">chevron_left</span></button>
              <button @click="scrollRecent(1)" aria-label="다음"><span class="material-symbols-outlined">chevron_right</span></button>
            </div>
          </div>
          <div class="dp-recent__scroll" ref="recentScrollRef">
            <RouterLink
              v-for="r in recentItems"
              :key="r.id"
              :to="`/products/${r.id}`"
              class="dp-recent__card"
            >
              <div class="dp-recent__img">
                <img :src="r.image" :alt="r.name" />
              </div>
              <p class="dp-recent__cat">{{ r.brand || r.category }}</p>
              <h3 class="dp-recent__name">{{ r.name }}</h3>
              <p class="dp-recent__price">
                <span v-if="r.discountRate" class="dp-recent__original">₩{{ r.originalPrice?.toLocaleString() }}</span>
                ₩{{ r.price?.toLocaleString() }}
              </p>
            </RouterLink>
          </div>
        </section>

      </article>
    </template>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, reactive, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useRecentStore } from "@/stores/recentStore";
import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import api from "@/api";

const props = defineProps({ id: String });
const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const recentStore = useRecentStore();
const authStore = useAuthStore();
const { currentProduct: product, isLoading, products } = storeToRefs(productStore);

// ── 브랜드 ──
const BRAND_COLORS = { BEANPOLE: '#103728', CARHARTT: '#9C4F18', "LEVI'S": '#8E1C28', DICKIES: '#1A1A1A' };

const brandColor = computed(() => BRAND_COLORS[product.value?.brand] || '#111');
const brandLabel = computed(() => product.value?.brand || '');
const brandKey   = computed(() => (product.value?.brand || '').toLowerCase().replace("'", ''));

// ── 찜 ──
const isWished = computed(() => product.value ? wishlistStore.isWished(product.value.id) : false);
function toggleWish() { if (product.value) wishlistStore.toggle(product.value); }

// ── 갤러리 ──
const thumbs = computed(() => {
  if (!product.value) return [];
  // images 배열 우선 (백엔드 다중 이미지)
  if (product.value.images?.length) return product.value.images;
  // imageUrl 단일 이미지 폴백
  if (product.value.imageUrl) return [product.value.imageUrl];
  if (product.value.image) return [product.value.image];
  return [];
});
const thumbIdx = ref(0);
const currentImage = computed(() => thumbs.value[thumbIdx.value] ?? '');

// ── 줌 ──
const zoomBox = ref(null);
const zoomOn = ref(false);
const LENS = 130;
const MAG = 2.5;
const lensXY = reactive({ x: 0, y: 0 });
const lensPos = computed(() => ({ left: lensXY.x + 'px', top: lensXY.y + 'px' }));
const magBg = ref('0% 0%');
const magSize = ref('250%');

function onZoomMove(e) {
  const el = zoomBox.value;
  if (!el) return;
  const r = el.getBoundingClientRect();
  let x = e.clientX - r.left - LENS / 2;
  let y = e.clientY - r.top - LENS / 2;
  x = Math.max(0, Math.min(x, r.width - LENS));
  y = Math.max(0, Math.min(y, r.height - LENS));
  lensXY.x = x;
  lensXY.y = y;
  const cx = (x + LENS / 2) / r.width;
  const cy = (y + LENS / 2) / r.height;
  magBg.value = `${cx * 100}% ${cy * 100}%`;
  magSize.value = `${MAG * 100}%`;
}
function onImgLoad() {}

// ── 옵션 ──
const selSize = ref('');
const qty = ref(1);

// 세일 할인 적용된 가격
const salePrice = computed(() => {
  if (!product.value) return 0;
  const p = product.value.price ?? 0;
  if (product.value.discountRate && product.value.discountRate > 0) {
    return Math.round(p * (1 - product.value.discountRate / 100));
  }
  return p;
});
const recommendedSize = ref('');
const recentScrollRef = ref(null);
function scrollRecent(dir) {
  if (recentScrollRef.value) recentScrollRef.value.scrollBy({ left: dir * 300, behavior: 'smooth' });
}

// 사이즈별 재고 (sizeStocks 우선, 없으면 기존 sizes 폴백)
const availableSizes = computed(() => {
  if (!product.value) return [];
  // 백엔드 sizeStocks 우선 (상품 등록 시 등록한 사이즈)
  if (product.value.sizeStocks?.length) {
    return product.value.sizeStocks;
  }
  return [];
});

// ── 탭 ──
const tabs = [
  { key: 'desc', label: '상품 상세' },
  { key: 'size', label: '사이즈 자세히 보기' },
  { key: 'review', label: '리뷰' },
  { key: 'qna', label: 'Q&A' },
];

// ── 사이즈 차트 (선택 사이즈 기준) ──
const brandCountryMap2 = { BEANPOLE: 'KR', DICKIES: 'US', CARHARTT: 'UK', "LEVI'S": 'EU' };
const brandCountryCode = computed(() => brandCountryMap2[brandLabel.value] || 'KR');

// 사이즈 차트 데이터 (szResult에서 가져오거나 기본 데이터)
// 사이즈 차트 4종
const CHARTS = {
  maleTop: [
    { size: 'XS', US: 'XS', UK: 'XS', EU: '44', KR: '90' },
    { size: 'S', US: 'S', UK: 'S', EU: '46', KR: '95' },
    { size: 'M', US: 'M', UK: 'M', EU: '48-50', KR: '100' },
    { size: 'L', US: 'L', UK: 'L', EU: '52', KR: '105' },
    { size: 'XL', US: 'XL', UK: 'XL', EU: '54-56', KR: '110' },
  ],
  femaleTop: [
    { size: 'XS', US: '0-2', UK: '4-6', EU: '32-34', KR: '44' },
    { size: 'S', US: '4-6', UK: '8-10', EU: '36', KR: '55' },
    { size: 'M', US: '6-8', UK: '10-12', EU: '38-40', KR: '66' },
    { size: 'L', US: '8-10', UK: '12-14', EU: '40-42', KR: '77' },
    { size: 'XL', US: '12-14', UK: '16-18', EU: '42-44', KR: '88' },
  ],
  maleBottom: [
    { size: '28', US: '28', UK: '28', EU: '44', KR: '28' },
    { size: '30', US: '30', UK: '30', EU: '46', KR: '30' },
    { size: '32', US: '32', UK: '32', EU: '48', KR: '32' },
    { size: '34', US: '34', UK: '34', EU: '50', KR: '34' },
    { size: '36', US: '36', UK: '36', EU: '52', KR: '36' },
  ],
  femaleBottom: [
    { size: 'XS', US: '0', UK: '4', EU: '32', KR: '44' },
    { size: 'S', US: '2', UK: '6', EU: '34', KR: '44' },
    { size: 'M', US: '4', UK: '8', EU: '36', KR: '55' },
    { size: 'L', US: '6', UK: '10', EU: '38', KR: '66' },
    { size: 'XL', US: '8', UK: '12', EU: '40', KR: '66' },
    { size: 'XXL', US: '10', UK: '14', EU: '42', KR: '77' },
    { size: '3XL', US: '12', UK: '16', EU: '44', KR: '88' },
  ],
};

const isBottomCategory = computed(() => {
  const cat = (product.value?.category || product.value?.categoryName || '').toLowerCase();
  return cat.includes('하의') || cat.includes('팬츠') || cat.includes('데님') || cat.includes('바지') || cat.includes('bottom') || cat.includes('pants') || cat.includes('denim') || cat.includes('shorts');
});

const sizeChartData = computed(() => {
  if (szResult.value?.sizeChart?.length) return szResult.value.sizeChart;
  const gender = product.value?.gender || '남성';
  const isBottom = isBottomCategory.value;
  if (gender === '여성') return isBottom ? CHARTS.femaleBottom : CHARTS.femaleTop;
  return isBottom ? CHARTS.maleBottom : CHARTS.maleTop;
});

const selectedSizeInfo = computed(() => {
  if (!selSize.value) return null;
  // 차트에서 선택된 사이즈와 매칭
  const chart = sizeChartData.value;
  const row = chart.find(r =>
    r.size === selSize.value || r.US === selSize.value || r.UK === selSize.value ||
    r.EU === selSize.value || r.KR === selSize.value
  );
  if (!row) return { KR: selSize.value, brandVal: null, brandLabel: '' };

  const country = brandCountryCode.value;
  const countryNames = { US: '미국 🇺🇸', UK: '영국 🇬🇧', EU: '유럽 🇪🇺', KR: '한국 🇰🇷' };
  return {
    ...row,
    brandVal: country !== 'KR' ? row[country] : null,
    brandLabel: country !== 'KR' ? `${countryNames[country]} (${brandLabel.value})` : '',
  };
});

function isSelectedRow(row) {
  return row.size === selSize.value || row.US === selSize.value || row.UK === selSize.value ||
    row.EU === selSize.value || row.KR === selSize.value;
}

// ── 사이즈 추천 ──
const szForm = ref({ height: null, weight: null, fit: 'standard' });
const szResult = ref(null);
const szLoading = ref(false);

// 브랜드 → 국가 매핑
const brandCountryMap = { BEANPOLE: 'KR', DICKIES: 'US', CARHARTT: 'UK', "LEVI'S": 'EU' };
const brandCountryLabel = computed(() => {
  const c = brandCountryMap[brandLabel.value] || 'KR';
  return { KR: '한국 🇰🇷', US: '미국 🇺🇸', UK: '영국 🇬🇧', EU: '유럽 🇪🇺' }[c];
});

async function recommendSize() {
  if (!szForm.value.height || !szForm.value.weight) { alert('키와 몸무게를 입력해주세요.'); return; }
  szLoading.value = true;
  try {
    const cat = product.value?.category?.toLowerCase() || '';
    const category = isBottomCategory.value ? 'bottom' : 'top';
    const gender = product.value?.gender || '남성';
    const res = await api.post('/size/recommend', {
      height: szForm.value.height, weight: szForm.value.weight,
      fit: szForm.value.fit, category, gender, brand: brandLabel.value,
    });
    if (res.success) { szResult.value = res; }
    else { alert(res.message || '추천 실패'); }
  } catch {
    // 프론트 폴백
    const bmi = szForm.value.weight / Math.pow(szForm.value.height / 100, 2);
    let size = 'M';
    if (bmi < 20) size = 'S'; else if (bmi < 24) size = 'M'; else if (bmi < 27) size = 'L'; else size = 'XL';
    if (szForm.value.fit === 'slim') { const s = ['XS','S','M','L','XL','XXL']; const i = s.indexOf(size); size = s[Math.max(0,i-1)]; }
    if (szForm.value.fit === 'wide') { const s = ['XS','S','M','L','XL','XXL']; const i = s.indexOf(size); size = s[Math.min(5,i+1)]; }
    szResult.value = {
      recommendedSize: size, krSize: size, brandSize: size, brandCountry: 'KR',
      message: `스탠다드 핏 기준, ${size} 사이즈를 추천드립니다.`,
      sizeChart: [
        { size:'XS', US:'XS', UK:'XS', EU:'44', KR:'90' },
        { size:'S', US:'S', UK:'S', EU:'46', KR:'95' },
        { size:'M', US:'M', UK:'M', EU:'48-50', KR:'100' },
        { size:'L', US:'L', UK:'L', EU:'52', KR:'105' },
        { size:'XL', US:'XL', UK:'XL', EU:'54-56', KR:'110' },
        { size:'XXL', US:'XXL', UK:'XXL', EU:'58-60', KR:'115' },
      ],
    };
  } finally { szLoading.value = false; }
}
const activeTab = ref('desc');

// ── 리뷰 (DB 연동) ──
const reviews = ref([]);
const newR = ref(0);
const hoverR = ref(0);
const newTxt = ref('');
const editingRvId = ref(null);
const editRvText = ref('');
const editRvRating = ref(5);

async function loadReviews() {
  if (!product.value) return;
  try {
    const data = await api.get(`/products/${product.value.id}/reviews`);
    reviews.value = (data || []).map(r => ({
      id: r.id, memberId: r.memberId, author: r.memberName || 'USER', rating: r.rating,
      date: r.createdAt?.slice(0, 10) || '', text: r.content,
      reply: r.reply, repliedAt: r.repliedAt,
    }));
  } catch { reviews.value = []; }
}

function startEditRv(r) {
  editingRvId.value = r.id;
  editRvText.value = r.text;
  editRvRating.value = r.rating;
}
async function updateRv(id) {
  if (!editRvText.value.trim()) return;
  try {
    await api.put(`/reviews/${id}`, { rating: editRvRating.value, content: editRvText.value.trim() });
    editingRvId.value = null;
    await loadReviews();
  } catch (e) { alert(e?.message || '수정 실패'); }
}
async function deleteRv(id) {
  if (!confirm('리뷰를 삭제하시겠습니까?')) return;
  try { await api.delete(`/reviews/${id}`); await loadReviews(); }
  catch (e) { alert(e?.message || '삭제 실패'); }
}

async function submitReview() {
  if (!newR.value) { alert('별점을 선택해주세요.'); return; }
  if (!newTxt.value.trim()) { alert('리뷰 내용을 입력해주세요.'); return; }
  const memberId = authStore.user?.id;
  if (!memberId) { alert('로그인이 필요합니다.'); return; }
  try {
    await api.post(`/members/${memberId}/reviews`, {
      productId: product.value.id,
      orderId: null,
      rating: newR.value,
      content: newTxt.value.trim(),
    });
    newR.value = 0; newTxt.value = '';
    await loadReviews();
  } catch (e) {
    alert(e.data?.message || e.message || '리뷰 등록에 실패했습니다.');
  }
}

const avgRating = computed(() => {
  if (!reviews.value.length) return 0;
  return (reviews.value.reduce((s, r) => s + r.rating, 0) / reviews.value.length).toFixed(1);
});

// ── Q&A (상품별) ──
const productQna = ref([]);
const newQnaTitle = ref('');
const newQnaContent = ref('');
const newQnaSecret = ref(false);

async function loadProductQna() {
  if (!product.value) return;
  try { productQna.value = await api.get(`/products/${product.value.id}/qna`) || []; }
  catch { productQna.value = []; }
}

async function submitQna() {
  if (!newQnaTitle.value.trim() || !newQnaContent.value.trim()) { alert('제목과 내용을 모두 입력해주세요.'); return; }
  const memberId = authStore.user?.id;
  if (!memberId) { alert('로그인이 필요합니다.'); return; }
  try {
    await api.post(`/members/${memberId}/qna`, {
      productId: product.value.id, title: newQnaTitle.value.trim(),
      content: newQnaContent.value.trim(), isSecret: newQnaSecret.value,
    });
    newQnaTitle.value = ''; newQnaContent.value = ''; newQnaSecret.value = false;
    await loadProductQna();
  } catch (e) { alert(e?.data?.message || e?.message || '문의 등록 실패'); }
}

// ── 최근 본 상품 (현재 상품 제외) ──
const recentItems = computed(() => {
  if (!product.value) return recentStore.items;
  return recentStore.items.filter((r) => r.id !== product.value.id);
});

// ── 로드 ──
async function loadProduct(id) {
  if (!id) return;
  await productStore.fetchProductById(id);
  if (product.value) {
    // 자동 사이즈 추천 (로그인 시 회원 정보 기반)
    recommendedSize.value = '';
    const user = authStore.user;
    if (user?.height && user?.weight) {
      try {
        const cat = (product.value.category || product.value.categoryName || '').toLowerCase();
        const category = isBottomCategory.value ? 'bottom' : 'top';
        const res = await api.post('/size/recommend', {
          height: user.height, weight: user.weight, fit: user.fit || 'standard',
          category, gender: product.value.gender || '남성', brand: brandLabel.value,
        });
        if (res.success) {
          // 추천 사이즈 후보: recommendedSize, krSize, brandSize 전부 비교
          const candidates = [res.recommendedSize, res.krSize, res.brandSize].filter(Boolean);
          const recAvail = availableSizes.value.find(s => candidates.includes(s.size) && s.stock > 0);
          if (recAvail) {
            recommendedSize.value = recAvail.size; // 실제 매칭된 사이즈로 표시
            selSize.value = recAvail.size;
            return;
          }
          // 매칭 안 되면 원래 추천 사이즈 표시
          recommendedSize.value = res.recommendedSize;
        }
      } catch {}
    }

    // 추천 실패 시 첫 번째 재고 있는 사이즈 선택
    const ss = product.value.sizeStocks?.length ? product.value.sizeStocks : null;
    if (ss) {
      const inStock = ss.find(s => s.stock > 0);
      selSize.value = inStock ? inStock.size : (ss[0]?.size ?? '');
    } else {
      selSize.value = product.value.sizes?.[0] ?? '';
    }
    qty.value = 1;
    thumbIdx.value = 0;
    activeTab.value = 'desc';
    recentStore.add(product.value);
    loadReviews();
    loadProductQna();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
onMounted(async () => {
  await productStore.fetchProducts();
  await loadProduct(props.id ?? route.params.id);
});
watch(() => route.params.id, (id) => { if (id) loadProduct(id); });

// ── 장바구니 / 구매 ──
function addToCart() {
  if (!product.value) return;
  if (!selSize.value) { alert('사이즈를 선택해주세요.'); return; }
  cartStore.addItem({ productId: product.value.id, name: product.value.name, price: salePrice.value, image: currentImage.value, size: selSize.value, quantity: qty.value });
  router.push('/cart');
}
function buyNow() {
  if (!product.value) return;
  if (!selSize.value) { alert('사이즈를 선택해주세요.'); return; }
  cartStore.addItem({ productId: product.value.id, name: product.value.name, price: salePrice.value, image: currentImage.value, size: selSize.value, quantity: qty.value });
  router.push('/payment');
}
</script>

<style scoped>
/* ════════════════════════════════
   DETAIL PAGE — Forme32
   ════════════════════════════════ */

/* 상태 */
.dp-state {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  min-height: 55vh; gap: 1rem; color: #bbb;
}
.dp-state__icon { font-size: 2.5rem; }
.dp-state__link {
  font-size: 0.75rem; color: #111; text-decoration: underline; text-underline-offset: 3px;
}

.dp { max-width: 1600px; margin: 0 auto; }

/* ── 브레드크럼 ── */
.dp-crumb {
  display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap;
  padding: 1.25rem 3rem; font-size: 0.5625rem; font-weight: 500;
  letter-spacing: 0.15em; text-transform: uppercase; color: #bbb;
}
.dp-crumb a { color: #999; text-decoration: none; transition: color 0.2s; }
.dp-crumb a:hover { color: #111; }
.dp-crumb__current { color: #111; }

/* ── 상단 2단 ── */
.dp-top {
  display: flex; flex-direction: column; gap: 0;
}
@media (min-width: 768px) {
  .dp-top { flex-direction: row; }
}

/* 갤러리 */
.dp-gallery { flex: 1; display: flex; flex-direction: column-reverse; gap: 1rem; padding: 0 3rem 2rem; }
@media (min-width: 768px) {
  .dp-gallery { flex-direction: row; gap: 1rem; padding: 0 0 0 3rem; width: 58%; }
}

.dp-gallery__main {
  position: relative; flex: 1; background: #f3f1ec;
}
.dp-gallery__zoom {
  position: relative; width: 100%; cursor: crosshair; overflow: hidden;
}
.dp-gallery__zoom img {
  width: 100%; display: block;
}
.dp-gallery__lens {
  position: absolute; width: 130px; height: 130px;
  border: 1.5px solid rgba(0,0,0,0.3);
  background: rgba(255,255,255,0.2);
  pointer-events: none; z-index: 5;
}
.dp-gallery__magnified {
  position: absolute; top: 0; left: calc(100% + 0.75rem);
  width: 100%; height: 100%;
  background-repeat: no-repeat; background-color: #f3f1ec;
  border: 1px solid #eee; z-index: 50; pointer-events: none;
}
@media (max-width: 1023px) {
  .dp-gallery__magnified { display: none; }
}

.dp-gallery__thumbs {
  display: flex; gap: 0.5rem;
}
@media (min-width: 768px) {
  .dp-gallery__thumbs { flex-direction: column; width: 72px; flex-shrink: 0; }
}
.dp-gallery__thumb {
  width: 64px; height: 64px; border: 2px solid transparent; cursor: pointer;
  overflow: hidden; transition: border-color 0.2s;
}
.dp-gallery__thumb--on { border-color: var(--b, #111); }
.dp-gallery__thumb img { width: 100%; height: 100%; object-fit: cover; }

/* 상품 정보 */
.dp-info {
  padding: 2.5rem 3rem 3rem;
}
@media (min-width: 768px) {
  .dp-info {
    width: 42%; padding: 2rem 3rem; position: sticky; top: 120px; height: fit-content;
    max-height: calc(100vh - 140px); overflow-y: auto;
  }
}

.dp-info__tags { display: flex; gap: 0.5rem; align-items: center; margin-bottom: 1.25rem; }
.dp-info__gender {
  display: inline-block; padding: 0.3rem 0.75rem;
  font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; border-radius: 0.2rem;
}
.dp-info__gender--남성 { background: #e8f0fe; color: #1a73e8; }
.dp-info__gender--여성 { background: #fce8e6; color: #d93025; }
.dp-info__gender--공용 { background: #f0f0f0; color: #555; }
.dp-info__brand {
  display: inline-block; padding: 0.3rem 0.875rem;
  font-size: 0.5rem; font-weight: 800; letter-spacing: 0.15em; color: #fff;
}
.dp-info__style {
  font-size: 0.5625rem; letter-spacing: 0.2em; color: #bbb; margin-bottom: 0.25rem;
}
.dp-info__cat {
  font-size: 0.625rem; letter-spacing: 0.15em; text-transform: uppercase;
  color: #999; margin-bottom: 0.625rem;
}
.dp-info__name {
  font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 900;
  line-height: 1.15; letter-spacing: -0.015em; margin-bottom: 0.75rem;
}
.dp-info__price { font-size: 1.375rem; font-weight: 900; color: #111; margin-bottom: 1.25rem; }
.dp-info__prices { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 1.25rem; }
.dp-info__sale { font-size: 1.375rem; font-weight: 900; color: #FF2D2D; }
.dp-info__was { font-size: 0.875rem; color: #bbb; text-decoration: line-through; }
.dp-info__dc { font-size: 0.625rem; font-weight: 900; background: #FF2D2D; color: #fff; padding: 0.15rem 0.375rem; border-radius: 0.2rem; }
.dp-info__divider {
  width: 100%; height: 1px; background: #eee; margin-bottom: 1.75rem;
}

/* 옵션 */
.dp-opt { margin-bottom: 1.5rem; }
.dp-opt__label {
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.2em;
  text-transform: uppercase; color: #999; margin-bottom: 0.625rem;
}
.dp-opt__color {
  width: 1.75rem; height: 1.75rem; border-radius: 50%;
  border: 2px solid transparent; outline: 2px solid; outline-offset: 3px;
}
.dp-opt__sizes { display: flex; gap: 0.5rem; flex-wrap: wrap; }
.dp-size {
  min-width: 2.75rem; height: 2.75rem; padding: 0 0.625rem;
  display: flex; align-items: center; justify-content: center;
  border: 1.5px solid #ddd; font-size: 0.75rem; font-weight: 600;
  color: #666; cursor: pointer; transition: all 0.2s;
}
.dp-size:hover { border-color: var(--b, #111); color: var(--b, #111); }
.dp-size--on { border-color: var(--b, #111); background: var(--b, #111); color: #fff; }
.dp-size--rec { border-color: var(--b, #111); animation: dp-rec-pulse 2s infinite; position: relative; }
@keyframes dp-rec-pulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(0,0,0,0.15); } 50% { box-shadow: 0 0 0 4px rgba(0,0,0,0.08); } }
.dp-size__rec-tip {
  display: none; position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%);
  background: var(--b, #111); color: #fff; font-size: 0.5rem; font-weight: 700; letter-spacing: 0.05em;
  padding: 0.25rem 0.5rem; border-radius: 0.25rem; white-space: nowrap; z-index: 10;
}
.dp-size__rec-tip::after {
  content: ''; position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
  border: 4px solid transparent; border-bottom-color: var(--b, #111);
}
.dp-size--rec:hover .dp-size__rec-tip, .dp-size--rec .dp-size__rec-tip { display: block; }
.dp-opt__label-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
.dp-opt__label-row .dp-opt__label { margin-bottom: 0; }
.dp-opt__rec-hint { font-size: 0.5625rem; font-weight: 600; position: relative; cursor: help; }
.dp-opt__rec-tooltip {
  display: none; position: absolute; top: calc(100% + 8px); left: 0;
  background: #111; color: #fff; font-size: 0.5rem; font-weight: 500; letter-spacing: 0.03em;
  padding: 0.5rem 0.75rem; border-radius: 0.375rem; white-space: nowrap; z-index: 10;
  line-height: 1.6;
}
.dp-opt__rec-tooltip::before {
  content: ''; position: absolute; bottom: 100%; left: 1rem;
  border: 5px solid transparent; border-bottom-color: #111;
}
.dp-opt__rec-hint:hover .dp-opt__rec-tooltip { display: block; }
.dp-size--out { opacity: 0.35; cursor: not-allowed; position: relative; }
.dp-size__out { position: absolute; bottom: -0.125rem; left: 50%; transform: translateX(-50%); font-size: 0.375rem; color: #e53e3e; font-weight: 800; }

/* 수량 */
.dp-qty {
  display: inline-flex; border: 1.5px solid #ddd;
}
.dp-qty button {
  width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center;
  background: #fff; font-size: 1rem; cursor: pointer; transition: background 0.15s;
}
.dp-qty button:hover:not(:disabled) { background: #f5f3ee; }
.dp-qty button:disabled { color: #ddd; cursor: not-allowed; }
.dp-qty span {
  min-width: 2.5rem; height: 2.5rem; display: flex; align-items: center; justify-content: center;
  font-size: 0.875rem; font-weight: 600;
  border-left: 1.5px solid #ddd; border-right: 1.5px solid #ddd;
}

/* 액션 버튼 */
.dp-actions {
  display: grid; grid-template-columns: 1fr auto; gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.dp-actions__cart {
  grid-column: 1 / -1;
  padding: 1.125rem 2rem; background: var(--b, #111); color: #fff;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer; transition: opacity 0.2s;
}
.dp-actions__cart:hover { opacity: 0.85; }
.dp-actions__buy {
  padding: 1rem 2rem; background: #fff; color: var(--b, #111);
  border: 1.5px solid var(--b, #111);
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
}
.dp-actions__buy:hover { background: var(--b, #111); color: #fff; }
.dp-actions__wish {
  width: 3rem; display: flex; align-items: center; justify-content: center;
  border: 1.5px solid #ddd; background: #fff; cursor: pointer;
  transition: border-color 0.2s;
}
.dp-actions__wish:hover { border-color: var(--b, #111); }
.dp-actions__wish .material-symbols-outlined {
  font-size: 1.125rem; color: var(--b, #111);
}

/* 혜택 */
.dp-perks {
  display: flex; flex-direction: column; gap: 0.625rem;
  padding: 1.25rem 0 0; margin-top: 1rem;
  border-top: 1px solid #eee; list-style: none;
}
.dp-perks li {
  display: flex; align-items: center; gap: 0.625rem;
  font-size: 0.6875rem; color: #666;
}
.dp-perks .material-symbols-outlined {
  font-size: 1rem; color: var(--b, #111);
  font-variation-settings: "wght" 300;
}

/* ── 탭 ── */
.dp-tabs {
  padding: 0 3rem; margin-top: 3rem;
}
.dp-tabs__bar {
  display: flex; gap: 0; border-bottom: 1px solid #eee;
}
.dp-tabs__btn {
  padding: 1rem 2rem; font-size: 0.6875rem; font-weight: 700;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #999; background: none; cursor: pointer;
  border-bottom: 2px solid transparent; transition: all 0.2s;
}
.dp-tabs__btn:hover { color: #111; }
.dp-tabs__btn--on { color: #111; border-bottom-color: var(--b, #111); }

.dp-tabs__panel { padding: 3rem 0 4rem; }

/* 상세 설명 */
.dp-desc {
  font-size: 0.9375rem; line-height: 1.85; color: #555;
  max-width: 48rem; margin-bottom: 2.5rem;
}
.dp-detail-grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;
}
@media (max-width: 640px) {
  .dp-detail-grid { grid-template-columns: 1fr; }
}
.dp-detail-grid__col h4 {
  font-size: 0.625rem; font-weight: 800; letter-spacing: 0.2em;
  text-transform: uppercase; color: var(--b, #111); margin-bottom: 1rem;
}
.dp-detail-grid__col ul {
  padding-left: 1.25rem; display: flex; flex-direction: column; gap: 0.5rem;
  font-size: 0.875rem; color: #666; line-height: 1.7;
}
.dp-detail-grid__col p {
  font-size: 0.875rem; color: #666; line-height: 1.7; margin-bottom: 0.25rem;
}

/* ── 리뷰 ── */
.dp-rv-summary {
  margin-bottom: 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eee;
}
.dp-rv-summary__score { display: flex; align-items: center; gap: 0.75rem; }
.dp-rv-summary__num { font-size: 2.5rem; font-weight: 900; color: #111; }
.dp-rv-summary__stars { display: flex; gap: 2px; }
.star-on { color: #f59e0b; font-size: 1rem; }
.star-off { color: #e0e0e0; font-size: 1rem; }
.dp-rv-summary__count { font-size: 0.75rem; color: #999; }

.dp-rv-write {
  margin-bottom: 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid #eee;
}
.dp-rv-write__row { margin-bottom: 0.75rem; }
.dp-rv-write__stars { display: flex; gap: 0.375rem; }
.dp-rv-write__star {
  width: 2.25rem; height: 2.25rem; font-size: 1.25rem;
  border: none; background: #f0f0f0; color: #ccc; cursor: pointer;
  display: flex; align-items: center; justify-content: center;
  border-radius: 0.375rem; transition: all 0.2s;
}
.dp-rv-write__star:hover { background: #e8e8e8; }
.dp-rv-write__star--on { color: #f59e0b; background: #fef3c7; }
.dp-rv-write textarea {
  width: 100%; border: 1.5px solid #ddd; padding: 1rem;
  font-size: 0.875rem; font-family: inherit; resize: vertical;
  margin-bottom: 0.75rem; outline: none;
}
.dp-rv-write textarea:focus { border-color: var(--b, #111); }
.dp-rv-write__submit {
  padding: 0.75rem 2rem; background: var(--b, #111); color: #fff;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
  text-transform: uppercase; cursor: pointer; transition: opacity 0.2s;
}
.dp-rv-write__submit:hover { opacity: 0.85; }

.dp-rv { padding: 1.25rem 0; border-bottom: 1px solid #f0f0f0; }
.dp-rv__head { display: flex; align-items: center; gap: 0.625rem; margin-bottom: 0.5rem; }
.dp-rv__stars { display: flex; gap: 2px; }
.dp-rv__head strong { font-size: 0.8125rem; }
.dp-rv__date { font-size: 0.6875rem; color: #bbb; margin-left: auto; }
.dp-rv__text { font-size: 0.875rem; color: #555; line-height: 1.7; }
.dp-rv__reply { margin-top: 0.75rem; padding: 0.75rem 1rem; background: #fafaf8; border-left: 3px solid #111; border-radius: 0 0.25rem 0.25rem 0; }
.dp-rv__reply-badge { font-size: 0.5rem; font-weight: 900; letter-spacing: 0.15em; background: #111; color: #fff; padding: 0.15rem 0.5rem; margin-bottom: 0.375rem; display: inline-block; }
.dp-rv__reply p { font-size: 0.8125rem; color: #333; line-height: 1.6; margin-top: 0.375rem; }
.dp-rv__edit-btn { font-size: 0.5625rem; color: #bbb; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.15rem 0.5rem; border-radius: 0.25rem; margin-left: 0.375rem; transition: all 0.2s; }
.dp-rv__edit-btn:hover { border-color: #111; color: #111; }
.dp-rv__edit-btn--del:hover { border-color: #e53e3e; color: #e53e3e; }
.dp-rv__editing { display: flex; flex-direction: column; gap: 0.5rem; }
.dp-rv__editing textarea { width: 100%; padding: 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; resize: vertical; }
.dp-rv__editing textarea:focus { border-color: #111; }
.dp-rv__editing-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* ── Q&A ── */
.dp-qna-write { margin-bottom: 2rem; }
.dp-qna-write__title { width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; margin-bottom: 0.5rem; }
.dp-qna-write__title:focus { border-color: #111; }
.dp-qna-write textarea { width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; resize: vertical; }
.dp-qna-write textarea:focus { border-color: #111; }
.dp-qna-write__bottom { display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem; }
.dp-qna-write__secret { display: flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; color: #666; cursor: pointer; }
.dp-qna-write__secret input { accent-color: #111; }
.dp-qna-write__submit { padding: 0.625rem 1.5rem; background: #111; color: #fff; font-size: 0.75rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; }
.dp-qna-login { font-size: 0.8125rem; color: #999; margin-bottom: 2rem; }
.dp-qna-login a { color: #111; font-weight: 700; text-decoration: underline; }
.dp-qna-list { display: flex; flex-direction: column; gap: 0; }
.dp-qna-item { padding: 1.25rem 0; border-bottom: 1px solid #f0f0f0; }
.dp-qna-item__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.dp-qna-item__title { font-size: 0.875rem; font-weight: 700; color: #111; display: flex; align-items: center; gap: 0.375rem; }
.dp-qna-item__lock { font-size: 0.875rem; color: #ccc; }
.dp-qna-item__badge { display: inline-block; padding: 0.25rem 0.625rem; font-size: 0.5rem; font-weight: 700; letter-spacing: 0.1em; border-radius: 0.25rem; border: 1.5px solid #ddd; color: #999; }
.dp-qna-item__badge--done { background: #111; color: #fff; border-color: #111; }
.dp-qna-item__content { font-size: 0.8125rem; color: #333; line-height: 1.6; }
.dp-qna-item__answer { margin-top: 0.75rem; padding: 0.75rem 1rem; background: #fafaf8; border-left: 3px solid #111; border-radius: 0 0.25rem 0.25rem 0; }
.dp-qna-item__answer p { font-size: 0.8125rem; color: #333; line-height: 1.6; margin-top: 0.375rem; }
.dp-qna-item__meta { display: flex; gap: 1rem; font-size: 0.6875rem; color: #bbb; margin-top: 0.5rem; }
.dp-qna-empty { text-align: center; color: #ccc; padding: 3rem 0; font-size: 0.8125rem; }

/* ── 최근 본 상품 ── */
.dp-recent {
  padding: 4rem 3rem 6rem; border-top: 1px solid #eee; margin-top: 2rem;
}
.dp-recent__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.dp-recent__title {
  font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em;
}
.dp-recent__nav { display: flex; gap: 0.375rem; }
.dp-recent__nav button {
  width: 2rem; height: 2rem; border: 1.5px solid #ddd; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  background: #fff; cursor: pointer; transition: all 0.2s;
}
.dp-recent__nav button:hover { border-color: #111; background: #111; color: #fff; }
.dp-recent__nav .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
.dp-recent__scroll {
  display: flex; gap: 1.25rem; overflow-x: auto; padding-bottom: 0.5rem;
  scrollbar-width: none;
}
.dp-recent__scroll::-webkit-scrollbar { display: none; }
.dp-recent__card {
  flex-shrink: 0; width: 160px; text-decoration: none; color: inherit;
}
.dp-recent__img {
  aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec;
  margin-bottom: 0.625rem; border-radius: 0.25rem;
}
.dp-recent__img img {
  width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s;
}
.dp-recent__card:hover .dp-recent__img img { transform: scale(1.04); }
.dp-recent__cat {
  font-size: 0.5rem; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; color: #999; margin-bottom: 0.25rem;
}
.dp-recent__name {
  font-size: 0.8125rem; font-weight: 600; color: #1a1a1a; line-height: 1.35;
  margin-bottom: 0.25rem; display: -webkit-box; -webkit-line-clamp: 2;
  -webkit-box-orient: vertical; overflow: hidden;
}
.dp-recent__price { font-size: 0.8125rem; font-weight: 800; color: #1a1a1a; }
.dp-recent__original { font-size: 0.6875rem; font-weight: 400; color: #bbb; text-decoration: line-through; margin-right: 0.375rem; }

/* ── 사이즈 추천 ── */
.dp-sz { max-width: 600px; }
.dp-sz__recommend { margin: 2rem 0; padding: 1.5rem; border: 1.5px solid #eee; border-radius: 0.5rem; }
.dp-sz__recommend-title { display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; font-weight: 800; margin-bottom: 1rem; }
.dp-sz__recommend-title .material-symbols-outlined { font-size: 1.125rem; }
.dp-sz__recommend-form { display: flex; gap: 0.5rem; flex-wrap: wrap; align-items: center; }
.dp-sz__input { width: 100px; padding: 0.625rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; outline: none; }
.dp-sz__input:focus { border-color: #111; }
.dp-sz__select { padding: 0.625rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; outline: none; cursor: pointer; }
.dp-sz__recommend-btn { padding: 0.625rem 1.25rem; color: #fff; font-size: 0.75rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; border: none; }
.dp-sz__recommend-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.dp-sz__recommend-result { margin-top: 1rem; padding: 1rem; border-left: 3px solid; border-radius: 0 0.375rem 0.375rem 0; background: #fafaf8; }
.dp-sz__recommend-size { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.375rem; }
.dp-sz__recommend-msg { font-size: 0.8125rem; color: #555; }
.dp-sz__selected { margin-bottom: 2rem; }
.dp-sz__selected-row { display: flex; align-items: center; gap: 2rem; margin-bottom: 1rem; padding: 1.5rem; background: #fafaf8; border-radius: 0.5rem; }
.dp-sz__selected-item { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.dp-sz__selected-val { font-size: 2.5rem; font-weight: 900; color: var(--b, #111); line-height: 1; }
.dp-sz__selected-val--sub { font-size: 1.75rem; color: #555; }
.dp-sz__selected-label { font-size: 0.5625rem; font-weight: 600; color: #999; }
.dp-sz__selected-msg { font-size: 0.8125rem; font-weight: 600; }
.dp-sz__user-info { display: flex; gap: 0.5rem; margin-top: 0.5rem; }
.dp-sz__user-info span { font-size: 0.5625rem; font-weight: 600; color: #999; background: #f5f5f5; padding: 0.25rem 0.625rem; border-radius: 999px; }
.dp-sz__no-size { font-size: 0.875rem; color: #bbb; padding: 2rem 0; }
.dp-sz__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 0.75rem; }
.dp-sz__brand-note { font-size: 0.75rem; color: #666; margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem; flex-wrap: wrap; }
.dp-sz__brand-flag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; color: #fff; padding: 0.2rem 0.5rem; }
.dp-sz__form { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 2rem; }
.dp-sz__field { display: flex; flex-direction: column; gap: 0.375rem; }
.dp-sz__field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.dp-sz__field input, .dp-sz__field select {
  padding: 0.75rem 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; color: #111; outline: none; transition: border-color 0.2s;
}
.dp-sz__field input:focus, .dp-sz__field select:focus { border-color: var(--b, #111); }
.dp-sz__btn {
  grid-column: span 2; padding: 0.875rem; background: var(--b, #111); color: #fff;
  font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
  transition: opacity 0.2s;
}
.dp-sz__btn:hover { opacity: 0.85; }
.dp-sz__btn:disabled { opacity: 0.4; cursor: not-allowed; }
.dp-sz__result { border-top: 1px solid #eee; padding-top: 2rem; }
.dp-sz__recommend {
  display: flex; align-items: center; gap: 2rem; margin-bottom: 1rem;
  padding: 1.5rem; background: #fafaf8; border-radius: 0.5rem;
}
.dp-sz__recommend-main, .dp-sz__recommend-brand {
  display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
}
.dp-sz__recommend-size {
  font-size: 2.5rem; font-weight: 900; color: var(--b, #111); line-height: 1;
}
.dp-sz__recommend-foreign {
  font-size: 1.75rem; font-weight: 800; color: #555; line-height: 1;
}
.dp-sz__recommend-label {
  font-size: 0.5625rem; font-weight: 600; color: #999; letter-spacing: 0.05em;
}
.dp-sz__recommend-msg { font-size: 0.8125rem; color: #555; line-height: 1.5; margin-bottom: 1.5rem; }
.dp-sz__chart { width: 100%; border-collapse: collapse; }
.dp-sz__chart th {
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  color: #999; padding: 0.75rem 0.625rem; text-align: center; border-bottom: 1px solid #eee;
}
.dp-sz__chart td {
  font-size: 0.8125rem; text-align: center; padding: 0.75rem 0.625rem; border-bottom: 1px solid #f0f0f0; color: #555;
}
.dp-sz__chart-highlight { background: rgba(0,0,0,0.04); }
.dp-sz__chart-highlight td { font-weight: 700; color: var(--b, #111); }
.dp-sz__chart-hl-col { color: var(--b, #111) !important; }
.dp-sz__chart-kr { color: #111 !important; font-weight: 800 !important; background: rgba(0,0,0,0.02); }
.dp-sz__chart-kr-cell { font-weight: 800; color: #111; background: rgba(0,0,0,0.02); }
</style>
