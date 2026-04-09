<template>
  <main class="page-wrapper">
    <!-- ── 히어로 섹션: 4분할 패널 ── -->
    <section class="hero">
      <RouterLink
        v-for="panel in heroPanels"
        :key="panel.id"
        :to="panel.route"
        class="hero__panel"
      >
        <img :src="panel.image" :alt="panel.title" class="hero__img" />
        <!-- 하단 그라데이션 오버레이 -->
        <div class="hero__overlay"></div>
        <div class="hero__content">
          <span class="hero__curation">Curation 0{{ panel.id }}</span>
          <h2 class="hero__title">{{ panel.title }}</h2>
          <!-- 호버 시에만 보이는 버튼 -->
          <div class="hero__cta">
            <RouterLink to="/products" class="hero__btn"
              >Explore Persona</RouterLink
            >
          </div>
        </div>
      </RouterLink>
    </section>

    <!-- ── 신상품 캐러셀 섹션 ── -->
    <section class="arrivals">
      <div class="arrivals__header container--full">
        <div>
          <span class="arrivals__label">New Arrivals</span>
          <h3 class="arrivals__title">The SS24 Atelier Selection</h3>
        </div>
        <!-- 좌우 스크롤 버튼 -->
        <div class="arrivals__nav">
          <button
            class="arrivals__nav-btn"
            @click="scrollCarousel(-1)"
            aria-label="이전"
          >
            <span class="material-symbols-outlined">chevron_left</span>
          </button>
          <button
            class="arrivals__nav-btn"
            @click="scrollCarousel(1)"
            aria-label="다음"
          >
            <span class="material-symbols-outlined">chevron_right</span>
          </button>
        </div>
      </div>

      <!-- ref: JS에서 DOM 직접 접근할 때 사용 -->
      <div class="arrivals__carousel container--full" ref="carouselRef">
        <RouterLink
          v-for="product in products"
          :key="product.id"
          :to="`/products/${product.id}`"
          class="product-card"
        >
          <div class="product-card__img-wrap">
            <img
              :src="product.image"
              :alt="product.name"
              class="product-card__img"
            />
          </div>
          <div class="product-card__info">
            <div>
              <h4 class="product-card__name">{{ product.name }}</h4>
              <p class="product-card__category">{{ product.category }}</p>
            </div>
            <!-- toLocaleString(): 1850 → 1,850 -->
            <span class="product-card__price"
              >${{ product.price.toLocaleString() }}</span
            >
          </div>
        </RouterLink>
      </div>
    </section>
    <!-- ── 스토리 섹션: 호버 시 원단 텍스처로 전환 ── -->
    <section class="story">
      <div class="story__inner container--full">
        <div class="story__text">
          <span class="story__label">Tactile Excellence</span>
          <h3 class="story__title">The Integrity of Fabric.</h3>
          <p class="story__desc">
            Every piece in our Atelier collection begins with a thread. We
            source exclusive silks and recycled wools from historic mills across
            the Biella region, ensuring that the touch of the garment is as
            profound as its silhouette.
          </p>
          <a href="#" class="story__link">Read The Fabric Story</a>
        </div>

        <!-- 호버 시 모델 사진 → 원단 텍스처로 전환 -->
        <div
          class="story__img-wrap"
          @mouseenter="showTexture = true"
          @mouseleave="showTexture = false"
        >
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmIhUbDbYcPm8yaZZiOZD2hzDc7E8cE-aztWTc5lWA3QaM4WJY2JPkFCQZ01PXzwNp2XcNRpj1qiND7unbrUcxKo6VKTq-Lu3Aiy1zt7hRngNHt0C4nqJ7gS3kKnEWzit6NJEkWIDnPRngHvDA4jcIsBpqCCs7lhSt-kOe_7ui5spLssSpvMRjxNHmq27PcKm2H02p-Vf05xKhGGxt5p_QDX3u5R9h3GLzFiLbccsHfNLW1XjelABgO1FfwGkqifsyMGNXazAA0Yk0"
            alt="Model"
            class="story__img story__img--model"
            :class="{ 'story__img--hidden': showTexture }"
          />
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3TWOmLGlqBBlkocnfZuY2gghxQ5-VuZ9Tg4DqE6Anl6s132_c-H4NPnIKIVv-VtSDQAcf_th5Y_ObEL5WshMhVLfCQuq2zPq5SrF4_xCIyvpCQnbwInGCDIOTz5clHFUd4Okbn2CR-cD1EWtCMLMiyna_vTcQqvm7r-kqmbTCnrV_Gd2WkO6JPh2ehC40p5L_IobrfLC4fhaPhorSFenIwLQk5amq5DZBqJ20INsVAo9XHXwj2yz-uGCgSLdbSkTLrGasTqzb0z3V"
            alt="Fabric texture"
            class="story__img story__img--texture"
            :class="{ 'story__img--visible': showTexture }"
          />
          <div class="story__hint">
            <span class="material-symbols-outlined" style="font-size: 1rem"
              >visibility</span
            >
            <span>Hover to feel</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 브랜드 벤토 그리드 ── -->
    <section class="bento">
      <div class="bento__inner container--full">
        <div class="bento__main">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuD4Oe74e_qYKjXfYH27bIXCbQxNtrwN3wXS7e36812qxwoOPzcSaycQeqEq1DfS-imYsQBGfa--NWKetULaBOEoST_eTeWeiQM0kcxpWEMOJY6c5VYgLkjjHtnOiGonUstK4h2JVVCSvcdObySIdZAuMVUJqb50R0lBKyxj1vP7XDr9ksAGUkAI_3Ptubt2GwYOEqs3k_dFd4Z7XjmwYdM4IxVw2Ewy5G-81wP5L9vLIW5mbK_3P6xu0HIJevERWerJtclczjQyuc0r"
            alt="Atelier store"
            class="bento__main-img"
          />
          <div class="bento__main-overlay">
            <h4 class="bento__main-title">Visit The Atelier</h4>
            <p class="bento__main-desc">
              Experience our seasonal curation in person at our flagship spaces
              in Milan and Tokyo.
            </p>
            <button class="bento__main-btn">Store Locator</button>
          </div>
        </div>

        <div class="bento__side">
          <!-- 뉴스레터 -->
          <div class="bento__newsletter">
            <h4 class="bento__newsletter-title">Join The Circle.</h4>
            <p class="bento__newsletter-desc">
              Early access to archive sales and exclusive invitations to
              editorial previews.
            </p>
            <div class="bento__newsletter-form">
              <input
                v-model="newsletterEmail"
                type="email"
                placeholder="Email Address"
                class="bento__newsletter-input"
              />
              <button class="bento__newsletter-btn">Sign Up</button>
            </div>
          </div>

          <!-- 순환 약속 -->
          <div class="bento__circular">
            <span class="material-symbols-outlined bento__circular-icon"
              >eco</span
            >
            <h4 class="bento__circular-title">Circular Promise</h4>
            <p class="bento__circular-desc">
              Our buy-back program allows you to return any Atelier piece for
              store credit, fostering a truly sustainable ecosystem.
            </p>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";

