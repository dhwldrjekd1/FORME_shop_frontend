<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Management</p>
          <h2 class="admin-header__title">Members</h2>
          <p class="admin-header__desc">
            가입 회원 목록을 확인하고 관리합니다.
          </p>
        </div>
        <button class="admin-btn admin-btn--outline">Export List</button>
      </header>

      <!-- 필터 -->
      <section class="admin-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="이름 또는 이메일 검색"
          class="admin-filter__input"
        />
        <select v-model="filterStatus" class="admin-filter__select">
          <option>전체</option>
          <option>활성</option>
          <option>정지</option>
        </select>
      </section>

      <!-- 테이블 -->
      <section class="admin-box">
        <div class="admin-table-wrap">
          <table class="admin-table" style="min-width: 860px">
            <thead>
              <tr>
                <th>번호</th>
                <th>이름</th>
                <th>이메일</th>
                <th>가입일</th>
                <th>주문수</th>
                <th>상태</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="member in filteredMembers" :key="member.id">
                <td class="admin-table__muted">
                  {{ String(member.id).padStart(4, "0") }}
                </td>
                <td class="admin-table__bold">{{ member.name }}</td>
                <td>{{ member.email }}</td>
                <td class="admin-table__muted">{{ member.joinDate }}</td>
                <td>{{ member.orderCount }}</td>
                <td>
                  <span
                    class="admin-badge"
                    :class="
                      member.status === '활성'
                        ? 'admin-badge--black'
                        : 'admin-badge--outline'
                    "
                  >
                    {{ member.status }}
                  </span>
                </td>
                <td>
                  <button
                    class="admin-table__action"
                    @click="toggleStatus(member)"
                  >
                    {{ member.status === "활성" ? "정지" : "활성화" }}
                  </button>
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
const filterStatus = ref("전체");

const members = ref([
  {
    id: 1,
    name: "김보경",
    email: "bokyung@example.com",
    joinDate: "2024.01.15",
    orderCount: 5,
    status: "활성",
  },
  {
    id: 2,
    name: "이수민",
    email: "sumin@example.com",
    joinDate: "2024.02.03",
    orderCount: 2,
    status: "활성",
  },
  {
    id: 3,
    name: "박지훈",
    email: "jihun@example.com",
    joinDate: "2024.02.18",
    orderCount: 8,
    status: "활성",
  },
  {
    id: 4,
    name: "최유리",
    email: "yuri@example.com",
    joinDate: "2024.03.07",
    orderCount: 1,
    status: "정지",
  },
  {
    id: 5,
    name: "정민준",
    email: "minjun@example.com",
    joinDate: "2024.03.22",
    orderCount: 3,
    status: "활성",
  },
  {
    id: 6,
    name: "한소희",
    email: "sohee@example.com",
    joinDate: "2024.04.01",
    orderCount: 0,
    status: "활성",
  },
]);

const filteredMembers = computed(() => {
  return members.value.filter((m) => {
    const matchSearch =
      m.name.includes(searchQuery.value) || m.email.includes(searchQuery.value);
    const matchStatus =
      filterStatus.value === "전체" || m.status === filterStatus.value;
    return matchSearch && matchStatus;
  });
});

function toggleStatus(member) {
  member.status = member.status === "활성" ? "정지" : "활성";
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

.admin-btn {
  padding: 0.75rem 1.25rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: opacity 0.2s;
  white-space: nowrap;
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
    grid-template-columns: 1fr 160px;
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
