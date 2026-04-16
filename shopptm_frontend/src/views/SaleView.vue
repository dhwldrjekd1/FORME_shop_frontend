<template>
  <Forme32Layout>
    <!-- 히어로 -->
    <section class="sv-hero">
      <div class="sv-hero__inner">
        <div class="sv-hero__tag-row">
          <span class="sv-hero__flash">⚡</span>
          <span class="sv-hero__tag">SPECIAL OFFER</span>
        </div>
        <h1 class="sv-hero__title">SEASON<br /><span>SALE</span></h1>
        <p class="sv-hero__desc">지금만 만날 수 있는 특별한 가격.</p>
        <div class="sv-hero__timer" v-if="saleProducts.length">
          <span>{{ saleProducts.length }} items on sale</span>
        </div>
      </div>
    </section>

    <div class="sv-filter">
      <div class="sv-filter__inner">
        <div class="sv-filter__row">
          <button v-for="b in brandChips" :key="b.key" class="sv-chip" :class="{ 'sv-chip--on': activeBrand === b.key }" :style="activeBrand === b.key && b.color ? { backgroundColor: b.color, borderColor: b.color, color: '#fff' } : {}" @click="activeBrand = b.key">{{ b.label }}</button>
        </div>
        <div class="sv-filter__row">
          <button v-for="g in genderChips" :key="g.key" class="sv-chip sv-chip--sm" :class="{ 'sv-chip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
        </div>
        <span class="sv-filter__count">{{ filtered.length }} items</span>
      </div>
    </div>

    <div v-if="isLoading" class="sv-loading"><span class="material-symbols-outlined sv-loading__icon">hourglass_top</span></div>

    <section v-else class="sv-products">
      <div class="sv-grid">
        <RouterLink v-for="p in filtered" :key="p.id" :to="`/products/${p.id}`" class="sv-card">
          <div class="sv-card__visual">
            <img :src="p.thumbnailUrl || p.imageUrl || p.image" :alt="p.name" />
            <div class="sv-card__dc-badge">
              <span class="sv-card__dc-num">{{ p.discountRate }}%</span>
              <span class="sv-card__dc-text">OFF</span>
            </div>
            <button class="sv-card__wish" :class="{ 'sv-card__wish--on': wishlistStore.isWished(p.id) }" :style="wishlistStore.isWished(p.id) ? { color: getBrandColor(p.brand) } : {}" @click.prevent="wishlistStore.toggle(p)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
            <div class="sv-card__overlay">
              <span>VIEW →</span>
            </div>
          </div>
          <div class="sv-card__info">
            <p class="sv-card__brand" :style="{ color: getBrandColor(p.brand) }">{{ p.brand }}</p>
            <h3 class="sv-card__name">{{ p.name }}</h3>
            <div class="sv-card__prices">
              <span class="sv-card__sale-price">₩{{ Math.round(p.price * (1 - p.discountRate / 100)).toLocaleString() }}</span>
              <span class="sv-card__original-price">₩{{ p.price?.toLocaleString() }}</span>
              <span class="sv-card__save">{{ p.discountRate }}% 할인</span>
            </div>
          </div>
        </RouterLink>
      </div>
      <p v-if="!filtered.length" class="sv-empty">
        <span class="material-symbols-outlined">local_offer</span>
        할인 상품이 없습니다
      </p>
    </section>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { storeToRefs } from "pinia";
import Forme32Layout from "@/layouts/Forme32Layout.vue";

const wishlistStore = useWishlistStore();
const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);
onMounted(() => { productStore.fetchProducts(); });

const activeBrand = ref('all');
const activeGender = ref('all');
const brandChips = [
  { key: 'all', label: 'ALL' },
  { key: 'CARHARTT', label: 'CARHARTT', color: '#9C4F18' },
  { key: "LEVI'S", label: "LEVI'S", color: '#8E1C28' },
  { key: 'DICKIES', label: 'DICKIES', color: '#1A1A1A' },
  { key: 'BEANPOLE', label: 'BEANPOLE', color: '#103728' },
];
const genderChips = [
  { key: 'all', label: '전체' }, { key: '남성', label: '남성' }, { key: '여성', label: '여성' }, { key: '공용', label: '공용' },
];

const saleProducts = computed(() => products.value.filter(p => p.discountRate && p.discountRate > 0));
const filtered = computed(() => {
  let list = saleProducts.value;
  if (activeBrand.value !== 'all') list = list.filter(p => p.brand === activeBrand.value);
  if (activeGender.value !== 'all') list = list.filter(p => !p.gender || p.gender === activeGender.value || (activeGender.value !== '공용' && p.gender === '공용'));
  return list;
});

