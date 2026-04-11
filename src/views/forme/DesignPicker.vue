<template>
  <main class="page-wrapper fp">
    <header class="fp-header">
      <p class="fp-header__eyebrow">DESIGN TONE COMPARISON</p>
      <h1 class="fp-header__title">FORME · Design Picker</h1>
      <p class="fp-header__desc">
        10가지 디자인 톤 중 원하는 방향을 선택하세요.<br />
        각 카드를 클릭하면 해당 톤의 홈페이지를 미리볼 수 있습니다.
      </p>
    </header>

    <!-- 필터 -->
    <div class="fp-filter">
      <button
        v-for="f in filters"
        :key="f.key"
        class="fp-filter__btn"
        :class="{ 'fp-filter__btn--active': activeFilter === f.key }"
        @click="activeFilter = f.key"
      >
        {{ f.label }}
      </button>
    </div>

    <!-- 그리드 -->
    <section class="fp-grid">
      <RouterLink
        v-for="design in filteredDesigns"
        :key="design.id"
        :to="design.path"
        class="fp-card"
        :style="{
          backgroundColor: design.bg,
          color: design.fg,
        }"
      >
        <div class="fp-card__header">
          <span class="fp-card__no">
            {{ String(design.id).padStart(2, '0') }} / 10
          </span>
          <span class="fp-card__cat" :style="{ borderColor: design.accent, color: design.accent }">
            {{ design.category }}
          </span>
        </div>

        <div class="fp-card__body">
          <h2
            class="fp-card__title"
            :style="{ fontFamily: design.font, fontStyle: design.italic ? 'italic' : 'normal', fontWeight: design.weight }"
          >
            FORME
          </h2>
          <p class="fp-card__name">{{ design.name }}</p>
          <p class="fp-card__ref">Reference · {{ design.reference }}</p>
        </div>

        <div class="fp-card__footer">
          <p class="fp-card__desc">{{ design.desc }}</p>
          <div class="fp-card__palette">
            <span
              v-for="(c, i) in design.palette"
              :key="i"
              class="fp-card__swatch"
              :style="{ backgroundColor: c }"
            ></span>
          </div>
          <div class="fp-card__view">
            <span>View Design</span>
            <span class="material-symbols-outlined">arrow_forward</span>
          </div>
        </div>
      </RouterLink>
    </section>

    <!-- UI 라이브러리 링크 -->
    <section class="fp-ui-links">
      <p class="fp-ui-links__label">— UI COMPONENT LIBRARY</p>
      <div class="fp-ui-links__row">
        <RouterLink to="/forme/ui/header" class="fp-ui-link">
          <span class="fp-ui-link__no">01</span>
          <div>
            <h3>Header Library</h3>
            <p>30가지 헤더 디자인 · Musinsa ~ Sportswear</p>
          </div>
          <span class="fp-ui-link__arrow">→</span>
        </RouterLink>
        <RouterLink to="/forme/ui/footer" class="fp-ui-link">
          <span class="fp-ui-link__no">02</span>
          <div>
            <h3>Footer Library</h3>
            <p>30가지 푸터 디자인 · Minimal ~ Sportswear</p>
          </div>
          <span class="fp-ui-link__arrow">→</span>
        </RouterLink>
      </div>
    </section>

    <!-- 하단 네비게이션 -->
    <nav class="fp-nav">
      <RouterLink to="/" class="fp-nav__link">← 기존 홈</RouterLink>
      <span class="fp-nav__divider">|</span>
      <a href="#" @click.prevent="scrollTop" class="fp-nav__link">↑ 맨 위로</a>
    </nav>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

const activeFilter = ref("all");

const filters = [
  { key: "all",     label: "All · 30" },
  { key: "minimal", label: "Minimal" },
  { key: "bold",    label: "Bold" },
  { key: "premium", label: "Premium" },
  { key: "creative", label: "Creative" },
  { key: "target",  label: "30-50 타겟" },
];

