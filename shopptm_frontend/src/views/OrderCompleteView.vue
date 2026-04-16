<template>
  <Forme32Layout>
    <div class="oc">
      <div class="oc-inner">
        <!-- 성공 애니메이션 -->
        <div class="oc-check">
          <div class="oc-check__circle">
            <span class="material-symbols-outlined">check</span>
          </div>
        </div>

        <h1 class="oc-title">주문이 완료되었습니다!</h1>
        <p class="oc-sub">
          주문해 주셔서 감사합니다.<br />
          주문 확인 내역을 이메일로 보내드립니다.
        </p>

        <!-- 주문 정보 카드 -->
        <div class="oc-card">
          <div class="oc-card__row">
            <span class="oc-card__label">주문번호</span>
            <span class="oc-card__value oc-card__value--highlight">{{ orderNumber }}</span>
          </div>
          <div class="oc-card__row">
            <span class="oc-card__label">주문일시</span>
            <span class="oc-card__value">{{ orderDate }}</span>
          </div>
          <div class="oc-card__row">
            <span class="oc-card__label">결제수단</span>
            <span class="oc-card__value">신용카드</span>
          </div>
          <div class="oc-card__row">
            <span class="oc-card__label">배송</span>
            <span class="oc-card__value">무료배송 (2-3일 소요)</span>
          </div>
        </div>

        <!-- 주문 상품 -->
        <div v-if="orderItems.length" class="oc-items">
          <p class="oc-items__label">주문 상품</p>
          <div v-for="item in orderItems" :key="item.productId" class="oc-oitem">
            <div class="oc-oitem__img">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="oc-oitem__info">
              <p class="oc-oitem__name">{{ item.name }}</p>
              <p class="oc-oitem__meta">Size: {{ item.size || '-' }} · Color: {{ item.color || '-' }} · {{ item.quantity }}개</p>
            </div>
            <p class="oc-oitem__price">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
          </div>
          <div class="oc-oitem-total">
            <span>총 결제금액</span>
            <span>₩{{ totalAmount.toLocaleString() }}</span>
          </div>
        </div>

        <!-- 액션 -->
        <div class="oc-actions">
          <RouterLink to="/mypage" class="oc-btn oc-btn--outline">
            <span class="material-symbols-outlined">receipt_long</span>
            주문 내역
          </RouterLink>
          <RouterLink to="/" class="oc-btn oc-btn--primary">
            <span class="material-symbols-outlined">storefront</span>
            쇼핑 계속하기
          </RouterLink>
        </div>
      </div>
    </div>
  </Forme32Layout>
</template>

<script setup>
import { ref } from "vue";
import Forme32Layout from "@/layouts/Forme32Layout.vue";

const orderNumber = '#' + Math.floor(Math.random() * 900000 + 100000);
const orderDate = new Date().toLocaleString('ko-KR', {
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit',
});

// localStorage에서 주문 데이터 로드
let lastOrder = { items: [], totalAmount: 0 };
try { lastOrder = JSON.parse(localStorage.getItem('forme_last_order')) || lastOrder; } catch {}

const orderItems = ref(lastOrder.items || []);
const totalAmount = ref(lastOrder.totalAmount || orderItems.value.reduce((s, i) => s + (i.price || 0) * (i.quantity || 1), 0));
</script>

<style scoped>
.oc {
  min-height: calc(100dvh - 200px);
  display: flex; align-items: center; justify-content: center;
  padding: 4rem 2rem;
}
.oc-inner {
  width: 100%; max-width: 520px;
  display: flex; flex-direction: column; align-items: center; text-align: center;
}

/* 체크 아이콘 */
.oc-check { margin-bottom: 2rem; }
.oc-check__circle {
  width: 4.5rem; height: 4.5rem; border-radius: 50%;
  background: #111; display: flex; align-items: center; justify-content: center;
  animation: ocPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.oc-check__circle .material-symbols-outlined {
  font-size: 2rem; color: #fff; font-variation-settings: "wght" 600;
}
@keyframes ocPop {
  0% { transform: scale(0); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.oc-title {
  font-size: clamp(1.5rem, 4vw, 2rem); font-weight: 900;
  letter-spacing: -0.02em; margin-bottom: 0.75rem;
}
.oc-sub { font-size: 0.875rem; color: #999; line-height: 1.7; margin-bottom: 2.5rem; }

/* 주문 정보 카드 */
.oc-card {
  width: 100%; background: #fafaf8; border-radius: 0.75rem;
  padding: 1.5rem 1.75rem; margin-bottom: 2rem;
  display: flex; flex-direction: column; gap: 0.75rem;
}
.oc-card__row { display: flex; justify-content: space-between; align-items: center; }
.oc-card__label { font-size: 0.75rem; color: #999; }
.oc-card__value { font-size: 0.8125rem; font-weight: 600; color: #333; }
.oc-card__value--highlight { color: #111; font-weight: 800; font-size: 0.875rem; }

/* 주문 상품 */
.oc-items {
  width: 100%; text-align: left; margin-bottom: 2.5rem;
}
.oc-items__label {
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; color: #bbb; margin-bottom: 0.75rem;
}
.oc-oitem {
  display: flex; align-items: center; gap: 1rem;
  padding: 0.875rem 0; border-bottom: 1px solid #f0f0f0;
}
.oc-oitem__img {
  width: 52px; height: 60px; flex-shrink: 0; overflow: hidden;
  background: #f3f1ec; border-radius: 0.25rem;
}
.oc-oitem__img img { width: 100%; height: 100%; object-fit: cover; }
.oc-oitem__info { flex: 1; }
.oc-oitem__name { font-size: 0.8125rem; font-weight: 600; color: #111; }
.oc-oitem__meta { font-size: 0.6875rem; color: #999; margin-top: 0.125rem; }
.oc-oitem__price { font-size: 0.8125rem; font-weight: 700; white-space: nowrap; }
.oc-oitem-total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 1rem; margin-top: 0.25rem;
  font-size: 1rem; font-weight: 900; color: #111;
}

/* 액션 버튼 */
.oc-actions { display: flex; gap: 0.75rem; width: 100%; }
.oc-btn {
  flex: 1; display: flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 1rem; font-size: 0.8125rem; font-weight: 700;
  border-radius: 0.5rem; text-decoration: none; transition: all 0.2s;
}
.oc-btn .material-symbols-outlined { font-size: 1.125rem; font-variation-settings: "wght" 300; }
.oc-btn--outline {
  border: 1.5px solid #ddd; color: #555; background: #fff;
}
.oc-btn--outline:hover { border-color: #111; color: #111; }
.oc-btn--primary {
  background: #111; color: #fff;
}
.oc-btn--primary:hover { background: #333; }
</style>
