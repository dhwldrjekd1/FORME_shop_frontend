import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useProductStore = defineStore("product", () => {
  // ── state ──────────────────────────────────
  const products = ref([]); // 상품 목록 전체
  const currentProduct = ref(null); // 상품 상세 페이지용 단일 상품
  const isLoading = ref(false); // 로딩 상태 (스피너 표시 여부)
  const error = ref(null); // 에러 메시지

  // 필터 상태 (ListView 에서 사용)
  const filters = ref({
    category: "", // 선택된 카테고리 (빈 문자열 = 전체)
    sort: "newest", // 정렬 기준
  });

  // ── getters ────────────────────────────────
  // 필터 + 정렬이 적용된 상품 목록
  // filters 가 바뀔 때마다 자동으로 재계산됨
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // 카테고리 필터: 선택된 카테고리와 일치하는 것만
    if (filters.value.category) {
      result = result.filter((p) => p.category === filters.value.category);
    }

    // 정렬
    if (filters.value.sort === "newest") {
      result.sort((a, b) => b.id - a.id); // id 큰 순 (최신순)
    } else if (filters.value.sort === "price-asc") {
      result.sort((a, b) => a.price - b.price); // 가격 낮은 순
    } else if (filters.value.sort === "price-desc") {
      result.sort((a, b) => b.price - a.price); // 가격 높은 순
    }

    return result;
  });

  // ── actions ────────────────────────────────
  // 상품 목록 불러오기
  async function fetchProducts() {
    isLoading.value = true;
    error.value = null;

    try {
      // TODO: Spring Boot 연결 시 아래 주석 해제, 목업 데이터 제거
      // const response = await api.get('/products')
      // products.value = response.data

      products.value = getMockProducts(); // 임시 목업 데이터
    } catch (err) {
      error.value = "상품을 불러오지 못했습니다.";
      console.error(err);
    } finally {
      // 성공/실패 상관없이 로딩 종료
      isLoading.value = false;
    }
  }

  // 상품 상세 불러오기
  async function fetchProductById(id) {
    isLoading.value = true;
    error.value = null;

    try {
      // TODO: Spring Boot 연결 시 아래 주석 해제
      // const response = await api.get(`/products/${id}`)
      // currentProduct.value = response.data

      // 목업 데이터에서 id 로 찾기
      // Number(id): params 는 문자열이라 숫자로 변환
      const found = getMockProducts().find((p) => p.id === Number(id));
      currentProduct.value = found ?? null; // 없으면 null
    } catch (err) {
      error.value = "상품 정보를 불러오지 못했습니다.";
      console.error(err);
    } finally {
      isLoading.value = false;
    }
  }

  // 필터 값 변경 (key: 'category' | 'sort', value: 값)
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

