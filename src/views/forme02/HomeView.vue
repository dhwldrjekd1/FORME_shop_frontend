<template>
  <main class="f02">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f02-topbar">
      <div class="f02-topbar__promo">
        <span>★ 신규회원 5만원 쿠폰 ★ 전 상품 무료배송 ★ 7일 무료 반품 ★</span>
      </div>
      <div class="f02-topbar__main">
        <div class="f02-topbar__left">
          <RouterLink to="/forme" class="f02-topbar__link">◁ PICKER</RouterLink>
        </div>
        <div class="f02-topbar__logo">FORME</div>
        <div class="f02-topbar__search">
          <input placeholder="브랜드, 상품 검색" />
          <button>🔍</button>
        </div>
        <div class="f02-topbar__icons">
          <span>♡</span>
          <span>👤</span>
          <span class="f02-topbar__cart">🛒<em>3</em></span>
          <RouterLink to="/" class="f02-topbar__link">HOME ▷</RouterLink>
        </div>
      </div>
      <nav class="f02-topbar__nav">
        <a class="f02-topbar__nav-item f02-topbar__nav-item--hot">🔥 NEW</a>
        <RouterLink to="/beanpole" class="f02-topbar__nav-item">BEANPOLE</RouterLink>
        <RouterLink to="/carhartt" class="f02-topbar__nav-item">CARHARTT</RouterLink>
        <RouterLink to="/levis" class="f02-topbar__nav-item">LEVI'S</RouterLink>
        <RouterLink to="/dickies" class="f02-topbar__nav-item">DICKIES</RouterLink>
        <a class="f02-topbar__nav-item f02-topbar__nav-item--sale">SALE</a>
      </nav>
    </header>

    <!-- ═══ Hero Slide ═══ -->
    <section class="f02-hero">
      <div class="f02-hero__slide">
        <img :src="currentSlide.image" :alt="currentSlide.title" class="f02-hero__img" />
        <div class="f02-hero__content">
          <span class="f02-hero__badge" :style="{ backgroundColor: currentSlide.color }">{{ currentSlide.tag }}</span>
          <h1 class="f02-hero__title">{{ currentSlide.title }}</h1>
          <p class="f02-hero__sub">{{ currentSlide.sub }}</p>
          <RouterLink :to="currentSlide.route" class="f02-hero__cta">
            바로가기 <span>→</span>
          </RouterLink>
        </div>
      </div>
      <div class="f02-hero__dots">
        <button
          v-for="(s, i) in slides"
          :key="i"
          class="f02-hero__dot"
          :class="{ 'f02-hero__dot--active': i === slideIndex }"
          @click="slideIndex = i"
        ></button>
      </div>
      <div class="f02-hero__counter">
        <strong>{{ slideIndex + 1 }}</strong> / {{ slides.length }}
      </div>
    </section>

    <!-- ═══ Category Icons ═══ -->
    <section class="f02-cats">
      <a v-for="cat in categories" :key="cat.name" class="f02-cat">
        <div class="f02-cat__icon" :style="{ backgroundColor: cat.bg }">{{ cat.emoji }}</div>
        <p>{{ cat.name }}</p>
      </a>
    </section>

    <!-- ═══ Daily Deal ═══ -->
    <section class="f02-deal">
      <div class="f02-deal__inner">
        <div class="f02-deal__head">
          <p class="f02-deal__tag">⏰ 오늘 단 하루</p>
          <h2 class="f02-deal__title">DAILY DEAL</h2>
          <p class="f02-deal__sub">매일 새로운 특가, 매일 바뀝니다.</p>
        </div>
        <div class="f02-deal__products">
          <RouterLink
            v-for="(p, i) in dealProducts"
            :key="i"
            :to="`/products/${p.id}`"
            class="f02-deal-card"
          >
            <div class="f02-deal-card__img-wrap">
              <img :src="p.img" :alt="p.name" />
              <span class="f02-deal-card__badge">-30%</span>
            </div>
            <div class="f02-deal-card__info">
              <p class="f02-deal-card__brand">{{ p.brand }}</p>
              <h3>{{ p.name }}</h3>
              <div class="f02-deal-card__price-row">
                <span class="f02-deal-card__dc">30%</span>
                <span class="f02-deal-card__price">{{ fmtPrice(Math.round(p.rawPrice * 0.7)) }}원</span>
              </div>
              <p class="f02-deal-card__original">{{ fmtPrice(p.rawPrice) }}원</p>
              <p class="f02-deal-card__rating">★ {{ p.rating }} ({{ p.reviews }})</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Brand Promotion ═══ -->
    <section class="f02-promo">
      <header class="f02-sec-head">
        <h2>BRAND PROMOTION</h2>
      </header>
      <div class="f02-promo__grid">
        <RouterLink
          v-for="b in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f02-promo-card"
          :style="{ backgroundColor: b.bgColor }"
        >
          <div class="f02-promo-card__text">
            <p class="f02-promo-card__tag" :style="{ color: b.accentColor }">{{ b.tag }}</p>
            <h3>{{ b.title }}</h3>
            <p class="f02-promo-card__desc">{{ b.desc }}</p>
            <span class="f02-promo-card__cta">SHOP NOW →</span>
          </div>
          <div class="f02-promo-card__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Best (탭 + 랭킹) ═══ -->
    <section class="f02-best">
      <header class="f02-sec-head f02-sec-head--between">
        <div>
          <p class="f02-best__eyebrow">BEST</p>
          <h2>실시간 베스트</h2>
        </div>
        <div class="f02-best__tabs">
          <button
            v-for="tab in bestTabs"
            :key="tab"
            class="f02-best__tab"
            :class="{ 'f02-best__tab--active': activeTab === tab }"
            @click="activeTab = tab"
          >{{ tab }}</button>
        </div>
      </header>
      <div class="f02-best__grid">
        <RouterLink
          v-for="(p, i) in bestProducts"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f02-best-card"
        >
          <div class="f02-best-card__img-wrap">
            <span class="f02-best-card__rank" :class="{ 'f02-best-card__rank--top': i < 3 }">{{ i + 1 }}</span>
            <img :src="p.img" :alt="p.name" />
            <div class="f02-best-card__hover">
              <button>QUICK VIEW</button>
            </div>
          </div>
          <p class="f02-best-card__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <div class="f02-best-card__price-row">
            <span v-if="p.discount" class="f02-best-card__dc">{{ p.discount }}</span>
            <span class="f02-best-card__price">{{ fmtPrice(p.rawPrice) }}원</span>
          </div>
          <p class="f02-best-card__rating">★ {{ p.rating }} · 리뷰 {{ p.reviews }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ For You ═══ -->
    <section class="f02-rec">
      <header class="f02-sec-head">
        <h2>FOR YOU</h2>
        <p class="f02-rec__sub">FORME가 추천하는 오늘의 셀렉션</p>
      </header>
      <div class="f02-rec__grid">
        <RouterLink
          v-for="(p, i) in recProducts"
          :key="i"
          :to="`/products/${p.id}`"
          class="f02-rec-card"
        >
          <img :src="p.img" :alt="p.name" />
          <div class="f02-rec-card__info">
            <p class="f02-rec-card__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f02-rec-card__price">{{ fmtPrice(p.rawPrice) }}원</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f02-newsletter">
      <div class="f02-newsletter__inner">
        <h2>📬 매주 수요일, FORME 뉴스레터</h2>
        <p>신상품과 특가 소식을 가장 먼저 받아보세요.</p>
        <div class="f02-newsletter__form">
          <input type="email" placeholder="이메일 주소를 입력해주세요" />
          <button>구독하기</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f02-foot">
      <div class="f02-foot__top">
        <div class="f02-foot__brand">
          <h3 class="f02-foot__logo">FORME</h3>
          <p class="f02-foot__slogan">Colorful Department · Est. 2026</p>
          <div class="f02-foot__social">
            <a>IG</a><a>FB</a><a>YT</a><a>KT</a>
          </div>
        </div>
        <div class="f02-foot__grid">
          <div class="f02-foot__col">
            <h4>SHOP</h4>
            <a>NEW</a><a>BEST</a>
            <RouterLink to="/beanpole">BEANPOLE</RouterLink>
            <RouterLink to="/carhartt">CARHARTT</RouterLink>
            <RouterLink to="/levis">LEVI'S</RouterLink>
            <RouterLink to="/dickies">DICKIES</RouterLink>
            <a>SALE</a>
          </div>
          <div class="f02-foot__col">
            <h4>고객센터</h4>
            <p class="f02-foot__phone">1588-0000</p>
            <p>평일 09:00~18:00</p>
            <a>1:1 문의</a>
            <RouterLink to="/faq">FAQ</RouterLink>
          </div>
          <div class="f02-foot__col">
            <h4>MY</h4>
            <RouterLink to="/mypage">마이페이지</RouterLink>
            <a>주문조회</a>
            <a>위시리스트</a>
            <a>적립금</a>
            <a>쿠폰</a>
          </div>
          <div class="f02-foot__col">
            <h4>COMPANY</h4>
            <a>회사소개</a>
            <a>이용약관</a>
            <a>개인정보처리방침</a>
            <a>입점 문의</a>
          </div>
        </div>
      </div>
      <div class="f02-foot__legal">
        <p>(주)FORME | 대표 김보경 | 사업자등록번호 000-00-00000 | 통신판매업 제2026-서울강남-00000호</p>
        <p>서울특별시 강남구 테헤란로 000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

// ── Slide ──
const slides = [
  { tag: "NEW SEASON",  title: "2026 SPRING\nCOLLECTION",  sub: "봄을 입는 가장 세련된 방법", route: "/products", color: "#FF6B6B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { tag: "BEST SELLER", title: "LEVI'S DENIM",             sub: "150년 헤리티지의 정수",       route: "/levis",    color: "#4A6BFF", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { tag: "WORK TOUGH",  title: "DICKIES\nWORKWEAR",        sub: "현장에서 일상까지",           route: "/dickies",  color: "#FFB400", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { tag: "ICONIC",      title: "CARHARTT\nSINCE 1889",     sub: "디트로이트의 정직함",         route: "/carhartt", color: "#9C4F18", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
const slideIndex = ref(0);
const currentSlide = computed(() => slides[slideIndex.value]);
let timer = null;
onMounted(() => { timer = setInterval(() => { slideIndex.value = (slideIndex.value + 1) % slides.length; }, 5000); });
onUnmounted(() => { if (timer) clearInterval(timer); });

const activeTab = ref("전체");
const bestTabs = ["전체", "상의", "하의", "데님"];

function fmtPrice(p) { return p ? p.toLocaleString() : ""; }

const categories = [
  { name: "전체",   emoji: "🏠", bg: "#FFE4E1" },
  { name: "신상품", emoji: "🆕", bg: "#E0F4FF" },
  { name: "베스트", emoji: "🔥", bg: "#FFF4D6" },
  { name: "특가",   emoji: "💰", bg: "#FFE4F0" },
  { name: "상의",   emoji: "👕", bg: "#E4FFE4" },
  { name: "하의",   emoji: "👖", bg: "#F0E4FF" },
  { name: "데님",   emoji: "🧵", bg: "#E4F4FF" },
  { name: "Q&A",    emoji: "💬", bg: "#FFEEDD" },
];

const brandPanels = [
  { id: 1, title: "BEANPOLE", tag: "HERITAGE",   desc: "1989년 서울, 한국 클래식의 정수",       route: "/beanpole", bgColor: "#103728", accentColor: "#C9A86B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   tag: "DENIM ICON", desc: "1873년부터 이어진 데님의 역사",         route: "/levis",    bgColor: "#8E1C28", accentColor: "#FFD0D0", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  tag: "WORK WEAR",  desc: "100년 워크웨어의 산증인",                route: "/dickies",  bgColor: "#1A1A1A", accentColor: "#FFC72C", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", tag: "RUGGED",     desc: "디트로이트에서 시작된 워크 클래식",     route: "/carhartt", bgColor: "#9C4F18", accentColor: "#FFC72C", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];

const allProducts = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     rawPrice: 159000, discount: "20%", rating: "4.8", reviews: 248, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  rawPrice: 159000, discount: "15%", rating: "4.9", reviews: 512, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "아이코닉 B01 더블프런트",    rawPrice: 209000, discount: "10%", rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  rawPrice: 105000, discount: "25%", rating: "4.7", reviews: 342, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "Beanpole", name: "피그먼트 워싱 치노 팬츠",   rawPrice: 239000, discount: null,   rating: "4.7", reviews: 156, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   name: "565™ 루즈 스트레이트 진",   rawPrice: 99000,  discount: "23%", rating: "4.6", reviews: 98,  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "Carhartt", name: "루즈핏 캔버스 워크 팬츠",   rawPrice: 140000, discount: null,   rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "Dickies",  name: "트리 로고 롱슬리브",        rawPrice: 69000,  discount: null,   rating: "4.5", reviews: 64,  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const dealProducts = allProducts.slice(0, 4);
const bestProducts = allProducts;
const recProducts  = allProducts.slice(2, 8);
</script>

<style scoped>
/* ════════════════════════════════
   FORME 02 — Colorful Department
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f02 {
  background: #fafafa;
  color: #222;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f02-topbar { background: #fff; border-bottom: 1px solid #eee; }
.f02-topbar__promo {
  text-align: center;
  padding: 0.5rem 2rem;
  background: #FF6B6B;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  overflow: hidden;
  white-space: nowrap;
}
.f02-topbar__main {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1rem 2rem;
}
.f02-topbar__left { display: flex; align-items: center; }
.f02-topbar__link {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
  transition: color 0.2s;
}
.f02-topbar__link:hover { color: #FF6B6B; }
.f02-topbar__logo {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #FF6B6B;
}
.f02-topbar__search {
  display: flex;
  background: #f5f5f5;
  border-radius: 999px;
  overflow: hidden;
  max-width: 28rem;
}
.f02-topbar__search input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.625rem 1.25rem;
  font-size: 0.8125rem;
  outline: none;
}
.f02-topbar__search button {
  background: #FF6B6B;
  border: none;
  padding: 0 1.25rem;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
}
.f02-topbar__icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1.125rem;
}
.f02-topbar__cart {
  position: relative;
  display: inline-flex;
}
.f02-topbar__cart em {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #FF6B6B;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 700;
  font-style: normal;
  padding: 0.0625rem 0.3125rem;
  border-radius: 999px;
}
.f02-topbar__nav {
  display: flex;
  justify-content: center;
  gap: 0;
  border-top: 1px solid #eee;
}
.f02-topbar__nav-item {
  padding: 0.75rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.f02-topbar__nav-item:hover { border-bottom-color: #FF6B6B; color: #FF6B6B; }
.f02-topbar__nav-item--hot { color: #FF6B6B; font-weight: 700; }
.f02-topbar__nav-item--sale { color: #4A6BFF; font-weight: 700; }

/* ── Hero ── */
.f02-hero {
  position: relative;
  height: 65vh;
  max-height: 700px;
  overflow: hidden;
}
.f02-hero__slide {
  position: relative;
  width: 100%;
  height: 100%;
}
.f02-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f02-hero__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5rem;
  background: linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 60%);
  color: #fff;
}
.f02-hero__badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}
.f02-hero__title {
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.05;
  white-space: pre-line;
  margin-bottom: 1.25rem;
}
.f02-hero__sub {
  font-size: 1.0625rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}
.f02-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  color: #222;
  padding: 1rem 2.5rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  transition: transform 0.2s;
}
.f02-hero__cta:hover { transform: translateY(-2px); }
.f02-hero__dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}
.f02-hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  transition: all 0.2s;
}
.f02-hero__dot--active {
  background: #fff;
  width: 24px;
  border-radius: 4px;
}
.f02-hero__counter {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: #fff;
  font-size: 0.875rem;
}
.f02-hero__counter strong { font-size: 1.25rem; }

