<template>
  <main class="fp-page">
    <header class="fp-top">
      <RouterLink to="/forme/ui/header" class="fp-top__link">← Header Library</RouterLink>
      <span class="fp-top__title">FOOTER LIBRARY · 20 VARIANTS</span>
      <RouterLink to="/forme" class="fp-top__link">Design Picker →</RouterLink>
    </header>

    <div class="fp-intro">
      <p class="fp-intro__eyebrow">COMPONENT LIBRARY</p>
      <h1 class="fp-intro__title">Footer Variants · 30</h1>
      <p class="fp-intro__desc">
        25가지 푸터 디자인. F21~25는 30~50대 타겟 실용 쇼핑몰 스타일입니다.
      </p>
    </div>

    <!-- F01 Minimal -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 01</span>
        <span class="fp-label__name">Minimal · Modern</span>
        <span class="fp-label__ref">Ref: Musinsa · 29CM</span>
      </div>
      <div class="fp-preview" style="background:#fff;">
        <footer class="f01">
          <div class="f01__top">
            <div class="f01__logo">FORME</div>
            <nav class="f01__nav">
              <div><p>SHOP</p><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f01__b f01__b--${b.slug}`" /></a></div>
              <div><p>SUPPORT</p><a>FAQ</a><a>Q&A</a></div>
              <div><p>ABOUT</p><a>Atelier</a><a>Press</a></div>
            </nav>
          </div>
          <div class="f01__bot">© 2026 FORME. ALL RIGHTS RESERVED.</div>
        </footer>
      </div>
    </section>

    <!-- F02 Colorful -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 02</span>
        <span class="fp-label__name">Colorful · Department</span>
        <span class="fp-label__ref">Ref: SSF · 롯데온</span>
      </div>
      <div class="fp-preview" style="background:#FFF4D6;">
        <footer class="f02">
          <div class="f02__news">
            <h3>📬 NEWSLETTER</h3>
            <p>신상품과 특가 소식을 가장 먼저 받아보세요</p>
            <div class="f02__form"><input placeholder="이메일 주소" /><button>구독</button></div>
          </div>
          <div class="f02__grid">
            <div><p>브랜드</p><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f02__b f02__b--${b.slug}`" /></a></div>
            <div><p>고객센터</p><a>☎ 1588-0000</a><a>FAQ</a><a>배송/반품</a></div>
            <div><p>회원</p><a>마이페이지</a><a>적립금</a><a>쿠폰</a></div>
            <div><p>소셜</p><a>📷 Instagram</a><a>💬 Kakao</a></div>
          </div>
          <div class="f02__bot">© 2026 FORME · 사업자등록번호 000-00-00000</div>
        </footer>
      </div>
    </section>

    <!-- F03 Premium Heritage -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 03</span>
        <span class="fp-label__name">Premium · Heritage</span>
        <span class="fp-label__ref">Ref: 더현대 · LF몰</span>
      </div>
      <div class="fp-preview" style="background:#1a1a1a;">
        <footer class="f03">
          <div class="f03__head"><span></span><h3>FORME</h3><span></span></div>
          <p class="f03__sub">A MAISON OF CURATED HERITAGE</p>
          <nav class="f03__nav">
            <a v-for="(b,i) in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`f03__b f03__b--${b.slug}`" />
              <span v-if="i < brands.length - 1">◆</span>
            </a>
          </nav>
          <div class="f03__bot"><span>EST. 2026 · SEOUL</span><span>© FORME MAISON</span></div>
        </footer>
      </div>
    </section>

    <!-- F04 Gallery -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 04</span>
        <span class="fp-label__name">Gallery · Atelier</span>
        <span class="fp-label__ref">Ref: Aesop · Celine</span>
      </div>
      <div class="fp-preview" style="background:#eae6dd;">
        <footer class="f04">
          <p class="f04__quote">"The best objects are those we forget we own."</p>
          <div class="f04__logo">forme</div>
          <p class="f04__sub">Atelier · Seoul · Est. 2026</p>
          <nav class="f04__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f04__b f04__b--${b.slug}`" /></a>
          </nav>
          <p class="f04__bot">— mail@forme.atelier —</p>
        </footer>
      </div>
    </section>

    <!-- F05 Japanese Grid -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 05</span>
        <span class="fp-label__name">Japanese · Grid</span>
        <span class="fp-label__ref">Ref: UNIQLO · MUJI</span>
      </div>
      <div class="fp-preview" style="background:#1f1f1f;">
        <footer class="f05">
          <div class="f05__grid">
            <div class="f05__cell"><p>FORME</p><small>N° 05 · 簡潔</small></div>
            <div class="f05__cell"><p>[01]</p><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f05__b f05__b--${b.slug}`" /></a></div>
            <div class="f05__cell"><p>[02]</p><a>FAQ</a><a>Q&A</a></div>
            <div class="f05__cell"><p>[03]</p><a>EST. 2026</a><a>SEOUL · KR</a></div>
          </div>
          <div class="f05__bot"><span>© 2026 FORME</span><span>MADE IN KOREA</span></div>
        </footer>
      </div>
    </section>

    <!-- F06 Y2K -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 06</span>
        <span class="fp-label__name">Y2K · Bold</span>
        <span class="fp-label__ref">Ref: Supreme · Palace</span>
      </div>
      <div class="fp-preview" style="background:#FFF4E0;">
        <footer class="f06">
          <div class="f06__marquee"><span>★ STAY HYPED ★ FORME · 2026 ★ NEXT DROP SOON ★ STAY HYPED ★ FORME · 2026 ★</span></div>
          <div class="f06__main">
            <div class="f06__logo">FORME</div>
            <div class="f06__pills">
              <a v-for="(b,i) in brands" :key="b.slug" class="f06__pill" :class="`f06__pill--${['pink','yellow','mint','orange'][i]}`"><img :src="b.logo" :alt="b.name" :class="`f06__b f06__b--${b.slug}`" /></a>
            </div>
          </div>
          <div class="f06__bot">© 2026 · BUILT DIFFERENT</div>
        </footer>
      </div>
    </section>

    <!-- F07 Editorial -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 07</span>
        <span class="fp-label__name">Editorial · Magazine</span>
        <span class="fp-label__ref">Ref: Monocle · Apartamento</span>
      </div>
      <div class="fp-preview" style="background:#fbf9f4;">
        <footer class="f07">
          <div class="f07__meta"><span>VOL. 01</span><span>COLOPHON</span><span>P. 120</span></div>
          <h3 class="f07__logo">FORME</h3>
          <p class="f07__sub">PUBLISHED QUARTERLY · SEOUL · MMXXVI</p>
          <nav class="f07__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f07__b f07__b--${b.slug}`" /></a>
          </nav>
          <p class="f07__bot">EDITORIAL · PHOTOGRAPHY · ART DIRECTION BY FORME STUDIO</p>
        </footer>
      </div>
    </section>

    <!-- F08 Street -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 08</span>
        <span class="fp-label__name">Street · Technical</span>
        <span class="fp-label__ref">Ref: Off-White · ACRONYM</span>
      </div>
      <div class="fp-preview" style="background:#050505;">
        <footer class="f08">
          <div class="f08__top">
            <div class="f08__logo">FORME<em>/ STREET DIVISION</em></div>
            <div class="f08__grid">
              <div><p>[ CHAPTERS ]</p><a v-for="(b,i) in brands" :key="b.slug" class="f08__item"><span>/0{{i+1}}</span><img :src="b.logo" :alt="b.name" :class="`f08__b f08__b--${b.slug}`" /></a></div>
              <div><p>[ SIGNAL ]</p><a>/DROP@FORME</a><a>/TRANSMIT</a></div>
            </div>
          </div>
          <div class="f08__ticker"><span>◆ NEXT DROP · 04.16 · 11:00 KST ◆ MEMBERS ONLY ◆ STAY HYPED ◆</span></div>
          <div class="f08__bot">© 2026 FORME / VER.1.0.8</div>
        </footer>
      </div>
    </section>

    <!-- F09 Luxury -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 09</span>
        <span class="fp-label__name">Luxury · Maison</span>
        <span class="fp-label__ref">Ref: Hermès · Dior</span>
      </div>
      <div class="fp-preview" style="background:#0a0907;">
        <footer class="f09">
          <div class="f09__crest"><span></span>◆<span></span></div>
          <h3 class="f09__logo">FORME</h3>
          <p class="f09__sub">M A I S O N &nbsp; D E &nbsp; S É L E C T I O N</p>
          <nav class="f09__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f09__b f09__b--${b.slug}`" /></a>
          </nav>
          <div class="f09__bot"><span>— EST. MMXXVI —</span><span>PRIVATE CIRCLE</span></div>
        </footer>
      </div>
    </section>

    <!-- F10 Eco -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 10</span>
        <span class="fp-label__name">Eco · Natural</span>
        <span class="fp-label__ref">Ref: Patagonia · Muji</span>
      </div>
      <div class="fp-preview" style="background:#f0e9dc;">
        <footer class="f10">
          <div class="f10__stamp"><span class="material-symbols-outlined">eco</span>CERTIFIED · 2026</div>
          <h3 class="f10__logo">FORME</h3>
          <p class="f10__sub"><em>Slow fashion, honest goods.</em></p>
          <nav class="f10__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f10__b f10__b--${b.slug}`" /></a>
          </nav>
          <p class="f10__bot">Seoul · Est. 2026 · Made with care</p>
        </footer>
      </div>
    </section>

    <!-- F11 Brutalist -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 11</span>
        <span class="fp-label__name">Neo Brutalist</span>
        <span class="fp-label__ref">Ref: Balenciaga · Gentle Monster</span>
      </div>
      <div class="fp-preview" style="background:#FFE500;">
        <footer class="f11">
          <div class="f11__row"><span>FORME</span><span>// BUILT NOT BORN</span></div>
          <div class="f11__cells">
            <a v-for="(b,i) in brands" :key="b.slug" class="f11__cell">[ 0{{i+1}} ]<img :src="b.logo" :alt="b.name" :class="`f11__b f11__b--${b.slug}`" /></a>
          </div>
          <div class="f11__bar">© 2026 FORME · NO GIMMICKS</div>
        </footer>
      </div>
    </section>

    <!-- F12 Glassmorphism -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 12</span>
        <span class="fp-label__name">Glassmorphism</span>
        <span class="fp-label__ref">Ref: Apple · Windows 11</span>
      </div>
      <div class="fp-preview" style="background:linear-gradient(135deg,#0a0a2e 0%,#667eea 50%,#f093fb 100%); padding:2rem;">
        <footer class="f12">
          <div class="f12__logo">FORME</div>
          <p class="f12__sub">The future is clear.</p>
          <nav class="f12__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f12__b f12__b--${b.slug}`" /></a>
          </nav>
          <div class="f12__bot">© 2026 FORME · 2026 → beyond</div>
        </footer>
      </div>
    </section>

    <!-- F13 Swiss -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 13</span>
        <span class="fp-label__name">Swiss Bauhaus</span>
        <span class="fp-label__ref">Ref: Helvetica · Brockmann</span>
      </div>
      <div class="fp-preview" style="background:#f5f5f0;">
        <footer class="f13">
          <div class="f13__blocks">
            <div class="f13__b1">FORME<br /><small>13/20</small></div>
            <div class="f13__b2"></div>
            <div class="f13__b3"></div>
            <div class="f13__b4">
              <p>BRANDS</p>
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f13__b f13__b--${b.slug}`" /></a>
            </div>
          </div>
          <div class="f13__bot">© 2026 · FORM + FUNCTION</div>
        </footer>
      </div>
    </section>

    <!-- F14 Dark Academia -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 14</span>
        <span class="fp-label__name">Dark Academia</span>
        <span class="fp-label__ref">Ref: Oxford · Tom Ford era</span>
      </div>
      <div class="fp-preview" style="background:#1a0f0a;">
        <footer class="f14">
          <p class="f14__latin">— In Perpetuum —</p>
          <h3 class="f14__logo">FORME</h3>
          <p class="f14__orn">❦</p>
          <p class="f14__quote"><em>"Vestis virum facit."</em></p>
          <nav class="f14__nav">
            <a v-for="(b,i) in brands" :key="b.slug"><span>Vol. {{ roman[i] }}</span><img :src="b.logo" :alt="b.name" :class="`f14__b f14__b--${b.slug}`" /></a>
          </nav>
          <p class="f14__bot">ACADEMIA VESTIMENTA · MMXXVI</p>
        </footer>
      </div>
    </section>

    <!-- F15 Art Deco -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 15</span>
        <span class="fp-label__name">Art Deco</span>
        <span class="fp-label__ref">Ref: 1920s Paris · Gatsby</span>
      </div>
      <div class="fp-preview" style="background:#0f1a3a;">
        <footer class="f15">
          <div class="f15__sunburst"></div>
          <div class="f15__inner">
            <div class="f15__orn"><span></span>◆<span></span></div>
            <h3 class="f15__logo">FORME</h3>
            <p class="f15__sub">— THE GRAND SELECTION —</p>
            <nav class="f15__nav">
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f15__b f15__b--${b.slug}`" /></a>
            </nav>
            <p class="f15__bot">A · D · MMXXVI</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F16 Cyberpunk -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 16</span>
        <span class="fp-label__name">Cyberpunk Neon</span>
        <span class="fp-label__ref">Ref: Blade Runner · Neuromancer</span>
      </div>
      <div class="fp-preview" style="background:#05010f;">
        <footer class="f16">
          <p class="f16__code">&gt; EOF :: FORME.EXE :: 2026.04.10</p>
          <h3 class="f16__logo" data-text="FORME">FORME</h3>
          <p class="f16__sub">// NEURAL · WARDROBE · INTERFACE</p>
          <nav class="f16__nav">
            <a v-for="(b,i) in brands" :key="b.slug"><span>/0{{i+1}}</span><img :src="b.logo" :alt="b.name" :class="`f16__b f16__b--${b.slug}`" /></a>
          </nav>
          <div class="f16__bot"><span>◉ SIGNAL LOST</span><span>[ SYS.SHUTDOWN ]</span></div>
        </footer>
      </div>
    </section>

    <!-- F17 Scandinavian -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 17</span>
        <span class="fp-label__name">Scandinavian</span>
        <span class="fp-label__ref">Ref: Acne · COS</span>
      </div>
      <div class="fp-preview" style="background:#f4ede4;">
        <footer class="f17">
          <div class="f17__card">
            <p class="f17__tag">· hygge ·</p>
            <h3 class="f17__logo">forme</h3>
            <p class="f17__sub">— the quiet wardrobe —</p>
            <nav class="f17__nav">
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f17__b f17__b--${b.slug}`" /></a>
            </nav>
            <p class="f17__bot">Est. 2026 · Seoul · with warmth</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F18 Vaporwave -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 18</span>
        <span class="fp-label__name">Vaporwave</span>
        <span class="fp-label__ref">Ref: 80s Japan · Retro Future</span>
      </div>
      <div class="fp-preview" style="background:linear-gradient(180deg,#2e0854 0%,#ff006e 70%,#ff9a56 100%);">
        <footer class="f18">
          <div class="f18__logo">Ｆ Ｏ Ｒ Ｍ Ｅ</div>
          <p class="f18__jp">現 代 の 夢</p>
          <nav class="f18__nav">
            <a v-for="b in brands" :key="b.slug" class="f18__pill"><img :src="b.logo" :alt="b.name" :class="`f18__b f18__b--${b.slug}`" /></a>
          </nav>
          <p class="f18__bot">// dreams of the modern day //</p>
        </footer>
      </div>
    </section>

    <!-- F19 Newspaper -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 19</span>
        <span class="fp-label__name">Newspaper Classic</span>
        <span class="fp-label__ref">Ref: NYT · Le Monde</span>
      </div>
      <div class="fp-preview" style="background:#f4f0e6;">
        <footer class="f19">
          <div class="f19__rule"></div>
          <p class="f19__tag">— COLOPHON —</p>
          <h3 class="f19__logo">The FORME Times</h3>
          <p class="f19__sub">"All the garments that are fit to wear."</p>
          <div class="f19__cols">
            <div><p>CHAPTERS</p><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f19__b f19__b--${b.slug}`" /></a></div>
            <div><p>CONTACT</p><a>mail@forme</a><a>+82 2 000 0000</a></div>
            <div><p>OFFICE</p><a>Seoul, KR</a><a>Est. 2026</a></div>
          </div>
          <div class="f19__bot">Published quarterly · Printed on recycled paper · All rights reserved</div>
        </footer>
      </div>
    </section>

    <!-- F20 Hand-drawn -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 20</span>
        <span class="fp-label__name">Hand-drawn Craft</span>
        <span class="fp-label__ref">Ref: Etsy · small ateliers</span>
      </div>
      <div class="fp-preview" style="background:#fdf8ef;">
        <footer class="f20">
          <div class="f20__paper">
            <div class="f20__tape f20__tape--l"></div>
            <div class="f20__tape f20__tape--r"></div>
            <p class="f20__hand">— with love from our atelier ✿</p>
            <h3 class="f20__logo">forme</h3>
            <p class="f20__sub">a small place for good things ~</p>
            <nav class="f20__nav">
              <a v-for="(b,i) in brands" :key="b.slug" class="f20__chip"><span>{{ ['✿','✤','❋','❀'][i] }}</span><img :src="b.logo" :alt="b.name" :class="`f20__b f20__b--${b.slug}`" /></a>
            </nav>
            <p class="f20__bot">❤ est. 2026 · seoul ❤</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F21 Department Modern -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 21</span>
        <span class="fp-label__name">Department Modern</span>
        <span class="fp-label__ref">Ref: LF몰 · 한섬몰 · 30-50 타겟</span>
      </div>
      <div class="fp-preview" style="background:#f5f5f5;">
        <footer class="f21">
          <div class="f21__top">
            <div class="f21__col f21__col--cs">
              <h4>고객센터</h4>
              <p class="f21__phone">1588-0000</p>
              <p>평일 09:00 ~ 18:00</p>
              <p>점심 12:00 ~ 13:00</p>
              <p>주말·공휴일 휴무</p>
            </div>
            <div class="f21__col">
              <h4>SHOP</h4>
              <a>NEW</a><a>BEST</a>
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f21__b f21__b--${b.slug}`" /></a>
              <a>SALE</a>
            </div>
            <div class="f21__col">
              <h4>MY</h4>
              <a>마이페이지</a><a>주문조회</a><a>위시리스트</a><a>적립금</a>
            </div>
            <div class="f21__col">
              <h4>COMPANY</h4>
              <a>회사소개</a><a>이용약관</a><a>개인정보처리방침</a>
            </div>
          </div>
          <div class="f21__bot">
            <p>(주)FORME · 대표 김보경 · 사업자등록번호 000-00-00000</p>
            <p>서울특별시 강남구 테헤란로 000 · © 2026 FORME. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F22 Warm Editorial -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 22</span>
        <span class="fp-label__name">Warm Editorial</span>
        <span class="fp-label__ref">Ref: Barbour · GANNI · 40대 감성</span>
      </div>
      <div class="fp-preview" style="background:#ede5d3;">
        <footer class="f22">
          <div class="f22__grid">
            <div class="f22__brand">
              <h3>forme</h3>
              <p><em>A considered wardrobe.</em></p>
              <p class="f22__est">Seoul · Est. 2026</p>
            </div>
            <div class="f22__col">
              <h4>SHOP</h4>
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f22__b f22__b--${b.slug}`" /></a>
            </div>
            <div class="f22__col">
              <h4>SERVICE</h4>
              <a>Delivery</a><a>Returns</a><a>Size Guide</a><a>Gift Cards</a>
            </div>
            <div class="f22__col">
              <h4>ABOUT</h4>
              <a>Our Story</a><a>Journal</a><a>Contact</a><a>Sustainability</a>
            </div>
          </div>
          <div class="f22__bot">
            <span>© 2026 FORME · Seoul, Korea</span>
            <span><em>Made with care.</em></span>
          </div>
        </footer>
      </div>
    </section>

    <!-- F23 Premium Showcase -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 23</span>
        <span class="fp-label__name">Premium Showcase</span>
        <span class="fp-label__ref">Ref: 에잇세컨즈 · 에르메네질도</span>
      </div>
      <div class="fp-preview" style="background:#1a1a1a;">
        <footer class="f23">
          <div class="f23__main">
            <div class="f23__brand">
              <h3>FORME</h3>
              <p>The House of Curated Heritage</p>
              <div class="f23__social">
                <a>IG</a><a>FB</a><a>YT</a><a>KT</a>
              </div>
            </div>
            <div class="f23__cols">
              <div>
                <h4>SHOP</h4>
                <a>NEW IN</a><a>WOMEN</a><a>MEN</a>
                <a v-for="b in brands" :key="b.slug" class="f23__brandlink"><img :src="b.logo" :alt="b.name" :class="`f23__b f23__b--${b.slug}`" /></a>
              </div>
              <div>
                <h4>SERVICE</h4>
                <a>DELIVERY</a><a>RETURNS</a><a>SIZE GUIDE</a><a>GIFT CARDS</a>
              </div>
              <div>
                <h4>ABOUT</h4>
                <a>OUR STORY</a><a>STORES</a><a>CAREERS</a><a>PRESS</a>
              </div>
              <div>
                <h4>LEGAL</h4>
                <a>TERMS</a><a>PRIVACY</a><a>COOKIES</a>
              </div>
            </div>
          </div>
          <div class="f23__bot">
            <p>© 2026 FORME Corp. · Seoul, Korea. · All rights reserved.</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F24 Practical Grid -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 24</span>
        <span class="fp-label__name">Practical Grid</span>
        <span class="fp-label__ref">Ref: 29CM · 스타일쉐어</span>
      </div>
      <div class="fp-preview" style="background:#fff;">
        <footer class="f24">
          <div class="f24__top">
            <div class="f24__col f24__col--about">
              <h4>FORME</h4>
              <p>30-50대의 옷장을 위한 큐레이션 편집샵.</p>
              <p>오래 입을 수 있는 좋은 옷만을 선별합니다.</p>
            </div>
            <div class="f24__col">
              <h4>고객센터</h4>
              <p class="f24__phone">1588-0000</p>
              <small>평일 09:00~18:00</small>
              <a>1:1 문의하기</a>
              <a>FAQ 보기</a>
            </div>
            <div class="f24__col">
              <h4>BRAND</h4>
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f24__b f24__b--${b.slug}`" /></a>
            </div>
            <div class="f24__col">
              <h4>쇼핑가이드</h4>
              <a>배송안내</a>
              <a>교환·반품</a>
              <a>사이즈 가이드</a>
              <a>멤버십</a>
            </div>
          </div>
          <div class="f24__bot">
            <p>(주)FORME | 대표 김보경 | 서울 강남구 테헤란로 000 | 통신판매업 2026-서울강남-00000</p>
            <p>사업자등록번호 000-00-00000 | 고객센터 1588-0000 | © 2026 FORME</p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F25 Classic Serif Catalog -->
    <section class="fp-slot">
      <div class="fp-label">
        <span class="fp-label__no">FOOTER N° 25</span>
        <span class="fp-label__name">Classic Serif Catalog</span>
        <span class="fp-label__ref">Ref: 현대H몰 · 신세계</span>
      </div>
      <div class="fp-preview" style="background:#f0e9dc;">
        <footer class="f25">
          <div class="f25__header">
            <h3 class="f25__logo">FORME</h3>
            <p class="f25__slogan">The House of Curated Classics</p>
            <p class="f25__est">EST. MMXXVI · SEOUL, KOREA</p>
          </div>
          <div class="f25__grid">
            <div>
              <h4>SHOP</h4>
              <a>신상품</a>
              <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f25__b f25__b--${b.slug}`" /></a>
              <a>할인관</a>
            </div>
            <div>
              <h4>SERVICE</h4>
              <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a><a>선물 포장</a>
            </div>
            <div>
              <h4>CUSTOMER</h4>
              <a>고객센터 1588-0000</a><a>1:1 문의</a><a>FAQ</a>
            </div>
            <div>
              <h4>ABOUT</h4>
              <a>브랜드 스토리</a><a>편집자 서신</a><a>매장 안내</a>
            </div>
          </div>
          <div class="f25__legal">
            <p>(주)FORME | 대표이사 김보경 | 사업자등록번호 000-00-00000 | 통신판매업 2026-서울강남-00000</p>
            <p>© 2026 FORME · <em>All catalogs printed on recycled paper.</em></p>
          </div>
        </footer>
      </div>
    </section>

    <!-- F26 Kinfolk -->
    <section class="fp-slot">
      <div class="fp-label"><span class="fp-label__no">FOOTER N° 26</span><span class="fp-label__name">Kinfolk Lifestyle</span><span class="fp-label__ref">Ref: Kinfolk · Cereal</span></div>
      <div class="fp-preview" style="background:#ede5d3;">
        <footer class="f26f">
          <div class="f26f__grid">
            <div class="f26f__brand"><h3>forme</h3><p><em>Dress slowly, live fully.</em></p></div>
            <div class="f26f__col"><h4>SHOP</h4><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f26f__b f26f__b--${b.slug}`" /></a></div>
            <div class="f26f__col"><h4>HELP</h4><a>FAQ</a><a>Shipping</a><a>Returns</a></div>
            <div class="f26f__col"><h4>CONNECT</h4><a>Instagram</a><a>Newsletter</a></div>
          </div>
          <p class="f26f__copy">© 2026 forme · Seoul</p>
        </footer>
      </div>
    </section>

    <!-- F27 Naver Shopping -->
    <section class="fp-slot">
      <div class="fp-label"><span class="fp-label__no">FOOTER N° 27</span><span class="fp-label__name">Naver Shopping</span><span class="fp-label__ref">Ref: 네이버 쇼핑 · 쿠팡</span></div>
      <div class="fp-preview hp-preview--light">
        <footer class="f27f">
          <div class="f27f__top">
            <div class="f27f__col"><h4><span class="f27f__f">F</span>ORME</h4><p class="f27f__phone">1588-0000</p><p>평일 09:00~18:00</p></div>
            <div class="f27f__col"><h4>쇼핑</h4><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f27f__b f27f__b--${b.slug}`" /></a></div>
            <div class="f27f__col"><h4>고객</h4><a>마이페이지</a><a>주문조회</a><a>FAQ</a></div>
            <div class="f27f__col"><h4>정보</h4><a>회사소개</a><a>이용약관</a><a>개인정보</a></div>
          </div>
          <div class="f27f__bot">(주)FORME · 대표 김보경 · 사업자등록번호 000-00-00000 · © 2026 FORME</div>
        </footer>
      </div>
    </section>

    <!-- F28 Film Grain -->
    <section class="fp-slot">
      <div class="fp-label"><span class="fp-label__no">FOOTER N° 28</span><span class="fp-label__name">Film Grain Analog</span><span class="fp-label__ref">Ref: Kodak · Fujifilm</span></div>
      <div class="fp-preview" style="background:#1a1814;">
        <footer class="f28f">
          <div class="f28f__row">
            <span>FORME · FILM EDITION</span>
            <nav class="f28f__nav"><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f28f__b f28f__b--${b.slug}`" /></a></nav>
            <span>DEVELOPED IN SEOUL</span>
          </div>
          <p class="f28f__copy">© 2026 · PROCESSED BY FORME LAB</p>
        </footer>
      </div>
    </section>

    <!-- F29 Korean Hanbok -->
    <section class="fp-slot">
      <div class="fp-label"><span class="fp-label__no">FOOTER N° 29</span><span class="fp-label__name">Korean Hanbok Modern</span><span class="fp-label__ref">Ref: 한복 모던 · 전통+현대</span></div>
      <div class="fp-preview" style="background:#f5efe3;">
        <footer class="f29f">
          <div class="f29f__seal">形</div>
          <p class="f29f__msg">옷에도 결이 있다. <em>좋은 결은 시간이 만든다.</em></p>
          <nav class="f29f__nav"><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f29f__b f29f__b--${b.slug}`" /></a></nav>
          <div class="f29f__bot"><span>形 · FORME</span><span>서울 · EST. 2026</span><span>© FORME</span></div>
        </footer>
      </div>
    </section>

    <!-- F30 Sportswear -->
    <section class="fp-slot">
      <div class="fp-label"><span class="fp-label__no">FOOTER N° 30</span><span class="fp-label__name">Sportswear Athletic</span><span class="fp-label__ref">Ref: Nike · Under Armour</span></div>
      <div class="fp-preview" style="background:#0a0a0a;">
        <footer class="f30f">
          <div class="f30f__top">
            <div class="f30f__logo">FORME<span>SPORT</span></div>
            <nav class="f30f__brands"><a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`f30f__b f30f__b--${b.slug}`" /></a></nav>
            <div class="f30f__cols">
              <div><h4>SHOP</h4><a>Men</a><a>Women</a><a>Sale</a></div>
              <div><h4>SUPPORT</h4><a>FAQ</a><a>Shipping</a><a>Returns</a></div>
            </div>
          </div>
          <div class="f30f__bot">© 2026 FORME SPORT · SEOUL · ALL RIGHTS RESERVED</div>
        </footer>
      </div>
    </section>

    <nav class="fp-bottomnav">
      <RouterLink to="/forme/ui/header" class="fp-bottomnav__link">← Header Library</RouterLink>
      <RouterLink to="/forme" class="fp-bottomnav__link">Design Picker →</RouterLink>
    </nav>
  </main>
