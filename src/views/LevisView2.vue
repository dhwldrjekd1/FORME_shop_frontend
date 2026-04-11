<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="lv-hero">
      <div class="lv-hero__text">
        <p class="lv-hero__since">Est. 1873 / San Francisco</p>
        <h1 class="lv-hero__title">LEVI'S</h1>
        <p class="lv-hero__desc">
          현대 복식의 원형을 탐구하는 큐레이션. <br />아메리칸 웨스트를 만들어온
          아이코닉한 제품들을 다시 만납니다.
        </p>
        <a
          href="https://levi.co.kr/"
          target="_blank"
          rel="noopener noreferrer"
          class="lv-hero__btn"
        >Discover the Collection</a>
      </div>
      <div class="lv-hero__img-wrap">
        <img
          src="/images/levis/levis_hero.png"
          alt="Levi's Hero"
          class="lv-hero__img"
        />
      </div>
    </section>

    <!-- ── 상품 그리드 섹션 ── -->
    <section class="lv-products">
      <div class="lv-products__header">
        <div>
          <h2 class="lv-products__title">The Essentials</h2>
          <div class="lv-products__underline"></div>
        </div>
      </div>

      <div class="lv-products__grid">
        <RouterLink
          v-for="product in levisProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="lv-card"
        >
          <div class="lv-card__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="lv-card__img"
            />
            <button
              class="lv-card__wish"
              :class="{ 'lv-card__wish--active': wishlistStore.isWished(product.id) }"
              @click.prevent="wishlistStore.toggle(product)"
              aria-label="찜하기"
            >
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="lv-card__info">
            <div>
              <p class="lv-card__category">{{ product.category }}</p>
              <h3 class="lv-card__name">{{ product.name }}</h3>
            </div>
            <p class="lv-card__price">₩{{ product.price.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const wishlistStore = useWishlistStore();

// 리바이스 상품만 필터 (id 200번대)
const levisProducts = computed(() =>
  products.value.filter((p) => p.id >= 201 && p.id <= 299),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ════════════════════════════════
   LEVI'S — Denim Indigo
   Brand color: #8E1C28 (deep indigo)
   Accent:      #7A8FB3 (faded blue)
   ════════════════════════════════ */
.lv-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #8E1C28;
  overflow: hidden;
  position: relative;
}

@media (min-width: 768px) {
  .lv-hero {
    grid-template-columns: 4fr 6fr;
  }
}

.lv-hero__text {
  padding: 6rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.25rem;
  color: #ffffff;
}

/* Levi's red box 모티브 — 화이트 박스 안에 빨간 텍스트 */
.lv-hero__since {
  display: inline-flex;
  align-items: center;
  background-color: #ffffff;
  color: #8E1C28;
  padding: 0.5rem 0.875rem;
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: -0.5rem;
  width: fit-content;
}

.lv-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(4rem, 9vw, 7rem);
  font-weight: 700;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 0.92;
  color: #ffffff;
  font-style: italic;
}

.lv-hero__desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  letter-spacing: 0.005em;
}

.lv-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  background-color: #ffffff;
  color: #8E1C28;
  border: none;
  padding: 1.25rem 2.75rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  width: fit-content;
  margin-top: 0.75rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.2s;
}

.lv-hero__btn:hover {
  background-color: #1F2D4E;
  color: #ffffff;
  transform: translateY(-2px);
}

.lv-hero__img-wrap {
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
}

.lv-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(31, 45, 78, 0.3) 0%,
    transparent 30%
  );
  pointer-events: none;
}

.lv-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: contrast(1.1) saturate(0.85);
  transition: transform 0.8s, filter 0.6s;
}

.lv-hero__img-wrap:hover .lv-hero__img {
  transform: scale(1.04);
  filter: contrast(1.1) saturate(1);
}

/* ── 상품 그리드 ── */
.lv-products {
  padding: 7rem 3rem 8rem;
  background-color: var(--color-surface);
}

.lv-products__header {
  margin-bottom: 4.5rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.lv-products__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.015em;
  margin-bottom: 1rem;
  color: var(--color-on-surface);
}

.lv-products__underline {
  width: 4rem;
  height: 6px;
  background-color: #8E1C28;
  position: relative;
}

.lv-products__underline::before {
  content: "";
  position: absolute;
  inset: 0;
  border: 1.5px solid #ffffff;
}

.lv-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3.5rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .lv-products__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .lv-products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.lv-card {
  display: block;
  cursor: pointer;
}

.lv-card__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container-low);
  margin-bottom: 1.25rem;
  position: relative;
}

.lv-card__wish {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.92);
  border: none;
  border-radius: 50%;
  width: 2.25rem;
  height: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s, color 0.2s, transform 0.2s;
  color: var(--color-on-surface-variant);
}

.lv-card:hover .lv-card__wish {
  opacity: 1;
}

.lv-card__wish:hover {
  color: #8E1C28;
  transform: scale(1.08);
}

.lv-card__wish--active {
  opacity: 1 !important;
  color: #8E1C28;
}

.lv-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "wght" 400;
}

.lv-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.8s,
    filter 0.5s;
}

.lv-card:hover .lv-card__img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.lv-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.lv-card__category {
  font-family: var(--font-body);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.5rem;
}

.lv-card__name {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--color-on-surface);
  line-height: 1.35;
}

.lv-card__price {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
  white-space: nowrap;
}
</style>
