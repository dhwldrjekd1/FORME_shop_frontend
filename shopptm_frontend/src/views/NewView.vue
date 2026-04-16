<template>
  <Forme32Layout>
    <section class="nv-hero">
      <div class="nv-hero__bg"></div>
      <div class="nv-hero__content">
        <div class="nv-hero__badge">NEW IN</div>
        <h1 class="nv-hero__title">NEW<br />ARRIVALS</h1>
        <div class="nv-hero__line"></div>
        <p class="nv-hero__desc">이번 시즌 새롭게 입고된 아이템을 가장 먼저 만나보세요.</p>
      </div>
    </section>

    <!-- 필터 -->
    <div class="nv-filter">
      <div class="nv-filter__inner">
        <div class="nv-filter__row">
          <button v-for="b in brandChips" :key="b.key" class="nv-chip" :class="{ 'nv-chip--on': activeBrand === b.key }" :style="activeBrand === b.key && b.color ? { backgroundColor: b.color, borderColor: b.color, color: '#fff' } : {}" @click="activeBrand = b.key">{{ b.label }}</button>
        </div>
        <div class="nv-filter__row">
          <button v-for="g in genderChips" :key="g.key" class="nv-chip nv-chip--sm" :class="{ 'nv-chip--on': activeGender === g.key }" @click="activeGender = g.key">{{ g.label }}</button>
        </div>
        <span class="nv-filter__count">{{ filtered.length }} items</span>
      </div>
    </div>

    <div v-if="isLoading" class="nv-loading"><span class="material-symbols-outlined">hourglass_top</span></div>

    <section v-else class="nv-products">
      <div class="nv-grid">
        <RouterLink v-for="p in filtered" :key="p.id" :to="`/products/${p.id}`" class="nv-card">
          <div class="nv-card__visual">
            <img :src="p.thumbnailUrl || p.imageUrl || p.image" :alt="p.name" />
            <span class="nv-card__new">NEW</span>
            <button class="nv-card__wish" :class="{ 'nv-card__wish--on': wishlistStore.isWished(p.id) }" :style="wishlistStore.isWished(p.id) ? { color: getBrandColor(p.brand) } : {}" @click.prevent="wishlistStore.toggle(p)">
              <span class="material-symbols-outlined">favorite</span>
            </button>
          </div>
          <div class="nv-card__info">
            <p class="nv-card__brand" :style="{ color: getBrandColor(p.brand) }">{{ p.brand }}</p>
            <h3 class="nv-card__name">{{ p.name }}</h3>
            <p class="nv-card__price">₩{{ p.price?.toLocaleString() }}</p>
          </div>
        </RouterLink>
      </div>
      <p v-if="!filtered.length" class="nv-empty">
        <span class="material-symbols-outlined">new_releases</span>신상품이 없습니다
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

const newProducts = computed(() => products.value.filter(p => p.isNew));
const filtered = computed(() => {
  let list = newProducts.value;
  if (activeBrand.value !== 'all') list = list.filter(p => p.brand === activeBrand.value);
  if (activeGender.value !== 'all') {
    list = list.filter(p => !p.gender || p.gender === activeGender.value || (activeGender.value !== '공용' && p.gender === '공용'));
  }
  return list;
});

function getBrandColor(b) { return { BEANPOLE:'#103728', CARHARTT:'#9C4F18', "LEVI'S":'#8E1C28', DICKIES:'#1A1A1A' }[b] || '#111'; }
</script>

<style scoped>
.nv-hero { position: relative; height: 360px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.nv-hero__bg { position: absolute; inset: 0; background: linear-gradient(135deg, #111 0%, #2a2a2a 100%); }
.nv-hero__content { position: relative; z-index: 2; text-align: center; color: #fff; }
.nv-hero__badge { display: inline-block; background: #FF2D2D; font-size: 0.5rem; font-weight: 900; letter-spacing: 0.3em; padding: 0.375rem 1rem; margin-bottom: 1.5rem; }
.nv-hero__title { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.25rem; }
.nv-hero__line { width: 3rem; height: 2px; background: #FF2D2D; margin: 0 auto 1.25rem; }
.nv-hero__desc { font-size: 0.9375rem; color: rgba(255,255,255,0.5); }
.nv-filter { position: sticky; top: 100px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
.nv-filter__inner { max-width: 1600px; margin: 0 auto; padding: 1rem 3rem; display: flex; align-items: center; gap: 1.5rem; flex-wrap: wrap; }
.nv-filter__row { display: flex; gap: 0.5rem; }
.nv-chip { padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; border: 1.5px solid #ddd; background: #fff; color: #555; cursor: pointer; transition: all 0.2s; }
.nv-chip:hover { border-color: #111; color: #111; }
.nv-chip--on { background: #111; border-color: #111; color: #fff; }
.nv-chip--sm { padding: 0.375rem 0.875rem; font-size: 0.5625rem; }
.nv-filter__count { margin-left: auto; font-size: 0.6875rem; color: #999; letter-spacing: 0.1em; }
.nv-loading { display: flex; justify-content: center; padding: 6rem; color: #ddd; }
.nv-products { padding: 3rem 3rem 6rem; }
.nv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .nv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .nv-grid { grid-template-columns: repeat(4, 1fr); } }
.nv-card { display: block; text-decoration: none; color: inherit; }
.nv-card__visual { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec; border-radius: 0.375rem; margin-bottom: 0.875rem; }
.nv-card__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.nv-card:hover .nv-card__visual img { transform: scale(1.04); }
.nv-card__wish { position: absolute; top: 0.75rem; right: 0.75rem; width: 2rem; height: 2rem; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.3s, color 0.2s; color: #bbb; }
.nv-card:hover .nv-card__wish { opacity: 1; }
.nv-card__wish--on { opacity: 1 !important; }
.nv-card__wish .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1, "wght" 400; }
.nv-card__new { position: absolute; top: 0.75rem; left: 0.75rem; background: #FF2D2D; color: #fff; font-size: 0.5rem; font-weight: 900; letter-spacing: 0.15em; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }
.nv-card__brand { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 0.25rem; }
.nv-card__name { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.375rem; }
.nv-card__price { font-size: 0.9375rem; font-weight: 800; }
.nv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.nv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
