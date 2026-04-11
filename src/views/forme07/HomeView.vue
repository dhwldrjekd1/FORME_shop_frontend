<template>
  <main class="page-wrapper f07-home">
    <!-- 잡지 표지 스타일 -->
    <section class="f07-cover">
      <div class="f07-cover__meta">
        <span>VOL. 01</span>
        <span>SPRING 2026</span>
        <span>₩ 12,000</span>
      </div>
      <h1 class="f07-cover__title">FORME</h1>
      <p class="f07-cover__tag">THE QUIET ISSUE</p>
      <div class="f07-cover__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80"
          alt="cover"
        />
      </div>
      <div class="f07-cover__features">
        <div><span>01</span><p>Heritage reborn</p></div>
        <div><span>02</span><p>The new minimal</p></div>
        <div><span>03</span><p>Craft in focus</p></div>
      </div>
    </section>

    <!-- 목차 -->
    <section class="f07-toc">
      <p class="f07-toc__label">CONTENTS</p>
      <h2 class="f07-toc__title">In This Issue</h2>
      <div class="f07-toc__list">
        <div class="f07-toc__item">
          <span class="f07-toc__no">P. 012</span>
          <div>
            <h3>Editor's Letter</h3>
            <p>FORME의 2026 봄 에디션을 시작하며</p>
          </div>
        </div>
        <div class="f07-toc__item">
          <span class="f07-toc__no">P. 024</span>
          <div>
            <h3>Four Houses</h3>
            <p>우리가 주목한 네 개의 헤리티지 브랜드</p>
          </div>
        </div>
        <div class="f07-toc__item">
          <span class="f07-toc__no">P. 048</span>
          <div>
            <h3>Object Studies</h3>
            <p>이번 시즌의 주요 상품을 면밀하게 들여다보다</p>
          </div>
        </div>
        <div class="f07-toc__item">
          <span class="f07-toc__no">P. 072</span>
          <div>
            <h3>Craft Notes</h3>
            <p>원단과 봉제, 그리고 시간의 이야기</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 피처: 잡지 기사 레이아웃 -->
    <section class="f07-feature">
      <p class="f07-feature__num">P. 024</p>
      <p class="f07-feature__label">— FEATURE STORY</p>
      <h2 class="f07-feature__title">
        Four Houses,<br />
        <em>One Vision.</em>
      </h2>
      <p class="f07-feature__dek">
        서로 다른 시대와 대륙에서 출발했지만, 같은 철학을 공유하는 네 브랜드.
        FORME가 선별한 이들의 이야기를 전합니다.
      </p>
      <div class="f07-feature__grid">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f07-story"
        >
          <p class="f07-story__no">CHAPTER {{ String(i + 1).padStart(2, '0') }}</p>
          <div class="f07-story__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
          <h3>{{ b.title }}</h3>
          <p class="f07-story__since">{{ b.since }}</p>
          <p class="f07-story__excerpt">{{ b.excerpt }}</p>
          <span class="f07-story__more">READ MORE →</span>
        </RouterLink>
      </div>
    </section>

    <!-- Object Studies -->
    <section class="f07-objects">
      <p class="f07-feature__num">P. 048</p>
      <p class="f07-feature__label">— OBJECT STUDIES</p>
      <h2 class="f07-feature__title">This Month's Picks</h2>
      <div class="f07-objects__grid">
        <RouterLink
          v-for="(p, i) in products.slice(0, 4)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f07-obj"
        >
          <span class="f07-obj__no">#{{ String(i + 1).padStart(2, '0') }}</span>
          <div class="f07-obj__img-wrap">
            <img :src="p.image" :alt="p.name" />
          </div>
          <h3>{{ p.name }}</h3>
          <p class="f07-obj__meta">{{ getBrandName(p.id) }}</p>
          <p class="f07-obj__price">₩ {{ fmt(p.price) }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- 콜로폰 -->
    <section class="f07-colophon">
      <p>FORME MAGAZINE · PUBLISHED QUARTERLY · SINCE 2026</p>
      <p class="f07-colophon__small">EDITORIAL · ART DIRECTION · PHOTOGRAPHY BY FORME STUDIO</p>
    </section>
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
const getBrandName = (id) => {
  if (id >= 100 && id < 200) return "CARHARTT";
  if (id >= 200 && id < 300) return "LEVI'S";
  if (id >= 300 && id < 400) return "DICKIES";
  if (id >= 400 && id < 500) return "BEANPOLE";
  return "FORME";
};
const brandPanels = [
  { id: 1, title: "Beanpole", since: "SEOUL, 1989",        excerpt: "클래식의 가치가 현대의 감각과 만나는 자리.", route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Levi's",   since: "SAN FRANCISCO, 1873", excerpt: "한 세기 반을 견뎌온 데님의 원형.",          route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "Dickies",  since: "FORT WORTH, 1922",   excerpt: "작업장의 언어로 쓰여진 한 세기의 기록.",    route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "Carhartt", since: "DETROIT, 1889",      excerpt: "정직한 노동이 만들어낸 옷의 단단함.",       route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* FORME 07 — Editorial Magazine */
.f07-home {
  background: #fbf9f4;
  color: #1a1a1a;
  font-family: var(--font-body);
}

/* 표지 */
.f07-cover {
  min-height: calc(100dvh - var(--header-height));
  padding: 3rem 3rem 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-bottom: 0.5px solid #1a1a1a;
}
.f07-cover__meta {
  width: 100%;
  max-width: 1000px;
  display: flex;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #666;
  padding-bottom: 1rem;
  border-bottom: 0.5px solid #1a1a1a;
  margin-bottom: 3rem;
}
.f07-cover__title {
  font-family: "Bodoni Moda", serif;
  font-size: clamp(5rem, 15vw, 13rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  line-height: 0.85;
  margin-bottom: 1rem;
}
.f07-cover__tag {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1.25rem;
  color: #666;
  margin-bottom: 3rem;
}
.f07-cover__img-wrap {
  width: 100%;
  max-width: 700px;
  aspect-ratio: 4/5;
  overflow: hidden;
  margin-bottom: 3rem;
}
.f07-cover__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2) contrast(1.05);
}
.f07-cover__features {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  width: 100%;
  max-width: 700px;
  padding-top: 2rem;
  border-top: 0.5px solid #1a1a1a;
}
@media (min-width: 768px) { .f07-cover__features { grid-template-columns: repeat(3, 1fr); } }
.f07-cover__features > div {
  display: flex;
  align-items: baseline;
  gap: 1rem;
}
.f07-cover__features span {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f07-cover__features p {
  font-family: var(--font-headline);
  font-size: 1rem;
  font-style: italic;
}

/* 목차 */
.f07-toc {
  padding: 8rem 3rem;
  max-width: 900px;
  margin: 0 auto;
  border-bottom: 0.5px solid #1a1a1a;
}
.f07-toc__label {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  color: #999;
  margin-bottom: 1.25rem;
}
.f07-toc__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  margin-bottom: 4rem;
}
.f07-toc__list { display: flex; flex-direction: column; }
.f07-toc__item {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 3rem;
  padding: 2rem 0;
  border-top: 0.5px solid rgba(0,0,0,0.2);
  align-items: baseline;
}
.f07-toc__no {
  font-family: var(--font-headline);
  font-size: 0.875rem;
  font-style: italic;
  color: #999;
  min-width: 4rem;
}
.f07-toc__item h3 {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
.f07-toc__item p {
  font-size: 0.875rem;
  color: #666;
}

/* Feature */
.f07-feature {
  padding: 8rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
  border-bottom: 0.5px solid #1a1a1a;
}
.f07-feature__num {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 0.875rem;
  color: #999;
  margin-bottom: 0.5rem;
}
.f07-feature__label {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.35em;
  color: #999;
  margin-bottom: 2rem;
}
.f07-feature__title {
  font-family: var(--font-headline);
  font-size: clamp(2.75rem, 6vw, 5rem);
  font-weight: 400;
  letter-spacing: -0.025em;
  line-height: 1;
  margin-bottom: 2rem;
}
.f07-feature__title em {
  font-style: italic;
  color: #8b7437;
}
.f07-feature__dek {
  font-family: var(--font-headline);
  font-size: 1.125rem;
  font-style: italic;
  line-height: 1.7;
  color: #4a4a4a;
  max-width: 40rem;
  margin-bottom: 5rem;
}
.f07-feature__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem 3rem;
}
@media (min-width: 768px) { .f07-feature__grid { grid-template-columns: 1fr 1fr; } }

.f07-story { display: block; cursor: pointer; }
.f07-story__no {
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.3em;
  color: #999;
  margin-bottom: 1rem;
}
.f07-story__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  margin-bottom: 1.5rem;
}
.f07-story__img-wrap img {
  width: 100%; height: 100%;
  object-fit: cover;
  filter: grayscale(0.4);
  transition: filter 0.7s;
}
.f07-story:hover .f07-story__img-wrap img { filter: grayscale(0); }
.f07-story h3 {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
}
.f07-story__since {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 1rem;
}
.f07-story__excerpt {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 1rem;
  line-height: 1.7;
  color: #4a4a4a;
  margin-bottom: 1rem;
  padding-left: 1rem;
  border-left: 2px solid #8b7437;
}
.f07-story__more {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #1a1a1a;
  border-bottom: 0.5px solid #1a1a1a;
  padding-bottom: 4px;
}

/* Objects */
.f07-objects {
  padding: 8rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
  border-bottom: 0.5px solid #1a1a1a;
}
.f07-objects__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem 2rem;
  margin-top: 5rem;
}
@media (min-width: 768px) { .f07-objects__grid { grid-template-columns: repeat(4, 1fr); } }

.f07-obj { cursor: pointer; }
.f07-obj__no {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: 0.875rem;
  color: #999;
  display: block;
  margin-bottom: 0.75rem;
}
.f07-obj__img-wrap {
  aspect-ratio: 1/1;
  background: #f0ede6;
  padding: 2rem;
  margin-bottom: 1rem;
}
.f07-obj__img-wrap img {
  width: 100%; height: 100%;
  object-fit: contain;
}
.f07-obj h3 {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 400;
  line-height: 1.4;
  margin-bottom: 0.5rem;
}
.f07-obj__meta {
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.5rem;
}
.f07-obj__price {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 500;
}

/* 콜로폰 */
.f07-colophon {
  padding: 4rem 3rem;
  text-align: center;
}
.f07-colophon p {
  font-size: 0.625rem;
  letter-spacing: 0.3em;
  color: #666;
  margin-bottom: 0.5rem;
}
.f07-colophon__small { color: #999 !important; }
</style>
