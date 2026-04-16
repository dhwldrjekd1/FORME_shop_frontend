<template>
  <div class="su">
    <!-- 좌: 비주얼 -->
    <div class="su-visual">
      <div class="su-visual__overlay"></div>
      <img src="/images/carhartt/carhero.png" alt="" class="su-visual__img" />
      <div class="su-visual__content">
        <h2 class="su-visual__title">FORME</h2>
        <p class="su-visual__sub">Join the Community.</p>
        <ul class="su-visual__perks">
          <li><span class="material-symbols-outlined">loyalty</span>등급별 할인 혜택 (최대 12%)</li>
          <li><span class="material-symbols-outlined">local_shipping</span>전 상품 무료 배송</li>
          <li><span class="material-symbols-outlined">new_releases</span>신상품 알림 & 선공개</li>
        </ul>
      </div>
    </div>

    <!-- 우: 폼 -->
    <div class="su-form-side">
      <header class="su-head">
        <RouterLink to="/" class="su-head__back">
          <span class="material-symbols-outlined">arrow_back</span>
        </RouterLink>
      </header>

      <main class="su-body">
        <div class="su-body__top">
          <h1 class="su-body__title">Create Account</h1>
          <p class="su-body__sub">FORME 멤버가 되어 특별한 혜택을 누리세요</p>
        </div>

        <!-- 단계 표시 -->
        <div class="su-steps">
          <div class="su-steps__item" :class="{ 'su-steps__item--on': step >= 1 }">
            <span class="su-steps__num">1</span>
            <span class="su-steps__label">기본 정보</span>
          </div>
          <div class="su-steps__line" :class="{ 'su-steps__line--on': step >= 2 }"></div>
          <div class="su-steps__item" :class="{ 'su-steps__item--on': step >= 2 }">
            <span class="su-steps__num">2</span>
            <span class="su-steps__label">비밀번호</span>
          </div>
        </div>

        <form class="su-form" @submit.prevent="handleSubmit">
          <!-- Step 1: 기본 정보 -->
          <template v-if="step === 1">
            <div class="su-field">
              <label for="su-name">이름</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">person</span>
                <input
                  id="su-name"
                  v-model="form.name"
                  type="text"
                  placeholder="홍길동"
                  autocomplete="name"
                  required
                />
              </div>
            </div>

            <div class="su-field">
              <label for="su-email">이메일</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">mail</span>
                <input
                  id="su-email"
                  v-model="form.email"
                  type="email"
                  placeholder="name@example.com"
                  autocomplete="email"
                  required
                />
              </div>
            </div>

            <div class="su-field">
              <label for="su-phone">전화번호</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">phone</span>
                <input id="su-phone" v-model="form.phone" type="tel" placeholder="010-0000-0000" autocomplete="tel" />
              </div>
            </div>

            <div class="su-field">
              <label for="su-address">주소</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">home</span>
                <input id="su-address" v-model="form.address" type="text" placeholder="서울시 강남구 테헤란로 000" autocomplete="street-address" />
              </div>
            </div>

            <div class="su-field">
              <label>키 (cm) *</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">height</span>
                <input v-model.number="form.height" type="number" placeholder="170" min="100" max="250" required />
              </div>
            </div>

            <div class="su-field">
              <label>몸무게 (kg) *</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">monitor_weight</span>
                <input v-model.number="form.weight" type="number" placeholder="70" min="30" max="200" required />
              </div>
            </div>

            <div class="su-field">
              <label>선호 핏 *</label>
              <div class="su-fit-group">
                <button type="button" v-for="f in fitOptions" :key="f.value"
                  class="su-fit-btn" :class="{ 'su-fit-btn--on': form.fit === f.value }"
                  @click="form.fit = f.value"
                >
                  <span class="su-fit-btn__icon">{{ f.icon }}</span>
                  <span>{{ f.label }}</span>
                </button>
              </div>
            </div>

            <button type="button" class="su-next" @click="goStep2">
              다음 단계
              <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </template>

          <!-- Step 2: 비밀번호 -->
          <template v-if="step === 2">
            <div class="su-field">
              <label for="su-pw">비밀번호</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">lock</span>
                <input
                  id="su-pw"
                  v-model="form.password"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="8자 이상 입력하세요"
                  autocomplete="new-password"
                  required
                />
                <button type="button" class="su-field__toggle" @click="showPw = !showPw">
                  <span class="material-symbols-outlined">{{ showPw ? 'visibility_off' : 'visibility' }}</span>
                </button>
              </div>
              <!-- 비밀번호 강도 -->
              <div class="su-pw-strength">
                <div class="su-pw-bar">
                  <div class="su-pw-bar__fill" :style="{ width: pwStrength + '%', backgroundColor: pwColor }"></div>
                </div>
                <span class="su-pw-label" :style="{ color: pwColor }">{{ pwText }}</span>
              </div>
            </div>

            <div class="su-field">
              <label for="su-pw2">비밀번호 확인</label>
              <div class="su-field__wrap">
                <span class="material-symbols-outlined su-field__icon">lock_reset</span>
                <input
                  id="su-pw2"
                  v-model="form.password2"
                  :type="showPw ? 'text' : 'password'"
                  placeholder="비밀번호를 다시 입력하세요"
                  autocomplete="new-password"
                  required
                />
              </div>
            </div>

            <p v-if="errorMsg" class="su-error">{{ errorMsg }}</p>

            <div class="su-actions">
              <button type="button" class="su-back-btn" @click="step = 1">
                <span class="material-symbols-outlined">arrow_back</span>
                이전
              </button>
              <button type="submit" class="su-submit" :disabled="isLoading">
                {{ isLoading ? '가입 중...' : '가입 완료' }}
              </button>
            </div>
          </template>
        </form>

        <div class="su-bottom">
          <p class="su-terms">
            가입 시 <a href="#">이용약관</a> 및 <a href="#">개인정보처리방침</a>에 동의합니다.
          </p>
          <RouterLink to="/login" class="su-login-link">
            이미 계정이 있으신가요? <strong>로그인</strong>
          </RouterLink>
        </div>
      </main>

      <footer class="su-foot">
        <p>© 2026 FORME. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({ name: "", email: "", password: "", password2: "", phone: "", address: "", height: null, weight: null, fit: "standard" });

