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

    // 로그인 후 장바구니/찜 DB에서 로드
    try {
      const { useCartStore } = await import("@/stores/cartStore");
      const { useWishlistStore } = await import("@/stores/wishlistStore");
      useCartStore().fetchCart();
      useWishlistStore().fetchWishlist();
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
  }

  return {
    user,
    isLoggedIn,
    userName,
    login,
    register,
    logout,
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
