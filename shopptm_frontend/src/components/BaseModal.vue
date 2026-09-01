<template>
  <Teleport to="body">
    <div v-if="show" class="modal" :style="{ zIndex }" @click.self="handleBackdrop">
      <div class="modal__box" :style="boxStyle">
        <slot />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";

// 관리자/마이페이지 화면 6곳(MyPageView, AdminMembers, AdminFaq, AdminQna, AdminProducts,
// AdminReviews)이 각자 거의 동일한 모달 뼈대(반투명 배경 + 흰 박스 + Teleport)와 CSS를
// 복붙해서 갖고 있던 것을 하나로 모음. 내부 내용(제목/폼/버튼 등)은 화면마다 달라서 강제로
// 통일하지 않고 슬롯으로 그대로 넘김 — 뼈대(위치/배경/크기)만 여기서 props로 통제한다.
const props = defineProps({
  show: { type: Boolean, required: true },
  maxWidth: { type: String, default: "420px" },
  zIndex: { type: [String, Number], default: 1000 },
  // true면 박스 자체 패딩 없이 내용(슬롯)이 알아서 헤더/바디 패딩을 나눠 갖는 경우
  // (AdminProducts, AdminReviews처럼 상단 헤더+X버튼 구조인 화면용)
  noPadding: { type: Boolean, default: false },
  maxHeight: { type: String, default: null },
  closeOnBackdrop: { type: Boolean, default: true },
  // 저장/제출 처리 중이면 배경 클릭으로 안 닫히게 막는 용도
  locked: { type: Boolean, default: false },
});

const emit = defineEmits(["close"]);

const boxStyle = computed(() => ({
  maxWidth: props.maxWidth,
  padding: props.noPadding ? 0 : "2rem",
  overflow: props.noPadding ? "hidden" : "visible",
  ...(props.maxHeight ? { maxHeight: props.maxHeight, overflowY: "auto" } : {}),
}));

function handleBackdrop() {
  if (props.closeOnBackdrop && !props.locked) emit("close");
}
</script>

<style>
/* scoped를 안 쓴 이유: 슬롯으로 넘어오는 내용(제목/설명/입력/버튼 등)은 이 컴포넌트가
   아니라 호출한 쪽 컴포넌트의 scope를 그대로 유지하기 때문에, 여기 style에 scoped를
   붙이면 .modal__title 등이 슬롯 내용엔 전혀 적용되지 않는다. 전역으로 둬서 이 클래스들이
   어느 화면에서 슬롯으로 써도 그대로 먹히게 한다. */
.modal { position: fixed; inset: 0; background: rgba(0, 0, 0, 0.45); display: flex; align-items: center; justify-content: center; padding: 1.5rem; }
.modal__box { background: #fff; width: 100%; border-radius: 0.75rem; }
.modal__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 0.5rem; }
.modal__desc { font-size: 0.8125rem; color: #666; margin-bottom: 1.25rem; line-height: 1.6; }
.modal__input { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; margin-bottom: 1.25rem; }
.modal__input:focus { border-color: #111; }
.modal__input:disabled { background: #fafaf8; color: #999; }
.modal__actions { display: flex; gap: 0.625rem; }
.modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; }
.modal__btn--fill { background: #111; color: #fff; }
.modal__btn--fill:disabled, .modal__btn--ghost:disabled { opacity: 0.5; cursor: not-allowed; }
.modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.modal__head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee; }
.modal__head h2 { font-size: 1.125rem; font-weight: 800; }
.modal__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.modal__head button:disabled { opacity: 0.5; cursor: not-allowed; }
</style>
