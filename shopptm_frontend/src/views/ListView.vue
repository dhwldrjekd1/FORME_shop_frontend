<template>
  <main class="page-wrapper">
    <div class="list-page container--full">
      <!-- 페이지 헤더 -->
      <header class="list-header">
        <div class="list-header__text">
          <h1 class="list-header__title">Archive 01.</h1>
          <p class="list-header__desc">
            A curated exploration of structural silhouettes and monochromatic
            palettes. Each piece represents a moment of architectural precision
            from our previous seasons.
          </p>
        </div>
        <span class="list-header__count"
          >Showing {{ filteredProducts.length }} Items</span
        >
      </header>

      <!-- 로딩 중 -->
      <div v-if="isLoading" class="list-loading">Loading...</div>

      <!-- 상품 그리드 -->
      <div v-else class="product-grid">
        <RouterLink
          v-for="(product, index) in filteredProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="product-grid__item"
          :class="getGridClass(index)"
        >
          <div class="product-grid__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-grid__img"
            />
          </div>
          <div class="product-grid__info">
            <div>
              <p class="product-grid__category">{{ product.category }}</p>
              <h3 class="product-grid__name">{{ product.name }}</h3>
            </div>
            <p class="product-grid__price">
              ${{ product.price.toLocaleString() }}
            </p>
          </div>
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();

// storeToRefs: 반응성 유지하면서 store 값 꺼내기
const { filteredProducts, isLoading } = storeToRefs(productStore);

onMounted(() => {
  productStore.fetchProducts();
});

// 시안의 비대칭 그리드 패턴 적용
// index % 4: 0→크게, 1→작게, 2→작게, 3→가로넓게 반복
function getGridClass(index) {
  const pattern = [
    "product-grid__item--large",
    "product-grid__item--small",
    "product-grid__item--small",
    "product-grid__item--wide",
  ];
  return pattern[index % pattern.length];
}
</script>

<style scoped>
.list-page {
  padding-top: 2rem;
  padding-bottom: 6rem;
}

/* ── 헤더 ── */
.list-header {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 4rem;
}

@media (min-width: 768px) {
  .list-header {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.list-header__text {
  max-width: 42rem;
}

.list-header__title {
  font-family: var(--font-headline);
  /* clamp(최솟값, 선호값, 최댓값): 반응형 폰트 크기 */
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 1.5rem;
}

.list-header__desc {
  font-size: 1.0625rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  opacity: 0.8;
}

.list-header__count {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  white-space: nowrap; /* 줄바꿈 방지 */
}

/* 로딩 */
.list-loading {
  text-align: center;
  padding: 6rem 0;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.1em;
}

/* ── 비대칭 상품 그리드 ── */
.product-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr); /* 12컬럼 그리드 */
  gap: 4rem 3rem;
}

.product-grid__item {
  cursor: pointer;
  display: block;
}

/* 크게: 8컬럼 차지 */
.product-grid__item--large {
  grid-column: span 8;
}

/* 작게: 4컬럼 차지 */
.product-grid__item--small {
  grid-column: span 4;
}

/* 세 번째 카드: 아래로 살짝 밀어서 비대칭 느낌 */
.product-grid__item--small:nth-child(3) {
  margin-top: 3rem;
}

/* 가로 넓게: 8컬럼 차지 */
.product-grid__item--wide {
  grid-column: span 8;
}

.product-grid__img-wrap {
  background-color: var(--color-surface-container-lowest);
  padding: 2rem;
  overflow: hidden;
  margin-bottom: 1.25rem;
  transition: background-color 0.5s;
}

.product-grid__item:hover .product-grid__img-wrap {
  background-color: var(--color-surface-container);
}

/* 카드 종류별 이미지 비율 */
.product-grid__item--large .product-grid__img-wrap {
  aspect-ratio: 4/5;
}
.product-grid__item--small .product-grid__img-wrap {
  aspect-ratio: 3/4;
}
.product-grid__item--wide .product-grid__img-wrap {
  aspect-ratio: 16/9;
}

.product-grid__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1); /* 기본: 흑백 */
  transition:
    transform 0.7s,
    filter 0.4s;
}

.product-grid__item:hover .product-grid__img {
  transform: scale(1.05);
  filter: grayscale(0); /* 호버: 컬러 */
}

.product-grid__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-grid__category {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.product-grid__name {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  font-weight: 300;
}

.product-grid__item--small .product-grid__name {
  font-size: 1.0625rem; /* 작은 카드는 폰트 살짝 줄임 */
}

.product-grid__price {
  font-size: 1rem;
  font-weight: 300;
}

/* 모바일: 1컬럼으로 변경 */
@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .product-grid__item--large,
  .product-grid__item--small,
  .product-grid__item--wide {
    grid-column: span 1;
    margin-top: 0 !important;
  }

  .product-grid__item--large .product-grid__img-wrap,
  .product-grid__item--small .product-grid__img-wrap,
  .product-grid__item--wide .product-grid__img-wrap {
    aspect-ratio: 3/4;
  }
}
</style>
