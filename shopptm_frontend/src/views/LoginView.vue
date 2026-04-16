<template>
  <div class="lg">
    <!-- 좌: 비주얼 -->
    <div class="lg-visual">
      <div class="lg-visual__overlay"></div>
      <img src="/images/beanpole/beanpole_hero.png" alt="" class="lg-visual__img" />
      <div class="lg-visual__content">
        <h2 class="lg-visual__title">FORME</h2>
        <p class="lg-visual__sub">The Best of Everything.</p>
        <div class="lg-visual__brands">
          <span>BEANPOLE</span>
          <span>CARHARTT</span>
          <span>LEVI'S</span>
          <span>DICKIES</span>
        </div>
      </div>
    </div>

    <!-- 우: 폼 -->
    <div class="lg-form-side">
      <header class="lg-head">
        <RouterLink to="/" class="lg-head__back">
          <span class="material-symbols-outlined">arrow_back</span>
        </RouterLink>
      </header>

      <main class="lg-body">
        <div class="lg-body__top">
          <h1 class="lg-body__title">Welcome Back</h1>
          <p class="lg-body__sub">로그인하고 컬렉션을 탐색하세요</p>
        </div>

        <form class="lg-form" @submit.prevent="handleLogin">
          <div class="lg-field">
            <label for="lg-email">이메일</label>
            <div class="lg-field__wrap">
              <span class="material-symbols-outlined lg-field__icon">mail</span>
              <input
                id="lg-email"
                v-model="form.email"
                type="email"
                placeholder="name@example.com"
                autocomplete="email"
                required
              />
            </div>
          </div>

          <div class="lg-field">
            <label for="lg-pw">비밀번호</label>
            <div class="lg-field__wrap">
              <span class="material-symbols-outlined lg-field__icon">lock</span>
              <input
                id="lg-pw"
                v-model="form.password"
                :type="showPw ? 'text' : 'password'"
                placeholder="비밀번호를 입력하세요"
                autocomplete="current-password"
                required
              />
              <button type="button" class="lg-field__toggle" @click="showPw = !showPw">
                <span class="material-symbols-outlined">{{ showPw ? 'visibility_off' : 'visibility' }}</span>
              </button>
            </div>
          </div>

          <p v-if="errorMsg" class="lg-error">{{ errorMsg }}</p>

          <button type="submit" class="lg-submit" :disabled="isLoading">
            {{ isLoading ? '로그인 중...' : '로그인' }}
          </button>
        </form>

        <div class="lg-bottom">
          <div class="lg-bottom__divider">
            <span></span>
            <p>또는</p>
            <span></span>
          </div>
          <RouterLink to="/signup" class="lg-signup-link">
            계정이 없으신가요? <strong>회원가입</strong>
          </RouterLink>
        </div>
      </main>

      <footer class="lg-foot">
        <p>© 2026 FORME. All rights reserved.</p>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const form = ref({ email: "", password: "" });
const errorMsg = ref("");
const isLoading = ref(false);
const showPw = ref(false);

async function handleLogin() {
  errorMsg.value = "";
  if (!form.value.email || !form.value.password) {
    errorMsg.value = "이메일과 비밀번호를 입력해주세요.";
    return;
  }
  isLoading.value = true;
  try {
    await authStore.login({ email: form.value.email, password: form.value.password });
    const redirectTo = route.query.redirect || "/";
    router.push(redirectTo);
  } catch (err) {
    errorMsg.value = err?.data?.message || err?.message || "로그인에 실패했습니다.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.lg {
  display: flex;
  min-height: 100dvh;
  background: #fff;
}

/* ── 좌: 비주얼 ── */
.lg-visual {
  display: none;
  position: relative;
  width: 50%;
  overflow: hidden;
}
@media (min-width: 1024px) {
  .lg-visual { display: block; }
}

.lg-visual__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.65) saturate(0.9);
}
.lg-visual__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(16,55,40,0.85) 0%, rgba(26,26,26,0.7) 100%);
  z-index: 1;
}
.lg-visual__content {
  position: absolute;
  bottom: 5rem;
  left: 4rem;
  z-index: 2;
  color: #fff;
}
.lg-visual__title {
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.lg-visual__sub {
  font-size: 0.875rem;
  color: rgba(255,255,255,0.6);
  letter-spacing: 0.1em;
  margin-bottom: 2.5rem;
}
.lg-visual__brands {
  display: flex;
  gap: 1.5rem;
}
.lg-visual__brands span {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.4);
}

/* ── 우: 폼 사이드 ── */
.lg-form-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100dvh;
}

/* 헤더 */
.lg-head {
  padding: 2rem 2.5rem;
}
.lg-head__back {
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
.lg-head__back:hover {
  background: #111;
  border-color: #111;
  color: #fff;
}
.lg-head__back .material-symbols-outlined {
  font-size: 1.125rem;
  font-variation-settings: "wght" 300;
}

/* 본문 */
.lg-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem 2.5rem;
  max-width: 26rem;
  width: 100%;
  margin: 0 auto;
}
.lg-body__top { margin-bottom: 2.5rem; }
.lg-body__title {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.lg-body__sub {
  font-size: 0.875rem;
  color: #999;
}

/* 폼 */
.lg-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.lg-field label {
  display: block;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #333;
  margin-bottom: 0.5rem;
}
.lg-field__wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1.5px solid #e8e8e8;
  border-radius: 0.5rem;
  padding: 0 1rem;
  transition: border-color 0.2s;
}
.lg-field__wrap:focus-within {
  border-color: #111;
}
.lg-field__icon {
  font-size: 1.125rem;
  color: #bbb;
  font-variation-settings: "wght" 300;
}
.lg-field__wrap input {
  flex: 1;
  border: none;
  background: none;
  padding: 0.9375rem 0;
  font-size: 0.875rem;
  color: #111;
  outline: none;
}
.lg-field__wrap input::placeholder { color: #ccc; }
.lg-field__toggle {
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #bbb;
  transition: color 0.2s;
}
.lg-field__toggle:hover { color: #111; }
.lg-field__toggle .material-symbols-outlined {
  font-size: 1.125rem;
  font-variation-settings: "wght" 300;
}

/* 에러 */
.lg-error {
  font-size: 0.75rem;
  color: #e53e3e;
  margin-top: -0.5rem;
}

/* 제출 버튼 */
.lg-submit {
  width: 100%;
  padding: 1rem;
  background: #111;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s, transform 0.15s;
  margin-top: 0.5rem;
}
.lg-submit:hover { background: #333; }
.lg-submit:active { transform: scale(0.98); }
.lg-submit:disabled { opacity: 0.4; cursor: not-allowed; }

/* 하단 */
.lg-bottom {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}
.lg-bottom__divider {
  display: flex;
  align-items: center;
  gap: 1rem;
  width: 100%;
}
.lg-bottom__divider span {
  flex: 1;
  height: 1px;
  background: #eee;
}
.lg-bottom__divider p {
  font-size: 0.6875rem;
  color: #bbb;
}
.lg-signup-link {
  font-size: 0.8125rem;
  color: #999;
  text-decoration: none;
  transition: color 0.2s;
}
.lg-signup-link strong {
  color: #111;
  font-weight: 700;
}
.lg-signup-link:hover { color: #111; }

/* 푸터 */
.lg-foot {
  padding: 2rem 2.5rem;
  text-align: center;
}
.lg-foot p {
  font-size: 0.5625rem;
  color: #ccc;
  letter-spacing: 0.1em;
}
</style>
