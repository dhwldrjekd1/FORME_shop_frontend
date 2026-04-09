<template>
  <footer class="footer">
    <div class="footer__inner container--full">
      <!-- 브랜드명 -->
      <div class="footer__brand">FORME</div>

      <!-- 링크 그룹 3개 -->
      <div class="footer__links">
        <div class="footer__link-group">
          <h4 class="footer__link-title">SHOP</h4>
          <RouterLink to="/products" class="footer__link"
            >Beanpole</RouterLink
          >
          <RouterLink to="/products" class="footer__link"
            >Carhartt</RouterLink
          >
          <RouterLink to="/products" class="footer__link">Levis</RouterLink>
          <RouterLink to="/products" class="footer__link">Dickies</RouterLink>
        </div>

        <div class="footer__link-group">
          <h4 class="footer__link-title">SUPPORT</h4>
          <a href="#" class="footer__link">FAQ</a>
        </div>

        <div class="footer__link-group">
          <h4 class="footer__link-title">ABOUT</h4>
        </div>
      </div>
    </div>

    <!-- 하단 카피라이트 -->
    <div class="footer__bottom container--full">
      <p class="footer__copy">© 2024 FORME. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-on-surface); /* 어두운 배경 (#1a1c1c) */
  color: var(--color-surface-container-low);
  padding-top: 1.25rem;
}

/* 2단 그리드: 브랜드명(1) + 링크(2) */
.footer__inner {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  padding-bottom: 1rem;
}

.footer__brand {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 0.2em;
}

/* 링크 그룹 3개를 가로로 배치 */
.footer__links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.footer__link-group {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

/* 그룹 제목 */
.footer__link-title {
  font-family: var(--font-body);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: rgba(249, 249, 249, 0.4); /* 연하게 */
  margin-bottom: 0.5rem;
}

.footer__link {
  font-size: 0.8125rem;
  font-weight: 300;
  color: rgba(249, 249, 249, 0.7);
  transition: color 0.2s;
}

.footer__link:hover {
  color: rgba(249, 249, 249, 1); /* 호버 시 밝게 */
}

/* 하단 카피라이트 영역 */
.footer__bottom {
  padding: 0.75rem 2rem;
}

.footer__copy {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: rgba(249, 249, 249, 0.3);
}

/* 모바일 */
@media (max-width: 768px) {
  .footer__inner {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer__links {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
