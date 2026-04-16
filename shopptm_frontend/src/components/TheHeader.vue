<template>
  <header class="header" :class="{ 'header--scrolled': isScrolled }">
    <div class="header__inner container--full">
      <!-- 왼쪽: 브랜드 로고 -->
      <RouterLink to="/" class="header__logo">FORME</RouterLink>

      <!-- 가운데: 브랜드 카테고리 메뉴 -->
      <nav class="header__nav">
        <RouterLink
          v-for="brand in brands"
          :key="brand.name"
          :to="brand.path"
          class="header__nav-link"
          :class="{ 'header__nav-link--active': route.path === brand.path }"
        >
          <img
            v-if="brand.logo"
            :src="brand.logo"
            :alt="brand.name"
            class="header__brand-logo"
            :class="`header__brand-logo--${brand.slug}`"
          />
          <span v-else>{{ brand.name }}</span>
        </RouterLink>
      </nav>

      <!-- 오른쪽: 서비스 링크 + 아이콘들 -->
      <div class="header__actions">

        <!-- FAQ / Q&A / About 링크 -->
        <nav class="header__service-nav">
          <RouterLink to="/faq" class="header__service-link">FAQ</RouterLink>
          <RouterLink to="/qna" class="header__service-link">Q&A</RouterLink>
          <RouterLink to="/board" class="header__service-link">게시판</RouterLink>
        </nav>

        <!-- 검색 -->
        <button class="header__icon-btn" aria-label="검색" @click="openSearch">
          <span class="material-symbols-outlined">search</span>
        </button>

        <!-- 찜 목록 -->
        <RouterLink
          to="/mypage?tab=wishlist"
          class="header__icon-btn header__cart-btn"
          aria-label="찜 목록"
        >
          <span class="material-symbols-outlined">favorite</span>
          <span v-if="wishlistCount > 0" class="header__cart-badge">{{ wishlistCount }}</span>
        </RouterLink>

        <!-- 마이페이지 -->
        <RouterLink
          :to="isLoggedIn ? '/mypage' : '/login'"
          class="header__icon-btn"
          aria-label="마이페이지"
        >
          <span class="material-symbols-outlined">person</span>
        </RouterLink>

        <!-- 장바구니 -->
        <RouterLink
          to="/cart"
          class="header__icon-btn header__cart-btn"
          aria-label="장바구니"
        >
          <span
            class="material-symbols-outlined"
            style="
              font-variation-settings:
                &quot;FILL&quot; 1,
                &quot;wght&quot; 300,
                &quot;GRAD&quot; 0,
                &quot;opsz&quot; 24;
            "
          >
            shopping_bag
          </span>
          <span v-if="cartCount > 0" class="header__cart-badge">{{
            cartCount
          }}</span>
        </RouterLink>
      </div>
    </div>
  </header>

  <!-- 검색 오버레이 -->
  <Teleport to="body">
    <div v-if="isSearchOpen" class="search-overlay" @click.self="closeSearch">
      <div class="search-modal">

        <!-- 검색 입력 -->
        <div class="search-modal__input-wrap">
          <span class="material-symbols-outlined search-modal__icon">search</span>
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="상품명, 브랜드 검색"
            class="search-modal__input"
            @keydown.esc="closeSearch"
          />
          <button class="search-modal__close" @click="closeSearch">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- 검색 결과 -->
        <div class="search-modal__results">

          <!-- 결과 없음 -->
          <div v-if="searchQuery && searchResults.length === 0" class="search-modal__empty">
            <p>"{{ searchQuery }}" 에 대한 검색 결과가 없습니다.</p>
          </div>

          <!-- 초기 상태 -->
          <div v-else-if="!searchQuery" class="search-modal__hint">
            <p>브랜드명 또는 상품명을 입력해주세요.</p>
          </div>

          <!-- 결과 목록 -->
          <div v-else class="search-modal__list">
            <p class="search-modal__count">검색 결과 {{ searchResults.length }}개</p>
            <RouterLink
              v-for="product in searchResults"
              :key="product.id"
              :to="`/products/${product.id}`"
              class="search-result-item"
              @click="closeSearch"
            >
              <div class="search-result-item__img-wrap">
                <img
                  :src="product.image"
                  :alt="product.name"
                  class="search-result-item__img"
                />
              </div>
              <div class="search-result-item__info">
                <p class="search-result-item__category">{{ product.category }}</p>
                <p class="search-result-item__name">{{ product.name }}</p>
                <p class="search-result-item__price">₩{{ product.price.toLocaleString() }}</p>
              </div>
            </RouterLink>
          </div>

        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import levisLogo from "@/assets/levis.svg";
