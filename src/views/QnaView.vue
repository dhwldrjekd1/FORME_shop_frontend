<template>
  <main class="page-wrapper qna-page">

    <!-- 헤더 -->
    <header class="qna-header">
      <div class="qna-header__text">
        <h1 class="qna-header__title">문의하기</h1>
        <p class="qna-header__desc">상품, 주문, 배송 관련 궁금한 점을 남겨주세요.</p>
      </div>
      <button class="qna-header__btn" @click="openWrite">
        문의 작성
        <span class="material-symbols-outlined">edit</span>
      </button>
    </header>

    <!-- 필터 바 -->
    <section class="qna-filter">
      <div class="qna-filter__left">
        <div class="qna-filter__select-wrap">
          <label class="qna-filter__label">카테고리</label>
          <select v-model="filterCategory" class="qna-filter__select">
            <option>전체</option>
            <option>상품</option>
            <option>주문</option>
            <option>배송</option>
            <option>반품</option>
            <option>기타</option>
          </select>
        </div>
        <div class="qna-filter__divider"></div>
        <div class="qna-filter__select-wrap">
          <label class="qna-filter__label">상태</label>
          <select v-model="filterStatus" class="qna-filter__select">
            <option>전체</option>
            <option>답변완료</option>
            <option>대기중</option>
          </select>
        </div>
      </div>

      <div class="qna-filter__search">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="문의 내용 검색"
          class="qna-filter__input"
        />
        <span class="material-symbols-outlined qna-filter__search-icon">search</span>
      </div>
    </section>

    <!-- 로딩/빈 상태 -->
    <div v-if="isLoading" class="qna-empty">불러오는 중...</div>
    <div v-else-if="!filteredItems.length" class="qna-empty">
      <span class="material-symbols-outlined">forum</span>
      <p>등록된 문의가 없습니다.</p>
      <p class="qna-empty__sub">첫 문의를 작성해보세요.</p>
    </div>

    <!-- 데스크탑 테이블 -->
    <div v-else class="qna-table">
      <table>
        <thead>
          <tr>
            <th>번호</th>
            <th>카테고리</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
            <th>상태</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.id" @click="openDetail(item)">
            <td class="qna-table__no">{{ String(item.id).padStart(3, '0') }}</td>
            <td class="qna-table__category">{{ item.category }}</td>
            <td class="qna-table__title">
              <a href="#" @click.prevent="openDetail(item)">
                {{ item.title }}
                <span v-if="item.locked" class="material-symbols-outlined qna-table__lock">lock</span>
              </a>
            </td>
            <td class="qna-table__writer">{{ item.writer }}</td>
            <td class="qna-table__date">{{ item.date }}</td>
            <td>
              <span class="qna-badge" :class="item.status === '답변완료' ? 'qna-badge--answered' : 'qna-badge--pending'">
                {{ item.status }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 모바일 카드 -->
    <div v-if="!isLoading && filteredItems.length" class="qna-mobile">
      <article v-for="item in filteredItems" :key="item.id" class="qna-mobile__item" @click="openDetail(item)">
        <div class="qna-mobile__top">
          <span class="qna-mobile__meta">{{ String(item.id).padStart(3, '0') }} · {{ item.category }}</span>
          <span class="qna-badge" :class="item.status === '답변완료' ? 'qna-badge--answered' : 'qna-badge--pending'">
            {{ item.status }}
          </span>
        </div>
        <a href="#" class="qna-mobile__title" @click.prevent="openDetail(item)">{{ item.title }}</a>
        <div class="qna-mobile__bottom">
          <span>{{ item.writer }}</span>
          <span>{{ item.date }}</span>
        </div>
      </article>
    </div>

    <!-- ── 작성 모달 ── -->
    <div v-if="showWriteModal" class="qna-modal" @click.self="closeWrite">
      <div class="qna-modal__inner">
        <header class="qna-modal__header">
          <h2 class="qna-modal__title">문의 작성</h2>
          <button class="qna-modal__close" @click="closeWrite" aria-label="닫기">
            <span class="material-symbols-outlined">close</span>
          </button>
        </header>

        <form class="qna-modal__form" @submit.prevent="submitWrite">
          <div class="qna-modal__field">
            <label class="qna-modal__label">카테고리</label>
            <select v-model="writeForm.category" class="qna-modal__select">
              <option>상품</option>
              <option>주문</option>
              <option>배송</option>
              <option>반품</option>
              <option>기타</option>
            </select>
          </div>

          <div class="qna-modal__field">
            <label class="qna-modal__label">제목</label>
            <input
              v-model="writeForm.title"
              type="text"
              class="qna-modal__input"
              placeholder="문의 제목을 입력해주세요"
              required
            />
          </div>

          <div class="qna-modal__field">
            <label class="qna-modal__label">내용</label>
            <textarea
              v-model="writeForm.content"
              class="qna-modal__textarea"
              placeholder="문의 내용을 자세히 입력해주세요"
              rows="8"
              required
            ></textarea>
          </div>

          <label class="qna-modal__check">
            <input v-model="writeForm.isSecret" type="checkbox" />
            <span>비밀글로 작성</span>
          </label>

          <p v-if="writeError" class="qna-modal__error">{{ writeError }}</p>

          <div class="qna-modal__actions">
            <button type="button" class="qna-modal__btn qna-modal__btn--outline" @click="closeWrite">취소</button>
            <button type="submit" class="qna-modal__btn qna-modal__btn--primary" :disabled="submitting">
              {{ submitting ? '등록 중...' : '문의 등록' }}
            </button>
          </div>
        </form>
      </div>
    </div>

  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/api'
import { useAuthStore } from '@/stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

// ── 필터 상태 ──
const filterCategory = ref('전체')
const filterStatus   = ref('전체')
const searchQuery    = ref('')
const currentPage    = ref(1)

// ── Q&A 목록 (백엔드 GET /api/qna) ──
const items = ref([])
const isLoading = ref(false)
const loadError = ref(null)

// 백엔드 QnaResponseDto → 화면용 형태로 변환
// 카테고리는 백엔드에 없으므로 productId 유무로 1차 분류 (상품/기타)
// 작성자명은 일부 마스킹
function adaptQna(dto) {
  return {
    id: dto.id,
    title: dto.title,
    content: dto.content,
    answer: dto.answer,
    category: dto.productId ? '상품' : '기타',
    writer: maskName(dto.memberName),
    date: dto.createdAt ? dto.createdAt.slice(0, 10).replace(/-/g, '.') : '',
    status: dto.isAnswered ? '답변완료' : '대기중',
    locked: dto.isSecret === true,
    productId: dto.productId,
    productName: dto.productName,
  }
}

function maskName(name) {
  if (!name) return 'unknown'
  if (name.length <= 2) return name[0] + '*'
  return name[0] + '*'.repeat(Math.max(1, name.length - 2)) + name[name.length - 1]
}

async function loadQna() {
  isLoading.value = true
  loadError.value = null
  try {
    const data = await api.get('/qna')
    items.value = Array.isArray(data) ? data.map(adaptQna) : []
    // 최신순 정렬
    items.value.sort((a, b) => b.id - a.id)
  } catch (err) {
    console.error('[QnaView] 목록 로드 실패:', err)
    loadError.value = '문의 목록을 불러오지 못했습니다.'
    items.value = []
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  loadQna()
})

// ── 필터 적용 ──
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchCategory = filterCategory.value === '전체' || item.category === filterCategory.value
    const matchStatus   = filterStatus.value   === '전체' || item.status   === filterStatus.value
    const matchSearch   = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchStatus && matchSearch
  })
})

