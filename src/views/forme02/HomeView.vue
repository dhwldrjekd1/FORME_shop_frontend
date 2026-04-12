<template>
  <main class="page-wrapper f02-home">
    <!-- ── Hero 슬라이드 ── -->
    <section class="f02-hero">
      <div class="f02-hero__slide">
        <img :src="currentSlide.image" :alt="currentSlide.title" class="f02-hero__img" />
        <div class="f02-hero__content">
          <span class="f02-hero__badge" :style="{ backgroundColor: currentSlide.color }">
            {{ currentSlide.tag }}
          </span>
          <h1 class="f02-hero__title">{{ currentSlide.title }}</h1>
          <p class="f02-hero__sub">{{ currentSlide.sub }}</p>
          <RouterLink :to="currentSlide.route" class="f02-hero__cta">
            바로가기 <span class="material-symbols-outlined">arrow_forward</span>
          </RouterLink>
        </div>
      </div>
      <!-- 인디케이터 -->
      <div class="f02-hero__dots">
        <button
          v-for="(s, i) in slides"
          :key="i"
          class="f02-hero__dot"
          :class="{ 'f02-hero__dot--active': i === slideIndex }"
          @click="slideIndex = i"
        ></button>
      </div>
      <!-- 카운터 -->
      <div class="f02-hero__counter">
        <strong>{{ slideIndex + 1 }}</strong>
        <span> / {{ slides.length }}</span>
      </div>
    </section>

    <!-- ── 카테고리 아이콘 탭 ── -->
    <section class="f02-cats">
      <RouterLink
        v-for="cat in categories"
        :key="cat.name"
        :to="cat.path"
        class="f02-cat"
      >
        <div class="f02-cat__icon" :style="{ backgroundColor: cat.bg }">
          <span class="material-symbols-outlined">{{ cat.icon }}</span>
        </div>
        <p class="f02-cat__name">{{ cat.name }}</p>
      </RouterLink>
    </section>

    <!-- ── Daily Deal ── -->
    <section class="f02-deal">
      <div class="f02-deal__inner">
        <div class="f02-deal__head">
          <p class="f02-deal__tag">⏰ 오늘 단 하루</p>
          <h2 class="f02-deal__title">DAILY DEAL</h2>
          <p class="f02-deal__sub">매일 새로운 특가, 매일 바뀝니다.</p>
        </div>
        <div class="f02-deal__products">
          <RouterLink
            v-for="p in dealProducts"
            :key="p.id"
            :to="`/products/${p.id}`"
            class="f02-deal-card"
          >
            <div class="f02-deal-card__img-wrap">
              <img :src="p.image" :alt="p.name" class="f02-deal-card__img" />
              <span class="f02-deal-card__badge">-30%</span>
            </div>
            <div class="f02-deal-card__info">
              <p class="f02-deal-card__brand">{{ getBrandName(p.id) }}</p>
              <h3 class="f02-deal-card__name">{{ p.name }}</h3>
              <div class="f02-deal-card__price-row">
                <span class="f02-deal-card__discount">30%</span>
                <span class="f02-deal-card__price">{{ formatPrice(Math.round(p.price * 0.7)) }}원</span>
              </div>
              <p class="f02-deal-card__original">{{ formatPrice(p.price) }}원</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ── 브랜드 프로모션 ── -->
    <section class="f02-promo">
      <h2 class="f02-promo__title">BRAND PROMOTION</h2>
      <div class="f02-promo__grid">
        <RouterLink
          v-for="b in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f02-promo-card"
          :style="{ backgroundColor: b.bgColor }"
        >
          <div class="f02-promo-card__text">
            <p class="f02-promo-card__tag" :style="{ color: b.accentColor }">
              {{ b.tag }}
            </p>
            <h3 class="f02-promo-card__title">{{ b.title }}</h3>
            <p class="f02-promo-card__desc">{{ b.desc }}</p>
            <span class="f02-promo-card__cta">
              SHOP NOW <span class="material-symbols-outlined">arrow_forward</span>
            </span>
          </div>
          <div class="f02-promo-card__img-wrap">
            <img :src="b.image" :alt="b.title" />
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ── 베스트 ── -->
    <section class="f02-best">
      <header class="f02-best__head">
        <div>
          <p class="f02-best__eyebrow">BEST</p>
          <h2 class="f02-best__title">실시간 베스트</h2>
        </div>
        <div class="f02-best__tabs">
          <button
            v-for="tab in tabs"
            :key="tab"
            class="f02-best__tab"
            :class="{ 'f02-best__tab--active': activeTab === tab }"
            @click="activeTab = tab"
          >{{ tab }}</button>
        </div>
      </header>
      <div class="f02-best__grid">
        <RouterLink
          v-for="(p, i) in bestProducts"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f02-best-card"
        >
          <div class="f02-best-card__img-wrap">
            <span class="f02-best-card__rank">{{ i + 1 }}</span>
            <img :src="p.image" :alt="p.name" class="f02-best-card__img" />
          </div>
          <p class="f02-best-card__brand">{{ getBrandName(p.id) }}</p>
          <h3 class="f02-best-card__name">{{ p.name }}</h3>
          <p class="f02-best-card__price">{{ formatPrice(p.price) }}원</p>
        </RouterLink>
      </div>
    </section>

    <!-- ── 추천 ── -->
    <section class="f02-rec">
      <h2 class="f02-rec__title">FOR YOU</h2>
      <p class="f02-rec__sub">FORME가 추천하는 오늘의 셀렉션</p>
      <div class="f02-rec__grid">
        <RouterLink
          v-for="p in recProducts"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f02-rec-card"
        >
          <img :src="p.image" :alt="p.name" />
          <div class="f02-rec-card__info">
            <h3>{{ p.name }}</h3>
            <p>{{ formatPrice(p.price) }}원</p>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();
