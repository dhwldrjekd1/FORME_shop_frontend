<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="ch-hero">
      <div class="ch-hero__text">
        <p class="ch-hero__since">Since 1889</p>
        <h1 class="ch-hero__title">CARHARTT</h1>
        <p class="ch-hero__desc">
          Established 1889 in Detroit. Built on the rugged honesty of American
          craftsmanship. Iconic workwear engineered for the individuals who move
          the world forward.
        </p>
        <RouterLink to="/products" class="ch-hero__btn">
          Shop Collection
          <span class="material-symbols-outlined">arrow_forward</span>
        </RouterLink>
      </div>
      <div class="ch-hero__img-wrap">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuA6MSFZ500OpgZKo6SGRIaWMoOtC173Oo7theKznqnm6jfBhZ6HVMgL7igZ4H2s795oN370Wv7h2Td94ZpjFr5nHz9TthGCbRl4KArY3pLbv3uJPZ-ulAK1uN5VishOVbyqQgtsxKVcBWkw9V0zhZNZo75gNjb6GbORJm5XCze6dDqpRqV2scwvO8fgDlUpmmQL5a05AUtV1vblVDJJexjvxz_RlLp2C6JtYatunpWlLA7Q_90UBliuK5BEmTzc_cyn_VvG9fMQbGYg"
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
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

// 칼하트 상품만 필터 (id 100번대)
const carharttProducts = computed(() =>
  products.value.filter((p) => p.id >= 101 && p.id <= 199),
);

onMounted(() => {
  productStore.fetchProducts();
});
</script>

<style scoped>
/* ── 히어로 ── */
.ch-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: #9c4f18; /* 칼하트 브라운 */
}

@media (min-width: 768px) {
  .ch-hero {
    grid-template-columns: 5fr 7fr;
  }
}

.ch-hero__text {
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  color: #ffffff;
}

.ch-hero__since {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.7);
}

.ch-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
  color: #ffffff;
}

.ch-hero__desc {
  font-size: 1.0625rem;
  color: rgba(255, 255, 255, 0.8);
  max-width: 28rem;
  line-height: 1.7;
}

.ch-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #ffffff;
  color: #7a3e14; /* 버튼은 반전 */
  padding: 1.25rem 2.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  width: fit-content;
  transition: filter 0.2s;
}

.ch-hero__btn:hover {
  filter: brightness(0.95);
}

.ch-hero__img-wrap {
  height: 100%;
  overflow: hidden;
}

.ch-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(20%);
  transition: transform 0.7s;
}

.ch-hero__img-wrap:hover .ch-hero__img {
  transform: scale(1.05);
}

/* ── 상품 그리드 ── */
.ch-products {
  padding: 6rem 3rem;
  background-color: var(--color-surface-container-low);
}

.ch-products__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 4rem;
}

.ch-products__title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.ch-products__underline {
  width: 3rem;
  height: 4px;
  background-color: #b35d1e;
}

.ch-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
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
  margin-bottom: 1.5rem;
}

.ch-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition:
    transform 0.7s,
    filter 0.5s;
}

.ch-card:hover .ch-card__img {
  transform: scale(1.05);
  filter: grayscale(0);
}

.ch-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.ch-card__category {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.ch-card__name {
  font-family: var(--font-body);
  font-size: 1.0625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: -0.01em;
}

.ch-card__price {
  font-size: 1.0625rem;
}
</style>
