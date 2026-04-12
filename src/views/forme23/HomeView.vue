<template>
  <main class="f23">
    <!-- ═══ 자체 헤더 ═══ -->
    <header class="f23-topbar">
      <div class="f23-topbar__util">
        <RouterLink to="/forme" class="f23-topbar__link">◁ PICKER</RouterLink>
        <span class="f23-topbar__sep">|</span>
        <a>MEMBERSHIP</a><a>STORES</a><a>CONTACT</a>
        <span class="f23-topbar__lang">KR | EN</span>
      </div>
      <div class="f23-topbar__main">
        <nav class="f23-topbar__nav-left">
          <a>WOMEN</a><a>MEN</a><a>NEW IN</a>
        </nav>
        <div class="f23-topbar__logo">FORME</div>
        <nav class="f23-topbar__nav-right">
          <a>BRAND</a><a>COLLECTIONS</a>
          <a class="f23-topbar__sale">OUTLET</a>
        </nav>
      </div>
      <div class="f23-topbar__icons">
        <span>🔍 Search</span>
        <span>♡ Wishlist</span>
        <span>👤 My</span>
        <span>🛒 Bag (0)</span>
        <span class="f23-topbar__sep">|</span>
        <RouterLink to="/" class="f23-topbar__link">HOME ▷</RouterLink>
      </div>
    </header>

    <!-- ═══ Hero ═══ -->
    <section class="f23-hero">
      <img
        src="https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899"
        alt="hero"
        class="f23-hero__bg"
      />
      <div class="f23-hero__frame">
        <p class="f23-hero__tag">SS 2026 EXCLUSIVE</p>
        <h1 class="f23-hero__title">THE RETURN<br />OF CLASSIC</h1>
        <div class="f23-hero__line"></div>
        <p class="f23-hero__sub">FORME가 선별한 4개의 헤리티지 브랜드.<br />봄의 클래식을 다시 정의합니다.</p>
        <div class="f23-hero__cta-group">
          <RouterLink to="/products" class="f23-hero__cta">DISCOVER →</RouterLink>
          <RouterLink to="/signup" class="f23-hero__cta f23-hero__cta--outline">JOIN MEMBERSHIP</RouterLink>
        </div>
      </div>
      <div class="f23-hero__dots">
        <span class="f23-hero__dot f23-hero__dot--active"></span>
        <span class="f23-hero__dot"></span>
        <span class="f23-hero__dot"></span>
      </div>
    </section>

    <!-- ═══ Ticker ═══ -->
    <div class="f23-ticker">
      <span>✦ 전 상품 당일 출고 ✦ 시즌 오퍼 최대 30% ✦ 멤버 전용 5% 추가 할인 ✦ 무료 반품 ✦ 전 상품 당일 출고 ✦ 시즌 오퍼 최대 30% ✦</span>
    </div>

    <!-- ═══ Promo Benefits ═══ -->
    <section class="f23-benefits">
      <div v-for="s in services" :key="s.title" class="f23-benefit">
        <div class="f23-benefit__icon">{{ s.icon }}</div>
        <div>
          <h4>{{ s.title }}</h4>
          <p>{{ s.desc }}</p>
        </div>
      </div>
    </section>

    <!-- ═══ Brand Showcase ═══ -->
    <section class="f23-showcase">
      <header class="f23-sec-head">
        <div>
          <p class="f23-sec-head__code">— BRANDS</p>
          <h2 class="f23-sec-head__title">THE HOUSES</h2>
        </div>
        <p class="f23-sec-head__sub">4 HOUSES · 542 ITEMS · EST. ACROSS CENTURIES</p>
      </header>

      <div class="f23-showcase__grid">
        <RouterLink
          v-for="(b, i) in brands"
          :key="b.id"
          :to="b.route"
          class="f23-card"
        >
          <div class="f23-card__number">0{{ i + 1 }}</div>
          <div class="f23-card__img"><img :src="b.img" :alt="b.name" /></div>
          <div class="f23-card__info">
            <p class="f23-card__since">{{ b.since }}</p>
            <h3>{{ b.name }}</h3>
            <p class="f23-card__desc">{{ b.desc }}</p>
            <div class="f23-card__meta">
              <span>{{ b.items }}개 상품</span>
              <span>★ {{ b.rating }}</span>
              <span>{{ b.city }}</span>
            </div>
            <span class="f23-card__cta">VIEW COLLECTION →</span>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Season Offer ═══ -->
    <section class="f23-offer">
      <div class="f23-offer__inner">
        <div class="f23-offer__left">
          <p class="f23-offer__tag">LIMITED TIME OFFER</p>
          <h2 class="f23-offer__title">SEASON<br /><span>SALE</span></h2>
          <p class="f23-offer__pct">UP TO 30% OFF</p>
          <p class="f23-offer__sub">3월 31일까지 · 전 브랜드 한정 수량</p>
        </div>
        <div class="f23-offer__right">
          <div class="f23-offer__timer">
            <div v-for="t in timer" :key="t.label" class="f23-offer__unit">
              <strong>{{ t.value }}</strong>
              <span>{{ t.label }}</span>
            </div>
          </div>
          <RouterLink to="/products" class="f23-offer__cta">SHOP NOW →</RouterLink>
        </div>
      </div>
    </section>

    <!-- ═══ Editor's Pick (가로 스크롤) ═══ -->
    <section class="f23-picks">
      <header class="f23-sec-head f23-sec-head--inline">
        <div>
          <p class="f23-sec-head__code">— EDITORS' PICK</p>
          <h2 class="f23-sec-head__title">EXCLUSIVE SELECTION</h2>
        </div>
        <div class="f23-picks__nav">
          <button @click="scrollPicks(-1)">◁</button>
          <button @click="scrollPicks(1)">▷</button>
        </div>
      </header>

      <div class="f23-picks__scroll" ref="picksRef">
        <RouterLink
          v-for="(p, i) in products"
          :key="i"
          :to="`/products/${p.id}`"
          class="f23-prod"
        >
          <div class="f23-prod__img">
            <img :src="p.img" :alt="p.name" />
            <span v-if="p.tag" class="f23-prod__tag">{{ p.tag }}</span>
            <div class="f23-prod__hover">
              <button>QUICK VIEW</button>
              <button>+ WISHLIST</button>
            </div>
          </div>
          <div class="f23-prod__info">
            <p class="f23-prod__brand">{{ p.brand }}</p>
            <h3>{{ p.name }}</h3>
            <div class="f23-prod__price-row">
              <span class="f23-prod__now">₩ {{ p.price }}</span>
              <span v-if="p.was" class="f23-prod__was">₩ {{ p.was }}</span>
              <span v-if="p.discount" class="f23-prod__dc">{{ p.discount }}</span>
            </div>
            <div class="f23-prod__colors">
              <span v-for="c in p.colors" :key="c" class="f23-prod__color" :style="{ backgroundColor: c }"></span>
            </div>
            <div class="f23-prod__rating">
              <span>★ {{ p.rating }}</span>
              <span>({{ p.reviews }})</span>
              <span v-if="p.freeShip" class="f23-prod__ship">무료배송</span>
            </div>
          </div>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Weekly Best (그리드 + 탭) ═══ -->
    <section class="f23-best">
      <header class="f23-sec-head">
        <div>
          <p class="f23-sec-head__code">— WEEKLY RANKING</p>
          <h2 class="f23-sec-head__title">BEST SELLERS</h2>
        </div>
        <div class="f23-best__tabs">
          <button
            v-for="t in bestTabs"
            :key="t"
            class="f23-best__tab"
            :class="{ 'f23-best__tab--active': activeBestTab === t }"
            @click="activeBestTab = t"
          >{{ t }}</button>
        </div>
      </header>
      <div class="f23-best__grid">
        <RouterLink
          v-for="(p, i) in products.slice(0, 8)"
          :key="p.id"
          :to="`/products/${p.id}`"
          class="f23-rank"
        >
          <div class="f23-rank__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f23-rank__no" :class="{ 'f23-rank__no--top': i < 3 }">{{ i + 1 }}</span>
          </div>
          <p class="f23-rank__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <div class="f23-rank__price">
            <span v-if="p.discount" class="f23-rank__dc">{{ p.discount }}</span>
            <span>₩ {{ p.price }}</span>
          </div>
          <p class="f23-rank__review">★ {{ p.rating }} · 리뷰 {{ p.reviews }}</p>
        </RouterLink>
      </div>
    </section>

    <!-- ═══ Lookbook ═══ -->
    <section class="f23-lookbook">
      <div class="f23-lookbook__left">
        <p class="f23-sec-head__code">— LOOKBOOK</p>
        <h2 class="f23-lookbook__title">SPRING 2026</h2>
        <p class="f23-lookbook__desc">
          "옷은 삶의 배경이 되어야 합니다."<br />
          FORME의 2026 봄 룩북에서는 일상과 자연스럽게<br />
          어울리는 클래식을 제안합니다.
        </p>
        <RouterLink to="/products" class="f23-lookbook__cta">VIEW LOOKBOOK →</RouterLink>
      </div>
      <div class="f23-lookbook__right">
        <div class="f23-lookbook__img f23-lookbook__img--1">
          <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="look" />
        </div>
        <div class="f23-lookbook__img f23-lookbook__img--2">
          <img src="https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" alt="look" />
        </div>
      </div>
    </section>

    <!-- ═══ Magazine ═══ -->
    <section class="f23-magazine">
      <header class="f23-sec-head">
        <div>
          <p class="f23-sec-head__code">— MAGAZINE</p>
          <h2 class="f23-sec-head__title">FORME JOURNAL</h2>
        </div>
      </header>
      <div class="f23-magazine__grid">
        <article v-for="m in magazine" :key="m.title" class="f23-article">
          <div class="f23-article__img"><img :src="m.img" :alt="m.title" /></div>
          <div class="f23-article__info">
            <span class="f23-article__cat">{{ m.cat }}</span>
            <h3>{{ m.title }}</h3>
            <p>{{ m.excerpt }}</p>
            <span class="f23-article__date">{{ m.date }}</span>
          </div>
        </article>
      </div>
    </section>

    <!-- ═══ Newsletter ═══ -->
    <section class="f23-newsletter">
      <div class="f23-newsletter__inner">
        <h2>Stay Updated.</h2>
        <p>새 컬렉션과 멤버 전용 혜택을 가장 먼저 받아보세요.</p>
        <div class="f23-newsletter__form">
          <input type="email" placeholder="이메일 주소를 입력해주세요" />
          <button>구독하기</button>
        </div>
      </div>
    </section>

    <!-- ═══ 자체 푸터 ═══ -->
    <footer class="f23-foot">
      <div class="f23-foot__main">
        <div class="f23-foot__brand">
          <h3 class="f23-foot__logo">FORME</h3>
          <p class="f23-foot__slogan">The House of Curated Heritage</p>
          <div class="f23-foot__social">
            <a>IG</a><a>FB</a><a>YT</a><a>KT</a>
          </div>
        </div>
        <div class="f23-foot__grid">
          <div class="f23-foot__col">
            <h4>SHOP</h4>
            <a>NEW IN</a><a>WOMEN</a><a>MEN</a>
            <RouterLink to="/beanpole">BEANPOLE</RouterLink>
            <RouterLink to="/carhartt">CARHARTT</RouterLink>
            <RouterLink to="/levis">LEVI'S</RouterLink>
            <RouterLink to="/dickies">DICKIES</RouterLink>
            <a>SALE</a>
          </div>
          <div class="f23-foot__col">
            <h4>SERVICE</h4>
            <a>DELIVERY</a><a>RETURNS</a><a>SIZE GUIDE</a><a>GIFT CARDS</a><a>PERSONAL SHOPPING</a>
          </div>
          <div class="f23-foot__col">
            <h4>CUSTOMER</h4>
            <a>고객센터 1588-0000</a>
            <a>평일 09:00~18:00</a>
            <RouterLink to="/faq">FAQ</RouterLink>
            <RouterLink to="/qna">1:1 문의</RouterLink>
          </div>
          <div class="f23-foot__col">
            <h4>ABOUT</h4>
            <a>OUR STORY</a><a>STORES</a><a>CAREERS</a><a>PRESS</a><a>SUSTAINABILITY</a>
          </div>
        </div>
      </div>
      <div class="f23-foot__legal">
        <p>(주)FORME | 대표이사 김보경 | 사업자등록번호 000-00-00000 | 통신판매업 제2026-서울강남-00000호</p>
        <p>서울특별시 강남구 테헤란로 000 | 개인정보책임자 김보경 | privacy@forme.kr</p>
        <p>© 2026 FORME Corp. Seoul, Korea. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
