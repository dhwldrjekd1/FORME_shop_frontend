<template>
  <div v-if="totalPages > 1" class="ap">
    <button class="ap-btn" :disabled="page <= 0" @click="$emit('change', page - 1)">이전</button>
    <span class="ap-info">{{ page + 1 }} / {{ totalPages }}</span>
    <button class="ap-btn" :disabled="page >= totalPages - 1" @click="$emit('change', page + 1)">다음</button>
  </div>
</template>
<script setup>
defineProps({
  page: { type: Number, required: true },
  totalPages: { type: Number, required: true },
});
defineEmits(['change']);
</script>
<style scoped>
.ap { display: flex; justify-content: center; align-items: center; gap: 1rem; margin-top: 1.25rem; }
.ap-btn { padding: 0.5rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem; background: #fff; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
.ap-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.ap-info { font-size: 0.75rem; color: #999; font-weight: 600; }
</style>
