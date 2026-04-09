<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">Support</p>
          <h2 class="admin-header__title">FAQ 관리</h2>
          <p class="admin-header__desc">
            자주 묻는 질문을 추가, 수정, 삭제합니다.
          </p>
        </div>
        <button class="admin-btn admin-btn--primary" @click="openAdd">
          FAQ 추가
        </button>
      </header>

      <!-- 카테고리 탭 -->
      <div class="admin-faq-tabs">
        <button
          v-for="tab in tabs"
          :key="tab"
          class="admin-faq-tab"
          :class="{ 'admin-faq-tab--active': activeTab === tab }"
          @click="activeTab = tab"
        >
          {{ tab }}
        </button>
      </div>

      <!-- FAQ 목록 -->
      <section class="admin-faq-list">
        <div
          v-for="item in filteredItems"
          :key="item.id"
          class="admin-faq-item"
        >
          <div class="admin-faq-item__left">
            <span class="admin-faq-item__category">{{ item.category }}</span>
            <p class="admin-faq-item__question">{{ item.question }}</p>
            <p class="admin-faq-item__answer">{{ item.answer }}</p>
          </div>
          <div class="admin-faq-item__actions">
            <button class="admin-faq-item__btn" @click="openEdit(item)">
              수정
            </button>
            <button
              class="admin-faq-item__btn admin-faq-item__btn--delete"
              @click="deleteItem(item.id)"
            >
              삭제
            </button>
          </div>
        </div>
      </section>

      <!-- 추가 / 수정 모달 -->
      <div
        v-if="showModal"
        class="admin-modal-overlay"
        @click.self="showModal = false"
      >
        <div class="admin-modal">
          <div class="admin-modal__header">
            <h3 class="admin-modal__title">
              {{ isEditing ? "FAQ 수정" : "FAQ 추가" }}
            </h3>
            <button class="admin-modal__close" @click="showModal = false">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <div class="admin-modal__form">
            <div class="admin-modal__group">
              <label class="admin-modal__label">카테고리</label>
              <select v-model="form.category" class="admin-modal__select">
                <option>주문</option>
                <option>배송</option>
                <option>반품</option>
                <option>결제</option>
                <option>상품</option>
                <option>계정</option>
              </select>
            </div>
            <div class="admin-modal__group">
              <label class="admin-modal__label">질문</label>
              <input
                v-model="form.question"
                type="text"
                class="admin-modal__input"
                placeholder="질문을 입력해주세요"
              />
            </div>
            <div class="admin-modal__group">
              <label class="admin-modal__label">답변</label>
              <textarea
                v-model="form.answer"
                class="admin-modal__textarea"
                placeholder="답변을 입력해주세요"
                rows="5"
              />
            </div>
          </div>

          <div class="admin-modal__actions">
            <button
              class="admin-btn admin-btn--outline"
              @click="showModal = false"
            >
              취소
            </button>
            <button class="admin-btn admin-btn--primary" @click="saveItem">
              저장
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

const tabs = ["전체", "주문", "배송", "반품", "결제", "상품", "계정"];
const activeTab = ref("전체");
const showModal = ref(false);
const isEditing = ref(false);

const form = ref({ id: null, category: "주문", question: "", answer: "" });

const items = ref([
  {
    id: 1,
    category: "주문",
    question: "결제 수단은 어떤 것들이 있나요?",
    answer:
      "비자, 마스터카드, 아메리칸 익스프레스 등 주요 신용카드를 지원합니다.",
  },
  {
    id: 2,
    category: "주문",
    question: "주문 후 취소가 가능한가요?",
    answer: "배송 준비가 시작되기 전이라면 주문 취소가 가능합니다.",
  },
  {
    id: 3,
    category: "배송",
    question: "지역별 기본 배송 기간은 얼마나 되나요?",
    answer: "국내 기본 배송은 발송 후 2~5 영업일 이내 도착합니다.",
  },
  {
    id: 4,
    category: "반품",
    question: "상품은 어떻게 반품하나요?",
    answer: "수령일로부터 14일 이내에 반품 신청이 가능합니다.",
  },
  {
    id: 5,
    category: "상품",
    question: "사이즈는 어떻게 선택하나요?",
    answer: "각 상품 페이지에 사이즈 가이드가 제공됩니다.",
  },
]);

const filteredItems = computed(() => {
  if (activeTab.value === "전체") return items.value;
  return items.value.filter((i) => i.category === activeTab.value);
});

function openAdd() {
  isEditing.value = false;
  form.value = { id: null, category: "주문", question: "", answer: "" };
  showModal.value = true;
}

function openEdit(item) {
  isEditing.value = true;
  form.value = { ...item };
  showModal.value = true;
}

function saveItem() {
  if (!form.value.question.trim() || !form.value.answer.trim()) {
    alert("질문과 답변을 입력해주세요.");
    return;
  }
  if (isEditing.value) {
    const idx = items.value.findIndex((i) => i.id === form.value.id);
    if (idx !== -1) items.value[idx] = { ...form.value };
  } else {
    items.value.push({
      id: Date.now(),
      category: form.value.category,
      question: form.value.question,
      answer: form.value.answer,
    });
  }
  showModal.value = false;
}

function deleteItem(id) {
  if (!confirm("삭제하시겠습니까?")) return;
  items.value = items.value.filter((i) => i.id !== id);
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
  margin-bottom: 2rem;
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
  padding: 0.75rem 1.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  cursor: pointer;
  transition: opacity 0.2s;
  border: none;
  white-space: nowrap;
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

/* 탭 */
.admin-faq-tabs {
  display: flex;
  gap: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  overflow-x: auto;
  scrollbar-width: none;
}

.admin-faq-tabs::-webkit-scrollbar {
  display: none;
}

.admin-faq-tab {
  padding: 0.75rem 1.25rem;
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #777;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  white-space: nowrap;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.admin-faq-tab:hover {
  color: #000;
}

.admin-faq-tab--active {
  color: #000;
  border-bottom-color: #000;
  font-weight: 700;
}

/* FAQ 목록 */
.admin-faq-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.admin-faq-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  padding: 1.5rem 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}

.admin-faq-item__left {
  flex: 1;
}

.admin-faq-item__category {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #777;
  display: block;
  margin-bottom: 0.5rem;
}

.admin-faq-item__question {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.admin-faq-item__answer {
  font-size: 0.875rem;
  color: #777;
  line-height: 1.6;
}

.admin-faq-item__actions {
  display: flex;
  gap: 0.75rem;
  flex-shrink: 0;
}

.admin-faq-item__btn {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #777;
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.admin-faq-item__btn:hover {
  color: #000;
}

.admin-faq-item__btn--delete:hover {
  color: #ba1a1a;
}

/* 모달 */
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
  max-width: 560px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.admin-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.admin-modal__title {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 700;
}

.admin-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  transition: color 0.2s;
}

.admin-modal__close:hover {
  color: #000;
}

.admin-modal__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.admin-modal__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-modal__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #777;
}

.admin-modal__input,
.admin-modal__select,
.admin-modal__textarea {
  border: 1px solid #e5e5e5;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  font-family: var(--font-body);
  outline: none;
  background-color: #fff;
  transition: border-color 0.2s;
}

.admin-modal__input:focus,
.admin-modal__select:focus,
.admin-modal__textarea:focus {
  border-color: #000;
}

.admin-modal__textarea {
  resize: vertical;
}

.admin-modal__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
}
</style>
