import { defineStore } from "pinia";
import { ref, computed } from "vue";
import api from "@/api";

const TOKEN_KEY = "token";
const USER_KEY = "user";

export const useAuthStore = defineStore("auth", () => {
  // ── state ──────────────────────────────────
  // 페이지 새로고침 시에도 로그인 상태 유지하려고 localStorage 에서 복원
  const user = ref(loadStoredUser());
  const token = ref(loadStoredToken());

  // ── getters ────────────────────────────────
  const isLoggedIn = computed(() => !!token.value);
  const userName = computed(() => user.value?.name ?? "");

  // ── actions ────────────────────────────────
  // 로그인 — Spring Boot POST /api/login
  // 응답: { token, id, email, name, role, grade }
  async function login(credentials) {
    const res = await api.post("/login", {
      email: credentials.email,
      password: credentials.password,
    });

    const jwt = res?.token;
    if (!jwt) throw new Error("토큰이 응답에 없습니다.");

    token.value = jwt;
    localStorage.setItem(TOKEN_KEY, jwt);

    // 응답에 회원 정보 포함 (id, email, name, role, grade)
    const fullUser = {
      id: res.id,
      email: res.email ?? credentials.email,
      name: res.name ?? credentials.email.split("@")[0],
      role: res.role ?? "ROLE_USER",
      grade: res.grade ?? "BRONZE",
    };
    user.value = fullUser;
    localStorage.setItem(USER_KEY, JSON.stringify(fullUser));
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
    });

    // 가입 후 자동 로그인 (서버는 가입에서 토큰을 안 주므로 별도 login 호출)
    await login({ email: payload.email, password: payload.password });
    return member;
  }

  // 로그아웃: 토큰/유저 모두 제거
  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }

  return {
    user,
    token,
    isLoggedIn,
    userName,
    login,
    register,
    logout,
  };
});

// ── localStorage helpers ─────────────────────
function loadStoredToken() {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
}

function loadStoredUser() {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
