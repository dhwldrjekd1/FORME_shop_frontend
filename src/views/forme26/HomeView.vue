<template>
  <main class="page-wrapper f26">
    <header class="f26-head">
      <div class="f26-head__logo">forme</div>
      <nav class="f26-head__nav">
        <a>Home</a><a>Shop</a><a>Journal</a><a>About</a>
      </nav>
      <div class="f26-head__right">
        <a>Search</a><a>Bag</a>
      </div>
    </header>

    <section class="f26-hero">
      <div class="f26-hero__text">
        <p class="f26-hero__issue">ISSUE 01 · SPRING 2026</p>
        <h1 class="f26-hero__title">The Art of<br /><em>Dressing Slowly</em></h1>
        <p class="f26-hero__desc">서두르지 않는 옷장. 계절과 함께 천천히 골라 입는 삶의 방식.</p>
        <a class="f26-hero__cta">Read the Story →</a>
      </div>
      <div class="f26-hero__img">
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&q=80" alt="hero" />
      </div>
    </section>

    <section class="f26-quote">
      <p>"옷은 삶의 리듬을 담는 그릇이다."</p>
      <span>— FORME Journal, Vol. 01</span>
    </section>

    <section class="f26-brands">
      <p class="f26-eyebrow">— Our Partners</p>
      <h2>Four brands we live with.</h2>
      <div class="f26-brands__grid">
        <div v-for="b in brands" :key="b.name" class="f26-brand">
          <div class="f26-brand__img"><img :src="b.img" :alt="b.name" /></div>
          <h3>{{ b.name }}</h3>
          <p>{{ b.desc }}</p>
        </div>
      </div>
    </section>

    <section class="f26-products">
      <p class="f26-eyebrow">— This Week</p>
      <h2>Objects we recommend.</h2>
      <div class="f26-products__grid">
        <div v-for="p in products" :key="p.name" class="f26-item">
          <div class="f26-item__img"><img :src="p.img" :alt="p.name" /></div>
          <p class="f26-item__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <p class="f26-item__price">₩ {{ p.price }}</p>
        </div>
      </div>
    </section>

    <section class="f26-journal">
      <div class="f26-journal__left">
        <p class="f26-eyebrow">— Journal</p>
        <h2>Slow Living,<br /><em>Honest Wearing.</em></h2>
        <p>좋은 옷은 좋은 하루를 만듭니다.<br />이번 호에서는 '오래 입는 옷'의 조건에 대해 이야기합니다.</p>
        <a>Read more →</a>
      </div>
      <div class="f26-journal__img">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="journal" />
      </div>
    </section>

    <footer class="f26-foot">
      <div class="f26-foot__inner">
        <div class="f26-foot__brand"><h3>forme</h3><p><em>Dress slowly, live fully.</em></p></div>
        <div class="f26-foot__links"><h4>SHOP</h4><a>New</a><a>Shop All</a><a>Journal</a></div>
        <div class="f26-foot__links"><h4>HELP</h4><a>FAQ</a><a>Shipping</a><a>Returns</a></div>
        <div class="f26-foot__links"><h4>CONNECT</h4><a>Instagram</a><a>Newsletter</a><a>Contact</a></div>
      </div>
      <p class="f26-foot__copy">© 2026 forme · Seoul</p>
    </footer>
  </main>
</template>