// ── 작성 모달 ──
const showWriteModal = ref(false)
const submitting = ref(false)
const writeError = ref('')
const writeForm = ref({
  category: '상품',
  title: '',
  content: '',
  isSecret: false,
})

function openWrite() {
  // 비로그인 시 로그인 페이지로
  if (!authStore.isLoggedIn) {
    alert('로그인이 필요합니다.')
    router.push({ name: 'Login', query: { redirect: '/qna' } })
    return
  }
  writeError.value = ''
  writeForm.value = { category: '상품', title: '', content: '', isSecret: false }
  showWriteModal.value = true
}

function closeWrite() {
  showWriteModal.value = false
}

async function submitWrite() {
  if (!writeForm.value.title.trim() || !writeForm.value.content.trim()) {
    writeError.value = '제목과 내용을 모두 입력해주세요.'
    return
  }

  const memberId = authStore.user?.id
  if (!memberId) {
    writeError.value = '회원 정보가 없습니다. 다시 로그인해주세요.'
    return
  }

  submitting.value = true
  writeError.value = ''
  try {
    // POST /api/members/{memberId}/qna
    await api.post(`/members/${memberId}/qna`, {
      title: writeForm.value.title.trim(),
      content: writeForm.value.content.trim(),
      isSecret: writeForm.value.isSecret,
      // productId 는 일반 문의(상품 미연결) 라 null
    })
    closeWrite()
    await loadQna() // 목록 갱신
  } catch (err) {
    console.error('[QnaView] 등록 실패:', err)
    writeError.value = err?.data?.message || err?.message || '문의 등록에 실패했습니다.'
  } finally {
    submitting.value = false
  }
}