const productStore = useProductStore();

// storeToRefs: store의 상태를 반응형 ref로 꺼내옴
// 구조분해할당으로 꺼내면 반응성이 깨져서 storeToRefs 사용
const { products } = storeToRefs(productStore);

// 컴포넌트가 마운트될 때 상품 목록 불러오기
onMounted(() => {
  productStore.fetchProducts();
});

// 캐러셀 DOM 참조
const carouselRef = ref(null);

// direction: -1 = 왼쪽, 1 = 오른쪽
function scrollCarousel(direction) {
  if (!carouselRef.value) return;
  carouselRef.value.scrollBy({ left: direction * 440, behavior: "smooth" });
}

// 히어로 패널 데이터 (4개)
const heroPanels = [
  {
    id: 1,
    title: "BEANPOLE",
    route: "/beanpole",
    image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg",
  },
  {
    id: 2,
    title: "LEVI'S",
    route: "/levis",
    image:
      "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899",
  },
  {
    id: 3,
    title: "Dickies",
    route: "/dickies",
    image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg",
  },
  {
    id: 4,
    title: "Carhartt",
    route: "/carhartt",
    image:
      "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg",
  },
];
const showTexture = ref(false); // 스토리 섹션 호버 상태
const newsletterEmail = ref(""); // 뉴스레터 이메일 입력
</script>

<style scoped>
/* ── 히어로 ── */
.hero {
  display: flex;
  /* 헤더 높이를 빼서 화면 꽉 채움 */
  height: calc(100dvh - var(--header-height));
  overflow: hidden;
}

