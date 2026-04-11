<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="dk-hero">
      <div class="dk-hero__text">
        <p class="dk-hero__since">Est. 1922 / Fort Worth, Texas</p>
        <h1 class="dk-hero__title">DICKIES</h1>
        <p class="dk-hero__desc">
          세상을 만드는 사람들을 위해 설계된 한 세기의 작업복. <br />
          견고함으로 정의된 디키즈 아카이브가 현대적인 워크웨어로 다시
          태어납니다.
        </p>
        <a
          href="https://dickieskr.com/"
          target="_blank"
          rel="noopener noreferrer"
          class="dk-hero__btn"
        >Discover the Collection</a>
      </div>
      <div class="dk-hero__img-wrap">
        <img
          src="/images/dickies/dickies_hero.png"
          alt="Dickies Hero"
          class="dk-hero__img"
        />
      </div>
    </section>

    <!-- ── 상품 그리드 섹션 ── -->
    <section class="dk-products">
      <div class="dk-products__header">
        <div>
          <h2 class="dk-products__title">The Industrial Uniform</h2>
          <div class="dk-products__underline"></div>
        </div>
      </div>

      <div class="dk-products__grid">
        <RouterLink
          v-for="product in dickiesProducts"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="dk-card"
        >
          <div class="dk-card__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="dk-card__img"
            />
            <button
              class="dk-card__wish"
              :class="{ 'dk-card__wish--active': wishlistStore.isWished(product.id) }"
              @click.prevent="wishlistStore.toggle(product)"
              aria-label="찜하기"
            >
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="dk-card__info">
            <div>
              <p class="dk-card__category">{{ product.category }}</p>
              <h3 class="dk-card__name">{{ product.name }}</h3>
            </div>
            <p class="dk-card__price">
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

// 디키즈 상품만 필터 (id 300번대)
const dickiesProducts = computed(() =>
  products.value.filter((p) => p.id >= 301 && p.id <= 399),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ════════════════════════════════
   DICKIES — Industrial Black + Yellow
   Brand color: #1A1A1A (pure black)
   Accent:      #FFC72C (work yellow)
   ════════════════════════════════ */
.dk-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #1A1A1A;
  overflow: hidden;
  position: relative;
}

@media (min-width: 768px) {
  .dk-hero {
    grid-template-columns: 4fr 6fr;
  }
}

.dk-hero__text {
  padding: 6rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2.25rem;
  color: #ffffff;
}

.dk-hero__since {
  display: inline-flex;
  align-items: center;
  background-color: #FFC72C;
  color: #1A1A1A;
  padding: 0.5rem 0.875rem;
  font-family: var(--font-body);
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: -0.5rem;
  width: fit-content;
}

.dk-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(4rem, 9vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.035em;
  text-transform: uppercase;
  line-height: 0.92;
  color: #FFC72C;
  -webkit-text-stroke: 1px #FFC72C;
}

.dk-hero__desc {
  font-family: var(--font-body);
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  letter-spacing: 0.005em;
}

.dk-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  background-color: #FFC72C;
  color: #1A1A1A;
  border: 2px solid #FFC72C;
  padding: 1.125rem 2.75rem;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  width: fit-content;
  margin-top: 0.5rem;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s,
    transform 0.2s;
}

.dk-hero__btn:hover {
  background-color: #1A1A1A;
  color: #FFC72C;
  transform: translateY(-2px);
}

.dk-hero__img-wrap {
  height: 100%;
  min-height: 420px;
  overflow: hidden;
  position: relative;
}

.dk-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to right,
    rgba(26, 26, 26, 0.4) 0%,
    transparent 30%
  );
  pointer-events: none;
}

.dk-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(1) contrast(1.15) brightness(0.85);
  transition: transform 0.8s, filter 0.6s;
}

.dk-hero__img-wrap:hover .dk-hero__img {
  transform: scale(1.04);
  filter: grayscale(0.7) contrast(1.1) brightness(0.95);
}

/* ── 상품 그리드 ── */
.dk-products {
  padding: 7rem 3rem 8rem;
  background-color: var(--color-surface);
}

.dk-products__header {
  margin-bottom: 4.5rem;
  max-width: 1600px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.dk-products__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 400;
  text-transform: uppercase;
  letter-spacing: -0.015em;
  margin-bottom: 1rem;
  color: var(--color-on-surface);
}

.dk-products__underline {
  width: 4rem;
  height: 6px;
  background: repeating-linear-gradient(
    135deg,
    #FFC72C 0px,
    #FFC72C 6px,
    #1A1A1A 6px,
    #1A1A1A 12px
  );
}

.dk-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3.5rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
}

@media (min-width: 640px) {
  .dk-products__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .dk-products__grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.dk-card {
  display: block;
  cursor: pointer;
}

.dk-card__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container);
  margin-bottom: 1.25rem;
  position: relative;
}

.dk-card__wish {
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

.dk-card:hover .dk-card__wish {
  opacity: 1;
}

.dk-card__wish:hover {
  color: #1A1A1A;
  transform: scale(1.08);
}

.dk-card__wish--active {
  opacity: 1 !important;
  color: #1A1A1A;
}

.dk-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "wght" 400;
}

.dk-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.8s,
    filter 0.5s;
}

.dk-card:hover .dk-card__img {
  transform: scale(1.04);
  filter: grayscale(0);
}

.dk-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.dk-card__category {
  font-family: var(--font-body);
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.5rem;
}

.dk-card__name {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  letter-spacing: -0.005em;
  color: var(--color-on-surface);
  line-height: 1.35;
}

.dk-card__price {
  font-family: var(--font-body);
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-on-surface);
  white-space: nowrap;
}
</style>
