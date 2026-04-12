<template>
  <main class="page-wrapper f05-home">
    <!-- Hero: grid lines + 제한된 컬러 -->
    <section class="f05-hero">
      <div class="f05-hero__grid">
        <div class="f05-hero__col f05-hero__col--text">
          <div class="f05-hero__mark">FORME</div>
          <div class="f05-hero__vertical">シンプル・ライフ</div>
        </div>
        <div class="f05-hero__col f05-hero__col--image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
            alt="hero"
          />
        </div>
        <div class="f05-hero__col f05-hero__col--caption">
          <p class="f05-hero__title">FORME</p>
          <p class="f05-hero__sub">LIFE IN PLAIN — 간결한 것이 오래 남는다.</p>
          <RouterLink to="/products" class="f05-hero__cta">VIEW ALL →</RouterLink>
        </div>
      </div>
    </section>

    <!-- 카테고리 줄 -->
    <section class="f05-cats">
      <div v-for="cat in cats" :key="cat.name" class="f05-cat">
        <div class="f05-cat__num">{{ cat.num }}</div>
        <p class="f05-cat__name">{{ cat.name }}</p>
      </div>
    </section>

    <!-- 상품 섹션 -->
    <section class="f05-products">
      <header class="f05-products__head">
        <p class="f05-products__label">NEW /</p>
        <h2 class="f05-products__title">今週の新着 · 신상품</h2>
      </header>
      <div class="f05-products__grid">
        <RouterLink
          v-for="p in products.slice(0, 8)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f05-item"
        >
          <div class="f05-item__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <p class="f05-item__brand">{{ getBrandName(p.id) }}</p>
          <p class="f05-item__name">{{ p.name }}</p>
          <p class="f05-item__price">¥{{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 브랜드 리스트 (문서 형태) -->
    <section class="f05-brands">
      <div class="f05-brands__head">
        <p class="f05-brands__label">BRAND /</p>
        <h2 class="f05-brands__title">四つのブランド · 네 개의 브랜드</h2>
      </div>
      <div class="f05-brands__list">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f05-brand-row"
        >
          <span class="f05-brand-row__no">0{{ i + 1 }}</span>
          <span class="f05-brand-row__name">{{ b.title }}</span>
          <span class="f05-brand-row__desc">{{ b.desc }}</span>
          <span class="f05-brand-row__arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- 큰 카피 -->
    <section class="f05-copy">
      <p>Simple things<br />for a simple life.</p>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
const fmt = (p) => p ? p.toLocaleString() : "";
const getBrandName = (id) => {
  if (id >= 100 && id < 200) return "Carhartt";
  if (id >= 200 && id < 300) return "Levi's";
  if (id >= 300 && id < 400) return "Dickies";
  if (id >= 400 && id < 500) return "Beanpole";
  return "FORME";
};
const cats = [
  { num: "01", name: "TOPS" },
  { num: "02", name: "PANTS" },
  { num: "03", name: "DENIM" },
  { num: "04", name: "OUTER" },
  { num: "05", name: "ACC" },
];
const brandPanels = [
  { id: 1, title: "BEANPOLE", desc: "Seoul · 1989",        route: "/beanpole" },
  { id: 2, title: "LEVI'S",   desc: "San Francisco · 1873", route: "/levis" },
  { id: 3, title: "DICKIES",  desc: "Fort Worth · 1922",   route: "/dickies" },
  { id: 4, title: "CARHARTT", desc: "Detroit · 1889",      route: "/carhartt" },
];
</script>

<style scoped>
/* FORME 05 — Japanese Minimal (UNIQLO/MUJI) */
.f05-home {
  background: #ffffff;
  color: #1f1f1f;
  font-family: var(--font-body);
}

/* Hero */
.f05-hero {
  min-height: calc(100dvh - var(--header-height));
  padding: 4rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 70vh;
}
@media (min-width: 1024px) {
  .f05-hero__grid {
    grid-template-columns: 2fr 5fr 3fr;
    gap: 3rem;
  }
}
.f05-hero__col--text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}
.f05-hero__mark {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.35em;
}
.f05-hero__vertical {
  writing-mode: vertical-rl;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #888;
}
.f05-hero__col--image { overflow: hidden; }
.f05-hero__col--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;
}
.f05-hero__col--caption {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 1rem;
}
.f05-hero__title {
  font-family: "Space Mono", monospace;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1;
  margin-bottom: 1rem;
}
.f05-hero__sub {
  font-size: 0.8125rem;
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.7;
}
.f05-hero__cta {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #1f1f1f;
  border-bottom: 1px solid #1f1f1f;
  padding-bottom: 4px;
  width: fit-content;
  transition: padding-right 0.2s;
}
.f05-hero__cta:hover { padding-right: 0.5rem; }

/* 카테고리 */
.f05-cats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #1f1f1f;
}
@media (min-width: 768px) { .f05-cats { grid-template-columns: repeat(5, 1fr); } }
.f05-cat {
  padding: 3rem 2rem;
  border-right: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background 0.2s;
}
.f05-cat:hover { background: #f7f5f0; }
.f05-cat__num {
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
}
.f05-cat__name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* 상품 */
.f05-products {
  padding: 5rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-products__head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}
.f05-products__label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f05-products__title {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 500;
  letter-spacing: -0.005em;
}
.f05-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 1.5rem;
}
@media (min-width: 768px) { .f05-products__grid { grid-template-columns: repeat(4, 1fr); } }
.f05-item { cursor: pointer; }
.f05-item__img-wrap {
  aspect-ratio: 1/1;
  background: #f7f5f0;
  margin-bottom: 0.875rem;
  overflow: hidden;
}
.f05-item__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f05-item:hover .f05-item__img-wrap img { transform: scale(1.03); }
.f05-item__brand {
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
}
.f05-item__name {
  font-size: 0.8125rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f05-item__price {
  font-size: 0.875rem;
  font-weight: 600;
}

/* 브랜드 리스트 */
.f05-brands { padding: 5rem 3rem; border-bottom: 1px solid #1f1f1f; }
.f05-brands__head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
}
.f05-brands__label {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f05-brands__title {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 500;
}
.f05-brands__list { display: flex; flex-direction: column; }
.f05-brand-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e5e5e5;
  color: #1f1f1f;
  transition: padding-left 0.3s, background 0.3s;
}
.f05-brand-row:hover { padding-left: 1rem; background: #f7f5f0; }
.f05-brand-row__no {
  font-size: 0.6875rem;
  color: #999;
  letter-spacing: 0.15em;
}
.f05-brand-row__name {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.f05-brand-row__desc {
  font-size: 0.8125rem;
  color: #666;
  font-style: italic;
}
.f05-brand-row__arrow {
  font-size: 1rem;
  transition: transform 0.3s;
}
.f05-brand-row:hover .f05-brand-row__arrow { transform: translateX(6px); }

/* 큰 카피 */
.f05-copy {
  padding: 10rem 3rem;
  text-align: center;
}
.f05-copy p {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #1f1f1f;
}
</style>