.hero__panel {
  position: relative;
  flex: 1;
  overflow: hidden;
  cursor: pointer;
  border-right: 0.5px solid rgba(249, 249, 249, 0.1);
  /* 호버 시 flex 값이 커지면서 패널이 넓어지는 효과 */
  transition: flex 0.6s cubic-bezier(0.25, 1, 0.5, 1);
}

.hero__panel:last-child {
  border-right: none;
}

.hero__panel:hover {
  flex: 1.5; /* 호버된 패널이 다른 것보다 1.5배 넓어짐 */
}

.hero__img {
  position: absolute;
  inset: 0; /* top/right/bottom/left: 0 단축 */
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) brightness(0.95); /* 기본: 흑백 */
  transition:
    transform 0.7s,
    filter 0.5s;
}

.hero__panel:hover .hero__img {
  transform: scale(1.1);
  filter: grayscale(0) brightness(0.95); /* 호버: 컬러로 전환 */
}

/* 하단 그라데이션 (텍스트 가독성 확보) */
.hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(26, 28, 28, 0.8) 0%,
    transparent 60%
  );
}

.hero__content {
  position: absolute;
  bottom: 3rem;
  left: 3rem;
}

.hero__curation {
  display: block;
  font-size: 0.6875rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(249, 249, 249, 0.7);
  margin-bottom: 0.5rem;
}

.hero__title {
  font-family: var(--font-headline);
  font-size: 3rem;
  font-weight: 400;
  color: #ffffff;
  line-height: 1;
}

/* 버튼: 기본 숨김 → 호버 시 표시 */
.hero__cta {
  margin-top: 1.5rem;
  opacity: 0;
  transition: opacity 0.5s;
}

.hero__panel:hover .hero__cta {
  opacity: 1;
}

.hero__btn {
  display: inline-block;
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  padding: 0.75rem 2rem;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition: opacity 0.2s;
}

.hero__btn:hover {
  opacity: 0.85;
}

/* ── 신상품 섹션 ── */
.arrivals {
  padding: 5rem 0;
  background-color: var(--color-surface);
}

.arrivals__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 3rem;
}

.arrivals__label {
  display: block;
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 0.75rem;
}

.arrivals__title {
  font-family: var(--font-headline);
  font-size: 2rem;
  font-weight: 400;
}

.arrivals__nav {
  display: flex;
  gap: 0.75rem;
}

.arrivals__nav-btn {
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0.5px solid var(--color-outline-variant);
  transition: border-color 0.2s;
}

.arrivals__nav-btn:hover {
  border-color: var(--color-primary);
}

/* 캐러셀: 가로 스크롤 */
.arrivals__carousel {
  display: flex;
  gap: 2rem;
  overflow-x: auto; /* 가로 스크롤 활성화 */
  scroll-snap-type: x mandatory; /* 카드 단위로 스냅 */
  scrollbar-width: none; /* 스크롤바 숨김 (Firefox) */
  padding-bottom: 2rem;
}

.arrivals__carousel::-webkit-scrollbar {
  display: none; /* 스크롤바 숨김 (Chrome) */
}

/* ── 상품 카드 ── */
.product-card {
  min-width: 400px;
  scroll-snap-align: start; /* 스냅 기준점: 카드 왼쪽 */
  display: block;
  cursor: pointer;
}

.product-card__img-wrap {
  background-color: var(--color-surface-container-lowest);
  padding: 2.5rem;
  margin-bottom: 1.25rem;
  overflow: hidden;
  box-shadow: 0 12px 40px rgba(26, 28, 28, 0.02);
  transition: box-shadow 0.5s;
}

.product-card:hover .product-card__img-wrap {
  box-shadow: 0 20px 60px rgba(26, 28, 28, 0.08);
}

.product-card__img {
  width: 100%;
  height: 500px;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-card:hover .product-card__img {
  transform: scale(1.05);
}

.product-card__info {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.product-card__name {
  font-family: var(--font-headline);
  font-size: 1.0625rem;
  font-weight: 400;
}

.product-card__category {
  font-size: 0.8125rem;
  color: var(--color-on-surface-variant);
  margin-top: 0.25rem;
}

.product-card__price {
  font-size: 0.9375rem;
  font-weight: 500;
  color: var(--color-secondary);
}
/* ── 스토리 섹션 ── */
.story {
  padding: 8rem 0;
  background-color: var(--color-surface-container-low);
  overflow: hidden;
}

.story__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 6rem;
  align-items: center;
}

@media (min-width: 768px) {
  .story__inner {
    grid-template-columns: 1fr 1fr;
  }
}

.story__label {
  display: block;
  font-size: 0.6875rem;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
}

.story__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 2rem;
}