const designs = [
  {
    id: 1,
    name: "Modern Minimal",
    reference: "Musinsa · 29CM",
    category: "MINIMAL",
    desc: "흰 배경, 검정 타이포, 빨간 포인트. 트렌디한 한국 편집샵 스타일.",
    path: "/forme01",
    bg: "#ffffff",
    fg: "#111111",
    accent: "#FF2D2D",
    font: "'Work Sans', sans-serif",
    italic: false,
    weight: 900,
    palette: ["#ffffff", "#111111", "#FF2D2D"],
    tags: ["minimal", "bold"],
  },
  {
    id: 2,
    name: "Colorful Department",
    reference: "SSF Shop · 롯데온",
    category: "CREATIVE",
    desc: "자동 슬라이드, 카테고리 아이콘, 할인 배너. 활기찬 복합몰 분위기.",
    path: "/forme02",
    bg: "#FFF4D6",
    fg: "#222222",
    accent: "#4A6BFF",
    font: "'Noto Serif', serif",
    italic: false,
    weight: 700,
    palette: ["#FFF4D6", "#FF6B6B", "#4A6BFF", "#FFC72C"],
    tags: ["creative", "bold"],
  },
  {
    id: 3,
    name: "Premium Heritage",
    reference: "더현대닷컴 · LF몰",
    category: "PREMIUM",
    desc: "베이지 + 다크 + 골드. 정제된 세리프, 백화점 프리미엄 톤.",
    path: "/forme03",
    bg: "#faf8f4",
    fg: "#1a1a1a",
    accent: "#8b7437",
    font: "'Italiana', serif",
    italic: false,
    weight: 400,
    palette: ["#faf8f4", "#1a1a1a", "#c9a86b"],
    tags: ["premium", "minimal"],
  },
  {
    id: 4,
    name: "Gallery",
    reference: "Aesop · Celine",
    category: "PREMIUM",
    desc: "미술관 같은 큐브, 큰 여백, italic 세리프. 조용한 럭셔리.",
    path: "/forme04",
    bg: "#f4f2ed",
    fg: "#1a1a1a",
    accent: "#6b6b6b",
    font: "'Cormorant Garamond', serif",
    italic: true,
    weight: 400,
    palette: ["#f4f2ed", "#1a1a1a", "#6b6b6b"],
    tags: ["premium", "minimal"],
  },
  {
    id: 5,
    name: "Japanese Minimal",
    reference: "UNIQLO · MUJI",
    category: "MINIMAL",
    desc: "그리드 보더, 세로 쓰기, 모노스페이스. 절제된 일본 감성.",
    path: "/forme05",
    bg: "#ffffff",
    fg: "#1f1f1f",
    accent: "#1f1f1f",
    font: "'Space Mono', monospace",
    italic: false,
    weight: 700,
    palette: ["#ffffff", "#1f1f1f", "#f7f5f0"],
    tags: ["minimal"],
  },
  {
    id: 6,
    name: "Y2K Retro",
    reference: "Supreme · Palace",
    category: "CREATIVE",
    desc: "컬러 블록, 스티커, 마퀴. 2000년대 레트로 스트릿 에너지.",
    path: "/forme06",
    bg: "#FFF4E0",
    fg: "#0a0a0a",
    accent: "#FFC72C",
    font: "'Archivo Black', sans-serif",
    italic: false,
    weight: 900,
    palette: ["#FFF4E0", "#FFB6D9", "#FFC72C", "#0a0a0a"],
    tags: ["creative", "bold"],
  },
  {
    id: 7,
    name: "Editorial Magazine",
    reference: "Monocle · Apartamento",
    category: "PREMIUM",
    desc: "잡지 표지, 목차, 페이지 번호. 인쇄 매체 감성의 에디토리얼.",
    path: "/forme07",
    bg: "#fbf9f4",
    fg: "#1a1a1a",
    accent: "#8b7437",
    font: "'Bodoni Moda', serif",
    italic: false,
    weight: 700,
    palette: ["#fbf9f4", "#1a1a1a", "#8b7437"],
    tags: ["premium"],
  },
  {
    id: 8,
    name: "Street Lookbook",
    reference: "Off-White · ACRONYM",
    category: "BOLD",
    desc: "검정 + 빨강, 노이즈 그레인, condensed 타이포. 스트릿 에너지.",
    path: "/forme08",
    bg: "#0e0e0e",
    fg: "#f5f5f5",
    accent: "#FF3B3B",
    font: "'Anton', sans-serif",
    italic: false,
    weight: 400,
    palette: ["#0e0e0e", "#f5f5f5", "#FF3B3B"],
    tags: ["bold", "creative"],
  },
  {
    id: 9,
    name: "Luxury Monogram",
    reference: "Dior · Hermès",
    category: "PREMIUM",
    desc: "검정 + 골드, 로마 숫자, 프레임 장식. 메종 하우스 럭셔리.",
    path: "/forme09",
    bg: "#0a0907",
    fg: "#d4b976",
    accent: "#d4b976",
    font: "'Cinzel', serif",
    italic: false,
    weight: 600,
    palette: ["#0a0907", "#d4b976", "#f5e9c5"],
    tags: ["premium"],
  },
  {
    id: 10,
    name: "Eco Natural",
    reference: "Patagonia · Muji",
    category: "MINIMAL",
    desc: "크라프트 베이지 + 브라운, sepia 필터, 편지 톤. 지속가능 감성.",
    path: "/forme10",
    bg: "#f0e9dc",
    fg: "#3a2e1f",
    accent: "#8b6a3a",
    font: "'Fraunces', serif",
    italic: false,
    weight: 400,
    palette: ["#f0e9dc", "#3a2e1f", "#8b6a3a", "#5a7f3a"],
    tags: ["minimal", "premium"],
  },
  {
    id: 11,
    name: "Neo Brutalist",
    reference: "Balenciaga · Gentle Monster",
    category: "BOLD",
    desc: "노란/검정 블록, 투박한 격자, 의도적 날 것. 브루탈리즘 미학.",
    path: "/forme11",
    bg: "#FFE500",
    fg: "#000000",
    accent: "#000000",
    font: "'Archivo Black', sans-serif",
    italic: false,
    weight: 900,
    palette: ["#FFE500", "#000000", "#ffffff"],
    tags: ["bold", "creative"],
  },
  {
    id: 12,
    name: "Glassmorphism",
    reference: "Apple · Windows 11",
    category: "CREATIVE",
    desc: "유리 블러, 그라디언트 오브, 미래적 반투명 카드.",
    path: "/forme12",
    bg: "#0a0a2e",
    fg: "#f0f0ff",
    accent: "#a0a0ff",
    font: "'Italiana', serif",
    italic: false,
    weight: 400,
    palette: ["#0a0a2e", "#667eea", "#f093fb", "#4facfe"],
    tags: ["creative", "premium"],
  },
  {
    id: 13,
    name: "Swiss Bauhaus",
    reference: "Helvetica · Müller-Brockmann",
    category: "MINIMAL",
    desc: "빨강/파랑/노랑 원색 블록, 정확한 그리드, Helvetica 기반.",
    path: "/forme13",
    bg: "#f5f5f0",
    fg: "#000000",
    accent: "#E30613",
    font: "'Helvetica Neue', sans-serif",
    italic: false,
    weight: 900,
    palette: ["#f5f5f0", "#E30613", "#005F9E", "#FCD900"],
    tags: ["minimal", "bold"],
  },
  {
    id: 14,
    name: "Dark Academia",
    reference: "Oxford · Gucci Tom Ford era",
    category: "PREMIUM",
    desc: "딥 브라운, 가죽 도서관, 라틴어, 빈티지 세리프.",
    path: "/forme14",
    bg: "#1a0f0a",
    fg: "#d4c4a8",
    accent: "#8b6f47",
    font: "'Bodoni Moda', serif",
    italic: false,
    weight: 400,
    palette: ["#1a0f0a", "#8b6f47", "#d4c4a8"],
    tags: ["premium"],
  },
  {
    id: 15,
    name: "Art Deco",
    reference: "1920s Paris · Gatsby",
    category: "PREMIUM",
    desc: "황금 기하학, 네이비+골드, 대칭 프레임. 1920년대 그랜드 호텔.",
    path: "/forme15",
    bg: "#0f1a3a",
    fg: "#e8c96a",
    accent: "#e8c96a",
    font: "'Cinzel', serif",
    italic: false,
    weight: 600,
    palette: ["#0f1a3a", "#e8c96a", "#c9a84a"],
    tags: ["premium", "creative"],
  },
  {
    id: 16,
    name: "Cyberpunk Neon",
    reference: "Blade Runner · Neuromancer",
    category: "BOLD",
    desc: "네온 핑크/시안, 스캔라인, 글리치. 매트릭스 코드 스타일.",
    path: "/forme16",
    bg: "#05010f",
    fg: "#e0e0ff",
    accent: "#ff00ff",
    font: "'Space Mono', monospace",
    italic: false,
    weight: 700,
    palette: ["#05010f", "#ff00ff", "#00ffff", "#00ffcc"],
    tags: ["bold", "creative"],
  },
  {
    id: 17,
    name: "Scandinavian",
    reference: "Acne · COS · & Other Stories",
    category: "MINIMAL",
    desc: "따뜻한 베이지, pastel 배경, 둥근 모서리. 북유럽 정서.",
    path: "/forme17",
    bg: "#f4ede4",
    fg: "#3a3530",
    accent: "#a08060",
    font: "'Fraunces', serif",
    italic: false,
    weight: 300,
    palette: ["#f4ede4", "#e8ddd0", "#3a3530", "#a08060"],
    tags: ["minimal", "premium"],
  },
  {
    id: 18,
    name: "Vaporwave",
    reference: "80s Japan · Retro Future",
    category: "CREATIVE",
    desc: "퍼플→핑크→오렌지 그라디언트, 네온 그리드, 전각 타이포.",
    path: "/forme18",
    bg: "#2e0854",
    fg: "#ffffff",
    accent: "#ff006e",
    font: "'Space Mono', monospace",
    italic: false,
    weight: 700,
    palette: ["#2e0854", "#ff006e", "#ff9a56", "#00ffff"],
    tags: ["creative", "bold"],
  },
  {
    id: 19,
    name: "Newspaper Classic",
    reference: "NYT · Le Monde",
    category: "PREMIUM",
    desc: "흑백 신문 레이아웃, 드롭캡, 컬럼 조판, 분류광고 섹션.",
    path: "/forme19",
    bg: "#f4f0e6",
    fg: "#1a1a1a",
    accent: "#8b0000",
    font: "'Bodoni Moda', serif",
    italic: true,
    weight: 700,
    palette: ["#f4f0e6", "#1a1a1a", "#8b0000"],
    tags: ["premium", "minimal"],
  },
  {
    id: 20,
    name: "Hand-drawn Craft",
    reference: "Etsy · small ateliers",
    category: "CREATIVE",
    desc: "종이 배경, 테이프·스티커·폴라로이드. 따뜻한 수공예 편지 톤.",
    path: "/forme20",
    bg: "#fdf8ef",
    fg: "#4a3a28",
    accent: "#8b6a3a",
    font: "'Fraunces', cursive",
    italic: true,
    weight: 400,
    palette: ["#fdf8ef", "#4a3a28", "#ffd54f", "#a88c64"],
    tags: ["creative", "minimal"],
  },
  // ── 30~50대 타겟 의류 쇼핑몰 ──
  {
    id: 21,
    name: "Department Modern",
    reference: "LF몰 · 한섬몰",
    category: "30-50 TARGET",
    desc: "빨간 포인트, 큰 검색창, 할인율·리뷰수 강조. 한국 의류 쇼핑몰 정석.",
    path: "/forme21",
    bg: "#ffffff",
    fg: "#1a1a1a",
    accent: "#8b1a1a",
    font: "'Noto Sans KR', sans-serif",
    italic: false,
    weight: 700,
    palette: ["#ffffff", "#1a1a1a", "#8b1a1a", "#d32f2f"],
    tags: ["minimal", "target"],
  },
  {
    id: 22,
    name: "Warm Editorial",
    reference: "Barbour · GANNI",
    category: "30-50 TARGET",
    desc: "따뜻한 베이지 + 세리프, 저널 톤. 40대 감성 편집숍.",
    path: "/forme22",
    bg: "#f4efe7",
    fg: "#2a241c",
    accent: "#8b7340",
    font: "'Fraunces', 'Noto Serif KR', serif",
    italic: true,
    weight: 300,
    palette: ["#f4efe7", "#2a241c", "#8b7340", "#ede5d3"],
    tags: ["premium", "target"],
  },
  {
    id: 23,
    name: "Premium Showcase",
    reference: "에잇세컨즈 · 에르메네질도",
    category: "30-50 TARGET",
    desc: "카운트다운 타이머, 풀블리드 히어로, 유틸리티 바. 프리미엄 백화점.",
    path: "/forme23",
    bg: "#ffffff",
    fg: "#1a1a1a",
    accent: "#c62828",
    font: "'Noto Sans KR', sans-serif",
    italic: false,
    weight: 800,
    palette: ["#ffffff", "#1a1a1a", "#c62828", "#f7f5f0"],
    tags: ["premium", "target", "bold"],
  },
  {
    id: 24,
    name: "Practical Grid",
    reference: "29CM · 스타일쉐어",
    category: "30-50 TARGET",
    desc: "둥근 카드, pill 탭, 매거진. 편안하고 실용적인 편집샵 UI.",
    path: "/forme24",
    bg: "#fafafa",
    fg: "#1a1a1a",
    accent: "#1a1a1a",
    font: "'Noto Sans KR', sans-serif",
    italic: false,
    weight: 700,
    palette: ["#fafafa", "#1a1a1a", "#fff8e1", "#f5f5f5"],
    tags: ["minimal", "target"],
  },
  {
    id: 25,
    name: "Classic Serif Catalog",
    reference: "현대H몰 · 신세계",
    category: "30-50 TARGET",
    desc: "세리프 본문, 브랜드 인덱스 테이블, 에디터 서신. 카탈로그 감성.",
    path: "/forme25",
    bg: "#f8f4eb",
    fg: "#2a241c",
    accent: "#8b2322",
    font: "'Noto Serif KR', 'Bodoni Moda', serif",
    italic: true,
    weight: 400,
    palette: ["#f8f4eb", "#2a241c", "#8b7340", "#c9a86b"],
    tags: ["premium", "target"],
  },
  {
    id: 26, name: "Kinfolk Lifestyle", reference: "Kinfolk · Cereal", category: "CREATIVE",
    desc: "라이프스타일 매거진, 자연광, 따뜻한 serif. 느린 감성 편집샵.",
    path: "/forme26", bg: "#faf7f2", fg: "#3a3530", accent: "#8a7560",
    font: "'Fraunces', serif", italic: true, weight: 300,
    palette: ["#faf7f2", "#3a3530", "#8a7560", "#ede5d3"], tags: ["creative", "minimal"],
  },
  {
    id: 27, name: "Naver Shopping", reference: "네이버 쇼핑 · 쿠팡", category: "BOLD",
    desc: "초실용 한국 플랫폼 쇼핑. 대형 검색창, 인기 검색어, 컬러 배지.",
    path: "/forme27", bg: "#f5f5f5", fg: "#222222", accent: "#03C75A",
    font: "'Noto Sans KR', sans-serif", italic: false, weight: 800,
    palette: ["#f5f5f5", "#222222", "#03C75A", "#C62828"], tags: ["bold", "target"],
  },
  {
    id: 28, name: "Film Grain Analog", reference: "Kodak · Fujifilm", category: "CREATIVE",
    desc: "필름 카메라 감성. 스프로킷, 컨택트 시트, 세피아 톤.",
    path: "/forme28", bg: "#1a1814", fg: "#e8dcc8", accent: "#8a7d68",
    font: "'Courier New', monospace", italic: false, weight: 700,
    palette: ["#1a1814", "#e8dcc8", "#8a7d68", "#f5efe3"], tags: ["creative"],
  },
  {
    id: 29, name: "Korean Hanbok Modern", reference: "한복 모던 · 전통+현대", category: "PREMIUM",
    desc: "한자 인장, 전통 선, 세리프 한글. 한국적 헤리티지 현대 해석.",
    path: "/forme29", bg: "#f5efe3", fg: "#2a1f14", accent: "#8b2322",
    font: "'Noto Serif KR', serif", italic: false, weight: 300,
    palette: ["#f5efe3", "#2a1f14", "#8b2322", "#c9b99a"], tags: ["premium", "creative"],
  },
  {
    id: 30, name: "Sportswear Athletic", reference: "Nike · Under Armour", category: "BOLD",
    desc: "다이내믹 블랙+레드, 퍼포먼스 수치, outline 타이포.",
    path: "/forme30", bg: "#111111", fg: "#f5f5f5", accent: "#FF4444",
    font: "'Noto Sans KR', sans-serif", italic: false, weight: 900,
    palette: ["#111111", "#f5f5f5", "#FF4444", "#1a1a1a"], tags: ["bold"],
  },
];

