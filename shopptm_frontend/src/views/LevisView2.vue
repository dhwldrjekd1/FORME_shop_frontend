<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션 ── -->
    <section class="lv-hero">
      <div class="lv-hero__text">
        <p class="lv-hero__since">Est. 1873 / San Francisco</p>
        <h1 class="lv-hero__title">LEVI'S</h1>
        <p class="lv-hero__desc">
          A curated exploration of the blueprints of modern dress. Re-issuing
          the icons that built the American West.
        </p>
        <button class="lv-hero__btn">Discover the Collection</button>
      </div>
      <div class="lv-hero__img-wrap">
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBOlRVZXJlDIro5LiGgSXbU1Ro0dWv0nQZIYs0ixbvWdooCprmdjxKY21t_eKXe7atldwQOOo-06olPEZLleosi7Fe4AcCvyVMIEQ0Lvc2Jqh5AcYSuRB7qpDq1e79j-nTj4k1yBmAcCGbX3XQECb5vhS3hirb4lgTsMzBI4vu5IUy593e8khO9TekYbo3xwV-15vTz69ZQ2KnI2kWCaI_h4jL8nFH2CV59KEX5gI2zHDrHw3SMrrAM3lWBN7Q8WaJeqNnol-Ip0FzJ"
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
          v-for="product in products"
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
          </div>
          <div class="lv-card__info">
            <div>
              <p class="lv-card__category">{{ product.category }}</p>
              <h3 class="lv-card__name">{{ product.name }}</h3>
            </div>
            <p class="lv-card__price">${{ product.price.toFixed(2) }}</p>
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
    id: 201,
    name: "501® Original Fit",
    category: "Indigo Selvedge / 1947 Reissue",
    price: 248.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAbW3uZ0Z-ghj95HVH-BmjjKxx0OmFOPjoChyFmfsxmmzCCtesd8WBWGGwtbWrdv8lPyLeQQdhXx8q4uv1yx58q4VjUv4TEgfn1z8MCSPpoBb0Loe1gErJljso-044j-WoE5HJZYQntXfRq3wZq-vfYClS8ZTxii0_XWIVIZTk5duzwJ8CCp1bAVVU3iWtl39CXzWyug9sEkF4fuqTSDPCfin5xCNkrxe81zxUgp8ykxAczkaz7jZg7VXQs3dHpWHe2_26A_Abr00Br",
  },
  {
    id: 202,
    name: "Type III Trucker",
    category: "Heavyweight Denim / Stone Wash",
    price: 198.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmUfMSk3BI16yJ1BEq_iQoFS01E1tqDnuQCIuTsuoP03XD-dl0LQv8yPScPMcwyjDEQfLsma3j9s4V7G_fMtC6GFEQqgzT-GnsEHVdYHiZ2Zzu-j2PpVopoFxHMfc50psGjc1H-RQfBKKe0EoHvC2VQs0R5E0MTpsCcF8-IvGzrCGYsnfpAaibBhNPOWxMwXSLj59hWDXHKJ6lZNobBlHabUEBO-_L0TOXhEozZpjq5FWMKuZWujc6objGghNURjRM386zn2x_y4zo",
  },
  {
    id: 203,
    name: "Sawtooth Western",
    category: "Pearl Snap / Sun Faded Indigo",
    price: 128.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWGhxeI8eYPNradgu6rTyLQZH6pWAZHlOFWIQAJWUE48ep1pYdhOtsLTYeKDWCRtPd-ajcj99-ARTHiAc8lSXc17bMIIC7AJn35a1IgWIxz3gyMYWGZZOz5uEhnz8GrJA3s_mLhXIzj1rTd_Y_MN8PJtEoxwaWTcWLvT0_u1VOB-GGGUJ_1LYjD5GBF5qaDvSpe_yOEJ0lRT4hjpZJEmdXY-NSW6couIguc3Kt7N8ZiRUw8ZLc5kWKd7-D2LooW4GwsKfR1D8EKSsB",
  },
  {
    id: 204,
    name: "Ribcage Straight",
    category: "Super High Rise / Bleached Indigo",
    price: 118.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAq9oU6x9U0ZnwF4FSEsLe1HUNX4QBcd8cOWwUD4qSS7xebGBfXvFQqGVKqHj0zCXc7B39m4i5V8nUVK02i_6rTgq1SuuhX0o3RH-0KooEX0xFEEqOETmRX_puTCVGeTs0tk9R8n9mSFZi6kmu-52go7LEL-yEM5omWwL0lOSiGk7Si3_Pyj2855hg6J37Gf7xgOrizEVcFziVbkELOrohra1g6F9_yUtIauLi_EEznbjjij2ov6fYupGp8FZ-9FATlR94M5PSChpNh",
  },
  {
    id: 205,
    name: "505™ Regular Fit",
    category: "Original Zip Fly / Dark Wash",
    price: 108.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAsjyNceuJiUB3ItnQdAl0oKehQvROubuxmGOkdm_TeOi7S_33dp8VPW4O1hblmNQVnCVT2mMs2pRdyEhcA4TtTPthlhVL8e3h963LE6AFdsZyVozCEjRqOzPmJRC52CEZlVyVnMiqOxEai-vMZdJ6ruKG9LaWR3YJX_v-8ix8UbqModlRJ9dmEGn_UCMmm8M9U4EmYC1PAf2Ig0CeQi5op70cuGK9hzTGDKEKbm_dYJxyAdVj6vnjOVpXESyJW_3hGqAfiQ9Qoy1A3",
  },
  {
    id: 206,
    name: "721 High Rise Slim",
    category: "Stretch Selvedge / Carbon Black",
    price: 128.0,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCWubQZVGEsT6YtBzUWNSg14s2h6Hr1wl25PeoxQGtnXAMaXBs6pfKkdd94jVLoEBdSJEfRQLFZZEjoIVDvtn_7rXshSbRjM7EyTFuY7V5kIGbh1RIEAhbMhIWoLeAFEDMHaI9mu8gI-O9aYgkeBb9KmMbxTBAJPaISgL27ESumvL1r4zT9iVUPfEeApi1qpkgrZWc4x9UGDeur2F73i_jXhwOJhYRoYR-41QjxvJ554F5VMEZ1fPWBXbmGWqfH6zJQoQOBQTBdl-_C",
  },
]);
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
  width: 6rem;
  height: 1px;
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
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container-low);
  margin-bottom: 1.5rem;
}

.lv-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1);
  transition: transform 0.7s;
}

.lv-card:hover .lv-card__img {
  transform: scale(1.05);
}

.lv-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.lv-card__category {
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-secondary);
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
