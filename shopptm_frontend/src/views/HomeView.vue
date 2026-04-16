<template>
  <Forme32Layout>
    <!-- ═══ Hero (50장 슬라이드) ═══ -->
    <section class="f32-hero">
      <img :src="heroSlides[heroIndex].url" :alt="heroSlides[heroIndex].alt" class="f32-hero__bg" :key="heroIndex" />
      <div class="f32-hero__overlay"></div>
      <div class="f32-hero__content">
        <p class="f32-hero__tag">2026 SPRING COLLECTION</p>
        <h1 class="f32-hero__title">NEW SEASON,<br />NEW <span>FORME</span>.</h1>
        <p class="f32-hero__desc">네 개의 헤리티지 브랜드로 완성하는 올봄의 옷장.</p>
        <div class="f32-hero__cta-group">
          <RouterLink to="/products" class="f32-hero__cta">COLLECTION</RouterLink>
          <RouterLink v-if="!isLoggedIn" to="/signup" class="f32-hero__cta f32-hero__cta--outline">JOIN</RouterLink>
        </div>
      </div>
      <button class="f32-hero__arrow f32-hero__arrow--left" @click="prevHero" aria-label="이전">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
      </button>
      <button class="f32-hero__arrow f32-hero__arrow--right" @click="nextHero" aria-label="다음">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
      </button>
      <div class="f32-hero__bottom-bar">
        <div class="f32-hero__progress">
          <div class="f32-hero__progress-fill" :style="{ width: ((heroIndex + 1) / heroSlides.length * 100) + '%' }"></div>
        </div>
      </div>
    </section>

    <!-- ═══ OUR TEAM (BRAND 글씨, 전체보기 제거) ═══ -->
    <section class="f32-team">
      <div class="f32-team__grid">
        <RouterLink v-for="b in brands" :key="b.id" :to="b.route" class="f32-brand">
          <div class="f32-brand__img-wrap">
            <img :src="b.img" :alt="b.name" />
            <div class="f32-brand__overlay" :style="{ background: `linear-gradient(to top, ${b.color} 0%, transparent 60%)` }"></div>
          </div>
          <div class="f32-brand__stripe" :style="{ backgroundColor: b.color }"></div>
          <div class="f32-brand__info">
            <div class="f32-brand__top">
              <h3>{{ b.name }}</h3>
              <span class="f32-brand__year">{{ b.year }}</span>
            </div>
            <p class="f32-brand__desc">{{ b.desc }}</p>
            <div class="f32-brand__meta">
              <span>{{ getBrandItemCount(b.name) }} items</span>
              <span class="f32-brand__rating">★ {{ getBrandRating(b.name) }}</span>
              <span>{{ b.city }}</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Curator's Pick (다크) — 추천 상품이 있을 때만 표시 ═══ -->
    <section v-if="curatorPicks.length" class="f32-curator">
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
            <div class="f32-pick__img-wrap"><img :src="p.curatorImageUrl || p.imageUrl || p.image || p.img" :alt="p.name" /></div>
            <div class="f32-pick__info">
              <span class="f32-pick__no">No. 0{{ i + 1 }}</span>
              <h3>{{ p.name }}</h3>
              <p class="f32-pick__brand">{{ p.brand }}</p>
              <p class="f32-pick__price">₩{{ typeof p.price === 'number' ? p.price.toLocaleString() : p.price }}</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ 매거진 (MAGAZINE 글씨 제거) ═══ -->
    <section class="f32-editorial">
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

  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import { useAuthStore } from "@/stores/authStore";
import api from "@/api";

const authStore = useAuthStore();
const isLoggedIn = computed(() => authStore.isLoggedIn);

// DB 상품 데이터 로드
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);

function getBrandItemCount(brandName) {
  return products.value.filter(p => p.brand === brandName).length;
}