const filteredDesigns = computed(() => {
  if (activeFilter.value === "all") return designs;
  return designs.filter(d => d.tags.includes(activeFilter.value));
});

function scrollTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
</script>

<style scoped>
.fp {
  background: #0f0f0f;
  color: #f5f5f5;
  min-height: 100dvh;
  font-family: var(--font-body);
  padding: 4rem 2rem 6rem;
}

/* 헤더 */
.fp-header {
  text-align: center;
  padding: 4rem 2rem 3rem;
  max-width: 50rem;
  margin: 0 auto 4rem;
  border-bottom: 0.5px solid rgba(255, 255, 255, 0.15);
}
.fp-header__eyebrow {
  font-size: 0.6875rem;
  font-weight: 600;
  letter-spacing: 0.4em;
  color: #888;
  margin-bottom: 1.5rem;
}
.fp-header__title {
  font-family: "Italiana", serif;
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 400;
  letter-spacing: 0.03em;
  line-height: 1;
  color: #f5f5f5;
  margin-bottom: 1.5rem;
}
.fp-header__desc {
  font-size: 0.9375rem;
  line-height: 1.8;
  color: #bbb;
}

/* 필터 */
.fp-filter {
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 3.5rem;
  flex-wrap: wrap;
}
.fp-filter__btn {
  background: transparent;
  border: 0.5px solid rgba(255, 255, 255, 0.25);
  color: #ccc;
  padding: 0.625rem 1.5rem;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.fp-filter__btn:hover {
  border-color: #f5f5f5;
  color: #f5f5f5;
}
.fp-filter__btn--active {
  background: #f5f5f5;
  color: #0f0f0f;
  border-color: #f5f5f5;
}

/* 그리드 */
.fp-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}
@media (min-width: 768px)  { .fp-grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1200px) { .fp-grid { grid-template-columns: 1fr 1fr 1fr; } }