// ── 상세 보기 (간단 alert 로 처리, 추후 모달/페이지로 확장 가능) ──
function openDetail(item) {
  if (item.locked && !authStore.isLoggedIn) {
    alert('비밀글입니다. 로그인이 필요합니다.')
    return
  }
  const lines = [
    `[${item.category}] ${item.title}`,
    `작성자: ${item.writer} · ${item.date}`,
    '',
    item.content || '(내용 없음)',
    '',
    item.answer
      ? `[답변]\n${item.answer}`
      : '(아직 답변이 등록되지 않았습니다)',
  ]
  alert(lines.join('\n'))
}
</script>

<style scoped>
.qna-page {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem 3rem 6rem;
}

/* ── 헤더 ── */
.qna-header {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3.5rem;
  padding-top: 2rem;
}

@media (min-width: 768px) {
  .qna-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.qna-header__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 6vw, 4rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}

.qna-header__desc {
  font-family: var(--font-body);
  font-size: 1.125rem;
  color: var(--color-on-surface-variant);
  line-height: 1.6;
}

.qna-header__btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1rem 2.5rem;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: opacity 0.2s;
}

.qna-header__btn:hover { opacity: 0.85; }

/* ── 필터 바 ── */
.qna-filter {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
  border-top: 0.5px solid rgba(0,0,0,0.1);
  border-bottom: 0.5px solid rgba(0,0,0,0.1);
  padding: 1.5rem 0;
  margin-bottom: 2.5rem;
}

@media (min-width: 768px) {
  .qna-filter {
    grid-template-columns: 1fr auto;
    align-items: end;
  }
}

.qna-filter__left {
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  flex-wrap: wrap;
}

