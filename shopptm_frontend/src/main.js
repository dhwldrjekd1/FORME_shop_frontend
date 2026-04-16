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

// 로그인 상태면 장바구니/찜 DB에서 로드
import { useCartStore } from "./stores/cartStore";
import { useWishlistStore } from "./stores/wishlistStore";
const token = localStorage.getItem("token");
if (token) {
  useCartStore().fetchCart();
  useWishlistStore().fetchWishlist();
}
