<template>
  <div class="adm">
    <!-- 사이드바 -->
    <aside class="adm-side">
      <div class="adm-side__top">
        <RouterLink to="/admin" class="adm-side__logo">FORME</RouterLink>
        <RouterLink to="/admin" class="adm-side__badge">ADMIN</RouterLink>
      </div>
      <nav class="adm-side__nav">
        <RouterLink
          v-for="item in navItems" :key="item.to"
          :to="item.to"
          class="adm-nav"
          :class="{ 'adm-nav--on': route.path === item.to }"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span class="adm-nav__label">{{ item.label }}</span>
          <span class="adm-nav__code">{{ item.code }}</span>
        </RouterLink>
      </nav>
      <div class="adm-side__bottom">
        <RouterLink to="/" class="adm-side__back">
          <span class="material-symbols-outlined">storefront</span>
          쇼핑몰로 돌아가기
        </RouterLink>
        <p class="adm-side__ver">FORME ADMIN v1.0</p>
      </div>
    </aside>

    <!-- 메인 콘텐츠 -->
    <div class="adm-main">
      <header class="adm-topbar">
        <button class="adm-topbar__menu" @click="mobileOpen = !mobileOpen">
          <span class="material-symbols-outlined">menu</span>
        </button>
        <div class="adm-topbar__right">
          <span class="adm-topbar__live">◉ LIVE</span>
          <span class="adm-topbar__user">{{ userName }}</span>
        </div>
      </header>
      <div class="adm-content">
        <slot />
      </div>
    </div>

    <!-- 모바일 오버레이 -->
    <div v-if="mobileOpen" class="adm-overlay" @click="mobileOpen = false"></div>
    <aside v-if="mobileOpen" class="adm-side adm-side--mobile">
      <div class="adm-side__top">
        <span class="adm-side__logo">FORME</span>
        <button @click="mobileOpen = false" class="adm-side__close">
          <span class="material-symbols-outlined">close</span>
        </button>
      </div>
      <nav class="adm-side__nav">
        <RouterLink
          v-for="item in navItems" :key="item.to"
          :to="item.to"
          class="adm-nav"
          :class="{ 'adm-nav--on': route.path === item.to }"
          @click="mobileOpen = false"
        >
          <span class="material-symbols-outlined">{{ item.icon }}</span>
          <span class="adm-nav__label">{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const route = useRoute();
const authStore = useAuthStore();
const mobileOpen = ref(false);

const userName = computed(() => authStore.user?.name || 'Admin');

const navItems = [
  { to: '/admin', label: '대시보드', icon: 'dashboard', code: '00' },
  { to: '/admin/products', label: '상품 관리', icon: 'inventory_2', code: '01' },
  { to: '/admin/orders', label: '주문 관리', icon: 'receipt_long', code: '02' },
  { to: '/admin/members', label: '회원 관리', icon: 'group', code: '03' },
  { to: '/admin/qna', label: 'Q&A 관리', icon: 'forum', code: '04' },
  { to: '/admin/faq', label: 'FAQ 관리', icon: 'help', code: '05' },
  { to: '/admin/reviews', label: '리뷰 관리', icon: 'rate_review', code: '06' },
  { to: '/admin/categories', label: '카테고리 관리', icon: 'category', code: '07' },
  { to: '/admin/board', label: '게시판 관리', icon: 'article', code: '08' },
  { to: '/admin/analytics', label: '분석', icon: 'analytics', code: '09' },
  { to: '/admin/settings', label: '설정', icon: 'settings', code: '10' },
];
</script>

<style>
/* ════════════════════════════════
   ADMIN LAYOUT — forme30 스타일
   블랙 사이드바 + 클린 콘텐츠
   ════════════════════════════════ */
.adm { display: flex; min-height: 100dvh; background: #f5f4f0; font-family: 'Noto Sans KR', -apple-system, sans-serif; }

/* 사이드바 */
.adm-side {
  width: 240px; background: #111; color: #fff;
  display: flex; flex-direction: column; position: fixed;
  top: 0; left: 0; bottom: 0; z-index: 100;
}
@media (max-width: 1023px) { .adm-side { display: none; } }
.adm-side--mobile {
  display: flex !important; width: 260px; z-index: 1001;
  position: fixed; top: 0; left: 0; bottom: 0;
}
.adm-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 1000; }

.adm-side__top {
  padding: 1.75rem 1.5rem 1.5rem; border-bottom: 1px solid #222;
  display: flex; align-items: center; gap: 0.75rem;
}
.adm-side__logo {
  font-size: 1.25rem; font-weight: 900; letter-spacing: -0.02em;
  color: #fff; text-decoration: none;
}
.adm-side__badge {
  font-size: 0.5rem; font-weight: 800; letter-spacing: 0.2em;
  background: #FF2D2D; color: #fff; padding: 0.2rem 0.5rem;
}
.adm-side__close {
  margin-left: auto; background: none; border: none; color: #fff; cursor: pointer;
  display: flex; align-items: center;
}

/* 네비 */
.adm-side__nav { flex: 1; padding: 1rem 0; overflow-y: auto; }
.adm-nav {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.75rem 1.5rem; color: #888; text-decoration: none;
  font-size: 0.75rem; font-weight: 600; letter-spacing: 0.03em;
  transition: all 0.2s; position: relative;
}
.adm-nav:hover { color: #fff; background: rgba(255,255,255,0.04); }
.adm-nav--on {
  color: #fff; background: rgba(255,255,255,0.08);
  border-left: 2px solid #FF2D2D;
}
.adm-nav .material-symbols-outlined {
  font-size: 1.125rem; font-variation-settings: "wght" 300;
}
.adm-nav__code {
  margin-left: auto; font-size: 0.5rem; color: #444;
  font-weight: 700; letter-spacing: 0.1em;
}

.adm-side__bottom {
  padding: 1.25rem 1.5rem; border-top: 1px solid #222;
}
.adm-side__back {
  display: flex; align-items: center; gap: 0.5rem;
  color: #666; text-decoration: none; font-size: 0.6875rem;
  transition: color 0.2s;
}
.adm-side__back:hover { color: #fff; }
.adm-side__back .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
.adm-side__ver { font-size: 0.5rem; color: #333; margin-top: 0.75rem; letter-spacing: 0.1em; }

/* 메인 */
.adm-main { flex: 1; margin-left: 240px; display: flex; flex-direction: column; min-height: 100dvh; }
@media (max-width: 1023px) { .adm-main { margin-left: 0; } }

/* 탑바 */
.adm-topbar {
  display: flex; justify-content: flex-end; align-items: center;
  padding: 1rem 2rem; background: #fff; border-bottom: 1px solid #eee;
  position: sticky; top: 0; z-index: 50;
}
.adm-topbar__menu {
  display: none; background: none; border: none; cursor: pointer; margin-right: auto;
}
@media (max-width: 1023px) { .adm-topbar__menu { display: flex; } }
.adm-topbar__menu .material-symbols-outlined { font-size: 1.375rem; color: #111; }
.adm-topbar__right { display: flex; align-items: center; gap: 1rem; }
.adm-topbar__live { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.1em; color: #38a169; }
.adm-topbar__user { font-size: 0.75rem; font-weight: 600; color: #111; }

/* 콘텐츠 */
.adm-content { flex: 1; padding: 2rem; }
</style>
