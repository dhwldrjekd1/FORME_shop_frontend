<template>
  <main class="f31">
    <!-- ═══ 헤더 (01 기반) ═══ -->
    <header class="f31-topbar">
      <div class="f31-topbar__main">
        <div class="f31-topbar__left">
          <RouterLink to="/forme" class="f31-topbar__link">◁ PICKER</RouterLink>
        </div>
        <div class="f31-topbar__logo">FORME</div>
        <div class="f31-topbar__right">
          <span class="f31-topbar__icon">🔍</span>
          <span class="f31-topbar__icon">♡</span>
          <span class="f31-topbar__icon">👤</span>
          <span class="f31-topbar__icon f31-topbar__icon--cart">🛒<em>2</em></span>
          <RouterLink to="/" class="f31-topbar__link">HOME ▷</RouterLink>
        </div>
      </div>
      <nav class="f31-catnav">
        <a class="f31-catnav__link f31-catnav__link--active">ALL</a>
        <a class="f31-catnav__link">NEW</a>
        <a class="f31-catnav__link">BEST</a>
        <RouterLink to="/beanpole" class="f31-catnav__link">BEANPOLE</RouterLink>
        <RouterLink to="/carhartt" class="f31-catnav__link">CARHARTT</RouterLink>
        <RouterLink to="/levis" class="f31-catnav__link">LEVI'S</RouterLink>
        <RouterLink to="/dickies" class="f31-catnav__link">DICKIES</RouterLink>
        <a class="f31-catnav__link f31-catnav__link--sale">SALE</a>
      </nav>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f31-hero">
      <img
        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&q=80"
        alt="hero"
        class="f31-hero__bg"
      />
      <div class="f31-hero__overlay"></div>
      <div class="f31-hero__content">
        <p class="f31-hero__tag">2026 SPRING COLLECTION</p>
        <h1 class="f31-hero__title">NEW SEASON,<br />NEW <span>FORME</span>.</h1>
        <p class="f31-hero__desc">네 개의 헤리티지 브랜드로 완성하는 올봄의 옷장.</p>
        <div class="f31-hero__cta-group">
          <RouterLink to="/products" class="f31-hero__cta">SHOP NOW</RouterLink>
          <RouterLink to="/signup" class="f31-hero__cta f31-hero__cta--outline">JOIN</RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Quick Bar (01 기반) ═══ -->
    <nav class="f31-quickbar">
      <a v-for="cat in quickCats" :key="cat.name" class="f31-quickbar__item">
        <span class="f31-quickbar__icon">{{ cat.icon }}</span>
        <span>{{ cat.name }}</span>
      </a>
    </nav>

    <!-- ═══ OUR TEAM (30 기반) ═══ -->
    <section class="f31-team">
      <header class="f31-sec-head">
        <div>
          <p class="f31-sec-head__code">BRAND</p>
          <h2 class="f31-sec-head__title">OUR TEAM</h2>
        </div>
        <RouterLink to="/products" class="f31-sec-head__more">전체보기 →</RouterLink>
      </header>
      <div class="f31-team__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f31-brand"
        >
          <div class="f31-brand__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f31-brand__hover"><span>VIEW MORE →</span></div>
            <div class="f31-brand__number">0{{ i + 1 }}</div>
          </div>
          <div class="f31-brand__stripe" :style="{ backgroundColor: b.color }"></div>
          <div class="f31-brand__info">
            <div class="f31-brand__top">
              <h3>{{ b.name }}</h3>
              <span class="f31-brand__year">{{ b.year }}</span>
            </div>
            <p class="f31-brand__desc">{{ b.desc }}</p>
            <div class="f31-brand__meta">
              <span>{{ b.items }} items</span>
              <span>★ {{ b.rating }}</span>
              <span>{{ b.city }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Brand Promotion (02 기반) ═══ -->
    <section class="f31-promo">
      <header class="f31-sec-head">
        <div>
          <p class="f31-sec-head__code">PROMOTION</p>
          <h2 class="f31-sec-head__title">BRAND PROMOTION</h2>
        </div>
      </header>
      <div class="f31-promo__grid">
        <RouterLink
          v-for="b in promoPanels"
          :key="b.id"
          :to="b.route"
          class="f31-promo-card"
          :style="{ backgroundColor: b.bgColor }"
        >
          <div class="f31-promo-card__text">
            <p class="f31-promo-card__tag" :style="{ color: b.accentColor }">{{ b.tag }}</p>
            <h3>{{ b.title }}</h3>
            <p class="f31-promo-card__desc">{{ b.desc }}</p>
            <span class="f31-promo-card__cta">SHOP NOW →</span>
          </div>
          <div class="f31-promo-card__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Curator's Pick (03 기반 — 다크) ═══ -->
    <section class="f31-curator">
      <div class="f31-curator__inner">
        <div class="f31-curator__text">
          <p class="f31-curator__eyebrow">CURATOR'S PICK</p>
          <h2 class="f31-curator__title">이번 주<br /><em>큐레이터의 선택</em></h2>
          <p class="f31-curator__desc">
            FORME 큐레이터가 직접 입어보고 선별한 이번 주의 셀렉션.
            소재의 결, 봉제의 정성, 시간의 무게를 견디는 디자인을 우선합니다.
          </p>
          <RouterLink to="/products" class="f31-curator__link">전체 셀렉션 보기 →</RouterLink>
        </div>
        <div class="f31-curator__products">
          <RouterLink
            v-for="(p, i) in curatorPicks"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="f31-pick"
          >
            <div class="f31-pick__img-wrap">
              <img :src="p.img" :alt="p.name" />
            </div>
            <div class="f31-pick__info">
              <span class="f31-pick__no">No. 0{{ i + 1 }}</span>
              <h3>{{ p.name }}</h3>
              <p class="f31-pick__brand">{{ p.brand }}</p>
              <p class="f31-pick__price">₩ {{ p.price }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Banner ═══ -->
    <section class="f31-banner">
      <div class="f31-banner__inner">
        <p class="f31-banner__tag">EXCLUSIVE</p>
        <h2 class="f31-banner__title">MEMBER WEEK</h2>
        <p class="f31-banner__desc">회원 전용 시크릿 세일이 시작됩니다.</p>
        <RouterLink to="/login" class="f31-banner__cta">JOIN NOW</RouterLink>
      </div>
    </section>

    <!-- ═══ Stories of Heritage (03 기반) ═══ -->
    <section class="f31-stories">
      <header class="f31-sec-head f31-sec-head--center">
        <p class="f31-sec-head__code">EDITORIAL</p>
        <h2 class="f31-sec-head__title">Stories of Heritage</h2>
      </header>
      <div class="f31-stories__grid">
        <article v-for="e in stories" :key="e.title" class="f31-story">
          <div class="f31-story__img-wrap">
            <img :src="e.img" :alt="e.title" />
          </div>
          <div class="f31-story__info">
            <p class="f31-story__cat">{{ e.cat }}</p>
            <h3>{{ e.title }}</h3>
            <p class="f31-story__excerpt">{{ e.excerpt }}</p>
            <a class="f31-story__link">Read more →</a>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Editorial 매거진 (01 기반) ═══ -->
    <section class="f31-editorial">
      <header class="f31-sec-head">
        <div>
          <p class="f31-sec-head__code">MAGAZINE</p>
          <h2 class="f31-sec-head__title">매거진</h2>
        </div>
      </header>
      <div class="f31-editorial__grid">
        <article v-for="m in magazine" :key="m.title" class="f31-mag" :class="{ 'f31-mag--lg': m.lg }">
          <img :src="m.img" :alt="m.title" />
          <div class="f31-mag__text">
            <p class="f31-mag__cat">{{ m.cat }}</p>
            <h3>{{ m.title }}</h3>
            <p v-if="m.excerpt" class="f31-mag__excerpt">{{ m.excerpt }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f31-newsletter">
      <div class="f31-newsletter__inner">
        <h2>Stay in the loop.</h2>
        <p>신상품과 멤버 전용 혜택을 가장 먼저 받아보세요.</p>
        <div class="f31-newsletter__form">
          <input type="email" placeholder="이메일 주소" />
          <button>구독</button>
        </div>
      </div>
    </section>

    <!-- ═══ 푸터 (01 기반) ═══ -->
    <footer class="f31-foot">
      <div class="f31-foot__top">
        <div class="f31-foot__brand">
          <h3 class="f31-foot__logo">FORME</h3>
          <p class="f31-foot__slogan">The Best of Everything.</p>
          <div class="f31-foot__social">
            <a>IG</a><a>YT</a><a>TW</a>
          </div>
        </div>
        <div class="f31-foot__grid">
          <div class="f31-foot__col">
            <h4>SHOP</h4>
            <a>ALL</a><a>NEW</a><a>BEST</a>
            <RouterLink to="/beanpole">BEANPOLE</RouterLink>
            <RouterLink to="/carhartt">CARHARTT</RouterLink>
            <RouterLink to="/levis">LEVI'S</RouterLink>
            <RouterLink to="/dickies">DICKIES</RouterLink>
          </div>
          <div class="f31-foot__col">
            <h4>SERVICE</h4>
            <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a>
          </div>
          <div class="f31-foot__col">
            <h4>SUPPORT</h4>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">Q&A</RouterLink>
            <a>고객센터 1588-0000</a>
          </div>
          <div class="f31-foot__col">
            <h4>ABOUT</h4>
            <a>브랜드 스토리</a><a>입점 문의</a><a>채용</a>
          </div>
        </div>
      </div>
      <div class="f31-foot__bottom">
        <p>(주)FORME | 대표 김보경 | 사업자등록번호 000-00-00000</p>
        <p>서울특별시 강남구 테헤란로 000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const quickCats = [
  { name: "전체",  icon: "🏠" },
  { name: "신상",  icon: "🆕" },
  { name: "상의",  icon: "👕" },
  { name: "하의",  icon: "👖" },
  { name: "데님",  icon: "🧵" },
  { name: "FAQ",   icon: "❓" },
  { name: "Q&A",   icon: "💬" },
];

const brands = [
  { id: 1, name: "BEANPOLE", year: "1989", city: "Seoul",         desc: "한국 클래식의 정수",       color: "#103728", items: 142, rating: 4.7, route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", year: "1889", city: "Detroit",       desc: "디트로이트 워크웨어",      color: "#9C4F18", items: 98,  rating: 4.8, route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   year: "1873", city: "San Francisco", desc: "150년 데님 헤리티지",      color: "#8E1C28", items: 215, rating: 4.9, route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  year: "1922", city: "Fort Worth",    desc: "한 세기 워크웨어",         color: "#1A1A1A", items: 87,  rating: 4.6, route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const promoPanels = [
  { id: 1, title: "BEANPOLE", tag: "HERITAGE",   desc: "1989년 서울, 한국 클래식의 정수",       route: "/beanpole", bgColor: "#103728", accentColor: "#C9A86B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   tag: "DENIM ICON", desc: "1873년부터 이어진 데님의 역사",         route: "/levis",    bgColor: "#8E1C28", accentColor: "#FFD0D0", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  tag: "WORK WEAR",  desc: "100년 워크웨어의 산증인",                route: "/dickies",  bgColor: "#1A1A1A", accentColor: "#FFC72C", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", tag: "RUGGED",     desc: "디트로이트에서 시작된 워크 클래식",     route: "/carhartt", bgColor: "#9C4F18", accentColor: "#FFC72C", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];

const curatorPicks = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",     price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진",  price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",    price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠",  price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const stories = [
  { cat: "— ARCHIVE",     title: "워크웨어, 노동의 미학",     excerpt: "한 세기를 견뎌온 소재와 봉제. 시간이 만든 단단한 정직함.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "— STYLE",       title: "2026, 절제의 봄",           excerpt: "덜어낼수록 깊어지는 봄의 옷장.",                           img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { cat: "— BRAND STORY", title: "데님, 150년의 푸른 역사",   excerpt: "광부의 옷에서 세기의 클래식이 되기까지.",                   img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
];

const magazine = [
  { cat: "STYLE GUIDE", title: "봄을 입는 가장 쉬운 방법",   excerpt: "칼하트 워크웨어부터 빈폴 클래식까지.", lg: true,  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "LOOKBOOK",    title: "2026 SS Collection",         excerpt: null,                                   lg: false, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { cat: "BRAND STORY", title: "워크웨어의 정직함",           excerpt: null,                                   lg: false, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 31 — Best-of Mashup
   01 헤더/퀵바/매거진/푸터 + 02 브랜드프로모 + 03 큐레이터/스토리 + 30 팀
   ════════════════════════════════ */
.f31 {
  background: #fff;
  color: #111;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* ── 헤더 (01) ── */
.f31-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(255,255,255,0.96);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #eee;
}
.f31-topbar__main {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0.875rem 2rem;
}
.f31-topbar__left, .f31-topbar__right {
  display: flex; align-items: center; gap: 0.875rem;
  font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #999;
}
.f31-topbar__right { justify-content: flex-end; }
.f31-topbar__link { color: #999; transition: color 0.2s; }
.f31-topbar__link:hover { color: #FF2D2D; }
.f31-topbar__logo { font-size: 1.625rem; font-weight: 900; letter-spacing: -0.03em; text-align: center; }
.f31-topbar__icon { font-size: 1.125rem; cursor: pointer; position: relative; }
.f31-topbar__icon--cart em {
  position: absolute; top: -6px; right: -8px;
  background: #FF2D2D; color: #fff; font-size: 0.5rem; font-weight: 800; font-style: normal;
  padding: 0.0625rem 0.3125rem; border-radius: 999px;
}
.f31-catnav {
  display: flex; justify-content: center; gap: 0; border-top: 1px solid #eee;
}
.f31-catnav__link {
  padding: 0.875rem 1.5rem; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.05em;
  color: #333; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s;
}
.f31-catnav__link:hover { border-bottom-color: #111; }
.f31-catnav__link--active { color: #111; border-bottom-color: #111; }
.f31-catnav__link--sale { color: #FF2D2D; }

/* ── Hero ── */
.f31-hero { position: relative; height: calc(100dvh - 92px); overflow: hidden; }
.f31-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.f31-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%); }
.f31-hero__content { position: relative; z-index: 2; padding: 0 0 6rem 5rem; color: #fff; max-width: 40rem; display: flex; flex-direction: column; justify-content: flex-end; min-height: 100%; }
.f31-hero__tag { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 1.5rem; }
.f31-hero__title { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.5rem; }
.f31-hero__title span { color: #FF2D2D; }
.f31-hero__desc { font-size: 1rem; opacity: 0.85; margin-bottom: 2.5rem; }
.f31-hero__cta-group { display: flex; gap: 0.75rem; }
.f31-hero__cta { display: inline-block; background: #fff; color: #111; padding: 1.125rem 2.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; transition: all 0.25s; }
.f31-hero__cta:hover { background: #FF2D2D; color: #fff; }
.f31-hero__cta--outline { background: transparent; border: 1px solid rgba(255,255,255,0.5); color: #fff; }
.f31-hero__cta--outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

/* ── Quick Bar (01) ── */
.f31-quickbar { display: flex; justify-content: center; gap: 3rem; padding: 2rem; border-bottom: 1px solid #eee; flex-wrap: wrap; }
.f31-quickbar__item { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 600; color: #111; cursor: pointer; transition: color 0.2s; }
.f31-quickbar__item:hover { color: #FF2D2D; }
.f31-quickbar__icon { font-size: 1.5rem; }

/* ── Section Head ── */
.f31-sec-head { display: flex; justify-content: space-between; align-items: flex-end; padding: 5rem 3rem 2.5rem; max-width: 1600px; margin: 0 auto; flex-wrap: wrap; gap: 1.5rem; }
.f31-sec-head--center { justify-content: center; text-align: center; flex-direction: column; align-items: center; }
.f31-sec-head__code { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.5rem; }
.f31-sec-head__title { font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 900; letter-spacing: -0.02em; }
.f31-sec-head__more { font-size: 0.75rem; font-weight: 700; color: #111; border-bottom: 1px solid #111; padding-bottom: 3px; }

/* ── OUR TEAM (30) ── */
.f31-team { border-top: 1px solid #f0f0f0; padding-bottom: 5rem; }
.f31-team__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f31-brand { position: relative; overflow: hidden; color: inherit; border: 1px solid #eee; margin: -0.5px; transition: border-color 0.3s; }
.f31-brand:hover { border-color: #FF2D2D; }
.f31-brand__img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.f31-brand__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5); transition: filter 0.6s, transform 0.6s; }
.f31-brand:hover .f31-brand__img-wrap img { filter: grayscale(0); transform: scale(1.04); }
.f31-brand__hover { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.65); opacity: 0; transition: opacity 0.3s; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; color: #fff; }
.f31-brand:hover .f31-brand__hover { opacity: 1; }
.f31-brand__number { position: absolute; top: 1rem; left: 1rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); padding: 0.375rem 0.625rem; font-size: 1rem; font-weight: 900; color: #FF2D2D; }
.f31-brand__stripe { height: 6px; }
.f31-brand__info { padding: 1.5rem; }
.f31-brand__top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem; }
.f31-brand__top h3 { font-size: 1.25rem; font-weight: 900; }
.f31-brand__year { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #999; }
.f31-brand__desc { font-size: 0.8125rem; color: #999; line-height: 1.5; margin-bottom: 1rem; }
.f31-brand__meta { display: flex; gap: 1rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; }

/* ── Brand Promotion (02) ── */
.f31-promo { padding: 0 3rem 5rem; border-top: 1px solid #f0f0f0; }
.f31-promo__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 1600px; margin: 0 auto; }
.f31-promo-card { display: grid; grid-template-columns: 1fr 1fr; border-radius: 8px; overflow: hidden; color: #fff; cursor: pointer; transition: transform 0.3s; min-height: 260px; }
.f31-promo-card:hover { transform: translateY(-4px); }
.f31-promo-card__text { padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; }
.f31-promo-card__tag { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.2em; margin-bottom: 0.75rem; }
.f31-promo-card__text h3 { font-size: 1.875rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.625rem; }
.f31-promo-card__desc { font-size: 0.8125rem; opacity: 0.85; margin-bottom: 1.5rem; line-height: 1.5; }
.f31-promo-card__cta { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.2em; }
.f31-promo-card__img-wrap { overflow: hidden; }
.f31-promo-card__img-wrap img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.f31-promo-card:hover .f31-promo-card__img-wrap img { transform: scale(1.06); }

/* ── Curator's Pick (03 — 다크) ── */
.f31-curator { padding: 8rem 0; background: #1a1a1a; color: #faf8f4; }
.f31-curator__inner { display: grid; grid-template-columns: 1fr 1.8fr; gap: 4rem; max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
.f31-curator__text { display: flex; flex-direction: column; justify-content: center; }
.f31-curator__eyebrow { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.3em; color: #c9a86b; margin-bottom: 1.25rem; }
.f31-curator__title { font-family: var(--font-headline); font-size: clamp(2.25rem, 4vw, 3.25rem); font-weight: 300; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1.75rem; }
.f31-curator__title em { font-style: italic; color: #c9a86b; }
.f31-curator__desc { font-size: 0.9375rem; line-height: 1.85; opacity: 0.7; max-width: 26rem; margin-bottom: 2rem; }
.f31-curator__link { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a86b; border-bottom: 0.5px solid #c9a86b; padding-bottom: 4px; width: fit-content; }
.f31-curator__products { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.f31-pick { color: inherit; cursor: pointer; }
.f31-pick__img-wrap { aspect-ratio: 3/4; overflow: hidden; background: #2a2a2a; margin-bottom: 1rem; }
.f31-pick__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.4); transition: transform 0.7s, filter 0.5s; }
.f31-pick:hover .f31-pick__img-wrap img { transform: scale(1.04); filter: grayscale(0); }
.f31-pick__no { font-size: 0.625rem; letter-spacing: 0.25em; color: #c9a86b; display: block; margin-bottom: 0.5rem; }
.f31-pick__info h3 { font-family: var(--font-headline); font-size: 0.9375rem; font-weight: 400; margin-bottom: 0.375rem; line-height: 1.4; }
.f31-pick__brand { font-size: 0.625rem; letter-spacing: 0.15em; color: #c9a86b; margin-bottom: 0.5rem; }
.f31-pick__price { font-size: 0.8125rem; font-weight: 500; opacity: 0.8; }

/* ── Banner ── */
.f31-banner { background: #111; color: #fff; padding: 5rem 2rem; text-align: center; }
.f31-banner__inner { max-width: 36rem; margin: 0 auto; }
.f31-banner__tag { font-size: 0.75rem; font-weight: 800; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 1rem; }
.f31-banner__title { font-size: clamp(2.5rem, 5vw, 3.75rem); font-weight: 900; letter-spacing: -0.03em; margin-bottom: 1rem; }
.f31-banner__desc { font-size: 0.9375rem; opacity: 0.7; margin-bottom: 2rem; }
.f31-banner__cta { display: inline-block; background: #FF2D2D; color: #fff; padding: 1.125rem 3rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; }

/* ── Stories of Heritage (03) ── */
.f31-stories { padding: 0 3rem 6rem; border-top: 1px solid #f0f0f0; }
.f31-stories__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; max-width: 1600px; margin: 0 auto; }
.f31-story { cursor: pointer; color: inherit; }
.f31-story__img-wrap { aspect-ratio: 4/5; overflow: hidden; margin-bottom: 1.5rem; }
.f31-story__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.3); transition: filter 0.5s, transform 0.5s; }
.f31-story:hover .f31-story__img-wrap img { filter: grayscale(0); transform: scale(1.03); }
.f31-story__cat { font-size: 0.625rem; font-weight: 500; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 0.875rem; }
.f31-story h3 { font-family: var(--font-headline); font-size: 1.375rem; font-weight: 400; letter-spacing: -0.01em; line-height: 1.3; margin-bottom: 0.875rem; }
.f31-story__excerpt { font-size: 0.875rem; color: #666; line-height: 1.7; margin-bottom: 1rem; }
.f31-story__link { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.15em; color: #111; border-bottom: 1px solid #111; padding-bottom: 3px; cursor: pointer; }

/* ── Editorial 매거진 (01) ── */
.f31-editorial { border-top: 1px solid #f0f0f0; padding-bottom: 6rem; }
.f31-editorial__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f31-mag { position: relative; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
.f31-mag--lg { grid-row: span 1; aspect-ratio: auto; }
.f31-mag img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
.f31-mag:hover img { transform: scale(1.05); }
.f31-mag__text { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); color: #fff; }
.f31-mag__cat { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.5rem; }
.f31-mag__text h3 { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.01em; margin-bottom: 0.5rem; }
.f31-mag__excerpt { font-size: 0.8125rem; opacity: 0.8; line-height: 1.5; }

/* ── Newsletter ── */
.f31-newsletter { padding: 5rem 3rem; background: #f5f5f5; text-align: center; border-top: 1px solid #eee; }
.f31-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f31-newsletter h2 { font-size: 2rem; font-weight: 900; margin-bottom: 0.75rem; }
.f31-newsletter p { font-size: 0.875rem; color: #888; margin-bottom: 2rem; }
.f31-newsletter__form { display: flex; border: 1px solid #111; }
.f31-newsletter__form input { flex: 1; border: none; padding: 1rem 1.25rem; font-size: 0.8125rem; outline: none; background: #fff; }
.f31-newsletter__form button { background: #111; color: #fff; border: none; padding: 0 2rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em; cursor: pointer; transition: background 0.2s; }
.f31-newsletter__form button:hover { background: #FF2D2D; }

/* ── Footer (01) ── */
.f31-foot { background: #111; color: #f5f5f5; padding: 5rem 3rem 2rem; }
.f31-foot__top { display: grid; grid-template-columns: 1.5fr 3fr; gap: 4rem; max-width: 1600px; margin: 0 auto 3rem; padding-bottom: 3rem; border-bottom: 1px solid #333; }
.f31-foot__logo { font-size: 2.25rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
.f31-foot__slogan { font-size: 0.75rem; color: #888; margin-bottom: 1.5rem; }
.f31-foot__social { display: flex; gap: 0.5rem; }
.f31-foot__social a { width: 2.25rem; height: 2.25rem; border: 1px solid #444; display: flex; align-items: center; justify-content: center; font-size: 0.6875rem; font-weight: 700; color: #999; cursor: pointer; transition: all 0.2s; }
.f31-foot__social a:hover { border-color: #FF2D2D; color: #FF2D2D; }
.f31-foot__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.f31-foot__col h4 { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 1rem; color: #FF2D2D; }
.f31-foot__col a { display: block; font-size: 0.6875rem; color: #ccc; margin-bottom: 0.5rem; cursor: pointer; transition: color 0.2s; }
.f31-foot__col a:hover { color: #fff; }
.f31-foot__bottom { max-width: 1600px; margin: 0 auto; font-size: 0.5625rem; color: #666; line-height: 1.8; text-align: center; }
</style>
