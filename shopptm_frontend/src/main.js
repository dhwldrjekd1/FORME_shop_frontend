document.addEventListener("contextmenu", e => e.preventDefault());

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// 전역 CSS 불러오기
import "./assets/styles/main.css";

const app = createApp(App);

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
