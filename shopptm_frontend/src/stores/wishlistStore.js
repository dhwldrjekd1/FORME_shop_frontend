import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

export const useWishlistStore = defineStore("wishlist", () => {
  const items = ref([]);
  const count = computed(() => items.value.length);

  function getUser() {
    try { return JSON.parse(localStorage.getItem("user")); } catch { return null; }
  }

  function isWished(productId) {
    return items.value.some((i) => i.id === productId);
  }

  // 응답이 도착한 순서가 아니라 "가장 나중에 보낸 요청"만 반영하기 위한 순번
  // (cartStore.fetchCart와 동일한 이유 - 로그아웃 직후 재로그인 시 이전 계정 응답이
  // 늦게 도착해 새 계정 상태를 덮어쓰는 것을 방지)
  let fetchSeq = 0;

  // DB에서 찜 목록 로드
  async function fetchWishlist() {
    const user = getUser();
    if (!user?.id) return;
    const seq = ++fetchSeq;
    try {
      const data = await api.get(`/members/${user.id}/wishlist`);
      if (seq !== fetchSeq) return; // 더 최신 요청이 이미 나가있으면 이 응답은 버림
      items.value = (data || []).map(w => ({
        id: w.productId,
        name: w.productName || '',
        price: w.productPrice || 0,
        image: w.productImageUrl || '',
        category: w.category || '',
        brand: w.brand || '',
        discountRate: w.discountRate || null,
      }));
    } catch {}
  }

  // 찜 토글 (DB 연동)
  async function toggle(product) {
    const user = getUser();
    const productId = product.id || product.productId;

    if (isWished(productId)) {
      // 삭제
      if (user?.id) {
        try { await api.delete(`/members/${user.id}/wishlist/${productId}`); } catch {}
      }
      items.value = items.value.filter(i => i.id !== productId);
    } else {
      // 추가
      if (user?.id) {
        try {
          await api.post(`/members/${user.id}/wishlist`, { productId });
        } catch {}
      }
      items.value.push({
        id: productId,
        name: product.name || '',
        price: product.price || 0,
        image: product.image || product.imageUrl || '',
        category: product.category || '',
        brand: product.brand || '',
      });
    }
  }

  // 찜 삭제
  async function remove(productId) {
    const user = getUser();
    if (user?.id) {
      try { await api.delete(`/members/${user.id}/wishlist/${productId}`); } catch {}
    }
    items.value = items.value.filter((i) => i.id !== productId);
  }

  // 로그아웃 시 화면 상태만 초기화 (서버의 찜 목록은 그대로 유지 - 다음 로그인 때 다시 보여야 함)
  function resetLocal() {
    items.value = [];
  }

  return { items, count, isWished, fetchWishlist, toggle, remove, resetLocal };
});