// 브랜드별 평균 평점
const brandRatings = ref({});
async function loadBrandRatings() {
  const brandNames = ['BEANPOLE', 'CARHARTT', "LEVI'S", 'DICKIES'];
  for (const brand of brandNames) {
    try {
      const brandProducts = products.value.filter(p => p.brand === brand);
      let totalRating = 0, totalCount = 0;
      for (const p of brandProducts.slice(0, 10)) {
        const reviews = await api.get(`/products/${p.id}/reviews`).catch(() => []);
        if (reviews?.length) {
          totalRating += reviews.reduce((s, r) => s + r.rating, 0);
          totalCount += reviews.length;
        }
      }
      brandRatings.value[brand] = totalCount > 0 ? (totalRating / totalCount).toFixed(1) : '0.0';
    } catch { brandRatings.value[brand] = '0.0'; }
  }
}
function getBrandRating(brandName) {
  return brandRatings.value[brandName] || '0.0';
}

// ── Hero 슬라이드 15장 (로컬 4K 이미지) ──
const defaultHeroSlides = [
  { url: "/new/home/hero_01.jpg", alt: "따뜻한 매장 인테리어" },
  { url: "/new/home/hero_04.jpg", alt: "쇼핑백 디스플레이" },
  { url: "/new/home/hero_11.jpg", alt: "패션 포트레이트" },
  { url: "/new/home/hero_12.jpg", alt: "런웨이 워킹" },
  { url: "/new/home/hero_13.jpg", alt: "그룹 스트릿" },
  { url: "/new/home/hero_15.jpg", alt: "모델 블랙 앤 화이트" },
  { url: "/new/home/hero_16.jpg", alt: "도시 패션" },
  { url: "/new/home/hero_18.jpg", alt: "패션 런웨이" },
  { url: "/new/home/hero_21.jpg", alt: "접힌 셔츠 스택" },
  { url: "/new/home/hero_22.jpg", alt: "흰 셔츠 클로즈업" },
  { url: "/new/home/hero_24.jpg", alt: "캐주얼 플랫레이" },
  { url: "/new/home/hero_27.jpg", alt: "미니멀 행거" },
  { url: "/new/home/hero_28.jpg", alt: "접힌 청바지" },
  { url: "/new/home/hero_40.jpg", alt: "니트 클로즈업" },
  { url: "/new/home/hero_48.jpg", alt: "슈즈 컬렉션" },
];
// DB에서 설정 로드 헬퍼
async function dbLoad(key, fallback) {
  try { const r = await api.get(`/settings/${key}`); if (r?.value) return JSON.parse(r.value); } catch {}
  return fallback;
}

const heroSlides = ref(defaultHeroSlides);
const heroIndex = ref(0);
function nextHero() { heroIndex.value = (heroIndex.value + 1) % heroSlides.value.length; }
function prevHero() { heroIndex.value = (heroIndex.value - 1 + heroSlides.value.length) % heroSlides.value.length; }
let heroTimer = null;
onMounted(() => { heroTimer = setInterval(nextHero, 6000); });
onUnmounted(() => { if (heroTimer) clearInterval(heroTimer); });

