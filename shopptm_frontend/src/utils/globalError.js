import { reactive } from "vue";

// 컴포넌트 렌더링/라이프사이클 중 잡지 못한 예외가 나면(흔히 아무 안내 없이 화면이
// 그대로 멈춰버림) 최소한 "새로고침해달라"는 안내라도 보여주기 위한 전역 상태.
// App.vue가 이 상태를 보고 오버레이를 그린다 — 깨진 컴포넌트 트리와는 무관하게
// 항상 떠 있도록 App.vue 최상단에 둔다.
export const globalErrorState = reactive({ hasError: false });

// blocking=true(기본): 컴포넌트 트리 자체가 깨졌을 가능성이 있는 경우(Vue errorHandler)라
// 오버레이를 띄워 새로고침을 안내. blocking=false: 처리 안 된 Promise rejection처럼 화면
// 자체는 멀쩡할 수 있는 경우라, 콘솔에만 남기고 화면을 막지 않는다.
export function reportGlobalError(err, context, { blocking = true } = {}) {
  console.error(`[전역 에러${context ? ` - ${context}` : ""}]`, err);
  if (blocking) globalErrorState.hasError = true;
}
