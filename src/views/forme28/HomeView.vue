<template>
  <main class="f28">
    <!-- 필름 그레인 오버레이 (전체 화면) -->
    <div class="f28-grain"></div>

    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f28-topbar">
      <div class="f28-topbar__left">
        <RouterLink to="/forme" class="f28-topbar__link">◁ PICKER</RouterLink>
        <span class="f28-topbar__sep">|</span>
        <span class="f28-topbar__film">KODAK PORTRA 400 · 36 EXP</span>
      </div>
      <div class="f28-topbar__center">
        <span class="f28-topbar__logo">FORME</span>
        <span class="f28-topbar__edition">FILM EDITION</span>
      </div>
      <div class="f28-topbar__right">
        <span class="f28-topbar__date">04 / 10 / 2026</span>
        <span class="f28-topbar__sep">|</span>
        <RouterLink to="/" class="f28-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero: 필름 프레임 ═══ -->
    <section class="f28-hero">
      <div class="f28-hero__filmstrip">
        <div class="f28-hero__sprocket f28-hero__sprocket--left"></div>
        <div class="f28-hero__main-frame">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
            alt="hero"
            class="f28-hero__img"
          />
          <div class="f28-hero__frame-border">
            <span class="f28-hero__frame-no">← 1</span>
            <span class="f28-hero__frame-no">1A →</span>
          </div>
        </div>
        <div class="f28-hero__sprocket f28-hero__sprocket--right"></div>
      </div>

      <div class="f28-hero__text">
        <div class="f28-hero__meta">
          <span>EXP. 01 / 36</span>
          <span class="f28-hero__dot">●</span>
          <span>ISO 400</span>
          <span class="f28-hero__dot">●</span>
          <span>f/2.8</span>
          <span class="f28-hero__dot">●</span>
          <span>1/125s</span>
        </div>
        <h1 class="f28-hero__title">FORME</h1>
        <p class="f28-hero__tagline">Captured on film. Worn in real life.</p>
        <div class="f28-hero__divider">
          <span></span><span class="f28-hero__diamond">◆</span><span></span>
        </div>
        <p class="f28-hero__desc">
          필름 카메라로 담는 옷장의 기록.<br />
          한 장 한 장, 천천히 골라 입는 삶.
        </p>
        <RouterLink to="/products" class="f28-hero__cta">[ develop → ]</RouterLink>
      </div>
    </section>

    <!-- ═══ 필름 정보 스트립 ═══ -->
    <div class="f28-strip">
      <div class="f28-strip__item">
        <span class="f28-strip__label">FILM</span>
        <span class="f28-strip__value">KODAK PORTRA 400</span>
      </div>
      <div class="f28-strip__item">
        <span class="f28-strip__label">FORMAT</span>
        <span class="f28-strip__value">35mm</span>
      </div>
      <div class="f28-strip__item">
        <span class="f28-strip__label">CAMERA</span>
        <span class="f28-strip__value">CONTAX T2</span>
      </div>
      <div class="f28-strip__item">
        <span class="f28-strip__label">LAB</span>
        <span class="f28-strip__value">FORME DARKROOM · SEOUL</span>
      </div>
      <div class="f28-strip__item">
        <span class="f28-strip__label">DATE</span>
        <span class="f28-strip__value">2026.04.10</span>
      </div>
    </div>

    <!-- ═══ Contact Sheet — Brands ═══ -->
    <section class="f28-contacts">
      <div class="f28-section-head">
        <span class="f28-section-head__no">ROLL 01</span>
        <h2 class="f28-section-head__title">CONTACT SHEET — THE HOUSES</h2>
        <span class="f28-section-head__note">4 FRAMES · SELECTED</span>
      </div>

      <div class="f28-contacts__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f28-contact"
        >
          <div class="f28-contact__frame">
            <img :src="b.img" :alt="b.name" />
            <div class="f28-contact__overlay">
              <span>VIEW</span>
            </div>
            <span class="f28-contact__no">{{ i + 1 }}A</span>
            <span class="f28-contact__exp">EXP. {{ String(i + 2).padStart(2, '0') }} / 36</span>
          </div>
          <div class="f28-contact__info">
            <h3>{{ b.name }}</h3>
            <p>{{ b.city }} · {{ b.year }}</p>
            <p class="f28-contact__desc">{{ b.desc }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Darkroom Notes ═══ -->
    <section class="f28-notes">
      <div class="f28-notes__inner">
        <div class="f28-notes__col">
          <span class="f28-notes__label">— DARKROOM NOTES</span>
          <h3 class="f28-notes__title">On Analog</h3>
          <p class="f28-notes__text">
            디지털이 빠르게 찍고 지우는 시대에,<br />
            필름은 한 장을 위해 기다리게 합니다.<br /><br />
            옷도 마찬가지입니다.<br />
            빠르게 사고 버리는 대신,<br />
            한 벌을 위해 천천히 고르는 일.
          </p>
          <p class="f28-notes__sign">— FORME LAB, Note #001</p>
        </div>
        <div class="f28-notes__col">
          <span class="f28-notes__label">— EXPOSURE LOG</span>
          <h3 class="f28-notes__title">Light & Material</h3>
          <p class="f28-notes__text">
            좋은 빛이 좋은 사진을 만들 듯,<br />
            좋은 소재가 좋은 옷을 만듭니다.<br /><br />
            면의 결, 데님의 무게, 캔버스의 두께.<br />
            손끝으로 느끼는 것이 시작입니다.
          </p>
          <p class="f28-notes__sign">— FORME LAB, Note #002</p>
        </div>
      </div>
    </section>

    <!-- ═══ Film Strip Carousel — Products ═══ -->
    <section class="f28-selection">
      <div class="f28-section-head f28-section-head--inline">
        <div>
          <span class="f28-section-head__no">ROLL 02</span>
          <h2 class="f28-section-head__title">PRINTS — SELECTION</h2>
        </div>
        <div class="f28-selection__nav">
          <button @click="scrollFilm(-1)" aria-label="prev">◁</button>
          <button @click="scrollFilm(1)" aria-label="next">▷</button>
        </div>
      </div>

      <div class="f28-filmstrip-scroll" ref="filmRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="i"
          :to="`/products/${p.id}`"
          class="f28-print"
        >
          <div class="f28-print__polaroid">
            <div class="f28-print__img-wrap">
              <img :src="p.img" :alt="p.name" />
            </div>
            <div class="f28-print__caption">
              <span class="f28-print__no">No. {{ String(i + 1).padStart(3, '0') }}</span>
              <span class="f28-print__film-type">PORTRA 400</span>
            </div>
          </div>
          <div class="f28-print__info">
            <p class="f28-print__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f28-print__price">₩ {{ p.price }}</p>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Roll Index (테이블) ═══ -->
    <section class="f28-index">
      <div class="f28-section-head">
        <span class="f28-section-head__no">INDEX</span>
        <h2 class="f28-section-head__title">ROLL CATALOG</h2>
        <span class="f28-section-head__note">ALL FRAMES</span>
      </div>

      <table class="f28-index__table">
        <thead>
          <tr>
            <th>Frame</th>
            <th>Subject</th>
            <th>Brand</th>
            <th>Film</th>
            <th>Aperture</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, i) in rollIndex" :key="i">
            <td class="f28-index__frame">{{ r.frame }}</td>
            <td class="f28-index__subject">{{ r.subject }}</td>
            <td class="f28-index__brand">{{ r.brand }}</td>
            <td>{{ r.film }}</td>
            <td>{{ r.aperture }}</td>
            <td>
              <span class="f28-index__status" :class="`f28-index__status--${r.status}`">
                {{ r.statusLabel }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ═══ Lab Receipt ═══ -->
    <section class="f28-receipt">
      <div class="f28-receipt__paper">
        <div class="f28-receipt__header">
          <p>FORME DARKROOM</p>
          <p>서울특별시 강남구 · EST. 2026</p>
        </div>
        <div class="f28-receipt__divider">- - - - - - - - - - - - - - - - - -</div>
        <div class="f28-receipt__body">
          <div class="f28-receipt__row">
            <span>ROLL</span><span>KODAK PORTRA 400</span>
          </div>
          <div class="f28-receipt__row">
            <span>FORMAT</span><span>35mm · C-41</span>
          </div>
          <div class="f28-receipt__row">
            <span>FRAMES</span><span>36 EXP.</span>
          </div>
          <div class="f28-receipt__row">
            <span>SELECTED</span><span>{{ products.length }} PRINTS</span>
          </div>
          <div class="f28-receipt__row">
            <span>BRANDS</span><span>4 HOUSES</span>
          </div>
          <div class="f28-receipt__row">
            <span>LAB TECH</span><span>FORME TEAM</span>
          </div>
        </div>
        <div class="f28-receipt__divider">- - - - - - - - - - - - - - - - - -</div>
        <div class="f28-receipt__footer">
          <p>THANK YOU FOR SHOOTING WITH US.</p>
          <p class="f28-receipt__small">PROCESSED · HAND-PRINTED · QUALITY CHECKED</p>
        </div>
      </div>
    </section>

    <!-- ═══ Manifesto ═══ -->
    <section class="f28-manifesto">
      <div class="f28-manifesto__top">
        <span>[ MANIFESTO ]</span>
        <span>// ANALOG · 2026</span>
      </div>
      <div class="f28-manifesto__content">
        <p class="f28-manifesto__line">EVERY</p>
        <p class="f28-manifesto__line f28-manifesto__line--highlight">FRAME</p>
        <p class="f28-manifesto__line">COUNTS.</p>
      </div>
      <div class="f28-manifesto__note">
        <p>
          36장의 필름, 36번의 선택.<br />
          한 장을 찍기 위해 기다리는 시간이<br />
          그 사진을 특별하게 만듭니다.<br /><br />
          옷도 같은 방식으로 고릅니다.<br />
          FORME는 모든 한 벌이 의미 있기를 바랍니다.
        </p>
        <p class="f28-manifesto__sign">— FORME DARKROOM · ANALOG DIVISION</p>
      </div>
    </section>

    <!-- ═══ Newsletter / Darkroom Membership ═══ -->
    <section class="f28-membership">
      <div class="f28-membership__inner">
        <p class="f28-membership__label">[ DARKROOM MEMBERSHIP ]</p>
        <h2 class="f28-membership__title">JOIN THE<br />DARKROOM.</h2>
        <p class="f28-membership__desc">
          필름 에디션 뉴스레터 · 한정 프린트 · 얼리 액세스.<br />
          아날로그를 사랑하는 사람들의 커뮤니티.
        </p>
        <div class="f28-membership__form">
          <input type="email" placeholder="your@film.roll" />
          <button>DEVELOP →</button>
        </div>
      </div>
    </section>

    <!-- ═══ End of Roll ═══ -->
    <section class="f28-end">
      <div class="f28-end__sprocket"></div>
      <div class="f28-end__content">
        <p class="f28-end__title">END OF ROLL.</p>
        <p class="f28-end__sub">REWIND · UNLOAD · DEVELOP</p>
        <div class="f28-end__meta">
          <span>FORME DARKROOM</span>
          <span>·</span>
          <span>SEOUL, KOREA</span>
          <span>·</span>
          <span>SPRING 2026</span>
        </div>
      </div>
      <div class="f28-end__sprocket"></div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f28-foot">
      <div class="f28-foot__top">
        <div class="f28-foot__brand">
          <p class="f28-foot__logo">FORME</p>
          <p class="f28-foot__sub">FILM EDITION · ANALOG DIVISION</p>
          <p class="f28-foot__addr">서울특별시 강남구 · FORME DARKROOM</p>
        </div>
        <div class="f28-foot__grid">
          <div class="f28-foot__col">
            <p class="f28-foot__label">[ ROLLS ]</p>
            <RouterLink to="/beanpole">BEANPOLE · 1989</RouterLink>
            <RouterLink to="/carhartt">CARHARTT · 1889</RouterLink>
            <RouterLink to="/levis">LEVI'S · 1873</RouterLink>
            <RouterLink to="/dickies">DICKIES · 1922</RouterLink>
          </div>
          <div class="f28-foot__col">
            <p class="f28-foot__label">[ LAB ]</p>
            <RouterLink to="/products">ALL PRINTS</RouterLink>
            <RouterLink to="/cart">LIGHT TABLE</RouterLink>
            <RouterLink to="/mypage">DARKROOM</RouterLink>
          </div>
          <div class="f28-foot__col">
            <p class="f28-foot__label">[ SIGNAL ]</p>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">CORRESPONDENCE</RouterLink>
            <p>film@forme.lab</p>
          </div>
        </div>
      </div>
      <div class="f28-foot__filmstrip">
        <div class="f28-foot__sprocket"></div>
        <div class="f28-foot__filmcenter">
          <span>◆ SHOT ON FILM ◆ DEVELOPED BY HAND ◆ CURATED WITH CARE ◆ FORME DARKROOM ◆ SEOUL 2026 ◆</span>
        </div>
        <div class="f28-foot__sprocket"></div>
      </div>
      <div class="f28-foot__bottom">
        <span>© 2026 FORME DARKROOM</span>
        <span>[ ANALOG NEVER DIES ]</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const filmRef = ref(null);
function scrollFilm(dir) {
  if (!filmRef.value) return;
  filmRef.value.scrollBy({ left: dir * 380, behavior: "smooth" });
}

const brands = [
  { id: 1, name: "BEANPOLE", year: "1989", city: "SEOUL",          desc: "한국 클래식의 정수. 정돈된 프레임.",           route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", year: "1889", city: "DETROIT",        desc: "워크웨어의 원형. 정직한 노출.",               route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   year: "1873", city: "SAN FRANCISCO",  desc: "150년 데님. 빛바랜 인디고의 질감.",           route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  year: "1922", city: "FORT WORTH",     desc: "한 세기 작업복. 거친 콘트라스트.",             route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "BEANPOLE", name: "헤리티지 칼라넥 티셔츠",        price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "LEVI'S",   name: "555™ 릴렉스 스트레이트 진",     price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "CARHARTT", name: "루즈핏 캔버스 워크 팬츠",       price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "DICKIES",  name: "카펜터 유틸리티 데님 팬츠",     price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 103, brand: "CARHARTT", name: "B01 더블프런트 트라우저",       price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 401, brand: "BEANPOLE", name: "피그먼트 워싱 치노 팬츠",      price: "239,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "LEVI'S",   name: "565™ 루즈 스트레이트 진",      price: "99,000",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 304, brand: "DICKIES",  name: "트리 로고 레이어드 롱슬리브",   price: "69,000",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const rollIndex = [
  { frame: "01A", subject: "Hero — Spring Light",         brand: "FORME",    film: "PORTRA 400", aperture: "f/2.8",  status: "selected", statusLabel: "● SELECTED" },
  { frame: "02A", subject: "Beanpole Heritage",           brand: "BEANPOLE", film: "PORTRA 400", aperture: "f/4.0",  status: "selected", statusLabel: "● SELECTED" },
  { frame: "03A", subject: "Carhartt Workwear",           brand: "CARHARTT", film: "PORTRA 400", aperture: "f/5.6",  status: "selected", statusLabel: "● SELECTED" },
  { frame: "04A", subject: "Levi's Denim Heritage",       brand: "LEVI'S",   film: "PORTRA 400", aperture: "f/4.0",  status: "selected", statusLabel: "● SELECTED" },
  { frame: "05A", subject: "Dickies Industrial",          brand: "DICKIES",  film: "PORTRA 400", aperture: "f/8.0",  status: "selected", statusLabel: "● SELECTED" },
  { frame: "06A", subject: "Detail — Stitching",          brand: "CARHARTT", film: "PORTRA 400", aperture: "f/2.0",  status: "review",   statusLabel: "○ REVIEW" },
  { frame: "07A", subject: "Detail — Denim Fade",         brand: "LEVI'S",   film: "PORTRA 400", aperture: "f/2.8",  status: "review",   statusLabel: "○ REVIEW" },
  { frame: "08A", subject: "Still Life — Folded Shirts",  brand: "BEANPOLE", film: "PORTRA 400", aperture: "f/11",   status: "pending",  statusLabel: "◌ PENDING" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 28 — Film Grain Analog
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f28 {
  background: #1a1814;
  color: #e8dcc8;
  font-family: 'Courier New', 'Courier', monospace;
  min-height: 100dvh;
  position: relative;
}

/* ── 그레인 오버레이 ── */
.f28-grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 100;
  opacity: 0.1;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E");
}

/* ── 자체 상단바 ── */
.f28-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(26, 24, 20, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid #3a3428;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #8a7d68;
}
.f28-topbar__left,
.f28-topbar__right {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}
.f28-topbar__right { justify-content: flex-end; }
.f28-topbar__link { color: #8a7d68; transition: color 0.2s; }
.f28-topbar__link:hover { color: #e8dcc8; }
.f28-topbar__sep { color: #3a3428; }
.f28-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  justify-content: center;
}
.f28-topbar__logo {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #e8dcc8;
}
.f28-topbar__edition { color: #5a5040; }
.f28-topbar__film { color: #5a5040; }
.f28-topbar__date { color: #e8dcc8; }

/* ── Hero ── */
.f28-hero {
  padding: 5rem 2rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
}
.f28-hero__filmstrip {
  display: flex;
  margin-bottom: 4rem;
}
.f28-hero__sprocket {
  width: 2.5rem;
  flex-shrink: 0;
  background: #0f0e0b;
  position: relative;
}
.f28-hero__sprocket::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    #3a3428 0 5px,
    transparent 5px 18px
  );
}
.f28-hero__sprocket--left {
  border-right: 1px dashed #3a3428;
  border-left: 2px solid #3a3428;
}
.f28-hero__sprocket--right {
  border-left: 1px dashed #3a3428;
  border-right: 2px solid #3a3428;
}
.f28-hero__main-frame {
  flex: 1;
  position: relative;
  border: 1px solid #3a3428;
}
.f28-hero__img {
  width: 100%;
  aspect-ratio: 3/2;
  object-fit: cover;
  display: block;
  filter: sepia(0.2) contrast(1.08) brightness(0.92) saturate(0.88);
}
.f28-hero__frame-border {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0.75rem;
  background: rgba(15, 14, 11, 0.6);
}
.f28-hero__frame-no {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #e8dcc8;
  opacity: 0.7;
}

.f28-hero__text { text-align: center; }
.f28-hero__meta {
  display: flex;
  justify-content: center;
  gap: 0.875rem;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #5a5040;
  margin-bottom: 2rem;
}
.f28-hero__dot { color: #3a3428; font-size: 0.375rem; }
.f28-hero__title {
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #e8dcc8;
  text-shadow:
    2px 2px 0 rgba(200, 160, 100, 0.12),
    4px 4px 0 rgba(200, 160, 100, 0.06);
  margin-bottom: 1rem;
  line-height: 0.9;
}
.f28-hero__tagline {
  font-size: 1.0625rem;
  color: #8a7d68;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
}
.f28-hero__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}
.f28-hero__divider span:first-child,
.f28-hero__divider span:last-child {
  width: 4rem;
  height: 1px;
  background: #3a3428;
}
.f28-hero__diamond { font-size: 0.5rem; color: #8a7d68; }
.f28-hero__desc {
  font-size: 0.9375rem;
  color: #6a5d48;
  line-height: 2;
  margin-bottom: 3rem;
}
.f28-hero__cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 1px solid #5a5040;
  color: #e8dcc8;
  font-size: 0.8125rem;
  letter-spacing: 0.2em;
  transition: all 0.3s;
}
.f28-hero__cta:hover {
  background: #8a7d68;
  color: #1a1814;
  border-color: #8a7d68;
}

/* ── 필름 정보 스트립 ── */
.f28-strip {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  border-top: 1px solid #3a3428;
  border-bottom: 1px solid #3a3428;
  background: #15130f;
}
.f28-strip__item {
  padding: 1.75rem 1.5rem;
  border-right: 1px solid #2a2520;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.f28-strip__item:last-child { border-right: none; }
.f28-strip__label {
  font-size: 0.5625rem;
  letter-spacing: 0.3em;
  color: #5a5040;
}
.f28-strip__value {
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #e8dcc8;
}

/* ── Section Head ── */
.f28-section-head {
  text-align: center;
  padding: 4rem 2rem 2.5rem;
  border-bottom: 1px solid #3a3428;
}
.f28-section-head--inline {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  text-align: left;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 2rem 2rem;
  border-bottom: none;
}
.f28-section-head__no {
  display: block;
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #5a5040;
  margin-bottom: 0.75rem;
}
.f28-section-head__title {
  font-size: 0.9375rem;
  letter-spacing: 0.3em;
  color: #8a7d68;
}
.f28-section-head__note {
  display: block;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #5a5040;
  margin-top: 0.5rem;
}

/* ── Contact Sheet ── */
.f28-contacts { padding-bottom: 5rem; }
.f28-contacts__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
}
.f28-contact {
  padding: 1rem;
  border: 1px solid #2a2520;
  margin: -0.5px;
  color: inherit;
  transition: background 0.3s;
}
.f28-contact:hover { background: rgba(138, 125, 104, 0.08); }
.f28-contact__frame {
  position: relative;
  aspect-ratio: 3/2;
  overflow: hidden;
  margin-bottom: 1rem;
  border: 1px solid #3a3428;
}
.f28-contact__frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.15) contrast(1.08) brightness(0.88) saturate(0.85);
  transition: transform 0.7s, filter 0.5s;
}
.f28-contact:hover .f28-contact__frame img {
  transform: scale(1.04);
  filter: sepia(0.05) contrast(1.05) brightness(0.95) saturate(0.95);
}
.f28-contact__overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 24, 20, 0.4);
  opacity: 0;
  transition: opacity 0.3s;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.3em;
  color: #e8dcc8;
}
.f28-contact:hover .f28-contact__overlay { opacity: 1; }
.f28-contact__no {
  position: absolute;
  bottom: 0.375rem;
  right: 0.5rem;
  font-size: 0.625rem;
  color: #e8dcc8;
  background: rgba(26, 24, 20, 0.7);
  padding: 0.125rem 0.375rem;
}
.f28-contact__exp {
  position: absolute;
  top: 0.375rem;
  left: 0.5rem;
  font-size: 0.5rem;
  color: #5a5040;
}
.f28-contact__info { text-align: center; }
.f28-contact__info h3 {
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
  color: #e8dcc8;
}
.f28-contact__info p {
  font-size: 0.6875rem;
  color: #5a5040;
  letter-spacing: 0.1em;
}
.f28-contact__desc {
  color: #8a7d68 !important;
  margin-top: 0.5rem;
  font-style: italic;
  letter-spacing: 0 !important;
}

/* ── Darkroom Notes ── */
.f28-notes {
  padding: 8rem 2rem;
  border-top: 1px solid #3a3428;
  border-bottom: 1px solid #3a3428;
  background: #15130f;
}
.f28-notes__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f28-notes__inner { grid-template-columns: 1fr 1fr; } }
.f28-notes__col {
  border-top: 1px solid #3a3428;
  padding-top: 2rem;
}
.f28-notes__label {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #5a5040;
  display: block;
  margin-bottom: 1.5rem;
}
.f28-notes__title {
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: 0.03em;
  color: #e8dcc8;
  margin-bottom: 1.5rem;
}
.f28-notes__text {
  font-size: 0.9375rem;
  line-height: 2;
  color: #6a5d48;
  margin-bottom: 1.5rem;
}
.f28-notes__sign {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #5a5040;
}

/* ── Film Strip Carousel ── */
.f28-selection {
  padding: 5rem 0;
  border-top: 1px solid #3a3428;
}
.f28-selection__nav {
  display: flex;
  gap: 0.5rem;
}
.f28-selection__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid #3a3428;
  color: #8a7d68;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f28-selection__nav button:hover {
  background: #8a7d68;
  color: #1a1814;
  border-color: #8a7d68;
}
.f28-filmstrip-scroll {
  display: flex;
  gap: 2.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 2rem 2rem 1rem;
}
.f28-filmstrip-scroll::-webkit-scrollbar { display: none; }

