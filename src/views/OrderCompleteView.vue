<template>
  <main class="page-wrapper complete-page">
    <div class="complete-inner">
      <!-- 완료 아이콘 -->
      <div class="complete-icon">
        <span class="material-symbols-outlined">check_circle</span>
      </div>

      <!-- 타이틀 -->
      <h1 class="complete-title">주문이 완료되었습니다</h1>
      <p class="complete-desc">
        주문해 주셔서 감사합니다.<br />
        주문 확인 이메일이 발송되었습니다.
      </p>

      <!-- 주문 정보 -->
      <div class="complete-info">
        <div class="complete-info__row">
          <span class="complete-info__label">주문번호</span>
          <span class="complete-info__value">{{ orderNumber }}</span>
        </div>
        <div class="complete-info__row">
          <span class="complete-info__label">주문일시</span>
          <span class="complete-info__value">{{ orderDate }}</span>
        </div>
        <div class="complete-info__row">
          <span class="complete-info__label">결제금액</span>
          <span class="complete-info__value"
            >₩{{ totalAmount.toLocaleString() }}</span
          >
        </div>
        <div class="complete-info__row">
          <span class="complete-info__label">결제수단</span>
          <span class="complete-info__value">신용카드</span>
        </div>
      </div>

      <!-- 주문 상품 목록 -->
      <div class="complete-items">
        <p class="complete-items__label">주문 상품</p>
        <div
          v-for="item in orderItems"
          :key="item.productId"
          class="complete-item"
        >
          <div class="complete-item__img-wrap">
            <img
              :src="item.image"
              :alt="item.name"
              class="complete-item__img"
            />
          </div>
          <div class="complete-item__info">
            <p class="complete-item__name">{{ item.name }}</p>
            <p class="complete-item__meta">
              Size: {{ item.size }} · 수량: {{ item.quantity }}
            </p>
            <p class="complete-item__price">
              ₩{{ (item.price * item.quantity).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>

      <!-- 버튼 -->
      <div class="complete-actions">
        <RouterLink to="/mypage" class="complete-btn complete-btn--outline">
          주문 내역 보기
        </RouterLink>
        <RouterLink to="/" class="complete-btn complete-btn--primary">
          쇼핑 계속하기
        </RouterLink>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const { items } = storeToRefs(cartStore);

// 주문 번호 생성
const orderNumber = "#" + Math.floor(Math.random() * 900000 + 100000);

// 주문 일시
const orderDate = new Date().toLocaleString("ko-KR", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

// 주문 상품 (장바구니에서 가져옴)
const orderItems = computed(() => items.value);

// 총 결제금액
const totalAmount = computed(() =>
  orderItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0),
);
</script>

<style scoped>
.complete-page {
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}

.complete-inner {
  width: 100%;
  max-width: 560px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* 아이콘 */
.complete-icon .material-symbols-outlined {
  font-size: 4rem;
  color: var(--color-primary);
  font-variation-settings:
    "FILL" 1,
    "wght" 300,
    "GRAD" 0,
    "opsz" 24;
}

/* 타이틀 */
.complete-title {
  font-family: var(--font-headline);
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin-top: 1.5rem;
  letter-spacing: -0.02em;
}

.complete-desc {
  font-size: 0.9375rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  margin-top: 1rem;
}

/* 주문 정보 */
.complete-info {
  width: 100%;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-top: 2.5rem;
  padding: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.complete-info__row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.complete-info__label {
  font-size: 0.8125rem;
  color: var(--color-on-surface-variant);
}

.complete-info__value {
  font-size: 0.8125rem;
  font-weight: 600;
}

/* 주문 상품 */
.complete-items {
  width: 100%;
  margin-top: 2rem;
}

.complete-items__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-outline);
  margin-bottom: 1rem;
  text-align: left;
}

.complete-item {
  display: flex;
  gap: 1rem;
  padding: 1rem 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  text-align: left;
}

.complete-item__img-wrap {
  width: 64px;
  height: 72px;
  background-color: var(--color-surface-container-low);
  flex-shrink: 0;
  overflow: hidden;
}

.complete-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.complete-item__name {
  font-size: 0.875rem;
  font-weight: 500;
}

.complete-item__meta {
  font-size: 0.75rem;
  color: var(--color-on-surface-variant);
  margin-top: 0.25rem;
}

.complete-item__price {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

/* 버튼 */
.complete-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 2.5rem;
  width: 100%;
}

.complete-btn {
  flex: 1;
  padding: 1rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  text-align: center;
  cursor: pointer;
  transition: opacity 0.2s;
}

.complete-btn--primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}

.complete-btn--outline {
  border: 1px solid var(--color-outline-variant);
  color: var(--color-on-surface);
}

.complete-btn:hover {
  opacity: 0.8;
}
</style>
