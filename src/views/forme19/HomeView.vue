<template>
  <main class="page-wrapper f19-home">
    <!-- 신문 마스트헤드 -->
    <header class="f19-mast">
      <div class="f19-mast__meta">
        <span>VOL. I · N° 1</span>
        <span>FRIDAY, APRIL 10, 2026</span>
        <span>SEOUL EDITION</span>
        <span>WEATHER: CLEAR, 18°C</span>
      </div>
      <h1 class="f19-mast__title">The FORME Times</h1>
      <p class="f19-mast__sub">"All the garments that are fit to wear."</p>
      <div class="f19-mast__bar">
        <span>PRICE ₩ 12,000</span>
        <span>www.forme.kr</span>
      </div>
    </header>

    <!-- 헤드라인 -->
    <section class="f19-lead">
      <div class="f19-lead__col f19-lead__col--main">
        <p class="f19-lead__tag">COVER STORY</p>
        <h2 class="f19-lead__title">Four Houses,<br />One Curation.</h2>
        <p class="f19-lead__drop">서울 — FORME가 세계 각지의 네 헤리티지 브랜드를 한자리에 모았다. Beanpole, Carhartt, Levi's, Dickies — 한국 클래식, 디트로이트 워크웨어, 캘리포니아 데님, 텍사스 작업복. 이들이 FORME의 큐레이션 안에서 어떻게 대화하는지에 주목할 필요가 있다.</p>
        <p class="f19-lead__body">
          편집자는 말한다. "각기 다른 시대와 대륙에서 출발한 이 브랜드들이 사실은 같은 것을 말하고 있다. 옷이 가져야 할 정직함에 관한 것이다." FORME의 셀렉션은 단순한 나열이 아닌, 네 개의 챕터로 구성된 한 권의 책과 같다.
        </p>
        <RouterLink to="/products" class="f19-lead__more">Read the full story →</RouterLink>
      </div>
      <div class="f19-lead__col f19-lead__col--side">
        <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="feature" />
        <p class="f19-lead__caption">Above: FORME atelier, Seoul. Photo by FORME Studio.</p>
      </div>
    </section>

    <!-- 칼럼 기사 -->
    <section class="f19-articles">
      <article v-for="(b,i) in brands" :key="b.id" class="f19-article">
        <p class="f19-article__cat">CHAPTER {{ i+1 }}</p>
        <h3>{{ b.title }}</h3>
        <p class="f19-article__byline">By FORME Editorial · {{ b.since }}</p>
        <div class="f19-article__img"><img :src="b.image" :alt="b.title" /></div>
        <p>{{ b.excerpt }}</p>
        <RouterLink :to="b.route">Continue reading →</RouterLink>
      </article>
    </section>

    <!-- 분류 광고란 -->
    <section class="f19-classifieds">
      <h3 class="f19-classifieds__title">CLASSIFIEDS · FEATURED ITEMS</h3>
      <div class="f19-classifieds__grid">
        <RouterLink v-for="(p,i) in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f19-ad">
          <span class="f19-ad__no">ITEM № {{ String(i+1).padStart(3,'0') }}</span>
          <div class="f19-ad__img"><img :src="p.image" :alt="p.name" /></div>
          <h4>{{ p.name }}</h4>
          <p>{{ fmt(p.price) }} KRW / FOR SALE</p>
        </RouterLink>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="f19-colophon">
      <p>— THE FORME TIMES —</p>
      <p>Published quarterly in Seoul, Korea · Est. 2026 · All rights reserved</p>
    </footer>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