import diciesLogo from "@/assets/dickies.svg";
import carharttLogo from "@/assets/carhartt.svg";
import beanpoleLogo from "@/assets/beanpole.svg";
import { ref, computed, onMounted, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { useWishlistStore } from "@/stores/wishlistStore";

const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();
const productStore = useProductStore();
// reactive 안정화: store.products 를 직접 참조하지 않고 ref 로 꺼내서 사용
const { products: allProducts } = storeToRefs(productStore);

const wishlistStore = useWishlistStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);
const cartCount = computed(() => cartStore.totalCount);
const wishlistCount = computed(() => wishlistStore.count);

// 스크롤 감지: 20px 이상 내려가면 header--scrolled 클래스 추가
// → 그림자, 테두리 표시
const isScrolled = ref(false);
function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll)); // 메모리 누수 방지

// ── 검색 ──
const isSearchOpen = ref(false);
const searchQuery  = ref("");
const searchInput  = ref(null);

// 상품 ID 범위로 브랜드 자동 매핑 — 한글/영문/별칭 모두 매칭되도록
// (시드 ID: 100~199 칼하트, 200~299 리바이스, 300~399 디키즈, 400~499 빈폴)
function getBrandKeywords(id) {
  if (id >= 100 && id < 200) return ["carhartt", "칼하트"];
  if (id >= 200 && id < 300) return ["levis", "levi", "levi's", "리바이스", "리바이"];
  if (id >= 300 && id < 400) return ["dickies", "디키즈", "디키스"];
  if (id >= 400 && id < 500) return ["beanpole", "빈폴", "빈폴맨"];
  return [];
}

const searchResults = computed(() => {
  const q = searchQuery.value.trim().toLowerCase();
  if (!q) return [];

  return allProducts.value
    .filter(p => {
      const name        = (p.name || "").toLowerCase();
      const category    = (p.category || "").toLowerCase();
      const keywords    = (p.keywords || []).map(k => k.toLowerCase());
      const brandKeys   = getBrandKeywords(p.id);
      const description = (p.description || "").toLowerCase();

      return (
        name.includes(q) ||
        category.includes(q) ||
        description.includes(q) ||
        keywords.some(k => k.includes(q)) ||
        brandKeys.some(k => k.includes(q) || q.includes(k))
      );
    })
    .slice(0, 12);
});

async function openSearch() {
  await productStore.fetchProducts();
  isSearchOpen.value = true;
  await nextTick();
  searchInput.value?.focus();
  document.body.style.overflow = "hidden";
}

function closeSearch() {
  isSearchOpen.value = false;
  searchQuery.value  = "";
  document.body.style.overflow = "";
}

function handleKeydown(e) {
  if (e.key === "Escape") closeSearch();
}

onMounted(() => window.addEventListener("keydown", handleKeydown));
onUnmounted(() => window.removeEventListener("keydown", handleKeydown));

// 브랜드 메뉴 목록 (Beanpole → Carhartt → Levi's → Dickies 순)
const brands = [
  { name: "Beanpole", slug: "beanpole", logo: beanpoleLogo, path: "/beanpole" },
  { name: "Carhartt", slug: "carhartt", logo: carharttLogo, path: "/carhartt" },
  { name: "Levi's", slug: "levis", logo: levisLogo, path: "/levis" },
  { name: "Dickies", slug: "dickies", logo: diciesLogo, path: "/dickies" },
];
</script>

<style scoped>
/* scoped: 이 컴포넌트 안에서만 적용되는 CSS */

.header {
  position: fixed; /* 스크롤해도 상단에 고정 */
  top: 0;
  width: 100%;
  z-index: 100; /* 다른 요소 위에 표시 */
  background-color: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(20px); /* 배경 흐림 효과 */
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0);
  transition:
    border-color 0.3s,
    box-shadow 0.3s;
}

/* 스크롤 시 테두리 + 그림자 추가 */
.header--scrolled {
  border-bottom-color: rgba(0, 0, 0, 0.08);
  box-shadow: 0 12px 40px rgba(26, 28, 28, 0.06);
}

.header__inner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height); /* = 80px */
}

/* 왼쪽 네비 */
.header__nav {
  position: absolute; /* ← 추가 */
  left: 50%; /* ← 추가 */
  transform: translateX(-50%); /* ← 추가 */
  display: flex;
  gap: 3rem;
  align-items: center;
}

