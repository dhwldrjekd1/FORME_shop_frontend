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
      <form class="auth-form" @submit.prevent="handleLogin">
        <!-- 이메일 -->
        <div class="auth-field">
          <label class="auth-field__label" for="email">Email Address</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="Enter your email"
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
            placeholder="Enter your password"
            class="auth-field__input"
            autocomplete="current-password"
            required
          />
        </div>

        <!-- 에러 메시지: 로그인 실패 시 표시 -->
        <p v-if="errorMsg" class="auth-error">{{ errorMsg }}</p>

        <div class="auth-cta">
          <button type="submit" class="auth-submit" :disabled="isLoading">
            {{ isLoading ? "Logging in..." : "LOGIN" }}
          </button>

          <div class="auth-links">
            <a href="#" class="auth-link">FORGOT PASSWORD?</a>
            <div class="auth-divider-row">
              <span class="auth-divider-line"></span>
              <!-- 회원가입 페이지로 이동 -->
              <RouterLink to="/signup" class="auth-link auth-link--bold">
                CREATE ACCOUNT
              </RouterLink>
              <span class="auth-divider-line"></span>
            </div>
          </div>
        </div>
      </form>

      <footer class="auth-footer">
        <p class="auth-footer__quote">
          Refined digital experiences for the modern curator.
        </p>
      </footer>
    </main>

    <!-- 배경 장식 -->
    <div class="auth-deco auth-deco--right"></div>
    <div class="auth-deco auth-deco--left"></div>
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

async function handleLogin() {
  errorMsg.value = "";
  isLoading.value = true;

  try {
    // TODO: Spring Boot 연결 시 아래 주석 해제, 임시 코드 제거
    // const response = await api.post('/auth/login', form.value)
    // authStore.login(response.data)

    // 임시: 이메일 + 비밀번호 입력하면 로그인 처리
    if (form.value.email && form.value.password) {
      authStore.login({
        id: 1,
        name: form.value.email.split("@")[0], // @ 앞부분을 이름으로 사용
        email: form.value.email,
      });

      // 로그인 전에 가려던 페이지가 있으면 그쪽으로, 없으면 홈으로
      const redirectTo = route.query.redirect || "/";
      router.push(redirectTo);
    } else {
      errorMsg.value = "이메일과 비밀번호를 입력해주세요.";
    }
  } catch (err) {
    errorMsg.value = "로그인에 실패했습니다. 다시 시도해주세요.";
  } finally {
    isLoading.value = false;
  }
}
</script>

<style scoped>
.auth-layout {
  min-height: 100dvh;
  background-color: var(--color-surface);
  position: relative;
  overflow: hidden;
}

/* ── 헤더 ── */
.auth-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2.5rem 2rem;
  max-width: 80rem;
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

/* 로고 가운데 정렬을 위한 빈 공간 */
.auth-header__spacer {
  width: 1.5rem;
}

/* ── 메인 ── */
.auth-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem 8rem;
  max-width: 28rem;
  margin: 0 auto;
}

/* ── 폼 ── */
.auth-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
}

/* ── 인풋 필드 ── */
.auth-field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.auth-field__label {
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--color-on-surface-variant);
}

.auth-field__input {
  width: 100%;
  background: transparent;
  border: none;
  /* 하단 선만 표시 (시안 스타일) */
  border-bottom: 1px solid rgba(198, 198, 198, 0.3);
  padding: 1rem 0;
  font-size: 0.875rem;
  letter-spacing: 0.04em;
  color: var(--color-on-surface);
  transition: border-color 0.2s;
}

.auth-field__input::placeholder {
  color: var(--color-surface-container-highest);
}

.auth-field__input:focus {
  border-bottom-color: var(--color-primary);
}

/* ── 에러 메시지 ── */
.auth-error {
  font-size: 0.75rem;
  color: var(--color-error);
  margin-top: -1.5rem;
}

/* ── CTA ── */
.auth-cta {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding-top: 1rem;
}

.auth-submit {
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 1.5rem;
  font-family: var(--font-accent);
  font-size: 1.0625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition:
    opacity 0.2s,
    transform 0.3s;
}

.auth-submit:hover {
  opacity: 0.88;
}
.auth-submit:active {
  transform: scale(0.97);
}

/* 로딩 중 버튼 비활성화 */
.auth-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ── 링크들 ── */
.auth-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.auth-link {
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

.auth-link:hover {
  color: var(--color-primary);
  border-bottom-color: rgba(0, 0, 0, 0.15);
}

/* 회원가입 링크 강조 */
.auth-link--bold {
  font-weight: 700;
  color: var(--color-primary);
}

/* 좌우 구분선 + 링크 */
.auth-divider-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.auth-divider-line {
  display: block;
  width: 2rem;
  height: 1px;
  background-color: rgba(198, 198, 198, 0.3);
}

/* ── 하단 문구 ── */
.auth-footer {
  margin-top: 7rem;
  text-align: center;
}

.auth-footer__quote {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 0.875rem;
  color: rgba(71, 71, 71, 0.4);
  max-width: 18rem;
  margin: 0 auto;
  line-height: 1.7;
}

/* ── 배경 장식 ── */
.auth-deco {
  position: fixed;
  z-index: -1; /* 콘텐츠 뒤에 배치 */
  pointer-events: none; /* 클릭 이벤트 무시 */
}

.auth-deco--right {
  top: 0;
  right: 0;
  width: 25%;
  height: 100vh;
  background-color: rgba(243, 243, 244, 0.2);
}

.auth-deco--left {
  bottom: 0;
  left: 0;
  width: 33%;
  height: 50vh;
  background-color: rgba(243, 243, 244, 0.1);
}
</style>
