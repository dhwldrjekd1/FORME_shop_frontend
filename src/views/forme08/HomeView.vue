<template>
  <main class="f08-home">
    <!-- 자체 헤더 -->
    <header class="f08-topbar">
      <div class="f08-topbar__left">
        <span class="f08-topbar__code">SYS // 08</span>
        <RouterLink to="/forme" class="f08-topbar__back">◁ PICKER</RouterLink>
      </div>
      <div class="f08-topbar__center">
        <span class="f08-topbar__logo">FORME</span>
        <span class="f08-topbar__tag">STREET LEGENDS</span>
      </div>
      <div class="f08-topbar__right">
        <span class="f08-topbar__status">◉ LIVE</span>
        <span class="f08-topbar__date">SS26 · DROP.01</span>
      </div>
    </header>

    <!-- Hero -->
    <section class="f08-hero">
      <img
        src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
        alt="hero"
        class="f08-hero__bg"
      />
      <div class="f08-hero__noise"></div>
      <div class="f08-hero__grid-overlay"></div>
      <div class="f08-hero__text">
        <div class="f08-hero__meta-row">
          <span class="f08-hero__date">SS26 / DROP.01 / 04.09</span>
          <span class="f08-hero__bar"></span>
          <span class="f08-hero__meta">48 OBJECTS</span>
        </div>
        <h1 class="f08-hero__title">FORME</h1>
        <p class="f08-hero__kicker">// STREET LEGENDS</p>
        <p class="f08-hero__desc">
          From the pavement to the runway.<br />
          Four houses that built street style.
        </p>
        <div class="f08-hero__cta-group">
          <RouterLink to="/products" class="f08-hero__cta">► ENTER THE DROP</RouterLink>
          <RouterLink to="/login" class="f08-hero__link">[ JOIN CLUB ]</RouterLink>
        </div>
      </div>
      <div class="f08-hero__corner f08-hero__corner--tl">FORME · SS26</div>
      <div class="f08-hero__corner f08-hero__corner--tr">NO. 08 / 10</div>
      <div class="f08-hero__corner f08-hero__corner--bl">SEOUL · KR · 37.5665° N</div>
      <div class="f08-hero__corner f08-hero__corner--br">ALL SYSTEMS NOMINAL</div>
    </section>

    <!-- 카운트다운 / 스트립 -->
    <section class="f08-strip">
      <div class="f08-strip__item">
        <span class="f08-strip__label">NEXT DROP</span>
        <span class="f08-strip__value">04.16 / 11:00 KST</span>
      </div>
      <div class="f08-strip__item">
        <span class="f08-strip__label">LIVE NOW</span>
        <span class="f08-strip__value f08-strip__value--red">◉ 12 PIECES</span>
      </div>
      <div class="f08-strip__item">
        <span class="f08-strip__label">MEMBERS</span>
        <span class="f08-strip__value">1,248 ACTIVE</span>
      </div>
      <div class="f08-strip__item">
        <span class="f08-strip__label">STATUS</span>
        <span class="f08-strip__value">◆ NOMINAL</span>
      </div>
    </section>

    <!-- 브랜드: 가로 스크롤 룩북 -->
    <section class="f08-lookbook">
      <header class="f08-sec-head">
        <div>
          <p class="f08-sec-head__code">[ 01 / CHAPTERS ]</p>
          <h2 class="f08-sec-head__title">// THE HOUSES</h2>
        </div>
        <div class="f08-lookbook__nav">
          <button @click="scrollLook(-1)" aria-label="prev">◁</button>
          <button @click="scrollLook(1)" aria-label="next">▷</button>
        </div>
      </header>

      <div class="f08-lookbook__scroll" ref="lookRef">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f08-look"
        >
          <div class="f08-look__img-wrap">
            <img :src="b.image" :alt="b.title" />
            <div class="f08-look__scanline"></div>
            <div class="f08-look__overlay">
              <div class="f08-look__overlay-top">
                <span class="f08-look__no">0{{ i + 1 }} / 04</span>
                <span class="f08-look__year">EST. {{ b.year }}</span>
              </div>
              <div class="f08-look__overlay-bottom">
                <h3>{{ b.title }}</h3>
                <p>{{ b.tag }}</p>
                <div class="f08-look__coord">{{ b.coord }}</div>
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 드롭 (상품) -->
    <section class="f08-drops">
      <header class="f08-sec-head">
        <div>
          <p class="f08-sec-head__code">[ 02 / INVENTORY ]</p>
          <h2 class="f08-sec-head__title">// FRESH DROPS</h2>
        </div>
        <div class="f08-drops__filter">
          <button
            v-for="f in filterTabs"
            :key="f"
            class="f08-drops__tab"
            :class="{ 'f08-drops__tab--active': activeFilter === f }"
            @click="activeFilter = f"
          >{{ f }}</button>
        </div>
      </header>
      <div class="f08-drops__grid">
        <RouterLink
          v-for="(p, i) in products.slice(0, 9)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f08-drop"
        >
          <div class="f08-drop__img-wrap">
            <img :src="p.image" :alt="p.name" />
            <div class="f08-drop__hover">
              <span>ENTER</span>
            </div>
            <div class="f08-drop__tag">SS26 DROP</div>
            <div class="f08-drop__code">#{{ String(i + 1).padStart(3, '0') }}</div>
          </div>
          <div class="f08-drop__info">
            <div class="f08-drop__meta">
              <span class="f08-drop__brand">{{ getBrandName(p.id) }}</span>
              <span class="f08-drop__stock">◉ IN STOCK</span>
            </div>
            <h3>{{ p.name }}</h3>
            <div class="f08-drop__bottom">
              <p class="f08-drop__price">₩ {{ fmt(p.price) }}</p>
              <span class="f08-drop__arrow">→</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 매니페스토 -->
    <section class="f08-manifesto">
      <div class="f08-manifesto__top">
        <span>[ 03 / MANIFESTO ]</span>
        <span>// 2026</span>
      </div>
      <div class="f08-manifesto__lines">
        <p>WE DON'T</p>
        <p class="f08-manifesto__red">FOLLOW.</p>
        <p>WE</p>
        <p class="f08-manifesto__red">DEFINE.</p>
      </div>
      <div class="f08-manifesto__note">
        <p>
          Four legacy houses. One collective voice.<br />
          Built on the pavement, adopted by the world.
        </p>
        <p class="f08-manifesto__sign">— FORME STREET DIVISION, SEOUL 2026</p>
      </div>
    </section>

    <!-- 타임라인 -->
    <section class="f08-timeline">
      <header class="f08-sec-head f08-sec-head--center">
        <p class="f08-sec-head__code">[ 04 / HISTORY ]</p>
        <h2 class="f08-sec-head__title">// LEGACY TIMELINE</h2>
      </header>
      <div class="f08-timeline__track">
        <div
          v-for="(e, i) in timeline"
          :key="i"
          class="f08-tl-item"
          :class="{ 'f08-tl-item--right': i % 2 === 1 }"
        >
          <div class="f08-tl-item__dot"></div>
          <div class="f08-tl-item__year">{{ e.year }}</div>
          <div class="f08-tl-item__content">
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 뉴스레터 -->
    <section class="f08-subscribe">
      <div class="f08-subscribe__inner">
        <p class="f08-subscribe__code">[ 05 / TRANSMISSION ]</p>
        <h2 class="f08-subscribe__title">JOIN<br />THE SIGNAL.</h2>
        <p class="f08-subscribe__desc">
          드롭 알림 · 멤버 전용 오퍼 · 얼리 액세스.<br />
          가장 먼저 받는 사람들의 리스트에 이름을 올리세요.
        </p>
        <form class="f08-subscribe__form" @submit.prevent>
          <input type="email" placeholder="ENTER_EMAIL@" />
          <button type="submit">TRANSMIT →</button>
        </form>
      </div>
    </section>

    <!-- 자체 푸터 -->
    <footer class="f08-foot">
      <div class="f08-foot__top">
        <div class="f08-foot__logo-block">
          <p class="f08-foot__brand">FORME</p>
          <p class="f08-foot__sub">/ STREET LEGENDS SINCE 2026</p>
          <p class="f08-foot__coord">SEOUL · KR · 37.5665° N, 126.9780° E</p>
        </div>
        <div class="f08-foot__grid">
          <div class="f08-foot__col">
            <p class="f08-foot__label">[ CHAPTERS ]</p>
            <RouterLink to="/beanpole">/01_BEANPOLE</RouterLink>
            <RouterLink to="/carhartt">/02_CARHARTT</RouterLink>
            <RouterLink to="/levis">/03_LEVIS</RouterLink>
            <RouterLink to="/dickies">/04_DICKIES</RouterLink>
          </div>
          <div class="f08-foot__col">
            <p class="f08-foot__label">[ SYSTEM ]</p>
            <RouterLink to="/products">/ALL_OBJECTS</RouterLink>
            <RouterLink to="/cart">/CART</RouterLink>
            <RouterLink to="/mypage">/MY_PAGE</RouterLink>
            <RouterLink to="/login">/CLUB_ACCESS</RouterLink>
          </div>
          <div class="f08-foot__col">
            <p class="f08-foot__label">[ SIGNAL ]</p>
            <RouterLink to="/faq">/FAQ</RouterLink>
            <RouterLink to="/qna">/QNA</RouterLink>
            <p>/DROP@FORME.KR</p>
          </div>
        </div>
      </div>
      <div class="f08-foot__ticker">
        <span v-for="i in 8" :key="i">
          ◆ NEXT DROP 04.16 · 11:00 KST ◆ MEMBERS ONLY ◆ STAY HYPED ◆
        </span>
      </div>
      <div class="f08-foot__bottom">
        <span>© 2026 FORME / STREET DIVISION</span>
        <span>[ VER.1.0.8 ]</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