/* ── Categories ── */
.f02-cats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 3rem 2rem;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-cats { grid-template-columns: repeat(8, 1fr); } }
.f02-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.625rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.f02-cat:hover { transform: translateY(-4px); }
.f02-cat__icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}
.f02-cat p { font-size: 0.8125rem; font-weight: 600; color: #333; }

/* ── Section Head ── */
.f02-sec-head {
  text-align: center;
  padding: 4rem 2rem 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f02-sec-head--between {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f02-sec-head h2 {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}

/* ── Daily Deal ── */
.f02-deal {
  background: linear-gradient(135deg, #FFF4D6 0%, #FFE4E1 100%);
  padding: 5rem 3rem;
}
.f02-deal__inner { max-width: 1400px; margin: 0 auto; }
.f02-deal__head { text-align: center; margin-bottom: 3rem; }
.f02-deal__tag { font-size: 0.9375rem; font-weight: 700; color: #FF4444; margin-bottom: 0.75rem; }
.f02-deal__title { font-size: clamp(2rem, 4vw, 2.75rem); font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.f02-deal__sub { font-size: 0.9375rem; color: #666; }
.f02-deal__products {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
@media (min-width: 768px) { .f02-deal__products { grid-template-columns: repeat(4, 1fr); } }
.f02-deal-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  color: inherit;
  cursor: pointer;
}
.f02-deal-card:hover { transform: translateY(-4px); box-shadow: 0 8px 24px rgba(0,0,0,0.1); }
.f02-deal-card__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #f5f5f5;
}
.f02-deal-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; }
.f02-deal-card__badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #FF4444;
  color: #fff;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 800;
}
.f02-deal-card__info { padding: 1rem; }
.f02-deal-card__brand { font-size: 0.625rem; font-weight: 700; color: #999; margin-bottom: 0.25rem; }
.f02-deal-card__info h3 { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.35; height: 2.3em; overflow: hidden; }
.f02-deal-card__price-row { display: flex; align-items: baseline; gap: 0.5rem; margin-bottom: 0.25rem; }
.f02-deal-card__dc { font-size: 1.0625rem; font-weight: 900; color: #FF4444; }
.f02-deal-card__price { font-size: 1rem; font-weight: 800; }
.f02-deal-card__original { font-size: 0.6875rem; color: #aaa; text-decoration: line-through; margin-bottom: 0.5rem; }
.f02-deal-card__rating { font-size: 0.625rem; color: #888; }

/* ── Brand Promo ── */
.f02-promo { padding: 0 3rem 5rem; }
.f02-promo__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-promo__grid { grid-template-columns: 1fr 1fr; } }
.f02-promo-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 16px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s;
  min-height: 240px;
}
.f02-promo-card:hover { transform: translateY(-4px); }
.f02-promo-card__text {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f02-promo-card__tag { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 0.625rem; }
.f02-promo-card__text h3 { font-size: 1.875rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.5rem; }
.f02-promo-card__desc { font-size: 0.8125rem; opacity: 0.85; margin-bottom: 1.5rem; line-height: 1.5; }
.f02-promo-card__cta { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.2em; }
.f02-promo-card__img-wrap { position: relative; overflow: hidden; }
.f02-promo-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.f02-promo-card:hover .f02-promo-card__img-wrap img { transform: scale(1.06); }

/* ── Best ── */
.f02-best {
  padding: 0 3rem 5rem;
  background: #fff;
}
.f02-best__eyebrow { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.25em; color: #FF4444; margin-bottom: 0.5rem; }
.f02-best__tabs { display: flex; gap: 0.5rem; }
.f02-best__tab {
  background: #f5f5f5;
  border: none;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.f02-best__tab--active { background: #222; color: #fff; }
.f02-best__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-best__grid { grid-template-columns: repeat(4, 1fr); } }
.f02-best-card { color: inherit; cursor: pointer; }
.f02-best-card__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.875rem;
}
.f02-best-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.f02-best-card:hover .f02-best-card__img-wrap img { transform: scale(1.04); }
.f02-best-card__rank {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #222;
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 800;
  z-index: 1;
}
.f02-best-card__rank--top { background: #FF6B6B; }
.f02-best-card__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 0 0 12px 12px;
  opacity: 0;
  transition: opacity 0.3s;
}
.f02-best-card:hover .f02-best-card__hover { opacity: 1; }
.f02-best-card__hover button {
  width: 100%;
  padding: 0.625rem;
  background: #fff;
  border: none;
  border-radius: 8px;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
}
.f02-best-card__brand { font-size: 0.625rem; font-weight: 700; color: #999; margin-bottom: 0.25rem; }
.f02-best-card h3 { font-size: 0.875rem; font-weight: 600; margin-bottom: 0.5rem; line-height: 1.35; }
.f02-best-card__price-row { display: flex; align-items: baseline; gap: 0.375rem; margin-bottom: 0.375rem; }
.f02-best-card__dc { font-size: 0.875rem; font-weight: 900; color: #FF4444; }
.f02-best-card__price { font-size: 0.9375rem; font-weight: 800; }
.f02-best-card__rating { font-size: 0.625rem; color: #888; }

/* ── For You ── */
.f02-rec {
  padding: 0 3rem 5rem;
  background: linear-gradient(180deg, #fff 0%, #f0f4ff 100%);
}
.f02-rec__sub { font-size: 0.9375rem; color: #666; margin-top: 0.5rem; }
.f02-rec__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-rec__grid { grid-template-columns: repeat(3, 1fr); } }
.f02-rec-card {
  display: block;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
  color: inherit;
}
.f02-rec-card:hover { transform: translateY(-6px); box-shadow: 0 12px 32px rgba(0,0,0,0.1); }
.f02-rec-card img { width: 100%; aspect-ratio: 4/3; object-fit: cover; }
.f02-rec-card__info { padding: 1.25rem; }
.f02-rec-card__brand { font-size: 0.625rem; font-weight: 700; color: #999; margin-bottom: 0.25rem; }
.f02-rec-card__info h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.35; }
.f02-rec-card__price { font-size: 1rem; font-weight: 800; color: #4A6BFF; }

/* ── Newsletter ── */
.f02-newsletter {
  padding: 5rem 3rem;
  background: #FF6B6B;
  color: #fff;
  text-align: center;
}
.f02-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f02-newsletter h2 { font-size: 1.75rem; font-weight: 800; margin-bottom: 0.75rem; }
.f02-newsletter p { font-size: 0.875rem; opacity: 0.9; margin-bottom: 2rem; }
.f02-newsletter__form {
  display: flex;
  border-radius: 999px;
  overflow: hidden;
  max-width: 24rem;
  margin: 0 auto;
}
.f02-newsletter__form input {
  flex: 1;
  border: none;
  padding: 0.875rem 1.25rem;
  font-size: 0.8125rem;
  outline: none;
}
.f02-newsletter__form button {
  background: #222;
  color: #fff;
  border: none;
  padding: 0 1.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
}

/* ── Footer ── */
.f02-foot {
  background: #222;
  color: #f5f5f5;
  padding: 5rem 3rem 2rem;
}
.f02-foot__top {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #444;
}
.f02-foot__logo {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #FF6B6B;
  margin-bottom: 0.5rem;
}
.f02-foot__slogan {
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 1.5rem;
}
.f02-foot__social { display: flex; gap: 0.5rem; }
.f02-foot__social a {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #555;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
.f02-foot__social a:hover { border-color: #FF6B6B; color: #FF6B6B; }
.f02-foot__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.f02-foot__col h4 {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  color: #FF6B6B;
}
.f02-foot__col a,
.f02-foot__col p {
  display: block;
  font-size: 0.6875rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.f02-foot__col a:hover { color: #fff; }
.f02-foot__phone {
  font-size: 1.5rem !important;
  font-weight: 900 !important;
  color: #FF6B6B !important;
  margin-bottom: 0.25rem !important;
}
.f02-foot__legal {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 0.5625rem;
  color: #888;
  line-height: 1.8;
  text-align: center;
}
</style>
