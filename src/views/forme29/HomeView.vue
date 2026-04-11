<template>
  <main class="page-wrapper f29">
    <header class="f29-head">
      <span class="f29-head__hanja">形</span>
      <div class="f29-head__logo">FORME</div>
      <span class="f29-head__sub">형 · 形 · かたち</span>
    </header>

    <section class="f29-hero">
      <div class="f29-hero__left">
        <p class="f29-hero__tag">— 봄 · 春 · 2026 —</p>
        <h1 class="f29-hero__title">옷의<br /><em>결</em></h1>
        <p class="f29-hero__desc">
          전통의 선과 현대의 결이 만나는 자리.<br />
          FORME은 시간을 입는 방법을 제안합니다.
        </p>
        <a class="f29-hero__cta">둘러보기 →</a>
      </div>
      <div class="f29-hero__right">
        <div class="f29-hero__img">
          <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" />
        </div>
        <div class="f29-hero__stamp">
          <span>形</span>
          <small>FORME</small>
        </div>
      </div>
    </section>

    <section class="f29-brands">
      <p class="f29-eyebrow">— 四 ·  네 개의 집 —</p>
      <h2>함께하는 브랜드</h2>
      <div class="f29-brands__grid">
        <div v-for="(b, i) in brands" :key="i" class="f29-brand">
          <div class="f29-brand__seal">{{ ['壹','貳','叁','肆'][i] }}</div>
          <div class="f29-brand__img"><img :src="b.img" :alt="b.name" /></div>
          <h3>{{ b.name }}</h3>
          <p>{{ b.since }}</p>
        </div>
      </div>
    </section>

    <section class="f29-products">
      <p class="f29-eyebrow">— 物 · 이번 주의 물건 —</p>
      <h2>선별된 것들</h2>
      <div class="f29-products__grid">
        <div v-for="(p, i) in products" :key="i" class="f29-item">
          <div class="f29-item__img"><img :src="p.img" :alt="p.name" /></div>
          <p class="f29-item__no">第 {{ String(i + 1).padStart(2, '0') }} 號</p>
          <h3>{{ p.name }}</h3>
          <p class="f29-item__price">₩ {{ p.price }}</p>
        </div>
      </div>
    </section>

    <section class="f29-closing">
      <div class="f29-closing__seal">形</div>
      <p>옷에도 결이 있다.<br /><em>좋은 결은 시간이 만든다.</em></p>
    </section>

    <footer class="f29-foot">
      <span>形 · FORME</span>
      <span>서울 · EST. 2026</span>
      <span>© FORME</span>
    </footer>
  </main>
</template>

