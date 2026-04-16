<template>
  <Forme32Layout>
    <!-- ═══ Hero ═══ -->
    <section class="dk-hero">
      <div class="dk-hero__bg" style="background-color: #1A1A1A;">
        <div class="dk-hero__text">
          <p class="dk-hero__since">Est. 1922 / Fort Worth, Texas</p>
          <h1 class="dk-hero__title">DICKIES</h1>
          <div class="dk-hero__divider"></div>
          <p class="dk-hero__desc">
            1922년 텍사스에서 시작된 디키즈.<br />
            한 세기에 걸친 워크웨어의 유산으로<br />
            견고함과 실용성의 가치를 증명합니다.
          </p>
          <div class="dk-hero__cta-group">
            <a href="https://dickieskr.com/" target="_blank" rel="noopener noreferrer" class="dk-hero__cta">
              Discover the Collection →
            </a>
            <RouterLink to="/products" class="dk-hero__cta dk-hero__cta--outline">
              BRAND STORY
            </RouterLink>
          </div>
        </div>
        <div class="dk-hero__img-wrap" :style="{ height: bs.heroHeight + 'px' }">
          <img :src="bs.heroImage" alt="Dickies Hero" :style="{ objectPosition: bs.heroPosition || 'center center' }" />
        </div>
      </div>
    </section>

    <!-- ═══ Gender Filter ═══ -->
    <div class="dk-gender-filter">
      <button v-for="g in genderChips" :key="g.key" class="dk-gchip" :class="{ 'dk-gchip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
      <span class="dk-gender-filter__count">{{ dickiesProducts.length }} items</span>
    </div>

    <!-- ═══ Products — 상의 ═══ -->
    <section v-if="topProducts.length" class="dk-products">
      <header class="dk-sec-head">
        <div>
          <p class="dk-sec-head__code">TOPS</p>
        </div>
        <div class="dk-sec-head__nav">
          <span class="dk-sec-head__count">{{ topProducts.length }}개</span>
          <button class="dk-scroll-btn" @click="scrollEl($refs.topScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="dk-scroll-btn" @click="scrollEl($refs.topScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="dk-products__scroll" ref="topScroll">
        <RouterLink v-for="product in topProducts" :key="product.id" :to="`/products/${product.id}`" class="dk-card">
          <div class="dk-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="dk-card__wish" :class="{ 'dk-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="dk-card__info">
            <p class="dk-card__category">{{ product.category }}</p>
            <h3 class="dk-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="dk-card__prices">
              <span class="dk-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="dk-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="dk-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Products — 하의 ═══ -->
    <section v-if="bottomProducts.length" class="dk-products">
      <header class="dk-sec-head">
        <div>
          <p class="dk-sec-head__code">BOTTOMS</p>
        </div>
        <div class="dk-sec-head__nav">
          <span class="dk-sec-head__count">{{ bottomProducts.length }}개</span>
          <button class="dk-scroll-btn" @click="scrollEl($refs.bottomScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="dk-scroll-btn" @click="scrollEl($refs.bottomScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="dk-products__scroll" ref="bottomScroll">
        <RouterLink v-for="product in bottomProducts" :key="product.id" :to="`/products/${product.id}`" class="dk-card">
          <div class="dk-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="dk-card__wish" :class="{ 'dk-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="dk-card__info">
            <p class="dk-card__category">{{ product.category }}</p>
            <h3 class="dk-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="dk-card__prices">
              <span class="dk-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="dk-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="dk-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Brand Story ═══ -->
    <section class="dk-story">
      <div class="dk-story__inner">
        <p class="dk-story__eyebrow">— INDUSTRIAL</p>
        <h2 class="dk-story__title">워크웨어의 <em>표준</em></h2>
        <div class="dk-story__divider"></div>
        <p class="dk-story__text">
          디키즈는 100년 이상 미국 산업 현장의 유니폼을 만들어왔습니다.
          거친 작업 환경에서 증명된 내구성, 기능적인 실루엣, 그리고 시대를 초월한 스타일.
          작업복에서 시작해 스트리트의 아이콘이 된 브랜드입니다.
        </p>
        <div class="dk-story__meta">
          <div class="dk-story__stat">
            <span class="dk-story__stat-num">1922</span>
            <span class="dk-story__stat-label">ESTABLISHED</span>
          </div>
          <div class="dk-story__stat">
            <span class="dk-story__stat-num">TEXAS</span>
            <span class="dk-story__stat-label">ORIGIN</span>
          </div>
          <div class="dk-story__stat">
            <span class="dk-story__stat-num">{{ dickiesProducts.length }}</span>
            <span class="dk-story__stat-label">ITEMS</span>
          </div>
        </div>
      </div>
    </section>
  </Forme32Layout>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { storeToRefs } from "pinia";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import { getBrandSettings } from "@/utils/brandSettings";
const bs = ref({ heroImage: '/images/dickies/dickies_hero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 });

const topScroll = ref(null);
const bottomScroll = ref(null);
function scrollEl(el, dir) { if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' }); }

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const wishlistStore = useWishlistStore();

const activeGender = ref('all');
const genderChips = [
  { key: 'all', label: '전체' }, { key: '남성', label: '남성' }, { key: '여성', label: '여성' }, { key: '공용', label: '공용' },
];

const dickiesProducts = computed(() => {
  let list = products.value.filter((p) => p.brand === 'DICKIES');
  if (activeGender.value !== 'all') {
    list = list.filter(p => !p.gender || p.gender === activeGender.value || (activeGender.value !== '공용' && p.gender === '공용'));
  }
  return list;
});

const topKeywords = ['상의', '티셔츠', '셔츠', '니트', '아우터', '자켓', 'top', 'shirt', 'knit', 'outer', 'jacket'];
const bottomKeywords = ['하의', '팬츠', '데님', '바지', '쇼츠', 'bottom', 'pants', 'denim', 'shorts'];

function isTop(p) {
  const cat = (p.category || p.categoryName || '').toLowerCase();
  return topKeywords.some(k => cat.includes(k)) || !bottomKeywords.some(k => cat.includes(k));
}

const topProducts = computed(() => dickiesProducts.value.filter(p => isTop(p)));
const bottomProducts = computed(() => dickiesProducts.value.filter(p => !isTop(p)));

onMounted(async () => {
  productStore.fetchProducts();
  bs.value = await getBrandSettings('dickies');
});
</script>

<style scoped>
/* ════════════════════════════════
   DICKIES — Brand Page
   Color: #1A1A1A (블랙) + #FFC72C (워크 옐로)
   ════════════════════════════════ */

/* ── Hero ── */
.dk-hero__bg {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 600px;
  overflow: hidden;
  position: relative;
}
@media (min-width: 768px) {
  .dk-hero__bg { grid-template-columns: 4fr 6fr; }
}

.dk-hero__text {
  padding: 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.dk-hero__since {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #FFC72C;
  margin-bottom: 1.5rem;
}
.dk-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 800;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #FFC72C;
  margin-bottom: 1.5rem;
}
.dk-hero__divider {
  width: 4rem;
  height: 1px;
  background-color: #FFC72C;
  margin-bottom: 1.5rem;
}
.dk-hero__desc {
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.dk-hero__cta-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.dk-hero__cta {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background-color: #FFC72C;
  color: #1A1A1A;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
}
.dk-hero__cta:hover {
  background-color: #ffffff;
  color: #1A1A1A;
}
.dk-hero__cta--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.dk-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.dk-hero__img-wrap {
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  position: relative;
}
.dk-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #1A1A1A 0%, transparent 30%);
  pointer-events: none;
}
.dk-hero__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: grayscale(0.5) contrast(1.15) brightness(0.85);
  transition: transform 0.8s;
}
.dk-hero__img-wrap:hover img {
  transform: scale(1.03);
}

/* ── Brand Story ── */
.dk-story {
  padding: 7rem 3rem;
  background: #f2f2f0;
  text-align: center;
}
.dk-story__inner {
  max-width: 48rem;
  margin: 0 auto;
}
.dk-story__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #1A1A1A;
  margin-bottom: 1rem;
}
.dk-story__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}
.dk-story__title em {
  font-style: italic;
  color: #1A1A1A;
}
.dk-story__divider {
  width: 3rem;
  height: 2px;
  background: #1A1A1A;
  margin: 0 auto 2rem;
}
.dk-story__text {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #5c5c5c;
  margin-bottom: 3rem;
}
.dk-story__meta {
  display: flex;
  justify-content: center;
  gap: 4rem;
}
.dk-story__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.dk-story__stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #1A1A1A;
  letter-spacing: -0.02em;
}
.dk-story__stat-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #999;
}

/* ── Section Head ── */
.dk-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 3rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}
.dk-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}
.dk-sec-head__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── Products ── */
.dk-products {
  padding-bottom: 3rem;
}
.dk-products__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 3rem 1rem;
  max-width: 1600px;
  margin: 0 auto;
  scrollbar-width: none;
}
.dk-products__scroll::-webkit-scrollbar { display: none; }
.dk-products__scroll .dk-card { flex-shrink: 0; width: 280px; }
.dk-sec-head__nav { display: flex; align-items: center; gap: 0.5rem; }
.dk-sec-head__count { font-size: 0.625rem; color: #999; letter-spacing: 0.1em; }
.dk-scroll-btn { width: 2rem; height: 2rem; border: 1.5px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; cursor: pointer; transition: all 0.2s; }
.dk-scroll-btn:hover { border-color: #1A1A1A; background: #1A1A1A; color: #fff; }
.dk-scroll-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

.dk-card {
  display: block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.dk-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f2f2f0;
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;
}
.dk-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.dk-card:hover .dk-card__img-wrap img {
  transform: scale(1.04);
}

.dk-card__wish {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.3s, color 0.2s;
  color: #999;
}
.dk-card:hover .dk-card__wish { opacity: 1; }
.dk-card__wish:hover { color: #1A1A1A; }
.dk-card__wish--active { opacity: 1 !important; color: #1A1A1A; }
.dk-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "FILL" 1, "wght" 400;
}

.dk-card__category {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #1A1A1A;
  margin-bottom: 0.5rem;
}
.dk-card__name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #1a1a1a;
  line-height: 1.35;
  margin-bottom: 0.625rem;
}
.dk-card__price { font-size: 0.9375rem; font-weight: 700; color: #1a1a1a; }
.dk-card__prices { display: flex; align-items: baseline; gap: 0.375rem; }
.dk-card__sale { font-size: 0.9375rem; font-weight: 900; color: #FF2D2D; }
.dk-card__was { font-size: 0.6875rem; color: #bbb; text-decoration: line-through; }

/* ── Gender Filter ── */
.dk-gender-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem 0;
  max-width: 1600px;
  margin: 0 auto;
}
.dk-gender-filter__count {
  margin-left: auto;
  font-size: 0.75rem;
  color: #999;
}
.dk-gchip {
  padding: 0.5rem 1.25rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  border: 1.5px solid #ddd;
  background: #fff;
  color: #555;
  cursor: pointer;
  transition: all 0.2s;
}
.dk-gchip:hover {
  border-color: #1A1A1A;
  color: #1A1A1A;
}
.dk-gchip--on {
  background: #1A1A1A;
  border-color: #1A1A1A;
  color: #fff;
}
</style>
