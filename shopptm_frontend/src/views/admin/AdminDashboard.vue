<template>
  <AdminLayout>
    <div class="dash">
      <div class="dash-head">
        <div>
          <p class="dash-head__code">[ 00 / DASHBOARD ]</p>
          <h1 class="dash-head__title">CONTROL CENTER</h1>
        </div>
        <div class="dash-head__actions">
          <RouterLink to="/admin/products" class="dash-btn">상품 등록</RouterLink>
        </div>
      </div>

      <!-- 요약 카드 -->
      <div class="dash-cards">
        <div v-for="c in cards" :key="c.label" class="dash-card">
          <div class="dash-card__icon-wrap" :style="{ background: c.bg || '#111' }">
            <span class="material-symbols-outlined">{{ c.icon }}</span>
          </div>
          <div>
            <p class="dash-card__value">{{ c.value }}</p>
            <p class="dash-card__label">{{ c.label }}</p>
          </div>
        </div>
      </div>

      <!-- 매출 차트 -->
      <div class="dash-grid dash-grid--full">
        <section class="dash-sec">
          <h2 class="dash-sec__title">최근 7일 매출</h2>
          <div class="dash-chart">
            <div class="dash-chart__bars">
              <div v-for="d in dailySales" :key="d.date" class="dash-chart__col">
                <div class="dash-chart__bar-wrap">
                  <div class="dash-chart__bar" :style="{ height: chartBarH(d.revenue) }">
                    <span class="dash-chart__bar-val" v-if="d.revenue">₩{{ (d.revenue / 10000).toFixed(0) }}만</span>
                  </div>
                </div>
                <span class="dash-chart__label">{{ d.label }}</span>
                <span class="dash-chart__orders">{{ d.orders }}건</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div class="dash-grid">
        <!-- 주문 상태 분포 -->
        <section class="dash-sec">
          <h2 class="dash-sec__title">주문 상태 분포</h2>
          <div class="dash-status-list">
            <div v-for="(count, status) in orderStatusDist" :key="status" class="dash-status-row">
              <div class="dash-status-row__head">
                <span class="dash-status-tag" :class="'dash-status--' + status.toLowerCase()">{{ statusLabel(status) }}</span>
                <span class="dash-status-row__count">{{ count }}건</span>
              </div>
              <div class="dash-status-row__bar">
                <div class="dash-status-row__fill" :style="{ width: statusPct(count) + '%' }"></div>
              </div>
            </div>
          </div>
        </section>

        <!-- 브랜드별 매출 -->
        <section class="dash-sec">
          <h2 class="dash-sec__title">브랜드별 매출</h2>
          <div class="dash-brands">
            <div v-for="b in brandSales" :key="b.brand" class="dash-brand">
              <div class="dash-brand__row">
                <span class="dash-brand__name">{{ b.brand }}</span>
                <span class="dash-brand__rev">₩{{ b.revenue?.toLocaleString() }}</span>
              </div>
              <div class="dash-brand__bar">
                <div class="dash-brand__fill" :style="{ width: b.pct + '%', backgroundColor: brandColor(b.brand) }"></div>
              </div>
            </div>
            <p v-if="!brandSales.length" class="dash-brands__empty">매출 데이터 없음</p>
          </div>
        </section>
      </div>

      <div class="dash-grid">
        <!-- 최근 주문 -->
        <section class="dash-sec">
          <h2 class="dash-sec__title">최근 주문</h2>
          <div class="dash-table-wrap">
            <table class="dash-table">
              <thead><tr><th>주문번호</th><th>고객</th><th>금액</th><th>상태</th></tr></thead>
              <tbody>
                <tr v-for="o in recentOrders" :key="o.id">
                  <td class="dash-table__id">#{{ o.id }}</td>
                  <td>{{ o.customer }}</td>
                  <td class="dash-table__num">₩{{ o.amount?.toLocaleString() }}</td>
                  <td><span class="dash-status-tag" :class="'dash-status--' + o.statusKey">{{ o.status }}</span></td>
                </tr>
                <tr v-if="!recentOrders.length"><td colspan="4" class="dash-table__empty">데이터 없음</td></tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- 상품 통계 -->
        <section class="dash-sec">
          <h2 class="dash-sec__title">상품 현황</h2>
          <div class="dash-product-stats">
            <div class="dash-pstat">
              <span class="dash-pstat__num">{{ productStats.total }}</span>
              <span class="dash-pstat__label">전체</span>
            </div>
            <div class="dash-pstat">
              <span class="dash-pstat__num dash-pstat__num--green">{{ productStats.onSale }}</span>
              <span class="dash-pstat__label">판매중</span>
            </div>
            <div class="dash-pstat">
              <span class="dash-pstat__num dash-pstat__num--red">{{ productStats.soldOut }}</span>
              <span class="dash-pstat__label">품절</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const cards = ref([
  { icon: 'group', value: '0', label: '총 회원', bg: '#111' },
  { icon: 'inventory_2', value: '0', label: '총 상품', bg: '#103728' },
  { icon: 'receipt_long', value: '0', label: '총 주문', bg: '#9C4F18' },
  { icon: 'payments', value: '₩0', label: '총 매출', bg: '#8E1C28' },
]);

