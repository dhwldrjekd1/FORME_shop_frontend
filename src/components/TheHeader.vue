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
          <RouterLink to="/about" class="header__service-link">About</RouterLink>
        </nav>

        <!-- 검색 -->
        <button class="header__icon-btn" aria-label="검색">
          <span class="material-symbols-outlined">search</span>
        </button>

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
</template>

<script setup>
import levisLogo from "@/assets/levis.svg";
import diciesLogo from "@/assets/dickies.svg";
import carharttLogo from "@/assets/carhartt.svg";
import beanpoleLogo from "@/assets/beanpole.svg";
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useCartStore } from "@/stores/cartStore";

const route = useRoute();
const authStore = useAuthStore();
const cartStore = useCartStore();

const isLoggedIn = computed(() => authStore.isLoggedIn);
const cartCount = computed(() => cartStore.totalCount);

// 스크롤 감지: 20px 이상 내려가면 header--scrolled 클래스 추가
// → 그림자, 테두리 표시
const isScrolled = ref(false);
function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}
onMounted(() => window.addEventListener("scroll", handleScroll));
onUnmounted(() => window.removeEventListener("scroll", handleScroll)); // 메모리 누수 방지

// 브랜드 메뉴 목록
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
/* 브랜드 로고 이미지 공통 */
.header__brand-logo {
  width: auto;
  object-fit: contain;
  /* opacity: 0.6;
  transition: opacity 0.2s;*/
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
</style>
