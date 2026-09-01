<template>
  <AdminLayout>
    <div class="ar">
      <div class="ar-head"><p class="ar-code">[ 08 / REVIEWS ]</p><h1 class="ar-title">리뷰 관리</h1></div>
      <div class="ar-wrap">
        <table class="ar-table">
          <thead><tr><th>ID</th><th>상품</th><th>작성자</th><th>별점</th><th>내용</th><th>답글</th><th>날짜</th><th></th></tr></thead>
          <tbody>
            <tr v-for="r in reviews" :key="r.id">
              <td class="t-id">{{ r.id }}</td>
              <td class="t-product">{{ r.productName }}</td>
              <td>{{ r.memberName }}</td>
              <td class="t-rating"><span v-for="n in 5" :key="n" :class="n <= r.rating ? 'star-on' : 'star-off'">★</span></td>
              <td class="t-content">{{ r.content }}</td>
              <td class="t-reply">
                <span v-if="r.reply" class="t-reply-text">{{ r.reply }}</span>
                <span v-else class="t-reply-none">없음</span>
              </td>
              <td class="t-date">{{ r.createdAt?.slice(0,10) }}</td>
              <td class="t-actions">
                <button class="t-btn" :disabled="submitting" @click="openReply(r)">{{ r.reply ? '수정' : '답글' }}</button>
                <button v-if="r.reply" class="t-btn t-btn--del" :disabled="submitting" @click="deleteReply(r.id)">답글삭제</button>
                <button class="t-del" :disabled="submitting" @click="del(r.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!reviews.length"><td colspan="8" class="t-empty">리뷰 없음</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 답글 모달 -->
      <BaseModal :show="showModal" max-width="520px" z-index="9999" no-padding :close-on-backdrop="false">
        <header class="modal__head">
          <h2>리뷰 답글</h2>
          <button :disabled="submitting" @click="showModal = false"><span class="material-symbols-outlined">close</span></button>
        </header>
        <div class="modal__body">
          <div class="modal__review">
            <div class="modal__review-stars"><span v-for="n in 5" :key="n" :class="n <= currentReview?.rating ? 'star-on' : 'star-off'">★</span></div>
            <p class="modal__review-author">{{ currentReview?.memberName }} · {{ currentReview?.productName }}</p>
            <p class="modal__review-content">{{ currentReview?.content }}</p>
          </div>
          <textarea v-model="replyText" :disabled="submitting" rows="4" placeholder="답글을 입력하세요"></textarea>
          <div class="modal__actions">
            <button class="modal__btn modal__btn--ghost" :disabled="submitting" @click="showModal = false">취소</button>
            <button class="modal__btn modal__btn--fill" :disabled="submitting" @click="submitReply">{{ submitting ? '저장 중...' : '저장' }}</button>
          </div>
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

const reviews = ref([]);
const showModal = ref(false);
const currentReview = ref(null);
const replyText = ref('');
const submitting = ref(false);

onMounted(async () => { await loadReviews(); });

async function loadReviews() {
  try { reviews.value = await api.get('/admin/reviews') || []; } catch {}
}

// 저장 중엔 다른 리뷰로 바꿔 열지 못하게 막음 — 안 그러면 저장 완료 시 showModal을
// 그냥 false로 닫아버려서, 방금 새로 연 다른 리뷰의 답글 작성 중이던 내용이 날아감
function openReply(r) {
  if (submitting.value) return;
  currentReview.value = r;
  replyText.value = r.reply || '';
  showModal.value = true;
}

async function submitReply() {
  if (submitting.value) return;
  if (!replyText.value.trim()) { alert('답글을 입력해주세요.'); return; }
  submitting.value = true;
  try {
    await api.post(`/admin/reviews/${currentReview.value.id}/reply`, { reply: replyText.value.trim() });
    showModal.value = false;
    await loadReviews();
  } catch (e) { alert(e.message || '답글 저장 실패'); }
  finally { submitting.value = false; }
}

async function deleteReply(id) {
  if (submitting.value) return;
  if (!confirm('답글을 삭제하시겠습니까?')) return;
  submitting.value = true;
  try { await api.delete(`/admin/reviews/${id}/reply`); await loadReviews(); }
  catch (e) { alert(e.message); }
  finally { submitting.value = false; }
}

async function del(id) {
  if (submitting.value) return;
  if (!confirm('리뷰를 삭제하시겠습니까?')) return;
  submitting.value = true;
  try { await api.delete(`/admin/reviews/${id}`); reviews.value = reviews.value.filter(r => r.id !== id); }
  catch (e) { alert(e.message); }
  finally { submitting.value = false; }
}
</script>

<style scoped>
.ar-head { margin-bottom: 1.5rem; }
.ar-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.ar-title { font-size: 1.75rem; font-weight: 900; }
.ar-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.ar-table { width: 100%; border-collapse: collapse; }
.ar-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.ar-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #bbb; width: 40px; }
.t-product { font-weight: 600; color: #111; max-width: 150px; }
.t-rating { white-space: nowrap; }
.star-on { color: #f59e0b; font-size: 0.75rem; }
.star-off { color: #e0e0e0; font-size: 0.75rem; }
.t-content { max-width: 200px; color: #555; font-size: 0.75rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.t-reply { max-width: 150px; }
.t-reply-text { font-size: 0.6875rem; color: #111; }
.t-reply-none { font-size: 0.6875rem; color: #ccc; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-actions { display: flex; gap: 0.375rem; }
.t-btn { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }
.t-btn:hover { border-color: #111; }
.t-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.t-btn--del { color: #e53e3e; border-color: #fecaca; }
.t-btn--del:hover { border-color: #e53e3e; }
.t-del { font-size: 0.625rem; color: #bbb; cursor: pointer; background: none; border: none; }
.t-del:hover { color: #e53e3e; }
.t-del:disabled { opacity: 0.5; cursor: not-allowed; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }

/* 모달 공용 뼈대(.modal/.modal__box/.modal__head/actions/btn)는 BaseModal.vue가 전역으로
   제공 — 이 화면에서만 쓰는 리뷰 표시 영역만 여기 남긴다. */
.modal__body { padding: 1.5rem; }
.modal__review { background: #fafaf8; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1.25rem; }
.modal__review-stars { margin-bottom: 0.5rem; }
.modal__review-author { font-size: 0.6875rem; color: #999; margin-bottom: 0.5rem; }
.modal__review-content { font-size: 0.8125rem; color: #333; line-height: 1.6; }
textarea { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; resize: vertical; outline: none; margin-bottom: 1rem; }
textarea:focus { border-color: #111; }
textarea:disabled { background: #fafaf8; color: #999; }
</style>