.qna-filter__select-wrap {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.qna-filter__label {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.qna-filter__select {
  font-family: var(--font-body);
  font-size: 0.875rem;
  background: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  min-width: 120px;
}

.qna-filter__divider {
  width: 1px;
  height: 2rem;
  background-color: rgba(0,0,0,0.1);
  display: none;
}

@media (min-width: 768px) {
  .qna-filter__divider { display: block; }
}

.qna-filter__search {
  position: relative;
}

.qna-filter__input {
  width: 100%;
  background-color: var(--color-surface-container-low);
  border: none;
  padding: 0.75rem 2.75rem 0.75rem 1rem;
  font-size: 0.875rem;
  outline: none;
}

@media (min-width: 768px) {
  .qna-filter__input { width: 320px; }
}

.qna-filter__search-icon {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--color-outline);
  font-size: 1.125rem;
}

/* ── 데스크탑 테이블 ── */
.qna-table {
  display: none;
}

@media (min-width: 768px) {
  .qna-table { display: block; overflow-x: auto; }
}

.qna-table table {
  width: 100%;
  border-collapse: collapse;
}

.qna-table thead tr {
  text-align: left;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.qna-table th {
  padding: 0 1rem 1.5rem;
  font-weight: 500;
}

.qna-table tbody tr {
  border-bottom: 0.5px solid rgba(0,0,0,0.06);
  transition: background 0.2s;
}

.qna-table tbody tr:hover {
  background-color: var(--color-surface-container-low);
}

.qna-table td {
  padding: 1.75rem 1rem;
  font-size: 0.875rem;
}

.qna-table__no    { color: var(--color-outline); opacity: 0.6; width: 4rem; }
.qna-table__category { font-weight: 500; width: 8rem; }
.qna-table__writer { width: 10rem; }
.qna-table__date  { color: var(--color-outline); width: 10rem; }

.qna-table__title a {
  font-family: var(--font-headline);
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qna-table__title a:hover { text-decoration: underline; }

.qna-table__lock {
  font-size: 0.875rem;
  color: var(--color-outline);
  opacity: 0.4;
}

/* ── 뱃지 ── */
.qna-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.qna-badge--answered {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.qna-badge--pending {
  border: 1px solid var(--color-outline);
  color: var(--color-outline);
}

/* ── 모바일 카드 ── */
.qna-mobile { display: block; }

@media (min-width: 768px) {
  .qna-mobile { display: none; }
}

.qna-mobile__item {
  border-bottom: 0.5px solid rgba(0,0,0,0.08);
  padding: 1.25rem 0;
}

.qna-mobile__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.qna-mobile__meta {
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.qna-mobile__title {
  font-family: var(--font-headline);
  font-size: 1.0625rem;
  line-height: 1.4;
  display: block;
  margin-bottom: 0.75rem;
}

.qna-mobile__bottom {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: var(--color-outline);
}

/* ── 페이지네이션 ── */
.qna-pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 4rem;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.qna-pagination__btn {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-outline);
  transition: color 0.2s;
}

.qna-pagination__btn:hover { color: var(--color-primary); }

.qna-pagination__pages {
  display: flex;
  gap: 1.25rem;
}

.qna-pagination__page {
  color: var(--color-outline);
  transition: color 0.2s;
  padding-bottom: 0.25rem;
}

.qna-pagination__page:hover { color: var(--color-primary); }

.qna-pagination__page--active {
  color: var(--color-primary);
  font-weight: 700;
  border-bottom: 1px solid var(--color-primary);
}

/* ── 빈 상태 ── */
.qna-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 6rem 0;
  color: var(--color-on-surface-variant);
  text-align: center;
}

.qna-empty .material-symbols-outlined {
  font-size: 3rem;
  color: var(--color-outline-variant);
  font-variation-settings: "wght" 200;
}

.qna-empty p {
  font-family: var(--font-body);
  font-size: 0.875rem;
}

.qna-empty__sub {
  font-size: 0.75rem;
  color: var(--color-outline);
}

/* 행 클릭 가능 표시 */
.qna-table tbody tr {
  cursor: pointer;
}
.qna-mobile__item {
  cursor: pointer;
}

/* ── 작성 모달 ── */
.qna-modal {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1.5rem;
}

.qna-modal__inner {
  background-color: #ffffff;
  width: 100%;
  max-width: 560px;
  max-height: 90vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.qna-modal__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
}

.qna-modal__title {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}

.qna-modal__close {
  background: none;
  border: none;
  cursor: pointer;
  color: var(--color-on-surface-variant);
  display: flex;
  align-items: center;
}

.qna-modal__close .material-symbols-outlined {
  font-size: 1.5rem;
  font-variation-settings: "wght" 300;
}

.qna-modal__form {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.qna-modal__field {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.qna-modal__label {
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.qna-modal__select,
.qna-modal__input,
.qna-modal__textarea {
  width: 100%;
  border: none;
  border-bottom: 0.5px solid var(--color-outline-variant);
  background-color: transparent;
  padding: 0.75rem 0;
  font-family: var(--font-body);
  font-size: 0.9375rem;
  color: var(--color-on-surface);
  outline: none;
  transition: border-color 0.2s;
}

.qna-modal__textarea {
  border: 0.5px solid var(--color-outline-variant);
  padding: 1rem;
  resize: vertical;
  min-height: 8rem;
  line-height: 1.6;
}

.qna-modal__select:focus,
.qna-modal__input:focus,
.qna-modal__textarea:focus {
  border-color: var(--color-primary);
}

.qna-modal__check {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: var(--color-on-surface-variant);
  cursor: pointer;
}

.qna-modal__check input {
  accent-color: var(--color-primary);
}

.qna-modal__error {
  font-family: var(--font-body);
  font-size: 0.75rem;
  color: var(--color-error);
}

.qna-modal__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.qna-modal__btn {
  flex: 1;
  padding: 1rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  cursor: pointer;
  transition:
    background-color 0.2s,
    color 0.2s,
    opacity 0.2s;
  border: none;
}

.qna-modal__btn--primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.qna-modal__btn--primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qna-modal__btn--outline {
  border: 0.5px solid var(--color-primary);
  color: var(--color-primary);
  background: transparent;
}

.qna-modal__btn--outline:hover {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
</style>