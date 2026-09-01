<template>
  <main class="f32-layout" :style="{ '--nav-accent': navAccent }">
    <!-- ═══ 데모 배너 ═══ -->
    <div class="demo-banner">
      <span>관리자 계정 &nbsp;|&nbsp; <b>admin@forme.com</b> &nbsp;/&nbsp; <b>12345678</b></span>
    </div>
    <!-- ═══ 헤더 ═══ -->
    <header class="f32-topbar">
      <div class="f32-topbar__main">
        <div></div>
        <RouterLink to="/" class="f32-topbar__logo">FORME</RouterLink>
        <div class="f32-topbar__right">
          <!-- 인라인 검색 -->
          <div class="f32-search-inline" :class="{ 'f32-search-inline--open': showSearch }">
            <input
              v-if="showSearch"
              v-model="searchQuery"
              type="text"
              placeholder="검색..."
              class="f32-search-inline__input"
              ref="searchInput"
              @keyup.enter="doSearch"
              @keyup.escape="showSearch = false"
            />
            <div v-if="showSearch && searchResults.length" class="f32-search-inline__drop">
              <RouterLink
                v-for="p in searchResults" :key="p.id"
                :to="`/products/${p.id}`"
                class="f32-search-inline__item"
                @click="showSearch = false; searchQuery = '';"
              >
                <img :src="p.thumbnailUrl || p.imageUrl || p.image" />
                <div>
                  <p class="f32-search-inline__name">{{ p.name }}</p>
                  <p class="f32-search-inline__price">₩{{ p.price?.toLocaleString() }}</p>
                </div>
              </RouterLink>
            </div>
            <p v-if="showSearch && searchQuery.trim() && !searchResults.length" class="f32-search-inline__empty">검색 결과 없음</p>
          </div>
          <span class="material-symbols-outlined f32-topbar__mi" @click="toggleSearch">search</span>
          <span class="f32-topbar__mi-wish" @click="panelStore.toggle('wishlist')">
            <span class="material-symbols-outlined f32-topbar__mi">favorite_border</span>
            <em v-if="wishCount > 0">{{ wishCount }}</em>
          </span>
          <span class="material-symbols-outlined f32-topbar__mi" @click="isLoggedIn ? panelStore.toggle('mypage') : $router.push('/login')">person_outline</span>
          <span class="f32-topbar__mi-cart" @click="panelStore.toggle('cart')">
            <span class="material-symbols-outlined f32-topbar__mi">shopping_bag</span>
            <em v-if="cartCount > 0">{{ cartCount }}</em>
          </span>
        </div>
      </div>
      <nav class="f32-catnav">
        <RouterLink to="/brand-story" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/brand-story' }">BRAND</RouterLink>
        <RouterLink to="/new" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/new' }">NEW</RouterLink>
        <RouterLink to="/best" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/best' }">BEST</RouterLink>
        <RouterLink to="/beanpole" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/beanpole' }">BEANPOLE</RouterLink>
        <RouterLink to="/carhartt" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/carhartt' }">CARHARTT</RouterLink>
        <RouterLink to="/levis" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/levis' }">LEVI'S</RouterLink>
        <RouterLink to="/dickies" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/dickies' }">DICKIES</RouterLink>
        <RouterLink to="/sale" class="f32-catnav__link f32-catnav__link--sale" :class="{ 'f32-catnav__link--active': route.path === '/sale' }">SALE</RouterLink>
      </nav>
    </header>

    <!-- ═══ 슬라이드 패널 ═══ -->
    <SlidePanel />

    <!-- ═══ 본문 (각 페이지 콘텐츠) ═══ -->
    <slot />

    <!-- ═══ 푸터 ═══ -->
    <footer class="f32-foot">
      <div class="f32-foot__top">
        <div class="f32-foot__brand">
          <h3 class="f32-foot__logo">FORME</h3>
          <p class="f32-foot__slogan">The Best of Everything.</p>
        </div>
        <div class="f32-foot__grid">
          <div class="f32-foot__col">
            <h4>SERVICE</h4>
            <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a>
          </div>
          <div class="f32-foot__col">
            <h4>SUPPORT</h4>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">Q&A</RouterLink>
            <RouterLink to="/board">게시판</RouterLink>
          </div>
          <div class="f32-foot__col">
            <h4>ABOUT</h4>
            <RouterLink to="/brand-story">브랜드 스토리</RouterLink>
          </div>
        </div>
      </div>
      <div class="f32-foot__bottom">
        <p>(주){{ storeInfo.name }} | 대표 {{ storeInfo.ceo }} | 사업자등록번호 {{ storeInfo.bizNo }}</p>
        <p>{{ storeInfo.address }} | © 2026 {{ storeInfo.name }}. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { computed, ref, nextTick, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { usePanelStore } from "@/stores/panelStore";
import SlidePanel from "@/components/SlidePanel.vue";
import { searchProducts } from "@/utils/productFilters";

const route = useRoute();
const router = useRouter();

const showSearch = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const allProducts = ref([]);

// allProducts/searchQuery가 바뀔 때마다 자동으로 다시 계산되는 computed라, 상품 목록을
// 아직 불러오는 도중에 검색어를 입력해도(그땐 allProducts가 비어있었음) 로딩이 끝나는 순간
// 자연히 다시 반영된다 — 예전엔 이걸 ref에 수동으로 담아서, 로딩 완료 시점에 다시 채워주는
// 코드를 별도로 챙겨야 했고 빼먹으면 결과가 빈 채로 남는 버그가 있었음
const searchResults = computed(() => searchProducts(allProducts.value, searchQuery.value).slice(0, 8));

function toggleSearch() {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => searchInput.value?.focus());
    if (!allProducts.value.length) loadAllProducts();
  } else {
    searchQuery.value = '';
  }
}

