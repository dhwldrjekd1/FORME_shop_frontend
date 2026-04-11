<template>
  <main class="page-wrapper">
    <div class="cart-page container--full">
      <!-- 페이지 헤더 -->
      <header class="cart-header">
        <h1 class="cart-header__title">Your Bag</h1>
        <p class="cart-header__sub">Shipment 01 of 01 — Standard Delivery</p>
      </header>

      <!-- 장바구니 비어있을 때 -->
      <div v-if="items.length === 0" class="cart-empty">
        <p>Your bag is empty.</p>
        <RouterLink to="/products" class="cart-empty__link"
          >Continue Shopping</RouterLink
        >
      </div>

      <!-- 장바구니 콘텐츠 -->
      <div v-else class="cart-content">
        <!-- 왼쪽: 아이템 목록 -->
        <div class="cart-items">
          <div v-for="item in items" :key="item.id" class="cart-item">
            <div class="cart-item__img-wrap">
              <img :src="item.image" :alt="item.name" class="cart-item__img" />
            </div>

            <div class="cart-item__info">
              <div class="cart-item__top">
                <div>
                  <h3 class="cart-item__name">{{ item.name }}</h3>
                  <div class="cart-item__attrs">
                    <span class="cart-item__attr-key">Color:</span>
                    <span class="cart-item__attr-val">{{ item.color }}</span>
                    <span class="cart-item__attr-key">Size:</span>
                    <span class="cart-item__attr-val">{{ item.size }}</span>
                    <span class="cart-item__attr-key">Quantity:</span>
                    <span class="cart-item__attr-val">{{ item.quantity }}</span>
                  </div>
                </div>
                <!-- 가격 × 수량 -->
                <p class="cart-item__price">
                  ₩{{ (item.price * item.quantity).toLocaleString() }}
                </p>
              </div>

              <!-- 제거 버튼: cartStore.removeItem 호출 -->
              <button
                class="cart-item__remove"
                @click="cartStore.removeItem(item.id)"
              >
                REMOVE
              </button>
            </div>
          </div>
        </div>

        <!-- 오른쪽: 주문 요약 -->
        <aside class="cart-summary">
          <h2 class="cart-summary__title">Order Summary</h2>

          <div class="cart-summary__rows">
            <div class="cart-summary__row">
              <span class="cart-summary__label">Subtotal</span>
              <span>₩{{ totalPrice.toLocaleString() }}</span>
            </div>
            <div class="cart-summary__row">
              <span class="cart-summary__label">Shipping</span>
              <span class="cart-summary__free">Complimentary</span>
            </div>
            <div class="cart-summary__row">
              <span class="cart-summary__label">Estimated Tax</span>
              <!-- 세금 8% -->
              <span>₩{{ estimatedTax.toLocaleString() }}</span>
            </div>
            <div class="cart-summary__row cart-summary__row--total">
              <span class="cart-summary__total-label">Total</span>
              <span class="cart-summary__total-amount">
                ₩{{ grandTotal.toLocaleString() }}
              </span>
            </div>
          </div>

          <!-- 결제 페이지로 이동 -->
          <RouterLink to="/payment" class="cart-summary__checkout">
            PROCEED TO CHECKOUT
          </RouterLink>

          <p class="cart-summary__note">
            TAXES AND SHIPPING CALCULATED AT CHECKOUT.<br />
            SECURE PAYMENTS POWERED BY STRIPE.
          </p>
        </aside>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();

// storeToRefs: 반응성 유지하면서 store 값 꺼내기
const { items, totalPrice } = storeToRefs(cartStore);

// 세금 8% (소수점 반올림)
const estimatedTax = computed(() => Math.round(totalPrice.value * 0.08));

// 최종 결제 금액
const grandTotal = computed(() => totalPrice.value + estimatedTax.value);
</script>

<style scoped>
.cart-page {
  padding-top: 2rem;
  padding-bottom: 6rem;
}

/* ── 헤더 ── */
.cart-header {
  margin-bottom: 4rem;
}

.cart-header__title {
  font-family: var(--font-headline);
  font-size: clamp(3rem, 7vw, 4.5rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1;
  margin-bottom: 0.75rem;
}

.cart-header__sub {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

/* ── 빈 장바구니 ── */
.cart-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding: 6rem 0;
  text-align: center;
}

.cart-empty__link {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  border-bottom: 1px solid var(--color-primary);
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.cart-empty__link:hover {
  opacity: 0.6;
}

/* ── 2단 레이아웃 ── */
.cart-content {
  display: grid;
  grid-template-columns: 1fr; /* 모바일: 1단 */
  gap: 4rem;
}

@media (min-width: 1024px) {
  .cart-content {
    grid-template-columns: 2fr 1fr; /* 데스크탑: 아이템(2) + 요약(1) */
    align-items: start;
  }
}

/* ── 아이템 목록 ── */
.cart-items {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.cart-item {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

@media (min-width: 640px) {
  .cart-item {
    flex-direction: row; /* 태블릿 이상: 이미지 + 정보 가로 배치 */
    gap: 2rem;
  }
}

.cart-item__img-wrap {
  width: 100%;
  max-width: 16rem;
  aspect-ratio: 3/4;
  overflow: hidden;
  background-color: var(--color-surface-container);
  flex-shrink: 0; /* 이미지 영역 줄어들지 않게 */
}

.cart-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item__info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 0.5rem 0;
}

.cart-item__top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
}

.cart-item__name {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 300;
  letter-spacing: -0.01em;
  margin-bottom: 1rem;
}

/* 2컬럼 그리드: 키(왼쪽) + 값(오른쪽) */
.cart-item__attrs {
  display: grid;
  grid-template-columns: auto 1fr;
  column-gap: 0.75rem;
  row-gap: 0.375rem;
}

.cart-item__attr-key {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

.cart-item__attr-val {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

.cart-item__price {
  font-size: 0.875rem;
  letter-spacing: 0.05em;
  white-space: nowrap; /* 가격 줄바꿈 방지 */
}

.cart-item__remove {
  align-self: flex-start;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  border-bottom: 1px solid transparent;
  padding-bottom: 1px;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.cart-item__remove:hover {
  color: var(--color-primary);
  border-bottom-color: rgba(0, 0, 0, 0.2);
}

/* ── 주문 요약 ── */
.cart-summary {
  background-color: var(--color-surface-container-lowest);
  padding: 2rem;
  position: sticky; /* 스크롤해도 화면에 고정 */
  top: calc(var(--header-height) + 2rem);
}

.cart-summary__title {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 300;
  text-transform: uppercase;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 1rem;
  margin-bottom: 1.5rem;
}

.cart-summary__rows {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cart-summary__row {
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}

/* 합계 행: 위에 구분선 추가 */
.cart-summary__row--total {
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  margin-top: 0.5rem;
}

.cart-summary__label {
  color: var(--color-on-surface-variant);
}
.cart-summary__free {
  font-style: italic;
  color: var(--color-secondary);
}

.cart-summary__total-label {
  font-size: 0.6875rem;
}
.cart-summary__total-amount {
  font-size: 1rem;
  letter-spacing: 0;
  text-transform: none;
}

/* 결제 버튼 */
.cart-summary__checkout {
  display: block;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.5rem;
  text-align: center;
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 1rem;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.cart-summary__checkout:hover {
  opacity: 0.88;
}
.cart-summary__checkout:active {
  transform: scale(0.98);
}

.cart-summary__note {
  font-size: 0.5625rem;
  text-align: center;
  color: var(--color-on-surface-variant);
  line-height: 1.8;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
</style>
