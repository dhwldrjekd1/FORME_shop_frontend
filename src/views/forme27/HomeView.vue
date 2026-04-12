<template>
  <main class="page-wrapper f27">
    <header class="f27-head">
      <div class="f27-head__top">
        <a>로그인</a><a>회원가입</a><a>고객센터</a><a>내 주문</a>
      </div>
      <div class="f27-head__main">
        <h1 class="f27-head__logo"><span class="f27-logo-f">F</span>ORME</h1>
        <div class="f27-head__search">
          <select><option>전체</option><option>상의</option><option>하의</option></select>
          <input placeholder="찾고 싶은 상품을 검색해보세요" />
          <button>🔍</button>
        </div>
        <div class="f27-head__badges">
          <span class="f27-badge f27-badge--green">무료배송</span>
          <span class="f27-badge f27-badge--red">SALE</span>
        </div>
      </div>
      <nav class="f27-head__nav">
        <a class="f27-head__nav-hot">🔥 HOT</a>
        <a>전체</a>
        <a>신상품</a>
        <a>베스트</a>
        <a>빈폴</a>
        <a>칼하트</a>
        <a>리바이스</a>
        <a>디키즈</a>
        <a>아우터</a>
        <a>상의</a>
        <a>하의</a>
        <a class="f27-head__nav-sale">세일</a>
      </nav>
    </header>

    <!-- 배너 슬라이드 -->
    <section class="f27-banner">
      <div class="f27-banner__main">
        <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="banner" />
        <div class="f27-banner__text">
          <span class="f27-badge f27-badge--red">SPRING SALE</span>
          <h2>봄 신상 최대 30% 할인</h2>
          <p>4월 한정 · 전 브랜드 참여</p>
        </div>
      </div>
      <div class="f27-banner__side">
        <div class="f27-banner__card f27-banner__card--1">
          <p>🎁 신규가입</p>
          <h3>5만원 쿠폰팩</h3>
        </div>
        <div class="f27-banner__card f27-banner__card--2">
          <p>⚡ 타임딜</p>
          <h3>오늘만 40% OFF</h3>
        </div>
      </div>
    </section>

    <!-- 카테고리 아이콘 -->
    <section class="f27-cats">
      <div v-for="c in cats" :key="c.name" class="f27-cat">
        <div class="f27-cat__ico">{{ c.icon }}</div>
        <span>{{ c.name }}</span>
      </div>
    </section>

    <!-- 인기 검색어 -->
    <div class="f27-hot">
      <span class="f27-hot__label">인기 검색어</span>
      <span v-for="(w, i) in hotWords" :key="i" class="f27-hot__word">{{ i + 1 }}. {{ w }}</span>
    </div>

    <!-- 베스트 -->
    <section class="f27-section">
      <div class="f27-section__head">
        <h2>🏆 실시간 베스트</h2>
        <div class="f27-tabs">
          <button class="f27-tabs__btn f27-tabs__btn--active">전체</button>
          <button class="f27-tabs__btn">남성</button>
          <button class="f27-tabs__btn">여성</button>
        </div>
      </div>
      <div class="f27-products">
        <div v-for="(p, i) in products" :key="i" class="f27-prod">
          <div class="f27-prod__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f27-prod__rank" :class="{ 'f27-prod__rank--top': i < 3 }">{{ i + 1 }}</span>
            <span v-if="p.tag" class="f27-prod__tag">{{ p.tag }}</span>
          </div>
          <div class="f27-prod__info">
            <p class="f27-prod__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <div class="f27-prod__price-row">
              <span v-if="p.discount" class="f27-prod__dc">{{ p.discount }}</span>
              <span class="f27-prod__price">{{ p.price }}</span>
            </div>
            <p v-if="p.was" class="f27-prod__was">{{ p.was }}</p>
            <div class="f27-prod__meta">
              <span>⭐ {{ p.rating }}</span>
              <span>리뷰 {{ p.reviews }}</span>
              <span v-if="p.freeShip" class="f27-prod__ship">무료배송</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 기획전 -->
    <section class="f27-section">
      <h2>📋 기획전</h2>
      <div class="f27-events">
        <div v-for="e in events" :key="e.title" class="f27-event">
          <div class="f27-event__img"><img :src="e.img" :alt="e.title" /></div>
          <div class="f27-event__info">
            <span class="f27-badge" :class="e.badgeClass">{{ e.badge }}</span>
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <footer class="f27-foot">
      <div class="f27-foot__top">
        <div class="f27-foot__col">
          <h4><span class="f27-logo-f">F</span>ORME</h4>
          <p class="f27-foot__phone">1588-0000</p>
          <p>평일 09:00~18:00 (주말·공휴일 휴무)</p>
        </div>
        <div class="f27-foot__col"><h4>쇼핑</h4><a>전체상품</a><a>브랜드</a><a>베스트</a><a>신상품</a></div>
        <div class="f27-foot__col"><h4>고객</h4><a>마이페이지</a><a>주문조회</a><a>적립금</a><a>FAQ</a></div>
        <div class="f27-foot__col"><h4>정보</h4><a>회사소개</a><a>이용약관</a><a>개인정보</a><a>입점문의</a></div>
      </div>
      <div class="f27-foot__bot">
        <p>(주)FORME · 대표 김보경 · 사업자등록번호 000-00-00000 · 통신판매업 제2026-서울강남-00000호</p>
        <p>서울 강남구 테헤란로 000 · © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const cats = [
  { icon: "🔥", name: "HOT" },
  { icon: "🆕", name: "신상" },
  { icon: "👕", name: "상의" },
  { icon: "👖", name: "하의" },
  { icon: "🧥", name: "아우터" },
  { icon: "👔", name: "셔츠" },
  { icon: "🧢", name: "모자" },
  { icon: "💰", name: "세일" },
];
const hotWords = ["리바이스 555", "칼하트 워크팬츠", "빈폴 셔츠", "디키즈 카펜터", "봄자켓"];
const products = [
  { brand: "BEANPOLE", name: "헤리티지 칼라넥 티셔츠", discount: "20%", price: "127,200원", was: "159,000원", rating: "4.8", reviews: 248, freeShip: true, tag: "BEST", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { brand: "LEVI'S",   name: "555™ 릴렉스 스트레이트 진",  discount: "15%", price: "135,150원", was: "159,000원", rating: "4.9", reviews: 512, freeShip: true, tag: null, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { brand: "CARHARTT", name: "아이코닉 B01 더블프런트",    discount: "10%", price: "188,100원", was: "209,000원", rating: "4.8", reviews: 187, freeShip: true, tag: "HOT", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { brand: "DICKIES",  name: "카펜터 유틸리티 데님 팬츠",  discount: "25%", price: "78,750원",  was: "105,000원", rating: "4.7", reviews: 342, freeShip: true, tag: "SALE", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { brand: "BEANPOLE", name: "리넨 옥스포드 셔츠",        discount: null,   price: "149,000원", was: null,        rating: "4.7", reviews: 156, freeShip: true, tag: "NEW", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
];
const events = [
  { badge: "D-3", badgeClass: "f27-badge--red",   title: "봄 데님 위크",      desc: "리바이스·디키즈 최대 30%", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { badge: "진행중", badgeClass: "f27-badge--green", title: "워크웨어 기획전",   desc: "칼하트·디키즈 특별 할인",  img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { badge: "NEW",  badgeClass: "f27-badge--blue",  title: "빈폴 SS26 신상",    desc: "봄 셔츠·니트 신상 입고",  img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
];
</script>

<style scoped>
.f27 { background: #f5f5f5; color: #222; font-family: 'Noto Sans KR', -apple-system, sans-serif; min-height: 100dvh; }

.f27-head { background: #fff; border-bottom: 1px solid #e0e0e0; }
.f27-head__top { display: flex; justify-content: flex-end; gap: 1.5rem; padding: 0.5rem 2rem; background: #fafafa; font-size: 0.75rem; color: #666; border-bottom: 1px solid #eee; }
.f27-head__top a { cursor: pointer; }
.f27-head__main { display: grid; grid-template-columns: auto 1fr auto; gap: 2rem; align-items: center; padding: 1rem 2rem; }
.f27-head__logo { font-size: 1.875rem; font-weight: 900; letter-spacing: -0.03em; }
.f27-logo-f { color: #03C75A; }
.f27-head__search { display: flex; background: #fff; border: 2px solid #03C75A; border-radius: 6px; overflow: hidden; }
.f27-head__search select { border: none; padding: 0 0.75rem; font-size: 0.8125rem; background: #f5f5f5; border-right: 1px solid #ddd; outline: none; }
.f27-head__search input { flex: 1; border: none; padding: 0.75rem; font-size: 0.875rem; outline: none; }
.f27-head__search button { background: #03C75A; color: #fff; border: none; padding: 0 1rem; font-size: 1rem; cursor: pointer; }
.f27-head__badges { display: flex; gap: 0.5rem; }
.f27-badge { padding: 0.375rem 0.625rem; border-radius: 4px; font-size: 0.6875rem; font-weight: 700; }
.f27-badge--green { background: #E8F5E9; color: #2E7D32; }
.f27-badge--red { background: #FFEBEE; color: #C62828; }
.f27-badge--blue { background: #E3F2FD; color: #1565C0; }
.f27-head__nav { display: flex; gap: 0; padding: 0 2rem; border-top: 1px solid #eee; overflow-x: auto; }
.f27-head__nav a { padding: 0.875rem 1.125rem; font-size: 0.875rem; font-weight: 500; color: #333; white-space: nowrap; cursor: pointer; border-bottom: 2px solid transparent; }
.f27-head__nav a:hover { border-bottom-color: #03C75A; }
.f27-head__nav-hot { color: #C62828 !important; font-weight: 700 !important; }
.f27-head__nav-sale { color: #C62828 !important; }

.f27-banner { display: grid; grid-template-columns: 2fr 1fr; gap: 0.75rem; padding: 1rem 2rem; max-width: 1400px; margin: 0 auto; }
.f27-banner__main { position: relative; border-radius: 8px; overflow: hidden; aspect-ratio: 16/7; }
.f27-banner__main img { width: 100%; height: 100%; object-fit: cover; }
.f27-banner__text { position: absolute; bottom: 1.5rem; left: 1.5rem; color: #fff; }
.f27-banner__text h2 { font-size: 1.625rem; font-weight: 800; margin: 0.75rem 0 0.375rem; }
.f27-banner__text p { font-size: 0.8125rem; opacity: 0.9; }
.f27-banner__side { display: grid; grid-template-rows: 1fr 1fr; gap: 0.75rem; }
.f27-banner__card { padding: 1.5rem; border-radius: 8px; cursor: pointer; }
.f27-banner__card--1 { background: linear-gradient(135deg, #FFD54F, #FFA000); color: #3E2723; }
.f27-banner__card--2 { background: linear-gradient(135deg, #EF5350, #C62828); color: #fff; }
.f27-banner__card p { font-size: 0.75rem; margin-bottom: 0.375rem; }
.f27-banner__card h3 { font-size: 1.25rem; font-weight: 800; }

.f27-cats { display: grid; grid-template-columns: repeat(8, 1fr); gap: 0.75rem; padding: 1.5rem 2rem; max-width: 1400px; margin: 0 auto; }
.f27-cat { display: flex; flex-direction: column; align-items: center; gap: 0.375rem; cursor: pointer; }
.f27-cat__ico { width: 3.5rem; height: 3.5rem; background: #fff; border-radius: 50%; border: 1px solid #eee; display: flex; align-items: center; justify-content: center; font-size: 1.375rem; }
.f27-cat span { font-size: 0.75rem; font-weight: 600; color: #333; }

.f27-hot { display: flex; align-items: center; gap: 1rem; padding: 0.875rem 2rem; max-width: 1400px; margin: 0 auto; background: #fff; border-radius: 6px; flex-wrap: wrap; }
.f27-hot__label { font-size: 0.75rem; font-weight: 700; color: #03C75A; white-space: nowrap; }
.f27-hot__word { font-size: 0.75rem; color: #555; padding: 0.25rem 0.625rem; background: #f5f5f5; border-radius: 999px; cursor: pointer; }

.f27-section { padding: 2rem 2rem; max-width: 1400px; margin: 0 auto; }
.f27-section__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.f27-section h2 { font-size: 1.375rem; font-weight: 800; }
.f27-tabs { display: flex; gap: 0.375rem; }
.f27-tabs__btn { padding: 0.375rem 0.875rem; background: #f5f5f5; border: 1px solid #eee; border-radius: 999px; font-size: 0.75rem; font-weight: 600; cursor: pointer; }
.f27-tabs__btn--active { background: #222; color: #fff; border-color: #222; }

.f27-products { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; }
.f27-prod { background: #fff; border-radius: 8px; overflow: hidden; cursor: pointer; transition: box-shadow 0.2s; }
.f27-prod:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.08); }
.f27-prod__img { position: relative; aspect-ratio: 1/1; background: #f5f5f5; }
.f27-prod__img img { width: 100%; height: 100%; object-fit: cover; }
.f27-prod__rank { position: absolute; top: 0.5rem; left: 0.5rem; background: #222; color: #fff; width: 1.5rem; height: 1.5rem; border-radius: 4px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 800; }
.f27-prod__rank--top { background: #03C75A; }
.f27-prod__tag { position: absolute; top: 0.5rem; right: 0.5rem; background: #C62828; color: #fff; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.625rem; font-weight: 800; }
.f27-prod__info { padding: 0.875rem; }
.f27-prod__brand { font-size: 0.625rem; font-weight: 700; color: #999; margin-bottom: 0.25rem; }
.f27-prod__info h3 { font-size: 0.8125rem; font-weight: 500; line-height: 1.35; margin-bottom: 0.5rem; }
.f27-prod__price-row { display: flex; align-items: baseline; gap: 0.375rem; margin-bottom: 0.125rem; }
.f27-prod__dc { font-size: 1rem; font-weight: 900; color: #C62828; }
.f27-prod__price { font-size: 1rem; font-weight: 800; }
.f27-prod__was { font-size: 0.6875rem; color: #999; text-decoration: line-through; margin-bottom: 0.5rem; }
.f27-prod__meta { display: flex; gap: 0.5rem; font-size: 0.6875rem; color: #666; }
.f27-prod__ship { color: #2E7D32; font-weight: 700; }

.f27-events { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-top: 1rem; }
.f27-event { background: #fff; border-radius: 8px; overflow: hidden; cursor: pointer; }
.f27-event__img { aspect-ratio: 16/9; }
.f27-event__img img { width: 100%; height: 100%; object-fit: cover; }
.f27-event__info { padding: 1rem; }
.f27-event h3 { font-size: 1rem; font-weight: 700; margin: 0.5rem 0 0.375rem; }
.f27-event p { font-size: 0.75rem; color: #666; }

.f27-foot { background: #fff; border-top: 1px solid #e0e0e0; padding: 2.5rem 2rem 1.5rem; }
.f27-foot__top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 3rem; max-width: 1400px; margin: 0 auto 2rem; padding-bottom: 2rem; border-bottom: 1px solid #eee; }
.f27-foot__col h4 { font-size: 0.8125rem; font-weight: 800; margin-bottom: 0.75rem; }
.f27-foot__col a, .f27-foot__col p { display: block; font-size: 0.6875rem; color: #666; margin-bottom: 0.375rem; cursor: pointer; }
.f27-foot__phone { font-size: 1.5rem !important; font-weight: 900 !important; color: #03C75A !important; margin-bottom: 0.375rem !important; }
.f27-foot__bot { max-width: 1400px; margin: 0 auto; font-size: 0.625rem; color: #999; line-height: 1.7; }
</style>