async function loadAllProducts() {
  try {
    const { useProductStore } = await import('@/stores/productStore');
    const ps = useProductStore();
    // 이미 불러온 목록이 있으면 재요청하지 않는다 — ps.fetchProducts()는 ps.isLoading도 같이
    // 켜는데, 마침 /products 화면(ProductsView.vue)이 이 값으로 상품 그리드를 숨기고 로딩
    // 스피너를 보여주기 때문에, 검색창을 여는 것만으로 이미 보이던 상품 목록이 잠깐 사라졌다
    // 다시 나타나는 깜빡임이 생김. 목록이 아직 없어서(0건) 새로 요청해야 하는 경우엔
    // productStore.fetchProducts() 자체가 이미 진행 중인 요청을 중복 요청하지 않고 같이
    // 기다려주므로(productStore.js 참고), /products가 막 자기 목록을 불러오는 도중에 검색창을
    // 열어도 안전하다
    if (!ps.products.length) await ps.fetchProducts();
    allProducts.value = ps.filteredProducts || [];
  } catch {}
}

function doSearch() {
  if (!searchQuery.value.trim()) return;
  showSearch.value = false;
  router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
  searchQuery.value = '';
}
const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();

const panelStore = usePanelStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const cartCount = computed(() => cartStore.totalCount);
const wishCount = computed(() => wishlistStore.count);

// 브랜드 페이지별 네비 액센트 색상
const brandColors = {
  '/beanpole': '#103728',
  '/carhartt': '#9C4F18',
  '/levis': '#8E1C28',
  '/dickies': '#1A1A1A',
};
const navAccent = computed(() => brandColors[route.path] || '#111');

// 스토어 정보 (푸터용) — DB에서 로드
const defaultStoreInfo = { name: 'FORME', ceo: '김보경', bizNo: '000-00-00000', phone: '1588-0000', email: 'info@forme.kr', address: '서울특별시 강남구 테헤란로 000' };
const storeInfo = ref(defaultStoreInfo);
onMounted(async () => {
  try {
    const r = await api.get('/settings/store_info');
    if (r?.value) storeInfo.value = JSON.parse(r.value);
  } catch {}
});
</script>

<style>
/* ════════════════════════════════
   Forme32 Layout — 공통 헤더/푸터
   (scoped 아님 — 하위 페이지에서도 적용)
   ════════════════════════════════ */
