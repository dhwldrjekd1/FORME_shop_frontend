import api from "@/api";

let enterTime = 0;
let currentPath = "";
let currentName = "";

function getLoginId() {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email || null;
  } catch {
    return null;
  }
}

function getPageName(path) {
  if (path === "/") return "home";
  if (path === "/products") return "products";
  if (path.startsWith("/products/")) return "product-detail";
  if (path === "/cart") return "cart";
  if (path === "/payment") return "payment";
  if (path === "/order-complete") return "order-complete";
  if (path.startsWith("/beanpole")) return "beanpole";
  if (path.startsWith("/carhartt")) return "carhartt";
  if (path.startsWith("/levis")) return "levis";
  if (path.startsWith("/dickies")) return "dickies";
  if (path === "/faq") return "faq";
  if (path === "/qna") return "qna";
  if (path === "/mypage") return "mypage";
  if (path === "/login") return "login";
  if (path === "/signup") return "signup";
  return path.replace(/\//g, "-").slice(1) || "unknown";
}

function sendTrack() {
  if (!currentPath || !enterTime) return;
  if (currentPath.startsWith('/admin')) return; // admin 페이지 제외
  const duration = Math.round((Date.now() - enterTime) / 1000);
  if (duration < 2) return;
  api.post("/analytics/track", {
    loginId: getLoginId(),
    pageName: currentName,
    pagePath: currentPath,
    duration,
  }).catch(() => {});
}

export function installPageTracker(router) {
  router.beforeEach((to, from) => {
    // 이전 페이지 체류 기록 전송
    if (from.path && from.path !== to.path) {
      sendTrack();
    }
    // 새 페이지 진입 시간 기록
    enterTime = Date.now();
    currentPath = to.path;
    currentName = getPageName(to.path);
  });

  // 페이지 떠날 때 마지막 기록 전송
  if (typeof window !== "undefined") {
    window.addEventListener("beforeunload", sendTrack);
  }
}
