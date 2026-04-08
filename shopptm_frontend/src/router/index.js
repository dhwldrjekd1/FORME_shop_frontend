import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// lazy loading: 해당 페이지 접근할 때만 파일 불러옴
// → 첫 로딩 속도 최적화
const HomeView = () => import("@/views/HomeView.vue");
const ListView = () => import("@/views/ListView.vue");
const DetailView = () => import("@/views/DetailView.vue");
const CartView = () => import("@/views/CartView.vue");
const PaymentView = () => import("@/views/PaymentView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const SignupView = () => import("@/views/SignupView.vue");
const CarharttView = () => import("@/views/CarharttView2.vue");
const LevisView = () => import("@/views/LevisView2.vue");
const DickiesView = () => import("@/views/DickiesView2.vue");
const BeanpoleView = () => import("@/views/BeanpoleView2.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/products",
    name: "List",
    component: ListView,
  },
  {
    path: "/products/:id", // :id → 동적 파라미터 (예: /products/1)
    name: "Detail",
    component: DetailView,
    props: true, // route.params.id 를 props로 자동 전달
  },
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
    meta: { requiresAuth: true }, // 로그인 필요 페이지 표시
  },
  {
    path: "/payment",
    name: "Payment",
    component: PaymentView,
    meta: { requiresAuth: true }, // 로그인 필요 페이지 표시
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
  },
  {
    path: "/signup",
    name: "Signup",
    component: SignupView,
  },
  {
    path: "/carhartt",
    name: "Carhartt",
    component: CarharttView,
  },
  {
    path: "/levis",
    name: "Levis",
    component: LevisView,
  },
  {
    path: "/dickies",
    name: "Dickies",
    component: DickiesView,
  },
  {
    path: "/beanpole",
    name: "Beanpole",
    component: BeanpoleView,
  },
  {
    path: "/:pathMatch(.*)*", // 없는 경로 접근 시 홈으로 리다이렉트
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 }; // 페이지 이동 시 스크롤 항상 최상단으로
  },
});

// 네비게이션 가드
// 모든 페이지 이동 전에 실행됨
router.beforeEach((to) => {
  // requiresAuth: true 인 페이지인데 로그인 안 했으면
  // 로그인 페이지로 보내고 redirect 파라미터에 원래 경로 저장
  // → 로그인 후 원래 가려던 페이지로 돌아올 수 있음
  if (to.meta.requiresAuth) {
    const authStore = useAuthStore();
    if (!authStore.isLoggedIn) {
      return { name: "Login", query: { redirect: to.fullPath } };
    }
  }
});

export default router;
