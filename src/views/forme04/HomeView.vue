<template>
  <main class="f04-home">
    <!-- 상단 미니 바 (자체 헤더) -->
    <header class="f04-topbar">
      <RouterLink to="/forme" class="f04-topbar__back">← Picker</RouterLink>
      <span class="f04-topbar__center">FORME · N° 04 / Gallery</span>
      <RouterLink to="/" class="f04-topbar__back">Home →</RouterLink>
    </header>

    <!-- Hero -->
    <section class="f04-hero">
      <div class="f04-hero__text">
        <p class="f04-hero__no">N° 01 / SPRING 2026</p>
        <h1 class="f04-hero__title">FORME</h1>
        <div class="f04-hero__divider"></div>
        <p class="f04-hero__desc">
          A considered selection of objects,<br />
          crafted with <em>patience</em> and intent.
        </p>
        <div class="f04-hero__meta">
          <span>VOL. 01</span>
          <span>·</span>
          <span>APR 2026</span>
          <span>·</span>
          <span>48 OBJECTS</span>
        </div>
      </div>
    </section>

    <!-- Introduction -->
    <section class="f04-intro">
      <div class="f04-intro__inner">
        <p class="f04-intro__eyebrow">— INTRODUCTION</p>
        <p class="f04-intro__text">
          FORME is an atelier of carefully chosen garments. We believe in objects
          that are made to <em>last</em> — considered in form, honest in material,
          quiet in gesture. Our selection is a slow study of heritage
          reframed for the present.
        </p>
        <p class="f04-intro__sign">— The Atelier, Seoul.</p>
      </div>
    </section>

    <!-- Brands -->
    <section class="f04-brands">
      <header class="f04-section-head">
        <p class="f04-section-head__eyebrow">— THE HOUSES</p>
        <h2 class="f04-section-head__title">Four Chapters of Heritage</h2>
      </header>
      <div class="f04-brands__grid">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f04-brand"
        >
          <span class="f04-brand__no">Chapter · N° {{ String(i + 1).padStart(2, '0') }}</span>
          <div class="f04-brand__img-wrap">
            <img :src="b.image" :alt="b.title" />
            <div class="f04-brand__hover">
              <span>View Chapter</span>
            </div>
          </div>
          <p class="f04-brand__title">{{ b.title }}</p>
          <p class="f04-brand__since">{{ b.since }}</p>
          <p class="f04-brand__desc">{{ b.desc }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 가로 스크롤 Selection -->
    <section class="f04-selection">
      <header class="f04-section-head f04-section-head--inline">
        <div>
          <p class="f04-section-head__eyebrow">— CURRENT SELECTION</p>
          <h2 class="f04-section-head__title">Objects on View</h2>
        </div>
        <div class="f04-selection__nav">
          <button @click="scrollGallery(-1)" aria-label="prev">
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <button @click="scrollGallery(1)" aria-label="next">
            <span class="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </header>

      <div class="f04-gallery" ref="galleryRef">
        <RouterLink
          v-for="(p, i) in products.slice(0, 10)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f04-obj"
        >
          <div class="f04-obj__no">N° {{ String(i + 1).padStart(3, '0') }}</div>
          <div class="f04-obj__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <p class="f04-obj__name">{{ p.name }}</p>
          <p class="f04-obj__meta">{{ getBrandName(p.id) }}</p>
          <p class="f04-obj__price">₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- Studio Notes -->
    <section class="f04-notes">
      <div class="f04-notes__inner">
        <div class="f04-notes__col">
          <p class="f04-notes__label">— STUDIO NOTES</p>
          <h3 class="f04-notes__title">On Patience</h3>
          <p class="f04-notes__text">
            The best things reveal themselves slowly.<br />
            A seam that holds, a fabric that softens with wear,<br />
            a cut that finds its shape only with time.
          </p>
          <p class="f04-notes__sign">— Editor's letter, vol. 01</p>
        </div>
        <div class="f04-notes__col">
          <p class="f04-notes__label">— ON MATERIAL</p>
          <h3 class="f04-notes__title">Quiet Materials</h3>
          <p class="f04-notes__text">
            Cotton that remembers its origin.<br />
            Denim that earns its fade.<br />
            Wool that holds the shape of the body.
          </p>
          <p class="f04-notes__sign">— Material library, 2026</p>
        </div>
      </div>
    </section>

    <!-- Index -->
    <section class="f04-index">
      <p class="f04-index__label">— INDEX OF CHAPTERS</p>
      <div class="f04-index__list">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f04-index__row"
        >
          <span>{{ String(i + 1).padStart(2, '0') }}</span>
          <span>{{ b.title }}</span>
          <span class="f04-index__dots"></span>
          <span>{{ b.since }}</span>
        </RouterLink>
      </div>
    </section>

    <!-- Closing -->
    <section class="f04-closing">
      <p class="f04-closing__text">
        "The best objects are those we forget we own —<br />
        until we reach for them again."
      </p>
      <p class="f04-closing__sign">FORME · ATELIER · SEOUL</p>
    </section>

    <!-- 자체 푸터 -->
    <footer class="f04-foot">
      <div class="f04-foot__inner">
        <div class="f04-foot__col">
          <p class="f04-foot__brand">FORME</p>
          <p class="f04-foot__sub">A considered atelier.</p>
        </div>
        <div class="f04-foot__col">
          <p class="f04-foot__label">CHAPTERS</p>
          <RouterLink to="/beanpole">Beanpole</RouterLink>
          <RouterLink to="/carhartt">Carhartt</RouterLink>
          <RouterLink to="/levis">Levi's</RouterLink>
          <RouterLink to="/dickies">Dickies</RouterLink>
        </div>
        <div class="f04-foot__col">
          <p class="f04-foot__label">VISIT</p>
          <RouterLink to="/products">The Selection</RouterLink>
          <RouterLink to="/qna">Correspondence</RouterLink>
          <RouterLink to="/login">Members</RouterLink>
        </div>
        <div class="f04-foot__col">
          <p class="f04-foot__label">ATELIER</p>
          <p>Seoul · Est. 2026</p>
          <p>mail@forme.atelier</p>
        </div>
      </div>
      <div class="f04-foot__bottom">
        <span>© 2026 FORME Atelier</span>
        <span>All selections considered.</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
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
const galleryRef = ref(null);
function scrollGallery(dir) {
  if (!galleryRef.value) return;
  galleryRef.value.scrollBy({ left: dir * 440, behavior: "smooth" });
}
const brandPanels = [
  { id: 1, title: "Beanpole", since: "Seoul, 1989",         desc: "A Korean classic, patiently reframed.",    route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Carhartt", since: "Detroit, 1889",        desc: "Honesty measured in stitches.",            route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "Levi's",   since: "San Francisco, 1873",  desc: "A century and a half, in indigo.",         route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "Dickies",  since: "Fort Worth, 1922",     desc: "Built for work, adopted by the street.",   route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 04 — Gallery (Aesop/Celine)
   ════════════════════════════════ */
.f04-home {
  background: #f4f2ed;
  color: #1a1a1a;
  font-family: var(--font-body);
  min-height: 100dvh;
}

/* ── 자체 상단바 ── */
.f04-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2.5rem;
  background: rgba(244, 242, 237, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
.f04-topbar__back {
  color: #6b6b6b;
  transition: color 0.2s;
}
.f04-topbar__back:hover { color: #1a1a1a; }
.f04-topbar__center {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: none;
  color: #1a1a1a;
}

/* ── Hero ── */
.f04-hero {
  min-height: calc(100dvh - 60px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-hero__text {
  text-align: center;
  max-width: 42rem;
}
.f04-hero__no {
  font-size: 0.625rem;
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
  margin-bottom: 2rem;
}
.f04-hero__divider {
  width: 3rem;
  height: 1px;
  background: #1a1a1a;
  margin: 0 auto 2rem;
}
.f04-hero__desc {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.25rem;
  line-height: 1.9;
  color: #4a4a4a;
  margin-bottom: 3rem;
}
.f04-hero__desc em {
  font-style: italic;
  color: #8b7437;
}
.f04-hero__meta {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #888;
  font-family: monospace;
}

/* ── Introduction ── */
.f04-intro {
  padding: 10rem 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-intro__inner {
  max-width: 40rem;
  margin: 0 auto;
  text-align: center;
}
.f04-intro__eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.35em;
  color: #6b6b6b;
  margin-bottom: 2.5rem;
}
.f04-intro__text {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.375rem;
  line-height: 2;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 2.5rem;
}
.f04-intro__text em {
  font-style: italic;
  color: #8b7437;
}
.f04-intro__sign {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 1rem;
  color: #6b6b6b;
}

/* ── 섹션 헤드 공통 ── */
.f04-section-head {
  text-align: center;
  margin-bottom: 5rem;
}
.f04-section-head--inline {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding: 0 4rem;
}
.f04-section-head__eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.35em;
  color: #6b6b6b;
  margin-bottom: 1.5rem;
}
.f04-section-head__title {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.01em;
}

/* ── Brands ── */
.f04-brands {
  padding: 10rem 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 7rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f04-brands__grid { grid-template-columns: 1fr 1fr; } }
.f04-brand {
  display: block;
  cursor: pointer;
  text-align: center;
}
.f04-brand__no {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #6b6b6b;
  display: block;
  margin-bottom: 1.5rem;
}
.f04-brand__img-wrap {
  aspect-ratio: 4/5;
  overflow: hidden;
  background: #e8e5df;
  margin-bottom: 1.75rem;
  position: relative;
}
.f04-brand__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.5) brightness(0.95);
  transition: filter 1s, transform 1.2s;
}
.f04-brand:hover .f04-brand__img-wrap img {
  filter: grayscale(0);
  transform: scale(1.03);
}
.f04-brand__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.3);
  opacity: 0;
  transition: opacity 0.5s;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 1.25rem;
  color: #fff;
  letter-spacing: 0.05em;
}
.f04-brand:hover .f04-brand__hover { opacity: 1; }
.f04-brand__title {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
.f04-brand__since {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #6b6b6b;
  margin-bottom: 1rem;
}
.f04-brand__desc {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 1rem;
  color: #4a4a4a;
  line-height: 1.6;
}

/* ── Selection Gallery ── */
.f04-selection {
  padding: 10rem 0;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-selection__nav {
  display: flex;
  gap: 0.5rem;
}
.f04-selection__nav button {
  width: 2.75rem;
  height: 2.75rem;
  border: 0.5px solid #1a1a1a;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.f04-selection__nav button:hover {
  background: #1a1a1a;
  color: #f4f2ed;
}
.f04-selection__nav .material-symbols-outlined {
  font-size: 1.125rem;
  font-variation-settings: "wght" 300;
}
.f04-gallery {
  display: flex;
  gap: 3rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 4rem 1rem;
}
.f04-gallery::-webkit-scrollbar { display: none; }
.f04-obj {
  flex: 0 0 300px;
  scroll-snap-align: start;
  display: block;
  cursor: pointer;
}
.f04-obj__no {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.8125rem;
  color: #8b7437;
  margin-bottom: 1rem;
}
.f04-obj__img-wrap {
  aspect-ratio: 1/1;
  background: #ffffff;
  padding: 2.5rem;
  margin-bottom: 1.25rem;
  transition: background 0.4s;
}
.f04-obj:hover .f04-obj__img-wrap { background: #ece8df; }
.f04-obj__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.8s;
}
.f04-obj:hover .f04-obj__img-wrap img { transform: scale(1.05); }
.f04-obj__name {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.0625rem;
  font-weight: 400;
  margin-bottom: 0.375rem;
  line-height: 1.4;
}
.f04-obj__meta {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #8b7437;
  margin-bottom: 0.5rem;
}
.f04-obj__price {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.9375rem;
  color: #4a4a4a;
}

/* ── Studio Notes ── */
.f04-notes {
  padding: 12rem 4rem;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-notes__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f04-notes__inner { grid-template-columns: 1fr 1fr; } }

.f04-notes__col {
  border-top: 0.5px solid #1a1a1a;
  padding-top: 2.5rem;
}
.f04-notes__label {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #6b6b6b;
  margin-bottom: 1rem;
}
.f04-notes__title {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 2.25rem;
  font-weight: 400;
  margin-bottom: 2rem;
}
.f04-notes__text {
  font-family: "Cormorant Garamond", serif;
  font-size: 1.125rem;
  line-height: 1.9;
  color: #4a4a4a;
  margin-bottom: 1.5rem;
}
.f04-notes__sign {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.875rem;
  color: #8b7437;
}

/* ── Index ── */
.f04-index {
  padding: 8rem 4rem;
  max-width: 900px;
  margin: 0 auto;
  border-bottom: 0.5px solid rgba(0,0,0,0.12);
}
.f04-index__label {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #6b6b6b;
  margin-bottom: 3rem;
  text-align: center;
}
.f04-index__list {
  display: flex;
  flex-direction: column;
}
.f04-index__row {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1.25rem 0;
  border-top: 0.5px solid rgba(0,0,0,0.15);
  color: #1a1a1a;
  font-family: "Cormorant Garamond", serif;
  transition: padding-left 0.3s;
}
.f04-index__row:hover { padding-left: 1rem; }
.f04-index__row span:nth-child(1) {
  font-style: italic;
  color: #8b7437;
  font-size: 0.9375rem;
}
.f04-index__row span:nth-child(2) {
  font-size: 1.375rem;
}
.f04-index__dots {
  border-bottom: 1px dotted #999;
  height: 0.875rem;
}
.f04-index__row span:nth-child(4) {
  font-size: 0.75rem;
  font-style: italic;
  color: #6b6b6b;
}

/* ── Closing ── */
.f04-closing {
  padding: 10rem 4rem;
  text-align: center;
}
.f04-closing__text {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: clamp(1.375rem, 2.5vw, 1.75rem);
  font-weight: 400;
  line-height: 1.8;
  color: #4a4a4a;
  max-width: 48rem;
  margin: 0 auto 3rem;
}
.f04-closing__sign {
  font-size: 0.625rem;
  letter-spacing: 0.4em;
  color: #8b7437;
}

/* ── 자체 푸터 ── */
.f04-foot {
  background: #eae6dd;
  padding: 5rem 4rem 3rem;
  border-top: 0.5px solid rgba(0,0,0,0.15);
}
.f04-foot__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 4rem;
}
@media (min-width: 768px) { .f04-foot__inner { grid-template-columns: 2fr 1fr 1fr 1fr; } }

.f04-foot__brand {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 2.5rem;
  font-weight: 400;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}
.f04-foot__sub {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.875rem;
  color: #6b6b6b;
}
.f04-foot__label {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 1.25rem;
}
.f04-foot__col {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}
.f04-foot__col a,
.f04-foot__col p {
  font-family: "Cormorant Garamond", serif;
  font-size: 0.9375rem;
  color: #1a1a1a;
  transition: color 0.2s;
}
.f04-foot__col a:hover { color: #8b7437; }

.f04-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 2rem;
  border-top: 0.5px solid rgba(0,0,0,0.15);
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  color: #6b6b6b;
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
}
</style>
