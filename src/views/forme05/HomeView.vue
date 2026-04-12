<template>
  <main class="f05-home">
    <!-- 자체 상단바 -->
    <header class="f05-topbar">
      <div class="f05-topbar__col">
        <RouterLink to="/forme" class="f05-topbar__back">◁ PICKER</RouterLink>
      </div>
      <div class="f05-topbar__col f05-topbar__col--center">
        <span class="f05-topbar__no">N° 05</span>
        <span class="f05-topbar__bar"></span>
        <span class="f05-topbar__title">FORME / Life in Plain</span>
      </div>
      <div class="f05-topbar__col f05-topbar__col--right">
        <RouterLink to="/" class="f05-topbar__back">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- Hero -->
    <section class="f05-hero">
      <div class="f05-hero__grid">
        <div class="f05-hero__col f05-hero__col--text">
          <div class="f05-hero__mark">FORME / 2026</div>
          <div class="f05-hero__vertical">シンプル・ライフ · 간결함의 미학</div>
        </div>
        <div class="f05-hero__col f05-hero__col--image">
          <img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1200&q=80"
            alt="hero"
          />
          <div class="f05-hero__img-tag">PHOTO · SPRING '26</div>
        </div>
        <div class="f05-hero__col f05-hero__col--caption">
          <p class="f05-hero__eyebrow">— SPRING · 2026</p>
          <p class="f05-hero__title">FORME</p>
          <p class="f05-hero__sub">LIFE IN PLAIN</p>
          <p class="f05-hero__jp">簡潔なものは永く残る</p>
          <p class="f05-hero__desc">
            간결한 것이 오래 남는다.<br />
            4개의 브랜드, 24개의 상품, 하나의 철학.
          </p>
          <RouterLink to="/products" class="f05-hero__cta">VIEW ALL →</RouterLink>
          <div class="f05-hero__facts">
            <div><span>04</span><p>BRANDS</p></div>
            <div><span>24</span><p>OBJECTS</p></div>
            <div><span>01</span><p>PHILOSOPHY</p></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 카테고리 줄 -->
    <section class="f05-cats">
      <div v-for="cat in cats" :key="cat.name" class="f05-cat">
        <div class="f05-cat__num">{{ cat.num }}</div>
        <p class="f05-cat__name">{{ cat.name }}</p>
        <p class="f05-cat__jp">{{ cat.jp }}</p>
      </div>
    </section>

    <!-- 신상품 + 탭 -->
    <section class="f05-products">
      <header class="f05-products__head">
        <div>
          <p class="f05-products__label">NEW / 今週の新着</p>
          <h2 class="f05-products__title">금주의 신상품</h2>
        </div>
        <div class="f05-products__tabs">
          <button
            v-for="t in productTabs"
            :key="t"
            class="f05-products__tab"
            :class="{ 'f05-products__tab--active': activeTab === t }"
            @click="activeTab = t"
          >{{ t }}</button>
        </div>
      </header>
      <div class="f05-products__grid">
        <RouterLink
          v-for="p in products.slice(0, 8)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f05-item"
        >
          <div class="f05-item__img-wrap">
            <img :src="p.image" :alt="p.name" />
            <span class="f05-item__code">No. {{ String(p.id).padStart(4, '0') }}</span>
          </div>
          <p class="f05-item__brand">{{ getBrandName(p.id) }}</p>
          <p class="f05-item__name">{{ p.name }}</p>
          <div class="f05-item__bottom">
            <p class="f05-item__price">¥{{ fmt(p.price) }}</p>
            <span class="f05-item__arrow">→</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- 매니페스토 (큰 텍스트 + 세로) -->
    <section class="f05-manifesto">
      <div class="f05-manifesto__side">
        <p class="f05-manifesto__label">// MANIFESTO · 01</p>
        <p class="f05-manifesto__jp">我々の信条</p>
      </div>
      <div class="f05-manifesto__main">
        <p class="f05-manifesto__line">SIMPLE THINGS</p>
        <p class="f05-manifesto__line f05-manifesto__line--alt">FOR A</p>
        <p class="f05-manifesto__line">SIMPLE LIFE.</p>
      </div>
      <div class="f05-manifesto__note">
        <p>
          FORME 은 덜어냄의 가치를 믿습니다.<br />
          군더더기 없는 선과 필요한 만큼의 디테일,<br />
          오래 남을 정직한 소재만을 선별합니다.
        </p>
        <p class="f05-manifesto__sign">— FORME Editorial Team</p>
      </div>
    </section>

    <!-- 브랜드 리스트 (문서) -->
    <section class="f05-brands">
      <div class="f05-brands__head">
        <p class="f05-brands__label">BRAND / 四つのブランド</p>
        <h2 class="f05-brands__title">네 개의 브랜드</h2>
      </div>
      <div class="f05-brands__list">
        <RouterLink
          v-for="(b, i) in brandPanels"
          :key="b.id"
          :to="b.route"
          class="f05-brand-row"
        >
          <span class="f05-brand-row__no">0{{ i + 1 }}</span>
          <span class="f05-brand-row__name">{{ b.title }}</span>
          <span class="f05-brand-row__desc">{{ b.desc }}</span>
          <span class="f05-brand-row__year">{{ b.year }}</span>
          <span class="f05-brand-row__arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- 가이드북 (How to Wear) -->
    <section class="f05-guide">
      <div class="f05-guide__head">
        <p class="f05-guide__label">GUIDE / 着こなし</p>
        <h2 class="f05-guide__title">How to Wear</h2>
      </div>
      <div class="f05-guide__steps">
        <div v-for="(s, i) in steps" :key="i" class="f05-step">
          <div class="f05-step__num">0{{ i + 1 }}</div>
          <h3>{{ s.title }}</h3>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 스펙 테이블 -->
    <section class="f05-specs">
      <p class="f05-specs__label">SPECS / 仕様</p>
      <h2 class="f05-specs__title">Product Standards</h2>
      <table class="f05-specs__table">
        <thead>
          <tr>
            <th>#</th>
            <th>Category</th>
            <th>Material</th>
            <th>Origin</th>
            <th>Wash</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(s, i) in specs" :key="i">
            <td>{{ String(i + 1).padStart(2, '0') }}</td>
            <td>{{ s.cat }}</td>
            <td>{{ s.mat }}</td>
            <td>{{ s.origin }}</td>
            <td>{{ s.wash }}</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- 큰 카피 -->
    <section class="f05-copy">
      <p>Life in<br /><em>Plain.</em></p>
      <p class="f05-copy__jp">簡潔な生活</p>
    </section>

    <!-- 자체 푸터 -->
    <footer class="f05-foot">
      <div class="f05-foot__grid">
        <div class="f05-foot__col">
          <p class="f05-foot__brand">FORME</p>
          <p class="f05-foot__tag">N° 05 · Japanese Minimal</p>
          <p class="f05-foot__jp">簡潔 · 永久 · 質</p>
        </div>
        <div class="f05-foot__col">
          <p class="f05-foot__label">01 / BRANDS</p>
          <RouterLink to="/beanpole">Beanpole</RouterLink>
          <RouterLink to="/carhartt">Carhartt</RouterLink>
          <RouterLink to="/levis">Levi's</RouterLink>
          <RouterLink to="/dickies">Dickies</RouterLink>
        </div>
        <div class="f05-foot__col">
          <p class="f05-foot__label">02 / STORE</p>
          <RouterLink to="/products">All Products</RouterLink>
          <RouterLink to="/cart">Cart</RouterLink>
          <RouterLink to="/mypage">My Page</RouterLink>
        </div>
        <div class="f05-foot__col">
          <p class="f05-foot__label">03 / SUPPORT</p>
          <RouterLink to="/faq">FAQ</RouterLink>
          <RouterLink to="/qna">Q&A</RouterLink>
        </div>
        <div class="f05-foot__col">
          <p class="f05-foot__label">04 / ABOUT</p>
          <p>EST. 2026</p>
          <p>SEOUL</p>
          <p>forme@forme.kr</p>
        </div>
      </div>
      <div class="f05-foot__bottom">
        <span>© 2026 FORME</span>
        <span>MADE IN KOREA</span>
        <span>ALL RIGHTS RESERVED</span>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
