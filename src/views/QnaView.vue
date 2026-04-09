<template>
  <main class="page-wrapper qna-page">

    <!-- 헤더 -->
    <header class="qna-header">
      <div class="qna-header__text">
        <h1 class="qna-header__title">문의하기</h1>
        <p class="qna-header__desc">상품, 주문, 배송 관련 궁금한 점을 남겨주세요.</p>
      </div>
      <button class="qna-header__btn">
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

    <!-- 데스크탑 테이블 -->
    <div class="qna-table">
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
          <tr v-for="item in filteredItems" :key="item.id">
            <td class="qna-table__no">{{ String(item.id).padStart(3, '0') }}</td>
            <td class="qna-table__category">{{ item.category }}</td>
            <td class="qna-table__title">
              <a href="#">
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
    <div class="qna-mobile">
      <article v-for="item in filteredItems" :key="item.id" class="qna-mobile__item">
        <div class="qna-mobile__top">
          <span class="qna-mobile__meta">{{ String(item.id).padStart(3, '0') }} · {{ item.category }}</span>
          <span class="qna-badge" :class="item.status === '답변완료' ? 'qna-badge--answered' : 'qna-badge--pending'">
            {{ item.status }}
          </span>
        </div>
        <a href="#" class="qna-mobile__title">{{ item.title }}</a>
        <div class="qna-mobile__bottom">
          <span>{{ item.writer }}</span>
          <span>{{ item.date }}</span>
        </div>
      </article>
    </div>

    <!-- 페이지네이션 -->
    <nav class="qna-pagination">
      <button class="qna-pagination__btn">
        <span class="material-symbols-outlined">chevron_left</span>
      </button>
      <div class="qna-pagination__pages">
        <a
          v-for="p in 5"
          :key="p"
          href="#"
          class="qna-pagination__page"
          :class="{ 'qna-pagination__page--active': p === currentPage }"
          @click.prevent="currentPage = p"
        >{{ p }}</a>
      </div>
      <button class="qna-pagination__btn">
        <span class="material-symbols-outlined">chevron_right</span>
      </button>
    </nav>

  </main>
</template>

<script setup>
import { ref, computed } from 'vue'

// ── 필터 상태 ──
const filterCategory = ref('전체')
const filterStatus   = ref('전체')
const searchQuery    = ref('')
const currentPage    = ref(1)

// ── Q&A 목록 데이터 ──
const items = ref([
  { id: 84, category: '상품', title: '리바이스 555™ 릴렉스 스트레이트 진 재입고 예정일이 언제인가요?', writer: 'j.k****',    date: '2024.05.21', status: '답변완료', locked: true  },
  { id: 83, category: '상품', title: '디키즈 카펜터 팬츠 사이즈 추천 부탁드립니다.',                  writer: 'arthur_h',  date: '2024.05.20', status: '대기중',   locked: false },
  { id: 82, category: '반품', title: '주문번호 #92841 교환 신청합니다.',                              writer: 'm.wilson',  date: '2024.05.19', status: '답변완료', locked: true  },
  { id: 81, category: '배송', title: '해외 배송 요금 문의드립니다.',                                  writer: 'scandi_b',  date: '2024.05.18', status: '답변완료', locked: false },
  { id: 80, category: '상품', title: '칼하트 후드티 헤비웨이트 코튼 소재인가요?',                     writer: 'green_life', date: '2024.05.18', status: '대기중',  locked: false },
])

// ── 필터 적용 ──
const filteredItems = computed(() => {
  return items.value.filter(item => {
    const matchCategory = filterCategory.value === '전체' || item.category === filterCategory.value
    const matchStatus   = filterStatus.value   === '전체' || item.status   === filterStatus.value
    const matchSearch   = item.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchCategory && matchStatus && matchSearch
  })
})
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
</style>