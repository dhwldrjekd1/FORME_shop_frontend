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

// index.html 의 <div id="app"> 에 마운트
app.mount("#app");
