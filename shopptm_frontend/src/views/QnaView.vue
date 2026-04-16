<template>
  <Forme32Layout>
    <!-- ═══ 헤더 ═══ -->
    <div class="qa-head">
      <div class="qa-head__left">
        <h1 class="qa-head__title">Q&A</h1>
        <p class="qa-head__sub">상품, 주문, 배송 관련 궁금한 점을 남겨주세요</p>
      </div>
      <button class="qa-head__write" @click="openWrite">
        <span class="material-symbols-outlined">edit</span>
        문의 작성
      </button>
    </div>

    <!-- ═══ 필터 ═══ -->
    <div class="qa-filter">
      <div class="qa-filter__left">
        <select v-model="filterCategory" class="qa-filter__sel">
          <option>전체</option><option>상품</option><option>주문</option>
          <option>배송</option><option>반품</option><option>기타</option>
        </select>
        <select v-model="filterStatus" class="qa-filter__sel">
          <option>전체</option><option>답변완료</option><option>대기중</option>
        </select>
      </div>
      <div class="qa-filter__search">
        <span class="material-symbols-outlined">search</span>
        <input v-model="searchQuery" type="text" placeholder="검색..." />
      </div>
    </div>

    <!-- ═══ 로딩/빈 ═══ -->
    <div v-if="isLoading" class="qa-empty">
      <span class="material-symbols-outlined">hourglass_top</span>
      <p>불러오는 중...</p>
    </div>
    <div v-else-if="!filteredItems.length" class="qa-empty">
      <span class="material-symbols-outlined">forum</span>
      <p>등록된 문의가 없습니다</p>
      <button class="qa-empty__btn" @click="openWrite">첫 문의 작성하기</button>
    </div>

    <!-- ═══ 테이블 (데스크탑) ═══ -->
    <div v-else class="qa-table">
      <table>
        <thead>
          <tr><th>번호</th><th>카테고리</th><th>제목</th><th>작성자</th><th>날짜</th><th>상태</th></tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id" @click="openDetail(item)">
            <td class="qa-table__no">{{ String(item.id).padStart(3, '0') }}</td>
            <td class="qa-table__cat">{{ item.category }}</td>
            <td class="qa-table__title">
              {{ item.title }}
              <span v-if="item.locked" class="material-symbols-outlined qa-table__lock">lock</span>
            </td>
            <td>{{ item.writer }}</td>
            <td class="qa-table__date">{{ item.date }}</td>
            <td>
              <span class="qa-badge" :class="item.status === '답변완료' ? 'qa-badge--done' : 'qa-badge--wait'">{{ item.status }}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ═══ 카드 (모바일) ═══ -->
    <div v-if="!isLoading && filteredItems.length" class="qa-cards">
      <article v-for="item in filteredItems" :key="item.id" class="qa-card" @click="openDetail(item)">
        <div class="qa-card__top">
          <span class="qa-card__meta">{{ String(item.id).padStart(3, '0') }} · {{ item.category }}</span>
          <span class="qa-badge" :class="item.status === '답변완료' ? 'qa-badge--done' : 'qa-badge--wait'">{{ item.status }}</span>
        </div>
        <p class="qa-card__title">{{ item.title }}</p>
        <div class="qa-card__bottom"><span>{{ item.writer }}</span><span>{{ item.date }}</span></div>
      </article>
    </div>

    <!-- ═══ 작성 모달 ═══ -->
    <Teleport to="body">
      <div v-if="showWriteModal" class="qa-modal" @click.self="closeWrite">
        <div class="qa-modal__box">
          <header class="qa-modal__head">
            <h2>문의 작성</h2>
            <button @click="closeWrite"><span class="material-symbols-outlined">close</span></button>
          </header>
          <form class="qa-modal__form" @submit.prevent="submitWrite">
            <div class="qa-modal__field">
              <label>카테고리</label>
              <select v-model="writeForm.category">
                <option>상품</option><option>주문</option><option>배송</option><option>반품</option><option>기타</option>
              </select>
            </div>
            <div class="qa-modal__field">
              <label>제목</label>
              <input v-model="writeForm.title" type="text" placeholder="문의 제목" required />
            </div>
            <div class="qa-modal__field">
              <label>내용</label>
              <textarea v-model="writeForm.content" placeholder="문의 내용을 자세히 입력해주세요" rows="6" required></textarea>
            </div>
            <label class="qa-modal__check"><input v-model="writeForm.isSecret" type="checkbox" /><span>비밀글</span></label>
            <p v-if="writeError" class="qa-modal__error">{{ writeError }}</p>
            <div class="qa-modal__actions">
              <button type="button" class="qa-modal__btn qa-modal__btn--ghost" @click="closeWrite">취소</button>
              <button type="submit" class="qa-modal__btn qa-modal__btn--fill" :disabled="submitting">{{ submitting ? '등록 중...' : '등록' }}</button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';
