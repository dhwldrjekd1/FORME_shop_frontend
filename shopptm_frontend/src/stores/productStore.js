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
  // 목록/상세 조회가 실패했을 때, 화면이 "상품이 없습니다"/"상품을 찾을 수 없습니다"처럼
  // 정상적으로 비어있는 상태와 똑같이 보여주던 문제(교차검증에서 발견 — API 실패를 조용히
  // 삼켜서 사용자는 재시도할 방법도 모른 채 "정말 없나보다"로 오해하게 됨). ProductsView.vue/
  // DetailView.vue가 이 값으로 구분해서 재시도 안내를 보여준다.
  const loadError = ref(false);

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
    loadError.value = false;
    fetchPromise = (async () => {
      try {
        const data = await api.get("/products");
        products.value = Array.isArray(data) ? data.map(adaptProduct) : [];
      } catch {
        products.value = [];
        loadError.value = true;
      } finally {
        isLoading.value = false;
        fetchPromise = null;
      }
    })();
    return fetchPromise;
  }

  async function fetchProductById(id) {
    isLoading.value = true;
    loadError.value = false;
    try {
      const data = await api.get(`/products/${id}`);
      currentProduct.value = adaptProduct(data);
    } catch (err) {
      currentProduct.value = null;
      // 404 성격의 응답(ProductService.getProduct이 "존재하지 않는 상품"/"삭제된 상품"일 때
      // 던지는 400)은 정상적인 "그런 상품이 없다"는 결과라 재시도 안내를 띄울 이유가 없다 —
      // 네트워크 끊김/서버 오류처럼 진짜 실패했을 때만 loadError를 켠다.
      if (err?.status !== 400) loadError.value = true;
    } finally {
      isLoading.value = false;
    }
  }

  return {
    products,
    currentProduct,
    isLoading,
    loadError,
    filteredProducts,
    fetchProducts,
    fetchProductById,
  };
});