const recentOrders = ref([]);
const dailySales = ref([]);
const orderStatusDist = ref({});
const brandSales = ref([]);
const productStats = ref({ total: 0, onSale: 0, soldOut: 0 });

onMounted(async () => {
  try {
    const data = await api.get('/admin/dashboard');
    if (data) {
      cards.value[0].value = String(data.totalMembers ?? 0);
      cards.value[1].value = String(data.totalProducts ?? 0);
      cards.value[2].value = String(data.totalOrders ?? 0);
      cards.value[3].value = '₩' + (data.totalRevenue ?? 0).toLocaleString();

      productStats.value = {
        total: data.totalProducts ?? 0,
        onSale: data.onSaleProducts ?? 0,
        soldOut: data.soldOutProducts ?? 0,
      };

      if (data.recentOrders) {
        recentOrders.value = data.recentOrders.map(o => ({
          id: o.orderId, customer: o.memberName || 'Guest',
          amount: o.totalPrice, status: o.status, statusKey: o.status?.toLowerCase() || '',
        }));
      }

      dailySales.value = data.dailySales || [];
      orderStatusDist.value = data.orderStatusDist || {};
      brandSales.value = data.brandSales || [];
    }
  } catch {}
});

function chartBarH(rev) {
  const max = Math.max(...dailySales.value.map(d => d.revenue), 1);
  return Math.max(4, Math.round((rev / max) * 180)) + 'px';
}

function statusLabel(s) {
  return { PAID: '결제완료', PREPARING: '준비중', SHIPPED: '배송중', DELIVERED: '배송완료', CANCELLED: '취소' }[s] || s;
}

function statusPct(count) {
  const total = Object.values(orderStatusDist.value).reduce((s, v) => s + v, 0);
  return total ? Math.round((count / total) * 100) : 0;
}

function brandColor(brand) {
  return { BEANPOLE: '#103728', CARHARTT: '#9C4F18', "LEVI'S": '#8E1C28', DICKIES: '#1A1A1A' }[brand] || '#555';
}
</script>

