<template>
  <main class="page-wrapper">
    <!-- 헤더 섹션 -->
    <section class="faq-hero">
      <div class="faq-hero__text">
        <span class="faq-hero__label">고객 지원</span>
        <h1 class="faq-hero__title">고객 가이드</h1>
        <p class="faq-hero__desc">주문 전후로 필요한 모든 정보를 안내해 드립니다.</p>
      </div>
      <div class="faq-hero__img-wrap">
        <img
          src="/images/fnq.png"
          alt="FORME customer guide"
          class="faq-hero__img"
        />
      </div>
    </section>

    <!-- 카테고리 탭 -->
    <section class="faq-tabs">
      <div class="faq-tabs__inner">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="faq-tabs__btn"
          :class="{ 'faq-tabs__btn--active': activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>
    </section>

    <!-- FAQ 콘텐츠 -->
    <section class="faq-content">
      <div
        v-for="section in filteredSections"
        :key="section.title"
        class="faq-section"
      >
        <div class="faq-section__left">
          <h2 class="faq-section__title">{{ section.title }}</h2>
          <p class="faq-section__desc">{{ section.desc }}</p>
        </div>

        <div class="faq-section__right">
          <div v-for="(item, i) in section.items" :key="i" class="faq-item">
            <button class="faq-item__trigger" @click="toggle(section.title, i)">
              <span class="faq-item__question">{{ item.q }}</span>
              <span
                class="material-symbols-outlined faq-item__icon"
                :class="{ 'faq-item__icon--open': isOpen(section.title, i) }"
                >add</span
              >
            </button>
            <div
              class="faq-item__body"
              :class="{ 'faq-item__body--open': isOpen(section.title, i) }"
            >
              <p>{{ item.a }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 도움 필요 섹션 -->
    <section class="faq-help">
      <div class="faq-help__inner">
        <div class="faq-help__text">
          <h2 class="faq-help__title">추가 도움이 필요하신가요?</h2>
          <p class="faq-help__desc">
            주문, 배송, 반품 등 자주 묻는 질문에 대한 답변을 확인해 보세요.
            그래도 해결이 안 되신다면 저희가 도와드리겠습니다.
          </p>
        </div>
        <button class="faq-help__btn">문의하기</button>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

// ── 탭 목록 ──
const tabs = ["전체", "주문", "배송", "반품", "결제", "상품", "계정"];
const activeTab = ref("전체");

// ── 열린 아이템 상태 ──
const openItems = ref({}); // { 'Orders-0': true, ... }

function toggle(sectionTitle, index) {
  const key = `${sectionTitle}-${index}`;
  openItems.value[key] = !openItems.value[key];
}

function isOpen(sectionTitle, index) {
  return !!openItems.value[`${sectionTitle}-${index}`];
}

// ── FAQ 데이터 ──
const sections = [
  {
    title: "주문",
    tab: "주문",
    desc: "최근 구매 내역 관리 및 주문 상태 확인.",
    items: [
      { q: "결제 수단은 어떤 것들이 있나요?", a: "비자, 마스터카드, 아메리칸 익스프레스 등 주요 신용카드를 지원합니다. 기기 및 브라우저 환경에 따라 애플 페이와 구글 페이도 사용 가능합니다." },
      { q: "주문 후 취소가 가능한가요?", a: "배송 준비가 시작되기 전이라면 주문 취소가 가능합니다. 상품이 포장되거나 발송된 이후에는 취소가 어려울 수 있으며, 배송 완료 후 반품 신청을 이용해 주세요." },
      { q: "비회원 주문 배송 조회는 어떻게 하나요?", a: "발송 후 전송된 배송 확인 이메일을 통해 조회하실 수 있습니다. 주문 번호와 이메일 주소를 입력하면 주문 조회 페이지에서도 확인 가능합니다." },
    ],
  },
  {
    title: "배송",
    tab: "배송",
    desc: "국내외 주문의 배송 일정 및 배송 관련 안내.",
    items: [
      { q: "지역별 기본 배송 기간은 얼마나 되나요?", a: "국내 기본 배송은 발송 후 2~5 영업일 이내 도착합니다. 해외 배송은 지역 및 통관 처리에 따라 소요 기간이 달라질 수 있으며, 성수기에는 지연될 수 있습니다." },
      { q: "브랜드별 해외 배송은 어떻게 진행되나요?", a: "브랜드 위치, 재고 창고, 수입 조건에 따라 일부 상품은 개별 발송될 수 있습니다. 이 경우 이메일로 업데이트된 배송 정보를 안내해 드립니다." },
    ],
  },
  {
    title: "반품",
    tab: "반품",
    desc: "모든 주문에 대한 반품 및 교환 정책 안내.",
    items: [
      { q: "상품은 어떻게 반품하나요?", a: "수령일로부터 14일 이내에 반품 신청이 가능합니다. 미착용, 미세탁 상태로 원래 포장을 유지한 상품에 한해 반품이 가능하며, 고객센터를 통해 신청해 주세요." },
      { q: "환불은 언제 받을 수 있나요?", a: "반품 상품 수령 및 검수 완료 후 5~7 영업일 이내에 환불이 처리됩니다. 결제 수단으로 환불 금액이 지급됩니다." },
    ],
  },
  {
    title: "결제",
    tab: "결제",
    desc: "결제 수단 및 청구 관련 안내.",
    items: [
      { q: "결제 정보는 안전하게 보호되나요?", a: "네, 모든 거래는 SSL 암호화로 보호됩니다. 카드 정보는 서버에 저장되지 않습니다." },
      { q: "할부 결제가 가능한가요?", a: "카드사에 따라 할부 결제가 가능할 수 있습니다. 자세한 사항은 카드사에 문의해 주세요." },
    ],
  },
  {
    title: "상품",
    tab: "상품",
    desc: "사이즈, 재고, 상품 상세 정보 관련 문의.",
    items: [
      { q: "사이즈는 어떻게 선택하나요?", a: "각 상품 페이지에 사이즈 가이드가 제공됩니다. 본인의 신체 치수를 측정한 후 브랜드별 사이즈 차트와 비교해 선택해 주세요." },
      { q: "품절 상품은 언제 재입고되나요?", a: "상품 페이지에서 재고 현황을 확인하실 수 있습니다. 품절 상품은 알림 신청 기능을 이용하시면 재입고 시 알림을 받으실 수 있습니다." },
    ],
  },
  {
    title: "계정",
    tab: "계정",
    desc: "계정 및 개인 정보 관리 관련 안내.",
    items: [
      { q: "비밀번호를 잊어버렸어요.", a: '로그인 페이지에서 "비밀번호 찾기"를 클릭하고 가입한 이메일을 입력해 주세요. 몇 분 이내로 재설정 링크가 전송됩니다.' },
      { q: "이메일 주소를 변경할 수 있나요?", a: "로그인 후 계정 설정 페이지에서 이메일 주소를 변경하실 수 있습니다." },
    ],
  },
];

// ── 탭 필터 ──
const filteredSections = computed(() => {
  if (activeTab.value === "전체") return sections;
  return sections.filter((s) => s.tab === activeTab.value);
});
</script>

<style scoped>
/* ── 히어로 ── */
.faq-hero {
  display: flex;
  flex-direction: column;
  min-height: 560px;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .faq-hero {
    flex-direction: row;
    min-height: 614px;
  }
}

.faq-hero__text {
  width: 100%;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

@media (min-width: 768px) {
  .faq-hero__text {
    width: 50%;
  }
}

.faq-hero__label {
  display: block;
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 1.5rem;
}

.faq-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.5rem;
}

.faq-hero__desc {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  max-width: 28rem;
}

.faq-hero__img-wrap {
  width: 100%;
  min-height: 360px;
  background-color: var(--color-surface-container);
  position: relative;
  overflow: hidden;
}

@media (min-width: 768px) {
  .faq-hero__img-wrap {
    width: 50%;
  }
}

.faq-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.95);
}

