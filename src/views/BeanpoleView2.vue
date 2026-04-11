<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="bp-hero">
      <div class="bp-hero__text">
        <p class="bp-hero__since">Est. 1989 / Seoul</p>
        <h1 class="bp-hero__title">BEANPOLE</h1>
        <p class="bp-hero__desc">
          1989년 서울에서 시작된 빈폴. <br />
          클래식의 가치를 현대적 감각으로 재해석하며 한국 패션의 헤리티지를
          이어가고 있습니다.
        </p>
        <a
          href="https://www.beanpole.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="bp-hero__btn"
        >Discover the Collection</a>
      </div>
      <div class="bp-hero__img-wrap">
        <img
          src="/images/beanpole/beanpole_hero.png"
          alt="Beanpole Hero"
          class="bp-hero__img"
        />
      </div>
    </section>

    <!-- ── 상품 그리드 섹션 ── -->
    <section class="bp-products">
      <div class="bp-products__header">
        <div>
          <h2 class="bp-products__title">The Heritage Collection</h2>
          <div class="bp-products__underline"></div>
        </div>
      </div>

      <div class="bp-products__grid">
        <RouterLink
          v-for="product in beanpoleProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="bp-card"
        >
          <div class="bp-card__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="bp-card__img"
            />
            <button
              class="bp-card__wish"
              :class="{ 'bp-card__wish--active': wishlistStore.isWished(product.id) }"
              @click.prevent="wishlistStore.toggle(product)"
              aria-label="찜하기"
            >
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="bp-card__info">
            <div>
              <p class="bp-card__category">{{ product.category }}</p>
              <h3 class="bp-card__name">{{ product.name }}</h3>
            </div>
            <p class="bp-card__price">
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

// 빈폴 상품만 필터 (id 400번대)
const beanpoleProducts = computed(() =>
  products.value.filter((p) => p.id >= 401 && p.id <= 499),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ════════════════════════════════
   BEANPOLE — Heritage Navy
   Brand color: #103728 (preppy navy)
   Accent:      #C9A86B (vintage gold)
   ════════════════════════════════ */
.bp-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #103728;
  overflow: hidden;
  position: relative;
}

@media (min-width: 768px) {
  .bp-hero {
    grid-template-columns: 4fr 6fr;
  }
}

.bp-hero__text {
  padding: 6rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.25rem;
  color: #ffffff;
}

.bp-hero__since {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  font-family: var(--font-accent);
  font-size: 0.75rem;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #C9A86B;
  margin-bottom: -0.5rem;
}

.bp-hero__since::before,
.bp-hero__since::after {
  content: "";
  width: 1.5rem;
  height: 1px;
  background-color: #C9A86B;
  display: inline-block;
}

.bp-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.75rem, 8vw, 6.5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #ffffff;
}

.bp-hero__title::after {
  content: "";
  display: block;
  width: 4rem;
  height: 1px;
  background-color: #C9A86B;
  margin-top: 1.5rem;
}

.bp-hero__desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  letter-spacing: 0.005em;
}

.bp-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  background-color: transparent;
  color: #C9A86B;
  border: 1px solid #C9A86B;
  padding: 1.125rem 2.75rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  width: fit-content;
  margin-top: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

.bp-hero__btn:hover {
  background-color: #C9A86B;
  color: #103728;
}

.bp-hero__img-wrap {
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
}

.bp-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(26, 43, 74, 0.3) 0%,
    transparent 30%
  );
  pointer-events: none;
}

.bp-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: grayscale(0.2) contrast(1.05) brightness(0.95);
  transition: transform 0.8s, filter 0.6s;
}

.bp-hero__img-wrap:hover .bp-hero__img {
  transform: scale(1.04);
  filter: grayscale(0) contrast(1.05) brightness(1);
}

/* ── 상품 그리드 ── */
.bp-products {
  padding: 7rem 3rem 8rem;
  background-color: var(--color-surface);
}

.bp-products__header {
  margin-bottom: 4.5rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.bp-products__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.015em;
  margin-bottom: 1rem;
  color: var(--color-on-surface);
}

.bp-products__underline {
  width: 4rem;
  height: 1px;
  background-color: #103728;
  position: relative;
}

.bp-products__underline::before {
  content: "";
  position: absolute;
  left: 50%;
  top: -3px;
  transform: translateX(-50%);
  width: 7px;
  height: 7px;
  background-color: #C9A86B;
  border-radius: 50%;
}

.bp-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3.5rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .bp-products__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .bp-products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.bp-card {
  display: block;
  cursor: pointer;
}

.bp-card__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container-low);
  margin-bottom: 1.25rem;
  position: relative;
}

.bp-card__wish {
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

.bp-card:hover .bp-card__wish {
  opacity: 1;
}

.bp-card__wish:hover {
  color: #103728;
  transform: scale(1.08);
}

.bp-card__wish--active {
  opacity: 1 !important;
  color: #103728;
}

.bp-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "wght" 400;
}

.bp-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.8s,
    filter 0.5s;
}

.bp-card:hover .bp-card__img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.bp-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.bp-card__category {
  font-family: var(--font-body);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.5rem;
}

.bp-card__name {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--color-on-surface);
  line-height: 1.35;
}

.bp-card__price {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
  white-space: nowrap;
}
</style>
