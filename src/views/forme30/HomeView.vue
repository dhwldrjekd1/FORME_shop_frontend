<template>
  <main class="f30">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f30-topbar">
      <div class="f30-topbar__left">
        <RouterLink to="/forme" class="f30-topbar__link">◁ PICKER</RouterLink>
        <span class="f30-topbar__badge">SPORT</span>
      </div>
      <div class="f30-topbar__center">
        <span class="f30-topbar__logo">FORME</span>
        <span class="f30-topbar__tag">ATHLETIC DIVISION</span>
      </div>
      <div class="f30-topbar__right">
        <span class="f30-topbar__live">◉ LIVE</span>
        <RouterLink to="/" class="f30-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f30-hero">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
        alt="hero"
        class="f30-hero__bg"
      />
      <div class="f30-hero__overlay"></div>
      <div class="f30-hero__grid-lines"></div>
      <div class="f30-hero__content">
        <div class="f30-hero__meta">
          <span>SS26</span>
          <span class="f30-hero__dot">●</span>
          <span>COLLECTION</span>
          <span class="f30-hero__dot">●</span>
          <span>DROP.01</span>
        </div>
        <h1 class="f30-hero__title">MOVE</h1>
        <h1 class="f30-hero__title f30-hero__title--outline">FORWARD.</h1>
        <p class="f30-hero__desc">
          Performance meets heritage.<br />
          네 개의 레전드 브랜드와 함께.
        </p>
        <div class="f30-hero__cta-group">
          <RouterLink to="/products" class="f30-hero__cta">SHOP NOW →</RouterLink>
          <RouterLink to="/login" class="f30-hero__cta f30-hero__cta--outline">JOIN TEAM</RouterLink>
        </div>
      </div>
      <div class="f30-hero__corner f30-hero__corner--tl">FORME SPORT · SS26</div>
      <div class="f30-hero__corner f30-hero__corner--br">N° 30 / 30</div>
    </section>

    <!-- ═══ Stats ═══ -->
    <section class="f30-stats">
      <div v-for="s in stats" :key="s.label" class="f30-stat">
        <span class="f30-stat__num">{{ s.value }}</span>
        <span class="f30-stat__label">{{ s.label }}</span>
      </div>
    </section>

    <!-- ═══ Brands — Our Team ═══ -->
    <section class="f30-team">
      <header class="f30-sec-head">
        <div>
          <p class="f30-sec-head__code">[ 01 / ROSTER ]</p>
          <h2 class="f30-sec-head__title">OUR TEAM</h2>
        </div>
        <p class="f30-sec-head__sub">4 HOUSES · 542 ITEMS · EST. ACROSS CENTURIES</p>
      </header>

      <div class="f30-team__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f30-brand"
        >
          <div class="f30-brand__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f30-brand__hover">
              <span>ENTER →</span>
            </div>
            <div class="f30-brand__number">0{{ i + 1 }}</div>
          </div>
          <div class="f30-brand__stripe" :style="{ backgroundColor: b.color }"></div>
          <div class="f30-brand__info">
            <div class="f30-brand__top">
              <h3>{{ b.name }}</h3>
              <span class="f30-brand__year">{{ b.year }}</span>
            </div>
            <p class="f30-brand__desc">{{ b.desc }}</p>
            <div class="f30-brand__stats">
              <span>{{ b.items }} items</span>
              <span>★ {{ b.rating }}</span>
              <span>{{ b.city }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Performance Banner ═══ -->
    <section class="f30-perf">
      <div class="f30-perf__inner">
        <p class="f30-perf__code">[ PERFORMANCE DATA ]</p>
        <div class="f30-perf__grid">
          <div v-for="p in perfData" :key="p.label" class="f30-perf__item">
            <div class="f30-perf__bar" :style="{ width: p.pct + '%' }"></div>
            <div class="f30-perf__row">
              <span class="f30-perf__name">{{ p.label }}</span>
              <span class="f30-perf__value">{{ p.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Latest Gear — 가로 스크롤 ═══ -->
    <section class="f30-gear">
      <header class="f30-sec-head f30-sec-head--inline">
        <div>
          <p class="f30-sec-head__code">[ 02 / INVENTORY ]</p>
          <h2 class="f30-sec-head__title">LATEST GEAR</h2>
        </div>
        <div class="f30-gear__nav">
          <button @click="scrollGear(-1)" aria-label="prev">◁</button>
          <button @click="scrollGear(1)" aria-label="next">▷</button>
        </div>
      </header>

      <div class="f30-gear__scroll" ref="gearRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="i"
          :to="`/products/${p.id}`"
          class="f30-item"
        >
          <div class="f30-item__img-wrap">
            <img :src="p.img" :alt="p.name" />
            <span v-if="p.tag" class="f30-item__tag">{{ p.tag }}</span>
            <div class="f30-item__hover">
              <button>QUICK VIEW</button>
            </div>
            <span class="f30-item__code">#{{ String(i + 1).padStart(3, '0') }}</span>
          </div>
          <div class="f30-item__info">
            <div class="f30-item__meta">
              <span class="f30-item__brand">{{ p.brand }}</span>
              <span v-if="p.stock" class="f30-item__stock">◉ IN STOCK</span>
            </div>
            <h3>{{ p.name }}</h3>
            <div class="f30-item__price-row">
              <span v-if="p.discount" class="f30-item__dc">{{ p.discount }}</span>
              <span class="f30-item__price">₩ {{ p.price }}</span>
              <span v-if="p.was" class="f30-item__was">₩ {{ p.was }}</span>
            </div>
            <div class="f30-item__rating">
              <span>★ {{ p.rating }}</span>
              <span>({{ p.reviews }})</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Grid Products (정적) ═══ -->
    <section class="f30-grid-section">
      <header class="f30-sec-head">
        <div>
          <p class="f30-sec-head__code">[ 03 / BEST SELLERS ]</p>
          <h2 class="f30-sec-head__title">WEEKLY RANKING</h2>
        </div>
        <div class="f30-grid-tabs">
          <button
            v-for="t in gridTabs"
            :key="t"
            class="f30-grid-tabs__btn"
            :class="{ 'f30-grid-tabs__btn--active': activeGridTab === t }"
            @click="activeGridTab = t"
          >{{ t }}</button>
        </div>
      </header>
      <div class="f30-grid-products">
        <RouterLink
          v-for="(p, i) in products.slice(0, 8)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f30-grid-item"
        >
          <div class="f30-grid-item__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f30-grid-item__rank" :class="{ 'f30-grid-item__rank--top': i < 3 }">{{ i + 1 }}</span>
          </div>
          <p class="f30-grid-item__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <p class="f30-grid-item__price">₩ {{ p.price }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Manifesto ═══ -->
    <section class="f30-manifesto">
      <div class="f30-manifesto__top">
        <span>[ 04 / MANIFESTO ]</span>
        <span>// SPORT · 2026</span>
      </div>
      <div class="f30-manifesto__lines">
        <p>DON'T JUST</p>
        <p class="f30-manifesto__red">WEAR IT.</p>
        <p class="f30-manifesto__outline">OWN IT.</p>
      </div>
      <div class="f30-manifesto__note">
        <p>
          Four legacy houses. One athletic vision.<br />
          Heritage craftsmanship meets modern performance.<br />
          Built for those who move.
        </p>
        <p class="f30-manifesto__sign">— FORME SPORT · ATHLETIC DIVISION · SEOUL 2026</p>
      </div>
    </section>

    <!-- ═══ Training Guide ═══ -->
    <section class="f30-guide">
      <header class="f30-sec-head f30-sec-head--center">
        <p class="f30-sec-head__code">[ 05 / PLAYBOOK ]</p>
        <h2 class="f30-sec-head__title">THE PLAYBOOK</h2>
      </header>
      <div class="f30-guide__grid">
        <div v-for="(g, i) in guide" :key="i" class="f30-guide__step">
          <div class="f30-guide__num">{{ String(i + 1).padStart(2, '0') }}</div>
          <h3>{{ g.title }}</h3>
          <p>{{ g.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ Timeline ═══ -->
    <section class="f30-timeline">
      <header class="f30-sec-head f30-sec-head--center">
        <p class="f30-sec-head__code">[ 06 / LEGACY ]</p>
        <h2 class="f30-sec-head__title">THE LEGACY</h2>
      </header>
      <div class="f30-timeline__track">
        <div
          v-for="(e, i) in timeline"
          :key="i"
          class="f30-tl"
          :class="{ 'f30-tl--right': i % 2 === 1 }"
        >
          <div class="f30-tl__dot"></div>
          <div class="f30-tl__year">{{ e.year }}</div>
          <div class="f30-tl__content">
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ Subscribe ═══ -->
    <section class="f30-subscribe">
      <div class="f30-subscribe__inner">
        <p class="f30-subscribe__code">[ 07 / SIGNAL ]</p>
        <h2 class="f30-subscribe__title">JOIN<br />THE TEAM.</h2>
        <p class="f30-subscribe__desc">
          드롭 알림 · 멤버 전용 오퍼 · 얼리 액세스.<br />
          움직이는 사람들의 리스트에 이름을 올리세요.
        </p>
        <div class="f30-subscribe__form">
          <input type="email" placeholder="YOUR@EMAIL.COM" />
          <button>JOIN →</button>
        </div>
      </div>
    </section>

    <!-- ═══ Service Benefits ═══ -->
    <section class="f30-benefits">
      <div v-for="s in services" :key="s.title" class="f30-benefit">
        <div class="f30-benefit__icon">{{ s.icon }}</div>
        <h4>{{ s.title }}</h4>
        <p>{{ s.desc }}</p>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f30-foot">
      <div class="f30-foot__top">
        <div class="f30-foot__brand">
          <p class="f30-foot__logo">FORME<span>SPORT</span></p>
          <p class="f30-foot__sub">ATHLETIC DIVISION · EST. 2026</p>
          <p class="f30-foot__addr">SEOUL · KOREA · 37.5665° N</p>
          <div class="f30-foot__social">
            <a>IG</a><a>YT</a><a>TW</a><a>TK</a>
          </div>
        </div>
        <div class="f30-foot__grid">
          <div class="f30-foot__col">
            <p class="f30-foot__label">[ TEAM ]</p>
            <RouterLink to="/beanpole">BEANPOLE · 1989</RouterLink>
            <RouterLink to="/carhartt">CARHARTT · 1889</RouterLink>
            <RouterLink to="/levis">LEVI'S · 1873</RouterLink>
            <RouterLink to="/dickies">DICKIES · 1922</RouterLink>
          </div>
          <div class="f30-foot__col">
            <p class="f30-foot__label">[ SHOP ]</p>
            <RouterLink to="/products">ALL GEAR</RouterLink>
            <RouterLink to="/cart">LOCKER</RouterLink>
            <RouterLink to="/mypage">MY STATS</RouterLink>
            <RouterLink to="/login">JOIN</RouterLink>
          </div>
          <div class="f30-foot__col">
            <p class="f30-foot__label">[ SUPPORT ]</p>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">CONTACT</RouterLink>
            <p>sport@forme.kr</p>
            <p>1588-0000</p>
          </div>
        </div>
      </div>
      <div class="f30-foot__ticker">
        <span v-for="i in 6" :key="i">◆ MOVE FORWARD ◆ FORME SPORT ◆ SINCE 2026 ◆ SEOUL ◆ </span>
      </div>
      <div class="f30-foot__bottom">
        <span>© 2026 FORME SPORT</span>
        <span>[ ATHLETIC DIVISION ]</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const gearRef = ref(null);
function scrollGear(dir) {
  if (!gearRef.value) return;
  gearRef.value.scrollBy({ left: dir * 400, behavior: "smooth" });
}

const activeGridTab = ref("ALL");
const gridTabs = ["ALL", "TOPS", "BOTTOMS", "DENIM"];

const stats = [
  { value: "4", label: "BRANDS" },
  { value: "542", label: "ITEMS" },
  { value: "24K+", label: "MEMBERS" },
  { value: "4.8★", label: "RATING" },
];

const brands = [
  { id: 1, name: "BEANPOLE", year: "1989", city: "SEOUL",          desc: "Heritage meets sport. 한국 클래식의 애슬레틱 전환.",    color: "#103728", items: 142, rating: 4.7, route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", year: "1889", city: "DETROIT",        desc: "Built to perform. 작업장에서 트랙까지.",               color: "#9C4F18", items: 98,  rating: 4.8, route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   year: "1873", city: "SAN FRANCISCO",  desc: "Denim in motion. 150년 데님이 움직일 때.",             color: "#8E1C28", items: 215, rating: 4.9, route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  year: "1922", city: "FORT WORTH",     desc: "Work hard, play hard. 현장에서 코트까지.",             color: "#1A1A1A", items: 87,  rating: 4.6, route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const perfData = [
  { label: "DURABILITY",  value: "98%", pct: 98 },
  { label: "COMFORT",     value: "95%", pct: 95 },
  { label: "FLEXIBILITY", value: "92%", pct: 92 },
  { label: "HERITAGE",    value: "100%", pct: 100 },
];

const products = [
  { id: 404, brand: "BEANPOLE", name: "헤리티지 퍼포먼스 재킷",     price: "289,000", was: "329,000", discount: "-12%", tag: "NEW",   stock: true, rating: "4.8", reviews: 248, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "LEVI'S",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", was: null,       discount: null,    tag: "BEST",  stock: true, rating: "4.9", reviews: 512, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "CARHARTT", name: "러기드 플렉스 워크 팬츠",    price: "140,000", was: "160,000", discount: "-13%", tag: "HOT",   stock: true, rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "DICKIES",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", was: "135,000", discount: "-22%", tag: "SALE",  stock: true, rating: "4.7", reviews: 342, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 103, brand: "CARHARTT", name: "B01 더블프런트 트라우저",    price: "209,000", was: null,       discount: null,    tag: null,    stock: true, rating: "4.8", reviews: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 401, brand: "BEANPOLE", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", was: null,       discount: null,    tag: "NEW",   stock: true, rating: "4.7", reviews: 156, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "LEVI'S",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  was: "129,000", discount: "-23%", tag: "SALE",  stock: true, rating: "4.6", reviews: 98,  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 304, brand: "DICKIES",  name: "트리 로고 롱슬리브",        price: "69,000",  was: null,       discount: null,    tag: null,    stock: true, rating: "4.5", reviews: 64,  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const guide = [
  { title: "BASE LAYER", desc: "기본이 단단해야 합니다. 통기성 좋은 면 소재의 셔츠 또는 티. 움직임을 방해하지 않는 핏." },
  { title: "WORK LAYER", desc: "내구성이 핵심입니다. 러기드 플렉스 팬츠 또는 더블프런트. 무릎과 허벅지의 자유도." },
  { title: "TOP LAYER",  desc: "마무리는 가볍게. 바람을 막고 움직임에 따라가는 재킷. 너무 무겁지 않은 것." },
  { title: "RECOVER",    desc: "운동 후에도 스타일. 릴렉스 핏 데님에 깔끔한 티 한 장이면 충분합니다." },
];

const timeline = [
  { year: "1873", title: "LEVI'S INCORPORATED",    desc: "리벳 데님 특허. 작업복에서 운동복으로의 첫 걸음." },
  { year: "1889", title: "CARHARTT FOUNDED",       desc: "디트로이트 철도 노동자의 워크웨어. 내구성의 기준." },
  { year: "1922", title: "DICKIES OPENS",          desc: "텍사스 오버롤. 한 세기 동안 현장을 지킨 유니폼." },
  { year: "1989", title: "BEANPOLE LAUNCHED",      desc: "서울에서 시작된 한국형 헤리티지. 모던 클래식의 출발." },
  { year: "2026", title: "FORME SPORT",            desc: "네 브랜드의 유산이 하나의 애슬레틱 비전으로." },
];

const services = [
  { icon: "🚚", title: "FREE SHIPPING",    desc: "전 상품 무료배송 · 당일 출고" },
  { icon: "↩",  title: "FREE RETURNS",     desc: "7일 무료 반품 · 부담 없이 착용" },
  { icon: "💳", title: "EASY PAY",         desc: "무이자 12개월 · 5만원 이상" },
  { icon: "🏅", title: "TEAM BENEFITS",    desc: "등급별 적립 · 단독 드롭 액세스" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 30 — Sportswear Athletic
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f30 {
  background: #111;
  color: #f5f5f5;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* ── 자체 상단바 ── */
.f30-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.875rem 2rem;
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 2px solid #FF4444;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f30-topbar__left,
.f30-topbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.f30-topbar__right { justify-content: flex-end; }
.f30-topbar__link { color: #999; transition: color 0.2s; }
.f30-topbar__link:hover { color: #FF4444; }
.f30-topbar__badge {
  background: #FF4444;
  color: #fff;
  padding: 0.25rem 0.5rem;
  font-size: 0.5625rem;
  letter-spacing: 0.15em;
}
.f30-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  justify-content: center;
}
.f30-topbar__logo {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #fff;
}
.f30-topbar__tag { color: #FF4444; font-size: 0.5625rem; }
.f30-topbar__live { color: #5bff5b; }

/* ── Hero ── */
.f30-hero {
  position: relative;
  min-height: calc(100dvh - 44px);
  overflow: hidden;
}
.f30-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.2) brightness(0.65) saturate(0.85);
}
.f30-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%);
}
.f30-hero__grid-lines {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255, 68, 68, 0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 68, 68, 0.06) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}
.f30-hero__content {
  position: relative;
  z-index: 2;
  padding: 0 0 6rem 4rem;
  max-width: 42rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  min-height: calc(100dvh - 44px);
}
.f30-hero__meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF4444;
  margin-bottom: 2rem;
}
.f30-hero__dot { font-size: 0.375rem; color: #555; }
.f30-hero__title {
  font-size: clamp(4rem, 12vw, 10rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.04em;
  margin-bottom: 0.25rem;
}
.f30-hero__title--outline {
  color: transparent;
  -webkit-text-stroke: 2px #FF4444;
  margin-bottom: 2rem;
}
.f30-hero__desc {
  font-size: 1rem;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 2.5rem;
}
.f30-hero__cta-group {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}
.f30-hero__cta {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background: #FF4444;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  transition: background 0.2s;
}
.f30-hero__cta:hover { background: #ff6666; }
.f30-hero__cta--outline {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.5);
  color: #fff;
}
.f30-hero__cta--outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: #fff;
}
.f30-hero__corner {
  position: absolute;
  z-index: 3;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: rgba(255, 255, 255, 0.5);
  padding: 1.25rem 2rem;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
}
.f30-hero__corner--tl { top: 0; left: 0; border-right: 1px solid #222; border-bottom: 1px solid #222; }
.f30-hero__corner--br { bottom: 0; right: 0; border-left: 1px solid #222; border-top: 1px solid #222; color: #FF4444; }

/* ── Stats ── */
.f30-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  background: #0a0a0a;
  border-top: 2px solid #FF4444;
  border-bottom: 1px solid #222;
}
.f30-stat {
  padding: 2.5rem 2rem;
  text-align: center;
  border-right: 1px solid #222;
}
.f30-stat:last-child { border-right: none; }
.f30-stat__num {
  display: block;
  font-size: 2.75rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #FF4444;
  margin-bottom: 0.375rem;
}
.f30-stat__label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #666;
}

/* ── Section Head ── */
.f30-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 4rem 4rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f30-sec-head--center {
  justify-content: center;
  text-align: center;
}
.f30-sec-head--inline {
  border-bottom: none;
}
.f30-sec-head__code {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #FF4444;
  margin-bottom: 0.5rem;
}
.f30-sec-head__title {
  font-size: clamp(1.75rem, 4vw, 2.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.f30-sec-head__sub {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #666;
}

/* ── Team / Brands ── */
.f30-team { border-top: 1px solid #222; padding-bottom: 5rem; }
.f30-team__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 0 4rem;
  max-width: 1600px;
  margin: 0 auto;
}
.f30-brand {
  position: relative;
  overflow: hidden;
  color: inherit;
  border: 1px solid #222;
  margin: -0.5px;
  transition: border-color 0.3s;
}
.f30-brand:hover { border-color: #FF4444; }
.f30-brand__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
}
.f30-brand__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.7) contrast(1.1) brightness(0.85);
  transition: filter 0.6s, transform 0.6s;
}
.f30-brand:hover .f30-brand__img-wrap img {
  filter: grayscale(0) contrast(1) brightness(0.95);
  transform: scale(1.04);
}
.f30-brand__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 68, 68, 0.2);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.875rem;
  font-weight: 800;
  letter-spacing: 0.2em;
}
.f30-brand:hover .f30-brand__hover { opacity: 1; }
.f30-brand__number {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.375rem 0.625rem;
  font-size: 1rem;
  font-weight: 900;
  color: #FF4444;
}
.f30-brand__stripe { height: 6px; }
.f30-brand__info { padding: 1.5rem; }
.f30-brand__top {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.75rem;
}
.f30-brand__top h3 {
  font-size: 1.25rem;
  font-weight: 900;
  letter-spacing: -0.01em;
}
.f30-brand__year {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #666;
}
.f30-brand__desc {
  font-size: 0.8125rem;
  color: #999;
  line-height: 1.5;
  font-style: italic;
  margin-bottom: 1rem;
}
.f30-brand__stats {
  display: flex;
  gap: 1rem;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #555;
}

/* ── Performance Banner ── */
.f30-perf {
  padding: 5rem 4rem;
  background: #0a0a0a;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
}
.f30-perf__inner { max-width: 1200px; margin: 0 auto; }
.f30-perf__code {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #FF4444;
  margin-bottom: 3rem;
}
.f30-perf__grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.f30-perf__item { position: relative; }
.f30-perf__bar {
  position: absolute;
  left: 0;
  bottom: 0;
  height: 3px;
  background: #FF4444;
  transition: width 1s ease-out;
}
.f30-perf__row {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1rem;
  border-bottom: 1px solid #222;
}
.f30-perf__name {
  font-size: 0.875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.f30-perf__value {
  font-size: 1.25rem;
  font-weight: 900;
  color: #FF4444;
}

/* ── Gear Carousel ── */
.f30-gear {
  border-top: 1px solid #222;
  padding-bottom: 5rem;
}
.f30-gear__nav { display: flex; gap: 0.5rem; }
.f30-gear__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid #333;
  color: #f5f5f5;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f30-gear__nav button:hover {
  background: #FF4444;
  border-color: #FF4444;
}
.f30-gear__scroll {
  display: flex;
  gap: 1px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 4rem;
  background: #222;
}
.f30-gear__scroll::-webkit-scrollbar { display: none; }

.f30-item {
  flex: 0 0 340px;
  scroll-snap-align: start;
  background: #111;
  color: inherit;
  transition: background 0.2s;
}
.f30-item:hover { background: #1a1a1a; }
.f30-item__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #0a0a0a;
  overflow: hidden;
}
.f30-item__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.05) brightness(0.95);
  transition: filter 0.5s, transform 0.5s;
}
.f30-item:hover .f30-item__img-wrap img {
  filter: contrast(1.1) brightness(1);
  transform: scale(1.04);
}
.f30-item__tag {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #FF4444;
  color: #fff;
  padding: 0.375rem 0.625rem;
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
}
.f30-item__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.7);
  opacity: 0;
  transition: opacity 0.3s;
}
.f30-item:hover .f30-item__hover { opacity: 1; }
.f30-item__hover button {
  width: 100%;
  padding: 0.625rem;
  background: #fff;
  border: none;
  font-size: 0.6875rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
}
.f30-item__code {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.25rem 0.5rem;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f30-item__info { padding: 1.25rem; }
.f30-item__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.625rem;
}
.f30-item__brand {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #FF4444;
}
.f30-item__stock {
  font-size: 0.5625rem;
  font-weight: 700;
  color: #5bff5b;
}
.f30-item__info h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  line-height: 1.35;
}
.f30-item__price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}
.f30-item__dc {
  font-size: 0.9375rem;
  font-weight: 900;
  color: #FF4444;
}
.f30-item__price {
  font-size: 0.9375rem;
  font-weight: 800;
}
.f30-item__was {
  font-size: 0.6875rem;
  color: #555;
  text-decoration: line-through;
}
.f30-item__rating {
  font-size: 0.625rem;
  color: #666;
  display: flex;
  gap: 0.375rem;
}
.f30-item__rating span:first-child { color: #fbc02d; }

/* ── Grid Products ── */
.f30-grid-section {
  border-top: 1px solid #222;
  padding-bottom: 5rem;
}
.f30-grid-tabs { display: flex; gap: 0; }
.f30-grid-tabs__btn {
  background: transparent;
  border: 1px solid #333;
  margin-left: -1px;
  color: #999;
  padding: 0.5rem 1.25rem;
  font-size: 0.625rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: all 0.2s;
}
.f30-grid-tabs__btn--active {
  background: #FF4444;
  color: #fff;
  border-color: #FF4444;
}
.f30-grid-products {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1px;
  padding: 0 4rem;
  max-width: 1600px;
  margin: 0 auto;
  background: #222;
}
.f30-grid-item {
  background: #111;
  color: inherit;
  transition: background 0.2s;
  cursor: pointer;
}
.f30-grid-item:hover { background: #1a1a1a; }
.f30-grid-item__img {
  position: relative;
  aspect-ratio: 1/1;
  background: #0a0a0a;
  overflow: hidden;
}
.f30-grid-item__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f30-grid-item__rank {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #333;
  color: #fff;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 900;
}
.f30-grid-item__rank--top { background: #FF4444; }
.f30-grid-item__brand {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.2em;
  color: #FF4444;
  padding: 1rem 1rem 0;
}
.f30-grid-item h3 {
  font-size: 0.8125rem;
  font-weight: 600;
  padding: 0.375rem 1rem;
  line-height: 1.35;
}
.f30-grid-item__price {
  font-size: 0.9375rem;
  font-weight: 800;
  padding: 0 1rem 1.25rem;
}

/* ── Manifesto ── */
.f30-manifesto {
  padding: 8rem 4rem;
  border-top: 1px solid #222;
  background: #0a0a0a;
}
.f30-manifesto__top {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #222;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF4444;
}
.f30-manifesto__lines {
  max-width: 1200px;
  margin: 0 auto 4rem;
}
.f30-manifesto__lines p {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 900;
  line-height: 0.85;
  letter-spacing: -0.03em;
  color: #f5f5f5;
  margin-bottom: 0.5rem;
}
.f30-manifesto__red {
  color: #FF4444 !important;
  padding-left: 3rem;
}
.f30-manifesto__outline {
  color: transparent !important;
  -webkit-text-stroke: 2px #FF4444;
  padding-left: 6rem;
}
.f30-manifesto__note {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #222;
}
.f30-manifesto__note p {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #999;
}
.f30-manifesto__sign {
  margin-top: 1rem;
  font-size: 0.625rem !important;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF4444 !important;
}

/* ── Training Guide ── */
.f30-guide {
  padding: 4rem 0 6rem;
  border-top: 1px solid #222;
}
.f30-guide__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  padding: 0 4rem;
  max-width: 1600px;
  margin: 0 auto;
}
.f30-guide__step {
  padding: 3rem 2rem;
  border: 1px solid #222;
  margin: -0.5px;
  transition: border-color 0.3s, background 0.3s;
}
.f30-guide__step:hover {
  border-color: #FF4444;
  background: rgba(255, 68, 68, 0.03);
}
.f30-guide__num {
  font-size: 2.5rem;
  font-weight: 900;
  color: #FF4444;
  margin-bottom: 1.5rem;
  line-height: 1;
}
.f30-guide__step h3 {
  font-size: 1rem;
  font-weight: 800;
  letter-spacing: 0.05em;
  margin-bottom: 1rem;
}
.f30-guide__step p {
  font-size: 0.8125rem;
  color: #888;
  line-height: 1.7;
}

/* ── Timeline ── */
.f30-timeline {
  padding: 4rem 0 8rem;
  border-top: 1px solid #222;
}
.f30-timeline__track {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
}
.f30-timeline__track::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #222;
  transform: translateX(-1px);
}
.f30-tl {
  position: relative;
  padding: 1.5rem 0 1.5rem 50%;
  margin-bottom: 2.5rem;
}
.f30-tl--right {
  padding: 1.5rem 50% 1.5rem 0;
  text-align: right;
}
.f30-tl__dot {
  position: absolute;
  left: 50%;
  top: 2rem;
  width: 14px;
  height: 14px;
  background: #FF4444;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 3px solid #111;
  box-shadow: 0 0 0 2px #FF4444;
}
.f30-tl__year {
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  color: #FF4444;
  margin-bottom: 0.5rem;
  padding-left: 2rem;
}
.f30-tl--right .f30-tl__year { padding-left: 0; padding-right: 2rem; }
.f30-tl__content { padding-left: 2rem; }
.f30-tl--right .f30-tl__content { padding-left: 0; padding-right: 2rem; }
.f30-tl__content h3 {
  font-size: 1.25rem;
  font-weight: 800;
  letter-spacing: -0.01em;
  margin-bottom: 0.5rem;
}
.f30-tl__content p {
  font-size: 0.8125rem;
  color: #888;
  line-height: 1.6;
}

/* ── Subscribe ── */
.f30-subscribe {
  background: #FF4444;
  color: #fff;
  padding: 7rem 4rem;
  text-align: center;
  border-top: 2px solid #FF4444;
}
.f30-subscribe__inner { max-width: 38rem; margin: 0 auto; }
.f30-subscribe__code {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  margin-bottom: 1.25rem;
  color: rgba(0, 0, 0, 0.4);
}
.f30-subscribe__title {
  font-size: clamp(3rem, 7vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 1.5rem;
}
.f30-subscribe__desc {
  font-size: 0.875rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}
.f30-subscribe__form {
  display: flex;
  max-width: 24rem;
  margin: 0 auto;
  border: 2px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.15);
}
.f30-subscribe__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem;
  color: #fff;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  outline: none;
}
.f30-subscribe__form input::placeholder { color: rgba(255, 255, 255, 0.5); }
.f30-subscribe__form button {
  background: #111;
  color: #FF4444;
  border: none;
  padding: 0 1.75rem;
  font-family: inherit;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background 0.2s;
}
.f30-subscribe__form button:hover { background: #222; }

/* ── Benefits ── */
.f30-benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #1a1a1a;
  border-top: 1px solid #222;
  border-bottom: 1px solid #222;
}
.f30-benefit {
  padding: 3rem 2rem;
  text-align: center;
  border-right: 1px solid #222;
}
.f30-benefit:last-child { border-right: none; }
.f30-benefit__icon { font-size: 2rem; margin-bottom: 1rem; }
.f30-benefit h4 {
  font-size: 0.75rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  margin-bottom: 0.625rem;
}
.f30-benefit p {
  font-size: 0.75rem;
  color: #666;
  line-height: 1.5;
}