.demo-banner {
  background: #111;
  color: #f5f5f5;
  text-align: center;
  font-size: 0.78rem;
  letter-spacing: 0.04em;
  padding: 7px 16px;
}
.demo-banner b { color: #fff; }
.f32-layout {
  background: #fff;
  color: #111;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* 헤더 */
.f32-topbar { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid #eee; }
.f32-topbar__main { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0.625rem 1rem; }
.f32-topbar__logo { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.03em; text-align: center; color: #111; text-decoration: none; }
.f32-topbar__right { display: flex; align-items: center; justify-content: flex-end; gap: 0.75rem; }
@media (min-width: 768px) {
  .f32-topbar__main { padding: 0.875rem 2.5rem; }
  .f32-topbar__logo { font-size: 1.625rem; }
  .f32-topbar__right { gap: 1.25rem; }
}
.f32-topbar__mi {
  font-size: 1.25rem;
  color: #333;
  cursor: pointer;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
  transition: opacity 0.2s;
}
.f32-topbar__mi:hover { opacity: 0.5; }
.f32-topbar__mi-wish { position: relative; cursor: pointer; display: flex; align-items: center; }
.f32-topbar__mi-wish em {
  position: absolute; top: -6px; right: -8px;
  background: #FF2D2D; color: #fff;
  font-size: 0.5rem; font-weight: 800; font-style: normal;
  padding: 0.0625rem 0.3125rem; border-radius: 999px;
}
.f32-topbar__mi-cart { position: relative; cursor: pointer; display: flex; align-items: center; }
.f32-topbar__mi-cart em {
  position: absolute; top: -6px; right: -8px;
  background: #FF2D2D; color: #fff;
  font-size: 0.5rem; font-weight: 800; font-style: normal;
  padding: 0.0625rem 0.3125rem; border-radius: 999px;
}

/* 인라인 검색 */
.f32-search-inline { position: relative; display: flex; align-items: center; }
.f32-search-inline__input {
  width: 0; border: none; padding: 0; font-size: 0.8125rem; outline: none;
  transition: width 0.3s, padding 0.3s; background: transparent;
}
.f32-search-inline--open .f32-search-inline__input {
  width: 120px; padding: 0.375rem 0.75rem;
  border-bottom: 1.5px solid #111;
}
@media (min-width: 768px) {
  .f32-search-inline--open .f32-search-inline__input { width: 200px; }
}
.f32-search-inline__input::placeholder { color: #ccc; }
.f32-search-inline__drop {
  position: absolute; top: 100%; right: 0; margin-top: 0.5rem;
  width: min(320px, calc(100vw - 2rem)); max-height: 400px; overflow-y: auto;
  background: #fff; border: 1px solid #eee; border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 100;
}
.f32-search-inline__item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1rem; text-decoration: none; color: inherit;
  transition: background 0.15s; border-bottom: 1px solid #f5f5f5;
}
.f32-search-inline__item:hover { background: #fafaf8; }
.f32-search-inline__item img { width: 40px; height: 48px; object-fit: cover; border-radius: 0.25rem; flex-shrink: 0; }
.f32-search-inline__name { font-size: 0.75rem; font-weight: 600; color: #111; margin-bottom: 0.125rem; }
.f32-search-inline__price { font-size: 0.6875rem; font-weight: 700; color: #555; }
.f32-search-inline__empty {
  position: absolute; top: 100%; right: 0; margin-top: 0.5rem;
  width: min(320px, calc(100vw - 2rem)); padding: 2rem; text-align: center;
  background: #fff; border: 1px solid #eee; border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 100;
  font-size: 0.75rem; color: #bbb;
}

/* 카테고리 네비 */
.f32-catnav {
  display: flex; justify-content: flex-start; gap: 0; border-top: 1px solid #eee;
  overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none;
}
.f32-catnav::-webkit-scrollbar { display: none; }
.f32-catnav__link {
  flex-shrink: 0;
  padding: 0.75rem 1rem; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.05em;
  color: #333; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s;
  text-decoration: none;
}
.f32-catnav__link:hover { border-bottom-color: var(--nav-accent, #111); }
.f32-catnav__link--active { color: var(--nav-accent, #111); border-bottom-color: var(--nav-accent, #111); }
.f32-catnav__link--sale { color: #FF2D2D; }
@media (min-width: 768px) {
  .f32-catnav { justify-content: center; overflow-x: visible; }
  .f32-catnav__link { padding: 0.875rem 1.5rem; font-size: 0.8125rem; }
}

/* 푸터 */
.f32-foot { background: #111; color: #f5f5f5; padding: 3rem 1.25rem 1.5rem; }
.f32-foot__top { display: grid; grid-template-columns: 1fr; gap: 2rem; max-width: 1600px; margin: 0 auto 2rem; padding-bottom: 2rem; border-bottom: 1px solid #333; }
.f32-foot__logo { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
.f32-foot__slogan { font-size: 0.75rem; color: #888; }
.f32-foot__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; }
.f32-foot__col h4 { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 1rem; color: #FF2D2D; }
.f32-foot__col a { display: block; font-size: 0.6875rem; color: #ccc; margin-bottom: 0.5rem; cursor: pointer; transition: color 0.2s; text-decoration: none; }
.f32-foot__col a:hover { color: #fff; }
.f32-foot__bottom { max-width: 1600px; margin: 0 auto; font-size: 0.5625rem; color: #666; line-height: 1.8; text-align: center; }
@media (min-width: 768px) {
  .f32-foot { padding: 5rem 3rem 2rem; }
  .f32-foot__top { grid-template-columns: 1.5fr 3fr; gap: 4rem; margin: 0 auto 3rem; padding-bottom: 3rem; }
  .f32-foot__logo { font-size: 2.25rem; }
  .f32-foot__grid { grid-template-columns: repeat(3, 1fr); gap: 2rem; }
}
</style>
