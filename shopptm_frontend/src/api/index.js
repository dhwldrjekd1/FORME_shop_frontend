import axios from "axios";

// axios 인스턴스 생성
// Spring Boot 연결 시 VITE_API_URL 환경변수만 바꾸면 됨
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8080/api",
  timeout: 10000, // 10초 안에 응답 없으면 에러
  headers: {
    "Content-Type": "application/json",
  },
});

// ── 요청 인터셉터 ─────────────────────────────
// 모든 API 요청이 나가기 전에 실행됨
// Spring Boot JWT 연결 시 토큰을 여기서 자동 첨부
api.interceptors.request.use(
  (config) => {
    // TODO: Spring Boot JWT 연결 시 아래 주석 해제
    // const token = localStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config;
  },
  (error) => Promise.reject(error),
);

// ── 응답 인터셉터 ─────────────────────────────
// 모든 API 응답이 들어올 때 실행됨
// 401 (인증 만료) 발생 시 로그인 페이지로 이동
api.interceptors.response.use(
  (response) => response, // 정상 응답은 그대로 통과
  (error) => {
    if (error.response?.status === 401) {
      // TODO: Spring Boot 연결 시 아래 주석 해제
      // router.push('/login')
    }
    return Promise.reject(error);
  },
);

export default api;