.f28-print {
  flex: 0 0 320px;
  scroll-snap-align: start;
  cursor: pointer;
  color: inherit;
}
.f28-print__polaroid {
  background: #f5efe3;
  padding: 0.75rem 0.75rem 3.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.35);
  margin-bottom: 1.25rem;
  transition: transform 0.5s;
}
.f28-print:hover .f28-print__polaroid {
  transform: rotate(-1deg) translateY(-4px);
}
.f28-print__img-wrap {
  aspect-ratio: 1/1;
  overflow: hidden;
}
.f28-print__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.15) contrast(1.08) brightness(0.92);
  transition: filter 0.5s;
}
.f28-print:hover .f28-print__img-wrap img {
  filter: sepia(0.05) contrast(1.05) brightness(0.98);
}
.f28-print__caption {
  position: absolute;
  bottom: 0.75rem;
  left: 0.75rem;
  right: 0.75rem;
  display: flex;
  justify-content: space-between;
  font-size: 0.5625rem;
  color: #8a7d68;
  letter-spacing: 0.1em;
}
.f28-print__polaroid { position: relative; }
.f28-print__info { text-align: center; }
.f28-print__brand {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #5a5040;
  margin-bottom: 0.375rem;
}
.f28-print__info h3 {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #e8dcc8;
  margin-bottom: 0.5rem;
  line-height: 1.35;
}
.f28-print__price {
  font-size: 0.8125rem;
  color: #8a7d68;
}

