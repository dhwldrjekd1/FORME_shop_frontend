<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Commerce</p>
          <h2 class="admin-header__title">Orders</h2>
          <p class="admin-header__desc">
            주문 상태, 결제, 배송 진행 상황을 관리합니다.
          </p>
        </div>
      </header>

      <!-- 필터 -->
      <section class="admin-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="주문번호 또는 고객명 검색"
          class="admin-filter__input"
        />
        <select v-model="filterStatus" class="admin-filter__select">
          <option>All Status</option>
          <option>Paid</option>
          <option>Ready</option>
          <option>Shipped</option>
          <option>Canceled</option>
        </select>
        <select v-model="sortOrder" class="admin-filter__select">
          <option>Newest First</option>
          <option>Oldest First</option>
        </select>
      </section>

      <!-- 테이블 -->
      <section class="admin-box">
        <div class="admin-table-wrap">
          <table class="admin-table" style="min-width: 1000px">
            <thead>
              <tr>
                <th>Order No</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in filteredOrders" :key="order.id">
                <td class="admin-table__bold">{{ order.id }}</td>
                <td>{{ order.customer }}</td>
                <td>{{ order.items }}</td>
                <td>{{ order.amount }}</td>
                <td class="admin-table__muted">{{ order.date }}</td>
                <td>
                  <span
                    class="admin-badge"
                    :class="getOrderBadge(order.status)"
                  >
                    {{ order.status }}
                  </span>
                </td>
                <td>
                  <button class="admin-table__action">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";

const searchQuery = ref("");
const filterStatus = ref("All Status");
const sortOrder = ref("Newest First");

const orders = ref([
  {
    id: "#240531",
    customer: "김보경",
    items: "Levi's 555™ / Beanpole Shirt",
    amount: "₩288,000",
    date: "2026.04.09",
    status: "Paid",
  },
  {
    id: "#240530",
    customer: "이수민",
    items: "Carhartt Jacket",
    amount: "₩239,000",
    date: "2026.04.09",
    status: "Ready",
  },
  {
    id: "#240529",
    customer: "박지훈",
    items: "Dickies Work Pants",
    amount: "₩89,000",
    date: "2026.04.08",
    status: "Shipped",
  },
  {
    id: "#240528",
    customer: "최유리",
    items: "Beanpole Knit",
    amount: "₩149,000",
    date: "2026.04.08",
    status: "Canceled",
  },
]);

const filteredOrders = computed(() => {
  let result = orders.value.filter((o) => {
    const matchSearch =
      o.id.includes(searchQuery.value) ||
      o.customer.includes(searchQuery.value);
    const matchStatus =
      filterStatus.value === "All Status" || o.status === filterStatus.value;
    return matchSearch && matchStatus;
  });
  if (sortOrder.value === "Oldest First") result = [...result].reverse();
  return result;
});

function getOrderBadge(status) {
  const map = {
    Paid: "admin-badge--black",
    Shipped: "admin-badge--black",
    Ready: "admin-badge--outline",
    Canceled: "admin-badge--border",
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
}

.admin-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
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
}

.admin-filter {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .admin-filter {
    grid-template-columns: 1fr 200px 200px;
  }
}

.admin-filter__input,
.admin-filter__select {
  border: 1px solid #e5e5e5;
  background-color: #fff;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
}

.admin-filter__input:focus,
.admin-filter__select:focus {
  border-color: #000;
}

.admin-box {
  background-color: #fff;
  border: 1px solid #e5e5e5;
}
.admin-table-wrap {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
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
  padding: 1rem 1.5rem;
  font-weight: 500;
}

.admin-table tbody tr {
  border-bottom: 1px solid rgba(229, 229, 229, 0.7);
  transition: background 0.2s;
}

.admin-table tbody tr:hover {
  background-color: #f9f9f9;
}
.admin-table td {
  padding: 1.25rem 1.5rem;
  font-size: 0.875rem;
}
.admin-table__bold {
  font-weight: 500;
}
.admin-table__muted {
  color: #777;
}

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
.admin-badge--border {
  border: 1px solid #000;
  color: #000;
}

.admin-table__action {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.admin-table__action:hover {
  color: #000;
}
</style>
