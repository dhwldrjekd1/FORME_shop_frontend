<template>
  <div v-if="totalPages > 1" class="ap">
    <button class="ap-btn" :disabled="disabled || page <= 0" @click="$emit('change', page - 1)">이전</button>
    <span class="ap-info">{{ page + 1 }} / {{ totalPages }}</span>
    <button class="ap-btn" :disabled="disabled || page >= totalPages - 1" @click="$emit('change', page + 1)">다음</button>
  </div>
</template>
<script setup>
// disabled: 목록 항목 삭제처럼 "삭제 후 현재 페이지를 다시 불러오고, 비었으면 한 페이지
// 앞으로" 하는 처리가 진행 중일 때 페이지 전환까지 같이 눌리면, 그 전환 요청이 삭제의
// 재조회보다 늦게 혹은 먼저 끝나는 순서에 따라 엉뚱한 페이지로 섞일 수 있다(교차검증에서
// 발견). 그 작업이 진행 중인 동안은 호출부가 이 값을 true로 넘겨 버튼을 막아야 한다.
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
  disabled: { type: Boolean, default: false },
});
defineEmits(['change']);
</script>
<style scoped>
.ap { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1.25rem; }
.ap-btn { padding: 0.5rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem; background: #fff; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
.ap-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ap-info { font-size: 0.75rem; color: #999; font-weight: 600; }
</style>
