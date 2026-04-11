<template>
  <main class="page-wrapper f06-home">
    <!-- 스크롤 마퀴 -->
    <div class="f06-marquee">
      <div class="f06-marquee__track">
        <span v-for="i in 8" :key="i">★ FORME 2026 · LIMITED DROP · NEW SEASON · GET HYPED · </span>
      </div>
    </div>

    <!-- Hero: 빅 컬러 블록 -->
    <section class="f06-hero">
      <div class="f06-hero__block f06-hero__block--pink">
        <p class="f06-hero__tag">✦ DROP 01</p>
        <h1 class="f06-hero__title">FORME</h1>
        <p class="f06-hero__kicker">★ WEAR LOUD ★</p>
      </div>
      <div class="f06-hero__block f06-hero__block--image">
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80"
          alt="hero"
        />
      </div>
      <div class="f06-hero__block f06-hero__block--yellow">
        <p class="f06-hero__desc">OUT<br />NOW</p>
        <RouterLink to="/products" class="f06-hero__cta">SHOP →</RouterLink>
      </div>
    </section>

    <!-- 스티커 섹션 -->
    <section class="f06-stickers">
      <div class="f06-sticker f06-sticker--star">★ NEW</div>
      <div class="f06-sticker f06-sticker--circle">LIMITED</div>
      <div class="f06-sticker f06-sticker--burst">HOT!</div>
      <div class="f06-sticker f06-sticker--badge">2026</div>
    </section>

    <!-- 브랜드: 색 블록 -->
    <section class="f06-brands">
      <h2 class="f06-section-title">▼ BRANDS</h2>
      <div class="f06-brands__grid">
        <RouterLink
          v-for="b in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f06-brand"
          :style="{ backgroundColor: b.color }"
        >
          <div class="f06-brand__sticker">{{ b.year }}</div>
          <h3>{{ b.title }}</h3>
          <img :src="b.image" :alt="b.title" />
          <span class="f06-brand__arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- 상품 그리드 -->
    <section class="f06-products">
      <h2 class="f06-section-title">▼ NEW DROPS</h2>
      <div class="f06-products__grid">
        <RouterLink
          v-for="p in products.slice(0, 6)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f06-item"
        >
          <div class="f06-item__img-wrap">
            <img :src="p.image" :alt="p.name" />
            <span class="f06-item__tag">★ NEW</span>
          </div>
          <h3>{{ p.name }}</h3>
          <p class="f06-item__price">{{ fmt(p.price) }}₩</p>
        </RouterLink>
      </div>
    </section>

    <!-- 큰 배너 -->
    <section class="f06-banner">
      <h2>✦ STAY HYPED ✦</h2>
      <p>매주 수요일, 새로운 드랍</p>
      <RouterLink to="/signup" class="f06-banner__cta">JOIN CLUB</RouterLink>
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
  { id: 1, title: "BEANPOLE", year: "1989", color: "#B4E4D7", route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   year: "1873", color: "#FF6B6B", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  year: "1922", color: "#FFC72C", route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", year: "1889", color: "#FFA94D", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 06 — Y2K Retro (Supreme/Palace) */
.f06-home {
  background: #FFF4E0;
  color: #0a0a0a;
  font-family: var(--font-body);
}

/* 마퀴 */
.f06-marquee {
  background: #0a0a0a;
  color: #FFC72C;
  padding: 0.875rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-weight: 900;
  letter-spacing: 0.15em;
  font-size: 0.9375rem;
}
.f06-marquee__track {
  display: inline-block;
  animation: f06-scroll 25s linear infinite;
}
@keyframes f06-scroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

/* Hero 3블록 */
.f06-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 75vh;
  border-bottom: 6px solid #0a0a0a;
}
@media (min-width: 768px) {
  .f06-hero { grid-template-columns: 1fr 1.5fr 1fr; }
}
.f06-hero__block {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 6px solid #0a0a0a;
  position: relative;
}
.f06-hero__block:last-child { border-right: none; }
.f06-hero__block--pink { background: #FFB6D9; }
.f06-hero__block--yellow {
  background: #FFC72C;
  align-items: flex-start;
}
.f06-hero__block--image { padding: 0; overflow: hidden; }
.f06-hero__block--image img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: contrast(1.1) saturate(1.2);
}
.f06-hero__tag {
  font-size: 0.875rem;
  font-weight: 900;
  letter-spacing: 0.15em;
}
.f06-hero__title {
  font-family: "Archivo Black", sans-serif;
  font-size: clamp(3.5rem, 9vw, 6.5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
  -webkit-text-stroke: 3px #0a0a0a;
  color: transparent;
  margin-bottom: 1rem;
}
.f06-hero__kicker {
  font-family: "Archivo Black", sans-serif;
  font-size: 0.9375rem;
  color: #0a0a0a;
  letter-spacing: 0.2em;
}
.f06-hero__desc {
  font-family: var(--font-body);
  font-size: clamp(3rem, 8vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.04em;
}
.f06-hero__cta {
  background: #0a0a0a;
  color: #FFC72C;
  padding: 1rem 2rem;
  font-size: 0.9375rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  border: 3px solid #0a0a0a;
  transition: transform 0.15s;
  display: inline-block;
}
.f06-hero__cta:hover { transform: rotate(-3deg) scale(1.05); }

/* 스티커 */
.f06-stickers {
  padding: 3rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  flex-wrap: wrap;
  background: #FFF4E0;
  border-bottom: 6px solid #0a0a0a;
}
.f06-sticker {
  font-size: 1rem;
  font-weight: 900;
  padding: 1rem 1.5rem;
  border: 3px solid #0a0a0a;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.1em;
}
.f06-sticker--star { background: #FF6B6B; color: #fff; transform: rotate(-6deg); border-radius: 0; }
.f06-sticker--circle { background: #FFC72C; border-radius: 50%; width: 7rem; height: 7rem; transform: rotate(10deg); }
.f06-sticker--burst { background: #0a0a0a; color: #FFC72C; transform: rotate(-3deg); font-size: 1.5rem; }
.f06-sticker--badge { background: #B4E4D7; transform: rotate(4deg); }

/* 섹션 타이틀 */
.f06-section-title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  padding: 3rem 3rem 2rem;
  text-transform: uppercase;
}

/* 브랜드 */
.f06-brands { border-bottom: 6px solid #0a0a0a; }
.f06-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
}
@media (min-width: 640px) { .f06-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f06-brands__grid { grid-template-columns: repeat(4, 1fr); } }

.f06-brand {
  padding: 2rem;
  border: 3px solid #0a0a0a;
  margin: -1.5px;
  aspect-ratio: 4/5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}
.f06-brand:hover { transform: scale(0.97); }
.f06-brand__sticker {
  background: #0a0a0a;
  color: #FFC72C;
  padding: 0.5rem 1rem;
  font-size: 0.8125rem;
  font-weight: 900;
  width: fit-content;
  transform: rotate(-4deg);
}
.f06-brand h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  z-index: 2;
}
.f06-brand img {
  position: absolute;
  right: -20%;
  bottom: 0;
  width: 80%;
  height: 60%;
  object-fit: cover;
  opacity: 0.7;
  filter: contrast(1.15);
}
.f06-brand__arrow {
  font-size: 2rem;
  font-weight: 900;
  z-index: 2;
  align-self: flex-end;
}

/* 상품 */
.f06-products { border-bottom: 6px solid #0a0a0a; }
.f06-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  padding: 0 3rem 3rem;
}
@media (min-width: 768px) { .f06-products__grid { grid-template-columns: repeat(3, 1fr); } }

.f06-item {
  padding: 1.5rem;
  border: 3px solid #0a0a0a;
  margin: -1.5px;
  background: #fff;
  cursor: pointer;
  transition: transform 0.2s;
}
.f06-item:hover { transform: rotate(-1deg); }
.f06-item__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #FFF4E0;
  border: 2px solid #0a0a0a;
  margin-bottom: 1rem;
  overflow: hidden;
}
.f06-item__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
}
.f06-item__tag {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #FF6B6B;
  color: #fff;
  padding: 0.375rem 0.75rem;
  font-size: 0.75rem;
  font-weight: 900;
  border: 2px solid #0a0a0a;
  transform: rotate(-4deg);
}
.f06-item h3 {
  font-size: 0.9375rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  line-height: 1.3;
}
.f06-item__price {
  font-size: 1rem;
  font-weight: 900;
}

/* 배너 */
.f06-banner {
  background: #0a0a0a;
  color: #FFC72C;
  padding: 6rem 3rem;
  text-align: center;
}
.f06-banner h2 {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.f06-banner p {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 2rem;
  font-weight: 600;
}
.f06-banner__cta {
  display: inline-block;
  background: #FFC72C;
  color: #0a0a0a;
  padding: 1.25rem 3rem;
  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  border: 4px solid #FFC72C;
  transition: transform 0.2s;
}
.f06-banner__cta:hover { transform: rotate(-2deg) scale(1.05); }
</style>
