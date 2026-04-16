<template>
  <AdminLayout>
    <div class="as">
      <div class="as-head"><p class="as-code">[ 07 / SETTINGS ]</p><h1 class="as-title">설정</h1></div>

      <!-- 탭 -->
      <div class="as-tabs">
        <button class="as-tab" :class="{ 'as-tab--on': tab === 'hero' }" @click="tab = 'hero'">메인 히어로</button>
        <button class="as-tab" :class="{ 'as-tab--on': tab === 'content' }" @click="tab = 'content'">매거진 / 스토리</button>
        <button class="as-tab" :class="{ 'as-tab--on': tab === 'brand' }" @click="tab = 'brand'">브랜드 페이지</button>
        <button class="as-tab" :class="{ 'as-tab--on': tab === 'store' }" @click="tab = 'store'">스토어 정보</button>
        <button class="as-tab" :class="{ 'as-tab--on': tab === 'system' }" @click="tab = 'system'">시스템</button>
      </div>

      <!-- 히어로 이미지 관리 -->
      <div v-if="tab === 'hero'" class="as-hero-wrap">
        <section class="as-sec">
          <h2 class="as-sec__title">메인 히어로 슬라이드 이미지</h2>
          <p class="as-hero__hint">드래그로 순서 변경 · 클릭으로 삭제 · 아래에서 추가</p>

          <div class="as-hero__list">
            <div v-for="(s, i) in heroSlides" :key="i"
              class="as-hero__item"
              draggable="true"
              @dragstart="heroDragStart = i"
              @dragover.prevent
              @drop="heroDropAt(i)"
            >
              <img :src="s.url" />
              <span class="as-hero__item-num">{{ i + 1 }}</span>
              <button type="button" class="as-hero__item-del" @click="heroSlides.splice(i, 1)">×</button>
            </div>
          </div>

          <button type="button" class="as-hero__add-btn" @click="openImagePicker(null, 'addHero')">
            <span class="material-symbols-outlined">add_photo_alternate</span>
            이미지 추가
          </button>
        </section>

        <button class="as-save" @click="saveHeroSlides">
          <span class="material-symbols-outlined">save</span>
          히어로 설정 저장
        </button>
        <p v-if="heroSaveMsg" class="as-save-msg">{{ heroSaveMsg }}</p>
      </div>

      <!-- 매거진 / 스토리 편집 -->
      <div v-if="tab === 'content'" class="as-content-wrap">
        <!-- 매거진 (인덱스) -->
        <section class="as-sec">
          <h2 class="as-sec__title">매거진 (인덱스 페이지)</h2>
          <div v-for="(m, i) in magazineData" :key="i" class="as-content-card">
            <div class="as-content-card__head">
              <span class="as-content-card__num">{{ i + 1 }}</span>
              <span v-if="i === 0" class="as-content-card__badge">대형</span>
            </div>
            <div class="as-content-card__fields">
              <div class="as-field"><label>카테고리</label><input v-model="m.cat" type="text" placeholder="STYLE GUIDE" /></div>
              <div class="as-field"><label>제목</label><input v-model="m.title" type="text" placeholder="제목" /></div>
              <div class="as-field"><label>설명</label><input v-model="m.excerpt" type="text" placeholder="설명 (선택)" /></div>
              <div class="as-field">
                <label>이미지</label>
                <div class="as-content-card__img-row">
                  <img v-if="m.img" :src="m.img" class="as-content-card__preview" />
                  <button type="button" class="as-brand__pick" @click="openImagePicker({ arr: magazineData, idx: i }, 'contentImg')">
                    <span class="material-symbols-outlined">image</span>변경
                  </button>
                  <input v-model="m.img" type="text" placeholder="이미지 URL" class="as-content-card__url" />
                </div>
              </div>
            </div>
          </div>
          <button class="as-save" @click="saveMagazine">
            <span class="material-symbols-outlined">save</span>매거진 저장
          </button>
          <p v-if="magSaveMsg" class="as-save-msg">{{ magSaveMsg }}</p>
        </section>

        <!-- 스토리 (BRAND 페이지) -->
        <section class="as-sec" style="margin-top: 2rem;">
          <h2 class="as-sec__title">Stories of Heritage (BRAND 페이지)</h2>
          <div v-for="(s, i) in storiesData" :key="i" class="as-content-card">
            <div class="as-content-card__head">
              <span class="as-content-card__num">{{ i + 1 }}</span>
            </div>
            <div class="as-content-card__fields">
              <div class="as-field"><label>카테고리</label><input v-model="s.cat" type="text" placeholder="— ARCHIVE" /></div>
              <div class="as-field"><label>제목</label><input v-model="s.title" type="text" placeholder="제목" /></div>
              <div class="as-field"><label>설명</label><input v-model="s.excerpt" type="text" placeholder="설명" /></div>
              <div class="as-field">
                <label>이미지</label>
                <div class="as-content-card__img-row">
                  <img v-if="s.img" :src="s.img" class="as-content-card__preview" />
                  <button type="button" class="as-brand__pick" @click="openImagePicker({ arr: storiesData, idx: i }, 'contentImg')">
                    <span class="material-symbols-outlined">image</span>변경
                  </button>
                  <input v-model="s.img" type="text" placeholder="이미지 URL" class="as-content-card__url" />
                </div>
              </div>
            </div>
          </div>
          <button class="as-save" @click="saveStories">
            <span class="material-symbols-outlined">save</span>스토리 저장
          </button>
          <p v-if="storySaveMsg" class="as-save-msg">{{ storySaveMsg }}</p>
        </section>
      </div>

      <!-- 스토어 정보 -->
      <div v-if="tab === 'store'" class="as-grid">
        <section class="as-sec">
          <h2 class="as-sec__title">스토어 정보</h2>
          <div class="as-field"><label>스토어명</label><input type="text" v-model="storeInfo.name" /></div>
          <div class="as-field"><label>대표자명</label><input type="text" v-model="storeInfo.ceo" /></div>
          <div class="as-field"><label>사업자 번호</label><input type="text" v-model="storeInfo.bizNo" /></div>
          <div class="as-field"><label>고객센터 전화번호</label><input type="text" v-model="storeInfo.phone" /></div>
          <div class="as-field"><label>이메일</label><input type="email" v-model="storeInfo.email" /></div>
          <div class="as-field"><label>주소</label><input type="text" v-model="storeInfo.address" /></div>
        </section>
        <section class="as-sec">
          <h2 class="as-sec__title">결제 설정</h2>
          <div class="as-field"><label>토스 Client Key</label><input type="text" :value="tossKey" disabled /></div>
          <div class="as-field"><label>결제 상태</label>
            <span class="as-status" :class="tossKey && tossKey !== 'test_ck_placeholder' ? 'as-status--on' : 'as-status--off'">
              {{ tossKey && tossKey !== 'test_ck_placeholder' ? '연동 완료' : '테스트 모드' }}
            </span>
          </div>
        </section>
        <button class="as-save" @click="saveStoreInfo">
          <span class="material-symbols-outlined">save</span>
          스토어 정보 저장
        </button>
        <p v-if="storeSaveMsg" class="as-save-msg">{{ storeSaveMsg }}</p>
      </div>

      <!-- 브랜드 페이지 설정 -->
      <div v-if="tab === 'brand'" class="as-brand-wrap">
        <div v-for="b in brandSettings" :key="b.key" class="as-brand">
          <div class="as-brand__head" :style="{ borderLeftColor: b.color }">
            <h3 class="as-brand__name">{{ b.label }}</h3>
            <span class="as-brand__country">{{ b.country }}</span>
          </div>

          <!-- OUR TEAM 이미지 -->
          <div class="as-brand__field">
            <label>OUR TEAM 사진 (메인 페이지)</label>
            <div class="as-brand__img-row">
              <div class="as-brand__preview" v-if="b.teamImage">
                <img :src="b.teamImage" />
                <button type="button" @click="b.teamImage = ''">×</button>
              </div>
              <button type="button" class="as-brand__pick" @click="openImagePicker(b, 'teamImage')">
                <span class="material-symbols-outlined">image</span>
                {{ b.teamImage ? '변경' : '선택' }}
              </button>
            </div>
          </div>

          <!-- 히어로 이미지 -->
          <div class="as-brand__field">
            <label>히어로 이미지 (브랜드 페이지)</label>
            <div class="as-brand__img-row">
              <div class="as-brand__preview" v-if="b.heroImage">
                <img :src="b.heroImage" />
                <button type="button" @click="b.heroImage = ''">×</button>
              </div>
              <button type="button" class="as-brand__pick" @click="openImagePicker(b, 'heroImage')">
                <span class="material-symbols-outlined">image</span>
                {{ b.heroImage ? '변경' : '선택' }}
              </button>
            </div>
          </div>

          <!-- 히어로 높이 -->
          <div class="as-brand__field">
            <label>히어로 높이 (px)</label>
            <div class="as-brand__slider-row">
              <input type="range" v-model.number="b.heroHeight" min="300" max="900" step="50" />
              <span class="as-brand__slider-val">{{ b.heroHeight }}px</span>
            </div>
          </div>

          <!-- 이미지 위치 (위/아래 자르기) -->
          <div class="as-brand__field">
            <label>이미지 위치 (크기 줄일 때 어디를 자를지)</label>
            <div class="as-brand__btn-group">
              <button v-for="pos in positionOptions" :key="pos.value" type="button"
                class="as-brand__col-btn"
                :class="{ 'as-brand__col-btn--on': b.heroPosition === pos.value }"
                @click="b.heroPosition = pos.value"
              >{{ pos.label }}</button>
            </div>
          </div>

          <!-- 상품 그리드 열 수 -->
          <div class="as-brand__field">
            <label>상품 그리드 열 수</label>
            <div class="as-brand__btn-group">
              <button v-for="col in [2,3,4]" :key="col" type="button"
                class="as-brand__col-btn"
                :class="{ 'as-brand__col-btn--on': b.gridCols === col }"
                @click="b.gridCols = col"
              >{{ col }}열</button>
            </div>
          </div>
        </div>

        <button class="as-save" @click="saveBrandSettings">
          <span class="material-symbols-outlined">save</span>
          브랜드 설정 저장
        </button>
        <p v-if="saveMsg" class="as-save-msg">{{ saveMsg }}</p>
      </div>

      <!-- 시스템 정보 -->
      <div v-if="tab === 'system'" class="as-grid">
        <section class="as-sec">
          <h2 class="as-sec__title">시스템 정보</h2>
          <div class="as-info"><span>프론트엔드</span><span>Vue.js 3 + Vite</span></div>
          <div class="as-info"><span>백엔드</span><span>Spring Boot 3 + PostgreSQL</span></div>
          <div class="as-info"><span>인증</span><span>JWT + Spring Security</span></div>
          <div class="as-info"><span>결제</span><span>토스페이먼츠</span></div>
          <div class="as-info"><span>버전</span><span>v1.0.0</span></div>
        </section>
      </div>

      <!-- 이미지 선택 모달 -->
      <Teleport to="body">
        <div v-if="showPicker" class="as-picker" @click.self="showPicker = false">
          <div class="as-picker__box">
            <header class="as-picker__head">
              <h2>이미지 선택</h2>
              <button @click="showPicker = false"><span class="material-symbols-outlined">close</span></button>
            </header>
            <div class="as-picker__filter">
              <button type="button" v-for="g in pickerGroups" :key="g"
                class="as-picker__fbtn" :class="{ 'as-picker__fbtn--on': pickerFilter === g }"
                @click.stop="pickerFilter = g"
              >{{ g }}</button>
            </div>
            <div class="as-picker__grid">
              <div v-for="img in filteredPickerImages" :key="img.url"
                class="as-picker__item"
                @click="selectPickerImage(img.url)"
              >
                <img :src="img.url" />
                <p>{{ img.url.split('/').slice(-2).join('/') }}</p>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted, reactive } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const tab = ref('hero');
