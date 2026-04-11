<template>
  <main class="page-wrapper f10-home">
    <!-- Hero -->
    <section class="f10-hero">
      <div class="f10-hero__content">
        <div class="f10-hero__tag">
          <span class="material-symbols-outlined">eco</span>
          <span>SUSTAINABLY CURATED</span>
        </div>
        <h1 class="f10-hero__title">FORME</h1>
        <p class="f10-hero__tagline">
          Slow Fashion, <em>Honest Goods.</em>
        </p>
        <p class="f10-hero__desc">
          오래 입을 수 있는 옷, 정직하게 만든 물건.<br />
          FORME은 지속가능한 방식을 고민하는 브랜드만을 선별합니다.
        </p>
        <div class="f10-hero__cta-group">
          <RouterLink to="/products" class="f10-hero__cta">
            Shop Collection
            <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
          <RouterLink to="/about" class="f10-hero__link">
            Our Values →
          </RouterLink>
        </div>
      </div>
      <div class="f10-hero__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
          alt="hero"
        />
        <div class="f10-hero__stamp">
          <span>CERTIFIED</span>
          <strong>2026</strong>
          <span>HERITAGE</span>
        </div>
      </div>
    </section>

    <!-- 가치 -->
    <section class="f10-values">
      <div class="f10-value">
        <span class="material-symbols-outlined">recycling</span>
        <h3>Recycled Materials</h3>
        <p>지속가능한 원단과 재활용 소재를 우선합니다.</p>
      </div>
      <div class="f10-value">
        <span class="material-symbols-outlined">handyman</span>
        <h3>Honest Craft</h3>
        <p>제대로 만들어진 봉제와 마감을 추구합니다.</p>
      </div>
      <div class="f10-value">
        <span class="material-symbols-outlined">schedule</span>
        <h3>Built to Last</h3>
        <p>한 계절이 아닌 여러 해를 위한 선택.</p>
      </div>
      <div class="f10-value">
        <span class="material-symbols-outlined">diversity_3</span>
        <h3>Fair Trade</h3>
        <p>생산의 모든 과정에 정직함이 있습니다.</p>
      </div>
    </section>

    <!-- 브랜드 스토리 -->
    <section class="f10-brands">
      <div class="f10-brands__head">
        <p class="f10-brands__eyebrow">— OUR SELECTED PARTNERS</p>
        <h2 class="f10-brands__title">
          Four Brands.<br />
          One Philosophy.
        </h2>
      </div>
      <div class="f10-brands__list">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f10-brand"
          :class="{ 'f10-brand--reverse': i % 2 === 1 }"
        >
          <div class="f10-brand__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
          <div class="f10-brand__text">
            <p class="f10-brand__no">0{{ i + 1 }} / 04</p>
            <h3>{{ b.title }}</h3>
            <p class="f10-brand__since">{{ b.since }}</p>
            <p class="f10-brand__desc">{{ b.desc }}</p>
            <span class="f10-brand__link">Explore →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 상품 -->
    <section class="f10-goods">
      <p class="f10-goods__eyebrow">— SEASONAL GOODS</p>
      <h2 class="f10-goods__title">Carefully Made Objects</h2>
      <div class="f10-goods__grid">
        <RouterLink
          v-for="p in products.slice(0, 6)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f10-good"
        >
          <div class="f10-good__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <p class="f10-good__tag">✓ Certified</p>
          <h3>{{ p.name }}</h3>
          <p class="f10-good__price">₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 레터 -->
    <section class="f10-letter">
      <div class="f10-letter__content">
        <p class="f10-letter__eyebrow">— A LETTER FROM FORME</p>
        <p class="f10-letter__text">
          우리는 많은 것을 만드는 시대에 살고 있습니다.<br />
          그래서 FORME은 <em>덜 만들고, 더 오래 가는 것</em>을 선택했습니다.<br /><br />
          좋은 옷은 시간을 이깁니다.<br />
          그 시간의 편에 서기로 했습니다.
        </p>
        <p class="f10-letter__sign">— FORME</p>
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
  { id: 1, title: "Beanpole", since: "EST. 1989",  desc: "한국 클래식 브랜드가 이어온 정직한 제조의 역사.", route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Levi's",   since: "EST. 1873",  desc: "150년 동안 진화해온 데님의 지속가능한 여정.",    route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "Dickies",  since: "EST. 1922",  desc: "노동의 현장에서 빚어진 단단한 내구성의 약속.",   route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "Carhartt", since: "EST. 1889",  desc: "디트로이트의 정직한 손끝이 만든 한 세기의 기준.", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 10 — Eco Natural (크라프트/자연 톤) */
.f10-home {
  background: #f0e9dc;
  color: #3a2e1f;
  font-family: var(--font-body);
}

/* Hero */
.f10-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100dvh - var(--header-height));
  background: #f0e9dc;
}
@media (min-width: 1024px) {
  .f10-hero { grid-template-columns: 1fr 1.1fr; }
}
.f10-hero__content {
  padding: 5rem 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f10-hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 1rem;
  background: #3a2e1f;
  color: #f0e9dc;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  width: fit-content;
  margin-bottom: 2rem;
}
.f10-hero__tag .material-symbols-outlined { font-size: 1rem; }
.f10-hero__title {
  font-family: "Fraunces", serif;
  font-size: clamp(5rem, 13vw, 11rem);
  font-weight: 300;
  font-variation-settings: "SOFT" 100, "WONK" 1;
  letter-spacing: -0.03em;
  line-height: 0.9;
  margin-bottom: 1rem;
  color: #3a2e1f;
}
.f10-hero__tagline {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1.25rem;
  color: #5c4a30;
  margin-bottom: 2.5rem;
}
.f10-hero__tagline em {
  color: #8b6a3a;
}
.f10-hero__desc {
  font-size: 1rem;
  line-height: 1.85;
  color: #5c4a30;
  margin-bottom: 3rem;
  max-width: 30rem;
}
.f10-hero__cta-group {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
}
.f10-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1.125rem 2.25rem;
  background: #3a2e1f;
  color: #f0e9dc;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  border-radius: 999px;
  transition: background 0.3s;
}
.f10-hero__cta:hover { background: #8b6a3a; }
.f10-hero__cta .material-symbols-outlined { font-size: 1rem; }
.f10-hero__link {
  font-size: 0.8125rem;
  font-weight: 500;
  color: #3a2e1f;
  border-bottom: 1px solid #3a2e1f;
  padding-bottom: 4px;
}

.f10-hero__img-wrap {
  position: relative;
  overflow: hidden;
  min-height: 500px;
}
.f10-hero__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: sepia(0.15) saturate(0.85);
}
.f10-hero__stamp {
  position: absolute;
  bottom: 3rem;
  right: 3rem;
  width: 9rem;
  height: 9rem;
  border-radius: 50%;
  border: 2px solid #3a2e1f;
  background: #f0e9dc;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  transform: rotate(-8deg);
}
.f10-hero__stamp span {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #3a2e1f;
}
.f10-hero__stamp strong {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  font-weight: 400;
  color: #3a2e1f;
  margin: 0.25rem 0;
}

