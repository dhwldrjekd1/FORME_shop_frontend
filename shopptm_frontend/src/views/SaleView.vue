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

    <ProductFilterBar v-model:brand="activeBrand" v-model:gender="activeGender" :count="filtered.length" />

    <div v-if="isLoading" class="sv-loading"><span class="material-symbols-outlined sv-loading__icon">hourglass_top</span></div>

    <section v-else class="sv-products">
      <div class="sv-grid">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" show-discount />
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

const saleProducts = computed(() => products.value.filter(p => p.discountRate && p.discountRate > 0));
const filtered = computed(() => filterByBrandAndGender(saleProducts.value, activeBrand.value, activeGender.value));
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

.sv-loading { display: flex; justify-content: center; padding: 6rem; }
.sv-loading__icon { font-size: 2rem; color: #ddd; animation: spin 1.5s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

/* 상품 */
.sv-products { padding: 3rem 3rem 6rem; }
.sv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .sv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .sv-grid { grid-template-columns: repeat(4, 1fr); } }

.sv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.sv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
