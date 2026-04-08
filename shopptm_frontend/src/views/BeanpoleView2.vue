<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="bp-hero">
      <div class="bp-hero__text">
        <p class="bp-hero__since">Fall / Winter 2024</p>
        <h1 class="bp-hero__title">BEANPOLE</h1>
        <p class="bp-hero__desc">
          A refined collection celebrating British heritage through
          architectural tailoring, heavy-gauge knits, and the enduring charm of
          collegiate style.
        </p>
        <button class="bp-hero__btn">Discover the Collection</button>
      </div>
      <div class="bp-hero__img-wrap">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAm_jlY8ZNkW20KAwnUW7ZFzH5mUJoUkUk17JKbJal7REHJnwL1MoWIbsr2Gv_flst-U4UL50gVAprVbZBu0x9Gd2iXd_tYYo1WydFdD4Wu4nBE3zgFuMCybbxqWQCFJHYyvL3_pojKDUMor95fdFQl5f3uWO5G5gFOJMpMK8s2HM2I3poQCKGotl6w3fHdrjB3yGnL6qzChZHnNlADpvHk6FXYKQh78TnPszYikqb7qPYaGdaLYlK3-yqauP3Hc2S4wm7EXHFhcX6X"
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
          v-for="product in products"
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
            <p class="bp-card__price">${{ product.price.toFixed(2) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const products = ref([
  {
    id: 401,
    name: "Double-Breasted Hopsack Blazer",
    category: "Midnight Navy",
    price: 545.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNIA9uplg2GInu4gf82fhpLO6ZUmdl_RW8lROYR_ek3XU9E0lg51OIljjCP8Vc8buGXPQCqCHI2Vj68rc0GfrU7SAII7G6PrSZpealMDyVpqTFXNqim5YDZyXFvdh783QEGzQ6np7V8OqEDtyYjdyFl_89GFgDES0_1gK5CI4atAcmjX-fbsndx3pAg3IOFBxHrkTm1sUiEYqIdXVzHqIMIU5bC2Wq1ByWFytiSXAZ-jb6Os2XpQGEI2ZtY3Qg60fO2-AUOaEFKXzu",
  },
  {
    id: 402,
    name: "Aran Isle Cable-Knit Sweater",
    category: "100% Merino Wool / Ecru",
    price: 320.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYoHchf3IbBxSiJwoW2n-Hccqo6bVlle8Th6eqX4dD5RHVFr5KnLCkOMB_oHxurIMfQ4amdg7Vt6UuKFJxytiEBE0-QK_Cz1HwtPKY8IQxDyv2UJ4B4CS1gYGrNEFYQtwIGmgedr-TzxTXl2VthFWnv2IfszW2Dgskt0yn_ZQDPOmiZHNznEm9xVAdIHQ_uAqO8aaHYKMriOQMtnJKDNvhg08oScJkebFw83L3U7K_CSzPEGwi6IotKRLe2jc0S-NJ1at6wjxWlqh",
  },
  {
    id: 403,
    name: "The Heritage Trench",
    category: "British Tan / Water Repellent",
    price: 750.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Z-Y2gk5dUFyjsimrnexDMKqYSYZR1IsCivXIvRjvvVmf3xTpMvLkVSdUyN1zgOQ6TdPthvlYiXa9TDSS0vBli--PjJrmAlq5PdPRZ7ePqYWFi1zWs9stJAIWdnshM0xPhNPBRlhqmBqFTzwsBhpv_kkRGP-6CXK_srYR4uKx8-osHY-5XKqefu4sDpOZRXIf1Bxgg4P06kIbiBSpwG3ZnziK-kng_ncNyMkGZri5MDs5JKETbLLn_tDk05bsNA1D1FlbuWEi76IN",
  },
  {
    id: 404,
    name: "University V-Neck Cardigan",
    category: "Deep Burgundy Cashmere",
    price: 425.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzo4wQ1SN5ZV-v5xN2L6o07sT__yDe6rVzLTMsASLN-yq4K4VK186svjI9ggtKZn9n6YtCxO2n0CVWx7NMNMBIcS_ILKgkOfZ2yGxTy2zB2g5SvrWe4aWZ1C-8GgGN9IgMJnj7YkG2xJkHvVv7xu_m8NsQH68S0Ft__45OA8Gbe5VqnFbkdjpBjvkQRi5vc1VThCvr_cmrlirGeMjNidPVbEOmS6XhEcw4hnXM1Zm2U6CyOJP8RUTq3EKYvOIlE3SjvrsZ3X0PUCo_",
  },
  {
    id: 405,
    name: "Button-Down Oxford",
    category: "White Pima Cotton",
    price: 145.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZDKCnc3PWD5Y4kmJLWRu-lh5shUJN8GkFKkWI8vZGypqMSH18ZCgxWasz6X-N26L7fP4AuBrZ8zhFbreR0-1lMSi_RqU5ahC5uOJlc6NEulovqwnd-E-O6N9rDvqeQ33TfyCBfMxUoFnh9GfKuYnIYRtIiIbrNvHyF3o6pzIFI51yZlFIXXAFn3IFMi1rQrpCz8XqG1FYC2C5oQanQqGH9usf-dbq6ylfqaeczn86ha8iRRX81qvBQ_WzIQyvL5KOvPil6ptA9VS",
  },
  {
    id: 406,
    name: "Technical Waxed Field Coat",
    category: "Hunter Green / Weatherproof",
    price: 680.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBN7LpZE4vgS-hDz3JMVhMa6y5_iueEQ_rggqKTjgQtOtcN6mxNM3WNMKTKr2TAXW5ZAAovd4gV4QM2mgNBVpm3Xz-HxuhbOc97sBZlmAgPVbq1xMAZ3OnvbrnHnhvJfE4WTh4LgILpHdC8fGgprGq7q6pc0-2qdXLspae0FxSBF_43UpQUWjw8wASaFI7wBwU9lWlxIy7nzC0zY3Q7Vy3PGo0fegk8c-__JgtXSVgzMkLuqp4VHGvI8YkQxIiVIg9K9hj0mdOL2rqP",
  },
]);
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
  filter: grayscale(0.2);
  transition: transform 0.7s;
}

.bp-card:hover .bp-card__img {
  transform: scale(1.05);
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
