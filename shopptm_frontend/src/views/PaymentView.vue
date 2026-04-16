<template>
  <Forme32Layout>
    <div class="py">
      <!-- 스텝 인디케이터 -->
      <div class="py-steps">
        <div class="py-steps__item py-steps__item--done">
          <span class="py-steps__num">✓</span><span class="py-steps__label">장바구니</span>
        </div>
        <div class="py-steps__line py-steps__line--on"></div>
        <div class="py-steps__item py-steps__item--on">
          <span class="py-steps__num">2</span><span class="py-steps__label">결제</span>
        </div>
        <div class="py-steps__line"></div>
        <div class="py-steps__item">
          <span class="py-steps__num">3</span><span class="py-steps__label">완료</span>
        </div>
      </div>

      <div class="py-body">
        <!-- 좌: 폼 -->
        <div class="py-form">
          <!-- 배송 정보 -->
          <section class="py-sec">
            <h2 class="py-sec__title"><span class="material-symbols-outlined">local_shipping</span>배송 정보</h2>
            <div class="py-sec__grid">
              <div class="py-field"><label>받는 사람</label><input v-model="form.name" type="text" placeholder="홍길동" /></div>
              <div class="py-field"><label>연락처</label><input v-model="form.phone" type="tel" placeholder="010-0000-0000" /></div>
              <div class="py-field py-field--full"><label>주소</label><input v-model="form.address" type="text" placeholder="서울시 강남구 테헤란로 000" /></div>
              <div class="py-field py-field--full"><label>상세 주소</label><input v-model="form.address2" type="text" placeholder="아파트/건물명, 호수 (선택)" /></div>
              <div class="py-field"><label>우편번호</label><input v-model="form.postcode" type="text" placeholder="00000" /></div>
            </div>
          </section>

          <!-- 결제 수단 -->
          <section class="py-sec">
            <h2 class="py-sec__title"><span class="material-symbols-outlined">credit_card</span>결제 수단</h2>
            <div class="py-methods">
              <button v-for="m in methods" :key="m.key" class="py-method" :class="{ 'py-method--on': selMethod === m.key }" @click="selMethod = m.key">
                <span class="material-symbols-outlined">{{ m.icon }}</span>{{ m.label }}
              </button>
            </div>

            <!-- 토스페이먼츠 위젯 -->
            <div v-if="selMethod === 'toss'" class="py-toss">
              <div id="toss-payment-widget" class="py-toss__widget"></div>
              <p class="py-toss__info"><span class="material-symbols-outlined">info</span>토스페이먼츠를 통해 안전하게 결제됩니다</p>
            </div>

            <!-- 일반 카드 입력 -->
            <div v-if="selMethod === 'card'" class="py-sec__grid" style="margin-top: 1.5rem;">
              <div class="py-field py-field--full"><label>카드 번호</label><input v-model="form.cardNumber" type="text" placeholder="0000 0000 0000 0000" /></div>
              <div class="py-field"><label>유효기간</label><input v-model="form.expiry" type="text" placeholder="MM / YY" /></div>
              <div class="py-field"><label>CVV</label><input v-model="form.cvv" type="text" placeholder="000" /></div>
            </div>
          </section>

          <!-- 요청사항 -->
          <section class="py-sec">
            <h2 class="py-sec__title"><span class="material-symbols-outlined">edit_note</span>배송 요청사항</h2>
            <textarea v-model="form.memo" placeholder="부재 시 문 앞에 놓아주세요" rows="3"></textarea>
          </section>
        </div>

        <!-- 우: 주문 확인 -->
        <aside class="py-aside">
          <h2 class="py-aside__title">주문 확인</h2>
          <div class="py-items">
            <div v-for="item in cartItems" :key="item.id" class="py-oitem">
              <div class="py-oitem__img"><img :src="item.image" :alt="item.name" /><span class="py-oitem__qty">{{ item.quantity }}</span></div>
              <div class="py-oitem__info"><p class="py-oitem__name">{{ item.name }}</p><p class="py-oitem__meta">{{ item.size }}</p></div>
              <p class="py-oitem__price">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
            </div>
          </div>
          <div class="py-totals">
            <div class="py-totals__row"><span>상품 금액</span><span>₩{{ totalPrice.toLocaleString() }}</span></div>
            <div v-if="gradeDiscount > 0" class="py-totals__row py-totals__row--dc">
              <span>{{ gradeName }} 등급 할인 ({{ gradeDiscount }}%)</span>
              <span>-₩{{ gradeDiscountAmount.toLocaleString() }}</span>
            </div>
            <div class="py-totals__row"><span>배송비</span><span class="py-totals__free">무료</span></div>
            <div class="py-totals__row py-totals__row--total"><span>총 결제금액</span><span>₩{{ finalTotal.toLocaleString() }}</span></div>
          </div>
          <button class="py-submit" :disabled="isPaying" @click="handleSubmit">
            {{ isPaying ? '결제 처리 중...' : `₩${finalTotal.toLocaleString()} 결제하기` }}
          </button>
          <p class="py-secure"><span class="material-symbols-outlined">verified_user</span>SSL 암호화로 안전하게 결제됩니다</p>
        </aside>
      </div>
    </div>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useCartStore } from "@/stores/cartStore";