const defaultBrands = [
  { id: 1, name: "BEANPOLE", year: "1989", city: "Seoul",         desc: "한국 클래식의 정수",  color: "#103728", route: "/beanpole", img: "/main1.jpg" },
  { id: 2, name: "CARHARTT", year: "1889", city: "Detroit",       desc: "디트로이트 워크웨어", color: "#9C4F18", route: "/carhartt", img: "/main2.jpg" },
  { id: 3, name: "LEVI'S",   year: "1873", city: "San Francisco", desc: "150년 데님 헤리티지", color: "#8E1C28", route: "/levis",    img: "/main3.jpg" },
  { id: 4, name: "DICKIES",  year: "1922", city: "Fort Worth",    desc: "한 세기 워크웨어",    color: "#1A1A1A", route: "/dickies",  img: "/main4.jpg" },
];
const brands = ref(defaultBrands);
const curatorPicks = ref([]);
const magazine = ref([
  { cat: "STYLE GUIDE", title: "봄을 입는 가장 쉬운 방법", excerpt: "칼하트 워크웨어부터 빈폴 클래식까지.", lg: true,  img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&q=80" },
  { cat: "LOOKBOOK",    title: "2026 SS Collection",        excerpt: "",                                    lg: false, img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" },
  { cat: "BRAND STORY", title: "워크웨어의 정직함",          excerpt: "",                                    lg: false, img: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
]);

onMounted(async () => {
  await productStore.fetchProducts();

  // 브랜드별 평점 로드
  loadBrandRatings();

  // DB에서 설정 로드
  const [heroData, brandData, magData, recData] = await Promise.all([
    dbLoad('hero_slides', null),
    dbLoad('brand_settings', null),
    dbLoad('magazine', null),
    api.get('/products/recommend').catch(() => null),
  ]);

  if (heroData?.length) heroSlides.value = heroData;
  if (brandData?.length) {
    brands.value = defaultBrands.map(b => {
      const s = brandData.find(x => x.key === b.route.replace('/', ''));
      return s?.teamImage ? { ...b, img: s.teamImage } : b;
    });
  }
  if (magData?.length) magazine.value = magData;
  if (recData?.length) curatorPicks.value = recData;
});
</script>

<style scoped>
/* Hero */
.f32-hero { position: relative; height: calc(100dvh - 92px); overflow: hidden; }
.f32-hero__bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transition: opacity 0.6s ease; }
.f32-hero__overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%); }
.f32-hero__content { position: relative; z-index: 2; padding: 0 5rem; color: #fff; max-width: 40rem; display: flex; flex-direction: column; justify-content: center; min-height: 100%; }
.f32-hero__tag { font-size: 0.75rem; font-weight: 700; letter-spacing: 0.3em; color: #FF2D2D; margin-bottom: 1.5rem; }
.f32-hero__title { font-size: clamp(3rem, 7vw, 5.5rem); font-weight: 900; letter-spacing: -0.04em; line-height: 0.95; margin-bottom: 1.5rem; }
.f32-hero__title span { color: #FF2D2D; }
.f32-hero__desc { font-size: 1rem; opacity: 0.85; margin-bottom: 2.5rem; }
.f32-hero__cta-group { display: flex; gap: 0.75rem; }
.f32-hero__cta { display: inline-block; background: #fff; color: #111; padding: 1.125rem 2.5rem; font-size: 0.75rem; font-weight: 800; letter-spacing: 0.2em; transition: all 0.25s; text-decoration: none; }
.f32-hero__cta:hover { background: #FF2D2D; color: #fff; }
.f32-hero__cta--outline { background: transparent; border: 1px solid rgba(255,255,255,0.5); color: #fff; }
.f32-hero__cta--outline:hover { background: rgba(255,255,255,0.1); border-color: #fff; }
.f32-hero__arrow { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; width: 3rem; height: 3rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.12); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.2); color: #fff; cursor: pointer; transition: all 0.3s; opacity: 0; }
.f32-hero:hover .f32-hero__arrow { opacity: 1; }
.f32-hero__arrow:hover { background: rgba(255,255,255,0.3); border-color: rgba(255,255,255,0.4); }
.f32-hero__arrow--left { left: 2rem; }
.f32-hero__arrow--right { right: 2rem; }
.f32-hero__bottom-bar { position: absolute; bottom: 0; left: 0; right: 0; z-index: 10; display: flex; align-items: center; gap: 1.5rem; padding: 1.25rem 2.5rem; background: rgba(0,0,0,0.5); backdrop-filter: blur(8px); }
.f32-hero__progress { flex: 1; height: 2px; background: rgba(255,255,255,0.15); border-radius: 1px; overflow: hidden; }
.f32-hero__progress-fill { height: 100%; background: #FF2D2D; transition: width 0.4s ease; }

/* OUR TEAM */
.f32-team { border-top: 1px solid #f0f0f0; padding: 3rem 0 5rem; }
.f32-team__grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f32-brand { position: relative; overflow: hidden; color: inherit; border: 1px solid #eee; margin: -0.5px; transition: border-color 0.4s, box-shadow 0.4s; text-decoration: none; }
.f32-brand:hover { border-color: transparent; box-shadow: 0 8px 32px rgba(0,0,0,0.12); z-index: 2; }
.f32-brand__img-wrap { position: relative; aspect-ratio: 3/4; overflow: hidden; }
.f32-brand__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.6) brightness(0.95); transition: filter 0.7s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94); }
.f32-brand:hover .f32-brand__img-wrap img { filter: grayscale(0) brightness(1); transform: scale(1.06); }
.f32-brand__overlay { position: absolute; inset: 0; opacity: 0; transition: opacity 0.5s; pointer-events: none; }
.f32-brand:hover .f32-brand__overlay { opacity: 0.7; }
.f32-brand__stripe { height: 4px; transition: height 0.3s; }
.f32-brand:hover .f32-brand__stripe { height: 6px; }
.f32-brand__info { padding: 1.5rem; transition: background 0.3s; }
.f32-brand:hover .f32-brand__info { background: #fafaf8; }
.f32-brand__top { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 0.75rem; }
.f32-brand__top h3 { font-size: 1.25rem; font-weight: 900; transition: color 0.3s; }
.f32-brand__year { font-size: 0.625rem; font-weight: 700; letter-spacing: 0.2em; color: #999; }
.f32-brand__desc { font-size: 0.8125rem; color: #999; line-height: 1.5; margin-bottom: 1rem; }
.f32-brand__meta { display: flex; gap: 1rem; font-size: 0.625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; transition: color 0.3s; }
.f32-brand:hover .f32-brand__meta { color: #888; }
.f32-brand__rating { color: #c9a86b; }

/* Curator's Pick */
.f32-curator { padding: 8rem 0; background: #1a1a1a; color: #faf8f4; }
.f32-curator__inner { display: grid; grid-template-columns: 1fr 1.8fr; gap: 4rem; max-width: 1400px; margin: 0 auto; padding: 0 3rem; }
.f32-curator__text { display: flex; flex-direction: column; justify-content: center; }
.f32-curator__eyebrow { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.3em; color: #c9a86b; margin-bottom: 1.25rem; }
.f32-curator__title { font-family: var(--font-headline); font-size: clamp(2.25rem, 4vw, 3.25rem); font-weight: 300; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 1.75rem; }
.f32-curator__title em { font-style: italic; color: #c9a86b; }
.f32-curator__desc { font-size: 0.9375rem; line-height: 1.85; opacity: 0.7; max-width: 26rem; margin-bottom: 2rem; }
.f32-curator__link { font-size: 0.6875rem; font-weight: 500; letter-spacing: 0.25em; text-transform: uppercase; color: #c9a86b; border-bottom: 0.5px solid #c9a86b; padding-bottom: 4px; width: fit-content; text-decoration: none; }
.f32-curator__products { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
.f32-pick { color: inherit; cursor: pointer; text-decoration: none; }
.f32-pick__img-wrap { aspect-ratio: 3/4; overflow: hidden; background: #2a2a2a; margin-bottom: 1rem; }
.f32-pick__img-wrap img { width: 100%; height: 100%; object-fit: cover; filter: grayscale(0.4); transition: transform 0.7s, filter 0.5s; }
.f32-pick:hover .f32-pick__img-wrap img { transform: scale(1.04); filter: grayscale(0); }
.f32-pick__no { font-size: 0.625rem; letter-spacing: 0.25em; color: #c9a86b; display: block; margin-bottom: 0.5rem; }
.f32-pick__info h3 { font-family: var(--font-headline); font-size: 0.9375rem; font-weight: 400; margin-bottom: 0.375rem; line-height: 1.4; }
.f32-pick__brand { font-size: 0.625rem; letter-spacing: 0.15em; color: #c9a86b; margin-bottom: 0.5rem; }
.f32-pick__price { font-size: 0.8125rem; font-weight: 500; opacity: 0.8; }

/* 매거진 */
.f32-editorial { border-top: 1px solid #f0f0f0; padding: 3rem 0 6rem; }
.f32-editorial__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 1.5rem; padding: 0 3rem; max-width: 1600px; margin: 0 auto; }
.f32-mag { position: relative; overflow: hidden; aspect-ratio: 4/5; cursor: pointer; }
.f32-mag--lg { grid-row: span 1; aspect-ratio: auto; }
.f32-mag img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.7s; }
.f32-mag:hover img { transform: scale(1.05); }
.f32-mag__text { position: absolute; bottom: 0; left: 0; right: 0; padding: 2rem; background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%); color: #fff; }
.f32-mag__cat { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.25em; color: #FF2D2D; margin-bottom: 0.5rem; }
.f32-mag__text h3 { font-size: 1.25rem; font-weight: 900; letter-spacing: -0.01em; margin-bottom: 0.5rem; }
.f32-mag__excerpt { font-size: 0.8125rem; opacity: 0.8; line-height: 1.5; }
</style>
