<template>
  <main class="f03">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f03-topbar">
      <div class="f03-topbar__util">
        <RouterLink to="/forme" class="f03-topbar__link">◁ PICKER</RouterLink>
        <span class="f03-topbar__sep">|</span>
        <a>MEMBERSHIP</a><a>STORES</a>
      </div>
      <div class="f03-topbar__brand">
        <span class="f03-topbar__eyebrow">— FORME · SPRING 2026 —</span>
        <h1 class="f03-topbar__logo">FORME</h1>
      </div>
      <nav class="f03-topbar__nav">
        <RouterLink to="/beanpole">Beanpole</RouterLink>
        <span class="f03-topbar__diamond">◆</span>
        <RouterLink to="/carhartt">Carhartt</RouterLink>
        <span class="f03-topbar__diamond">◆</span>
        <RouterLink to="/levis">Levi's</RouterLink>
        <span class="f03-topbar__diamond">◆</span>
        <RouterLink to="/dickies">Dickies</RouterLink>
      </nav>
      <div class="f03-topbar__icons">
        <span>🔍</span><span>♡</span><span>👤</span><span>🛒</span>
        <span class="f03-topbar__sep">|</span>
        <RouterLink to="/" class="f03-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero: 분할 ═══ -->
    <section class="f03-hero">
      <div class="f03-hero__text">
        <p class="f03-hero__eyebrow">— FORME · SPRING 2026</p>
        <h1 class="f03-hero__title">FORME</h1>
        <p class="f03-hero__tagline">The Quiet <em>Refinement</em></p>
        <div class="f03-hero__divider"></div>
        <p class="f03-hero__desc">
          한 시즌을 지나, 한 시대를 살아남는 옷.<br />
          FORME는 시간이 흐를수록 깊어지는 가치를 큐레이션합니다.
        </p>
        <div class="f03-hero__meta">
          <span>4 BRANDS</span><span>·</span>
          <span>24 OBJECTS</span><span>·</span>
          <span>EST. 2026</span>
        </div>
        <RouterLink to="/products" class="f03-hero__cta">
          <span>Explore Collection</span>
          <span>→</span>
        </RouterLink>
      </div>
      <div class="f03-hero__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="hero"
          class="f03-hero__img"
        />
      </div>
    </section>

    <!-- ═══ Quote ═══ -->
    <section class="f03-quote">
      <p class="f03-quote__text">
        "옷을 고른다는 것은 결국<br />
        자기 자신을 정의하는 일입니다."
      </p>
      <p class="f03-quote__author">— FORME EDITORIAL</p>
    </section>

    <!-- ═══ Premium Brands ═══ -->
    <section class="f03-brands">
      <header class="f03-sec-head">
        <p class="f03-sec-head__eyebrow">CURATED BRANDS</p>
        <h2 class="f03-sec-head__title">FORME가 선택한 네 개의 헤리티지</h2>
      </header>
      <div class="f03-brands__grid">
        <RouterLink
          v-for="b in brands"
          :key="b.id"
          :to="b.route"
          class="f03-brand-card"
        >
          <div class="f03-brand-card__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f03-brand-card__hover">
              <span>View Collection →</span>
            </div>
          </div>
          <div class="f03-brand-card__info">
            <p class="f03-brand-card__since">{{ b.since }}</p>
            <h3>{{ b.name }}</h3>
            <p class="f03-brand-card__desc">{{ b.desc }}</p>
            <span class="f03-brand-card__more">View Collection →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Curator's Pick (가로 스크롤) ═══ -->
    <section class="f03-curator">
      <div class="f03-curator__inner">
        <div class="f03-curator__text">
          <p class="f03-curator__eyebrow">CURATOR'S PICK</p>
          <h2 class="f03-curator__title">이번 주<br /><em>큐레이터의 선택</em></h2>
          <p class="f03-curator__desc">
            FORME 큐레이터가 직접 입어보고 선별한 이번 주의 셀렉션.
            소재의 결, 봉제의 정성, 시간의 무게를 견디는 디자인을 우선합니다.
          </p>
          <RouterLink to="/products" class="f03-curator__link">전체 셀렉션 보기 →</RouterLink>
        </div>
        <div class="f03-curator__scroll" ref="curatorRef">
          <RouterLink
            v-for="(p, i) in products"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="f03-pick"
          >
            <div class="f03-pick__img-wrap">
              <img :src="p.img" :alt="p.name" />
            </div>
            <div class="f03-pick__info">
              <span class="f03-pick__no">No. 0{{ i + 1 }}</span>
              <h3>{{ p.name }}</h3>
              <p class="f03-pick__brand">{{ p.brand }}</p>
              <p class="f03-pick__price">₩ {{ p.price }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Editorial ═══ -->
    <section class="f03-editorial">
      <header class="f03-sec-head f03-sec-head--center">
        <p class="f03-sec-head__eyebrow">EDITORIAL</p>
        <h2 class="f03-sec-head__title">Stories of Heritage</h2>
      </header>
      <div class="f03-editorial__grid">
        <article v-for="e in editorials" :key="e.title" class="f03-edit">
          <div class="f03-edit__img-wrap">
            <img :src="e.img" :alt="e.title" />
          </div>
          <div class="f03-edit__info">
            <p class="f03-edit__cat">{{ e.cat }}</p>
            <h3>{{ e.title }}</h3>
            <p class="f03-edit__excerpt">{{ e.excerpt }}</p>
            <a class="f03-edit__link">Read more →</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Members Only ═══ -->
    <section class="f03-members">
      <div class="f03-members__inner">
        <p class="f03-members__eyebrow">MEMBERS ONLY</p>
        <h2 class="f03-members__title">FORME Membership</h2>
        <p class="f03-members__desc">
          멤버십 가입 시, 시즌 한정 큐레이션과 매거진을<br />
          가장 먼저 만나보실 수 있습니다.
        </p>
        <div class="f03-members__benefits">
          <div v-for="b in benefits" :key="b.title" class="f03-benefit">
            <span class="f03-benefit__icon">{{ b.icon }}</span>
            <h4>{{ b.title }}</h4>
            <p>{{ b.desc }}</p>
          </div>
        </div>
        <RouterLink to="/signup" class="f03-members__cta">Join FORME</RouterLink>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f03-newsletter">
      <div class="f03-newsletter__inner">
        <h2>Stay connected.</h2>
        <p>새 컬렉션과 에디토리얼을 가장 먼저 받아보세요.</p>
        <div class="f03-newsletter__form">
          <input type="email" placeholder="이메일 주소를 입력해주세요" />
          <button>Subscribe →</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f03-foot">
      <div class="f03-foot__top">
        <div class="f03-foot__brand">
          <h3 class="f03-foot__logo">FORME</h3>
          <p class="f03-foot__slogan"><em>The Quiet Refinement.</em></p>
          <p class="f03-foot__est">EST. 2026 · SEOUL, KOREA</p>
        </div>
        <div class="f03-foot__grid">
          <div class="f03-foot__col">
            <h4>SHOP</h4>
            <RouterLink to="/beanpole">Beanpole</RouterLink>
            <RouterLink to="/carhartt">Carhartt</RouterLink>
            <RouterLink to="/levis">Levi's</RouterLink>
            <RouterLink to="/dickies">Dickies</RouterLink>
            <a>New In</a>
          </div>
          <div class="f03-foot__col">
            <h4>SERVICE</h4>
            <a>Delivery</a>
            <a>Returns</a>
            <a>Size Guide</a>
            <a>Gift Cards</a>
          </div>
          <div class="f03-foot__col">
            <h4>CUSTOMER</h4>
            <a>고객센터 1588-0000</a>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">1:1 문의</RouterLink>
          </div>
          <div class="f03-foot__col">
            <h4>ABOUT</h4>
            <a>Our Story</a>
            <a>Sustainability</a>
            <a>Journal</a>
            <a>Contact</a>
          </div>
        </div>
      </div>
      <div class="f03-foot__divider">
        <span></span><span class="f03-foot__diamond">◆</span><span></span>
      </div>
      <div class="f03-foot__bottom">
        <p>(주)FORME | 대표이사 김보경 | 사업자등록번호 000-00-00000</p>
        <p>서울특별시 강남구 테헤란로 000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const curatorRef = ref(null);

const brands = [
  { id: 1, name: "BEANPOLE", since: "EST. 1989 / SEOUL",        desc: "한국 클래식의 정수, 시간을 닮은 단정함",    route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", since: "EST. 1889 / DETROIT",      desc: "워크웨어의 원형, 디트로이트의 정직함",      route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   since: "EST. 1873 / SAN FRANCISCO", desc: "데님이 곧 문화가 된 150년의 헤리티지",      route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  since: "EST. 1922 / FORT WORTH",   desc: "한 세기를 함께한 진짜 워크웨어의 산증인",  route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",    price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "Beanpole", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
];

const editorials = [
  { cat: "— ARCHIVE",     title: "워크웨어, 노동의 미학",     excerpt: "한 세기를 견뎌온 소재와 봉제. 시간이 만든 단단한 정직함.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "— STYLE",       title: "2026, 절제의 봄",           excerpt: "덜어낼수록 깊어지는 봄의 옷장.",                           img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { cat: "— BRAND STORY", title: "데님, 150년의 푸른 역사",   excerpt: "광부의 옷에서 세기의 클래식이 되기까지.",                   img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
];

const benefits = [
  { icon: "✦", title: "EXCLUSIVE",     desc: "회원 전용 큐레이션" },
  { icon: "🚚", title: "FREE SHIPPING", desc: "전 상품 무료 배송" },
  { icon: "🎁", title: "REWARDS",       desc: "등급별 리워드 적립" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 03 — Premium Heritage
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f03 {
  background: #faf8f4;
  color: #1a1a1a;
  font-family: var(--font-body);
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f03-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(250, 248, 244, 0.96);
  backdrop-filter: blur(12px);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  text-align: center;
}
.f03-topbar__util {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 2.5rem;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #8b7437;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
}
.f03-topbar__util a { cursor: pointer; }
.f03-topbar__link { color: #8b7437; transition: color 0.2s; }
.f03-topbar__link:hover { color: #1a1a1a; }
.f03-topbar__sep { color: #ddd; }
.f03-topbar__brand { padding: 1.25rem 2rem 0.75rem; }
.f03-topbar__eyebrow {
  font-size: 0.5625rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: #8b7437;
  margin-bottom: 0.5rem;
  display: block;
}
.f03-topbar__logo {
  font-family: "Italiana", serif;
  font-size: 2.75rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  line-height: 1;
  color: #1a1a1a;
}
.f03-topbar__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 2rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
}
.f03-topbar__nav a {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  color: #1a1a1a;
  cursor: pointer;
  transition: color 0.2s;
}
.f03-topbar__nav a:hover { color: #8b7437; }
.f03-topbar__diamond { font-size: 0.4rem; color: #c9a86b; }
.f03-topbar__icons {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  padding: 0.625rem 2rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.06);
  font-size: 1rem;
  color: #8b7437;
}
.f03-topbar__icons span { cursor: pointer; }

/* ── Hero ── */
.f03-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100dvh - 160px);
  background: #faf8f4;
}
@media (min-width: 1024px) {
  .f03-hero { grid-template-columns: 1fr 1fr; }
}
.f03-hero__text {
  padding: 6rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f03-hero__eyebrow {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 2rem;
}
.f03-hero__title {
  font-family: "Italiana", serif;
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 0.95;
  color: #1a1a1a;
  margin-bottom: 1rem;
}
.f03-hero__tagline {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 300;
  color: #5c5c5c;
  margin-bottom: 2rem;
  letter-spacing: 0.01em;
}
.f03-hero__tagline em {
  font-style: italic;
  color: #8b7437;
}
.f03-hero__divider {
  width: 4rem;
  height: 1px;
  background: #1a1a1a;
  margin-bottom: 2rem;
}
.f03-hero__desc {
  font-size: 1rem;
  line-height: 1.9;
  color: #5c5c5c;
  margin-bottom: 2rem;
  max-width: 28rem;
}
.f03-hero__meta {
  display: flex;
  gap: 0.625rem;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #8b7437;
  margin-bottom: 3rem;
}
.f03-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  padding: 1.125rem 2.5rem;
  background: transparent;
  color: #1a1a1a;
  border: 0.5px solid #1a1a1a;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: all 0.3s;
}
.f03-hero__cta:hover {
  background: #1a1a1a;
  color: #faf8f4;
}
.f03-hero__img-wrap {
  overflow: hidden;
  min-height: 480px;
}
.f03-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
}

/* ── Quote ── */
.f03-quote {
  padding: 8rem 3rem;
  text-align: center;
  background: #faf8f4;
  border-top: 0.5px solid rgba(0, 0, 0, 0.08);
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.08);
}
.f03-quote__text {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: #1a1a1a;
  max-width: 50rem;
  margin: 0 auto 2rem;
}
.f03-quote__author {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8b7437;
}

/* ── Section Head ── */
.f03-sec-head {
  margin-bottom: 4rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 5rem;
}
.f03-sec-head--center { text-align: center; }
.f03-sec-head__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 1rem;
}
.f03-sec-head__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #1a1a1a;
}

/* ── Brands ── */
.f03-brands {
  padding: 8rem 5rem;
  background: #ffffff;
}
.f03-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f03-brands__grid { grid-template-columns: 1fr 1fr; } }
.f03-brand-card {
  display: block;
  color: inherit;
  cursor: pointer;
}
.f03-brand-card__img-wrap {
  position: relative;
  aspect-ratio: 16/10;
  overflow: hidden;
  margin-bottom: 1.75rem;
  background: #f5f3ee;
}
.f03-brand-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.3);
  transition: transform 0.8s, filter 0.6s;
}
.f03-brand-card:hover .f03-brand-card__img-wrap img {
  transform: scale(1.04);
  filter: grayscale(0);
}
.f03-brand-card__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 26, 26, 0.3);
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  opacity: 0;
  transition: opacity 0.5s;
}
.f03-brand-card:hover .f03-brand-card__hover { opacity: 1; }
.f03-brand-card__since {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 0.625rem;
}
.f03-brand-card__info h3 {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 0.875rem;
}
.f03-brand-card__desc {
  font-size: 0.875rem;
  color: #5c5c5c;
  line-height: 1.7;
  margin-bottom: 1rem;
}
.f03-brand-card__more {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1a1a1a;
  border-bottom: 0.5px solid #1a1a1a;
  padding-bottom: 4px;
}

