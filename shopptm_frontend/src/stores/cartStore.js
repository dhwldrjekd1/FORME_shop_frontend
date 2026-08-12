import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

export const useCartStore = defineStore("cart", () => {
  const items = ref([]);

  // localStorage의 user 값이 손상돼 있어도(수동 편집, 쓰기 중단 등) JSON.parse가
  // 던지지 않고 조용히 비로그인으로 처리되도록 함
  function getUser() {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  }

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
    const user = getUser();
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
  // 로그인 상태에서 서버 저장이 실패하면(예: 더블클릭으로 인한 순간적인 충돌, 네트워크 오류)
  // 조용히 삼키고 로컬에만 담는 대신 그대로 던진다 — 그렇지 않으면 화면은 "담김"으로
  // 보이는데 서버 장바구니는 그대로라서, 그 상태로 결제까지 가면 실제로는 안 담긴
  // 상품이 주문에 끼어들 수 있었음. 호출하는 쪽(DetailView 등)에서 실패를 안내해야 함.
  async function addItem(product) {
    const user = getUser();
    if (user?.id) {
      await api.post(`/members/${user.id}/cart`, {
        productId: product.productId,
        quantity: product.quantity ?? 1,
        size: product.size || '',
      });
      await fetchCart();
      return;
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

  // 장바구니 삭제 (DB 연동) — 서버 삭제가 성공했을 때만 화면에서도 지운다
  // (실패해도 지워버리면 화면엔 없는데 서버엔 남아있는 상태로 어긋날 수 있었음)
  async function removeItem(itemId) {
    try {
      await api.delete(`/cart/${itemId}`);
    } catch {
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    items.value = items.value.filter((item) => item.id !== itemId);
  }

  // 수량 변경 (DB 연동) — 서버 반영이 성공했을 때만 화면 수량도 바꾼다
  async function updateQuantity(itemId, quantity) {
    if (quantity < 1) return;
    try {
      await api.patch(`/cart/${itemId}`, { quantity });
    } catch {
      alert('수량 변경에 실패했습니다. 다시 시도해주세요.');
      return;
    }
    const item = items.value.find((item) => item.id === itemId);
    if (item) item.quantity = quantity;
  }

  // 장바구니 비우기 (DB 연동 - 서버에 저장된 장바구니 자체를 삭제)
  // 주문 완료 직후 호출되는 경로라, 여기서 실패해도(이미 결제는 끝난 뒤이므로) 사용자에게
  // 에러를 보여주기보다 화면 장바구니만 비워서 흐름을 막지 않는다.
  async function clearCart() {
    const user = getUser();
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
