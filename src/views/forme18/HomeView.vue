<template>
  <main class="page-wrapper f18-home">
    <section class="f18-hero">
      <div class="f18-hero__sun"></div>
      <div class="f18-hero__grid"></div>
      <div class="f18-hero__content">
        <p class="f18-hero__tag">ＡＥＳＴＨＥＴＩＣ · 2 6</p>
        <h1 class="f18-hero__title">Ｆ Ｏ Ｒ Ｍ Ｅ</h1>
        <p class="f18-hero__sub">나의 옷장은 미래의 과거</p>
        <RouterLink to="/products" class="f18-cta">▷ Ｐｌａｙ</RouterLink>
      </div>
    </section>

    <section class="f18-brands">
      <h2 class="f18-h">Ｃｈａｎｎｅｌ Ｓｅｌｅｃｔ</h2>
      <div class="f18-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f18-brand">
          <div class="f18-brand__static"></div>
          <div class="f18-brand__img"><img :src="b.image" :alt="b.title" /></div>
          <div class="f18-brand__label">
            <span>CH. 0{{i+1}}</span>
            <h3>{{ b.title }}</h3>
            <span>{{ b.year }}</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="f18-products">
      <h2 class="f18-h">Ｉｎｖｅｎｔｏｒｙ</h2>
      <div class="f18-products__grid">
        <RouterLink v-for="p in products.slice(0,4)" :key="p.id" :to="`/products/${p.id}`" class="f18-item">
          <div class="f18-item__img"><img :src="p.image" :alt="p.name" /></div>
          <h3>{{ p.name }}</h3>
          <p>¥ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f18-end">
      <p>現 代 の 夢</p>
      <span>// dreams of the modern day //</span>
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
.f18-home {
  background: linear-gradient(180deg, #2e0854 0%, #ff006e 50%, #ff9a56 100%);
  color: #fff;
  font-family: "Space Mono", monospace;
  min-height: 100dvh;
}
.f18-hero {
  position: relative;
  min-height: calc(100dvh - var(--header-height));
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.f18-hero__sun {
  position: absolute;
  bottom: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 40vh;
  height: 40vh;
  background: radial-gradient(circle, #ffcc00 0%, #ff006e 80%);
  border-radius: 50%;
  filter: blur(2px);
}
.f18-hero__sun::before {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent 0 10px, rgba(46, 8, 84, 0.4) 10px 12px);
}
.f18-hero__grid {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45%;
  background:
    linear-gradient(rgba(255, 0, 255, 0.6) 2px, transparent 2px),
    linear-gradient(90deg, rgba(255, 0, 255, 0.6) 2px, transparent 2px);
  background-size: 80px 80px;
  transform: perspective(500px) rotateX(70deg);
  transform-origin: center top;
  mask-image: linear-gradient(to top, black 0%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 0%, transparent 100%);
}
.f18-hero__content {
  position: relative;
  z-index: 2;
  text-align: center;
}
.f18-hero__tag {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: #00ffff;
  margin-bottom: 2rem;
  text-shadow: 0 0 12px #00ffff;
}
.f18-hero__title {
  font-size: clamp(4rem, 10vw, 8rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: 0.05em;
  color: #fff;
  text-shadow:
    3px 3px 0 #ff006e,
    6px 6px 0 #00ffff,
    9px 9px 0 rgba(255, 0, 255, 0.5);
  margin-bottom: 1.5rem;
}
.f18-hero__sub {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 2.5rem;
  text-shadow: 0 2px 0 #ff006e;
}
.f18-cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #fff;
  color: #2e0854;
  border: 3px solid #2e0854;
  box-shadow: 6px 6px 0 #ff006e, 6px 6px 0 3px #2e0854;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  transition: transform 0.2s;
}
.f18-cta:hover { transform: translate(-3px, -3px); }

.f18-h {
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  padding: 5rem 2rem 3rem;
  color: #fff;
  text-shadow: 3px 3px 0 #ff006e, 5px 5px 0 rgba(0,255,255,0.7);
  letter-spacing: 0.1em;
}

.f18-brands__grid, .f18-products__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 0 3rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f18-brands__grid, .f18-products__grid { grid-template-columns: 1fr 1fr; } }

.f18-brand {
  position: relative;
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  border: 2px solid #00ffff;
  padding: 1.5rem;
  color: inherit;
  overflow: hidden;
}
.f18-brand:hover { border-color: #fff; box-shadow: 0 0 24px #ff00ff; }
.f18-brand__static {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,0.03) 2px 3px);
  pointer-events: none;
}
.f18-brand__img {
  aspect-ratio: 16/9;
  overflow: hidden;
  border: 1px solid #00ffff;
  margin-bottom: 1rem;
}
.f18-brand__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: hue-rotate(320deg) saturate(1.3) contrast(1.1);
}
.f18-brand__label {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.f18-brand__label span { font-size: 0.75rem; color: #00ffff; letter-spacing: 0.15em; }
.f18-brand__label h3 { font-size: 1.375rem; font-weight: 700; color: #fff; text-shadow: 2px 2px 0 #ff006e; }

.f18-item {
  background: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(8px);
  border: 2px solid #ff00ff;
  padding: 1rem;
  color: inherit;
}
.f18-item__img {
  aspect-ratio: 1/1;
  background: rgba(255,255,255,0.1);
  margin-bottom: 1rem;
  overflow: hidden;
}
.f18-item__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: hue-rotate(300deg) saturate(1.2);
}
.f18-item h3 { font-size: 0.875rem; color: #fff; margin-bottom: 0.375rem; }
.f18-item p { font-size: 0.875rem; color: #00ffff; font-weight: 700; }

.f18-end {
  padding: 10rem 3rem;
  text-align: center;
  background: rgba(0, 0, 0, 0.3);
  border-top: 2px solid #00ffff;
}
.f18-end p {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 300;
  color: #fff;
  letter-spacing: 0.2em;
  text-shadow: 4px 4px 0 #ff006e, 8px 8px 0 rgba(0,255,255,0.6);
  margin-bottom: 1rem;
}
.f18-end span { font-size: 0.875rem; color: #00ffff; letter-spacing: 0.2em; }
</style>
