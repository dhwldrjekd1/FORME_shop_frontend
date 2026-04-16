<template>
  <!-- 로그인/회원가입 페이지는 헤더/푸터 없이 단독 레이아웃 -->
  <template v-if="isAuthPage">
    <RouterView />
  </template>

  <!-- 일반 페이지: 헤더 + 콘텐츠 + 푸터 -->
  <template v-else>
    <TheHeader />
    <RouterView />
    <TheFooter />
  </template>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";

const route = useRoute();

// 현재 경로가 /login 또는 /signup 이면 true
// → 헤더/푸터를 숨기고 폼만 단독으로 보여줌
// /forme01 ~ /forme10 디자인 톤 페이지도 각자 inline 헤더/푸터를 쓰므로 전역 헤더 숨김
// 전역 헤더/푸터를 숨기는 페이지:
// - 로그인/회원가입: 자체 레이아웃
// - / (홈): Forme32Layout 사용
// - /forme05, /forme31: 시안 (자체 헤더/푸터 포함)
const isAuthPage = computed(() => {
  const p = route.path;
  if (["/login", "/signup"].includes(p)) return true;
  if (p === "/") return true;
  if (/^\/forme(05|08|30|31)/.test(p)) return true;
  // 카테고리 페이지: Forme32Layout 사용
  if (["/new", "/best", "/sale"].includes(p)) return true;
  // 브랜드 페이지: Forme32Layout 자체 헤더/푸터 사용
  if (["/beanpole", "/carhartt", "/levis", "/dickies"].includes(p)) return true;
  // 상품 목록/상세: Forme32Layout 사용
  if (p === "/products" || p.startsWith("/products/")) return true;
  // 장바구니/결제/주문완료: Forme32Layout 사용
  if (["/cart", "/payment", "/order-complete"].includes(p)) return true;
  // FAQ/QnA/게시판/마이페이지: Forme32Layout 사용
  if (["/faq", "/qna", "/board", "/mypage"].includes(p)) return true;
  // 관리자: AdminLayout 자체 레이아웃 사용
  if (p.startsWith("/admin")) return true;
  return false;
});
</script>
