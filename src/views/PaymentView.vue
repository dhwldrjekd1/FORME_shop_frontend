<template>
  <main class="page-wrapper">
    <div class="payment-page">
      <!-- 헤더 -->
      <section class="payment-header">
        <h1 class="payment-header__title">Secure Checkout</h1>
        <p class="payment-header__step">Step 1 of 2: Shipping & Payment</p>
      </section>

      <div class="payment-form">
        <!-- 01. 연락처 -->
        <section class="payment-section">
          <div class="payment-section__head">
            <span class="payment-section__num">01</span>
            <h2 class="payment-section__title">Contact Information</h2>
          </div>
          <div class="payment-section__body">
            <div class="payment-field">
              <input
                v-model="form.email"
                type="email"
                placeholder="Email Address"
                class="payment-input"
              />
            </div>
            <label class="payment-checkbox">
              <input type="checkbox" v-model="form.newsletter" />
              <span>Keep me updated on new Atelier collections</span>
            </label>
          </div>
        </section>

        <!-- 02. 배송지 -->
        <section class="payment-section">
          <div class="payment-section__head">
            <span class="payment-section__num">02</span>
            <h2 class="payment-section__title">Shipping Destination</h2>
          </div>
          <!-- 2컬럼 그리드 -->
          <div class="payment-section__body payment-section__body--grid">
            <input
              v-model="form.firstName"
              type="text"
              placeholder="First Name"
              class="payment-input"
            />
            <input
              v-model="form.lastName"
              type="text"
              placeholder="Last Name"
              class="payment-input"
            />
            <!-- payment-input--full: 2컬럼 전체 차지 -->
            <input
              v-model="form.address"
              type="text"
              placeholder="Address"
              class="payment-input payment-input--full"
            />
            <input
              v-model="form.address2"
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              class="payment-input payment-input--full"
            />
            <input
              v-model="form.postcode"
              type="text"
              placeholder="Postal Code"
              class="payment-input"
            />
            <input
              v-model="form.city"
              type="text"
              placeholder="City"
              class="payment-input"
            />
          </div>
        </section>

        <!-- 03. 결제 수단 -->
        <section class="payment-section">
          <div class="payment-section__head">
            <span class="payment-section__num">03</span>
            <h2 class="payment-section__title">Payment Method</h2>
          </div>
          <div class="payment-section__body">
            <div class="payment-card-box">
              <div class="payment-card-box__header">
                <label class="payment-radio">
                  <input type="radio" name="payment" checked />
                  <span>Credit Card</span>
                </label>
                <span
                  class="material-symbols-outlined"
                  style="color: var(--color-on-surface-variant)"
                >
                  credit_card
                </span>
              </div>
              <div class="payment-card-fields">
                <!-- 카드번호: 자물쇠 아이콘 포함 -->
                <div class="payment-field payment-field--icon">
                  <input
                    v-model="form.cardNumber"
                    type="text"
                    placeholder="Card Number"
                    class="payment-input"
                  />
                  <span class="material-symbols-outlined payment-field__icon"
                    >lock</span
                  >
                </div>
                <input
                  v-model="form.expiry"
                  type="text"
                  placeholder="MM / YY"
                  class="payment-input"
                />
                <input
                  v-model="form.cvv"
                  type="text"
                  placeholder="CVV"
                  class="payment-input"
                />
              </div>
            </div>
          </div>
        </section>

        <!-- 04. 주문 확인 -->
        <section class="payment-section">
          <div class="payment-section__head">
            <span class="payment-section__num">04</span>
            <h2 class="payment-section__title">Review Order</h2>
          </div>
          <div class="payment-section__body">
            <div class="payment-order-box">
              <!-- 장바구니 아이템 목록 -->
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="payment-order-item"
              >
                <div class="payment-order-item__img-wrap">
                  <img
                    :src="item.image"
                    :alt="item.name"
                    class="payment-order-item__img"
                  />
                </div>
                <div class="payment-order-item__info">
                  <p class="payment-order-item__label">Archive Collection</p>
                  <h3 class="payment-order-item__name">{{ item.name }}</h3>
                  <p class="payment-order-item__meta">
                    Size: {{ item.size }} | Color: {{ item.color }}
                  </p>
                </div>
                <p class="payment-order-item__price">
                  ${{ (item.price * item.quantity).toLocaleString() }}
                </p>
              </div>

              <!-- 금액 합계 -->
              <div class="payment-order-totals">
                <div class="payment-order-row">
                  <span>Subtotal</span>
                  <span>${{ totalPrice.toLocaleString() }}</span>
                </div>
                <div class="payment-order-row">
                  <span>Shipping</span>
                  <span>Complimentary</span>
                </div>
                <div class="payment-order-row payment-order-row--total">
                  <span>Total</span>
                  <span>${{ grandTotal.toLocaleString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- 결제 버튼 -->
        <button class="payment-submit" @click="handleSubmit">
          Place Order — ${{ grandTotal.toLocaleString() }}
        </button>

        <p class="payment-secure">
          <span
            class="material-symbols-outlined"
            style="font-size: 1rem; vertical-align: middle"
          >
            lock
          </span>
          Your payment is secured with SSL encryption
        </p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

const cartStore = useCartStore();
const router = useRouter();

const { items: cartItems, totalPrice } = storeToRefs(cartStore);

// 세금 8% + 합계
const grandTotal = computed(
  () => totalPrice.value + Math.round(totalPrice.value * 0.08),
);

// 폼 데이터: v-model 로 양방향 바인딩
const form = ref({
  email: "",
  newsletter: false,
  firstName: "",
  lastName: "",
  address: "",
  address2: "",
  postcode: "",
  city: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
});

function handleSubmit() {
  // TODO: Spring Boot 연결 시 API 호출로 교체
  alert("주문이 완료되었습니다!");
  cartStore.clearCart(); // 결제 완료 후 장바구니 비우기
  router.push("/order-complete");
}
</script>

<style scoped>
.payment-page {
  max-width: 42rem;
  margin: 0 auto;
  padding: 2rem 1.5rem 6rem;
}

/* ── 헤더 ── */
.payment-header {
  text-align: center;
  margin-bottom: 5rem;
}

.payment-header__title {
  font-family: var(--font-headline);
  font-size: 1.875rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
}

.payment-header__step {
  font-size: 0.8125rem;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.05em;
}

/* ── 섹션 공통 ── */
.payment-form {
  display: flex;
  flex-direction: column;
  gap: 5rem; /* 섹션 간격 넓게 */
}

.payment-section__head {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}

.payment-section__num {
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  color: var(--color-on-surface-variant);
}

.payment-section__title {
  font-family: var(--font-headline);
  font-size: 1.125rem;
  font-weight: 400;
  text-transform: uppercase;
}

.payment-section__body {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* 2컬럼 그리드 (배송지 섹션) */
.payment-section__body--grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem 2rem;
}

/* ── 인풋 ── */
.payment-field {
  position: relative;
}

/* 아이콘 있는 인풋 */
.payment-field--icon {
  display: flex;
  align-items: center;
}

.payment-field__icon {
  position: absolute;
  right: 0;
  color: var(--color-outline-variant);
  font-size: 1.25rem;
}

.payment-input {
  width: 100%;
  background-color: var(--color-surface-container-low);
  border: none;
  border-bottom: 1px solid var(--color-outline-variant);
  padding: 1rem 0;
  font-size: 0.9375rem;
  color: var(--color-on-surface);
  transition: border-color 0.2s;
}

.payment-input::placeholder {
  color: var(--color-outline);
  opacity: 0.6;
}

.payment-input:focus {
  border-bottom-color: var(--color-primary);
}

/* 2컬럼 전체 차지 */
.payment-input--full {
  grid-column: span 2;
}

/* 체크박스 */
.payment-checkbox {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  cursor: pointer;
}

/* 라디오 */
.payment-radio {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  cursor: pointer;
}

/* ── 카드 박스 ── */
.payment-card-box {
  border: 0.5px solid rgba(0, 0, 0, 0.08);
  padding: 2rem;
}

.payment-card-box__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}

/* 카드 필드: 카드번호(전체) + 유효기간/CVV(반반) */
.payment-card-fields {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
}

.payment-card-fields .payment-field {
  grid-column: span 2; /* 카드번호는 전체 너비 */
}

/* ── 주문 확인 박스 ── */
.payment-order-box {
  background-color: var(--color-surface-container-low);
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.payment-order-item {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.payment-order-item__img-wrap {
  width: 5rem;
  height: 6rem;
  background-color: var(--color-surface-container-lowest);
  flex-shrink: 0;
  overflow: hidden;
}

.payment-order-item__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.1);
  opacity: 0.9;
}

.payment-order-item__info {
  flex: 1;
}

.payment-order-item__label {
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
  margin-bottom: 0.25rem;
}

.payment-order-item__name {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 400;
  margin-bottom: 0.375rem;
}

.payment-order-item__meta {
  font-size: 0.6875rem;
  color: var(--color-on-surface-variant);
}

.payment-order-item__price {
  font-family: var(--font-headline);
  font-size: 0.875rem;
}

/* 합계 */
.payment-order-totals {
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-top: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

.payment-order-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

/* 합계 행 강조 */
.payment-order-row--total {
  color: var(--color-on-surface);
  font-size: 0.75rem;
  font-weight: 500;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
  padding-top: 1rem;
  margin-top: 0.5rem;
}

/* ── 결제 버튼 ── */
.payment-submit {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.5rem;
  font-size: 0.8125rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition:
    opacity 0.2s,
    transform 0.2s;
}

.payment-submit:hover {
  opacity: 0.88;
}
.payment-submit:active {
  transform: scale(0.98);
}

.payment-secure {
  text-align: center;
  font-size: 0.6875rem;
  color: var(--color-on-surface-variant);
  letter-spacing: 0.05em;
  margin-top: -2rem;
}
</style>
