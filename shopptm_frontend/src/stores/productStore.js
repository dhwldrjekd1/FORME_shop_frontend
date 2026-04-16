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
  const error = ref(null);

  const filters = ref({
    category: "",
    sort: "newest",
  });

  const filteredProducts = computed(() => {
    let result = [...products.value];
    if (filters.value.category) {
      result = result.filter((p) => p.category === filters.value.category);
    }
    if (filters.value.sort === "newest") {
      result.sort((a, b) => b.id - a.id);
    } else if (filters.value.sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.value.sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    }
    return result;
  });

  async function fetchProducts() {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await api.get("/products");
      products.value = Array.isArray(data) ? data.map(adaptProduct) : [];
    } catch (err) {
      error.value = "상품을 불러오지 못했습니다.";
      products.value = [];
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchProductById(id) {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await api.get(`/products/${id}`);
      currentProduct.value = adaptProduct(data);
    } catch (err) {
      error.value = "상품 정보를 불러오지 못했습니다.";
      currentProduct.value = null;
    } finally {
      isLoading.value = false;
    }
  }

  function setFilter(key, value) {
    filters.value[key] = value;
  }

  return {
    products,
    currentProduct,
    isLoading,
    error,
    filters,
    filteredProducts,
    fetchProducts,
    fetchProductById,
    setFilter,
  };
});
