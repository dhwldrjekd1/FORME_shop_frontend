<template>
  <main class="page-wrapper f25">
    <!-- 프로모션 바 -->
    <div class="f25-promo-bar">
      <span>무료 반품</span><em>·</em>
      <span>전 상품 무이자 할부</span><em>·</em>
      <span>당일 발송</span><em>·</em>
      <span>5만원 이상 무료 배송</span>
    </div>

    <!-- 헤더 -->
    <header class="f25-head">
      <div class="f25-head__logo">FORME</div>
      <p class="f25-head__sub">THE HOUSE OF CURATED CLASSICS</p>
      <nav class="f25-head__nav">
        <a>신상품</a>
        <a>브랜드</a>
        <a>상의</a>
        <a>하의</a>
        <a>아우터</a>
        <a>액세서리</a>
        <a>편집실</a>
        <a class="f25-head__nav-sale">할인관</a>
      </nav>
      <div class="f25-head__bottom">
        <div class="f25-head__util">
          <span>🔍 검색</span>
          <span>♡ 찜</span>
          <span>👤 마이</span>
          <span>🛍 장바구니 (0)</span>
        </div>
      </div>
    </header>

    <!-- 히어로 (분할) -->
    <section class="f25-hero">
      <div class="f25-hero__left">
        <p class="f25-hero__tag">SPRING · 2026 · ISSUE N° 01</p>
        <h1 class="f25-hero__title">
          품격 있는<br />
          <em>하루의 옷</em>
        </h1>
        <div class="f25-hero__divider"></div>
        <p class="f25-hero__desc">
          FORME은 매주 한 권의 카탈로그처럼 업데이트됩니다.<br />
          4개의 헤리티지 브랜드, 오래 입을 수 있는 좋은 옷.
        </p>
        <div class="f25-hero__meta">
          <span>4 BRANDS</span>
          <span>·</span>
          <span>542 ITEMS</span>
          <span>·</span>
          <span>EST. 2026</span>
        </div>
        <a class="f25-hero__cta">이번 주 카탈로그 보기 →</a>
      </div>
      <div class="f25-hero__right">
        <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" />
        <div class="f25-hero__label">
          <span>N° 01</span>
          <p>Beanpole · Heritage Club</p>
        </div>
      </div>
    </section>

    <!-- 카탈로그 섹션 제목 -->
    <div class="f25-divider">
      <span class="f25-divider__line"></span>
      <h2>THIS WEEK'S CATALOG</h2>
      <span class="f25-divider__line"></span>
    </div>

    <!-- 브랜드 인덱스 -->
    <section class="f25-index">
      <table class="f25-index__table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Brand</th>
            <th>Since</th>
            <th>Origin</th>
            <th>Items</th>
            <th>Chapter</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(b, i) in brands" :key="b.name">
            <td class="f25-index__no">0{{ i + 1 }}</td>
            <td class="f25-index__brand">{{ b.name }}</td>
            <td class="f25-index__since">{{ b.since }}</td>
            <td class="f25-index__origin">{{ b.origin }}</td>
            <td class="f25-index__items">{{ b.items }}</td>
            <td class="f25-index__chapter">→ 보기</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 챕터 1 -->
    <section class="f25-chapter">
      <div class="f25-chapter__head">
        <span class="f25-chapter__no">— Chapter I —</span>
        <h2>Beanpole, <em>the Korean Classic</em></h2>
        <p>1989년 서울. 단정한 한국 클래식이 시작된 자리.</p>
      </div>
      <div class="f25-chapter__body">
        <div class="f25-chapter__lead">
          <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="beanpole" />
          <p class="f25-chapter__caption">— Photograph by FORME Studio, 2026</p>
        </div>
        <div class="f25-chapter__products">
          <div v-for="(p, i) in beanpoleProducts" :key="i" class="f25-item">
            <div class="f25-item__img"><img :src="p.img" :alt="p.name" /></div>
            <p class="f25-item__no">N° {{ String(i + 1).padStart(3, '0') }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f25-item__price">₩ {{ p.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 챕터 2 -->
    <section class="f25-chapter f25-chapter--alt">
      <div class="f25-chapter__head">
        <span class="f25-chapter__no">— Chapter II —</span>
        <h2>Carhartt, <em>Honest Labor</em></h2>
        <p>1889년 디트로이트. 작업장의 정직함이 옷이 된 순간.</p>
      </div>
      <div class="f25-chapter__body f25-chapter__body--reverse">
        <div class="f25-chapter__lead">
          <img src="https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" alt="carhartt" />
          <p class="f25-chapter__caption">— Photograph by FORME Studio, 2026</p>
        </div>
        <div class="f25-chapter__products">
          <div v-for="(p, i) in carharttProducts" :key="i" class="f25-item">
            <div class="f25-item__img"><img :src="p.img" :alt="p.name" /></div>
            <p class="f25-item__no">N° {{ String(i + 1).padStart(3, '0') }}</p>
            <h3>{{ p.name }}</h3>
            <p class="f25-item__price">₩ {{ p.price }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 에세이 -->
    <section class="f25-essay">
      <div class="f25-essay__inner">
        <p class="f25-essay__tag">— Editor's Letter —</p>
        <h2>옷 한 벌의 시간</h2>
        <p class="f25-essay__body">
          "오래 입는 옷에는 시간이 녹아있다"고 선배 에디터가 말했습니다.
          10년이 지나도 손이 가는 셔츠, 20년이 지나도 여전히 입을 수 있는
          데님. 그런 옷들은 단순히 '유행을 타지 않아서'가 아니라, 처음부터
          <em>오래 입히기 위해 만들어졌기</em> 때문입니다.
          <br /><br />
          FORME의 큐레이션은 이 한 가지 질문에서 출발합니다. "이 옷은
          10년 후에도 입을 수 있을까." 그 질문에 확신 있게 답할 수 있는
          옷들만을 골라 이 자리에 모았습니다.
        </p>
        <p class="f25-essay__sign">— FORME Editorial, Spring 2026</p>
      </div>
    </section>

    <!-- 서비스 -->
    <section class="f25-service">
      <h3 class="f25-service__title">FORME SERVICE</h3>
      <div class="f25-service__grid">
        <div v-for="(s, i) in services" :key="i" class="f25-service__item">
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="f25-foot">
      <div class="f25-foot__top">
        <h3 class="f25-foot__logo">FORME</h3>
        <p class="f25-foot__slogan">The House of Curated Classics</p>
        <p class="f25-foot__est">EST. MMXXVI · SEOUL, KOREA</p>
      </div>
      <div class="f25-foot__grid">
        <div>
          <h4>SHOP</h4>
          <a>신상품</a><a>브랜드</a><a>카탈로그</a><a>편집실</a><a>할인관</a>
        </div>
        <div>
          <h4>SERVICE</h4>
          <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a><a>선물 포장</a>
        </div>
        <div>
          <h4>CUSTOMER</h4>
          <a>고객센터 1588-0000</a><a>1:1 문의</a><a>FAQ</a><a>공지사항</a>
        </div>
        <div>
          <h4>ABOUT</h4>
          <a>브랜드 스토리</a><a>편집자 서신</a><a>입점 문의</a><a>매장 안내</a>
        </div>
      </div>
      <div class="f25-foot__legal">
        <p>(주)FORME | 대표이사 김보경 | 사업자등록번호 000-00-00000 | 통신판매업신고 2026-서울강남-00000</p>
        <p>서울특별시 강남구 테헤란로 000 | 개인정보책임자 김보경 | privacy@forme.kr</p>
        <p>© 2026 FORME. All rights reserved. · <em>All catalogs printed on recycled paper.</em></p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const brands = [
  { name: "BEANPOLE", since: "1989", origin: "Seoul, Korea",         items: "142 items" },
  { name: "CARHARTT", since: "1889", origin: "Detroit, USA",         items: "98 items"  },
  { name: "LEVI'S",   since: "1873", origin: "San Francisco, USA",   items: "215 items" },
  { name: "DICKIES",  since: "1922", origin: "Fort Worth, USA",      items: "87 items"  },
];
const beanpoleProducts = [
  { name: "헤리티지 울 코트",        price: "459,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "리넨 혼방 옥스포드 셔츠", price: "149,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "컴포트핏 치노 팬츠",      price: "239,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
];
const carharttProducts = [
  { name: "러기드 플렉스 워크 팬츠",    price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "B01 더블프런트 트라우저",    price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "헤비웨이트 포켓 티셔츠",     price: "57,000",  img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
const services = [
  { title: "PERSONAL SHOPPING", desc: "에디터가 취향에 맞는 셀렉션을 제안합니다. 예약제로 운영됩니다." },
  { title: "ALTERATION",        desc: "모든 바지 상품은 기장 수선 서비스가 포함되어 있습니다." },
  { title: "GIFT PACKAGING",    desc: "선물용 패키지를 무료로 제공합니다. 손글씨 카드 포함." },
  { title: "MEMBERSHIP",        desc: "연간 멤버십 가입 시 독점 카탈로그와 시즌 선물이 제공됩니다." },
];
</script>

<style scoped>
.f25 {
  background: #f8f4eb;
  color: #2a241c;
  font-family: 'Noto Serif KR', 'Bodoni Moda', serif;
  min-height: 100dvh;
}

/* Promo bar */
.f25-promo-bar {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.75rem 2rem;
  background: #2a241c;
  color: #f8f4eb;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}
.f25-promo-bar em { font-style: normal; opacity: 0.4; }

/* Header */
.f25-head { text-align: center; padding: 2.5rem 3rem 0; border-bottom: 1px solid #2a241c; }
.f25-head__logo { font-size: 3.5rem; font-weight: 400; letter-spacing: 0.08em; line-height: 1; margin-bottom: 0.5rem; }
.f25-head__sub { font-size: 0.75rem; font-style: italic; letter-spacing: 0.3em; color: #8b7340; margin-bottom: 2rem; }
.f25-head__nav {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  padding: 1.25rem 0;
  border-top: 1px solid rgba(42, 36, 28, 0.2);
  border-bottom: 1px solid rgba(42, 36, 28, 0.2);
}
.f25-head__nav a { font-size: 0.9375rem; color: #2a241c; cursor: pointer; font-family: 'Noto Serif KR', serif; }
.f25-head__nav-sale { color: #8b2322; font-style: italic; }
.f25-head__bottom { padding: 0.875rem 0; }
.f25-head__util { display: flex; justify-content: center; gap: 2rem; font-size: 0.75rem; color: #666; }
.f25-head__util span { cursor: pointer; }

/* Hero */
.f25-hero {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 4rem;
  padding: 5rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
  align-items: center;
}
.f25-hero__left { padding-right: 2rem; }
.f25-hero__tag { font-size: 0.75rem; font-style: italic; letter-spacing: 0.2em; color: #8b7340; margin-bottom: 2rem; }
.f25-hero__title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; line-height: 1.05; margin-bottom: 1.5rem; }
.f25-hero__title em { font-style: italic; color: #8b2322; }
.f25-hero__divider { width: 4rem; height: 2px; background: #2a241c; margin-bottom: 1.5rem; }
.f25-hero__desc { font-size: 1rem; line-height: 1.9; color: #5a5040; margin-bottom: 2rem; }
.f25-hero__meta { font-size: 0.75rem; letter-spacing: 0.2em; color: #8b7340; margin-bottom: 2.5rem; }
.f25-hero__cta {
  display: inline-block;
  padding: 1rem 2rem;
  border: 1px solid #2a241c;
  font-size: 0.8125rem;
  font-style: italic;
  color: #2a241c;
  cursor: pointer;
}
.f25-hero__right { position: relative; }
.f25-hero__right img { width: 100%; aspect-ratio: 4/5; object-fit: cover; }
.f25-hero__label {
  position: absolute; bottom: -1.5rem; left: 2rem;
  background: #2a241c; color: #f8f4eb;
  padding: 0.75rem 1.25rem;
}
.f25-hero__label span { display: block; font-size: 0.625rem; letter-spacing: 0.25em; color: #c9a86b; margin-bottom: 0.25rem; }
.f25-hero__label p { font-size: 0.875rem; font-style: italic; }

/* Divider */
.f25-divider {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 3rem;
  max-width: 900px;
  margin: 0 auto;
}
.f25-divider__line { flex: 1; height: 1px; background: #2a241c; opacity: 0.5; }
.f25-divider h2 { font-size: 0.875rem; letter-spacing: 0.3em; color: #2a241c; font-weight: 400; }

/* Index table */
.f25-index {
  max-width: 1100px;
  margin: 0 auto 5rem;
  padding: 0 3rem;
}
.f25-index__table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Noto Serif KR', serif;
}
.f25-index__table th {
  text-align: left;
  padding: 1rem 0.75rem;
  border-bottom: 2px solid #2a241c;
  font-size: 0.6875rem;
  font-style: italic;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8b7340;
  font-weight: 400;
}
.f25-index__table td {
  padding: 1.5rem 0.75rem;
  border-bottom: 1px solid rgba(42, 36, 28, 0.15);
  font-size: 0.9375rem;
}
.f25-index__table tr { cursor: pointer; transition: background 0.2s; }
.f25-index__table tr:hover { background: rgba(139, 115, 64, 0.08); }
.f25-index__no { font-style: italic; color: #8b7340; width: 3rem; }
.f25-index__brand { font-weight: 700; font-size: 1.125rem; }
.f25-index__since, .f25-index__origin { color: #5a5040; font-style: italic; }
.f25-index__items { color: #8b7340; font-size: 0.875rem; }
.f25-index__chapter { text-align: right; font-style: italic; color: #8b2322; }

/* Chapter */
.f25-chapter {
  padding: 6rem 3rem;
  max-width: 1300px;
  margin: 0 auto;
  border-top: 1px solid rgba(42, 36, 28, 0.2);
}
.f25-chapter--alt { background: rgba(139, 115, 64, 0.05); max-width: none; }
.f25-chapter--alt > * { max-width: 1300px; margin-left: auto; margin-right: auto; }
.f25-chapter__head { text-align: center; margin-bottom: 4rem; }
.f25-chapter__no { font-size: 0.75rem; font-style: italic; letter-spacing: 0.25em; color: #8b7340; margin-bottom: 1rem; display: block; }
.f25-chapter__head h2 { font-size: clamp(2.25rem, 4.5vw, 3.5rem); font-weight: 400; margin-bottom: 0.75rem; line-height: 1.1; }
.f25-chapter__head h2 em { font-style: italic; color: #8b2322; }
.f25-chapter__head p { font-size: 1rem; font-style: italic; color: #5a5040; }
.f25-chapter__body { display: grid; grid-template-columns: 1.2fr 2fr; gap: 4rem; align-items: start; }
.f25-chapter__body--reverse { direction: rtl; }
.f25-chapter__body--reverse > * { direction: ltr; }
.f25-chapter__lead img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: saturate(0.85); }
.f25-chapter__caption { font-size: 0.75rem; font-style: italic; color: #8b7340; margin-top: 0.75rem; text-align: center; }
.f25-chapter__products { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.f25-item { cursor: pointer; }
.f25-item__img { aspect-ratio: 3/4; overflow: hidden; margin-bottom: 0.875rem; background: #f8f4eb; }
.f25-item__img img { width: 100%; height: 100%; object-fit: cover; }
.f25-item__no { font-size: 0.625rem; font-style: italic; letter-spacing: 0.2em; color: #8b7340; margin-bottom: 0.375rem; }
.f25-item h3 { font-size: 0.9375rem; font-weight: 400; margin-bottom: 0.5rem; line-height: 1.35; }
.f25-item__price { font-size: 0.875rem; color: #5a5040; }

/* Essay */
.f25-essay {
  padding: 8rem 3rem;
  background: #2a241c;
  color: #f8f4eb;
  text-align: center;
}
.f25-essay__inner { max-width: 44rem; margin: 0 auto; }
.f25-essay__tag { font-size: 0.75rem; font-style: italic; letter-spacing: 0.25em; color: #c9a86b; margin-bottom: 1.5rem; }
.f25-essay h2 { font-size: clamp(2.25rem, 4vw, 3.5rem); font-weight: 400; margin-bottom: 2rem; }
.f25-essay__body { font-size: 1.0625rem; line-height: 2; text-align: left; color: #d4c9b5; margin-bottom: 2rem; }
.f25-essay__body em { font-style: italic; color: #c9a86b; }
.f25-essay__sign { font-size: 0.875rem; font-style: italic; color: #c9a86b; }

/* Service */
.f25-service { padding: 5rem 3rem; max-width: 1100px; margin: 0 auto; }
.f25-service__title { text-align: center; font-size: 0.875rem; letter-spacing: 0.3em; margin-bottom: 3rem; color: #8b7340; font-style: italic; font-weight: 400; }
.f25-service__grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 3rem; }
.f25-service__item { padding: 2rem; border: 1px solid rgba(42, 36, 28, 0.2); }
.f25-service__item h4 { font-size: 0.875rem; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 1rem; }
.f25-service__item p { font-size: 0.9375rem; color: #5a5040; line-height: 1.7; font-style: italic; }

/* Footer */
.f25-foot {
  background: #f0e9dc;
  padding: 5rem 3rem 2rem;
  border-top: 1px solid #2a241c;
  text-align: center;
}
.f25-foot__top { margin-bottom: 3rem; padding-bottom: 2rem; border-bottom: 1px solid rgba(42, 36, 28, 0.3); }
.f25-foot__logo { font-size: 3rem; font-weight: 400; letter-spacing: 0.08em; margin-bottom: 0.5rem; }
.f25-foot__slogan { font-size: 0.875rem; font-style: italic; color: #8b7340; margin-bottom: 0.5rem; }
.f25-foot__est { font-size: 0.625rem; letter-spacing: 0.3em; color: #8b7340; }
.f25-foot__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto 3rem;
  text-align: left;
}
.f25-foot__grid h4 { font-size: 0.6875rem; letter-spacing: 0.2em; margin-bottom: 1rem; color: #8b7340; font-style: italic; }
.f25-foot__grid a { display: block; font-size: 0.8125rem; color: #2a241c; margin-bottom: 0.625rem; cursor: pointer; }
.f25-foot__legal {
  max-width: 1100px;
  margin: 0 auto;
  font-size: 0.6875rem;
  line-height: 1.9;
  color: #8b7340;
  font-style: italic;
  padding-top: 2rem;
  border-top: 1px solid rgba(42, 36, 28, 0.2);
}
</style>