const tossKey = ref('');
const saveMsg = ref('');
const heroSaveMsg = ref('');
const storeSaveMsg = ref('');

// ── DB 저장/로드 헬퍼 ──
async function dbLoad(key, fallback) {
  try {
    const res = await api.get(`/settings/${key}`);
    if (res?.value) return JSON.parse(res.value);
  } catch {}
  return fallback;
}
async function dbSave(key, data) {
  await api.put(`/admin/settings/${key}`, { value: JSON.stringify(data) });
}

// ── 스토어 정보 ──
const defaultStoreInfo = { name: 'FORME', ceo: '김보경', bizNo: '000-00-00000', phone: '1588-0000', email: 'info@forme.kr', address: '서울특별시 강남구 테헤란로 000' };
const storeInfo = ref({ ...defaultStoreInfo });

async function saveStoreInfo() {
  try {
    await dbSave('store_info', storeInfo.value);
    storeSaveMsg.value = '✅ 저장되었습니다!';
  } catch { storeSaveMsg.value = '❌ 저장 실패'; }
  setTimeout(() => { storeSaveMsg.value = ''; }, 2000);
}

// ── 히어로 슬라이드 ──
const heroDragStart = ref(-1);

const defaultHero = [
  { url: "/new/home/hero_01.jpg", alt: "히어로 1" },
  { url: "/new/home/hero_04.jpg", alt: "히어로 2" },
  { url: "/new/home/hero_11.jpg", alt: "히어로 3" },
  { url: "/new/home/hero_12.jpg", alt: "히어로 4" },
  { url: "/new/home/hero_13.jpg", alt: "히어로 5" },
  { url: "/new/home/hero_15.jpg", alt: "히어로 6" },
  { url: "/new/home/hero_16.jpg", alt: "히어로 7" },
  { url: "/new/home/hero_18.jpg", alt: "히어로 8" },
  { url: "/new/home/hero_21.jpg", alt: "히어로 9" },
  { url: "/new/home/hero_22.jpg", alt: "히어로 10" },
  { url: "/new/home/hero_24.jpg", alt: "히어로 11" },
  { url: "/new/home/hero_27.jpg", alt: "히어로 12" },
  { url: "/new/home/hero_28.jpg", alt: "히어로 13" },
  { url: "/new/home/hero_40.jpg", alt: "히어로 14" },
  { url: "/new/home/hero_48.jpg", alt: "히어로 15" },
];

