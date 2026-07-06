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

    <ProductFilterBar v-model:brand="activeBrand" v-model:gender="activeGender" :count="filtered.length" />

    <div v-if="isLoading" class="nv-loading"><span class="material-symbols-outlined">hourglass_top</span></div>

    <section v-else class="nv-products">
      <div class="nv-grid">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" badge-text="NEW" />
      </div>
      <p v-if="!filtered.length" class="nv-empty">
        <span class="material-symbols-outlined">new_releases</span>신상품이 없습니다
      </p>
    </section>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import ProductFilterBar from "@/components/ProductFilterBar.vue";
import ProductCard from "@/components/ProductCard.vue";
import { filterByBrandAndGender } from "@/utils/productFilters";

const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);
onMounted(() => { productStore.fetchProducts(); });

const activeBrand = ref('all');
const activeGender = ref('all');

const newProducts = computed(() => products.value.filter(p => p.isNew));
const filtered = computed(() => filterByBrandAndGender(newProducts.value, activeBrand.value, activeGender.value));
</script>

<style scoped>
.nv-hero { position: relative; height: 360px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.nv-hero__bg { position: absolute; inset: 0; background: linear-gradient(135deg, #111 0%, #2a2a2a 100%); }
.nv-hero__content { position: relative; z-index: 2; text-align: center; color: #fff; }
.nv-hero__badge { display: inline-block; background: #FF2D2D; font-size: 0.5rem; font-weight: 900; letter-spacing: 0.3em; padding: 0.375rem 1rem; margin-bottom: 1.5rem; }
.nv-hero__title { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.25rem; }
.nv-hero__line { width: 3rem; height: 2px; background: #FF2D2D; margin: 0 auto 1.25rem; }
.nv-hero__desc { font-size: 0.9375rem; color: rgba(255,255,255,0.5); }
.nv-loading { display: flex; justify-content: center; padding: 6rem; color: #ddd; }
.nv-products { padding: 3rem 3rem 6rem; }
.nv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .nv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .nv-grid { grid-template-columns: repeat(4, 1fr); } }
.nv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.nv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
