<template>
  <Forme32Layout>
    <!-- ═══ 목록 모드 ═══ -->
    <template v-if="mode === 'list'">
      <div class="bd-head">
        <div class="bd-head__left">
          <h1 class="bd-head__title">게시판</h1>
          <p class="bd-head__sub">자유롭게 소통하는 공간입니다</p>
        </div>
        <button class="bd-head__write" @click="openWrite">
          <span class="material-symbols-outlined">edit</span>
          글 작성
        </button>
      </div>

      <!-- 검색 -->
      <div class="bd-filter">
        <div class="bd-filter__search">
          <span class="material-symbols-outlined">search</span>
          <input v-model="searchQuery" type="text" placeholder="제목 검색..." @keyup.enter="searchBoards" />
        </div>
        <button class="bd-filter__btn" @click="searchBoards">검색</button>
      </div>

      <!-- 로딩/빈 -->
      <div v-if="isLoading" class="bd-empty">
        <span class="material-symbols-outlined">hourglass_top</span>
        <p>불러오는 중...</p>
      </div>
      <div v-else-if="!boards.length" class="bd-empty">
        <span class="material-symbols-outlined">forum</span>
        <p>등록된 게시글이 없습니다</p>
        <button class="bd-empty__btn" @click="openWrite">첫 글 작성하기</button>
      </div>

      <!-- 테이블 (데스크탑) -->
      <div v-else class="bd-table">
        <table>
          <thead>
            <tr><th>번호</th><th>제목</th><th>작성자</th><th>조회</th><th>날짜</th></tr>
          </thead>
          <tbody>
            <tr v-for="b in boards" :key="b.id" @click="viewPost(b.id)">
              <td class="bd-table__no">{{ b.id }}</td>
              <td class="bd-table__title">{{ b.title }}</td>
              <td>{{ b.memberName }}</td>
              <td class="bd-table__views">{{ b.views }}</td>
              <td class="bd-table__date">{{ formatDate(b.createdAt) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 카드 (모바일) -->
      <div v-if="!isLoading && boards.length" class="bd-cards">
        <article v-for="b in boards" :key="b.id" class="bd-card" @click="viewPost(b.id)">
          <div class="bd-card__top">
            <span class="bd-card__meta">{{ b.id }} · 조회 {{ b.views }}</span>
            <span class="bd-card__date">{{ formatDate(b.createdAt) }}</span>
          </div>
          <p class="bd-card__title">{{ b.title }}</p>
          <div class="bd-card__bottom"><span>{{ b.memberName }}</span></div>
        </article>
      </div>
    </template>

    <!-- ═══ 상세 모드 ═══ -->
    <template v-if="mode === 'detail' && currentPost">
      <div class="bd-detail">
        <button class="bd-detail__back" @click="goList">
          <span class="material-symbols-outlined">arrow_back</span> 목록으로
        </button>
        <div class="bd-detail__header">
          <h1 class="bd-detail__title">{{ currentPost.title }}</h1>
          <div class="bd-detail__meta">
            <span>{{ currentPost.memberName }}</span>
            <span>{{ formatDate(currentPost.createdAt) }}</span>
            <span>조회 {{ currentPost.views }}</span>
          </div>
          <div v-if="isMyPost" class="bd-detail__actions">
            <button class="bd-detail__act" @click="startEdit">수정</button>
            <button class="bd-detail__act bd-detail__act--del" @click="deletePost">삭제</button>
          </div>
        </div>
        <div class="bd-detail__body" v-html="renderContent(currentPost.content)"></div>

        <!-- 댓글 -->
        <div class="bd-comments">
          <h3 class="bd-comments__title">댓글 <span>{{ comments.length }}</span></h3>
          <div v-if="authStore.isLoggedIn" class="bd-comments__write">
            <textarea v-model="commentText" placeholder="댓글을 입력하세요" rows="3"></textarea>
            <button class="bd-comments__submit" @click="submitComment" :disabled="commentSubmitting">
              {{ commentSubmitting ? '등록 중...' : '댓글 등록' }}
            </button>
          </div>
          <p v-else class="bd-comments__login">댓글을 작성하려면 <RouterLink to="/login">로그인</RouterLink>하세요.</p>

          <div v-if="!comments.length" class="bd-comments__empty">댓글이 없습니다</div>
          <div v-for="c in comments" :key="c.id" class="bd-comment">
            <div class="bd-comment__head">
              <span class="bd-comment__author">{{ c.memberName }}</span>
              <span class="bd-comment__date">{{ formatDate(c.createdAt) }}</span>
              <template v-if="c.memberId === authStore.user?.id">
                <button v-if="editingCommentId !== c.id" class="bd-comment__btn" @click="startEditComment(c)">수정</button>
                <button class="bd-comment__btn bd-comment__btn--del" @click="deleteComment(c.id)">삭제</button>
              </template>
            </div>
            <div v-if="editingCommentId === c.id" class="bd-comment__edit">
              <textarea v-model="editCommentText" rows="2"></textarea>
              <div class="bd-comment__edit-actions">
                <button class="bd-comment__btn" @click="editingCommentId = null">취소</button>
                <button class="bd-comment__btn" @click="updateComment(c.id)">저장</button>
              </div>
            </div>
            <p v-else class="bd-comment__body">{{ c.content }}</p>
          </div>
        </div>
      </div>
    </template>

    <!-- ═══ 작성/수정 모달 ═══ -->
    <Teleport to="body">
      <div v-if="showWriteModal" class="bd-modal" @click.self="closeWrite">
        <div class="bd-modal__box">
          <header class="bd-modal__head">
            <h2>{{ editId ? '글 수정' : '글 작성' }}</h2>
            <button @click="closeWrite"><span class="material-symbols-outlined">close</span></button>
          </header>
          <form class="bd-modal__form" @submit.prevent="submitWrite">
            <div class="bd-modal__field">
              <label>제목</label>
              <input v-model="writeForm.title" type="text" placeholder="제목을 입력하세요" required />
            </div>
            <div class="bd-modal__field">
              <label>내용</label>
              <textarea v-model="writeForm.content" placeholder="내용을 입력하세요" rows="10" required></textarea>
            </div>
            <p v-if="writeError" class="bd-modal__error">{{ writeError }}</p>
            <div class="bd-modal__actions">
              <button type="button" class="bd-modal__btn bd-modal__btn--ghost" @click="closeWrite">취소</button>
              <button type="submit" class="bd-modal__btn bd-modal__btn--fill" :disabled="submitting">
                {{ submitting ? '처리 중...' : (editId ? '수정' : '등록') }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </Forme32Layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import { useAuthStore } from '@/stores/authStore';
import Forme32Layout from '@/layouts/Forme32Layout.vue';

const router = useRouter();
const authStore = useAuthStore();

const mode = ref('list');
const boards = ref([]);
const isLoading = ref(false);
const searchQuery = ref('');

// 상세
const currentPost = ref(null);
const comments = ref([]);
const commentText = ref('');
const commentSubmitting = ref(false);
const editingCommentId = ref(null);
const editCommentText = ref('');
const isMyPost = ref(false);

// 작성/수정
const showWriteModal = ref(false);
const submitting = ref(false);
const writeError = ref('');
const writeForm = ref({ title: '', content: '' });
const editId = ref(null);

function formatDate(d) {
  if (!d) return '';
  return d.slice(0, 10).replace(/-/g, '.');
}

function renderContent(text) {
  if (!text) return '';
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/\n/g, '<br/>');
}

// ─── 목록 ───
async function loadBoards() {
  isLoading.value = true;
  try {
    const data = await api.get('/boards');
    boards.value = Array.isArray(data) ? data : [];
  } catch { boards.value = []; }
  finally { isLoading.value = false; }
}

async function searchBoards() {
  if (!searchQuery.value.trim()) { loadBoards(); return; }
  isLoading.value = true;
  try {
    const data = await api.get(`/boards/search?keyword=${encodeURIComponent(searchQuery.value.trim())}`);
    boards.value = Array.isArray(data) ? data : [];
  } catch { boards.value = []; }
  finally { isLoading.value = false; }
}

// ─── 상세 ───
async function viewPost(id) {
  try {
    currentPost.value = await api.get(`/boards/${id}`);
    isMyPost.value = currentPost.value.memberId === authStore.user?.id;
    await loadComments(id);
    mode.value = 'detail';
  } catch (e) { alert('게시글을 불러올 수 없습니다.'); }
}

async function loadComments(boardId) {
  try {
    const data = await api.get(`/boards/${boardId}/comments`);
    comments.value = Array.isArray(data) ? data : [];
  } catch { comments.value = []; }
}

function goList() {
  mode.value = 'list';
  currentPost.value = null;
  loadBoards();
}

// ─── 글 작성/수정 ───
function openWrite() {
  if (!authStore.isLoggedIn) { alert('로그인이 필요합니다.'); router.push({ name: 'Login', query: { redirect: '/board' } }); return; }
  editId.value = null;
  writeForm.value = { title: '', content: '' };
  writeError.value = '';
  showWriteModal.value = true;
}

function startEdit() {
  editId.value = currentPost.value.id;
  writeForm.value = { title: currentPost.value.title, content: currentPost.value.content };
  writeError.value = '';
  showWriteModal.value = true;
}

function closeWrite() { showWriteModal.value = false; }

async function submitWrite() {
  if (!writeForm.value.title.trim() || !writeForm.value.content.trim()) { writeError.value = '제목과 내용을 모두 입력해주세요.'; return; }
  submitting.value = true; writeError.value = '';
  try {
    if (editId.value) {
      await api.put(`/boards/${editId.value}`, { title: writeForm.value.title.trim(), content: writeForm.value.content.trim() });
      await viewPost(editId.value);
    } else {
      const memberId = authStore.user?.id;
      if (!memberId) { writeError.value = '다시 로그인해주세요.'; return; }
      await api.post(`/members/${memberId}/boards`, { title: writeForm.value.title.trim(), content: writeForm.value.content.trim() });
      await loadBoards();
      mode.value = 'list';
    }
    closeWrite();
  } catch (e) { writeError.value = e?.data?.message || e?.message || '처리 실패'; }
  finally { submitting.value = false; }
}

async function deletePost() {
  if (!confirm('게시글을 삭제하시겠습니까?')) return;
  try {
    await api.delete(`/boards/${currentPost.value.id}`);
    goList();
  } catch (e) { alert(e?.message || '삭제 실패'); }
}

// ─── 댓글 ───
async function submitComment() {
  if (!commentText.value.trim()) return;
  const memberId = authStore.user?.id;
  if (!memberId) return;
  commentSubmitting.value = true;
  try {
    await api.post(`/boards/${currentPost.value.id}/members/${memberId}/comments`, { content: commentText.value.trim() });
    commentText.value = '';
    await loadComments(currentPost.value.id);
  } catch (e) { alert(e?.message || '댓글 등록 실패'); }
  finally { commentSubmitting.value = false; }
}

function startEditComment(c) {
  editingCommentId.value = c.id;
  editCommentText.value = c.content;
}

async function updateComment(id) {
  if (!editCommentText.value.trim()) return;
  try {
    await api.put(`/comments/${id}`, { content: editCommentText.value.trim() });
    editingCommentId.value = null;
    await loadComments(currentPost.value.id);
  } catch (e) { alert(e?.message || '수정 실패'); }
}

async function deleteComment(id) {
  if (!confirm('댓글을 삭제하시겠습니까?')) return;
  try {
    await api.delete(`/comments/${id}`);
    await loadComments(currentPost.value.id);
  } catch (e) { alert(e?.message || '삭제 실패'); }
}

onMounted(() => { loadBoards(); });
</script>

<style scoped>
/* 헤더 */
.bd-head {
  display: flex; flex-direction: column; gap: 1.5rem;
  padding: 3rem 3rem 2rem; border-bottom: 1px solid #eee;
}
@media (min-width: 768px) { .bd-head { flex-direction: row; align-items: flex-end; justify-content: space-between; } }
.bd-head__title { font-size: 2rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.375rem; }
.bd-head__sub { font-size: 0.875rem; color: #999; }
.bd-head__write {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.875rem 2rem; background: #111; color: #fff;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
  border-radius: 0.375rem; cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
}
.bd-head__write:hover { opacity: 0.8; }
.bd-head__write .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

/* 필터 */
.bd-filter {
  display: flex; gap: 0.75rem; padding: 1.25rem 3rem; border-bottom: 1px solid #eee;
}
.bd-filter__search {
  display: flex; align-items: center; gap: 0.5rem; flex: 1;
  border: 1.5px solid #e8e8e8; border-radius: 0.375rem; padding: 0 0.75rem;
}
.bd-filter__search .material-symbols-outlined { font-size: 1.125rem; color: #bbb; font-variation-settings: "wght" 300; }
.bd-filter__search input { border: none; padding: 0.5rem 0; font-size: 0.8125rem; outline: none; flex: 1; }
.bd-filter__btn {
  padding: 0.5rem 1.25rem; background: #111; color: #fff;
  font-size: 0.75rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
}

/* 빈 상태 */
.bd-empty {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  padding: 6rem 0; color: #bbb; text-align: center;
}
.bd-empty .material-symbols-outlined { font-size: 3rem; font-variation-settings: "wght" 200; }
.bd-empty__btn {
  margin-top: 0.5rem; padding: 0.625rem 1.5rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
}

/* 테이블 (데스크탑) */
.bd-table { display: none; padding: 0 3rem; }
@media (min-width: 768px) { .bd-table { display: block; } }
.bd-table table { width: 100%; border-collapse: collapse; }
.bd-table thead tr { font-size: 0.5625rem; letter-spacing: 0.15em; text-transform: uppercase; color: #bbb; }
.bd-table th { padding: 1.25rem 0.75rem; font-weight: 600; text-align: left; }
.bd-table tbody tr { border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; }
.bd-table tbody tr:hover { background: #fafaf8; }
.bd-table td { padding: 1.25rem 0.75rem; font-size: 0.8125rem; }
.bd-table__no { color: #ccc; width: 4rem; }
.bd-table__title { font-weight: 600; color: #111; }
.bd-table__views { color: #bbb; width: 4rem; }
.bd-table__date { color: #bbb; width: 8rem; }

/* 카드 (모바일) */
.bd-cards { display: block; padding: 0 3rem; }
@media (min-width: 768px) { .bd-cards { display: none; } }
.bd-card { padding: 1.25rem 0; border-bottom: 1px solid #f0f0f0; cursor: pointer; }
.bd-card__top { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.bd-card__meta { font-size: 0.625rem; color: #bbb; letter-spacing: 0.1em; }
.bd-card__date { font-size: 0.625rem; color: #bbb; }
.bd-card__title { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.5rem; }
.bd-card__bottom { font-size: 0.75rem; color: #bbb; }

/* ═══ 상세 ═══ */
.bd-detail { max-width: 800px; margin: 0 auto; padding: 2rem 3rem 4rem; }
.bd-detail__back {
  display: inline-flex; align-items: center; gap: 0.375rem;
  font-size: 0.75rem; color: #999; cursor: pointer; background: none; border: none;
  margin-bottom: 2rem; transition: color 0.2s;
}
.bd-detail__back:hover { color: #111; }
.bd-detail__back .material-symbols-outlined { font-size: 1rem; }
.bd-detail__header { border-bottom: 1px solid #eee; padding-bottom: 1.5rem; margin-bottom: 2rem; }
.bd-detail__title { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.bd-detail__meta { display: flex; gap: 1rem; font-size: 0.75rem; color: #999; }
.bd-detail__actions { display: flex; gap: 0.5rem; margin-top: 1rem; }
.bd-detail__act {
  font-size: 0.6875rem; padding: 0.375rem 1rem; border: 1px solid #ddd; border-radius: 0.25rem;
  background: #fff; cursor: pointer; color: #555; transition: all 0.2s;
}
.bd-detail__act:hover { border-color: #111; color: #111; }
.bd-detail__act--del:hover { border-color: #e53e3e; color: #e53e3e; }
.bd-detail__body { font-size: 0.9375rem; line-height: 1.8; color: #333; min-height: 200px; }

/* ═══ 댓글 ═══ */
.bd-comments { margin-top: 3rem; border-top: 1px solid #eee; padding-top: 2rem; }
.bd-comments__title { font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; }
.bd-comments__title span { color: #FF2D2D; }
.bd-comments__write { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 2rem; }
.bd-comments__write textarea {
  width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none; resize: vertical;
}
.bd-comments__write textarea:focus { border-color: #111; }
.bd-comments__submit {
  align-self: flex-end; padding: 0.625rem 1.5rem; background: #111; color: #fff;
  font-size: 0.75rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
}
.bd-comments__submit:disabled { opacity: 0.4; cursor: not-allowed; }
.bd-comments__login { font-size: 0.8125rem; color: #999; margin-bottom: 2rem; }
.bd-comments__login a { color: #111; font-weight: 700; text-decoration: underline; }
.bd-comments__empty { text-align: center; color: #ccc; padding: 2rem 0; font-size: 0.8125rem; }

.bd-comment { padding: 1rem 0; border-bottom: 1px solid #f5f5f5; }
.bd-comment__head { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.5rem; }
.bd-comment__author { font-size: 0.8125rem; font-weight: 700; color: #111; }
.bd-comment__date { font-size: 0.6875rem; color: #bbb; }
.bd-comment__btn {
  font-size: 0.625rem; color: #999; cursor: pointer; background: none; border: none;
  padding: 0.125rem 0.375rem; transition: color 0.2s;
}
.bd-comment__btn:hover { color: #111; }
.bd-comment__btn--del:hover { color: #e53e3e; }
.bd-comment__body { font-size: 0.8125rem; color: #333; line-height: 1.6; }
.bd-comment__edit { display: flex; flex-direction: column; gap: 0.5rem; }
.bd-comment__edit textarea {
  width: 100%; padding: 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none; resize: vertical;
}
.bd-comment__edit-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* ═══ 모달 ═══ */
.bd-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.bd-modal__box { background: #fff; width: 100%; max-width: 600px; border-radius: 0.75rem; overflow: hidden; }
.bd-modal__head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee;
}
.bd-modal__head h2 { font-size: 1.125rem; font-weight: 800; }
.bd-modal__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.bd-modal__form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.bd-modal__field { display: flex; flex-direction: column; gap: 0.375rem; }
.bd-modal__field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.bd-modal__field input,
.bd-modal__field textarea {
  width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none; transition: border-color 0.2s;
}
.bd-modal__field input:focus, .bd-modal__field textarea:focus { border-color: #111; }
.bd-modal__field textarea { resize: vertical; min-height: 200px; }
.bd-modal__error { font-size: 0.75rem; color: #e53e3e; }
.bd-modal__actions { display: flex; gap: 0.625rem; margin-top: 0.5rem; }
.bd-modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; transition: all 0.2s; }
.bd-modal__btn--fill { background: #111; color: #fff; }
.bd-modal__btn--fill:disabled { opacity: 0.4; cursor: not-allowed; }
.bd-modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.bd-modal__btn--ghost:hover { border-color: #111; color: #111; }
</style>
