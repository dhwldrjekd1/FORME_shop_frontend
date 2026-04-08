<template>
  <main class="page-wrapper">
    <!-- 로딩 -->
    <div v-if="isLoading" class="detail-loading">Loading...</div>

    <!-- 상품 없음 -->
    <div v-else-if="!product" class="detail-empty">
      <p>상품을 찾을 수 없습니다.</p>
      <RouterLink to="/products">목록으로 돌아가기</RouterLink>
    </div>

    <!-- 상품 상세 -->
    <template v-else>
      <!-- ── 메인: 이미지(좌) + 정보(우) ── -->
      <section class="detail-main">
        <!-- 좌: 이미지 영역 -->
        <div class="detail-main__img-col">
          <!-- 썸네일 세로 목록 -->
          <div class="detail-thumb-list">
            <button
              v-for="(img, i) in thumbnails"
              :key="i"
              class="detail-thumb-btn"
              :class="{ 'detail-thumb-btn--active': activeThumb === i }"
              @click="activeThumb = i"
            >
              <img
                :src="img"
                :alt="`thumbnail ${i + 1}`"
                class="detail-thumb-img"
              />
            </button>
          </div>

          <!-- 메인 이미지 + 줌 -->
          <div
            class="detail-zoom-container"
            @mousemove="onMouseMove"
            @mouseenter="isHovering = true"
            @mouseleave="isHovering = false"
            ref="zoomBox"
          >
            <img
              :src="currentImage"
              :alt="product.name"
              class="detail-main__img"
            />
            <div
              v-show="isHovering"
              class="detail-zoom-lens"
              :style="{ left: lensStyle.left, top: lensStyle.top }"
            />
          </div>

          <!-- 확대 결과창 -->
          <div
            v-show="isHovering"
            class="detail-zoom-result"
            :style="{
              backgroundImage: `url(${currentImage})`,
              backgroundPosition: zoomBgPos,
              backgroundSize: zoomBgSize,
            }"
          />

          <!-- 플로팅 태그 -->
          <div class="detail-main__tag">
            <p class="detail-main__tag-label">Series 01 / Archive</p>
            <h3 class="detail-main__tag-text">
              Constructed of salvaged Italian wool and hand-finished in our
              Milan atelier.
            </h3>
          </div>
        </div>
        <!-- 우: 상품 정보 -->
        <div class="detail-main__info-col">
          <div class="detail-main__info">
            <span class="detail-main__style-no"
              >Style No. {{ String(product.id).padStart(6, "0") }}</span
            >
            <span class="detail-main__category">{{ product.category }}</span>
            <h1 class="detail-main__name">{{ product.name }}</h1>

            <p class="detail-main__desc">
              A definitive study in silhouette and proportion. This piece
              features exaggerated peak lapels, hidden placket closure, and a
              dramatic floor-length drape.
            </p>

            <!-- 색상 표시 (단일 색상) -->
            <div class="detail-option">
              <p class="detail-option__label">Color</p>
              <div class="detail-color-dot"></div>
            </div>

            <!-- 사이즈 선택 -->
            <div class="detail-option">
              <p class="detail-option__label">Select Size</p>
              <div class="detail-option__sizes" role="radiogroup">
                <button
                  v-for="size in product.sizes"
                  :key="size"
                  role="radio"
                  :aria-checked="selectedSize === size"
                  class="detail-size-btn"
                  :class="{ 'detail-size-btn--active': selectedSize === size }"
                  @click="selectedSize = size"
                >
                  {{ size }}
                </button>
              </div>
            </div>

            <!-- 장바구니 버튼 -->
            <button class="detail-add-btn" @click="addToCart">
              Add to Collection — ${{ product.price.toLocaleString() }}
            </button>

            <!-- 아코디언 -->
            <div class="detail-accordion">
              <details class="detail-accordion__item" open>
                <summary class="detail-accordion__summary">
                  <span>Features</span>
                  <span class="material-symbols-outlined">expand_more</span>
                </summary>
                <div class="detail-accordion__body">
                  <ul class="detail-feature-list">
                    <li>Relaxed Fit — room through chest and body</li>
                    <li>Carhartt Force™ FastDry Technology fights sweat</li>
                    <li>Ventilated side panels for airflow</li>
                    <li>Left chest pocket with pencil slot</li>
                    <li>Drop-tail hem for added coverage</li>
                    <li>Raglan sleeve increases range of motion</li>
                  </ul>
                </div>
              </details>

              <details class="detail-accordion__item">
                <summary class="detail-accordion__summary">
                  <span>Size Chart</span>
                  <span class="material-symbols-outlined">expand_more</span>
                </summary>
                <div class="detail-accordion__body">
                  <div class="detail-size-table-wrap">
                    <table class="detail-size-table">
                      <thead>
                        <tr>
                          <th>Size</th>
                          <th>Chest (in)</th>
                          <th>Waist (in)</th>
                          <th>Chest (cm)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>XS</td>
                          <td>30–32</td>
                          <td>24–26</td>
                          <td>76–81</td>
                        </tr>
                        <tr>
                          <td>S</td>
                          <td>34–36</td>
                          <td>28–30</td>
                          <td>86–91</td>
                        </tr>
                        <tr>
                          <td>M</td>
                          <td>38–40</td>
                          <td>32–34</td>
                          <td>97–102</td>
                        </tr>
                        <tr>
                          <td>L</td>
                          <td>42–44</td>
                          <td>36–38</td>
                          <td>107–112</td>
                        </tr>
                        <tr>
                          <td>XL</td>
                          <td>46–48</td>
                          <td>40–42</td>
                          <td>117–122</td>
                        </tr>
                        <tr>
                          <td>2XL</td>
                          <td>50–52</td>
                          <td>44–46</td>
                          <td>127–132</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <p class="detail-size-note">
                    Measure just under arms and across shoulder blades.
                  </p>
                </div>
              </details>

              <details class="detail-accordion__item">
                <summary class="detail-accordion__summary">
                  <span>Composition</span>
                  <span class="material-symbols-outlined">expand_more</span>
                </summary>
                <div class="detail-accordion__body">
                  65% Cotton / 35% Polyester<br />
                  Lining: 100% Cupro.<br />
                  Responsibly sourced and woven in the Biella region, Italy.
                </div>
              </details>

              <details class="detail-accordion__item">
                <summary class="detail-accordion__summary">
                  <span>Shipping &amp; Returns</span>
                  <span class="material-symbols-outlined">expand_more</span>
                </summary>
                <div class="detail-accordion__body">
                  Complimentary global carbon-neutral shipping on all orders
                  over $500.<br />
                  Returns accepted within 14 days of receipt.
                </div>
              </details>
            </div>
          </div>
        </div>
      </section>

      <!-- ── 추천 상품 섹션 ── -->
      <section class="detail-recommend">
        <h2 class="detail-recommend__title">You May Also Like</h2>
        <div class="detail-recommend__grid">
          <RouterLink
            v-for="rec in recommendedProducts"
            :key="rec.id"
            :to="`/products/${rec.id}`"
            class="detail-rec-card"
          >
            <div class="detail-rec-card__img-wrap">
              <img
                :src="rec.image"
                :alt="rec.name"
                class="detail-rec-card__img"
              />
            </div>
            <div class="detail-rec-card__info">
              <p class="detail-rec-card__category">{{ rec.category }}</p>
              <h3 class="detail-rec-card__name">{{ rec.name }}</h3>
              <p class="detail-rec-card__price">
                ${{ rec.price.toLocaleString() }}
              </p>
            </div>
          </RouterLink>
        </div>
      </section>
      <!-- ── 리뷰 섹션 ── -->
      <section class="detail-review">
        <h2 class="detail-review__title">Review</h2>

        <!-- 리뷰 작성 -->
        <div class="detail-review__write">
          <p class="detail-review__write-label">이 제품에 대한 리뷰 쓰기</p>

          <!-- 별점 선택 -->
          <div class="detail-review__stars">
            <button
              v-for="n in 5"
              :key="n"
              class="detail-review__star-btn"
              :class="{
                'detail-review__star-btn--active':
                  n <= (hoverRating || newRating),
              }"
              @mouseenter="hoverRating = n"
              @mouseleave="hoverRating = 0"
              @click="newRating = n"
            >
              ★
            </button>
          </div>
          <p v-if="!newRating" class="detail-review__hint"></p>

          <!-- 리뷰 텍스트 -->
          <textarea
            v-model="newText"
            class="detail-review__textarea"
            placeholder="리뷰를 작성해주세요..."
            rows="4"
          />
          <button class="detail-review__submit" @click="submitReview">
            리뷰 등록
          </button>
        </div>

        <hr class="detail-review__divider" />

        <!-- 리뷰 평균 + 목록 -->
        <div class="detail-review__summary">
          <span class="detail-review__avg-score">{{ avgRating }}</span>
          <div class="detail-review__avg-stars">
            <span
              v-for="n in 5"
              :key="n"
              class="detail-review__avg-star"
              :class="{
                'detail-review__avg-star--active': n <= Math.round(avgRating),
              }"
              >★</span
            >
          </div>
          <span class="detail-review__count"
            >({{ reviews.length }}개 리뷰)</span
          >
        </div>

        <div class="detail-review__list">
          <div
            v-for="review in reviews"
            :key="review.id"
            class="detail-review__item"
          >
            <div class="detail-review__item-header">
              <div class="detail-review__item-stars">
                <span
                  v-for="n in 5"
                  :key="n"
                  :class="n <= review.rating ? 'star--on' : 'star--off'"
                  >★</span
                >
              </div>
              <span class="detail-review__item-author">{{
                review.author
              }}</span>
              <span class="detail-review__item-date">{{ review.date }}</span>
            </div>
            <p class="detail-review__item-text">{{ review.text }}</p>
          </div>
        </div>
      </section>
    </template>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useProductStore } from "@/stores/productStore";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