/* ── Curator's Pick ── */
.f03-curator {
  padding: 8rem 0;
  background: #1a1a1a;
  color: #faf8f4;
}
.f03-curator__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5rem;
}
@media (min-width: 1024px) {
  .f03-curator__inner { grid-template-columns: 1fr 1.8fr; }
}
.f03-curator__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f03-curator__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #c9a86b;
  margin-bottom: 1.25rem;
}
.f03-curator__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1.75rem;
}
.f03-curator__title em {
  font-style: italic;
  color: #c9a86b;
}
.f03-curator__desc {
  font-size: 0.9375rem;
  line-height: 1.85;
  opacity: 0.7;
  max-width: 26rem;
  margin-bottom: 2rem;
}
.f03-curator__link {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a86b;
  border-bottom: 0.5px solid #c9a86b;
  padding-bottom: 4px;
  width: fit-content;
}
.f03-curator__scroll {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}
.f03-pick {
  display: block;
  color: inherit;
  cursor: pointer;
}
.f03-pick__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #2a2a2a;
  margin-bottom: 1rem;
}
.f03-pick__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.4);
  transition: transform 0.7s, filter 0.5s;
}
.f03-pick:hover .f03-pick__img-wrap img {
  transform: scale(1.04);
  filter: grayscale(0);
}
.f03-pick__no {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #c9a86b;
  display: block;
  margin-bottom: 0.5rem;
}
.f03-pick__info h3 {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 400;
  margin-bottom: 0.375rem;
  line-height: 1.4;
}
.f03-pick__brand {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #c9a86b;
  margin-bottom: 0.5rem;
}
.f03-pick__price {
  font-size: 0.8125rem;
  font-weight: 500;
  opacity: 0.8;
}

