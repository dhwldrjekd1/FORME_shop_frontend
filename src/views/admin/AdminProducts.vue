<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Inventory</p>
          <h2 class="admin-header__title">Products</h2>
          <p class="admin-header__desc">
            상품 등록, 재고 상태, 브랜드별 구성을 관리합니다.
          </p>
        </div>
        <div class="admin-header__actions">
          <button class="admin-btn admin-btn--primary">Add Product</button>
          <button class="admin-btn admin-btn--outline">Export List</button>
        </div>
      </header>

      <!-- 필터 -->
      <section class="admin-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="상품명 검색"
          class="admin-filter__input"
        />
        <select v-model="filterBrand" class="admin-filter__select">
          <option>All Brands</option>
          <option>Beanpole</option>
          <option>Levi's</option>
          <option>Dickies</option>
          <option>Carhartt</option>
        </select>
        <select v-model="filterStatus" class="admin-filter__select">
          <option>All Status</option>
          <option>In Stock</option>
          <option>Low Stock</option>
          <option>Sold Out</option>
        </select>
      </section>

      <!-- 테이블 -->
      <section class="admin-box">
        <div class="admin-table-wrap">
          <table class="admin-table" style="min-width: 900px">
            <thead>
              <tr>
                <th>Product</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in filteredProducts" :key="product.sku">
                <td>
                  <div class="admin-product-cell">
                    <div class="admin-product-cell__img"></div>
                    <div>
                      <p class="admin-product-cell__name">{{ product.name }}</p>
                      <p class="admin-product-cell__sku">
                        SKU · {{ product.sku }}
                      </p>
                    </div>
                  </div>
                </td>
                <td>{{ product.brand }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.stock }}</td>
                <td>
                  <span
                    class="admin-badge"
                    :class="getStockBadge(product.status)"
                  >
                    {{ product.status }}
                  </span>
                </td>
                <td>
                  <button class="admin-table__action">Edit</button>
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
const filterBrand = ref("All Brands");
const filterStatus = ref("All Status");

const products = ref([
  {
    name: "555™ Relaxed Straight Jean",
    sku: "LV-555-0001",
    brand: "Levi's",
    category: "Denim",
    price: "₩159,000",
    stock: 18,
    status: "In Stock",
  },
  {
    name: "Detroit Jacket",
    sku: "CH-DTJ-0004",
    brand: "Carhartt",
    category: "Outer",
    price: "₩239,000",
    stock: 4,
    status: "Low Stock",
  },
  {
    name: "Work Pants 874",
    sku: "DK-874-0012",
    brand: "Dickies",
    category: "Pants",
    price: "₩89,000",
    stock: 0,
    status: "Sold Out",
  },
  {
    name: "Classic Oxford Shirt",
    sku: "BP-OX-0021",
    brand: "Beanpole",
    category: "Shirt",
    price: "₩129,000",
    stock: 11,
    status: "In Stock",
  },
]);

const filteredProducts = computed(() => {
  return products.value.filter((p) => {
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchBrand =
      filterBrand.value === "All Brands" || p.brand === filterBrand.value;
    const matchStatus =
      filterStatus.value === "All Status" || p.status === filterStatus.value;
    return matchSearch && matchBrand && matchStatus;
  });
});

function getStockBadge(status) {
  if (status === "In Stock") return "admin-badge--black";
  if (status === "Low Stock") return "admin-badge--outline";
  if (status === "Sold Out") return "admin-badge--border";
  return "admin-badge--outline";
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
}

.admin-header__actions {
  display: flex;
  gap: 0.75rem;
}

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

.admin-filter {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 2rem;
}

@media (min-width: 768px) {
  .admin-filter {
    grid-template-columns: 1fr 180px 180px;
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

.admin-product-cell {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.admin-product-cell__img {
  width: 56px;
  height: 64px;
  background-color: #f3f3f3;
  flex-shrink: 0;
}
.admin-product-cell__name {
  font-weight: 500;
}
.admin-product-cell__sku {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.25rem;
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