import { useAuthStore } from "@/stores/authStore";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import api from "@/api";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const { items: cartItems, totalPrice } = storeToRefs(cartStore);

const isPaying = ref(false);

// 등급별 할인
const GRADE_DISCOUNT = { BRONZE: 0, SILVER: 5, GOLD: 8, VIP: 12 };
const userGrade = computed(() => (authStore.user?.grade || 'BRONZE').toUpperCase());
const gradeName = computed(() => ({ BRONZE: 'Bronze', SILVER: 'Silver', GOLD: 'Gold', VIP: 'VIP' }[userGrade.value]));
const gradeDiscount = computed(() => GRADE_DISCOUNT[userGrade.value] || 0);
const gradeDiscountAmount = computed(() => Math.round(totalPrice.value * gradeDiscount.value / 100));
const finalTotal = computed(() => totalPrice.value - gradeDiscountAmount.value);
const tossClientKey = ref('');
const selMethod = ref('toss');
const methods = [
  { key: 'toss', label: '토스페이', icon: 'account_balance_wallet' },
  { key: 'card', label: '신용카드', icon: 'credit_card' },
  { key: 'bank', label: '계좌이체', icon: 'account_balance' },
];

const user = authStore.user;
const form = ref({
  name: user?.name || '',
  phone: user?.phone || '',
  address: user?.address || '',
  address2: '',
  postcode: '',
  cardNumber: '', expiry: '', cvv: '', memo: '',
});

// 토스 클라이언트 키 + 결제 승인 콜백 처리
onMounted(async () => {
  try {
    const res = await api.get('/payment/client-key');
    tossClientKey.value = res.clientKey;
  } catch {}

  // 토스 결제 성공 리다이렉트 처리
  const params = new URLSearchParams(window.location.search);
  if (params.get('paymentKey')) {
    try {
      const confirmRes = await api.post('/payment/confirm', {
        paymentKey: params.get('paymentKey'),
        orderId: params.get('orderId'),
        amount: Number(params.get('amount')),
      });
      if (confirmRes?.success) {
        await createOrder();
      } else {
        alert('결제 승인 실패: ' + (confirmRes?.message || ''));
      }
    } catch (e) { alert('결제 승인 오류: ' + e.message); }
  }
  if (params.get('fail')) {
    alert('결제가 취소되었습니다.');
  }
});

