<template>
  <main class="f22">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f22-topbar">
      <div class="f22-topbar__top">
        <RouterLink to="/forme" class="f22-topbar__link">◁ PICKER</RouterLink>
        <span>FREE SHIPPING ON ALL ORDERS · FREE RETURNS</span>
        <RouterLink to="/" class="f22-topbar__link">HOME ▷</RouterLink>
      </div>
      <div class="f22-topbar__main">
        <nav class="f22-topbar__nav-left">
          <a>SHOP</a><a>JOURNAL</a><a>STORES</a>
        </nav>
        <div class="f22-topbar__logo">forme</div>
        <nav class="f22-topbar__nav-right">
          <a>SEARCH</a><a>ACCOUNT</a><a>BAG (2)</a>
        </nav>
      </div>
      <nav class="f22-topbar__cats">
        <a>New Arrivals</a>
        <RouterLink to="/beanpole">Beanpole</RouterLink>
        <RouterLink to="/carhartt">Carhartt</RouterLink>
        <RouterLink to="/levis">Levi's</RouterLink>
        <RouterLink to="/dickies">Dickies</RouterLink>
        <a class="f22-topbar__sale">Sale</a>
      </nav>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f22-hero">
      <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" class="f22-hero__bg" />
      <div class="f22-hero__text">
        <p class="f22-hero__tag">Spring · 2026</p>
        <h1 class="f22-hero__title">A New<br /><em>Everyday</em></h1>
        <p class="f22-hero__desc">계절이 바뀌어도 변하지 않는 것들을 고릅니다.</p>
        <RouterLink to="/products" class="f22-hero__cta">Shop the Collection →</RouterLink>
      </div>
    </section>

    <!-- ═══ Introduction ═══ -->
    <section class="f22-intro">
      <div class="f22-intro__inner">
        <p class="f22-intro__eyebrow">— Curated with intention</p>
        <h2 class="f22-intro__title">
          Made by hands.<br />
          <em>Worn for years.</em>
        </h2>
        <div class="f22-intro__divider"></div>
        <p class="f22-intro__text">
          FORME은 세 가지 기준으로 옷을 고릅니다. 오래 입을 수 있는 소재,
          시간이 지나도 촌스럽지 않은 디자인, 그리고 정직한 제조. 이 세 가지를
          모두 갖춘 네 브랜드를 큐레이션했습니다.
        </p>
        <p class="f22-intro__sign">— FORME Editorial, Spring 2026</p>
      </div>
    </section>

    <!-- ═══ Brands (지그재그) ═══ -->
    <section class="f22-brands">
      <div class="f22-sec-head">
        <p class="f22-sec-head__eyebrow">— Our Houses</p>
        <h2 class="f22-sec-head__title">Four Chapters of Heritage</h2>
      </div>
      <div class="f22-brands__list">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f22-brand"
          :class="{ 'f22-brand--reverse': i % 2 === 1 }"
        >
          <div class="f22-brand__img">
            <img :src="b.img" :alt="b.name" />
            <div class="f22-brand__hover">
              <span>Explore the story →</span>
            </div>
          </div>
          <div class="f22-brand__text">
            <p class="f22-brand__no">— Chapter {{ roman[i] }} —</p>
            <h3>{{ b.name }}</h3>
            <p class="f22-brand__since">{{ b.since }}</p>
            <p class="f22-brand__desc">{{ b.desc }}</p>
            <span class="f22-brand__cta">Explore the story →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Staff Selection (가로 스크롤) ═══ -->
    <section class="f22-selection">
      <div class="f22-sec-head f22-sec-head--inline">
        <div>
          <p class="f22-sec-head__eyebrow">— This week</p>
          <h2 class="f22-sec-head__title">Staff Selection</h2>
          <p class="f22-selection__sub">에디터가 직접 고른 이번 주의 셀렉션</p>
        </div>
        <div class="f22-selection__nav">
          <button @click="scrollSel(-1)">◁</button>
          <button @click="scrollSel(1)">▷</button>
        </div>
      </div>
      <div class="f22-selection__scroll" ref="selRef">
        <RouterLink
          v-for="(p, i) in picks"
          :key="i"
          :to="`/products/${p.id}`"
          class="f22-pick"
        >
          <div class="f22-pick__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f22-pick__badge">{{ p.tag }}</span>
            <div class="f22-pick__hover">
              <button>QUICK VIEW</button>
            </div>
          </div>
          <p class="f22-pick__brand">— {{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <p class="f22-pick__price">₩ {{ p.price }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Journal ═══ -->
    <section class="f22-journal">
      <div class="f22-sec-head">
        <p class="f22-sec-head__eyebrow">— Journal</p>
        <h2 class="f22-sec-head__title">Stories & Craft</h2>
      </div>
      <div class="f22-journal__grid">
        <article v-for="j in journal" :key="j.title" class="f22-article">
          <div class="f22-article__img"><img :src="j.img" :alt="j.title" /></div>
          <div class="f22-article__info">
            <p class="f22-article__cat">{{ j.cat }}</p>
            <h3>{{ j.title }}</h3>
            <p class="f22-article__excerpt">{{ j.excerpt }}</p>
            <a class="f22-article__link">Read more →</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Quote ═══ -->
    <section class="f22-quote">
      <p class="f22-quote__text">
        "좋은 옷은 좋은 하루를 만듭니다."
      </p>
      <span class="f22-quote__author">— FORME Journal, Spring 2026</span>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f22-newsletter">
      <div class="f22-newsletter__inner">
        <h2>Stay in touch.</h2>
        <p>새 컬렉션과 에세이를 가장 먼저 받아보세요.</p>
        <div class="f22-newsletter__form">
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f22-foot">
      <div class="f22-foot__grid">
        <div class="f22-foot__brand">
          <h3>forme</h3>
          <p><em>A considered wardrobe.</em></p>
          <p class="f22-foot__est">Seoul · Est. 2026</p>
        </div>
        <div class="f22-foot__col">
          <h4>SHOP</h4>
          <RouterLink to="/beanpole">Beanpole</RouterLink>
          <RouterLink to="/carhartt">Carhartt</RouterLink>
          <RouterLink to="/levis">Levi's</RouterLink>
          <RouterLink to="/dickies">Dickies</RouterLink>
          <a>New Arrivals</a>
          <a>Sale</a>
        </div>
        <div class="f22-foot__col">
          <h4>SERVICE</h4>
          <a>Delivery</a>
          <a>Returns</a>
          <a>Size Guide</a>
          <a>Gift Cards</a>
        </div>
        <div class="f22-foot__col">
          <h4>ABOUT</h4>
          <a>Our Story</a>
          <a>Sustainability</a>
          <a>Journal</a>
          <RouterLink to="/faq">FAQ</RouterLink>
          <RouterLink to="/qna">Contact</RouterLink>
        </div>
      </div>
      <div class="f22-foot__bot">
        <span>© 2026 FORME · Seoul, Korea</span>
        <span><em>Made with care.</em></span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const selRef = ref(null);
function scrollSel(dir) {
  if (!selRef.value) return;
  selRef.value.scrollBy({ left: dir * 360, behavior: "smooth" });
}

const roman = ["I", "II", "III", "IV"];

const brands = [
  { id: 1, name: "Beanpole",  since: "Est. 1989, Seoul",         desc: "단정한 한국 클래식. 30년 이상 이어온 헤리티지. 시간을 닮은 옷.",       route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "Carhartt",  since: "Est. 1889, Detroit",       desc: "한 세기 이상 이어온 미국 워크웨어의 정직함. 손끝까지 단단한.",           route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "Levi's",    since: "Est. 1873, San Francisco", desc: "리벳 데님이 탄생한 그 순간부터의 150년. 데님의 원형을 지키는 브랜드.",   route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "Dickies",   since: "Est. 1922, Fort Worth",    desc: "텍사스 작업장에서 시작된 한 세기의 실용주의. 현장에서 일상까지.",          route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const picks = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     price: "159,000", tag: "NEW",      img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", tag: "BEST",     img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",    price: "209,000", tag: "ICONIC",   img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", tag: "CLASSIC",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "Beanpole", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", tag: "SOFT",     img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  tag: "COMFY",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "Carhartt", name: "루즈핏 캔버스 워크 팬츠",   price: "140,000", tag: "RUGGED",   img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "Dickies",  name: "트리 로고 롱슬리브",        price: "69,000",  tag: "COZY",     img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const journal = [
  { cat: "STYLE GUIDE",   title: "봄 데님, 4가지 입는 법",          excerpt: "같은 데님 하나로 사무실부터 주말까지 커버하는 방법을 제안합니다.", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { cat: "CRAFT",          title: "좋은 옷, 어떻게 만드는가",       excerpt: "소재부터 봉제까지. 오래 입는 옷의 조건을 들여다봅니다.",          img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { cat: "BRAND STORY",   title: "1873, 데님의 시작",              excerpt: "리바이 스트라우스가 남긴 것에 대해 이야기합니다.",                img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 22 — Warm Editorial
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f22 {
  background: #f4efe7;
  color: #2a241c;
  font-family: 'Fraunces', 'Noto Serif', Georgia, serif;
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f22-topbar { background: #f4efe7; border-bottom: 1px solid #d4c9b5; }
.f22-topbar__top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 2.5rem;
  background: #2a241c;
  color: #f4efe7;
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  font-family: 'Noto Sans KR', sans-serif;
}
.f22-topbar__link {
  color: #d4c9b5;
  transition: color 0.2s;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.2em;
}
.f22-topbar__link:hover { color: #fff; }
.f22-topbar__main {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 2rem 2.5rem;
}
.f22-topbar__nav-left,
.f22-topbar__nav-right {
  display: flex;
  gap: 2rem;
}
.f22-topbar__nav-right { justify-content: flex-end; }
.f22-topbar__main a {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2a241c;
  cursor: pointer;
}
.f22-topbar__logo {
  font-family: 'Fraunces', serif;
  font-size: 2.75rem;
  font-weight: 300;
  font-style: italic;
  letter-spacing: -0.01em;
  text-align: center;
}
.f22-topbar__cats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding: 1rem 2.5rem;
  border-top: 1px solid rgba(212, 201, 181, 0.5);
}
.f22-topbar__cats a {
  font-family: 'Fraunces', serif;
  font-size: 0.9375rem;
  color: #2a241c;
  cursor: pointer;
  transition: color 0.2s;
}
.f22-topbar__cats a:hover { color: #8b7340; }
.f22-topbar__sale {
  color: #8b2322 !important;
  font-style: italic;
}

/* ── Hero ── */
.f22-hero {
  position: relative;
  height: 70vh;
  overflow: hidden;
}
.f22-hero__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.82) saturate(0.9);
}
.f22-hero__text {
  position: absolute;
  bottom: 5rem;
  left: 5rem;
  color: #fff;
  max-width: 30rem;
}
.f22-hero__tag {
  font-size: 0.8125rem;
  font-style: italic;
  letter-spacing: 0.2em;
  margin-bottom: 1.25rem;
  opacity: 0.9;
}
.f22-hero__title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 300;
  line-height: 0.95;
  margin-bottom: 1.75rem;
}
.f22-hero__title em {
  font-style: italic;
  font-weight: 400;
}
.f22-hero__desc {
  font-size: 1.0625rem;
  font-style: italic;
  margin-bottom: 2.5rem;
  opacity: 0.9;
  line-height: 1.7;
}
.f22-hero__cta {
  display: inline-block;
  padding: 1.125rem 2.5rem;
  background: #f4efe7;
  color: #2a241c;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: all 0.3s;
}
.f22-hero__cta:hover {
  background: #2a241c;
  color: #f4efe7;
}

/* ── Section Head ── */
.f22-sec-head {
  text-align: center;
  padding: 0 3rem;
  margin-bottom: 4rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
.f22-sec-head--inline {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f22-sec-head__eyebrow {
  font-size: 0.8125rem;
  font-style: italic;
  color: #8b7340;
  letter-spacing: 0.15em;
  margin-bottom: 0.75rem;
}
.f22-sec-head__title {
  font-size: clamp(2.25rem, 4.5vw, 3.5rem);
  font-weight: 300;
  line-height: 1.1;
}

/* ── Introduction ── */
.f22-intro {
  padding: 8rem 3rem 6rem;
  text-align: center;
}
.f22-intro__inner {
  max-width: 46rem;
  margin: 0 auto;
}
.f22-intro__eyebrow {
  font-size: 0.8125rem;
  font-style: italic;
  color: #8b7340;
  letter-spacing: 0.15em;
  margin-bottom: 1.5rem;
}
.f22-intro__title {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 300;
  line-height: 1.1;
  margin-bottom: 2rem;
}
.f22-intro__title em {
  font-style: italic;
  font-weight: 400;
  color: #8b7340;
}
.f22-intro__divider {
  width: 4rem;
  height: 1px;
  background: #2a241c;
  margin: 0 auto 2rem;
}
.f22-intro__text {
  font-size: 1rem;
  line-height: 2;
  color: #5a5040;
  margin-bottom: 2rem;
}
.f22-intro__sign {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #8b7340;
}

/* ── Brands (지그재그) ── */
.f22-brands {
  padding: 6rem 3rem;
}
.f22-brands__list {
  max-width: 1200px;
  margin: 0 auto;
}
.f22-brand {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5rem;
  align-items: center;
  padding: 5rem 0;
  border-bottom: 1px solid rgba(212, 201, 181, 0.5);
  color: inherit;
}
.f22-brand:last-child { border-bottom: none; }
.f22-brand--reverse .f22-brand__img { order: 2; }
.f22-brand__img {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
}
.f22-brand__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85);
  transition: transform 0.8s;
}
.f22-brand:hover .f22-brand__img img { transform: scale(1.03); }
.f22-brand__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 36, 28, 0.25);
  color: #f4efe7;
  font-style: italic;
  font-size: 1rem;
  letter-spacing: 0.1em;
  opacity: 0;
  transition: opacity 0.5s;
}
.f22-brand:hover .f22-brand__hover { opacity: 1; }
.f22-brand__no {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #8b7340;
  margin-bottom: 1.25rem;
}
.f22-brand__text h3 {
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 300;
  margin-bottom: 0.625rem;
  line-height: 1;
}
.f22-brand__since {
  font-size: 0.875rem;
  font-style: italic;
  color: #8b7340;
  margin-bottom: 1.5rem;
}
.f22-brand__desc {
  font-size: 1rem;
  line-height: 1.9;
  color: #5a5040;
  margin-bottom: 2rem;
}
.f22-brand__cta {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  color: #2a241c;
  border-bottom: 1px solid #2a241c;
  padding-bottom: 3px;
}

/* ── Staff Selection (가로 스크롤) ── */
.f22-selection {
  padding: 6rem 0;
  background: #ede5d3;
}
.f22-selection__sub {
  font-size: 0.9375rem;
  color: #5a5040;
  margin-top: 0.75rem;
  font-style: italic;
}
.f22-selection__nav { display: flex; gap: 0.5rem; }
.f22-selection__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: #f4efe7;
  border: 1px solid #d4c9b5;
  color: #2a241c;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f22-selection__nav button:hover {
  background: #2a241c;
  color: #f4efe7;
  border-color: #2a241c;
}
.f22-selection__scroll {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 1rem 3rem;
}
.f22-selection__scroll::-webkit-scrollbar { display: none; }

.f22-pick {
  flex: 0 0 300px;
  scroll-snap-align: start;
  color: inherit;
  cursor: pointer;
}
.f22-pick__img {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 1rem;
  background: #f4efe7;
}
.f22-pick__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85);
  transition: transform 0.6s;
}
.f22-pick:hover .f22-pick__img img { transform: scale(1.04); }
.f22-pick__badge {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #2a241c;
  color: #f4efe7;
  padding: 0.375rem 0.75rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.5625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
}
.f22-pick__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: rgba(42, 36, 28, 0.6);
  opacity: 0;
  transition: opacity 0.3s;
}
.f22-pick:hover .f22-pick__hover { opacity: 1; }
.f22-pick__hover button {
  width: 100%;
  padding: 0.625rem;
  background: #f4efe7;
  border: none;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  cursor: pointer;
}
.f22-pick__brand {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.1em;
  color: #8b7340;
  margin-bottom: 0.375rem;
}
.f22-pick h3 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f22-pick__price {
  font-size: 0.9375rem;
  color: #2a241c;
  font-weight: 500;
}

/* ── Journal ── */
.f22-journal {
  padding: 8rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.f22-journal__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}
.f22-article {
  cursor: pointer;
  color: inherit;
}
.f22-article__img {
  aspect-ratio: 4/3;
  overflow: hidden;
  margin-bottom: 1.25rem;
}
.f22-article__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(0.85);
  transition: transform 0.6s;
}
.f22-article:hover .f22-article__img img { transform: scale(1.04); }
.f22-article__cat {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #8b7340;
  margin-bottom: 0.75rem;
}
.f22-article h3 {
  font-size: 1.375rem;
  font-weight: 400;
  line-height: 1.25;
  margin-bottom: 0.875rem;
}
.f22-article__excerpt {
  font-size: 0.875rem;
  color: #5a5040;
  line-height: 1.7;
  margin-bottom: 1rem;
  font-style: italic;
}
.f22-article__link {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.75rem;
  font-style: italic;
  color: #2a241c;
  border-bottom: 1px solid #2a241c;
  padding-bottom: 2px;
  cursor: pointer;
}

/* ── Quote ── */
.f22-quote {
  padding: 8rem 3rem;
  background: #ede5d3;
  text-align: center;
}
.f22-quote__text {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 300;
  font-style: italic;
  line-height: 1.3;
  color: #2a241c;
  max-width: 40rem;
  margin: 0 auto 2rem;
}
.f22-quote__author {
  font-size: 0.8125rem;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #8b7340;
}

/* ── Newsletter ── */
.f22-newsletter {
  padding: 6rem 3rem;
  background: #2a241c;
  color: #f4efe7;
  text-align: center;
}
.f22-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f22-newsletter h2 {
  font-size: 2.25rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 0.75rem;
}
.f22-newsletter p {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 2.5rem;
  opacity: 0.8;
}
.f22-newsletter__form {
  display: flex;
  border-bottom: 1px solid #8b7340;
}
.f22-newsletter__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem 0;
  color: #f4efe7;
  font-family: inherit;
  font-size: 1rem;
  font-style: italic;
  outline: none;
}
.f22-newsletter__form input::placeholder { color: rgba(244, 239, 231, 0.4); }
.f22-newsletter__form button {
  background: transparent;
  border: none;
  color: #f4efe7;
  font-family: inherit;
  font-size: 0.875rem;
  font-style: italic;
  letter-spacing: 0.15em;
  cursor: pointer;
  padding: 0 1rem;
}

/* ── Footer ── */
.f22-foot {
  padding: 4rem 3rem 2rem;
  background: #ede5d3;
}
.f22-foot__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #d4c9b5;
}
.f22-foot__brand h3 {
  font-family: 'Fraunces', serif;
  font-size: 2.5rem;
  font-weight: 300;
  font-style: italic;
  margin-bottom: 0.5rem;
}
.f22-foot__brand p em {
  font-size: 0.9375rem;
  color: #8b7340;
}
.f22-foot__est {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem !important;
  letter-spacing: 0.2em;
  color: #8b7340 !important;
  margin-top: 0.75rem;
  font-style: normal;
}
.f22-foot__col h4 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 0.875rem;
  color: #2a241c;
}
.f22-foot__col a {
  display: block;
  font-size: 0.875rem;
  color: #5a5040;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.f22-foot__col a:hover { color: #8b7340; }
.f22-foot__bot {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.75rem;
  color: #8b7340;
}
.f22-foot__bot em { font-style: italic; }
</style>
