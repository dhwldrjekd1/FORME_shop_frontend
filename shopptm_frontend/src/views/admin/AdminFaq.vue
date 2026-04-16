<template>
  <AdminLayout>
    <div class="af">
      <div class="af-head"><p class="af-code">[ 05 / FAQ ]</p><h1 class="af-title">FAQ 관리</h1></div>
      <p class="af-note">FAQ 데이터는 프론트엔드에 하드코딩되어 있습니다. 수정이 필요하면 <code>FaqView.vue</code>를 직접 편집하세요.</p>
      <div class="af-preview">
        <div v-for="s in sections" :key="s.title" class="af-sec">
          <h3 class="af-sec__title">{{ s.title }}</h3>
          <div v-for="(item, i) in s.items" :key="i" class="af-item">
            <p class="af-item__q">Q. {{ item.q }}</p>
            <p class="af-item__a">A. {{ item.a }}</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import AdminLayout from "@/layouts/AdminLayout.vue";
const sections = [
  { title: "주문", items: [
    { q: "결제 수단은 어떤 것들이 있나요?", a: "비자, 마스터카드 등 주요 신용카드 + 토스페이먼츠 지원" },
    { q: "주문 후 취소가 가능한가요?", a: "배송 준비 전 취소 가능, 이후 반품 신청" },
  ]},
  { title: "배송", items: [
    { q: "기본 배송 기간은?", a: "국내 2~5 영업일" },
  ]},
  { title: "반품", items: [
    { q: "반품은 어떻게?", a: "수령 14일 이내, 미착용/미세탁 상태" },
  ]},
];
</script>
<style scoped>
.af-head { margin-bottom: 1.5rem; }
.af-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.af-title { font-size: 1.75rem; font-weight: 900; }
.af-note { font-size: 0.8125rem; color: #999; margin-bottom: 2rem; padding: 1rem 1.25rem; background: #fff; border: 1px solid #eee; border-radius: 0.5rem; }
.af-note code { background: #f0f0f0; padding: 0.125rem 0.375rem; border-radius: 0.25rem; font-size: 0.75rem; }
.af-preview { display: flex; flex-direction: column; gap: 2rem; }
.af-sec { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; padding: 1.5rem; }
.af-sec__title { font-size: 1rem; font-weight: 800; margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #f0f0f0; }
.af-item { padding: 0.75rem 0; border-bottom: 1px solid #f8f8f8; }
.af-item__q { font-size: 0.8125rem; font-weight: 600; color: #111; margin-bottom: 0.375rem; }
.af-item__a { font-size: 0.75rem; color: #888; line-height: 1.6; }
</style>
