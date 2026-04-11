<template>
  <main class="page-wrapper f24">
    <header class="f24-head">
      <div class="f24-head__logo">forme</div>
      <nav class="f24-head__nav">
        <a class="f24-head__link f24-head__link--active">홈</a>
        <a class="f24-head__link">상품</a>
        <a class="f24-head__link">브랜드</a>
        <a class="f24-head__link">기획전</a>
        <a class="f24-head__link">매거진</a>
      </nav>
      <div class="f24-head__right">
        <input class="f24-head__search" placeholder="상품·브랜드 검색" />
        <a>로그인</a>
        <a>장바구니</a>
      </div>
    </header>

    <!-- 메인 배너 + 사이드 -->
    <section class="f24-hero">
      <div class="f24-hero__main">
        <img src="https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" alt="hero" />
        <div class="f24-hero__text">
          <p class="f24-hero__num">01 / 04</p>
          <h1>취향이 담긴 옷장을 위한<br />네 개의 브랜드</h1>
          <a>지금 보러가기</a>
        </div>
      </div>
      <div class="f24-hero__side">
        <div class="f24-hero__card f24-hero__card--dark">
          <p>기획전</p>
          <h3>봄 데님 위크</h3>
          <span>최대 30% 할인</span>
        </div>
        <div class="f24-hero__card f24-hero__card--light">
          <p>신규 멤버</p>
          <h3>5만원 쿠폰</h3>
          <span>가입 즉시 증정</span>
        </div>
      </div>
    </section>

    <!-- 카테고리 아이콘 -->
    <section class="f24-cats">
      <div v-for="c in cats" :key="c.name" class="f24-cat">
        <div class="f24-cat__ico">{{ c.icon }}</div>
        <span>{{ c.name }}</span>
      </div>
    </section>

    <!-- 브랜드 그리드 -->
    <section class="f24-section">
      <header class="f24-section__head">
        <div>
          <h2>브랜드 둘러보기</h2>
          <p>FORME가 함께하는 네 개의 헤리티지</p>
        </div>
        <a class="f24-section__more">전체 →</a>
      </header>
      <div class="f24-brands">
        <div v-for="b in brands" :key="b.name" class="f24-brand">
          <div class="f24-brand__img"><img :src="b.img" :alt="b.name" /></div>
          <div class="f24-brand__info">
            <h3>{{ b.name }}</h3>
            <p>{{ b.since }}</p>
            <small>{{ b.count }}개 상품</small>
          </div>
        </div>
      </div>
    </section>

    <!-- 오늘의 기획전 -->
    <section class="f24-section f24-section--alt">
      <header class="f24-section__head">
        <div>
          <h2>오늘의 기획전</h2>
          <p>에디터가 고른 주제별 셀렉션</p>
        </div>
      </header>
      <div class="f24-editions">
        <div v-for="(e, i) in editions" :key="i" class="f24-edition">
          <div class="f24-edition__img"><img :src="e.img" :alt="e.title" /></div>
          <div class="f24-edition__text">
            <span class="f24-edition__cat">{{ e.cat }}</span>
            <h3>{{ e.title }}</h3>
            <p>{{ e.desc }}</p>
            <div class="f24-edition__meta">
              <span>{{ e.items }}개 상품</span><span>· {{ e.discount }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 베스트 + 탭 -->
    <section class="f24-section">
      <header class="f24-section__head">
        <div>
          <h2>이번 주 베스트</h2>
          <p>30~50대가 많이 선택한 상품</p>
        </div>
        <div class="f24-tabs">
          <button class="f24-tabs__btn f24-tabs__btn--active">전체</button>
          <button class="f24-tabs__btn">남성</button>
          <button class="f24-tabs__btn">여성</button>
        </div>
      </header>
      <div class="f24-best">
        <div v-for="(p, i) in products" :key="i" class="f24-best__item">
          <div class="f24-best__img">
            <img :src="p.img" :alt="p.name" />
            <span class="f24-best__rank">{{ i + 1 }}</span>
          </div>
          <p class="f24-best__brand">{{ p.brand }}</p>
          <h3>{{ p.name }}</h3>
          <div class="f24-best__price">
            <span v-if="p.discount" class="f24-best__dc">{{ p.discount }}</span>
            <span class="f24-best__price-now">{{ p.price }}</span>
          </div>
          <div class="f24-best__reviews">
            <span class="f24-best__star">★</span>
            <span>{{ p.rating }}</span>
            <span>({{ p.reviewCount }})</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 매거진 -->
    <section class="f24-section">
      <header class="f24-section__head">
        <div>
          <h2>FORME 매거진</h2>
          <p>브랜드와 옷에 관한 이야기</p>
        </div>
      </header>
      <div class="f24-mag">
        <article v-for="(m, i) in magazine" :key="i" class="f24-mag__item">
          <div class="f24-mag__img"><img :src="m.img" :alt="m.title" /></div>
          <span class="f24-mag__cat">{{ m.cat }}</span>
          <h3>{{ m.title }}</h3>
          <p>{{ m.excerpt }}</p>
          <small>{{ m.date }} · {{ m.author }}</small>
        </article>
      </div>
    </section>

    <!-- 푸터 -->
    <footer class="f24-foot">
      <div class="f24-foot__top">
        <div class="f24-foot__col">
          <h4>FORME</h4>
          <p>FORME은 30-50대의 옷장을 위한 큐레이션 편집샵입니다.</p>
          <p>한국 대표 브랜드부터 해외 헤리티지까지, 오래 입을 수 있는 좋은 옷만을 선별합니다.</p>
        </div>
        <div class="f24-foot__col">
          <h4>고객센터</h4>
          <p class="f24-foot__phone">1588-0000</p>
          <small>평일 09:00~18:00 (주말·공휴일 휴무)</small>
          <a>1:1 문의하기</a>
          <a>FAQ 보기</a>
        </div>
        <div class="f24-foot__col">
          <h4>쇼핑가이드</h4>
          <a>배송안내</a>
          <a>교환·반품</a>
          <a>사이즈 가이드</a>
          <a>멤버십 혜택</a>
        </div>
        <div class="f24-foot__col">
          <h4>FORME</h4>
          <a>브랜드 스토리</a>
          <a>입점 문의</a>
          <a>매거진</a>
          <a>채용</a>
        </div>
      </div>
      <div class="f24-foot__bot">
        <p>(주)FORME | 대표 김보경 | 서울 강남구 테헤란로 000 | 통신판매업 2026-서울강남-00000</p>
        <p>사업자등록번호 000-00-00000 | 고객센터 1588-0000 | © 2026 FORME. All rights reserved.</p>
      </div>
    </footer>
  </main>
</template>

<script setup>
const cats = [
  { icon: "👕", name: "상의" },
  { icon: "👖", name: "하의" },
  { icon: "🧥", name: "아우터" },
  { icon: "👔", name: "셔츠" },
  { icon: "🧦", name: "양말" },
  { icon: "👟", name: "신발" },
  { icon: "🎒", name: "가방" },
  { icon: "🧢", name: "모자" },
];
const brands = [
  { name: "BEANPOLE", since: "1989·Seoul", count: 142, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { name: "CARHARTT", since: "1889·USA",   count: 98,  img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { name: "LEVI'S",   since: "1873·USA",   count: 215, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { name: "DICKIES",  since: "1922·USA",   count: 87,  img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
const editions = [
  { cat: "NEW",    title: "봄 셔츠, 부드러운 옥스포드",  desc: "3월부터 입기 좋은 옥스포드 셔츠 모음",  items: 38, discount: "최대 20%", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { cat: "BEST",   title: "데님 클래식 위크",             desc: "어떤 데님이든 한 벌은 있어야 할",       items: 52, discount: "최대 30%", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { cat: "EVENT",  title: "오피스 워드로브",              desc: "출근길이 편안해지는 옷들",              items: 64, discount: "5% 추가 할인", img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
];
const products = [
  { brand: "BEANPOLE", name: "헤리티지 울 자켓",   price: "285,000", discount: "15%", rating: 4.8, reviewCount: 248, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { brand: "LEVI'S",   name: "555™ 스트레이트 진", price: "159,000", discount: null,   rating: 4.9, reviewCount: 512, img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { brand: "CARHARTT", name: "릴랙스 워크 팬츠",   price: "188,000", discount: "10%", rating: 4.7, reviewCount: 187, img: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { brand: "DICKIES",  name: "카펜터 데님 팬츠",   price: "105,000", discount: "25%", rating: 4.6, reviewCount: 342, img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
  { brand: "BEANPOLE", name: "리넨 셔츠",          price: "129,000", discount: null,   rating: 4.7, reviewCount: 156, img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
];
const magazine = [
  { cat: "스타일", title: "40대가 봄에 입기 좋은 3가지 아이템", excerpt: "무리 없이 시도할 수 있는 트렌드 제안.", date: "2026.04.08", author: "편집팀", img: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { cat: "브랜드", title: "리바이스의 150년, 그 시작 이야기",     excerpt: "한 청바지가 어떻게 문화가 됐는가.",  date: "2026.04.05", author: "김보경", img: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { cat: "가이드", title: "데님, 처음 살 때 알아두면 좋은 것",     excerpt: "사이즈, 워싱, 핏. 세 가지만 기억하세요.", date: "2026.04.01", author: "에디터", img: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f24 {
  background: #fafafa;
  color: #1a1a1a;
  font-family: 'Noto Sans KR', -apple-system, sans-serif;
  min-height: 100dvh;
}

/* Header */
.f24-head {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 3rem;
  align-items: center;
  padding: 1.25rem 3rem;
  background: #fff;
  border-bottom: 1px solid #eee;
}
.f24-head__logo { font-size: 1.75rem; font-weight: 800; letter-spacing: -0.02em; }
.f24-head__nav { display: flex; gap: 2rem; justify-content: center; }
.f24-head__link { font-size: 0.9375rem; font-weight: 500; color: #333; padding: 0.5rem 0; border-bottom: 2px solid transparent; cursor: pointer; }
.f24-head__link--active { color: #1a1a1a; font-weight: 700; border-bottom-color: #1a1a1a; }
.f24-head__right { display: flex; align-items: center; gap: 1rem; }
.f24-head__search { width: 16rem; padding: 0.625rem 1rem; background: #f5f5f5; border: none; border-radius: 8px; font-size: 0.8125rem; outline: none; }
.f24-head__right a { font-size: 0.8125rem; color: #666; cursor: pointer; }

/* Hero */
.f24-hero {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1rem;
  padding: 1.5rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f24-hero__main { position: relative; aspect-ratio: 16/9; overflow: hidden; border-radius: 8px; }
.f24-hero__main img { width: 100%; height: 100%; object-fit: cover; }
.f24-hero__text { position: absolute; bottom: 2rem; left: 2rem; color: #fff; max-width: 22rem; }
.f24-hero__num { font-size: 0.75rem; opacity: 0.8; margin-bottom: 0.75rem; }
.f24-hero__text h1 { font-size: 1.625rem; font-weight: 700; line-height: 1.35; margin-bottom: 1.25rem; }
.f24-hero__text a { display: inline-block; padding: 0.625rem 1.25rem; background: #fff; color: #1a1a1a; font-size: 0.8125rem; font-weight: 700; border-radius: 4px; cursor: pointer; }
.f24-hero__side { display: grid; grid-template-rows: 1fr 1fr; gap: 1rem; }
.f24-hero__card { padding: 1.5rem; border-radius: 8px; display: flex; flex-direction: column; justify-content: center; cursor: pointer; }
.f24-hero__card--dark { background: #1a1a1a; color: #fff; }
.f24-hero__card--light { background: #fff8e1; color: #5a4a1a; }
.f24-hero__card p { font-size: 0.75rem; margin-bottom: 0.5rem; opacity: 0.8; }
.f24-hero__card h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 0.375rem; }
.f24-hero__card span { font-size: 0.8125rem; opacity: 0.9; }

/* Categories */
.f24-cats {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1rem;
  padding: 2rem 3rem;
  max-width: 1400px;
  margin: 0 auto;
}
.f24-cat { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; cursor: pointer; }
.f24-cat__ico {
  width: 4rem; height: 4rem;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 1.5rem;
}
.f24-cat span { font-size: 0.8125rem; color: #333; font-weight: 500; }

/* Section */
.f24-section { padding: 3rem; max-width: 1400px; margin: 0 auto; }
.f24-section--alt { background: #fff; max-width: none; padding: 3rem; }
.f24-section--alt > * { max-width: 1400px; margin-left: auto; margin-right: auto; }
.f24-section__head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 2rem; max-width: 1400px; margin-left: auto; margin-right: auto; }
.f24-section__head h2 { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.375rem; }
.f24-section__head p { font-size: 0.8125rem; color: #888; }
.f24-section__more { font-size: 0.8125rem; font-weight: 600; color: #1a1a1a; cursor: pointer; }

/* Brands */
.f24-brands { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.5rem; }
.f24-brand { background: #fff; border: 1px solid #eee; border-radius: 8px; overflow: hidden; cursor: pointer; }
.f24-brand__img { aspect-ratio: 16/10; overflow: hidden; }
.f24-brand__img img { width: 100%; height: 100%; object-fit: cover; }
.f24-brand__info { padding: 1.25rem; }
.f24-brand__info h3 { font-size: 1rem; font-weight: 700; margin-bottom: 0.25rem; }
.f24-brand__info p { font-size: 0.75rem; color: #888; margin-bottom: 0.375rem; }
.f24-brand__info small { font-size: 0.6875rem; color: #aaa; }

/* Editions */
.f24-editions { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.f24-edition { display: grid; grid-template-columns: 1fr 1.2fr; background: #fff; border: 1px solid #eee; border-radius: 8px; overflow: hidden; cursor: pointer; }
.f24-edition__img { background: #f5f5f5; }
.f24-edition__img img { width: 100%; height: 100%; object-fit: cover; }
.f24-edition__text { padding: 1.25rem; display: flex; flex-direction: column; justify-content: center; }
.f24-edition__cat { display: inline-block; padding: 0.25rem 0.5rem; background: #1a1a1a; color: #fff; font-size: 0.625rem; font-weight: 700; margin-bottom: 0.5rem; width: fit-content; }
.f24-edition h3 { font-size: 0.9375rem; font-weight: 700; margin-bottom: 0.375rem; line-height: 1.35; }
.f24-edition p { font-size: 0.75rem; color: #666; margin-bottom: 0.75rem; line-height: 1.5; }
.f24-edition__meta { font-size: 0.6875rem; color: #999; }

/* Tabs */
.f24-tabs { display: flex; gap: 0; background: #f0f0f0; border-radius: 999px; padding: 0.25rem; }
.f24-tabs__btn { padding: 0.5rem 1rem; background: transparent; border: none; font-size: 0.8125rem; font-weight: 500; cursor: pointer; border-radius: 999px; }
.f24-tabs__btn--active { background: #1a1a1a; color: #fff; font-weight: 700; }

/* Best */
.f24-best { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1.25rem; }
.f24-best__item { background: #fff; padding: 0; cursor: pointer; }
.f24-best__img { position: relative; aspect-ratio: 1/1; overflow: hidden; background: #f5f5f5; margin-bottom: 0.75rem; border-radius: 6px; }
.f24-best__img img { width: 100%; height: 100%; object-fit: cover; }
.f24-best__rank {
  position: absolute; top: 0.5rem; left: 0.5rem;
  background: rgba(26, 26, 26, 0.9);
  color: #fff;
  width: 1.75rem; height: 1.75rem;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8125rem; font-weight: 800;
  border-radius: 4px;
}
.f24-best__brand { font-size: 0.6875rem; color: #888; font-weight: 600; margin-bottom: 0.25rem; }
.f24-best__item h3 { font-size: 0.8125rem; color: #333; line-height: 1.4; margin-bottom: 0.5rem; font-weight: 500; }
.f24-best__price { display: flex; align-items: baseline; gap: 0.375rem; margin-bottom: 0.375rem; }
.f24-best__dc { font-size: 0.875rem; font-weight: 700; color: #e53935; }
.f24-best__price-now { font-size: 0.9375rem; font-weight: 700; color: #1a1a1a; }
.f24-best__reviews { display: flex; align-items: center; gap: 0.25rem; font-size: 0.6875rem; color: #666; }
.f24-best__star { color: #fbc02d; }

/* Magazine */
.f24-mag { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.f24-mag__item { cursor: pointer; }
.f24-mag__img { aspect-ratio: 16/10; overflow: hidden; border-radius: 8px; margin-bottom: 0.875rem; }
.f24-mag__img img { width: 100%; height: 100%; object-fit: cover; }
.f24-mag__cat { display: inline-block; padding: 0.25rem 0.625rem; background: #f5f5f5; color: #555; font-size: 0.6875rem; font-weight: 600; border-radius: 999px; margin-bottom: 0.5rem; }
.f24-mag__item h3 { font-size: 1.0625rem; font-weight: 700; margin-bottom: 0.5rem; line-height: 1.4; }
.f24-mag__item p { font-size: 0.8125rem; color: #666; margin-bottom: 0.625rem; line-height: 1.5; }
.f24-mag__item small { font-size: 0.6875rem; color: #999; }

/* Footer */
.f24-foot { background: #fff; padding: 3rem; border-top: 1px solid #eee; }
.f24-foot__top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 3rem; max-width: 1400px; margin: 0 auto 2.5rem; padding-bottom: 2.5rem; border-bottom: 1px solid #eee; }
.f24-foot__col h4 { font-size: 0.8125rem; font-weight: 800; margin-bottom: 1rem; }
.f24-foot__col p { font-size: 0.75rem; color: #666; line-height: 1.7; margin-bottom: 0.5rem; }
.f24-foot__col a { display: block; font-size: 0.75rem; color: #666; margin-bottom: 0.5rem; cursor: pointer; }
.f24-foot__col small { display: block; font-size: 0.625rem; color: #999; margin-bottom: 0.75rem; }
.f24-foot__phone { font-size: 1.5rem !important; font-weight: 900 !important; color: #1a1a1a !important; margin-bottom: 0.25rem !important; }
.f24-foot__bot { max-width: 1400px; margin: 0 auto; font-size: 0.6875rem; color: #999; line-height: 1.8; }
</style>
