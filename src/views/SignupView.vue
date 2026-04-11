<template>
  <div class="auth-layout">
    <!-- 헤더 -->
    <header class="auth-header">
      <RouterLink to="/" class="auth-header__close" aria-label="닫기">
        <span class="material-symbols-outlined">close</span>
      </RouterLink>
      <RouterLink to="/" class="auth-header__logo">FORME</RouterLink>
      <div class="auth-header__spacer"></div>
    </header>

    <!-- 메인 폼 -->
    <main class="auth-main">
      <form class="auth-form" @submit.prevent="handleSignup">
        <!-- 이름 -->
        <div class="auth-field">
          <label class="auth-field__label" for="full_name">Full Name</label>
          <input
            id="full_name"
            v-model="form.name"
            type="text"
            placeholder="E.G. JULIEN D'ESTRÉE"
            class="auth-field__input"
            autocomplete="name"
            required
          />
        </div>

        <!-- 이메일 -->
        <div class="auth-field">
          <label class="auth-field__label" for="email">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="NAME@DOMAIN.COM"
            class="auth-field__input"
            autocomplete="email"
            required
          />
        </div>

        <!-- 비밀번호 -->
        <div class="auth-field">
          <label class="auth-field__label" for="password">Password</label>
          <input
            id="password"
            v-model="form.password"
            type="password"
            placeholder="••••••••••••"
            class="auth-field__input"
            autocomplete="new-password"
            required
          />
        </div>

        <!-- 에러 메시지 -->
        <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

        <div class="auth-cta">
          <button type="submit" class="auth-submit" :disabled="isLoading">
            <span>{{
              isLoading ? "Creating Account..." : "CREATE ACCOUNT"
            }}</span>
            <!-- 호버 시 오른쪽으로 살짝 이동하는 화살표 -->
            <span class="material-symbols-outlined auth-submit__icon"
              >arrow_forward</span
            >
          </button>
        </div>
      </form>

      <!-- 약관 + 로그인 링크 -->
      <footer class="auth-footer">
        <p class="auth-footer__terms">
          By creating an account, you agree to our Terms of Service and Privacy
          Policy.
        </p>
        <span class="auth-footer__divider"></span>
        <RouterLink to="/login" class="auth-footer__login">
          ALREADY A MEMBER? LOG IN
        </RouterLink>
      </footer>
    </main>

    <!-- 하단 탭 네비 (시안 재현) -->
    <nav class="auth-bottom-nav">
      <RouterLink to="/login" class="auth-bottom-nav__item">
        <span class="material-symbols-outlined">login</span>
        <span class="auth-bottom-nav__label">LOGIN</span>
      </RouterLink>
      <!-- 현재 페이지: 상단 테두리 강조 -->
      <RouterLink
        to="/signup"
        class="auth-bottom-nav__item auth-bottom-nav__item--active"
      >
        <span class="material-symbols-outlined">person_add</span>
        <span class="auth-bottom-nav__label">SIGN UP</span>
      </RouterLink>
    </nav>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

const form = ref({ name: "", email: "", password: "" });
const errorMsg = ref("");
const isLoading = ref(false);

async function handleSignup() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    // Spring Boot POST /api/register → 가입 후 store 내부에서 자동 로그인
    await authStore.register({
      email: form.value.email,
      password: form.value.password,
      name: form.value.name,
    });

    router.push("/"); // 가입 완료 후 홈으로 이동
  } catch (err) {
    errorMsg.value =
      err?.data?.message || err?.message || "회원가입에 실패했습니다. 다시 시도해주세요.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.auth-layout {
  min-height: 100dvh;
  background-color: var(--color-surface);
  color: var(--color-on-surface);
  display: flex;
  flex-direction: column;
}

/* ── 헤더 ── */
.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  max-width: 80rem;
  width: 100%;
  margin: 0 auto;
}

.auth-header__close {
  display: flex;
  align-items: center;
  color: var(--color-primary);
  transition: opacity 0.3s;
}

.auth-header__close:hover {
  opacity: 0.6;
}

.auth-header__logo {
  font-family: var(--font-headline);
  font-size: 1.875rem;
  font-weight: 300;
  letter-spacing: 0.2em;
  color: #000;
}

.auth-header__spacer {
  width: 1.5rem;
}

/* ── 메인 ── */
.auth-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem 8rem;
  max-width: 28rem;
  width: 100%;
  margin: 0 auto;
}

/* ── 폼 ── */
.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

/* ── 인풋 필드 ── */
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-field__label {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

.auth-field__input {
  width: 100%;
  background-color: var(--color-surface-container-low);
  border: none;
  border-bottom: 1px solid var(--color-outline-variant);
  padding: 1rem 0;
  font-size: 0.875rem;
  color: var(--color-on-surface);
  transition: border-color 0.3s;
}

.auth-field__input::placeholder {
  color: rgba(119, 119, 119, 0.4);
}

.auth-field__input:focus {
  border-bottom-color: var(--color-primary);
}

/* ── 에러 ── */
.auth-error {
  font-size: 0.75rem;
  color: var(--color-error);
  margin-top: -1.5rem;
}

/* ── CTA ── */
.auth-cta {
  padding-top: 2rem;
}

.auth-submit {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.25rem 2.75rem;
  display: flex;
  justify-content: space-between; /* 텍스트 왼쪽, 화살표 오른쪽 */
  align-items: center;
  font-family: var(--font-accent);
  font-size: 1.0625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition:
    opacity 0.3s,
    transform 0.3s;
}

.auth-submit:hover {
  opacity: 0.9;
}

/* 호버 시 화살표 오른쪽으로 이동 */
.auth-submit:hover .auth-submit__icon {
  transform: translateX(4px);
}

.auth-submit:active {
  transform: scale(0.98);
}
.auth-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.auth-submit__icon {
  font-size: 0.875rem;
  transition: transform 0.3s;
}

/* ── 푸터 ── */
.auth-footer {
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
}

.auth-footer__terms {
  font-size: 0.6875rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  max-width: 18rem;
  opacity: 0.6;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.auth-footer__divider {
  display: block;
  width: 2rem;
  height: 1px;
  background-color: var(--color-outline-variant);
}

.auth-footer__login {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-primary);
  transition: opacity 0.3s;
}

.auth-footer__login:hover {
  opacity: 0.5;
}

/* ── 하단 탭 네비 ── */
.auth-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 50;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0.75rem 3rem 2rem;
  background-color: rgba(249, 249, 249, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 0.5px solid rgba(0, 0, 0, 0.05);
}

.auth-bottom-nav__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: var(--color-on-surface-variant);
  padding-top: 0.5rem;
  transition: color 0.2s;
}

.auth-bottom-nav__item:hover {
  color: var(--color-primary);
}

/* 현재 페이지 탭 강조 */
.auth-bottom-nav__item--active {
  color: var(--color-primary);
  border-top: 2px solid var(--color-primary);
  opacity: 0.8;
}

.auth-bottom-nav__label {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  font-weight: 500;
}

.material-symbols-outlined {
  font-size: 1.25rem;
}
</style>