import { useAuthStore } from '@/stores/authStore';
import Forme32Layout from '@/layouts/Forme32Layout.vue';

const router = useRouter();
const authStore = useAuthStore();

const filterCategory = ref('전체');
const filterStatus = ref('전체');
const searchQuery = ref('');
const items = ref([]);
const isLoading = ref(false);

function adaptQna(dto) {
  return {
    id: dto.id, title: dto.title, content: dto.content, answer: dto.answer,
    category: dto.productId ? '상품' : '기타',
    writer: maskName(dto.memberName),
    date: dto.createdAt ? dto.createdAt.slice(0, 10).replace(/-/g, '.') : '',
    status: dto.isAnswered ? '답변완료' : '대기중',
    locked: dto.isSecret === true,
  };
}
function maskName(n) { if (!n) return 'unknown'; if (n.length <= 2) return n[0] + '*'; return n[0] + '*'.repeat(n.length - 2) + n[n.length - 1]; }

async function loadQna() {
  isLoading.value = true;
  try { const d = await api.get('/qna'); items.value = (Array.isArray(d) ? d.map(adaptQna) : []).sort((a, b) => b.id - a.id); }
  catch { items.value = []; }
  finally { isLoading.value = false; }
}
onMounted(() => { loadQna(); });

const filteredItems = computed(() => items.value.filter(i => {
  return (filterCategory.value === '전체' || i.category === filterCategory.value)
    && (filterStatus.value === '전체' || i.status === filterStatus.value)
    && i.title.toLowerCase().includes(searchQuery.value.toLowerCase());
}));

const showWriteModal = ref(false);
const submitting = ref(false);
const writeError = ref('');
const writeForm = ref({ category: '상품', title: '', content: '', isSecret: false });

function openWrite() {
  if (!authStore.isLoggedIn) { alert('로그인이 필요합니다.'); router.push({ name: 'Login', query: { redirect: '/qna' } }); return; }
  writeError.value = ''; writeForm.value = { category: '상품', title: '', content: '', isSecret: false }; showWriteModal.value = true;
}
function closeWrite() { showWriteModal.value = false; }

async function submitWrite() {
  if (!writeForm.value.title.trim() || !writeForm.value.content.trim()) { writeError.value = '제목과 내용을 모두 입력해주세요.'; return; }
  const memberId = authStore.user?.id;
  if (!memberId) { writeError.value = '다시 로그인해주세요.'; return; }
  submitting.value = true; writeError.value = '';
  try { await api.post(`/members/${memberId}/qna`, { title: writeForm.value.title.trim(), content: writeForm.value.content.trim(), isSecret: writeForm.value.isSecret }); closeWrite(); await loadQna(); }
  catch (e) { writeError.value = e?.data?.message || e?.message || '등록 실패'; }
  finally { submitting.value = false; }
}

function openDetail(item) {
  if (item.locked && !authStore.isLoggedIn) { alert('비밀글입니다. 로그인이 필요합니다.'); return; }
  alert([`[${item.category}] ${item.title}`, `${item.writer} · ${item.date}`, '', item.content || '(내용 없음)', '', item.answer ? `[답변]\n${item.answer}` : '(아직 답변 없음)'].join('\n'));
}
</script>

