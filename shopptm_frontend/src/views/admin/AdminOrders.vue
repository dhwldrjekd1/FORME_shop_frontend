<template>
  <AdminLayout>
    <div class="ao">
      <div class="ao-head">
        <div><p class="ao-code">[ 02 / ORDERS ]</p><h1 class="ao-title">주문 관리</h1></div>
        <div class="ao-filters">
          <select class="ao-filter-sel" v-model="filterStatus" @change="applyFilter">
            <option value="">전체 주문</option>
            <option v-for="s in statuses" :key="s.key" :value="s.key">{{ s.label }}</option>
          </select>
          <select class="ao-filter-sel" v-model="filterDelivery" @change="applyFilter">
            <option value="">전체 배송</option>
            <option value="READY">배송 준비</option>
            <option value="IN_TRANSIT">배송중</option>
            <option value="OUT_FOR_DELIVERY">배달중</option>
            <option value="DELIVERED">배송완료</option>
          </select>
        </div>
      </div>
      <div class="ao-wrap">
        <table class="ao-table">
          <thead><tr><th>주문번호</th><th>고객</th><th>상품</th><th>금액</th><th>상태</th><th>날짜</th><th></th></tr></thead>
          <tbody>
            <template v-for="o in filteredOrders" :key="o.id">
              <tr :class="{ 'ao-row--open': openId === o.id }">
                <td class="t-id">#{{ o.id }}</td>
                <td>{{ o.receiverName }}</td>
                <td class="t-items">{{ o.orderItems?.length || 0 }}건</td>
                <td class="t-r">₩{{ o.totalPrice?.toLocaleString() }}</td>
                <td>
                  <select class="ao-sel" :value="o.status" @change="changeStatus(o.id, $event.target.value)">
                    <option v-for="s in statuses" :key="s.key" :value="s.key">{{ s.label }}</option>
                  </select>
                </td>
                <td class="t-date">{{ o.createdAt?.slice(0,10) }}</td>
                <td><button class="t-link" @click="toggleDetail(o.id)">{{ openId === o.id ? '닫기' : '상세' }}</button></td>
              </tr>
              <tr v-if="openId === o.id" class="ao-detail-row">
                <td colspan="7">
                  <div class="ao-detail">
                    <div class="ao-detail__info">
                      <p><strong>수령인:</strong> {{ o.receiverName }} · {{ o.receiverPhone }}</p>
                      <p><strong>주소:</strong> {{ o.address }}</p>
                    </div>
                    <div class="ao-detail__items">
                      <div v-for="item in o.orderItems" :key="item.id" class="ao-detail__item">
                        <img v-if="item.productImageUrl" :src="item.productImageUrl" class="ao-detail__img" />
                        <div class="ao-detail__item-info">
                          <p class="ao-detail__item-name">{{ item.productName }}</p>
                          <p class="ao-detail__item-meta">Size: {{ item.size || '-' }} · {{ item.quantity }}개 · ₩{{ item.price?.toLocaleString() }}</p>
                        </div>
                        <p class="ao-detail__item-total">₩{{ item.totalPrice?.toLocaleString() }}</p>
                      </div>
                    </div>

                    <!-- 배송 관리 -->
                    <div class="ao-delivery">
                      <h4 class="ao-delivery__title">배송 정보</h4>
                      <div v-if="deliveries[o.id]" class="ao-delivery__info">
                        <div class="ao-delivery__row">
                          <label>택배사</label>
                          <input v-model="deliveries[o.id].carrier" type="text" placeholder="택배사" />
                        </div>
                        <div class="ao-delivery__row">
                          <label>운송장 번호</label>
                          <input v-model="deliveries[o.id].trackingNumber" type="text" placeholder="운송장 번호" />
                        </div>
                        <div class="ao-delivery__row">
                          <label>배송 상태</label>
                          <select v-model="deliveries[o.id].status">
                            <option value="READY">준비</option>
                            <option value="IN_TRANSIT">배송중</option>
                            <option value="OUT_FOR_DELIVERY">배달중</option>
                            <option value="DELIVERED">배송완료</option>
                          </select>
                        </div>
                        <div class="ao-delivery__dates">
                          <span v-if="deliveries[o.id].shippedAt">출고: {{ deliveries[o.id].shippedAt?.slice(0,10) }}</span>
                          <span v-if="deliveries[o.id].deliveredAt">도착: {{ deliveries[o.id].deliveredAt?.slice(0,10) }}</span>
                        </div>
                        <button class="ao-delivery__btn" @click="updateDelivery(o.id)">배송 정보 수정</button>
                      </div>
                      <div v-else class="ao-delivery__none">
                        <p>등록된 배송 정보가 없습니다</p>
                        <div class="ao-delivery__create">
                          <input v-model="newDelivery.carrier" type="text" placeholder="택배사" />
                          <input v-model="newDelivery.trackingNumber" type="text" placeholder="운송장 번호 (선택)" />
                          <button class="ao-delivery__btn" @click="createDelivery(o.id)">배송 등록</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </template>
            <tr v-if="!filteredOrders.length"><td colspan="7" class="t-empty">주문 없음</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const orders = ref([]);
const openId = ref(null);
const deliveries = ref({});
const newDelivery = ref({ carrier: '', trackingNumber: '' });
const filterStatus = ref('');
const filterDelivery = ref('');

const filteredOrders = computed(() => {
  let list = orders.value;
  if (filterStatus.value) list = list.filter(o => o.status === filterStatus.value);
  if (filterDelivery.value) list = list.filter(o => deliveries.value[o.id]?.status === filterDelivery.value);
  return list;
});

