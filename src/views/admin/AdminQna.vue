<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Support</p>
          <h2 class="admin-header__title">Q&amp;A 관리</h2>
          <p class="admin-header__desc">
            고객 문의 목록을 확인하고 답변을 관리합니다.
          </p>
        </div>
      </header>

      <!-- 필터 -->
      <section class="admin-filter">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="문의 내용 검색"
          class="admin-filter__input"
        />
        <select v-model="filterCategory" class="admin-filter__select">
          <option>전체</option>
          <option>상품</option>
          <option>주문</option>
          <option>배송</option>
          <option>반품</option>
          <option>기타</option>
        </select>
        <select v-model="filterStatus" class="admin-filter__select">
          <option>전체</option>
          <option>답변완료</option>
          <option>대기중</option>
        </select>
      </section>

      <!-- 테이블 -->
      <section class="admin-box">
        <div class="admin-table-wrap">
          <table class="admin-table" style="min-width: 900px">
            <thead>
              <tr>
                <th>번호</th>
                <th>카테고리</th>
                <th>제목</th>
                <th>작성자</th>
                <th>날짜</th>
                <th>상태</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filteredItems" :key="item.id">
                <td class="admin-table__muted">
                  {{ String(item.id).padStart(3, "0") }}
                </td>
                <td>{{ item.category }}</td>
                <td class="admin-table__title">
                  {{ item.title }}
                  <span
                    v-if="item.locked"
                    class="material-symbols-outlined admin-table__lock"
                    >lock</span
                  >
                </td>
                <td>{{ item.writer }}</td>
                <td class="admin-table__muted">{{ item.date }}</td>
                <td>
                  <span
                    class="admin-badge"
                    :class="
                      item.status === '답변완료'
                        ? 'admin-badge--black'
                        : 'admin-badge--outline'
                    "
                  >
                    {{ item.status }}
                  </span>
                </td>
                <td>
                  <button class="admin-table__action" @click="openDetail(item)">
                    답변
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 답변 모달 -->
      <div
        v-if="selectedItem"
        class="admin-modal-overlay"
        @click.self="selectedItem = null"
      >
        <div class="admin-modal">
          <div class="admin-modal__header">
            <div>
              <span class="admin-modal__category">{{
                selectedItem.category
              }}</span>
              <h3 class="admin-modal__title">{{ selectedItem.title }}</h3>
              <p class="admin-modal__meta">
                {{ selectedItem.writer }} · {{ selectedItem.date }}
              </p>
            </div>
            <button class="admin-modal__close" @click="selectedItem = null">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="admin-modal__question">
            <p class="admin-modal__question-label">문의 내용</p>
            <p class="admin-modal__question-text">{{ selectedItem.content }}</p>
          </div>

          <div class="admin-modal__answer">
            <p class="admin-modal__answer-label">답변 작성</p>
            <textarea
              v-model="answerText"
              class="admin-modal__textarea"
              placeholder="답변을 입력해주세요..."
              rows="5"
            />
          </div>

          <div class="admin-modal__actions">
            <button
              class="admin-btn admin-btn--outline"
              @click="selectedItem = null"
            >
              취소
            </button>
            <button class="admin-btn admin-btn--primary" @click="submitAnswer">
              답변 등록
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import AdminSidebar from "@/components/admin/AdminSidebar.vue";

const searchQuery = ref("");
const filterCategory = ref("전체");
const filterStatus = ref("전체");
const selectedItem = ref(null);
const answerText = ref("");

const items = ref([
  {
    id: 84,
    category: "상품",
    title: "리바이스 555™ 릴렉스 스트레이트 진 재입고 예정일이 언제인가요?",
    writer: "j.k****",
    date: "2024.05.21",
    status: "대기중",
    locked: true,
    content:
      "리바이스 555™ 30 사이즈가 품절인데 재입고 예정이 있는지 알고 싶습니다.",
  },
  {
    id: 83,
    category: "상품",
    title: "디키즈 카펜터 팬츠 사이즈 추천 부탁드립니다.",
    writer: "arthur_h",
    date: "2024.05.20",
    status: "답변완료",
    locked: false,
    content:
      "평소 32 사이즈를 입는데 디키즈 카펜터 팬츠는 어떻게 사이즈를 선택해야 할까요?",
  },
  {
    id: 82,
    category: "반품",
    title: "주문번호 #92841 교환 신청합니다.",
    writer: "m.wilson",
    date: "2024.05.19",
    status: "답변완료",
    locked: true,
    content: "수령한 상품의 사이즈가 맞지 않아 교환을 원합니다.",
  },
  {
    id: 81,
    category: "배송",
    title: "해외 배송 요금 문의드립니다.",
    writer: "scandi_b",
    date: "2024.05.18",
    status: "답변완료",
    locked: false,
    content: "덴마크로 배송이 가능한지, 배송비는 얼마인지 궁금합니다.",
  },
  {
    id: 80,
    category: "상품",
    title: "칼하트 후드티 헤비웨이트 코튼 소재인가요?",
    writer: "green_life",
    date: "2024.05.18",
    status: "대기중",
    locked: false,
    content: "칼하트 후드티 소재가 헤비웨이트 코튼인지 확인하고 싶습니다.",
  },
]);

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchSearch = item.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());
    const matchCategory =
      filterCategory.value === "전체" || item.category === filterCategory.value;
    const matchStatus =
      filterStatus.value === "전체" || item.status === filterStatus.value;
    return matchSearch && matchCategory && matchStatus;
  });
});

function openDetail(item) {
  selectedItem.value = item;
  answerText.value = "";
}

function submitAnswer() {
  if (!answerText.value.trim()) {
    alert("답변을 입력해주세요.");
    return;
  }
  // 상태 업데이트
  const target = items.value.find((i) => i.id === selectedItem.value.id);
  if (target) target.status = "답변완료";

  alert("답변이 등록되었습니다.");
  selectedItem.value = null;
  answerText.value = "";
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
    grid-template-columns: 1fr 160px 160px;
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
.admin-table__muted {
  color: #777;
}

.admin-table__title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-headline);
}

.admin-table__lock {
  font-size: 0.875rem;
  color: #ccc;
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

/* ── 모달 ── */
.admin-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.admin-modal {
  background-color: #fff;
  width: 100%;
  max-width: 640px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.admin-modal__category {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #777;
}

.admin-modal__title {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: 0.5rem;
  line-height: 1.4;
}

.admin-modal__meta {
  font-size: 0.75rem;
  color: #777;
  margin-top: 0.5rem;
}

.admin-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  flex-shrink: 0;
  transition: color 0.2s;
}

.admin-modal__close:hover {
  color: #000;
}

.admin-modal__question {
  background-color: #f3f3f3;
  padding: 1.25rem;
}

.admin-modal__question-label,
.admin-modal__answer-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #777;
  margin-bottom: 0.75rem;
}

.admin-modal__question-text {
  font-size: 0.875rem;
  line-height: 1.7;
  color: #333;
}

.admin-modal__textarea {
  width: 100%;
  border: 1px solid #e5e5e5;
  padding: 1rem;
  font-size: 0.875rem;
  font-family: var(--font-body);
  resize: vertical;
  outline: none;
  margin-top: 0.75rem;
}

.admin-modal__textarea:focus {
  border-color: #000;
}

.admin-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}

.admin-btn {
  padding: 0.75rem 1.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: opacity 0.2s;
  border: none;
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
</style>
