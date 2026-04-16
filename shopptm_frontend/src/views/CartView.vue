<template>
  <Forme32Layout>
    <div class="ct">
      <!-- 헤더 -->
      <div class="ct-head">
        <h1 class="ct-head__title">장바구니</h1>
        <p class="ct-head__count">{{ items.length }}개 상품</p>
      </div>

      <!-- 비어있을 때 -->
      <div v-if="items.length === 0" class="ct-empty">
        <span class="material-symbols-outlined ct-empty__icon">shopping_bag</span>
        <p class="ct-empty__msg">장바구니가 비어있습니다</p>
        <RouterLink to="/products" class="ct-empty__btn">쇼핑 계속하기</RouterLink>
      </div>

      <!-- 장바구니 콘텐츠 -->
      <div v-else class="ct-body">
        <!-- 좌: 아이템 리스트 -->
        <div class="ct-list">
          <div v-for="item in items" :key="item.id" class="ct-item">
            <RouterLink :to="`/products/${item.productId}`" class="ct-item__img-wrap">
              <img :src="item.image" :alt="item.name" />
            </RouterLink>
            <div class="ct-item__detail">
              <div class="ct-item__top">
                <div>
                  <p class="ct-item__brand" :style="{ color: getBrandColor(item.productId) }">
                    {{ getBrandName(item.productId) }}
                  </p>
                  <h3 class="ct-item__name">{{ item.name }}</h3>
                  <p class="ct-item__meta">Size: {{ item.size }}</p>
                </div>
                <p class="ct-item__price">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
              </div>
              <div class="ct-item__bottom">
                <div class="ct-item__qty">
                  <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">−</button>
                  <span>{{ item.quantity }}</span>
                  <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                </div>
                <button class="ct-item__remove" @click="cartStore.removeItem(item.id)">
                  <span class="material-symbols-outlined">delete_outline</span>
                  삭제
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- 우: 주문 요약 -->
        <aside class="ct-summary">
          <h2 class="ct-summary__title">주문 요약</h2>

          <div class="ct-summary__rows">
            <div class="ct-summary__row">
              <span>상품 금액</span>
              <span>₩{{ totalPrice.toLocaleString() }}</span>
            </div>
            <div v-if="gradeDiscount > 0" class="ct-summary__row ct-summary__row--dc">
              <span>{{ gradeName }} 등급 할인 ({{ gradeDiscount }}%)</span>
              <span>-₩{{ gradeDiscountAmount.toLocaleString() }}</span>
            </div>
            <div class="ct-summary__row">
              <span>배송비</span>
              <span class="ct-summary__free">무료</span>
            </div>
            <div class="ct-summary__row ct-summary__row--total">
              <span>총 결제금액</span>
              <span class="ct-summary__total">₩{{ finalTotal.toLocaleString() }}</span>
            </div>
          </div>

          <RouterLink to="/payment" class="ct-summary__checkout">
            ₩{{ finalTotal.toLocaleString() }} 결제하기
          </RouterLink>

          <RouterLink to="/products" class="ct-summary__continue">
            ← 쇼핑 계속하기
          </RouterLink>

          <div class="ct-summary__perks">
            <div><span class="material-symbols-outlined">local_shipping</span>전 상품 무료 배송</div>
            <div><span class="material-symbols-outlined">sync</span>30일 이내 교환·반품</div>
            <div><span class="material-symbols-outlined">lock</span>안전한 결제</div>
          </div>
        </aside>
      </div>
    </div>
  </Forme32Layout>
</template>

<script setup>
import { computed } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
import Forme32Layout from "@/layouts/Forme32Layout.vue";

const cartStore = useCartStore();
const authStore = useAuthStore();
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
const { items, totalPrice } = storeToRefs(cartStore);

// 등급별 할인
const GRADE_DISCOUNT = { BRONZE: 0, SILVER: 5, GOLD: 8, VIP: 12 };
const userGrade = computed(() => (authStore.user?.grade || 'BRONZE').toUpperCase());
const gradeName = computed(() => ({ BRONZE: 'Bronze', SILVER: 'Silver', GOLD: 'Gold', VIP: 'VIP' }[userGrade.value]));
const gradeDiscount = computed(() => GRADE_DISCOUNT[userGrade.value] || 0);
const gradeDiscountAmount = computed(() => Math.round(totalPrice.value * gradeDiscount.value / 100));
const finalTotal = computed(() => totalPrice.value - gradeDiscountAmount.value);

const BRAND_COLORS = { BEANPOLE: '#103728', CARHARTT: '#9C4F18', "LEVI'S": '#8E1C28', DICKIES: '#1A1A1A' };

function getBrandColor(productId) {
  const p = products.value.find(x => x.id === productId);
  return BRAND_COLORS[p?.brand] || '#111';
}
function getBrandName(productId) {
  const p = products.value.find(x => x.id === productId);
  return p?.brand || '';
}
</script>

<style scoped>
.ct { max-width: 1400px; margin: 0 auto; padding: 3rem 3rem 6rem; }

