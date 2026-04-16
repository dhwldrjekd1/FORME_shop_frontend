<template>
  <AdminLayout>
    <div class="aa">
      <div class="aa-head"><p class="aa-code">[ 06 / ANALYTICS ]</p><h1 class="aa-title">페이지뷰 분석</h1></div>

      <!-- 요약 카드 -->
      <div class="aa-cards">
        <div v-for="c in cardData" :key="c.label" class="aa-card">
          <span class="material-symbols-outlined aa-card__icon">{{ c.icon }}</span>
          <div><p class="aa-card__num">{{ c.value }}</p><p class="aa-card__label">{{ c.label }}</p></div>
        </div>
      </div>

      <div class="aa-grid">
        <!-- 페이지별 (admin 제외) -->
        <section class="aa-sec">
          <h2 class="aa-sec__title">페이지별 체류시간</h2>
          <div class="aa-sec__body">
            <div v-for="p in pageStats" :key="p.pageName" class="aa-bar-row">
              <span class="aa-bar-row__name">{{ p.pageName }}</span>
              <div class="aa-bar"><div class="aa-bar__fill" :style="{ width: barW(p.avgDuration) }"></div></div>
              <span class="aa-bar-row__val">{{ p.avgDuration }}s · {{ p.views }}회</span>
            </div>
            <p v-if="!pageStats.length" class="aa-empty">데이터 없음</p>
          </div>
        </section>

        <!-- 시간대별 -->
        <section class="aa-sec">
          <h2 class="aa-sec__title">시간대별 방문</h2>
          <div class="aa-hourly">
            <div v-for="h in hourlyStats" :key="h.hour" class="aa-hourly__col">
              <div class="aa-hourly__bar" :style="{ height: hourH(h.views) }"></div>
              <span>{{ h.hour }}</span>
            </div>
          </div>
        </section>
      </div>

      <!-- 상품별 체류시간 -->
      <section class="aa-sec" style="margin-top: 1.5rem;">
        <h2 class="aa-sec__title">상품별 체류시간 (인기 상품)</h2>
        <div class="aa-sec__body">
          <table class="aa-table">
            <thead><tr><th>상품 ID</th><th>상품명</th><th>브랜드</th><th>조회수</th><th>평균 체류</th><th>바</th></tr></thead>
            <tbody>
              <tr v-for="p in productStats" :key="p.pagePath">
                <td class="aa-table__id">#{{ p.productId }}</td>
                <td class="aa-table__name">{{ p.productName || '-' }}</td>
                <td class="aa-table__brand">{{ p.brand || '-' }}</td>
                <td class="t-r">{{ p.views }}회</td>
                <td class="t-r">{{ p.avgDuration }}s</td>
                <td><div class="aa-bar" style="width:100px;"><div class="aa-bar__fill" :style="{ width: prodBarW(p.avgDuration) }"></div></div></td>
              </tr>
              <tr v-if="!productStats.length"><td colspan="6" class="t-empty">데이터 없음</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <!-- 사용자별 -->
      <section class="aa-sec" style="margin-top: 1.5rem;">
        <h2 class="aa-sec__title">사용자별 활동</h2>
        <div class="aa-sec__body">
          <table class="aa-table">
            <thead><tr><th>사용자</th><th>방문</th><th>평균 체류</th></tr></thead>
            <tbody>
              <tr v-for="u in userStats" :key="u.loginId"><td>{{ u.loginId }}</td><td class="t-r">{{ u.views }}</td><td class="t-r">{{ u.avgDuration }}s</td></tr>
              <tr v-if="!userStats.length"><td colspan="3" class="t-empty">데이터 없음</td></tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const cardData = ref([
  { icon: 'visibility', value: '0', label: '총 페이지뷰' },
  { icon: 'groups', value: '0', label: '활성 사용자' },
  { icon: 'web', value: '0', label: '조회 페이지' },
  { icon: 'timer', value: '0s', label: '평균 체류' },
]);
const pageStats = ref([]);
const userStats = ref([]);
const hourlyStats = ref([]);
const productStats = ref([]);
const allProducts = ref([]);

