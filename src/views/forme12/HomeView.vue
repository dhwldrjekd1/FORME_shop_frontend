<template>
  <main class="f12">
    <!-- 배경 오브 -->
    <div class="f12-bg">
      <div class="f12-orb f12-orb--1"></div>
      <div class="f12-orb f12-orb--2"></div>
      <div class="f12-orb f12-orb--3"></div>
      <div class="f12-orb f12-orb--4"></div>
    </div>

    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f12-topbar">
      <div class="f12-topbar__left">
        <RouterLink to="/forme" class="f12-topbar__link">◁ PICKER</RouterLink>
      </div>
      <div class="f12-topbar__center">
        <span class="f12-topbar__logo">FORME</span>
        <span class="f12-topbar__tag">GLASS EDITION</span>
      </div>
      <div class="f12-topbar__right">
        <span class="f12-topbar__icon">🔍</span>
        <span class="f12-topbar__icon">♡</span>
        <span class="f12-topbar__icon">👤</span>
        <span class="f12-topbar__icon">🛒</span>
        <RouterLink to="/" class="f12-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f12-hero">
      <div class="f12-glass f12-hero__card">
        <p class="f12-hero__eyebrow">FUTURE / FORME / 2026</p>
        <div class="f12-hero__ornament">✧</div>
        <h1 class="f12-hero__title">FORME</h1>
        <p class="f12-hero__tagline">The future is <em>transparent.</em></p>
        <div class="f12-hero__divider"></div>
        <p class="f12-hero__desc">유리처럼 맑은 큐레이션. 빛을 머금는 옷장.</p>
        <div class="f12-hero__meta">
          <span>4 HOUSES</span><span>·</span>
          <span>24 OBJECTS</span><span>·</span>
          <span>2026 →</span>
        </div>
        <RouterLink to="/products" class="f12-btn">Enter the Future →</RouterLink>
      </div>
    </section>

    <!-- ═══ Stats ═══ -->
    <section class="f12-stats">
      <div v-for="s in stats" :key="s.label" class="f12-glass f12-stat">
        <span class="f12-stat__num">{{ s.value }}</span>
        <span class="f12-stat__label">{{ s.label }}</span>
      </div>
    </section>

    <!-- ═══ Four Houses ═══ -->
    <section class="f12-brands">
      <div class="f12-sec-head">
        <p class="f12-sec-head__eyebrow">✧ CURATED HOUSES</p>
        <h2 class="f12-sec-head__title">Four Houses of Heritage</h2>
      </div>
      <div class="f12-brands__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f12-glass f12-brand"
        >
          <div class="f12-brand__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f12-brand__hover">
              <span>EXPLORE →</span>
            </div>
            <span class="f12-brand__no">0{{ i + 1 }}</span>
          </div>
          <div class="f12-brand__info">
            <h3>{{ b.name }}</h3>
            <p class="f12-brand__since">{{ b.since }}</p>
            <p class="f12-brand__desc">{{ b.desc }}</p>
            <div class="f12-brand__meta">
              <span>{{ b.items }} items</span>
              <span>★ {{ b.rating }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Selection (가로 스크롤) ═══ -->
    <section class="f12-selection">
      <div class="f12-sec-head f12-sec-head--inline">
        <div>
          <p class="f12-sec-head__eyebrow">✧ TRANSLUCENT SELECTION</p>
          <h2 class="f12-sec-head__title">Objects in Light</h2>
        </div>
        <div class="f12-selection__nav">
          <button @click="scrollSel(-1)">◁</button>
          <button @click="scrollSel(1)">▷</button>
        </div>
      </div>
      <div class="f12-selection__scroll" ref="selRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f12-glass f12-item"
        >
          <div class="f12-item__img-wrap">
            <img :src="p.img" :alt="p.name" />
            <span class="f12-item__no">N° {{ String(i + 1).padStart(3, '0') }}</span>
          </div>
          <div class="f12-item__info">
            <p class="f12-item__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f12-item__price">₩ {{ p.price }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Vision Statement ═══ -->
    <section class="f12-vision">
      <div class="f12-glass f12-vision__card">
        <p class="f12-vision__eyebrow">✧ OUR VISION</p>
        <h2 class="f12-vision__title">
          See through<br />
          the noise.
        </h2>
        <div class="f12-vision__divider"></div>
        <div class="f12-vision__cols">
          <p>
            세상에는 너무 많은 옷이 있습니다. FORME는 그 소음 사이에서
            진짜로 오래 입을 수 있는 것만을 골라냅니다. 유리처럼 투명한
            기준으로 — 소재, 봉제, 디자인의 진정성만을 봅니다.
          </p>
          <p>
            네 개의 헤리티지 브랜드가 공유하는 하나의 철학: 시간을 견디는
            옷. 빠르게 만들어지고 빠르게 사라지는 것 대신, 천천히 만들어져
            오래 남는 것. 그것이 FORME의 미래입니다.
          </p>
        </div>
        <p class="f12-vision__sign">— FORME GLASS EDITION, 2026</p>
      </div>
    </section>

    <!-- ═══ Features ═══ -->
    <section class="f12-features">
      <div class="f12-sec-head f12-sec-head--center">
        <p class="f12-sec-head__eyebrow">✧ WHY FORME</p>
        <h2 class="f12-sec-head__title">Transparent Benefits</h2>
      </div>
      <div class="f12-features__grid">
        <div v-for="f in features" :key="f.title" class="f12-glass f12-feature">
          <div class="f12-feature__icon">{{ f.icon }}</div>
          <h3>{{ f.title }}</h3>
          <p>{{ f.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f12-newsletter">
      <div class="f12-glass f12-newsletter__card">
        <p class="f12-newsletter__eyebrow">✧ STAY CONNECTED</p>
        <h2 class="f12-newsletter__title">Join the Signal.</h2>
        <p class="f12-newsletter__desc">새 컬렉션과 큐레이션 소식을 가장 먼저 받아보세요.</p>
        <div class="f12-newsletter__form">
          <input type="email" placeholder="your@email.com" />
          <button>TRANSMIT →</button>
        </div>
      </div>
    </section>

    <!-- ═══ Closing ═══ -->
    <section class="f12-closing">
      <div class="f12-glass f12-closing__card">
        <div class="f12-closing__ornament">✧</div>
        <h2 class="f12-closing__title">The future is clear.</h2>
        <p class="f12-closing__sub">FORME · 2026 → beyond</p>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f12-foot">
      <div class="f12-glass f12-foot__inner">
        <div class="f12-foot__brand">
          <h3 class="f12-foot__logo">FORME</h3>
          <p class="f12-foot__slogan"><em>Glass Edition · 2026</em></p>
          <div class="f12-foot__social">
            <a>IG</a><a>YT</a><a>TW</a>
          </div>
        </div>
        <div class="f12-foot__grid">
          <div class="f12-foot__col">
            <h4>HOUSES</h4>
            <RouterLink to="/beanpole">Beanpole</RouterLink>
            <RouterLink to="/carhartt">Carhartt</RouterLink>
            <RouterLink to="/levis">Levi's</RouterLink>
            <RouterLink to="/dickies">Dickies</RouterLink>
          </div>
          <div class="f12-foot__col">
            <h4>NAVIGATE</h4>
            <RouterLink to="/products">All Objects</RouterLink>
            <RouterLink to="/cart">Light Table</RouterLink>
            <RouterLink to="/mypage">Dashboard</RouterLink>
          </div>
          <div class="f12-foot__col">
            <h4>CONNECT</h4>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">Contact</RouterLink>
            <p>glass@forme.kr</p>
          </div>
        </div>
      </div>
      <div class="f12-foot__bottom">
        <span>© 2026 FORME GLASS EDITION</span>
        <span>✧</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const selRef = ref(null);
function scrollSel(dir) {
  if (!selRef.value) return;
  selRef.value.scrollBy({ left: dir * 380, behavior: "smooth" });
}

const stats = [
  { value: "4", label: "HOUSES" },
  { value: "542", label: "OBJECTS" },
  { value: "∞", label: "POTENTIAL" },
  { value: "2026", label: "ORIGIN" },
];

const brands = [
  { id: 1, name: "Beanpole", since: "Seoul · 1989",         desc: "한국 클래식의 맑은 빛",        items: 142, rating: 4.7, route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "Carhartt", since: "Detroit · 1889",       desc: "워크웨어의 투명한 정직함",     items: 98,  rating: 4.8, route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "Levi's",   since: "San Francisco · 1873", desc: "데님 헤리티지의 깊은 빛깔",    items: 215, rating: 4.9, route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "Dickies",  since: "Fort Worth · 1922",    desc: "한 세기 워크웨어의 견고함",    items: 87,  rating: 4.6, route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",    price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "Beanpole", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "Carhartt", name: "루즈핏 캔버스 워크 팬츠",   price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "Dickies",  name: "트리 로고 롱슬리브",        price: "69,000",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const features = [
  { icon: "🚚", title: "FREE SHIPPING",    desc: "전 상품 무료배송 · 당일 출고" },
  { icon: "↩",  title: "FREE RETURNS",     desc: "7일 무료 반품 · 부담 없이" },
  { icon: "🔒", title: "SECURE PAY",       desc: "SSL 보안 결제 · 무이자 할부" },
  { icon: "✧",  title: "CURATED QUALITY",  desc: "엄선된 품질 · 4개 헤리티지 브랜드" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 12 — Glassmorphism
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f12 {
  background: #0a0a2e;
  color: #f0f0ff;
  font-family: var(--font-body);
  min-height: 100dvh;
  position: relative;
  overflow: hidden;
}

/* ── 배경 오브 ── */
.f12-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  overflow: hidden;
}
.f12-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
}
.f12-orb--1 { width: 50vw; height: 50vw; background: #667eea; top: -15%; left: -10%; }
.f12-orb--2 { width: 45vw; height: 45vw; background: #f093fb; top: 25%; right: -15%; }
.f12-orb--3 { width: 40vw; height: 40vw; background: #4facfe; bottom: -10%; left: 25%; }
.f12-orb--4 { width: 30vw; height: 30vw; background: #43e97b; bottom: 20%; right: 10%; opacity: 0.3; }

/* ── Glass 공통 ── */
.f12-glass {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25);
}

/* ── 자체 헤더 ── */
.f12-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.875rem 2rem;
  background: rgba(10, 10, 46, 0.85);
  backdrop-filter: blur(16px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.f12-topbar__left, .f12-topbar__right {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
}
.f12-topbar__right { justify-content: flex-end; }
.f12-topbar__link { color: #a0a0ff; transition: color 0.2s; }
.f12-topbar__link:hover { color: #fff; }
.f12-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  justify-content: center;
}
.f12-topbar__logo {
  font-family: "Italiana", serif;
  font-size: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.f12-topbar__tag { font-size: 0.5625rem; color: #a0a0ff; letter-spacing: 0.2em; }
.f12-topbar__icon { font-size: 1rem; cursor: pointer; opacity: 0.7; transition: opacity 0.2s; }
.f12-topbar__icon:hover { opacity: 1; }

/* ── Hero ── */
.f12-hero {
  position: relative;
  z-index: 1;
  min-height: calc(100dvh - 52px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.f12-hero__card {
  padding: 5rem 4rem;
  max-width: 44rem;
  text-align: center;
}
.f12-hero__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #a0a0ff;
  margin-bottom: 1.5rem;
}
.f12-hero__ornament {
  font-size: 2rem;
  color: #a0a0ff;
  margin-bottom: 1.5rem;
}
.f12-hero__title {
  font-family: "Italiana", serif;
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 0.95;
  background: linear-gradient(135deg, #fff 0%, #a0a0ff 50%, #f093fb 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}
.f12-hero__tagline {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 300;
  color: #d0d0ff;
  margin-bottom: 2rem;
}
.f12-hero__tagline em {
  font-style: italic;
  color: #a0a0ff;
}
.f12-hero__divider {
  width: 4rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, #a0a0ff, transparent);
  margin: 0 auto 2rem;
}
.f12-hero__desc {
  font-size: 1rem;
  line-height: 1.85;
  color: #d0d0ff;
  margin-bottom: 2rem;
}
.f12-hero__meta {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: rgba(160, 160, 255, 0.7);
  margin-bottom: 3rem;
}
.f12-btn {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 999px;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  transition: all 0.3s;
}
.f12-btn:hover {
  background: rgba(255, 255, 255, 0.22);
  border-color: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 24px rgba(160, 160, 255, 0.3);
}

/* ── Stats ── */
.f12-stats {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1200px;
  margin: -3rem auto 5rem;
}
.f12-stat {
  padding: 2rem;
  text-align: center;
  border-radius: 16px;
}
.f12-stat__num {
  display: block;
  font-family: "Italiana", serif;
  font-size: 2.75rem;
  font-weight: 400;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.375rem;
}
.f12-stat__label {
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: #a0a0ff;
}

/* ── Section Head ── */
.f12-sec-head {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 5rem 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f12-sec-head--center { text-align: center; }
.f12-sec-head--inline {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f12-sec-head__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: #a0a0ff;
  margin-bottom: 1rem;
}
.f12-sec-head__title {
  font-family: "Italiana", serif;
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #fff;
}

/* ── Brands ── */
.f12-brands {
  position: relative;
  z-index: 1;
  padding: 0 3rem 6rem;
}
.f12-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f12-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f12-brands__grid { grid-template-columns: repeat(4, 1fr); } }

.f12-brand {
  overflow: hidden;
  color: inherit;
  cursor: pointer;
  transition: transform 0.4s, box-shadow 0.4s;
}
.f12-brand:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.35), 0 0 32px rgba(160, 160, 255, 0.15);
}
.f12-brand__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  border-radius: 20px 20px 0 0;
}
.f12-brand__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.f12-brand:hover .f12-brand__img-wrap img { transform: scale(1.05); }
.f12-brand__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 10, 46, 0.5);
  backdrop-filter: blur(4px);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #fff;
}
.f12-brand:hover .f12-brand__hover { opacity: 1; }
.f12-brand__no {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(10, 10, 46, 0.6);
  backdrop-filter: blur(8px);
  padding: 0.375rem 0.625rem;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 700;
  color: #a0a0ff;
}
.f12-brand__info {
  padding: 1.5rem;
}
.f12-brand__info h3 {
  font-family: "Italiana", serif;
  font-size: 1.375rem;
  font-weight: 400;
  margin-bottom: 0.375rem;
}
.f12-brand__since {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #a0a0ff;
  margin-bottom: 0.75rem;
}
.f12-brand__desc {
  font-size: 0.8125rem;
  color: #d0d0ff;
  line-height: 1.5;
  margin-bottom: 0.75rem;
  opacity: 0.8;
}
.f12-brand__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.5625rem;
  color: rgba(160, 160, 255, 0.7);
  letter-spacing: 0.1em;
}

/* ── Selection Carousel ── */
.f12-selection {
  position: relative;
  z-index: 1;
  padding: 0 0 6rem;
}
.f12-selection__nav { display: flex; gap: 0.5rem; }
.f12-selection__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f12-selection__nav button:hover {
  background: rgba(160, 160, 255, 0.2);
  border-color: #a0a0ff;
}
.f12-selection__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 1rem 3rem;
}
.f12-selection__scroll::-webkit-scrollbar { display: none; }

.f12-item {
  flex: 0 0 300px;
  scroll-snap-align: start;
  padding: 1rem;
  color: inherit;
  cursor: pointer;
  border-radius: 20px;
  transition: transform 0.3s, box-shadow 0.3s;
}
.f12-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.3);
}
.f12-item__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 1rem;
}
.f12-item__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f12-item:hover .f12-item__img-wrap img { transform: scale(1.04); }
.f12-item__no {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: rgba(10, 10, 46, 0.6);
  backdrop-filter: blur(8px);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  color: #a0a0ff;
}
.f12-item__brand {
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #a0a0ff;
  margin-bottom: 0.375rem;
}
.f12-item__info h3 {
  font-size: 0.9375rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.35;
}
.f12-item__price {
  font-size: 0.875rem;
  color: #a0a0ff;
  font-weight: 600;
}

/* ── Vision ── */
.f12-vision {
  position: relative;
  z-index: 1;
  padding: 5rem 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.f12-vision__card {
  padding: 4rem 3.5rem;
  text-align: center;
}
.f12-vision__eyebrow {
  font-size: 0.6875rem;
  letter-spacing: 0.35em;
  color: #a0a0ff;
  margin-bottom: 1.5rem;
}
.f12-vision__title {
  font-family: "Italiana", serif;
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 400;
  line-height: 1.1;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 2rem;
}
.f12-vision__divider {
  width: 4rem;
  height: 1px;
  background: linear-gradient(90deg, transparent, #a0a0ff, transparent);
  margin: 0 auto 2.5rem;
}
.f12-vision__cols {
  column-count: 2;
  column-gap: 2.5rem;
  text-align: left;
  margin-bottom: 2rem;
}
.f12-vision__cols p {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #d0d0ff;
  margin-bottom: 1rem;
  opacity: 0.85;
}
.f12-vision__sign {
  font-size: 0.6875rem;
  letter-spacing: 0.25em;
  color: rgba(160, 160, 255, 0.6);
  text-align: center;
}

/* ── Features ── */
.f12-features {
  position: relative;
  z-index: 1;
  padding: 0 3rem 6rem;
}
.f12-features__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f12-features__grid { grid-template-columns: repeat(4, 1fr); } }
.f12-feature {
  padding: 2rem 1.5rem;
  text-align: center;
  border-radius: 16px;
  transition: transform 0.3s;
}
.f12-feature:hover { transform: translateY(-4px); }
.f12-feature__icon {
  font-size: 2rem;
  margin-bottom: 1rem;
}
.f12-feature h3 {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.625rem;
  color: #fff;
}
.f12-feature p {
  font-size: 0.75rem;
  color: #d0d0ff;
  line-height: 1.5;
  opacity: 0.8;
}

/* ── Newsletter ── */
.f12-newsletter {
  position: relative;
  z-index: 1;
  padding: 3rem;
  max-width: 600px;
  margin: 0 auto 5rem;
}
.f12-newsletter__card {
  padding: 3.5rem 3rem;
  text-align: center;
}
.f12-newsletter__eyebrow {
  font-size: 0.625rem;
  letter-spacing: 0.35em;
  color: #a0a0ff;
  margin-bottom: 1.25rem;
}
.f12-newsletter__title {
  font-family: "Italiana", serif;
  font-size: 2.25rem;
  font-weight: 400;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.75rem;
}
.f12-newsletter__desc {
  font-size: 0.875rem;
  color: #d0d0ff;
  margin-bottom: 2rem;
  opacity: 0.8;
}
.f12-newsletter__form {
  display: flex;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 999px;
  overflow: hidden;
}
.f12-newsletter__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 1.25rem;
  color: #fff;
  font-size: 0.8125rem;
  outline: none;
}
.f12-newsletter__form input::placeholder { color: rgba(255, 255, 255, 0.4); }
.f12-newsletter__form button {
  background: rgba(160, 160, 255, 0.3);
  border: none;
  padding: 0 1.75rem;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  border-radius: 0 999px 999px 0;
  transition: background 0.2s;
}
.f12-newsletter__form button:hover { background: rgba(160, 160, 255, 0.5); }

/* ── Closing ── */
.f12-closing {
  position: relative;
  z-index: 1;
  padding: 0 3rem 6rem;
  max-width: 600px;
  margin: 0 auto;
}
.f12-closing__card {
  padding: 5rem 3rem;
  text-align: center;
}
.f12-closing__ornament {
  font-size: 2rem;
  color: #a0a0ff;
  margin-bottom: 1.5rem;
}
.f12-closing__title {
  font-family: "Italiana", serif;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 400;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 1rem;
}
.f12-closing__sub {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  color: #a0a0ff;
}

/* ── Footer ── */
.f12-foot {
  position: relative;
  z-index: 1;
  padding: 3rem 3rem 2rem;
}
.f12-foot__inner {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 3rem;
  padding: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  border-radius: 24px;
}
.f12-foot__logo {
  font-family: "Italiana", serif;
  font-size: 2.25rem;
  font-weight: 400;
  background: linear-gradient(135deg, #fff, #a0a0ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.5rem;
}
.f12-foot__slogan em {
  font-size: 0.875rem;
  color: #a0a0ff;
  font-style: italic;
}
.f12-foot__social {
  display: flex;
  gap: 0.5rem;
  margin-top: 1.5rem;
}
.f12-foot__social a {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #a0a0ff;
  cursor: pointer;
  transition: all 0.2s;
}
.f12-foot__social a:hover {
  border-color: #a0a0ff;
  background: rgba(160, 160, 255, 0.15);
}
.f12-foot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.f12-foot__col h4 {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #a0a0ff;
  margin-bottom: 1rem;
}
.f12-foot__col a,
.f12-foot__col p {
  display: block;
  font-size: 0.75rem;
  color: #d0d0ff;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
  opacity: 0.8;
}
.f12-foot__col a:hover { color: #fff; opacity: 1; }

.f12-foot__bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 2rem 0 1rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  color: rgba(160, 160, 255, 0.5);
}
</style>