/* ── Editorial ── */
.f03-editorial {
  padding: 8rem 5rem;
  background: #faf8f4;
}
.f03-editorial__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f03-editorial__grid { grid-template-columns: repeat(3, 1fr); } }
.f03-edit {
  cursor: pointer;
  color: inherit;
}
.f03-edit__img-wrap {
  aspect-ratio: 4/5;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.f03-edit__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.3);
  transition: filter 0.5s, transform 0.5s;
}
.f03-edit:hover .f03-edit__img-wrap img {
  filter: grayscale(0);
  transform: scale(1.03);
}
.f03-edit__cat {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 0.875rem;
}
.f03-edit__info h3 {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 0.875rem;
}
.f03-edit__excerpt {
  font-size: 0.875rem;
  color: #5c5c5c;
  line-height: 1.7;
  margin-bottom: 1rem;
}
.f03-edit__link {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #1a1a1a;
  border-bottom: 0.5px solid #1a1a1a;
  padding-bottom: 3px;
  cursor: pointer;
}

/* ── Members Only ── */
.f03-members {
  padding: 8rem 3rem;
  background: linear-gradient(180deg, #f5f3ee 0%, #faf8f4 100%);
  text-align: center;
}
.f03-members__inner { max-width: 64rem; margin: 0 auto; }
.f03-members__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 1.25rem;
}
.f03-members__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.f03-members__desc {
  font-size: 1rem;
  line-height: 1.85;
  color: #5c5c5c;
  margin-bottom: 4rem;
}
.f03-members__benefits {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}
@media (min-width: 768px) { .f03-members__benefits { grid-template-columns: repeat(3, 1fr); } }
.f03-benefit__icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 1.25rem;
  color: #c9a86b;
}
.f03-benefit h4 {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  margin-bottom: 0.75rem;
}
.f03-benefit p {
  font-size: 0.875rem;
  color: #5c5c5c;
}
.f03-members__cta {
  display: inline-block;
  padding: 1.25rem 4rem;
  background: #1a1a1a;
  color: #faf8f4;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  transition: background 0.3s;
}
.f03-members__cta:hover { background: #c9a86b; }

/* ── Newsletter ── */
.f03-newsletter {
  padding: 5rem 3rem;
  background: #1a1a1a;
  color: #faf8f4;
  text-align: center;
}
.f03-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f03-newsletter h2 {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 300;
  margin-bottom: 0.75rem;
}
.f03-newsletter p {
  font-size: 0.875rem;
  color: #c9a86b;
  margin-bottom: 2rem;
}
.f03-newsletter__form {
  display: flex;
  border-bottom: 1px solid #c9a86b;
}
.f03-newsletter__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 0;
  color: #faf8f4;
  font-size: 0.9375rem;
  font-family: inherit;
  outline: none;
}
.f03-newsletter__form input::placeholder { color: rgba(250, 248, 244, 0.4); }
.f03-newsletter__form button {
  background: transparent;
  border: none;
  color: #c9a86b;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  font-family: inherit;
  cursor: pointer;
  padding: 0 1rem;
}

