<template>
  <main class="page-wrapper f08-home">
    <!-- Hero: 전체 이미지 + 스프레이 타이포 -->
    <section class="f08-hero">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
        alt="hero"
        class="f08-hero__bg"
      />
      <div class="f08-hero__noise"></div>
      <div class="f08-hero__text">
        <p class="f08-hero__date">SS26 / DROP.01 / 04.09</p>
        <h1 class="f08-hero__title">FORME</h1>
        <p class="f08-hero__kicker">// STREET LEGENDS</p>
        <p class="f08-hero__desc">
          From the pavement to the runway.<br />
          Four houses that built street style.
        </p>
        <RouterLink to="/products" class="f08-hero__cta">
          ► ENTER THE DROP
        </RouterLink>
      </div>
      <div class="f08-hero__corner f08-hero__corner--tl">FORME · SS26</div>
      <div class="f08-hero__corner f08-hero__corner--tr">NO. 08 / 10</div>
      <div class="f08-hero__corner f08-hero__corner--br">SEOUL · KOREA</div>
    </section>

    <!-- 브랜드: 가로 스크롤 룩북 -->
    <section class="f08-lookbook">
      <h2 class="f08-section-title">// THE HOUSES</h2>
      <div class="f08-lookbook__scroll">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f08-look"
        >
          <div class="f08-look__img-wrap">
            <img :src="b.image" :alt="b.title" />
            <div class="f08-look__overlay">
              <span class="f08-look__no">0{{ i + 1 }} / 04</span>
              <h3>{{ b.title }}</h3>
              <p>{{ b.tag }}</p>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 상품 -->
    <section class="f08-drops">
      <h2 class="f08-section-title">// FRESH DROPS</h2>
      <div class="f08-drops__grid">
        <RouterLink
          v-for="p in products.slice(0, 6)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f08-drop"
        >
          <div class="f08-drop__img-wrap">
            <img :src="p.image" :alt="p.name" />
            <div class="f08-drop__tag">SS26 DROP</div>
          </div>
          <div class="f08-drop__info">
            <span class="f08-drop__brand">{{ getBrandName(p.id) }}</span>
            <h3>{{ p.name }}</h3>
            <p class="f08-drop__price">₩ {{ fmt(p.price) }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 매니페스토 -->
    <section class="f08-manifesto">
      <p>WE DON'T<br /><span>FOLLOW.</span></p>
      <p>WE<br /><span>DEFINE.</span></p>
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
  if (id >= 100 && id < 200) return "CARHARTT";
  if (id >= 200 && id < 300) return "LEVI'S";
  if (id >= 300 && id < 400) return "DICKIES";
  if (id >= 400 && id < 500) return "BEANPOLE";
  return "FORME";
};
const brandPanels = [
  { id: 1, title: "BEANPOLE", tag: "HERITAGE SINCE '89",  route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   tag: "DENIM ICON SINCE '73", route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  tag: "WORK HARD SINCE '22", route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", tag: "BUILT TOUGH '89",     route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 08 — Street Lookbook */
.f08-home {
  background: #0e0e0e;
  color: #f5f5f5;
  font-family: var(--font-body);
}

/* Hero */
.f08-hero {
  position: relative;
  height: calc(100dvh - var(--header-height));
  overflow: hidden;
}
.f08-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.2) grayscale(0.4) brightness(0.8);
}
.f08-hero__noise {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px),
    radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  mix-blend-mode: overlay;
}
.f08-hero__text {
  position: absolute;
  left: 4rem;
  bottom: 5rem;
  color: #fff;
  max-width: 42rem;
}
.f08-hero__date {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #FF3B3B;
  margin-bottom: 1.5rem;
  font-family: monospace;
}
.f08-hero__title {
  font-family: "Anton", sans-serif;
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 400;
  line-height: 0.85;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.f08-hero__kicker {
  font-family: monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF3B3B;
  margin-bottom: 2rem;
}
.f08-hero__desc {
  font-size: 0.9375rem;
  line-height: 1.6;
  opacity: 0.85;
  margin-bottom: 2.5rem;
  font-family: monospace;
}
.f08-hero__cta {
  display: inline-block;
  background: #FF3B3B;
  color: #fff;
  padding: 1.125rem 2.5rem;
  font-size: 0.8125rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  border: 2px solid #FF3B3B;
  transition: background 0.2s, color 0.2s;
}
.f08-hero__cta:hover { background: transparent; color: #FF3B3B; }
.f08-hero__corner {
  position: absolute;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  padding: 1rem 2rem;
  background: rgba(0,0,0,0.4);
  backdrop-filter: blur(4px);
}
.f08-hero__corner--tl { top: 0; left: 0; }
.f08-hero__corner--tr { top: 0; right: 0; }
.f08-hero__corner--br { bottom: 0; right: 0; }

/* 섹션 타이틀 */
.f08-section-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  padding: 4rem 4rem 2rem;
  font-family: monospace;
  color: #f5f5f5;
  text-transform: uppercase;
}

/* 룩북 가로 스크롤 */
.f08-lookbook { border-top: 1px solid #222; }
.f08-lookbook__scroll {
  display: flex;
  gap: 1px;
  overflow-x: auto;
  padding: 0 4rem 5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.f08-lookbook__scroll::-webkit-scrollbar { display: none; }

.f08-look {
  flex: 0 0 80%;
  scroll-snap-align: start;
  cursor: pointer;
}
@media (min-width: 768px) { .f08-look { flex: 0 0 45%; } }
@media (min-width: 1200px) { .f08-look { flex: 0 0 30%; } }

.f08-look__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}
.f08-look__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.2);
  transition: transform 0.7s, filter 0.5s;
}
.f08-look:hover .f08-look__img-wrap img {
  transform: scale(1.05);
  filter: grayscale(0) contrast(1.1);
}
.f08-look__overlay {
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, transparent 30%, transparent 60%, rgba(0,0,0,0.85) 100%);
  color: #fff;
}
.f08-look__no {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f08-look__overlay h3 {
  font-size: clamp(1.75rem, 3vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.375rem;
}
.f08-look__overlay p {
  font-family: monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #FF3B3B;
  font-weight: 700;
}

/* 드롭 */
.f08-drops { border-top: 1px solid #222; padding-bottom: 3rem; }
.f08-drops__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  padding: 0 4rem 4rem;
}
@media (min-width: 640px) { .f08-drops__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f08-drops__grid { grid-template-columns: repeat(3, 1fr); } }

.f08-drop {
  background: #151515;
  border: 1px solid #222;
  margin: -0.5px;
  cursor: pointer;
  transition: background 0.2s;
}
.f08-drop:hover { background: #1a1a1a; }
.f08-drop__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #0a0a0a;
}
.f08-drop__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(0.6) contrast(1.1);
  transition: filter 0.5s, transform 0.5s;
}
.f08-drop:hover .f08-drop__img-wrap img {
  filter: grayscale(0);
  transform: scale(1.05);
}
.f08-drop__tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #FF3B3B;
  color: #fff;
  padding: 0.375rem 0.75rem;
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f08-drop__info { padding: 1.25rem 1.5rem; }
.f08-drop__brand {
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FF3B3B;
  display: block;
  margin-bottom: 0.5rem;
}
.f08-drop__info h3 {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}
.f08-drop__price {
  font-family: monospace;
  font-size: 0.9375rem;
  font-weight: 700;
}

/* 매니페스토 */
.f08-manifesto {
  padding: 8rem 4rem;
  border-top: 1px solid #222;
  background: #0a0a0a;
}
.f08-manifesto p {
  font-size: clamp(3rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.05em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1.5px #f5f5f5;
  margin-bottom: 1rem;
}
.f08-manifesto p span {
  color: #FF3B3B;
  -webkit-text-stroke: 0;
}
</style>
