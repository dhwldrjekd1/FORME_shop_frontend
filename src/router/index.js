import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

// lazy loading: 해당 페이지 접근할 때만 파일 불러옴
// → 첫 로딩 속도 최적화
const HomeView = () => import("@/views/HomeView.vue");
// 10가지 톤 비교용
// 01: Modern Minimal (무신사/29CM)  02: Colorful Department (SSF/롯데온)
// 03: Premium Heritage (더현대/LF몰)  04: Gallery (Aesop/Celine)
// 05: Japanese Minimal (UNIQLO/MUJI)  06: Y2K Retro (Supreme/Palace)
// 07: Editorial Magazine  08: Street Lookbook
// 09: Luxury Monogram  10: Eco Natural
const Forme01Home = () => import("@/views/forme01/HomeView.vue");
const Forme02Home = () => import("@/views/forme02/HomeView.vue");
const Forme03Home = () => import("@/views/forme03/HomeView.vue");
const Forme04Home = () => import("@/views/forme04/HomeView.vue");
const Forme05Home = () => import("@/views/forme05/HomeView.vue");
const Forme06Home = () => import("@/views/forme06/HomeView.vue");
const Forme07Home = () => import("@/views/forme07/HomeView.vue");
const Forme08Home = () => import("@/views/forme08/HomeView.vue");
const Forme09Home = () => import("@/views/forme09/HomeView.vue");
const Forme10Home = () => import("@/views/forme10/HomeView.vue");
// 11~20: 창의적 시안
const Forme11Home = () => import("@/views/forme11/HomeView.vue");
const Forme12Home = () => import("@/views/forme12/HomeView.vue");
const Forme13Home = () => import("@/views/forme13/HomeView.vue");
const Forme14Home = () => import("@/views/forme14/HomeView.vue");
const Forme15Home = () => import("@/views/forme15/HomeView.vue");
const Forme16Home = () => import("@/views/forme16/HomeView.vue");
const Forme17Home = () => import("@/views/forme17/HomeView.vue");
const Forme18Home = () => import("@/views/forme18/HomeView.vue");
const Forme19Home = () => import("@/views/forme19/HomeView.vue");
const Forme20Home = () => import("@/views/forme20/HomeView.vue");
// 21~25: 30~50대 의류 타겟
const Forme21Home = () => import("@/views/forme21/HomeView.vue");
const Forme22Home = () => import("@/views/forme22/HomeView.vue");
const Forme23Home = () => import("@/views/forme23/HomeView.vue");
const Forme24Home = () => import("@/views/forme24/HomeView.vue");
const Forme25Home = () => import("@/views/forme25/HomeView.vue");
const Forme26Home = () => import("@/views/forme26/HomeView.vue");
const Forme27Home = () => import("@/views/forme27/HomeView.vue");
const Forme28Home = () => import("@/views/forme28/HomeView.vue");
const Forme29Home = () => import("@/views/forme29/HomeView.vue");
const Forme30Home = () => import("@/views/forme30/HomeView.vue");
const DesignPicker = () => import("@/views/forme/DesignPicker.vue");
const HeaderPicker = () => import("@/views/forme/HeaderPicker.vue");
const FooterPicker = () => import("@/views/forme/FooterPicker.vue");
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
const FaqView = () => import("@/views/FaqView.vue");
const QnaView = () => import("@/views/QnaView.vue");
const AdminDashboard = () => import("@/views/admin/AdminDashboard.vue");
const AdminProducts = () => import("@/views/admin/AdminProducts.vue");
const AdminOrders = () => import("@/views/admin/AdminOrders.vue");
const AdminQna = () => import("@/views/admin/AdminQna.vue");
const AdminFaq      = () => import("@/views/admin/AdminFaq.vue");
const AdminMembers  = () => import("@/views/admin/AdminMembers.vue");
const AdminSettings = () => import("@/views/admin/AdminSettings.vue");
const OrderCompleteView = () => import("@/views/OrderCompleteView.vue");
const MyPageView = () => import("@/views/MyPageView.vue");

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  // ── 디자인 톤 비교 페이지 (10종) + 선택기 ──
  { path: "/forme",           name: "DesignPicker", component: DesignPicker },
  { path: "/forme/ui/header",  name: "HeaderPicker", component: HeaderPicker },
  { path: "/forme/ui/footer",  name: "FooterPicker", component: FooterPicker },
  { path: "/forme01", name: "Forme01", component: Forme01Home },
  { path: "/forme02", name: "Forme02", component: Forme02Home },
  { path: "/forme03", name: "Forme03", component: Forme03Home },
  { path: "/forme04", name: "Forme04", component: Forme04Home },
  { path: "/forme05", name: "Forme05", component: Forme05Home },
  { path: "/forme06", name: "Forme06", component: Forme06Home },
  { path: "/forme07", name: "Forme07", component: Forme07Home },
  { path: "/forme08", name: "Forme08", component: Forme08Home },
  { path: "/forme09", name: "Forme09", component: Forme09Home },
  { path: "/forme10", name: "Forme10", component: Forme10Home },
  { path: "/forme11", name: "Forme11", component: Forme11Home },
  { path: "/forme12", name: "Forme12", component: Forme12Home },
  { path: "/forme13", name: "Forme13", component: Forme13Home },
  { path: "/forme14", name: "Forme14", component: Forme14Home },
  { path: "/forme15", name: "Forme15", component: Forme15Home },
  { path: "/forme16", name: "Forme16", component: Forme16Home },
  { path: "/forme17", name: "Forme17", component: Forme17Home },
  { path: "/forme18", name: "Forme18", component: Forme18Home },
  { path: "/forme19", name: "Forme19", component: Forme19Home },
  { path: "/forme20", name: "Forme20", component: Forme20Home },
  { path: "/forme21", name: "Forme21", component: Forme21Home },
  { path: "/forme22", name: "Forme22", component: Forme22Home },
  { path: "/forme23", name: "Forme23", component: Forme23Home },
  { path: "/forme24", name: "Forme24", component: Forme24Home },
  { path: "/forme25", name: "Forme25", component: Forme25Home },
  { path: "/forme26", name: "Forme26", component: Forme26Home },
  { path: "/forme27", name: "Forme27", component: Forme27Home },
  { path: "/forme28", name: "Forme28", component: Forme28Home },
  { path: "/forme29", name: "Forme29", component: Forme29Home },
  { path: "/forme30", name: "Forme30", component: Forme30Home },
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
    path: "/faq",
    name: "Faq",
    component: FaqView,
  },
  {
    path: "/qna",
    name: "Qna",
    component: QnaView,
  },
  {
    path: "/order-complete",
    name: "OrderComplete",
    component: OrderCompleteView,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPageView,
    meta: { requiresAuth: true },
  },
  { path: "/admin", name: "AdminDashboard", component: AdminDashboard },
  { path: "/admin/products", name: "AdminProducts", component: AdminProducts },
  { path: "/admin/orders", name: "AdminOrders", component: AdminOrders },
  { path: "/admin/qna", name: "AdminQna", component: AdminQna },
  { path: "/admin/faq",      name: "AdminFaq",      component: AdminFaq      },
  { path: "/admin/members",  name: "AdminMembers",  component: AdminMembers  },
  { path: "/admin/settings", name: "AdminSettings", component: AdminSettings },
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
