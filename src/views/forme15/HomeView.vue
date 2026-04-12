<template>
  <main class="page-wrapper f15-home">
    <section class="f15-hero">
      <div class="f15-hero__frame">
        <div class="f15-hero__ornament f15-hero__ornament--top"></div>
        <p class="f15-hero__eyebrow">A · D · MMXXVI</p>
        <h1 class="f15-hero__title">FORME</h1>
        <div class="f15-hero__divider">
          <span></span><span class="f15-hero__diamond">◆</span><span></span>
        </div>
        <p class="f15-hero__sub">THE GRAND SELECTION</p>
        <p class="f15-hero__desc">
          An edifice of style<br />
          built in gold and geometry.
        </p>
        <RouterLink to="/products" class="f15-cta">ENTER ATELIER</RouterLink>
        <div class="f15-hero__ornament f15-hero__ornament--bot"></div>
      </div>
    </section>

    <section class="f15-brands">
      <div class="f15-section__head">
        <span class="f15-line"></span>
        <h2>THE FOUR HOUSES</h2>
        <span class="f15-line"></span>
      </div>
      <div class="f15-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f15-brand">
          <div class="f15-brand__frame">
            <img :src="b.image" :alt="b.title" />
          </div>
          <div class="f15-brand__no">N° {{ String(i+1).padStart(2,'0') }}</div>
          <h3>{{ b.title }}</h3>
          <p>{{ b.year }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f15-products">
      <div class="f15-section__head">
        <span class="f15-line"></span>
        <h2>PRIVATE COLLECTION</h2>
        <span class="f15-line"></span>
      </div>
      <div class="f15-products__grid">
        <RouterLink v-for="p in products.slice(0,4)" :key="p.id" :to="`/products/${p.id}`" class="f15-item">
          <div class="f15-item__frame"><img :src="p.image" :alt="p.name" /></div>
          <h3>{{ p.name }}</h3>
          <p>₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f15-sunburst">
      <div class="f15-sunburst__inner">
        <p>FORME</p>
        <p class="f15-sunburst__sub">EST. MMXXVI</p>
      </div>
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
  { id: 1, title: "BEANPOLE", year: "MCMLXXXIX",  route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "CARHARTT", year: "MDCCCLXXXIX", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "LEVI'S",   year: "MDCCCLXXIII", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "DICKIES",  year: "MCMXXII",     route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f15-home {
  background: #0f1a3a;
  color: #e8c96a;
  font-family: "Cinzel", serif;
  min-height: 100dvh;
  background-image:
    repeating-linear-gradient(45deg, rgba(232, 201, 106, 0.03) 0 2px, transparent 2px 40px),
    repeating-linear-gradient(-45deg, rgba(232, 201, 106, 0.03) 0 2px, transparent 2px 40px);
}
.f15-hero {
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem;
}
.f15-hero__frame {
  text-align: center;
  max-width: 44rem;
  padding: 5rem 3rem;
  border: 2px solid #e8c96a;
  position: relative;
}
.f15-hero__frame::before, .f15-hero__frame::after {
  content: "◆";
  position: absolute;
  font-size: 1.25rem;
  color: #e8c96a;
}
.f15-hero__frame::before { top: -0.75rem; left: 50%; transform: translateX(-50%); background: #0f1a3a; padding: 0 1rem; }
.f15-hero__frame::after  { bottom: -0.75rem; left: 50%; transform: translateX(-50%); background: #0f1a3a; padding: 0 1rem; }
.f15-hero__ornament {
  height: 20px;
  background:
    linear-gradient(90deg, transparent 0%, #e8c96a 20%, transparent 21%, transparent 79%, #e8c96a 80%, transparent 100%),
    radial-gradient(circle at 50%, #e8c96a 4px, transparent 5px);
  margin-bottom: 2rem;
}
.f15-hero__ornament--bot { margin-top: 2rem; margin-bottom: 0; }
.f15-hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 400;
  letter-spacing: 0.4em;
  color: #e8c96a;
  margin-bottom: 2rem;
}
.f15-hero__title {
  font-size: clamp(4rem, 11vw, 9rem);
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 0.95;
  margin-bottom: 1.5rem;
}
.f15-hero__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.f15-hero__divider span { flex: 1; height: 1px; background: #e8c96a; max-width: 4rem; }
.f15-hero__diamond { flex: none; font-size: 0.75rem; }
.f15-hero__sub {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  margin-bottom: 2rem;
  color: #c9a84a;
}
.f15-hero__desc {
  font-style: italic;
  font-family: "Bodoni Moda", serif;
  font-size: 1.125rem;
  color: #c9a84a;
  margin-bottom: 2.5rem;
  line-height: 1.8;
}
.f15-cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 2px solid #e8c96a;
  color: #e8c96a;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  transition: background 0.4s, color 0.4s;
}
.f15-cta:hover { background: #e8c96a; color: #0f1a3a; }

.f15-section__head {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 5rem 3rem 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.f15-line { flex: 1; height: 1px; background: #e8c96a; max-width: 8rem; }
.f15-section__head h2 {
  font-size: clamp(1.5rem, 3vw, 2.25rem);
  font-weight: 600;
  letter-spacing: 0.15em;
}

.f15-brands__grid, .f15-products__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 0 3rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f15-brands__grid { grid-template-columns: 1fr 1fr; } .f15-products__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f15-brands__grid { grid-template-columns: repeat(4, 1fr); } .f15-products__grid { grid-template-columns: repeat(4, 1fr); } }

.f15-brand, .f15-item {
  text-align: center;
  color: inherit;
}
.f15-brand__frame, .f15-item__frame {
  aspect-ratio: 3/4;
  padding: 0.75rem;
  border: 1px solid #e8c96a;
  margin-bottom: 1.25rem;
  transition: border-color 0.3s;
}
.f15-brand:hover .f15-brand__frame, .f15-item:hover .f15-item__frame { border-color: #fff; }
.f15-brand__frame img, .f15-item__frame img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(0.95) brightness(0.9);
}
.f15-item__frame { aspect-ratio: 1/1; padding: 1.5rem; }
.f15-item__frame img { object-fit: contain; }
.f15-brand__no, .f15-item h3 + p, .f15-item h3 ~ p {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  color: #c9a84a;
}
.f15-brand h3, .f15-item h3 {
  font-size: 1.125rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  margin: 0.375rem 0;
}

.f15-sunburst {
  padding: 8rem 3rem;
  background: radial-gradient(ellipse at center, #1a2850 0%, #0f1a3a 70%);
  position: relative;
  text-align: center;
  border-top: 2px solid #e8c96a;
}
.f15-sunburst::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    conic-gradient(from 0deg at 50% 100%, transparent 0deg, rgba(232,201,106,0.15) 2deg, transparent 4deg, transparent 20deg, rgba(232,201,106,0.15) 22deg, transparent 24deg, transparent 40deg, rgba(232,201,106,0.15) 42deg, transparent 44deg, transparent 60deg, rgba(232,201,106,0.15) 62deg, transparent 64deg, transparent 80deg, rgba(232,201,106,0.15) 82deg, transparent 84deg, transparent 100deg, rgba(232,201,106,0.15) 102deg, transparent 104deg, transparent 180deg);
}
.f15-sunburst__inner { position: relative; z-index: 1; }
.f15-sunburst__inner p:first-child {
  font-size: clamp(4rem, 10vw, 8rem);
  letter-spacing: 0.1em;
  line-height: 1;
  color: #e8c96a;
}
.f15-sunburst__sub {
  font-size: 0.75rem;
  letter-spacing: 0.4em;
  color: #c9a84a;
  margin-top: 1rem;
}
</style>
