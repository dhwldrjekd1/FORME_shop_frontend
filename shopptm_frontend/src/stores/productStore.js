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
    // 기존 1~6번 유지
    {
      id: 1,
      name: "Structured Wool Coat",
      category: "Outerwear",
      price: 890,
      image: "https://...",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Black", "Gray"],
    },
    // ... 기존 상품들 ...

    // ── 칼하트 브랜드 상품 ──
    {
      id: 101,
      name: "Duck Active Jacket",
      category: "Jacket / Blanket-Lined",
      price: 139.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJh0a-fRNfosnIubi5bRJb6In9WjKRDq82haU-yg9qNykuXujdgHtOxqP3Q3o6jopXfCzY7cX3nEDuz6pAkF9yuJHlMIy0KW5wItrJqwYmY210QlJwQ3UmXAyxRFbKgGG1SRaJeaaPMbIM1C_ecPFTEoEAwIH4hxHEXs9LnQziIVKx7lWV-uXgZ1yqkLXKq1DcAynxTkguC9KSScB-0ppGSN1VX2U7d-1PHgCMbuE2DddkH5eOb2YtT3yjNQZ_fwZ7gz6JEIuDPWXP",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Brown", "Black"],
    },
    {
      id: 102,
      name: "Hamilton Brown Canvas",
      category: "Jacket / Blanket-Lined",
      price: 159.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIvJ_ISIaMu3UMdNduLkR8TJCytfNDbz0SishE5jERltRz6KAi1QM4-MEn3W053MoofZLOigviph87KFRYH9JpdiaZz9U_HODC9wbBH_aIcuwgBkQSsWqLkG8AuA_DhRAH2eNtn5po346jEx8eSyXa15QT5BqINVOd6bmc44jLFNJboKhoE3T8ktpnOOYvZOkBI2Is11SS9dKehLgsh8Afp1P3h7lM08uwMzpI3y-Q-6F0ZYn2w-qsyl4QCsyRrNui-Cj9Dt9rEQ7H",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Brown"],
    },
    {
      id: 103,
      name: "Loose Fit Heavyweight T-Shirt",
      category: "T-Shirt / Heavyweight",
      price: 29.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC26J-EDLnuF_EmrRzkLm4Pot0fA3fZ3L5dKR4N-aZ2qI5Q7DFCn9A6cwxF8JJuv3zeSXHvlgzabS03LZHkU3WmCrf0CKibvZlKRyHkuzom6UHU-HDZXPB76hUw0YdVeyJE0IbHA-QrPB8upkO8Nferi0qE5oZ3AGRc5voT1fCLwo8gHF2UX9H-6XoYepZaMj5L9GYmIp4KYzdhN3HA4zfY4IaDWC2PPyyTc7113zTGMlN2O2BR8gXWVhw9epNTzt7o1sH7vcQmIGAC",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Black", "Navy", "Gray"],
    },
    {
      id: 104,
      name: "Acrylic Watch Hat",
      category: "Beanie / Knit",
      price: 19.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbM26gN61h0xIBm5qr_t13Y2u3i8CDsp_x6xDdaEHnhwNj-q_kXQS4mXOUeniJFUk2IOMn2EF4TMC5VWbwtyMTfPEy9kQvt9hNdHiEy8zFQJoM2bW-GyIwsKDiImTZz8QFSNU6Vmr92ds9jcKAPwYXuDtjvtZ4fbv5zSERE0pbKILMZYBAUXuJKO3f_lGgMbqJHorRTYpinjGFA4t9NabkPjbLiBLlXlBwpQYcE6Xxn9O-Bicp9v8ZwwojmNuwZ_KJg3Y6cYziI9V8",
      sizes: ["One Size"],
      colors: ["Black", "Brown", "Navy"],
    },
    {
      id: 105,
      name: "Double Knee Dungaree Pant",
      category: "Pants / Double Knee",
      price: 54.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpSxblon0k73oUuB2o3hK_wXEgpvQjGoHeX_73rBO2o6PnoiPPa3VJryY2dMnJO_X2gEmX9fZLqWoZbVFI2uU8ncGqevpeieL8NlgeMGGFsb6Jg8c0s0NFP_XSGY00FZ8127XBnZZrvXw4bcaObrYTVnrEBZmlLCeas4mOKy2MGM_MNbVYp1RU4MF3lX0yyYhJa4GzJMj_iYw8JHiK6k7XfjcVMfRed02E6bweBjN5hdngR_xKttKQkuJnvrkW1gGEJ8warY-hTSSd",
      sizes: ["30x30", "32x30", "32x32", "34x30", "34x32", "36x32"],
      colors: ["Brown", "Black"],
    },
    {
      id: 106,
      name: "Rugged Flex Relaxed Fit Jean",
      category: "Denim / Rugged Flex",
      price: 64.99,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZPcJ8w1KCJnBzU8bC5-0U42kwCph-vjTn4Iyd5xsNBmHrludFgBZmK3Jq6nasO3kTSjGlzutOI5DUdLLfp0tvn1YJw_FGJlZusW4bE6I3gTbRwIzKEXosM2wS15kKV5nuAoBaZjRrL8fD-mRlL9ckfSw8TNH2pSdeFygNuJqH_wLOrUox_jAtNakZpmAUitc194VvHWAHJO6TMeRTcDXMHxvC-O6KZl5PPm1TpIH-7xqoNVBBgtj_T1L7h4HB_rsp2ZQ8JGc_4M6B",
      sizes: ["30x30", "32x30", "32x32", "34x30", "34x32"],
      colors: ["Blue", "Black"],
    },

    // ── 리바이스 브랜드 상품 ──
    {
      id: 201,
      name: "501 Original Fit Jeans",
      category: "Denim / Straight",
      price: 79.5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJh0a-fRNfosnIubi5bRJb6In9WjKRDq82haU-yg9qNykuXujdgHtOxqP3Q3o6jopXfCzY7cX3nEDuz6pAkF9yuJHlMIy0KW5wItrJqwYmY210QlJwQ3UmXAyxRFbKgGG1SRaJeaaPMbIM1C_ecPFTEoEAwIH4hxHEXs9LnQziIVKx7lWV-uXgZ1yqkLXKq1DcAynxTkguC9KSScB-0ppGSN1VX2U7d-1PHgCMbuE2DddkH5eOb2YtT3yjNQZ_fwZ7gz6JEIuDPWXP",
      sizes: ["28x30", "30x30", "32x30", "32x32", "34x30", "34x32"],
      colors: ["Blue", "Black", "White"],
    },
    {
      id: 202,
      name: "Trucker Jacket",
      category: "Jacket / Denim",
      price: 89.5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIvJ_ISIaMu3UMdNduLkR8TJCytfNDbz0SishE5jERltRz6KAi1QM4-MEn3W053MoofZLOigviph87KFRYH9JpdiaZz9U_HODC9wbBH_aIcuwgBkQSsWqLkG8AuA_DhRAH2eNtn5po346jEx8eSyXa15QT5BqINVOd6bmc44jLFNJboKhoE3T8ktpnOOYvZOkBI2Is11SS9dKehLgsh8Afp1P3h7lM08uwMzpI3y-Q-6F0ZYn2w-qsyl4QCsyRrNui-Cj9Dt9rEQ7H",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
    },
    {
      id: 203,
      name: "512 Slim Taper Jeans",
      category: "Denim / Slim Taper",
      price: 69.5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC26J-EDLnuF_EmrRzkLm4Pot0fA3fZ3L5dKR4N-aZ2qI5Q7DFCn9A6cwxF8JJuv3zeSXHvlgzabS03LZHkU3WmCrf0CKibvZlKRyHkuzom6UHU-HDZXPB76hUw0YdVeyJE0IbHA-QrPB8upkO8Nferi0qE5oZ3AGRc5voT1fCLwo8gHF2UX9H-6XoYepZaMj5L9GYmIp4KYzdhN3HA4zfY4IaDWC2PPyyTc7113zTGMlN2O2BR8gXWVhw9epNTzt7o1sH7vcQmIGAC",
      sizes: ["28x30", "30x30", "32x30", "32x32", "34x32"],
      colors: ["Blue", "Black"],
    },
    {
      id: 204,
      name: "Graphic Tee",
      category: "T-Shirt / Graphic",
      price: 35.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbM26gN61h0xIBm5qr_t13Y2u3i8CDsp_x6xDdaEHnhwNj-q_kXQS4mXOUeniJFUk2IOMn2EF4TMC5VWbwtyMTfPEy9kQvt9hNdHiEy8zFQJoM2bW-GyIwsKDiImTZz8QFSNU6Vmr92ds9jcKAPwYXuDtjvtZ4fbv5zSERE0pbKILMZYBAUXuJKO3f_lGgMbqJHorRTYpinjGFA4t9NabkPjbLiBLlXlBwpQYcE6Xxn9O-Bicp9v8ZwwojmNuwZ_KJg3Y6cYziI9V8",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["White", "Gray", "Black"],
    },
    {
      id: 205,
      name: "Sherpa Hoodie",
      category: "Hoodie / Sherpa",
      price: 99.5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpSxblon0k73oUuB2o3hK_wXEgpvQjGoHeX_73rBO2o6PnoiPPa3VJryY2dMnJO_X2gEmX9fZLqWoZbVFI2uU8ncGqevpeieL8NlgeMGGFsb6Jg8c0s0NFP_XSGY00FZ8127XBnZZrvXw4bcaObrYTVnrEBZmlLCeas4mOKy2MGM_MNbVYp1RU4MF3lX0yyYhJa4GzJMj_iYw8JHiK6k7XfjcVMfRed02E6bweBjN5hdngR_xKttKQkuJnvrkW1gGEJ8warY-hTSSd",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Navy", "Gray"],
    },
    {
      id: 206,
      name: "White Tab Chinos",
      category: "Pants / Slim",
      price: 59.5,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZPcJ8w1KCJnBzU8bC5-0U42kwCph-vjTn4Iyd5xsNBmHrludFgBZmK3Jq6nasO3kTSjGlzutOI5DUdLLfp0tvn1YJw_FGJlZusW4bE6I3gTbRwIzKEXosM2wS15kKV5nuAoBaZjRrL8fD-mRlL9ckfSw8TNH2pSdeFygNuJqH_wLOrUox_jAtNakZpmAUitc194VvHWAHJO6TMeRTcDXMHxvC-O6KZl5PPm1TpIH-7xqoNVBBgtj_T1L7h4HB_rsp2ZQ8JGc_4M6B",
      sizes: ["28x30", "30x30", "32x30", "32x32", "34x32"],
      colors: ["Khaki", "Navy", "Black"],
    },

    // ── 디키즈 상품 ──
    {
      id: 301,
      name: "874 Work Pants",
      category: "Original Fit / Recycled Poly-Cotton",
      price: 75.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBJh0a-fRNfosnIubi5bRJb6In9WjKRDq82haU-yg9qNykuXujdgHtOxqP3Q3o6jopXfCzY7cX3nEDuz6pAkF9yuJHlMIy0KW5wItrJqwYmY210QlJwQ3UmXAyxRFbKgGG1SRaJeaaPMbIM1C_ecPFTEoEAwIH4hxHEXs9LnQziIVKx7lWV-uXgZ1yqkLXKq1DcAynxTkguC9KSScB-0ppGSN1VX2U7d-1PHgCMbuE2DddkH5eOb2YtT3yjNQZ_fwZ7gz6JEIuDPWXP",
      sizes: ["28x30", "30x30", "32x30", "32x32", "34x32"],
      colors: ["Khaki", "Black", "Navy"],
    },
    {
      id: 302,
      name: "Eisenhower Jacket",
      category: "Unlined / Industrial Canvas",
      price: 110.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDIvJ_ISIaMu3UMdNduLkR8TJCytfNDbz0SishE5jERltRz6KAi1QM4-MEn3W053MoofZLOigviph87KFRYH9JpdiaZz9U_HODC9wbBH_aIcuwgBkQSsWqLkG8AuA_DhRAH2eNtn5po346jEx8eSyXa15QT5BqINVOd6bmc44jLFNJboKhoE3T8ktpnOOYvZOkBI2Is11SS9dKehLgsh8Afp1P3h7lM08uwMzpI3y-Q-6F0ZYn2w-qsyl4QCsyRrNui-Cj9Dt9rEQ7H",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Khaki", "Black"],
    },
    {
      id: 303,
      name: "Logo T-Shirt",
      category: "Heavyweight Cotton / Heritage Fit",
      price: 35.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC26J-EDLnuF_EmrRzkLm4Pot0fA3fZ3L5dKR4N-aZ2qI5Q7DFCn9A6cwxF8JJuv3zeSXHvlgzabS03LZHkU3WmCrf0CKibvZlKRyHkuzom6UHU-HDZXPB76hUw0YdVeyJE0IbHA-QrPB8upkO8Nferi0qE5oZ3AGRc5voT1fCLwo8gHF2UX9H-6XoYepZaMj5L9GYmIp4KYzdhN3HA4zfY4IaDWC2PPyyTc7113zTGMlN2O2BR8gXWVhw9epNTzt7o1sH7vcQmIGAC",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["White", "Black", "Gray"],
    },
    {
      id: 304,
      name: "Logo Beanie",
      category: "Ribbed Knit / One Size",
      price: 25.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDbM26gN61h0xIBm5qr_t13Y2u3i8CDsp_x6xDdaEHnhwNj-q_kXQS4mXOUeniJFUk2IOMn2EF4TMC5VWbwtyMTfPEy9kQvt9hNdHiEy8zFQJoM2bW-GyIwsKDiImTZz8QFSNU6Vmr92ds9jcKAPwYXuDtjvtZ4fbv5zSERE0pbKILMZYBAUXuJKO3f_lGgMbqJHorRTYpinjGFA4t9NabkPjbLiBLlXlBwpQYcE6Xxn9O-Bicp9v8ZwwojmNuwZ_KJg3Y6cYziI9V8",
      sizes: ["One Size"],
      colors: ["Black", "Khaki", "Gray"],
    },
    {
      id: 305,
      name: "Bib Overalls",
      category: "Duck Canvas / Triple Stitched",
      price: 95.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCpSxblon0k73oUuB2o3hK_wXEgpvQjGoHeX_73rBO2o6PnoiPPa3VJryY2dMnJO_X2gEmX9fZLqWoZbVFI2uU8ncGqevpeieL8NlgeMGGFsb6Jg8c0s0NFP_XSGY00FZ8127XBnZZrvXw4bcaObrYTVnrEBZmlLCeas4mOKy2MGM_MNbVYp1RU4MF3lX0yyYhJa4GzJMj_iYw8JHiK6k7XfjcVMfRed02E6bweBjN5hdngR_xKttKQkuJnvrkW1gGEJ8warY-hTSSd",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Khaki", "Black"],
    },
    {
      id: 306,
      name: "Work Shirt",
      category: "Moisture Wicking / Flex Fabric",
      price: 55.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAZPcJ8w1KCJnBzU8bC5-0U42kwCph-vjTn4Iyd5xsNBmHrludFgBZmK3Jq6nasO3kTSjGlzutOI5DUdLLfp0tvn1YJw_FGJlZusW4bE6I3gTbRwIzKEXosM2wS15kKV5nuAoBaZjRrL8fD-mRlL9ckfSw8TNH2pSdeFygNuJqH_wLOrUox_jAtNakZpmAUitc194VvHWAHJO6TMeRTcDXMHxvC-O6KZl5PPm1TpIH-7xqoNVBBgtj_T1L7h4HB_rsp2ZQ8JGc_4M6B",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["Blue", "White", "Gray"],
    },

    // ── 빈폴 상품 ──
    {
      id: 401,
      name: "Double-Breasted Hopsack Blazer",
      category: "Midnight Navy",
      price: 545.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBNIA9uplg2GInu4gf82fhpLO6ZUmdl_RW8lROYR_ek3XU9E0lg51OIljjCP8Vc8buGXPQCqCHI2Vj68rc0GfrU7SAII7G6PrSZpealMDyVpqTFXNqim5YDZyXFvdh783QEGzQ6np7V8OqEDtyYjdyFl_89GFgDES0_1gK5CI4atAcmjX-fbsndx3pAg3IOFBxHrkTm1sUiEYqIdXVzHqIMIU5bC2Wq1ByWFytiSXAZ-jb6Os2XpQGEI2ZtY3Qg60fO2-AUOaEFKXzu",
      sizes: ["44", "46", "48", "50", "52"],
      colors: ["Navy"],
    },
    {
      id: 402,
      name: "Aran Isle Cable-Knit Sweater",
      category: "100% Merino Wool / Ecru",
      price: 320.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCYYoHchf3IbBxSiJwoW2n-Hccqo6bVlle8Th6eqX4dD5RHVFr5KnLCkOMB_oHxurIMfQ4amdg7Vt6UuKFJxytiEBE0-QK_Cz1HwtPKY8IQxDyv2UJ4B4CS1gYGrNEFYQtwIGmgedr-TzxTXl2VthFWnv2IfszW2Dgskt0yn_ZQDPOmiZHNznEm9xVAdIHQ_uAqO8aaHYKMriOQMtnJKDNvhg08oScJkebFw83L3U7K_CSzPEGwi6IotKRLe2jc0S-NJ1at6wjxWlqh",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Ecru", "Navy"],
    },
    {
      id: 403,
      name: "The Heritage Trench",
      category: "British Tan / Water Repellent",
      price: 750.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD5Z-Y2gk5dUFyjsimrnexDMKqYSYZR1IsCivXIvRjvvVmf3xTpMvLkVSdUyN1zgOQ6TdPthvlYiXa9TDSS0vBli--PjJrmAlq5PdPRZ7ePqYWFi1zWs9stJAIWdnshM0xPhNPBRlhqmBqFTzwsBhpv_kkRGP-6CXK_srYR4uKx8-osHY-5XKqefu4sDpOZRXIf1Bxgg4P06kIbiBSpwG3ZnziK-kng_ncNyMkGZri5MDs5JKETbLLn_tDk05bsNA1D1FlbuWEi76IN",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Tan", "Black"],
    },
    {
      id: 404,
      name: "University V-Neck Cardigan",
      category: "Deep Burgundy Cashmere",
      price: 425.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDzo4wQ1SN5ZV-v5xN2L6o07sT__yDe6rVzLTMsASLN-yq4K4VK186svjI9ggtKZn9n6YtCxO2n0CVWx7NMNMBIcS_ILKgkOfZ2yGxTy2zB2g5SvrWe4aWZ1C-8GgGN9IgMJnj7YkG2xJkHvVv7xu_m8NsQH68S0Ft__45OA8Gbe5VqnFbkdjpBjvkQRi5vc1VThCvr_cmrlirGeMjNidPVbEOmS6XhEcw4hnXM1Zm2U6CyOJP8RUTq3EKYvOIlE3SjvrsZ3X0PUCo_",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Burgundy", "Navy"],
    },
    {
      id: 405,
      name: "Button-Down Oxford",
      category: "White Pima Cotton",
      price: 145.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA4ZDKCnc3PWD5Y4kmJLWRu-lh5shUJN8GkFKkWI8vZGypqMSH18ZCgxWasz6X-N26L7fP4AuBrZ8zhFbreR0-1lMSi_RqU5ahC5uOJlc6NEulovqwnd-E-O6N9rDvqeQ33TfyCBfMxUoFnh9GfKuYnIYRtIiIbrNvHyF3o6pzIFI51yZlFIXXAFn3IFMi1rQrpCz8XqG1FYC2C5oQanQqGH9usf-dbq6ylfqaeczn86ha8iRRX81qvBQ_WzIQyvL5KOvPil6ptA9VS",
      sizes: ["S", "M", "L", "XL", "2XL"],
      colors: ["White", "Blue"],
    },
    {
      id: 406,
      name: "Technical Waxed Field Coat",
      category: "Hunter Green / Weatherproof",
      price: 680.0,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBN7LpZE4vgS-hDz3JMVhMa6a5_iueEQ_rggqKTjgQtOtcN6mxNM3WNMKTKr2TAXW5ZAAovd4gV4QM2mgNBVpm3Xz-HxuhbOc97sBZlmAgPVbq1xMAZ3OnvbrnHnhvJfE4WTh4LgILpHdC8fGgprGq7q6pc0-2qdXLspae0FxSBF_43UpQUWjw8wASaFI7wBwU9lWlxIy7nzC0zY3Q7Vy3PGom0fegk8c-__JgtXSVgzMkLuqp4VHGvI8YkQxIiVIg9K9hj0mdOL2rqP",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Green", "Brown"],
    },
  ];
}
