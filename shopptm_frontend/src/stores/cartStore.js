import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  // DB에서 장바구니 로드
  async function fetchCart() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.id) return;
    try {
      const data = await api.get(`/members/${user.id}/cart`);
      items.value = (data || []).map(c => ({
        id: c.id,
        productId: c.productId,
        name: c.productName || c.name || '',
        price: c.productPrice ?? c.price ?? c.unitPrice ?? 0,
        image: c.productImageUrl || c.image || '',
        size: c.size || '',
        color: c.color || '',
        quantity: c.quantity || 1,
      }));
    } catch {
      // API 실패 시 로컬 유지
    }
  }

  // 장바구니 추가 (DB 연동)
  async function addItem(product) {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.id) {
      try {
        await api.post(`/members/${user.id}/cart`, {
          productId: product.productId,
          quantity: product.quantity ?? 1,
          size: product.size || '',
        });
        await fetchCart();
        return;
      } catch {}
    }
    // 비로그인 시 로컬
    const existing = items.value.find(
      (item) => item.productId === product.productId && item.size === product.size,
    );
    if (existing) {
      existing.quantity += product.quantity ?? 1;
    } else {
      items.value.push({ id: Date.now(), ...product, quantity: product.quantity ?? 1 });
    }
  }

  // 장바구니 삭제 (DB 연동)
  async function removeItem(itemId) {
    try {
      await api.delete(`/cart/${itemId}`);
    } catch {}
    items.value = items.value.filter((item) => item.id !== itemId);
  }

  // 수량 변경 (DB 연동)
  async function updateQuantity(itemId, quantity) {
    if (quantity < 1) return;
    try {
      await api.patch(`/cart/${itemId}`, { quantity });
    } catch {}
    const item = items.value.find((item) => item.id === itemId);
    if (item) item.quantity = quantity;
  }

  // 장바구니 비우기 (DB 연동)
  async function clearCart() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.id) {
      try { await api.delete(`/members/${user.id}/cart`); } catch {}
    }
    items.value = [];
  }

  return {
    items,
    totalCount,
    totalPrice,
    fetchCart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
});
