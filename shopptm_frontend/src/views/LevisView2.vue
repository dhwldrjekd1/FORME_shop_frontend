<template>
  <Forme32Layout>
    <!-- ═══ Hero ═══ -->
    <section class="lv-hero">
      <div class="lv-hero__bg" style="background-color: #8E1C28;">
        <div class="lv-hero__text">
          <p class="lv-hero__since">Est. 1873 / San Francisco</p>
          <h1 class="lv-hero__title">LEVI'S</h1>
          <div class="lv-hero__divider"></div>
          <p class="lv-hero__desc">
            1873년 샌프란시스코에서 시작된 리바이스.<br />
            데님의 역사를 써온 아이코닉한 브랜드로<br />
            아메리칸 헤리티지의 원형을 보여줍니다.
          </p>
          <div class="lv-hero__cta-group">
            <a href="https://levi.co.kr/" target="_blank" rel="noopener noreferrer" class="lv-hero__cta">
              Discover the Collection →
            </a>
            <RouterLink to="/products" class="lv-hero__cta lv-hero__cta--outline">
              BRAND STORY
            </RouterLink>
          </div>
        </div>
        <div class="lv-hero__img-wrap" :style="{ height: bs.heroHeight + 'px' }">
          <img :src="bs.heroImage" alt="Levi's Hero" :style="{ objectPosition: bs.heroPosition || 'center center' }" />
        </div>
      </div>
    </section>

    <!-- ═══ Gender Filter ═══ -->
    <div class="lv-gender-filter">
      <button v-for="g in genderChips" :key="g.key" class="lv-gchip" :class="{ 'lv-gchip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
      <span class="lv-gender-filter__count">{{ levisProducts.length }} items</span>
    </div>

    <!-- ═══ Products — 상의 ═══ -->
    <section v-if="topProducts.length" class="lv-products">
      <header class="lv-sec-head">
        <div>
          <p class="lv-sec-head__code">TOPS</p>
        </div>
        <div class="lv-sec-head__nav">
          <span class="lv-sec-head__count">{{ topProducts.length }}개</span>
          <button class="lv-scroll-btn" @click="scrollEl($refs.topScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="lv-scroll-btn" @click="scrollEl($refs.topScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="lv-products__scroll" ref="topScroll">
        <RouterLink v-for="product in topProducts" :key="product.id" :to="`/products/${product.id}`" class="lv-card">
          <div class="lv-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="lv-card__wish" :class="{ 'lv-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="lv-card__info">
            <p class="lv-card__category">{{ product.category }}</p>
            <h3 class="lv-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="lv-card__prices">
              <span class="lv-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="lv-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="lv-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Products — 하의 ═══ -->
    <section v-if="bottomProducts.length" class="lv-products">
      <header class="lv-sec-head">
        <div>
          <p class="lv-sec-head__code">BOTTOMS</p>
        </div>
        <div class="lv-sec-head__nav">
          <span class="lv-sec-head__count">{{ bottomProducts.length }}개</span>
          <button class="lv-scroll-btn" @click="scrollEl($refs.bottomScroll, -1)"><span class="material-symbols-outlined">chevron_left</span></button>
          <button class="lv-scroll-btn" @click="scrollEl($refs.bottomScroll, 1)"><span class="material-symbols-outlined">chevron_right</span></button>
        </div>
      </header>
      <div class="lv-products__scroll" ref="bottomScroll">
        <RouterLink v-for="product in bottomProducts" :key="product.id" :to="`/products/${product.id}`" class="lv-card">
          <div class="lv-card__img-wrap">
            <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />
            <button class="lv-card__wish" :class="{ 'lv-card__wish--active': wishlistStore.isWished(product.id) }" @click.prevent="wishlistStore.toggle(product)" aria-label="찜하기">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="lv-card__info">
            <p class="lv-card__category">{{ product.category }}</p>
            <h3 class="lv-card__name">{{ product.name }}</h3>
            <div v-if="product.discountRate" class="lv-card__prices">
              <span class="lv-card__sale">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
              <span class="lv-card__was">₩{{ product.price?.toLocaleString() }}</span>
            </div>
            <p v-else class="lv-card__price">₩{{ product.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Brand Story ═══ -->
    <section class="lv-story">
      <div class="lv-story__inner">
        <p class="lv-story__eyebrow">— DENIM HERITAGE</p>
        <h2 class="lv-story__title">데님의 <em>원조</em></h2>
        <div class="lv-story__divider"></div>
        <p class="lv-story__text">
          리바이스는 150년 이상 데님의 역사와 함께해왔습니다.
          리벳으로 시작된 혁신, 501로 완성된 아이콘, 그리고 세대를 넘어 사랑받는 핏.
          유행이 아닌 문화를 만드는 브랜드입니다.
        </p>
        <div class="lv-story__meta">
          <div class="lv-story__stat">
            <span class="lv-story__stat-num">1873</span>
            <span class="lv-story__stat-label">ESTABLISHED</span>
          </div>
          <div class="lv-story__stat">
            <span class="lv-story__stat-num">S.F.</span>
            <span class="lv-story__stat-label">ORIGIN</span>
          </div>
          <div class="lv-story__stat">
            <span class="lv-story__stat-num">{{ levisProducts.length }}</span>
            <span class="lv-story__stat-label">ITEMS</span>
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
const bs = ref({ heroImage: '/images/levis/levis_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 });

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

const levisProducts = computed(() => {
  let list = products.value.filter((p) => p.brand === "LEVI'S");
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

const topProducts = computed(() => levisProducts.value.filter(p => isTop(p)));
const bottomProducts = computed(() => levisProducts.value.filter(p => !isTop(p)));

onMounted(async () => {
  productStore.fetchProducts();
  bs.value = await getBrandSettings('levis');
});
</script>

<style scoped>
/* ════════════════════════════════
   LEVI'S — Brand Page
   Color: #8E1C28 (딥 레드) + #ffffff (화이트 탭)
   ════════════════════════════════ */

/* ── Hero ── */
.lv-hero__bg {
  display: grid;
  grid-template-columns: 1fr;
  min-height: 600px;
  overflow: hidden;
  position: relative;
}
@media (min-width: 768px) {
  .lv-hero__bg { grid-template-columns: 4fr 6fr; }
}

.lv-hero__text {
  padding: 5rem 3.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #ffffff;
}
.lv-hero__since {
  display: inline-flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 1.5rem;
}
.lv-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  line-height: 0.95;
  color: #ffffff;
  font-style: italic;
  margin-bottom: 1.5rem;
}
.lv-hero__divider {
  width: 4rem;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
}
.lv-hero__desc {
  font-size: 0.9375rem;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.75);
  max-width: 28rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
}
.lv-hero__cta-group {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
}
.lv-hero__cta {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background-color: #ffffff;
  color: #8E1C28;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
}
.lv-hero__cta:hover {
  background-color: #1a1a1a;
  color: #ffffff;
}
.lv-hero__cta--outline {
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.lv-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #ffffff;
}

.lv-hero__img-wrap {
  height: 100%;
  min-height: 400px;
  overflow: hidden;
  position: relative;
}
.lv-hero__img-wrap::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, #8E1C28 0%, transparent 30%);
  pointer-events: none;
}
.lv-hero__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center bottom;
  filter: contrast(1.1) saturate(0.9) brightness(0.95);
  transition: transform 0.8s;
}
.lv-hero__img-wrap:hover img {
  transform: scale(1.03);
}

/* ── Brand Story ── */
.lv-story {
  padding: 7rem 3rem;
  background: #f5f0f1;
  text-align: center;
}
.lv-story__inner {
  max-width: 48rem;
  margin: 0 auto;
}
.lv-story__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8E1C28;
  margin-bottom: 1rem;
}
.lv-story__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}
.lv-story__title em {
  font-style: italic;
  color: #8E1C28;
}
.lv-story__divider {
  width: 3rem;
  height: 2px;
  background: #8E1C28;
  margin: 0 auto 2rem;
}
.lv-story__text {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #5c5c5c;
  margin-bottom: 3rem;
}
.lv-story__meta {
  display: flex;
  justify-content: center;
  gap: 4rem;
}
.lv-story__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.lv-story__stat-num {
  font-size: 1.75rem;
  font-weight: 900;
  color: #8E1C28;
  letter-spacing: -0.02em;
}
.lv-story__stat-label {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #999;
}

/* ── Section Head ── */
.lv-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 2rem 3rem 1.5rem;
  max-width: 1600px;
  margin: 0 auto;
}
.lv-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #8E1C28;
  margin-bottom: 0.5rem;
}
.lv-sec-head__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── Products ── */
.lv-products {
  padding-bottom: 3rem;
}
.lv-products__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  padding: 0 3rem 1rem;
  max-width: 1600px;
  margin: 0 auto;
  scrollbar-width: none;
}
.lv-products__scroll::-webkit-scrollbar { display: none; }
.lv-products__scroll .lv-card { flex-shrink: 0; width: 280px; }
.lv-sec-head__nav { display: flex; align-items: center; gap: 0.5rem; }
.lv-sec-head__count { font-size: 0.625rem; color: #999; letter-spacing: 0.1em; }
.lv-scroll-btn { width: 2rem; height: 2rem; border: 1.5px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: #fff; cursor: pointer; transition: all 0.2s; }
.lv-scroll-btn:hover { border-color: #8E1C28; background: #8E1C28; color: #fff; }
.lv-scroll-btn .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

.lv-card {
  display: block;
  cursor: pointer;
  color: inherit;
  text-decoration: none;
}
.lv-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f0f1;
  margin-bottom: 1.25rem;
  border-radius: 0.375rem;
}
.lv-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.lv-card:hover .lv-card__img-wrap img {
  transform: scale(1.04);
}

.lv-card__wish {
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
.lv-card:hover .lv-card__wish { opacity: 1; }
.lv-card__wish:hover { color: #8E1C28; }
.lv-card__wish--active { opacity: 1 !important; color: #8E1C28; }
.lv-card__wish .material-symbols-outlined {
  font-size: 1.0625rem;
  font-variation-settings: "FILL" 1, "wght" 400;
}

.lv-card__category {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #8E1C28;
  margin-bottom: 0.5rem;
}
.lv-card__name {
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: -0.005em;
  color: #1a1a1a;
  line-height: 1.35;
  margin-bottom: 0.625rem;
}
.lv-card__price { font-size: 0.9375rem; font-weight: 700; color: #1a1a1a; }
.lv-card__prices { display: flex; align-items: baseline; gap: 0.375rem; }
.lv-card__sale { font-size: 0.9375rem; font-weight: 900; color: #FF2D2D; }
.lv-card__was { font-size: 0.6875rem; color: #bbb; text-decoration: line-through; }

/* ── Gender Filter ── */
.lv-gender-filter {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 3rem 0;
  max-width: 1600px;
  margin: 0 auto;
}
.lv-gender-filter__count {
  margin-left: auto;
  font-size: 0.75rem;
  color: #999;
}
.lv-gchip {
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
.lv-gchip:hover {
  border-color: #8E1C28;
  color: #8E1C28;
}
.lv-gchip--on {
  background: #8E1C28;
  border-color: #8E1C28;
  color: #fff;
}
</style>
