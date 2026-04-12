<template>
  <main class="page-wrapper f03-home">
    <!-- ── Hero: 분할 (이미지 + 큰 serif title) ── -->
    <section class="f03-hero">
      <div class="f03-hero__text">
        <p class="f03-hero__eyebrow">— FORME · SPRING 2026</p>
        <h1 class="f03-hero__title">FORME</h1>
        <p class="f03-hero__tagline">The Quiet <em>Refinement</em></p>
        <p class="f03-hero__desc">
          한 시즌을 지나, 한 시대를 살아남는 옷.<br />
          FORME는 시간이 흐를수록 깊어지는 가치를 큐레이션합니다.
        </p>
        <RouterLink to="/products" class="f03-hero__cta">
          <span>Explore Collection</span>
          <span class="material-symbols-outlined">arrow_forward</span>
        </RouterLink>
      </div>
      <div class="f03-hero__img-wrap">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&q=80"
          alt="hero"
          class="f03-hero__img"
        />
      </div>
    </section>

    <!-- ── 인용구 ── -->
    <section class="f03-quote">
      <p class="f03-quote__text">
        “옷을 고른다는 것은 결국 자기 자신을 정의하는 일입니다.”
      </p>
      <p class="f03-quote__author">— FORME EDITORIAL</p>
    </section>

    <!-- ── Premium Brands ── -->
    <section class="f03-brands">
      <header class="f03-section__head">
        <p class="f03-section__eyebrow">CURATED BRANDS</p>
        <h2 class="f03-section__title">FORME가 선택한 네 개의 헤리티지</h2>
      </header>
      <div class="f03-brands__grid">
        <RouterLink
          v-for="brand in brandPanels"
          :key="brand.id"
          :to="brand.route"
          class="f03-brand-card"
        >
          <div class="f03-brand-card__img-wrap">
            <img :src="brand.image" :alt="brand.title" class="f03-brand-card__img" />
          </div>
          <div class="f03-brand-card__info">
            <p class="f03-brand-card__since">{{ brand.since }}</p>
            <h3 class="f03-brand-card__name">{{ brand.title }}</h3>
            <p class="f03-brand-card__desc">{{ brand.desc }}</p>
            <span class="f03-brand-card__more">View Collection →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── Curator's Pick ── -->
    <section class="f03-curator">
      <div class="f03-curator__inner">
        <div class="f03-curator__text">
          <p class="f03-curator__eyebrow">CURATOR'S PICK</p>
          <h2 class="f03-curator__title">
            이번 주<br />
            <em>큐레이터의 선택</em>
          </h2>
          <p class="f03-curator__desc">
            FORME 큐레이터가 직접 입어보고 선별한 이번 주의 셀렉션.
            소재의 결, 봉제의 정성, 시간의 무게를 견디는 디자인을 우선합니다.
          </p>
          <RouterLink to="/products" class="f03-curator__link">
            전체 셀렉션 보기 →
          </RouterLink>
        </div>
        <div class="f03-curator__products">
          <RouterLink
            v-for="(p, i) in pickProducts"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="f03-pick"
            :class="`f03-pick--${i + 1}`"
          >
            <div class="f03-pick__img-wrap">
              <img :src="p.image" :alt="p.name" />
            </div>
            <div class="f03-pick__info">
              <span class="f03-pick__no">No. 0{{ i + 1 }}</span>
              <h3>{{ p.name }}</h3>
              <p>{{ formatPrice(p.price) }}원</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── Heritage Editorial ── -->
    <section class="f03-editorial">
      <header class="f03-section__head f03-section__head--center">
        <p class="f03-section__eyebrow">EDITORIAL</p>
        <h2 class="f03-section__title">Stories of Heritage</h2>
      </header>
      <div class="f03-editorial__grid">
        <article class="f03-edit">
          <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" alt="editorial" />
          <div class="f03-edit__text">
            <p class="f03-edit__cat">— ARCHIVE</p>
            <h3>워크웨어, 노동의 미학</h3>
            <p>한 세기를 견뎌온 소재와 봉제. 시간이 만든 단단한 정직함.</p>
          </div>
        </article>
        <article class="f03-edit">
          <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" alt="editorial" />
          <div class="f03-edit__text">
            <p class="f03-edit__cat">— STYLE</p>
            <h3>2026, 절제의 봄</h3>
            <p>덜어낼수록 깊어지는 봄의 옷장.</p>
          </div>
        </article>
        <article class="f03-edit">
          <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" alt="editorial" />
          <div class="f03-edit__text">
            <p class="f03-edit__cat">— BRAND STORY</p>
            <h3>데님, 150년의 푸른 역사</h3>
            <p>광부의 옷에서 세기의 클래식이 되기까지.</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ── Members Only ── -->
    <section class="f03-members">
      <div class="f03-members__inner">
        <p class="f03-members__eyebrow">MEMBERS ONLY</p>
        <h2 class="f03-members__title">FORME Membership</h2>
        <p class="f03-members__desc">
          멤버십 가입 시, 시즌 한정 큐레이션과 매거진을<br />
          가장 먼저 만나보실 수 있습니다.
        </p>
        <div class="f03-members__benefits">
          <div class="f03-benefit">
            <span class="material-symbols-outlined">star</span>
            <h4>EXCLUSIVE</h4>
            <p>회원 전용 큐레이션</p>
          </div>
          <div class="f03-benefit">
            <span class="material-symbols-outlined">local_shipping</span>
            <h4>FREE SHIPPING</h4>
            <p>전 상품 무료 배송</p>
          </div>
          <div class="f03-benefit">
            <span class="material-symbols-outlined">redeem</span>
            <h4>REWARDS</h4>
            <p>등급별 리워드 적립</p>
          </div>
        </div>
        <RouterLink to="/signup" class="f03-members__cta">
          Join FORME
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