/* ── Roll Index ── */
.f28-index {
  padding-bottom: 5rem;
  border-bottom: 1px solid #3a3428;
}
.f28-index__table {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  border-collapse: collapse;
}
.f28-index__table th {
  text-align: left;
  padding: 1rem 1.25rem;
  border-bottom: 1px solid #3a3428;
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #5a5040;
  font-weight: 700;
}
.f28-index__table td {
  padding: 1.25rem;
  border-bottom: 1px solid #2a2520;
  font-size: 0.8125rem;
  color: #8a7d68;
}
.f28-index__table tr { transition: background 0.2s; }
.f28-index__table tr:hover { background: rgba(138, 125, 104, 0.06); }
.f28-index__frame { color: #e8dcc8; font-weight: 700; }
.f28-index__subject { color: #e8dcc8; }
.f28-index__brand { font-weight: 700; letter-spacing: 0.05em; }
.f28-index__status {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  font-weight: 700;
}
.f28-index__status--selected { color: #a8c060; }
.f28-index__status--review   { color: #c8a840; }
.f28-index__status--pending  { color: #5a5040; }

/* ── Lab Receipt ── */
.f28-receipt {
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;
}
.f28-receipt__paper {
  background: #f5efe3;
  color: #1a1814;
  padding: 3rem 2.5rem;
  max-width: 28rem;
  width: 100%;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  transform: rotate(-0.5deg);
  font-size: 0.8125rem;
}
.f28-receipt__header {
  text-align: center;
  margin-bottom: 1.5rem;
}
.f28-receipt__header p:first-child {
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
}
.f28-receipt__header p:last-child {
  font-size: 0.625rem;
  color: #8a7d68;
  letter-spacing: 0.15em;
}
.f28-receipt__divider {
  text-align: center;
  color: #c9b99a;
  letter-spacing: 0.1em;
  margin: 1.25rem 0;
  font-size: 0.75rem;
}
.f28-receipt__row {
  display: flex;
  justify-content: space-between;
  padding: 0.625rem 0;
  border-bottom: 1px dotted #c9b99a;
}
.f28-receipt__row span:first-child {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #8a7d68;
}
.f28-receipt__row span:last-child {
  font-weight: 700;
  font-size: 0.75rem;
}
.f28-receipt__footer {
  text-align: center;
}
.f28-receipt__footer p:first-child {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}
.f28-receipt__small {
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  color: #8a7d68;
}

/* ── Manifesto ── */
.f28-manifesto {
  padding: 8rem 2rem;
  border-top: 1px solid #3a3428;
  background: #0f0e0b;
}
.f28-manifesto__top {
  display: flex;
  justify-content: space-between;
  max-width: 1100px;
  margin: 0 auto 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #2a2520;
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #5a5040;
}
.f28-manifesto__content {
  max-width: 1100px;
  margin: 0 auto 4rem;
}
.f28-manifesto__line {
  font-size: clamp(3.5rem, 10vw, 8rem);
  font-weight: 700;
  line-height: 0.85;
  letter-spacing: 0.05em;
  color: transparent;
  -webkit-text-stroke: 1.5px #8a7d68;
  margin-bottom: 0.5rem;
}
.f28-manifesto__line--highlight {
  color: #e8dcc8 !important;
  -webkit-text-stroke: 0 !important;
  padding-left: 3rem;
  text-shadow: 2px 2px 0 rgba(200, 160, 100, 0.12);
}
.f28-manifesto__note {
  max-width: 1100px;
  margin: 0 auto;
  padding-top: 2rem;
  border-top: 1px solid #2a2520;
}
.f28-manifesto__note p {
  font-size: 0.9375rem;
  line-height: 2;
  color: #6a5d48;
  margin-bottom: 1rem;
}
.f28-manifesto__sign {
  font-size: 0.625rem !important;
  letter-spacing: 0.25em !important;
  color: #5a5040 !important;
  line-height: 1 !important;
}

/* ── Membership ── */
.f28-membership {
  padding: 7rem 2rem;
  background: #3a3428;
  border-top: 1px solid #5a5040;
  text-align: center;
}
.f28-membership__inner { max-width: 36rem; margin: 0 auto; }
.f28-membership__label {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #8a7d68;
  margin-bottom: 1.5rem;
}
.f28-membership__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: 0.05em;
  line-height: 0.9;
  color: #f5efe3;
  margin-bottom: 1.5rem;
}
.f28-membership__desc {
  font-size: 0.875rem;
  line-height: 1.9;
  color: #8a7d68;
  margin-bottom: 2.5rem;
}
.f28-membership__form {
  display: flex;
  border: 1px solid #5a5040;
  max-width: 24rem;
  margin: 0 auto;
}
.f28-membership__form input {
  flex: 1;
  background: transparent;
  border: none;
  padding: 1rem;
  color: #f5efe3;
  font-family: inherit;
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  outline: none;
}
.f28-membership__form input::placeholder { color: #5a5040; }
.f28-membership__form button {
  background: #8a7d68;
  color: #1a1814;
  border: none;
  padding: 0 1.5rem;
  font-family: inherit;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  cursor: pointer;
  transition: background 0.2s;
}
.f28-membership__form button:hover { background: #e8dcc8; }

/* ── End of Roll ── */
.f28-end {
  display: flex;
  border-top: 1px solid #3a3428;
  background: #0f0e0b;
}
.f28-end__sprocket {
  width: 3rem;
  flex-shrink: 0;
  background-image: repeating-linear-gradient(
    0deg,
    #3a3428 0 5px,
    transparent 5px 18px
  );
  border-right: 1px dashed #3a3428;
  border-left: 1px dashed #3a3428;
}
.f28-end__content {
  flex: 1;
  padding: 8rem 3rem;
  text-align: center;
}
.f28-end__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #e8dcc8;
  text-shadow: 2px 2px 0 rgba(200, 160, 100, 0.12);
  margin-bottom: 1rem;
}
.f28-end__sub {
  font-size: 0.875rem;
  letter-spacing: 0.3em;
  color: #5a5040;
  margin-bottom: 2rem;
}
.f28-end__meta {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #3a3428;
}

/* ── 자체 푸터 ── */
.f28-foot {
  background: #15130f;
  border-top: 1px solid #3a3428;
}
.f28-foot__top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding: 4rem 2.5rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid #2a2520;
}
.f28-foot__logo {
  font-size: 2.25rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #e8dcc8;
  margin-bottom: 0.5rem;
}
.f28-foot__sub {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #5a5040;
  margin-bottom: 1rem;
}
.f28-foot__addr {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #3a3428;
}
.f28-foot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}
.f28-foot__label {
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  color: #5a5040;
  margin-bottom: 0.875rem;
}
.f28-foot__col a,
.f28-foot__col p {
  display: block;
  font-size: 0.75rem;
  color: #8a7d68;
  margin-bottom: 0.5rem;
  transition: color 0.2s;
  letter-spacing: 0.05em;
}
.f28-foot__col a:hover { color: #e8dcc8; }

/* 필름 스트립 푸터 장식 */
.f28-foot__filmstrip {
  display: flex;
  background: #0f0e0b;
  border-top: 1px solid #2a2520;
  border-bottom: 1px solid #2a2520;
}
.f28-foot__sprocket {
  width: 1.5rem;
  flex-shrink: 0;
  background-image: repeating-linear-gradient(
    0deg,
    #3a3428 0 3px,
    transparent 3px 12px
  );
  border-right: 1px dashed #2a2520;
  border-left: 1px dashed #2a2520;
}
.f28-foot__filmcenter {
  flex: 1;
  padding: 0.75rem 1.5rem;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #3a3428;
  text-align: center;
}

.f28-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 2.5rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  color: #3a3428;
}
</style>
