<template>
  <Forme32Layout>
    <section class="pv-hero">
      <div class="pv-hero__content">
        <p class="pv-hero__eyebrow">{{ searchQuery ? 'SEARCH RESULT' : 'ALL PRODUCTS' }}</p>
        <h1 v-if="searchQuery" class="pv-hero__title">"{{ searchQuery }}"<br />검색 결과</h1>
        <h1 v-else class="pv-hero__title">COLLECTION</h1>
        <RouterLink v-if="searchQuery" to="/products" class="pv-hero__clear">전체 상품 보기</RouterLink>
      </div>
    </section>

    <ProductFilterBar v-model:brand="activeBrand" v-model:gender="activeGender" :count="filtered.length" />

    <div v-if="isLoading" class="pv-loading"><span class="material-symbols-outlined">hourglass_top</span></div>

    <section v-else class="pv-products">
      <div class="pv-grid">
        <ProductCard v-for="p in filtered" :key="p.id" :product="p" />
      </div>
      <p v-if="!filtered.length" class="pv-empty">
        <span class="material-symbols-outlined">search_off</span>
        {{ searchQuery ? '검색 결과가 없습니다' : '등록된 상품이 없습니다' }}
      </p>
    </section>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { useProductStore } from "@/stores/productStore";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import ProductFilterBar from "@/components/ProductFilterBar.vue";
import ProductCard from "@/components/ProductCard.vue";
import { filterByBrandAndGender, searchProducts } from "@/utils/productFilters";

const route = useRoute();
const productStore = useProductStore();
const { products, isLoading } = storeToRefs(productStore);
onMounted(() => { productStore.fetchProducts(); });

const activeBrand = ref('all');
const activeGender = ref('all');

// route.query는 반응형이라, 헤더 검색에서 다시 검색해 쿼리만 바뀌어도(같은 라우트) 자동 반영됨.
// search가 URL에 두 번(?search=a&search=b) 들어오면 vue-router가 배열로 넘기므로 방어
const searchQuery = computed(() => {
  const raw = route.query.search;
  const v = Array.isArray(raw) ? raw[0] : raw;
  return v?.trim() || '';
});

// 헤더에서 새로 검색하면 같은 라우트(쿼리만 바뀜)라 컴포넌트가 재마운트되지 않아 브랜드/성별
// 칩이 이전 검색 때 고른 값 그대로 남는다 — 예를 들어 BEANPOLE 칩을 골라둔 채로 "리바이스"를
// 검색하면 실제로 결과가 있는데도 칩 필터에 걸러져 "검색 결과 없음"으로 보일 수 있어, 검색어가
// 바뀔 때마다 칩을 초기화해 새 검색은 항상 전체 브랜드/성별 기준으로 시작하게 한다
watch(searchQuery, () => { activeBrand.value = 'all'; activeGender.value = 'all'; });

const searched = computed(() =>
  searchQuery.value ? searchProducts(products.value, searchQuery.value) : products.value
);
const filtered = computed(() => filterByBrandAndGender(searched.value, activeBrand.value, activeGender.value));
</script>

<style scoped>
.pv-hero { background: #111; color: #fff; padding: 5rem 3rem; text-align: center; }
.pv-hero__eyebrow { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.35em; color: #c9a86b; margin-bottom: 1.5rem; }
.pv-hero__title { font-size: clamp(2rem, 6vw, 5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 1.1; word-break: keep-all; }
.pv-hero__clear { display: inline-block; margin-top: 1.25rem; font-size: 0.75rem; font-weight: 700; color: #c9a86b; text-decoration: underline; }
.pv-loading { display: flex; justify-content: center; padding: 6rem; color: #ddd; }
.pv-products { padding: 3rem 3rem 6rem; }
.pv-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 2rem 1.5rem; max-width: 1600px; margin: 0 auto; }
@media (min-width: 768px) { .pv-grid { grid-template-columns: repeat(3, 1fr); } }
@media (min-width: 1200px) { .pv-grid { grid-template-columns: repeat(4, 1fr); } }
.pv-empty { display: flex; flex-direction: column; align-items: center; gap: 0.75rem; padding: 5rem; color: #ccc; }
.pv-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
</style>
