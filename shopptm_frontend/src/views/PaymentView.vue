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
          <button class="py-submit" :disabled="isPaying || gradeLoading" @click="handleSubmit">
            {{ isPaying ? '결제 처리 중...' : gradeLoading ? '회원 정보 확인 중...' : `₩${finalTotal.toLocaleString()} 결제하기` }}
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
// 서버의 최신 등급을 확인하는 동안 결제 버튼을 막아둠 - 안 그러면 그 사이에
// 눌렀을 때 아직 localStorage 값(freshGrade 초기값)으로 계산된 finalTotal이
// 그대로 토스 결제 금액으로 넘어갈 수 있어, 등급 재확인이 사실상 무력화됨
const gradeLoading = ref(true);

// 등급별 할인 - authStore.user.grade는 localStorage에서 복원한 값이라 위조되거나
// (다른 세션에서 등급이 바뀐 경우처럼) 오래된 값일 수 있음. 이 값 그대로 결제금액을
// 계산해 토스에 넘기면, 실제 카드 결제는 그 금액으로 이미 승인돼버린 뒤 서버가
// 진짜 등급 기준으로 재계산한 금액과 달라 주문 생성만 거부되는 상황이 생길 수 있어
// (결제는 됐는데 주문은 안 잡히는 상태), 결제 진입 시점에 서버에서 최신 등급을 다시 확인한다.
const freshGrade = ref((authStore.user?.grade || 'BRONZE').toUpperCase());
const GRADE_DISCOUNT = { BRONZE: 0, SILVER: 5, GOLD: 8, VIP: 12 };
const userGrade = computed(() => freshGrade.value);
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

  // 등급 할인 계산에 쓰이는 grade를 서버에서 다시 확인 (localStorage 값은 신뢰하지 않음)
  try {
    if (authStore.user?.id) {
      const me = await api.get(`/members/${authStore.user.id}`);
      if (me?.grade) freshGrade.value = me.grade.toUpperCase();
    }
  } catch {
  } finally {
    gradeLoading.value = false;
  }

  // 토스 결제 성공 리다이렉트 처리
  const params = new URLSearchParams(window.location.search);
  if (params.get('paymentKey')) {
    try {
      // 카드 결제는 이 호출로 이미 확정되므로, 마침 세션이 만료돼 401이 나더라도
      // 페이지가 강제로 로그인 화면으로 넘어가 버리면 안 됨(이후 주문 생성/실패 안내가 못 이뤄짐)
      const confirmRes = await api.post('/payment/confirm', {
        paymentKey: params.get('paymentKey'),
        orderId: params.get('orderId'),
        amount: Number(params.get('amount')),
      }, { skipAuthRedirect: true });
      if (confirmRes?.success) {
        // 토스가 실제로 승인한 금액(서버가 검증해서 돌려준 값)을 그대로 주문 생성에 넘긴다.
        // URL의 amount 파라미터는 사용자가 손댈 수 있으므로 신뢰하지 않는다.
        // paymentKey도 함께 넘겨서, 이후 주문 생성이 실패했을 때 서버가 이 결제를
        // 자동으로 취소(환불)할 수 있도록 한다.
        await createOrder(confirmRes.amount, confirmRes.paymentKey);
      } else {
        alert('결제 승인 실패: ' + (confirmRes?.message || ''));
        // 주소창에 paymentKey가 남아있으면 새로고침/뒤로가기 시 결제 승인이 그대로 재생되므로 제거
        window.history.replaceState(null, '', window.location.pathname);
      }
    } catch (e) {
      alert('결제 승인 오류: ' + e.message);
      // 주문 생성까지 실패한 경우도 동일하게, 재생 방지를 위해 결제 관련 쿼리를 지움
      window.history.replaceState(null, '', window.location.pathname);
    }
  }
  if (params.get('fail')) {
    alert('결제가 취소되었습니다.');
  }
});

async function handleSubmit() {
  if (isPaying.value || gradeLoading.value) return;
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

async function createOrder(paidAmount, paymentKey) {
  const memberId = authStore.user?.id;
  if (!memberId) return;
  // paidAmount가 있으면 토스 결제가 이미 확정된 뒤이므로, 여기서 401이 나도 강제 이동시키지 않고
  // 아래 handleSubmit의 catch에서 안내 메시지를 보여주도록 함 (장바구니도 실패 시엔 그대로 유지됨)
  await api.post(`/members/${memberId}/orders`, {
    receiverName: form.value.name || authStore.user?.name || '고객',
    receiverPhone: form.value.phone || '',
    address: (form.value.address + ' ' + form.value.address2).trim() || '서울시',
    items: cartItems.value.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      size: i.size || null,
    })),
    // 토스 결제를 거친 주문만 채워짐 — 서버가 이 값과 실제 주문 금액이 일치하는지 검증 후 PAID 처리
    paidAmount: paidAmount ?? null,
    // 있으면 서버가 주문 생성 실패 시 이 결제를 자동으로 취소(환불)하는 데 사용
    paymentKey: paymentKey ?? null,
  }, { skipAuthRedirect: true });
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
