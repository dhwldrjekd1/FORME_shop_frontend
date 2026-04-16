<template>
  <Forme32Layout>
    <!-- ═══ Hero ═══ -->
    <section class="bp-hero">
      <div class="bp-hero__bg" style="background-color: #103728;">
        <div class="bp-hero__text">
          <p class="bp-hero__since">Est. 1989 / Seoul</p>
          <h1 class="bp-hero__title">BEANPOLE</h1>
          <div class="bp-hero__divider"></div>
          <p class="bp-hero__desc">
            1989년 서울에서 시작된 빈폴.<br />
            클래식의 가치를 현대적 감각으로 재해석하며<br />
            한국 패션의 헤리티지를 이어가고 있습니다.
          </p>
          <div class="bp-hero__cta-group">
            <a href="https://www.beanpole.com/" target="_blank" rel="noopener noreferrer" class="bp-hero__cta">
              Discover the Collection →
            </a>
            <RouterLink to="/products" class="bp-hero__cta bp-hero__cta--outline">
              BRAND STORY
            </RouterLink>
          </div>
        </div>
        <div class="bp-hero__img-wrap" :style="{ height: bs.heroHeight + 'px' }">
          <img :src="bs.heroImage" alt="Beanpole Hero" :style="{ objectPosition: bs.heroPosition || 'center center' }" />
        </div>
      </div>
    </section>

    <!-- 성별 필터 -->
    <div class="bp-gender-filter">
      <button v-for="g in genderChips" :key="g.key" class="bp-gchip" :class="{ 'bp-gchip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
      <span class="bp-gender-filter__count">{{ beanpoleProducts.length }} items</span>
    </div>

    <!-- ═══ Products — 상의 ═══ -->
    <section v-if="topProducts.length" class="bp-products">
      <header class="bp-sec-head">
        <div>
          <p class="bp-sec-head__code">TOPS</p>
        </div>
        <div class="bp-sec-head__nav">
          <span class="bp-sec-head__count">{{ topProducts.length }}개</span>
          <button class="bp-scroll-btn" @click="scrollEl($refs.topScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="bp-scroll-btn" @click="scrollEl($refs.topScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="bp-products__scroll" ref="topScroll">
        <RouterLink v-for="product in topProducts" :key="product.id" :to="`/products/${product.id}`" class="bp-card">
          <div class="bp-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="bp-card__wish" :class="{ 'bp-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="bp-card__info">
            <p class="bp-card__category">{{ product.category }}</p>
            <h3 class="bp-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="bp-card__prices">
              <span class="bp-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="bp-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="bp-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Products — 하의 ═══ -->
    <section v-if="bottomProducts.length" class="bp-products">
      <header class="bp-sec-head">
        <div>
          <p class="bp-sec-head__code">BOTTOMS</p>
        </div>
        <div class="bp-sec-head__nav">
          <span class="bp-sec-head__count">{{ bottomProducts.length }}개</span>
          <button class="bp-scroll-btn" @click="scrollEl($refs.bottomScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="bp-scroll-btn" @click="scrollEl($refs.bottomScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="bp-products__scroll" ref="bottomScroll">
        <RouterLink v-for="product in bottomProducts" :key="product.id" :to="`/products/${product.id}`" class="bp-card">
          <div class="bp-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="bp-card__wish" :class="{ 'bp-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="bp-card__info">
            <p class="bp-card__category">{{ product.category }}</p>
            <h3 class="bp-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="bp-card__prices">
              <span class="bp-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="bp-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="bp-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Brand Story ═══ -->
    <section class="bp-story">
      <div class="bp-story__inner">
        <p class="bp-story__eyebrow">— HERITAGE</p>
        <h2 class="bp-story__title">한국 클래식의 <em>정수</em></h2>
        <div class="bp-story__divider"></div>
        <p class="bp-story__text">
          빈폴은 35년 이상 한국 패션의 중심에서 클래식의 가치를 지켜왔습니다.
          단정한 실루엣, 정직한 소재, 시간을 견디는 디자인.
          유행을 따르지 않고 기준이 되는 옷을 만듭니다.
        </p>
        <div class="bp-story__meta">
          <div class="bp-story__stat">
            <span class="bp-story__stat-num">1989</span>
            <span class="bp-story__stat-label">ESTABLISHED</span>
          </div>
          <div class="bp-story__stat">
            <span class="bp-story__stat-num">SEOUL</span>
            <span class="bp-story__stat-label">ORIGIN</span>
          </div>
          <div class="bp-story__stat">
            <span class="bp-story__stat-num">{{ beanpoleProducts.length }}</span>
            <span class="bp-story__stat-label">ITEMS</span>
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

const bs = ref({ heroImage: '/images/beanpole/beanpole_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 });

const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const wishlistStore = useWishlistStore();

const topScroll = ref(null);
const bottomScroll = ref(null);
function scrollEl(el, dir) { if (el) el.scrollBy({ left: dir * 300, behavior: 'smooth' }); }

const activeGender = ref('all');
const genderChips = [
  { key: 'all', label: '전체' }, { key: '남성', label: '남성' }, { key: '여성', label: '여성' }, { key: '공용', label: '공용' },
];

const beanpoleProducts = computed(() => {
  let list = products.value.filter((p) => p.brand === 'BEANPOLE');
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

const topProducts = computed(() => beanpoleProducts.value.filter(p => isTop(p)));
const bottomProducts = computed(() => beanpoleProducts.value.filter(p => !isTop(p)));

onMounted(async () => {
  productStore.fetchProducts();
  bs.value = await getBrandSettings('beanpole');
});
</script>

<style scoped>
/* ════════════════════════════════
   BEANPOLE — Brand Page
   Color: #103728 (딥 그린) + #C9A86B (빈티지 골드)
   ════════════════════════════════ */

/* ── Hero ── */
.bp-hero__bg {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 600px;
  overflow: hidden;
  position: relative;
}
@media (min-width: 768px) {
  .bp-hero__bg { grid-template-columns: 4fr 6fr; }
}

.bp-hero__text {
  padding: 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.bp-hero__since {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: #C9A86B;
  margin-bottom: 1.5rem;
}
.bp-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #ffffff;
  margin-bottom: 1.5rem;
}
.bp-hero__divider {
  width: 4rem;
  height: 1px;
  background-color: #C9A86B;
  margin-bottom: 1.5rem;
}
.bp-hero__desc {
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.bp-hero__cta-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.bp-hero__cta {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background-color: #C9A86B;
  color: #103728;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
}
.bp-hero__cta:hover {
  background-color: #ffffff;
  color: #103728;
}
.bp-hero__cta--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.bp-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.bp-hero__img-wrap {
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  position: relative;
}
.bp-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #103728 0%, transparent 30%);
  pointer-events: none;
}
.bp-hero__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: grayscale(0.2) contrast(1.05) brightness(0.95);
  transition: transform 0.8s;
}
.bp-hero__img-wrap:hover img {
  transform: scale(1.03);
}

/* ── Brand Story ── */
.bp-story {
  padding: 7rem 3rem;
  background: #f5f3ee;
  text-align: center;
}
.bp-story__inner {
  max-width: 48rem;
  margin: 0 auto;
}
.bp-story__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #103728;
  margin-bottom: 1rem;
}
.bp-story__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}
.bp-story__title em {
  font-style: italic;
  color: #103728;
}
.bp-story__divider {
  width: 3rem;
  height: 2px;
  background: #103728;
  margin: 0 auto 2rem;
}
.bp-story__text {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #5c5c5c;
  margin-bottom: 3rem;
}
.bp-story__meta {
  display: flex;
  justify-content: center;
  gap: 4rem;
}
.bp-story__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.bp-story__stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #103728;
  letter-spacing: -0.02em;
}
.bp-story__stat-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #999;
}

/* ── Section Head ── */
.bp-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 3rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}
.bp-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #103728;
  margin-bottom: 0.5rem;
}
.bp-sec-head__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── Products ── */
.bp-gender-filter { display: flex; align-items: center; gap: 0.5rem; padding: 1.5rem 3rem 0; max-width: 1600px; margin: 0 auto; }
.bp-gchip { padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; border: 1.5px solid #ddd; background: #fff; color: #555; cursor: pointer; transition: all 0.2s; }
.bp-gchip:hover { border-color: #103728; color: #103728; }
.bp-gchip--on { background: #103728; border-color: #103728; color: #fff; }
.bp-gender-filter__count { margin-left: auto; font-size: 0.75rem; color: #999; }

.bp-products {
  padding-bottom: 3rem;
}
.bp-products__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 3rem 1rem;
  max-width: 1600px;
  margin: 0 auto;
  scrollbar-width: thin;
  scrollbar-color: #ddd transparent;
}
.bp-products__scroll::-webkit-scrollbar { display: none; }
.bp-products__scroll { scrollbar-width: none; }
.bp-products__scroll .bp-card { flex-shrink: 0; width: 280px; }
.bp-sec-head__nav { display: flex; align-items: center; gap: 0.5rem; }
.bp-sec-head__count { font-size: 0.625rem; color: #999; letter-spacing: 0.1em; }
.bp-scroll-btn { width: 2rem; height: 2rem; border: 1.5px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; cursor: pointer; transition: all 0.2s; }
.bp-scroll-btn:hover { border-color: #103728; background: #103728; color: #fff; }
.bp-scroll-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

.bp-card {
  display: block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.bp-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f3ee;
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;
}
.bp-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.bp-card:hover .bp-card__img-wrap img {
  transform: scale(1.04);
}

.bp-card__wish {
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
.bp-card:hover .bp-card__wish { opacity: 1; }
.bp-card__wish:hover { color: #103728; }
.bp-card__wish--active { opacity: 1 !important; color: #103728; }
.bp-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "FILL" 1, "wght" 400;
}

.bp-card__category {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #103728;
  margin-bottom: 0.5rem;
}
.bp-card__name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #1a1a1a;
  line-height: 1.35;
  margin-bottom: 0.625rem;
}
.bp-card__price { font-size: 0.9375rem; font-weight: 700; color: #1a1a1a; }
.bp-card__prices { display: flex; align-items: baseline; gap: 0.375rem; }
.bp-card__sale { font-size: 0.9375rem; font-weight: 900; color: #FF2D2D; }
.bp-card__was { font-size: 0.6875rem; color: #bbb; text-decoration: line-through; }
</style>