const fmt = (p) => p ? p.toLocaleString() : "";
const brands = [
  { id: 1, title: "Beanpole", since: "Est. 1989, Seoul",        excerpt: "한국 클래식의 정수, 서울에서 시작된 단정한 헤리티지.",     route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Carhartt", since: "Est. 1889, Detroit",      excerpt: "디트로이트 철도 노동자의 옷으로 시작된 진정한 워크웨어.", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "Levi's",   since: "Est. 1873, San Francisco", excerpt: "리벳 데님의 발명, 한 세기 반 동안 이어진 데님의 원형.",  route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "Dickies",  since: "Est. 1922, Fort Worth",   excerpt: "텍사스에서 시작된 100년의 오버롤, 작업복의 기준.",       route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f19-home {
  background: #f4f0e6;
  color: #1a1a1a;
  font-family: "Bodoni Moda", "Playfair Display", Georgia, serif;
  min-height: 100dvh;
  padding: 3rem 3rem 5rem;
  max-width: 1200px;
  margin: 0 auto;
}
.f19-mast {
  text-align: center;
  padding-bottom: 1.5rem;
  border-bottom: 4px double #1a1a1a;
  margin-bottom: 2rem;
}
.f19-mast__meta {
  display: flex;
  justify-content: space-between;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-bottom: 1rem;
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 1.5rem;
}
.f19-mast__title {
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1;
  font-style: italic;
}
.f19-mast__sub {
  font-size: 0.9375rem;
  font-style: italic;
  margin-top: 0.75rem;
  color: #4a4a4a;
}
.f19-mast__bar {
  display: flex;
  justify-content: space-between;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  padding-top: 1rem;
  margin-top: 1.25rem;
  border-top: 1px solid #1a1a1a;
}

/* 리드 기사 */
.f19-lead {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 3rem;
}
@media (min-width: 768px) { .f19-lead { grid-template-columns: 2fr 1fr; gap: 3rem; } }
.f19-lead__tag {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: #8b0000;
  margin-bottom: 0.75rem;
}
.f19-lead__title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.025em;
  margin-bottom: 1.5rem;
}
.f19-lead__drop {
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 1rem;
  text-align: justify;
}
.f19-lead__drop::first-letter {
  font-size: 4rem;
  font-weight: 700;
  float: left;
  line-height: 0.9;
  padding: 0.25rem 0.5rem 0 0;
}
.f19-lead__body {
  font-size: 0.9375rem;
  line-height: 1.7;
  text-align: justify;
  margin-bottom: 1rem;
  column-count: 1;
}
@media (min-width: 640px) { .f19-lead__body { column-count: 2; column-gap: 1.5rem; } }
.f19-lead__more {
  display: inline-block;
  font-style: italic;
  font-size: 0.875rem;
  color: #8b0000;
  border-bottom: 1px solid #8b0000;
}
.f19-lead__col--side img {
  width: 100%;
  filter: grayscale(1) contrast(1.05);
  border: 1px solid #1a1a1a;
}
.f19-lead__caption {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-style: italic;
  color: #5a5a5a;
  margin-top: 0.5rem;
}

/* 칼럼 기사 */
.f19-articles {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2.5rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 3rem;
}
@media (min-width: 640px) { .f19-articles { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f19-articles { grid-template-columns: repeat(4, 1fr); } }
.f19-article {
  border-right: 1px solid rgba(0,0,0,0.2);
  padding-right: 1.5rem;
}
.f19-article:last-child { border-right: none; }
.f19-article__cat {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #8b0000;
  margin-bottom: 0.5rem;
}
.f19-article h3 {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 0.5rem;
}
.f19-article__byline {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-style: italic;
  color: #5a5a5a;
  margin-bottom: 1rem;
}
.f19-article__img {
  aspect-ratio: 4/3;
  overflow: hidden;
  margin-bottom: 0.75rem;
  border: 1px solid #1a1a1a;
}
.f19-article__img img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(1) contrast(1.05); }
.f19-article p {
  font-size: 0.8125rem;
  line-height: 1.6;
  margin-bottom: 0.625rem;
}
.f19-article a {
  font-style: italic;
  font-size: 0.75rem;
  color: #8b0000;
}

/* 클래시파이드 */
.f19-classifieds { padding-bottom: 3rem; border-bottom: 4px double #1a1a1a; margin-bottom: 2rem; }
.f19-classifieds__title {
  text-align: center;
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 1rem 0;
  border-top: 1px solid #1a1a1a;
  border-bottom: 1px solid #1a1a1a;
  margin-bottom: 2rem;
}
.f19-classifieds__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) { .f19-classifieds__grid { grid-template-columns: repeat(3, 1fr); } }
.f19-ad {
  border: 1px solid #1a1a1a;
  padding: 1rem;
  color: inherit;
  text-align: center;
}
.f19-ad__no {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  display: block;
  margin-bottom: 0.5rem;
}
.f19-ad__img {
  aspect-ratio: 1/1;
  background: #fff;
  border: 1px solid #1a1a1a;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}
.f19-ad__img img { width: 100%; height: 100%; object-fit: contain; filter: grayscale(1) contrast(1.05); }
.f19-ad h4 { font-size: 0.9375rem; margin-bottom: 0.25rem; }
.f19-ad p { font-family: "Space Mono", monospace; font-size: 0.6875rem; letter-spacing: 0.05em; }

.f19-colophon {
  text-align: center;
  padding-top: 1rem;
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #5a5a5a;
}
.f19-colophon p:first-child { font-weight: 700; margin-bottom: 0.5rem; color: #1a1a1a; }
</style>
