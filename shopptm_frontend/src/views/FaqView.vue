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
import { ref, computed } from "vue";
import Forme32Layout from "@/layouts/Forme32Layout.vue";

const tabs = ["전체", "주문", "배송", "반품", "결제", "상품", "계정"];
const activeTab = ref("전체");

const openItems = ref({});
function toggle(t, i) { const k = `${t}-${i}`; openItems.value[k] = !openItems.value[k]; }
function isOpen(t, i) { return !!openItems.value[`${t}-${i}`]; }

const sections = [
  { title: "주문", tab: "주문", desc: "주문 상태 확인 및 관리", items: [
    { q: "결제 수단은 어떤 것들이 있나요?", a: "비자, 마스터카드, 아메리칸 익스프레스 등 주요 신용카드를 지원합니다. 기기 및 브라우저 환경에 따라 애플 페이와 구글 페이도 사용 가능합니다." },
    { q: "주문 후 취소가 가능한가요?", a: "배송 준비가 시작되기 전이라면 주문 취소가 가능합니다. 상품이 포장되거나 발송된 이후에는 취소가 어려울 수 있으며, 배송 완료 후 반품 신청을 이용해 주세요." },
    { q: "비회원 주문 배송 조회는 어떻게 하나요?", a: "발송 후 전송된 배송 확인 이메일을 통해 조회하실 수 있습니다. 주문 번호와 이메일 주소를 입력하면 주문 조회 페이지에서도 확인 가능합니다." },
  ]},
  { title: "배송", tab: "배송", desc: "배송 일정 및 관련 안내", items: [
    { q: "기본 배송 기간은 얼마나 되나요?", a: "국내 기본 배송은 발송 후 2~5 영업일 이내 도착합니다. 성수기에는 지연될 수 있습니다." },
    { q: "브랜드별 해외 배송은 어떻게 진행되나요?", a: "브랜드 위치, 재고 창고, 수입 조건에 따라 일부 상품은 개별 발송될 수 있습니다. 이 경우 이메일로 업데이트된 배송 정보를 안내해 드립니다." },
  ]},
  { title: "반품", tab: "반품", desc: "반품 및 교환 정책 안내", items: [
    { q: "상품은 어떻게 반품하나요?", a: "수령일로부터 14일 이내에 반품 신청이 가능합니다. 미착용, 미세탁 상태로 원래 포장을 유지한 상품에 한해 반품이 가능하며, 고객센터를 통해 신청해 주세요." },
    { q: "환불은 언제 받을 수 있나요?", a: "반품 상품 수령 및 검수 완료 후 5~7 영업일 이내에 환불이 처리됩니다." },
  ]},
  { title: "결제", tab: "결제", desc: "결제 수단 및 보안 안내", items: [
    { q: "결제 정보는 안전하게 보호되나요?", a: "네, 모든 거래는 SSL 암호화로 보호됩니다. 카드 정보는 서버에 저장되지 않습니다." },
    { q: "할부 결제가 가능한가요?", a: "카드사에 따라 할부 결제가 가능할 수 있습니다. 자세한 사항은 카드사에 문의해 주세요." },
  ]},
  { title: "상품", tab: "상품", desc: "사이즈, 재고 관련 문의", items: [
    { q: "사이즈는 어떻게 선택하나요?", a: "각 상품 페이지에 사이즈 가이드가 제공됩니다. 본인의 신체 치수를 측정한 후 브랜드별 사이즈 차트와 비교해 선택해 주세요." },
    { q: "품절 상품은 언제 재입고되나요?", a: "상품 페이지에서 재고 현황을 확인하실 수 있습니다. 품절 상품은 알림 신청 기능을 이용하시면 재입고 시 알림을 받으실 수 있습니다." },
  ]},
  { title: "계정", tab: "계정", desc: "계정 및 개인정보 관리", items: [
    { q: "비밀번호를 잊어버렸어요.", a: '로그인 페이지에서 "비밀번호 찾기"를 클릭하고 가입한 이메일을 입력해 주세요. 몇 분 이내로 재설정 링크가 전송됩니다.' },
    { q: "이메일 주소를 변경할 수 있나요?", a: "로그인 후 계정 설정 페이지에서 이메일 주소를 변경하실 수 있습니다." },
  ]},
];

const filteredSections = computed(() => {
  if (activeTab.value === "전체") return sections;
  return sections.filter((s) => s.tab === activeTab.value);
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
.fq-tabs { position: sticky; top: 100px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
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
