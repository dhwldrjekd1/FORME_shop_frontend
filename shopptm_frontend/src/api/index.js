// fetch 기반 API 클라이언트 (axios 의존성 제거)
// - 최근 axios CVE 이슈 회피 목적
// - Spring Boot 연결 시 VITE_API_URL 환경변수만 바꾸면 됨

// 운영 빌드: Spring Boot가 같은 origin으로 프론트+API를 함께 서빙 → 상대 경로
// 개발(npm run dev): Vite dev 서버는 5173, 백엔드는 8302라서 절대 URL 필요
//   (백엔드 WebConfig.java 에 5173 CORS 허용이 이미 설정됨)
const BASE_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? "http://localhost:8302/api" : "/api");
const TIMEOUT = 10000; // 10초

// ── 응답 에러 객체 ─────────────────────────────
class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

// ── 핵심 요청 함수 ─────────────────────────────
async function request(path, { method = "GET", body, headers, ...rest } = {}) {
  const url = path.startsWith("http") ? path : `${BASE_URL}${path}`;

  // 타임아웃 처리 (AbortController)
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT);

  // 인증은 httpOnly 쿠키(auth_token)로 처리 — 자바스크립트에서 토큰을 읽어와 헤더에
  // 직접 실어보내지 않는다 (그러면 XSS로 토큰을 읽을 수 있는 통로가 다시 생김).
  // credentials: "include"만 있으면 브라우저가 쿠키를 알아서 실어 보낸다.
  const finalHeaders = {
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    const res = await fetch(url, {
      method,
      headers: finalHeaders,
      body: body != null ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: "include",
      ...rest,
    });

    // 응답 본문 파싱 (JSON 우선, 실패 시 text)
    const contentType = res.headers.get("content-type") || "";
    const data = contentType.includes("application/json")
      ? await res.json().catch(() => null)
      : await res.text().catch(() => null);

    if (!res.ok) {
      // 401 (인증 만료/무효) 처리 — 남아있는 로그인 정보를 정리하고 로그인 페이지로 이동
      if (res.status === 401) {
        if (typeof localStorage !== "undefined") {
          localStorage.removeItem("user");
        }
        if (
          typeof window !== "undefined" &&
          !window.location.pathname.startsWith("/login")
        ) {
          window.location.href = "/login";
        }
      }
      throw new ApiError(
        data?.message || `Request failed: ${res.status}`,
        res.status,
        data,
      );
    }

    return data;
  } catch (err) {
    if (err.name === "AbortError") {
      throw new ApiError("요청 시간이 초과되었습니다.", 0, null);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ── 편의 메서드 ─────────────────────────────
const api = {
  get: (path, options) => request(path, { ...options, method: "GET" }),
  post: (path, body, options) =>
    request(path, { ...options, method: "POST", body }),
  put: (path, body, options) =>
    request(path, { ...options, method: "PUT", body }),
  patch: (path, body, options) =>
    request(path, { ...options, method: "PATCH", body }),
  delete: (path, options) => request(path, { ...options, method: "DELETE" }),
};

export { ApiError };
export default api;
