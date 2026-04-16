import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// 메인 페이지 (forme32 기반)
const HomeView = () => import("@/views/HomeView.vue");

// 시안 보존 (05, 08, 28, 31)
const Forme05Home = () => import("@/views/forme05/HomeView.vue");
const Forme08Home = () => import("@/views/forme08/HomeView.vue");
const Forme30Home = () => import("@/views/forme30/HomeView.vue");
const Forme31Home = () => import("@/views/forme31/HomeView.vue");

// 기존 페이지
const ListView = () => import("@/views/ListView.vue");
const NewView = () => import("@/views/NewView.vue");
const BestView = () => import("@/views/BestView.vue");
const SaleView = () => import("@/views/SaleView.vue");
const DetailView = () => import("@/views/DetailView.vue");
const CartView = () => import("@/views/CartView.vue");
const PaymentView = () => import("@/views/PaymentView.vue");
const LoginView = () => import("@/views/LoginView.vue");
const SignupView = () => import("@/views/SignupView.vue");
const CarharttView = () => import("@/views/CarharttView2.vue");
const LevisView = () => import("@/views/LevisView2.vue");
const DickiesView = () => import("@/views/DickiesView2.vue");
const BeanpoleView = () => import("@/views/BeanpoleView2.vue");
const FaqView = () => import("@/views/FaqView.vue");
const QnaView = () => import("@/views/QnaView.vue");
const AdminDashboard = () => import("@/views/admin/AdminDashboard.vue");
const AdminProducts = () => import("@/views/admin/AdminProducts.vue");
const AdminOrders = () => import("@/views/admin/AdminOrders.vue");
const AdminQna = () => import("@/views/admin/AdminQna.vue");
const AdminFaq      = () => import("@/views/admin/AdminFaq.vue");
const AdminMembers  = () => import("@/views/admin/AdminMembers.vue");
const AdminSettings = () => import("@/views/admin/AdminSettings.vue");
const AdminAnalytics = () => import("@/views/admin/AdminAnalytics.vue");
const AdminReviews = () => import("@/views/admin/AdminReviews.vue");
const AdminCategories = () => import("@/views/admin/AdminCategories.vue");
const AdminBoard = () => import("@/views/admin/AdminBoard.vue");
const BoardView = () => import("@/views/BoardView.vue");
const OrderCompleteView = () => import("@/views/OrderCompleteView.vue");
const MyPageView = () => import("@/views/MyPageView.vue");

const routes = [
  // ── 메인 (forme32 기반) ──
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },

  // ── 시안 보존 ──
  { path: "/forme05", name: "Forme05", component: Forme05Home },
  { path: "/forme08", name: "Forme08", component: Forme08Home },
  { path: "/forme30", name: "Forme30", component: Forme30Home },
  { path: "/forme31", name: "Forme31", component: Forme31Home },

  // ── 카테고리 ──
  { path: "/new", name: "New", component: NewView },
  { path: "/best", name: "Best", component: BestView },
  { path: "/sale", name: "Sale", component: SaleView },

  // ── 상품 ──
  {
    path: "/products",
    name: "List",
    component: ListView,
  },
  {
    path: "/products/:id",
    name: "Detail",
    component: DetailView,
    props: true,
  },

  // ── 결제 흐름 ──
  {
    path: "/cart",
    name: "Cart",
    component: CartView,
    meta: { requiresAuth: true },
  },
  {
    path: "/payment",
    name: "Payment",
    component: PaymentView,
    meta: { requiresAuth: true },
  },
  {
    path: "/order-complete",
    name: "OrderComplete",
    component: OrderCompleteView,
  },

  // ── 인증 ──
  { path: "/login",  name: "Login",  component: LoginView },
  { path: "/signup", name: "Signup", component: SignupView },

  // ── 브랜드 ──
  { path: "/beanpole", name: "Beanpole", component: BeanpoleView },
  { path: "/carhartt", name: "Carhartt", component: CarharttView },
  { path: "/levis",    name: "Levis",    component: LevisView },
  { path: "/dickies",  name: "Dickies",  component: DickiesView },

  // ── 고객 ──
  { path: "/faq", name: "Faq", component: FaqView },
  { path: "/qna", name: "Qna", component: QnaView },
  { path: "/board", name: "Board", component: BoardView },

  // ── 마이페이지 ──
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPageView,
    meta: { requiresAuth: true },
  },

  // ── 관리자 (ROLE_ADMIN만 접근 가능) ──
  { path: "/admin",          name: "AdminDashboard", component: AdminDashboard, meta: { requiresAdmin: true } },
  { path: "/admin/products", name: "AdminProducts",  component: AdminProducts,  meta: { requiresAdmin: true } },
  { path: "/admin/orders",   name: "AdminOrders",    component: AdminOrders,    meta: { requiresAdmin: true } },
  { path: "/admin/qna",      name: "AdminQna",       component: AdminQna,       meta: { requiresAdmin: true } },
  { path: "/admin/faq",      name: "AdminFaq",       component: AdminFaq,       meta: { requiresAdmin: true } },
  { path: "/admin/members",  name: "AdminMembers",   component: AdminMembers,   meta: { requiresAdmin: true } },
  { path: "/admin/settings",  name: "AdminSettings",  component: AdminSettings,  meta: { requiresAdmin: true } },
  { path: "/admin/analytics", name: "AdminAnalytics", component: AdminAnalytics, meta: { requiresAdmin: true } },
  { path: "/admin/reviews",     name: "AdminReviews",     component: AdminReviews,     meta: { requiresAdmin: true } },
  { path: "/admin/categories", name: "AdminCategories", component: AdminCategories, meta: { requiresAdmin: true } },
  { path: "/admin/board",      name: "AdminBoard",      component: AdminBoard,      meta: { requiresAdmin: true } },

  // ── 404 → 홈 ──
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

// 네비게이션 가드
router.beforeEach((to) => {
  const authStore = useAuthStore();

  // 로그인 필요 페이지
  if (to.meta.requiresAuth) {
    if (!authStore.isLoggedIn) {
      return { name: "Login", query: { redirect: to.fullPath } };
    }
  }

  // 관리자 전용 페이지
  if (to.meta.requiresAdmin) {
    if (!authStore.isLoggedIn) {
      return { name: "Login", query: { redirect: to.fullPath } };
    }
    if (authStore.user?.role !== "ROLE_ADMIN") {
      alert("관리자 권한이 필요합니다.");
      return { name: "Home" };
    }
  }
});

export default router;
