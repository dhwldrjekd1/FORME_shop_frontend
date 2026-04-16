<template>
  <Forme32Layout>
    <!-- ═══ 히어로 ═══ -->
    <section class="bs-hero">
      <div class="bs-hero__bg"></div>
      <div class="bs-hero__content">
        <p class="bs-hero__tag">BRAND STORY</p>
        <h1 class="bs-hero__title">THE HERITAGE<br /><span>BRANDS</span></h1>
        <p class="bs-hero__desc">한 세기를 넘어 이어지는 네 브랜드의 이야기.</p>
      </div>
    </section>

    <!-- ═══ BRAND PROMOTION ═══ -->
    <section class="bs-promo">
      <header class="bs-sec-head">
        <p class="bs-sec-head__code">PROMOTION</p>
        <h2 class="bs-sec-head__title">BRAND PROMOTION</h2>
      </header>
      <div class="bs-promo__grid">
        <RouterLink
          v-for="b in promoPanels" :key="b.id" :to="b.route"
          class="bs-promo__card" :style="{ backgroundColor: b.bgColor }"
        >
          <div class="bs-promo__text">
            <p class="bs-promo__tag" :style="{ color: b.accentColor }">{{ b.tag }}</p>
            <h3>{{ b.title }}</h3>
            <p class="bs-promo__desc">{{ b.desc }}</p>
            <span class="bs-promo__cta">SHOP NOW →</span>
          </div>
          <div class="bs-promo__img">
            <img :src="b.image" :alt="b.title" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ 브랜드 타임라인 ═══ -->
    <section class="bs-timeline">
      <header class="bs-sec-head bs-sec-head--center">
        <p class="bs-sec-head__code">TIMELINE</p>
        <h2 class="bs-sec-head__title">브랜드 연대기</h2>
      </header>
      <div class="bs-timeline__track">
        <div v-for="(e, i) in timeline" :key="i" class="bs-tl" :class="{ 'bs-tl--right': i % 2 === 1 }">
          <div class="bs-tl__dot" :style="{ backgroundColor: e.color }"></div>
          <div class="bs-tl__year">{{ e.year }}</div>
          <div class="bs-tl__content">
            <span class="bs-tl__brand" :style="{ color: e.color }">{{ e.brand }}</span>
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══ 브랜드 철학 ═══ -->
    <section class="bs-philosophy">
      <header class="bs-sec-head bs-sec-head--center">
        <p class="bs-sec-head__code">PHILOSOPHY</p>
        <h2 class="bs-sec-head__title">브랜드 철학</h2>
      </header>
      <div class="bs-phil__grid">
        <div v-for="p in philosophies" :key="p.brand" class="bs-phil">
          <div class="bs-phil__icon" :style="{ backgroundColor: p.color }">
            <span class="material-symbols-outlined">{{ p.icon }}</span>
          </div>
          <h3 class="bs-phil__brand">{{ p.brand }}</h3>
          <p class="bs-phil__keyword">"{{ p.keyword }}"</p>
          <p class="bs-phil__text">{{ p.text }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ 비교 테이블 ═══ -->
    <section class="bs-compare">
      <header class="bs-sec-head bs-sec-head--center">
        <p class="bs-sec-head__code">COMPARE</p>
        <h2 class="bs-sec-head__title">브랜드 비교</h2>
      </header>
      <div class="bs-compare__wrap">
        <table class="bs-compare__table">
          <thead>
            <tr>
              <th></th>
              <th v-for="b in compareData" :key="b.brand"><span :style="{ color: b.color }">{{ b.brand }}</span></th>
            </tr>
          </thead>
          <tbody>
            <tr><td>설립</td><td v-for="b in compareData" :key="'y'+b.brand">{{ b.year }}</td></tr>
            <tr><td>원산지</td><td v-for="b in compareData" :key="'c'+b.brand">{{ b.origin }}</td></tr>
            <tr><td>스타일</td><td v-for="b in compareData" :key="'s'+b.brand">{{ b.style }}</td></tr>
            <tr><td>사이즈</td><td v-for="b in compareData" :key="'sz'+b.brand">{{ b.sizeSystem }}</td></tr>
            <tr><td>대표 아이템</td><td v-for="b in compareData" :key="'i'+b.brand">{{ b.iconic }}</td></tr>
            <tr><td>가격대</td><td v-for="b in compareData" :key="'p'+b.brand">{{ b.priceRange }}</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- ═══ Stories of Heritage ═══ -->
    <section class="bs-stories">
      <header class="bs-sec-head bs-sec-head--center">
        <p class="bs-sec-head__code">EDITORIAL</p>
        <h2 class="bs-sec-head__title">Stories of Heritage</h2>
      </header>
      <div class="bs-stories__grid">
        <article v-for="e in stories" :key="e.title" class="bs-story">
          <div class="bs-story__img-wrap">
            <img :src="e.img" :alt="e.title" />
          </div>
          <div class="bs-story__info">
            <p class="bs-story__cat">{{ e.cat }}</p>
            <h3>{{ e.title }}</h3>
            <p class="bs-story__excerpt">{{ e.excerpt }}</p>
          </div>
        </article>
      </div>
    </section>
  </Forme32Layout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import api from "@/api";

const promoPanels = [
  { id: 1, title: "BEANPOLE", tag: "HERITAGE", desc: "1989년 서울, 한국 클래식의 정수", route: "/beanpole", bgColor: "#103728", accentColor: "#C9A86B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S", tag: "DENIM ICON", desc: "1873년부터 이어진 데님의 역사", route: "/levis", bgColor: "#8E1C28", accentColor: "#FFD0D0", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES", tag: "WORK WEAR", desc: "100년 워크웨어의 산증인", route: "/dickies", bgColor: "#1A1A1A", accentColor: "#FFC72C", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", tag: "RUGGED", desc: "디트로이트에서 시작된 워크 클래식", route: "/carhartt", bgColor: "#9C4F18", accentColor: "#FFC72C", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];

const timeline = [
  { year: '1873', brand: "LEVI'S", color: '#8E1C28', title: '리벳 청바지 특허', desc: '제이콥 데이비스와 리바이 스트라우스가 리벳으로 보강한 작업 바지 특허를 취득. 데님의 역사가 시작되다.' },
  { year: '1889', brand: 'CARHARTT', color: '#9C4F18', title: '해밀턴 칼하트 창업', desc: '디트로이트에서 철도 노동자를 위한 작업복 제작 시작. "정직한 가치, 정직한 옷"의 철학으로 출발.' },
  { year: '1922', brand: 'DICKIES', color: '#1A1A1A', title: '포트워스에서 탄생', desc: '텍사스 포트워스에서 차량 커버 제조사로 시작. 이후 미국 산업 현장의 대표 유니폼 브랜드로 성장.' },
  { year: '1947', brand: "LEVI'S", color: '#8E1C28', title: '501 청바지 탄생', desc: '로트 번호 501이 공식 모델명이 되다. 이후 70년간 세계에서 가장 많이 팔린 청바지로 기록.' },
  { year: '1989', brand: 'BEANPOLE', color: '#103728', title: '빈폴 런칭', desc: '제일모직(현 삼성물산)에서 론칭. 자전거 로고와 함께 한국 트래디셔널 캐주얼의 새 장을 열다.' },
  { year: '2000', brand: 'CARHARTT', color: '#9C4F18', title: 'Carhartt WIP 론칭', desc: '유럽 스트리트웨어 시장 진출. 워크웨어의 기능성에 도시적 감성을 더하다.' },
  { year: '2020', brand: 'DICKIES', color: '#1A1A1A', title: '스트리트 아이콘', desc: '874 워크 팬츠가 전 세계 스트리트 패션의 필수 아이템으로 자리잡다.' },
  { year: '2026', brand: 'FORME', color: '#FF2D2D', title: 'FORME 오픈', desc: '네 브랜드의 헤리티지를 하나의 공간에서. The Best of Everything.' },
];

const philosophies = [
  { brand: 'BEANPOLE', color: '#103728', icon: 'park', keyword: '클래식의 정수', text: '유행을 따르지 않고 기준이 되는 옷. 35년간 한국 패션의 중심에서 단정한 실루엣과 정직한 소재의 가치를 지켜왔습니다.' },
  { brand: 'CARHARTT', color: '#9C4F18', icon: 'construction', keyword: '노동의 진정성', text: '거친 환경을 견디는 내구성, 실용적인 디자인. 패션을 넘어 삶의 도구가 되는 옷을 130년간 만들어왔습니다.' },
  { brand: "LEVI'S", color: '#8E1C28', icon: 'diamond', keyword: '데님의 원조', text: '리벳으로 시작된 혁신, 501로 완성된 아이콘. 150년 이상 유행이 아닌 문화를 만드는 브랜드입니다.' },
  { brand: 'DICKIES', color: '#1A1A1A', icon: 'handyman', keyword: '워크웨어의 표준', text: '작업복에서 시작해 스트리트의 아이콘이 된 브랜드. 견고함과 실용성의 가치를 100년간 증명합니다.' },
];

const compareData = [
  { brand: 'BEANPOLE', color: '#103728', year: '1989', origin: '서울, 한국', style: '트래디셔널 캐주얼', sizeSystem: 'KR (한국)', iconic: '자전거 로고 폴로', priceRange: '₩80,000~300,000' },
  { brand: 'CARHARTT', color: '#9C4F18', year: '1889', origin: '디트로이트, 미국', style: '워크웨어', sizeSystem: 'UK (영국)', iconic: '디트로이트 자켓', priceRange: '₩100,000~350,000' },
  { brand: "LEVI'S", color: '#8E1C28', year: '1873', origin: 'S.F., 미국', style: '데님/캐주얼', sizeSystem: 'EU (유럽)', iconic: '501 오리지널 진', priceRange: '₩80,000~250,000' },
  { brand: 'DICKIES', color: '#1A1A1A', year: '1922', origin: '포트워스, 미국', style: '인더스트리얼 워크웨어', sizeSystem: 'US (미국)', iconic: '874 워크 팬츠', priceRange: '₩50,000~200,000' },
];

const defaultStories = [
  { cat: "— ARCHIVE", title: "워크웨어, 노동의 미학", excerpt: "한 세기를 견뎌온 소재와 봉제. 시간이 만든 단단한 정직함.", img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "— STYLE", title: "2026, 절제의 봄", excerpt: "덜어낼수록 깊어지는 봄의 옷장.", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80" },
  { cat: "— BRAND STORY", title: "데님, 150년의 푸른 역사", excerpt: "광부의 옷에서 세기의 클래식이 되기까지.", img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&q=80" },
];
const stories = ref(defaultStories);
onMounted(async () => {
  try {
    const r = await api.get('/settings/stories');
    if (r?.value) { const parsed = JSON.parse(r.value); if (parsed?.length) stories.value = parsed; }
  } catch {}
});
</script>

<style scoped>
/* 히어로 */
.bs-hero { position: relative; height: 400px; overflow: hidden; display: flex; align-items: center; justify-content: center; }
.bs-hero__bg { position: absolute; inset: 0; background: linear-gradient(135deg, #111 0%, #333 50%, #111 100%); }
.bs-hero__content { position: relative; z-index: 2; text-align: center; color: #fff; }
.bs-hero__tag { font-size: 0.625rem; font-weight: 900; letter-spacing: 0.35em; color: #FF2D2D; margin-bottom: 1.5rem; }
.bs-hero__title { font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.25rem; }
.bs-hero__title span { color: #FF2D2D; }
.bs-hero__desc { font-size: 1rem; color: rgba(255,255,255,0.5); }

/* 섹션 헤더 */
.bs-sec-head { padding: 4rem 3rem 2rem; max-width: 1400px; margin: 0 auto; }
.bs-sec-head--center { text-align: center; }
.bs-sec-head__code { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 0.75rem; }
.bs-sec-head__title { font-size: clamp(1.75rem, 3vw, 2.5rem); font-weight: 900; letter-spacing: -0.02em; }

/* 프로모션 */
.bs-promo { padding: 0 3rem 4rem; }
.bs-promo__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; max-width: 1400px; margin: 0 auto; }
@media (max-width: 768px) { .bs-promo__grid { grid-template-columns: 1fr; } }
.bs-promo__card { display: grid; grid-template-columns: 1fr 1fr; overflow: hidden; color: #fff; text-decoration: none; transition: transform 0.3s, box-shadow 0.3s; border-radius: 0.5rem; }
.bs-promo__card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,0.15); }
.bs-promo__text { padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; }
.bs-promo__tag { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.25em; margin-bottom: 1rem; }
.bs-promo__text h3 { font-size: 1.75rem; font-weight: 900; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
.bs-promo__desc { font-size: 0.8125rem; opacity: 0.7; line-height: 1.6; margin-bottom: 1.5rem; }
.bs-promo__cta { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.2em; opacity: 0.8; }
.bs-promo__card:hover .bs-promo__cta { opacity: 1; }
.bs-promo__img { overflow: hidden; }
.bs-promo__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.bs-promo__card:hover .bs-promo__img img { transform: scale(1.05); }

/* 타임라인 */
.bs-timeline { padding: 0 3rem 5rem; }
.bs-timeline__track { position: relative; max-width: 800px; margin: 0 auto; padding-left: 2rem; border-left: 2px solid #eee; }
.bs-tl { position: relative; padding: 0 0 3rem 2rem; }
.bs-tl__dot { position: absolute; left: -2.5rem; top: 0.25rem; width: 1rem; height: 1rem; border-radius: 50%; border: 3px solid #fff; box-shadow: 0 0 0 2px #eee; }
.bs-tl__year { font-size: 0.625rem; font-weight: 900; letter-spacing: 0.2em; color: #bbb; margin-bottom: 0.5rem; }
.bs-tl__brand { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.15em; display: block; margin-bottom: 0.375rem; }
.bs-tl__content h3 { font-size: 1.125rem; font-weight: 800; margin-bottom: 0.5rem; }
.bs-tl__content p { font-size: 0.8125rem; color: #666; line-height: 1.7; }

/* 브랜드 철학 */
.bs-philosophy { padding: 0 3rem 5rem; }
.bs-phil__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem; max-width: 1400px; margin: 0 auto; }
@media (max-width: 768px) { .bs-phil__grid { grid-template-columns: repeat(2, 1fr); } }
.bs-phil { text-align: center; padding: 2rem 1.5rem; background: #fafaf8; border-radius: 0.5rem; }
.bs-phil__icon { width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem; }
.bs-phil__icon .material-symbols-outlined { font-size: 1.5rem; color: #fff; font-variation-settings: "wght" 300; }
.bs-phil__brand { font-size: 0.875rem; font-weight: 900; margin-bottom: 0.375rem; }
.bs-phil__keyword { font-size: 0.8125rem; color: #999; font-style: italic; margin-bottom: 1rem; }
.bs-phil__text { font-size: 0.75rem; color: #666; line-height: 1.7; }

/* 브랜드 비교 */
.bs-compare { padding: 0 3rem 5rem; }
.bs-compare__wrap { max-width: 1000px; margin: 0 auto; overflow-x: auto; }
.bs-compare__table { width: 100%; border-collapse: collapse; }
.bs-compare__table th { font-size: 0.75rem; font-weight: 900; padding: 1rem 0.75rem; border-bottom: 2px solid #111; text-align: center; }
.bs-compare__table td { font-size: 0.75rem; padding: 0.875rem 0.75rem; border-bottom: 1px solid #f0f0f0; text-align: center; color: #555; }
.bs-compare__table td:first-child { font-weight: 700; color: #111; text-align: left; width: 100px; }
.bs-compare__table tbody tr:hover { background: #fafaf8; }

/* 스토리 */
.bs-stories { padding: 0 3rem 6rem; border-top: 1px solid #eee; }
.bs-stories__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem; max-width: 1400px; margin: 0 auto; }
@media (max-width: 768px) { .bs-stories__grid { grid-template-columns: 1fr; } }
.bs-story { cursor: pointer; }
.bs-story__img-wrap { aspect-ratio: 4/5; overflow: hidden; margin-bottom: 1.25rem; border-radius: 0.375rem; }
.bs-story__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.3); transition: filter 0.5s, transform 0.5s; }
.bs-story:hover .bs-story__img-wrap img { filter: grayscale(0); transform: scale(1.03); }
.bs-story__cat { font-size: 0.625rem; font-weight: 500; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.75rem; }
.bs-story h3 { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.01em; line-height: 1.3; margin-bottom: 0.75rem; }
.bs-story__excerpt { font-size: 0.8125rem; color: #666; line-height: 1.7; }
</style>