.header__nav-link {
  font-size: 0.8125rem;
  font-weight: 300;
  color: #71717a;
  letter-spacing: 0.03em;
  transition: trasform 0.2s;
}

.header__nav-link:hover {
  transform: scale(1.1);
}

.header__nav-link--active {
  color: #18181b;
  font-weight: 500;
}

/* 로고 */
.header__logo {
  flex-shrink: 0; /* 로고는 줄어들지 않게 */
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #18181b;
}

/* 오른쪽 아이콘들 */
.header__actions {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-left: auto;
}

.header__icon-btn {
  display: flex;
  align-items: center;
  color: #18181b;
  transition: opacity 0.3s;
}

.header__icon-btn:hover {
  opacity: 0.6;
}

/* 장바구니 배지 */
.header__cart-btn {
  position: relative;
}

.header__cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  font-size: 0.5rem;
  min-width: 14px;
  height: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px; /* 완전한 원형 */
  padding: 0 3px;
}
/* 브랜드 로고 이미지 공통
   - SVG 원본 색상을 그대로 유지 (각 브랜드의 아이덴티티 컬러)
   - 서브픽셀 blur 방지를 위해 GPU 레이어로 올리는 트릭만 적용 */
.header__brand-logo {
  width: auto;
  object-fit: contain;
  image-rendering: -webkit-optimize-contrast;
  transform: translateZ(0);
  backface-visibility: hidden;
}

/* .header__nav-link:hover .header__brand-logo,
.header__nav-link--active .header__brand-logo {
  opacity: 1;
}*/

/* 브랜드별 로고 크기 개별 조정 */
.header__brand-logo--levis {
  height: 30px;
}
.header__brand-logo--carhartt {
  height: 25px;
}
.header__brand-logo--dickies {
  height: 37px;
}
.header__brand-logo--beanpole {
  height: 16px;
}

/* 서비스 링크 (FAQ / Q&A / About) */
.header__service-nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-right: 1.5rem;
}

.header__service-link {
  font-size: 0.75rem;
  font-weight: 300;
  color: #71717a;
  letter-spacing: 0.05em;
  transition: color 0.2s;
}

.header__service-link:hover {
  color: #18181b;
}

.header__brand-logo--beanpole {
  height: 16px;
  position: relative;
  top: 4px;
  left: -10px;
}

/* 모바일: 브랜드 메뉴 숨김 */
@media (max-width: 768px) {
  .header__nav {
    display: none;
  }
}

/* ── 검색 오버레이 ── */
.search-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 200;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8rem;
  backdrop-filter: blur(4px);
}

.search-modal {
  width: 100%;
  max-width: 680px;
  background-color: #fff;
  margin: 0 1.5rem;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
}

.search-modal__input-wrap {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}

.search-modal__icon {
  color: var(--color-outline);
  font-size: 1.25rem;
  flex-shrink: 0;
}

.search-modal__input {
  flex: 1;
  font-size: 1rem;
  font-family: var(--font-body);
  border: none;
  outline: none;
  background: transparent;
  color: var(--color-on-surface);
}

.search-modal__input::placeholder {
  color: var(--color-outline);
}

.search-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-outline);
  display: flex;
  align-items: center;
  transition: color 0.2s;
  flex-shrink: 0;
}

.search-modal__close:hover { color: var(--color-primary); }

.search-modal__results {
  overflow-y: auto;
  max-height: calc(80vh - 72px);
}

.search-modal__empty,
.search-modal__hint {
  padding: 3rem 1.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-outline);
}

.search-modal__count {
  padding: 1rem 1.5rem 0.5rem;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-outline);
}

.search-modal__list {
  padding-bottom: 1rem;
}

.search-result-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.875rem 1.5rem;
  transition: background 0.2s;
  cursor: pointer;
}

.search-result-item:hover {
  background-color: var(--color-surface-container-low);
}

.search-result-item__img-wrap {
  width: 56px;
  height: 64px;
  background-color: var(--color-surface-container-low);
  flex-shrink: 0;
  overflow: hidden;
}

.search-result-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.05);
}

.search-result-item__category {
  font-size: 0.5625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-outline);
  margin-bottom: 0.25rem;
}

.search-result-item__name {
  font-size: 0.875rem;
  font-weight: 500;
}

.search-result-item__price {
  font-size: 0.8125rem;
  color: var(--color-on-surface-variant);
  margin-top: 0.25rem;
}
</style>
