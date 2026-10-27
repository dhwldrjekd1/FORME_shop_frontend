document.addEventListener("contextmenu", e => e.preventDefault());

import { createApp } from "vue";
import { createPinia } from "pinia";

import { isNavigationFailure, NavigationFailureType } from "vue-router";

import App from "./App.vue";
import router from "./router";

// 전역 CSS 불러오기
import "./assets/styles/main.css";

const app = createApp(App);

// 전역 에러처리 — 컴포넌트 렌더링/라이프사이클 중 예외가 그대로 새어나가면 화면이 아무
// 안내 없이 멈춰버리던 문제(교차검증에서 발견). Vue가 못 잡은 예외(렌더링 중 TypeError 등)는
// 컴포넌트 트리가 깨졌을 수 있어 새로고침 안내 오버레이를 띄우고, 처리 안 된 Promise
// rejection(흔히 깜빡한 .catch 누락)은 화면 자체는 멀쩡한 경우가 많아 콘솔에만 남긴다.
import { reportGlobalError } from "./utils/globalError";
// info가 "render function"/"setup function"/"component update"면 컴포넌트 트리 자체가
// 깨졌을 수 있는 경우라 새로고침 안내 오버레이를 띄우고, 그 외(native/component 이벤트
// 핸들러, watcher 콜백, 생명주기 훅 등)는 화면 자체는 대부분 멀쩡하게 남아있는 경우라
// 콘솔에만 남긴다 — 사소하고 복구 가능한 에러 하나로 화면 전체를 막는 건 과함(교차검증에서 발견).
const RENDER_BREAKING_INFO = ["render function", "setup function", "component update"];
app.config.errorHandler = (err, instance, info) => {
  reportGlobalError(err, `vue: ${info}`, { blocking: RENDER_BREAKING_INFO.includes(info) });
};
window.addEventListener("unhandledrejection", (event) => {
  // router.push()를 .catch() 없이 호출하는 곳이 이 코드베이스에 여럭 있는데(SlidePanel,
  // MyPageView, LoginView 등), 빠르게 두 번 누르는 등으로 이전 네비게이션이 취소되면
  // vue-router가 그 네비게이션의 Promise를 정상적으로 reject한다 — 이건 버그가 아니라
  // vue-router의 정상 동작이라, 진짜 에러처럼 로그에 남기면 잡음만 늘어난다(교차검증에서 발견).
  if (isNavigationFailure(event.reason, NavigationFailureType.aborted | NavigationFailureType.cancelled | NavigationFailureType.duplicated)) {
    return;
  }
  reportGlobalError(event.reason, "promise", { blocking: false });
});

// Pinia (상태관리) 등록
app.use(createPinia());

// Vue Router 등록
app.use(router);

// 페이지뷰 트래킹 설치
import { installPageTracker } from "./utils/pageTracker";
installPageTracker(router);

// index.html 의 <div id="app"> 에 마운트
app.mount("#app");

// 로그인 상태면(localStorage 기준) 서버 세션이 실제로 유효한지 먼저 확인한 뒤
// 장바구니/찜을 DB에서 로드 - 세션이 이미 만료/무효화됐다면 로그인 상태를 정리하고
// 장바구니/찜 요청 자체를 보내지 않는다
import { useAuthStore } from "./stores/authStore";
import { useCartStore } from "./stores/cartStore";
import { useWishlistStore } from "./stores/wishlistStore";
const storedUser = localStorage.getItem("user");
if (storedUser) {
  useAuthStore()
    .verifySession()
    .then(() => {
      if (useAuthStore().isLoggedIn) {
        useCartStore().fetchCart();
        useWishlistStore().fetchWishlist();
      }
    });
}