const { products } = storeToRefs(productStore);

onMounted(() => {
  productStore.fetchProducts();
  startAutoSlide();
});
onUnmounted(() => stopAutoSlide());

// ── 슬라이드 ──
const slides = [
  { tag: "NEW SEASON",  title: "2026 SPRING\nCOLLECTION",  sub: "봄을 입는 가장 세련된 방법", route: "/products", color: "#FF6B6B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { tag: "BEST SELLER", title: "LEVI'S DENIM",             sub: "150년 헤리티지의 정수",       route: "/levis",    color: "#4A6BFF", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { tag: "WORK TOUGH",  title: "DICKIES\nWORKWEAR",        sub: "현장에서 일상까지",           route: "/dickies",  color: "#FFB400", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { tag: "ICONIC",      title: "CARHARTT\nSINCE 1889",     sub: "디트로이트의 정직함",         route: "/carhartt", color: "#9C4F18", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
const slideIndex = ref(0);
const currentSlide = computed(() => slides[slideIndex.value]);

let timer = null;
function startAutoSlide() {
  timer = setInterval(() => {
    slideIndex.value = (slideIndex.value + 1) % slides.length;
  }, 5000);
}
function stopAutoSlide() {
  if (timer) clearInterval(timer);
}

// ── 데이터 ──
const dealProducts = computed(() => products.value.slice(0, 4));
const bestProducts = computed(() => products.value.slice(0, 8));
const recProducts  = computed(() => products.value.slice(8, 14));

const activeTab = ref("전체");
const tabs = ["전체", "상의", "하의", "데님"];

function getBrandName(id) {
  if (id >= 100 && id < 200) return "Carhartt";
  if (id >= 200 && id < 300) return "Levi's";
  if (id >= 300 && id < 400) return "Dickies";
  if (id >= 400 && id < 500) return "Beanpole";
  return "FORME";
}
function formatPrice(price) {
  return price ? price.toLocaleString() : "";
}

const categories = [
  { name: "전체",   icon: "apps",          bg: "#FFE4E1", path: "/products" },
  { name: "신상품", icon: "new_releases",  bg: "#E0F4FF", path: "/products" },
  { name: "베스트", icon: "trending_up",   bg: "#FFF4D6", path: "/products" },
  { name: "특가",   icon: "local_offer",   bg: "#FFE4F0", path: "/products" },
  { name: "상의",   icon: "checkroom",     bg: "#E4FFE4", path: "/products" },
  { name: "하의",   icon: "dry_cleaning",  bg: "#F0E4FF", path: "/products" },
  { name: "데님",   icon: "auto_awesome",  bg: "#E4F4FF", path: "/products" },
  { name: "Q&A",    icon: "forum",         bg: "#FFEEDD", path: "/qna" },
];

const brandPanels = [
  { id: 1, title: "BEANPOLE", tag: "HERITAGE",   desc: "1989년 서울, 한국 클래식의 정수",       route: "/beanpole", bgColor: "#103728", accentColor: "#C9A86B", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "LEVI'S",   tag: "DENIM ICON", desc: "1873년부터 이어진 데님의 역사",         route: "/levis",    bgColor: "#8E1C28", accentColor: "#FFD0D0", image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 3, title: "DICKIES",  tag: "WORK WEAR",  desc: "100년 워크웨어의 산증인",                route: "/dickies",  bgColor: "#1A1A1A", accentColor: "#FFC72C", image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 4, title: "CARHARTT", tag: "RUGGED",     desc: "디트로이트에서 시작된 워크 클래식",     route: "/carhartt", bgColor: "#9C4F18", accentColor: "#FFC72C", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 02 — Colorful Department (SSF·롯데온 톤)
   - 컬러풀, 활기찬, 정보 밀도 높음
   - 카테고리 아이콘, 슬라이드 배너
   - 강조: 다채로운 파스텔/포인트
   ════════════════════════════════ */
.f02-home {
  background-color: #fafafa;
  font-family: var(--font-body);
  color: #222;
}

/* ── Hero 슬라이드 ── */
.f02-hero {
  position: relative;
  height: calc(100dvh - var(--header-height));
  max-height: 700px;
  overflow: hidden;
}
.f02-hero__slide {
  position: relative;
  width: 100%;
  height: 100%;
}
.f02-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f02-hero__content {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 0 5rem;
  background: linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%);
  color: #fff;
}
.f02-hero__badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 1.5rem;
}
.f02-hero__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 6vw, 4.75rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.05;
  white-space: pre-line;
  margin-bottom: 1.25rem;
}
.f02-hero__sub {
  font-size: 1.0625rem;
  margin-bottom: 2.5rem;
  opacity: 0.9;
}
.f02-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  color: #222;
  padding: 1.125rem 2.5rem;
  border-radius: 999px;
  font-size: 0.875rem;
  font-weight: 700;
  transition: transform 0.2s;
}
.f02-hero__cta:hover { transform: translateY(-2px); }
.f02-hero__cta .material-symbols-outlined { font-size: 1.125rem; }

