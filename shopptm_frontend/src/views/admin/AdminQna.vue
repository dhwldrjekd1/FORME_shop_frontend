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
                <button class="t-btn" :disabled="submitting" @click="openAnswer(q)">{{ q.isAnswered ? '수정' : '답변' }}</button>
                <button class="t-del" :disabled="submitting" @click="del(q.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!items.length"><td colspan="6" class="t-empty">문의 없음</td></tr>
          </tbody>
        </table>
      </div>
      <Pagination :page="page" :total-pages="totalPages" :disabled="submitting" @change="goToPage" />

      <!-- 답변 모달 -->
      <BaseModal :show="showModal" max-width="520px" :locked="submitting" @close="showModal = false">
        <h2 class="modal__title">답변 작성</h2>
        <p class="modal__q">{{ currentQ?.title }}</p>
        <p class="modal__content">{{ currentQ?.content }}</p>
        <textarea v-model="answerText" :disabled="submitting" rows="5" placeholder="답변을 입력하세요"></textarea>
        <div class="modal__actions">
          <button class="modal__btn modal__btn--ghost" :disabled="submitting" @click="showModal = false">취소</button>
          <button class="modal__btn modal__btn--fill" :disabled="submitting" @click="submitAnswer">{{ submitting ? '저장 중...' : '저장' }}</button>
        </div>
      </BaseModal>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import BaseModal from "@/components/BaseModal.vue";
import Pagination from "@/components/Pagination.vue";
import api from "@/api";
const items = ref([]); const showModal = ref(false); const currentQ = ref(null); const answerText = ref('');
const submitting = ref(false);
const page = ref(0); const totalPages = ref(0);
// 백엔드가 전체 목록을 한 번에 반환하던 걸 Page 응답(content/totalPages)으로 바꾼 것에 맞춰
// content만 반영한다(AdminMembers.vue/AdminOrders.vue/AdminReviews.vue/AdminBoard.vue와 동일한 패턴).
// 페이지 전환을 빠르게 연타하면 응답이 보낸 순서와 다르게 도착할 수 있어(교차검증에서
// 발견 — 다른 화면들의 fetchSeq/searchSeq와 동일한 이유), 가장 나중에 보낸 요청만 반영.
let loadSeq = 0;
async function loadQna() {
  const seq = ++loadSeq;
  try {
    const data = await api.get(`/qna?page=${page.value}&size=20`);
    if (seq !== loadSeq) return;
    items.value = data?.content || [];
    totalPages.value = data?.totalPages || 0;
  } catch {}
}
function goToPage(p) {
  if (p < 0 || p >= totalPages.value) return;
  page.value = p;
  loadQna();
}
onMounted(loadQna);
// 저장 중엔 다른 문의로 바꿔 열지 못하게 막음 — 안 그러면 저장 요청이 끝난 뒤
// currentQ가 이미 다른 문의를 가리키고 있어서 그 문의에 엉뚱하게 답변이 붙을 수 있음
function openAnswer(q) { if (submitting.value) return; currentQ.value = q; answerText.value = q.answer || ''; showModal.value = true; }
async function submitAnswer() {
  if (!answerText.value.trim() || submitting.value) return;
  submitting.value = true;
  // currentQ.value를 미리 고정해둔다 — await 도중 누군가 currentQ를 바꿀 수는 없어졌지만(가드 추가),
  // 그래도 응답 처리 시점엔 항상 "이 요청이 실제로 보낸 대상"에만 반영되도록 방어적으로 고정
  const target = currentQ.value;
  try { await api.post(`/admin/qna/${target.id}/answer`, { answer: answerText.value.trim() }); target.answer = answerText.value.trim(); target.isAnswered = true; showModal.value = false; } catch (e) { alert(e.message); }
  finally { submitting.value = false; }
}
async function del(id) {
  if (submitting.value) return;
  if (!confirm('삭제하시겠습니까?')) return;
  submitting.value = true;
  try {
    await api.delete(`/admin/qna/${id}`);
    // 재조회가 실패하면(네트워크 일시 오류 등) 이미 지워진 항목이 화면에 계속 남는데 에러도
    // 안 뜰 수 있어(교차검증에서 발견) 먼저 로컬에서도 지운다. 로컬 필터만으로 끝내지 않는
    // 이유는 AdminReviews.vue/AdminBoard.vue와 동일(totalPages가 삭제 전 값 그대로 남아
    // 페이지네이션이 서버 상태와 어긋날 수 있음) — 그래서 재조회도 한다. 그 페이지가 방금
    // 삭제로 비어버렸으면 한 페이지 앞으로 돌아간다.
    items.value = items.value.filter(q => q.id !== id);
    await loadQna();
    if (!items.value.length && page.value > 0) {
      page.value -= 1;
      await loadQna();
    }
  }
  catch (e) { alert(e.message); }
  finally { submitting.value = false; }
}
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
.t-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.t-del { font-size: 0.625rem; color: #bbb; cursor: pointer; background: none; border: none; }
.t-del:hover { color: #e53e3e; }
.t-del:disabled { opacity: 0.5; cursor: not-allowed; }
.tag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; }
.tag--done { background: #111; color: #fff; }
.tag--wait { background: #f0f0f0; color: #999; }
/* 모달 공용 뼈대(.modal/.modal__box)와 actions/btn 스타일은 BaseModal.vue가 전역으로 제공.
   title 간격은 이 화면(질문/내용 미리보기가 바로 붙는 배치)에 맞춰 기존 값(1rem)을 유지. */
.modal__title { margin-bottom: 1rem; }
.modal__q { font-size: 0.9375rem; font-weight: 600; margin-bottom: 0.5rem; }
.modal__content { font-size: 0.8125rem; color: #666; margin-bottom: 1.25rem; line-height: 1.6; }
textarea { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; resize: vertical; outline: none; margin-bottom: 1rem; }
textarea:focus { border-color: #111; }
textarea:disabled { background: #fafaf8; color: #999; }
</style>
