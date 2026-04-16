<template>
  <AdminLayout>
    <div class="ap">
      <div class="ap-head">
        <div><p class="ap-head__code">[ 01 / PRODUCTS ]</p><h1 class="ap-head__title">상품 관리</h1></div>
        <div class="ap-head__actions">
          <button class="ap-btn ap-btn--ghost" @click="resetRecommend">추천 초기화</button>
          <button class="ap-btn" @click="openAdd">+ 상품 등록</button>
        </div>
      </div>
      <div class="ap-brands">
        <button class="ap-brand-chip" :class="{ 'ap-brand-chip--on': filterBrand === 'all' }" @click="filterBrand = 'all'">전체</button>
        <button v-for="b in brandList" :key="b.key" class="ap-brand-chip" :class="{ 'ap-brand-chip--on': filterBrand === b.key }" :style="filterBrand === b.key ? { backgroundColor: b.color, borderColor: b.color, color: '#fff' } : {}" @click="filterBrand = b.key">{{ b.label }}</button>
      </div>
      <div class="ap-filter">
        <input v-model="search" type="text" placeholder="상품명 검색..." class="ap-input" />
        <span class="ap-count">{{ filtered.length }}개</span>
      </div>
      <div class="ap-wrap">
        <table class="ap-table">
          <thead><tr><th>ID</th><th>이미지</th><th>카테고리</th><th>상품명</th><th>브랜드</th><th>사이즈</th><th>성별</th><th>가격</th><th>총재고</th><th>플래그</th><th>상태</th><th></th></tr></thead>
          <tbody>
            <tr v-for="p in filtered" :key="p.id">
              <td class="t-id">{{ p.id }}</td>
              <td><div class="t-img"><img :src="p.thumbnailUrl || p.imageUrl || p.image" /></div></td>
              <td class="t-cat">{{ p.categoryName || p.category || '-' }}</td>
              <td class="t-name">{{ p.name }}</td>
              <td class="t-brand">{{ p.brand || '-' }}</td>
              <td class="t-sizes">{{ p.sizeStocks?.length ? p.sizeStocks.map(s => s.size).join(', ') : (p.size || '-') }}</td>
              <td>{{ p.gender || '-' }}</td>
              <td class="t-r">
                <template v-if="p.discountRate">
                  <span class="t-dc">-{{ p.discountRate }}%</span>
                  ₩{{ Math.round(p.price * (1 - p.discountRate / 100)).toLocaleString() }}
                  <span class="t-was">₩{{ p.price?.toLocaleString() }}</span>
                </template>
                <template v-else>₩{{ p.price?.toLocaleString() }}</template>
              </td>
              <td class="t-r">{{ p.stock ?? '-' }}</td>
              <td class="t-flags">
                <span v-if="p.isNew" class="t-flag t-flag--new">NEW</span>
                <span v-if="p.isBest" class="t-flag t-flag--best">BEST</span>
                <span v-if="p.isRecommend" class="t-flag t-flag--rec">추천 ★</span>
              </td>
              <td><span class="tag" :class="p.isActive !== false ? 'tag--on' : 'tag--off'">{{ p.isActive !== false ? '판매중' : '숨김' }}</span></td>
              <td class="t-actions">
                <button class="t-id-btn" @click="changeId(p.id)">ID변경</button>
                <button class="t-edit" @click="openEdit(p)">수정</button>
                <button class="t-del" @click="del(p.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!filtered.length"><td colspan="12" class="t-empty">상품 없음</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ═══ 등록/수정 모달 ═══ -->
    <Teleport to="body">
      <div v-if="showModal" class="modal">
        <div class="modal__box">
          <header class="modal__head">
            <h2>{{ isEdit ? '상품 수정' : '상품 등록' }}</h2>
            <button @click="showModal = false"><span class="material-symbols-outlined">close</span></button>
          </header>
          <form class="modal__form" @submit.prevent="submitProduct">
            <div class="modal__row" style="grid-template-columns: 100px 1fr 1fr;">
              <div class="modal__field">
                <label>상품 ID</label>
                <input v-model.number="form.id" type="number" placeholder="자동" :disabled="isEdit" />
              </div>
              <div class="modal__field">
                <label>상품명 *</label>
                <input v-model="form.name" type="text" placeholder="상품명 입력" required />
              </div>
              <div class="modal__field">
                <label>카테고리</label>
                <select v-model="form.category">
                  <option value="">선택</option>
                  <option v-for="c in categories" :key="c.id" :value="c.name">{{ c.name }}</option>
                </select>
              </div>
            </div>
            <div class="modal__row" style="grid-template-columns: 1fr 1fr 1fr;">
              <div class="modal__field">
                <label>브랜드 *</label>
                <select v-model="form.brand" required>
                  <option value="">선택</option>
                  <option>BEANPOLE</option>
                  <option>CARHARTT</option>
                  <option>LEVI'S</option>
                  <option>DICKIES</option>
                </select>
              </div>
              <div class="modal__field">
                <label>성별</label>
                <select v-model="form.gender">
                  <option value="">선택</option>
                  <option>남성</option><option>여성</option><option>공용</option>
                </select>
              </div>
              <div class="modal__field">
                <label>사이즈 관리 ({{ sizeCountryLabel }})</label>
              </div>
            </div>
            <div class="modal__row">
              <div class="modal__field">
                <label>가격 (원) *</label>
                <input v-model.number="form.price" type="number" placeholder="0" min="0" required />
              </div>
              <div class="modal__field">
                <label>재고 *</label>
                <input v-model.number="form.stock" type="number" placeholder="0" min="0" required />
              </div>
            </div>
            <!-- 색상 -->
            <div class="modal__row">
              <div class="modal__field">
                <label>색상 이름</label>
                <input v-model="form.colorName" type="text" placeholder="예: Navy, Black, Ivory" />
              </div>
              <div class="modal__field">
                <label>색상 코드</label>
                <div class="modal__color-row">
                  <input v-model="form.colorHex" type="color" class="modal__color-picker" />
                  <input v-model="form.colorHex" type="text" placeholder="#1a1a1a" class="modal__color-text" />
                </div>
              </div>
            </div>

            <!-- 사이즈별 재고 테이블 -->
            <div class="modal__sizes">
              <div class="modal__sizes-head">
                <span>사이즈</span><span>재고</span><span></span>
              </div>
              <div v-for="(ss, i) in form.sizeStocks" :key="i" class="modal__sizes-row">
                <select v-model="ss.size">
                  <option value="">선택</option>
                  <option v-for="s in sizeOptions" :key="s" :value="s">{{ s }}</option>
                </select>
                <input v-model.number="ss.stock" type="number" min="0" placeholder="0" />
                <button type="button" class="modal__sizes-del" @click="form.sizeStocks.splice(i, 1)">×</button>
              </div>
              <button type="button" class="modal__sizes-add" @click="form.sizeStocks.push({ size: '', stock: 0 })">
                + 사이즈 추가
              </button>
            </div>

            <div class="modal__row" style="grid-template-columns: 1fr 1fr auto;">
              <div class="modal__field">
                <label>할인율 (%)</label>
                <input v-model.number="form.discountRate" type="number" placeholder="0 (할인 없음)" min="0" max="100" />
              </div>
              <div class="modal__field" v-if="form.discountRate > 0">
                <label>할인가 (자동계산)</label>
                <p class="modal__calc-price">₩{{ Math.round(form.price * (1 - form.discountRate / 100)).toLocaleString() }}</p>
              </div>
              <div class="modal__field" :style="form.discountRate > 0 ? {} : { gridColumn: 'span 1' }">
                <label>&nbsp;</label>
                <button type="button" class="modal__auto-size-btn" @click="autoFillSizes">
                  <span class="material-symbols-outlined">auto_fix_high</span>
                  사이즈 자동생성
                </button>
              </div>
            </div>
            <div class="modal__field">
              <label>설명</label>
              <textarea v-model="form.description" rows="3" placeholder="상품 설명"></textarea>
            </div>
            <div class="modal__row">
              <div class="modal__field">
                <label>Features (줄바꿈으로 구분)</label>
                <textarea v-model="form.features" rows="3" placeholder="100% 코튼&#10;레귤러 핏&#10;머신 워시 가능"></textarea>
              </div>
              <div class="modal__field">
                <label>Composition (줄바꿈으로 구분)</label>
                <textarea v-model="form.composition" rows="3" placeholder="면 100%&#10;원산지: 한국"></textarea>
              </div>
            </div>
            <div class="modal__field">
              <label>이미지</label>
              <div class="modal__img-tabs">
                <button type="button" class="modal__img-tab" :class="{ 'modal__img-tab--on': imgTab === 'upload' }" @click="imgTab = 'upload'">파일 업로드</button>
                <button type="button" class="modal__img-tab" :class="{ 'modal__img-tab--on': imgTab === 'server' }" @click="imgTab = 'server'; loadServerImages()">서버 이미지</button>
              </div>

              <!-- 파일 업로드 -->
              <div v-if="imgTab === 'upload'" class="modal__upload" @click="$refs.fileInput.click()" @dragover.prevent @drop.prevent="onDrop">
                <div v-if="previewUrls.length" class="modal__previews">
                  <div v-for="(url, i) in previewUrls" :key="i" class="modal__preview-item">
                    <img :src="url" />
                    <button type="button" class="modal__preview-del" @click.stop="removeFile(i)">×</button>
                    <span v-if="i === 0" class="modal__preview-main">대표</span>
                  </div>
                </div>
                <template v-else>
                  <span class="material-symbols-outlined">cloud_upload</span>
                  <p>클릭 또는 드래그 (여러 장)</p>
                </template>
              </div>

              <!-- 서버 이미지 선택 -->
              <div v-if="imgTab === 'server'" class="modal__server-imgs">
                <div class="modal__server-filter">
                  <button type="button" v-for="g in serverGroups" :key="g" class="modal__server-fbtn" :class="{ 'modal__server-fbtn--on': serverFilter === g }" @click.stop="serverFilter = g">{{ g }}</button>
                </div>
                <p v-if="!filteredServerImages.length" class="modal__server-empty">이미지가 없습니다</p>
                <div class="modal__server-grid">
                  <div
                    v-for="img in filteredServerImages" :key="img.url"
                    class="modal__server-item"
                    :class="{ 'modal__server-item--on': serverSelected.includes(img.url) }"
                    @click="toggleServerImage(img.url)"
                  >
                    <img :src="img.url" />
                    <span v-if="serverSelected.indexOf(img.url) === 0" class="modal__preview-main">대표</span>
                    <span v-else-if="serverSelected.includes(img.url)" class="modal__server-check">✓</span>
                    <p class="modal__server-name" :title="img.url">{{ img.url.split('/').slice(-2).join('/') }}</p>
                  </div>
                </div>
              </div>

              <input ref="fileInput" type="file" accept="image/*" multiple style="display:none" @change="onFileChange" />
            </div>
            <!-- 이미지 순서 관리 + 썸네일/큐레이터 지정 -->
            <div v-if="allImageUrls.length > 0" class="modal__img-assign">
              <div class="modal__img-assign-row">
                <label>이미지 순서 (드래그로 이동 · 클릭하여 대표 이미지 지정)</label>
                <div class="modal__img-assign-list"
                  @dragover.prevent
                  @drop="onImgDrop($event)"
                >
                  <div
                    v-for="(url, i) in allImageUrls" :key="'th-'+url+i"
                    class="modal__img-assign-item"
                    :class="{
                      'modal__img-assign-item--thumb': form.thumbnailUrl === url,
                      'modal__img-assign-item--curator': form.curatorImageUrl === url,
                    }"
                    draggable="true"
                    @dragstart="onImgDragStart(i, $event)"
                    @dragover.prevent
                    @dragenter.prevent="dragOverIdx = i"
                    @click.stop="setThumbnail(url)"
                    @contextmenu.prevent.stop="setCurator(url)"
                  >
                    <img :src="url" />
                    <span class="modal__img-assign-idx">{{ i + 1 }}</span>
                    <span v-if="form.thumbnailUrl === url" class="modal__img-assign-badge modal__img-assign-badge--thumb">대표</span>
                    <span v-if="form.curatorImageUrl === url" class="modal__img-assign-badge modal__img-assign-badge--curator">큐레이터</span>
                    <button type="button" class="modal__img-assign-del" @click.stop="removeAssignImg(i)">×</button>
                  </div>
                </div>
                <p class="modal__img-assign-hint">💡 클릭 = 대표(썸네일) 지정 · 우클릭 = 큐레이터 지정 · 드래그 = 순서 변경</p>
              </div>
            </div>

            <div class="modal__flags">
              <label class="modal__check"><input type="checkbox" v-model="form.isNew" /><span>NEW</span></label>
              <label class="modal__check"><input type="checkbox" v-model="form.isBest" /><span>BEST</span></label>
              <label class="modal__check">
                <input type="checkbox" v-model="form.isRecommend" @change="onRecommendChange" />
                <span>추천 (큐레이터 선택)</span>
              </label>
            </div>
            <p v-if="form.isRecommend" class="modal__recommend-note">
              <span class="material-symbols-outlined">info</span>
              추천은 브랜드당 1개만 등록 가능합니다. 메인 '큐레이터의 선택'에 노출됩니다.
            </p>
            <p v-if="errorMsg" class="modal__error">{{ errorMsg }}</p>
            <div class="modal__actions">
              <button type="button" class="modal__btn modal__btn--ghost" @click="showModal = false">취소</button>
              <button type="submit" class="modal__btn modal__btn--fill" :disabled="submitting">
                {{ submitting ? '처리 중...' : (isEdit ? '수정 완료' : '등록 완료') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const products = ref([]);
const categories = ref([]);
const search = ref('');
const filterBrand = ref('all');

const brandList = [
  { key: 'BEANPOLE', label: 'BEANPOLE', color: '#103728' },
  { key: 'CARHARTT', label: 'CARHARTT', color: '#9C4F18' },
  { key: "LEVI'S",   label: "LEVI'S",   color: '#8E1C28' },
  { key: 'DICKIES',  label: 'DICKIES',  color: '#1A1A1A' },
];
const showModal = ref(false);
const isEdit = ref(false);
const editId = ref(null);
const submitting = ref(false);
const errorMsg = ref('');
const selectedFiles = ref([]);
const previewUrls = ref([]);
const imgTab = ref('upload');
const serverImages = ref([]);
const serverSelected = ref([]);
const serverFilter = ref('전체');

const serverGroups = computed(() => {
  const groups = new Set(['전체']);
  serverImages.value.forEach(img => { if (img.group) groups.add(img.group); });
  return [...groups];
});

// 현재 선택된 모든 이미지 URL (썸네일/큐레이터 선택용)
const allImageUrls = computed(() => {
  if (imgTab.value === 'server') return serverSelected.value;
  // 업로드 모드: 기존 서버 URL + 새 파일 미리보기
  return previewUrls.value;
});

const filteredServerImages = computed(() => {
  if (serverFilter.value === '전체') return serverImages.value;
  return serverImages.value.filter(img => img.group === serverFilter.value);
});

const form = ref({ id: null, name: '', description: '', category: '', brand: '', size: '', gender: '', price: 0, stock: 0, originalPrice: null, discountRate: null, thumbnailUrl: '', curatorImageUrl: '', colorName: '', colorHex: '#1a1a1a', features: '', composition: '', sizeStocks: [{ size: '', stock: 0 }], isNew: false, isBest: false, isRecommend: false });

// 브랜드 → 국가 사이즈 매핑
const brandCountry = computed(() => {
  const map = { BEANPOLE: 'KR', DICKIES: 'US', CARHARTT: 'UK', "LEVI'S": 'EU' };
  return map[form.value.brand] || 'KR';
});
const sizeCountryLabel = computed(() => {
  return { KR: '한국 KR', US: '미국 US', UK: '영국 UK', EU: '유럽 EU' }[brandCountry.value];
});

const sizeOptions = computed(() => {
  const g = form.value.gender;
  const cat = (form.value.category || '').toLowerCase();
  const isBottom = cat.includes('하의') || cat.includes('팬츠') || cat.includes('데님') || cat.includes('바지') || cat.includes('bottom') || cat.includes('pants') || cat.includes('denim');

  if (isBottom) {
    if (g === '여성') {
      // 여성 바지: US 기준
      const map = { US: ['0','2','4','6','8','10','12'], UK: ['4','6','8','10','12','14','16'], EU: ['32','34','36','38','40','42','44'], KR: ['44','44','55','66','66','77','88'] };
      return map[brandCountry.value] || map.KR;
    } else {
      // 남성 바지
      const map = { US: ['28','30','32','34','36','38'], UK: ['28','30','32','34','36','38'], EU: ['44','46','48','50','52','54'], KR: ['28','30','32','34','36','38'] };
      return map[brandCountry.value] || map.KR;
    }
  }
  // 상의
  if (g === '여성') {
    const map = { US: ['0-2','4-6','6-8','8-10','12-14','16-18'], UK: ['4-6','8-10','10-12','12-14','16-18','20-22'], EU: ['32-34','36','38-40','40-42','42-44','46-48'], KR: ['44','55','66','77','88','99'] };
    return map[brandCountry.value] || map.KR;
  } else {
    const map = { US: ['XS','S','M','L','XL','XXL'], UK: ['XS','S','M','L','XL','XXL'], EU: ['44','46','48-50','52','54-56','58-60'], KR: ['90','95','100','105','110','115'] };
    return map[brandCountry.value] || map.KR;
  }
});

const filtered = computed(() => {
  let list = products.value;
  // 브랜드 필터
  if (filterBrand.value !== 'all') {
    list = list.filter(p => p.brand === filterBrand.value);
  }
  // 검색 필터
  if (search.value) {
    list = list.filter(p => p.name?.toLowerCase().includes(search.value.toLowerCase()));
  }
  return list;
});

onMounted(async () => {
  await loadProducts();
  try { categories.value = await api.get('/categories') || []; } catch {}
});

async function loadProducts() {
  try { products.value = await api.get('/products') || []; } catch { products.value = []; }
}

function openAdd() {
  isEdit.value = false;
  editId.value = null;
  form.value = { id: null, name: '', description: '', category: '', brand: '', size: '', gender: '', price: 0, stock: 0, originalPrice: null, discountRate: null, thumbnailUrl: '', curatorImageUrl: '', colorName: '', colorHex: '#1a1a1a', features: '', composition: '', sizeStocks: [{ size: '', stock: 0 }], isNew: false, isBest: false, isRecommend: false };
  selectedFiles.value = [];
  previewUrls.value = [];
  imgTab.value = 'upload';
  serverSelected.value = [];
  errorMsg.value = '';
  showModal.value = true;
}

async function openEdit(p) {
  isEdit.value = true;
  editId.value = p.id;
  errorMsg.value = '';

  // 상품 상세 API 호출 + productStore에서 mock 이미지도 가져오기
  let detail = p;
  try {
    const res = await api.get(`/products/${p.id}`);
    if (res) detail = res;
  } catch {}

  form.value = {
    id: detail.id, name: detail.name || '', description: detail.description || '', category: detail.categoryName || detail.category || '',
    brand: detail.brand || '', size: detail.size || '', gender: detail.gender || '',
    price: detail.price || 0, stock: detail.stock || 0,
    originalPrice: detail.originalPrice || null, discountRate: detail.discountRate || null,
    thumbnailUrl: detail.thumbnailUrl || '', curatorImageUrl: detail.curatorImageUrl || '',
    colorName: detail.colorName || '', colorHex: detail.colorHex || '#1a1a1a',
    features: Array.isArray(detail.features) ? detail.features.join('\n') : (detail.features || ''),
    composition: Array.isArray(detail.compositionList) ? detail.compositionList.join('\n') : (Array.isArray(detail.composition) ? detail.composition.join('\n') : (detail.composition || '')),
    sizeStocks: detail.sizeStocks?.length ? detail.sizeStocks.map(s => ({ size: s.size, stock: s.stock })) : [{ size: detail.size || '', stock: detail.stock || 0 }],
    isNew: detail.isNew || false, isBest: detail.isBest || false, isRecommend: detail.isRecommend || false,
  };
  selectedFiles.value = [];

  // 전체 이미지 로드
  const imgs = detail.images?.length ? [...detail.images] : (detail.imageUrl ? [detail.imageUrl] : []);
  previewUrls.value = imgs;
  imgTab.value = imgs.length ? 'upload' : 'server';
  serverSelected.value = [...imgs];
  showModal.value = true;
}

function onFileChange(e) {
  const files = Array.from(e.target.files);
  for (const file of files) {
    if (file && file.type.startsWith('image/')) {
      selectedFiles.value.push(file);
      previewUrls.value.push(URL.createObjectURL(file));
    }
  }
  e.target.value = ''; // reset input
}

function onDrop(e) {
  const files = Array.from(e.dataTransfer.files);
  for (const file of files) {
    if (file && file.type.startsWith('image/')) {
      selectedFiles.value.push(file);
      previewUrls.value.push(URL.createObjectURL(file));
    }
  }
}

async function loadServerImages() {
  try {
    const data = await api.get('/admin/files') || [];
    // 이름순 정렬
    data.sort((a, b) => a.name.localeCompare(b.name));
    serverImages.value = data;
  } catch { serverImages.value = []; }
}

function toggleServerImage(url) {
  const idx = serverSelected.value.indexOf(url);
  if (idx === -1) {
    serverSelected.value.push(url);
  } else {
    serverSelected.value.splice(idx, 1);
    // 대표 이미지가 삭제되면 해제
    if (form.value.thumbnailUrl === url) form.value.thumbnailUrl = '';
  }
}

// ── 드래그 순서 변경 ──
const dragStartIdx = ref(-1);
const dragOverIdx = ref(-1);

function onImgDragStart(idx, e) {
  dragStartIdx.value = idx;
  e.dataTransfer.effectAllowed = 'move';
}

function onImgDrop(e) {
  e.preventDefault();
  const from = dragStartIdx.value;
  const to = dragOverIdx.value;
  if (from < 0 || to < 0 || from === to) return;

  // 서버 이미지 모드
  if (imgTab.value === 'server') {
    const item = serverSelected.value.splice(from, 1)[0];
    serverSelected.value.splice(to, 0, item);
  } else {
    // 파일 업로드 모드
    const item = previewUrls.value.splice(from, 1)[0];
    previewUrls.value.splice(to, 0, item);
    if (from < selectedFiles.value.length) {
      const file = selectedFiles.value.splice(from, 1)[0];
      selectedFiles.value.splice(Math.min(to, selectedFiles.value.length), 0, file);
    }
  }
  dragStartIdx.value = -1;
  dragOverIdx.value = -1;
}

function setThumbnail(url) {
  // 이미 대표면 해제
  if (form.value.thumbnailUrl === url) {
    form.value.thumbnailUrl = '';
  } else {
    form.value.thumbnailUrl = url;
  }
}

async function resetRecommend() {
  if (!confirm('모든 상품의 추천(큐레이터) 설정을 초기화하시겠습니까?')) return;
  try {
    await api.delete('/admin/products/recommend/reset');
    alert('추천이 초기화되었습니다. 원하는 상품만 다시 추천 체크해주세요.');
    await loadProducts();
  } catch (e) { alert(e?.message || '초기화 실패'); }
}

// blob: URL은 null로, 빈 문자열도 null로
function buildUrl(url) {
  if (!url || url.startsWith('blob:')) return null;
  return url;
}

function onRecommendChange() {
  if (!form.value.isRecommend) form.value.curatorImageUrl = '';
}

function setCurator(url) {
  if (!form.value.isRecommend) { alert('추천(큐레이터)을 먼저 체크해주세요.'); return; }
  form.value.curatorImageUrl = form.value.curatorImageUrl === url ? '' : url;
}

function removeAssignImg(idx) {
  const url = allImageUrls.value[idx];
  if (form.value.thumbnailUrl === url) form.value.thumbnailUrl = '';
  if (form.value.curatorImageUrl === url) form.value.curatorImageUrl = '';

  if (imgTab.value === 'server') {
    serverSelected.value.splice(idx, 1);
  } else {
    previewUrls.value.splice(idx, 1);
    if (idx < selectedFiles.value.length) selectedFiles.value.splice(idx, 1);
  }
}

function removeFile(index) {
  previewUrls.value.splice(index, 1);
  if (index < selectedFiles.value.length) {
    selectedFiles.value.splice(index, 1);
  }
}

async function submitProduct() {
  if (!form.value.name.trim()) { errorMsg.value = '상품명을 입력해주세요.'; return; }
  if (!form.value.brand) { errorMsg.value = '브랜드를 선택해주세요.'; return; }
  if (!form.value.price || form.value.price <= 0) { errorMsg.value = '가격을 올바르게 입력해주세요. (1원 이상)'; return; }
  if (form.value.stock == null || form.value.stock < 0) { errorMsg.value = '재고를 올바르게 입력해주세요. (0 이상)'; return; }
  if (form.value.discountRate && (form.value.discountRate < 0 || form.value.discountRate > 100)) { errorMsg.value = '할인율은 0~100% 사이로 입력해주세요.'; return; }
  if (!isEdit.value && selectedFiles.value.length === 0 && serverSelected.value.length === 0) { errorMsg.value = '이미지를 최소 1장 등록하거나 서버 이미지를 선택해주세요.'; return; }
  submitting.value = true;
  errorMsg.value = '';

  try {
    const formData = new FormData();

    // JSON DTO를 Blob으로 감싸서 @RequestPart로 전송
    const dto = {
      id: form.value.id || null,
      name: form.value.name,
      description: form.value.description,
      category: form.value.category,
      categoryId: categories.value.find(c => c.name === form.value.category)?.id || null,
      brand: form.value.brand,
      size: form.value.size,
      gender: form.value.gender,
      price: form.value.price,
      stock: form.value.stock,
      discountRate: form.value.discountRate || null,
      thumbnailUrl: buildUrl(form.value.thumbnailUrl),
      colorName: form.value.colorName || null,
      colorHex: form.value.colorHex || null,
      features: Array.isArray(form.value.features) ? form.value.features.join('\n') || null : form.value.features || null,
      composition: Array.isArray(form.value.composition) ? form.value.composition.join('\n') || null : form.value.composition || null,
      sizeStocks: form.value.sizeStocks.filter(s => s.size),
      isNew: form.value.isNew,
      isBest: form.value.isBest,
    };

    // 이미지 URL 처리
    if (imgTab.value === 'server' && serverSelected.value.length > 0) {
      // 서버 이미지 선택 모드
      dto.imageUrl = form.value.thumbnailUrl || serverSelected.value[0];
      dto.imageUrls = serverSelected.value.join(',');
    } else if (isEdit.value && previewUrls.value.length > 0 && selectedFiles.value.length === 0) {
      // 수정 모드 + 새 파일 업로드 없음 → 기존 URL 유지
      const urls = previewUrls.value.filter(u => !u.startsWith('blob:'));
      if (urls.length > 0) {
        dto.imageUrl = form.value.thumbnailUrl || urls[0];
        dto.imageUrls = urls.join(',');
      }
    }

    formData.append('dto', new Blob([JSON.stringify(dto)], { type: 'application/json' }));

    // 파일 업로드 모드 + 새 파일이 있을 때만 전송
    if (selectedFiles.value.length > 0) {
      for (const file of selectedFiles.value) {
        formData.append('images', file);
      }
    }

    const token = localStorage.getItem('token');
    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    // Content-Type은 FormData가 자동 설정 (boundary 포함)

    const BASE = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:8302/api' : '/api');
    const url = isEdit.value ? `${BASE}/admin/products/${editId.value}` : `${BASE}/admin/products`;
    const method = isEdit.value ? 'PUT' : 'POST';

    const res = await fetch(url, { method, headers, body: formData, credentials: 'include' });

    if (!res.ok) {
      const errBody = await res.json().catch(() => null);
      // 필드별 에러 메시지 조합
      if (errBody?.errors) {
        const fieldNames = { name: '상품명', price: '가격', stock: '재고', categoryId: '카테고리', brand: '브랜드' };
        const msgs = Object.entries(errBody.errors).map(([field, msg]) => {
          const label = fieldNames[field] || field;
          return `• ${label}: ${msg}`;
        });
        errorMsg.value = msgs.join('\n');
      } else {
        errorMsg.value = errBody?.message || errBody?.error || `요청 실패 (${res.status}): ${JSON.stringify(errBody)}`;
      }
      submitting.value = false;
      return;
    }

    // 상품 저장 성공 → 추천(큐레이터) 별도 처리
    const savedProduct = await res.json();
    const pid = savedProduct?.id || editId.value;
    if (pid) {
      try {
        if (form.value.isRecommend) {
          const curUrl = buildUrl(form.value.curatorImageUrl) || savedProduct?.imageUrl || null;
          await api.patch(`/admin/products/${pid}/recommend`, { curatorImageUrl: curUrl });
        } else {
          // 추천 해제
          await api.delete(`/admin/products/${pid}/recommend`).catch(() => {});
        }
      } catch {}
    }

    showModal.value = false;
    await loadProducts();
  } catch (e) {
    errorMsg.value = e.message || '등록/수정에 실패했습니다.';
  } finally {
    submitting.value = false;
  }
}

function autoFillSizes() {
  if (!form.value.brand) { alert('브랜드를 먼저 선택해주세요.'); return; }
  if (!form.value.gender) { alert('성별을 먼저 선택해주세요.'); return; }

  // sizeOptions computed에서 브랜드+성별+카테고리 기반 사이즈 가져오기
  const sizes = sizeOptions.value;
  if (!sizes.length) { alert('사이즈를 생성할 수 없습니다. 카테고리를 확인해주세요.'); return; }

  form.value.sizeStocks = sizes.map(s => ({ size: s, stock: 99 }));
  alert(`✅ ${sizes.length}개 사이즈 생성 (${sizeCountryLabel.value})\n${sizes.join(', ')}`);
}

async function changeId(oldId) {
  const newId = prompt(`상품 ID 변경\n\n현재 ID: ${oldId}\n\n새 ID를 입력하세요:`);
  if (!newId) return;
  const num = Number(newId);
  if (!num || num <= 0 || !Number.isInteger(num)) { alert('올바른 숫자를 입력해주세요.'); return; }
  if (num === oldId) { alert('동일한 ID입니다.'); return; }
  try {
    const res = await api.patch(`/admin/products/${oldId}/change-id?newId=${num}`);
    if (res.success) {
      alert(`✅ ${res.message}`);
      await loadProducts();
    } else {
      alert(`❌ ${res.message}`);
    }
  } catch (e) {
    if (e.status === 401) { alert('인증이 만료되었습니다. 다시 로그인해주세요.'); return; }
    alert(`❌ ${e.data?.message || e.message || 'ID 변경 실패'}`);
  }
}

async function del(id) {
  if (!confirm('정말 삭제하시겠습니까?')) return;
  try {
    await api.delete(`/admin/products/${id}`);
    products.value = products.value.filter(p => p.id !== id);
  } catch (e) {
    if (e.status === 401) {
      alert('인증이 만료되었습니다. 관리자 계정으로 다시 로그인해주세요.');
      window.location.href = '/login';
    } else if (e.status === 403) {
      alert('관리자 권한이 필요합니다.');
    } else {
      alert(e.message || '삭제에 실패했습니다.');
    }
  }
}
</script>

<style scoped>
.ap-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; flex-wrap: wrap; gap: 1rem; }
.ap-head__code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.ap-head__title { font-size: 1.75rem; font-weight: 900; }
.ap-head__actions { display: flex; gap: 0.5rem; }
.ap-btn { padding: 0.75rem 1.75rem; background: #111; color: #fff; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; cursor: pointer; transition: opacity 0.2s; }
.ap-btn:hover { opacity: 0.8; }
.ap-btn--ghost { background: #fff; color: #999; border: 1px solid #ddd; }
.ap-btn--ghost:hover { border-color: #e53e3e; color: #e53e3e; opacity: 1; }
.ap-brands { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem; }
.ap-brand-chip {
  padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700;
  letter-spacing: 0.1em; border: 1.5px solid #ddd; cursor: pointer;
  background: #fff; color: #555; transition: all 0.2s;
}
.ap-brand-chip:hover { border-color: #111; color: #111; }
.ap-brand-chip--on { background: #111; border-color: #111; color: #fff; }
.ap-filter { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.ap-input { padding: 0.625rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; outline: none; width: 240px; }
.ap-input:focus { border-color: #111; }
.ap-count { font-size: 0.6875rem; color: #999; }
.ap-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.ap-table { width: 100%; border-collapse: collapse; }
.ap-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.ap-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #bbb; width: 50px; }
.t-img { width: 44px; height: 52px; border-radius: 0.25rem; overflow: hidden; background: #f3f1ec; }
.t-img img { width: 100%; height: 100%; object-fit: cover; }
.t-cat { font-size: 0.6875rem; font-weight: 600; color: #888; }
.t-name { font-weight: 600; color: #111; max-width: 200px; }
.t-brand { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; color: #555; }
.t-sizes { font-size: 0.625rem; color: #888; max-width: 150px; }
.t-r { font-weight: 700; text-align: right; }
.modal__auto-size-btn {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.625rem 1rem; background: #111; color: #fff;
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em;
  border-radius: 0.375rem; cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
}
.modal__auto-size-btn:hover { opacity: 0.8; }
.modal__auto-size-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
.modal__color-row { display: flex; align-items: center; gap: 0.5rem; }
.modal__color-picker { width: 2.5rem; height: 2.5rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; cursor: pointer; padding: 2px; }
.modal__color-text { flex: 1; padding: 0.625rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: monospace; outline: none; }
.modal__color-text:focus { border-color: #111; }
.modal__calc-price { font-size: 1.125rem; font-weight: 900; color: #FF2D2D; padding: 0.5rem 0; }
.t-dc { font-size: 0.5625rem; font-weight: 800; color: #FF2D2D; margin-right: 0.25rem; }
.t-was { font-size: 0.625rem; color: #bbb; text-decoration: line-through; margin-left: 0.25rem; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-flags { display: flex; gap: 0.25rem; }
.t-flag { font-size: 0.4375rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.15rem 0.375rem; border-radius: 0.2rem; }
.t-flag--new { background: #111; color: #fff; }
.t-flag--best { background: #FF2D2D; color: #fff; }
.t-flag--rec { background: #38a169; color: #fff; }
.t-actions { display: flex; gap: 0.5rem; }
.t-id-btn { font-size: 0.625rem; color: #555; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }
.t-id-btn:hover { border-color: #f59e0b; color: #f59e0b; }
.t-edit { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }
.t-edit:hover { border-color: #111; }
.t-del { font-size: 0.625rem; color: #bbb; cursor: pointer; background: none; border: none; }
.t-del:hover { color: #e53e3e; }
.tag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; }
.tag--on { background: #111; color: #fff; }
.tag--off { background: #f0f0f0; color: #bbb; }

/* 모달 */
.modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1.5rem; }
.modal__box { background: #fff; width: 100%; max-width: 800px; border-radius: 0.75rem; overflow: hidden; max-height: 90vh; overflow-y: auto; }
.modal__head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee; }
.modal__head h2 { font-size: 1.125rem; font-weight: 800; }
.modal__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.modal__form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.modal__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.modal__field { display: flex; flex-direction: column; gap: 0.375rem; }
.modal__field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.modal__field input, .modal__field textarea, .modal__field select {
  width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none; transition: border-color 0.2s;
}
.modal__field input:focus, .modal__field textarea:focus { border-color: #111; }
.modal__field textarea { resize: vertical; }

/* 업로드 */
.modal__upload {
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem;
  border: 2px dashed #e8e8e8; border-radius: 0.5rem; padding: 2rem;
  cursor: pointer; transition: border-color 0.2s; min-height: 140px; position: relative;
  color: #ccc;
}
.modal__upload:hover { border-color: #111; }
.modal__upload .material-symbols-outlined { font-size: 2rem; font-variation-settings: "wght" 200; }
.modal__upload p { font-size: 0.6875rem; }
.modal__previews { display: flex; gap: 0.5rem; flex-wrap: wrap; width: 100%; }
.modal__preview-item { position: relative; width: 80px; height: 100px; border-radius: 0.25rem; overflow: hidden; border: 1px solid #eee; }
.modal__preview-item img { width: 100%; height: 100%; object-fit: cover; }
.modal__preview-del { position: absolute; top: 2px; right: 2px; width: 1.25rem; height: 1.25rem; border-radius: 50%; background: rgba(0,0,0,0.6); color: #fff; border: none; cursor: pointer; font-size: 0.75rem; display: flex; align-items: center; justify-content: center; }
.modal__preview-main { position: absolute; bottom: 0; left: 0; right: 0; background: #111; color: #fff; font-size: 0.4375rem; font-weight: 800; text-align: center; padding: 0.125rem; letter-spacing: 0.1em; }

/* 이미지 탭 */
.modal__img-tabs { display: flex; gap: 0; margin-bottom: 0.75rem; }
.modal__img-tab { flex: 1; padding: 0.5rem; font-size: 0.6875rem; font-weight: 600; text-align: center; border: 1.5px solid #e8e8e8; cursor: pointer; transition: all 0.2s; background: #fff; color: #999; }
.modal__img-tab:first-child { border-radius: 0.375rem 0 0 0.375rem; }
.modal__img-tab:last-child { border-radius: 0 0.375rem 0.375rem 0; margin-left: -1.5px; }
.modal__img-tab--on { background: #111; color: #fff; border-color: #111; z-index: 1; }

/* 서버 이미지 */
.modal__server-imgs { border: 1.5px solid #e8e8e8; border-radius: 0.5rem; padding: 1rem; max-height: 400px; overflow-y: auto; }
.modal__server-filter { display: flex; gap: 0.375rem; flex-wrap: wrap; margin-bottom: 0.75rem; }
.modal__server-fbtn { padding: 0.3rem 0.625rem; font-size: 0.5625rem; font-weight: 600; border: 1px solid #e8e8e8; border-radius: 0.25rem; cursor: pointer; background: #fff; color: #999; transition: all 0.2s; }
.modal__server-fbtn:hover { border-color: #111; color: #111; }
.modal__server-fbtn--on { background: #111; color: #fff; border-color: #111; }
.modal__server-empty { text-align: center; color: #ccc; font-size: 0.8125rem; padding: 2rem; }
.modal__server-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem; }
.modal__server-item { position: relative; border-radius: 0.375rem; overflow: hidden; cursor: pointer; border: 2.5px solid transparent; transition: border-color 0.2s; }
.modal__server-item img { width: 100%; aspect-ratio: 3/4; object-fit: cover; display: block; }
.modal__server-item--on { border-color: #111; }
.modal__server-check { position: absolute; top: 4px; right: 4px; width: 1.25rem; height: 1.25rem; border-radius: 50%; background: #111; color: #fff; font-size: 0.625rem; display: flex; align-items: center; justify-content: center; }
.modal__server-name { background: #fafaf8; color: #555; font-size: 0.625rem; padding: 0.375rem 0.5rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-weight: 500; }

/* 플래그 */
.modal__flags { display: flex; gap: 1.25rem; }
.modal__check { display: flex; align-items: center; gap: 0.375rem; font-size: 0.75rem; font-weight: 600; color: #555; cursor: pointer; }
.modal__check input { accent-color: #111; }

/* 사이즈 관리 */
.modal__sizes { border: 1.5px solid #e8e8e8; border-radius: 0.5rem; padding: 1rem; margin-bottom: 0.5rem; }
.modal__sizes-head { display: grid; grid-template-columns: 1fr 80px 30px; gap: 0.5rem; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #999; padding-bottom: 0.5rem; border-bottom: 1px solid #f0f0f0; }
.modal__sizes-row { display: grid; grid-template-columns: 1fr 80px 30px; gap: 0.5rem; align-items: center; padding: 0.375rem 0; }
.modal__sizes-row select, .modal__sizes-row input {
  padding: 0.5rem; border: 1px solid #e8e8e8; border-radius: 0.25rem;
  font-size: 0.75rem; outline: none;
}
.modal__sizes-row select:focus, .modal__sizes-row input:focus { border-color: #111; }
.modal__sizes-del { width: 24px; height: 24px; border-radius: 50%; border: none; background: #f0f0f0; color: #999; cursor: pointer; font-size: 0.875rem; display: flex; align-items: center; justify-content: center; }
.modal__sizes-del:hover { background: #e53e3e; color: #fff; }
.modal__sizes-add { width: 100%; padding: 0.5rem; margin-top: 0.5rem; border: 1.5px dashed #ddd; border-radius: 0.375rem; background: none; font-size: 0.6875rem; font-weight: 600; color: #999; cursor: pointer; transition: all 0.2s; }
.modal__sizes-add:hover { border-color: #111; color: #111; }

/* 이미지 순서 관리 */
.modal__img-assign { padding: 1rem; background: #fafaf8; border-radius: 0.5rem; border: 1px solid #eee; }
.modal__img-assign-row label { display: block; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em; color: #555; margin-bottom: 0.5rem; }
.modal__img-assign-hint { font-size: 0.5625rem; color: #bbb; margin-top: 0.5rem; }
.modal__img-assign-list { display: flex; gap: 0.5rem; flex-wrap: wrap; min-height: 80px; }
.modal__img-assign-item {
  width: 72px; height: 88px; border-radius: 0.375rem; overflow: hidden;
  cursor: grab; border: 2.5px solid #e8e8e8; transition: all 0.2s; position: relative;
}
.modal__img-assign-item:active { cursor: grabbing; opacity: 0.7; }
.modal__img-assign-item img { width: 100%; height: 100%; object-fit: cover; pointer-events: none; }
.modal__img-assign-item--thumb { border-color: #111; box-shadow: 0 0 0 2px #111; }
.modal__img-assign-item--curator { border-color: #c9a86b; }
.modal__img-assign-item--thumb.modal__img-assign-item--curator { border-color: #111; box-shadow: 0 0 0 2px #111, 0 0 0 4px #c9a86b; }
.modal__img-assign-idx {
  position: absolute; top: 3px; left: 3px;
  width: 1rem; height: 1rem; border-radius: 50%; background: rgba(0,0,0,0.5);
  color: #fff; font-size: 0.5rem; font-weight: 800;
  display: flex; align-items: center; justify-content: center;
}
.modal__img-assign-badge {
  position: absolute; bottom: 0; left: 0; right: 0;
  font-size: 0.375rem; font-weight: 800; text-align: center;
  padding: 0.15rem; letter-spacing: 0.08em;
}
.modal__img-assign-badge--thumb { background: #111; color: #fff; }
.modal__img-assign-badge--curator { background: #c9a86b; color: #fff; bottom: auto; top: 0; left: auto; right: 0; width: auto; padding: 0.125rem 0.375rem; border-radius: 0 0.25rem 0 0.25rem; }
.modal__img-assign-del {
  position: absolute; top: 2px; right: 2px;
  width: 1.125rem; height: 1.125rem; border-radius: 50%;
  background: rgba(0,0,0,0.5); color: #fff; border: none;
  cursor: pointer; font-size: 0.625rem; display: flex;
  align-items: center; justify-content: center;
  opacity: 0; transition: opacity 0.2s;
}
.modal__img-assign-item:hover .modal__img-assign-del { opacity: 1; }

.modal__recommend-note {
  display: flex; align-items: center; gap: 0.375rem;
  font-size: 0.6875rem; color: #c9a86b; background: rgba(201,168,107,0.08);
  padding: 0.625rem 0.875rem; border-radius: 0.375rem; border: 1px solid rgba(201,168,107,0.2);
}
.modal__recommend-note .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
.modal__error { font-size: 0.75rem; color: #e53e3e; white-space: pre-line; background: #fef2f2; padding: 0.75rem 1rem; border-radius: 0.375rem; border: 1px solid #fecaca; line-height: 1.6; }
.modal__actions { display: flex; gap: 0.625rem; margin-top: 0.5rem; }
.modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; transition: all 0.2s; }
.modal__btn--fill { background: #111; color: #fff; }
.modal__btn--fill:disabled { opacity: 0.4; cursor: not-allowed; }
.modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.modal__btn--ghost:hover { border-color: #111; color: #111; }
</style>
