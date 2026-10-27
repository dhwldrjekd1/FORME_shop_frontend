<template>
  <!-- 모든 라우트가 각자 자기 레이아웃을 그린다 — 홈/상품/장바구니 등은 Forme32Layout,
       관리자는 AdminLayout, 시안 페이지(forme05/08/30/31)는 자체 inline 헤더/푸터,
       로그인/회원가입은 폼만 단독으로. 여기서 별도로 전역 헤더/푸터를 씌우지 않는다. -->
  <RouterView />

  <!-- Vue가 못 잡은 렌더링 예외가 나면(main.js의 app.config.errorHandler) 아래 RouterView의
       컴포넌트 트리가 깨진 상태로 남아있을 수 있어, 그와 무관하게 항상 위에 떠 있는 최소한의
       안내 오버레이. 이 컴포넌트(App.vue) 자체는 RouterView 하나만 그리는 단순한 구조라
       여기서 또 예외가 날 가능성은 낮다. -->
  <div v-if="globalErrorState.hasError" class="ge-overlay">
    <div class="ge-box">
      <p class="ge-title">문제가 발생했습니다</p>
      <p class="ge-desc">일시적인 오류일 수 있어요. 새로고침해주세요.</p>
      <button class="ge-btn" @click="() => window.location.reload()">새로고침</button>
    </div>
  </div>
</template>

<script setup>
import { globalErrorState } from "@/utils/globalError";
</script>

<style scoped>
.ge-overlay {
  position: fixed; inset: 0; z-index: 9999;
  background: rgba(255, 255, 255, 0.92);
  display: flex; align-items: center; justify-content: center;
}
.ge-box { text-align: center; padding: 2rem; }
.ge-title { font-size: 1.125rem; font-weight: 800; color: #111; margin-bottom: 0.5rem; }
.ge-desc { font-size: 0.875rem; color: #777; margin-bottom: 1.25rem; }
.ge-btn {
  padding: 0.625rem 1.5rem; background: #111; color: #fff;
  font-size: 0.8125rem; font-weight: 700; border-radius: 0.25rem; cursor: pointer;
}
</style>
