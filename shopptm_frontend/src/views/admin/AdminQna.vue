<template>
  <AdminLayout>
    <div class="aq">
      <div class="aq-head"><p class="aq-code">[ 04 / Q&A ]</p><h1 class="aq-title">Q&A 관리</h1></div>
      <div class="aq-wrap">
        <table class="aq-table">
          <thead><tr><th>번호</th><th>제목</th><th>작성자</th><th>상태</th><th>날짜</th><th></th></tr></thead>
          <tbody>
            <tr v-for="q in items" :key="q.id">
              <td class="t-id">{{ q.id }}</td>
              <td class="t-title">{{ q.title }}</td>
              <td>{{ q.memberName }}</td>
              <td><span class="tag" :class="q.isAnswered ? 'tag--done' : 'tag--wait'">{{ q.isAnswered ? '답변완료' : '대기' }}</span></td>
              <td class="t-date">{{ q.createdAt?.slice(0,10) }}</td>
              <td class="t-actions">
                <button class="t-btn" @click="openAnswer(q)">{{ q.isAnswered ? '수정' : '답변' }}</button>
                <button class="t-del" @click="del(q.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!items.length"><td colspan="6" class="t-empty">문의 없음</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 답변 모달 -->
      <Teleport to="body">
        <div v-if="showModal" class="modal" @click.self="showModal = false">
          <div class="modal__box">
            <h2 class="modal__title">답변 작성</h2>
            <p class="modal__q">{{ currentQ?.title }}</p>
            <p class="modal__content">{{ currentQ?.content }}</p>
            <textarea v-model="answerText" rows="5" placeholder="답변을 입력하세요"></textarea>
            <div class="modal__actions">
              <button class="modal__btn modal__btn--ghost" @click="showModal = false">취소</button>
              <button class="modal__btn modal__btn--fill" @click="submitAnswer">저장</button>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";
const items = ref([]); const showModal = ref(false); const currentQ = ref(null); const answerText = ref('');
onMounted(async () => { try { items.value = await api.get('/qna') || []; } catch {} });
function openAnswer(q) { currentQ.value = q; answerText.value = q.answer || ''; showModal.value = true; }
async function submitAnswer() {
  if (!answerText.value.trim()) return;
  try { await api.post(`/admin/qna/${currentQ.value.id}/answer`, { answer: answerText.value.trim() }); currentQ.value.answer = answerText.value.trim(); currentQ.value.isAnswered = true; showModal.value = false; } catch (e) { alert(e.message); }
}
async function del(id) { if (!confirm('삭제하시겠습니까?')) return; try { await api.delete(`/admin/qna/${id}`); items.value = items.value.filter(q => q.id !== id); } catch (e) { alert(e.message); } }
</script>
<style scoped>
.aq-head { margin-bottom: 1.5rem; }
.aq-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.aq-title { font-size: 1.75rem; font-weight: 900; }
.aq-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.aq-table { width: 100%; border-collapse: collapse; }
.aq-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.aq-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #bbb; width: 50px; }
.t-title { font-weight: 600; color: #111; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-actions { display: flex; gap: 0.5rem; }
.t-btn { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.25rem 0.625rem; border-radius: 0.25rem; }
.t-btn:hover { border-color: #111; }
.t-del { font-size: 0.625rem; color: #bbb; cursor: pointer; background: none; border: none; }
.t-del:hover { color: #e53e3e; }
.tag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; }
.tag--done { background: #111; color: #fff; }
.tag--wait { background: #f0f0f0; color: #999; }
.modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.modal__box { background: #fff; width: 100%; max-width: 520px; border-radius: 0.75rem; padding: 2rem; }
.modal__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 1rem; }
.modal__q { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.5rem; }
.modal__content { font-size: 0.8125rem; color: #666; margin-bottom: 1.25rem; line-height: 1.6; }
.modal__box textarea { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; resize: vertical; outline: none; margin-bottom: 1rem; }
.modal__box textarea:focus { border-color: #111; }
.modal__actions { display: flex; gap: 0.625rem; }
.modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; }
.modal__btn--fill { background: #111; color: #fff; }
.modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
</style>