/* 가치 */
.f10-values {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  background: #ebe3d1;
  border-top: 1px solid rgba(58, 46, 31, 0.15);
  border-bottom: 1px solid rgba(58, 46, 31, 0.15);
}
@media (min-width: 1024px) { .f10-values { grid-template-columns: repeat(4, 1fr); } }

.f10-value {
  padding: 3.5rem 2.5rem;
  text-align: center;
  border-right: 1px solid rgba(58, 46, 31, 0.1);
  border-bottom: 1px solid rgba(58, 46, 31, 0.1);
}
.f10-value:last-child { border-right: none; }
.f10-value .material-symbols-outlined {
  font-size: 2.25rem;
  color: #8b6a3a;
  font-variation-settings: "wght" 300;
  margin-bottom: 1.25rem;
}
.f10-value h3 {
  font-family: var(--font-headline);
  font-size: 1.125rem;
  font-weight: 400;
  margin-bottom: 0.75rem;
}
.f10-value p {
  font-size: 0.8125rem;
  color: #5c4a30;
  line-height: 1.7;
}

/* 브랜드 */
.f10-brands { padding: 8rem 4rem; }
.f10-brands__head {
  text-align: center;
  margin-bottom: 6rem;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
.f10-brands__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b6a3a;
  margin-bottom: 1.25rem;
}
.f10-brands__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.05;
}
.f10-brands__list {
  display: flex;
  flex-direction: column;
  gap: 5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.f10-brand {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  color: inherit;
  cursor: pointer;
}
@media (min-width: 768px) { .f10-brand { grid-template-columns: 1fr 1fr; align-items: center; } }
.f10-brand--reverse .f10-brand__img-wrap { order: 1; }
@media (min-width: 768px) {
  .f10-brand--reverse .f10-brand__img-wrap { order: 2; }
}
.f10-brand__img-wrap {
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #e0d6bf;
}
.f10-brand__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: sepia(0.1) saturate(0.9);
  transition: transform 0.8s;
}
.f10-brand:hover .f10-brand__img-wrap img { transform: scale(1.04); }
.f10-brand__no {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #8b6a3a;
  margin-bottom: 1rem;
}
.f10-brand__text h3 {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}
.f10-brand__since {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #8b6a3a;
  margin-bottom: 1.5rem;
}
.f10-brand__desc {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #5c4a30;
  margin-bottom: 1.5rem;
  max-width: 28rem;
}
.f10-brand__link {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #3a2e1f;
  border-bottom: 1px solid #3a2e1f;
  padding-bottom: 4px;
}