// ── props / store ──
const props = defineProps({ id: String });

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const cartStore = useCartStore();

const {
  currentProduct: product,
  isLoading,
  products,
} = storeToRefs(productStore);

// ── 줌 기능 ──
const zoomBox = ref(null);
const isHovering = ref(false);

const LENS_SIZE = 120;
const ZOOM = 3;

const lensStyle = reactive({ left: "0px", top: "0px" });
const zoomBgPos = ref("0px 0px");
const zoomBgSize = ref("300% 300%");

function onMouseMove(e) {
  const box = zoomBox.value;
  if (!box) return;

  const rect = box.getBoundingClientRect();

  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;

  let lensX = x - LENS_SIZE / 2;
  let lensY = y - LENS_SIZE / 2;

  lensX = Math.max(0, Math.min(lensX, rect.width - LENS_SIZE));
  lensY = Math.max(0, Math.min(lensY, rect.height - LENS_SIZE));

  lensStyle.left = lensX + "px";
  lensStyle.top = lensY + "px";

  const ratioX = (lensX + LENS_SIZE / 2) / rect.width;
  const ratioY = (lensY + LENS_SIZE / 2) / rect.height;

  const bgW = rect.width * ZOOM;
  const bgH = rect.height * ZOOM;

  const bgX = ratioX * bgW - rect.width / 2;
  const bgY = ratioY * bgH - rect.height / 2;

  zoomBgPos.value = `-${bgX}px -${bgY}px`;
  zoomBgSize.value = `${bgW}px ${bgH}px`;
}