/* ── Footer ── */
.f30-foot {
  background: #0a0a0a;
  border-top: 2px solid #FF4444;
}
.f30-foot__top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 5rem;
  padding: 5rem 4rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  border-bottom: 1px solid #222;
}
.f30-foot__logo {
  font-size: 2.5rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-bottom: 0.5rem;
}
.f30-foot__logo span {
  font-weight: 400;
  font-size: 0.75rem;
  color: #FF4444;
  margin-left: 0.5rem;
  letter-spacing: 0.15em;
  vertical-align: super;
}
.f30-foot__sub {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF4444;
  margin-bottom: 0.5rem;
}
.f30-foot__addr {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #444;
  margin-bottom: 1.5rem;
}
.f30-foot__social { display: flex; gap: 0.625rem; }
.f30-foot__social a {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #333;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
.f30-foot__social a:hover {
  border-color: #FF4444;
  color: #FF4444;
}

.f30-foot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
}
.f30-foot__label {
  font-size: 0.5625rem;
  font-weight: 800;
  letter-spacing: 0.25em;
  color: #FF4444;
  margin-bottom: 1rem;
}
.f30-foot__col a,
.f30-foot__col p {
  display: block;
  font-size: 0.75rem;
  color: #999;
  margin-bottom: 0.625rem;
  transition: color 0.2s;
  letter-spacing: 0.05em;
}
.f30-foot__col a:hover { color: #FF4444; }

.f30-foot__ticker {
  background: #FF4444;
  color: #0a0a0a;
  padding: 0.75rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.6875rem;
  font-weight: 900;
  letter-spacing: 0.15em;
  text-align: center;
}
.f30-foot__ticker span { display: inline; }

.f30-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  max-width: 1600px;
  margin: 0 auto;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #444;
}
</style>