/* Goods */
.f10-goods {
  padding: 8rem 4rem;
  background: #ebe3d1;
  border-top: 1px solid rgba(58, 46, 31, 0.15);
  border-bottom: 1px solid rgba(58, 46, 31, 0.15);
  text-align: center;
}
.f10-goods__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b6a3a;
  margin-bottom: 1rem;
}
.f10-goods__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 400;
  margin-bottom: 5rem;
}
.f10-goods__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
  text-align: left;
}
@media (min-width: 768px) { .f10-goods__grid { grid-template-columns: repeat(3, 1fr); } }

.f10-good { cursor: pointer; }
.f10-good__img-wrap {
  aspect-ratio: 4/5;
  background: #f0e9dc;
  padding: 1.5rem;
  margin-bottom: 1.25rem;
  border: 1px solid rgba(58, 46, 31, 0.15);
}
.f10-good__img-wrap img {
  width: 100%; height: 100%;
  object-fit: contain;
  filter: sepia(0.1);
  transition: transform 0.6s;
}
.f10-good:hover .f10-good__img-wrap img { transform: scale(1.03); }
.f10-good__tag {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #5a7f3a;
  margin-bottom: 0.5rem;
}
.f10-good h3 {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
.f10-good__price {
  font-size: 0.875rem;
  font-weight: 600;
  color: #3a2e1f;
}

/* 레터 */
.f10-letter {
  padding: 10rem 4rem;
  background: #f0e9dc;
  text-align: center;
}
.f10-letter__content { max-width: 44rem; margin: 0 auto; }
.f10-letter__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b6a3a;
  margin-bottom: 2.5rem;
}
.f10-letter__text {
  font-family: var(--font-headline);
  font-size: clamp(1.125rem, 2vw, 1.375rem);
  line-height: 2;
  font-weight: 300;
  color: #3a2e1f;
  margin-bottom: 3rem;
}
.f10-letter__text em {
  font-style: italic;
  color: #8b6a3a;
}
.f10-letter__sign {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1rem;
  color: #8b6a3a;
}
</style>
