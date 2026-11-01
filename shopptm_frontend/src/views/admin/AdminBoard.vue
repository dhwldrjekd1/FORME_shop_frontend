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
                  <button class="t-link" :disabled="submitting" @click="toggleDetail(b.id)">{{ openId === b.id ? '닫기' : '상세' }}</button>
                  <button class="t-link t-link--del" :disabled="submitting" @click="deleteBoard(b.id)">삭제</button>
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
                          <button class="t-link t-link--del" :disabled="submitting" @click="deleteComment(c.id)">삭제</button>
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
      <Pagination :page="page" :total-pages="totalPages" :disabled="submitting" @change="goToPage" />
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import Pagination from "@/components/Pagination.vue";
import api from "@/api";
import { useSubmitLock } from "@/composables/useSubmitLock";

const boards = ref([]);
const page = ref(0);
const totalPages = ref(0);
const openId = ref(null);
const boardComments = ref([]);
const { submitting, run } = useSubmitLock();

onMounted(async () => { await loadBoards(); });

// 백엔드가 전체 목록을 한 번에 반환하던 걸 Page 응답(content/totalPages)으로 바꾼 것에 맞춰
// content만 반영한다(AdminMembers.vue/AdminOrders.vue/AdminReviews.vue와 동일한 패턴).
// 페이지 전환을 빠르게 연타하면 응답이 보낸 순서와 다르게 도착할 수 있어(교차검증에서
// 발견 — 다른 화면들의 fetchSeq/searchSeq와 동일한 이유), 가장 나중에 보낸 요청만 반영.
// 실패 시엔(deleteBoard가 재조회를 실패해도 삭제 직후의 로컬 반영은 유지돼야 함) 화면을
// 비우지 않고 이전 상태를 그대로 둔다 — 초기 진입 실패는 boards의 기본값([])이 그대로
// 비어있음 화면을 보여주므로 별도 처리가 필요 없다.
let loadSeq = 0;
async function loadBoards() {
  const seq = ++loadSeq;
  try {
    const data = await api.get(`/boards?page=${page.value}&size=20`);
    if (seq !== loadSeq) return;
    boards.value = data?.content || [];
    totalPages.value = data?.totalPages || 0;
  } catch {}
}
function goToPage(p) {
  if (p < 0 || p >= totalPages.value) return;
  page.value = p;
  loadBoards();
}

// 응답이 도착한 순서가 아니라 "가장 나중에 보낸 요청"만 반영 — 게시글 A를 열어 댓글을
// 불러오는 중에 바로 B로 옮기면(느린 A 응답이 나중에 도착), A의 댓글이 B가 열린 화면에
// 잘못 채워질 수 있어 다른 화면들의 fetchCart/fetchWishlist와 동일한 방식으로 막는다.
let commentsSeq = 0;

async function toggleDetail(id) {
  // 삭제가 진행중일 때 다른 행을 열거나 현재 행을 닫아버리면, 방금 지운 댓글/게시글
  // 기준이 흔들려 화면이 어긋날 수 있어 삭제 중에는 상세 열기/닫기 자체를 막는다
  // (상세/삭제 버튼에 준 :disabled와 같은 잠금 범위를 이 함수 안에서도 지킴).
  if (submitting.value) return;
  if (openId.value === id) { openId.value = null; return; }
  openId.value = id;
  boardComments.value = []; // 이전에 열려있던 다른 게시글의 댓글이 전환 중 잠깐 그대로 보이지 않도록 즉시 비움
  const seq = ++commentsSeq;
  try {
    const data = await api.get(`/boards/${id}/comments`) || [];
    if (seq !== commentsSeq) return; // 더 최신 요청이 이미 나가있으면 이 응답은 버림
    boardComments.value = data;
  } catch {
    if (seq !== commentsSeq) return;
    boardComments.value = [];
  }
}

async function deleteBoard(id) {
  if (!confirm('게시글을 삭제하시겠습니까?')) return;
  await run(async () => {
    try {
      await api.delete(`/admin/boards/${id}`);
      if (openId.value === id) openId.value = null;
      // 재조회가 실패하면(네트워크 일시 오류 등) 이미 지워진 게시글이 화면에 계속 남는데
      // 에러도 안 뜰 수 있어(교차검증에서 발견) 먼저 로컬에서도 지운다. 로컬 필터만으로
      // 끝내지 않는 이유는 AdminReviews.vue의 del()과 동일(totalPages가 삭제 전 값 그대로
      // 남아 페이지네이션이 서버 상태와 어긋날 수 있음) — 그래서 재조회도 한다. 그 페이지가
      // 방금 삭제로 비어버렸으면 한 페이지 앞으로 돌아간다.
      boards.value = boards.value.filter(b => b.id !== id);
      await loadBoards();
      if (!boards.value.length && page.value > 0) {
        page.value -= 1;
        await loadBoards();
      }
    } catch (e) { alert(e?.message || '삭제 실패'); }
  });
}

async function deleteComment(id) {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;
  await run(async () => {
    try {
      await api.delete(`/admin/comments/${id}`);
      boardComments.value = boardComments.value.filter(c => c.id !== id);
    } catch (e) { alert(e?.message || '삭제 실패'); }
  });
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