onMounted(async () => {
  try {
    const [s, p, u, h, pd, prods] = await Promise.all([
      api.get('/analytics/summary'),
      api.get('/analytics/pages'),
      api.get('/analytics/users'),
      api.get('/analytics/hourly'),
      api.get('/analytics/products'),
      api.get('/products'),
    ]);
    if (s) {
      cardData.value[0].value = String(s.totalViews ?? 0);
      cardData.value[1].value = String(s.activeUsers ?? 0);
      cardData.value[2].value = String(s.totalPages ?? 0);
      cardData.value[3].value = (s.avgDuration ?? 0) + 's';
    }
    pageStats.value = p || [];
    userStats.value = u || [];
    hourlyStats.value = h || [];
    allProducts.value = prods || [];

    // 상품별 통계에 제품명/브랜드 매핑
    productStats.value = (pd || []).map(item => {
      const prod = allProducts.value.find(x => String(x.id) === String(item.productId));
      return {
        ...item,
        productName: prod?.name || '',
        brand: prod?.brand || '',
      };
    });
  } catch {}
});

function barW(v) {
  const mx = Math.max(...pageStats.value.map(p => p.avgDuration), 1);
  return Math.round((v / mx) * 100) + '%';
}
function hourH(v) {
  const mx = Math.max(...hourlyStats.value.map(h => h.views), 1);
  return Math.max(4, Math.round((v / mx) * 120)) + 'px';
}
function prodBarW(v) {
  const mx = Math.max(...productStats.value.map(p => p.avgDuration), 1);
  return Math.round((v / mx) * 100) + '%';
}
</script>

<style scoped>
.aa-head { margin-bottom: 1.5rem; }
.aa-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.aa-title { font-size: 1.75rem; font-weight: 900; }
.aa-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
@media (min-width: 768px) { .aa-cards { grid-template-columns: repeat(4, 1fr); } }
.aa-card { display: flex; align-items: center; gap: 0.875rem; padding: 1.25rem; background: #fff; border: 1px solid #eee; border-radius: 0.5rem; }
.aa-card__icon { font-size: 1.5rem; color: #111; font-variation-settings: "wght" 300; }
.aa-card__num { font-size: 1.375rem; font-weight: 900; }
.aa-card__label { font-size: 0.5625rem; color: #999; margin-top: 0.125rem; }
.aa-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; }
@media (min-width: 768px) { .aa-grid { grid-template-columns: 1fr 1fr; } }
.aa-sec { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; padding: 1.5rem; }
.aa-sec__title { font-size: 0.875rem; font-weight: 800; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #f0f0f0; }
.aa-bar-row { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem; }
.aa-bar-row__name { font-size: 0.6875rem; font-weight: 600; min-width: 100px; }
.aa-bar { flex: 1; height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.aa-bar__fill { height: 100%; background: #111; border-radius: 3px; }
.aa-bar-row__val { font-size: 0.625rem; color: #999; min-width: 80px; text-align: right; }
.aa-hourly { display: flex; align-items: flex-end; gap: 2px; height: 140px; }
.aa-hourly__col { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: flex-end; }
.aa-hourly__bar { width: 100%; background: #111; border-radius: 2px 2px 0 0; min-height: 2px; }
.aa-hourly__col span { font-size: 0.4375rem; color: #bbb; margin-top: 0.25rem; }
.aa-table { width: 100%; border-collapse: collapse; }
.aa-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.625rem 0.5rem; text-align: left; }
.aa-table td { font-size: 0.8125rem; padding: 0.625rem 0.5rem; border-bottom: 1px solid #f5f5f5; }
.aa-table__id { font-weight: 700; color: #111; }
.aa-table__name { font-weight: 600; color: #111; max-width: 200px; }
.aa-table__brand { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; color: #888; }
.t-r { text-align: right; font-weight: 700; }
.t-empty { text-align: center; color: #ccc; padding: 2rem; }
.aa-empty { text-align: center; color: #ccc; padding: 2rem; font-size: 0.8125rem; }
</style>