/* ── Footer ── */
.f03-foot {
  background: #f5f3ee;
  padding: 5rem 5rem 2rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.1);
}
.f03-foot__top {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto 2rem;
  padding-bottom: 2rem;
}
.f03-foot__logo {
  font-family: "Italiana", serif;
  font-size: 2.75rem;
  font-weight: 400;
  letter-spacing: 0.06em;
  margin-bottom: 0.75rem;
}
.f03-foot__slogan em {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-style: italic;
  color: #8b7437;
}
.f03-foot__est {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8b7437;
  margin-top: 1rem;
}
.f03-foot__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.f03-foot__col h4 {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #8b7437;
  margin-bottom: 1rem;
}
.f03-foot__col a {
  display: block;
  font-size: 0.8125rem;
  color: #1a1a1a;
  margin-bottom: 0.625rem;
  cursor: pointer;
  transition: color 0.2s;
}
.f03-foot__col a:hover { color: #8b7437; }

.f03-foot__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  max-width: 1400px;
  margin: 0 auto;
}
.f03-foot__divider span:first-child,
.f03-foot__divider span:last-child {
  flex: 1;
  height: 0.5px;
  background: rgba(0, 0, 0, 0.12);
  max-width: 8rem;
}
.f03-foot__diamond { font-size: 0.5rem; color: #c9a86b; }

.f03-foot__bottom {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 0.5625rem;
  color: #8b7437;
  line-height: 1.8;
  text-align: center;
  font-style: italic;
}
</style>
