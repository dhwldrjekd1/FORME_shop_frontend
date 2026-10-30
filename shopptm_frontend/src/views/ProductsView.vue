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

    <!-- API 실패를 "등록된 상품이 없습니다"와 똑같이 보여주면 재시도할 방법도 모른 채
         사용자가 "정말 없나보다"로 오해하게 돼서(교차검증에서 발견), 실패일 때만 따로
         재시도 안내를 보여준다. -->
    <section v-else-if="loadError" class="pv-products">
      <p class="pv-empty">
        <span class="material-symbols-outlined">error_outline</span>
        상품을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        <button class="pv-retry" @click="productStore.fetchProducts()">다시 시도</button>
      </p>
    </section>

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
// 정렬 안 된 products 대신 filteredProducts(최신순 정렬)를 기준으로 삼는다 — Forme32Layout의
// 헤더 검색은 이미 filteredProducts를 쓰는데, 이 화면만 raw products를 그대로 써서 API가
// 돌려주는(ORDER BY 없이 DB가 임의로 정한) 순서 그대로 노출되고 있었음(교차검증에서 발견).
const { filteredProducts, isLoading, loadError } = storeToRefs(productStore);
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
  searchQuery.value ? searchProducts(filteredProducts.value, searchQuery.value) : filteredProducts.value
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
.pv-retry { margin-top: 0.5rem; padding: 0.5rem 1.25rem; background: #111; color: #fff; font-size: 0.75rem; font-weight: 700; border-radius: 0.25rem; cursor: pointer; }
</style>
