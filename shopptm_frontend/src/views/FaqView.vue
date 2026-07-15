<template>
  <Forme32Layout>
    <!-- ═══ 헤더 ═══ -->
    <div class="fq-head">
      <div class="fq-head__inner">
        <span class="material-symbols-outlined fq-head__icon">help</span>
        <h1 class="fq-head__title">자주 묻는 질문</h1>
        <p class="fq-head__sub">주문, 배송, 반품 등 궁금한 점을 빠르게 확인하세요</p>
      </div>
    </div>

    <!-- ═══ 카테고리 탭 ═══ -->
    <div class="fq-tabs">
      <div class="fq-tabs__inner">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="fq-tabs__btn"
          :class="{ 'fq-tabs__btn--on': activeTab === tab }"
          @click="activeTab = tab"
        >{{ tab }}</button>
      </div>
    </div>

    <!-- ═══ FAQ 콘텐츠 ═══ -->
    <div class="fq-body">
      <div v-for="section in filteredSections" :key="section.title" class="fq-sec">
        <div class="fq-sec__side">
          <h2 class="fq-sec__title">{{ section.title }}</h2>
          <p class="fq-sec__desc">{{ section.desc }}</p>
        </div>
        <div class="fq-sec__list">
          <div v-for="(item, i) in section.items" :key="i" class="fq-item">
            <button class="fq-item__q" @click="toggle(section.title, i)">
              <span>{{ item.q }}</span>
              <span class="material-symbols-outlined fq-item__arrow" :class="{ 'fq-item__arrow--open': isOpen(section.title, i) }">expand_more</span>
            </button>
            <div class="fq-item__a" :class="{ 'fq-item__a--open': isOpen(section.title, i) }">
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══ 도움 배너 ═══ -->
    <div class="fq-help">
      <div class="fq-help__inner">
        <div>
          <h2 class="fq-help__title">원하는 답을 찾지 못하셨나요?</h2>
          <p class="fq-help__desc">1:1 문의를 남겨주시면 빠르게 답변드리겠습니다.</p>
        </div>
        <RouterLink to="/qna" class="fq-help__btn">
          <span class="material-symbols-outlined">edit</span>
          문의하기
        </RouterLink>
      </div>
    </div>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import api from "@/api";

const tabs = ["전체", "주문", "배송", "반품", "결제", "상품", "계정"];
const activeTab = ref("전체");

const openItems = ref({});
function toggle(t, i) { const k = `${t}-${i}`; openItems.value[k] = !openItems.value[k]; }
function isOpen(t, i) { return !!openItems.value[`${t}-${i}`]; }

// 카테고리별 소개 문구는 프론트에서 관리, 실제 질문/답변은 백엔드 FAQ API에서 받아온다
const categoryDesc = {
  주문: "주문 상태 확인 및 관리",
  배송: "배송 일정 및 관련 안내",
  반품: "반품 및 교환 정책 안내",
  결제: "결제 수단 및 보안 안내",
  상품: "사이즈, 재고 관련 문의",
  계정: "계정 및 개인정보 관리",
};

const faqs = ref([]);
onMounted(async () => {
  try {
    faqs.value = await api.get("/faq") || [];
  } catch {
    faqs.value = [];
  }
});

const sections = computed(() =>
  Object.keys(categoryDesc)
    .map((category) => ({
      title: category,
      tab: category,
      desc: categoryDesc[category],
      items: faqs.value
        .filter((f) => f.category === category)
        .map((f) => ({ q: f.question, a: f.answer })),
    }))
    .filter((s) => s.items.length > 0)
);

const filteredSections = computed(() => {
  if (activeTab.value === "전체") return sections.value;
  return sections.value.filter((s) => s.tab === activeTab.value);
});
</script>

<style scoped>
/* 헤더 */
.fq-head { padding: 5rem 3rem 4rem; text-align: center; background: #fafaf8; }
.fq-head__inner { max-width: 36rem; margin: 0 auto; }
.fq-head__icon { font-size: 2.5rem; color: #111; font-variation-settings: "wght" 200; margin-bottom: 1.25rem; }
.fq-head__title { font-size: 2.25rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.fq-head__sub { font-size: 0.9375rem; color: #999; }

/* 탭 */
.fq-tabs { position: sticky; top: 80px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
@media (min-width: 768px) { .fq-tabs { top: 100px; } }
.fq-tabs__inner { display: flex; justify-content: center; gap: 0; padding: 0; overflow-x: auto; scrollbar-width: none; }
.fq-tabs__inner::-webkit-scrollbar { display: none; }
.fq-tabs__btn {
  padding: 1rem 1.5rem; font-size: 0.6875rem; font-weight: 600;
  letter-spacing: 0.1em; color: #999; cursor: pointer;
  border-bottom: 2px solid transparent; transition: all 0.2s; background: none; border-top: none; border-left: none; border-right: none;
}
.fq-tabs__btn:hover { color: #111; }
.fq-tabs__btn--on { color: #111; border-bottom-color: #111; }

/* 본문 */
.fq-body { max-width: 1200px; margin: 0 auto; padding: 4rem 3rem 5rem; display: flex; flex-direction: column; gap: 4rem; }
.fq-sec { display: grid; grid-template-columns: 1fr; gap: 2rem; }
@media (min-width: 768px) { .fq-sec { grid-template-columns: 280px 1fr; gap: 3rem; } }
.fq-sec__side {}
.fq-sec__title { font-size: 1.5rem; font-weight: 900; margin-bottom: 0.5rem; }
.fq-sec__desc { font-size: 0.8125rem; color: #999; line-height: 1.6; }

/* 아코디언 */
.fq-item { border-bottom: 1px solid #f0f0f0; }
.fq-item__q {
  display: flex; justify-content: space-between; align-items: center;
  width: 100%; padding: 1.375rem 0; cursor: pointer; background: none; border: none; text-align: left;
  font-size: 0.9375rem; font-weight: 600; color: #111; gap: 1rem;
}
.fq-item__arrow { font-size: 1.25rem; color: #bbb; transition: transform 0.25s; flex-shrink: 0; font-variation-settings: "wght" 300; }
.fq-item__arrow--open { transform: rotate(180deg); color: #111; }
.fq-item__a {
  display: grid; grid-template-rows: 0fr; opacity: 0;
  transition: grid-template-rows 0.3s, opacity 0.3s, margin 0.3s; overflow: hidden;
}
.fq-item__a--open { grid-template-rows: 1fr; opacity: 1; margin-bottom: 1.25rem; }
.fq-item__a p { font-size: 0.875rem; color: #666; line-height: 1.8; overflow: hidden; }

/* 도움 배너 */
.fq-help { background: #111; padding: 4rem 3rem; }
.fq-help__inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 2rem; align-items: center; text-align: center;
}
@media (min-width: 768px) {
  .fq-help__inner { flex-direction: row; justify-content: space-between; text-align: left; }
}
.fq-help__title { font-size: 1.5rem; font-weight: 900; color: #fff; margin-bottom: 0.5rem; }
.fq-help__desc { font-size: 0.875rem; color: rgba(255,255,255,0.5); }
.fq-help__btn {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 1rem 2.5rem; background: #fff; color: #111;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
  text-decoration: none; border-radius: 0.375rem; transition: opacity 0.2s; white-space: nowrap;
}
.fq-help__btn:hover { opacity: 0.8; }
.fq-help__btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
</style>
