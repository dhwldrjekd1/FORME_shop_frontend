import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

const USER_KEY = "user";

export const useAuthStore = defineStore("auth", () => {
  // ── state ──────────────────────────────────
  // 페이지 새로고침 시에도 로그인 상태 유지하려고 localStorage 에서 복원
  // 실제 인증은 httpOnly 쿠키(auth_token)가 담당 — 여기 저장하는 user는
  // 화면 표시용(이름/등급 등)일 뿐, 자바스크립트로 읽을 수 있는 민감 정보는 아니다.
  const user = ref(loadStoredUser());

  // ── getters ────────────────────────────────
  const isLoggedIn = computed(() => !!user.value);
  const userName = computed(() => user.value?.name ?? "");
  // 화면에서 관리자 메뉴를 보여줄지 정할 때만 쓰는 값 — user는 localStorage에서
  // 복원되는 화면 표시용 값이라 조작 가능하므로, 실제 /admin 접근 권한 검증은
  // 여기가 아니라 router.beforeEach(requiresAdmin)에서 매번 서버로 재확인한다.
  const isAdmin = computed(() => user.value?.role === "ROLE_ADMIN");

  // ── actions ────────────────────────────────
  // 로그인 — Spring Boot POST /api/login
  // 응답: { id, email, name, role, grade, ... } — 토큰은 응답 바디에 없고
  // 서버가 httpOnly 쿠키로 내려준다 (자바스크립트는 그 값을 볼 수 없음)
  async function login(credentials) {
    const res = await api.post("/login", {
      email: credentials.email,
      password: credentials.password,
    });

    // 응답에 회원 정보 포함 (id, email, name, role, grade)
    const fullUser = {
      id: res.id,
      email: res.email ?? credentials.email,
      name: res.name ?? credentials.email.split("@")[0],
      role: res.role ?? "ROLE_USER",
      grade: res.grade ?? "BRONZE",
      height: res.height ?? null,
      weight: res.weight ?? null,
      fit: res.fit ?? "standard",
    };
    user.value = fullUser;
    localStorage.setItem(USER_KEY, JSON.stringify(fullUser));

    // 로그인 후 장바구니/찜 DB에서 로드 - await 없이 fire-and-forget으로 두면
    // 로그인 직후 바로 이동하는 화면(장바구니 등)이 반영 전 상태를 보여줄 수 있고,
    // 빠르게 로그아웃 후 재로그인하는 경우 이전 호출의 응답이 나중에 와서
    // 새 계정 상태를 덮어쓸 위험도 있어 완료를 기다린다
    try {
      const { useCartStore } = await import("@/stores/cartStore");
      const { useWishlistStore } = await import("@/stores/wishlistStore");
      await Promise.all([useCartStore().fetchCart(), useWishlistStore().fetchWishlist()]);
    } catch {}
  }

  // 회원가입 — Spring Boot POST /api/register
  // 응답: MemberResponseDto (id, email, name, ...)
  async function register(payload) {
    const member = await api.post("/register", {
      email: payload.email,
      password: payload.password,
      name: payload.name,
      phone: payload.phone,
      address: payload.address,
      height: payload.height,
      weight: payload.weight,
      fit: payload.fit,
    });

    // 가입 후 자동 로그인 (서버는 가입에서 토큰을 안 주므로 별도 login 호출)
    await login({ email: payload.email, password: payload.password });
    return member;
  }

  // 로그아웃: 서버에 토큰 폐기 + 쿠키 삭제 요청 후 화면 표시용 유저 정보도 제거
  // 서버 요청이 실패(네트워크 오류 등)하더라도 클라이언트 쪽 로그인 상태는 항상 정리한다
  async function logout() {
    try {
      await api.post("/logout");
    } catch {}
    user.value = null;
    localStorage.removeItem(USER_KEY);

    // 장바구니/찜 화면 상태도 함께 정리 - 안 하면 같은 브라우저에서 다음 사람이
    // 로그인하기 전까지(또는 비로그인 상태에서도) 이전 사용자의 목록이 그대로 보임
    try {
      const { useCartStore } = await import("@/stores/cartStore");
      const { useWishlistStore } = await import("@/stores/wishlistStore");
      useCartStore().resetLocal();
      useWishlistStore().resetLocal();
    } catch {}
  }

  // 새로고침 시 localStorage에 복원된 로그인 상태를 그대로 믿지 않고, 서버 세션이
  // 실제로 아직 유효한지 확인한다 - 쿠키가 만료되거나 로그아웃으로 무효화된 뒤에도
  // 화면은 계속 로그인된 것처럼 보이다가, 실제 API 호출을 할 때가 돼서야 401로
  // 드러나는 것을 막기 위함. 401은 여기서 조용히 로컬 상태만 정리하고, 전역 401
  // 핸들러의 강제 이동은 건너뛴다(단순히 페이지를 새로고침했을 뿐인데 로그인
  // 화면으로 튕겨나가면 안 됨).
  // 여러 화면(main.js 부팅, CartView, PaymentView 등)이 페이지 진입 때마다 각자
  // verifySession()을 부를 수 있어, 응답이 뒤섞여 도착하면(느린 첫 요청이 나중에 와서)
  // 오래된 응답이 최신 상태를 덮어쓸 수 있음 — cartStore.fetchCart와 동일한 이유로
  // "가장 나중에 보낸 요청"만 반영한다.
  let verifySeq = 0;

  async function verifySession() {
    if (!user.value?.id) return;
    const seq = ++verifySeq;
    try {
      const me = await api.get(`/members/${user.value.id}`, { skipAuthRedirect: true });
      if (seq !== verifySeq) return; // 더 최신 요청이 이미 나가있으면 이 응답은 버림
      user.value = { ...user.value, ...me };
      localStorage.setItem(USER_KEY, JSON.stringify(user.value));
    } catch (e) {
      if (seq !== verifySeq) return;
      if (e.status === 401 || e.status === 403) {
        user.value = null;
        localStorage.removeItem(USER_KEY);
      }
      // 그 외(네트워크 오류 등)는 세션 만료와 구분할 수 없으므로 로컬 상태를 유지
    }
  }

  return {
    user,
    isLoggedIn,
    isAdmin,
    userName,
    login,
    register,
    logout,
    verifySession,
  };
});

// ── localStorage helpers ─────────────────────
function loadStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
