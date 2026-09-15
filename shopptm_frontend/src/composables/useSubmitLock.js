import { ref } from "vue";

// 관리자 화면 여러 곳(상품/카테고리/FAQ/Q&A/리뷰답글 관리 등)에서 반복되는 "응답이 오기
// 전에 같은 화면의 다른 액션(수정/삭제/저장)을 또 누르면 요청이 겹치거나 화면이 어긋날 수
// 있어 막는" 패턴을 한 곳에 모은 것. 실제로 AdminProducts.vue/AdminCategories.vue에서
// 이 패턴이 파일마다 손으로 복사되면서 일부 액션(행 삭제·ID변경)에만 빠뜨리는 사고가 있었음
// — submitting을 템플릿의 :disabled에 그대로 쓰고, run()에 실제 요청 로직을 넘기면
// "이미 진행중이면 무시 / 진행중 표시 / 끝나면 해제"를 대신 처리해준다. confirm() 같은
// 액션 시작 전 확인 절차는 호출하는 쪽에서 run() 호출 전에 둔다(취소해도 잠기지 않게 —
// 어차피 confirm()은 동기적으로 화면을 막으므로 그 사이 다른 클릭이 끼어들 수 없다).
export function useSubmitLock() {
  const submitting = ref(false);

  async function run(fn) {
    if (submitting.value) return;
    submitting.value = true;
    try {
      await fn();
    } finally {
      submitting.value = false;
    }
  }

  return { submitting, run };
}