const fmt = (p) => p ? p.toLocaleString() : "";
const getBrandName = (id) => {
  if (id >= 100 && id < 200) return "Carhartt";
  if (id >= 200 && id < 300) return "Levi's";
  if (id >= 300 && id < 400) return "Dickies";
  if (id >= 400 && id < 500) return "Beanpole";
  return "FORME";
};
const cats = [
  { num: "01", name: "TOPS",  jp: "トップス" },
  { num: "02", name: "PANTS", jp: "パンツ" },
  { num: "03", name: "DENIM", jp: "デニム" },
  { num: "04", name: "OUTER", jp: "アウター" },
  { num: "05", name: "ACC",   jp: "アクセ" },
];
const productTabs = ["ALL", "TOPS", "PANTS", "DENIM"];
const activeTab = ref("ALL");
const brandPanels = [
  { id: 1, title: "BEANPOLE", desc: "Korean classic",       year: "1989", route: "/beanpole" },
  { id: 2, title: "CARHARTT", desc: "Detroit workwear",     year: "1889", route: "/carhartt" },
  { id: 3, title: "LEVI'S",   desc: "Denim heritage",       year: "1873", route: "/levis" },
  { id: 4, title: "DICKIES",  desc: "American workwear",    year: "1922", route: "/dickies" },
];
const steps = [
  { title: "Choose the base", desc: "기본이 되는 아이템 하나를 고릅니다. 흰 티, 무지 셔츠, 데님 — 바탕이 단단해야 합니다." },
  { title: "Add a texture",   desc: "한 가지 질감을 더합니다. 리넨, 헤비 코튼, 혹은 워시드 데님처럼 손끝으로 느껴지는 것." },
  { title: "Keep it simple",  desc: "세 가지 이상은 더하지 않습니다. 덜 입는 것이 더 입는 것입니다." },
];
const specs = [
  { cat: "T-Shirt", mat: "100% Cotton",         origin: "Bangladesh", wash: "Machine" },
  { cat: "Denim",   mat: "98% Cotton · 2% Ela", origin: "Mexico",     wash: "Machine" },
  { cat: "Pants",   mat: "100% Cotton Duck",    origin: "USA",        wash: "Machine" },
  { cat: "Shirt",   mat: "55% Linen · 45% Cot", origin: "Korea",      wash: "Cold" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 05 — Japanese Minimal (UNIQLO/MUJI)
   ════════════════════════════════ */
.f05-home {
  background: #ffffff;
  color: #1f1f1f;
  font-family: var(--font-body);
  min-height: 100dvh;
}

/* ── 자체 상단바 ── */
.f05-topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 0;
  background: #ffffff;
  border-bottom: 1px solid #1f1f1f;
}
.f05-topbar__col {
  padding: 1.25rem 2rem;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f05-topbar__col:nth-child(1) { border-right: 1px solid #e5e5e5; }
.f05-topbar__col--right { border-left: 1px solid #e5e5e5; text-align: right; }
.f05-topbar__col--center {
  display: flex;
  align-items: center;
  gap: 1rem;
  justify-content: center;
}
.f05-topbar__no {
  background: #1f1f1f;
  color: #fff;
  padding: 0.375rem 0.625rem;
}
.f05-topbar__bar {
  width: 2rem;
  height: 1px;
  background: #1f1f1f;
}
.f05-topbar__title { color: #1f1f1f; }
.f05-topbar__back {
  color: #1f1f1f;
  transition: color 0.2s;
}
.f05-topbar__back:hover { color: #888; }

/* ── Hero ── */
.f05-hero {
  min-height: calc(100dvh - 60px);
  padding: 4rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-hero__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 70vh;
}
@media (min-width: 1024px) {
  .f05-hero__grid {
    grid-template-columns: 2fr 5fr 3fr;
    gap: 3rem;
  }
}
.f05-hero__col--text {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}
.f05-hero__mark {
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f05-hero__vertical {
  writing-mode: vertical-rl;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  color: #888;
}
.f05-hero__col--image {
  overflow: hidden;
  position: relative;
}
.f05-hero__col--image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  min-height: 400px;
  filter: grayscale(0.3) contrast(1.02);
}
.f05-hero__img-tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  background: #fff;
  color: #1f1f1f;
  padding: 0.375rem 0.75rem;
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f05-hero__col--caption {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-bottom: 1rem;
}
.f05-hero__eyebrow {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #888;
  margin-bottom: 1rem;
}
.f05-hero__title {
  font-family: "Space Mono", monospace;
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 0.95;
  margin-bottom: 0.75rem;
}
.f05-hero__sub {
  font-family: "Space Mono", monospace;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
}
.f05-hero__jp {
  font-family: var(--font-headline);
  font-size: 0.875rem;
  color: #888;
  margin-bottom: 1.25rem;
}
.f05-hero__desc {
  font-size: 0.8125rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2rem;
}
.f05-hero__cta {
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #1f1f1f;
  border-bottom: 1px solid #1f1f1f;
  padding-bottom: 4px;
  width: fit-content;
  transition: padding-right 0.2s;
  display: inline-block;
  margin-bottom: 2.5rem;
}
.f05-hero__cta:hover { padding-right: 0.5rem; }
.f05-hero__facts {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid #1f1f1f;
  padding-top: 1.25rem;
  gap: 0.5rem;
}
.f05-hero__facts > div span {
  display: block;
  font-family: "Space Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
}
.f05-hero__facts > div p {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #888;
}

/* ── 카테고리 ── */
.f05-cats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-bottom: 1px solid #1f1f1f;
}
@media (min-width: 768px) { .f05-cats { grid-template-columns: repeat(5, 1fr); } }
.f05-cat {
  padding: 3rem 2rem;
  border-right: 1px solid #e5e5e5;
  cursor: pointer;
  transition: background 0.2s;
}
.f05-cat:hover { background: #f7f5f0; }
.f05-cat__num {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.2em;
  margin-bottom: 0.75rem;
}
.f05-cat__name {
  font-family: "Space Mono", monospace;
  font-size: 1.125rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
}
.f05-cat__jp {
  font-family: var(--font-headline);
  font-size: 0.75rem;
  color: #888;
}

/* ── 상품 ── */
.f05-products {
  padding: 5rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-products__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f05-products__label {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 0.5rem;
}
.f05-products__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 500;
}
.f05-products__tabs { display: flex; gap: 0; }
.f05-products__tab {
  background: transparent;
  border: 1px solid #1f1f1f;
  padding: 0.5rem 1rem;
  margin-left: -1px;
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.f05-products__tab--active {
  background: #1f1f1f;
  color: #fff;
}
.f05-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem 1px;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
}
@media (min-width: 768px) { .f05-products__grid { grid-template-columns: repeat(4, 1fr); } }
.f05-item {
  cursor: pointer;
  padding: 1.5rem;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  transition: background 0.2s;
}
.f05-item:hover { background: #f7f5f0; }
.f05-item__img-wrap {
  position: relative;
  aspect-ratio: 1/1;
  background: #f7f5f0;
  margin-bottom: 1rem;
  overflow: hidden;
}
.f05-item__img-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f05-item:hover .f05-item__img-wrap img { transform: scale(1.04); }
.f05-item__code {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: #fff;
  padding: 0.25rem 0.5rem;
  font-family: "Space Mono", monospace;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #1f1f1f;
}
.f05-item__brand {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.1em;
  margin-bottom: 0.375rem;
}
.f05-item__name {
  font-size: 0.8125rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
  line-height: 1.4;
}
.f05-item__bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.f05-item__price {
  font-family: "Space Mono", monospace;
  font-size: 0.9375rem;
  font-weight: 700;
}
.f05-item__arrow {
  font-size: 1rem;
  color: #1f1f1f;
  transition: transform 0.3s;
}
.f05-item:hover .f05-item__arrow { transform: translateX(4px); }

/* ── 매니페스토 ── */
.f05-manifesto {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 8rem 3rem;
  border-bottom: 1px solid #1f1f1f;
  background: #f7f5f0;
}
@media (min-width: 1024px) {
  .f05-manifesto {
    grid-template-columns: 1fr 3fr 1fr;
    gap: 3rem;
  }
}
.f05-manifesto__side {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem 0;
}
.f05-manifesto__label {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.15em;
}
.f05-manifesto__jp {
  writing-mode: vertical-rl;
  font-family: var(--font-headline);
  font-size: 1rem;
  color: #888;
  letter-spacing: 0.1em;
}
.f05-manifesto__main {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.f05-manifesto__line {
  font-family: "Space Mono", monospace;
  font-size: clamp(2.5rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.04em;
  margin-bottom: 0.5rem;
}
.f05-manifesto__line--alt {
  padding-left: 2rem;
  color: #888;
}
.f05-manifesto__note {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  font-size: 0.8125rem;
  line-height: 1.7;
  color: #666;
}
.f05-manifesto__sign {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  color: #999;
  margin-top: 1rem;
}

/* ── 브랜드 리스트 ── */
.f05-brands {
  padding: 5rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-brands__head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  flex-wrap: wrap;
}
.f05-brands__label {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f05-brands__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 500;
}
.f05-brands__list { display: flex; flex-direction: column; }
.f05-brand-row {
  display: grid;
  grid-template-columns: auto 1fr auto auto auto;
  gap: 2rem;
  align-items: center;
  padding: 1.75rem 0;
  border-bottom: 1px solid #e5e5e5;
  color: #1f1f1f;
  transition: padding-left 0.3s, background 0.3s;
}
.f05-brand-row:hover { padding-left: 1rem; background: #f7f5f0; }
.f05-brand-row__no {
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  color: #999;
  letter-spacing: 0.15em;
}
.f05-brand-row__name {
  font-family: "Space Mono", monospace;
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.f05-brand-row__desc {
  font-size: 0.8125rem;
  color: #666;
  font-style: italic;
}
.f05-brand-row__year {
  font-family: "Space Mono", monospace;
  font-size: 0.75rem;
  color: #999;
}
.f05-brand-row__arrow {
  font-size: 1rem;
  transition: transform 0.3s;
}
.f05-brand-row:hover .f05-brand-row__arrow { transform: translateX(6px); }

/* ── 가이드북 ── */
.f05-guide {
  padding: 7rem 3rem;
  border-bottom: 1px solid #1f1f1f;
}
.f05-guide__head {
  display: flex;
  align-items: baseline;
  gap: 1.5rem;
  margin-bottom: 3.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e5e5e5;
  flex-wrap: wrap;
}
.f05-guide__label {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}
.f05-guide__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 500;
}
.f05-guide__steps {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  border-top: 1px solid #e5e5e5;
  border-left: 1px solid #e5e5e5;
}
@media (min-width: 768px) { .f05-guide__steps { grid-template-columns: repeat(3, 1fr); } }
.f05-step {
  padding: 3rem;
  border-right: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
}
.f05-step__num {
  font-family: "Space Mono", monospace;
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f1f1f;
  margin-bottom: 1.5rem;
  line-height: 1;
}
.f05-step h3 {
  font-family: "Space Mono", monospace;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  margin-bottom: 1rem;
}
.f05-step p {
  font-size: 0.8125rem;
  line-height: 1.8;
  color: #666;
}

/* ── 스펙 테이블 ── */
.f05-specs {
  padding: 7rem 3rem;
  border-bottom: 1px solid #1f1f1f;
  background: #f7f5f0;
}
.f05-specs__label {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 0.5rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.f05-specs__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 500;
  margin-bottom: 2.5rem;
  max-width: 1100px;
  margin-left: auto;
  margin-right: auto;
}
.f05-specs__table {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  border-collapse: collapse;
  font-family: "Space Mono", monospace;
  font-size: 0.8125rem;
}
.f05-specs__table th,
.f05-specs__table td {
  padding: 1rem 1.25rem;
  text-align: left;
  border-bottom: 1px solid #e5e5e5;
}
.f05-specs__table th {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #999;
  border-bottom: 1px solid #1f1f1f;
}
.f05-specs__table tr:last-child td { border-bottom: none; }
.f05-specs__table td {
  background: #fff;
}

/* ── 큰 카피 ── */
.f05-copy {
  padding: 10rem 3rem;
  text-align: center;
}
.f05-copy p {
  font-family: "Space Mono", monospace;
  font-size: clamp(3rem, 8vw, 6.5rem);
  font-weight: 700;
  line-height: 1;
  letter-spacing: -0.03em;
  color: #1f1f1f;
}
.f05-copy p em {
  font-style: italic;
  color: #888;
}
.f05-copy__jp {
  font-family: var(--font-headline) !important;
  font-weight: 400 !important;
  font-size: 1.25rem !important;
  color: #999 !important;
  margin-top: 1.5rem;
  letter-spacing: 0.2em !important;
}

/* ── 자체 푸터 ── */
.f05-foot {
  background: #1f1f1f;
  color: #fff;
  padding: 0;
}
.f05-foot__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}
@media (min-width: 768px) { .f05-foot__grid { grid-template-columns: 2fr 1fr 1fr 1fr 1fr; } }
.f05-foot__col {
  padding: 3rem 2rem;
  border-right: 1px solid #333;
  border-bottom: 1px solid #333;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.f05-foot__brand {
  font-family: "Space Mono", monospace;
  font-size: 1.75rem;
  font-weight: 700;
  letter-spacing: -0.02em;
}
.f05-foot__tag {
  font-family: "Space Mono", monospace;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #888;
  letter-spacing: 0.15em;
}
.f05-foot__jp {
  font-family: var(--font-headline);
  font-size: 0.875rem;
  color: #888;
  letter-spacing: 0.15em;
}
.f05-foot__label {
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #888;
  margin-bottom: 0.5rem;
}
.f05-foot__col a,
.f05-foot__col p {
  font-size: 0.8125rem;
  color: #ccc;
  transition: color 0.2s;
}
.f05-foot__col a:hover { color: #fff; }

.f05-foot__bottom {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  font-family: "Space Mono", monospace;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #888;
  flex-wrap: wrap;
  gap: 0.75rem;
}
</style>
