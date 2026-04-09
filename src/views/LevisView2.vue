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
        <button class="lv-hero__btn">Discover the Collection</button>
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
/* ── 히어로 ── */
.lv-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #8e1c28; /* #A61B29 */
  overflow: hidden;
}

@media (min-width: 768px) {
  .lv-hero {
    grid-template-columns: 5fr 7fr;
  }
}

.lv-hero__text {
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  color: #ffffff;
}

.lv-hero__since {
  font-size: 0.6875rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.lv-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(4rem, 10vw, 7rem);
  font-weight: 800;
  letter-spacing: -0.04em;
  text-transform: uppercase;
  line-height: 1;
  color: #ffffff;
}

.lv-hero__desc {
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 28rem;
  line-height: 1.7;
}

.lv-hero__btn {
  display: inline-flex;
  align-items: center;
  background-color: #ffffff;
  color: #7a1822; /* #8B1622 */
  padding: 1.25rem 3rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  width: fit-content;
  transition: filter 0.2s;
}

.lv-hero__btn:hover {
  filter: brightness(0.95);
}

.lv-hero__img-wrap {
  height: 100%;
  overflow: hidden;
}

.lv-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.2);
  transition: transform 0.7s;
}

.lv-hero__img-wrap:hover .lv-hero__img {
  transform: scale(1.05);
}

/* ── 상품 그리드 ── */
.lv-products {
  padding: 6rem 3rem;
  background-color: var(--color-surface);
  max-width: 1600px;
  margin: 0 auto;
}

.lv-products__header {
  margin-bottom: 4rem;
}

.lv-products__title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.lv-products__underline {
  width: 3rem;
  height: 4px;
  background-color: var(--color-primary);
}

.lv-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
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
  aspect-ratio: 2/3;
  overflow: hidden;
  background-color: var(--color-surface-container-low);
  margin-bottom: 1.5rem;
  position: relative;
}

.lv-card__wish {
  position: absolute;
  bottom: 0.75rem;
  right: 0.75rem;
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s, color 0.2s;
  color: #aaa;
}

.lv-card:hover .lv-card__wish {
  opacity: 1;
}

.lv-card__wish--active {
  opacity: 1 !important;
  color: var(--color-primary);
}

.lv-card__wish .material-symbols-outlined {
  font-size: 1rem;
}

.lv-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.7s,
    filter 0.5s;
}

.lv-card:hover .lv-card__img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.lv-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.lv-card__category {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.lv-card__name {
  font-family: var(--font-headline);
  font-size: 1.0625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.lv-card__price {
  font-size: 1.0625rem;
  font-weight: 700;
}
</style>
