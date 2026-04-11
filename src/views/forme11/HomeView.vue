<template>
  <main class="page-wrapper f11-home">
    <section class="f11-hero">
      <div class="f11-hero__row f11-hero__row--top">
        <span>FORME — NEO BRUTALIST EDITION</span>
        <span>N° 11 / 20</span>
      </div>
      <h1 class="f11-hero__title">FORME<br /><span>BRUTAL.</span></h1>
      <div class="f11-hero__row f11-hero__row--bot">
        <p>무미건조하게. 솔직하게. 날 것 그대로.</p>
        <RouterLink to="/products" class="f11-hero__cta">SEE →</RouterLink>
      </div>
    </section>

    <section class="f11-brands">
      <h2 class="f11-h">■ THE BRANDS</h2>
      <div class="f11-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f11-brand">
          <div class="f11-brand__num">[ 0{{i+1}} ]</div>
          <h3>{{ b.title }}</h3>
          <p>{{ b.year }}</p>
          <img :src="b.image" :alt="b.title" />
        </RouterLink>
      </div>
    </section>

    <section class="f11-products">
      <h2 class="f11-h">■ OBJECTS</h2>
      <div class="f11-products__grid">
        <RouterLink v-for="p in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f11-item">
          <div class="f11-item__img"><img :src="p.image" :alt="p.name" /></div>
          <div class="f11-item__info">
            <span class="f11-item__id">#{{ p.id }}</span>
            <h3>{{ p.name }}</h3>
            <p class="f11-item__price">{{ fmt(p.price) }}₩</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <section class="f11-end">
      <p>BUILT NOT BORN.</p>
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
.f11-home {
  background: #FFE500;
  color: #000;
  font-family: "Archivo Black", "Arial Black", sans-serif;
  min-height: 100dvh;
}
.f11-hero {
  padding: 3rem;
  border-bottom: 8px solid #000;
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.f11-hero__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  font-weight: 900;
  letter-spacing: 0.05em;
  padding: 1rem 0;
  border-bottom: 4px solid #000;
}
.f11-hero__row--bot { border-bottom: none; border-top: 4px solid #000; }
.f11-hero__title {
  font-size: clamp(6rem, 18vw, 16rem);
  font-weight: 900;
  line-height: 0.8;
  letter-spacing: -0.06em;
  padding: 3rem 0;
}
.f11-hero__title span {
  -webkit-text-stroke: 4px #000;
  color: #FFE500;
}
.f11-hero__cta {
  background: #000;
  color: #FFE500;
  padding: 1rem 2rem;
  font-size: 1rem;
  border: 4px solid #000;
}
.f11-hero__cta:hover { background: #FFE500; color: #000; }

.f11-h {
  font-size: clamp(2rem, 4vw, 3rem);
  padding: 2rem 3rem;
  border-bottom: 4px solid #000;
}
.f11-brands { border-bottom: 8px solid #000; }
.f11-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
@media (min-width: 640px) { .f11-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f11-brands__grid { grid-template-columns: repeat(4, 1fr); } }
.f11-brand {
  position: relative;
  padding: 2rem;
  border: 4px solid #000;
  margin: -2px;
  background: #fff;
  color: #000;
  aspect-ratio: 3/4;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  cursor: pointer;
}
.f11-brand:hover { background: #FFE500; }
.f11-brand__num { font-size: 0.875rem; font-weight: 900; }
.f11-brand h3 { font-size: 1.75rem; margin-top: 1rem; }
.f11-brand p { font-size: 0.875rem; margin-top: 0.25rem; }
.f11-brand img {
  position: absolute;
  bottom: -10%;
  right: -10%;
  width: 100%;
  height: 60%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.3);
}

.f11-products { border-bottom: 8px solid #000; background: #fff; }
.f11-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
@media (min-width: 768px) { .f11-products__grid { grid-template-columns: repeat(3, 1fr); } }
.f11-item {
  padding: 1.5rem;
  border: 4px solid #000;
  margin: -2px;
  background: #fff;
  color: #000;
  cursor: pointer;
}
.f11-item:hover { background: #FFE500; }
.f11-item__img {
  aspect-ratio: 1/1;
  background: #FFE500;
  border: 4px solid #000;
  overflow: hidden;
  margin-bottom: 1rem;
}
.f11-item__img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1); }
.f11-item__id { font-size: 0.75rem; }
.f11-item h3 { font-size: 0.9375rem; margin: 0.5rem 0; line-height: 1.3; }
.f11-item__price { font-size: 1.125rem; }

.f11-end {
  padding: 8rem 3rem;
  text-align: center;
  background: #000;
  color: #FFE500;
}
.f11-end p {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.9;
}
</style>
