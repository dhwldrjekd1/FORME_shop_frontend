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

  // 하트를 빠르게 두 번 클릭하는 것처럼 같은 상품에 대한 toggle이 겹쳐 들어오면,
  // 둘 다 isWished()를 응답 오기 전(아직 안 바뀐) 상태로 판단해서 둘 다 "추가"로
  // 처리되거나 둘 다 "삭제"로 처리돼 서버 상태와 화면이 어긋날 수 있어 진행중인
  // productId는 무시한다.
  const pendingIds = new Set();

  // 찜 토글 (DB 연동)
  async function toggle(product) {
    const productId = product.id || product.productId;
    if (pendingIds.has(productId)) return;
    pendingIds.add(productId);

    try {
      const user = getUser();
      if (isWished(productId)) {
        // 삭제 — 서버 삭제가 성공했을 때만(또는 비로그인) 화면에서도 지운다
        if (user?.id) await api.delete(`/members/${user.id}/wishlist/${productId}`);
        items.value = items.value.filter(i => i.id !== productId);
      } else {
        // 추가 — 서버 저장이 성공했을 때만(또는 비로그인) 화면에도 반영한다
        if (user?.id) await api.post(`/members/${user.id}/wishlist`, { productId });
        items.value.push({
          id: productId,
          name: product.name || '',
          price: product.price || 0,
          image: product.image || product.imageUrl || '',
          category: product.category || '',
          brand: product.brand || '',
        });
      }
    } catch {
      // 실패하면 화면 상태를 바꾸지 않는다 — 하트가 눌린 것처럼 보였다가 서버엔
      // 반영 안 되는 것(다음 로그인 때 다시 어긋나 보이는 것)을 막기 위함.
      // 다만 아무 반응도 없으면 사용자가 실패한 줄도 모르니 안내는 띄운다.
      alert('찜하기에 실패했습니다. 다시 시도해주세요.');
    } finally {
      pendingIds.delete(productId);
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
  // pendingIds도 같이 비움 — 안 그러면 로그아웃 시점에 아직 응답 안 온 요청의 productId가
  // 남아있다가, 곧바로 로그인한 다른 계정이 같은 상품을 클릭해도 무시돼버릴 수 있음
  function resetLocal() {
    items.value = [];
    pendingIds.clear();
  }

  return { items, count, isWished, fetchWishlist, toggle, remove, resetLocal };
});
