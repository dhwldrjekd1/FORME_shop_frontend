import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useCartStore = defineStore("cart", () => {
  // ── state ──────────────────────────────────
  // 장바구니 아이템 배열
  // 각 아이템 구조: { id, productId, name, price, image, size, color, quantity }
  const items = ref([]);

  // ── getters ────────────────────────────────
  // 전체 수량 합계 (헤더 배지 숫자에 사용)
  // reduce: 배열을 순회하며 누적값 계산
  const totalCount = computed(() =>
    items.value.reduce((sum, item) => sum + item.quantity, 0),
  );

  // 전체 금액 합계 (가격 × 수량 합산)
  const totalPrice = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
  );

  // ── actions ────────────────────────────────
  // 장바구니에 상품 추가
  function addItem(product) {
    // 같은 상품 + 같은 사이즈 + 같은 색상이면 수량만 증가
    const existing = items.value.find(
      (item) =>
        item.productId === product.productId &&
        item.size === product.size &&
        item.color === product.color,
    );

    if (existing) {
      existing.quantity += product.quantity ?? 1;
    } else {
      // 새 아이템 추가
      // Date.now(): 임시 고유 ID (API 연결 시 서버 ID로 교체)
      items.value.push({
        id: Date.now(),
        ...product,
        quantity: product.quantity ?? 1,
      });
    }
  }

  // 장바구니에서 특정 아이템 제거
  // filter: id 가 다른 것만 남김 = 해당 아이템 삭제
  function removeItem(itemId) {
    items.value = items.value.filter((item) => item.id !== itemId);
  }

  // 특정 아이템 수량 변경
  function updateQuantity(itemId, quantity) {
    const item = items.value.find((item) => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
  }

  // 장바구니 전체 비우기 (결제 완료 후 호출)
  function clearCart() {
    items.value = [];
  }

  return {
    items,
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  };
});