const heroSlides = ref(defaultHero.map(h => ({ ...h })));

function heroDropAt(to) {
  const from = heroDragStart.value;
  if (from < 0 || from === to) return;
  const item = heroSlides.value.splice(from, 1)[0];
  heroSlides.value.splice(to, 0, item);
  heroDragStart.value = -1;
}

// ── 매거진 / 스토리 ──
const magSaveMsg = ref('');
const storySaveMsg = ref('');

const defaultMagazine = [
  { cat: "STYLE GUIDE", title: "봄을 입는 가장 쉬운 방법", excerpt: "칼하트 워크웨어부터 빈폴 클래식까지.", lg: true, img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "LOOKBOOK", title: "2026 SS Collection", excerpt: "", lg: false, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { cat: "BRAND STORY", title: "워크웨어의 정직함", excerpt: "", lg: false, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
];
const defaultStories = [
  { cat: "— ARCHIVE", title: "워크웨어, 노동의 미학", excerpt: "한 세기를 견뎌온 소재와 봉제. 시간이 만든 단단한 정직함.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "— STYLE", title: "2026, 절제의 봄", excerpt: "덜어낼수록 깊어지는 봄의 옷장.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { cat: "— BRAND STORY", title: "데님, 150년의 푸른 역사", excerpt: "광부의 옷에서 세기의 클래식이 되기까지.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
];
const magazineData = ref([...defaultMagazine]);
const storiesData = ref([...defaultStories]);

async function saveMagazine() {
  try { await dbSave('magazine', magazineData.value); magSaveMsg.value = '✅ 매거진 저장 완료!'; }
  catch { magSaveMsg.value = '❌ 저장 실패'; }
  setTimeout(() => { magSaveMsg.value = ''; }, 2000);
}
async function saveStories() {
  try { await dbSave('stories', storiesData.value); storySaveMsg.value = '✅ 스토리 저장 완료!'; }
  catch { storySaveMsg.value = '❌ 저장 실패'; }
  setTimeout(() => { storySaveMsg.value = ''; }, 2000);
}
async function saveHeroSlides() {
  try { await dbSave('hero_slides', heroSlides.value); heroSaveMsg.value = '✅ 저장되었습니다!'; }
  catch { heroSaveMsg.value = '❌ 저장 실패'; }
  setTimeout(() => { heroSaveMsg.value = ''; }, 2000);
}

// ── 브랜드 설정 ──

const positionOptions = [
  { value: 'center top', label: '위 유지 (아래 자름)' },
  { value: 'center center', label: '중앙 (위아래 자름)' },
  { value: 'center bottom', label: '아래 유지 (위 자름)' },
];

const defaultSettings = [
  { key: 'beanpole', label: 'BEANPOLE', country: '한국 🇰🇷', color: '#103728', teamImage: '/main1.jpg', heroImage: '/images/beanpole/beanpole_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 },
  { key: 'carhartt', label: 'CARHARTT', country: '영국 🇬🇧', color: '#9C4F18', teamImage: '/main2.jpg', heroImage: '/images/carhartt/carhero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 },
  { key: 'levis', label: "LEVI'S", country: '유럽 🇪🇺', color: '#8E1C28', teamImage: '/main3.jpg', heroImage: '/images/levis/levis_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 },
  { key: 'dickies', label: 'DICKIES', country: '미국 🇺🇸', color: '#1A1A1A', teamImage: '/main4.jpg', heroImage: '/images/dickies/dickies_hero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 },
];

const brandSettings = ref(defaultSettings.map(s => ({ ...s })));

async function saveBrandSettings() {
  try { await dbSave('brand_settings', brandSettings.value); saveMsg.value = '✅ 저장되었습니다!'; }
  catch { saveMsg.value = '❌ 저장 실패'; }
  setTimeout(() => { saveMsg.value = ''; }, 2000);
}

// ── 이미지 선택 모달 ──
const showPicker = ref(false);
const pickerImages = ref([]);
const pickerFilter = ref('전체');
let pickerTarget = null;

const pickerGroups = computed(() => {
  const groups = new Set(['전체']);
  pickerImages.value.forEach(img => { if (img.group) groups.add(img.group); });
  return [...groups];
});

const filteredPickerImages = computed(() => {
  if (pickerFilter.value === '전체') return pickerImages.value;
  return pickerImages.value.filter(img => img.group === pickerFilter.value);
});

async function openImagePicker(brand, field) {
  pickerTarget = { brand, field };
  pickerFilter.value = '전체';
  if (!pickerImages.value.length) {
    try { pickerImages.value = await api.get('/admin/files') || []; } catch {}
  }
  showPicker.value = true;
}

function selectPickerImage(url) {
  if (pickerTarget) {
    if (pickerTarget.field === 'addHero') {
      heroSlides.value.push({ url, alt: url.split('/').pop() });
    } else if (pickerTarget.field === 'contentImg') {
      pickerTarget.brand.arr[pickerTarget.brand.idx].img = url;
    } else {
      pickerTarget.brand[pickerTarget.field] = url;
    }
  }
  showPicker.value = false;
}

onMounted(async () => {
  try { const r = await api.get('/payment/client-key'); tossKey.value = r.clientKey; } catch {}
  // DB에서 설정 로드
  storeInfo.value = await dbLoad('store_info', defaultStoreInfo);
  heroSlides.value = await dbLoad('hero_slides', defaultHero.map(h => ({ ...h })));
  magazineData.value = await dbLoad('magazine', defaultMagazine);
  storiesData.value = await dbLoad('stories', defaultStories);
  brandSettings.value = await dbLoad('brand_settings', defaultSettings.map(s => ({ ...s })));
});
</script>

<style scoped>
.as-head { margin-bottom: 1.5rem; }
.as-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.as-title { font-size: 1.75rem; font-weight: 900; }

/* 탭 */
.as-tabs { display: flex; gap: 0; border-bottom: 1px solid #eee; margin-bottom: 2rem; }
.as-tab {
  padding: 0.75rem 1.5rem; font-size: 0.75rem; font-weight: 600; color: #999;
  cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;
  background: none; border-top: none; border-left: none; border-right: none;
}
.as-tab:hover { color: #111; }
.as-tab--on { color: #111; border-bottom-color: #111; }

/* 그리드 */
.as-grid { display: flex; flex-direction: column; gap: 1.5rem; }
.as-sec { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; padding: 1.5rem; }
.as-sec__title { font-size: 0.875rem; font-weight: 800; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #f0f0f0; }
.as-field { display: flex; flex-direction: column; gap: 0.375rem; margin-bottom: 1rem; }
.as-field label { font-size: 0.6875rem; font-weight: 600; color: #999; }
.as-field input { padding: 0.75rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; color: #111; background: #fafaf8; }
.as-status { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.375rem 0.75rem; display: inline-block; margin-top: 0.25rem; }
.as-status--on { background: #38a169; color: #fff; }
.as-status--off { background: #f0f0f0; color: #999; }
.as-info { display: flex; justify-content: space-between; padding: 0.625rem 0; border-bottom: 1px solid #f5f5f5; font-size: 0.8125rem; }
.as-info span:first-child { color: #999; }
.as-info span:last-child { font-weight: 600; color: #111; }

/* 히어로 관리 */
.as-hero-wrap { max-width: 900px; }
.as-hero__hint { font-size: 0.6875rem; color: #999; margin-bottom: 1.25rem; }
.as-hero__list { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem; margin-bottom: 1.5rem; }
@media (max-width: 768px) { .as-hero__list { grid-template-columns: repeat(3, 1fr); } }
.as-hero__item { position: relative; aspect-ratio: 16/9; border-radius: 0.375rem; overflow: hidden; cursor: grab; border: 2px solid #eee; transition: border-color 0.2s; }
.as-hero__item:hover { border-color: #111; }
.as-hero__item:active { cursor: grabbing; }
.as-hero__item img { width: 100%; height: 100%; object-fit: cover; }
.as-hero__item-num { position: absolute; top: 4px; left: 4px; width: 1.25rem; height: 1.25rem; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; font-size: 0.5rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.as-hero__item-del { position: absolute; top: 4px; right: 4px; width: 1.25rem; height: 1.25rem; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; border: none; cursor: pointer; font-size: 0.625rem; display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.2s; }
.as-hero__item:hover .as-hero__item-del { opacity: 1; }
.as-hero__item-del:hover { background: #e53e3e; }
.as-hero__add-btn { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.75rem 1.5rem; border: 2px dashed #ddd; border-radius: 0.5rem; background: none; font-size: 0.75rem; font-weight: 600; color: #999; cursor: pointer; transition: all 0.2s; }
.as-hero__add-btn:hover { border-color: #111; color: #111; }
.as-hero__add-btn .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; }

/* 매거진/스토리 편집 */
.as-content-wrap { max-width: 900px; }
.as-content-card { border: 1px solid #eee; border-radius: 0.5rem; padding: 1.25rem; margin-bottom: 1rem; }
.as-content-card__head { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; }
.as-content-card__num { width: 1.5rem; height: 1.5rem; border-radius: 50%; background: #111; color: #fff; font-size: 0.625rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.as-content-card__badge { font-size: 0.5rem; font-weight: 800; background: #FF2D2D; color: #fff; padding: 0.15rem 0.5rem; border-radius: 0.2rem; }
.as-content-card__fields { display: flex; flex-direction: column; gap: 0.75rem; }
.as-content-card__img-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
.as-content-card__preview { width: 100px; height: 60px; object-fit: cover; border-radius: 0.25rem; border: 1px solid #eee; }
.as-content-card__url { flex: 1; min-width: 200px; padding: 0.5rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.6875rem; outline: none; }
.as-content-card__url:focus { border-color: #111; }

/* 브랜드 설정 */
.as-brand-wrap { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
@media (max-width: 900px) { .as-brand-wrap { grid-template-columns: 1fr; } }

.as-brand { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; padding: 1.5rem; }
.as-brand__head { display: flex; align-items: center; justify-content: space-between; border-left: 4px solid; padding-left: 1rem; margin-bottom: 1.5rem; }
.as-brand__name { font-size: 1rem; font-weight: 900; }
.as-brand__country { font-size: 0.625rem; color: #999; }

.as-brand__field { margin-bottom: 1.25rem; }
.as-brand__field label { display: block; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em; color: #999; margin-bottom: 0.5rem; }

.as-brand__img-row { display: flex; align-items: center; gap: 0.75rem; }
.as-brand__preview { position: relative; width: 120px; height: 70px; border-radius: 0.375rem; overflow: hidden; border: 1px solid #eee; }
.as-brand__preview img { width: 100%; height: 100%; object-fit: cover; }
.as-brand__preview button { position: absolute; top: 2px; right: 2px; width: 1.125rem; height: 1.125rem; border-radius: 50%; background: rgba(0,0,0,0.5); color: #fff; border: none; cursor: pointer; font-size: 0.625rem; display: flex; align-items: center; justify-content: center; }

.as-brand__pick {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.5rem 1rem; border: 1.5px dashed #ddd; border-radius: 0.375rem;
  font-size: 0.6875rem; font-weight: 600; color: #999; cursor: pointer;
  background: none; transition: all 0.2s;
}
.as-brand__pick:hover { border-color: #111; color: #111; }
.as-brand__pick .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

.as-brand__slider-row { display: flex; align-items: center; gap: 1rem; }
.as-brand__slider-row input[type="range"] { flex: 1; accent-color: #111; }
.as-brand__slider-val { font-size: 0.8125rem; font-weight: 800; color: #111; min-width: 55px; }

.as-brand__btn-group { display: flex; gap: 0.375rem; }
.as-brand__col-btn {
  padding: 0.5rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.6875rem; font-weight: 600; color: #999; cursor: pointer;
  background: #fff; transition: all 0.2s;
}
.as-brand__col-btn:hover { border-color: #111; color: #111; }
.as-brand__col-btn--on { background: #111; border-color: #111; color: #fff; }

.as-save {
  grid-column: 1 / -1; display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.875rem 2.5rem; background: #111; color: #fff;
  font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem;
  cursor: pointer; transition: opacity 0.2s; justify-self: start;
}
.as-save:hover { opacity: 0.8; }
.as-save .material-symbols-outlined { font-size: 1.125rem; font-variation-settings: "wght" 300; }
.as-save-msg { grid-column: 1 / -1; font-size: 0.75rem; color: #38a169; font-weight: 600; margin-top: 0.5rem; }

/* 이미지 선택 모달 */
.as-picker { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 9999; padding: 1.5rem; }
.as-picker__box { background: #fff; width: 100%; max-width: 900px; border-radius: 0.75rem; overflow: hidden; max-height: 85vh; display: flex; flex-direction: column; }
.as-picker__head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee; }
.as-picker__head h2 { font-size: 1.125rem; font-weight: 800; }
.as-picker__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.as-picker__filter { display: flex; gap: 0.375rem; flex-wrap: wrap; padding: 1rem 1.5rem; border-bottom: 1px solid #eee; }
.as-picker__fbtn { padding: 0.3rem 0.625rem; font-size: 0.5625rem; font-weight: 600; border: 1px solid #e8e8e8; border-radius: 0.25rem; cursor: pointer; background: #fff; color: #999; }
.as-picker__fbtn:hover { border-color: #111; color: #111; }
.as-picker__fbtn--on { background: #111; color: #fff; border-color: #111; }
.as-picker__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.5rem; padding: 1rem 1.5rem; overflow-y: auto; }
.as-picker__item { cursor: pointer; border: 2px solid transparent; border-radius: 0.25rem; overflow: hidden; transition: border-color 0.2s; }
.as-picker__item:hover { border-color: #111; }
.as-picker__item img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.as-picker__item p { font-size: 0.375rem; color: #999; padding: 0.125rem 0.25rem; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
</style>