/* 헤더 */
.ct-head {
  display: flex; align-items: baseline; gap: 1rem;
  padding-bottom: 2rem; border-bottom: 1px solid #eee; margin-bottom: 2.5rem;
}
.ct-head__title { font-size: 2rem; font-weight: 900; letter-spacing: -0.02em; }
.ct-head__count { font-size: 0.75rem; color: #999; letter-spacing: 0.1em; }

/* 빈 장바구니 */
.ct-empty {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 8rem 0; gap: 1.25rem; text-align: center;
}
.ct-empty__icon { font-size: 3.5rem; color: #ddd; font-variation-settings: "wght" 200; }
.ct-empty__msg { font-size: 1rem; color: #999; }
.ct-empty__btn {
  padding: 0.875rem 2.5rem; background: #111; color: #fff;
  font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em;
  text-decoration: none; transition: opacity 0.2s;
}
.ct-empty__btn:hover { opacity: 0.8; }

/* 2단 레이아웃 */
.ct-body { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media (min-width: 1024px) {
  .ct-body { grid-template-columns: 1fr 380px; align-items: start; }
}

/* 아이템 리스트 */
.ct-list { display: flex; flex-direction: column; gap: 0; }
.ct-item {
  display: flex; gap: 1.5rem; padding: 1.5rem 0;
  border-bottom: 1px solid #f0f0f0;
}
.ct-item__img-wrap {
  width: 120px; height: 150px; flex-shrink: 0; overflow: hidden;
  background: #f3f1ec;
}
.ct-item__img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.ct-item__detail {
  flex: 1; display: flex; flex-direction: column; justify-content: space-between;
  padding: 0.25rem 0;
}
.ct-item__top { display: flex; justify-content: space-between; gap: 1rem; }
.ct-item__brand {
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.15em;
  text-transform: uppercase; margin-bottom: 0.25rem;
}
.ct-item__name { font-size: 1rem; font-weight: 700; margin-bottom: 0.375rem; color: #111; }
.ct-item__meta { font-size: 0.75rem; color: #999; }
.ct-item__price { font-size: 1rem; font-weight: 800; white-space: nowrap; color: #111; }
.ct-item__bottom { display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; }
.ct-item__qty {
  display: inline-flex; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
}
.ct-item__qty button {
  width: 2.25rem; height: 2.25rem; display: flex; align-items: center; justify-content: center;
  background: #fff; font-size: 0.875rem; cursor: pointer; transition: background 0.15s;
  border-radius: 0.375rem;
}
.ct-item__qty button:hover:not(:disabled) { background: #f5f3ee; }
.ct-item__qty button:disabled { color: #ddd; cursor: not-allowed; }
.ct-item__qty span {
  min-width: 2.25rem; display: flex; align-items: center; justify-content: center;
  font-size: 0.8125rem; font-weight: 600;
  border-left: 1.5px solid #e8e8e8; border-right: 1.5px solid #e8e8e8;
}
.ct-item__remove {
  display: flex; align-items: center; gap: 0.25rem;
  background: none; border: none; font-size: 0.6875rem; color: #bbb;
  cursor: pointer; transition: color 0.2s;
}
.ct-item__remove:hover { color: #e53e3e; }
.ct-item__remove .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

/* 주문 요약 */
.ct-summary {
  background: #fafaf8; border-radius: 0.75rem; padding: 2rem;
  position: sticky; top: 140px;
}
.ct-summary__title {
  font-size: 1.125rem; font-weight: 800; margin-bottom: 1.5rem;
  padding-bottom: 1rem; border-bottom: 1px solid #eee;
}
.ct-summary__rows { display: flex; flex-direction: column; gap: 0.875rem; margin-bottom: 1.5rem; }
.ct-summary__row {
  display: flex; justify-content: space-between; font-size: 0.8125rem; color: #555;
}
.ct-summary__free { color: #38a169; font-weight: 600; }
.ct-summary__row--dc { color: #FF2D2D; font-weight: 600; }
.ct-summary__row--total {
  border-top: 1px solid #eee; padding-top: 1rem; margin-top: 0.5rem;
  font-weight: 800; color: #111;
}
.ct-summary__total { font-size: 1.25rem; }
.ct-summary__checkout {
  display: block; width: 100%; padding: 1.125rem; text-align: center;
  background: #111; color: #fff; font-size: 0.875rem; font-weight: 700;
  letter-spacing: 0.05em; border-radius: 0.5rem; text-decoration: none;
  transition: background 0.2s; margin-bottom: 0.75rem;
}
.ct-summary__checkout:hover { background: #333; }
.ct-summary__continue {
  display: block; text-align: center; font-size: 0.75rem; color: #999;
  text-decoration: none; margin-bottom: 1.5rem; transition: color 0.2s;
}
.ct-summary__continue:hover { color: #111; }
.ct-summary__perks {
  display: flex; flex-direction: column; gap: 0.5rem;
  padding-top: 1.25rem; border-top: 1px solid #eee;
}
.ct-summary__perks div {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.6875rem; color: #888;
}
.ct-summary__perks .material-symbols-outlined {
  font-size: 1rem; color: #111; font-variation-settings: "wght" 300;
}
</style>