<style scoped>
/* 헤더 */
.qa-head {
  display: flex; flex-direction: column; gap: 1.5rem;
  padding: 3rem 3rem 2rem; border-bottom: 1px solid #eee;
}
@media (min-width: 768px) { .qa-head { flex-direction: row; align-items: flex-end; justify-content: space-between; } }
.qa-head__title { font-size: 2rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.375rem; }
.qa-head__sub { font-size: 0.875rem; color: #999; }
.qa-head__write {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.875rem 2rem; background: #111; color: #fff;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
  border-radius: 0.375rem; cursor: pointer; transition: opacity 0.2s; white-space: nowrap;
}
.qa-head__write:hover { opacity: 0.8; }
.qa-head__write .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

/* 필터 */
.qa-filter {
  display: flex; flex-direction: column; gap: 1rem;
  padding: 1.25rem 3rem; border-bottom: 1px solid #eee;
}
@media (min-width: 768px) { .qa-filter { flex-direction: row; justify-content: space-between; align-items: center; } }
.qa-filter__left { display: flex; gap: 0.75rem; }
.qa-filter__sel {
  padding: 0.5rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; color: #333; background: #fff; cursor: pointer; outline: none;
}
.qa-filter__search {
  display: flex; align-items: center; gap: 0.5rem;
  border: 1.5px solid #e8e8e8; border-radius: 0.375rem; padding: 0 0.75rem;
}
.qa-filter__search .material-symbols-outlined { font-size: 1.125rem; color: #bbb; font-variation-settings: "wght" 300; }
.qa-filter__search input { border: none; padding: 0.5rem 0; font-size: 0.8125rem; outline: none; width: 180px; }

/* 빈 상태 */
.qa-empty {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  padding: 6rem 0; color: #bbb; text-align: center;
}
.qa-empty .material-symbols-outlined { font-size: 3rem; font-variation-settings: "wght" 200; }
.qa-empty__btn {
  margin-top: 0.5rem; padding: 0.625rem 1.5rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
}

/* 뱃지 */
.qa-badge {
  display: inline-block; padding: 0.25rem 0.625rem;
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; border-radius: 0.25rem;
}
.qa-badge--done { background: #111; color: #fff; }
.qa-badge--wait { border: 1.5px solid #ddd; color: #999; }

/* 테이블 (데스크탑) */
.qa-table { display: none; padding: 0 3rem; }
@media (min-width: 768px) { .qa-table { display: block; } }
.qa-table table { width: 100%; border-collapse: collapse; }
.qa-table thead tr { font-size: 0.5625rem; letter-spacing: 0.15em; text-transform: uppercase; color: #bbb; }
.qa-table th { padding: 1.25rem 0.75rem; font-weight: 600; text-align: left; }
.qa-table tbody tr { border-bottom: 1px solid #f0f0f0; cursor: pointer; transition: background 0.2s; }
.qa-table tbody tr:hover { background: #fafaf8; }
.qa-table td { padding: 1.25rem 0.75rem; font-size: 0.8125rem; }
.qa-table__no { color: #ccc; width: 4rem; }
.qa-table__cat { font-weight: 600; width: 6rem; }
.qa-table__title { font-weight: 600; color: #111; }
.qa-table__lock { font-size: 0.875rem; color: #ccc; vertical-align: middle; margin-left: 0.25rem; }
.qa-table__date { color: #bbb; width: 8rem; }

/* 카드 (모바일) */
.qa-cards { display: block; padding: 0 3rem; }
@media (min-width: 768px) { .qa-cards { display: none; } }
.qa-card { padding: 1.25rem 0; border-bottom: 1px solid #f0f0f0; cursor: pointer; }
.qa-card__top { display: flex; justify-content: space-between; margin-bottom: 0.5rem; }
.qa-card__meta { font-size: 0.625rem; color: #bbb; letter-spacing: 0.1em; }
.qa-card__title { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.5rem; }
.qa-card__bottom { display: flex; justify-content: space-between; font-size: 0.75rem; color: #bbb; }

/* 모달 */
.qa-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.qa-modal__box { background: #fff; width: 100%; max-width: 520px; border-radius: 0.75rem; overflow: hidden; }
.qa-modal__head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee;
}
.qa-modal__head h2 { font-size: 1.125rem; font-weight: 800; }
.qa-modal__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.qa-modal__form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.qa-modal__field { display: flex; flex-direction: column; gap: 0.375rem; }
.qa-modal__field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.qa-modal__field select,
.qa-modal__field input,
.qa-modal__field textarea {
  width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none; transition: border-color 0.2s;
}
.qa-modal__field select:focus, .qa-modal__field input:focus, .qa-modal__field textarea:focus { border-color: #111; }
.qa-modal__field textarea { resize: vertical; min-height: 120px; }
.qa-modal__check { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; color: #666; cursor: pointer; }
.qa-modal__check input { accent-color: #111; }
.qa-modal__error { font-size: 0.75rem; color: #e53e3e; }
.qa-modal__actions { display: flex; gap: 0.625rem; margin-top: 0.5rem; }
.qa-modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; transition: all 0.2s; }
.qa-modal__btn--fill { background: #111; color: #fff; }
.qa-modal__btn--fill:disabled { opacity: 0.4; cursor: not-allowed; }
.qa-modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.qa-modal__btn--ghost:hover { border-color: #111; color: #111; }
</style>
