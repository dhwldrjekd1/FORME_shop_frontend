<template>
  <main class="hp">
    <!-- Top Navigation -->
    <header class="hp-top">
      <RouterLink to="/forme" class="hp-top__link">← Design Picker</RouterLink>
      <span class="hp-top__title">HEADER LIBRARY · 10 VARIANTS</span>
      <RouterLink to="/forme/ui/footer" class="hp-top__link">Footer Library →</RouterLink>
    </header>

    <div class="hp-intro">
      <p class="hp-intro__eyebrow">COMPONENT LIBRARY</p>
      <h1 class="hp-intro__title">Header Variants · 30</h1>
      <p class="hp-intro__desc">
        25가지 헤더 디자인. 각 블록을 확인하고 원하는 스타일을 선택하세요.<br />
        H21~25는 30~50대 타겟 실용 쇼핑몰 스타일입니다.
      </p>
    </div>

    <!-- ═══════════════════════════════════════
         HEADER 01 — Minimal (Musinsa / 29CM)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 01</span>
        <span class="hp-label__name">Minimal · Modern</span>
        <span class="hp-label__ref">Ref: Musinsa · 29CM</span>
      </div>
      <div class="hp-preview hp-preview--light">
        <header class="h01">
          <div class="h01__logo">FORME</div>
          <nav class="h01__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h01__brand h01__brand--${b.slug}`" />
            </a>
          </nav>
          <div class="h01__icons">
            <span class="material-symbols-outlined">search</span>
            <span class="material-symbols-outlined">favorite</span>
            <span class="material-symbols-outlined">person</span>
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 02 — Colorful (SSF / 롯데온)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 02</span>
        <span class="hp-label__name">Colorful · Department</span>
        <span class="hp-label__ref">Ref: SSF · 롯데온</span>
      </div>
      <div class="hp-preview hp-preview--light">
        <header class="h02">
          <div class="h02__top">
            <span>★ 무료배송</span>
            <span>★ 신규회원 10% 할인</span>
            <span>★ 24시간 고객센터</span>
          </div>
          <div class="h02__main">
            <div class="h02__logo">FORME</div>
            <div class="h02__search">
              <input placeholder="브랜드, 상품 검색" />
              <button><span class="material-symbols-outlined">search</span></button>
            </div>
            <div class="h02__icons">
              <span class="material-symbols-outlined">favorite</span>
              <span class="material-symbols-outlined">person</span>
              <span class="h02__cart">
                <span class="material-symbols-outlined">shopping_bag</span>
                <em>3</em>
              </span>
            </div>
          </div>
          <nav class="h02__nav">
            <a class="h02__nav-new">NEW</a>
            <a v-for="b in brands" :key="b.slug" class="h02__nav-brand">
              <img :src="b.logo" :alt="b.name" :class="`h02__brand h02__brand--${b.slug}`" />
            </a>
            <a class="h02__nav-sale">SALE</a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 03 — Premium Heritage (더현대 / LF몰)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 03</span>
        <span class="hp-label__name">Premium · Heritage</span>
        <span class="hp-label__ref">Ref: 더현대 · LF몰</span>
      </div>
      <div class="hp-preview hp-preview--beige">
        <header class="h03">
          <div class="h03__row h03__row--top">
            <span>EST. 2026</span>
            <span>MEMBERSHIP · STORES · CONTACT</span>
          </div>
          <div class="h03__row h03__row--logo">
            <span class="h03__logo">FORME</span>
          </div>
          <nav class="h03__nav">
            <a v-for="(b, i) in brands" :key="b.slug" class="h03__nav-item">
              <img :src="b.logo" :alt="b.name" :class="`h03__brand h03__brand--${b.slug}`" />
              <span v-if="i < brands.length - 1" class="h03__dot">◆</span>
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 04 — Gallery (Aesop / Celine)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 04</span>
        <span class="hp-label__name">Gallery · Atelier</span>
        <span class="hp-label__ref">Ref: Aesop · Celine</span>
      </div>
      <div class="hp-preview hp-preview--cream">
        <header class="h04">
          <div class="h04__side">MENU</div>
          <div class="h04__center">
            <p class="h04__no">N° 04</p>
            <p class="h04__logo">FORME</p>
            <p class="h04__tag">Atelier · Seoul</p>
          </div>
          <div class="h04__side h04__side--right">
            <span class="material-symbols-outlined">search</span>
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
        <nav class="h04__subnav">
          <a v-for="b in brands" :key="b.slug">
            <img :src="b.logo" :alt="b.name" :class="`h04__brand h04__brand--${b.slug}`" />
          </a>
        </nav>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 05 — Japanese Grid (UNIQLO / MUJI)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 05</span>
        <span class="hp-label__name">Japanese · Grid</span>
        <span class="hp-label__ref">Ref: UNIQLO · MUJI</span>
      </div>
      <div class="hp-preview hp-preview--light">
        <header class="h05">
          <div class="h05__cell h05__cell--logo">
            <p class="h05__no">N° 05</p>
            <p class="h05__brand">FORME</p>
          </div>
          <div
            v-for="b in brands"
            :key="b.slug"
            class="h05__cell h05__cell--link"
          >
            <img :src="b.logo" :alt="b.name" :class="`h05__brandimg h05__brandimg--${b.slug}`" />
          </div>
          <div class="h05__cell h05__cell--icon">
            <span class="material-symbols-outlined">search</span>
          </div>
          <div class="h05__cell h05__cell--icon">
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 06 — Y2K Bold (Supreme / Palace)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 06</span>
        <span class="hp-label__name">Y2K · Bold Blocks</span>
        <span class="hp-label__ref">Ref: Supreme · Palace</span>
      </div>
      <div class="hp-preview hp-preview--cream">
        <header class="h06">
          <div class="h06__marquee">
            <span>★ DROP 01 · APR 09 · STAY HYPED ★ DROP 01 · APR 09 · STAY HYPED ★</span>
          </div>
          <div class="h06__main">
            <div class="h06__logo">FORME</div>
            <nav class="h06__nav">
              <a
                v-for="(b, i) in brands"
                :key="b.slug"
                class="h06__pill"
                :class="`h06__pill--${h06Colors[i]}`"
              >
                <img :src="b.logo" :alt="b.name" :class="`h06__brand h06__brand--${b.slug}`" />
              </a>
            </nav>
            <button class="h06__cta">SHOP →</button>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 07 — Editorial (Monocle / Apartamento)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 07</span>
        <span class="hp-label__name">Editorial · Magazine</span>
        <span class="hp-label__ref">Ref: Monocle · Apartamento</span>
      </div>
      <div class="hp-preview hp-preview--cream">
        <header class="h07">
          <div class="h07__meta">
            <span>VOL. 01</span>
            <span>SPRING 2026</span>
            <span>WWW.FORME.KR</span>
            <span>₩ 12,000</span>
          </div>
          <div class="h07__masthead">
            <span class="h07__logo">FORME</span>
          </div>
          <nav class="h07__nav">
            <a v-for="b in brands" :key="b.slug" class="h07__nav-item">
              <img :src="b.logo" :alt="b.name" :class="`h07__brand h07__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 08 — Street (Off-White / ACRONYM)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 08</span>
        <span class="hp-label__name">Street · Technical</span>
        <span class="hp-label__ref">Ref: Off-White · ACRONYM</span>
      </div>
      <div class="hp-preview hp-preview--dark">
        <header class="h08">
          <div class="h08__left">
            <span class="h08__code">SYS // 08</span>
            <span class="h08__logo">FORME</span>
          </div>
          <nav class="h08__nav">
            <a v-for="(b, i) in brands" :key="b.slug" class="h08__nav-item">
              <span class="h08__nav-code">/0{{ i + 1 }}</span>
              <img :src="b.logo" :alt="b.name" :class="`h08__brand h08__brand--${b.slug}`" />
            </a>
          </nav>
          <div class="h08__right">
            <span class="h08__status">◉ LIVE</span>
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 09 — Luxury (Hermès / Dior)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 09</span>
        <span class="hp-label__name">Luxury · Maison</span>
        <span class="hp-label__ref">Ref: Hermès · Dior</span>
      </div>
      <div class="hp-preview hp-preview--black">
        <header class="h09">
          <div class="h09__ornament">
            <span></span>◆<span></span>
          </div>
          <div class="h09__logo">FORME</div>
          <p class="h09__sub">M A I S O N &nbsp; D E &nbsp; S É L E C T I O N</p>
          <nav class="h09__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h09__brand h09__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 10 — Eco (Patagonia / Muji)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 10</span>
        <span class="hp-label__name">Eco · Natural</span>
        <span class="hp-label__ref">Ref: Patagonia · Muji</span>
      </div>
      <div class="hp-preview hp-preview--kraft">
        <header class="h10">
          <div class="h10__badge">
            <span class="material-symbols-outlined">eco</span>
            <span>CERTIFIED</span>
          </div>
          <div class="h10__logo">
            <span>FORME</span>
            <em>Slow fashion, honest goods.</em>
          </div>
          <nav class="h10__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h10__brand h10__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 11 — Neo Brutalist
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 11</span>
        <span class="hp-label__name">Neo Brutalist</span>
        <span class="hp-label__ref">Ref: Balenciaga · Gentle Monster</span>
      </div>
      <div class="hp-preview" style="background:#FFE500;">
        <header class="h11">
          <div class="h11__logo-cell">FORME</div>
          <a v-for="(b,i) in brands" :key="b.slug" class="h11__cell">
            <span>[ 0{{i+1}} ]</span>
            <img :src="b.logo" :alt="b.name" :class="`h11__brand h11__brand--${b.slug}`" />
          </a>
          <div class="h11__icon"><span class="material-symbols-outlined">shopping_bag</span></div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 12 — Glassmorphism
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 12</span>
        <span class="hp-label__name">Glassmorphism</span>
        <span class="hp-label__ref">Ref: Apple · Windows 11</span>
      </div>
      <div class="hp-preview" style="background:linear-gradient(135deg,#667eea 0%,#f093fb 50%,#4facfe 100%); padding:1.5rem;">
        <header class="h12">
          <div class="h12__logo">FORME</div>
          <nav class="h12__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h12__brand h12__brand--${b.slug}`" />
            </a>
          </nav>
          <div class="h12__actions">
            <span class="material-symbols-outlined">search</span>
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 13 — Swiss Bauhaus
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 13</span>
        <span class="hp-label__name">Swiss Bauhaus</span>
        <span class="hp-label__ref">Ref: Helvetica · Müller-Brockmann</span>
      </div>
      <div class="hp-preview" style="background:#f5f5f0;">
        <header class="h13">
          <div class="h13__logo">FORME<span>13</span></div>
          <div class="h13__line"></div>
          <nav class="h13__nav">
            <a v-for="(b,i) in brands" :key="b.slug">
              <span class="h13__num">0{{i+1}}</span>
              <img :src="b.logo" :alt="b.name" :class="`h13__brand h13__brand--${b.slug}`" />
            </a>
          </nav>
          <div class="h13__corner"></div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 14 — Dark Academia
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 14</span>
        <span class="hp-label__name">Dark Academia</span>
        <span class="hp-label__ref">Ref: Oxford · Tom Ford era</span>
      </div>
      <div class="hp-preview" style="background:#1a0f0a;">
        <header class="h14">
          <p class="h14__latin">— in perpetuum —</p>
          <div class="h14__logo">FORME</div>
          <div class="h14__orn">❦</div>
          <nav class="h14__nav">
            <a v-for="(b,i) in brands" :key="b.slug" class="h14__nav-item">
              <span>Vol. {{ roman[i] }}</span>
              <img :src="b.logo" :alt="b.name" :class="`h14__brand h14__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 15 — Art Deco
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 15</span>
        <span class="hp-label__name">Art Deco</span>
        <span class="hp-label__ref">Ref: 1920s Paris · Gatsby</span>
      </div>
      <div class="hp-preview" style="background:#0f1a3a;">
        <header class="h15">
          <div class="h15__ornament">
            <span></span>◆<span></span>
          </div>
          <div class="h15__logo">FORME</div>
          <div class="h15__divider">
            <span></span>◆<span></span>
          </div>
          <nav class="h15__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h15__brand h15__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 16 — Cyberpunk Neon
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 16</span>
        <span class="hp-label__name">Cyberpunk Neon</span>
        <span class="hp-label__ref">Ref: Blade Runner · Neuromancer</span>
      </div>
      <div class="hp-preview" style="background:#05010f;">
        <header class="h16">
          <span class="h16__code">&gt; SYS.BOOT</span>
          <span class="h16__logo" data-text="FORME">FORME</span>
          <nav class="h16__nav">
            <a v-for="(b,i) in brands" :key="b.slug">
              <span>/0{{i+1}}</span>
              <img :src="b.logo" :alt="b.name" :class="`h16__brand h16__brand--${b.slug}`" />
            </a>
          </nav>
          <span class="h16__status">◉ ONLINE</span>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 17 — Scandinavian
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 17</span>
        <span class="hp-label__name">Scandinavian</span>
        <span class="hp-label__ref">Ref: Acne · COS · &amp; Other Stories</span>
      </div>
      <div class="hp-preview" style="background:#f4ede4;">
        <header class="h17">
          <div class="h17__logo">forme</div>
          <nav class="h17__nav">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h17__brand h17__brand--${b.slug}`" />
            </a>
          </nav>
          <div class="h17__actions">
            <span class="material-symbols-outlined">search</span>
            <span class="material-symbols-outlined">shopping_bag</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 18 — Vaporwave
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 18</span>
        <span class="hp-label__name">Vaporwave</span>
        <span class="hp-label__ref">Ref: 80s Japan · Retro Future</span>
      </div>
      <div class="hp-preview" style="background:linear-gradient(180deg,#2e0854 0%,#ff006e 50%,#ff9a56 100%);">
        <header class="h18">
          <div class="h18__logo">Ｆ Ｏ Ｒ Ｍ Ｅ</div>
          <nav class="h18__nav">
            <a v-for="b in brands" :key="b.slug" class="h18__pill">
              <img :src="b.logo" :alt="b.name" :class="`h18__brand h18__brand--${b.slug}`" />
            </a>
          </nav>
          <span class="h18__jp">現代</span>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 19 — Newspaper Classic
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 19</span>
        <span class="hp-label__name">Newspaper Classic</span>
        <span class="hp-label__ref">Ref: NYT · Le Monde</span>
      </div>
      <div class="hp-preview" style="background:#f4f0e6;">
        <header class="h19">
          <div class="h19__meta">
            <span>VOL. I · N° 1</span>
            <span>FRI, APR 10, 2026</span>
            <span>PRICE ₩ 12,000</span>
          </div>
          <h2 class="h19__logo">The FORME Times</h2>
          <p class="h19__tag">"All the garments that are fit to wear."</p>
          <nav class="h19__nav">
            <a v-for="(b,i) in brands" :key="b.slug">
              <span>Ch.{{i+1}}</span>
              <img :src="b.logo" :alt="b.name" :class="`h19__brand h19__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 20 — Hand-drawn Craft
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 20</span>
        <span class="hp-label__name">Hand-drawn Craft</span>
        <span class="hp-label__ref">Ref: Etsy · small ateliers</span>
      </div>
      <div class="hp-preview" style="background:#fdf8ef;">
        <header class="h20">
          <div class="h20__tape h20__tape--left"></div>
          <div class="h20__tape h20__tape--right"></div>
          <div class="h20__logo">
            <span>forme</span>
            <em>— a small atelier ✿</em>
          </div>
          <nav class="h20__nav">
            <a v-for="(b,i) in brands" :key="b.slug" class="h20__chip">
              <span class="h20__chip-mark">{{ ['✿','✤','❋','❀'][i] }}</span>
              <img :src="b.logo" :alt="b.name" :class="`h20__brand h20__brand--${b.slug}`" />
            </a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 21 — Department Modern (LF몰·한섬)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 21</span>
        <span class="hp-label__name">Department Modern</span>
        <span class="hp-label__ref">Ref: LF몰 · 한섬몰 · 30-50 타겟</span>
      </div>
      <div class="hp-preview hp-preview--light">
        <header class="h21">
          <div class="h21__topbar">
            <span>전 상품 무료배송</span>
            <span>·</span>
            <span>신규회원 10% 쿠폰</span>
            <span>·</span>
            <span>7일 무료 반품</span>
            <span class="h21__topbar-right">고객센터 1588-0000</span>
          </div>
          <div class="h21__main">
            <div class="h21__logo">FORME</div>
            <nav class="h21__nav">
              <a>NEW</a>
              <a>BEST</a>
              <a v-for="b in brands" :key="b.slug">
                <img :src="b.logo" :alt="b.name" :class="`h21__brand h21__brand--${b.slug}`" />
              </a>
              <a class="h21__nav-sale">SALE</a>
            </nav>
            <div class="h21__actions">
              <input class="h21__search" placeholder="상품·브랜드 검색" />
              <span class="h21__ico">♡</span>
              <span class="h21__ico">👤</span>
              <span class="h21__ico h21__ico--cart">🛒<em>2</em></span>
            </div>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 22 — Warm Editorial (Barbour·GANNI)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 22</span>
        <span class="hp-label__name">Warm Editorial</span>
        <span class="hp-label__ref">Ref: Barbour · GANNI · 40대 감성</span>
      </div>
      <div class="hp-preview" style="background:#f4efe7;">
        <header class="h22">
          <div class="h22__top">FREE SHIPPING ON ALL ORDERS · FREE RETURNS</div>
          <div class="h22__main">
            <nav class="h22__nav-left">
              <a>SHOP</a>
              <a>JOURNAL</a>
              <a>STORES</a>
            </nav>
            <div class="h22__logo">forme</div>
            <nav class="h22__nav-right">
              <a>SEARCH</a>
              <a>ACCOUNT</a>
              <a>BAG (2)</a>
            </nav>
          </div>
          <nav class="h22__cats">
            <a>New Arrivals</a>
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h22__brand h22__brand--${b.slug}`" />
            </a>
            <a class="h22__cats-sale">Sale</a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 23 — Premium Showcase (에잇세컨즈·에르메)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 23</span>
        <span class="hp-label__name">Premium Showcase</span>
        <span class="hp-label__ref">Ref: 에잇세컨즈 · 에르메네질도</span>
      </div>
      <div class="hp-preview hp-preview--light">
        <header class="h23">
          <div class="h23__util">
            <a>MEMBERSHIP</a><a>STORES</a><a>CONTACT</a>
            <span class="h23__lang">KR | EN</span>
          </div>
          <div class="h23__logo-row">
            <div class="h23__logo">FORME</div>
          </div>
          <nav class="h23__nav">
            <a>WOMEN</a>
            <a>MEN</a>
            <a>NEW IN</a>
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h23__brand h23__brand--${b.slug}`" />
            </a>
            <a class="h23__nav-sale">OUTLET</a>
          </nav>
          <div class="h23__icons">
            <span>🔍 Search</span>
            <span>♡ Wishlist</span>
            <span>👤 My</span>
            <span>🛒 Bag (0)</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 24 — Practical Grid (29CM mature)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 24</span>
        <span class="hp-label__name">Practical Grid</span>
        <span class="hp-label__ref">Ref: 29CM · 스타일쉐어</span>
      </div>
      <div class="hp-preview" style="background:#fafafa;">
        <header class="h24">
          <div class="h24__logo">forme</div>
          <nav class="h24__nav">
            <a class="h24__nav-active">홈</a>
            <a>상품</a>
            <a>브랜드</a>
            <a>기획전</a>
            <a>매거진</a>
          </nav>
          <div class="h24__brandrow">
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h24__brand h24__brand--${b.slug}`" />
            </a>
          </div>
          <div class="h24__right">
            <input class="h24__search" placeholder="상품·브랜드 검색" />
            <a>로그인</a>
            <a>🛍</a>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══════════════════════════════════════
         HEADER 25 — Classic Serif Catalog (현대H몰·신세계)
         ═══════════════════════════════════════ -->
    <section class="hp-slot">
      <div class="hp-label">
        <span class="hp-label__no">HEADER N° 25</span>
        <span class="hp-label__name">Classic Serif Catalog</span>
        <span class="hp-label__ref">Ref: 현대H몰 · 신세계</span>
      </div>
      <div class="hp-preview" style="background:#f8f4eb;">
        <header class="h25">
          <div class="h25__promo">
            <span>무료 반품</span>·<span>무이자 할부</span>·<span>당일 발송</span>·<span>5만원 이상 무료배송</span>
          </div>
          <div class="h25__brand">
            <h1 class="h25__logo">FORME</h1>
            <p class="h25__sub">— THE HOUSE OF CURATED CLASSICS —</p>
          </div>
          <nav class="h25__nav">
            <a>신상품</a>
            <a v-for="b in brands" :key="b.slug">
              <img :src="b.logo" :alt="b.name" :class="`h25__brand-logo h25__brand-logo--${b.slug}`" />
            </a>
            <a>편집실</a>
            <a class="h25__nav-sale">할인관</a>
          </nav>
          <div class="h25__util">
            <span>🔍 검색</span>
            <span>♡ 찜</span>
            <span>👤 마이</span>
            <span>🛍 장바구니 (0)</span>
          </div>
        </header>
      </div>
    </section>

    <!-- ═══ H26 Kinfolk ═══ -->
    <section class="hp-slot">
      <div class="hp-label"><span class="hp-label__no">HEADER N° 26</span><span class="hp-label__name">Kinfolk Lifestyle</span><span class="hp-label__ref">Ref: Kinfolk · Cereal</span></div>
      <div class="hp-preview" style="background:#faf7f2;">
        <header class="h26">
          <div class="h26__logo">forme</div>
          <nav class="h26__nav"><a>Home</a><a>Shop</a><a>Journal</a><a>About</a></nav>
          <nav class="h26__brands">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`h26__b h26__b--${b.slug}`" /></a>
          </nav>
          <div class="h26__right"><a>Search</a><a>Bag</a></div>
        </header>
      </div>
    </section>

    <!-- ═══ H27 Naver Shopping ═══ -->
    <section class="hp-slot">
      <div class="hp-label"><span class="hp-label__no">HEADER N° 27</span><span class="hp-label__name">Naver Shopping</span><span class="hp-label__ref">Ref: 네이버 쇼핑 · 쿠팡</span></div>
      <div class="hp-preview hp-preview--light">
        <header class="h27">
          <div class="h27__top"><a>로그인</a><a>회원가입</a><a>고객센터</a></div>
          <div class="h27__main">
            <div class="h27__logo"><span class="h27__f">F</span>ORME</div>
            <div class="h27__search"><input placeholder="찾고 싶은 상품을 검색해보세요" /><button>🔍</button></div>
            <div class="h27__badges"><span class="h27__badge h27__badge--green">무료배송</span><span class="h27__badge h27__badge--red">SALE</span></div>
          </div>
          <nav class="h27__nav">
            <a class="h27__nav-hot">🔥 HOT</a>
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`h27__b h27__b--${b.slug}`" /></a>
            <a class="h27__nav-sale">세일</a>
          </nav>
        </header>
      </div>
    </section>

    <!-- ═══ H28 Film Grain ═══ -->
    <section class="hp-slot">
      <div class="hp-label"><span class="hp-label__no">HEADER N° 28</span><span class="hp-label__name">Film Grain Analog</span><span class="hp-label__ref">Ref: Kodak · Fujifilm</span></div>
      <div class="hp-preview" style="background:#1a1814;">
        <header class="h28">
          <span class="h28__date">04/10/2026</span>
          <span class="h28__logo">FORME</span>
          <nav class="h28__brands">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`h28__b h28__b--${b.slug}`" /></a>
          </nav>
          <span class="h28__film">KODAK PORTRA 400</span>
        </header>
      </div>
    </section>

    <!-- ═══ H29 Korean Hanbok Modern ═══ -->
    <section class="hp-slot">
      <div class="hp-label"><span class="hp-label__no">HEADER N° 29</span><span class="hp-label__name">Korean Hanbok Modern</span><span class="hp-label__ref">Ref: 한복 모던 · 전통+현대</span></div>
      <div class="hp-preview" style="background:#f5efe3;">
        <header class="h29">
          <span class="h29__hanja">形</span>
          <div class="h29__logo">FORME</div>
          <nav class="h29__brands">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`h29__b h29__b--${b.slug}`" /></a>
          </nav>
          <span class="h29__sub">형 · 形 · かたち</span>
        </header>
      </div>
    </section>

    <!-- ═══ H30 Sportswear Athletic ═══ -->
    <section class="hp-slot">
      <div class="hp-label"><span class="hp-label__no">HEADER N° 30</span><span class="hp-label__name">Sportswear Athletic</span><span class="hp-label__ref">Ref: Nike · Under Armour</span></div>
      <div class="hp-preview" style="background:#111;">
        <header class="h30">
          <div class="h30__logo">FORME<span>SPORT</span></div>
          <nav class="h30__nav">
            <a v-for="b in brands" :key="b.slug"><img :src="b.logo" :alt="b.name" :class="`h30__b h30__b--${b.slug}`" /></a>
          </nav>
          <div class="h30__right"><a>🔍</a><a>👤</a><a>🛒</a></div>
        </header>
      </div>
    </section>

    <!-- 하단 네비 -->
    <nav class="hp-bottomnav">
      <RouterLink to="/forme" class="hp-bottomnav__link">← Design Picker</RouterLink>
      <RouterLink to="/forme/ui/footer" class="hp-bottomnav__link">Footer Library →</RouterLink>
    </nav>
  </main>
</template>

<script setup>
import beanpoleLogo from "@/assets/beanpole.svg";
import carharttLogo from "@/assets/carhartt.svg";
import levisLogo from "@/assets/levis.svg";
import dickiesLogo from "@/assets/dickies.svg";

// 순서: Beanpole → Carhartt → Levi's → Dickies
const brands = [
  { slug: "beanpole", name: "Beanpole", logo: beanpoleLogo },
  { slug: "carhartt", name: "Carhartt", logo: carharttLogo },
  { slug: "levis",    name: "Levi's",   logo: levisLogo },
  { slug: "dickies",  name: "Dickies",  logo: dickiesLogo },
];

// H06 전용 pill 컬러 매핑
const h06Colors = ["pink", "yellow", "mint", "orange"];
// H14 로마자
const roman = ["I", "II", "III", "IV"];
</script>

<style scoped>
/* ════════════════════════════════
   Header Picker Page
   ════════════════════════════════ */
.hp {
  background: #0f0f0f;
  color: #f5f5f5;
  font-family: var(--font-body);
  min-height: 100dvh;
}

/* 상단 네비 */
.hp-top {
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
.hp-top__link { color: #bbb; transition: color 0.2s; }
.hp-top__link:hover { color: #fff; }
.hp-top__title {
  font-family: "Italiana", serif;
  font-size: 0.9375rem;
  font-weight: 400;
  letter-spacing: 0.15em;
  text-transform: none;
  color: #fff;
}

/* 인트로 */
.hp-intro {
  text-align: center;
  padding: 6rem 2rem 4rem;
  max-width: 50rem;
  margin: 0 auto;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
}
.hp-intro__eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  color: #888;
  margin-bottom: 1.5rem;
}
.hp-intro__title {
  font-family: "Italiana", serif;
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: 0.02em;
  margin-bottom: 1.25rem;
}
.hp-intro__desc {
  font-size: 0.9375rem;
  color: #999;
  line-height: 1.8;
}

/* 슬롯 */
.hp-slot {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 2rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.08);
}
.hp-label {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.hp-label__no {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
  padding: 0.375rem 0.75rem;
}
.hp-label__name {
  font-family: "Italiana", serif;
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  color: #fff;
}
.hp-label__ref {
  font-size: 0.75rem;
  font-style: italic;
  color: #888;
}
.hp-preview {
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  overflow: hidden;
}
.hp-preview--light { background: #ffffff; }
.hp-preview--beige { background: #faf8f4; }
.hp-preview--cream { background: #fbf9f4; }
.hp-preview--dark  { background: #1a1a1a; }
.hp-preview--black { background: #0a0907; }
.hp-preview--kraft { background: #f0e9dc; }

/* SVG 공통 기본: GPU 레이어로 올려 선명하게 */
.hp img {
  transform: translateZ(0);
  backface-visibility: hidden;
  image-rendering: -webkit-optimize-contrast;
}

/* ════════════════════════════════
   H01 — Minimal
   ════════════════════════════════ */
.h01 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2.5rem;
  color: #111;
}
.h01__logo {
  font-family: "Work Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.h01__nav {
  display: flex;
  align-items: center;
  gap: 2.25rem;
}
.h01__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.h01__brand:hover { opacity: 1; }
.h01__brand--beanpole { height: 13px; }
.h01__brand--carhartt { height: 20px; }
.h01__brand--levis    { height: 24px; }
.h01__brand--dickies  { height: 30px; }
.h01__icons {
  display: flex;
  gap: 1rem;
}
.h01__icons .material-symbols-outlined {
  font-size: 1.25rem;
  color: #111;
  cursor: pointer;
}

/* ════════════════════════════════
   H02 — Colorful Department
   ════════════════════════════════ */
.h02 { color: #222; }
.h02__top {
  display: flex;
  justify-content: center;
  gap: 2rem;
  padding: 0.625rem 2rem;
  background: #FF6B6B;
  color: #fff;
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.h02__main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem 2.5rem;
}
.h02__logo {
  font-family: "Noto Serif", serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #FF6B6B;
}
.h02__search {
  display: flex;
  max-width: 32rem;
  background: #f5f5f5;
  border-radius: 999px;
  overflow: hidden;
}
.h02__search input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 0.75rem 1.25rem;
  font-size: 0.875rem;
  outline: none;
}
.h02__search button {
  background: #FF6B6B;
  border: none;
  padding: 0 1.25rem;
  color: #fff;
  cursor: pointer;
}
.h02__search button .material-symbols-outlined { font-size: 1.125rem; }
.h02__icons {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.h02__icons .material-symbols-outlined { font-size: 1.25rem; }
.h02__cart {
  position: relative;
  display: inline-flex;
  align-items: center;
}
.h02__cart em {
  position: absolute;
  top: -6px;
  right: -8px;
  background: #FF6B6B;
  color: #fff;
  border-radius: 999px;
  padding: 0.0625rem 0.375rem;
  font-size: 0.5625rem;
  font-weight: 700;
  font-style: normal;
}
.h02__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  padding: 0.875rem 2rem;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
}
.h02__nav-new,
.h02__nav-sale {
  font-size: 0.8125rem;
  font-weight: 700;
  cursor: pointer;
}
.h02__nav-new { color: #FF6B6B; }
.h02__nav-sale { color: #4A6BFF; }
.h02__nav-brand {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.h02__brand {
  width: auto;
  object-fit: contain;
}
.h02__brand--beanpole { height: 11px; }
.h02__brand--carhartt { height: 17px; }
.h02__brand--levis    { height: 20px; }
.h02__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H03 — Premium Heritage
   ════════════════════════════════ */
.h03 {
  text-align: center;
  color: #1a1a1a;
}
.h03__row {
  padding: 0.875rem 2rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.12);
}
.h03__row--top {
  display: flex;
  justify-content: space-between;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
}
.h03__row--logo {
  padding: 2rem 2rem 1.75rem;
  border-bottom: none;
}
.h03__logo {
  font-family: "Italiana", serif;
  font-size: 2.75rem;
  font-weight: 400;
  letter-spacing: 0.08em;
}
.h03__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
  padding: 1.375rem 2rem;
  border-top: 0.5px solid rgba(0, 0, 0, 0.12);
}
.h03__nav-item {
  display: inline-flex;
  align-items: center;
  gap: 1.25rem;
  cursor: pointer;
}
.h03__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.h03__nav-item:hover .h03__brand { opacity: 1; }
.h03__brand--beanpole { height: 12px; }
.h03__brand--carhartt { height: 18px; }
.h03__brand--levis    { height: 22px; }
.h03__brand--dickies  { height: 28px; }
.h03__dot {
  font-size: 0.5rem;
  color: #c9a86b;
}

/* ════════════════════════════════
   H04 — Gallery
   ════════════════════════════════ */
.h04 {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.75rem 3rem;
  color: #1a1a1a;
}
.h04__side {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.35em;
  color: #6b6b6b;
  cursor: pointer;
}
.h04__side--right {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}
.h04__side--right .material-symbols-outlined {
  font-size: 1.125rem;
  color: #6b6b6b;
  font-variation-settings: "wght" 300;
  cursor: pointer;
}
.h04__center { text-align: center; }
.h04__no {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 0.5rem;
}
.h04__logo {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1;
  margin-bottom: 0.25rem;
}
.h04__tag {
  font-family: "Cormorant Garamond", serif;
  font-style: italic;
  font-size: 0.75rem;
  color: #6b6b6b;
}
.h04__subnav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.25rem 3rem;
  border-top: 0.5px solid rgba(0,0,0,0.12);
}
.h04__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.h04__brand:hover { opacity: 1; }
.h04__brand--beanpole { height: 11px; }
.h04__brand--carhartt { height: 17px; }
.h04__brand--levis    { height: 20px; }
.h04__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H05 — Japanese Grid
   ════════════════════════════════ */
.h05 {
  display: grid;
  grid-template-columns: 1.5fr repeat(4, 1fr) auto auto;
  border-bottom: 1px solid #1f1f1f;
  color: #1f1f1f;
  min-height: 72px;
}
.h05__cell {
  padding: 1rem 1rem;
  border-right: 1px solid #e5e5e5;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 0.25rem;
  cursor: pointer;
}
.h05__cell:last-child { border-right: none; }
.h05__cell--logo { align-items: flex-start; padding: 1.25rem 1.5rem; }
.h05__no {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.15em;
}
.h05__brand {
  font-family: "Space Mono", monospace;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.h05__brandimg {
  width: auto;
  object-fit: contain;
}
.h05__brandimg--beanpole { height: 11px; }
.h05__brandimg--carhartt { height: 17px; }
.h05__brandimg--levis    { height: 20px; }
.h05__brandimg--dickies  { height: 26px; }
.h05__cell--icon { padding: 1rem 1.25rem; }
.h05__cell--icon .material-symbols-outlined { font-size: 1.125rem; }

/* ════════════════════════════════
   H06 — Y2K Bold
   ════════════════════════════════ */
.h06 { color: #0a0a0a; }
.h06__marquee {
  background: #0a0a0a;
  color: #FFC72C;
  padding: 0.625rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-family: "Archivo Black", sans-serif;
  font-size: 0.8125rem;
  letter-spacing: 0.1em;
  text-align: center;
}
.h06__main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1.25rem 2rem;
  gap: 2rem;
  border-bottom: 3px solid #0a0a0a;
}
.h06__logo {
  font-family: "Archivo Black", sans-serif;
  font-size: 1.625rem;
  -webkit-text-stroke: 2px #0a0a0a;
  color: transparent;
  line-height: 1;
}
.h06__nav {
  display: flex;
  gap: 0.625rem;
  justify-content: center;
  align-items: center;
}
.h06__pill {
  display: inline-flex;
  align-items: center;
  padding: 0.625rem 1rem;
  border: 2px solid #0a0a0a;
  cursor: pointer;
  transition: transform 0.2s;
  min-height: 32px;
}
.h06__pill:hover { transform: rotate(-3deg); }
.h06__pill--pink   { background: #FFB6D9; }
.h06__pill--yellow { background: #FFC72C; }
.h06__pill--mint   { background: #B4E4D7; }
.h06__pill--orange { background: #FFA94D; }
.h06__brand {
  width: auto;
  object-fit: contain;
}
.h06__brand--beanpole { height: 10px; }
.h06__brand--carhartt { height: 15px; }
.h06__brand--levis    { height: 17px; }
.h06__brand--dickies  { height: 22px; }
.h06__cta {
  background: #0a0a0a;
  color: #FFC72C;
  border: 2px solid #0a0a0a;
  padding: 0.75rem 1.25rem;
  font-family: "Archivo Black", sans-serif;
  font-size: 0.75rem;
  cursor: pointer;
}

/* ════════════════════════════════
   H07 — Editorial Magazine
   ════════════════════════════════ */
.h07 { color: #1a1a1a; text-align: center; }
.h07__meta {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 2rem;
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  color: #666;
  border-bottom: 0.5px solid #1a1a1a;
}
.h07__masthead {
  padding: 2rem 2rem 1.5rem;
}
.h07__logo {
  font-family: "Bodoni Moda", serif;
  font-size: 3.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  line-height: 1;
}
.h07__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  padding: 1.25rem 2rem;
  border-top: 0.5px solid #1a1a1a;
  border-bottom: 0.5px solid #1a1a1a;
}
.h07__nav-item {
  display: inline-flex;
  align-items: center;
  cursor: pointer;
}
.h07__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.85;
  transition: opacity 0.2s;
}
.h07__nav-item:hover .h07__brand { opacity: 1; }
.h07__brand--beanpole { height: 11px; }
.h07__brand--carhartt { height: 17px; }
.h07__brand--levis    { height: 20px; }
.h07__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H08 — Street Technical
   ════════════════════════════════ */
.h08 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1.5rem 2rem;
  background: #1a1a1a;
  color: #f5f5f5;
  border-top: 1px solid #FF3B3B;
  border-bottom: 1px solid #333;
  gap: 2rem;
}
.h08__left {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.h08__code {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #FF3B3B;
  border: 1px solid #FF3B3B;
  padding: 0.375rem 0.5rem;
}
.h08__logo {
  font-family: "Anton", sans-serif;
  font-size: 1.875rem;
  letter-spacing: 0.05em;
  text-transform: uppercase;
}
.h08__nav {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
}
.h08__nav-item {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: opacity 0.2s;
  opacity: 0.75;
}
.h08__nav-item:hover { opacity: 1; }
.h08__nav-code {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #FF3B3B;
}
.h08__brand {
  width: auto;
  object-fit: contain;
  filter: invert(1) brightness(1.2);
}
.h08__brand--beanpole { height: 10px; }
.h08__brand--carhartt { height: 15px; }
.h08__brand--levis    { height: 18px; }
.h08__brand--dickies  { height: 24px; }
.h08__right {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.h08__status {
  font-family: monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #5bff5b;
}
.h08__right .material-symbols-outlined { font-size: 1.125rem; }

/* ════════════════════════════════
   H09 — Luxury Maison
   ════════════════════════════════ */
.h09 {
  text-align: center;
  padding: 2rem;
  color: #d4b976;
}
.h09__ornament {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
  font-size: 0.625rem;
  color: #d4b976;
}
.h09__ornament span {
  width: 3rem;
  height: 1px;
  background: #d4b976;
}
.h09__logo {
  font-family: "Cinzel", serif;
  font-size: 2.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1;
  margin-bottom: 0.625rem;
}
.h09__sub {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #c0a668;
  margin-bottom: 1.5rem;
}
.h09__nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.5rem;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(212, 185, 118, 0.3);
}
.h09__brand {
  width: auto;
  object-fit: contain;
  /* 골드 톤으로 변환 (검정 원본 → 골드) */
  filter: invert(85%) sepia(38%) saturate(480%) hue-rotate(0deg) brightness(86%) contrast(87%);
  opacity: 0.85;
  transition: opacity 0.2s;
}
.h09__brand:hover { opacity: 1; }
.h09__brand--beanpole { height: 11px; }
.h09__brand--carhartt { height: 17px; }
.h09__brand--levis    { height: 20px; }
.h09__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H10 — Eco Natural
   ════════════════════════════════ */
.h10 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  padding: 1.5rem 2.5rem;
  color: #3a2e1f;
  gap: 2rem;
}
.h10__badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: #3a2e1f;
  color: #f0e9dc;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.h10__badge .material-symbols-outlined { font-size: 0.9375rem; }
.h10__logo {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.h10__logo span {
  font-family: "Fraunces", serif;
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: -0.01em;
}
.h10__logo em {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 0.6875rem;
  color: #8b6a3a;
  margin-top: 0.125rem;
}
.h10__nav {
  display: flex;
  align-items: center;
  gap: 1.75rem;
}
.h10__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  transition: opacity 0.2s;
}
.h10__brand:hover { opacity: 1; }
.h10__brand--beanpole { height: 11px; }
.h10__brand--carhartt { height: 17px; }
.h10__brand--levis    { height: 20px; }
.h10__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H11 — Neo Brutalist
   ════════════════════════════════ */
.h11 {
  display: grid;
  grid-template-columns: auto repeat(4, 1fr) auto;
  border-bottom: 6px solid #000;
}
.h11__logo-cell {
  background: #000;
  color: #FFE500;
  padding: 1.25rem 1.75rem;
  font-family: "Archivo Black", sans-serif;
  font-size: 1.625rem;
  letter-spacing: -0.02em;
  border-right: 4px solid #000;
}
.h11__cell {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-right: 4px solid #000;
  background: #FFE500;
  cursor: pointer;
  transition: background 0.15s;
}
.h11__cell:hover { background: #fff; }
.h11__cell span {
  font-family: "Archivo Black", sans-serif;
  font-size: 0.6875rem;
  color: #000;
}
.h11__brand {
  width: auto;
  object-fit: contain;
}
.h11__brand--beanpole { height: 13px; }
.h11__brand--carhartt { height: 19px; }
.h11__brand--levis    { height: 22px; }
.h11__brand--dickies  { height: 28px; }
.h11__icon {
  background: #000;
  color: #FFE500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1.5rem;
}
.h11__icon .material-symbols-outlined { font-size: 1.25rem; }

/* ════════════════════════════════
   H12 — Glassmorphism
   ════════════════════════════════ */
.h12 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.25);
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
}
.h12__logo {
  font-family: "Italiana", serif;
  font-size: 1.875rem;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: #fff;
}
.h12__nav {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
.h12__brand {
  width: auto;
  object-fit: contain;
  filter: invert(1) brightness(1.1);
}
.h12__brand--beanpole { height: 12px; }
.h12__brand--carhartt { height: 18px; }
.h12__brand--levis    { height: 21px; }
.h12__brand--dickies  { height: 27px; }
.h12__actions {
  display: flex;
  gap: 1rem;
  color: #fff;
}
.h12__actions .material-symbols-outlined { font-size: 1.25rem; }

/* ════════════════════════════════
   H13 — Swiss Bauhaus
   ════════════════════════════════ */
.h13 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1.5rem;
  align-items: center;
  padding: 1.5rem 2rem;
  border-bottom: 3px solid #000;
  position: relative;
}
.h13__logo {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: -0.04em;
  color: #000;
  display: flex;
  align-items: flex-start;
  gap: 0.375rem;
}
.h13__logo span {
  font-size: 0.75rem;
  font-weight: 700;
  color: #E30613;
  padding-top: 0.25rem;
}
.h13__line {
  height: 3px;
  background: #000;
  position: relative;
}
.h13__line::before {
  content: "";
  position: absolute;
  left: 0;
  top: -6px;
  width: 2rem;
  height: 1rem;
  background: #E30613;
}
.h13__line::after {
  content: "";
  position: absolute;
  right: 0;
  top: -6px;
  width: 1.5rem;
  height: 1rem;
  background: #FCD900;
}
.h13__nav {
  display: flex;
  gap: 1.5rem;
  align-items: center;
}
.h13__nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.h13__num {
  font-family: "Helvetica Neue", sans-serif;
  font-size: 0.625rem;
  font-weight: 700;
  color: #005F9E;
}
.h13__brand {
  width: auto;
  object-fit: contain;
}
.h13__brand--beanpole { height: 12px; }
.h13__brand--carhartt { height: 18px; }
.h13__brand--levis    { height: 20px; }
.h13__brand--dickies  { height: 26px; }
.h13__corner {
  width: 1.5rem;
  height: 1.5rem;
  background: #005F9E;
}

/* ════════════════════════════════
   H14 — Dark Academia
   ════════════════════════════════ */
.h14 {
  text-align: center;
  padding: 2rem;
  color: #d4c4a8;
  border-top: 1px solid #8b6f47;
  border-bottom: 1px solid #8b6f47;
  position: relative;
}
.h14__latin {
  font-family: "Bodoni Moda", serif;
  font-style: italic;
  font-size: 0.75rem;
  letter-spacing: 0.3em;
  color: #8b6f47;
  margin-bottom: 0.875rem;
}
.h14__logo {
  font-family: "Bodoni Moda", serif;
  font-size: 2.5rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.h14__orn {
  color: #8b6f47;
  font-size: 1rem;
  margin-bottom: 1rem;
}
.h14__nav {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(139, 111, 71, 0.4);
}
.h14__nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.h14__nav-item span {
  font-family: "Bodoni Moda", serif;
  font-style: italic;
  font-size: 0.6875rem;
  color: #8b6f47;
  letter-spacing: 0.2em;
}
.h14__brand {
  width: auto;
  object-fit: contain;
  filter: sepia(0.5) brightness(1.3) contrast(0.85);
  opacity: 0.85;
}
.h14__brand--beanpole { height: 11px; }
.h14__brand--carhartt { height: 17px; }
.h14__brand--levis    { height: 20px; }
.h14__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H15 — Art Deco
   ════════════════════════════════ */
.h15 {
  text-align: center;
  padding: 2rem;
  color: #e8c96a;
  border-top: 2px solid #e8c96a;
  border-bottom: 2px solid #e8c96a;
}
.h15__ornament,
.h15__divider {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  font-size: 0.75rem;
  color: #e8c96a;
  margin-bottom: 0.875rem;
}
.h15__ornament span,
.h15__divider span {
  flex: none;
  width: 3rem;
  height: 1px;
  background: #e8c96a;
}
.h15__logo {
  font-family: "Cinzel", serif;
  font-size: 2.5rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  line-height: 1;
  margin-bottom: 0.5rem;
}
.h15__divider { margin-top: 0.5rem; margin-bottom: 1rem; }
.h15__nav {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  align-items: center;
  padding-top: 0.75rem;
}
.h15__brand {
  width: auto;
  object-fit: contain;
  filter: invert(85%) sepia(38%) saturate(480%) brightness(86%);
  opacity: 0.85;
}
.h15__brand--beanpole { height: 11px; }
.h15__brand--carhartt { height: 17px; }
.h15__brand--levis    { height: 20px; }
.h15__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H16 — Cyberpunk Neon
   ════════════════════════════════ */
.h16 {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem 2rem;
  background:
    linear-gradient(rgba(255,0,255,0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px);
  background-size: 30px 30px;
  border-top: 1px solid #ff00ff;
  border-bottom: 1px solid #00ffff;
}
.h16__code {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  color: #00ffcc;
  letter-spacing: 0.15em;
  border: 1px solid #00ffcc;
  padding: 0.375rem 0.5rem;
}
.h16__logo {
  font-family: "Space Mono", monospace;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: #fff;
  text-shadow: 0 0 12px #ff00ff, 0 0 24px rgba(255, 0, 255, 0.5);
  position: relative;
}
.h16__nav {
  display: flex;
  gap: 1.5rem;
  justify-content: flex-end;
  align-items: center;
}
.h16__nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.h16__nav span {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  color: #ff00ff;
}
.h16 img {
  width: auto;
  object-fit: contain;
  filter: invert(1) hue-rotate(180deg) saturate(1.5) brightness(1.3);
}
.h16__brand--beanpole { height: 11px; }
.h16__brand--carhartt { height: 17px; }
.h16__brand--levis    { height: 20px; }
.h16__brand--dickies  { height: 26px; }
.h16__status {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  color: #00ffcc;
  letter-spacing: 0.15em;
  padding: 0.375rem 0.625rem;
  border: 1px solid #00ffcc;
}

/* ════════════════════════════════
   H17 — Scandinavian
   ════════════════════════════════ */
.h17 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem 2.5rem;
  background: #fffaf0;
  border-radius: 20px;
  margin: 1.25rem 1.5rem;
  box-shadow: 0 6px 24px rgba(90, 70, 50, 0.08);
}
.h17__logo {
  font-family: "Fraunces", serif;
  font-size: 1.875rem;
  font-weight: 300;
  letter-spacing: -0.02em;
  color: #3a3530;
}
.h17__nav {
  display: flex;
  gap: 2.5rem;
  justify-content: center;
  align-items: center;
}
.h17__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.75;
  transition: opacity 0.2s;
}
.h17__nav a:hover .h17__brand { opacity: 1; }
.h17__brand--beanpole { height: 11px; }
.h17__brand--carhartt { height: 17px; }
.h17__brand--levis    { height: 20px; }
.h17__brand--dickies  { height: 26px; }
.h17__actions {
  display: flex;
  gap: 1rem;
  color: #3a3530;
}
.h17__actions .material-symbols-outlined {
  font-size: 1.25rem;
  font-variation-settings: "wght" 300;
}

/* ════════════════════════════════
   H18 — Vaporwave
   ════════════════════════════════ */
.h18 {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.5rem 2rem;
  border-top: 2px solid #00ffff;
  border-bottom: 2px solid #ff006e;
}
.h18__logo {
  font-family: "Space Mono", monospace;
  font-size: 1.375rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: #fff;
  text-shadow: 2px 2px 0 #ff006e, 4px 4px 0 #00ffff;
}
.h18__nav {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  align-items: center;
}
.h18__pill {
  display: inline-flex;
  align-items: center;
  padding: 0.5rem 0.875rem;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(6px);
  border: 1px solid #00ffff;
  cursor: pointer;
  transition: border-color 0.2s;
}
.h18__pill:hover { border-color: #fff; }
.h18__brand {
  width: auto;
  object-fit: contain;
  filter: invert(1) brightness(1.2) drop-shadow(1px 1px 0 #ff006e);
}
.h18__brand--beanpole { height: 10px; }
.h18__brand--carhartt { height: 15px; }
.h18__brand--levis    { height: 17px; }
.h18__brand--dickies  { height: 22px; }
.h18__jp {
  font-family: var(--font-headline);
  font-size: 1.25rem;
  color: #fff;
  text-shadow: 2px 2px 0 #ff006e;
  letter-spacing: 0.2em;
}

/* ════════════════════════════════
   H19 — Newspaper Classic
   ════════════════════════════════ */
.h19 {
  text-align: center;
  padding: 1rem 2rem 0.75rem;
  color: #1a1a1a;
  border-bottom: 4px double #1a1a1a;
}
.h19__meta {
  display: flex;
  justify-content: space-between;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding-bottom: 0.625rem;
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 1rem;
}
.h19__logo {
  font-family: "Bodoni Moda", serif;
  font-size: 2.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  font-style: italic;
  margin-bottom: 0.5rem;
}
.h19__tag {
  font-family: "Bodoni Moda", serif;
  font-style: italic;
  font-size: 0.875rem;
  color: #4a4a4a;
  margin-bottom: 1rem;
}
.h19__nav {
  display: flex;
  justify-content: center;
  gap: 2rem;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #1a1a1a;
}
.h19__nav a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
}
.h19__nav span {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #8b0000;
}
.h19__brand {
  width: auto;
  object-fit: contain;
  filter: grayscale(1) contrast(1.1);
}
.h19__brand--beanpole { height: 11px; }
.h19__brand--carhartt { height: 17px; }
.h19__brand--levis    { height: 20px; }
.h19__brand--dickies  { height: 26px; }

/* ════════════════════════════════
   H20 — Hand-drawn Craft
   ════════════════════════════════ */
.h20 {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem 2.5rem 1.5rem;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.3);
  margin: 1.5rem;
  transform: rotate(-0.3deg);
  box-shadow: 0 6px 24px rgba(74, 58, 40, 0.1);
}
.h20__tape {
  position: absolute;
  width: 4.5rem;
  height: 1rem;
  background: rgba(255, 213, 79, 0.55);
  border: 1px solid rgba(168, 140, 100, 0.2);
  top: -0.375rem;
}
.h20__tape--left { left: 2rem; transform: rotate(-5deg); }
.h20__tape--right { right: 2rem; transform: rotate(4deg); }
.h20__logo {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}
.h20__logo span {
  font-family: "Caveat", "Fraunces", cursive;
  font-style: italic;
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 1;
  color: #4a3a28;
}
.h20__logo em {
  font-family: "Fraunces", serif;
  font-style: italic;
  font-size: 0.75rem;
  color: #8b6a3a;
}
.h20__nav {
  display: flex;
  gap: 0.875rem;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
}
.h20__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.875rem;
  background: #fff0c0;
  border: 1.5px dashed #8b6a3a;
  cursor: pointer;
  transition: transform 0.2s;
}
.h20__chip:nth-child(even) { transform: rotate(1deg); }
.h20__chip:nth-child(odd) { transform: rotate(-1deg); }
.h20__chip:hover { transform: rotate(0) scale(1.03); }
.h20__chip-mark {
  font-size: 0.875rem;
  color: #a88c64;
}
.h20__brand {
  width: auto;
  object-fit: contain;
  filter: sepia(0.3) brightness(0.8);
}
.h20__brand--beanpole { height: 10px; }
.h20__brand--carhartt { height: 15px; }
.h20__brand--levis    { height: 18px; }
.h20__brand--dickies  { height: 23px; }

/* ════════════════════════════════
   H21 — Department Modern (LF몰)
   ════════════════════════════════ */
.h21 { color: #222; }
.h21__topbar {
  display: flex;
  gap: 0.625rem;
  padding: 0.625rem 2rem;
  background: #222;
  color: #ddd;
  font-size: 0.6875rem;
  align-items: center;
}
.h21__topbar-right { margin-left: auto; }
.h21__main {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid #eee;
}
.h21__logo {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.03em;
  color: #8b1a1a;
}
.h21__nav {
  display: flex;
  gap: 1.75rem;
  justify-content: center;
  align-items: center;
}
.h21__nav a {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.h21__nav-sale { color: #d32f2f !important; }
.h21__brand {
  width: auto;
  object-fit: contain;
}
.h21__brand--beanpole { height: 11px; }
.h21__brand--carhartt { height: 16px; }
.h21__brand--levis    { height: 19px; }
.h21__brand--dickies  { height: 25px; }
.h21__actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.h21__search {
  width: 12rem;
  padding: 0.5rem 0.875rem;
  border: 1px solid #ddd;
  border-radius: 999px;
  background: #f7f7f7;
  font-size: 0.75rem;
  outline: none;
}
.h21__ico { font-size: 1rem; position: relative; cursor: pointer; }
.h21__ico--cart em {
  position: absolute;
  top: -4px;
  right: -8px;
  background: #d32f2f;
  color: #fff;
  font-size: 0.5rem;
  font-weight: 700;
  font-style: normal;
  padding: 0.0625rem 0.3125rem;
  border-radius: 999px;
}

/* ════════════════════════════════
   H22 — Warm Editorial (Barbour·GANNI)
   ════════════════════════════════ */
.h22 {
  color: #2a241c;
  font-family: 'Fraunces', 'Noto Serif KR', serif;
}
.h22__top {
  text-align: center;
  padding: 0.5rem;
  background: #2a241c;
  color: #f4efe7;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
}
.h22__main {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.75rem 2.5rem;
}
.h22__nav-left,
.h22__nav-right {
  display: flex;
  gap: 1.5rem;
}
.h22__nav-right { justify-content: flex-end; }
.h22__main a {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #2a241c;
  cursor: pointer;
}
.h22__logo {
  font-family: 'Fraunces', serif;
  font-size: 2.25rem;
  font-weight: 400;
  font-style: italic;
  letter-spacing: -0.01em;
}
.h22__cats {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2.25rem;
  padding: 0.875rem 2.5rem;
  border-top: 1px solid rgba(212, 201, 181, 0.5);
  border-bottom: 1px solid rgba(212, 201, 181, 0.5);
}
.h22__cats a {
  font-family: 'Fraunces', serif;
  font-size: 0.875rem;
  color: #2a241c;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.h22__cats-sale {
  color: #8b2322 !important;
  font-style: italic;
}
.h22__brand {
  width: auto;
  object-fit: contain;
  filter: saturate(0.8);
}
.h22__brand--beanpole { height: 11px; }
.h22__brand--carhartt { height: 16px; }
.h22__brand--levis    { height: 19px; }
.h22__brand--dickies  { height: 25px; }

/* ════════════════════════════════
   H23 — Premium Showcase (에잇세컨즈)
   ════════════════════════════════ */
.h23 {
  color: #1a1a1a;
  font-family: 'Noto Sans KR', sans-serif;
}
.h23__util {
  display: flex;
  justify-content: flex-end;
  gap: 1.5rem;
  padding: 0.5rem 2rem;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.625rem;
  color: #666;
  letter-spacing: 0.1em;
}
.h23__util a { cursor: pointer; }
.h23__lang { margin-left: 1rem; padding-left: 1rem; border-left: 1px solid #ccc; }
.h23__logo-row { padding: 1.25rem; text-align: center; }
.h23__logo {
  font-size: 2.125rem;
  font-weight: 900;
  letter-spacing: 0.08em;
}
.h23__nav {
  display: flex;
  justify-content: center;
  gap: 2.25rem;
  padding: 0.75rem 2rem;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}
.h23__nav a {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  color: #1a1a1a;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.h23__nav-sale { color: #c62828 !important; }
.h23__brand {
  width: auto;
  object-fit: contain;
}
.h23__brand--beanpole { height: 11px; }
.h23__brand--carhartt { height: 16px; }
.h23__brand--levis    { height: 19px; }
.h23__brand--dickies  { height: 25px; }
.h23__icons {
  display: flex;
  justify-content: flex-end;
  gap: 1.25rem;
  padding: 0.625rem 2rem;
  font-size: 0.6875rem;
  color: #666;
}
.h23__icons span { cursor: pointer; }

/* ════════════════════════════════
   H24 — Practical Grid (29CM)
   ════════════════════════════════ */
.h24 {
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  gap: 2rem;
  align-items: center;
  padding: 1.125rem 2rem;
  background: #fff;
  border-bottom: 1px solid #eee;
  font-family: 'Noto Sans KR', sans-serif;
}
.h24__logo {
  font-size: 1.625rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #1a1a1a;
}
.h24__nav { display: flex; gap: 1.75rem; }
.h24__nav a {
  font-size: 0.875rem;
  font-weight: 500;
  color: #333;
  padding: 0.375rem 0;
  border-bottom: 2px solid transparent;
  cursor: pointer;
}
.h24__nav-active {
  color: #1a1a1a !important;
  font-weight: 700 !important;
  border-bottom-color: #1a1a1a !important;
}
.h24__brandrow {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  padding-left: 1.5rem;
  border-left: 1px solid #eee;
}
.h24__brand {
  width: auto;
  object-fit: contain;
  opacity: 0.8;
  cursor: pointer;
}
.h24__brand--beanpole { height: 10px; }
.h24__brand--carhartt { height: 14px; }
.h24__brand--levis    { height: 17px; }
.h24__brand--dickies  { height: 22px; }
.h24__right {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}
.h24__search {
  width: 13rem;
  padding: 0.5rem 0.875rem;
  background: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 0.75rem;
  outline: none;
}
.h24__right a {
  font-size: 0.75rem;
  color: #666;
  cursor: pointer;
}

/* ════════════════════════════════
   H25 — Classic Serif Catalog (현대H몰)
   ════════════════════════════════ */
.h25 {
  color: #2a241c;
  font-family: 'Noto Serif KR', 'Bodoni Moda', serif;
  text-align: center;
}
.h25__promo {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 0.625rem;
  background: #2a241c;
  color: #f8f4eb;
  font-size: 0.6875rem;
  letter-spacing: 0.05em;
  font-family: 'Noto Sans KR', sans-serif;
}
.h25__brand { padding: 1.5rem 2rem 0.5rem; }
.h25__logo {
  font-size: 2.75rem;
  font-weight: 400;
  letter-spacing: 0.08em;
  line-height: 1;
  margin-bottom: 0.375rem;
}
.h25__sub {
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.625rem;
  font-style: italic;
  letter-spacing: 0.25em;
  color: #8b7340;
}
.h25__nav {
  display: flex;
  justify-content: center;
  gap: 2.25rem;
  align-items: center;
  padding: 1rem;
  border-top: 1px solid rgba(42, 36, 28, 0.25);
  border-bottom: 1px solid rgba(42, 36, 28, 0.25);
}
.h25__nav a {
  font-size: 0.875rem;
  color: #2a241c;
  cursor: pointer;
  display: flex;
  align-items: center;
}
.h25__nav-sale {
  color: #8b2322 !important;
  font-style: italic;
}
.h25__brand-logo {
  width: auto;
  object-fit: contain;
}
.h25__brand-logo--beanpole { height: 11px; }
.h25__brand-logo--carhartt { height: 16px; }
.h25__brand-logo--levis    { height: 19px; }
.h25__brand-logo--dickies  { height: 25px; }
.h25__util {
  display: flex;
  justify-content: center;
  gap: 1.75rem;
  padding: 0.625rem;
  font-family: 'Noto Sans KR', sans-serif;
  font-size: 0.6875rem;
  color: #666;
}
.h25__util span { cursor: pointer; }

/* ════ H26 Kinfolk ════ */
.h26 { display: grid; grid-template-columns: auto auto 1fr auto; gap: 2rem; align-items: center; padding: 1.5rem 2.5rem; color: #3a3530; font-family: 'Fraunces', serif; }
.h26__logo { font-size: 1.75rem; font-weight: 300; font-style: italic; }
.h26__nav { display: flex; gap: 1.75rem; }
.h26__nav a { font-family: 'Noto Sans KR', sans-serif; font-size: 0.8125rem; color: #3a3530; cursor: pointer; }
.h26__brands { display: flex; gap: 2rem; align-items: center; justify-content: center; padding-left: 2rem; border-left: 1px solid #e8e0d0; }
.h26__b { width: auto; object-fit: contain; opacity: 0.75; }
.h26__b--beanpole { height: 11px; } .h26__b--carhartt { height: 16px; } .h26__b--levis { height: 19px; } .h26__b--dickies { height: 25px; }
.h26__right { display: flex; gap: 1.5rem; justify-content: flex-end; }
.h26__right a { font-family: 'Noto Sans KR', sans-serif; font-size: 0.8125rem; color: #3a3530; cursor: pointer; }

/* ════ H27 Naver Shopping ════ */
.h27 { color: #222; font-family: 'Noto Sans KR', sans-serif; }
.h27__top { display: flex; justify-content: flex-end; gap: 1.25rem; padding: 0.5rem 2rem; background: #fafafa; font-size: 0.6875rem; color: #666; border-bottom: 1px solid #eee; }
.h27__top a { cursor: pointer; }
.h27__main { display: grid; grid-template-columns: auto 1fr auto; gap: 1.5rem; align-items: center; padding: 0.875rem 2rem; }
.h27__logo { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.03em; }
.h27__f { color: #03C75A; }
.h27__search { display: flex; border: 2px solid #03C75A; border-radius: 6px; overflow: hidden; max-width: 28rem; }
.h27__search input { flex: 1; border: none; padding: 0.625rem 0.875rem; font-size: 0.8125rem; outline: none; }
.h27__search button { background: #03C75A; color: #fff; border: none; padding: 0 1rem; cursor: pointer; font-size: 1rem; }
.h27__badges { display: flex; gap: 0.5rem; }
.h27__badge { padding: 0.3125rem 0.5rem; border-radius: 4px; font-size: 0.625rem; font-weight: 700; }
.h27__badge--green { background: #E8F5E9; color: #2E7D32; }
.h27__badge--red { background: #FFEBEE; color: #C62828; }
.h27__nav { display: flex; gap: 0; padding: 0 2rem; border-top: 1px solid #eee; border-bottom: 1px solid #eee; align-items: center; }
.h27__nav a { padding: 0.75rem 1rem; font-size: 0.8125rem; font-weight: 500; color: #333; cursor: pointer; display: flex; align-items: center; }
.h27__nav-hot { color: #C62828 !important; font-weight: 700 !important; }
.h27__nav-sale { color: #C62828 !important; }
.h27__b { width: auto; object-fit: contain; }
.h27__b--beanpole { height: 10px; } .h27__b--carhartt { height: 15px; } .h27__b--levis { height: 18px; } .h27__b--dickies { height: 23px; }

/* ════ H28 Film Grain ════ */
.h28 { display: grid; grid-template-columns: auto auto 1fr auto; gap: 2rem; align-items: center; padding: 1.25rem 2rem; color: #e8dcc8; font-family: 'Courier New', monospace; border-bottom: 1px solid #3a3428; }
.h28__date { font-size: 0.6875rem; letter-spacing: 0.2em; color: #8a7d68; }
.h28__logo { font-size: 1.375rem; font-weight: 700; letter-spacing: 0.1em; }
.h28__brands { display: flex; gap: 2rem; align-items: center; justify-content: center; }
.h28__b { width: auto; object-fit: contain; filter: sepia(0.4) brightness(1.2); opacity: 0.8; }
.h28__b--beanpole { height: 10px; } .h28__b--carhartt { height: 15px; } .h28__b--levis { height: 18px; } .h28__b--dickies { height: 23px; }
.h28__film { font-size: 0.6875rem; letter-spacing: 0.2em; color: #8a7d68; }

/* ════ H29 Korean Hanbok ════ */
.h29 { display: grid; grid-template-columns: auto auto 1fr auto; gap: 1.5rem; align-items: center; padding: 1.5rem 2.5rem; color: #2a1f14; font-family: 'Noto Serif KR', serif; border-bottom: 1px solid #c9b99a; }
.h29__hanja { font-size: 2rem; font-weight: 300; color: #8b2322; }
.h29__logo { font-size: 1.375rem; font-weight: 400; letter-spacing: 0.15em; }
.h29__brands { display: flex; gap: 2rem; align-items: center; justify-content: center; }
.h29__b { width: auto; object-fit: contain; filter: sepia(0.15); opacity: 0.85; }
.h29__b--beanpole { height: 10px; } .h29__b--carhartt { height: 15px; } .h29__b--levis { height: 18px; } .h29__b--dickies { height: 23px; }
.h29__sub { font-size: 0.6875rem; letter-spacing: 0.1em; color: #8a7050; }

/* ════ H30 Sportswear ════ */
.h30 { display: grid; grid-template-columns: auto 1fr auto; gap: 2rem; align-items: center; padding: 1.25rem 2rem; background: #111; color: #f5f5f5; border-bottom: 1px solid #222; font-family: 'Noto Sans KR', sans-serif; }
.h30__logo { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.03em; }
.h30__logo span { font-weight: 400; font-size: 0.6875rem; letter-spacing: 0.15em; color: #FF4444; margin-left: 0.5rem; vertical-align: super; }
.h30__nav { display: flex; gap: 2rem; justify-content: center; align-items: center; }
.h30__b { width: auto; object-fit: contain; filter: invert(1) brightness(1.1); opacity: 0.8; }
.h30__b:hover { opacity: 1; }
.h30__b--beanpole { height: 11px; } .h30__b--carhartt { height: 16px; } .h30__b--levis { height: 19px; } .h30__b--dickies { height: 25px; }
.h30__right { display: flex; gap: 1rem; justify-content: flex-end; font-size: 1.125rem; }
.h30__right a { cursor: pointer; }

/* 하단 네비 */
.hp-bottomnav {
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
.hp-bottomnav__link { color: #bbb; transition: color 0.2s; }
.hp-bottomnav__link:hover { color: #fff; }
</style>
