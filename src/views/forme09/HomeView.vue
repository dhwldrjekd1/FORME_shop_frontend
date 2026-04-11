<template>
  <main class="page-wrapper f09-home">
    <!-- Hero: 골드 + 블랙 -->
    <section class="f09-hero">
      <div class="f09-hero__pattern"></div>
      <div class="f09-hero__inner">
        <div class="f09-hero__crest">
          <div class="f09-hero__crest-line"></div>
          <p class="f09-hero__crest-text">EST. 2026</p>
          <div class="f09-hero__crest-line"></div>
        </div>
        <h1 class="f09-hero__title">FORME</h1>
        <p class="f09-hero__sub">M A I S O N &nbsp; D E &nbsp; S É L E C T I O N</p>
        <div class="f09-hero__divider"></div>
        <p class="f09-hero__desc">
          A private atelier for the discerning few.<br />
          Crafted objects. Exceptional heritage.
        </p>
        <RouterLink to="/products" class="f09-hero__cta">
          ENTER THE MAISON
        </RouterLink>
      </div>
    </section>

    <!-- 장식 구분 -->
    <div class="f09-divider">
      <span class="f09-divider__line"></span>
      <span class="f09-divider__ornament">◆ ◆ ◆</span>
      <span class="f09-divider__line"></span>
    </div>

    <!-- 네 개의 Maisons -->
    <section class="f09-maisons">
      <p class="f09-section__eyebrow">— THE MAISONS —</p>
      <h2 class="f09-section__title">Four Houses of Heritage</h2>
      <div class="f09-maisons__grid">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f09-maison"
        >
          <div class="f09-maison__frame">
            <div class="f09-maison__img-wrap">
              <img :src="b.image" :alt="b.title" />
            </div>
          </div>
          <p class="f09-maison__no">MAISON — {{ String(i + 1).padStart(2, '0') }}</p>
          <h3>{{ b.title }}</h3>
          <p class="f09-maison__since">{{ b.since }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 컬렉션 -->
    <section class="f09-collection">
      <p class="f09-section__eyebrow">— PRIVATE COLLECTION —</p>
      <h2 class="f09-section__title">Exceptional Selection</h2>
      <div class="f09-collection__grid">
        <RouterLink
          v-for="(p, i) in products.slice(0, 4)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f09-piece"
        >
          <div class="f09-piece__num">N° {{ String(i + 1).padStart(3, '0') }}</div>
          <div class="f09-piece__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <h3>{{ p.name }}</h3>
          <p class="f09-piece__price">₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 멤버십 -->
    <section class="f09-member">
      <div class="f09-member__inner">
        <p class="f09-section__eyebrow">— BY INVITATION —</p>
        <h2 class="f09-section__title f09-section__title--light">The Private Circle</h2>
        <p class="f09-member__desc">
          FORME의 멤버가 되어 시즌에 앞선 큐레이션과<br />
          한정된 상품을 가장 먼저 만나보세요.
        </p>
        <RouterLink to="/signup" class="f09-member__cta">
          REQUEST INVITATION
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
const brandPanels = [
  { id: 1, title: "BEANPOLE", since: "EST. MCMLXXXIX",  route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   since: "EST. MDCCCLXXIII", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  since: "EST. MCMXXII",    route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", since: "EST. MDCCCLXXXIX", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 09 — Luxury Monogram */
.f09-home {
  background: #0a0907;
  color: #d4b976;
  font-family: var(--font-body);
}

/* Hero */
.f09-hero {
  position: relative;
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  overflow: hidden;
}
.f09-hero__pattern {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(ellipse at center, rgba(212, 185, 118, 0.12) 0%, transparent 60%),
    repeating-linear-gradient(45deg, rgba(212, 185, 118, 0.04) 0 2px, transparent 2px 80px),
    repeating-linear-gradient(-45deg, rgba(212, 185, 118, 0.04) 0 2px, transparent 2px 80px);
}
.f09-hero__inner {
  position: relative;
  text-align: center;
  max-width: 48rem;
}
.f09-hero__crest {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
}
.f09-hero__crest-line {
  width: 3rem;
  height: 1px;
  background: #d4b976;
}
.f09-hero__crest-text {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #d4b976;
}
.f09-hero__title {
  font-family: "Cinzel", serif;
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 600;
  letter-spacing: 0.05em;
  line-height: 0.95;
  color: #d4b976;
  margin-bottom: 1.5rem;
}
.f09-hero__sub {
  font-size: 0.875rem;
  letter-spacing: 0.2em;
  color: #d4b976;
  opacity: 0.7;
  margin-bottom: 2.5rem;
}
.f09-hero__divider {
  width: 6rem;
  height: 1px;
  background: #d4b976;
  margin: 0 auto 2.5rem;
}
.f09-hero__desc {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.8;
  color: #c0a668;
  opacity: 0.8;
  margin-bottom: 3.5rem;
}
.f09-hero__cta {
  display: inline-block;
  padding: 1.25rem 3rem;
  border: 1px solid #d4b976;
  color: #d4b976;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  background: transparent;
  transition: background 0.4s, color 0.4s;
}
.f09-hero__cta:hover {
  background: #d4b976;
  color: #0a0907;
}

/* 구분 장식 */
.f09-divider {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 4rem 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.f09-divider__line {
  flex: 1;
  height: 1px;
  background: #d4b976;
  opacity: 0.3;
}
.f09-divider__ornament {
  font-size: 0.625rem;
  letter-spacing: 0.5em;
  color: #d4b976;
  opacity: 0.6;
}

/* 공통 섹션 */
.f09-section__eyebrow {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #d4b976;
  text-align: center;
  margin-bottom: 1.5rem;
  opacity: 0.7;
}
.f09-section__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  letter-spacing: 0.015em;
  text-align: center;
  color: #d4b976;
  margin-bottom: 5rem;
}
.f09-section__title--light { color: #f5e9c5; }

/* Maisons */
.f09-maisons { padding: 5rem 4rem 8rem; }
.f09-maisons__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f09-maisons__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1200px) { .f09-maisons__grid { grid-template-columns: repeat(4, 1fr); } }

.f09-maison {
  display: block;
  text-align: center;
  cursor: pointer;
}
.f09-maison__frame {
  padding: 1.25rem;
  border: 1px solid #d4b976;
  margin-bottom: 1.75rem;
  background: transparent;
  transition: background 0.4s;
}
.f09-maison:hover .f09-maison__frame { background: rgba(212, 185, 118, 0.08); }
.f09-maison__img-wrap {
  aspect-ratio: 4/5;
  overflow: hidden;
  border: 0.5px solid rgba(212, 185, 118, 0.3);
}
.f09-maison__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: sepia(0.3) contrast(1.05) brightness(0.85);
  transition: transform 1s;
}
.f09-maison:hover .f09-maison__img-wrap img { transform: scale(1.05); }
.f09-maison__no {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #d4b976;
  opacity: 0.6;
  margin-bottom: 0.625rem;
}
.f09-maison h3 {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: 0.03em;
  color: #d4b976;
  margin-bottom: 0.625rem;
}
.f09-maison__since {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #d4b976;
  opacity: 0.5;
}

/* Collection */
.f09-collection {
  padding: 8rem 4rem;
  background: #0f0d0a;
  border-top: 1px solid rgba(212, 185, 118, 0.15);
  border-bottom: 1px solid rgba(212, 185, 118, 0.15);
}
.f09-collection__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f09-collection__grid { grid-template-columns: repeat(4, 1fr); } }

.f09-piece { text-align: center; cursor: pointer; }
.f09-piece__num {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 0.875rem;
  color: #d4b976;
  opacity: 0.6;
  margin-bottom: 1rem;
}
.f09-piece__img-wrap {
  aspect-ratio: 1/1;
  background: #0a0907;
  border: 0.5px solid rgba(212, 185, 118, 0.25);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
}
.f09-piece__img-wrap img {
  width: 100%; height: 100%;
  object-fit: contain;
  filter: sepia(0.15) brightness(0.95);
}
.f09-piece h3 {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 400;
  color: #d4b976;
  line-height: 1.4;
  margin-bottom: 0.625rem;
}
.f09-piece__price {
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  color: #d4b976;
  opacity: 0.7;
}

/* 멤버십 */
.f09-member {
  padding: 10rem 4rem;
  text-align: center;
}
.f09-member__inner { max-width: 40rem; margin: 0 auto; }
.f09-member__desc {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 1.9;
  color: #c0a668;
  opacity: 0.75;
  margin-bottom: 3rem;
}
.f09-member__cta {
  display: inline-block;
  padding: 1.375rem 3.5rem;
  background: transparent;
  border: 1px solid #d4b976;
  color: #d4b976;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  transition: background 0.4s, color 0.4s;
}
.f09-member__cta:hover {
  background: #d4b976;
  color: #0a0907;
}
</style>