onMounted(() => productStore.fetchProducts());

const pickProducts = computed(() => products.value.slice(0, 4));

function formatPrice(price) {
  return price ? price.toLocaleString() : "";
}

const brandPanels = [
  { id: 1, title: "BEANPOLE", since: "EST. 1989 / SEOUL",        desc: "한국 클래식의 정수, 시간을 닮은 단정함",     route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   since: "EST. 1873 / SAN FRANCISCO", desc: "데님이 곧 문화가 된 150년의 헤리티지",       route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  since: "EST. 1922 / FORT WORTH",   desc: "한 세기를 함께한 진짜 워크웨어의 산증인",   route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", since: "EST. 1889 / DETROIT",      desc: "디트로이트의 정직함, 손끝까지 단단한 미국", route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 03 — Premium Heritage (더현대·LF몰 톤)
   - 정제된 톤, 큰 serif typography
   - 컬러: 화이트 + 베이지 + 다크 네이비
   - 매거진 카드, 절제된 컬러
   ════════════════════════════════ */
.f03-home {
  background-color: #faf8f4;
  font-family: var(--font-body);
  color: #1a1a1a;
}

/* ── Hero ── */
.f03-hero {
  display: grid;
  grid-template-columns: 1fr;
  min-height: calc(100dvh - var(--header-height));
  background: #faf8f4;
}
@media (min-width: 1024px) {
  .f03-hero { grid-template-columns: 1fr 1fr; }
}

.f03-hero__text {
  padding: 6rem 5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f03-hero__eyebrow {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 2rem;
}
.f03-hero__title {
  font-family: "Italiana", serif;
  font-size: clamp(5rem, 12vw, 10rem);
  font-weight: 400;
  letter-spacing: 0.05em;
  line-height: 0.95;
  color: #1a1a1a;
  margin-bottom: 1rem;
}
.f03-hero__tagline {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 300;
  color: #5c5c5c;
  margin-bottom: 2.5rem;
  letter-spacing: 0.01em;
}
.f03-hero__tagline em {
  font-style: italic;
  color: #8b7437;
}
.f03-hero__desc {
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.85;
  color: #5c5c5c;
  margin-bottom: 3rem;
  max-width: 28rem;
}
.f03-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  width: fit-content;
  padding: 1.125rem 2.5rem;
  background: transparent;
  color: #1a1a1a;
  border: 0.5px solid #1a1a1a;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  transition: background 0.3s, color 0.3s;
}
.f03-hero__cta:hover {
  background: #1a1a1a;
  color: #faf8f4;
}
.f03-hero__cta .material-symbols-outlined {
  font-size: 1rem;
  font-variation-settings: "wght" 300;
}

.f03-hero__img-wrap {
  overflow: hidden;
  min-height: 480px;
}
.f03-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.2);
}

/* ── 인용구 ── */
.f03-quote {
  padding: 6rem 3rem;
  text-align: center;
  background: #faf8f4;
  border-top: 0.5px solid rgba(0,0,0,0.08);
  border-bottom: 0.5px solid rgba(0,0,0,0.08);
}
.f03-quote__text {
  font-family: var(--font-headline);
  font-style: italic;
  font-size: clamp(1.5rem, 3.5vw, 2.5rem);
  font-weight: 300;
  letter-spacing: -0.01em;
  line-height: 1.4;
  color: #1a1a1a;
  max-width: 50rem;
  margin: 0 auto 2rem;
}
.f03-quote__author {
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  color: #8b7437;
}

/* ── Section Head 공통 ── */
.f03-section__head {
  margin-bottom: 4rem;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}
.f03-section__head--center { text-align: center; }
.f03-section__eyebrow {
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 1rem;
}
.f03-section__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3rem);
  font-weight: 400;
  letter-spacing: -0.02em;
  line-height: 1.1;
  color: #1a1a1a;
}

/* ── Brands ── */
.f03-brands {
  padding: 8rem 5rem;
  background: #ffffff;
}
.f03-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f03-brands__grid { grid-template-columns: 1fr 1fr; } }

