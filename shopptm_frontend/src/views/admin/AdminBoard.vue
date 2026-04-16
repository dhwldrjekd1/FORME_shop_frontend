<template>
  <AdminLayout>
    <div class="ab">
      <div class="ab-head">
        <div>
          <p class="ab-code">[ 10 / BOARD ]</p>
          <h1 class="ab-title">게시판 관리</h1>
        </div>
      </div>

      <div class="ab-wrap">
        <table class="ab-table">
          <thead>
            <tr><th>번호</th><th>제목</th><th>작성자</th><th>조회</th><th>날짜</th><th></th></tr>
          </thead>
          <tbody>
            <template v-for="b in boards" :key="b.id">
              <tr :class="{ 'ab-row--open': openId === b.id }">
                <td class="t-id">{{ b.id }}</td>
                <td class="t-title" @click="toggleDetail(b.id)">{{ b.title }}</td>
                <td>{{ b.memberName }}</td>
                <td class="t-views">{{ b.views }}</td>
                <td class="t-date">{{ b.createdAt?.slice(0, 10) }}</td>
                <td class="t-actions">
                  <button class="t-link" @click="toggleDetail(b.id)">{{ openId === b.id ? '닫기' : '상세' }}</button>
                  <button class="t-link t-link--del" @click="deleteBoard(b.id)">삭제</button>
                </td>
              </tr>
              <tr v-if="openId === b.id" class="ab-detail-row">
                <td colspan="6">
                  <div class="ab-detail">
                    <div class="ab-detail__content">{{ b.content }}</div>
                    <!-- 댓글 -->
                    <div class="ab-detail__comments">
                      <h4>댓글 ({{ boardComments.length }})</h4>
                      <div v-for="c in boardComments" :key="c.id" class="ab-comment">
                        <div class="ab-comment__head">
                          <strong>{{ c.memberName }}</strong>
                          <span>{{ c.createdAt?.slice(0, 10) }}</span>
                          <button class="t-link t-link--del" @click="deleteComment(c.id)">삭제</button>
                        </div>
                        <p>{{ c.content }}</p>
                      </div>
                      <p v-if="!boardComments.length" class="ab-detail__empty">댓글 없음</p>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-if="!boards.length"><td colspan="6" class="t-empty">게시글 없음</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const boards = ref([]);
const openId = ref(null);
const boardComments = ref([]);

onMounted(async () => {
  try { boards.value = await api.get('/boards') || []; } catch { boards.value = []; }
});

async function toggleDetail(id) {
  if (openId.value === id) { openId.value = null; return; }
  openId.value = id;
  try { boardComments.value = await api.get(`/boards/${id}/comments`) || []; }
  catch { boardComments.value = []; }
}

async function deleteBoard(id) {
  if (!confirm('게시글을 삭제하시겠습니까?')) return;
  try {
    await api.delete(`/admin/boards/${id}`);
    boards.value = boards.value.filter(b => b.id !== id);
    if (openId.value === id) openId.value = null;
  } catch (e) { alert(e?.message || '삭제 실패'); }
}

async function deleteComment(id) {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;
  try {
    await api.delete(`/admin/comments/${id}`);
    boardComments.value = boardComments.value.filter(c => c.id !== id);
  } catch (e) { alert(e?.message || '삭제 실패'); }
}
</script>

<style scoped>
.ab-head { margin-bottom: 1.5rem; }
.ab-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.ab-title { font-size: 1.75rem; font-weight: 900; }
.ab-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.ab-table { width: 100%; border-collapse: collapse; }
.ab-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.ab-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #111; width: 4rem; }
.t-title { font-weight: 600; color: #111; cursor: pointer; }
.t-title:hover { text-decoration: underline; }
.t-views { color: #bbb; width: 4rem; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-actions { display: flex; gap: 0.375rem; }
.t-link { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.625rem; border-radius: 0.25rem; }
.t-link:hover { border-color: #111; }
.t-link--del:hover { border-color: #e53e3e; color: #e53e3e; }
.ab-row--open { background: #fafaf8; }

.ab-detail-row td { padding: 0 !important; border-bottom: 2px solid #eee; }
.ab-detail { padding: 1.25rem 1.5rem; }
.ab-detail__content { font-size: 0.8125rem; color: #333; line-height: 1.7; white-space: pre-wrap; margin-bottom: 1.5rem; }
.ab-detail__comments { border-top: 1px solid #eee; padding-top: 1rem; }
.ab-detail__comments h4 { font-size: 0.75rem; font-weight: 800; color: #FF2D2D; letter-spacing: 0.1em; margin-bottom: 0.75rem; }
.ab-detail__empty { font-size: 0.75rem; color: #ccc; }
.ab-comment { padding: 0.625rem 0; border-bottom: 1px solid #f5f5f5; }
.ab-comment__head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.25rem; }
.ab-comment__head strong { font-size: 0.75rem; color: #111; }
.ab-comment__head span { font-size: 0.625rem; color: #bbb; }
.ab-comment p { font-size: 0.8125rem; color: #555; }
</style>