function applyFilter() {
  // 배송 필터 선택 시 배송 정보 없는 주문도 로드 시도
  if (filterDelivery.value) {
    orders.value.forEach(o => {
      if (!deliveries.value[o.id]) {
        api.get(`/orders/${o.id}/delivery`).then(d => { if (d) deliveries.value[o.id] = { ...d }; }).catch(() => {});
      }
    });
  }
}

const statuses = [
  { key: 'PENDING', label: '주문완료' },
  { key: 'PAID', label: '결제완료' },
  { key: 'PREPARING', label: '준비중' },
  { key: 'SHIPPED', label: '배송중' },
  { key: 'DELIVERED', label: '배송완료' },
  { key: 'CANCELLED', label: '취소' },
];

onMounted(async () => {
  try { orders.value = await api.get('/admin/orders') || []; } catch {}
});

async function changeStatus(id, status) {
  try {
    await api.patch(`/admin/orders/${id}/status`, { status });
    const o = orders.value.find(x => x.id === id);
    if (o) o.status = status;
  } catch (e) { alert(e.message); }
}

async function toggleDetail(id) {
  if (openId.value === id) { openId.value = null; return; }
  openId.value = id;
  // 배송 정보 로드
  if (!deliveries.value[id]) {
    try {
      const d = await api.get(`/orders/${id}/delivery`);
      if (d) deliveries.value[id] = { ...d };
    } catch {}
  }
}

async function createDelivery(orderId) {
  if (!newDelivery.value.carrier.trim()) { alert('택배사를 입력해주세요.'); return; }
  try {
    const d = await api.post(`/admin/orders/${orderId}/delivery`, {
      carrier: newDelivery.value.carrier.trim(),
      trackingNumber: newDelivery.value.trackingNumber.trim() || null,
    });
    deliveries.value[orderId] = { ...d };
    newDelivery.value = { carrier: '', trackingNumber: '' };
  } catch (e) { alert(e?.data?.message || e?.message || '배송 등록 실패'); }
}

async function updateDelivery(orderId) {
  const del = deliveries.value[orderId];
  if (!del) return;
  try {
    const d = await api.put(`/admin/deliveries/${del.id}`, {
      carrier: del.carrier, trackingNumber: del.trackingNumber, status: del.status,
    });
    deliveries.value[orderId] = { ...d };
    alert('배송 정보가 수정되었습니다.');
  } catch (e) { alert(e?.data?.message || e?.message || '수정 실패'); }
}
</script>

<style scoped>
.ao-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
.ao-filters { display: flex; gap: 0.5rem; }
.ao-filter-sel { padding: 0.5rem 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem; font-size: 0.75rem; cursor: pointer; outline: none; background: #fff; }
.ao-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.ao-title { font-size: 1.75rem; font-weight: 900; }
.ao-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.ao-table { width: 100%; border-collapse: collapse; }
.ao-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.ao-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #111; }
.t-items { color: #555; font-weight: 600; }
.t-r { font-weight: 700; text-align: right; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-link { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.625rem; border-radius: 0.25rem; }
.t-link:hover { border-color: #111; }
.ao-sel { font-size: 0.6875rem; padding: 0.375rem 0.5rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem; cursor: pointer; outline: none; }
.ao-row--open { background: #fafaf8; }

/* 상세 */
.ao-detail-row td { padding: 0 !important; border-bottom: 2px solid #eee; }
.ao-detail { padding: 1.25rem 1.5rem; }
.ao-detail__info { margin-bottom: 1rem; }
.ao-detail__info p { font-size: 0.75rem; color: #555; margin-bottom: 0.25rem; }
.ao-detail__info strong { color: #111; }
.ao-detail__items { display: flex; flex-direction: column; gap: 0; }
.ao-detail__item { display: flex; align-items: center; gap: 0.75rem; padding: 0.625rem 0; border-top: 1px solid #f0f0f0; }
.ao-detail__img { width: 44px; height: 52px; object-fit: cover; border-radius: 0.25rem; background: #f3f1ec; }
.ao-detail__item-info { flex: 1; }
.ao-detail__item-name { font-size: 0.8125rem; font-weight: 600; color: #111; }
.ao-detail__item-meta { font-size: 0.6875rem; color: #999; margin-top: 0.125rem; }
.ao-detail__item-total { font-size: 0.8125rem; font-weight: 700; }

/* 배송 관리 */
.ao-delivery { margin-top: 1.25rem; padding-top: 1rem; border-top: 1px solid #eee; }
.ao-delivery__title { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.1em; color: #FF2D2D; margin-bottom: 0.75rem; }
.ao-delivery__info { display: flex; flex-direction: column; gap: 0.625rem; }
.ao-delivery__row { display: flex; align-items: center; gap: 0.75rem; }
.ao-delivery__row label { font-size: 0.6875rem; font-weight: 600; color: #999; width: 80px; flex-shrink: 0; }
.ao-delivery__row input, .ao-delivery__row select {
  flex: 1; padding: 0.5rem 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem;
  font-size: 0.8125rem; outline: none;
}
.ao-delivery__row input:focus, .ao-delivery__row select:focus { border-color: #111; }
.ao-delivery__dates { display: flex; gap: 1rem; font-size: 0.6875rem; color: #999; margin-top: 0.25rem; }
.ao-delivery__btn {
  margin-top: 0.5rem; padding: 0.5rem 1.25rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; border-radius: 0.25rem; cursor: pointer;
  align-self: flex-start;
}
.ao-delivery__none { }
.ao-delivery__none p { font-size: 0.75rem; color: #bbb; margin-bottom: 0.75rem; }
.ao-delivery__create { display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap; }
.ao-delivery__create input {
  padding: 0.5rem 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem;
  font-size: 0.8125rem; outline: none; width: 160px;
}
.ao-delivery__create input:focus { border-color: #111; }
</style>