// ── 현재 이미지 ──
// ── 썸네일 목록 (상품 이미지 3장) ──
const thumbnails = computed(() => {
  const base = product.value?.image ?? "";
  // 같은 이미지를 3장으로 표시 (실제 서비스 시 각각 다른 이미지 URL로 교체)
  return [base, base, base];
});

const activeThumb = ref(0);

// 현재 이미지 (썸네일 선택 반영)
const currentImage = computed(() => thumbnails.value[activeThumb.value] ?? "");

// ── 리뷰 데이터 ──
const reviews = ref([
  {
    id: 1,
    author: "보경",
    rating: 5,
    date: "2025-03-21",
    text: "One of the best made and comfortable T-shirts you can find out there!!!",
  },
  {
    id: 2,
    author: "USER_02",
    rating: 3,
    date: "2025-03-15",
    text: "The quality has really gone downhill. They fit baggier and the material has changed.",
  },
  {
    id: 3,
    author: "USER_03",
    rating: 5,
    date: "2025-03-09",
    text: "Great colors, style and fit. My son has worn nothing but these shirts since.",
  },
]);

// 새 리뷰 작성 상태
const newRating = ref(0);
const hoverRating = ref(0);
const newText = ref("");

function submitReview() {
  if (!newRating.value) {
    alert("별점을 선택해주세요.");
    return;
  }
  if (!newText.value.trim()) {
    alert("리뷰 내용을 입력해주세요.");
    return;
  }
  reviews.value.unshift({
    id: Date.now(),
    author: "USER",
    rating: newRating.value,
    date: new Date().toISOString().slice(0, 10),
    text: newText.value.trim(),
  });
  newRating.value = 0;
  newText.value = "";
}

