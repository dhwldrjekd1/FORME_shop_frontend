<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <!-- 상단 헤더 -->
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Overview</p>
          <h2 class="admin-header__title">Dashboard</h2>
          <p class="admin-header__desc">
            FORME 스토어의 주문, 재고, 문의 현황을 한눈에 확인할 수 있는 관리자
            페이지입니다.
          </p>
        </div>
        <div class="admin-header__actions">
          <button class="admin-btn admin-btn--primary">Add Product</button>
          <button class="admin-btn admin-btn--outline">Export Data</button>
        </div>
      </header>

      <!-- 요약 카드 -->
      <section class="admin-cards">
        <div v-for="card in summaryCards" :key="card.label" class="admin-card">
          <p class="admin-card__label">{{ card.label }}</p>
          <h3 class="admin-card__value">{{ card.value }}</h3>
          <p class="admin-card__desc">{{ card.desc }}</p>
        </div>
      </section>

      <!-- 최근 주문 + 재고 -->
      <section class="admin-middle">
        <!-- 최근 주문 -->
        <div class="admin-box">
          <div class="admin-box__header">
            <div>
              <p class="admin-box__label">Orders</p>
              <h3 class="admin-box__title">Recent Orders</h3>
            </div>
            <RouterLink to="/admin/orders" class="admin-box__link"
              >View All</RouterLink
            >
          </div>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Order</th>
                  <th>Customer</th>
                  <th>Item</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="order in recentOrders" :key="order.id">
                  <td>{{ order.id }}</td>
                  <td>{{ order.customer }}</td>
                  <td>{{ order.item }}</td>
                  <td class="admin-table__muted">{{ order.date }}</td>
                  <td>
                    <span
                      class="admin-badge"
                      :class="getBadgeClass(order.status)"
                    >
                      {{ order.status }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 재고 현황 -->
        <div class="admin-box">
          <div class="admin-box__header">
            <div>
              <p class="admin-box__label">Inventory</p>
              <h3 class="admin-box__title">Low Stock Items</h3>
            </div>
          </div>
          <div class="admin-stock-list">
            <div
              v-for="item in lowStockItems"
              :key="item.name"
              class="admin-stock-item"
            >
              <div>
                <p class="admin-stock-item__name">{{ item.name }}</p>
                <p class="admin-stock-item__desc">{{ item.desc }}</p>
              </div>
              <span class="admin-stock-item__count">{{ item.count }} left</span>
            </div>
          </div>
        </div>
      </section>

      <!-- 최근 문의 + 빠른 액션 -->
      <section class="admin-bottom">
        <!-- 최근 Q&A -->
        <div class="admin-box">
          <div class="admin-box__header">
            <div>
              <p class="admin-box__label">Support</p>
              <h3 class="admin-box__title">Recent Q&amp;A</h3>
            </div>
            <RouterLink to="/admin/qna" class="admin-box__link"
              >Manage</RouterLink
            >
          </div>
          <div class="admin-qna-list">
            <div
              v-for="qna in recentQna"
              :key="qna.title"
              class="admin-qna-item"
            >
              <div class="admin-qna-item__top">
                <p class="admin-qna-item__title">{{ qna.title }}</p>
                <span class="admin-badge" :class="getBadgeClass(qna.status)">{{
                  qna.status
                }}</span>
              </div>
              <p class="admin-qna-item__meta">
                {{ qna.category }} · {{ qna.date }}
              </p>
            </div>
          </div>
        </div>

        <!-- 빠른 액션 -->
        <div class="admin-box">
          <div class="admin-box__header">
            <div>
              <p class="admin-box__label">Actions</p>
              <h3 class="admin-box__title">Quick Actions</h3>
            </div>
          </div>
          <div class="admin-actions-grid">
            <RouterLink
              v-for="action in quickActions"
              :key="action.label"
              :to="action.path"
              class="admin-action-btn"
            >
              <p class="admin-action-btn__label">{{ action.label }}</p>
              <p class="admin-action-btn__desc">{{ action.desc }}</p>
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";

// ── 요약 카드 ──
const summaryCards = [
  { label: "Today Orders", value: "128", desc: "전일 대비 +12%" },
  { label: "Revenue", value: "₩4.2M", desc: "이번 주 누적 매출" },
  { label: "Pending Q&A", value: "23", desc: "답변 대기 문의" },
  { label: "Low Stock", value: "8", desc: "재고 부족 상품 수" },
];

// ── 최근 주문 ──
const recentOrders = [
  {
    id: "#240531",
    customer: "김보경",
    item: "Levi's 555™",
    date: "2026.04.09",
    status: "Paid",
  },
  {
    id: "#240530",
    customer: "이수민",
    item: "Beanpole Shirt",
    date: "2026.04.09",
    status: "Pending",
  },
  {
    id: "#240529",
    customer: "박지훈",
    item: "Dickies Work Pants",
    date: "2026.04.08",
    status: "Shipped",
  },
  {
    id: "#240528",
    customer: "최유리",
    item: "Carhartt Jacket",
    date: "2026.04.08",
    status: "Ready",
  },
];

// ── 재고 부족 ──
const lowStockItems = [
  { name: "Levi's 555™ 30", desc: "Denim / Size 30", count: 3 },
  { name: "Dickies Work Pants 32", desc: "Black / Size 32", count: 5 },
  { name: "Beanpole Knit", desc: "Ivory / M", count: 2 },
  { name: "Carhartt Detroit Jacket", desc: "Brown / L", count: 4 },
];

// ── 최근 Q&A ──
const recentQna = [
  {
    title: "리바이스 555 재입고 예정 있나요?",
    category: "Product",
    date: "2026.04.09",
    status: "Pending",
  },
  {
    title: "디키즈 사이즈 추천 부탁드립니다.",
    category: "Product",
    date: "2026.04.08",
    status: "Answered",
  },
  {
    title: "배송지 변경 가능할까요?",
    category: "Order",
    date: "2026.04.08",
    status: "Pending",
  },
];

// ── 빠른 액션 ──
const quickActions = [
  {
    label: "상품 등록",
    desc: "새 상품 추가 및 대표 이미지 등록",
    path: "/admin/products",
  },
  {
    label: "주문 관리",
    desc: "결제/배송 상태 확인 및 변경",
    path: "/admin/orders",
  },
  {
    label: "FAQ 수정",
    desc: "자주 묻는 질문 문구 업데이트",
    path: "/admin/faq",
  },
  {
    label: "문의 답변",
    desc: "답변 대기 문의 빠르게 처리",
    path: "/admin/qna",
  },
];

// ── 뱃지 클래스 ──
function getBadgeClass(status) {
  const map = {
    Paid: "admin-badge--black",
    Shipped: "admin-badge--black",
    Answered: "admin-badge--black",
    Pending: "admin-badge--outline",
    Ready: "admin-badge--outline",
    Canceled: "admin-badge--outline",
  };
  return map[status] ?? "admin-badge--outline";
}
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.admin-main {
  padding: 2rem 3rem;
  overflow-y: auto;
}

/* ── 헤더 ── */
.admin-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .admin-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.admin-header__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #777;
}

