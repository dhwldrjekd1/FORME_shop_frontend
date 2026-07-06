<template>
  <div class="pf-bar" :class="barClass">
    <div class="pf-bar__inner">
      <div class="pf-bar__row">
        <button
          v-for="b in BRAND_CHIPS" :key="b.key" class="pf-chip"
          :class="{ 'pf-chip--on': brand === b.key }"
          :style="brand === b.key && b.color ? { backgroundColor: b.color, borderColor: b.color, color: '#fff' } : {}"
          @click="$emit('update:brand', b.key)"
        >{{ b.label }}</button>
      </div>
      <div class="pf-bar__row">
        <button
          v-for="g in GENDER_CHIPS" :key="g.key" class="pf-chip pf-chip--sm"
          :class="{ 'pf-chip--on': gender === g.key }"
          @click="$emit('update:gender', g.key)"
        >{{ g.label }}</button>
      </div>
      <span class="pf-bar__count">{{ count }} items</span>
    </div>
  </div>
</template>

<script setup>
import { BRAND_CHIPS, GENDER_CHIPS } from "@/utils/productFilters";

defineProps({
  brand: { type: String, required: true },
  gender: { type: String, required: true },
  count: { type: Number, required: true },
  // 뷰마다 히어로 색이 달라 sticky 배경/보더는 각 뷰 스타일에서 이 클래스로 덮어씀
  barClass: { type: String, default: "" },
});
defineEmits(["update:brand", "update:gender"]);
</script>

<style scoped>
.pf-bar { position: sticky; top: 80px; z-index: 20; background: rgba(255,255,255,0.97); backdrop-filter: blur(10px); border-bottom: 1px solid #eee; }
@media (min-width: 768px) { .pf-bar { top: 100px; } }
.pf-bar__inner { max-width: 1600px; margin: 0 auto; padding: 0.75rem 1.25rem; display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }
@media (min-width: 768px) { .pf-bar__inner { padding: 1rem 3rem; gap: 1.5rem; } }
.pf-bar__row { display: flex; gap: 0.5rem; max-width: 100%; overflow-x: auto; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
.pf-bar__row::-webkit-scrollbar { display: none; }
.pf-chip { flex-shrink: 0; padding: 0.5rem 1.25rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; border: 1.5px solid #ddd; background: #fff; color: #555; cursor: pointer; transition: all 0.2s; }
.pf-chip:hover { border-color: #111; color: #111; }
.pf-chip--on { background: #111; border-color: #111; color: #fff; }
.pf-chip--sm { padding: 0.375rem 0.875rem; font-size: 0.5625rem; }
.pf-bar__count { margin-left: auto; font-size: 0.6875rem; color: #999; letter-spacing: 0.1em; }
</style>
