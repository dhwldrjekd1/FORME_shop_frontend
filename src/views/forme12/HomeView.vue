<template>
  <main class="page-wrapper f12-home">
    <div class="f12-bg">
      <div class="f12-orb f12-orb--1"></div>
      <div class="f12-orb f12-orb--2"></div>
      <div class="f12-orb f12-orb--3"></div>
    </div>

    <section class="f12-hero">
      <div class="f12-glass f12-hero__card">
        <p class="f12-hero__eyebrow">FUTURE / FORME / 2026</p>
        <h1 class="f12-hero__title">FORME</h1>
        <p class="f12-hero__desc">유리처럼 맑은 큐레이션. 빛을 머금는 옷장.</p>
        <RouterLink to="/products" class="f12-btn">Enter the Future →</RouterLink>
      </div>
    </section>

    <section class="f12-brands">
      <h2 class="f12-h">✧ FOUR HOUSES</h2>
      <div class="f12-brands__grid">
        <RouterLink v-for="b in brands" :key="b.id" :to="b.route" class="f12-glass f12-brand">
          <img :src="b.image" :alt="b.title" />
          <div class="f12-brand__info">
            <h3>{{ b.title }}</h3>
            <p>{{ b.since }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="f12-products">
      <h2 class="f12-h">✧ TRANSLUCENT SELECTION</h2>
      <div class="f12-products__grid">
        <RouterLink v-for="p in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f12-glass f12-item">
          <div class="f12-item__img"><img :src="p.image" :alt="p.name" /></div>
          <h3>{{ p.name }}</h3>
          <p>₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f12-end f12-glass">
      <h2>The future is clear.</h2>
      <p>FORME · 2026 → beyond</p>
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
  { id: 1, title: "Beanpole", since: "Seoul · 1989",        route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Carhartt", since: "Detroit · 1889",      route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "Levi's",   since: "San Francisco · 1873", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "Dickies",  since: "Fort Worth · 1922",   route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f12-home {
  background: #0a0a2e;
  color: #f0f0ff;
  font-family: var(--font-body);
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
}
.f12-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.f12-orb {
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.6;
}
.f12-orb--1 { background: #667eea; top: -10%; left: -5%; }
.f12-orb--2 { background: #f093fb; top: 30%; right: -10%; }
.f12-orb--3 { background: #4facfe; bottom: -10%; left: 30%; }

.f12-glass {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.f12-hero {
  position: relative;
  z-index: 1;
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.f12-hero__card {
  padding: 4rem 3rem;
  max-width: 40rem;
  text-align: center;
}
.f12-hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: #a0a0ff;
  margin-bottom: 2rem;
}
.f12-hero__title {
  font-family: "Italiana", serif;
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 400;
  line-height: 0.95;
  letter-spacing: 0.02em;
  background: linear-gradient(135deg, #fff 0%, #a0a0ff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
}
.f12-hero__desc {
  font-size: 1rem;
  line-height: 1.8;
  color: #d0d0ff;
  margin-bottom: 2.5rem;
}
.f12-btn {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.4);
  border-radius: 999px;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: background 0.3s;
}
.f12-btn:hover { background: rgba(255,255,255,0.25); }

.f12-h {
  position: relative;
  z-index: 1;
  text-align: center;
  font-family: "Italiana", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  padding: 6rem 2rem 3rem;
  color: #fff;
}

.f12-brands, .f12-products { position: relative; z-index: 1; padding: 0 3rem 6rem; }
.f12-brands__grid, .f12-products__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f12-brands__grid, .f12-products__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f12-brands__grid { grid-template-columns: repeat(4, 1fr); } .f12-products__grid { grid-template-columns: repeat(3, 1fr); } }

.f12-brand {
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.4s, box-shadow 0.4s;
  color: inherit;
}
.f12-brand:hover { transform: translateY(-6px); box-shadow: 0 16px 48px rgba(0,0,0,0.4); }
.f12-brand img {
  width: 100%;
  aspect-ratio: 3/4;
  object-fit: cover;
  border-radius: 20px 20px 0 0;
}
.f12-brand__info { padding: 1.25rem 1.5rem 1.5rem; }
.f12-brand__info h3 { font-family: "Italiana", serif; font-size: 1.375rem; margin-bottom: 0.25rem; }
.f12-brand__info p { font-size: 0.75rem; color: #a0a0ff; letter-spacing: 0.1em; }

.f12-item {
  padding: 1.5rem;
  cursor: pointer;
  color: inherit;
  transition: transform 0.3s;
}
.f12-item:hover { transform: translateY(-4px); }
.f12-item__img {
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,0.05);
  margin-bottom: 1rem;
}
.f12-item__img img { width: 100%; height: 100%; object-fit: cover; }
.f12-item h3 { font-size: 0.9375rem; margin-bottom: 0.5rem; }
.f12-item p { font-size: 0.875rem; color: #a0a0ff; font-weight: 600; }

.f12-end {
  position: relative;
  z-index: 1;
  max-width: 44rem;
  margin: 6rem auto;
  padding: 5rem 3rem;
  text-align: center;
}
.f12-end h2 {
  font-family: "Italiana", serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}
.f12-end p { font-size: 0.75rem; letter-spacing: 0.3em; color: #a0a0ff; }
</style>