const fitOptions = [
  { value: 'slim', label: '슬림', icon: '◁' },
  { value: 'standard', label: '스탠다드', icon: '▢' },
  { value: 'wide', label: '와이드', icon: '▷' },
];
const errorMsg = ref("");
const isLoading = ref(false);
const showPw = ref(false);
const step = ref(1);

// 비밀번호 강도
const pwStrength = computed(() => {
  const pw = form.value.password;
  if (!pw) return 0;
  let s = 0;
  if (pw.length >= 4) s += 20;
  if (pw.length >= 8) s += 20;
  if (pw.length >= 12) s += 10;
  if (/[A-Z]/.test(pw)) s += 15;
  if (/[a-z]/.test(pw)) s += 10;
  if (/[0-9]/.test(pw)) s += 15;
  if (/[^A-Za-z0-9]/.test(pw)) s += 10;
  return Math.min(s, 100);
});
const pwColor = computed(() => {
  if (pwStrength.value < 30) return '#e53e3e';
  if (pwStrength.value < 60) return '#dd6b20';
  if (pwStrength.value < 80) return '#d69e2e';
  return '#38a169';
});
const pwText = computed(() => {
  if (!form.value.password) return '';
  if (pwStrength.value < 30) return '약함';
  if (pwStrength.value < 60) return '보통';
  if (pwStrength.value < 80) return '강함';
  return '매우 강함';
});

function goStep2() {
  errorMsg.value = "";
  if (!form.value.name.trim()) { errorMsg.value = "이름을 입력해주세요."; return; }
  if (!form.value.email.trim()) { errorMsg.value = "이메일을 입력해주세요."; return; }
  if (!form.value.height || form.value.height < 100 || form.value.height > 250) { errorMsg.value = "키를 올바르게 입력해주세요. (100~250cm)"; return; }
  if (!form.value.weight || form.value.weight < 30 || form.value.weight > 200) { errorMsg.value = "몸무게를 올바르게 입력해주세요. (30~200kg)"; return; }
  if (!form.value.fit) { errorMsg.value = "선호 핏을 선택해주세요."; return; }
  step.value = 2;
}

async function handleSubmit() {
  errorMsg.value = "";
  if (form.value.password.length < 4) {
    errorMsg.value = "비밀번호는 4자 이상이어야 합니다.";
    return;
  }
  if (form.value.password !== form.value.password2) {
    errorMsg.value = "비밀번호가 일치하지 않습니다.";
    return;
  }
  isLoading.value = true;
  try {
    await authStore.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
      phone: form.value.phone,
      address: form.value.address,
      height: form.value.height,
      weight: form.value.weight,
      fit: form.value.fit,
    });
    router.push("/");
  } catch (err) {
    errorMsg.value = err?.data?.message || err?.message || "회원가입에 실패했습니다.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.su {
  display: flex;
  min-height: 100dvh;
  background: #fff;
}

/* ── 좌: 비주얼 ── */
.su-visual {
  display: none;
  position: relative;
  width: 50%;
  overflow: hidden;
}
@media (min-width: 1024px) {
  .su-visual { display: block; }
}
.su-visual__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.6) saturate(0.85);
}
.su-visual__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(160deg, rgba(156,79,24,0.8) 0%, rgba(26,26,26,0.75) 100%);
  z-index: 1;
}
.su-visual__content {
  position: absolute;
  bottom: 5rem;
  left: 4rem;
  z-index: 2;
  color: #fff;
}
.su-visual__title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.su-visual__sub {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.1em;
  margin-bottom: 2.5rem;
}
.su-visual__perks {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}
.su-visual__perks li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.7);
  letter-spacing: 0.03em;
}
.su-visual__perks .material-symbols-outlined {
  font-size: 1.125rem;
  color: rgba(255,255,255,0.5);
  font-variation-settings: "wght" 300;
}