const fmt = (p) => p ? p.toLocaleString() : "";
const getBrandName = (id) => {
  if (id >= 100 && id < 200) return "CARHARTT";
  if (id >= 200 && id < 300) return "LEVI'S";
  if (id >= 300 && id < 400) return "DICKIES";
  if (id >= 400 && id < 500) return "BEANPOLE";
  return "FORME";
};
const lookRef = ref(null);
function scrollLook(dir) {
  if (!lookRef.value) return;
  lookRef.value.scrollBy({ left: dir * 480, behavior: "smooth" });
}
const filterTabs = ["ALL", "NEW", "HYPE", "CORE"];
const activeFilter = ref("ALL");

const brandPanels = [
  { id: 1, title: "BEANPOLE", year: "1989", tag: "HERITAGE SINCE '89",  coord: "SEOUL · KR",          route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "CARHARTT", year: "1889", tag: "BUILT TOUGH '89",      coord: "DETROIT · US",        route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "LEVI'S",   year: "1873", tag: "DENIM ICON SINCE '73", coord: "SAN FRANCISCO · US",  route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "DICKIES",  year: "1922", tag: "WORK HARD SINCE '22",  coord: "FORT WORTH · TX",     route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const timeline = [
  { year: "1873", title: "LEVI'S INCORPORATED",    desc: "최초의 리벳 데님 특허 출원. 데님이 작업복에서 문화로 진화하는 출발점." },
  { year: "1889", title: "CARHARTT FOUNDED",       desc: "디트로이트 철도 노동자들을 위한 진정한 워크웨어 탄생." },
  { year: "1922", title: "DICKIES OPENS",          desc: "텍사스 포트워스에서 오버롤 제조 시작. 한 세기 워크웨어의 기준이 됨." },
  { year: "1989", title: "BEANPOLE LAUNCHED",      desc: "서울에서 시작된 한국형 헤리티지. 클래식과 모던의 균형을 탐구." },
  { year: "2026", title: "FORME CURATION",         desc: "네 개의 전설을 한자리에. 스트릿 디비전이 시작됩니다." },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 08 — Street Lookbook
   ════════════════════════════════ */
.f08-home {
  background: #0e0e0e;
  color: #f5f5f5;
  font-family: var(--font-body);
  min-height: 100dvh;
}

/* ── 자체 상단바 ── */
.f08-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(14, 14, 14, 0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid #FF3B3B;
  border-bottom: 1px solid #222;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f08-topbar__left {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.f08-topbar__code {
  color: #FF3B3B;
  border: 1px solid #FF3B3B;
  padding: 0.375rem 0.5rem;
}
.f08-topbar__back {
  color: #bbb;
  transition: color 0.2s;
}
.f08-topbar__back:hover { color: #FF3B3B; }
.f08-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.875rem;
}
.f08-topbar__logo {
  font-family: "Anton", sans-serif;
  font-size: 1.375rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: #fff;
}
.f08-topbar__tag { color: #888; }
.f08-topbar__right {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
}
.f08-topbar__status { color: #5bff5b; }
.f08-topbar__date { color: #FF3B3B; }

/* ── Hero ── */
.f08-hero {
  position: relative;
  min-height: calc(100dvh - 48px);
  overflow: hidden;
}
.f08-hero__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: contrast(1.25) grayscale(0.5) brightness(0.75);
}
.f08-hero__noise {
  position: absolute;
  inset: 0;
  background-image:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 3px),
    radial-gradient(circle, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%);
  mix-blend-mode: overlay;
  pointer-events: none;
}
.f08-hero__grid-overlay {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,59,59,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,59,59,0.06) 1px, transparent 1px);
  background-size: 80px 80px;
  pointer-events: none;
}
.f08-hero__text {
  position: absolute;
  left: 4rem;
  bottom: 5rem;
  color: #fff;
  max-width: 46rem;
  z-index: 2;
}
.f08-hero__meta-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
}
.f08-hero__date { color: #FF3B3B; }
.f08-hero__bar {
  width: 3rem;
  height: 1px;
  background: #fff;
  opacity: 0.5;
}
.f08-hero__meta { color: #fff; opacity: 0.7; }
.f08-hero__title {
  font-family: "Anton", sans-serif;
  font-size: clamp(5rem, 15vw, 12rem);
  font-weight: 400;
  line-height: 0.85;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
}
.f08-hero__kicker {
  font-family: monospace;
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF3B3B;
  margin-bottom: 2rem;
}
.f08-hero__desc {
  font-size: 0.9375rem;
  line-height: 1.7;
  opacity: 0.85;
  margin-bottom: 2.5rem;
  font-family: monospace;
}
.f08-hero__cta-group {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.f08-hero__cta {
  display: inline-block;
  background: #FF3B3B;
  color: #fff;
  padding: 1.125rem 2.5rem;
  font-family: monospace;
  font-size: 0.8125rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  border: 2px solid #FF3B3B;
  transition: background 0.2s, color 0.2s;
}
.f08-hero__cta:hover { background: transparent; color: #FF3B3B; }
.f08-hero__link {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #bbb;
  transition: color 0.2s;
}
.f08-hero__link:hover { color: #fff; }

.f08-hero__corner {
  position: absolute;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: rgba(255,255,255,0.6);
  padding: 1rem 2rem;
  background: rgba(0,0,0,0.45);
  backdrop-filter: blur(4px);
  z-index: 3;
}
.f08-hero__corner--tl { top: 0; left: 0; border-right: 1px solid #222; border-bottom: 1px solid #222; }
.f08-hero__corner--tr { top: 0; right: 0; border-left: 1px solid #222; border-bottom: 1px solid #222; }
.f08-hero__corner--bl { bottom: 0; left: 0; border-right: 1px solid #222; border-top: 1px solid #222; color: #FF3B3B; }
.f08-hero__corner--br { bottom: 0; right: 0; border-left: 1px solid #222; border-top: 1px solid #222; color: #5bff5b; }

/* ── Strip ── */
.f08-strip {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid #FF3B3B;
  border-bottom: 1px solid #222;
  background: #0a0a0a;
}
@media (min-width: 768px) { .f08-strip { grid-template-columns: repeat(4, 1fr); } }
.f08-strip__item {
  padding: 2rem;
  border-right: 1px solid #222;
  font-family: monospace;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.f08-strip__item:last-child { border-right: none; }
.f08-strip__label {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #888;
}
.f08-strip__value {
  font-size: 0.9375rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #f5f5f5;
}
.f08-strip__value--red { color: #FF3B3B; }

/* ── 섹션 헤드 공통 ── */
.f08-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 4rem 4rem 2.5rem;
  max-width: 1600px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f08-sec-head--center {
  justify-content: center;
  text-align: center;
}
.f08-sec-head__code {
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF3B3B;
  margin-bottom: 0.625rem;
}
.f08-sec-head__title {
  font-family: monospace;
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  color: #f5f5f5;
  text-transform: uppercase;
}

/* ── Lookbook ── */
.f08-lookbook { border-top: 1px solid #222; }
.f08-lookbook__nav {
  display: flex;
  gap: 0.5rem;
}
.f08-lookbook__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid #444;
  color: #f5f5f5;
  cursor: pointer;
  font-family: monospace;
  font-size: 1rem;
  transition: background 0.2s, border-color 0.2s, color 0.2s;
}
.f08-lookbook__nav button:hover {
  background: #FF3B3B;
  border-color: #FF3B3B;
}
.f08-lookbook__scroll {
  display: flex;
  gap: 1px;
  overflow-x: auto;
  padding: 0 4rem 5rem;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}
.f08-lookbook__scroll::-webkit-scrollbar { display: none; }

.f08-look {
  flex: 0 0 88%;
  scroll-snap-align: start;
  cursor: pointer;
}
@media (min-width: 768px)  { .f08-look { flex: 0 0 46%; } }
@media (min-width: 1200px) { .f08-look { flex: 0 0 32%; } }

.f08-look__img-wrap {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  border: 1px solid #222;
}
.f08-look__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.25);
  transition: transform 0.7s, filter 0.5s;
}
.f08-look:hover .f08-look__img-wrap img {
  transform: scale(1.05);
  filter: grayscale(0) contrast(1.1);
}
.f08-look__scanline {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, rgba(255, 59, 59, 0.08) 0 1px, transparent 1px 4px);
  pointer-events: none;
  opacity: 0.5;
  transition: opacity 0.3s;
}
.f08-look:hover .f08-look__scanline { opacity: 0; }
.f08-look__overlay {
  position: absolute;
  inset: 0;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.9) 100%);
  color: #fff;
}
.f08-look__overlay-top {
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f08-look__no { color: #FF3B3B; }
.f08-look__year { opacity: 0.8; }
.f08-look__overlay-bottom h3 {
  font-family: "Anton", sans-serif;
  font-size: clamp(2rem, 3.5vw, 3rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  line-height: 0.9;
  margin-bottom: 0.5rem;
}
.f08-look__overlay-bottom p {
  font-family: monospace;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: #FF3B3B;
  font-weight: 700;
  margin-bottom: 0.5rem;
}
.f08-look__coord {
  font-family: monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: rgba(255,255,255,0.5);
}

/* ── Drops ── */
.f08-drops { border-top: 1px solid #222; padding-bottom: 4rem; }
.f08-drops__filter {
  display: flex;
  gap: 0;
}
.f08-drops__tab {
  background: transparent;
  border: 1px solid #444;
  margin-left: -1px;
  color: #bbb;
  padding: 0.625rem 1.25rem;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.f08-drops__tab--active {
  background: #FF3B3B;
  color: #fff;
  border-color: #FF3B3B;
}
.f08-drops__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1px;
  padding: 0 4rem 4rem;
  background: #222;
  max-width: 1600px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f08-drops__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f08-drops__grid { grid-template-columns: repeat(3, 1fr); } }

.f08-drop {
  background: #151515;
  cursor: pointer;
  transition: background 0.2s;
}
.f08-drop:hover { background: #1a1a1a; }
.f08-drop__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  overflow: hidden;
  background: #0a0a0a;
}
.f08-drop__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.6) contrast(1.1);
  transition: filter 0.5s, transform 0.5s;
}
.f08-drop:hover .f08-drop__img-wrap img {
  filter: grayscale(0);
  transform: scale(1.05);
}
.f08-drop__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 59, 59, 0.15);
  opacity: 0;
  transition: opacity 0.3s;
  font-family: monospace;
  font-size: 0.875rem;
  font-weight: 900;
  letter-spacing: 0.3em;
  color: #fff;
}
.f08-drop:hover .f08-drop__hover { opacity: 1; }
.f08-drop__tag {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #FF3B3B;
  color: #fff;
  padding: 0.375rem 0.75rem;
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f08-drop__code {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  padding: 0.375rem 0.625rem;
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  color: #fff;
  letter-spacing: 0.15em;
}
.f08-drop__info { padding: 1.5rem; }
.f08-drop__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}
.f08-drop__brand {
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FF3B3B;
}
.f08-drop__stock {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  color: #5bff5b;
}
.f08-drop__info h3 {
  font-size: 0.9375rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.4;
}
.f08-drop__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.875rem;
  border-top: 1px solid #333;
}
.f08-drop__price {
  font-family: monospace;
  font-size: 1rem;
  font-weight: 700;
}
.f08-drop__arrow {
  color: #FF3B3B;
  font-size: 1.25rem;
  transition: transform 0.3s;
}
.f08-drop:hover .f08-drop__arrow { transform: translateX(4px); }

/* ── Manifesto ── */
.f08-manifesto {
  padding: 8rem 4rem;
  border-top: 1px solid #222;
  background: #0a0a0a;
  position: relative;
}
.f08-manifesto__top {
  display: flex;
  justify-content: space-between;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF3B3B;
  max-width: 1200px;
  margin: 0 auto 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #222;
}
.f08-manifesto__lines {
  max-width: 1200px;
  margin: 0 auto 3rem;
}
.f08-manifesto__lines p {
  font-family: "Anton", sans-serif;
  font-size: clamp(3.5rem, 11vw, 9rem);
  font-weight: 400;
  line-height: 0.85;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: transparent;
  -webkit-text-stroke: 1.5px #f5f5f5;
  margin-bottom: 0.5rem;
}
.f08-manifesto__red {
  color: #FF3B3B !important;
  -webkit-text-stroke: 0 !important;
  padding-left: 4rem;
}
.f08-manifesto__note {
  max-width: 1200px;
  margin: 3rem auto 0;
  padding-top: 2rem;
  border-top: 1px solid #222;
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  color: #bbb;
}
.f08-manifesto__sign {
  margin-top: 1rem;
  color: #FF3B3B !important;
  font-size: 0.6875rem !important;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* ── Timeline ── */
.f08-timeline {
  padding: 4rem 0 8rem;
  border-top: 1px solid #222;
}
.f08-timeline__track {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 4rem;
  position: relative;
}
.f08-timeline__track::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 0;
  bottom: 0;
  width: 1px;
  background: #333;
  transform: translateX(-0.5px);
}
.f08-tl-item {
  position: relative;
  padding: 1.5rem 0 1.5rem 50%;
  margin-bottom: 3rem;
}
.f08-tl-item--right {
  padding: 1.5rem 50% 1.5rem 0;
  text-align: right;
}
.f08-tl-item__dot {
  position: absolute;
  left: 50%;
  top: 2rem;
  width: 12px;
  height: 12px;
  background: #FF3B3B;
  border-radius: 50%;
  transform: translateX(-50%);
  border: 2px solid #0e0e0e;
}
.f08-tl-item__year {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FF3B3B;
  margin-bottom: 0.5rem;
  padding-left: 2rem;
}
.f08-tl-item--right .f08-tl-item__year { padding-left: 0; padding-right: 2rem; }
.f08-tl-item__content {
  padding-left: 2rem;
}
.f08-tl-item--right .f08-tl-item__content { padding-left: 0; padding-right: 2rem; }
.f08-tl-item__content h3 {
  font-family: "Anton", sans-serif;
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 0.625rem;
}
.f08-tl-item__content p {
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #999;
  font-family: monospace;
}

/* ── Subscribe ── */
.f08-subscribe {
  background: #FF3B3B;
  color: #0e0e0e;
  padding: 7rem 4rem;
  text-align: center;
  border-top: 1px solid #FF3B3B;
}
.f08-subscribe__inner { max-width: 40rem; margin: 0 auto; }
.f08-subscribe__code {
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  margin-bottom: 1.25rem;
}
.f08-subscribe__title {
  font-family: "Anton", sans-serif;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  line-height: 0.9;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
}
.f08-subscribe__desc {
  font-family: monospace;
  font-size: 0.875rem;
  line-height: 1.8;
  margin-bottom: 2.5rem;
  font-weight: 500;
}
.f08-subscribe__form {
  display: flex;
  border: 2px solid #0e0e0e;
  background: #fff;
}
.f08-subscribe__form input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 1.125rem 1.25rem;
  font-family: monospace;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  outline: none;
}
.f08-subscribe__form button {
  background: #0e0e0e;
  color: #FF3B3B;
  border: none;
  padding: 0 1.75rem;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background 0.2s;
}
.f08-subscribe__form button:hover { background: #222; }

/* ── Footer ── */
.f08-foot {
  background: #050505;
  color: #f5f5f5;
  border-top: 1px solid #FF3B3B;
}
.f08-foot__top {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  padding: 5rem 4rem 3rem;
  max-width: 1600px;
  margin: 0 auto;
  border-bottom: 1px solid #222;
}
@media (min-width: 1024px) { .f08-foot__top { grid-template-columns: 1fr 2fr; } }
.f08-foot__brand {
  font-family: "Anton", sans-serif;
  font-size: 3rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
}
.f08-foot__sub {
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #FF3B3B;
  margin-bottom: 1.5rem;
}
.f08-foot__coord {
  font-family: monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #666;
}
.f08-foot__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
}
@media (min-width: 640px) { .f08-foot__grid { grid-template-columns: repeat(3, 1fr); } }
.f08-foot__col {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.f08-foot__label {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF3B3B;
  margin-bottom: 0.5rem;
}
.f08-foot__col a,
.f08-foot__col p {
  font-family: monospace;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #bbb;
  transition: color 0.2s;
}
.f08-foot__col a:hover { color: #FF3B3B; }

.f08-foot__ticker {
  background: #FF3B3B;
  color: #0e0e0e;
  padding: 0.75rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-family: monospace;
  font-size: 0.75rem;
  font-weight: 900;
  letter-spacing: 0.15em;
}
.f08-foot__ticker span {
  display: inline-block;
  padding-right: 2rem;
}

.f08-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 4rem;
  font-family: monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #666;
  flex-wrap: wrap;
  gap: 0.75rem;
  max-width: 1600px;
  margin: 0 auto;
}
</style>
