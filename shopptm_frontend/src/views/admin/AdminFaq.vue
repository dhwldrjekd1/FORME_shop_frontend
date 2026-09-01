<template>
  <AdminLayout>
    <div class="af">
      <div class="af-head">
        <div>
          <p class="af-code">[ 05 / FAQ ]</p>
          <h1 class="af-title">FAQ 관리</h1>
        </div>
        <button class="af-add" :disabled="submitting" @click="openCreate">+ FAQ 추가</button>
      </div>

      <div class="af-wrap">
        <table class="af-table">
          <thead><tr><th>카테고리</th><th>질문</th><th>순서</th><th>날짜</th><th></th></tr></thead>
          <tbody>
            <tr v-for="f in items" :key="f.id">
              <td><span class="tag">{{ f.category }}</span></td>
              <td class="t-q">{{ f.question }}</td>
              <td class="t-order">{{ f.sortOrder }}</td>
              <td class="t-date">{{ f.createdAt?.slice(0, 10) }}</td>
              <td class="t-actions">
                <button class="t-btn" :disabled="submitting" @click="openEdit(f)">수정</button>
                <button class="t-del" :disabled="submitting" @click="del(f.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!items.length"><td colspan="5" class="t-empty">등록된 FAQ 없음</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 등록/수정 모달 -->
      <BaseModal :show="showModal" max-width="520px" :locked="submitting" @close="showModal = false">
        <h2 class="modal__title">{{ editingId ? "FAQ 수정" : "FAQ 등록" }}</h2>

        <select v-model="form.category" :disabled="submitting" class="modal__select">
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>

        <input v-model="form.question" type="text" placeholder="질문" :disabled="submitting" class="modal__input" />
        <textarea v-model="form.answer" rows="4" placeholder="답변을 입력하세요" :disabled="submitting"></textarea>

        <label class="modal__label">정렬 순서 (작을수록 먼저 표시)</label>
        <input v-model.number="form.sortOrder" type="number" :disabled="submitting" class="modal__input" />

        <div class="modal__actions">
          <button class="modal__btn modal__btn--ghost" :disabled="submitting" @click="showModal = false">취소</button>
          <button class="modal__btn modal__btn--fill" :disabled="submitting" @click="submit">{{ submitting ? '저장 중...' : '저장' }}</button>
        </div>
      </BaseModal>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import BaseModal from "@/components/BaseModal.vue";
import api from "@/api";

const categories = ["주문", "배송", "반품", "결제", "상품", "계정"];

const items = ref([]);
const showModal = ref(false);
const editingId = ref(null);
const form = ref({ category: categories[0], question: "", answer: "", sortOrder: 0 });
const submitting = ref(false);

async function load() {
  try { items.value = await api.get("/faq") || []; } catch { items.value = []; }
}
onMounted(load);

// 저장 중엔 다른 FAQ로 바꿔 열지 못하게 막음 — 안 그러면 저장 완료 시 showModal을
// 그냥 false로 닫아버려서, 방금 새로 연 다른 FAQ의 작성 중이던 내용이 날아감
function openCreate() {
  if (submitting.value) return;
  editingId.value = null;
  form.value = { category: categories[0], question: "", answer: "", sortOrder: 0 };
  showModal.value = true;
}
function openEdit(f) {
  if (submitting.value) return;
  editingId.value = f.id;
  form.value = { category: f.category, question: f.question, answer: f.answer, sortOrder: f.sortOrder };
  showModal.value = true;
}

async function submit() {
  if (submitting.value) return;
  if (!form.value.question.trim() || !form.value.answer.trim()) return;
  submitting.value = true;
  try {
    if (editingId.value) {
      await api.put(`/admin/faq/${editingId.value}`, form.value);
    } else {
      await api.post("/admin/faq", form.value);
    }
    showModal.value = false;
    await load();
  } catch (e) {
    alert(e.message);
  } finally {
    submitting.value = false;
  }
}

async function del(id) {
  if (submitting.value) return;
  if (!confirm("삭제하시겠습니까?")) return;
  submitting.value = true;
  try {
    await api.delete(`/admin/faq/${id}`);
    items.value = items.value.filter((f) => f.id !== id);
  } catch (e) {
    alert(e.message);
  } finally {
    submitting.value = false;
  }
}
</script>
<style scoped>
.af-head { margin-bottom: 1.5rem; display: flex; align-items: flex-end; justify-content: space-between; }
.af-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.af-title { font-size: 1.75rem; font-weight: 900; }
.af-add { font-size: 0.75rem; font-weight: 700; color: #fff; background: #111; border: none; padding: 0.75rem 1.25rem; border-radius: 0.375rem; cursor: pointer; }
.af-add:hover { opacity: 0.85; }
.af-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.af-table { width: 100%; border-collapse: collapse; }
.af-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.af-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-q { font-weight: 600; color: #111; max-width: 360px; }
.t-order { color: #bbb; width: 60px; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-actions { display: flex; gap: 0.5rem; }
.t-btn { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.25rem 0.625rem; border-radius: 0.25rem; }
.t-btn:hover { border-color: #111; }
.t-del { font-size: 0.625rem; color: #bbb; cursor: pointer; background: none; border: none; }
.t-del:hover { color: #e53e3e; }
.t-del:disabled { opacity: 0.5; cursor: not-allowed; }
.tag { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.05em; padding: 0.2rem 0.5rem; background: #f0f0f0; color: #666; border-radius: 0.25rem; }
/* 모달 공용 뼈대(.modal/.modal__box)와 actions/btn 스타일은 BaseModal.vue가 전역으로 제공.
   title/input 간격은 이 화면 폼(select/label 촘촘한 배치)에 맞춰 기존 값(1rem)을 유지. */
.modal__title { margin-bottom: 1rem; }
.modal__select, .modal__input, textarea { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; margin-bottom: 1rem; }
textarea { resize: vertical; }
.modal__select:focus, textarea:focus { border-color: #111; }
.modal__select:disabled, textarea:disabled { background: #fafaf8; color: #999; }
.modal__label { display: block; font-size: 0.6875rem; color: #999; margin-bottom: 0.375rem; }
</style>
