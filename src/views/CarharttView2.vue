<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="ch-hero">
      <div class="ch-hero__text">
        <p class="ch-hero__since">Est. 1889 / Detroit</p>
        <h1 class="ch-hero__title">CARHARTT</h1>
        <p class="ch-hero__desc">
          <!-- Established 1889 in Detroit. Built on the rugged honesty of American
          craftsmanship. Iconic workwear engineered for the individuals who move
          the world forward. -->
          1889년 디트로이트에서 탄생했습니다. 미국 장인
          정신의 투박한 진정성을 바탕으로, 세상을 움직이는 사람들을 위한
          아이코닉 워크웨어를 만들어왔습니다.
        </p>
        <a
          href="https://www.carhartt.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="ch-hero__btn"
        >
          Shop Collection
          <span class="material-symbols-outlined">arrow_forward</span>
        </a>
      </div>
      <div class="ch-hero__img-wrap">
        <img
          src="/images/carhartt/carhero.png"
          alt="Carhartt Hero"
          class="ch-hero__img"
        />
      </div>
    </section>

    <!-- ── 상품 그리드 섹션 ── -->
    <section class="ch-products">
      <div class="ch-products__header">
        <div>
          <h2 class="ch-products__title">The Essentials</h2>
          <div class="ch-products__underline"></div>
        </div>
      </div>

      <div class="ch-products__grid">
        <RouterLink
          v-for="product in carharttProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="ch-card"
        >
          <div class="ch-card__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="ch-card__img"
            />
            <button
              class="ch-card__wish"
              :class="{ 'ch-card__wish--active': wishlistStore.isWished(product.id) }"
              @click.prevent="wishlistStore.toggle(product)"
              aria-label="찜하기"
            >
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="ch-card__info">
            <div>
              <p class="ch-card__category">{{ product.category }}</p>
              <h3 class="ch-card__name">{{ product.name }}</h3>
            </div>
            <p class="ch-card__price">
              {{
                product.price != null
                  ? "₩" + product.price.toLocaleString()
                  : ""
              }}
            </p>
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

// 칼하트 상품만 필터 (id 100번대)
const carharttProducts = computed(() =>
  products.value.filter((p) => p.id >= 101 && p.id <= 199),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ════════════════════════════════
   CARHARTT — Workwear Brown
   Brand color: #9C4F18 (saddle brown)
   Accent:      #D4A574 (camel)
   ════════════════════════════════ */
.ch-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #9C4F18;
  position: relative;
}

@media (min-width: 768px) {
  .ch-hero {
    grid-template-columns: 4fr 6fr;
  }
}

.ch-hero__text {
  padding: 6rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.25rem;
  color: #ffffff;
}

.ch-hero__since {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: -0.5rem;
}

.ch-hero__since::before {
  content: "";
  width: 2rem;
  height: 2px;
  background-color: #FFC72C;
  display: inline-block;
}

.ch-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.75rem, 8vw, 6.5rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #ffffff;
}

.ch-hero__desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  letter-spacing: 0.005em;
}

.ch-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  background-color: #FFC72C;
  color: #1A1A1A;
  border: none;
  padding: 1.25rem 2.75rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  width: fit-content;
  margin-top: 0.5rem;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.2s;
}

.ch-hero__btn:hover {
  background-color: #ffffff;
  color: #9C4F18;
  transform: translateY(-2px);
}

.ch-hero__btn .material-symbols-outlined {
  font-size: 1rem;
  font-variation-settings: "wght" 300;
  transition: transform 0.3s;
}

.ch-hero__btn:hover .material-symbols-outlined {
  transform: translateX(4px);
}

.ch-hero__img-wrap {
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
}

.ch-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(107, 52, 16, 0.3) 0%,
    transparent 30%
  );
  pointer-events: none;
}

.ch-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: sepia(0.25) saturate(1.1) contrast(1.05);
  transition: transform 0.8s, filter 0.6s;
}

.ch-hero__img-wrap:hover .ch-hero__img {
  transform: scale(1.04);
  filter: sepia(0.1) saturate(1.15) contrast(1.05);
}

/* ── 상품 그리드 ── */
.ch-products {
  padding: 7rem 3rem 8rem;
  background-color: var(--color-surface);
}

.ch-products__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4.5rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
}

.ch-products__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.015em;
  margin-bottom: 1rem;
  color: var(--color-on-surface);
}

.ch-products__underline {
  width: 3rem;
  height: 3px;
  background-color: #9C4F18;
  position: relative;
}

.ch-products__underline::after {
  content: "";
  position: absolute;
  left: 3.5rem;
  top: 0.5px;
  width: 1.5rem;
  height: 2px;
  background-color: #FFC72C;
}

.ch-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3.5rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .ch-products__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .ch-products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ch-card {
  display: block;
  cursor: pointer;
}

.ch-card__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container);
  margin-bottom: 1.25rem;
  position: relative;
}

.ch-card__wish {
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

.ch-card:hover .ch-card__wish {
  opacity: 1;
}

.ch-card__wish:hover {
  color: #9C4F18;
  transform: scale(1.08);
}

.ch-card__wish--active {
  opacity: 1 !important;
  color: #9C4F18;
}

.ch-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "wght" 400;
}

.ch-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.8s,
    filter 0.5s;
}

.ch-card:hover .ch-card__img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.ch-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.ch-card__category {
  font-family: var(--font-body);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.5rem;
}

.ch-card__name {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--color-on-surface);
  line-height: 1.35;
}

.ch-card__price {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
  white-space: nowrap;
}
</style>
