<template>
  <main class="f32-layout" :style="{ '--nav-accent': navAccent }">
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
              @input="onSearchInput"
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
            <p v-if="showSearch && searchQuery && !searchResults.length" class="f32-search-inline__empty">검색 결과 없음</p>
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
        <RouterLink to="/products" class="f32-catnav__link" :class="{ 'f32-catnav__link--active': route.path === '/products' }">BRAND</RouterLink>
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
            <a>브랜드 스토리</a>
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
import { computed, ref, nextTick, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { usePanelStore } from "@/stores/panelStore";
import SlidePanel from "@/components/SlidePanel.vue";

const route = useRoute();
const router = useRouter();

const showSearch = ref(false);
const searchQuery = ref('');
const searchInput = ref(null);
const searchResults = ref([]);
const allProducts = ref([]);

function toggleSearch() {
  showSearch.value = !showSearch.value;
  if (showSearch.value) {
    nextTick(() => searchInput.value?.focus());
    if (!allProducts.value.length) loadAllProducts();
  } else {
    searchQuery.value = '';
    searchResults.value = [];
  }
}

async function loadAllProducts() {
  try {
    const { useProductStore } = await import('@/stores/productStore');
    const ps = useProductStore();
    await ps.fetchProducts();
    allProducts.value = ps.filteredProducts || [];
  } catch {}
}

const brandKorMap = { '빈폴': 'BEANPOLE', '칼하트': 'CARHARTT', '리바이스': "LEVI'S", '리바이': "LEVI'S", '디키즈': 'DICKIES' };

function onSearchInput() {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) { searchResults.value = []; return; }
  // 한국어 브랜드명 → 영문 변환
  const brandMatch = Object.entries(brandKorMap).find(([kor]) => q.includes(kor));
  const brandEng = brandMatch ? brandMatch[1].toLowerCase() : null;

  searchResults.value = allProducts.value
    .filter(p => {
      const name = p.name?.toLowerCase() || '';
      const brand = p.brand?.toLowerCase() || '';
      const cat = p.category?.toLowerCase() || '';
      return name.includes(q) || brand.includes(q) || cat.includes(q) || (brandEng && brand.includes(brandEng));
    })
    .slice(0, 8);
}

function doSearch() {
  if (!searchQuery.value.trim()) return;
  showSearch.value = false;
  router.push(`/products?search=${encodeURIComponent(searchQuery.value.trim())}`);
  searchQuery.value = '';
  searchResults.value = [];
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
.f32-layout {
  background: #fff;
  color: #111;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* 헤더 */
.f32-topbar { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid #eee; }
.f32-topbar__main { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0.875rem 2.5rem; }
.f32-topbar__logo { font-size: 1.625rem; font-weight: 900; letter-spacing: -0.03em; text-align: center; color: #111; text-decoration: none; }
.f32-topbar__right { display: flex; align-items: center; justify-content: flex-end; gap: 1.25rem; }
.f32-topbar__mi {
  font-size: 1.25rem;
  color: #333;
  cursor: pointer;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
  transition: opacity 0.2s;
}
.f32-topbar__mi:hover { opacity: 0.5; }
.f32-topbar__mi-link { display: flex; align-items: center; color: inherit; text-decoration: none; }
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
  width: 200px; padding: 0.375rem 0.75rem;
  border-bottom: 1.5px solid #111;
}
.f32-search-inline__input::placeholder { color: #ccc; }
.f32-search-inline__drop {
  position: absolute; top: 100%; right: 0; margin-top: 0.5rem;
  width: 320px; max-height: 400px; overflow-y: auto;
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
  width: 320px; padding: 2rem; text-align: center;
  background: #fff; border: 1px solid #eee; border-radius: 0.5rem;
  box-shadow: 0 8px 24px rgba(0,0,0,0.1); z-index: 100;
  font-size: 0.75rem; color: #bbb;
}

/* 카테고리 네비 */
.f32-catnav { display: flex; justify-content: center; gap: 0; border-top: 1px solid #eee; }
.f32-catnav__link {
  padding: 0.875rem 1.5rem; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.05em;
  color: #333; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s;
  text-decoration: none;
}
.f32-catnav__link:hover { border-bottom-color: var(--nav-accent, #111); }
.f32-catnav__link--active { color: var(--nav-accent, #111); border-bottom-color: var(--nav-accent, #111); }
.f32-catnav__link--sale { color: #FF2D2D; }

/* 푸터 */
.f32-foot { background: #111; color: #f5f5f5; padding: 5rem 3rem 2rem; }
.f32-foot__top { display: grid; grid-template-columns: 1.5fr 3fr; gap: 4rem; max-width: 1600px; margin: 0 auto 3rem; padding-bottom: 3rem; border-bottom: 1px solid #333; }
.f32-foot__logo { font-size: 2.25rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
.f32-foot__slogan { font-size: 0.75rem; color: #888; }
.f32-foot__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.f32-foot__col h4 { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 1rem; color: #FF2D2D; }
.f32-foot__col a { display: block; font-size: 0.6875rem; color: #ccc; margin-bottom: 0.5rem; cursor: pointer; transition: color 0.2s; text-decoration: none; }
.f32-foot__col a:hover { color: #fff; }
.f32-foot__bottom { max-width: 1600px; margin: 0 auto; font-size: 0.5625rem; color: #666; line-height: 1.8; text-align: center; }
</style>