<script setup>
const brands = [
  { name: "빈폴",   since: "서울 · 1989",        img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "칼하트", since: "디트로이트 · 1889",  img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "리바이스", since: "샌프란시스코 · 1873", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "디키즈", since: "포트워스 · 1922",    img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const products = [
  { name: "헤리티지 셔츠",          price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "555™ 스트레이트 진",     price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "러기드 워크 팬츠",       price: "140,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "카펜터 데님 팬츠",       price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f29 { background: #f5efe3; color: #2a1f14; font-family: 'Noto Serif KR', serif; min-height: 100dvh; }

.f29-head { display: flex; align-items: center; justify-content: center; gap: 1.5rem; padding: 2rem; border-bottom: 1px solid #c9b99a; }
.f29-head__hanja { font-size: 2.5rem; font-weight: 300; color: #8b2322; }
.f29-head__logo { font-size: 1.5rem; font-weight: 400; letter-spacing: 0.15em; }
.f29-head__sub { font-size: 0.75rem; color: #8a7050; letter-spacing: 0.1em; }

.f29-hero { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; padding: 6rem 3rem; max-width: 1200px; margin: 0 auto; align-items: center; }
.f29-hero__tag { font-size: 0.8125rem; letter-spacing: 0.2em; color: #8a7050; margin-bottom: 2rem; }
.f29-hero__title { font-size: clamp(3rem, 8vw, 6rem); font-weight: 300; line-height: 1; margin-bottom: 2rem; }
.f29-hero__title em { font-style: normal; color: #8b2322; font-weight: 400; }
.f29-hero__desc { font-size: 1.0625rem; line-height: 2; color: #5a4a3a; margin-bottom: 3rem; }
.f29-hero__cta { display: inline-block; padding: 1rem 2rem; border: 1px solid #2a1f14; font-size: 0.875rem; color: #2a1f14; cursor: pointer; transition: background 0.3s, color 0.3s; }
.f29-hero__cta:hover { background: #2a1f14; color: #f5efe3; }
.f29-hero__right { position: relative; }
.f29-hero__img { overflow: hidden; border: 1px solid #c9b99a; }
.f29-hero__img img { width: 100%; aspect-ratio: 3/4; object-fit: cover; filter: sepia(0.1) saturate(0.9); }
.f29-hero__stamp { position: absolute; bottom: -1rem; right: 2rem; background: #f5efe3; border: 2px solid #8b2322; width: 5rem; height: 5rem; display: flex; flex-direction: column; align-items: center; justify-content: center; transform: rotate(-5deg); }
.f29-hero__stamp span { font-size: 1.75rem; color: #8b2322; font-weight: 300; }
.f29-hero__stamp small { font-size: 0.5625rem; letter-spacing: 0.2em; color: #8b2322; }

.f29-eyebrow { text-align: center; font-size: 0.8125rem; letter-spacing: 0.15em; color: #8a7050; margin-bottom: 0.75rem; }
.f29-brands, .f29-products { padding: 6rem 3rem; max-width: 1200px; margin: 0 auto; }
.f29-brands h2, .f29-products h2 { text-align: center; font-size: clamp(2rem, 4vw, 3rem); font-weight: 300; margin-bottom: 4rem; }
.f29-brands__grid, .f29-products__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; }

.f29-brand { text-align: center; cursor: pointer; }
.f29-brand__seal { font-size: 1.75rem; font-weight: 300; color: #8b2322; margin-bottom: 1rem; }
.f29-brand__img { aspect-ratio: 3/4; overflow: hidden; border: 1px solid #c9b99a; margin-bottom: 1rem; }
.f29-brand__img img { width: 100%; height: 100%; object-fit: cover; filter: sepia(0.1) saturate(0.9); transition: transform 0.7s; }
.f29-brand:hover .f29-brand__img img { transform: scale(1.03); }
.f29-brand h3 { font-size: 1.25rem; font-weight: 400; margin-bottom: 0.375rem; }
.f29-brand p { font-size: 0.75rem; color: #8a7050; }

.f29-item { text-align: center; cursor: pointer; }
.f29-item__img { aspect-ratio: 1/1; background: #fff; border: 1px solid #c9b99a; padding: 1.5rem; margin-bottom: 1rem; }
.f29-item__img img { width: 100%; height: 100%; object-fit: contain; filter: sepia(0.05); }
.f29-item__no { font-size: 0.625rem; letter-spacing: 0.25em; color: #8b2322; margin-bottom: 0.375rem; }
.f29-item h3 { font-size: 1rem; font-weight: 400; margin-bottom: 0.5rem; }
.f29-item__price { font-size: 0.875rem; color: #5a4a3a; }

.f29-closing { padding: 8rem 3rem; text-align: center; background: #2a1f14; color: #f5efe3; }
.f29-closing__seal { font-size: 4rem; font-weight: 300; color: #8b2322; margin-bottom: 2rem; }
.f29-closing p { font-size: clamp(1.5rem, 3vw, 2.5rem); font-weight: 300; line-height: 1.5; }
.f29-closing em { font-style: normal; color: #c9a86b; }

.f29-foot { display: flex; justify-content: space-between; padding: 1.25rem 3rem; border-top: 1px solid #c9b99a; font-size: 0.6875rem; color: #8a7050; letter-spacing: 0.15em; }
</style>
