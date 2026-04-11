<template>
  <main class="f14">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f14-topbar">
      <div class="f14-topbar__left">
        <RouterLink to="/forme" class="f14-topbar__link">◁ Picker</RouterLink>
        <span class="f14-topbar__sep">❦</span>
        <span class="f14-topbar__vol">Vol. XIV</span>
      </div>
      <div class="f14-topbar__center">
        <span class="f14-topbar__logo">FORME</span>
        <span class="f14-topbar__sub">Academia Vestimenta</span>
      </div>
      <div class="f14-topbar__right">
        <span class="f14-topbar__date">A.D. MMXXVI</span>
        <span class="f14-topbar__sep">❦</span>
        <RouterLink to="/" class="f14-topbar__link">Home ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f14-hero">
      <div class="f14-hero__border">
        <div class="f14-hero__inner-border">
          <p class="f14-hero__eyebrow">— ACADEMIA VESTIMENTA —</p>
          <div class="f14-hero__ornament">❦</div>
          <h1 class="f14-hero__title">FORME</h1>
          <p class="f14-hero__latin">in perpetuum</p>
          <div class="f14-hero__divider">
            <span></span><span class="f14-hero__diamond">◆</span><span></span>
          </div>
          <p class="f14-hero__desc">
            A scholarly pursuit of garments.<br />
            Bound in tradition, pressed by time.
          </p>
          <div class="f14-hero__meta">
            <span>IV DOMUS</span>
            <span>·</span>
            <span>XXIV OBJECTA</span>
            <span>·</span>
            <span>EST. MMXXVI</span>
          </div>
          <RouterLink to="/products" class="f14-hero__cta">Enter the Library</RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Epigraph ═══ -->
    <section class="f14-epigraph">
      <div class="f14-epigraph__inner">
        <p class="f14-epigraph__label">— EPIGRAPHUM —</p>
        <blockquote>
          <p>"Vestis virum facit."</p>
          <cite>— The clothes make the man · Erasmus of Rotterdam</cite>
        </blockquote>
      </div>
    </section>

    <!-- ═══ Prolegomena (서론) ═══ -->
    <section class="f14-proleg">
      <div class="f14-proleg__inner">
        <p class="f14-proleg__label">— PROLEGOMENA —</p>
        <h2 class="f14-proleg__title">A Note on Method</h2>
        <div class="f14-proleg__cols">
          <p>
            FORME의 큐레이션은 학문적 방법론에 기반합니다. 한 벌의 옷을
            고르는 일은 한 권의 책을 고르는 일과 같습니다. 소재의 진위를
            확인하고, 봉제의 정밀도를 검증하며, 시간의 시험을 견딜 수
            있는지 판단합니다.
          </p>
          <p>
            네 개의 브랜드 — Beanpole, Carhartt, Levi's, Dickies — 를
            선별한 기준은 하나입니다. "이 옷은 10년 후에도 입을 가치가
            있는가." 이 질문에 확신 있게 답할 수 있는 것만을
            이 서가에 올렸습니다.
          </p>
        </div>
        <p class="f14-proleg__sign">— Praefatio, FORME Academia, MMXXVI</p>
      </div>
    </section>

    <!-- ═══ Chapters (4 Brands) ═══ -->
    <section class="f14-chapters">
      <div class="f14-section-head">
        <p class="f14-section-head__label">— CAPITA —</p>
        <h2 class="f14-section-head__title">Four Volumes of Heritage</h2>
      </div>

      <div class="f14-chapters__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f14-ch"
        >
          <div class="f14-ch__no">Vol. {{ roman[i] }}</div>
          <div class="f14-ch__frame">
            <div class="f14-ch__img-wrap">
              <img :src="b.img" :alt="b.name" />
              <div class="f14-ch__hover">
                <span>Legere →</span>
              </div>
            </div>
          </div>
          <h3>{{ b.name }}</h3>
          <p class="f14-ch__since">{{ b.since }}</p>
          <div class="f14-ch__ornament">❦</div>
          <p class="f14-ch__quote">"{{ b.quote }}"</p>
          <p class="f14-ch__city">{{ b.city }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Marginalia (사이드 노트) ═══ -->
    <section class="f14-marginalia">
      <div class="f14-marginalia__inner">
        <div class="f14-marginalia__col">
          <p class="f14-marginalia__label">— MARGINALIA I —</p>
          <h3>De Materia</h3>
          <p class="f14-marginalia__text">
            좋은 소재는 시간이 지날수록 드러납니다.<br />
            면은 부드러워지고, 데님은 바래지며,<br />
            캔버스는 몸의 형태를 기억합니다.<br /><br />
            이것이 우리가 소재를 먼저 보는 이유입니다.
          </p>
          <p class="f14-marginalia__ref">— Ref. Cotton Studies, Ch. III, p. 47</p>
        </div>
        <div class="f14-marginalia__col">
          <p class="f14-marginalia__label">— MARGINALIA II —</p>
          <h3>De Sutura</h3>
          <p class="f14-marginalia__text">
            봉제의 정밀함은 눈에 보이지 않는 곳에서 빛납니다.<br />
            뒤집어 보았을 때, 안감의 마감,<br />
            단추 구멍의 정성, 솔기의 직선.<br /><br />
            겉이 아닌 안을 먼저 봅니다.
          </p>
          <p class="f14-marginalia__ref">— Ref. Stitching Manual, Ch. V, p. 112</p>
        </div>
      </div>
    </section>

    <!-- ═══ Catalogus (상품) ═══ -->
    <section class="f14-catalogus">
      <div class="f14-section-head">
        <p class="f14-section-head__label">— CATALOGUS —</p>
        <h2 class="f14-section-head__title">Items of Note</h2>
      </div>

      <div class="f14-catalogus__scroll" ref="scrollRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f14-item"
        >
          <div class="f14-item__plate">
            <span class="f14-item__no">No. {{ String(i + 1).padStart(3, '0') }}</span>
            <div class="f14-item__img-wrap">
              <img :src="p.img" :alt="p.name" />
            </div>
            <span class="f14-item__plate-label">{{ p.brand }} · {{ p.year }}</span>
          </div>
          <h3>{{ p.name }}</h3>
          <p class="f14-item__price">{{ p.price }} KRW</p>
        </RouterLink>
      </div>

      <div class="f14-catalogus__nav">
        <button @click="scrollCatalog(-1)">◁</button>
        <button @click="scrollCatalog(1)">▷</button>
      </div>
    </section>

    <!-- ═══ Index Rerum (색인 테이블) ═══ -->
    <section class="f14-index">
      <div class="f14-section-head">
        <p class="f14-section-head__label">— INDEX RERUM —</p>
        <h2 class="f14-section-head__title">Registry of Houses</h2>
      </div>

      <table class="f14-index__table">
        <thead>
          <tr>
            <th>Vol.</th>
            <th>Domus</th>
            <th>Annus</th>
            <th>Urbs</th>
            <th>Objecta</th>
            <th>Nota</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, i) in brands" :key="b.id">
            <td class="f14-index__vol">{{ roman[i] }}</td>
            <td class="f14-index__name">{{ b.name }}</td>
            <td>{{ b.romanYear }}</td>
            <td class="f14-index__city">{{ b.city }}</td>
            <td>{{ b.items }}</td>
            <td class="f14-index__nota">★ {{ b.rating }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- ═══ Lectio (에세이) ═══ -->
    <section class="f14-lectio">
      <div class="f14-lectio__inner">
        <p class="f14-lectio__label">— LECTIO —</p>
        <h2 class="f14-lectio__title">옷 한 벌의 시간</h2>
        <div class="f14-lectio__ornament">❦</div>
        <div class="f14-lectio__body">
          <p>
            "오래 입는 옷에는 시간이 녹아있다"고 선배 학자가 말했습니다.
            10년이 지나도 손이 가는 셔츠, 20년이 지나도 여전히 입을 수
            있는 데님. 그런 옷들은 단순히 '유행을 타지 않아서'가 아니라,
            처음부터 <em>오래 입히기 위해 만들어졌기</em> 때문입니다.
          </p>
          <p>
            FORME Academia의 큐레이션은 이 한 가지 질문에서 출발합니다.
            "이 옷은 한 세대 후에도 입을 가치가 있을까."
            그 질문에 확신 있게 답할 수 있는 옷들만을 골라
            이 서가에 올렸습니다.
          </p>
        </div>
        <p class="f14-lectio__sign">— Lectio Inauguralis, FORME Academia, Ver MMXXVI</p>
      </div>
    </section>

    <!-- ═══ Colophon (판권) ═══ -->
    <section class="f14-colophon">
      <div class="f14-colophon__paper">
        <div class="f14-colophon__header">
          <p>COLOPHON</p>
        </div>
        <div class="f14-colophon__divider">· · · · · · · · · · · · · · · · · ·</div>
        <div class="f14-colophon__body">
          <div class="f14-colophon__row"><span>Titulus</span><span>FORME ACADEMIA</span></div>
          <div class="f14-colophon__row"><span>Editio</span><span>Vol. XIV · Ver MMXXVI</span></div>
          <div class="f14-colophon__row"><span>Domus</span><span>IV (Beanpole · Carhartt · Levi's · Dickies)</span></div>
          <div class="f14-colophon__row"><span>Objecta</span><span>XXIV Selecta</span></div>
          <div class="f14-colophon__row"><span>Curator</span><span>FORME EDITORIAL</span></div>
          <div class="f14-colophon__row"><span>Urbs</span><span>SEUL, COREA</span></div>
        </div>
        <div class="f14-colophon__divider">· · · · · · · · · · · · · · · · · ·</div>
        <div class="f14-colophon__footer">
          <p>IMPRESSUM · MANU FACTUM · QUALITAS PROBATA</p>
        </div>
      </div>
    </section>

    <!-- ═══ Closing ═══ -->
    <section class="f14-closing">
      <div class="f14-closing__ornament">❦</div>
      <p class="f14-closing__text">
        "Tempus fugit,<br />
        <em>sed vestis manet.</em>"
      </p>
      <p class="f14-closing__trans">시간은 흐르되, 옷은 남는다.</p>
      <div class="f14-closing__ornament">❦</div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f14-foot">
      <div class="f14-foot__top">
        <div class="f14-foot__brand">
          <p class="f14-foot__logo">FORME</p>
          <p class="f14-foot__sub">ACADEMIA VESTIMENTA</p>
          <div class="f14-foot__orn">❦</div>
          <p class="f14-foot__est">EST. MMXXVI · SEUL</p>
        </div>
        <div class="f14-foot__grid">
          <div class="f14-foot__col">
            <p class="f14-foot__label">— CAPITA —</p>
            <RouterLink to="/beanpole">Vol. I · Beanpole</RouterLink>
            <RouterLink to="/carhartt">Vol. II · Carhartt</RouterLink>
            <RouterLink to="/levis">Vol. III · Levi's</RouterLink>
            <RouterLink to="/dickies">Vol. IV · Dickies</RouterLink>
          </div>
          <div class="f14-foot__col">
            <p class="f14-foot__label">— BIBLIOTHECA —</p>
            <RouterLink to="/products">Catalogus</RouterLink>
            <RouterLink to="/cart">Scrinium</RouterLink>
            <RouterLink to="/mypage">Tabularium</RouterLink>
          </div>
          <div class="f14-foot__col">
            <p class="f14-foot__label">— EPISTULAE —</p>
            <RouterLink to="/faq">Quaestiones</RouterLink>
            <RouterLink to="/qna">Correspondentia</RouterLink>
            <p>epistulae@forme.ac</p>
          </div>
        </div>
      </div>
      <div class="f14-foot__border">
        <span></span><span class="f14-foot__diamond">◆</span><span></span>
      </div>
      <div class="f14-foot__bottom">
        <span>© MMXXVI FORME ACADEMIA</span>
        <span>OMNIA IURA RESERVATA</span>
        <span>IN PERPETUUM</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const scrollRef = ref(null);
function scrollCatalog(dir) {
  if (!scrollRef.value) return;
  scrollRef.value.scrollBy({ left: dir * 380, behavior: "smooth" });
}

const roman = ["I", "II", "III", "IV"];

const brands = [
  { id: 1, name: "Beanpole",  since: "MCMLXXXIX",   romanYear: "MCMLXXXIX",  city: "Seoul, Corea",         items: "CXLII",  rating: "4.7", quote: "Tradition pressed into form",    route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "Carhartt",  since: "MDCCCLXXXIX", romanYear: "MDCCCLXXXIX", city: "Detroit, America",     items: "XCVIII", rating: "4.8", quote: "Honest labor, honest cloth",     route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "Levi's",    since: "MDCCCLXXIII", romanYear: "MDCCCLXXIII", city: "San Francisco, America", items: "CCXV",  rating: "4.9", quote: "The blue book of denim",          route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "Dickies",   since: "MCMXXII",     romanYear: "MCMXXII",    city: "Fort Worth, America",  items: "LXXXVII", rating: "4.6", quote: "Work, a scholarly discipline",    route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "Beanpole", year: "MCMLXXXIX",  name: "헤리티지 칼라넥 티셔츠",      price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   year: "MDCCCLXXIII", name: "555™ 릴렉스 스트레이트 진",   price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "Carhartt", year: "MDCCCLXXXIX", name: "루즈핏 캔버스 워크 팬츠",     price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  year: "MCMXXII",     name: "카펜터 유틸리티 데님 팬츠",   price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 103, brand: "Carhartt", year: "MDCCCLXXXIX", name: "B01 더블프런트 트라우저",     price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 401, brand: "Beanpole", year: "MCMLXXXIX",   name: "피그먼트 워싱 치노 팬츠",    price: "239,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "Levi's",   year: "MDCCCLXXIII", name: "565™ 루즈 스트레이트 진",    price: "99,000",  img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 304, brand: "Dickies",  year: "MCMXXII",     name: "트리 로고 롱슬리브",         price: "69,000",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 14 — Dark Academia
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f14 {
  background: #1a0f0a;
  color: #d4c4a8;
  font-family: "Bodoni Moda", "Cormorant Garamond", Georgia, serif;
  min-height: 100dvh;
  background-image: radial-gradient(ellipse at center, #2a1a12 0%, #1a0f0a 70%);
}

/* ── 자체 상단바 ── */
.f14-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(26, 15, 10, 0.95);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid rgba(139, 111, 71, 0.3);
  font-size: 0.625rem;
  letter-spacing: 0.2em;
}
.f14-topbar__left, .f14-topbar__right {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}
.f14-topbar__right { justify-content: flex-end; }
.f14-topbar__link {
  color: #8b6f47;
  font-style: italic;
  transition: color 0.2s;
}
.f14-topbar__link:hover { color: #d4c4a8; }
.f14-topbar__sep { color: #8b6f47; font-size: 0.875rem; }
.f14-topbar__vol { color: #8b6f47; font-style: italic; }
.f14-topbar__center {
  display: flex;
  align-items: baseline;
  gap: 0.75rem;
  justify-content: center;
}
.f14-topbar__logo {
  font-size: 1.25rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  color: #d4c4a8;
}
.f14-topbar__sub {
  font-style: italic;
  font-size: 0.6875rem;
  color: #8b6f47;
  letter-spacing: 0.15em;
}
.f14-topbar__date { color: #d4c4a8; font-style: italic; }

/* ── Hero ── */
.f14-hero {
  min-height: calc(100dvh - 48px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.f14-hero__border {
  border: 1px solid #8b6f47;
  padding: 1rem;
  max-width: 46rem;
}
.f14-hero__inner-border {
  border: 1px solid rgba(139, 111, 71, 0.4);
  padding: 5rem 4rem;
  text-align: center;
}
.f14-hero__eyebrow {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #8b6f47;
  margin-bottom: 1.5rem;
}
.f14-hero__ornament {
  font-size: 1.75rem;
  color: #8b6f47;
  margin-bottom: 2rem;
}
.f14-hero__title {
  font-size: clamp(5rem, 12vw, 9rem);
  font-weight: 400;
  line-height: 0.9;
  letter-spacing: 0.03em;
  color: #d4c4a8;
  margin-bottom: 0.75rem;
}
.f14-hero__latin {
  font-style: italic;
  font-size: 1.5rem;
  color: #b8a280;
  margin-bottom: 2.5rem;
  letter-spacing: 0.05em;
}
.f14-hero__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2.5rem;
}
.f14-hero__divider span:first-child,
.f14-hero__divider span:last-child {
  width: 4rem;
  height: 1px;
  background: #8b6f47;
}
.f14-hero__diamond { font-size: 0.5rem; color: #8b6f47; }
.f14-hero__desc {
  font-style: italic;
  font-size: 1.0625rem;
  line-height: 2;
  color: #b8a280;
  margin-bottom: 2rem;
}
.f14-hero__meta {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #6b5a40;
  margin-bottom: 3rem;
}
.f14-hero__cta {
  display: inline-block;
  padding: 1rem 2.5rem;
  border: 1px solid #8b6f47;
  color: #d4c4a8;
  font-size: 0.8125rem;
  font-style: italic;
  letter-spacing: 0.2em;
  transition: all 0.4s;
}
.f14-hero__cta:hover {
  background: #8b6f47;
  color: #1a0f0a;
}

/* ── Section Head ── */
.f14-section-head {
  text-align: center;
  padding: 5rem 2rem 3rem;
}
.f14-section-head__label {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #8b6f47;
  margin-bottom: 1.25rem;
}
.f14-section-head__title {
  font-size: clamp(2.25rem, 5vw, 3.75rem);
  font-weight: 400;
  color: #d4c4a8;
  letter-spacing: 0.01em;
}

/* ── Epigraph ── */
.f14-epigraph {
  padding: 8rem 2rem;
  border-top: 1px solid rgba(139, 111, 71, 0.2);
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-epigraph__inner {
  max-width: 44rem;
  margin: 0 auto;
  text-align: center;
}
.f14-epigraph__label {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #6b5a40;
  margin-bottom: 2.5rem;
}
.f14-epigraph blockquote p {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-style: italic;
  font-weight: 400;
  color: #d4c4a8;
  margin-bottom: 1.75rem;
  line-height: 1.3;
}
.f14-epigraph cite {
  font-size: 0.875rem;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #8b6f47;
}

/* ── Prolegomena ── */
.f14-proleg {
  padding: 8rem 2rem;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-proleg__inner {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}
.f14-proleg__label {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #6b5a40;
  margin-bottom: 1.5rem;
}
.f14-proleg__title {
  font-size: 2.25rem;
  font-weight: 400;
  color: #d4c4a8;
  margin-bottom: 3rem;
}
.f14-proleg__cols {
  column-count: 2;
  column-gap: 3rem;
  text-align: left;
  margin-bottom: 2rem;
}
.f14-proleg__cols p {
  font-size: 0.9375rem;
  line-height: 2;
  color: #b8a280;
  margin-bottom: 1rem;
}
.f14-proleg__cols p::first-letter {
  font-size: 2.5rem;
  float: left;
  line-height: 0.9;
  padding: 0.25rem 0.5rem 0 0;
  color: #d4c4a8;
  font-weight: 400;
}
.f14-proleg__sign {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.2em;
  color: #6b5a40;
  text-align: center;
}

/* ── Chapters ── */
.f14-chapters {
  padding-bottom: 6rem;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-chapters__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}
@media (min-width: 768px) { .f14-chapters__grid { grid-template-columns: 1fr 1fr; } }

.f14-ch {
  text-align: center;
  color: inherit;
  padding: 2rem;
  border: 1px solid rgba(139, 111, 71, 0.15);
  transition: border-color 0.4s, background 0.4s;
}
.f14-ch:hover {
  border-color: rgba(139, 111, 71, 0.4);
  background: rgba(139, 111, 71, 0.05);
}
.f14-ch__no {
  font-style: italic;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #8b6f47;
  margin-bottom: 1.5rem;
}
.f14-ch__frame {
  padding: 0.75rem;
  border: 1px solid rgba(139, 111, 71, 0.3);
  margin-bottom: 1.75rem;
}
.f14-ch__img-wrap {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
}
.f14-ch__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: sepia(0.5) contrast(0.9) brightness(0.82);
  transition: filter 0.8s, transform 0.8s;
}
.f14-ch:hover .f14-ch__img-wrap img {
  filter: sepia(0.3) contrast(0.95) brightness(0.9);
  transform: scale(1.03);
}
.f14-ch__hover {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(26, 15, 10, 0.4);
  opacity: 0;
  transition: opacity 0.5s;
  font-style: italic;
  font-size: 1.125rem;
  color: #d4c4a8;
  letter-spacing: 0.1em;
}
.f14-ch:hover .f14-ch__hover { opacity: 1; }
.f14-ch h3 {
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.375rem;
  letter-spacing: 0.02em;
}
.f14-ch__since {
  font-style: italic;
  font-size: 0.75rem;
  color: #8b6f47;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
}
.f14-ch__ornament {
  font-size: 1rem;
  color: #8b6f47;
  margin-bottom: 1rem;
}
.f14-ch__quote {
  font-style: italic;
  font-size: 1rem;
  color: #b8a280;
  line-height: 1.6;
  padding: 0 1rem;
  margin-bottom: 0.75rem;
}
.f14-ch__city {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #6b5a40;
}

/* ── Marginalia ── */
.f14-marginalia {
  padding: 10rem 2rem;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
  background: rgba(42, 26, 18, 0.3);
}
.f14-marginalia__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 5rem 4rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f14-marginalia__inner { grid-template-columns: 1fr 1fr; } }
.f14-marginalia__col {
  border-top: 1px solid rgba(139, 111, 71, 0.3);
  padding-top: 2.5rem;
  border-left: 3px solid rgba(139, 111, 71, 0.3);
  padding-left: 2rem;
}
.f14-marginalia__label {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.3em;
  color: #6b5a40;
  margin-bottom: 1.25rem;
}
.f14-marginalia__col h3 {
  font-size: 2rem;
  font-weight: 400;
  color: #d4c4a8;
  margin-bottom: 1.5rem;
  font-style: italic;
}
.f14-marginalia__text {
  font-size: 0.9375rem;
  line-height: 2;
  color: #b8a280;
  margin-bottom: 1.5rem;
}
.f14-marginalia__ref {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.15em;
  color: #6b5a40;
}

/* ── Catalogus ── */
.f14-catalogus {
  padding: 5rem 0;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-catalogus__scroll {
  display: flex;
  gap: 2.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 2rem 1rem;
}
.f14-catalogus__scroll::-webkit-scrollbar { display: none; }
.f14-catalogus__nav {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 2rem;
}
.f14-catalogus__nav button {
  width: 2.75rem;
  height: 2.75rem;
  background: transparent;
  border: 1px solid #8b6f47;
  color: #d4c4a8;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
}
.f14-catalogus__nav button:hover {
  background: #8b6f47;
  color: #1a0f0a;
}

.f14-item {
  flex: 0 0 300px;
  scroll-snap-align: start;
  text-align: center;
  color: inherit;
}
.f14-item__plate {
  position: relative;
  background: rgba(26, 15, 10, 0.5);
  border: 1px solid rgba(139, 111, 71, 0.3);
  padding: 2rem 2rem 1rem;
  margin-bottom: 1.25rem;
  transition: border-color 0.3s;
}
.f14-item:hover .f14-item__plate { border-color: rgba(139, 111, 71, 0.6); }
.f14-item__no {
  display: block;
  font-style: italic;
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  color: #8b6f47;
  margin-bottom: 1rem;
}
.f14-item__img-wrap {
  aspect-ratio: 1/1;
  overflow: hidden;
  margin-bottom: 1rem;
}
.f14-item__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: sepia(0.3) brightness(0.95);
  transition: transform 0.7s;
}
.f14-item:hover .f14-item__img-wrap img { transform: scale(1.04); }
.f14-item__plate-label {
  font-size: 0.5625rem;
  letter-spacing: 0.2em;
  color: #6b5a40;
}
.f14-item h3 {
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f14-item__price {
  font-style: italic;
  font-size: 0.875rem;
  color: #b8a280;
}

/* ── Index Rerum ── */
.f14-index {
  padding-bottom: 6rem;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-index__table {
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  border-collapse: collapse;
}
.f14-index__table th {
  text-align: left;
  padding: 1rem 1.25rem;
  border-bottom: 2px solid #8b6f47;
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #8b6f47;
  font-weight: 400;
}
.f14-index__table td {
  padding: 1.5rem 1.25rem;
  border-bottom: 1px solid rgba(139, 111, 71, 0.15);
  font-size: 0.9375rem;
  color: #b8a280;
}
.f14-index__table tr { transition: background 0.3s; cursor: pointer; }
.f14-index__table tr:hover { background: rgba(139, 111, 71, 0.06); }
.f14-index__vol { font-style: italic; color: #8b6f47; font-size: 1rem; }
.f14-index__name { font-size: 1.125rem; color: #d4c4a8; font-weight: 400; }
.f14-index__city { font-style: italic; }
.f14-index__nota { color: #c9a86b; }

/* ── Lectio ── */
.f14-lectio {
  padding: 10rem 2rem;
  background: #0f0906;
  border-bottom: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-lectio__inner {
  max-width: 44rem;
  margin: 0 auto;
  text-align: center;
}
.f14-lectio__label {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #6b5a40;
  margin-bottom: 1.5rem;
}
.f14-lectio__title {
  font-family: 'Noto Serif KR', serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 300;
  color: #d4c4a8;
  margin-bottom: 1.5rem;
}
.f14-lectio__ornament {
  font-size: 1.5rem;
  color: #8b6f47;
  margin-bottom: 2.5rem;
}
.f14-lectio__body {
  text-align: left;
  column-count: 1;
  margin-bottom: 2.5rem;
}
@media (min-width: 640px) { .f14-lectio__body { column-count: 2; column-gap: 2.5rem; } }
.f14-lectio__body p {
  font-size: 1rem;
  line-height: 2;
  color: #b8a280;
  margin-bottom: 1.5rem;
}
.f14-lectio__body em {
  font-style: italic;
  color: #c9a86b;
}
.f14-lectio__sign {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.2em;
  color: #6b5a40;
  text-align: center;
}

/* ── Colophon ── */
.f14-colophon {
  padding: 8rem 2rem;
  display: flex;
  justify-content: center;
}
.f14-colophon__paper {
  background: rgba(245, 239, 227, 0.04);
  border: 1px solid rgba(139, 111, 71, 0.3);
  padding: 3rem 3rem;
  max-width: 28rem;
  width: 100%;
  color: #d4c4a8;
  text-align: center;
}
.f14-colophon__header p {
  font-size: 0.75rem;
  font-style: italic;
  letter-spacing: 0.35em;
  color: #8b6f47;
  margin-bottom: 0.5rem;
}
.f14-colophon__divider {
  color: #6b5a40;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  margin: 1.5rem 0;
}
.f14-colophon__row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px dotted rgba(139, 111, 71, 0.2);
  font-size: 0.8125rem;
}
.f14-colophon__row span:first-child {
  font-style: italic;
  color: #8b6f47;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
}
.f14-colophon__row span:last-child {
  font-weight: 400;
  font-size: 0.75rem;
}
.f14-colophon__footer p {
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  color: #6b5a40;
}

/* ── Closing ── */
.f14-closing {
  padding: 10rem 2rem;
  text-align: center;
  border-top: 1px solid rgba(139, 111, 71, 0.2);
}
.f14-closing__ornament {
  font-size: 1.75rem;
  color: #8b6f47;
  margin-bottom: 2rem;
}
.f14-closing__ornament:last-child { margin-top: 2rem; margin-bottom: 0; }
.f14-closing__text {
  font-size: clamp(2rem, 4.5vw, 3.25rem);
  font-style: italic;
  font-weight: 400;
  color: #d4c4a8;
  line-height: 1.3;
  margin-bottom: 1.5rem;
}
.f14-closing__text em { color: #c9a86b; }
.f14-closing__trans {
  font-family: 'Noto Serif KR', serif;
  font-size: 1.125rem;
  font-weight: 300;
  color: #8b6f47;
  letter-spacing: 0.05em;
}

/* ── Footer ── */
.f14-foot {
  background: #0f0906;
  border-top: 1px solid rgba(139, 111, 71, 0.3);
}
.f14-foot__top {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  padding: 5rem 3rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(139, 111, 71, 0.15);
}
.f14-foot__logo {
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #d4c4a8;
  margin-bottom: 0.375rem;
}
.f14-foot__sub {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #8b6f47;
  margin-bottom: 1rem;
}
.f14-foot__orn {
  font-size: 1rem;
  color: #8b6f47;
  margin-bottom: 1rem;
}
.f14-foot__est {
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.2em;
  color: #6b5a40;
}

.f14-foot__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2.5rem;
}
.f14-foot__label {
  font-size: 0.5625rem;
  font-style: italic;
  letter-spacing: 0.3em;
  color: #8b6f47;
  margin-bottom: 1rem;
}
.f14-foot__col a,
.f14-foot__col p {
  display: block;
  font-size: 0.8125rem;
  font-style: italic;
  color: #b8a280;
  margin-bottom: 0.625rem;
  transition: color 0.2s;
  letter-spacing: 0.03em;
}
.f14-foot__col a:hover { color: #d4c4a8; }

.f14-foot__border {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  padding: 1.5rem 0;
  max-width: 1200px;
  margin: 0 auto;
}
.f14-foot__border span:first-child,
.f14-foot__border span:last-child {
  flex: 1;
  height: 1px;
  background: rgba(139, 111, 71, 0.2);
  max-width: 8rem;
}
.f14-foot__diamond { font-size: 0.5rem; color: #8b6f47; }

.f14-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 3rem;
  max-width: 1200px;
  margin: 0 auto;
  font-size: 0.5625rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #6b5a40;
}
</style>