async function handleSubmit() {
  if (isPaying.value) return;
  isPaying.value = true;

  // 유효성 검사
  if (!form.value.name.trim()) { isPaying.value = false; alert('받는 사람 이름을 입력해주세요.'); return; }
  if (!form.value.phone.trim()) { isPaying.value = false; alert('연락처를 입력해주세요.'); return; }
  if (!form.value.address.trim()) { isPaying.value = false; alert('주소를 입력해주세요.'); return; }
  if (selMethod.value === 'card') {
    if (!form.value.cardNumber.trim()) { isPaying.value = false; alert('카드 번호를 입력해주세요.'); return; }
    if (!form.value.expiry.trim()) { isPaying.value = false; alert('유효기간을 입력해주세요.'); return; }
    if (!form.value.cvv.trim()) { isPaying.value = false; alert('CVV를 입력해주세요.'); return; }
  }
  if (cartItems.value.length === 0) { isPaying.value = false; alert('장바구니가 비어있습니다.'); return; }

  try {
    if (selMethod.value === 'toss' && tossClientKey.value && tossClientKey.value !== 'test_ck_placeholder') {
      // 토스페이먼츠 결제 플로우
      await processTossPayment();
    } else {
      // 일반 결제 (데모) — 주문 생성 후 완료
      await createOrder();
    }
  } catch (err) {
    alert(err?.message || '결제에 실패했습니다.');
  } finally {
    isPaying.value = false;
  }
}

async function processTossPayment() {
  const orderId = 'FORME_' + Date.now();
  if (window.TossPayments) {
    const toss = window.TossPayments(tossClientKey.value);
    await toss.requestPayment('카드', {
      amount: finalTotal.value,
      orderId,
      orderName: `FORME 주문 (${cartItems.value.length}건)`,
      customerName: form.value.name || authStore.user?.name || '고객',
      successUrl: window.location.origin + `/payment?paymentKey=PAYMENT_KEY&orderId=${orderId}&amount=${finalTotal.value}`,
      failUrl: window.location.origin + '/payment?fail=true',
    });
  } else {
    // SDK 미로드 — 주문만 생성
    await createOrder();
  }
}

async function createOrder() {
  const memberId = authStore.user?.id;
  if (!memberId) return;
  await api.post(`/members/${memberId}/orders`, {
    receiverName: form.value.name || authStore.user?.name || '고객',
    receiverPhone: form.value.phone || '',
    address: (form.value.address + ' ' + form.value.address2).trim() || '서울시',
    items: cartItems.value.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      size: i.size || null,
    })),
  });
  localStorage.setItem('forme_last_order', JSON.stringify({
    items: cartItems.value.map(i => ({ name: i.name, image: i.image, size: i.size, quantity: i.quantity, price: i.price })),
    totalAmount: finalTotal.value,
    receiverName: form.value.name,
  }));
  cartStore.clearCart();
  router.push('/order-complete');
}

</script>

<style scoped>
.py { max-width: 1400px; margin: 0 auto; padding: 2rem 3rem 6rem; }