/* ── 우: 폼 ── */
.su-form-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* 헤더 */
.su-head { padding: 2rem 2.5rem; }
.su-head__back {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border: 1.5px solid #eee;
  border-radius: 50%;
  color: #111;
  transition: all 0.2s;
}
.su-head__back:hover { background: #111; border-color: #111; color: #fff; }
.su-head__back .material-symbols-outlined {
  font-size: 1.125rem;
  font-variation-settings: "wght" 300;
}

/* 본문 */
.su-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2.5rem;
  max-width: 26rem;
  width: 100%;
  margin: 0 auto;
}
.su-body__top { margin-bottom: 2rem; }
.su-body__title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.su-body__sub { font-size: 0.875rem; color: #999; }

/* 스텝 */
.su-steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin-bottom: 2rem;
}
.su-steps__item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.su-steps__num {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 50%;
  border: 1.5px solid #ddd;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #bbb;
  transition: all 0.3s;
}
.su-steps__label {
  font-size: 0.6875rem;
  font-weight: 600;
  color: #bbb;
  transition: color 0.3s;
}
.su-steps__item--on .su-steps__num {
  background: #111;
  border-color: #111;
  color: #fff;
}
.su-steps__item--on .su-steps__label { color: #111; }
.su-steps__line {
  flex: 1;
  height: 1.5px;
  background: #eee;
  margin: 0 0.75rem;
  transition: background 0.3s;
}
.su-steps__line--on { background: #111; }

/* 폼 */
.su-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.su-field label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #333;
  margin-bottom: 0.5rem;
}
.su-field__wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid #e8e8e8;
  border-radius: 0.5rem;
  padding: 0 1rem;
  transition: border-color 0.2s;
}
.su-field__wrap:focus-within { border-color: #111; }
.su-field__icon {
  font-size: 1.125rem;
  color: #bbb;
  font-variation-settings: "wght" 300;
}
.su-field__wrap input {
  flex: 1;
  border: none;
  background: none;
  padding: 0.9375rem 0;
  font-size: 0.875rem;
  color: #111;
  outline: none;
}
.su-field__wrap input::placeholder { color: #ccc; }
.su-field__toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #bbb;
  transition: color 0.2s;
}
.su-field__toggle:hover { color: #111; }
.su-field__toggle .material-symbols-outlined {
  font-size: 1.125rem;
  font-variation-settings: "wght" 300;
}

/* 비밀번호 강도 */
.su-pw-strength {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.625rem;
}
.su-pw-bar {
  flex: 1;
  height: 3px;
  background: #eee;
  border-radius: 2px;
  overflow: hidden;
}
.su-pw-bar__fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s, background-color 0.3s;
}
.su-pw-label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  min-width: 3.5rem;
}

/* 에러 */
.su-error {
  font-size: 0.75rem;
  color: #e53e3e;
  margin-top: -0.5rem;
}

/* 다음 버튼 */
.su-next {
  width: 100%;
  padding: 1rem;
  background: #111;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background 0.2s;
  margin-top: 0.5rem;
}
.su-next:hover { background: #333; }
.su-next .material-symbols-outlined {
  font-size: 1rem;
  font-variation-settings: "wght" 300;
  transition: transform 0.2s;
}
.su-next:hover .material-symbols-outlined { transform: translateX(4px); }

/* 가입/이전 버튼 */
.su-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.su-back-btn {
  display: flex;
  align-items: center;
  gap: 0.375rem;
  padding: 1rem 1.5rem;
  border: 1.5px solid #ddd;
  border-radius: 0.5rem;
  background: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}
.su-back-btn:hover { border-color: #111; color: #111; }
.su-back-btn .material-symbols-outlined {
  font-size: 1rem;
  font-variation-settings: "wght" 300;
}
.su-submit {
  flex: 1;
  padding: 1rem;
  background: #111;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
}
.su-submit:hover { background: #333; }
.su-submit:active { transform: scale(0.98); }
.su-submit:disabled { opacity: 0.4; cursor: not-allowed; }

/* 하단 */
.su-bottom {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}
.su-terms {
  font-size: 0.6875rem;
  color: #bbb;
  text-align: center;
  line-height: 1.6;
}
.su-terms a {
  color: #999;
  text-decoration: underline;
  text-underline-offset: 2px;
}
.su-terms a:hover { color: #111; }
.su-login-link {
  font-size: 0.8125rem;
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
}
.su-login-link strong { color: #111; font-weight: 700; }
.su-login-link:hover { color: #111; }

/* 푸터 */
.su-fit-group { display: flex; gap: 0.5rem; }
.su-fit-btn {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0.25rem;
  padding: 0.875rem 0.5rem; border: 1.5px solid #e8e8e8; border-radius: 0.5rem;
  font-size: 0.6875rem; font-weight: 600; color: #999; cursor: pointer;
  background: #fff; transition: all 0.2s;
}
.su-fit-btn:hover { border-color: #111; color: #111; }
.su-fit-btn--on { background: #111; border-color: #111; color: #fff; }
.su-fit-btn__icon { font-size: 1.25rem; }
.su-foot { padding: 2rem 2.5rem; text-align: center; }
.su-foot p { font-size: 0.5625rem; color: #ccc; letter-spacing: 0.1em; }
</style>