<style scoped>
.dash-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; flex-wrap: wrap; gap: 1rem; }
.dash-head__code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.dash-head__title { font-size: 1.75rem; font-weight: 900; }
.dash-btn { padding: 0.75rem 1.75rem; background: #111; color: #fff; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; text-decoration: none; }
.dash-btn:hover { opacity: 0.8; }

/* 카드 */
.dash-cards { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; margin-bottom: 2rem; }
@media (min-width: 768px) { .dash-cards { grid-template-columns: repeat(4, 1fr); } }
.dash-card { display: flex; align-items: center; gap: 1rem; padding: 1.25rem 1.5rem; background: #fff; border-radius: 0.5rem; border: 1px solid #eee; }
.dash-card__icon-wrap { width: 2.5rem; height: 2.5rem; border-radius: 0.375rem; display: flex; align-items: center; justify-content: center; }
.dash-card__icon-wrap .material-symbols-outlined { font-size: 1.25rem; color: #fff; font-variation-settings: "wght" 300; }
.dash-card__value { font-size: 1.375rem; font-weight: 900; color: #111; }
.dash-card__label { font-size: 0.625rem; color: #999; margin-top: 0.125rem; }

/* 그리드 */
.dash-grid { display: grid; grid-template-columns: 1fr; gap: 1.5rem; margin-bottom: 1.5rem; }
@media (min-width: 768px) { .dash-grid { grid-template-columns: 1fr 1fr; } }
.dash-grid--full { grid-template-columns: 1fr !important; }

/* 섹션 */
.dash-sec { background: #fff; border-radius: 0.5rem; padding: 1.5rem; border: 1px solid #eee; }
.dash-sec__title { font-size: 0.875rem; font-weight: 800; margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid #f0f0f0; }

/* 매출 차트 */
.dash-chart__bars { display: flex; align-items: flex-end; gap: 0; height: 220px; }
.dash-chart__col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.25rem; }
.dash-chart__bar-wrap { flex: 1; display: flex; align-items: flex-end; justify-content: center; width: 100%; }
.dash-chart__bar { width: 60%; background: linear-gradient(to top, #111, #333); border-radius: 0.25rem 0.25rem 0 0; min-height: 2px; position: relative; transition: height 0.5s; }
.dash-chart__bar-val { position: absolute; top: -1.25rem; left: 50%; transform: translateX(-50%); font-size: 0.5rem; font-weight: 700; color: #111; white-space: nowrap; }
.dash-chart__label { font-size: 0.625rem; font-weight: 600; color: #555; }
.dash-chart__orders { font-size: 0.5rem; color: #bbb; }

/* 주문 상태 */
.dash-status-list { display: flex; flex-direction: column; gap: 1rem; }
.dash-status-row__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.375rem; }
.dash-status-row__count { font-size: 0.75rem; font-weight: 700; color: #111; }
.dash-status-row__bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.dash-status-row__fill { height: 100%; background: #111; border-radius: 3px; transition: width 0.5s; }
.dash-status-tag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }
.dash-status--paid { background: #111; color: #fff; }
.dash-status--preparing { background: #f59e0b; color: #fff; }
.dash-status--shipped { background: #38a169; color: #fff; }
.dash-status--delivered { background: #f0f0f0; color: #666; }
.dash-status--cancelled { background: #fee2e2; color: #e53e3e; }

/* 브랜드 매출 */
.dash-brands { display: flex; flex-direction: column; gap: 1.25rem; }
.dash-brand__row { display: flex; justify-content: space-between; margin-bottom: 0.375rem; }
.dash-brand__name { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.1em; }
.dash-brand__rev { font-size: 0.6875rem; font-weight: 800; color: #111; }
.dash-brand__bar { height: 6px; background: #eee; border-radius: 3px; overflow: hidden; }
.dash-brand__fill { height: 100%; border-radius: 3px; transition: width 0.5s; }
.dash-brands__empty { text-align: center; color: #ccc; padding: 2rem; font-size: 0.8125rem; }

/* 테이블 */
.dash-table-wrap { overflow-x: auto; }
.dash-table { width: 100%; border-collapse: collapse; }
.dash-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.625rem 0.5rem; text-align: left; }
.dash-table td { font-size: 0.8125rem; padding: 0.75rem 0.5rem; border-bottom: 1px solid #f5f5f5; }
.dash-table__id { font-weight: 700; color: #111; }
.dash-table__num { font-weight: 700; text-align: right; }
.dash-table__empty { text-align: center; color: #ccc; padding: 2rem; }

/* 상품 현황 */
.dash-product-stats { display: flex; gap: 2rem; justify-content: center; padding: 1.5rem 0; }
.dash-pstat { display: flex; flex-direction: column; align-items: center; gap: 0.375rem; }
.dash-pstat__num { font-size: 2rem; font-weight: 900; color: #111; }
.dash-pstat__num--green { color: #38a169; }
.dash-pstat__num--red { color: #e53e3e; }
.dash-pstat__label { font-size: 0.625rem; font-weight: 600; color: #999; letter-spacing: 0.1em; }
</style>