.admin-header__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-top: 0.75rem;
}

.admin-header__desc {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
  line-height: 1.7;
  max-width: 40rem;
}

.admin-header__actions {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}

/* ── 버튼 ── */
.admin-btn {
  padding: 0.75rem 1.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: opacity 0.2s;
}

.admin-btn--primary {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}

.admin-btn--outline {
  background-color: #fff;
  color: #000;
  border: 1px solid #e5e5e5;
}

.admin-btn:hover {
  opacity: 0.8;
}

/* ── 요약 카드 ── */
.admin-cards {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 768px) {
  .admin-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1280px) {
  .admin-cards {
    grid-template-columns: repeat(4, 1fr);
  }
}

.admin-card {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  padding: 1.5rem;
}

.admin-card__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
}

.admin-card__value {
  font-family: var(--font-headline);
  font-size: 2.25rem;
  font-weight: 700;
  margin-top: 1rem;
}

.admin-card__desc {
  font-size: 0.875rem;
  color: #777;
  margin-top: 0.75rem;
}

/* ── 박스 공통 ── */
.admin-middle {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 1280px) {
  .admin-middle {
    grid-template-columns: 1.4fr 1fr;
  }
}

.admin-bottom {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1280px) {
  .admin-bottom {
    grid-template-columns: 1fr 1fr;
  }
}

.admin-box {
  background-color: #fff;
  border: 1px solid #e5e5e5;
  padding: 1.5rem;
}

.admin-box__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}

.admin-box__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
}

.admin-box__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 0.5rem;
}

.admin-box__link {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
  transition: color 0.2s;
}

.admin-box__link:hover {
  color: #000;
}

/* ── 테이블 ── */
.admin-table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  min-width: 560px;
  border-collapse: collapse;
}

.admin-table thead tr {
  border-bottom: 1px solid #e5e5e5;
  text-align: left;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
}

.admin-table th {
  padding: 1rem 0;
  font-weight: 500;
}

.admin-table tbody tr {
  border-bottom: 1px solid rgba(229, 229, 229, 0.7);
}

.admin-table td {
  padding: 1.25rem 0;
  font-size: 0.875rem;
  padding-right: 1rem;
}

.admin-table__muted {
  color: #777;
}

/* ── 뱃지 ── */
.admin-badge {
  display: inline-block;
  padding: 0.2rem 0.625rem;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
}

.admin-badge--black {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}

.admin-badge--outline {
  border: 1px solid #e5e5e5;
  color: #777;
}

/* ── 재고 목록 ── */
.admin-stock-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-stock-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.admin-stock-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.admin-stock-item__name {
  font-size: 0.875rem;
  font-weight: 500;
}
.admin-stock-item__desc {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
}
.admin-stock-item__count {
  font-size: 0.875rem;
  font-weight: 700;
}

/* ── Q&A 목록 ── */
.admin-qna-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-qna-item {
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.admin-qna-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.admin-qna-item__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.admin-qna-item__title {
  font-size: 0.875rem;
  font-weight: 500;
}
.admin-qna-item__meta {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.5rem;
}

/* ── 빠른 액션 ── */
.admin-actions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.admin-action-btn {
  background-color: #f3f3f3;
  border: 1px solid #e5e5e5;
  padding: 1.25rem;
  text-align: left;
  cursor: pointer;
  transition: background 0.2s;
  display: block;
}

.admin-action-btn:hover {
  background-color: #fff;
}

.admin-action-btn__label {
  font-size: 0.875rem;
  font-weight: 500;
}
.admin-action-btn__desc {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.5rem;
}
</style>
