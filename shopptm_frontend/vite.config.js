import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // @ → src 폴더 단축 경로
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  // 운영(빌드) 시 백엔드 정적 리소스 폴더로 직접 산출물을 출력
  // → Spring Boot 실행만으로 동일 origin에서 프론트+API 동시 서빙
  build: {
    outDir: fileURLToPath(
      new URL("./backend/src/main/resources/static", import.meta.url),
    ),
    emptyOutDir: true, // 빌드 전 폴더 비우기 (오래된 파일 제거)
  },
  server: {
    port: 5173, // 개발 서버 — HMR/빠른 반영용
  },
});
