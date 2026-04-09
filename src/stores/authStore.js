import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useAuthStore = defineStore("auth", () => {
  // ── state ──────────────────────────────────
  // 로그인한 유저 정보 저장
  // null = 비로그인 상태
  const user = ref(null);

  // ── getters ────────────────────────────────
  // user 가 null 이 아니면 true (로그인 상태)
  // 라우터 가드, 헤더 아이콘 등에서 사용
  const isLoggedIn = computed(() => !!user.value);

  // 헤더 등에서 유저 이름 표시할 때 사용
  // user 가 null 이면 빈 문자열 반환 (?? 연산자)
  const userName = computed(() => user.value?.name ?? "");

  // ── actions ────────────────────────────────
  // 로그인 처리
  // Spring Boot 연결 시 API 응답값을 여기에 넣으면 됨
  function login(userData) {
    user.value = userData;
  }

  // 로그아웃: user 를 null 로 초기화
  function logout() {
    user.value = null;
  }

  return {
    user,
    isLoggedIn,
    userName,
    login,
    logout,
  };
});
