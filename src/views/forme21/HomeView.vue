<template>
  <main class="page-wrapper f21">
    <!-- 상단 인포바 -->
    <div class="f21-topbar">
      <div class="f21-topbar__left">
        <span>전 상품 무료배송</span><span>·</span>
        <span>신규회원 10% 쿠폰</span><span>·</span>
        <span>7일 무료 반품</span>
      </div>
      <div class="f21-topbar__right">
        <span>고객센터 1588-0000</span>
      </div>
    </div>

    <!-- 헤더 -->
    <header class="f21-head">
      <div class="f21-head__logo">FORME</div>
      <nav class="f21-head__nav">
        <a class="f21-head__link">NEW</a>
        <a class="f21-head__link">BEST</a>
        <a class="f21-head__link">BRAND</a>
        <a class="f21-head__link">OUTER</a>
        <a class="f21-head__link">TOPS</a>
        <a class="f21-head__link">BOTTOMS</a>
        <a class="f21-head__link f21-head__link--sale">SALE</a>
      </nav>
      <div class="f21-head__actions">
        <input class="f21-head__search" placeholder="검색어를 입력하세요" />
        <span class="f21-head__icon">♡</span>
        <span class="f21-head__icon">👤</span>
        <span class="f21-head__icon">🛒<em>2</em></span>
      </div>
    </header>

    <!-- Hero -->
    <section class="f21-hero">
      <div class="f21-hero__main">
        <div class="f21-hero__text">
          <p class="f21-hero__tag">2026 SPRING COLLECTION</p>
          <h1 class="f21-hero__title">봄의 시작,<br />새로운 클래식</h1>
          <p class="f21-hero__sub">네 개의 헤리티지 브랜드로 완성하는 올봄의 옷장</p>
          <a class="f21-hero__cta">컬렉션 보기 →</a>
        </div>
        <div class="f21-hero__img">
          <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" />
        </div>
      </div>
      <div class="f21-hero__dots">
        <span class="f21-hero__dot f21-hero__dot--active"></span>
        <span class="f21-hero__dot"></span>
        <span class="f21-hero__dot"></span>
      </div>
    </section>

    <!-- 프로모션 3분할 -->
    <section class="f21-promo">
      <div class="f21-promo__card">
        <div class="f21-promo__icon">🎁</div>
        <h3>멤버십 5만원</h3>
        <p>신규 가입 즉시 쿠폰 증정</p>
      </div>
      <div class="f21-promo__card">
        <div class="f21-promo__icon">🚚</div>
        <h3>무료배송</h3>
        <p>전 상품 무료배송 서비스</p>
      </div>
      <div class="f21-promo__card">
        <div class="f21-promo__icon">↩</div>
        <h3>7일 교환·반품</h3>
        <p>부담 없이 집에서 입어보세요</p>
      </div>
    </section>

    <!-- 브랜드관 -->
    <section class="f21-section">
      <header class="f21-section__head">
        <div>
          <p class="f21-section__eyebrow">BRAND</p>
          <h2>브랜드관</h2>
        </div>
        <a class="f21-section__more">전체보기 →</a>
      </header>
      <div class="f21-brands">
        <div v-for="b in brands" :key="b.name" class="f21-brand">
          <div class="f21-brand__img"><img :src="b.img" :alt="b.name" /></div>
          <h3>{{ b.name }}</h3>
          <p>{{ b.desc }}</p>
          <a class="f21-brand__link">바로가기 →</a>
        </div>
      </div>
    </section>

    <!-- 베스트 -->
    <section class="f21-section f21-section--alt">
      <header class="f21-section__head">
        <div>
          <p class="f21-section__eyebrow">BEST</p>
          <h2>이번 주 베스트</h2>
        </div>
        <div class="f21-tabs">
          <button class="f21-tabs__btn f21-tabs__btn--active">전체</button>
          <button class="f21-tabs__btn">아우터</button>
          <button class="f21-tabs__btn">상의</button>
          <button class="f21-tabs__btn">하의</button>
        </div>
      </header>
      <div class="f21-products">
        <div v-for="(p, i) in products" :key="i" class="f21-prod">
          <div class="f21-prod__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f21-prod__rank">{{ i + 1 }}</span>
            <span class="f21-prod__wish">♡</span>
          </div>
          <p class="f21-prod__brand">{{ p.brand }}</p>
          <h3 class="f21-prod__name">{{ p.name }}</h3>
          <div class="f21-prod__price">
            <span class="f21-prod__discount">{{ p.discount }}</span>
            <span class="f21-prod__now">{{ p.price }}</span>
            <span class="f21-prod__was">{{ p.was }}</span>
          </div>
          <p class="f21-prod__reviews">★ 4.8 (리뷰 {{ p.reviews }})</p>
        </div>
      </div>
    </section>

    <!-- 카테고리 배너 -->
    <section class="f21-banner">
      <div class="f21-banner__card">
        <img src="https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" alt="denim" />
        <div class="f21-banner__text">
          <p>DENIM WEEK</p>
          <h3>봄 데님의 기준</h3>
        </div>
      </div>
      <div class="f21-banner__card">
        <img src="https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" alt="workwear" />
        <div class="f21-banner__text">
          <p>WORKWEAR</p>
          <h3>출근길의 든든함</h3>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="f21-foot">
      <div class="f21-foot__top">
        <div class="f21-foot__col">
          <h4>고객센터</h4>
          <p class="f21-foot__phone">1588-0000</p>
          <p>평일 09:00 ~ 18:00</p>
          <p>점심 12:00 ~ 13:00</p>
          <p>주말·공휴일 휴무</p>
        </div>
        <div class="f21-foot__col">
          <h4>SHOP</h4>
          <a>NEW</a><a>BEST</a><a>BRAND</a><a>SALE</a>
        </div>
        <div class="f21-foot__col">
          <h4>MY</h4>
          <a>마이페이지</a><a>주문조회</a><a>위시리스트</a><a>적립금</a>
        </div>
        <div class="f21-foot__col">
          <h4>COMPANY</h4>
          <a>회사소개</a><a>이용약관</a><a>개인정보처리방침</a>
        </div>
      </div>
      <div class="f21-foot__bot">
        <p>(주)FORME · 대표 김보경 · 사업자등록번호 000-00-00000</p>
        <p>서울특별시 강남구 테헤란로 000 · © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const brands = [
  { name: "BEANPOLE", desc: "한국 클래식의 정수",       img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "CARHARTT", desc: "디트로이트 워크웨어",      img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "LEVI'S",   desc: "150년 데님 아이콘",        img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "DICKIES",  desc: "한 세기 워크웨어",         img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const products = [
  { brand: "BEANPOLE", name: "헤리티지클럽 칼라넥 티셔츠", discount: "20%", price: "127,200원", was: "159,000원", reviews: 248, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { brand: "LEVI'S",   name: "555™ 릴렉스 스트레이트 진",    discount: "15%", price: "135,150원", was: "159,000원", reviews: 512, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { brand: "CARHARTT", name: "아이코닉 B01 더블프런트 팬츠", discount: "10%", price: "188,100원", was: "209,000원", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { brand: "DICKIES",  name: "카펜터 유틸리티 데님 팬츠",    discount: "25%", price: "78,750원",  was: "105,000원", reviews: 342, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f21 {
  background: #fff;
  color: #222;
  font-family: 'Noto Sans KR', sans-serif;
  min-height: 100dvh;
}

/* 상단 인포바 */
.f21-topbar {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 3rem;
  background: #222;
  color: #ddd;
  font-size: 0.75rem;
}
.f21-topbar__left { display: flex; gap: 0.75rem; }

/* 헤더 */
.f21-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 3rem;
  align-items: center;
  padding: 1.5rem 3rem;
  border-bottom: 1px solid #eee;
}
.f21-head__logo {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #8b1a1a;
}
.f21-head__nav { display: flex; justify-content: center; gap: 2rem; }
.f21-head__link {
  font-size: 0.9375rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
}
.f21-head__link--sale { color: #d32f2f; }
.f21-head__actions { display: flex; align-items: center; gap: 1rem; }
.f21-head__search {
  width: 14rem;
  padding: 0.625rem 1rem;
  border: 1px solid #ddd;
  border-radius: 999px;
  background: #f7f7f7;
  font-size: 0.8125rem;
  outline: none;
}
.f21-head__icon { font-size: 1.125rem; position: relative; cursor: pointer; }
.f21-head__icon em {
  position: absolute; top: -4px; right: -10px;
  background: #d32f2f; color: #fff;
  font-size: 0.5625rem; font-weight: 700; font-style: normal;
  padding: 0.125rem 0.375rem; border-radius: 999px;
}

/* Hero */
.f21-hero {
  padding: 2.5rem 3rem;
  background: #f7f5f0;
}
.f21-hero__main {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: center;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-hero__tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #8b1a1a;
  margin-bottom: 1rem;
}
.f21-hero__title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  line-height: 1.25;
  color: #1a1a1a;
  margin-bottom: 1.25rem;
}
.f21-hero__sub {
  font-size: 1rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.f21-hero__cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
}
.f21-hero__img {
  overflow: hidden;
  border-radius: 4px;
  aspect-ratio: 16/10;
}
.f21-hero__img img { width: 100%; height: 100%; object-fit: cover; }
.f21-hero__dots {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.f21-hero__dot {
  width: 10px; height: 10px;
  background: #ccc; border-radius: 50%;
}
.f21-hero__dot--active { background: #8b1a1a; width: 24px; border-radius: 5px; }

/* 프로모션 */
.f21-promo {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-promo__card {
  padding: 2rem;
  background: #f7f5f0;
  text-align: center;
  border: 1px solid #eee;
}
.f21-promo__icon { font-size: 2rem; margin-bottom: 0.75rem; }
.f21-promo__card h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.5rem; }
.f21-promo__card p { font-size: 0.875rem; color: #666; }

/* 섹션 공통 */
.f21-section {
  padding: 4rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-section--alt { background: #fafafa; max-width: none; }
.f21-section__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2.5rem;
  max-width: 1400px;
  margin: 0 auto 2.5rem;
}
.f21-section__eyebrow {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #8b1a1a;
  margin-bottom: 0.5rem;
}
.f21-section__head h2 {
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
}
.f21-section__more {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #1a1a1a;
  cursor: pointer;
  border-bottom: 1px solid #1a1a1a;
}

/* 브랜드 */
.f21-brands {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-brand { text-align: center; }
.f21-brand__img {
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f5f5f5;
}
.f21-brand__img img { width: 100%; height: 100%; object-fit: cover; }
.f21-brand h3 { font-size: 1.125rem; font-weight: 700; margin-bottom: 0.375rem; }
.f21-brand p { font-size: 0.8125rem; color: #666; margin-bottom: 0.75rem; }
.f21-brand__link { font-size: 0.75rem; color: #8b1a1a; font-weight: 600; cursor: pointer; }

/* 탭 */
.f21-tabs { display: flex; gap: 0.5rem; }
.f21-tabs__btn {
  padding: 0.5rem 1.25rem;
  background: #fff;
  border: 1px solid #ddd;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
}
.f21-tabs__btn--active { background: #1a1a1a; color: #fff; border-color: #1a1a1a; }

/* 상품 */
.f21-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-prod { background: #fff; cursor: pointer; }
.f21-prod__img {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.f21-prod__img img { width: 100%; height: 100%; object-fit: cover; }
.f21-prod__rank {
  position: absolute; top: 0.75rem; left: 0.75rem;
  background: #1a1a1a; color: #fff;
  width: 1.75rem; height: 1.75rem;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8125rem; font-weight: 700;
}
.f21-prod__wish {
  position: absolute; bottom: 0.75rem; right: 0.75rem;
  background: rgba(255,255,255,0.95);
  width: 2rem; height: 2rem;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.875rem; color: #8b1a1a;
}
.f21-prod__brand {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f21-prod__name {
  font-size: 0.875rem;
  color: #1a1a1a;
  line-height: 1.4;
  margin-bottom: 0.5rem;
  font-weight: 500;
}
.f21-prod__price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
}
.f21-prod__discount { font-size: 1rem; font-weight: 700; color: #d32f2f; }
.f21-prod__now { font-size: 1rem; font-weight: 700; color: #1a1a1a; }
.f21-prod__was { font-size: 0.75rem; color: #999; text-decoration: line-through; }
.f21-prod__reviews { font-size: 0.75rem; color: #666; }

/* 배너 */
.f21-banner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  padding: 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f21-banner__card {
  position: relative;
  aspect-ratio: 16/9;
  overflow: hidden;
  cursor: pointer;
}
.f21-banner__card img { width: 100%; height: 100%; object-fit: cover; }
.f21-banner__text {
  position: absolute; bottom: 2rem; left: 2rem;
  color: #fff;
}
.f21-banner__text p {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.5rem;
}
.f21-banner__text h3 {
  font-size: 1.75rem;
  font-weight: 700;
}

/* 푸터 */
.f21-foot {
  background: #f5f5f5;
  padding: 3rem 3rem 1.5rem;
  border-top: 1px solid #e5e5e5;
}
.f21-foot__top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
  max-width: 1400px;
  margin: 0 auto 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
}
.f21-foot__col h4 {
  font-size: 0.8125rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}
.f21-foot__col a,
.f21-foot__col p {
  display: block;
  font-size: 0.75rem;
  color: #666;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.f21-foot__phone {
  font-size: 1.75rem !important;
  font-weight: 900 !important;
  color: #1a1a1a !important;
  margin-bottom: 0.5rem !important;
}
.f21-foot__bot {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 0.6875rem;
  color: #999;
  line-height: 1.8;
}
</style>