.f02-hero__dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.625rem;
}
.f02-hero__dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.4);
  border: none;
  cursor: pointer;
  transition: background 0.2s, width 0.2s;
}
.f02-hero__dot--active {
  background: #fff;
  width: 24px;
  border-radius: 4px;
}
.f02-hero__counter {
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  color: #fff;
  font-size: 0.875rem;
}
.f02-hero__counter strong { font-size: 1.25rem; }

/* ── 카테고리 ── */
.f02-cats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 3rem 2rem;
  background: #fff;
  max-width: 1200px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-cats { grid-template-columns: repeat(8, 1fr); } }

.f02-cat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  transition: transform 0.2s;
}
.f02-cat:hover { transform: translateY(-4px); }
.f02-cat__icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.f02-cat__icon .material-symbols-outlined {
  font-size: 1.875rem;
  color: #222;
}
.f02-cat__name {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #333;
}

/* ── Daily Deal ── */
.f02-deal {
  background: linear-gradient(135deg, #FFF4D6 0%, #FFE4E1 100%);
  padding: 5rem 3rem;
}
.f02-deal__inner { max-width: 1400px; margin: 0 auto; }
.f02-deal__head { text-align: center; margin-bottom: 3rem; }
.f02-deal__tag {
  font-size: 0.9375rem;
  font-weight: 700;
  color: #FF4444;
  margin-bottom: 0.75rem;
}
.f02-deal__title {
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}
.f02-deal__sub {
  font-size: 0.9375rem;
  color: #666;
}
.f02-deal__products {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}
@media (min-width: 768px) { .f02-deal__products { grid-template-columns: repeat(4, 1fr); } }

.f02-deal-card {
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(0,0,0,0.06);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.f02-deal-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.1);
}
.f02-deal-card__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #f5f5f5;
}
.f02-deal-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.f02-deal-card__badge {
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: #FF4444;
  color: #fff;
  padding: 0.375rem 0.75rem;
  border-radius: 999px;
  font-size: 0.6875rem;
  font-weight: 800;
}
.f02-deal-card__info { padding: 1rem; }
.f02-deal-card__brand {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  margin-bottom: 0.25rem;
}
.f02-deal-card__name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.625rem;
  line-height: 1.3;
  height: 2.2em;
  overflow: hidden;
}
.f02-deal-card__price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
}
.f02-deal-card__discount {
  font-size: 1.0625rem;
  font-weight: 900;
  color: #FF4444;
}
.f02-deal-card__price {
  font-size: 1rem;
  font-weight: 800;
}
.f02-deal-card__original {
  font-size: 0.75rem;
  color: #aaa;
  text-decoration: line-through;
  margin-top: 0.25rem;
}

