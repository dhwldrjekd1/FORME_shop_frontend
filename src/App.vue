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
const isAuthPage = computed(() => {
  const p = route.path;
  if (["/login", "/signup"].includes(p)) return true;
  // /forme 로 시작하는 모든 디자인 톤/선택기 페이지는 전역 헤더 숨김
  // 매칭: /forme, /forme/, /forme01 ~ /forme25, /forme/ui/header 등
  if (/^\/forme(\/|$|0[1-9]|[12][0-9]|30)/.test(p)) return true;
  return false;
});
</script>
