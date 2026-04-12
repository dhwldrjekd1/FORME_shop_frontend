<template>
  <main class="page-wrapper f04-home">
    <section class="f04-hero">
      <div class="f04-hero__text">
        <p class="f04-hero__no">N° 01 / SPRING 2026</p>
        <h1 class="f04-hero__title">FORME</h1>
        <p class="f04-hero__desc">
          A considered selection of objects,<br />
          crafted with patience and intent.
        </p>
      </div>
    </section>

    <section class="f04-intro">
      <div class="f04-intro__inner">
        <p class="f04-intro__eyebrow">— INTRODUCTION</p>
        <p class="f04-intro__text">
          FORME is an atelier of carefully chosen garments. We believe in objects
          that are made to last — considered in form, honest in material,
          quiet in gesture. Our selection is a slow study of heritage
          reframed for the present.
        </p>
      </div>
    </section>

    <section class="f04-brands">
      <div class="f04-brands__grid">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f04-brand"
        >
          <span class="f04-brand__no">N° {{ String(i + 1).padStart(2, '0') }}</span>
          <div class="f04-brand__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
          <p class="f04-brand__title">{{ b.title }}</p>
          <p class="f04-brand__desc">{{ b.desc }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f04-selection">
      <p class="f04-selection__eyebrow">— CURRENT SELECTION</p>
      <h2 class="f04-selection__title">Objects</h2>
      <div class="f04-selection__grid">
        <RouterLink
          v-for="p in products.slice(0, 6)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f04-obj"
        >
          <div class="f04-obj__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <p class="f04-obj__name">{{ p.name }}</p>
          <p class="f04-obj__meta">{{ getBrandName(p.id) }} · {{ fmt(p.price) }}₩</p>
        </RouterLink>
      </div>
    </section>

    <section class="f04-closing">
      <p class="f04-closing__text">
        "The best objects are those we forget we own —<br />
        until we reach for them again."
      </p>
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
const brandPanels = [
  { id: 1, title: "Beanpole", desc: "Seoul, 1989.",          route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Levi's",   desc: "San Francisco, 1873.",  route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "Dickies",  desc: "Fort Worth, 1922.",     route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "Carhartt", desc: "Detroit, 1889.",        route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 04 — Gallery (Aesop/Celine) */
.f04-home {
  background: #f4f2ed;
  color: #1a1a1a;
  font-family: var(--font-body);
}
.f04-hero {
  height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-hero__text { text-align: center; max-width: 42rem; }
.f04-hero__no {
  font-size: 0.6875rem;
  letter-spacing: 0.4em;
  margin-bottom: 4rem;
  color: #6b6b6b;
}
.f04-hero__title {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(5rem, 13vw, 11rem);
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 0.9;
  margin-bottom: 3rem;
}
.f04-hero__desc {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1.125rem;
  line-height: 1.8;
  color: #4a4a4a;
}

.f04-intro {
  padding: 12rem 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-intro__inner { max-width: 40rem; margin: 0 auto; text-align: center; }
.f04-intro__eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.35em;
  color: #6b6b6b;
  margin-bottom: 2.5rem;
}
.f04-intro__text {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  line-height: 2;
  font-weight: 300;
  color: #1a1a1a;
}

.f04-brands {
  padding: 12rem 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 8rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f04-brands__grid { grid-template-columns: 1fr 1fr; } }
.f04-brand { display: block; cursor: pointer; text-align: center; }
.f04-brand__no {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #6b6b6b;
  display: block;
  margin-bottom: 2rem;
}
.f04-brand__img-wrap {
  aspect-ratio: 4/5;
  overflow: hidden;
  background: #e8e5df;
  margin-bottom: 2rem;
}
.f04-brand__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(0.5) brightness(0.95);
  transition: filter 1s, transform 1.2s;
}
.f04-brand:hover .f04-brand__img-wrap img {
  filter: grayscale(0); transform: scale(1.02);
}
.f04-brand__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 300;
  letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}
.f04-brand__desc {
  font-size: 0.8125rem;
  font-style: italic;
  color: #6b6b6b;
}

.f04-selection { padding: 12rem 4rem; text-align: center; }
.f04-selection__eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.35em;
  color: #6b6b6b;
  margin-bottom: 1.5rem;
}
.f04-selection__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.02em;
  margin-bottom: 5rem;
}
.f04-selection__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f04-selection__grid { grid-template-columns: repeat(3, 1fr); } }
.f04-obj { display: block; cursor: pointer; }
.f04-obj__img-wrap {
  aspect-ratio: 1/1;
  background: #ffffff;
  padding: 3rem;
  margin-bottom: 1.5rem;
}
.f04-obj__img-wrap img {
  width: 100%; height: 100%;
  object-fit: contain;
  transition: transform 0.8s;
}
.f04-obj:hover .f04-obj__img-wrap img { transform: scale(1.04); }
.f04-obj__name {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 300;
  margin-bottom: 0.5rem;
}
.f04-obj__meta {
  font-size: 0.75rem;
  font-style: italic;
  color: #6b6b6b;
}

.f04-closing {
  padding: 10rem 4rem;
  text-align: center;
  border-top: 0.5px solid rgba(0,0,0,0.12);
}
.f04-closing__text {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: clamp(1.25rem, 2.5vw, 1.625rem);
  font-weight: 300;
  line-height: 1.8;
  color: #4a4a4a;
  max-width: 48rem;
  margin: 0 auto;
}
</style>