/* 카드 */
.fp-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 480px;
  padding: 2.25rem;
  border: 0.5px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: transform 0.35s, box-shadow 0.35s;
  position: relative;
  overflow: hidden;
}
.fp-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
}

.fp-card__header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  font-size: 0.625rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  margin-bottom: 2rem;
}
.fp-card__no {
  font-family: monospace;
  opacity: 0.5;
}
.fp-card__cat {
  padding: 0.375rem 0.625rem;
  border: 1px solid;
}

.fp-card__body {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  padding: 2rem 0;
}
.fp-card__title {
  font-size: clamp(2.75rem, 5vw, 4.25rem);
  line-height: 1;
  letter-spacing: -0.01em;
  margin-bottom: 1.25rem;
  transition: transform 0.5s;
}
.fp-card:hover .fp-card__title {
  transform: scale(1.04);
}
.fp-card__name {
  font-size: 0.9375rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  margin-bottom: 0.5rem;
}
.fp-card__ref {
  font-size: 0.6875rem;
  font-style: italic;
  opacity: 0.6;
  letter-spacing: 0.05em;
}

.fp-card__footer {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 0.5px solid currentColor;
  opacity: 0.9;
}
.fp-card__desc {
  font-size: 0.75rem;
  line-height: 1.7;
  margin-bottom: 1.25rem;
  opacity: 0.75;
}
.fp-card__palette {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}
.fp-card__swatch {
  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
  border: 0.5px solid currentColor;
}
.fp-card__view {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.25em;
  text-transform: uppercase;
}
.fp-card__view .material-symbols-outlined {
  font-size: 1.125rem;
  transition: transform 0.3s;
}
.fp-card:hover .fp-card__view .material-symbols-outlined {
  transform: translateX(6px);
}