.story__desc {
  font-size: 1.0625rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
  max-width: 28rem;
  margin-bottom: 2.5rem;
}

.story__link {
  display: inline-block;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-weight: 600;
  border-bottom: 2px solid var(--color-primary);
  padding-bottom: 2px;
  transition: opacity 0.2s;
}

.story__link:hover {
  opacity: 0.6;
}

.story__img-wrap {
  position: relative;
  aspect-ratio: 4/5;
  cursor: crosshair;
  overflow: hidden;
}

.story__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition:
    opacity 0.7s,
    transform 1s;
}

.story__img--model {
  opacity: 1;
  filter: grayscale(1);
  z-index: 1;
}

.story__img--hidden {
  opacity: 0;
}

.story__img--texture {
  opacity: 0;
  transform: scale(1.05);
  z-index: 0;
}

.story__img--visible {
  opacity: 1;
  transform: scale(1);
}

.story__hint {
  position: absolute;
  top: 2rem;
  right: 2rem;
  z-index: 2;
  background-color: var(--color-surface-container-lowest);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.625rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* ── 벤토 그리드 ── */
.bento {
  padding: 8rem 0;
  background-color: var(--color-surface);
}

.bento__inner {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  height: auto;
}

@media (min-width: 768px) {
  .bento__inner {
    grid-template-columns: 2fr 1fr;
    height: 900px;
  }
}

/* 왼쪽: 큰 이미지 */
.bento__main {
  position: relative;
  overflow: hidden;
  background-color: var(--color-surface-container-high);
  min-height: 400px;
}

.bento__main-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.8;
  transition: transform 0.7s;
}

.bento__main:hover .bento__main-img {
  transform: scale(1.05);
}

.bento__main-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 3rem;
  background: linear-gradient(
    to top,
    rgba(26, 28, 28, 0.6) 0%,
    transparent 60%
  );
}

.bento__main-title {
  font-family: var(--font-headline);
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1rem;
}

.bento__main-desc {
  color: rgba(249, 249, 249, 0.8);
  max-width: 22rem;
  font-size: 0.9375rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.bento__main-btn {
  width: fit-content;
  border: 1px solid rgba(249, 249, 249, 1);
  padding: 0.75rem 2rem;
  color: #ffffff;
  font-size: 0.6875rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  transition:
    background-color 0.2s,
    color 0.2s;
}

.bento__main-btn:hover {
  background-color: #ffffff;
  color: var(--color-on-surface);
}

/* 오른쪽: 2개 박스 */
.bento__side {
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 2rem;
}

/* 뉴스레터 박스 */
.bento__newsletter {
  background-color: var(--color-primary);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.bento__newsletter-title {
  font-family: var(--font-headline);
  font-size: 1.875rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.2;
  margin-bottom: 1.5rem;
}

.bento__newsletter-desc {
  color: rgba(249, 249, 249, 0.7);
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.bento__newsletter-form {
  position: relative;
}

.bento__newsletter-input {
  width: 100%;
  background: transparent;
  border: none;
  border-bottom: 1px solid rgba(249, 249, 249, 0.3);
  padding-bottom: 0.75rem;
  color: #ffffff;
  font-size: 0.875rem;
}

.bento__newsletter-input::placeholder {
  color: rgba(249, 249, 249, 0.5);
}

.bento__newsletter-input:focus {
  border-bottom-color: #ffffff;
}

.bento__newsletter-btn {
  position: absolute;
  right: 0;
  bottom: 0.75rem;
  color: #ffffff;
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

/* 순환 약속 박스 */
.bento__circular {
  background-color: var(--color-surface-container-low);
  padding: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.bento__circular-icon {
  font-size: 2.5rem !important;
  color: var(--color-secondary);
  margin-bottom: 1.5rem;
}

.bento__circular-title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.bento__circular-desc {
  font-size: 0.875rem;
  color: var(--color-on-surface-variant);
  line-height: 1.7;
}
</style>
