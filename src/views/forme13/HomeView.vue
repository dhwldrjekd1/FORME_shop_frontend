<template>
  <main class="page-wrapper f13-home">
    <section class="f13-hero">
      <div class="f13-hero__grid">
        <div class="f13-hero__cell f13-hero__cell--red"></div>
        <div class="f13-hero__cell f13-hero__cell--blue">
          <span class="f13-hero__no">13 / 20</span>
        </div>
        <div class="f13-hero__cell f13-hero__cell--yellow"></div>
        <div class="f13-hero__cell f13-hero__cell--text">
          <p class="f13-hero__eyebrow">FORME / SWISS EDITION</p>
          <h1 class="f13-hero__title">FORME</h1>
          <p class="f13-hero__sub">form follows function.</p>
          <div class="f13-hero__line"></div>
          <RouterLink to="/products" class="f13-cta">SHOP →</RouterLink>
        </div>
      </div>
    </section>

    <section class="f13-brands">
      <div class="f13-section__head">
        <span>01</span><h2>BRANDS</h2>
      </div>
      <div class="f13-brands__list">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f13-brand">
          <span class="f13-brand__num">0{{i+1}}</span>
          <h3>{{ b.title }}</h3>
          <span class="f13-brand__year">{{ b.year }}</span>
          <span class="f13-brand__arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <section class="f13-grid-layout">
      <div class="f13-section__head">
        <span>02</span><h2>OBJECTS</h2>
      </div>
      <div class="f13-products">
        <RouterLink v-for="p in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f13-item">
          <div class="f13-item__img"><img :src="p.image" :alt="p.name" /></div>
          <h3>{{ p.name }}</h3>
          <p>₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f13-manifesto">
      <p>FORME<br /><strong>=</strong><br />FORM <em>+</em> FUNCTION</p>
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
const brands = [
  { id: 1, title: "BEANPOLE", year: "1989", route: "/beanpole" },
  { id: 2, title: "CARHARTT", year: "1889", route: "/carhartt" },
  { id: 3, title: "LEVI'S",   year: "1873", route: "/levis" },
  { id: 4, title: "DICKIES",  year: "1922", route: "/dickies" },
];
</script>

<style scoped>
.f13-home {
  background: #f5f5f0;
  color: #000;
  font-family: "Helvetica Neue", "Arial", sans-serif;
  min-height: 100dvh;
}
.f13-hero {
  min-height: calc(100dvh - var(--header-height));
  padding: 2rem;
}
.f13-hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
  height: calc(100vh - var(--header-height) - 4rem);
  max-width: 1400px;
  margin: 0 auto;
}
.f13-hero__cell {
  padding: 2rem;
  position: relative;
  border: 2px solid #000;
}
.f13-hero__cell--red { background: #E30613; }
.f13-hero__cell--blue { background: #005F9E; }
.f13-hero__cell--yellow { background: #FCD900; }
.f13-hero__cell--text {
  background: #f5f5f0;
  grid-column: 2;
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
.f13-hero__no {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #fff;
}
.f13-hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  margin-bottom: 1rem;
}
.f13-hero__title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.05em;
  margin-bottom: 1rem;
}
.f13-hero__sub {
  font-size: 1.25rem;
  font-style: italic;
  margin-bottom: 2rem;
}
.f13-hero__line {
  width: 4rem;
  height: 4px;
  background: #E30613;
  margin-bottom: 2rem;
}
.f13-cta {
  display: inline-block;
  width: fit-content;
  padding: 1rem 2rem;
  background: #000;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  border: 2px solid #000;
}
.f13-cta:hover { background: #E30613; border-color: #E30613; }

.f13-section__head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  padding: 3rem 3rem 2rem;
  border-bottom: 2px solid #000;
}
.f13-section__head span {
  font-size: 2rem;
  font-weight: 900;
  color: #E30613;
}
.f13-section__head h2 {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.f13-brands { border-bottom: 2px solid #000; }
.f13-brands__list { display: flex; flex-direction: column; }
.f13-brand {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  gap: 2rem;
  align-items: center;
  padding: 1.75rem 3rem;
  border-bottom: 1px solid #000;
  color: #000;
  transition: background 0.2s;
}
.f13-brand:last-child { border-bottom: none; }
.f13-brand:hover { background: #FCD900; }
.f13-brand__num { font-size: 0.875rem; font-weight: 700; }
.f13-brand h3 { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.01em; }
.f13-brand__year { font-size: 0.875rem; }
.f13-brand__arrow { font-size: 1.5rem; font-weight: 700; }

.f13-products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
@media (min-width: 768px) { .f13-products { grid-template-columns: repeat(3, 1fr); } }
.f13-item {
  padding: 2rem;
  border-right: 1px solid #000;
  border-bottom: 1px solid #000;
  color: #000;
  transition: background 0.2s;
}
.f13-item:hover { background: #005F9E; color: #fff; }
.f13-item__img {
  aspect-ratio: 1/1;
  background: #fff;
  border: 2px solid #000;
  margin-bottom: 1rem;
  overflow: hidden;
}
.f13-item__img img { width: 100%; height: 100%; object-fit: cover; }
.f13-item h3 { font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.5rem; }
.f13-item p { font-size: 1rem; font-weight: 900; }

.f13-manifesto {
  background: #E30613;
  color: #fff;
  padding: 8rem 3rem;
  text-align: center;
}
.f13-manifesto p {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.03em;
}
.f13-manifesto strong { color: #FCD900; }
.f13-manifesto em { color: #005F9E; font-style: normal; }
</style>
