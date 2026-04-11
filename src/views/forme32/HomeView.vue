<template>
  <main class="f32">
    <!-- ═══ 헤더 ═══ -->
    <header class="f32-topbar">
      <div class="f32-topbar__main">
        <div></div>
        <div class="f32-topbar__logo">FORME</div>
        <div class="f32-topbar__right">
          <span class="material-symbols-outlined f32-topbar__mi">search</span>
          <span class="material-symbols-outlined f32-topbar__mi">favorite_border</span>
          <span class="material-symbols-outlined f32-topbar__mi">person_outline</span>
          <span class="material-symbols-outlined f32-topbar__mi">shopping_bag</span>
        </div>
      </div>
      <nav class="f32-catnav">
        <a class="f32-catnav__link f32-catnav__link--active">ALL</a>
        <a class="f32-catnav__link">NEW</a>
        <a class="f32-catnav__link">BEST</a>
        <RouterLink to="/beanpole" class="f32-catnav__link">BEANPOLE</RouterLink>
        <RouterLink to="/carhartt" class="f32-catnav__link">CARHARTT</RouterLink>
        <RouterLink to="/levis" class="f32-catnav__link">LEVI'S</RouterLink>
        <RouterLink to="/dickies" class="f32-catnav__link">DICKIES</RouterLink>
        <a class="f32-catnav__link f32-catnav__link--sale">SALE</a>
      </nav>
    </header>

    <!-- ═══ Hero (10장 슬라이드) ═══ -->
    <section class="f32-hero">
      <img :src="heroSlides[heroIndex].url" :alt="heroSlides[heroIndex].alt" class="f32-hero__bg" :key="heroIndex" />
      <div class="f32-hero__overlay"></div>
      <div class="f32-hero__content">
        <p class="f32-hero__tag">2026 SPRING COLLECTION</p>
        <h1 class="f32-hero__title">NEW SEASON,<br />NEW <span>FORME</span>.</h1>
        <p class="f32-hero__desc">네 개의 헤리티지 브랜드로 완성하는 올봄의 옷장.</p>
        <div class="f32-hero__cta-group">
          <RouterLink to="/products" class="f32-hero__cta">SHOP NOW</RouterLink>
          <RouterLink to="/signup" class="f32-hero__cta f32-hero__cta--outline">JOIN</RouterLink>
        </div>
      </div>
      <!-- 좌/우 화살표 -->
      <button class="f32-hero__arrow f32-hero__arrow--left" @click="prevHero" aria-label="이전">‹</button>
      <button class="f32-hero__arrow f32-hero__arrow--right" @click="nextHero" aria-label="다음">›</button>
      <!-- 카운터 + 프로그레스 바 -->
      <div class="f32-hero__bottom-bar">
        <div class="f32-hero__counter">
          <strong>{{ String(heroIndex + 1).padStart(2, '0') }}</strong>
          <span> / {{ heroSlides.length }}</span>
        </div>
        <div class="f32-hero__progress">
          <div class="f32-hero__progress-fill" :style="{ width: ((heroIndex + 1) / heroSlides.length * 100) + '%' }"></div>
        </div>
        <div class="f32-hero__label">{{ heroSlides[heroIndex].alt }}</div>
      </div>
    </section>

    <!-- ═══ OUR TEAM ═══ -->
    <section class="f32-team">
      <header class="f32-sec-head">
        <div>
          <p class="f32-sec-head__code">BRAND</p>
          <h2 class="f32-sec-head__title">OUR TEAM</h2>
        </div>
        <RouterLink to="/products" class="f32-sec-head__more">전체보기 →</RouterLink>
      </header>
      <div class="f32-team__grid">
        <RouterLink v-for="(b, i) in brands" :key="b.id" :to="b.route" class="f32-brand">
          <div class="f32-brand__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f32-brand__hover"><span>VIEW MORE →</span></div>
            <div class="f32-brand__number">0{{ i + 1 }}</div>
          </div>
          <div class="f32-brand__stripe" :style="{ backgroundColor: b.color }"></div>
          <div class="f32-brand__info">
            <div class="f32-brand__top">
              <h3>{{ b.name }}</h3>
              <span class="f32-brand__year">{{ b.year }}</span>
            </div>
            <p class="f32-brand__desc">{{ b.desc }}</p>
            <div class="f32-brand__meta">
              <span>{{ b.items }} items</span>
              <span>★ {{ b.rating }}</span>
              <span>{{ b.city }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Curator's Pick (다크) ═══ -->
    <section class="f32-curator">
      <div class="f32-curator__inner">
        <div class="f32-curator__text">
          <p class="f32-curator__eyebrow">CURATOR'S PICK</p>
          <h2 class="f32-curator__title">이번 주<br /><em>큐레이터의 선택</em></h2>
          <p class="f32-curator__desc">
            FORME 큐레이터가 직접 입어보고 선별한 이번 주의 셀렉션.
            소재의 결, 봉제의 정성, 시간의 무게를 견디는 디자인을 우선합니다.
          </p>
          <RouterLink to="/products" class="f32-curator__link">전체 셀렉션 보기 →</RouterLink>
        </div>
        <div class="f32-curator__products">
          <RouterLink v-for="(p, i) in curatorPicks" :key="p.id" :to="`/products/${p.id}`" class="f32-pick">
            <div class="f32-pick__img-wrap"><img :src="p.img" :alt="p.name" /></div>
            <div class="f32-pick__info">
              <span class="f32-pick__no">No. 0{{ i + 1 }}</span>
              <h3>{{ p.name }}</h3>
              <p class="f32-pick__brand">{{ p.brand }}</p>
              <p class="f32-pick__price">₩ {{ p.price }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ 매거진 ═══ -->
    <section class="f32-editorial">
      <header class="f32-sec-head">
        <div>
          <p class="f32-sec-head__code">MAGAZINE</p>
          <h2 class="f32-sec-head__title">매거진</h2>
        </div>
      </header>
      <div class="f32-editorial__grid">
        <article v-for="m in magazine" :key="m.title" class="f32-mag" :class="{ 'f32-mag--lg': m.lg }">
          <img :src="m.img" :alt="m.title" />
          <div class="f32-mag__text">
            <p class="f32-mag__cat">{{ m.cat }}</p>
            <h3>{{ m.title }}</h3>
            <p v-if="m.excerpt" class="f32-mag__excerpt">{{ m.excerpt }}</p>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ 푸터 ═══ -->
    <footer class="f32-foot">
      <div class="f32-foot__top">
        <div class="f32-foot__brand">
          <h3 class="f32-foot__logo">FORME</h3>
          <p class="f32-foot__slogan">The Best of Everything.</p>
        </div>
        <div class="f32-foot__grid">
          <div class="f32-foot__col">
            <h4>SERVICE</h4>
            <a>배송안내</a><a>교환·반품</a><a>사이즈 가이드</a>
          </div>
          <div class="f32-foot__col">
            <h4>SUPPORT</h4>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">Q&A</RouterLink>
            <a>고객센터 1588-0000</a>
          </div>
          <div class="f32-foot__col">
            <h4>ABOUT</h4>
            <a>브랜드 스토리</a><a>입점 문의</a><a>채용</a>
          </div>
        </div>
      </div>
      <div class="f32-foot__bottom">
        <p>(주)FORME | 대표 김보경 | 사업자등록번호 000-00-00000</p>
        <p>서울특별시 강남구 테헤란로 000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

// ── Hero 슬라이드 50장 (4K 최대화질 w=3840&q=100) ──
// 모든 ID는 Unsplash에서 검증된 인기 사진 (조회수 높은 순)
const heroSlides = [
  // ── 01~10: 매장 · 공간 ──
  { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=3840&q=100", alt: "01 — 따뜻한 매장 인테리어" },
  { url: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=3840&q=100", alt: "02 — 부티크 옷가게" },
  { url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=3840&q=100", alt: "03 — 행거에 걸린 옷" },
  { url: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=3840&q=100", alt: "04 — 쇼핑백 디스플레이" },
  { url: "https://images.unsplash.com/photo-1528698827591-e19cef1a992c?w=3840&q=100", alt: "05 — 미니멀 옷장" },
  { url: "https://images.unsplash.com/photo-1481437156560-3205f6a55acc?w=3840&q=100", alt: "06 — 빈티지 행거" },
  { url: "https://images.unsplash.com/photo-1604176354204-9268737828e4?w=3840&q=100", alt: "07 — 모던 쇼룸" },
  { url: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=3840&q=100", alt: "08 — 깔끔한 진열" },
  { url: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=3840&q=100", alt: "09 — 슈즈 디스플레이" },
  { url: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=3840&q=100", alt: "10 — 거리 편집샵" },

  // ── 11~20: 모델 · 스트릿 ──
  { url: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=3840&q=100", alt: "11 — 패션 포트레이트" },
  { url: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=3840&q=100", alt: "12 — 런웨이 워킹" },
  { url: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=3840&q=100", alt: "13 — 그룹 스트릿" },
  { url: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=3840&q=100", alt: "14 — 쇼핑 라이프스타일" },
  { url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=3840&q=100", alt: "15 — 모델 블랙 앤 화이트" },
  { url: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=3840&q=100", alt: "16 — 도시 패션" },
  { url: "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=3840&q=100", alt: "17 — 캐주얼 스타일" },
  { url: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=3840&q=100", alt: "18 — 패션 런웨이 2" },
  { url: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=3840&q=100", alt: "19 — 패션 모델 아웃도어" },
  { url: "https://images.unsplash.com/photo-1475180098004-ca77a66827be?w=3840&q=100", alt: "20 — 레트로 스타일" },

  // ── 21~30: 제품 · 플랫레이 ──
  { url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=3840&q=100", alt: "21 — 접힌 셔츠 스택" },
  { url: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=3840&q=100", alt: "22 — 흰 셔츠 클로즈업" },
  { url: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=3840&q=100", alt: "23 — 티셔츠 컬러 모음" },
  { url: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=3840&q=100", alt: "24 — 캐주얼 플랫레이" },
  { url: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=3840&q=100", alt: "25 — 옷장 패션" },
  { url: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=3840&q=100", alt: "26 — 스트릿 착장" },
  { url: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=3840&q=100", alt: "27 — 미니멀 행거" },
  { url: "https://images.unsplash.com/photo-1564859228273-274232fdb516?w=3840&q=100", alt: "28 — 접힌 청바지" },
  { url: "https://images.unsplash.com/photo-1560243563-062bfc001d68?w=3840&q=100", alt: "29 — 옷걸이 라인업" },
  { url: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=3840&q=100", alt: "30 — 자연광 패션" },

  // ── 31~40: 데님 · 소재 · 디테일 ──
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=3840&q=100", alt: "31 — 데님 질감" },
  { url: "https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=3840&q=100", alt: "32 — 데님 바느질" },
  { url: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=3840&q=100", alt: "33 — 원단 롤" },
  { url: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=3840&q=100", alt: "34 — 면 소재" },
  { url: "https://images.unsplash.com/photo-1434389677669-e08b4cda3a7a?w=3840&q=100", alt: "35 — 가죽 디테일" },
  { url: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?w=3840&q=100", alt: "36 — 단추 클로즈업" },
  { url: "https://images.unsplash.com/photo-1467043237213-65f2da53396f?w=3840&q=100", alt: "37 — 워크웨어 텍스처" },
  { url: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=3840&q=100", alt: "38 — 후드 디테일" },
  { url: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=3840&q=100", alt: "39 — 재킷 텍스처" },
  { url: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=3840&q=100", alt: "40 — 니트 클로즈업" },

  // ── 41~50: 분위기 · 무드 ──
  { url: "https://images.unsplash.com/photo-1504198453319-5ce911bafcde?w=3840&q=100", alt: "41 — 일몰 실루엣" },
  { url: "https://images.unsplash.com/photo-1519235106695-a1fca4a12bd9?w=3840&q=100", alt: "42 — 도시 일상" },
  { url: "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?w=3840&q=100", alt: "43 — 자연 속 패션" },
  { url: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=3840&q=100", alt: "44 — 해변 스타일" },
  { url: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?w=3840&q=100", alt: "45 — 카페 스타일" },
  { url: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=3840&q=100", alt: "46 — 스니커즈 포인트" },
  { url: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=3840&q=100", alt: "47 — 운동화 클로즈업" },
  { url: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=3840&q=100", alt: "48 — 슈즈 컬렉션" },
  { url: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=3840&q=100", alt: "49 — 패션 에디토리얼" },
  { url: "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=3840&q=100", alt: "50 — 컬러풀 행거" },
];
const heroIndex = ref(0);

function nextHero() {
  heroIndex.value = (heroIndex.value + 1) % heroSlides.length;
}
function prevHero() {
  heroIndex.value = (heroIndex.value - 1 + heroSlides.length) % heroSlides.length;
}

let heroTimer = null;
onMounted(() => {
  heroTimer = setInterval(nextHero, 6000);
});
onUnmounted(() => {
  if (heroTimer) clearInterval(heroTimer);
});

const quickCats = [
  { name: "전체", icon: "🏠" }, { name: "신상", icon: "🆕" }, { name: "상의", icon: "👕" },
  { name: "하의", icon: "👖" }, { name: "데님", icon: "🧵" }, { name: "FAQ", icon: "❓" }, { name: "Q&A", icon: "💬" },
];
const brands = [
  { id: 1, name: "BEANPOLE", year: "1989", city: "Seoul",         desc: "한국 클래식의 정수",  color: "#103728", items: 142, rating: 4.7, route: "/beanpole", img: "/main1.jpg" },
  { id: 2, name: "CARHARTT", year: "1889", city: "Detroit",       desc: "디트로이트 워크웨어", color: "#9C4F18", items: 98,  rating: 4.8, route: "/carhartt", img: "/main2.jpg" },
  { id: 3, name: "LEVI'S",   year: "1873", city: "San Francisco", desc: "150년 데님 헤리티지", color: "#8E1C28", items: 215, rating: 4.9, route: "/levis",    img: "/main3.jpg" },
  { id: 4, name: "DICKIES",  year: "1922", city: "Fort Worth",    desc: "한 세기 워크웨어",    color: "#1A1A1A", items: 87,  rating: 4.6, route: "/dickies",  img: "/main4.jpg" },
];
const curatorPicks = [
  { id: 404, brand: "Beanpole", name: "헤리티지 칼라넥 티셔츠",    price: "159,000", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 201, brand: "Levi's",   name: "555™ 릴렉스 스트레이트 진", price: "159,000", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 103, brand: "Carhartt", name: "B01 더블프런트 트라우저",   price: "209,000", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 301, brand: "Dickies",  name: "카펜터 유틸리티 데님 팬츠", price: "105,000", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const magazine = [
  { cat: "STYLE GUIDE", title: "봄을 입는 가장 쉬운 방법", excerpt: "칼하트 워크웨어부터 빈폴 클래식까지.", lg: true,  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "LOOKBOOK",    title: "2026 SS Collection",        excerpt: null,                                  lg: false, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { cat: "BRAND STORY", title: "워크웨어의 정직함",          excerpt: null,                                  lg: false, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
];
</script>

<style scoped>
.f32 { background: #fff; color: #111; font-family: 'Noto Sans KR', -apple-system, sans-serif; min-height: 100dvh; }

/* 헤더 */
.f32-topbar { position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border-bottom: 1px solid #eee; }
.f32-topbar__main { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; padding: 0.875rem 2.5rem; }
.f32-topbar__logo { font-size: 1.625rem; font-weight: 900; letter-spacing: -0.03em; color: #111; text-align: center; }
.f32-topbar__right { display: flex; align-items: center; justify-content: flex-end; gap: 1.25rem; }
.f32-topbar__mi { font-size: 1.25rem; color: #FF2D2D; cursor: pointer; font-variation-settings: "wght" 300; transition: color 0.2s; }
.f32-topbar__mi:hover { color: #111; }
.f32-catnav { display: flex; justify-content: center; gap: 0; border-top: 1px solid #eee; }
.f32-catnav__link { padding: 0.875rem 1.5rem; font-size: 0.8125rem; font-weight: 700; letter-spacing: 0.05em; color: #333; border-bottom: 2px solid transparent; cursor: pointer; transition: all 0.2s; }
.f32-catnav__link:hover { border-bottom-color: #111; }
.f32-catnav__link--active { color: #111; border-bottom-color: #111; }
.f32-catnav__link--sale { color: #FF2D2D; }

/* Hero */
.f32-hero { position: relative; height: calc(100dvh - 92px); overflow: hidden; }
.f32-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
.f32-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%); }
.f32-hero__content { position: relative; z-index: 2; padding: 0 0 6rem 5rem; color: #fff; max-width: 40rem; display: flex; flex-direction: column; justify-content: flex-end; min-height: 100%; }
.f32-hero__tag { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 1.5rem; }
.f32-hero__title { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.5rem; }
.f32-hero__title span { color: #FF2D2D; }
.f32-hero__desc { font-size: 1rem; opacity: 0.85; margin-bottom: 2.5rem; }
.f32-hero__cta-group { display: flex; gap: 0.75rem; }
.f32-hero__cta { display: inline-block; background: #fff; color: #111; padding: 1.125rem 2.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; transition: all 0.25s; }
.f32-hero__cta:hover { background: #FF2D2D; color: #fff; }
.f32-hero__cta--outline { background: transparent; border: 1px solid rgba(255,255,255,0.5); color: #fff; }
.f32-hero__cta--outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }

/* Hero 화살표 */
.f32-hero__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  backdrop-filter: blur(4px);
  border: none;
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
  transition: background 0.2s;
}
.f32-hero__arrow:hover { background: rgba(0, 0, 0, 0.6); }
.f32-hero__arrow--left { left: 1.5rem; }
.f32-hero__arrow--right { right: 1.5rem; }

/* Hero 하단 바 (카운터 + 프로그레스 + 라벨) */
.f32-hero__bottom-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.25rem 2.5rem;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
}
.f32-hero__counter {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
  min-width: 4rem;
}
.f32-hero__counter strong {
  font-size: 1.375rem;
  color: #fff;
  letter-spacing: -0.02em;
}
.f32-hero__progress {
  flex: 1;
  height: 2px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 1px;
  overflow: hidden;
}
.f32-hero__progress-fill {
  height: 100%;
  background: #FF2D2D;
  transition: width 0.4s ease;
}
.f32-hero__label {
  font-size: 0.6875rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
}

/* Hero 이미지 전환 */
.f32-hero__bg {
  transition: opacity 0.6s ease;
}

/* Quick Bar */
.f32-quickbar { display: flex; justify-content: center; gap: 3rem; padding: 2rem; border-bottom: 1px solid #eee; flex-wrap: wrap; }
.f32-quickbar__item { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; font-size: 0.75rem; font-weight: 600; color: #111; cursor: pointer; transition: color 0.2s; }
.f32-quickbar__item:hover { color: #FF2D2D; }
.f32-quickbar__icon { font-size: 1.5rem; }

/* Section Head */
.f32-sec-head { display: flex; justify-content: space-between; align-items: flex-end; padding: 5rem 3rem 2.5rem; max-width: 1600px; margin: 0 auto; flex-wrap: wrap; gap: 1.5rem; }
.f32-sec-head__code { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.5rem; }
.f32-sec-head__title { font-size: clamp(1.75rem, 3vw, 2.25rem); font-weight: 900; letter-spacing: -0.02em; }
.f32-sec-head__more { font-size: 0.75rem; font-weight: 700; color: #111; border-bottom: 1px solid #111; padding-bottom: 3px; }

/* OUR TEAM */
.f32-team { border-top: 1px solid #f0f0f0; padding-bottom: 5rem; }
.f32-team__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f32-brand { position: relative; overflow: hidden; color: inherit; border: 1px solid #eee; margin: -0.5px; transition: border-color 0.3s; }
.f32-brand:hover { border-color: #FF2D2D; }
.f32-brand__img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.f32-brand__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.5); transition: filter 0.6s, transform 0.6s; }
.f32-brand:hover .f32-brand__img-wrap img { filter: grayscale(0); transform: scale(1.04); }
.f32-brand__hover { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.65); opacity: 0; transition: opacity 0.3s; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; color: #fff; }
.f32-brand:hover .f32-brand__hover { opacity: 1; }
.f32-brand__number { position: absolute; top: 1rem; left: 1rem; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px); padding: 0.375rem 0.625rem; font-size: 1rem; font-weight: 900; color: #FF2D2D; z-index: 2; }
.f32-brand__stripe { height: 6px; }
.f32-brand__info { padding: 1.5rem; }
.f32-brand__top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem; }
.f32-brand__top h3 { font-size: 1.25rem; font-weight: 900; }
.f32-brand__year { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #999; }
.f32-brand__desc { font-size: 0.8125rem; color: #999; line-height: 1.5; margin-bottom: 1rem; }
.f32-brand__meta { display: flex; gap: 1rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; }

/* Curator's Pick */
.f32-curator { padding: 8rem 0; background: #1a1a1a; color: #faf8f4; }
.f32-curator__inner { display: grid; grid-template-columns: 1fr 1.8fr; gap: 4rem; max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
.f32-curator__text { display: flex; flex-direction: column; justify-content: center; }
.f32-curator__eyebrow { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.3em; color: #c9a86b; margin-bottom: 1.25rem; }
.f32-curator__title { font-family: var(--font-headline); font-size: clamp(2.25rem, 4vw, 3.25rem); font-weight: 300; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1.75rem; }
.f32-curator__title em { font-style: italic; color: #c9a86b; }
.f32-curator__desc { font-size: 0.9375rem; line-height: 1.85; opacity: 0.7; max-width: 26rem; margin-bottom: 2rem; }
.f32-curator__link { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a86b; border-bottom: 0.5px solid #c9a86b; padding-bottom: 4px; width: fit-content; }
.f32-curator__products { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.f32-pick { color: inherit; cursor: pointer; }
.f32-pick__img-wrap { aspect-ratio: 3/4; overflow: hidden; background: #2a2a2a; margin-bottom: 1rem; }
.f32-pick__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.4); transition: transform 0.7s, filter 0.5s; }
.f32-pick:hover .f32-pick__img-wrap img { transform: scale(1.04); filter: grayscale(0); }
.f32-pick__no { font-size: 0.625rem; letter-spacing: 0.25em; color: #c9a86b; display: block; margin-bottom: 0.5rem; }
.f32-pick__info h3 { font-family: var(--font-headline); font-size: 0.9375rem; font-weight: 400; margin-bottom: 0.375rem; line-height: 1.4; }
.f32-pick__brand { font-size: 0.625rem; letter-spacing: 0.15em; color: #c9a86b; margin-bottom: 0.5rem; }
.f32-pick__price { font-size: 0.8125rem; font-weight: 500; opacity: 0.8; }

/* 매거진 */
.f32-editorial { border-top: 1px solid #f0f0f0; padding-bottom: 6rem; }
.f32-editorial__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f32-mag { position: relative; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
.f32-mag--lg { grid-row: span 1; aspect-ratio: auto; }
.f32-mag img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
.f32-mag:hover img { transform: scale(1.05); }
.f32-mag__text { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); color: #fff; }
.f32-mag__cat { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.5rem; }
.f32-mag__text h3 { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.01em; margin-bottom: 0.5rem; }
.f32-mag__excerpt { font-size: 0.8125rem; opacity: 0.8; line-height: 1.5; }

/* 푸터 */
.f32-foot { background: #111; color: #f5f5f5; padding: 5rem 3rem 2rem; }
.f32-foot__top { display: grid; grid-template-columns: 1.5fr 3fr; gap: 4rem; max-width: 1600px; margin: 0 auto 3rem; padding-bottom: 3rem; border-bottom: 1px solid #333; }
.f32-foot__logo { font-size: 2.25rem; font-weight: 900; letter-spacing: -0.03em; margin-bottom: 0.75rem; }
.f32-foot__slogan { font-size: 0.75rem; color: #888; }
.f32-foot__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.f32-foot__col h4 { font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 1rem; color: #FF2D2D; }
.f32-foot__col a { display: block; font-size: 0.6875rem; color: #ccc; margin-bottom: 0.5rem; cursor: pointer; transition: color 0.2s; }
.f32-foot__col a:hover { color: #fff; }
.f32-foot__bottom { max-width: 1600px; margin: 0 auto; font-size: 0.5625rem; color: #666; line-height: 1.8; text-align: center; }
</style>
