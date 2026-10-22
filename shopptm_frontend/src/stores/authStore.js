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
    await refetchCartAndWishlist();
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

  // 장바구니/찜 스토어를 동적 import하는 패턴이 로그아웃/세션정리/다른탭 동기화 등
  // 여러 곳에서 반복돼, 매번 복사해서 쓰면 그중 하나를 빠뜨리는 실수가 나기 쉽다
  // (이번에 고친 버그들이 정확히 그런 식으로 생겼었다 — 교차검증에서 지적). 두 스토어에
  // 공통으로 할 일(비우기/다시 불러오기)을 여기 한 곳에만 모아 전부 이걸 쓰게 한다.
  async function resetCartAndWishlist() {
    try {
      const { useCartStore } = await import("@/stores/cartStore");
      const { useWishlistStore } = await import("@/stores/wishlistStore");
      useCartStore().resetLocal();
      useWishlistStore().resetLocal();
    } catch {}
  }

  async function refetchCartAndWishlist() {
    try {
      const { useCartStore } = await import("@/stores/cartStore");
      const { useWishlistStore } = await import("@/stores/wishlistStore");
      await Promise.all([useCartStore().fetchCart(), useWishlistStore().fetchWishlist()]);
    } catch {}
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
    await resetCartAndWishlist();
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

  // 서버가 세션을 더 이상 인정하지 않을 때(401/403) 로컬 상태를 정리하는 공통 로직.
  // verifySession과 router.beforeEach(requiresAdmin) 양쪽에서 동일하게 써서,
  // 저장 키(USER_KEY)나 정리 범위가 두 곳에서 따로 관리되다 어긋나는 것을 막는다.
  // logout()과 동일하게 장바구니/찜도 함께 정리한다 — 원래 이 함수는 로그인 정보만
  // 지우고 장바구니/찜은 그대로 둬서, 세션이 서버에서 이미 끊긴 뒤에도(비밀번호 변경,
  // 강제 로그아웃, 쿠키 만료 등) 화면엔 이전 사용자의 장바구니/찜이 계속 남아있고, 그
  // 상태에서 수량 변경/삭제를 하면 이미 user가 지워진 뒤라 비로그인으로 판단돼 로컬
  // 배열만 조작되고 서버엔 반영 안 되는("조작이 된 것처럼 보이지만 실제론 안 됨")
  // 상태가 될 수 있었다(교차검증에서 발견).
  async function clearSession() {
    user.value = null;
    localStorage.removeItem(USER_KEY);
    await resetCartAndWishlist();
  }

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
        await clearSession();
      }
      // 그 외(네트워크 오류 등)는 세션 만료와 구분할 수 없으므로 로컬 상태를 유지
    }
  }

  // 같은 브라우저의 다른 탭에서 로그인/로그아웃하면 이 탭의 상태도 맞춰준다. 지금까지는
  // 이런 동기화 장치가 전혀 없어서, 탭 A에서 로그아웃해도 탭 B는 계속 로그인된 것처럼
  // 보이고, 탭 B에서 그 상태로 장바구니에 담으면 authStore.user는 아직 있지만 서버 쪽
  // 세션은 이미 끊겨있어 다음 API 호출에서야 뒤늦게 꼬이는 문제가 있었다(교차검증에서
  // 발견). `storage` 이벤트는 "이 변경을 일으킨 그 탭 자신"에는 안 뜨고 다른 탭에서만
  // 뜨므로, 로그인/로그아웃을 실행한 탭 자신의 동작과 겹쳐 중복 처리될 걱정은 없다.
  //
  // storageSeq: 로그아웃 직후 곧바로 다른 계정으로 로그인하는 것처럼 두 이벤트가 거의
  // 동시에 연달아 오면, 먼저 온 로그아웃 이벤트의 "비우기"가 비동기(동적 import)로 늦게
  // 끝나면서 나중에 온 로그인 이벤트가 이미 받아온 새 계정의 장바구니/찜을 도로 지워버릴
  // 수 있다 — cartStore.fetchCart의 fetchSeq와 동일한 이유로, 그 사이 더 최신 이벤트가
  // 왔으면 자신의 "비우기"를 적용하지 않고 조용히 포기한다(교차검증에서 발견).
  let storageSeq = 0;
  window.addEventListener("storage", (e) => {
    // localStorage.clear()(지금 코드베이스 어디서도 안 쓰지만 브라우저 확장 등 외부에서
    // 호출될 수 있음)는 key가 null로 오는데, USER_KEY만 걸러내면 이 경우를 놓쳐 로그아웃
    // 처리가 안 된다 — null도 "user 포함 전체가 지워진 경우"로 같이 처리한다.
    if (e.key !== USER_KEY && e.key !== null) return;

    const seq = ++storageSeq;

    if (!e.newValue) {
      // 다른 탭에서 로그아웃(또는 세션 무효화로 clearSession, 혹은 localStorage.clear())됨
      // — 이 탭도 동일하게 정리. 이미 비로그인 상태면 중복 정리를 피하려고 다시 부르지 않는다.
      if (!user.value) return;
      user.value = null;
      // resetCartAndWishlist()를 그대로 쓰지 않는 이유: 그 함수는 동적 import가 끝나는
      // 즉시 resetLocal()을 호출해버려서, "끝난 뒤에" seq를 확인해도 이미 지운 뒤라
      // 늦다 — import가 끝나는 바로 그 지점에서, 실제로 지우기 전에 먼저 확인해야 한다.
      Promise.all([
        import("@/stores/cartStore"),
        import("@/stores/wishlistStore"),
      ]).then(([{ useCartStore }, { useWishlistStore }]) => {
        if (seq !== storageSeq) return; // 그 사이 더 최신 이벤트가 왔으면 이 비우기는 포기
        useCartStore().resetLocal();
        useWishlistStore().resetLocal();
      }).catch(() => {});
      return;
    }

    let incoming;
    try { incoming = JSON.parse(e.newValue); } catch { return; }

    // 다른 탭에서 새로 로그인했거나 계정이 바뀐 경우에만 장바구니/찜을 새로 불러온다 —
    // verifySession()이 등급 등 세부정보만 갱신해 localStorage를 다시 쓰는 경우(같은
    // 계정)까지 매번 다시 불러오면 낭비이므로, 회원 id가 실제로 달라졌을 때만 다시 불러온다.
    const accountChanged = user.value?.id !== incoming?.id;
    user.value = incoming;
    if (accountChanged) refetchCartAndWishlist();
  });

  return {
    user,
    isLoggedIn,
    isAdmin,
    userName,
    login,
    register,
    logout,
    verifySession,
    clearSession,
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