/* ── 브랜드 프로모션 ── */
.f02-promo { padding: 5rem 3rem; }
.f02-promo__title {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.75rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 3rem;
}
.f02-promo__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-promo__grid { grid-template-columns: 1fr 1fr; } }

.f02-promo-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-radius: 16px;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  transition: transform 0.3s;
  min-height: 240px;
}
.f02-promo-card:hover { transform: translateY(-4px); }
.f02-promo-card__text {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f02-promo-card__tag {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 0.625rem;
}
.f02-promo-card__title {
  font-size: 1.875rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.5rem;
}
.f02-promo-card__desc {
  font-size: 0.8125rem;
  opacity: 0.85;
  margin-bottom: 1.5rem;
  line-height: 1.5;
}
.f02-promo-card__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f02-promo-card__cta .material-symbols-outlined { font-size: 1rem; }
.f02-promo-card__img-wrap { position: relative; overflow: hidden; }
.f02-promo-card__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.f02-promo-card:hover .f02-promo-card__img-wrap img { transform: scale(1.06); }

/* ── 베스트 ── */
.f02-best {
  padding: 5rem 3rem;
  background: #fff;
}
.f02-best__head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  max-width: 1400px;
  margin: 0 auto 2.5rem;
  flex-wrap: wrap;
  gap: 1rem;
}
.f02-best__eyebrow {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #FF4444;
  margin-bottom: 0.5rem;
}
.f02-best__title {
  font-size: 1.875rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}
.f02-best__tabs { display: flex; gap: 0.5rem; }
.f02-best__tab {
  background: #f5f5f5;
  border: none;
  padding: 0.625rem 1.25rem;
  border-radius: 999px;
  font-size: 0.8125rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.f02-best__tab--active {
  background: #222;
  color: #fff;
}
.f02-best__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-best__grid { grid-template-columns: repeat(4, 1fr); } }

.f02-best-card { cursor: pointer; }
.f02-best-card__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #f5f5f5;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 0.875rem;
}
.f02-best-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f02-best-card:hover .f02-best-card__img { transform: scale(1.04); }
.f02-best-card__rank {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #222;
  color: #fff;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 800;
  z-index: 1;
}
.f02-best-card__brand {
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  margin-bottom: 0.25rem;
}
.f02-best-card__name {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f02-best-card__price {
  font-size: 0.9375rem;
  font-weight: 800;
}

/* ── 추천 ── */
.f02-rec {
  padding: 5rem 3rem 7rem;
  background: linear-gradient(180deg, #fff 0%, #f0f4ff 100%);
}
.f02-rec__title {
  text-align: center;
  font-size: clamp(2rem, 4vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
  margin-bottom: 0.75rem;
}
.f02-rec__sub {
  text-align: center;
  font-size: 0.9375rem;
  color: #666;
  margin-bottom: 3rem;
}
.f02-rec__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
  max-width: 1400px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f02-rec__grid { grid-template-columns: repeat(3, 1fr); } }

.f02-rec-card {
  display: block;
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.04);
}
.f02-rec-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 12px 32px rgba(0,0,0,0.1);
}
.f02-rec-card img {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
}
.f02-rec-card__info { padding: 1.25rem; }
.f02-rec-card__info h3 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f02-rec-card__info p {
  font-size: 1rem;
  font-weight: 800;
  color: #4A6BFF;
}
</style>
