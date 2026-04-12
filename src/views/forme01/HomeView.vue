<template>
  <main class="page-wrapper f01-home">
    <!-- ── Hero: 풀스크린 단일 이미지 + 큰 카피 ── -->
    <section class="f01-hero">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
        alt="hero"
        class="f01-hero__bg"
      />
      <div class="f01-hero__overlay"></div>
      <div class="f01-hero__content">
        <p class="f01-hero__tag">2026 SPRING COLLECTION</p>
        <h1 class="f01-hero__title">
          NEW SEASON,<br />
          NEW <span class="f01-hero__accent">FORME</span>.
        </h1>
        <p class="f01-hero__desc">
          시즌의 시작, 새로운 셀렉션을 만나보세요.
        </p>
        <RouterLink to="/products" class="f01-hero__cta">
          SHOP NOW
        </RouterLink>
      </div>
    </section>

    <!-- ── Quick Category Bar ── -->
    <nav class="f01-quickbar">
      <RouterLink
        v-for="cat in quickCategories"
        :key="cat.name"
        :to="cat.path"
        class="f01-quickbar__item"
      >
        <span class="material-symbols-outlined">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </RouterLink>
    </nav>

    <!-- ── Brand Categories: 4 그리드 ── -->
    <section class="f01-brands">
      <div class="f01-brands__head">
        <h2 class="f01-brands__title">BRAND</h2>
        <p class="f01-brands__sub">FORME가 큐레이션한 4개의 헤리티지 브랜드</p>
      </div>
      <div class="f01-brands__grid">
        <RouterLink
          v-for="brand in brandPanels"
          :key="brand.id"
          :to="brand.route"
          class="f01-brand-card"
        >
          <div class="f01-brand-card__img-wrap">
            <img :src="brand.image" :alt="brand.title" class="f01-brand-card__img" />
            <div class="f01-brand-card__hover">
              <span>VIEW MORE</span>
              <span class="material-symbols-outlined">arrow_forward</span>
            </div>
          </div>
          <p class="f01-brand-card__no">0{{ brand.id }}</p>
          <h3 class="f01-brand-card__name">{{ brand.title }}</h3>
        </RouterLink>
      </div>
    </section>

    <!-- ── New In ── -->
    <section class="f01-section">
      <header class="f01-section__head">
        <div>
          <p class="f01-section__eyebrow">NEW ARRIVAL</p>
          <h2 class="f01-section__title">신상품</h2>
        </div>
        <RouterLink to="/products" class="f01-section__more">
          전체보기 →
        </RouterLink>
      </header>
      <div class="f01-prod-grid">
        <RouterLink
          v-for="p in newProducts"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f01-prod"
        >
          <div class="f01-prod__img-wrap">
            <img :src="p.image" :alt="p.name" class="f01-prod__img" />
            <span class="f01-prod__badge">NEW</span>
          </div>
          <div class="f01-prod__info">
            <p class="f01-prod__brand">{{ getBrandName(p.id) }}</p>
            <h3 class="f01-prod__name">{{ p.name }}</h3>
            <p class="f01-prod__price">{{ formatPrice(p.price) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── Banner: 풀폭 검정 배너 ── -->
    <section class="f01-banner">
      <div class="f01-banner__inner">
        <p class="f01-banner__tag">EXCLUSIVE</p>
        <h2 class="f01-banner__title">MEMBER WEEK</h2>
        <p class="f01-banner__desc">회원 전용 시크릿 세일이 시작됩니다.</p>
        <RouterLink to="/login" class="f01-banner__cta">JOIN NOW</RouterLink>
      </div>
    </section>

    <!-- ── Best ── -->
    <section class="f01-section">
      <header class="f01-section__head">
        <div>
          <p class="f01-section__eyebrow">BEST</p>
          <h2 class="f01-section__title">베스트</h2>
        </div>
        <RouterLink to="/products" class="f01-section__more">
          전체보기 →
        </RouterLink>
      </header>
      <div class="f01-prod-grid">
        <RouterLink
          v-for="p in bestProducts"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f01-prod"
        >
          <div class="f01-prod__img-wrap">
            <img :src="p.image" :alt="p.name" class="f01-prod__img" />
            <span class="f01-prod__badge f01-prod__badge--red">BEST</span>
          </div>
          <div class="f01-prod__info">
            <p class="f01-prod__brand">{{ getBrandName(p.id) }}</p>
            <h3 class="f01-prod__name">{{ p.name }}</h3>
            <p class="f01-prod__price">{{ formatPrice(p.price) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── Editorial: 매거진 스타일 ── -->
    <section class="f01-editorial">
      <h2 class="f01-editorial__title">EDITORIAL</h2>
      <div class="f01-editorial__grid">
        <article class="f01-edit-card f01-edit-card--lg">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" alt="editorial" />
          <div class="f01-edit-card__text">
            <p class="f01-edit-card__cat">STYLE GUIDE</p>
            <h3>봄을 입는 가장 쉬운 방법</h3>
          </div>
        </article>
        <article class="f01-edit-card">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="editorial" />
          <div class="f01-edit-card__text">
            <p class="f01-edit-card__cat">LOOKBOOK</p>
            <h3>2026 SS Collection</h3>
          </div>
        </article>
        <article class="f01-edit-card">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" alt="editorial" />
          <div class="f01-edit-card__text">
            <p class="f01-edit-card__cat">BRAND STORY</p>
            <h3>워크웨어의 정직함</h3>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

onMounted(() => productStore.fetchProducts());

const newProducts  = computed(() => products.value.slice(0, 4));
const bestProducts = computed(() => products.value.slice(4, 8));

function getBrandName(id) {
  if (id >= 100 && id < 200) return "CARHARTT";
  if (id >= 200 && id < 300) return "LEVI'S";
  if (id >= 300 && id < 400) return "DICKIES";
  if (id >= 400 && id < 500) return "BEANPOLE";
  return "FORME";
}

function formatPrice(price) {
  return price ? `${price.toLocaleString()}원` : "";
}

const quickCategories = [
  { name: "전체",   icon: "apps",         path: "/products" },
  { name: "상의",   icon: "checkroom",    path: "/products" },
  { name: "하의",   icon: "dry_cleaning", path: "/products" },
  { name: "데님",   icon: "auto_awesome", path: "/products" },
  { name: "FAQ",    icon: "help",         path: "/faq" },
  { name: "Q&A",    icon: "forum",        path: "/qna" },
];

const brandPanels = [
  { id: 1, title: "BEANPOLE", route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 01 — Modern Minimal (무신사·29CM 톤)
   - 흰 배경 + 검정 텍스트
   - 강조: 빨강 포인트 (#FF2D2D)
   - sans-serif, 굵은 타이포
   ════════════════════════════════ */
.f01-home {
  background-color: #ffffff;
  color: #111;
  font-family: var(--font-body);
}

/* ── Hero ── */
.f01-hero {
  position: relative;
  height: calc(100dvh - var(--header-height));
  overflow: hidden;
}
.f01-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f01-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 60%, transparent 100%);
}
.f01-hero__content {
  position: absolute;
  left: 5rem;
  bottom: 6rem;
  color: #fff;
  max-width: 36rem;
}
.f01-hero__tag {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  margin-bottom: 1.5rem;
  color: #FF2D2D;
}
.f01-hero__title {
  font-family: var(--font-body);
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 1;
  margin-bottom: 1.5rem;
}
.f01-hero__accent { color: #FF2D2D; }
.f01-hero__desc {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 2.5rem;
  opacity: 0.85;
}
.f01-hero__cta {
  display: inline-block;
  background: #fff;
  color: #111;
  padding: 1.125rem 3rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  transition: background 0.25s, color 0.25s;
}
.f01-hero__cta:hover {
  background: #FF2D2D;
  color: #fff;
}

/* ── Quick Bar ── */
.f01-quickbar {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2.5rem 2rem;
  border-bottom: 1px solid #eee;
  background: #fff;
  flex-wrap: wrap;
}
.f01-quickbar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #111;
  transition: color 0.2s;
}
.f01-quickbar__item:hover { color: #FF2D2D; }
.f01-quickbar__item .material-symbols-outlined {
  font-size: 1.75rem;
  font-variation-settings: "wght" 300;
}

/* ── Brand Section ── */
.f01-brands {
  padding: 6rem 3rem;
  background: #fff;
}
.f01-brands__head {
  text-align: center;
  margin-bottom: 4rem;
}
.f01-brands__title {
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}
.f01-brands__sub {
  font-size: 0.875rem;
  color: #666;
}
.f01-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f01-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f01-brands__grid { grid-template-columns: repeat(4, 1fr); } }

.f01-brand-card { display: block; cursor: pointer; }
.f01-brand-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.f01-brand-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
  transition: transform 0.6s, filter 0.4s;
}
.f01-brand-card:hover .f01-brand-card__img {
  transform: scale(1.06);
  filter: grayscale(0);
}
.f01-brand-card__hover {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  opacity: 0;
  transition: opacity 0.3s;
}
.f01-brand-card:hover .f01-brand-card__hover { opacity: 1; }
.f01-brand-card__no {
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.2em;
  margin-bottom: 0.25rem;
}
.f01-brand-card__name {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}

/* ── Section (New / Best 공통) ── */
.f01-section {
  padding: 6rem 3rem;
  border-top: 1px solid #f0f0f0;
}
.f01-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1600px;
  margin: 0 auto 3rem;
}
.f01-section__eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF2D2D;
  margin-bottom: 0.5rem;
}
.f01-section__title {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.f01-section__more {
  font-size: 0.75rem;
  font-weight: 600;
  color: #111;
  border-bottom: 1px solid #111;
  padding-bottom: 4px;
}

.f01-prod-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}
@media (min-width: 768px)  { .f01-prod-grid { grid-template-columns: repeat(4, 1fr); } }

.f01-prod { display: block; cursor: pointer; }
.f01-prod__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.f01-prod__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f01-prod:hover .f01-prod__img { transform: scale(1.04); }
.f01-prod__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #111;
  color: #fff;
  padding: 0.375rem 0.625rem;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}
.f01-prod__badge--red { background: #FF2D2D; }
.f01-prod__brand {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f01-prod__name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f01-prod__price {
  font-size: 0.9375rem;
  font-weight: 800;
}

/* ── Banner ── */
.f01-banner {
  background: #111;
  color: #fff;
  padding: 5rem 2rem;
  text-align: center;
}
.f01-banner__tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #FF2D2D;
  margin-bottom: 1rem;
}
.f01-banner__title {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.f01-banner__desc {
  font-size: 0.9375rem;
  opacity: 0.7;
  margin-bottom: 2rem;
}
.f01-banner__cta {
  display: inline-block;
  background: #FF2D2D;
  color: #fff;
  padding: 1.125rem 3rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  transition: opacity 0.2s;
}
.f01-banner__cta:hover { opacity: 0.85; }

/* ── Editorial ── */
.f01-editorial {
  padding: 6rem 3rem 8rem;
}
.f01-editorial__title {
  text-align: center;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
}
.f01-editorial__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) {
  .f01-editorial__grid {
    grid-template-columns: 2fr 1fr 1fr;
    grid-template-rows: 1fr;
  }
}

.f01-edit-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  cursor: pointer;
}
.f01-edit-card--lg {
  aspect-ratio: 1/1;
}
@media (min-width: 768px) {
  .f01-edit-card--lg {
    grid-row: span 1;
    aspect-ratio: auto;
  }
}
.f01-edit-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.f01-edit-card:hover img { transform: scale(1.05); }
.f01-edit-card__text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
  color: #fff;
}
.f01-edit-card__cat {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF2D2D;
  margin-bottom: 0.5rem;
}
.f01-edit-card__text h3 {
  font-size: 1.125rem;
  font-weight: 800;
  letter-spacing: -0.01em;
}
</style>