import { ref } from "vue";

const picksRef = ref(null);
function scrollPicks(dir) {
  if (!picksRef.value) return;
  picksRef.value.scrollBy({ left: dir * 380, behavior: "smooth" });
}

const activeBestTab = ref("전체");
const bestTabs = ["전체", "남성", "여성", "아우터", "데님"];

const timer = [
  { value: "02", label: "DAYS" },
  { value: "14", label: "HRS" },
  { value: "38", label: "MIN" },
  { value: "22", label: "SEC" },
];

const services = [
  { icon: "🚚", title: "무료배송",      desc: "전 상품 무료배송 · 당일 출고" },
  { icon: "↩",  title: "7일 무료 반품", desc: "부담 없이 집에서 입어보세요" },
  { icon: "💳", title: "무이자 할부",   desc: "5만원 이상 최대 12개월" },
  { icon: "🏅", title: "멤버 혜택",     desc: "등급별 적립 및 단독 쿠폰" },
];

const brands = [
  { id: 1, name: "BEANPOLE", since: "EST. 1989", city: "Seoul",         desc: "한국 클래식의 정수. 30년 헤리티지.",      items: 142, rating: 4.7, route: "/beanpole", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, name: "CARHARTT", since: "EST. 1889", city: "Detroit",       desc: "디트로이트 워크웨어. 진정한 내구성.",     items: 98,  rating: 4.8, route: "/carhartt", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, name: "LEVI'S",   since: "EST. 1873", city: "San Francisco", desc: "150년 데님 헤리티지. 원형의 가치.",       items: 215, rating: 4.9, route: "/levis",    img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, name: "DICKIES",  since: "EST. 1922", city: "Fort Worth",    desc: "한 세기 워크웨어. 현장에서 일상까지.",   items: 87,  rating: 4.6, route: "/dickies",  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const products = [
  { id: 404, brand: "BEANPOLE", name: "헤리티지 울 코트",          price: "389,000", was: "459,000", discount: "-15%",  tag: "EXCLUSIVE", colors: ["#1a2b4a", "#8b7340", "#2a241c"], rating: "4.8", reviews: 248, freeShip: true, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 103, brand: "CARHARTT", name: "듀얼 프런트 워크 팬츠",     price: "188,100", was: "209,000", discount: "-10%",  tag: "BEST",      colors: ["#5c3318", "#1a1a1a"],            rating: "4.8", reviews: 187, freeShip: true, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 201, brand: "LEVI'S",   name: "555™ 스트레이트 진",        price: "135,150", was: "159,000", discount: "-15%",  tag: null,        colors: ["#1e2d4e", "#3a3a3a"],            rating: "4.9", reviews: 512, freeShip: true, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 301, brand: "DICKIES",  name: "카펜터 데님 팬츠",          price: "78,750",  was: "105,000", discount: "-25%",  tag: "SALE",      colors: ["#5b7fa6", "#1a1a1a"],            rating: "4.7", reviews: 342, freeShip: true, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { id: 401, brand: "BEANPOLE", name: "피그먼트 워싱 치노 팬츠",   price: "239,000", was: null,       discount: null,    tag: "NEW",       colors: ["#d4c5a9"],                      rating: "4.7", reviews: 156, freeShip: true, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 202, brand: "LEVI'S",   name: "565™ 루즈 스트레이트 진",   price: "99,000",  was: "129,000", discount: "-23%",  tag: "SALE",      colors: ["#1e2a3a"],                      rating: "4.6", reviews: 98,  freeShip: true, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 101, brand: "CARHARTT", name: "루즈핏 캔버스 워크 팬츠",   price: "140,000", was: "160,000", discount: "-13%",  tag: null,        colors: ["#b8a96a", "#3a3a3a"],            rating: "4.8", reviews: 187, freeShip: true, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 304, brand: "DICKIES",  name: "트리 로고 롱슬리브",        price: "69,000",  was: null,       discount: null,    tag: "NEW",       colors: ["#9e9e9e"],                      rating: "4.5", reviews: 64,  freeShip: true, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];

const magazine = [
  { cat: "STYLE GUIDE",  title: "봄 데님, 4가지 입는 법",         excerpt: "같은 데님 하나로 사무실부터 주말까지 커버하는 방법.",            date: "2026.04.08", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { cat: "BRAND STORY",  title: "1889, 디트로이트의 정직함",      excerpt: "칼하트가 137년 동안 지켜온 워크웨어의 기준에 대하여.",           date: "2026.04.05", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { cat: "CURATOR'S NOTE", title: "이번 시즌, 편집자가 고른 3벌", excerpt: "봄 옷장에 반드시 있어야 할 세 가지 아이템과 그 이유.",           date: "2026.04.01", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
];
</script>

<style scoped>
/* ════════════════════════════════
   FORME 23 — Premium Showcase
   FULL QUALITY · 100%
   ════════════════════════════════ */
.f23 {
  background: #fff;
  color: #1a1a1a;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* ── 자체 헤더 ── */
.f23-topbar { background: #fff; border-bottom: 1px solid #e5e5e5; }
.f23-topbar__util {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
  padding: 0.5rem 2.5rem;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.625rem;
  color: #888;
  letter-spacing: 0.1em;
}
.f23-topbar__util a { cursor: pointer; }
.f23-topbar__link { color: #c62828; transition: color 0.2s; }
.f23-topbar__link:hover { color: #1a1a1a; }
.f23-topbar__sep { color: #ddd; }
.f23-topbar__lang { padding-left: 0.75rem; border-left: 1px solid #ddd; }
.f23-topbar__main {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 1.5rem 2.5rem;
}
.f23-topbar__nav-left,
.f23-topbar__nav-right {
  display: flex;
  gap: 2.25rem;
}
.f23-topbar__nav-right { justify-content: flex-end; }
.f23-topbar__main a {
  font-size: 0.8125rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  color: #1a1a1a;
  cursor: pointer;
}
.f23-topbar__sale { color: #c62828 !important; }
.f23-topbar__logo {
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  text-align: center;
}
.f23-topbar__icons {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.25rem;
  padding: 0.625rem 2.5rem;
  border-top: 1px solid #f0f0f0;
  font-size: 0.6875rem;
  color: #888;
}
.f23-topbar__icons span { cursor: pointer; }

/* ── Hero ── */
.f23-hero {
  position: relative;
  height: 80vh;
  overflow: hidden;
}
.f23-hero__bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.78);
}
.f23-hero__frame {
  position: absolute;
  top: 50%;
  left: 8%;
  transform: translateY(-50%);
  max-width: 36rem;
  padding: 3.5rem;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid #e5e5e5;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
}
.f23-hero__tag {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #c62828;
  margin-bottom: 1.25rem;
}
.f23-hero__title {
  font-size: clamp(2.25rem, 4.5vw, 3.25rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 1.5rem;
}
.f23-hero__line {
  width: 3rem;
  height: 3px;
  background: #c62828;
  margin-bottom: 1.5rem;
}
.f23-hero__sub {
  font-size: 0.9375rem;
  color: #666;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}
.f23-hero__cta-group { display: flex; gap: 0.75rem; flex-wrap: wrap; }
.f23-hero__cta {
  display: inline-block;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f23-hero__cta--outline {
  background: transparent;
  border: 1px solid #1a1a1a;
  color: #1a1a1a;
}
.f23-hero__dots {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
}
.f23-hero__dot {
  width: 10px;
  height: 10px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 50%;
}
.f23-hero__dot--active {
  background: #fff;
  width: 28px;
  border-radius: 5px;
}

/* ── Ticker ── */
.f23-ticker {
  background: #1a1a1a;
  color: #fff;
  padding: 0.875rem 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-align: center;
}

/* ── Benefits ── */
.f23-benefits {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  background: #f7f5f0;
  border-bottom: 1px solid #e5e5e5;
}
.f23-benefit {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.75rem 2rem;
  border-right: 1px solid #e5e5e5;
}
.f23-benefit:last-child { border-right: none; }
.f23-benefit__icon { font-size: 1.75rem; flex-shrink: 0; }
.f23-benefit h4 { font-size: 0.8125rem; font-weight: 700; margin-bottom: 0.25rem; }
.f23-benefit p { font-size: 0.6875rem; color: #888; }

/* ── Section Head ── */
.f23-sec-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 5rem 3rem 2.5rem;
  max-width: 1400px;
  margin: 0 auto;
  flex-wrap: wrap;
  gap: 1.5rem;
}
.f23-sec-head--inline { border-bottom: none; }
.f23-sec-head__code {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  color: #c62828;
  margin-bottom: 0.5rem;
}
.f23-sec-head__title {
  font-size: clamp(1.75rem, 3.5vw, 2.5rem);
  font-weight: 900;
  letter-spacing: -0.02em;
}
.f23-sec-head__sub {
  font-size: 0.625rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #999;
}

/* ── Brand Showcase ── */
.f23-showcase { padding-bottom: 5rem; }
.f23-showcase__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f23-card {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  background: #f7f5f0;
  overflow: hidden;
  position: relative;
  color: inherit;
  transition: box-shadow 0.3s;
}
.f23-card:hover { box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08); }
.f23-card__number {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  font-size: 3.5rem;
  font-weight: 900;
  color: rgba(0, 0, 0, 0.06);
  line-height: 1;
}
.f23-card__img { aspect-ratio: 4/5; }
.f23-card__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.f23-card:hover .f23-card__img img { transform: scale(1.04); }
.f23-card__info {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.f23-card__since {
  font-size: 0.625rem;
  letter-spacing: 0.2em;
  color: #999;
  margin-bottom: 0.75rem;
}
.f23-card__info h3 {
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.01em;
  margin-bottom: 0.75rem;
}
.f23-card__desc {
  font-size: 0.875rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 1.25rem;
}
.f23-card__meta {
  display: flex;
  gap: 1rem;
  font-size: 0.6875rem;
  color: #999;
  margin-bottom: 1.5rem;
}
.f23-card__cta {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
  padding-bottom: 2px;
  width: fit-content;
}

/* ── Season Offer ── */
.f23-offer {
  padding: 6rem 3rem;
  background: #1a1a1a;
  color: #fff;
}
.f23-offer__inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}
.f23-offer__tag {
  font-size: 0.6875rem;
  letter-spacing: 0.3em;
  color: #c62828;
  margin-bottom: 1.25rem;
  font-weight: 700;
}
.f23-offer__title {
  font-size: clamp(3rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.03em;
  margin-bottom: 0.75rem;
}
.f23-offer__title span { color: #c62828; }
.f23-offer__pct {
  font-size: 1.25rem;
  font-weight: 900;
  color: #c62828;
  margin-bottom: 0.75rem;
}
.f23-offer__sub {
  font-size: 0.875rem;
  color: #aaa;
}
.f23-offer__right { text-align: center; }
.f23-offer__timer {
  display: flex;
  justify-content: center;
  gap: 2.5rem;
  margin-bottom: 3rem;
}
.f23-offer__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.f23-offer__unit strong {
  font-size: 3rem;
  font-weight: 900;
  letter-spacing: -0.02em;
  line-height: 1;
}
.f23-offer__unit span {
  font-size: 0.5625rem;
  letter-spacing: 0.25em;
  color: #999;
  margin-top: 0.5rem;
}
.f23-offer__cta {
  display: inline-block;
  padding: 1.125rem 3rem;
  background: #c62828;
  color: #fff;
  font-size: 0.8125rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}

/* ── Editor's Pick Carousel ── */
.f23-picks {
  padding-bottom: 5rem;
  border-top: 1px solid #e5e5e5;
}
.f23-picks__nav { display: flex; gap: 0.5rem; }
.f23-picks__nav button {
  width: 2.75rem;
  height: 2.75rem;
  border: 1px solid #ddd;
  background: #fff;
  color: #1a1a1a;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.f23-picks__nav button:hover {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}
.f23-picks__scroll {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: 0 3rem;
}
.f23-picks__scroll::-webkit-scrollbar { display: none; }

.f23-prod {
  flex: 0 0 300px;
  scroll-snap-align: start;
  color: inherit;
  cursor: pointer;
}
.f23-prod__img {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f7f5f0;
  margin-bottom: 1rem;
}
.f23-prod__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f23-prod:hover .f23-prod__img img { transform: scale(1.04); }
.f23-prod__tag {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #c62828;
  color: #fff;
  padding: 0.375rem 0.625rem;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
}
.f23-prod__hover {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.75rem;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  transition: opacity 0.3s;
}
.f23-prod:hover .f23-prod__hover { opacity: 1; }
.f23-prod__hover button {
  flex: 1;
  padding: 0.5rem;
  background: #fff;
  border: none;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  cursor: pointer;
}
.f23-prod__info { padding: 0 0.25rem; }
.f23-prod__brand {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f23-prod__info h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.625rem;
  line-height: 1.4;
}
.f23-prod__price-row {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.625rem;
}
.f23-prod__now { font-size: 1rem; font-weight: 700; }
.f23-prod__was { font-size: 0.6875rem; color: #999; text-decoration: line-through; }
.f23-prod__dc { font-size: 0.875rem; font-weight: 900; color: #c62828; }
.f23-prod__colors {
  display: flex;
  gap: 0.375rem;
  margin-bottom: 0.5rem;
}
.f23-prod__color {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 1px solid #ddd;
}
.f23-prod__rating {
  display: flex;
  gap: 0.375rem;
  font-size: 0.625rem;
  color: #888;
}
.f23-prod__rating span:first-child { color: #fbc02d; }
.f23-prod__ship { color: #2e7d32; font-weight: 700; }

/* ── Weekly Best ── */
.f23-best {
  padding-bottom: 5rem;
  border-top: 1px solid #e5e5e5;
  background: #fafafa;
}
.f23-best__tabs { display: flex; gap: 0; }
.f23-best__tab {
  padding: 0.5rem 1.25rem;
  background: #fff;
  border: 1px solid #ddd;
  margin-left: -1px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}
.f23-best__tab--active {
  background: #1a1a1a;
  color: #fff;
  border-color: #1a1a1a;
}
.f23-best__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 0 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f23-rank { color: inherit; cursor: pointer; }
.f23-rank__img {
  position: relative;
  aspect-ratio: 3/4;
  overflow: hidden;
  background: #f7f5f0;
  margin-bottom: 1rem;
}
.f23-rank__img img { width: 100%; height: 100%; object-fit: cover; }
.f23-rank__no {
  position: absolute;
  top: 0.75rem;
  left: 0.75rem;
  background: #333;
  color: #fff;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  font-weight: 900;
}
.f23-rank__no--top { background: #c62828; }
.f23-rank__brand {
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #999;
  margin-bottom: 0.375rem;
}
.f23-rank h3 {
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  line-height: 1.4;
}
.f23-rank__price {
  display: flex;
  align-items: baseline;
  gap: 0.5rem;
  margin-bottom: 0.375rem;
  font-size: 0.9375rem;
  font-weight: 700;
}
.f23-rank__dc { color: #c62828; font-weight: 900; }
.f23-rank__review {
  font-size: 0.625rem;
  color: #888;
}

/* ── Lookbook ── */
.f23-lookbook {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 4rem;
  padding: 6rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
  align-items: center;
}
.f23-lookbook__title {
  font-size: clamp(2.5rem, 5vw, 3.75rem);
  font-weight: 900;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 2rem;
}
.f23-lookbook__desc {
  font-size: 0.9375rem;
  line-height: 1.9;
  color: #666;
  margin-bottom: 2.5rem;
}
.f23-lookbook__cta {
  display: inline-block;
  padding: 1rem 2rem;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.2em;
}
.f23-lookbook__right {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}
.f23-lookbook__img {
  aspect-ratio: 3/4;
  overflow: hidden;
}
.f23-lookbook__img--2 { margin-top: 3rem; }
.f23-lookbook__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s;
}
.f23-lookbook__img:hover img { transform: scale(1.04); }

/* ── Magazine ── */
.f23-magazine {
  padding-bottom: 5rem;
  border-top: 1px solid #e5e5e5;
}
.f23-magazine__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  padding: 0 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f23-article { cursor: pointer; color: inherit; }
.f23-article__img {
  aspect-ratio: 16/10;
  overflow: hidden;
  margin-bottom: 1.25rem;
}
.f23-article__img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}
.f23-article:hover .f23-article__img img { transform: scale(1.04); }
.f23-article__cat {
  display: inline-block;
  padding: 0.25rem 0.625rem;
  background: #f7f5f0;
  border: 1px solid #e5e5e5;
  font-size: 0.5625rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  color: #c62828;
  margin-bottom: 0.75rem;
}
.f23-article h3 {
  font-size: 1.125rem;
  font-weight: 700;
  margin-bottom: 0.625rem;
  line-height: 1.35;
}
.f23-article p {
  font-size: 0.8125rem;
  color: #666;
  line-height: 1.6;
  margin-bottom: 0.75rem;
}
.f23-article__date {
  font-size: 0.625rem;
  color: #999;
  letter-spacing: 0.1em;
}

/* ── Newsletter ── */
.f23-newsletter {
  padding: 5rem 3rem;
  background: #f7f5f0;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  text-align: center;
}
.f23-newsletter__inner { max-width: 32rem; margin: 0 auto; }
.f23-newsletter h2 {
  font-size: 2rem;
  font-weight: 900;
  margin-bottom: 0.75rem;
}
.f23-newsletter p {
  font-size: 0.875rem;
  color: #666;
  margin-bottom: 2rem;
}
.f23-newsletter__form {
  display: flex;
  border: 1px solid #1a1a1a;
}
.f23-newsletter__form input {
  flex: 1;
  border: none;
  padding: 1rem 1.25rem;
  font-size: 0.8125rem;
  outline: none;
  background: #fff;
}
.f23-newsletter__form button {
  background: #1a1a1a;
  color: #fff;
  border: none;
  padding: 0 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  cursor: pointer;
}

/* ── Footer ── */
.f23-foot {
  background: #1a1a1a;
  color: #f5f5f5;
  padding: 5rem 3rem 2rem;
}
.f23-foot__main {
  display: grid;
  grid-template-columns: 1.5fr 3fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 0 auto 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid #333;
}
.f23-foot__logo {
  font-size: 2.25rem;
  font-weight: 900;
  letter-spacing: 0.08em;
  margin-bottom: 0.75rem;
}
.f23-foot__slogan {
  font-size: 0.8125rem;
  color: #999;
  font-style: italic;
  margin-bottom: 1.5rem;
}
.f23-foot__social { display: flex; gap: 0.625rem; }
.f23-foot__social a {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.6875rem;
  font-weight: 700;
  color: #999;
  cursor: pointer;
  transition: all 0.2s;
}
.f23-foot__social a:hover {
  border-color: #c62828;
  color: #c62828;
}
.f23-foot__grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
}
.f23-foot__col h4 {
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  margin-bottom: 1rem;
  color: #c62828;
}
.f23-foot__col a {
  display: block;
  font-size: 0.6875rem;
  color: #ccc;
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition: color 0.2s;
}
.f23-foot__col a:hover { color: #fff; }
.f23-foot__legal {
  max-width: 1400px;
  margin: 0 auto;
  font-size: 0.5625rem;
  color: #777;
  letter-spacing: 0.05em;
  line-height: 1.8;
  text-align: center;
}
</style>