// ─────────────────────────────────────────────
// 임시 목업 데이터
// Spring Boot API 연결 전까지 사용
// ─────────────────────────────────────────────
function getMockProducts() {
  return [
    // ── 칼하트 브랜드 상품 ──
    {
      id: 104,
      name: "디어본 루즈핏 포켓 티셔츠",
      category: "T-shirt",
      keywords: ['칼하트', '티셔츠', '티', '상의', '블랙', '포켓'],
      price: 44000,
      image: "/images/carhartt/104.png",
      images: [
        "/images/carhartt/104.png", // 정면
        "/images/carhartt/104_2.png", // 측면
        "/images/carhartt/104_3.png", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black"],
      colorHex: "#1a1a1a",
      description:
        "칼하트 베어본 라인의 릴렉스 포켓 티셔츠입니다. 군더더기 없는 심플한 디자인에 좌측 가슴 포켓이 포인트가 되는 기본 아이템입니다.",
      features: [
        "100% 순면 소재",
        "릴렉스 핏 — 여유로운 실루엣",
        "좌측 가슴 포켓",
        "크루넥 디자인",
        "강화 솔기 처리",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 105,
      name: "디어본 릴랙스드 샴록 티셔츠",
      category: "T-shirt",
      keywords: ['칼하트', '티셔츠', '티', '상의', '베이지', '그래픽'],
      price: 52300,
      image: "/images/carhartt/105.png",
      images: [
        "/images/carhartt/105.png", // 정면
        "/images/carhartt/105_2.png", // 측면
        "/images/carhartt/105_3.png", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Malt"],
      colorHex: "#c9a96e",
      description:
        "칼하트 베어본 라인의 샴록 그래픽 릴렉스 티셔츠입니다. 몰트 컬러 바탕에 샴록 모티프 그래픽이 캐주얼하고 유니크한 분위기를 연출합니다.",
      features: [
        "100% 순면 소재",
        "릴렉스 핏 — 여유로운 실루엣",
        "샴록 그래픽 프린트",
        "크루넥 디자인",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 106,
      name: "칼하트 포스 릴랙스 티셔츠",
      category: "T-shirt",
      keywords: ['칼하트', '티셔츠', '티', '상의', '화이트', '흰색'],
      price: 57500,
      image: "/images/carhartt/106.png",
      images: [
        "/images/carhartt/106.png", // 정면
        "/images/carhartt/106_2.png", // 측면
        "/images/carhartt/106_3.png", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["WhiteS"],
      colorHex: "#f5f5f5",
      description:
        "칼하트 포스 기술이 적용된 릴렉스 핏 티셔츠입니다. FastDry 기능으로 땀을 빠르게 흡수·발산하며 작업 중에도 쾌적한 착용감을 유지합니다.",
      features: [
        "Carhartt Force™ FastDry 기술 — 빠른 흡습 발산",
        "릴렉스 핏 — 편안한 실루엣",
        "통기성 강화 소재",
        "냄새 방지 처리",
        "기계 세탁 가능",
      ],
      composition: ["65% Cotton, 35% Polyester", "Made in Cambodia"],
    },
    {
      id: 101,
      name: "루즈핏 캔버스 유틸리티 워크 팬츠",
      category: "Pants",
      keywords: ['칼하트', '바지', '팬츠', '워크팬츠', '베이지', '브라운'],
      price: 140000,
      image: "/images/carhartt/101.png",
      images: [
        "/images/carhartt/101.png",
        "/images/carhartt/101_2.png",
        "/images/carhartt/101_3.png",
        "/images/carhartt/101_4.png",
      ],
      sizes: [
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
      ],
      colors: ["Duck Brown"],
      colorHex: "#b8a96a",
      description:
        "러기드 플렉스 원단으로 제작된 루즈핏 스트레이트 진입니다. 움직임에 유연하게 대응하는 스트레치 소재로 작업 현장부터 일상까지 편안하게 착용할 수 있습니다.",
      features: [
        "Rugged Flex 원단 — 스트레치 편안함",
        "루즈핏 — 넉넉한 허벅지 공간",
        "5포켓 디자인",
        "내구성 강한 YKK 지퍼",
        "허리 밴드 내부 바텍 처리",
      ],
      composition: ["98% Cotton, 2% Elastane", "Made in Mexico"],
    },
    {
      id: 102,
      name: "루즈 스트레이트 러기드 플렉스 덕 트라우저",
      category: "Pants",
      keywords: ['칼하트', '바지', '팬츠', '블랙', '다크', '트라우저'],
      price: 122000,
      image: "/images/carhartt/102.png",
      images: [
        "/images/carhartt/102.png", // 정면
        "/images/carhartt/102_2.png", // 측면
        "/images/carhartt/102_3.png",
        "/images/carhartt/102_4.png",
      ],
      sizes: ["30", "31", "32", "33", "34", "36", "38", "40", "42"],
      colors: ["Shadow"],
      colorHex: "#3a3a3a",
      description:
        "러기드 플렉스 덕 원단으로 제작된 슬림 테이퍼드 팬츠입니다. 타마크 컬러의 세련된 실루엣과 스트레치 소재의 편안함을 동시에 갖춘 작업복 겸 캐주얼 팬츠입니다.",
      features: [
        "Rugged Flex 덕 원단 — 스트레치 편안함",
        "슬림 테이퍼드 핏",
        "내구성 강화 무릎 구조",
        "다용도 포켓 구성",
        "허리 밴드 내부 바텍 처리",
      ],
      composition: ["100% Cotton Duck Canvas", "Made in Mexico"],
    },
    {
      id: 103,
      name: "아이코닉 B01 펌 덕 더블 프론트 트라우저",
      category: "Pants",
      keywords: ['칼하트', '바지', '팬츠', '브라운', '워크팬츠', '트라우저'],
      price: 209000,
      image: "/images/carhartt/103.png",
      images: [
        "/images/carhartt/103.png", // 정면
        "/images/carhartt/103_2.png", // 측면
        "/images/carhartt/103_3.png", // 디테일
        "/images/carhartt/103_4.png", // 후면
      ],
      sizes: [
        "28",
        "29",
        "30",
        "31",
        "32",
        "33",
        "34",
        "36",
        "38",
        "40",
        "42",
        "44",
        "46",
        "48",
      ],
      colors: ["Carhartt Brown"],
      colorHex: "#5c3318",
      description:
        "칼하트의 아이코닉 B01 펌 덕 소재 더블프런트 팬츠입니다. 무릎 부분을 이중으로 강화하여 장시간 무릎 작업에도 뛰어난 내구성을 발휘하는 작업복의 정석입니다.",
      features: [
        "펌 덕 소재 — 고강도 내구성",
        "더블프런트 무릎 이중 강화",
        "루즈핏 — 넉넉한 착용감",
        "멀티 포켓 구성",
        "허머 루프 및 룰 포켓 포함",
      ],
      composition: ["100% Cotton Duck", "Made in USA"],
    },

    // ── 리바이스 브랜드 상품 ──
    {
      id: 204,
      name: "NAS 밴드 티",
      category: "T-Shirt",
      keywords: ['리바이스', '리바이', '티셔츠', '티', '상의', '화이트', '흰색', '그래픽'],
      price: 45000,
      image: "/images/levis/204.jpg",
      images: [
        "/images/levis/204.jpg", // 정면
        "/images/levis/204_2.jpg", // 측면
        "/images/levis/204_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"],
      colorHex: "#f5f5f5",
      description:
        "힙합 레전드 NAS와의 협업으로 탄생한 그래픽 티셔츠입니다. 클래식한 화이트 바탕에 빈티지 감성의 그래픽이 프린트되어 있습니다.",
      features: [
        "NAS 협업 한정 그래픽",
        "100% 순면 소재",
        "레귤러 핏",
        "크루넥 디자인",
        "스크린 프린트 그래픽",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 205,
      name: "LEVI'S® X BARBOUR 그래픽 티셔츠",
      category: "T-Shirt",
      keywords: ['리바이스', '리바이', '티셔츠', '티', '상의', '아이보리', '콜라보', '그래픽'],
      price: 109000,
      image: "/images/levis/205.jpg",
      images: [
        "/images/levis/205.jpg", // 정면
        "/images/levis/205_2.jpg", // 측면
        "/images/levis/205_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Ivory"],
      colorHex: "#f0ede0",
      description:
        "리바이스와 영국 헤리티지 브랜드 바버의 콜라보레이션 티셔츠입니다. 두 브랜드의 아이코닉한 로고가 결합된 특별한 그래픽이 특징입니다.",
      features: [
        "리바이스 × 바버 콜라보 그래픽",
        "아이보리 컬러 순면 소재",
        "레귤러 핏",
        "크루넥",
        "양면 프린트",
      ],
      composition: ["100% Cotton", "Made in Portugal"],
    },
    {
      id: 206,
      name: "헤비웨이트 포켓 티셔츠",
      category: "T-Shirt",
      keywords: ['리바이스', '리바이', '티셔츠', '티', '상의', '화이트', '흰색', '포켓'],
      price: 35000,
      image: "/images/levis/206.jpg",
      images: [
        "/images/levis/206.jpg", // 정면
        "/images/levis/206_2.jpg", // 측면
        "/images/levis/206_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"],
      colorHex: "#ffffff",
      description:
        "두툼한 헤비웨이트 순면으로 제작된 기본 포켓 티셔츠입니다. 단순하지만 견고한 구조로 일상에서 가장 자주 손이 가는 기본 아이템입니다.",
      features: [
        "헤비웨이트 순면 소재",
        "좌측 가슴 포켓",
        "레귤러 핏",
        "크루넥",
        "강화 솔기 처리",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 201,
      name: "555™ 릴렉스 스트레이트 진",
      category: "Denim",
      keywords: ['리바이스', '리바이', '바지', '데님', '진', '청바지', '인디고', '네이비'],
      price: 159000,
      image: "/images/levis/201.jpg",
      images: [
        "/images/levis/201.jpg",
        "/images/levis/201_2.jpg",
        "/images/levis/201_3.jpg",
      ],
      sizes: ["28", "30", "32", "34", "36", "38"],
      colors: ["Darkindigo"],
      colorHex: "#1e2d4e",
      description:
        "1873년 탄생한 오리지널 진의 현대적 해석. 555™는 릴렉스 핏과 스트레이트 레그로 여유로운 실루엣을 완성합니다. 클래식한 다크 인디고 워시로 어떤 스타일에도 잘 어울립니다.",
      features: [
        "릴렉스 핏 — 허벅지부터 여유로운 실루엣",
        "스트레이트 레그 라인",
        "클래식 5포켓 디자인",
        "다크 인디고 워시",
        "99% 코튼 / 1% 엘라스테인",
      ],
      composition: ["99% Cotton, 1% Elastane", "Made in Bangladesh"],
    },
    {
      id: 202,
      name: "565™ 루즈 스트레이트 진",
      category: "Denim",
      keywords: ['리바이스', '리바이', '바지', '데님', '진', '청바지', '인디고'],
      price: 99000,
      image: "/images/levis/202.jpg",
      images: [
        "/images/levis/202.jpg", // 정면
        "/images/levis/202_2.jpg", // 측면
        "/images/levis/202_3.jpg", // 디테일
      ],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Dark Indigo Flat Finish"],
      colorHex: "#1e2a3a",
      description:
        "565™는 허리부터 허벅지까지 넉넉한 루즈 핏을 제공하는 스트레이트 진입니다. 다크 인디고 플랫 피니쉬 워시로 깔끔하고 절제된 분위기를 연출합니다.",
      features: [
        "루즈 핏 — 넉넉한 허리와 허벅지",
        "스트레이트 레그",
        "다크 인디고 플랫 피니쉬 워시",
        "클래식 5포켓",
        "100% 코튼",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 203,
      name: "505™ 레귤러 라이트웨이트 진",
      category: "Denim",
      keywords: ['리바이스', '리바이', '바지', '데님', '진', '청바지', '라이트', '연청'],
      price: 169000,
      image: "/images/levis/203.jpg",
      images: [
        "/images/levis/203.jpg", // 정면
        "/images/levis/203_2.jpg", // 측면
        "/images/levis/203_3.jpg", // 디테일
      ],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Light Wash"],
      colorHex: "#a8c4d8",
      description:
        "505™ 레귤러 핏의 가벼운 데님 버전입니다. 얇은 원단으로 여름철에도 쾌적하게 착용할 수 있으며, 라이트 워시가 캐주얼한 분위기를 완성합니다.",
      features: [
        "레귤러 핏 — 편안한 표준 실루엣",
        "라이트웨이트 데님 원단",
        "Light Wash",
        "스트레이트 레그",
        "클래식 5포켓 디자인",
      ],
      composition: ["100% Cotton", "Made in Mexico"],
    },

    // ── 디키즈 상품 ──
    {
      id: 304,
      name: "트리 로고 레이어드 롱슬리브",
      category: "T-shirt",
      keywords: ['디키즈', '티셔츠', '티', '상의', '롱슬리브', '긴팔', '그레이', '회색'],
      price: 69000,
      image: "/images/dickies/304.jpg",
      images: [
        "/images/dickies/304.jpg", // 정면
        "/images/dickies/304_2.jpg", // 측면
        "/images/dickies/304_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Melange"],
      colorHex: "#9e9e9e",
      description:
        "디키즈 트리 로고가 새겨진 레이어드 롱슬리브 티셔츠입니다. 멜란지 소재의 자연스러운 텍스처와 레이어드 디테일이 캐주얼한 스트리트 룩을 완성합니다.",
      features: [
        "멜란지 혼방 소재 — 자연스러운 텍스처",
        "트리 로고 그래픽",
        "레이어드 디테일",
        "롱슬리브 디자인",
        "릴렉스 핏",
      ],
      composition: ["60% Cotton, 40% Polyester", "Made in Cambodia"],
    },
    {
      id: 305,
      name: "파인 스트라이프 포켓 티셔츠",
      category: "T-shirt",
      keywords: ['디키즈', '티셔츠', '티', '상의', '그레이', '회색', '스트라이프', '포켓'],
      price: 59000,
      image: "/images/dickies/305.jpg",
      images: [
        "/images/dickies/305.jpg", // 정면
        "/images/dickies/305_2.jpg", // 측면
        "/images/dickies/305_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Gray"],
      colorHex: "#9e9e9e",
      description:
        "파인 스트라이프 패턴이 더해진 디키즈의 포켓 티셔츠입니다. 그레이 베이스에 섬세한 스트라이프 디테일이 단정하고 세련된 캐주얼 룩을 연출합니다.",
      features: [
        "파인 스트라이프 패턴",
        "좌측 가슴 포켓",
        "100% 순면 소재",
        "레귤러 핏",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 306,
      name: "워시드 스네이크 로고 티셔츠",
      category: "T-shirt",
      keywords: ['디키즈', '티셔츠', '티', '상의', '블랙', '검정', '로고'],
      price: 59000,
      image: "/images/dickies/306.jpg",
      images: [
        "/images/dickies/306.jpg", // 정면
        "/images/dickies/306_2.jpg", // 측면
        "/images/dickies/306_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black"],
      colorHex: "#1a1a1a",
      description:
        "스네이크 텍스처 워시 가공이 적용된 디키즈 로고 티셔츠입니다. 워시드 블랙 특유의 빈티지한 질감과 스네이크 패턴 로고가 개성 있는 스트리트 룩을 완성합니다.",
      features: [
        "워시드 스네이크 텍스처 가공",
        "디키즈 로고 프린트",
        "100% 순면 소재",
        "릴렉스 핏",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 301,
      name: "루즈핏 카펜터 유틸리티 데님 팬츠",
      category: "Denim",
      keywords: ['디키즈', '바지', '팬츠', '데님', '진', '청바지', '카펜터', '블루'],
      price: 105000,
      image: "/images/dickies/301.jpg",
      images: [
        "/images/dickies/301.jpg", // 정면
        "/images/dickies/301_2.jpg", // 측면
        "/images/dickies/301_3.jpg", // 디테일
      ],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Medium Blue"],
      colorHex: "#5b7fa6",
      description:
        "디키즈의 카펜터 스타일 루즈핏 데님 팬츠입니다. 넉넉한 실루엣과 다양한 유틸리티 포켓으로 작업 현장과 일상 모두에 실용적으로 활용할 수 있습니다.",
      features: [
        "루즈핏 — 넉넉한 허리·허벅지 공간",
        "카펜터 스타일 유틸리티 포켓",
        "미디엄 블루 워시 데님",
        "강화 스티칭 처리",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 302,
      name: "워시드 스네이크 더블니 팬츠",
      category: "Pants",
      keywords: ['디키즈', '바지', '팬츠', '블랙', '검정', '워크팬츠'],
      price: 119000,
      image: "/images/dickies/302.jpg",
      images: [
        "/images/dickies/302.jpg", // 정면
        "/images/dickies/302_2.jpg", // 측면
        "/images/dickies/302_3.jpg", // 디테일
      ],
      sizes: ["28", "30", "32", "34", "36"],
      colors: ["Black"],
      colorHex: "#1a1a1a",
      description:
        "스네이크 텍스처 워시 처리와 더블니 구조가 결합된 디키즈의 워크 팬츠입니다. 무릎 이중 강화로 내구성을 높이고, 독특한 워시드 블랙 컬러가 스트리트 감성을 더합니다.",
      features: [
        "워시드 스네이크 텍스처 가공",
        "더블니 — 무릎 이중 강화",
        "루즈핏 실루엣",
        "멀티 포켓 구성",
        "강화 스티칭 처리",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },
    {
      id: 303,
      name: "더블니 카펜터 데님 팬츠",
      category: "Denim",
      keywords: ['디키즈', '바지', '팬츠', '데님', '진', '청바지', '블랙', '검정', '카펜터'],
      price: 99000,
      image: "/images/dickies/303.jpg",
      images: [
        "/images/dickies/303.jpg", // 정면
        "/images/dickies/303_2.jpg", // 측면
        "/images/dickies/303_3.jpg", // 디테일
      ],
      sizes: ["28", "30", "32", "34"],
      colors: ["Black"],
      colorHex: "#1a1a1a",
      description:
        "카펜터 스타일과 더블니 구조가 결합된 디키즈의 블랙 데님 팬츠입니다. 무릎 이중 강화와 유틸리티 포켓으로 작업 현장에서의 실용성과 내구성을 극대화했습니다.",
      features: [
        "더블니 — 무릎 이중 강화",
        "카펜터 유틸리티 포켓",
        "블랙 데님 소재",
        "강화 스티칭 처리",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in Bangladesh"],
    },

    // ── 빈폴 상품 ──
    {
      id: 404,
      name: "헤리티지클럽 스트라이프 칼라넥 티셔츠",
      category: "T-shirt",
      keywords: ['빈폴', '티셔츠', '티', '상의', '네이비', '남색', '스트라이프', '폴로'],
      price: 159000,
      image: "/images/beanpole/404.jpg",
      images: [
        "/images/beanpole/404.jpg", // 정면
        "/images/beanpole/404_2.jpg", // 측면
        "/images/beanpole/404_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy"],
      colorHex: "#1e2d4e",
      description:
        "빈폴 헤리티지클럽 라인의 스트라이프 칼라넥 티셔츠입니다. 클래식한 네이비 컬러에 섬세한 스트라이프 패턴과 칼라넥 디테일이 품격 있는 캐주얼 룩을 연출합니다.",
      features: [
        "헤리티지클럽 스트라이프 패턴",
        "칼라넥 디자인",
        "고밀도 면 소재",
        "레귤러 핏",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in South Korea"],
    },
    {
      id: 405,
      name: "피케 칼라넥 반소매 티셔츠",
      category: "T-shirt",
      keywords: ['빈폴', '티셔츠', '티', '상의', '카키', '폴로', '반소매'],
      price: 149000,
      image: "/images/beanpole/405.jpg",
      images: [
        "/images/beanpole/405.jpg", // 정면
        "/images/beanpole/405_2.jpg", // 측면
        "/images/beanpole/405_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["Khaki"],
      colorHex: "#8a9a6a",
      description:
        "피케 소재로 제작된 빈폴의 칼라넥 반소매 티셔츠입니다. 피케 특유의 입체적인 텍스처와 칼라넥 디테일이 폴로 셔츠의 클래식한 분위기를 자아냅니다.",
      features: [
        "피케 소재 — 입체적인 텍스처",
        "칼라넥 디자인",
        "반소매 — 여름 착용 최적화",
        "레귤러 핏",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton Piqué", "Made in South Korea"],
    },
    {
      id: 406,
      name: "헤리티지클럽 라운드넥 반소매 티셔츠",
      category: "T-shirt",
      keywords: ['빈폴', '티셔츠', '티', '상의', '화이트', '흰색', '반소매'],
      price: 89000,
      image: "/images/beanpole/406.jpg",
      images: [
        "/images/beanpole/406.jpg", // 정면
        "/images/beanpole/406_2.jpg", // 측면
        "/images/beanpole/406_3.jpg", // 디테일
      ],
      sizes: ["S", "M", "L", "XL"],
      colors: ["White"],
      colorHex: "#f5f5f5",
      description:
        "빈폴 헤리티지클럽 라인의 라운드넥 반소매 티셔츠입니다. 깔끔한 화이트 컬러와 부드러운 소재가 어떤 스타일에도 잘 어울리는 기본 아이템입니다.",
      features: [
        "헤리티지클럽 라인",
        "라운드넥 디자인",
        "고밀도 면 소재",
        "레귤러 핏",
        "기계 세탁 가능",
      ],
      composition: ["100% Cotton", "Made in South Korea"],
    },
    {
      id: 401,
      name: "피그먼트 워싱 컴포트핏 치노 팬츠",
      category: "Pants",
      keywords: ['빈폴', '바지', '치노', '팬츠', '베이지'],
      price: 239000,
      image: "/images/beanpole/401.jpg",
      images: [
        "/images/beanpole/401.jpg", // 정면
        "/images/beanpole/401_2.jpg", // 측면
        "/images/beanpole/401_3.jpg", // 디테일
      ],
      sizes: ["29", "30", "31", "32", "33", "34", "36", "38"],
      colors: ["Beige"],
      colorHex: "#d4c5a9",
      description:
        "피그먼트 워싱 처리로 자연스러운 색감을 살린 빈폴의 컴포트핏 치노 팬츠입니다. 부드러운 베이지 컬러와 편안한 핏이 일상과 격식을 모두 소화합니다.",
      features: [
        "피그먼트 워싱 가공 — 자연스러운 색감",
        "컴포트핏 — 여유로운 착용감",
        "치노 소재",
        "앞면 슬랜트 포켓 + 뒷면 웰트 포켓",
        "기계 세탁 가능",
      ],
      composition: ["97% Cotton, 3% Elastane", "Made in Vietnam"],
    },
    {
      id: 402,
      name: "리넨 혼방 옥스포드 스탠다드핏 팬츠",
      category: "Pants",
      keywords: ['빈폴', '바지', '팬츠', '블랙', '검정', '리넨'],
      price: 219000,
      image: "/images/beanpole/402.jpg",
      images: [
        "/images/beanpole/402.jpg", // 정면
        "/images/beanpole/402_2.jpg", // 측면
        "/images/beanpole/402_3.jpg", // 디테일
      ],
      sizes: ["29", "30", "31", "32", "33", "34", "35", "36", "37", "38"],
      colors: ["Black"],
      colorHex: "#1a1a1a",
      description:
        "리넨 혼방 옥스포드 소재로 제작된 빈폴의 스탠다드핏 팬츠입니다. 통기성 좋은 리넨 소재와 클래식한 블랙 컬러가 계절을 가리지 않는 기본 아이템으로 활용됩니다.",
      features: [
        "리넨 혼방 옥스포드 소재 — 통기성 우수",
        "스탠다드핏 — 균형 잡힌 실루엣",
        "앞면 슬랜트 포켓 + 뒷면 웰트 포켓",
        "벨트 루프 포함",
        "드라이클리닝 권장",
      ],
      composition: ["55% Linen, 45% Cotton", "Made in South Korea"],
    },
    {
      id: 403,
      name: "가먼트다잉 세미와이드 팬츠",
      category: "Pants",
      keywords: ['빈폴', '바지', '팬츠', '네이비', '남색', '와이드'],
      price: 239000,
      image: "/images/beanpole/403.jpg",
      images: [
        "/images/beanpole/403.jpg", // 정면
        "/images/beanpole/403_2.jpg", // 측면
        "/images/beanpole/402_3.jpg", // 디테일
      ],
      sizes: ["30", "32", "34", "36"],
      colors: ["Navy"],
      colorHex: "#1e2d4e",
      description:
        "가먼트 다잉 공법으로 옷 전체를 염색한 빈폴의 세미와이드 팬츠입니다. 깊이 있는 네이비 컬러와 여유로운 세미와이드 실루엣이 세련된 캐주얼 룩을 완성합니다.",
      features: [
        "가먼트 다잉 공법 — 깊이 있는 발색",
        "세미와이드 실루엣",
        "편안한 허리 밴드 구조",
        "앞면 포켓 + 뒷면 웰트 포켓",
        "드라이클리닝 권장",
      ],
      composition: ["100% Cotton", "Made in South Korea"],
    },
  ];
}
