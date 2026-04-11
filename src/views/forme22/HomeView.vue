<template>
  <main class="page-wrapper f22">
    <header class="f22-head">
      <div class="f22-head__top">
        <span>FREE SHIPPING ON ALL ORDERS</span>
      </div>
      <div class="f22-head__main">
        <nav class="f22-head__nav f22-head__nav--left">
          <a>SHOP</a><a>JOURNAL</a><a>STORES</a>
        </nav>
        <div class="f22-head__logo">FORME</div>
        <nav class="f22-head__nav f22-head__nav--right">
          <a>SEARCH</a><a>ACCOUNT</a><a>BAG (2)</a>
        </nav>
      </div>
      <nav class="f22-head__cats">
        <a>New Arrivals</a>
        <a>Women</a>
        <a>Men</a>
        <a>Knitwear</a>
        <a>Outerwear</a>
        <a>Denim</a>
        <a>Accessories</a>
        <a class="f22-head__cat--sale">Sale</a>
      </nav>
    </header>

    <section class="f22-hero">
      <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" />
      <div class="f22-hero__text">
        <p class="f22-hero__tag">Spring · 2026</p>
        <h1 class="f22-hero__title">A New<br /><em>Everyday</em></h1>
        <p class="f22-hero__desc">계절이 바뀌어도 변하지 않는 것들을 고릅니다.</p>
        <a class="f22-hero__cta">Shop the Collection →</a>
      </div>
    </section>

    <section class="f22-intro">
      <p class="f22-intro__eyebrow">— Curated with intention</p>
      <h2 class="f22-intro__title">
        Made by hands.<br />
        <em>Worn for years.</em>
      </h2>
      <p class="f22-intro__text">
        FORME은 세 가지 기준으로 옷을 고릅니다. 오래 입을 수 있는 소재,
        시간이 지나도 촌스럽지 않은 디자인, 그리고 정직한 제조. 이 세 가지를
        모두 갖춘 네 브랜드를 큐레이션했습니다.
      </p>
    </section>

    <section class="f22-brands">
      <div v-for="(b, i) in brands" :key="i" class="f22-brand" :class="{ 'f22-brand--reverse': i % 2 === 1 }">
        <div class="f22-brand__img">
          <img :src="b.img" :alt="b.name" />
        </div>
        <div class="f22-brand__text">
          <p class="f22-brand__no">— Chapter {{ roman[i] }} —</p>
          <h3>{{ b.name }}</h3>
          <p class="f22-brand__since">{{ b.since }}</p>
          <p class="f22-brand__desc">{{ b.desc }}</p>
          <a class="f22-brand__cta">Explore the story →</a>
        </div>
      </div>
    </section>

    <section class="f22-selection">
      <header class="f22-selection__head">
        <p class="f22-selection__eyebrow">— This week</p>
        <h2>Staff Selection</h2>
        <p class="f22-selection__sub">에디터가 직접 고른 이번 주의 셀렉션</p>
      </header>
      <div class="f22-selection__grid">
        <div v-for="p in picks" :key="p.name" class="f22-pick">
          <div class="f22-pick__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f22-pick__badge">{{ p.tag }}</span>
          </div>
          <p class="f22-pick__brand">— {{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <p class="f22-pick__price">₩ {{ p.price }}</p>
        </div>
      </div>
    </section>

    <section class="f22-journal">
      <div class="f22-journal__head">
        <p class="f22-journal__eyebrow">— Journal</p>
        <h2>Stories & Craft</h2>
      </div>
      <div class="f22-journal__grid">
        <article v-for="(j, i) in journal" :key="i" class="f22-article">
          <div class="f22-article__img"><img :src="j.img" :alt="j.title" /></div>
          <p class="f22-article__cat">{{ j.cat }}</p>
          <h3>{{ j.title }}</h3>
          <p class="f22-article__excerpt">{{ j.excerpt }}</p>
          <a>Read more →</a>
        </article>
      </div>
    </section>

    <section class="f22-news">
      <h2>Stay in touch.</h2>
      <p>새 컬렉션과 에세이를 가장 먼저 받아보세요.</p>
      <div class="f22-news__form">
        <input placeholder="your@email.com" />
        <button>Subscribe</button>
      </div>
    </section>

    <footer class="f22-foot">
      <div class="f22-foot__grid">
        <div class="f22-foot__brand">
          <h3>FORME</h3>
          <p><em>A considered wardrobe.</em></p>
        </div>
        <div class="f22-foot__col">
          <h4>SHOP</h4>
          <a>New Arrivals</a><a>Women</a><a>Men</a><a>Sale</a>
        </div>
        <div class="f22-foot__col">
          <h4>SERVICE</h4>
          <a>Delivery</a><a>Returns</a><a>Size Guide</a><a>Gift Cards</a>
        </div>
        <div class="f22-foot__col">
          <h4>ABOUT</h4>
          <a>Our Story</a><a>Sustainability</a><a>Journal</a><a>Contact</a>
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
const roman = ["I", "II", "III", "IV"];
const brands = [
  { name: "Beanpole",  since: "Est. 1989, Seoul",         desc: "단정한 한국 클래식. 30년 이상 이어온 헤리티지.",       img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "Carhartt",  since: "Est. 1889, Detroit",       desc: "한 세기 이상 이어온 미국 워크웨어의 정직함.",           img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "Levi's",    since: "Est. 1873, San Francisco", desc: "리벳 데님이 탄생한 그 순간부터의 150년.",               img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "Dickies",   since: "Est. 1922, Fort Worth",    desc: "텍사스 작업장에서 시작된 한 세기의 실용주의.",          img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const picks = [
  { brand: "Beanpole", name: "리넨 혼방 옥스포드 셔츠",     price: "149,000", tag: "NEW",      img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { brand: "Levi's",   name: "555™ 스트레이트 진",          price: "159,000", tag: "BEST",     img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { brand: "Carhartt", name: "러기드 플렉스 워크 팬츠",     price: "140,000", tag: "ICONIC",   img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { brand: "Dickies",  name: "트윌 카펜터 팬츠",            price: "105,000", tag: "CLASSIC",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const journal = [
  { cat: "STYLE GUIDE",  title: "봄 데님, 4가지 입는 법", excerpt: "같은 데님 하나로 사무실부터 주말까지.", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { cat: "CRAFT",        title: "좋은 옷, 어떻게 만드는가", excerpt: "소재부터 봉제까지, 오래 입는 옷의 조건.", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { cat: "BRAND STORY",  title: "1873, 데님의 시작",       excerpt: "리바이스 스트라우스가 남긴 것에 대해.", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
];
</script>

<style scoped>
.f22 {
  background: #f4efe7;
  color: #2a241c;
  font-family: 'Fraunces', 'Noto Serif', serif;
  min-height: 100dvh;
}

/* Header */
.f22-head { background: #f4efe7; border-bottom: 1px solid #d4c9b5; }
.f22-head__top { text-align: center; padding: 0.625rem; background: #2a241c; color: #f4efe7; font-size: 0.6875rem; letter-spacing: 0.2em; }
.f22-head__main { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 2rem 3rem; }
.f22-head__nav { display: flex; gap: 2rem; }
.f22-head__nav--right { justify-content: flex-end; }
.f22-head__nav a { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; color: #2a241c; cursor: pointer; }
.f22-head__logo { font-family: 'Fraunces', serif; font-size: 2.5rem; font-weight: 400; font-style: italic; letter-spacing: -0.01em; }
.f22-head__cats { display: flex; justify-content: center; gap: 2.5rem; padding: 1rem 3rem; border-top: 1px solid rgba(212, 201, 181, 0.6); }
.f22-head__cats a { font-family: 'Fraunces', serif; font-size: 0.9375rem; color: #2a241c; cursor: pointer; }
.f22-head__cat--sale { color: #8b2322; font-style: italic; }

/* Hero */
.f22-hero { position: relative; }
.f22-hero img { width: 100%; height: 70vh; object-fit: cover; filter: brightness(0.85) saturate(0.9); }
.f22-hero__text { position: absolute; bottom: 4rem; left: 4rem; color: #fff; max-width: 28rem; }
.f22-hero__tag { font-size: 0.75rem; font-style: italic; letter-spacing: 0.2em; margin-bottom: 1rem; }
.f22-hero__title { font-size: clamp(3rem, 6vw, 5rem); font-weight: 300; line-height: 0.95; margin-bottom: 1.5rem; }
.f22-hero__title em { font-style: italic; font-weight: 400; }
.f22-hero__desc { font-size: 1.0625rem; font-style: italic; margin-bottom: 2rem; opacity: 0.9; }
.f22-hero__cta { display: inline-block; padding: 1rem 2.25rem; background: #f4efe7; color: #2a241c; font-size: 0.8125rem; font-weight: 500; letter-spacing: 0.15em; text-transform: uppercase; cursor: pointer; }

/* Intro */
.f22-intro { padding: 8rem 3rem 6rem; text-align: center; max-width: 46rem; margin: 0 auto; }
.f22-intro__eyebrow { font-size: 0.8125rem; font-style: italic; color: #8b7340; margin-bottom: 1.5rem; letter-spacing: 0.15em; }
.f22-intro__title { font-size: clamp(2.5rem, 5vw, 3.75rem); font-weight: 300; line-height: 1.1; margin-bottom: 2rem; }
.f22-intro__title em { font-style: italic; font-weight: 400; color: #8b7340; }
.f22-intro__text { font-size: 1rem; line-height: 1.9; color: #5a5040; }

/* Brands */
.f22-brands { padding: 4rem 3rem; }
.f22-brand { display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center; padding: 5rem 0; max-width: 1200px; margin: 0 auto; border-bottom: 1px solid rgba(212, 201, 181, 0.6); }
.f22-brand:last-child { border-bottom: none; }
.f22-brand--reverse .f22-brand__img { order: 2; }
.f22-brand__img { aspect-ratio: 4/5; overflow: hidden; }
.f22-brand__img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); }
.f22-brand__no { font-size: 0.75rem; font-style: italic; letter-spacing: 0.25em; color: #8b7340; margin-bottom: 1rem; }
.f22-brand h3 { font-size: clamp(2.25rem, 4vw, 3rem); font-weight: 300; margin-bottom: 0.5rem; }
.f22-brand__since { font-size: 0.875rem; font-style: italic; color: #8b7340; margin-bottom: 1.5rem; }
.f22-brand__desc { font-size: 1rem; line-height: 1.8; color: #5a5040; margin-bottom: 2rem; }
.f22-brand__cta { font-size: 0.8125rem; font-style: italic; color: #2a241c; border-bottom: 1px solid #2a241c; padding-bottom: 3px; cursor: pointer; }

/* Selection */
.f22-selection { padding: 6rem 3rem; background: #ede5d3; }
.f22-selection__head { text-align: center; margin-bottom: 4rem; }
.f22-selection__eyebrow { font-size: 0.8125rem; font-style: italic; color: #8b7340; margin-bottom: 1rem; letter-spacing: 0.15em; }
.f22-selection__head h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; margin-bottom: 0.75rem; }
.f22-selection__sub { font-size: 0.9375rem; color: #5a5040; }
.f22-selection__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1200px; margin: 0 auto; }
.f22-pick { cursor: pointer; }
.f22-pick__img { position: relative; aspect-ratio: 3/4; overflow: hidden; margin-bottom: 1rem; background: #f4efe7; }
.f22-pick__img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); }
.f22-pick__badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #2a241c; color: #f4efe7; padding: 0.375rem 0.75rem; font-size: 0.625rem; letter-spacing: 0.15em; }
.f22-pick__brand { font-size: 0.75rem; font-style: italic; letter-spacing: 0.1em; color: #8b7340; margin-bottom: 0.375rem; }
.f22-pick h3 { font-size: 1rem; font-weight: 400; margin-bottom: 0.5rem; line-height: 1.4; }
.f22-pick__price { font-size: 0.9375rem; color: #2a241c; }

/* Journal */
.f22-journal { padding: 8rem 3rem; max-width: 1200px; margin: 0 auto; }
.f22-journal__head { text-align: center; margin-bottom: 4rem; }
.f22-journal__eyebrow { font-size: 0.8125rem; font-style: italic; color: #8b7340; margin-bottom: 1rem; letter-spacing: 0.15em; }
.f22-journal__head h2 { font-size: clamp(2.25rem, 4vw, 3.25rem); font-weight: 300; }
.f22-journal__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; }
.f22-article { cursor: pointer; }
.f22-article__img { aspect-ratio: 4/3; overflow: hidden; margin-bottom: 1.25rem; }
.f22-article__img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); }
.f22-article__cat { font-size: 0.6875rem; font-style: italic; letter-spacing: 0.25em; color: #8b7340; margin-bottom: 0.625rem; }
.f22-article h3 { font-size: 1.375rem; font-weight: 400; line-height: 1.25; margin-bottom: 0.75rem; }
.f22-article__excerpt { font-size: 0.875rem; color: #5a5040; line-height: 1.7; margin-bottom: 1rem; font-style: italic; }
.f22-article a { font-size: 0.8125rem; font-style: italic; color: #2a241c; border-bottom: 1px solid #2a241c; padding-bottom: 2px; }

/* Newsletter */
.f22-news { padding: 6rem 3rem; background: #2a241c; color: #f4efe7; text-align: center; }
.f22-news h2 { font-size: clamp(2.25rem, 4vw, 3rem); font-weight: 300; font-style: italic; margin-bottom: 0.75rem; }
.f22-news p { font-size: 1rem; margin-bottom: 2.5rem; opacity: 0.8; }
.f22-news__form { display: inline-flex; max-width: 28rem; width: 100%; border-bottom: 1px solid #8b7340; }
.f22-news__form input { flex: 1; background: transparent; border: none; padding: 1rem 0; color: #f4efe7; font-family: inherit; font-size: 1rem; font-style: italic; outline: none; }
.f22-news__form button { background: transparent; border: none; color: #f4efe7; font-family: inherit; font-size: 0.875rem; font-style: italic; letter-spacing: 0.15em; cursor: pointer; padding: 0 1rem; }

/* Footer */
.f22-foot { padding: 4rem 3rem 2rem; background: #ede5d3; }
.f22-foot__grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1200px; margin: 0 auto 3rem; }
.f22-foot__brand h3 { font-family: 'Fraunces', serif; font-size: 2.25rem; font-weight: 400; font-style: italic; margin-bottom: 0.5rem; }
.f22-foot__brand p em { font-size: 0.9375rem; color: #8b7340; }
.f22-foot__col h4 { font-size: 0.6875rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 1rem; color: #2a241c; }
.f22-foot__col a { display: block; font-size: 0.875rem; color: #5a5040; margin-bottom: 0.625rem; cursor: pointer; }
.f22-foot__bot { display: flex; justify-content: space-between; max-width: 1200px; margin: 0 auto; padding-top: 2rem; border-top: 1px solid #d4c9b5; font-size: 0.75rem; color: #8b7340; }
.f22-foot__bot em { font-style: italic; }
</style>
