<template>
  <!-- 모든 라우트가 각자 자기 레이아웃을 그린다 — 홈/상품/장바구니 등은 Forme32Layout,
       관리자는 AdminLayout, 시안 페이지(forme05/08/30/31)는 자체 inline 헤더/푸터,
       로그인/회원가입은 폼만 단독으로. 여기서 별도로 전역 헤더/푸터를 씌우지 않는다. -->
  <RouterView />
</template>