.py-steps { display: flex; align-items: center; justify-content: center; gap: 0; padding: 1.5rem 0 3rem; max-width: 400px; margin: 0 auto; }
.py-steps__item { display: flex; align-items: center; gap: 0.5rem; }
.py-steps__num { width: 1.75rem; height: 1.75rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; font-weight: 700; border: 1.5px solid #ddd; color: #bbb; }
.py-steps__label { font-size: 0.6875rem; font-weight: 600; color: #bbb; }
.py-steps__item--on .py-steps__num { background: #111; border-color: #111; color: #fff; }
.py-steps__item--on .py-steps__label { color: #111; }
.py-steps__item--done .py-steps__num { background: #38a169; border-color: #38a169; color: #fff; font-size: 0.8125rem; }
.py-steps__item--done .py-steps__label { color: #38a169; }
.py-steps__line { flex: 1; height: 1.5px; background: #eee; margin: 0 0.75rem; }
.py-steps__line--on { background: #38a169; }

.py-body { display: grid; grid-template-columns: 1fr; gap: 3rem; }
@media (min-width: 1024px) { .py-body { grid-template-columns: 1fr 420px; align-items: start; } }

.py-form { display: flex; flex-direction: column; gap: 2.5rem; }
.py-sec__title { display: flex; align-items: center; gap: 0.625rem; font-size: 1rem; font-weight: 800; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
.py-sec__title .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; color: #111; }
.py-sec__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem 1.25rem; }
.py-field { display: flex; flex-direction: column; gap: 0.375rem; }
.py-field--full { grid-column: span 2; }
.py-field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.py-field input, .py-sec textarea { width: 100%; padding: 0.875rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.5rem; font-size: 0.8125rem; color: #111; outline: none; transition: border-color 0.2s; font-family: inherit; }
.py-field input:focus, .py-sec textarea:focus { border-color: #111; }
.py-field input::placeholder, .py-sec textarea::placeholder { color: #ccc; }
.py-sec textarea { resize: vertical; }

.py-methods { display: flex; gap: 0.625rem; }
.py-method { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.375rem; padding: 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.5rem; font-size: 0.6875rem; font-weight: 600; color: #999; cursor: pointer; transition: all 0.2s; background: #fff; }
.py-method .material-symbols-outlined { font-size: 1.375rem; font-variation-settings: "wght" 300; }
.py-method:hover { border-color: #111; color: #111; }
.py-method--on { border-color: #111; color: #111; background: #fafaf8; }

.py-toss { margin-top: 1.5rem; }
.py-toss__widget { min-height: 100px; border: 1.5px dashed #e8e8e8; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: #bbb; font-size: 0.8125rem; padding: 2rem; }
.py-toss__info { display: flex; align-items: center; gap: 0.375rem; margin-top: 0.75rem; font-size: 0.6875rem; color: #999; }
.py-toss__info .material-symbols-outlined { font-size: 0.875rem; font-variation-settings: "wght" 300; }

.py-aside { background: #fafaf8; border-radius: 0.75rem; padding: 2rem; position: sticky; top: 140px; }
.py-aside__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #eee; }
.py-items { display: flex; flex-direction: column; gap: 0; margin-bottom: 1.5rem; }
.py-oitem { display: flex; align-items: center; gap: 1rem; padding: 0.875rem 0; border-bottom: 1px solid #f0f0f0; }
.py-oitem__img { width: 56px; height: 64px; flex-shrink: 0; overflow: hidden; background: #eee; position: relative; border-radius: 0.25rem; }
.py-oitem__img img { width: 100%; height: 100%; object-fit: cover; }
.py-oitem__qty { position: absolute; top: -4px; right: -4px; width: 1.125rem; height: 1.125rem; border-radius: 50%; background: #111; color: #fff; font-size: 0.5rem; font-weight: 800; display: flex; align-items: center; justify-content: center; }
.py-oitem__info { flex: 1; }
.py-oitem__name { font-size: 0.8125rem; font-weight: 600; color: #111; margin-bottom: 0.125rem; }
.py-oitem__meta { font-size: 0.6875rem; color: #999; }
.py-oitem__price { font-size: 0.8125rem; font-weight: 700; white-space: nowrap; }
.py-totals { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.5rem; }
.py-totals__row { display: flex; justify-content: space-between; font-size: 0.8125rem; color: #555; }
.py-totals__free { color: #38a169; font-weight: 600; }
.py-totals__row--dc { color: #FF2D2D; font-weight: 600; }
.py-totals__row--total { border-top: 1px solid #eee; padding-top: 1rem; margin-top: 0.25rem; font-size: 1rem; font-weight: 900; color: #111; }
.py-submit { width: 100%; padding: 1.125rem; background: #111; color: #fff; font-size: 0.9375rem; font-weight: 800; border-radius: 0.5rem; cursor: pointer; transition: background 0.2s; margin-bottom: 1rem; }
.py-submit:hover { background: #333; }
.py-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.py-secure { display: flex; align-items: center; justify-content: center; gap: 0.375rem; font-size: 0.625rem; color: #bbb; }
.py-secure .material-symbols-outlined { font-size: 0.875rem; font-variation-settings: "wght" 300; }
</style>