<script setup>
const brands = [
  { name: "Beanpole", desc: "한국 클래식의 정수",  img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "Carhartt", desc: "디트로이트 워크웨어", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "Levi's",   desc: "150년 데님 아이콘",   img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "Dickies",  desc: "한 세기 워크웨어",    img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const products = [
  { brand: "Beanpole", name: "리넨 셔츠",           price: "149,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { brand: "Levi's",   name: "555™ 스트레이트 진",  price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { brand: "Carhartt", name: "워크 팬츠",           price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { brand: "Dickies",  name: "카펜터 데님",         price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f26 { background: #faf7f2; color: #3a3530; font-family: 'Fraunces', 'Georgia', serif; min-height: 100dvh; }
.f26-head { display: grid; grid-template-columns: auto 1fr auto; gap: 3rem; align-items: center; padding: 1.75rem 3rem; border-bottom: 1px solid #e8e0d0; }
.f26-head__logo { font-size: 1.75rem; font-weight: 300; font-style: italic; }
.f26-head__nav { display: flex; gap: 2rem; justify-content: center; }
.f26-head__nav a, .f26-head__right a { font-family: 'Noto Sans KR', sans-serif; font-size: 0.8125rem; color: #3a3530; cursor: pointer; }
.f26-head__right { display: flex; gap: 1.5rem; justify-content: flex-end; }

.f26-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 6rem 3rem; max-width: 1300px; margin: 0 auto; align-items: center; }
.f26-hero__issue { font-size: 0.75rem; font-style: italic; letter-spacing: 0.2em; color: #8a7560; margin-bottom: 1.5rem; }
.f26-hero__title { font-size: clamp(2.75rem, 5vw, 4.5rem); font-weight: 300; line-height: 1; margin-bottom: 1.5rem; }
.f26-hero__title em { font-style: italic; color: #8a7560; }
.f26-hero__desc { font-size: 1.0625rem; line-height: 1.9; color: #6b5f50; margin-bottom: 2.5rem; }
.f26-hero__cta { font-style: italic; font-size: 0.875rem; color: #3a3530; border-bottom: 1px solid #3a3530; padding-bottom: 3px; cursor: pointer; }
.f26-hero__img { overflow: hidden; border-radius: 4px; }
.f26-hero__img img { width: 100%; height: 100%; object-fit: cover; aspect-ratio: 4/5; filter: brightness(1.02) saturate(0.85); }

.f26-quote { padding: 6rem 3rem; text-align: center; background: #ede5d3; }
.f26-quote p { font-size: clamp(1.75rem, 3.5vw, 2.75rem); font-weight: 300; font-style: italic; line-height: 1.35; margin-bottom: 1.5rem; }
.f26-quote span { font-size: 0.8125rem; font-style: italic; color: #8a7560; }

.f26-eyebrow { font-size: 0.8125rem; font-style: italic; color: #8a7560; margin-bottom: 0.75rem; letter-spacing: 0.1em; }
.f26-brands, .f26-products { padding: 6rem 3rem; max-width: 1300px; margin: 0 auto; }
.f26-brands h2, .f26-products h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; margin-bottom: 3.5rem; }
.f26-brands__grid, .f26-products__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }
.f26-brand, .f26-item { cursor: pointer; }
.f26-brand__img, .f26-item__img { aspect-ratio: 3/4; overflow: hidden; margin-bottom: 1rem; border-radius: 4px; background: #ede5d3; }
.f26-brand__img img, .f26-item__img img { width: 100%; height: 100%; object-fit: cover; filter: saturate(0.85); transition: transform 0.7s; }
.f26-brand:hover .f26-brand__img img, .f26-item:hover .f26-item__img img { transform: scale(1.03); }
.f26-brand h3 { font-size: 1.25rem; font-weight: 400; margin-bottom: 0.375rem; }
.f26-brand p { font-size: 0.8125rem; color: #8a7560; font-style: italic; }
.f26-item__brand { font-size: 0.6875rem; font-style: italic; color: #8a7560; margin-bottom: 0.375rem; }
.f26-item h3 { font-size: 1rem; font-weight: 400; margin-bottom: 0.5rem; line-height: 1.35; }
.f26-item__price { font-size: 0.9375rem; color: #3a3530; }

.f26-journal { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 6rem 3rem; max-width: 1300px; margin: 0 auto; align-items: center; }
.f26-journal__left h2 { font-size: clamp(2.25rem, 4vw, 3.5rem); font-weight: 300; margin-bottom: 1.5rem; line-height: 1.05; }
.f26-journal__left h2 em { font-style: italic; color: #8a7560; }
.f26-journal__left p { font-size: 1rem; line-height: 1.9; color: #6b5f50; margin-bottom: 2rem; }
.f26-journal__left a { font-style: italic; font-size: 0.875rem; color: #3a3530; border-bottom: 1px solid #3a3530; padding-bottom: 3px; cursor: pointer; }
.f26-journal__img { overflow: hidden; border-radius: 4px; }
.f26-journal__img img { width: 100%; aspect-ratio: 4/5; object-fit: cover; filter: saturate(0.85); }

.f26-foot { padding: 4rem 3rem 2rem; background: #ede5d3; }
.f26-foot__inner { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1300px; margin: 0 auto 2rem; padding-bottom: 2rem; border-bottom: 1px solid #d4c9b5; }
.f26-foot__brand h3 { font-size: 2rem; font-weight: 300; font-style: italic; margin-bottom: 0.5rem; }
.f26-foot__brand p em { font-size: 0.875rem; color: #8a7560; }
.f26-foot__links h4 { font-family: 'Noto Sans KR', sans-serif; font-size: 0.625rem; letter-spacing: 0.25em; text-transform: uppercase; margin-bottom: 0.75rem; color: #3a3530; }
.f26-foot__links a { display: block; font-size: 0.8125rem; color: #6b5f50; margin-bottom: 0.5rem; cursor: pointer; }
.f26-foot__copy { max-width: 1300px; margin: 0 auto; font-size: 0.6875rem; color: #8a7560; font-style: italic; }
</style>
