<template>
  <main class="f20">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f20-topbar">
      <RouterLink to="/forme" class="f20-topbar__link">◁ picker</RouterLink>
      <div class="f20-topbar__center">
        <span class="f20-topbar__flower">✿</span>
        <span class="f20-topbar__logo">forme</span>
        <span class="f20-topbar__sub">— a small atelier ~</span>
      </div>
      <RouterLink to="/" class="f20-topbar__link">home ▷</RouterLink>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f20-hero">
      <div class="f20-hero__paper">
        <div class="f20-hero__tape f20-hero__tape--left"></div>
        <div class="f20-hero__tape f20-hero__tape--right"></div>
        <p class="f20-hero__hand">— Handmade with care ~</p>
        <div class="f20-hero__ornament">✦ · ✦ · ✦</div>
        <h1 class="f20-hero__title">forme</h1>
        <p class="f20-hero__sub">a small atelier, est. 2026 ✿</p>
        <div class="f20-hero__divider">~ · ~ · ~ · ~ · ~</div>
        <p class="f20-hero__desc">
          손으로 그린 작은 옷장.<br />
          천천히 고르고, 오래 입는 마음으로.
        </p>
        <div class="f20-hero__meta">
          <span>4 friends</span>
          <span>·</span>
          <span>24 things</span>
          <span>·</span>
          <span>est. 2026</span>
        </div>
        <RouterLink to="/products" class="f20-hero__cta">↝ see the shop</RouterLink>
      </div>
    </section>

    <!-- ═══ 소개 편지 ═══ -->
    <section class="f20-intro">
      <div class="f20-intro__paper">
        <p class="f20-intro__label">— a little note from us ✿</p>
        <p class="f20-intro__text">
          안녕하세요, forme 에요.<br /><br />
          이곳은 큰 쇼핑몰이 아니에요.<br />
          하나하나 고르고, 직접 입어보고,<br />
          오래 입을 수 있는 것만 골라서 소개해요.<br /><br />
          네 개의 브랜드와 함께 만드는<br />
          작은 옷장을 구경해보세요.
        </p>
        <p class="f20-intro__sign">— forme, with love ♡</p>
      </div>
    </section>

    <!-- ═══ 브랜드 (폴라로이드) ═══ -->
    <section class="f20-brands">
      <h2 class="f20-h">・ the four friends ・</h2>
      <p class="f20-h-sub">네 브랜드를 소개할게요</p>
      <div class="f20-brands__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f20-brand"
        >
          <div class="f20-brand__sticker">{{ flowers[i] }}</div>
          <div class="f20-brand__polaroid">
            <img :src="b.img" :alt="b.name" />
            <p class="f20-brand__caption">— {{ b.name }} —</p>
          </div>
          <p class="f20-brand__note">{{ b.note }}</p>
          <p class="f20-brand__since">{{ b.since }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ 이번 주 픽 (가로 스크롤) ═══ -->
    <section class="f20-picks">
      <div class="f20-picks__head">
        <h2 class="f20-h">· today's picks ·</h2>
        <div class="f20-picks__nav">
          <button @click="scrollPicks(-1)">◁</button>
          <button @click="scrollPicks(1)">▷</button>
        </div>
      </div>
      <div class="f20-picks__scroll" ref="picksRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f20-item"
        >
          <div class="f20-item__sticker">{{ i + 1 }}.</div>
          <div class="f20-item__card">
            <div class="f20-item__img">
              <img :src="p.img" :alt="p.name" />
            </div>
            <div class="f20-item__label">
              <span class="f20-item__tag">{{ p.tag }}</span>
            </div>
          </div>
          <p class="f20-item__brand">— {{ p.brand }}</p>
          <p class="f20-item__name">{{ p.name }}</p>
          <p class="f20-item__price">₩ {{ p.price }} ♡</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ 수공예 가이드 ═══ -->
    <section class="f20-guide">
      <h2 class="f20-h">· how we choose ·</h2>
      <p class="f20-h-sub">forme가 옷을 고르는 세 가지 방법</p>
      <div class="f20-guide__grid">
        <div v-for="(g, i) in guide" :key="i" class="f20-guide__step">
          <div class="f20-guide__num">{{ flowers[i] }}</div>
          <div class="f20-guide__paper">
            <h3>{{ g.title }}</h3>
            <p>{{ g.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 포스트잇 보드 ═══ -->
    <section class="f20-board">
      <h2 class="f20-h">· bulletin board ·</h2>
      <div class="f20-board__grid">
        <div
          v-for="(n, i) in notes"
          :key="i"
          class="f20-note"
          :class="`f20-note--${n.color}`"
          :style="{ transform: `rotate(${n.rotate}deg)` }"
        >
          <p class="f20-note__pin">📌</p>
          <p class="f20-note__text">{{ n.text }}</p>
          <p class="f20-note__sign">{{ n.sign }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ 편지 (대형) ═══ -->
    <section class="f20-letter">
      <div class="f20-letter__paper">
        <div class="f20-letter__tape"></div>
        <p class="f20-letter__label">— a letter from forme ✿</p>
        <p class="f20-letter__body">
          우리는 많은 것을 만드는 시대에 살고 있어요.<br />
          그래서 forme 은 <em>덜 만들고, 더 오래 가는 것</em>을 선택했어요.<br /><br />
          좋은 옷은 시간을 이겨요.<br />
          그 시간의 편에 서기로 했어요.<br /><br />
          천천히 둘러보세요.<br />
          마음에 드는 것을 찾으면 정말 좋겠어요.
        </p>
        <p class="f20-letter__sign">— forme, with love ✿</p>
        <p class="f20-letter__ps">
          p.s. 문의는 언제든 편하게 해주세요 ~<br />
          mail@forme.atelier
        </p>
      </div>
    </section>

    <!-- ═══ 뉴스레터 ═══ -->
    <section class="f20-newsletter">
      <div class="f20-newsletter__inner">
        <p class="f20-newsletter__flower">✿</p>
        <h2>forme의 작은 소식지</h2>
        <p>새로운 물건과 이야기를 편지처럼 보내드려요.</p>
        <div class="f20-newsletter__form">
          <input type="email" placeholder="이메일 주소를 알려주세요 ~" />
          <button>구독 ♡</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f20-foot">
      <div class="f20-foot__paper">
        <div class="f20-foot__tape f20-foot__tape--l"></div>
        <div class="f20-foot__tape f20-foot__tape--r"></div>
        <div class="f20-foot__inner">
          <div class="f20-foot__brand">
            <h3>forme</h3>
            <p><em>a small place for good things ~</em></p>
            <p class="f20-foot__est">est. 2026 · seoul ✿</p>
          </div>
          <div class="f20-foot__grid">
            <div class="f20-foot__col">
              <h4>· friends ·</h4>
              <RouterLink to="/beanpole">✿ beanpole</RouterLink>
              <RouterLink to="/carhartt">✤ carhartt</RouterLink>
              <RouterLink to="/levis">❋ levi's</RouterLink>
              <RouterLink to="/dickies">❀ dickies</RouterLink>
            </div>
            <div class="f20-foot__col">
              <h4>· shop ·</h4>
              <RouterLink to="/products">all things</RouterLink>
              <RouterLink to="/cart">my bag</RouterLink>
              <RouterLink to="/mypage">my page</RouterLink>
            </div>
            <div class="f20-foot__col">
              <h4>· help ·</h4>
              <RouterLink to="/faq">faq</RouterLink>
              <RouterLink to="/qna">ask us</RouterLink>
              <p>mail@forme.atelier</p>
            </div>
          </div>
        </div>
        <div class="f20-foot__divider">~ · ♡ · ~</div>
        <div class="f20-foot__bottom">
          <span>❤ forme · 2026 · seoul ❤</span>
          <span>made with care & love</span>
        </div>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const picksRef = ref(null);
function scrollPicks(dir) {
  if (!picksRef.value) return;
  picksRef.value.scrollBy({ left: dir * 340, behavior: "smooth" });
}

const flowers = ["✿", "✤", "❋", "❀"];

const brands = [
  { id: 1, name: "Beanpole", note: "서울에서 온 친구",      since: "1989 · seoul",         route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "Carhartt", note: "미국 워크웨어의 정석",  since: "1889 · detroit",       route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "Levi's",   note: "150년의 파란 청바지",   since: "1873 · san francisco", route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "Dickies",  note: "텍사스에서 온 튼튼함",  since: "1922 · fort worth",    route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     price: "159,000", tag: "new ✿",   img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", tag: "best ❋",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",    price: "209,000", tag: "iconic ✤", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", tag: "solid ❀",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "Beanpole", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", tag: "soft ✿",   img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  tag: "comfy ❋",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "Carhartt", name: "루즈핏 캔버스 워크 팬츠",   price: "140,000", tag: "tough ✤",  img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "Dickies",  name: "트리 로고 롱슬리브",        price: "69,000",  tag: "cozy ❀",   img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const guide = [
  { title: "소재를 먼저 봐요",     desc: "손으로 만져보고 결정해요. 부드러운 면, 두꺼운 캔버스, 빛바랜 데님. 손끝이 먼저 알아요." },
  { title: "오래 입을 수 있나 봐요", desc: "유행이 지나도 입을 수 있는지 생각해요. 10년 후에도 손이 가는 옷인지가 기준이에요." },
  { title: "정직하게 만들었나 봐요", desc: "안감, 봉제, 단추 구멍까지 하나하나 확인해요. 겉만 예쁜 건 고르지 않아요." },
];

const notes = [
  { text: "이번 주 리바이스 555™ 입어봤는데 정말 편해요 ♡",       sign: "— staff A", color: "yellow", rotate: -3 },
  { text: "칼하트 B01은 진짜 튼튼… 1년 입어도 새 것 같아요",       sign: "— staff B", color: "pink",   rotate: 2 },
  { text: "빈폴 리넨 셔츠, 봄에 딱이에요. 바람이 통해요 ~",        sign: "— staff C", color: "blue",   rotate: -1 },
  { text: "디키즈 카펜터는 주머니가 정말 많아서 실용적!",           sign: "— staff D", color: "green",  rotate: 3 },
  { text: "이번 시즌 가장 많이 팔린 건 555™ 이에요 🎉",            sign: "— forme",   color: "yellow", rotate: -2 },
  { text: "다음 주에 새로운 물건이 들어와요. 기대해주세요 ✿",       sign: "— forme",   color: "pink",   rotate: 1 },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 20 — Hand-drawn Craft
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f20 {
  background: #fdf8ef;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(168, 140, 100, 0.04) 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(168, 140, 100, 0.04) 1px, transparent 1px);
  background-size: 60px 60px, 80px 80px;
  color: #4a3a28;
  font-family: "Fraunces", Georgia, serif;
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f20-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(253, 248, 239, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 2px dashed rgba(168, 140, 100, 0.25);
}
.f20-topbar__link {
  font-style: italic;
  font-size: 0.8125rem;
  color: #8b6a3a;
  transition: color 0.2s;
}
.f20-topbar__link:last-child { text-align: right; }
.f20-topbar__link:hover { color: #4a3a28; }
.f20-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.625rem;
  justify-content: center;
}
.f20-topbar__flower { font-size: 1rem; color: #c97b6b; }
.f20-topbar__logo {
  font-size: 1.5rem;
  font-weight: 400;
  font-style: italic;
  color: #4a3a28;
}
.f20-topbar__sub {
  font-size: 0.75rem;
  font-style: italic;
  color: #8b6a3a;
}

/* ── Hero ── */
.f20-hero {
  min-height: calc(100dvh - 56px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.f20-hero__paper {
  position: relative;
  background: #fffaf0;
  padding: 5rem 4rem;
  max-width: 42rem;
  text-align: center;
  border: 1px solid rgba(168, 140, 100, 0.2);
  box-shadow:
    0 1px 0 rgba(168, 140, 100, 0.3),
    0 20px 40px rgba(74, 58, 40, 0.1);
  transform: rotate(-0.5deg);
}
.f20-hero__tape {
  position: absolute;
  width: 6rem;
  height: 1.25rem;
  background: rgba(255, 213, 79, 0.5);
  border: 1px solid rgba(168, 140, 100, 0.2);
}
.f20-hero__tape--left { top: -0.5rem; left: 2rem; transform: rotate(-6deg); }
.f20-hero__tape--right { top: -0.5rem; right: 2rem; transform: rotate(5deg); }
.f20-hero__hand {
  font-style: italic;
  font-size: 1rem;
  color: #8b6a3a;
  margin-bottom: 1rem;
}
.f20-hero__ornament {
  font-size: 0.875rem;
  color: #a88c64;
  letter-spacing: 0.3em;
  margin-bottom: 1.5rem;
}
.f20-hero__title {
  font-size: clamp(5rem, 14vw, 10rem);
  font-weight: 400;
  line-height: 0.9;
  color: #4a3a28;
  margin-bottom: 0.75rem;
  font-style: italic;
}
.f20-hero__sub {
  font-style: italic;
  font-size: 1.125rem;
  color: #8b6a3a;
  margin-bottom: 1.5rem;
}
.f20-hero__divider {
  font-size: 0.75rem;
  color: #c9b99a;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}
.f20-hero__desc {
  font-size: 1.0625rem;
  line-height: 2;
  color: #6a5540;
  margin-bottom: 2rem;
}
.f20-hero__meta {
  display: flex;
  justify-content: center;
  gap: 0.625rem;
  font-size: 0.6875rem;
  font-style: italic;
  color: #a88c64;
  letter-spacing: 0.1em;
  margin-bottom: 2.5rem;
}
.f20-hero__cta {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #fffaf0;
  border: 2px dashed #8b6a3a;
  color: #4a3a28;
  font-style: italic;
  font-size: 1rem;
  transition: background 0.3s;
}
.f20-hero__cta:hover { background: #fff0c0; }

/* ── 소개 편지 ── */
.f20-intro {
  padding: 4rem 2rem;
  display: flex;
  justify-content: center;
}
.f20-intro__paper {
  max-width: 34rem;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.2);
  padding: 3.5rem 3rem;
  text-align: center;
  box-shadow: 0 6px 20px rgba(74, 58, 40, 0.08);
  transform: rotate(0.3deg);
}
.f20-intro__label {
  font-size: 0.8125rem;
  font-style: italic;
  color: #c97b6b;
  margin-bottom: 1.5rem;
}
.f20-intro__text {
  font-size: 1.0625rem;
  line-height: 2.1;
  color: #4a3a28;
  font-style: italic;
  margin-bottom: 2rem;
}
.f20-intro__sign {
  font-size: 1.25rem;
  font-style: italic;
  color: #8b6a3a;
}

/* ── 공통 섹션 제목 ── */
.f20-h {
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  font-style: italic;
  color: #4a3a28;
  padding-top: 5rem;
  margin-bottom: 0.5rem;
}
.f20-h-sub {
  text-align: center;
  font-size: 0.9375rem;
  font-style: italic;
  color: #8b6a3a;
  margin-bottom: 3.5rem;
}

/* ── 브랜드 (폴라로이드) ── */
.f20-brands { padding: 0 3rem 5rem; }
.f20-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f20-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f20-brands__grid { grid-template-columns: repeat(4, 1fr); } }

.f20-brand {
  position: relative;
  text-align: center;
  color: inherit;
  cursor: pointer;
}
.f20-brand:nth-child(odd) .f20-brand__polaroid { transform: rotate(-2deg); }
.f20-brand:nth-child(even) .f20-brand__polaroid { transform: rotate(2deg); }
.f20-brand:hover .f20-brand__polaroid { transform: rotate(0) translateY(-4px); }
.f20-brand__sticker {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #ffd54f;
  color: #4a3a28;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.125rem;
  border: 1.5px solid #8b6a3a;
  z-index: 2;
  transform: rotate(-10deg);
}
.f20-brand__polaroid {
  background: #fffaf0;
  padding: 1rem 1rem 2.5rem;
  box-shadow: 0 4px 16px rgba(74, 58, 40, 0.12);
  transition: transform 0.4s, box-shadow 0.4s;
  margin-bottom: 1rem;
}
.f20-brand:hover .f20-brand__polaroid {
  box-shadow: 0 8px 24px rgba(74, 58, 40, 0.18);
}
.f20-brand__polaroid img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  filter: sepia(0.15) saturate(0.85);
}
.f20-brand__caption {
  font-style: italic;
  font-size: 1.125rem;
  color: #4a3a28;
  margin-top: 1rem;
}
.f20-brand__note {
  font-style: italic;
  font-size: 0.9375rem;
  color: #8b6a3a;
  margin-bottom: 0.25rem;
}
.f20-brand__since {
  font-size: 0.6875rem;
  font-style: italic;
  color: #a88c64;
  letter-spacing: 0.1em;
}

/* ── 이번 주 픽 (가로 스크롤) ── */
.f20-picks { padding: 0 0 5rem; }
.f20-picks__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 3rem;
  max-width: 1200px;
  margin: 0 auto;
}
.f20-picks__head .f20-h { padding-top: 3rem; }
.f20-picks__nav { display: flex; gap: 0.5rem; padding-bottom: 1rem; }
.f20-picks__nav button {
  width: 2.5rem;
  height: 2.5rem;
  background: #fffaf0;
  border: 2px dashed #a88c64;
  color: #4a3a28;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background 0.2s;
}
.f20-picks__nav button:hover { background: #fff0c0; }
.f20-picks__scroll {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 1rem 3rem 1rem;
}
.f20-picks__scroll::-webkit-scrollbar { display: none; }

.f20-item {
  position: relative;
  flex: 0 0 280px;
  scroll-snap-align: start;
  text-align: center;
  color: inherit;
}
.f20-item__sticker {
  position: absolute;
  top: -0.375rem;
  left: -0.375rem;
  background: #a8c8e0;
  color: #4a3a28;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 700;
  border: 1.5px solid #8b6a3a;
  z-index: 2;
  transform: rotate(-8deg);
}
.f20-item__card {
  position: relative;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.25);
  padding: 1rem 1rem 0.5rem;
  margin-bottom: 1rem;
  box-shadow: 0 3px 12px rgba(74, 58, 40, 0.08);
  transition: transform 0.3s;
}
.f20-item:hover .f20-item__card { transform: rotate(-1deg) translateY(-3px); }
.f20-item__img {
  aspect-ratio: 1/1;
  overflow: hidden;
}
.f20-item__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.1);
  transition: filter 0.5s;
}
.f20-item:hover .f20-item__img img { filter: sepia(0); }
.f20-item__label {
  padding: 0.5rem 0;
}
.f20-item__tag {
  font-style: italic;
  font-size: 0.75rem;
  color: #c97b6b;
  letter-spacing: 0.1em;
}
.f20-item__brand {
  font-size: 0.75rem;
  font-style: italic;
  color: #8b6a3a;
  margin-bottom: 0.375rem;
}
.f20-item__name {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.375rem;
  line-height: 1.35;
}
.f20-item__price {
  font-size: 0.9375rem;
  color: #8b6a3a;
}

/* ── 수공예 가이드 ── */
.f20-guide { padding: 0 3rem 6rem; }
.f20-guide__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f20-guide__grid { grid-template-columns: repeat(3, 1fr); } }
.f20-guide__step { text-align: center; }
.f20-guide__num {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #c97b6b;
}
.f20-guide__paper {
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.2);
  padding: 2rem 1.5rem;
  box-shadow: 0 3px 12px rgba(74, 58, 40, 0.06);
  transform: rotate(-0.5deg);
}
.f20-guide__step:nth-child(2) .f20-guide__paper { transform: rotate(0.5deg); }
.f20-guide__step:nth-child(3) .f20-guide__paper { transform: rotate(-0.3deg); }
.f20-guide__paper h3 {
  font-size: 1.125rem;
  font-style: italic;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #4a3a28;
}
.f20-guide__paper p {
  font-size: 0.875rem;
  line-height: 1.9;
  color: #6a5540;
  font-style: italic;
}

/* ── 포스트잇 보드 ── */
.f20-board {
  padding: 0 3rem 6rem;
}
.f20-board__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f20-board__grid { grid-template-columns: repeat(3, 1fr); } }
.f20-note {
  padding: 1.5rem;
  box-shadow: 0 3px 10px rgba(74, 58, 40, 0.1);
  min-height: 140px;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s;
}
.f20-note:hover { transform: rotate(0deg) !important; }
.f20-note--yellow { background: #fff9c4; }
.f20-note--pink   { background: #fce4ec; }
.f20-note--blue   { background: #e3f2fd; }
.f20-note--green  { background: #e8f5e9; }
.f20-note__pin {
  font-size: 1rem;
  margin-bottom: 0.75rem;
}
.f20-note__text {
  font-size: 0.875rem;
  font-style: italic;
  line-height: 1.7;
  color: #4a3a28;
  flex: 1;
}
.f20-note__sign {
  font-size: 0.6875rem;
  font-style: italic;
  color: #8b6a3a;
  margin-top: 0.75rem;
  text-align: right;
}

/* ── 편지 ── */
.f20-letter {
  padding: 4rem 2rem 6rem;
  display: flex;
  justify-content: center;
}
.f20-letter__paper {
  position: relative;
  max-width: 36rem;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.25);
  padding: 4rem 3rem;
  text-align: center;
  box-shadow: 0 8px 24px rgba(74, 58, 40, 0.08);
  transform: rotate(0.5deg);
}
.f20-letter__tape {
  position: absolute;
  top: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 5rem;
  height: 1.125rem;
  background: rgba(255, 213, 79, 0.55);
  border: 1px solid rgba(168, 140, 100, 0.2);
}
.f20-letter__label {
  font-size: 0.875rem;
  font-style: italic;
  color: #c97b6b;
  margin-bottom: 2rem;
}
.f20-letter__body {
  font-size: 1.0625rem;
  line-height: 2.1;
  color: #4a3a28;
  font-style: italic;
  margin-bottom: 2rem;
}
.f20-letter__body em {
  color: #8b6a3a;
  font-style: italic;
}
.f20-letter__sign {
  font-size: 1.5rem;
  font-style: italic;
  color: #8b6a3a;
  margin-bottom: 2rem;
}
.f20-letter__ps {
  font-size: 0.8125rem;
  font-style: italic;
  color: #a88c64;
  line-height: 1.7;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(168, 140, 100, 0.3);
}

/* ── 뉴스레터 ── */
.f20-newsletter {
  padding: 5rem 2rem;
  background: #f0e5d3;
}
.f20-newsletter__inner {
  max-width: 28rem;
  margin: 0 auto;
  text-align: center;
}
.f20-newsletter__flower {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #c97b6b;
}
.f20-newsletter h2 {
  font-size: 1.75rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.75rem;
}
.f20-newsletter p {
  font-size: 0.9375rem;
  font-style: italic;
  color: #6a5540;
  margin-bottom: 2rem;
}
.f20-newsletter__form {
  display: flex;
  border: 2px dashed #8b6a3a;
  background: #fffaf0;
}
.f20-newsletter__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-style: italic;
  color: #4a3a28;
  outline: none;
}
.f20-newsletter__form input::placeholder { color: #a88c64; }
.f20-newsletter__form button {
  background: #8b6a3a;
  color: #fffaf0;
  border: none;
  padding: 0 1.5rem;
  font-family: inherit;
  font-size: 0.875rem;
  font-style: italic;
  cursor: pointer;
  transition: background 0.2s;
}
.f20-newsletter__form button:hover { background: #4a3a28; }

/* ── 자체 푸터 ── */
.f20-foot {
  padding: 3rem 2rem;
  background: #fdf8ef;
}
.f20-foot__paper {
  position: relative;
  max-width: 1100px;
  margin: 0 auto;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.2);
  padding: 3rem 2.5rem 2rem;
  box-shadow: 0 6px 20px rgba(74, 58, 40, 0.08);
  transform: rotate(-0.2deg);
}
.f20-foot__tape {
  position: absolute;
  width: 5rem;
  height: 1.125rem;
  background: rgba(255, 213, 79, 0.55);
  border: 1px solid rgba(168, 140, 100, 0.2);
  top: -0.5rem;
}
.f20-foot__tape--l { left: 2rem; transform: rotate(-5deg); }
.f20-foot__tape--r { right: 2rem; transform: rotate(5deg); }

.f20-foot__inner {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: 3rem;
  padding-bottom: 2rem;
}
.f20-foot__brand h3 {
  font-size: 2.25rem;
  font-weight: 400;
  font-style: italic;
  color: #4a3a28;
  margin-bottom: 0.5rem;
}
.f20-foot__brand p em {
  font-size: 0.9375rem;
  color: #8b6a3a;
}
.f20-foot__est {
  font-size: 0.6875rem;
  font-style: italic;
  color: #a88c64;
  margin-top: 0.75rem;
  letter-spacing: 0.1em;
}
.f20-foot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
.f20-foot__col h4 {
  font-size: 0.875rem;
  font-weight: 400;
  font-style: italic;
  color: #4a3a28;
  margin-bottom: 0.875rem;
}
.f20-foot__col a,
.f20-foot__col p {
  display: block;
  font-size: 0.8125rem;
  font-style: italic;
  color: #8b6a3a;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
}
.f20-foot__col a:hover { color: #4a3a28; }

.f20-foot__divider {
  text-align: center;
  font-size: 0.875rem;
  color: #c9b99a;
  letter-spacing: 0.3em;
  padding: 1.5rem 0;
}

.f20-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding-top: 1rem;
  border-top: 1px dashed rgba(168, 140, 100, 0.25);
  font-size: 0.6875rem;
  font-style: italic;
  color: #a88c64;
}
</style>