/* UI 라이브러리 링크 */
.fp-ui-links {
  max-width: 1200px;
  margin: 6rem auto 0;
  padding: 3rem 1rem;
  border-top: 0.5px solid rgba(255, 255, 255, 0.1);
}
.fp-ui-links__label {
  font-size: 0.625rem;
  font-weight: 500;
  letter-spacing: 0.4em;
  color: #888;
  margin-bottom: 2rem;
  text-align: center;
}
.fp-ui-links__row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
}
@media (min-width: 768px) {
  .fp-ui-links__row { grid-template-columns: 1fr 1fr; }
}
.fp-ui-link {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  background: rgba(255, 255, 255, 0.04);
  border: 0.5px solid rgba(255, 255, 255, 0.12);
  color: #f5f5f5;
  transition: background 0.3s, border-color 0.3s, transform 0.3s;
  cursor: pointer;
}
.fp-ui-link:hover {
  background: rgba(255, 255, 255, 0.08);
  border-color: #f5f5f5;
  transform: translateX(6px);
}
.fp-ui-link--disabled {
  opacity: 0.5;
  pointer-events: none;
}
.fp-ui-link__no {
  font-family: "Italiana", serif;
  font-size: 1.75rem;
  font-weight: 400;
  color: #888;
}
.fp-ui-link div {
  flex: 1;
}
.fp-ui-link h3 {
  font-family: "Italiana", serif;
  font-size: 1.375rem;
  font-weight: 400;
  letter-spacing: 0.02em;
  margin-bottom: 0.25rem;
}
.fp-ui-link p {
  font-size: 0.75rem;
  color: #999;
  letter-spacing: 0.05em;
}
.fp-ui-link__arrow {
  font-size: 1.25rem;
  color: #888;
  transition: transform 0.3s, color 0.3s;
}
.fp-ui-link:hover .fp-ui-link__arrow {
  transform: translateX(4px);
  color: #f5f5f5;
}

/* 하단 네비 */
.fp-nav {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 5rem;
  padding-top: 3rem;
  border-top: 0.5px solid rgba(255, 255, 255, 0.1);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
}
.fp-nav__link {
  color: #bbb;
  transition: color 0.2s;
}
.fp-nav__link:hover { color: #f5f5f5; }
.fp-nav__divider { color: #444; }
</style>
