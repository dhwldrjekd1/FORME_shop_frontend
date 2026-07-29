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

  // 응답이 도착한 순서가 아니라 "가장 나중에 보낸 요청"만 반영하기 위한 순번.
  // 로그아웃 후 곧바로 다른 계정으로 로그인하는 경우처럼 fetchCart가 짧은 시간에
  // 여러 번 호출되면, 먼저 보낸 요청(이전 계정 것)이 나중에 응답이 와서
  // 최신 상태를 덮어쓸 수 있어 이를 방지한다.
  let fetchSeq = 0;

  // DB에서 장바구니 로드
  async function fetchCart() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (!user?.id) return;
    const seq = ++fetchSeq;
    try {
      const data = await api.get(`/members/${user.id}/cart`);
      if (seq !== fetchSeq) return; // 더 최신 요청이 이미 나가있으면 이 응답은 버림
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

  // 장바구니 비우기 (DB 연동 - 서버에 저장된 장바구니 자체를 삭제)
  async function clearCart() {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.id) {
      try { await api.delete(`/members/${user.id}/cart`); } catch {}
    }
    items.value = [];
  }

  // 로그아웃 시 화면 상태만 초기화 (서버의 장바구니 데이터는 그대로 유지 - 다음 로그인 때 다시 보여야 함)
  function resetLocal() {
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
    resetLocal,
  };
});
