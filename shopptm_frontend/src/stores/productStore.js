import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

// ── 백엔드 ProductResponseDto → 프론트 형태로 변환 (DB 기반만) ──
function adaptProduct(dto) {
  if (!dto) return null;

  return {
    id: dto.id,
    name: dto.name ?? "",
    category: dto.categoryName ?? dto.category ?? "",
    categoryName: dto.categoryName ?? "",
    description: dto.description ?? "",
    price: dto.price ?? 0,
    stock: dto.stock ?? 0,
    image: dto.imageUrl ?? "",
    imageUrl: dto.imageUrl ?? "",
    thumbnailUrl: dto.thumbnailUrl ?? null,
    curatorImageUrl: dto.curatorImageUrl ?? null,
    images: dto.images?.length ? dto.images : (dto.imageUrl ? [dto.imageUrl] : []),
    sizeStocks: dto.sizeStocks?.length ? dto.sizeStocks : null,
    sizes: dto.sizeStocks?.length ? dto.sizeStocks.map(s => s.size) : [],
    colorName: dto.colorName ?? "",
    colorHex: dto.colorHex ?? "#1a1a1a",
    brand: dto.brand ?? "",
    gender: dto.gender ?? "",
    discountRate: dto.discountRate ?? null,
    originalPrice: dto.originalPrice ?? null,
    features: dto.features?.length ? dto.features : (dto.compositionList ? [] : []),
    composition: dto.compositionList?.length ? dto.compositionList : [],
    keywords: [],
    isNew: dto.isNew ?? false,
    isBest: dto.isBest ?? false,
    isRecommend: dto.isRecommend ?? false,
  };
}

export const useProductStore = defineStore("product", () => {
  const products = ref([]);
  const currentProduct = ref(null);
  const isLoading = ref(false);

  // 최신순(id 내림차순) 정렬된 전체 상품 목록. ProductsView.vue/Forme32Layout.vue(헤더 검색)가
  // 사용하며, 브랜드/성별 필터는 각 화면에서 filterByBrandAndGender()로 별도 적용한다.
  const filteredProducts = computed(() =>
    [...products.value].sort((a, b) => b.id - a.id)
  );

  // 같은 상품 목록을 서로 다른 화면(예: /products 진입과 헤더 검색창 열기)이 거의 동시에
  // 요청하면 두 요청이 각자 isLoading을 따로 켰다 끄면서, 먼저 끝난 쪽이 isLoading을 false로
  // 되돌려 아직 안 끝난 나머지 요청이 있는데도 로딩이 끝난 것처럼 보이는 레이스가 생길 수 있어,
  // 이미 진행 중인 요청이 있으면 새로 요청하지 않고 그 요청을 그대로 같이 기다린다
  let fetchPromise = null;
  async function fetchProducts() {
    if (fetchPromise) return fetchPromise;
    isLoading.value = true;
    fetchPromise = (async () => {
      try {
        const data = await api.get("/products");
        products.value = Array.isArray(data) ? data.map(adaptProduct) : [];
      } catch {
        products.value = [];
      } finally {
        isLoading.value = false;
        fetchPromise = null;
      }
    })();
    return fetchPromise;
  }

  async function fetchProductById(id) {
    isLoading.value = true;
    try {
      const data = await api.get(`/products/${id}`);
      currentProduct.value = adaptProduct(data);
    } catch {
      currentProduct.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    currentProduct,
    isLoading,
    filteredProducts,
    fetchProducts,
    fetchProductById,
  };
});
