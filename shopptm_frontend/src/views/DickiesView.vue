<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="dk-hero">
      <div class="dk-hero__text">
        <p class="dk-hero__since">Est. 1922 / Fort Worth, Texas</p>
        <h1 class="dk-hero__title">DICKIES</h1>
        <p class="dk-hero__desc">
          A century of purpose-built garments for those who shape the world.
          Defined by resilience, the archive re-emerges as the modern industrial
          uniform.
        </p>
        <button class="dk-hero__btn">Discover the Collection</button>
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
          v-for="product in products"
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
          </div>
          <div class="dk-card__info">
            <div>
              <p class="dk-card__category">{{ product.category }}</p>
              <h3 class="dk-card__name">{{ product.name }}</h3>
            </div>
            <p class="dk-card__price">${{ product.price.toFixed(2) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  { id: 301, name: "874 Work Pants", category: "Original Fit / Recycled Poly-Cotton", price: 75.0, image: "/images/dickies/301.jpg" },
  { id: 302, name: "Eisenhower Jacket", category: "Unlined / Industrial Canvas", price: 110.0, image: "/images/dickies/302.jpg" },
  { id: 303, name: "Logo T-Shirt", category: "Heavyweight Cotton / Heritage Fit", price: 35.0, image: "/images/dickies/303.jpg" },
  { id: 304, name: "Logo Beanie", category: "Ribbed Knit / One Size", price: 25.0, image: "/images/dickies/304.jpg" },
  { id: 305, name: "Bib Overalls", category: "Duck Canvas / Triple Stitched", price: 95.0, image: "/images/dickies/305.jpg" },
  { id: 306, name: "Work Shirt", category: "Moisture Wicking / Flex Fabric", price: 55.0, image: "/images/dickies/306.jpg" },
]);
</script>

<style scoped>
/* ── 히어로 ── */
.dk-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  background-color: var(--color-surface-container-low); /* ← 변경 */
  overflow: hidden;
}

@media (min-width: 768px) {
  .dk-hero {
    grid-template-columns: 5fr 7fr;
  }
}

.dk-hero__text {
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  color: var(--color-on-surface); /* ← 변경 */
}

.dk-hero__since {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.dk-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
  color: var(--color-on-surface);
}

.dk-hero__desc {
  font-size: 1.0625rem;
  color: rgba(0, 0, 0, 0.7);
  max-width: 28rem;
  line-height: 1.7;
}

.dk-hero__btn {
  display: inline-flex;
  align-items: center;
  background-color: #ffb81c;
  color: #000000;
  padding: 1.25rem 3rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  width: fit-content;
  transition: filter 0.2s;
}

.dk-hero__btn:hover {
  filter: brightness(1.1);
}

.dk-hero__img-wrap {
  height: 100%;
  overflow: hidden;
}

.dk-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.25) brightness(0.75);
  transition: transform 0.7s;
}

.dk-hero__img-wrap:hover .dk-hero__img {
  transform: scale(1.05);
}

/* ── 상품 그리드 ── */
.dk-products {
  padding: 6rem 3rem;
  background-color: var(--color-surface-container-low);
}

.dk-products__header {
  margin-bottom: 4rem;
}

.dk-products__title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}

.dk-products__underline {
  width: 3rem;
  height: 4px;
  background-color: #ffb81c;
}

.dk-products__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 3rem;
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
  margin-bottom: 1.5rem;
}

.dk-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: transform 0.5s;
}

.dk-card:hover .dk-card__img {
  transform: scale(1.1);
}

.dk-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.dk-card__category {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-outline);
  margin-bottom: 0.375rem;
}

.dk-card__name {
  font-family: var(--font-headline);
  font-size: 1.0625rem;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.dk-card__price {
  font-size: 1.0625rem;
  font-weight: 700;
}
</style>
