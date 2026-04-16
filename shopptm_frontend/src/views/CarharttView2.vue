<template>
  <Forme32Layout>
    <!-- ═══ Hero ═══ -->
    <section class="ch-hero">
      <div class="ch-hero__bg" style="background-color: #9C4F18;">
        <div class="ch-hero__text">
          <p class="ch-hero__since">Est. 1889 / Detroit</p>
          <h1 class="ch-hero__title">CARHARTT</h1>
          <div class="ch-hero__divider"></div>
          <p class="ch-hero__desc">
            1889년 디트로이트에서 탄생한 칼하트.<br />
            미국 장인 정신의 투박한 진정성을 바탕으로<br />
            세상을 움직이는 사람들을 위한 워크웨어를 만들어왔습니다.
          </p>
          <div class="ch-hero__cta-group">
            <a href="https://www.carhartt.com/" target="_blank" rel="noopener noreferrer" class="ch-hero__cta">
              Discover the Collection →
            </a>
            <RouterLink to="/products" class="ch-hero__cta ch-hero__cta--outline">
              BRAND STORY
            </RouterLink>
          </div>
        </div>
        <div class="ch-hero__img-wrap" :style="{ height: bs.heroHeight + 'px' }">
          <img :src="bs.heroImage" alt="Carhartt Hero" :style="{ objectPosition: bs.heroPosition || 'center center' }" />
        </div>
      </div>
    </section>

    <!-- ═══ Gender Filter ═══ -->
    <div class="ch-gender-filter">
      <button v-for="g in genderChips" :key="g.key" class="ch-gchip" :class="{ 'ch-gchip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
      <span class="ch-gender-filter__count">{{ carharttProducts.length }} items</span>
    </div>

    <!-- ═══ Products — 상의 ═══ -->
    <section v-if="topProducts.length" class="ch-products">
      <header class="ch-sec-head">
        <div>
          <p class="ch-sec-head__code">TOPS</p>
        </div>
        <div class="ch-sec-head__nav">
          <span class="ch-sec-head__count">{{ topProducts.length }}개</span>
          <button class="ch-scroll-btn" @click="scrollEl($refs.topScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="ch-scroll-btn" @click="scrollEl($refs.topScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="ch-products__scroll" ref="topScroll">
        <RouterLink v-for="product in topProducts" :key="product.id" :to="`/products/${product.id}`" class="ch-card">
          <div class="ch-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="ch-card__wish" :class="{ 'ch-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="ch-card__info">
            <p class="ch-card__category">{{ product.category }}</p>
            <h3 class="ch-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="ch-card__prices">
              <span class="ch-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="ch-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="ch-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Products — 하의 ═══ -->
    <section v-if="bottomProducts.length" class="ch-products">
      <header class="ch-sec-head">
        <div>
          <p class="ch-sec-head__code">BOTTOMS</p>
        </div>
        <div class="ch-sec-head__nav">
          <span class="ch-sec-head__count">{{ bottomProducts.length }}개</span>
          <button class="ch-scroll-btn" @click="scrollEl($refs.bottomScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="ch-scroll-btn" @click="scrollEl($refs.bottomScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="ch-products__scroll" ref="bottomScroll">
        <RouterLink v-for="product in bottomProducts" :key="product.id" :to="`/products/${product.id}`" class="ch-card">
          <div class="ch-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="ch-card__wish" :class="{ 'ch-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="ch-card__info">
            <p class="ch-card__category">{{ product.category }}</p>
            <h3 class="ch-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="ch-card__prices">
              <span class="ch-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="ch-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="ch-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Brand Story ═══ -->
    <section class="ch-story">
      <div class="ch-story__inner">
        <p class="ch-story__eyebrow">— WORKWEAR</p>
        <h2 class="ch-story__title">노동의 <em>진정성</em></h2>
        <div class="ch-story__divider"></div>
        <p class="ch-story__text">
          칼하트는 130년 이상 노동자와 함께해온 워크웨어의 원조입니다.
          거친 환경을 견디는 내구성, 실용적인 디자인, 그리고 시간이 지나도 변치 않는 투박한 멋.
          패션을 넘어 삶의 도구가 되는 옷을 만듭니다.
        </p>
        <div class="ch-story__meta">
          <div class="ch-story__stat">
            <span class="ch-story__stat-num">1889</span>
            <span class="ch-story__stat-label">ESTABLISHED</span>
          </div>
          <div class="ch-story__stat">
            <span class="ch-story__stat-num">DETROIT</span>
            <span class="ch-story__stat-label">ORIGIN</span>
          </div>
          <div class="ch-story__stat">
            <span class="ch-story__stat-num">{{ carharttProducts.length }}</span>
            <span class="ch-story__stat-label">ITEMS</span>
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
const bs = ref({ heroImage: '/images/carhartt/carhero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 });

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

const carharttProducts = computed(() => {
  let list = products.value.filter((p) => p.brand === 'CARHARTT');
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

const topProducts = computed(() => carharttProducts.value.filter(p => isTop(p)));
const bottomProducts = computed(() => carharttProducts.value.filter(p => !isTop(p)));

onMounted(async () => {
  productStore.fetchProducts();
  bs.value = await getBrandSettings('carhartt');
});
</script>

<style scoped>
/* ════════════════════════════════
   CARHARTT — Brand Page
   Color: #9C4F18 (새들 브라운) + #FFC72C (머스타드 옐로)
   ════════════════════════════════ */

/* ── Hero ── */
.ch-hero__bg {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 600px;
  overflow: hidden;
  position: relative;
}
@media (min-width: 768px) {
  .ch-hero__bg { grid-template-columns: 4fr 6fr; }
}

.ch-hero__text {
  padding: 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.ch-hero__since {
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
.ch-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #ffffff;
  margin-bottom: 1.5rem;
}
.ch-hero__divider {
  width: 4rem;
  height: 1px;
  background-color: #FFC72C;
  margin-bottom: 1.5rem;
}
.ch-hero__desc {
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.ch-hero__cta-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.ch-hero__cta {
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
.ch-hero__cta:hover {
  background-color: #ffffff;
  color: #9C4F18;
}
.ch-hero__cta--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.ch-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.ch-hero__img-wrap {
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  position: relative;
}
.ch-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #9C4F18 0%, transparent 30%);
  pointer-events: none;
}
.ch-hero__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: sepia(0.15) saturate(1.1) contrast(1.05);
  transition: transform 0.8s;
}
.ch-hero__img-wrap:hover img {
  transform: scale(1.03);
}

/* ── Brand Story ── */
.ch-story {
  padding: 7rem 3rem;
  background: #f5f0ea;
  text-align: center;
}
.ch-story__inner {
  max-width: 48rem;
  margin: 0 auto;
}
.ch-story__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #9C4F18;
  margin-bottom: 1rem;
}
.ch-story__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}
.ch-story__title em {
  font-style: italic;
  color: #9C4F18;
}
.ch-story__divider {
  width: 3rem;
  height: 2px;
  background: #9C4F18;
  margin: 0 auto 2rem;
}
.ch-story__text {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #5c5c5c;
  margin-bottom: 3rem;
}
.ch-story__meta {
  display: flex;
  justify-content: center;
  gap: 4rem;
}
.ch-story__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.ch-story__stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #9C4F18;
  letter-spacing: -0.02em;
}
.ch-story__stat-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #999;
}

/* ── Section Head ── */
.ch-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 3rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}
.ch-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #9C4F18;
  margin-bottom: 0.5rem;
}
.ch-sec-head__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── Products ── */
.ch-products {
  padding-bottom: 3rem;
}
.ch-products__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 3rem 1rem;
  max-width: 1600px;
  margin: 0 auto;
  scrollbar-width: none;
}
.ch-products__scroll::-webkit-scrollbar { display: none; }
.ch-products__scroll .ch-card { flex-shrink: 0; width: 280px; }
.ch-sec-head__nav { display: flex; align-items: center; gap: 0.5rem; }
.ch-sec-head__count { font-size: 0.625rem; color: #999; letter-spacing: 0.1em; }
.ch-scroll-btn { width: 2rem; height: 2rem; border: 1.5px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; cursor: pointer; transition: all 0.2s; }
.ch-scroll-btn:hover { border-color: #9C4F18; background: #9C4F18; color: #fff; }
.ch-scroll-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

.ch-card {
  display: block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.ch-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f0ea;
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;
}
.ch-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.ch-card:hover .ch-card__img-wrap img {
  transform: scale(1.04);
}

.ch-card__wish {
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
.ch-card:hover .ch-card__wish { opacity: 1; }
.ch-card__wish:hover { color: #9C4F18; }
.ch-card__wish--active { opacity: 1 !important; color: #9C4F18; }
.ch-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "FILL" 1, "wght" 400;
}

.ch-card__category {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #9C4F18;
  margin-bottom: 0.5rem;
}
.ch-card__name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #1a1a1a;
  line-height: 1.35;
  margin-bottom: 0.625rem;
}
.ch-card__price { font-size: 0.9375rem; font-weight: 700; color: #1a1a1a; }
.ch-card__prices { display: flex; align-items: baseline; gap: 0.375rem; }
.ch-card__sale { font-size: 0.9375rem; font-weight: 900; color: #FF2D2D; }
.ch-card__was { font-size: 0.6875rem; color: #bbb; text-decoration: line-through; }

/* ── Gender Filter ── */
.ch-gender-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem 0;
  max-width: 1600px;
  margin: 0 auto;
}
.ch-gender-filter__count {
  margin-left: auto;
  font-size: 0.75rem;
  color: #999;
}
.ch-gchip {
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
.ch-gchip:hover {
  border-color: #9C4F18;
  color: #9C4F18;
}
.ch-gchip--on {
  background: #9C4F18;
  border-color: #9C4F18;
  color: #fff;
}
</style>
