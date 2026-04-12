<template>
  <main class="f01">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f01-topbar">
      <div class="f01-topbar__left">
        <RouterLink to="/forme" class="f01-topbar__link">◁ PICKER</RouterLink>
        <span class="f01-topbar__sep">|</span>
        <span class="f01-topbar__edition">N° 01 · MODERN MINIMAL</span>
      </div>
      <div class="f01-topbar__center">
        <span class="f01-topbar__logo">FORME</span>
      </div>
      <div class="f01-topbar__right">
        <span class="f01-topbar__icon">🔍</span>
        <span class="f01-topbar__icon">♡</span>
        <span class="f01-topbar__icon">👤</span>
        <span class="f01-topbar__icon f01-topbar__icon--cart">🛒<em>2</em></span>
        <span class="f01-topbar__sep">|</span>
        <RouterLink to="/" class="f01-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- 카테고리 네비 -->
    <nav class="f01-catnav">
      <a class="f01-catnav__link f01-catnav__link--active">ALL</a>
      <a class="f01-catnav__link">NEW</a>
      <a class="f01-catnav__link">BEST</a>
      <RouterLink to="/beanpole" class="f01-catnav__link">BEANPOLE</RouterLink>
      <RouterLink to="/carhartt" class="f01-catnav__link">CARHARTT</RouterLink>
      <RouterLink to="/levis" class="f01-catnav__link">LEVI'S</RouterLink>
      <RouterLink to="/dickies" class="f01-catnav__link">DICKIES</RouterLink>
      <a class="f01-catnav__link f01-catnav__link--sale">SALE</a>
    </nav>

    <!-- ═══ Hero ═══ -->
    <section class="f01-hero">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
        alt="hero"
        class="f01-hero__bg"
      />
      <div class="f01-hero__overlay"></div>
      <div class="f01-hero__content">
        <p class="f01-hero__tag">2026 SPRING COLLECTION</p>
        <h1 class="f01-hero__title">NEW SEASON,<br />NEW <span class="f01-hero__accent">FORME</span>.</h1>
        <p class="f01-hero__desc">시즌의 시작, 새로운 셀렉션을 만나보세요.</p>
        <div class="f01-hero__cta-group">
          <RouterLink to="/products" class="f01-hero__cta">SHOP NOW</RouterLink>
          <RouterLink to="/signup" class="f01-hero__cta f01-hero__cta--outline">JOIN</RouterLink>
        </div>
      </div>
      <div class="f01-hero__corner f01-hero__corner--tl">N° 01 / 30</div>
      <div class="f01-hero__corner f01-hero__corner--br">SPRING 2026</div>
    </section>

    <!-- ═══ Quick Bar ═══ -->
    <nav class="f01-quickbar">
      <a v-for="cat in quickCats" :key="cat.name" class="f01-quickbar__item">
        <span class="f01-quickbar__icon">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </a>
    </nav>

    <!-- ═══ Brands ═══ -->
    <section class="f01-brands">
      <header class="f01-sec-head">
        <div>
          <p class="f01-sec-head__code">BRAND</p>
          <h2 class="f01-sec-head__title">FORME가 큐레이션한 4개의 헤리티지 브랜드</h2>
        </div>
        <RouterLink to="/products" class="f01-sec-head__more">전체보기 →</RouterLink>
      </header>
      <div class="f01-brands__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f01-brand-card"
        >
          <div class="f01-brand-card__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f01-brand-card__hover">
              <span>VIEW MORE</span>
              <span>→</span>
            </div>
          </div>
          <div class="f01-brand-card__info">
            <p class="f01-brand-card__no">0{{ i + 1 }}</p>
            <h3>{{ b.name }}</h3>
            <p class="f01-brand-card__desc">{{ b.desc }}</p>
            <div class="f01-brand-card__meta">
              <span>{{ b.items }} items</span>
              <span>★ {{ b.rating }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ New Arrival (가로 스크롤) ═══ -->
    <section class="f01-arrivals">
      <header class="f01-sec-head f01-sec-head--inline">
        <div>
          <p class="f01-sec-head__code">NEW ARRIVAL</p>
          <h2 class="f01-sec-head__title">신상품</h2>
        </div>
        <div class="f01-arrivals__nav">
          <button @click="scrollArr(-1)">◁</button>
          <button @click="scrollArr(1)">▷</button>
        </div>
      </header>
      <div class="f01-arrivals__scroll" ref="arrRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="i"
          :to="`/products/${p.id}`"
          class="f01-prod"
        >
          <div class="f01-prod__img-wrap">
            <img :src="p.img" :alt="p.name" />
            <span class="f01-prod__badge" :class="{ 'f01-prod__badge--red': p.tag === 'BEST' }">{{ p.tag }}</span>
            <div class="f01-prod__hover">
              <button>QUICK VIEW</button>
            </div>
          </div>
          <div class="f01-prod__info">
            <p class="f01-prod__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <div class="f01-prod__price-row">
              <span v-if="p.discount" class="f01-prod__dc">{{ p.discount }}</span>
              <span class="f01-prod__price">{{ p.price }}원</span>
              <span v-if="p.was" class="f01-prod__was">{{ p.was }}원</span>
            </div>
            <p class="f01-prod__rating">★ {{ p.rating }} ({{ p.reviews }})</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Banner ═══ -->
    <section class="f01-banner">
      <div class="f01-banner__inner">
        <p class="f01-banner__tag">EXCLUSIVE</p>
        <h2 class="f01-banner__title">MEMBER WEEK</h2>
        <p class="f01-banner__desc">회원 전용 시크릿 세일이 시작됩니다.</p>
        <RouterLink to="/login" class="f01-banner__cta">JOIN NOW</RouterLink>
      </div>
    </section>

    <!-- ═══ Best Ranking (그리드 + 탭) ═══ -->
    <section class="f01-best">
      <header class="f01-sec-head">
        <div>
          <p class="f01-sec-head__code">BEST</p>
          <h2 class="f01-sec-head__title">베스트</h2>
        </div>
        <div class="f01-best__tabs">
          <button
            v-for="t in bestTabs"
            :key="t"
            class="f01-best__tab"
            :class="{ 'f01-best__tab--active': activeTab === t }"
            @click="activeTab = t"
          >{{ t }}</button>
        </div>
      </header>
      <div class="f01-best__grid">
        <RouterLink
          v-for="(p, i) in products.slice(0, 8)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f01-rank"
        >
          <div class="f01-rank__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f01-rank__no" :class="{ 'f01-rank__no--top': i < 3 }">{{ i + 1 }}</span>
          </div>
          <p class="f01-rank__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <p class="f01-rank__price">{{ p.price }}원</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Editorial ═══ -->
    <section class="f01-editorial">
      <header class="f01-sec-head">
        <div>
          <p class="f01-sec-head__code">EDITORIAL</p>
          <h2 class="f01-sec-head__title">매거진</h2>
        </div>
      </header>
      <div class="f01-editorial__grid">
        <article v-for="e in editorials" :key="e.title" class="f01-edit-card" :class="{ 'f01-edit-card--lg': e.lg }">
          <img :src="e.img" :alt="e.title" />
          <div class="f01-edit-card__text">
            <p class="f01-edit-card__cat">{{ e.cat }}</p>
            <h3>{{ e.title }}</h3>
            <p v-if="e.excerpt" class="f01-edit-card__excerpt">{{ e.excerpt }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f01-newsletter">
      <div class="f01-newsletter__inner">
        <h2>Stay in the loop.</h2>
        <p>신상품과 멤버 전용 혜택을 가장 먼저 받아보세요.</p>
        <div class="f01-newsletter__form">
          <input type="email" placeholder="이메일 주소" />
          <button>구독</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f01-foot">
      <div class="f01-foot__top">
        <div class="f01-foot__brand">
          <h3 class="f01-foot__logo">FORME</h3>
          <p class="f01-foot__slogan">Modern Minimal Curation</p>
          <div class="f01-foot__social">
            <a>IG</a><a>YT</a><a>TW</a>
          </div>
        </div>
        <div class="f01-foot__grid">
          <div class="f01-foot__col">
            <h4>SHOP</h4>
            <a>ALL</a><a>NEW</a><a>BEST</a>
            <RouterLink to="/beanpole">BEANPOLE</RouterLink>
            <RouterLink to="/carhartt">CARHARTT</RouterLink>
            <RouterLink to="/levis">LEVI'S</RouterLink>
            <RouterLink to="/dickies">DICKIES</RouterLink>
          </div>
          <div class="f01-foot__col">
            <h4>SERVICE</h4>
            <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a>
          </div>
          <div class="f01-foot__col">
            <h4>SUPPORT</h4>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">Q&A</RouterLink>
            <a>고객센터 1588-0000</a>
          </div>
          <div class="f01-foot__col">
            <h4>ABOUT</h4>
            <a>브랜드 스토리</a><a>입점 문의</a><a>채용</a>
          </div>
        </div>
      </div>
      <div class="f01-foot__bottom">
        <p>(주)FORME | 대표 김보경 | 사업자등록번호 000-00-00000</p>
        <p>서울특별시 강남구 테헤란로 000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const arrRef = ref(null);
function scrollArr(dir) {
  if (!arrRef.value) return;
  arrRef.value.scrollBy({ left: dir * 380, behavior: "smooth" });
}

const activeTab = ref("전체");
const bestTabs = ["전체", "상의", "하의", "데님"];

const quickCats = [
  { name: "전체",  icon: "🏠" },
  { name: "신상",  icon: "🆕" },
  { name: "상의",  icon: "👕" },
  { name: "하의",  icon: "👖" },
  { name: "데님",  icon: "🧵" },
  { name: "FAQ",   icon: "❓" },
  { name: "Q&A",   icon: "💬" },
];

const brands = [
  { id: 1, name: "BEANPOLE", desc: "한국 클래식의 정수",     items: 142, rating: 4.7, route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", desc: "디트로이트 워크웨어",    items: 98,  rating: 4.8, route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   desc: "150년 데님 아이콘",      items: 215, rating: 4.9, route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  desc: "한 세기 워크웨어",       items: 87,  rating: 4.6, route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "BEANPOLE", name: "헤리티지 칼라넥 티셔츠",     price: "127,200", was: "159,000", discount: "20%", tag: "NEW",  rating: "4.8", reviews: 248, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "LEVI'S",   name: "555™ 릴렉스 스트레이트 진",  price: "135,150", was: "159,000", discount: "15%", tag: "BEST", rating: "4.9", reviews: 512, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "CARHARTT", name: "아이코닉 B01 더블프런트",    price: "188,100", was: "209,000", discount: "10%", tag: "HOT",  rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "DICKIES",  name: "카펜터 유틸리티 데님 팬츠",  price: "78,750",  was: "105,000", discount: "25%", tag: "SALE", rating: "4.7", reviews: 342, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "BEANPOLE", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", was: null,       discount: null,   tag: "NEW",  rating: "4.7", reviews: 156, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "LEVI'S",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  was: "129,000", discount: "23%", tag: "SALE", rating: "4.6", reviews: 98,  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "CARHARTT", name: "루즈핏 캔버스 워크 팬츠",   price: "140,000", was: null,       discount: null,   tag: null,   rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "DICKIES",  name: "트리 로고 롱슬리브",        price: "69,000",  was: null,       discount: null,   tag: "NEW",  rating: "4.5", reviews: 64,  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const editorials = [
  { cat: "STYLE GUIDE", title: "봄을 입는 가장 쉬운 방법",   excerpt: "칼하트 워크웨어부터 빈폴 클래식까지.", lg: true,  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "LOOKBOOK",    title: "2026 SS Collection",         excerpt: null,                                   lg: false, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { cat: "BRAND STORY", title: "워크웨어의 정직함",           excerpt: null,                                   lg: false, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 01 — Modern Minimal
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f01 {
  background: #fff;
  color: #111;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f01-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.875rem 2rem;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #eee;
}
.f01-topbar__left, .f01-topbar__right {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f01-topbar__right { justify-content: flex-end; }
.f01-topbar__link { color: #999; transition: color 0.2s; }
.f01-topbar__link:hover { color: #FF2D2D; }
.f01-topbar__sep { color: #ddd; }
.f01-topbar__edition { color: #bbb; }
.f01-topbar__center { text-align: center; }
.f01-topbar__logo {
  font-size: 1.625rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #111;
}
.f01-topbar__icon {
  font-size: 1.125rem;
  cursor: pointer;
  position: relative;
}
.f01-topbar__icon--cart em {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #FF2D2D;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 800;
  font-style: normal;
  padding: 0.0625rem 0.3125rem;
  border-radius: 999px;
}

/* 카테고리 네비 */
.f01-catnav {
  display: flex;
  justify-content: center;
  gap: 0;
  border-bottom: 1px solid #eee;
  background: #fff;
}
.f01-catnav__link {
  padding: 0.875rem 1.5rem;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #333;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}
.f01-catnav__link:hover { border-bottom-color: #111; }
.f01-catnav__link--active { color: #111; border-bottom-color: #111; }
.f01-catnav__link--sale { color: #FF2D2D; }

/* ── Hero ── */
.f01-hero {
  position: relative;
  height: calc(100dvh - 92px);
  overflow: hidden;
}
.f01-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f01-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%);
}
.f01-hero__content {
  position: relative;
  z-index: 2;
  padding: 0 0 6rem 5rem;
  color: #fff;
  max-width: 40rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: 100%;
}
.f01-hero__tag {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #FF2D2D;
  margin-bottom: 1.5rem;
}
.f01-hero__title {
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 900;
  letter-spacing: -0.04em;
  line-height: 0.95;
  margin-bottom: 1.5rem;
}
.f01-hero__accent { color: #FF2D2D; }
.f01-hero__desc {
  font-size: 1rem;
  opacity: 0.85;
  margin-bottom: 2.5rem;
}
.f01-hero__cta-group { display: flex; gap: 0.75rem; }
.f01-hero__cta {
  display: inline-block;
  background: #fff;
  color: #111;
  padding: 1.125rem 2.5rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  transition: all 0.25s;
}
.f01-hero__cta:hover { background: #FF2D2D; color: #fff; }
.f01-hero__cta--outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
}
.f01-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}
.f01-hero__corner {
  position: absolute;
  z-index: 3;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  padding: 1rem 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
}
.f01-hero__corner--tl { top: 0; left: 0; }
.f01-hero__corner--br { bottom: 0; right: 0; }

/* ── Quick Bar ── */
.f01-quickbar {
  display: flex;
  justify-content: center;
  gap: 3rem;
  padding: 2rem;
  border-bottom: 1px solid #eee;
  flex-wrap: wrap;
}
.f01-quickbar__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #111;
  cursor: pointer;
  transition: color 0.2s;
}
.f01-quickbar__item:hover { color: #FF2D2D; }
.f01-quickbar__icon { font-size: 1.5rem; }

/* ── Section Head ── */
.f01-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5rem 3rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f01-sec-head--inline { border-bottom: none; }
.f01-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #FF2D2D;
  margin-bottom: 0.5rem;
}
.f01-sec-head__title {
  font-size: clamp(1.75rem, 3vw, 2.25rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.f01-sec-head__more {
  font-size: 0.75rem;
  font-weight: 700;
  color: #111;
  border-bottom: 1px solid #111;
  padding-bottom: 3px;
}

/* ── Brands ── */
.f01-brands {
  padding-bottom: 5rem;
  border-top: 1px solid #f0f0f0;
}
.f01-brands__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1600px;
  margin: 0 auto;
}
.f01-brand-card {
  display: block;
  color: inherit;
  cursor: pointer;
}
.f01-brand-card__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1.25rem;
}
.f01-brand-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
  transition: transform 0.6s, filter 0.4s;
}
.f01-brand-card:hover .f01-brand-card__img-wrap img {
  transform: scale(1.05);
  filter: grayscale(0);
}
.f01-brand-card__hover {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  opacity: 0;
  transition: opacity 0.3s;
}
.f01-brand-card:hover .f01-brand-card__hover { opacity: 1; }
.f01-brand-card__no {
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.2em;
  margin-bottom: 0.375rem;
}
.f01-brand-card__info h3 {
  font-size: 1.125rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  margin-bottom: 0.375rem;
}
.f01-brand-card__desc {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 0.5rem;
}
.f01-brand-card__meta {
  display: flex;
  gap: 0.75rem;
  font-size: 0.625rem;
  color: #bbb;
}

/* ── Arrivals Carousel ── */
.f01-arrivals {
  border-top: 1px solid #f0f0f0;
  padding-bottom: 5rem;
}
.f01-arrivals__nav { display: flex; gap: 0.5rem; }
.f01-arrivals__nav button {
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid #ddd;
  background: #fff;
  color: #111;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f01-arrivals__nav button:hover {
  background: #111;
  color: #fff;
  border-color: #111;
}
.f01-arrivals__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 3rem;
}
.f01-arrivals__scroll::-webkit-scrollbar { display: none; }

.f01-prod {
  flex: 0 0 300px;
  scroll-snap-align: start;
  color: inherit;
  cursor: pointer;
}
.f01-prod__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.f01-prod__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f01-prod:hover .f01-prod__img-wrap img { transform: scale(1.04); }
.f01-prod__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #111;
  color: #fff;
  padding: 0.375rem 0.625rem;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}
.f01-prod__badge--red { background: #FF2D2D; }
.f01-prod__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
}
.f01-prod:hover .f01-prod__hover { opacity: 1; }
.f01-prod__hover button {
  width: 100%;
  padding: 0.625rem;
  background: #fff;
  border: none;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
}
.f01-prod__brand {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f01-prod__info h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
  line-height: 1.35;
}
.f01-prod__price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
}
.f01-prod__dc { font-size: 1rem; font-weight: 900; color: #FF2D2D; }
.f01-prod__price { font-size: 0.9375rem; font-weight: 800; }
.f01-prod__was { font-size: 0.6875rem; color: #bbb; text-decoration: line-through; }
.f01-prod__rating { font-size: 0.625rem; color: #888; }

/* ── Banner ── */
.f01-banner {
  background: #111;
  color: #fff;
  padding: 5rem 2rem;
  text-align: center;
}
.f01-banner__inner { max-width: 36rem; margin: 0 auto; }
.f01-banner__tag {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.3em;
  color: #FF2D2D;
  margin-bottom: 1rem;
}
.f01-banner__title {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 1rem;
}
.f01-banner__desc {
  font-size: 0.9375rem;
  opacity: 0.7;
  margin-bottom: 2rem;
}
.f01-banner__cta {
  display: inline-block;
  background: #FF2D2D;
  color: #fff;
  padding: 1.125rem 3rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  transition: opacity 0.2s;
}
.f01-banner__cta:hover { opacity: 0.85; }

/* ── Best Ranking ── */
.f01-best {
  border-top: 1px solid #f0f0f0;
  padding-bottom: 5rem;
}
.f01-best__tabs { display: flex; gap: 0; }
.f01-best__tab {
  padding: 0.5rem 1.25rem;
  background: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
  font-size: 0.75rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}
.f01-best__tab--active {
  background: #111;
  color: #fff;
  border-color: #111;
}
.f01-best__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1600px;
  margin: 0 auto;
}
.f01-rank { color: inherit; cursor: pointer; }
.f01-rank__img {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #f5f5f5;
  margin-bottom: 1rem;
}
.f01-rank__img img { width: 100%; height: 100%; object-fit: cover; }
.f01-rank__no {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #111;
  color: #fff;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 900;
}
.f01-rank__no--top { background: #FF2D2D; }
.f01-rank__brand {
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f01-rank h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.35;
}
.f01-rank__price {
  font-size: 0.9375rem;
  font-weight: 800;
}

/* ── Editorial ── */
.f01-editorial {
  border-top: 1px solid #f0f0f0;
  padding-bottom: 6rem;
}
.f01-editorial__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1600px;
  margin: 0 auto;
}
.f01-edit-card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4/5;
  cursor: pointer;
}
.f01-edit-card--lg {
  grid-row: span 1;
  aspect-ratio: auto;
}
.f01-edit-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s;
}
.f01-edit-card:hover img { transform: scale(1.05); }
.f01-edit-card__text {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 2rem;
  background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%);
  color: #fff;
}
.f01-edit-card__cat {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #FF2D2D;
  margin-bottom: 0.5rem;
}
.f01-edit-card__text h3 {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}
.f01-edit-card__excerpt {
  font-size: 0.8125rem;
  opacity: 0.8;
  line-height: 1.5;
}

/* ── Newsletter ── */
.f01-newsletter {
  padding: 5rem 3rem;
  background: #f5f5f5;
  text-align: center;
  border-top: 1px solid #eee;
}
.f01-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f01-newsletter h2 {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}
.f01-newsletter p {
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 2rem;
}
.f01-newsletter__form {
  display: flex;
  border: 1px solid #111;
}
.f01-newsletter__form input {
  flex: 1;
  border: none;
  padding: 1rem 1.25rem;
  font-size: 0.8125rem;
  outline: none;
  background: #fff;
}
.f01-newsletter__form button {
  background: #111;
  color: #fff;
  border: none;
  padding: 0 2rem;
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: background 0.2s;
}
.f01-newsletter__form button:hover { background: #FF2D2D; }

/* ── Footer ── */
.f01-foot {
  background: #111;
  color: #f5f5f5;
  padding: 5rem 3rem 2rem;
}
.f01-foot__top {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  max-width: 1600px;
  margin: 0 auto 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #333;
}
.f01-foot__logo {
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}
.f01-foot__slogan {
  font-size: 0.75rem;
  color: #888;
  margin-bottom: 1.5rem;
}
.f01-foot__social { display: flex; gap: 0.5rem; }
.f01-foot__social a {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
.f01-foot__social a:hover { border-color: #FF2D2D; color: #FF2D2D; }
.f01-foot__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.f01-foot__col h4 {
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  color: #FF2D2D;
}
.f01-foot__col a {
  display: block;
  font-size: 0.6875rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.f01-foot__col a:hover { color: #fff; }
.f01-foot__bottom {
  max-width: 1600px;
  margin: 0 auto;
  font-size: 0.5625rem;
  color: #666;
  line-height: 1.8;
  text-align: center;
}
</style>