</template>

<script setup>
import beanpoleLogo from "@/assets/beanpole.svg";
import carharttLogo from "@/assets/carhartt.svg";
import levisLogo from "@/assets/levis.svg";
import dickiesLogo from "@/assets/dickies.svg";

const brands = [
  { slug: "beanpole", name: "Beanpole", logo: beanpoleLogo },
  { slug: "carhartt", name: "Carhartt", logo: carharttLogo },
  { slug: "levis",    name: "Levi's",   logo: levisLogo },
  { slug: "dickies",  name: "Dickies",  logo: dickiesLogo },
];
const roman = ["I", "II", "III", "IV"];
</script>

<style scoped>
/* ════════════════════════════════
   Footer Picker Page (shared shell)
   ════════════════════════════════ */
.fp-page {
  background: #0f0f0f;
  color: #f5f5f5;
  font-family: var(--font-body);
  min-height: 100dvh;
}
.fp-top {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  background: rgba(15, 15, 15, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.12);
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
.fp-top__link { color: #bbb; transition: color 0.2s; }
.fp-top__link:hover { color: #fff; }
.fp-top__title {
  font-family: "Italiana", serif;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: none;
  color: #fff;
}
.fp-intro {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 50rem;
  margin: 0 auto;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
}
.fp-intro__eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  color: #888;
  margin-bottom: 1.5rem;
}
.fp-intro__title {
  font-family: "Italiana", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  margin-bottom: 1.25rem;
}
.fp-intro__desc { font-size: 0.9375rem; color: #999; line-height: 1.8; }

.fp-slot {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
}
.fp-label {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.fp-label__no {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.375rem 0.75rem;
}
.fp-label__name {
  font-family: "Italiana", serif;
  font-size: 1.375rem;
  color: #fff;
}
.fp-label__ref { font-size: 0.75rem; font-style: italic; color: #888; }
.fp-preview {
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}

.fp-page img {
  transform: translateZ(0);
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
}

/* ════════════════════════════════
   F01 Minimal
   ════════════════════════════════ */
.f01 { padding: 3rem 2.5rem 1.5rem; color: #111; }
.f01__top { display: grid; grid-template-columns: auto 1fr; gap: 3rem; padding-bottom: 2rem; border-bottom: 1px solid #eee; }
.f01__logo { font-family: "Work Sans", sans-serif; font-size: 2rem; font-weight: 900; letter-spacing: -0.03em; }
.f01__nav { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.f01__nav p { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.25em; margin-bottom: 0.875rem; color: #999; }
.f01__nav a { display: block; font-size: 0.8125rem; font-weight: 500; color: #111; margin-bottom: 0.5rem; }
.f01__nav a img { display: inline-block; }
.f01__b { width: auto; object-fit: contain; }
.f01__b--beanpole { height: 11px; }
.f01__b--carhartt { height: 16px; }
.f01__b--levis    { height: 18px; }
.f01__b--dickies  { height: 24px; }
.f01__bot { padding-top: 1.25rem; font-size: 0.625rem; letter-spacing: 0.2em; color: #999; }

/* ════════════════════════════════
   F02 Colorful
   ════════════════════════════════ */
.f02 { color: #333; }
.f02__news { background: #FF6B6B; color: #fff; padding: 2rem 2.5rem; text-align: center; }
.f02__news h3 { font-size: 1.25rem; font-weight: 700; margin-bottom: 0.5rem; }
.f02__news p { font-size: 0.8125rem; margin-bottom: 1rem; opacity: 0.9; }
.f02__form { display: inline-flex; border-radius: 999px; overflow: hidden; max-width: 24rem; width: 100%; }
.f02__form input { flex: 1; border: none; padding: 0.75rem 1rem; font-size: 0.8125rem; outline: none; }
.f02__form button { background: #333; color: #fff; border: none; padding: 0 1.5rem; font-size: 0.75rem; font-weight: 700; cursor: pointer; }
.f02__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; padding: 2.5rem; background: #fff; }
.f02__grid p { font-size: 0.75rem; font-weight: 700; margin-bottom: 0.75rem; color: #FF6B6B; }
.f02__grid a { display: block; font-size: 0.75rem; color: #333; margin-bottom: 0.5rem; }
.f02__b { width: auto; object-fit: contain; }
.f02__b--beanpole { height: 11px; }
.f02__b--carhartt { height: 16px; }
.f02__b--levis    { height: 18px; }
.f02__b--dickies  { height: 24px; }
.f02__bot { text-align: center; padding: 1rem; background: #333; color: #ccc; font-size: 0.6875rem; }

/* ════════════════════════════════
   F03 Premium Heritage
   ════════════════════════════════ */
.f03 { padding: 3.5rem 3rem 2rem; text-align: center; color: #d4b976; }
.f03__head { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 0.75rem; }
.f03__head span { flex: none; width: 3rem; height: 1px; background: #d4b976; }
.f03__head h3 { font-family: "Italiana", serif; font-size: 2.25rem; font-weight: 400; letter-spacing: 0.1em; color: #fff; }
.f03__sub { font-size: 0.6875rem; letter-spacing: 0.3em; opacity: 0.7; margin-bottom: 2rem; }
.f03__nav { display: flex; justify-content: center; align-items: center; gap: 1.25rem; padding: 1.5rem 0; border-top: 1px solid rgba(212,185,118,0.3); border-bottom: 1px solid rgba(212,185,118,0.3); margin-bottom: 1.5rem; flex-wrap: wrap; }
.f03__nav a { display: inline-flex; align-items: center; gap: 1.25rem; cursor: pointer; color: #d4b976; }
.f03__nav span { font-size: 0.5rem; color: #d4b976; }
.f03__b { width: auto; object-fit: contain; filter: invert(80%) sepia(30%) saturate(500%) brightness(90%); opacity: 0.85; }
.f03__b--beanpole { height: 11px; }
.f03__b--carhartt { height: 16px; }
.f03__b--levis    { height: 18px; }
.f03__b--dickies  { height: 24px; }
.f03__bot { display: flex; justify-content: space-between; font-size: 0.625rem; letter-spacing: 0.25em; opacity: 0.6; }

/* ════════════════════════════════
   F04 Gallery
   ════════════════════════════════ */
.f04 { padding: 5rem 3rem 3rem; text-align: center; color: #1a1a1a; }
.f04__quote { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 1.25rem; color: #6b6b6b; margin-bottom: 2.5rem; }
.f04__logo { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 3rem; line-height: 1; }
.f04__sub { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 0.875rem; color: #6b6b6b; margin: 0.75rem 0 2.5rem; }
.f04__nav { display: flex; justify-content: center; gap: 3rem; align-items: center; padding-top: 2rem; border-top: 0.5px solid rgba(0,0,0,0.15); margin-bottom: 2rem; flex-wrap: wrap; }
.f04__b { width: auto; object-fit: contain; opacity: 0.75; }
.f04__b--beanpole { height: 11px; }
.f04__b--carhartt { height: 16px; }
.f04__b--levis    { height: 18px; }
.f04__b--dickies  { height: 24px; }
.f04__bot { font-family: "Cormorant Garamond", serif; font-style: italic; font-size: 0.875rem; color: #8b7437; }

/* ════════════════════════════════
   F05 Japanese Grid
   ════════════════════════════════ */
.f05 { color: #fff; }
.f05__grid { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; border-bottom: 1px solid #333; }
.f05__cell { padding: 2rem; border-right: 1px solid #333; }
.f05__cell:last-child { border-right: none; }
.f05__cell p { font-family: "Space Mono", monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; margin-bottom: 0.75rem; }
.f05__cell small { font-family: var(--font-headline); font-size: 0.75rem; color: #888; letter-spacing: 0.1em; }
.f05__cell a { display: block; font-family: "Space Mono", monospace; font-size: 0.75rem; color: #ccc; margin-bottom: 0.5rem; }
.f05__b { width: auto; object-fit: contain; filter: invert(1) brightness(1); }
.f05__b--beanpole { height: 10px; }
.f05__b--carhartt { height: 14px; }
.f05__b--levis    { height: 17px; }
.f05__b--dickies  { height: 22px; }
.f05__bot { display: flex; justify-content: space-between; padding: 1rem 2rem; font-family: "Space Mono", monospace; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #888; }

/* ════════════════════════════════
   F06 Y2K
   ════════════════════════════════ */
.f06 { color: #0a0a0a; }
.f06__marquee { background: #0a0a0a; color: #FFC72C; padding: 0.75rem 0; overflow: hidden; white-space: nowrap; font-family: "Archivo Black", sans-serif; font-size: 0.875rem; letter-spacing: 0.1em; }
.f06__main { display: grid; grid-template-columns: auto 1fr; gap: 2rem; align-items: center; padding: 2rem; border-bottom: 4px solid #0a0a0a; }
.f06__logo { font-family: "Archivo Black", sans-serif; font-size: 2rem; -webkit-text-stroke: 2px #0a0a0a; color: transparent; }
.f06__pills { display: flex; gap: 0.625rem; justify-content: flex-end; flex-wrap: wrap; }
.f06__pill { display: inline-flex; align-items: center; padding: 0.625rem 0.875rem; border: 2px solid #0a0a0a; cursor: pointer; transition: transform 0.2s; }
.f06__pill:hover { transform: rotate(-3deg); }
.f06__pill--pink { background: #FFB6D9; }
.f06__pill--yellow { background: #FFC72C; }
.f06__pill--mint { background: #B4E4D7; }
.f06__pill--orange { background: #FFA94D; }
.f06__b { width: auto; object-fit: contain; }
.f06__b--beanpole { height: 10px; }
.f06__b--carhartt { height: 14px; }
.f06__b--levis    { height: 17px; }
.f06__b--dickies  { height: 22px; }
.f06__bot { text-align: center; padding: 1rem; background: #0a0a0a; color: #FFC72C; font-family: "Archivo Black", sans-serif; font-size: 0.8125rem; letter-spacing: 0.1em; }

/* ════════════════════════════════
   F07 Editorial
   ════════════════════════════════ */
.f07 { padding: 3.5rem 3rem 2rem; text-align: center; color: #1a1a1a; border-top: 0.5px solid #1a1a1a; border-bottom: 4px double #1a1a1a; }
.f07__meta { display: flex; justify-content: space-between; font-family: "Space Mono", monospace; font-size: 0.6875rem; letter-spacing: 0.2em; color: #666; padding-bottom: 1rem; border-bottom: 1px solid #1a1a1a; margin-bottom: 1.5rem; }
.f07__logo { font-family: "Bodoni Moda", serif; font-size: 3rem; font-weight: 700; letter-spacing: -0.03em; margin-bottom: 0.5rem; }
.f07__sub { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.875rem; color: #666; margin-bottom: 2rem; }
.f07__nav { display: flex; justify-content: center; gap: 3rem; align-items: center; padding: 1.25rem 0; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; margin-bottom: 1rem; flex-wrap: wrap; }
.f07__b { width: auto; object-fit: contain; }
.f07__b--beanpole { height: 11px; }
.f07__b--carhartt { height: 16px; }
.f07__b--levis    { height: 18px; }
.f07__b--dickies  { height: 24px; }
.f07__bot { font-family: "Space Mono", monospace; font-size: 0.625rem; letter-spacing: 0.2em; color: #666; }

/* ════════════════════════════════
   F08 Street
   ════════════════════════════════ */
.f08 { color: #f5f5f5; border-top: 1px solid #FF3B3B; }
.f08__top { display: grid; grid-template-columns: 1fr 2fr; gap: 3rem; padding: 3rem 2.5rem 2rem; border-bottom: 1px solid #222; }
.f08__logo { font-family: "Anton", sans-serif; font-size: 2.5rem; letter-spacing: 0.02em; line-height: 1; }
.f08__logo em { display: block; font-family: monospace; font-size: 0.6875rem; color: #FF3B3B; font-style: normal; letter-spacing: 0.2em; margin-top: 0.5rem; }
.f08__grid { display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; }
.f08__grid p { font-family: monospace; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.25em; color: #FF3B3B; margin-bottom: 0.75rem; }
.f08__grid a { display: block; font-family: monospace; font-size: 0.75rem; color: #bbb; margin-bottom: 0.5rem; }
.f08__item { display: flex; align-items: center; gap: 0.5rem; }
.f08__item span { color: #FF3B3B; }
.f08__b { width: auto; object-fit: contain; filter: invert(1) brightness(1.2); }
.f08__b--beanpole { height: 10px; }
.f08__b--carhartt { height: 14px; }
.f08__b--levis    { height: 17px; }
.f08__b--dickies  { height: 22px; }
.f08__ticker { background: #FF3B3B; color: #050505; padding: 0.625rem 0; overflow: hidden; white-space: nowrap; font-family: monospace; font-size: 0.75rem; font-weight: 900; letter-spacing: 0.15em; text-align: center; }
.f08__bot { padding: 1rem 2.5rem; font-family: monospace; font-size: 0.625rem; color: #666; letter-spacing: 0.2em; }

/* ════════════════════════════════
   F09 Luxury
   ════════════════════════════════ */
.f09 { padding: 3.5rem 3rem 2rem; text-align: center; color: #d4b976; }
.f09__crest { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem; font-size: 0.75rem; }
.f09__crest span { flex: none; width: 3rem; height: 1px; background: #d4b976; }
.f09__logo { font-family: "Cinzel", serif; font-size: 2.5rem; font-weight: 600; letter-spacing: 0.1em; line-height: 1; margin-bottom: 0.5rem; }
.f09__sub { font-size: 0.6875rem; letter-spacing: 0.2em; opacity: 0.7; margin-bottom: 2rem; }
.f09__nav { display: flex; justify-content: center; gap: 2.5rem; align-items: center; padding: 1.25rem 0; border-top: 1px solid rgba(212,185,118,0.25); border-bottom: 1px solid rgba(212,185,118,0.25); margin-bottom: 1rem; flex-wrap: wrap; }
.f09__b { width: auto; object-fit: contain; filter: invert(80%) sepia(30%) saturate(500%) brightness(90%); opacity: 0.85; }
.f09__b--beanpole { height: 11px; }
.f09__b--carhartt { height: 16px; }
.f09__b--levis    { height: 18px; }
.f09__b--dickies  { height: 24px; }
.f09__bot { display: flex; justify-content: space-between; font-size: 0.625rem; letter-spacing: 0.25em; opacity: 0.6; }

/* ════════════════════════════════
   F10 Eco
   ════════════════════════════════ */
.f10 { padding: 3.5rem 3rem 2rem; text-align: center; color: #3a2e1f; }
.f10__stamp { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.875rem; background: #3a2e1f; color: #f0e9dc; border-radius: 999px; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 1.5rem; }
.f10__stamp .material-symbols-outlined { font-size: 0.9375rem; }
.f10__logo { font-family: "Fraunces", serif; font-size: 2.25rem; font-weight: 400; letter-spacing: -0.01em; margin-bottom: 0.5rem; }
.f10__sub em { font-family: var(--font-headline); font-style: italic; font-size: 0.9375rem; color: #8b6a3a; }
.f10__nav { display: flex; justify-content: center; gap: 3rem; align-items: center; padding: 1.75rem 0; border-top: 0.5px solid rgba(58,46,31,0.2); border-bottom: 0.5px solid rgba(58,46,31,0.2); margin: 2rem 0 1rem; flex-wrap: wrap; }
.f10__b { width: auto; object-fit: contain; opacity: 0.8; }
.f10__b--beanpole { height: 11px; }
.f10__b--carhartt { height: 16px; }
.f10__b--levis    { height: 18px; }
.f10__b--dickies  { height: 24px; }
.f10__bot { font-family: "Fraunces", serif; font-style: italic; font-size: 0.8125rem; color: #8b6a3a; }

/* ════════════════════════════════
   F11 Brutalist
   ════════════════════════════════ */
.f11 { color: #000; border-top: 6px solid #000; }
.f11__row { display: flex; justify-content: space-between; padding: 1.5rem 2.5rem; font-family: "Archivo Black", sans-serif; font-size: 1.25rem; border-bottom: 4px solid #000; }
.f11__cells { display: grid; grid-template-columns: repeat(4, 1fr); border-bottom: 4px solid #000; }
.f11__cell { padding: 1.5rem; border-right: 4px solid #000; background: #FFE500; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-family: "Archivo Black", sans-serif; font-size: 0.75rem; cursor: pointer; transition: background 0.15s; }
.f11__cell:last-child { border-right: none; }
.f11__cell:hover { background: #fff; }
.f11__b { width: auto; object-fit: contain; }
.f11__b--beanpole { height: 12px; }
.f11__b--carhartt { height: 17px; }
.f11__b--levis    { height: 20px; }
.f11__b--dickies  { height: 26px; }
.f11__bar { background: #000; color: #FFE500; padding: 1rem 2.5rem; text-align: center; font-family: "Archivo Black", sans-serif; font-size: 0.75rem; letter-spacing: 0.15em; }

/* ════════════════════════════════
   F12 Glassmorphism
   ════════════════════════════════ */
.f12 { padding: 3rem; text-align: center; background: rgba(255,255,255,0.1); backdrop-filter: blur(24px); border: 1px solid rgba(255,255,255,0.2); border-radius: 24px; color: #fff; }
.f12__logo { font-family: "Italiana", serif; font-size: 3rem; font-weight: 400; background: linear-gradient(135deg,#fff,#a0a0ff); -webkit-background-clip: text; background-clip: text; color: transparent; margin-bottom: 0.5rem; }
.f12__sub { font-size: 0.875rem; color: #d0d0ff; margin-bottom: 2rem; letter-spacing: 0.05em; }
.f12__nav { display: flex; justify-content: center; gap: 2.5rem; align-items: center; padding: 1.5rem 0; border-top: 1px solid rgba(255,255,255,0.15); border-bottom: 1px solid rgba(255,255,255,0.15); margin-bottom: 1.5rem; flex-wrap: wrap; }
.f12__b { width: auto; object-fit: contain; filter: invert(1) brightness(1.1); }
.f12__b--beanpole { height: 11px; }
.f12__b--carhartt { height: 16px; }
.f12__b--levis    { height: 18px; }
.f12__b--dickies  { height: 24px; }
.f12__bot { font-size: 0.6875rem; letter-spacing: 0.25em; color: #a0a0ff; }

/* ════════════════════════════════
   F13 Swiss
   ════════════════════════════════ */
.f13 { border-top: 3px solid #000; }
.f13__blocks { display: grid; grid-template-columns: 2fr 1fr 1fr 2fr; gap: 0.75rem; padding: 2rem 2.5rem; }
.f13__b1 { padding: 1.5rem; border: 2px solid #000; font-family: "Helvetica Neue", sans-serif; font-size: 1.75rem; font-weight: 900; letter-spacing: -0.04em; line-height: 1; color: #000; }
.f13__b1 small { font-size: 0.75rem; font-weight: 700; color: #E30613; }
.f13__b2 { background: #E30613; }
.f13__b3 { background: #FCD900; }
.f13__b4 { padding: 1rem; border: 2px solid #000; }
.f13__b4 p { font-family: "Helvetica Neue", sans-serif; font-size: 0.625rem; font-weight: 900; color: #005F9E; margin-bottom: 0.5rem; }
.f13__b4 a { display: inline-block; margin-right: 0.75rem; margin-bottom: 0.375rem; }
.f13__b { width: auto; object-fit: contain; }
.f13__b--beanpole { height: 10px; }
.f13__b--carhartt { height: 14px; }
.f13__b--levis    { height: 17px; }
.f13__b--dickies  { height: 22px; }
.f13__bot { padding: 0.875rem 2.5rem; background: #000; color: #fff; font-family: "Helvetica Neue", sans-serif; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; }

/* ════════════════════════════════
   F14 Dark Academia
   ════════════════════════════════ */
.f14 { padding: 3.5rem 3rem 2rem; text-align: center; color: #d4c4a8; border-top: 1px solid #8b6f47; }
.f14__latin { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.75rem; letter-spacing: 0.3em; color: #8b6f47; margin-bottom: 0.75rem; }
.f14__logo { font-family: "Bodoni Moda", serif; font-size: 2.5rem; font-weight: 400; letter-spacing: 0.03em; margin-bottom: 0.5rem; }
.f14__orn { color: #8b6f47; font-size: 1.25rem; margin-bottom: 1rem; }
.f14__quote { font-family: "Bodoni Moda", serif; font-size: 1rem; color: #b8a280; margin-bottom: 2rem; }
.f14__quote em { color: #d4c4a8; }
.f14__nav { display: flex; justify-content: center; gap: 2.5rem; align-items: flex-end; padding: 1.25rem 0; border-top: 1px solid rgba(139,111,71,0.3); border-bottom: 1px solid rgba(139,111,71,0.3); margin-bottom: 1rem; flex-wrap: wrap; }
.f14__nav a { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.f14__nav a span { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.625rem; color: #8b6f47; letter-spacing: 0.2em; }
.f14__b { width: auto; object-fit: contain; filter: sepia(0.5) brightness(1.3); opacity: 0.85; }
.f14__b--beanpole { height: 11px; }
.f14__b--carhartt { height: 16px; }
.f14__b--levis    { height: 18px; }
.f14__b--dickies  { height: 24px; }
.f14__bot { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.6875rem; letter-spacing: 0.3em; color: #8b6f47; }

/* ════════════════════════════════
   F15 Art Deco
   ════════════════════════════════ */
.f15 { position: relative; overflow: hidden; }
.f15::before { content: ""; position: absolute; inset: 0; background-image: repeating-linear-gradient(45deg, rgba(232,201,106,0.04) 0 2px, transparent 2px 40px); }
.f15__sunburst { position: absolute; bottom: 0; left: 50%; transform: translateX(-50%); width: 150%; height: 100%; background: conic-gradient(from 0deg at 50% 100%, transparent 0 2deg, rgba(232,201,106,0.15) 2deg 4deg, transparent 4deg 20deg, rgba(232,201,106,0.15) 20deg 22deg, transparent 22deg 40deg, rgba(232,201,106,0.15) 40deg 42deg, transparent 42deg 60deg, rgba(232,201,106,0.15) 60deg 62deg, transparent 62deg 180deg); }
.f15__inner { position: relative; z-index: 1; padding: 3.5rem 3rem 2rem; text-align: center; color: #e8c96a; border-top: 2px solid #e8c96a; }
.f15__orn { display: flex; align-items: center; justify-content: center; gap: 1rem; font-size: 0.75rem; margin-bottom: 0.875rem; }
.f15__orn span { flex: none; width: 3rem; height: 1px; background: #e8c96a; }
.f15__logo { font-family: "Cinzel", serif; font-size: 2.5rem; font-weight: 600; letter-spacing: 0.1em; line-height: 1; margin-bottom: 0.5rem; }
.f15__sub { font-size: 0.75rem; letter-spacing: 0.25em; margin-bottom: 2rem; }
.f15__nav { display: flex; justify-content: center; gap: 2.5rem; align-items: center; padding: 1.25rem 0; border-top: 1px solid rgba(232,201,106,0.3); border-bottom: 1px solid rgba(232,201,106,0.3); margin-bottom: 1rem; flex-wrap: wrap; }
.f15__b { width: auto; object-fit: contain; filter: invert(85%) sepia(38%) saturate(480%) brightness(86%); opacity: 0.85; }
.f15__b--beanpole { height: 11px; }
.f15__b--carhartt { height: 16px; }
.f15__b--levis    { height: 18px; }
.f15__b--dickies  { height: 24px; }
.f15__bot { font-size: 0.6875rem; letter-spacing: 0.4em; opacity: 0.7; }

/* ════════════════════════════════
   F16 Cyberpunk
   ════════════════════════════════ */
.f16 { padding: 3rem 3rem 1.5rem; text-align: center; color: #e0e0ff; border-top: 1px solid #ff00ff; background-image: linear-gradient(rgba(255,0,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.04) 1px, transparent 1px); background-size: 40px 40px; }
.f16__code { font-family: "Space Mono", monospace; font-size: 0.6875rem; color: #00ffcc; letter-spacing: 0.15em; margin-bottom: 1.25rem; }
.f16__logo { font-family: "Space Mono", monospace; font-size: 2.75rem; font-weight: 700; color: #fff; text-shadow: 0 0 16px #ff00ff, 0 0 32px rgba(255,0,255,0.5); margin-bottom: 0.625rem; letter-spacing: -0.02em; }
.f16__sub { font-family: "Space Mono", monospace; font-size: 0.75rem; letter-spacing: 0.2em; color: #00ffcc; margin-bottom: 2rem; }
.f16__nav { display: flex; justify-content: center; gap: 2rem; align-items: center; padding: 1.25rem 0; border-top: 1px solid rgba(255,0,255,0.3); border-bottom: 1px solid rgba(0,255,255,0.3); margin-bottom: 1rem; flex-wrap: wrap; }
.f16__nav a { display: flex; align-items: center; gap: 0.5rem; font-family: "Space Mono", monospace; font-size: 0.6875rem; color: #ff00ff; }
.f16__b { width: auto; object-fit: contain; filter: invert(1) hue-rotate(180deg) saturate(1.5) brightness(1.3); }
.f16__b--beanpole { height: 10px; }
.f16__b--carhartt { height: 14px; }
.f16__b--levis    { height: 17px; }
.f16__b--dickies  { height: 22px; }
.f16__bot { display: flex; justify-content: space-between; font-family: "Space Mono", monospace; font-size: 0.625rem; letter-spacing: 0.2em; }
.f16__bot span:first-child { color: #FF3B3B; }
.f16__bot span:last-child { color: #00ffcc; }

/* ════════════════════════════════
   F17 Scandinavian
   ════════════════════════════════ */
.f17 { padding: 2rem; }
.f17__card { background: #fffaf0; border-radius: 24px; padding: 3rem 2.5rem 2rem; text-align: center; box-shadow: 0 6px 24px rgba(90,70,50,0.08); color: #3a3530; }
.f17__tag { font-family: "Fraunces", serif; font-style: italic; font-size: 0.875rem; color: #a08060; margin-bottom: 0.75rem; }
.f17__logo { font-family: "Fraunces", serif; font-size: 2.75rem; font-weight: 300; letter-spacing: -0.03em; line-height: 1; margin-bottom: 0.5rem; }
.f17__sub { font-family: "Fraunces", serif; font-style: italic; font-size: 0.9375rem; color: #8a7560; margin-bottom: 2rem; }
.f17__nav { display: flex; justify-content: center; gap: 3rem; align-items: center; padding: 1.5rem 0; border-top: 0.5px solid rgba(160,128,96,0.3); border-bottom: 0.5px solid rgba(160,128,96,0.3); margin-bottom: 1rem; flex-wrap: wrap; }
.f17__b { width: auto; object-fit: contain; opacity: 0.75; }
.f17__b--beanpole { height: 11px; }
.f17__b--carhartt { height: 16px; }
.f17__b--levis    { height: 18px; }
.f17__b--dickies  { height: 24px; }
.f17__bot { font-size: 0.75rem; color: #a08060; letter-spacing: 0.1em; }

/* ════════════════════════════════
   F18 Vaporwave
   ════════════════════════════════ */
.f18 { padding: 3rem 3rem 2rem; text-align: center; color: #fff; border-top: 2px solid #00ffff; }
.f18__logo { font-family: "Space Mono", monospace; font-size: 2rem; font-weight: 700; letter-spacing: 0.05em; color: #fff; text-shadow: 3px 3px 0 #ff006e, 5px 5px 0 #00ffff; margin-bottom: 0.75rem; }
.f18__jp { font-family: var(--font-headline); font-size: 1.5rem; color: #fff; text-shadow: 2px 2px 0 #ff006e; margin-bottom: 2rem; letter-spacing: 0.2em; }
.f18__nav { display: flex; justify-content: center; gap: 0.875rem; align-items: center; margin-bottom: 1.5rem; flex-wrap: wrap; }
.f18__pill { display: inline-flex; align-items: center; padding: 0.5rem 0.875rem; background: rgba(0,0,0,0.3); backdrop-filter: blur(6px); border: 1px solid #00ffff; cursor: pointer; }
.f18__pill:hover { border-color: #fff; }
.f18__b { width: auto; object-fit: contain; filter: invert(1) brightness(1.2) drop-shadow(1px 1px 0 #ff006e); }
.f18__b--beanpole { height: 10px; }
.f18__b--carhartt { height: 14px; }
.f18__b--levis    { height: 17px; }
.f18__b--dickies  { height: 22px; }
.f18__bot { font-family: "Space Mono", monospace; font-size: 0.75rem; color: #00ffff; letter-spacing: 0.15em; }

/* ════════════════════════════════
   F19 Newspaper
   ════════════════════════════════ */
.f19 { padding: 2rem 2.5rem; text-align: center; color: #1a1a1a; border-top: 4px double #1a1a1a; }
.f19__rule { height: 0; }
.f19__tag { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.75rem; letter-spacing: 0.25em; color: #8b0000; margin-bottom: 0.75rem; }
.f19__logo { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 2rem; font-weight: 700; letter-spacing: -0.02em; line-height: 1; margin-bottom: 0.375rem; }
.f19__sub { font-family: "Bodoni Moda", serif; font-style: italic; font-size: 0.8125rem; color: #4a4a4a; margin-bottom: 2rem; }
.f19__cols { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 2rem; text-align: left; padding: 1.5rem 0; border-top: 1px solid #1a1a1a; border-bottom: 1px solid #1a1a1a; margin-bottom: 1rem; }
.f19__cols p { font-family: "Space Mono", monospace; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #8b0000; margin-bottom: 0.75rem; }
.f19__cols a { display: inline-block; font-family: "Bodoni Moda", serif; font-size: 0.8125rem; color: #1a1a1a; margin-right: 1rem; margin-bottom: 0.375rem; }
.f19__b { width: auto; object-fit: contain; filter: grayscale(1) contrast(1.1); }
.f19__b--beanpole { height: 10px; }
.f19__b--carhartt { height: 14px; }
.f19__b--levis    { height: 17px; }
.f19__b--dickies  { height: 22px; }
.f19__bot { font-family: "Space Mono", monospace; font-size: 0.625rem; letter-spacing: 0.15em; color: #666; }

/* ════════════════════════════════
   F20 Hand-drawn Craft
   ════════════════════════════════ */
.f20 { padding: 2rem; }
.f20__paper { position: relative; background: #fffaf0; border: 1px solid rgba(168,140,100,0.25); padding: 3rem 2.5rem 2rem; text-align: center; box-shadow: 0 6px 24px rgba(74,58,40,0.1); transform: rotate(-0.3deg); color: #4a3a28; }
.f20__tape { position: absolute; width: 5rem; height: 1.125rem; background: rgba(255,213,79,0.55); border: 1px solid rgba(168,140,100,0.2); top: -0.5rem; }
.f20__tape--l { left: 2rem; transform: rotate(-5deg); }
.f20__tape--r { right: 2rem; transform: rotate(5deg); }
.f20__hand { font-family: "Fraunces", serif; font-style: italic; font-size: 0.9375rem; color: #8b6a3a; margin-bottom: 1rem; }
.f20__logo { font-family: "Caveat", "Fraunces", cursive; font-style: italic; font-size: 3rem; font-weight: 400; line-height: 0.95; margin-bottom: 0.25rem; }
.f20__sub { font-family: "Fraunces", serif; font-style: italic; font-size: 0.9375rem; color: #8b6a3a; margin-bottom: 1.75rem; }
.f20__nav { display: flex; justify-content: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.f20__chip { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.5rem 0.875rem; background: #fff0c0; border: 1.5px dashed #8b6a3a; cursor: pointer; }
.f20__chip:nth-child(odd) { transform: rotate(-1deg); }
.f20__chip:nth-child(even) { transform: rotate(1deg); }
.f20__chip:hover { transform: rotate(0); }
.f20__chip span { color: #a88c64; font-size: 0.875rem; }
.f20__b { width: auto; object-fit: contain; filter: sepia(0.3) brightness(0.8); }
.f20__b--beanpole { height: 10px; }
.f20__b--carhartt { height: 14px; }
.f20__b--levis    { height: 17px; }
.f20__b--dickies  { height: 22px; }
.f20__bot { font-family: "Caveat", "Fraunces", cursive; font-size: 1rem; color: #8b6a3a; font-style: italic; }

/* ════════════════════════════════
   F21 — Department Modern
   ════════════════════════════════ */
.f21 {
  padding: 2.5rem 2rem 1.5rem;
  background: #f5f5f5;
  color: #222;
  font-family: 'Noto Sans KR', sans-serif;
}
.f21__top {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #e0e0e0;
  margin-bottom: 1.5rem;
}
.f21__col h4 {
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #1a1a1a;
}
.f21__col a,
.f21__col p {
  display: block;
  font-size: 0.6875rem;
  color: #666;
  margin-bottom: 0.4375rem;
  cursor: pointer;
}
.f21__phone {
  font-size: 1.5rem !important;
  font-weight: 900 !important;
  color: #1a1a1a !important;
  margin-bottom: 0.375rem !important;
}
.f21__b {
  width: auto;
  object-fit: contain;
  display: inline-block !important;
  margin-bottom: 0.25rem;
}
.f21__b--beanpole { height: 10px; }
.f21__b--carhartt { height: 14px; }
.f21__b--levis    { height: 17px; }
.f21__b--dickies  { height: 22px; }
.f21__bot {
  font-size: 0.625rem;
  color: #999;
  line-height: 1.7;
}

/* ════════════════════════════════
   F22 — Warm Editorial
   ════════════════════════════════ */
.f22 {
  padding: 3rem 2.5rem 1.5rem;
  background: #ede5d3;
  color: #2a241c;
  font-family: 'Fraunces', 'Noto Serif KR', serif;
}
.f22__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #d4c9b5;
  margin-bottom: 1.5rem;
}
.f22__brand h3 {
  font-size: 2rem;
  font-weight: 400;
  font-style: italic;
  margin-bottom: 0.375rem;
}
.f22__brand p em {
  font-size: 0.875rem;
  color: #8b7340;
  font-style: italic;
}
.f22__est {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem !important;
  letter-spacing: 0.2em;
  color: #8b7340 !important;
  margin-top: 0.5rem;
}
.f22__col h4 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  margin-bottom: 0.75rem;
  color: #2a241c;
}
.f22__col a {
  display: block;
  font-size: 0.8125rem;
  color: #5a5040;
  margin-bottom: 0.4375rem;
  cursor: pointer;
}
.f22__b {
  width: auto;
  object-fit: contain;
  filter: saturate(0.85);
  display: block;
  margin-bottom: 0.25rem;
}
.f22__b--beanpole { height: 10px; }
.f22__b--carhartt { height: 14px; }
.f22__b--levis    { height: 17px; }
.f22__b--dickies  { height: 22px; }
.f22__bot {
  display: flex;
  justify-content: space-between;
  padding-top: 1.25rem;
  border-top: 1px solid #d4c9b5;
  font-size: 0.6875rem;
  color: #8b7340;
}
.f22__bot em { font-style: italic; }

/* ════════════════════════════════
   F23 — Premium Showcase
   ════════════════════════════════ */
.f23 {
  padding: 3rem 2rem 1.5rem;
  background: #1a1a1a;
  color: #f5f5f5;
  font-family: 'Noto Sans KR', sans-serif;
  border-top: 2px solid #c62828;
}
.f23__main {
  display: grid;
  grid-template-columns: 1.2fr 3fr;
  gap: 3rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #333;
  margin-bottom: 1.5rem;
}
.f23__brand h3 {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  margin-bottom: 0.5rem;
}
.f23__brand p {
  font-size: 0.75rem;
  color: #999;
  font-style: italic;
  margin-bottom: 1rem;
}
.f23__social {
  display: flex;
  gap: 0.625rem;
}
.f23__social a {
  width: 2rem;
  height: 2rem;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  cursor: pointer;
}
.f23__cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.f23__cols h4 {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.875rem;
  color: #c62828;
}
.f23__cols a {
  display: block;
  font-size: 0.6875rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.f23__brandlink img {
  display: inline-block;
}
.f23__b {
  width: auto;
  object-fit: contain;
  filter: invert(1) brightness(1.1);
}
.f23__b--beanpole { height: 10px; }
.f23__b--carhartt { height: 14px; }
.f23__b--levis    { height: 17px; }
.f23__b--dickies  { height: 22px; }
.f23__bot {
  text-align: center;
  font-size: 0.625rem;
  color: #777;
  letter-spacing: 0.1em;
}

/* ════════════════════════════════
   F24 — Practical Grid
   ════════════════════════════════ */
.f24 {
  padding: 2.5rem 2rem 1.5rem;
  background: #fff;
  color: #1a1a1a;
  font-family: 'Noto Sans KR', sans-serif;
  border-top: 1px solid #eee;
}
.f24__top {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 2.5rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #eee;
  margin-bottom: 1.5rem;
}
.f24__col h4 {
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 0.75rem;
}
.f24__col p,
.f24__col a {
  display: block;
  font-size: 0.6875rem;
  color: #666;
  line-height: 1.65;
  margin-bottom: 0.4375rem;
  cursor: pointer;
}
.f24__col small {
  display: block;
  font-size: 0.625rem;
  color: #999;
  margin-bottom: 0.625rem;
}
.f24__phone {
  font-size: 1.375rem !important;
  font-weight: 900 !important;
  color: #1a1a1a !important;
  margin-bottom: 0.25rem !important;
}
.f24__b {
  width: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 0.375rem;
}
.f24__b--beanpole { height: 10px; }
.f24__b--carhartt { height: 14px; }
.f24__b--levis    { height: 17px; }
.f24__b--dickies  { height: 22px; }
.f24__bot {
  font-size: 0.625rem;
  color: #999;
  line-height: 1.7;
}

/* ════════════════════════════════
   F25 — Classic Serif Catalog
   ════════════════════════════════ */
.f25 {
  padding: 3rem 2rem 1.5rem;
  background: #f0e9dc;
  color: #2a241c;
  font-family: 'Noto Serif KR', 'Bodoni Moda', serif;
  border-top: 1px solid #2a241c;
  text-align: center;
}
.f25__header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(42, 36, 28, 0.25);
  margin-bottom: 2rem;
}
.f25__logo {
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  margin-bottom: 0.375rem;
}
.f25__slogan {
  font-size: 0.8125rem;
  font-style: italic;
  color: #8b7340;
  margin-bottom: 0.375rem;
}
.f25__est {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.5625rem;
  letter-spacing: 0.3em;
  color: #8b7340;
}
.f25__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.5rem;
  text-align: left;
  padding-bottom: 2rem;
  border-bottom: 1px solid rgba(42, 36, 28, 0.2);
  margin-bottom: 1.25rem;
}
.f25__grid h4 {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
  color: #8b7340;
  font-style: italic;
}
.f25__grid a {
  display: block;
  font-size: 0.75rem;
  color: #2a241c;
  margin-bottom: 0.5rem;
  cursor: pointer;
}
.f25__b {
  width: auto;
  object-fit: contain;
  display: block;
  margin-bottom: 0.375rem;
}
.f25__b--beanpole { height: 10px; }
.f25__b--carhartt { height: 14px; }
.f25__b--levis    { height: 17px; }
.f25__b--dickies  { height: 22px; }
.f25__legal {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  line-height: 1.8;
  color: #8b7340;
  font-style: italic;
}

/* ════ F26 Kinfolk ════ */
.f26f { padding: 3rem 2.5rem 1.5rem; color: #3a3530; font-family: 'Fraunces', serif; }
.f26f__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 2.5rem; padding-bottom: 2rem; border-bottom: 1px solid #d4c9b5; margin-bottom: 1rem; }
.f26f__brand h3 { font-size: 2rem; font-weight: 300; font-style: italic; margin-bottom: 0.375rem; }
.f26f__brand p em { font-size: 0.875rem; color: #8a7560; }
.f26f__col h4 { font-family: 'Noto Sans KR', sans-serif; font-size: 0.625rem; letter-spacing: 0.25em; margin-bottom: 0.75rem; }
.f26f__col a { display: block; font-size: 0.8125rem; color: #6b5f50; margin-bottom: 0.4375rem; cursor: pointer; }
.f26f__b { width: auto; object-fit: contain; display: block; margin-bottom: 0.25rem; opacity: 0.75; }
.f26f__b--beanpole { height: 10px; } .f26f__b--carhartt { height: 14px; } .f26f__b--levis { height: 17px; } .f26f__b--dickies { height: 22px; }
.f26f__copy { font-size: 0.6875rem; color: #8a7560; font-style: italic; }

/* ════ F27 Naver Shopping ════ */
.f27f { padding: 2.5rem 2rem 1.5rem; color: #222; font-family: 'Noto Sans KR', sans-serif; background: #fff; border-top: 1px solid #e0e0e0; }
.f27f__top { display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 2.5rem; padding-bottom: 1.5rem; border-bottom: 1px solid #eee; margin-bottom: 1rem; }
.f27f__col h4 { font-size: 0.75rem; font-weight: 800; margin-bottom: 0.75rem; }
.f27f__col a, .f27f__col p { display: block; font-size: 0.6875rem; color: #666; margin-bottom: 0.375rem; cursor: pointer; }
.f27f__phone { font-size: 1.5rem !important; font-weight: 900 !important; color: #03C75A !important; margin-bottom: 0.25rem !important; }
.f27f__f { color: #03C75A; }
.f27f__b { width: auto; object-fit: contain; display: block; margin-bottom: 0.25rem; }
.f27f__b--beanpole { height: 10px; } .f27f__b--carhartt { height: 14px; } .f27f__b--levis { height: 17px; } .f27f__b--dickies { height: 22px; }
.f27f__bot { font-size: 0.625rem; color: #999; line-height: 1.7; }

/* ════ F28 Film Grain ════ */
.f28f { padding: 2rem; color: #e8dcc8; font-family: 'Courier New', monospace; border-top: 1px solid #3a3428; }
.f28f__row { display: grid; grid-template-columns: auto 1fr auto; gap: 2rem; align-items: center; padding-bottom: 1.25rem; border-bottom: 1px solid #3a3428; margin-bottom: 1rem; font-size: 0.625rem; letter-spacing: 0.2em; color: #8a7d68; }
.f28f__nav { display: flex; gap: 2rem; justify-content: center; align-items: center; }
.f28f__b { width: auto; object-fit: contain; filter: sepia(0.4) brightness(1.2); opacity: 0.8; }
.f28f__b--beanpole { height: 10px; } .f28f__b--carhartt { height: 14px; } .f28f__b--levis { height: 17px; } .f28f__b--dickies { height: 22px; }
.f28f__copy { font-size: 0.625rem; letter-spacing: 0.2em; color: #5a5040; text-align: center; }

/* ════ F29 Korean Hanbok ════ */
.f29f { padding: 3rem 2.5rem 1.5rem; text-align: center; color: #2a1f14; font-family: 'Noto Serif KR', serif; border-top: 1px solid #c9b99a; }
.f29f__seal { font-size: 3rem; font-weight: 300; color: #8b2322; margin-bottom: 1rem; }
.f29f__msg { font-size: 1.125rem; font-weight: 300; line-height: 1.6; margin-bottom: 2rem; }
.f29f__msg em { font-style: normal; color: #8b2322; }
.f29f__nav { display: flex; justify-content: center; gap: 2.5rem; align-items: center; padding: 1.5rem 0; border-top: 1px solid #c9b99a; border-bottom: 1px solid #c9b99a; margin-bottom: 1.25rem; }
.f29f__b { width: auto; object-fit: contain; filter: sepia(0.15); opacity: 0.85; }
.f29f__b--beanpole { height: 10px; } .f29f__b--carhartt { height: 14px; } .f29f__b--levis { height: 17px; } .f29f__b--dickies { height: 22px; }
.f29f__bot { display: flex; justify-content: space-between; font-size: 0.6875rem; letter-spacing: 0.15em; color: #8a7050; }

/* ════ F30 Sportswear ════ */
.f30f { padding: 3rem 2rem 1.5rem; background: #0a0a0a; color: #f5f5f5; font-family: 'Noto Sans KR', sans-serif; border-top: 1px solid #FF4444; }
.f30f__top { display: grid; grid-template-columns: auto auto 1fr; gap: 3rem; align-items: start; padding-bottom: 2rem; border-bottom: 1px solid #222; margin-bottom: 1rem; }
.f30f__logo { font-size: 1.75rem; font-weight: 900; }
.f30f__logo span { font-weight: 400; font-size: 0.625rem; color: #FF4444; margin-left: 0.375rem; letter-spacing: 0.15em; vertical-align: super; }
.f30f__brands { display: flex; gap: 2rem; align-items: center; padding-top: 0.5rem; }
.f30f__b { width: auto; object-fit: contain; filter: invert(1) brightness(1.1); opacity: 0.8; }
.f30f__b--beanpole { height: 10px; } .f30f__b--carhartt { height: 14px; } .f30f__b--levis { height: 17px; } .f30f__b--dickies { height: 22px; }
.f30f__cols { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
.f30f__cols h4 { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 0.625rem; color: #FF4444; }
.f30f__cols a { display: block; font-size: 0.6875rem; color: #ccc; margin-bottom: 0.375rem; cursor: pointer; }
.f30f__bot { text-align: center; font-size: 0.625rem; letter-spacing: 0.2em; color: #666; }

/* 하단 네비 */
.fp-bottomnav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 3rem 2rem 5rem;
  max-width: 1400px;
  margin: 0 auto;
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.fp-bottomnav__link { color: #bbb; transition: color 0.2s; }
.fp-bottomnav__link:hover { color: #fff; }
</style>
