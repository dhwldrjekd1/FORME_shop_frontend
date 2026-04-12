<template>
  <main class="page-wrapper f16-home">
    <div class="f16-scan"></div>
    <section class="f16-hero">
      <div class="f16-hero__grid-bg"></div>
      <div class="f16-hero__content">
        <p class="f16-hero__code">&gt; SYS.BOOT :: FORME.EXE :: 2026.04</p>
        <h1 class="f16-hero__title" data-text="FORME">FORME</h1>
        <p class="f16-hero__sub">/ NEURAL · WARDROBE · INTERFACE /</p>
        <p class="f16-hero__desc">
          Jack into the style matrix.<br />
          Neon-soaked futures await.
        </p>
        <RouterLink to="/products" class="f16-cta">
          [ ENTER GRID ]
        </RouterLink>
      </div>
    </section>

    <section class="f16-brands">
      <div class="f16-h-bar">
        <span>[ 01 ] NODES</span>
        <span>◢ ONLINE ◣</span>
      </div>
      <div class="f16-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f16-brand">
          <div class="f16-brand__frame">
            <img :src="b.image" :alt="b.title" />
            <div class="f16-brand__scan"></div>
          </div>
          <div class="f16-brand__info">
            <span>NODE.0{{i+1}}</span>
            <h3>{{ b.title }}</h3>
            <p>{{ b.year }} / ACTIVE</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="f16-products">
      <div class="f16-h-bar">
        <span>[ 02 ] INVENTORY</span>
        <span>◢ SYNC ◣</span>
      </div>
      <div class="f16-products__grid">
        <RouterLink v-for="(p,i) in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f16-item">
          <div class="f16-item__img"><img :src="p.image" :alt="p.name" /></div>
          <div class="f16-item__lines">
            <p class="f16-item__id">ID::{{ String(p.id).padStart(4,'0') }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f16-item__price">₩{{ fmt(p.price) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="f16-end">
      <h2 data-text="WAKE UP.">WAKE UP.</h2>
      <p>The future is already wearing you.</p>
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
  { id: 1, title: "BEANPOLE", year: "1989", route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "CARHARTT", year: "1889", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "LEVI'S",   year: "1873", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "DICKIES",  year: "1922", route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f16-home {
  background: #05010f;
  color: #e0e0ff;
  font-family: "Space Mono", monospace;
  min-height: 100dvh;
  position: relative;
}
.f16-scan {
  position: fixed;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 3px);
  z-index: 100;
}

.f16-hero {
  position: relative;
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  overflow: hidden;
}
.f16-hero__grid-bg {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(rgba(255,0,255,0.15) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.15) 1px, transparent 1px);
  background-size: 60px 60px;
  transform: perspective(500px) rotateX(60deg) translateY(100px);
  mask-image: linear-gradient(to top, black 0%, transparent 70%);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 70%);
}
.f16-hero__content {
  position: relative;
  text-align: center;
  max-width: 46rem;
}
.f16-hero__code {
  font-size: 0.75rem;
  color: #00ffcc;
  letter-spacing: 0.1em;
  margin-bottom: 2rem;
}
.f16-hero__title {
  font-size: clamp(5rem, 14vw, 12rem);
  font-weight: 700;
  line-height: 0.9;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow:
    0 0 20px #ff00ff,
    0 0 40px #ff00ff,
    0 0 80px rgba(255, 0, 255, 0.5);
  position: relative;
  margin-bottom: 1rem;
}
.f16-hero__title::before, .f16-hero__title::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  mix-blend-mode: screen;
}
.f16-hero__title::before { color: #00ffff; transform: translate(2px, 0); }
.f16-hero__title::after { color: #ff00ff; transform: translate(-2px, 0); }
.f16-hero__sub {
  font-size: 0.875rem;
  letter-spacing: 0.15em;
  color: #00ffcc;
  margin-bottom: 1.5rem;
}
.f16-hero__desc {
  font-size: 0.875rem;
  line-height: 1.8;
  color: #a0a0ff;
  margin-bottom: 2.5rem;
}
.f16-cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid #ff00ff;
  color: #ff00ff;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  box-shadow: 0 0 16px rgba(255, 0, 255, 0.4), inset 0 0 16px rgba(255, 0, 255, 0.1);
  transition: all 0.2s;
}
.f16-cta:hover {
  background: #ff00ff;
  color: #05010f;
  box-shadow: 0 0 32px rgba(255, 0, 255, 0.8);
}

.f16-h-bar {
  display: flex;
  justify-content: space-between;
  padding: 1rem 3rem;
  border-top: 1px solid #00ffff;
  border-bottom: 1px solid #00ffff;
  background: rgba(0, 255, 255, 0.05);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #00ffff;
  margin-bottom: 3rem;
}

.f16-brands, .f16-products { padding: 5rem 0; }
.f16-brands__grid, .f16-products__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 0 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f16-brands__grid, .f16-products__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f16-brands__grid { grid-template-columns: repeat(4, 1fr); } .f16-products__grid { grid-template-columns: repeat(3, 1fr); } }

.f16-brand {
  background: rgba(255, 0, 255, 0.03);
  border: 1px solid rgba(255, 0, 255, 0.3);
  padding: 1rem;
  color: inherit;
  transition: all 0.3s;
}
.f16-brand:hover {
  border-color: #ff00ff;
  box-shadow: 0 0 24px rgba(255, 0, 255, 0.4);
}
.f16-brand__frame {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 1rem;
}
.f16-brand__frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(0.5) contrast(1.1) hue-rotate(180deg);
}
.f16-brand__scan {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 0%, rgba(0,255,255,0.2) 50%, transparent 100%);
  height: 30%;
  animation: f16-scanline 3s infinite linear;
}
@keyframes f16-scanline { 0% { top: -30%; } 100% { top: 100%; } }
.f16-brand__info span { font-size: 0.625rem; color: #00ffcc; letter-spacing: 0.15em; }
.f16-brand__info h3 { font-size: 1.125rem; font-weight: 700; margin: 0.375rem 0; color: #fff; }
.f16-brand__info p { font-size: 0.625rem; color: #ff00ff; letter-spacing: 0.1em; }

.f16-item {
  background: rgba(0, 255, 255, 0.03);
  border: 1px solid rgba(0, 255, 255, 0.2);
  padding: 1rem;
  color: inherit;
  transition: all 0.3s;
}
.f16-item:hover { border-color: #00ffff; box-shadow: 0 0 16px rgba(0, 255, 255, 0.3); }
.f16-item__img {
  aspect-ratio: 1/1;
  background: #0a0820;
  margin-bottom: 1rem;
  overflow: hidden;
}
.f16-item__img img { width: 100%; height: 100%; object-fit: cover; filter: hue-rotate(180deg) saturate(1.2); }
.f16-item__id { font-size: 0.625rem; color: #00ffcc; letter-spacing: 0.1em; }
.f16-item h3 { font-size: 0.8125rem; font-weight: 700; color: #fff; margin: 0.5rem 0; line-height: 1.3; }
.f16-item__price { font-size: 0.9375rem; color: #ff00ff; font-weight: 700; }

.f16-end {
  padding: 10rem 3rem;
  text-align: center;
  background: radial-gradient(ellipse at center, rgba(255, 0, 255, 0.1), transparent);
  border-top: 1px solid #ff00ff;
}
.f16-end h2 {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #fff;
  text-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff;
  position: relative;
  margin-bottom: 1rem;
}
.f16-end p { font-size: 0.875rem; color: #a0a0ff; letter-spacing: 0.15em; }
</style>