.f03-brand-card {
  display: block;
  cursor: pointer;
}
.f03-brand-card__img-wrap {
  aspect-ratio: 16/10;
  overflow: hidden;
  margin-bottom: 1.75rem;
  background: #f5f3ee;
}
.f03-brand-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.3);
  transition: transform 0.8s, filter 0.6s;
}
.f03-brand-card:hover .f03-brand-card__img {
  transform: scale(1.04);
  filter: grayscale(0);
}
.f03-brand-card__since {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 0.625rem;
}
.f03-brand-card__name {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  margin-bottom: 0.875rem;
}
.f03-brand-card__desc {
  font-size: 0.875rem;
  color: #5c5c5c;
  line-height: 1.7;
  margin-bottom: 1rem;
}
.f03-brand-card__more {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #1a1a1a;
  border-bottom: 0.5px solid #1a1a1a;
  padding-bottom: 4px;
}

/* ── Curator's Pick ── */
.f03-curator {
  padding: 8rem 5rem;
  background: #1a1a1a;
  color: #faf8f4;
}
.f03-curator__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 1024px) {
  .f03-curator__inner { grid-template-columns: 1fr 1.5fr; }
}

.f03-curator__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f03-curator__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #c9a86b;
  margin-bottom: 1.25rem;
}
.f03-curator__title {
  font-family: var(--font-headline);
  font-size: clamp(2.25rem, 4vw, 3.25rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  line-height: 1.1;
  margin-bottom: 1.75rem;
}
.f03-curator__title em {
  font-style: italic;
  color: #c9a86b;
}
.f03-curator__desc {
  font-size: 0.9375rem;
  line-height: 1.85;
  opacity: 0.7;
  max-width: 26rem;
  margin-bottom: 2rem;
}
.f03-curator__link {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #c9a86b;
  border-bottom: 0.5px solid #c9a86b;
  padding-bottom: 4px;
  width: fit-content;
}

.f03-curator__products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
.f03-pick {
  display: block;
  cursor: pointer;
}
.f03-pick__img-wrap {
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #2a2a2a;
  margin-bottom: 1rem;
}
.f03-pick img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.4);
  transition: transform 0.7s, filter 0.5s;
}
.f03-pick:hover img {
  transform: scale(1.04);
  filter: grayscale(0);
}
.f03-pick__no {
  font-size: 0.625rem;
  letter-spacing: 0.25em;
  color: #c9a86b;
  display: block;
  margin-bottom: 0.5rem;
}
.f03-pick__info h3 {
  font-family: var(--font-headline);
  font-size: 0.9375rem;
  font-weight: 400;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f03-pick__info p {
  font-size: 0.8125rem;
  font-weight: 500;
  opacity: 0.8;
}

/* ── Editorial ── */
.f03-editorial {
  padding: 8rem 5rem;
  background: #faf8f4;
}
.f03-editorial__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f03-editorial__grid { grid-template-columns: repeat(3, 1fr); } }

.f03-edit {
  cursor: pointer;
}
.f03-edit img {
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  margin-bottom: 1.5rem;
  filter: grayscale(0.3);
  transition: filter 0.5s;
}
.f03-edit:hover img { filter: grayscale(0); }
.f03-edit__cat {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 0.875rem;
}
.f03-edit__text h3 {
  font-family: var(--font-headline);
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: -0.01em;
  line-height: 1.3;
  margin-bottom: 0.875rem;
}
.f03-edit__text p {
  font-size: 0.875rem;
  color: #5c5c5c;
  line-height: 1.7;
}

/* ── Members Only ── */
.f03-members {
  padding: 8rem 3rem;
  background: linear-gradient(180deg, #f5f3ee 0%, #faf8f4 100%);
  text-align: center;
}
.f03-members__inner { max-width: 64rem; margin: 0 auto; }
.f03-members__eyebrow {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  color: #8b7437;
  margin-bottom: 1.25rem;
}
.f03-members__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 300;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.f03-members__desc {
  font-size: 1rem;
  line-height: 1.85;
  color: #5c5c5c;
  margin-bottom: 4rem;
}
.f03-members__benefits {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}
@media (min-width: 768px) { .f03-members__benefits { grid-template-columns: repeat(3, 1fr); } }

.f03-benefit .material-symbols-outlined {
  font-size: 2.25rem;
  color: #c9a86b;
  font-variation-settings: "wght" 200;
  margin-bottom: 1.25rem;
}
.f03-benefit h4 {
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  margin-bottom: 0.75rem;
}
.f03-benefit p {
  font-size: 0.875rem;
  color: #5c5c5c;
}

.f03-members__cta {
  display: inline-block;
  padding: 1.25rem 4rem;
  background: #1a1a1a;
  color: #faf8f4;
  font-family: var(--font-body);
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  transition: background 0.3s;
}
.f03-members__cta:hover { background: #c9a86b; }
</style>
