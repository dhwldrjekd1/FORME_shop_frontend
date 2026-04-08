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
          v-for="product in products"
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
            <p class="ch-card__price">${{ product.price.toFixed(2) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";

const email = ref("");

// 칼하트 상품 목업 데이터
const products = ref([
  {
    id: 101,
    name: "Detroit Jacket",
    category: "Outerwear",
    price: 185.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAb7G0vfyogoDzlNFt7JcsUeUWAcLWWTquO6GvPi6gzyDIIiJCC36m4RKu2Uj_uH1Us7COzao2I6SsvUJuoZqIu3mQWZzvyS9qrKAm491nwT5K295h2-ctW47rELz5cAWVgduFQOIeNeVrH-gj96tx_mCLiel4QujRYmjz1z-4NuiLKh2kYmuF1gRg9PxUIfNWA-ucnXj8sfdcgBNsQ0qfwwtvAQ6z6l_XxcLA_fNl2rPL3r_1LTscDBkiGLbaDerP3I4qv9TnqE5j2",
  },
  {
    id: 102,
    name: "Double Knee Pant",
    category: "Pants",
    price: 115.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAKGjqDjm3uaBXs7hMlL3fx6uzFgmIVkgrn15TpVucINncr9xe0uHcBu2l99lTXKxqAFZa2Pog_PcupecJHHo0VfKTCaTOk-pFX833WmLATjlIFM1jNJ8jiDtg7uwpLyYHXnYIgM_A45MNMV9Tv3pT2Q9txmZdXYorv6hTzMldEqArMQzrn8Fl4qBuwB_367J-7DTW185LffMmct1rO_AVHOlDhWPee6jRXEbGZQyVAvFqkDhZke9kWFIv8Oz0_FdmEi39IkXJobPIR",
  },
  {
    id: 103,
    name: "Pocket T-Shirt",
    category: "Basics",
    price: 38.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBWpbukDAreDdAMutXFVHitTzIv037ezECXPRfHWPfl2jO30ARwKy5zZqBYgoAPWGf6YZsETOGvire-fc2F06Q_bmOe_v8bc5gRHGbuit13-WkJbgLTIpCjwEdGTJl0VZMAudn8pokFMmQOXrIsjbeXz-4A3JvpB2NdxSLmPCtRnYBcTiNuE4-H3z-sqmmpbfWc1kvKym19IXmbLhyhanB2T5997AHQbNPHayPYlwWkkvQOKR8yX0rJFIoHWnBDn5O-FW9XMSgC9vWU",
  },
  {
    id: 104,
    name: "Chase Hooded Sweatshirt",
    category: "Sweats",
    price: 98.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAu-ZefA__Z6qEEx5n95FX_v2-C0jNUS8FxQHo4_sJZNeDLub_8zB76Wk5pWYTua-XFii0KpDsy47QszW-of5w5JTWQm6kCUVModZUpJYzpjOVYE3Ao_S2PwEIWJIfV01p7cOBye9nGBmBgLmzjKd5x4fZPZKq5PYgWk7ZAm_2vkSGSAqRWDTpJIEBt8VGUF_FLZEG9kspGlN5uLDWotBIZ1kARseDHA5I_njn_VZGQfuW9hUpgoi1kRIIEB130ZxbiaUf71yNE1JWw",
  },
  {
    id: 105,
    name: "Watch Hat Beanie",
    category: "Accessories",
    price: 28.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCYA3s08fyBsMQdODkXdRXqxuBkmTsRGEeYzlmn8Jgb694JdtLizW8fbGT1ie-3xe6UEM4YPqX2QGi-sEfwq2kdC43WhvQJ0ZBsUAub_5z1xz3DqSbWgnrt8SNUSzYVEJrg6nV-hpffFpY-95fQbfph66ZJLMoDwU_7Hm_fCjPAWScFB2cDLzEk-fsludAr2-1xQG0gjVrPMvWrpG_jb0Bn8_GqaxvtMkQ_JEkp2LO3Ev_EG1zYET0Kn4zLmW2Rb4vvPm578n30JEX-",
  },
  {
    id: 106,
    name: "Classic Tool Bag",
    category: "Gear",
    price: 75.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlf-zXvBG0ILqDGDeRGzcXPKXhw09lcOgv_Nrx4ZX2lAC3WRAH2ZEVm48D3F8Dz9URv_bGDoXg6KB6dzYoVL_nqbE24WdUZvoZRkEXdM3ey9ySO8Ua9Vsu0bPvRHsv24CCgffJ2hs5jCPG1JkQvAglkaKlCRX5KAvOOmVjp7ejfvwQyLAWgOYCwt6BRZpP_v3_jCzVX46q6un5j4a_Of3PgHdNh8M5j6gipbQtG3SHtcg5wTK65Usp1Vahw2FPErWbdC7fjrH9zEdN",
  },
]);
</script>

<style scoped>
/* ── 칼하트 브랜드 컬러 ── */
.ch-brand {
  color: #b35d1e;
}

/* ── 히어로 ── */
.ch-hero {
  display: grid;
  grid-template-columns: 1fr;
  height: 800px;
  align-items: center;
  background-color: var(--color-surface);
}

@media (min-width: 768px) {
  .ch-hero {
    grid-template-columns: 5fr 7fr; /* 5:7 비율 */
  }
}

.ch-hero__text {
  padding: 5rem 3rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.ch-hero__since {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-outline);
}

.ch-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3.5rem, 8vw, 6rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
}

.ch-hero__desc {
  font-size: 1.0625rem;
  color: var(--color-on-surface-variant);
  max-width: 28rem;
  line-height: 1.7;
}

.ch-hero__btn {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background-color: #b35d1e; /* 칼하트 시그니처 브라운 */
  color: #ffffff;
  padding: 1.25rem 2.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  width: fit-content;
  transition: filter 0.2s;
}

.ch-hero__btn:hover {
  filter: brightness(1.1);
}

.ch-hero__img-wrap {
  height: 100%;
  min-height: 600px;
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

/* 칼하트 시그니처 브라운 하단 강조선 */
.ch-products__underline {
  width: 3rem;
  height: 4px;
  background-color: #b35d1e;
}

/* 3컬럼 그리드 */
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

/* 상품 카드 */
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
  transition: transform 0.5s;
}

.ch-card:hover .ch-card__img {
  transform: scale(1.1);
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

/* ── 뉴스레터 섹션 ── */
.ch-newsletter {
  display: grid;
  grid-template-columns: 1fr;
  background-color: var(--color-surface);
  padding: 3rem;
  gap: 3rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.06);
}

@media (min-width: 768px) {
  .ch-newsletter {
    grid-template-columns: 1fr 1fr;
  }
}

.ch-newsletter__left {
  background-color: var(--color-surface-container-high);
  padding: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.5rem;
}

.ch-newsletter__title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.ch-newsletter__desc {
  color: var(--color-on-surface-variant);
  line-height: 1.7;
}

.ch-newsletter__form {
  display: flex;
  margin-top: 1rem;
}

.ch-newsletter__input {
  flex: 1;
  background-color: #ffffff;
  border: none;
  padding: 1rem 1.5rem;
  font-size: 0.8125rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ch-newsletter__input:focus {
  outline: 1px solid #b35d1e;
}

.ch-newsletter__btn {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1rem 2rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: opacity 0.2s;
}

.ch-newsletter__btn:hover {
  opacity: 0.85;
}

.ch-newsletter__right {
  height: 400px;
  overflow: hidden;
}

.ch-newsletter__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
}
</style>