function getBrandColor(brand) {
  return { BEANPOLE: '#103728', CARHARTT: '#9C4F18', "LEVI'S": '#8E1C28', DICKIES: '#1A1A1A' }[brand] || '#111';
}
</script>

<style scoped>
/* 히어로 */
.sv-hero { background: linear-gradient(135deg, #FF2D2D 0%, #cc1010 100%); color: #fff; padding: 5rem 3rem; text-align: center; position: relative; overflow: hidden; }
.sv-hero::before { content: 'SALE'; position: absolute; font-size: 20rem; font-weight: 900; color: rgba(255,255,255,0.05); top: 50%; left: 50%; transform: translate(-50%,-50%); letter-spacing: 0.1em; pointer-events: none; }
.sv-hero__inner { position: relative; z-index: 2; }
.sv-hero__tag-row { display: flex; align-items: center; justify-content: center; gap: 0.5rem; margin-bottom: 1.5rem; }
.sv-hero__flash { font-size: 1.5rem; }
.sv-hero__tag { font-size: 0.625rem; font-weight: 900; letter-spacing: 0.35em; color: rgba(255,255,255,0.8); }
.sv-hero__title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.92; margin-bottom: 1.25rem; }
.sv-hero__title span { color: #fff; -webkit-text-stroke: 2px #fff; color: transparent; }
.sv-hero__desc { font-size: 1rem; color: rgba(255,255,255,0.7); margin-bottom: 1.5rem; }
.sv-hero__timer { display: inline-block; padding: 0.5rem 1.5rem; border: 1px solid rgba(255,255,255,0.3); border-radius: 999px; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; color: rgba(255,255,255,0.8); }

.sv-filter { position: sticky; top: 100px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
.sv-filter__inner { max-width: 1600px; margin: 0 auto; padding: 1rem 3rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.sv-filter__row { display: flex; gap: 0.5rem; }
.sv-chip { padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; border: 1.5px solid #ddd; background: #fff; color: #555; cursor: pointer; transition: all 0.2s; }
.sv-chip:hover { border-color: #111; color: #111; }
.sv-chip--on { background: #111; border-color: #111; color: #fff; }
.sv-chip--sm { padding: 0.375rem 0.875rem; font-size: 0.5625rem; }
.sv-filter__count { margin-left: auto; font-size: 0.6875rem; color: #999; letter-spacing: 0.1em; }
.sv-loading { display: flex; justify-content: center; padding: 6rem; }
.sv-loading__icon { font-size: 2rem; color: #ddd; animation: spin 1.5s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* 상품 */
.sv-products { padding: 3rem 3rem 6rem; }
.sv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .sv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .sv-grid { grid-template-columns: repeat(4, 1fr); } }

.sv-card { display: block; text-decoration: none; color: inherit; }
.sv-card__visual { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec; border-radius: 0.375rem; }
.sv-card__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
.sv-card:hover .sv-card__visual img { transform: scale(1.06); }
.sv-card__wish { position: absolute; top: 0.75rem; right: 0.75rem; width: 2rem; height: 2rem; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.3s; color: #bbb; }
.sv-card:hover .sv-card__wish { opacity: 1; }
.sv-card__wish--on { opacity: 1 !important; color: #FF2D2D; }
.sv-card__wish .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1, "wght" 400; }
.sv-card__dc-badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #FF2D2D; color: #fff; padding: 0.5rem 0.625rem; border-radius: 0.375rem; text-align: center; line-height: 1; }
.sv-card__dc-num { font-size: 1.125rem; font-weight: 900; display: block; }
.sv-card__dc-text { font-size: 0.4375rem; font-weight: 800; letter-spacing: 0.15em; }
.sv-card__overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 1.25rem; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%); opacity: 0; transition: opacity 0.3s; }
.sv-card:hover .sv-card__overlay { opacity: 1; }
.sv-card__overlay span { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.2em; color: #fff; padding: 0.5rem 1.25rem; border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(4px); }

.sv-card__info { padding: 0.875rem 0.25rem 0; }
.sv-card__brand { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 0.25rem; }
.sv-card__name { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.5rem; line-height: 1.35; }
.sv-card__prices { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
.sv-card__sale-price { font-size: 1.125rem; font-weight: 900; color: #FF2D2D; }
.sv-card__original-price { font-size: 0.75rem; color: #bbb; text-decoration: line-through; }
.sv-card__save { font-size: 0.5rem; font-weight: 800; background: #fff0f0; color: #FF2D2D; padding: 0.15rem 0.375rem; border-radius: 0.2rem; }

.sv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.sv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
