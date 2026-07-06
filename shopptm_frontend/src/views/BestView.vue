<template>
  <Forme32Layout>
    <section class="bv-hero">
      <div class="bv-hero__content">
        <p class="bv-hero__eyebrow">WEEKLY RANKING</p>
        <h1 class="bv-hero__title">BEST<br />SELLERS</h1>
      </div>
    </section>

    <ProductFilterBar v-model:brand="activeBrand" v-model:gender="activeGender" :count="filtered.length" />

    <div v-if="isLoading" class="bv-loading"><span class="material-symbols-outlined">hourglass_top</span></div>

    <section v-else class="bv-products">
      <div class="bv-grid">
        <ProductCard v-for="(p, i) in filtered" :key="p.id" :product="p" :rank="i" />
      </div>
      <p v-if="!filtered.length" class="bv-empty">
        <span class="material-symbols-outlined">trending_up</span>베스트 상품이 없습니다
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

const bestProducts = computed(() => products.value.filter(p => p.isBest));
const filtered = computed(() => filterByBrandAndGender(bestProducts.value, activeBrand.value, activeGender.value));
</script>

<style scoped>
.bv-hero { background: #111; color: #fff; padding: 5rem 3rem; text-align: center; }
.bv-hero__eyebrow { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.35em; color: #c9a86b; margin-bottom: 1.5rem; }
.bv-hero__title { font-size: clamp(3rem, 7vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; }
.bv-loading { display: flex; justify-content: center; padding: 6rem; color: #ddd; }
.bv-products { padding: 3rem 3rem 6rem; }
.bv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .bv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .bv-grid { grid-template-columns: repeat(4, 1fr); } }
.bv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.bv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
