import api, { BASE_URL } from "@/api";

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
  if (path === "/brand-story") return "brand-story";
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

// sendTrack()/sendTrackOnUnload() 둘 다 "보낼지 말지"와 "페이로드"가 완전히 같아야 하는데,
// 따로 복사해두면 나중에 필드 하나를 추가하거나 admin 제외 조건을 바꿀 때 한쪽만 고치고
// 잊어버리기 쉽다(교차검증에서 지적) — 그 판단을 이 한 곳에만 둔다. 보낼 필요 없으면 null.
function buildTrackPayload() {
  if (!currentPath || !enterTime) return null;
  if (currentPath.startsWith('/admin')) return null; // admin 페이지 제외
  const duration = Math.round((Date.now() - enterTime) / 1000);
  if (duration < 2) return null;
  return { loginId: getLoginId(), pageName: currentName, pagePath: currentPath, duration };
}

function sendTrack() {
  const payload = buildTrackPayload();
  if (!payload) return;
  api.post("/analytics/track", payload).catch(() => {});
}

// beforeunload 시점 전용 — 페이지가 실제로 unload되는 중에는 브라우저가 진행 중인 fetch를
// 끝까지 보내주리란 보장이 없어(특히 탭을 바로 닫는 경우), sendTrack()의 일반 fetch로는
// 마지막 페이지의 체류시간 기록이 종종 유실될 수 있었다(교차검증에서 발견). navigator.
// sendBeacon은 바로 이 상황을 위해 만들어진 API라, 브라우저가 페이지를 넘기기 전에 요청을
// 큐에 넣어 백그라운드로 전송을 보장한다.
//
// 참고(개발 서버 한정 — 운영은 Spring Boot가 프론트를 같은 origin으로 같이 서빙해 해당 없음):
// Blob의 Content-Type을 "application/json"으로 두면 크로스오리진(Vite:5173↔백엔드:8302)
// 환경에서는 이게 "simple request"가 아니라서 브라우저가 OPTIONS 프리플라이트를 먼저
// 보내야 하는데, sendBeacon()은 큐에 넣는 순간 바로 true를 반환해버려 그 프리플라이트가
// 실제로 끝나기 전에 문서가 사라지면 정작 이 기능이 지키려던 "마지막 페이지 기록"이 개발
// 환경에서만 똑같이 유실될 수 있다(교차검증에서 발견). "text/plain"으로 바꾸면 프리플라이트는
// 피하지만, 그러면 백엔드의 @RequestBody가 더 이상 이 요청을 JSON으로 안 받아줘서 운영
// 환경까지 깨뜨리게 된다 — 분석 데이터 하나 때문에 백엔드 Content-Type 처리를 바꾸는 건
// 과한 대응이라 판단해, 이 한계는 개발 환경에서만 남겨두고 고치지 않음.
function sendTrackOnUnload() {
  const payload = buildTrackPayload();
  if (!payload) return;

  if (navigator.sendBeacon) {
    const blob = new Blob([JSON.stringify(payload)], { type: "application/json" });
    if (navigator.sendBeacon(`${BASE_URL}/analytics/track`, blob)) return;
  }
  // sendBeacon이 없거나(아주 오래된 브라우저) 큐에 넣는 것 자체가 실패하면, 기존 fetch
  // 방식으로라도 최선을 다해 시도한다 — 성공을 보장하진 못해도 아무것도 안 보내는 것보단 낫다.
  api.post("/analytics/track", payload).catch(() => {});
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
    window.addEventListener("beforeunload", sendTrackOnUnload);
  }
}
