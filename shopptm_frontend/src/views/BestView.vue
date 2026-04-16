<template>
  <Forme32Layout>
    <section class="bv-hero">
      <div class="bv-hero__content">
        <p class="bv-hero__eyebrow">WEEKLY RANKING</p>
        <h1 class="bv-hero__title">BEST<br />SELLERS</h1>
      </div>
    </section>

    <div class="bv-filter">
      <div class="bv-filter__inner">
        <div class="bv-filter__row">
          <button v-for="b in brandChips" :key="b.key" class="bv-chip" :class="{ 'bv-chip--on': activeBrand === b.key }" :style="activeBrand === b.key && b.color ? { backgroundColor: b.color, borderColor: b.color, color: '#fff' } : {}" @click="activeBrand = b.key">{{ b.label }}</button>
        </div>
        <div class="bv-filter__row">
          <button v-for="g in genderChips" :key="g.key" class="bv-chip bv-chip--sm" :class="{ 'bv-chip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
        </div>
        <span class="bv-filter__count">{{ filtered.length }} items</span>
      </div>
    </div>

    <div v-if="isLoading" class="bv-loading"><span class="material-symbols-outlined">hourglass_top</span></div>

    <section v-else class="bv-products">
      <div class="bv-grid">
        <RouterLink v-for="(p, i) in filtered" :key="p.id" :to="`/products/${p.id}`" class="bv-card">
          <div class="bv-card__visual">
            <img :src="p.thumbnailUrl || p.imageUrl || p.image" :alt="p.name" />
            <span class="bv-card__rank" :class="{ 'bv-card__rank--top': i < 3 }">{{ i + 1 }}</span>
            <button class="bv-card__wish" :class="{ 'bv-card__wish--on': wishlistStore.isWished(p.id) }" :style="wishlistStore.isWished(p.id) ? { color: getBrandColor(p.brand) } : {}" @click.prevent="wishlistStore.toggle(p)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="bv-card__info">
            <p class="bv-card__brand" :style="{ color: getBrandColor(p.brand) }">{{ p.brand }}</p>
            <h3 class="bv-card__name">{{ p.name }}</h3>
            <p class="bv-card__price">₩{{ p.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
      <p v-if="!filtered.length" class="bv-empty">
        <span class="material-symbols-outlined">trending_up</span>베스트 상품이 없습니다
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

const bestProducts = computed(() => products.value.filter(p => p.isBest));
const filtered = computed(() => {
  let list = bestProducts.value;
  if (activeBrand.value !== 'all') list = list.filter(p => p.brand === activeBrand.value);
  if (activeGender.value !== 'all') list = list.filter(p => !p.gender || p.gender === activeGender.value || (activeGender.value !== '공용' && p.gender === '공용'));
  return list;
});

function getBrandColor(b) { return { BEANPOLE:'#103728', CARHARTT:'#9C4F18', "LEVI'S":'#8E1C28', DICKIES:'#1A1A1A' }[b] || '#111'; }
</script>

<style scoped>
.bv-hero { background: #111; color: #fff; padding: 5rem 3rem; text-align: center; }
.bv-hero__eyebrow { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.35em; color: #c9a86b; margin-bottom: 1.5rem; }
.bv-hero__title { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; }
.bv-filter { position: sticky; top: 100px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
.bv-filter__inner { max-width: 1600px; margin: 0 auto; padding: 1rem 3rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.bv-filter__row { display: flex; gap: 0.5rem; }
.bv-chip { padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; border: 1.5px solid #ddd; background: #fff; color: #555; cursor: pointer; transition: all 0.2s; }
.bv-chip:hover { border-color: #111; color: #111; }
.bv-chip--on { background: #111; border-color: #111; color: #fff; }
.bv-chip--sm { padding: 0.375rem 0.875rem; font-size: 0.5625rem; }
.bv-filter__count { margin-left: auto; font-size: 0.6875rem; color: #999; letter-spacing: 0.1em; }
.bv-loading { display: flex; justify-content: center; padding: 6rem; color: #ddd; }
.bv-products { padding: 3rem 3rem 6rem; }
.bv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .bv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .bv-grid { grid-template-columns: repeat(4, 1fr); } }
.bv-card { display: block; text-decoration: none; color: inherit; }
.bv-card__visual { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec; border-radius: 0.375rem; margin-bottom: 0.875rem; }
.bv-card__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.bv-card:hover .bv-card__visual img { transform: scale(1.04); }
.bv-card__rank { position: absolute; top: 0.75rem; left: 0.75rem; width: 1.75rem; height: 1.75rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); color: #fff; font-size: 0.75rem; font-weight: 900; }
.bv-card__rank--top { background: #c9a86b; }
.bv-card__wish { position: absolute; top: 0.75rem; right: 0.75rem; width: 2rem; height: 2rem; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.3s; color: #bbb; }
.bv-card:hover .bv-card__wish { opacity: 1; }
.bv-card__wish--on { opacity: 1 !important; color: #FF2D2D; }
.bv-card__wish .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1, "wght" 400; }
.bv-card__brand { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 0.25rem; }
.bv-card__name { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.375rem; }
.bv-card__price { font-size: 0.9375rem; font-weight: 800; }
.bv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.bv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
