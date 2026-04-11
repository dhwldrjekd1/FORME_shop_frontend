<template>
  <main class="page-wrapper f17-home">
    <section class="f17-hero">
      <div class="f17-hero__text">
        <p class="f17-hero__eyebrow">· Hygge Collection · 2026 ·</p>
        <h1 class="f17-hero__title">FORME</h1>
        <p class="f17-hero__tag">— the quiet wardrobe —</p>
        <p class="f17-hero__desc">
          북유럽의 정서를 담은 느린 옷장.<br />
          빛과 결이 머무는 공간을 위한 셀렉션.
        </p>
        <RouterLink to="/products" class="f17-cta">
          Discover →
        </RouterLink>
      </div>
      <div class="f17-hero__img">
        <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" alt="hero" />
      </div>
    </section>

    <section class="f17-brands">
      <p class="f17-section__eyebrow">— 01 / HOUSES</p>
      <h2 class="f17-section__title">Four brands, gently curated.</h2>
      <div class="f17-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f17-brand">
          <div class="f17-brand__img"><img :src="b.image" :alt="b.title" /></div>
          <p class="f17-brand__no">0{{ i+1 }}</p>
          <h3>{{ b.title }}</h3>
          <p class="f17-brand__since">{{ b.since }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f17-quote">
      <p>"덜 가진 것이<br />더 깊은 만족이 된다."</p>
      <span>— A Nordic wisdom</span>
    </section>

    <section class="f17-products">
      <p class="f17-section__eyebrow">— 02 / SELECTION</p>
      <h2 class="f17-section__title">This week's picks.</h2>
      <div class="f17-products__grid">
        <RouterLink v-for="p in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f17-item">
          <div class="f17-item__img"><img :src="p.image" :alt="p.name" /></div>
          <h3>{{ p.name }}</h3>
          <p>₩ {{ fmt(p.price) }}</p>
        </RouterLink>
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
  { id: 1, title: "Beanpole", since: "Seoul · 1989",         route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Carhartt", since: "Detroit · 1889",       route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "Levi's",   since: "San Francisco · 1873", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "Dickies",  since: "Fort Worth · 1922",    route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f17-home {
  background: #f4ede4;
  color: #3a3530;
  font-family: var(--font-body);
  min-height: 100dvh;
}
.f17-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100dvh - var(--header-height));
  background: #f4ede4;
}
@media (min-width: 1024px) { .f17-hero { grid-template-columns: 1fr 1fr; gap: 0; } }

.f17-hero__text {
  padding: 6rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f17-hero__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #a08060;
  margin-bottom: 2rem;
}
.f17-hero__title {
  font-family: "Fraunces", serif;
  font-size: clamp(4rem, 10vw, 7.5rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 0.95;
  color: #3a3530;
  margin-bottom: 1rem;
}
.f17-hero__tag {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 1.125rem;
  color: #8a7560;
  margin-bottom: 2rem;
}
.f17-hero__desc {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #6b5f50;
  margin-bottom: 3rem;
  max-width: 28rem;
}
.f17-cta {
  display: inline-block;
  padding: 1.125rem 2.25rem;
  background: #3a3530;
  color: #f4ede4;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  width: fit-content;
}
.f17-cta:hover { background: #5c4a30; }

.f17-hero__img {
  overflow: hidden;
  padding: 2rem;
}
.f17-hero__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  border-radius: 24px;
  filter: brightness(1.02) saturate(0.85);
}

.f17-section__eyebrow {
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #a08060;
  margin-bottom: 1rem;
  text-align: center;
}
.f17-section__title {
  text-align: center;
  font-family: "Fraunces", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  color: #3a3530;
  margin-bottom: 4rem;
}

.f17-brands { padding: 7rem 3rem; }
.f17-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f17-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f17-brands__grid { grid-template-columns: repeat(4, 1fr); } }
.f17-brand {
  text-align: center;
  color: inherit;
  cursor: pointer;
}
.f17-brand__img {
  aspect-ratio: 3/4;
  background: #e8ddd0;
  border-radius: 20px;
  overflow: hidden;
  margin-bottom: 1.25rem;
}
.f17-brand__img img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: brightness(1.02) saturate(0.8);
  transition: transform 0.7s;
}
.f17-brand:hover .f17-brand__img img { transform: scale(1.04); }
.f17-brand__no { font-size: 0.6875rem; letter-spacing: 0.25em; color: #a08060; margin-bottom: 0.5rem; }
.f17-brand h3 { font-family: "Fraunces", serif; font-size: 1.375rem; font-weight: 400; margin-bottom: 0.375rem; }
.f17-brand__since { font-size: 0.75rem; color: #8a7560; font-style: italic; }

.f17-quote {
  background: #e8ddd0;
  padding: 8rem 3rem;
  text-align: center;
}
.f17-quote p {
  font-family: "Fraunces", serif;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  line-height: 1.3;
  color: #3a3530;
  margin-bottom: 2rem;
}
.f17-quote span { font-size: 0.8125rem; letter-spacing: 0.2em; color: #8a7560; }

.f17-products { padding: 7rem 3rem; }
.f17-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f17-products__grid { grid-template-columns: repeat(3, 1fr); } }
.f17-item { color: inherit; cursor: pointer; }
.f17-item__img {
  aspect-ratio: 1/1;
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 1rem;
  box-shadow: 0 6px 24px rgba(90, 70, 50, 0.06);
}
.f17-item__img img { width: 100%; height: 100%; object-fit: contain; }
.f17-item h3 { font-family: "Fraunces", serif; font-size: 1rem; font-weight: 400; margin-bottom: 0.375rem; }
.f17-item p { font-size: 0.875rem; color: #8a7560; }
</style>
