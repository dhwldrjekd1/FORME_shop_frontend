<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="bp-hero">
      <div class="bp-hero__text">
        <p class="ch-hero__since">Since 1989</p>
        <h1 class="bp-hero__title">BEANPOLE</h1>
        <p class="bp-hero__desc">
          1989년 서울에서 시작된 빈폴. <br />
          클래식의 가치를 현대적 감각으로 재해석하며 한국 패션의 헤리티지를
          이어가고 있습니다.
        </p>
        <button class="bp-hero__btn">Discover the Collection</button>
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
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

// 빈폴 상품만 필터 (id 400번대)
const beanpoleProducts = computed(() =>
  products.value.filter((p) => p.id >= 401 && p.id <= 499),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ── 히어로 ── */
.bp-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #103728; /* 빈폴 딥 그린 */
  overflow: hidden;
}

@media (min-width: 768px) {
  .bp-hero {
    grid-template-columns: 5fr 7fr;
  }
}

.bp-hero__text {
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  color: #ffffff;
}

.bp-hero__since {
  font-size: 0.6875rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
}

.bp-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
  color: #ffffff;
}

.bp-hero__desc {
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 28rem;
  line-height: 1.7;
}

.bp-hero__btn {
  display: inline-flex;
  align-items: center;
  background-color: #ffffff;
  color: #144835;
  padding: 1.25rem 3rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  width: fit-content;
  transition: filter 0.2s;
}

.bp-hero__btn:hover {
  filter: brightness(0.95);
}

.bp-hero__img-wrap {
  height: 100%;
  overflow: hidden;
}

.bp-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2) contrast(1.05);
  transition: transform 0.7s;
}

.bp-hero__img-wrap:hover .bp-hero__img {
  transform: scale(1.05);
}

/* ── 상품 그리드 ── */
.bp-products {
  padding: 6rem 3rem;
  background-color: var(--color-surface);
  max-width: 1600px;
  margin: 0 auto;
}

.bp-products__header {
  margin-bottom: 4rem;
}

.bp-products__title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.bp-products__underline {
  width: 3rem;
  height: 4px;
  background-color: #144835;
}

.bp-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
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
  margin-bottom: 1.5rem;
}

.bp-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.7s,
    filter 0.5s;
}

.bp-card:hover .bp-card__img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.bp-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.bp-card__category {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.bp-card__name {
  font-family: var(--font-headline);
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.bp-card__price {
  font-size: 1.0625rem;
  font-weight: 700;
}
</style>