/* ── 카테고리 탭 ── */
.faq-tabs {
  position: sticky;
  top: var(--header-height);
  z-index: 40;
  background-color: var(--color-surface);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.faq-tabs__inner {
  display: flex;
  gap: 2rem;
  padding: 1.5rem 3rem;
  overflow-x: auto;
  scrollbar-width: none;
  white-space: nowrap;
}

.faq-tabs__inner::-webkit-scrollbar {
  display: none;
}

.faq-tabs__btn {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-outline);
  padding-bottom: 0.5rem;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition:
    color 0.2s,
    border-color 0.2s;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
}

.faq-tabs__btn:hover {
  color: var(--color-primary);
}

.faq-tabs__btn--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 700;
}

/* ── FAQ 콘텐츠 ── */
.faq-content {
  max-width: 1280px;
  margin: 0 auto;
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.faq-section {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
}

@media (min-width: 768px) {
  .faq-section {
    grid-template-columns: 4fr 8fr;
    gap: 4rem;
  }
}

.faq-section__title {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}

.faq-section__desc {
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  max-width: 18rem;
  line-height: 1.7;
}

/* ── 아코디언 아이템 ── */
.faq-item {
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}

.faq-item__trigger {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.75rem 0;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
}

.faq-item__question {
  font-family: var(--font-headline);
  font-size: 1.125rem;
  font-weight: 700;
}

.faq-item__icon {
  font-size: 1.25rem;
  color: var(--color-outline);
  transition: transform 0.25s;
  flex-shrink: 0;
}

.faq-item__icon--open {
  transform: rotate(45deg);
}

.faq-item__body {
  display: grid;
  grid-template-rows: 0fr;
  opacity: 0;
  transition:
    grid-template-rows 0.35s ease,
    opacity 0.35s ease,
    margin 0.35s ease;
  overflow: hidden;
}

.faq-item__body--open {
  grid-template-rows: 1fr;
  opacity: 1;
  margin-bottom: 1.5rem;
}

.faq-item__body p {
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  line-height: 1.8;
  overflow: hidden;
}

/* ── 도움 섹션 ── */
.faq-help {
  background-color: var(--color-surface-container-low);
  padding: 6rem 3rem;
}

.faq-help__inner {
  max-width: 1280px;
  margin: 0 auto;
  background-color: #fff;
  padding: 4rem 5rem;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

@media (min-width: 768px) {
  .faq-help__inner {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
}

.faq-help__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 900;
  margin-bottom: 1rem;
}

.faq-help__desc {
  font-size: 1rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  max-width: 36rem;
}

.faq-help__btn {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.25rem 3rem;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.faq-help__btn:hover {
  opacity: 0.85;
}
</style>