// 별점 평균
const avgRating = computed(() => {
  if (!reviews.value.length) return 0;
  return (
    reviews.value.reduce((s, r) => s + r.rating, 0) / reviews.value.length
  ).toFixed(1);
});

// ── 사이즈 선택 ──
const selectedSize = ref("");

// ── 추천 상품 ──
const recommendedProducts = computed(() => {
  if (!product.value) return [];
  return products.value.filter((p) => p.id !== product.value.id).slice(0, 4);
});

// ── 초기 로드 ──
onMounted(async () => {
  await productStore.fetchProducts();
  const id = props.id ?? route.params.id;
  await productStore.fetchProductById(id);

  if (product.value) {
    selectedSize.value = product.value.sizes?.[0] ?? "";
  }
});

// ── 장바구니 추가 ──
function addToCart() {
  if (!product.value) return;
  if (!selectedSize.value) {
    alert("사이즈를 선택해주세요.");
    return;
  }
  cartStore.addItem({
    productId: product.value.id,
    name: product.value.name,
    price: product.value.price,
    image: currentImage.value,
    size: selectedSize.value,
  });
  router.push("/cart");
}
</script>

<style scoped>
/* ── 로딩 / 없음 ── */
.detail-loading,
.detail-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 1.5rem;
  color: var(--color-on-surface-variant);
}

/* ── 메인 2단 레이아웃 ── */
.detail-main {
  display: flex;
  flex-direction: column;
  min-height: calc(100dvh - var(--header-height));
  position: relative;
  overflow: hidden; /* ← 추가 */
}

/* 좌: 이미지 */
.detail-main__img-col {
  display: flex;
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 800px;
  overflow: visible;
  background-color: var(--color-surface-container);
}

.detail-thumb-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.75rem;
  background-color: var(--color-surface-container);
  width: 80px;
  flex-shrink: 0;
}

.detail-thumb-btn {
  width: 64px;
  height: 64px;
  border: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  flex-shrink: 0;
  transition: border-color 0.2s;
}

.detail-thumb-btn--active {
  border-color: var(--color-primary);
}

.detail-thumb-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ── 단일 색상 표시 ── */
.detail-color-dot {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  background-color: #1a1a1a; /* 상품 색상에 맞게 변경 */
  border: 2px solid transparent;
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}

/* ── 리뷰 섹션 ── */
.detail-review {
  max-width: 860px;
  margin: 0 auto;
  padding: 6rem 2rem;
}

.detail-review__title {
  font-family: var(--font-headline);
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 3rem;
}

.detail-review__write {
  margin-bottom: 2rem;
}

