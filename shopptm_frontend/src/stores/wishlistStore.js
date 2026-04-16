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

  // DB에서 찜 목록 로드
  async function fetchWishlist() {
    const user = getUser();
    if (!user?.id) return;
    try {
      const data = await api.get(`/members/${user.id}/wishlist`);
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

  return { items, count, isWished, fetchWishlist, toggle, remove };
});