.detail-review__write-label {
  font-size: 0.9375rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.detail-review__stars {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.75rem;
}

.detail-review__star-btn {
  width: 3rem;
  height: 3rem;
  border: 1.5px solid var(--color-outline-variant);
  font-size: 1.25rem;
  color: #d1d1d1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    border-color 0.15s,
    color 0.15s;
}

.detail-review__star-btn--active {
  color: #000;
  border-color: #000;
}

.detail-review__hint {
  font-size: 0.8125rem;
  color: var(--color-outline);
  margin-bottom: 1rem;
}

.detail-review__textarea {
  width: 100%;
  border: 1px solid var(--color-outline-variant);
  padding: 1rem;
  font-size: 0.875rem;
  font-family: var(--font-body);
  resize: vertical;
  margin-bottom: 1rem;
  outline: none;
}

.detail-review__textarea:focus {
  border-color: var(--color-primary);
}

.detail-review__submit {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 0.875rem 2.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
  transition: opacity 0.2s;
}

.detail-review__submit:hover {
  opacity: 0.85;
}

.detail-review__divider {
  border: none;
  border-top: 0.5px solid rgba(0, 0, 0, 0.12);
  margin: 2rem 0;
}

/* 평균 별점 */
.detail-review__summary {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.detail-review__avg-score {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 300;
}

.detail-review__avg-stars {
  display: flex;
  gap: 2px;
}

.detail-review__avg-star {
  font-size: 1rem;
  color: #d1d1d1;
}
.detail-review__avg-star--active {
  color: #000;
}

.detail-review__count {
  font-size: 0.8125rem;
  color: var(--color-outline);
}

/* 리뷰 목록 */
.detail-review__list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.detail-review__item {
  padding: 1.5rem 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.detail-review__item-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.5rem;
}

.detail-review__item-stars {
  display: flex;
  gap: 2px;
}

.star--on {
  color: #000;
  font-size: 0.875rem;
}
.star--off {
  color: #d1d1d1;
  font-size: 0.875rem;
}

.detail-review__item-author {
  font-size: 0.8125rem;
  font-weight: 600;
}

.detail-review__item-date {
  font-size: 0.75rem;
  color: var(--color-outline);
  margin-left: auto;
}

.detail-review__item-text {
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
}

@media (min-width: 768px) {
  .detail-main {
    flex-direction: row;
  }
}

@media (min-width: 768px) {
  .detail-main__img-col {
    width: 58.33%;
  }
}

/* ── 줌 컨테이너 ── */
.detail-zoom-container {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: crosshair;
  overflow: hidden;
}

.detail-main__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.05) brightness(0.95);
}

/* ── 렌즈 ── */
.detail-zoom-lens {
  position: absolute;
  width: 120px;
  height: 120px;
  border: 1.5px solid rgba(0, 0, 0, 0.35);
  background: rgba(255, 255, 255, 0.25);
  pointer-events: none;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
  z-index: 10;
}

/* ── 확대 결과창 ── */
.detail-zoom-result {
  position: absolute;
  top: 0;
  left: 100%; /* img-col 바로 오른쪽 */
  width: 71.43%; /* img-col(58.33%) 기준으로 info-col(41.67%) 너비 맞춤 */
  height: 800px;
  background-repeat: no-repeat;
  background-color: var(--color-surface-container-low);
  z-index: 100;
  pointer-events: none;
}

/* 플로팅 태그 */
.detail-main__tag {
  position: absolute;
  bottom: 4rem;
  left: 2rem;
  background-color: var(--color-surface-container-lowest);
  padding: 1.5rem;
  max-width: 20rem;
  display: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

@media (min-width: 1024px) {
  .detail-main__tag {
    display: block;
  }
}

.detail-main__tag-label {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  margin-bottom: 0.5rem;
}

.detail-main__tag-text {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
}

/* 우: 상품 정보 */
.detail-main__info-col {
  width: 100%;
  background-color: var(--color-surface);
  display: flex;
  align-items: flex-start;
  padding: 3rem 2rem;
}

@media (min-width: 768px) {
  .detail-main__info-col {
    width: 41.67%;
    padding: 4rem 3rem;
    max-height: calc(100dvh - var(--header-height));
    position: sticky;
    top: var(--header-height);
  }
}

.detail-main__info {
  max-width: 28rem;
  width: 100%;
}

.detail-main__style-no {
  display: block;
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.detail-main__category {
  display: block;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  margin-bottom: 0.75rem;
}

.detail-main__name {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

/* ── 별점 ── */
.detail-stars {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  position: relative;
}

.detail-stars__back {
  color: #d1d1d1;
  font-size: 0.875rem;
  letter-spacing: 2px;
}

.detail-stars__front {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  color: #000;
  font-size: 0.875rem;
  letter-spacing: 2px;
  white-space: nowrap;
}

.detail-stars__label {
  font-size: 0.6875rem;
  color: var(--color-on-surface-variant);
  margin-left: 4.5rem;
  text-decoration: underline;
  text-underline-offset: 3px;
  cursor: pointer;
}

.detail-main__desc {
  font-size: 0.9375rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

/* ── 옵션 공통 ── */
.detail-option {
  margin-bottom: 2rem;
}

.detail-option__label {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  margin-bottom: 0.75rem;
}

/* ── 사이즈 버튼 ── */
.detail-option__sizes {
  display: flex;
  gap: 0.625rem;
  flex-wrap: wrap;
}

.detail-size-btn {
  min-width: 3rem;
  height: 3rem;
  padding: 0 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-outline-variant);
  font-size: 0.8125rem;
  color: var(--color-on-surface-variant);
  cursor: pointer;
  transition:
    border-color 0.2s,
    color 0.2s,
    background 0.2s;
}

.detail-size-btn:hover,
.detail-size-btn--active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.detail-size-btn--active {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

/* ── 장바구니 버튼 ── */
.detail-add-btn {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.25rem 2.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 2.5rem;
  cursor: pointer;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.detail-add-btn:hover {
  opacity: 0.85;
}
.detail-add-btn:active {
  transform: scale(0.98);
}

/* ── 아코디언 ── */
.detail-accordion {
  display: flex;
  flex-direction: column;
}

.detail-accordion__item {
  border-top: 0.5px solid rgba(0, 0, 0, 0.12);
}

.detail-accordion__item:last-child {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
}

.detail-accordion__summary {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  list-style: none;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  padding: 1.125rem 0;
  user-select: none;
}

.detail-accordion__summary::-webkit-details-marker {
  display: none;
}

.detail-accordion__item[open] .material-symbols-outlined {
  transform: rotate(180deg);
}

.material-symbols-outlined {
  transition: transform 0.2s;
  font-size: 1.125rem;
}

.detail-accordion__body {
  padding-bottom: 1.25rem;
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  line-height: 1.8;
}

.detail-feature-list {
  padding-left: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

/* ── 사이즈 차트 테이블 ── */
.detail-size-table-wrap {
  overflow-x: auto;
  margin-bottom: 0.75rem;
}

.detail-size-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.8125rem;
}

.detail-size-table th,
.detail-size-table td {
  border: 1px solid var(--color-outline-variant);
  padding: 0.5rem 0.75rem;
  text-align: center;
}

.detail-size-table th {
  background-color: var(--color-surface-container-low);
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  font-size: 0.625rem;
}

.detail-size-note {
  font-size: 0.75rem;
  color: var(--color-outline);
  font-style: italic;
}

/* ── 추천 상품 섹션 ── */
.detail-recommend {
  padding: 6rem 3rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
}

.detail-recommend__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  margin-bottom: 3rem;
  text-align: center;
}

.detail-recommend__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem 3rem;
}

@media (min-width: 768px) {
  .detail-recommend__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.detail-rec-card {
  display: block;
  cursor: pointer;
}

.detail-rec-card__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container-low);
  margin-bottom: 1rem;
}

.detail-rec-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.5s,
    filter 0.4s;
}

.detail-rec-card:hover .detail-rec-card__img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.detail-rec-card__category {
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.25rem;
}

.detail-rec-card__name {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 300;
  margin-bottom: 0.25rem;
}

.detail-rec-card__price {
  font-size: 0.9375rem;
  font-weight: 300;
}
</style>
