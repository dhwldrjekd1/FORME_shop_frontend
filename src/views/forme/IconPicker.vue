<template>
  <main class="ip">
    <header class="ip-top">
      <RouterLink to="/forme" class="ip-top__link">← Design Picker</RouterLink>
      <span class="ip-top__title">ICON STYLES · 30 VARIANTS</span>
      <RouterLink to="/forme32" class="ip-top__link">forme32 →</RouterLink>
    </header>

    <div class="ip-intro">
      <p class="ip-intro__eyebrow">COMPONENT LIBRARY</p>
      <h1 class="ip-intro__title">Header Icon Styles</h1>
      <p class="ip-intro__desc">
        검색 · 찜 · 마이 · 장바구니 아이콘 30가지 스타일.<br />
        마음에 드는 번호를 알려주세요.
      </p>
    </div>

    <section v-for="(style, i) in iconStyles" :key="i" class="ip-slot">
      <div class="ip-label">
        <span class="ip-label__no">ICON N° {{ String(i + 1).padStart(2, '0') }}</span>
        <span class="ip-label__name">{{ style.name }}</span>
      </div>
      <div class="ip-preview" :style="{ background: style.bg, color: style.fg }">
        <div class="ip-preview__bar" :style="{ borderColor: style.border }">
          <span class="ip-preview__logo" :style="{ color: style.fg }">FORME</span>
          <div class="ip-preview__icons">
            <span
              v-for="(icon, j) in style.icons"
              :key="j"
              class="ip-icon"
              :class="style.class"
              :style="style.iconStyle || {}"
              v-html="icon"
            ></span>
          </div>
        </div>
      </div>
    </section>

    <nav class="ip-bottomnav">
      <RouterLink to="/forme" class="ip-bottomnav__link">← Design Picker</RouterLink>
      <RouterLink to="/forme/ui/header" class="ip-bottomnav__link">Header Library →</RouterLink>
    </nav>
  </main>
</template>

<script setup>
const iconStyles = [
  // ── 01~05: 이모지 기반 ──
  { name: "Emoji Basic",             bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--emoji",     icons: ["🔍", "♡", "👤", "🛒"] },
  { name: "Emoji Filled",            bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--emoji",     icons: ["🔎", "❤️", "😊", "🛍️"] },
  { name: "Emoji Minimal",           bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--emoji",     icons: ["🔍", "☆", "○", "□"] },
  { name: "Emoji Korean",            bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--emoji",     icons: ["🔍", "💗", "👤", "🧺"] },
  { name: "Emoji Dark BG",           bg: "#1a1a1a", fg: "#fff", border: "#333", class: "ip-icon--emoji",  icons: ["🔍", "🤍", "👤", "🛒"] },

  // ── 06~10: Material Symbols (outline) ──
  { name: "Material Outline Light",  bg: "#fff", fg: "#333", border: "#eee", class: "ip-icon--material",  icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Material Outline Dark",   bg: "#1a1a1a", fg: "#f5f5f5", border: "#333", class: "ip-icon--material", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Material Outline Red",    bg: "#fff", fg: "#333", border: "#eee", class: "ip-icon--material ip-icon--red", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Material Outline Gold",   bg: "#faf8f4", fg: "#1a1a1a", border: "#e8e0d0", class: "ip-icon--material ip-icon--gold", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Material Outline Beige",  bg: "#f4efe7", fg: "#2a241c", border: "#d4c9b5", class: "ip-icon--material ip-icon--brown", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },

  // ── 11~15: Material Symbols (filled) ──
  { name: "Material Filled Light",   bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--material-fill", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">favorite</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">person</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">shopping_bag</span>'] },
  { name: "Material Filled Dark",    bg: "#1a1a1a", fg: "#f5f5f5", border: "#333", class: "ip-icon--material-fill", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">favorite</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">person</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1">shopping_bag</span>'] },
  { name: "Material Filled Small",   bg: "#fff", fg: "#666", border: "#eee", class: "ip-icon--material-sm", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;font-size:1rem">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;font-size:1rem">favorite</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;font-size:1rem">person</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'FILL\' 1;font-size:1rem">shopping_bag</span>'] },
  { name: "Material Thin (wght 200)", bg: "#fff", fg: "#333", border: "#eee", class: "ip-icon--material-thin", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">favorite_border</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">person_outline</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">shopping_bag</span>'] },
  { name: "Material Bold (wght 600)", bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--material-bold", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 600">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 600">favorite_border</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 600">person_outline</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 600">shopping_bag</span>'] },

  // ── 16~20: 텍스트 기반 ──
  { name: "Text Uppercase",          bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--text",      icons: ["SEARCH", "WISH", "MY", "BAG"] },
  { name: "Text Lowercase",          bg: "#fff", fg: "#666", border: "#eee", class: "ip-icon--text-lower", icons: ["search", "wish", "my", "bag"] },
  { name: "Text Korean",             bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--text-kr",   icons: ["검색", "찜", "마이", "장바구니"] },
  { name: "Text + Icon Mix",         bg: "#fff", fg: "#333", border: "#eee", class: "ip-icon--text-mix",  icons: ['<span class="material-symbols-outlined" style="font-size:1rem">search</span> 검색', '<span class="material-symbols-outlined" style="font-size:1rem">favorite_border</span> 찜', '<span class="material-symbols-outlined" style="font-size:1rem">person_outline</span> 마이', '<span class="material-symbols-outlined" style="font-size:1rem">shopping_bag</span> 장바구니'] },
  { name: "Text Dark Minimal",       bg: "#1a1a1a", fg: "#ccc", border: "#333", class: "ip-icon--text-dark", icons: ["Search", "Wishlist", "Account", "Cart"] },

  // ── 21~25: 원형/박스 배경 ──
  { name: "Circle Outline",          bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--circle",    icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Circle Filled Black",     bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--circle-fill", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Circle Filled Red",       bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--circle-red", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Square Outline",          bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--square",    icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Square Dark BG",          bg: "#1a1a1a", fg: "#f5f5f5", border: "#333", class: "ip-icon--square-dark", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },

  // ── 26~30: 특수 스타일 ──
  { name: "Underline on Hover Style", bg: "#fff", fg: "#111", border: "#eee", class: "ip-icon--underline", icons: ['<span class="material-symbols-outlined">search</span>', '<span class="material-symbols-outlined">favorite_border</span>', '<span class="material-symbols-outlined">person_outline</span>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Slash Separated",         bg: "#fff", fg: "#666", border: "#eee", class: "ip-icon--slash",     icons: ['<span class="material-symbols-outlined">search</span> <em>/</em>', '<span class="material-symbols-outlined">favorite_border</span> <em>/</em>', '<span class="material-symbols-outlined">person_outline</span> <em>/</em>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Dot Separated",           bg: "#faf8f4", fg: "#1a1a1a", border: "#e8e0d0", class: "ip-icon--dot", icons: ['<span class="material-symbols-outlined">search</span> <em>·</em>', '<span class="material-symbols-outlined">favorite_border</span> <em>·</em>', '<span class="material-symbols-outlined">person_outline</span> <em>·</em>', '<span class="material-symbols-outlined">shopping_bag</span>'] },
  { name: "Monospace Code Style",    bg: "#0e0e0e", fg: "#00ff88", border: "#222", class: "ip-icon--mono", icons: ["/search", "/wish", "/my", "/bag"] },
  { name: "Luxury Gold",             bg: "#0a0907", fg: "#d4b976", border: "#2a2520", class: "ip-icon--luxury", icons: ['<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">search</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">favorite_border</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">person_outline</span>', '<span class="material-symbols-outlined" style="font-variation-settings:\'wght\' 200">shopping_bag</span>'] },
];
</script>

<style scoped>
.ip { background: #0f0f0f; color: #f5f5f5; font-family: var(--font-body); min-height: 100dvh; }

.ip-top { position: sticky; top: 0; z-index: 100; display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2rem; background: rgba(15,15,15,0.92); backdrop-filter: blur(12px); border-bottom: 0.5px solid rgba(255,255,255,0.12); font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.25em; text-transform: uppercase; }
.ip-top__link { color: #bbb; transition: color 0.2s; }
.ip-top__link:hover { color: #fff; }
.ip-top__title { font-family: "Italiana", serif; font-size: 0.9375rem; font-weight: 400; letter-spacing: 0.15em; text-transform: none; color: #fff; }

.ip-intro { text-align: center; padding: 6rem 2rem 4rem; max-width: 50rem; margin: 0 auto; border-bottom: 0.5px solid rgba(255,255,255,0.1); }
.ip-intro__eyebrow { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.4em; color: #888; margin-bottom: 1.5rem; }
.ip-intro__title { font-family: "Italiana", serif; font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 400; margin-bottom: 1.25rem; }
.ip-intro__desc { font-size: 0.9375rem; color: #999; line-height: 1.8; }

.ip-slot { max-width: 1000px; margin: 0 auto; padding: 3rem 2rem; border-bottom: 0.5px solid rgba(255,255,255,0.08); }
.ip-label { display: flex; align-items: baseline; gap: 1.5rem; margin-bottom: 1.25rem; }
.ip-label__no { font-family: "Space Mono", monospace; font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.25em; color: #fff; background: rgba(255,255,255,0.1); padding: 0.375rem 0.75rem; }
.ip-label__name { font-family: "Italiana", serif; font-size: 1.25rem; color: #fff; }

.ip-preview { border: 0.5px solid rgba(255,255,255,0.08); overflow: hidden; }
.ip-preview__bar { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 2rem; border-bottom: 1px solid; }
.ip-preview__logo { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.03em; }
.ip-preview__icons { display: flex; align-items: center; gap: 1.25rem; }

/* ── 아이콘 스타일별 CSS ── */
.ip-icon { cursor: pointer; display: inline-flex; align-items: center; gap: 0.375rem; transition: opacity 0.2s; }
.ip-icon:hover { opacity: 0.6; }

/* 이모지 */
.ip-icon--emoji { font-size: 1.25rem; }

/* Material 기본 */
.ip-icon--material .material-symbols-outlined { font-size: 1.375rem; font-variation-settings: "wght" 300; }
.ip-icon--material-fill .material-symbols-outlined { font-size: 1.375rem; }
.ip-icon--material-sm .material-symbols-outlined { font-size: 1rem; }
.ip-icon--material-thin .material-symbols-outlined { font-size: 1.5rem; }
.ip-icon--material-bold .material-symbols-outlined { font-size: 1.375rem; }

/* 컬러 변형 */
.ip-icon--red :deep(.material-symbols-outlined) { color: #FF2D2D !important; }
.ip-icon--gold .material-symbols-outlined { color: #c9a86b; }
.ip-icon--brown .material-symbols-outlined { color: #8b7340; }

/* 텍스트 */
.ip-icon--text { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.2em; }
.ip-icon--text-lower { font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; font-style: italic; }
.ip-icon--text-kr { font-size: 0.8125rem; font-weight: 500; }
.ip-icon--text-mix { font-size: 0.6875rem; font-weight: 500; display: inline-flex; align-items: center; gap: 0.25rem; }
.ip-icon--text-dark { font-size: 0.6875rem; font-weight: 400; letter-spacing: 0.15em; }

/* 원형 */
.ip-icon--circle { width: 2.5rem; height: 2.5rem; border: 1px solid #ddd; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; }
.ip-icon--circle .material-symbols-outlined { font-size: 1.125rem; font-variation-settings: "wght" 300; }
.ip-icon--circle:hover { border-color: #111; }

.ip-icon--circle-fill { width: 2.5rem; height: 2.5rem; background: #111; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #fff !important; }
.ip-icon--circle-fill .material-symbols-outlined { font-size: 1.125rem; color: #fff; font-variation-settings: "wght" 300; }

.ip-icon--circle-red { width: 2.5rem; height: 2.5rem; background: #FF2D2D; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; color: #fff !important; }
.ip-icon--circle-red .material-symbols-outlined { font-size: 1.125rem; color: #fff; font-variation-settings: "wght" 300; }

/* 사각 */
.ip-icon--square { width: 2.5rem; height: 2.5rem; border: 1px solid #ddd; display: inline-flex; align-items: center; justify-content: center; }
.ip-icon--square .material-symbols-outlined { font-size: 1.125rem; font-variation-settings: "wght" 300; }
.ip-icon--square:hover { border-color: #111; background: #111; color: #fff; }
.ip-icon--square:hover .material-symbols-outlined { color: #fff; }

.ip-icon--square-dark { width: 2.5rem; height: 2.5rem; border: 1px solid #444; display: inline-flex; align-items: center; justify-content: center; }
.ip-icon--square-dark .material-symbols-outlined { font-size: 1.125rem; color: #f5f5f5; font-variation-settings: "wght" 300; }
.ip-icon--square-dark:hover { border-color: #FF2D2D; }

/* 밑줄 */
.ip-icon--underline { padding-bottom: 4px; border-bottom: 2px solid transparent; }
.ip-icon--underline .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; }
.ip-icon--underline:hover { border-bottom-color: currentColor; opacity: 1; }

/* 슬래시 */
.ip-icon--slash { display: inline-flex; align-items: center; gap: 0; }
.ip-icon--slash .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; }
.ip-icon--slash em { font-style: normal; color: #ddd; margin: 0 0.75rem; font-size: 1rem; }
.ip-icon--slash:last-child em { display: none; }

/* 점 */
.ip-icon--dot { display: inline-flex; align-items: center; }
.ip-icon--dot .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; }
.ip-icon--dot em { font-style: normal; color: #c9a86b; margin: 0 0.625rem; font-size: 0.75rem; }
.ip-icon--dot:last-child em { display: none; }

/* 모노스페이스 */
.ip-icon--mono { font-family: "Space Mono", monospace; font-size: 0.75rem; font-weight: 700; letter-spacing: 0.1em; }

/* 럭셔리 */
.ip-icon--luxury .material-symbols-outlined { font-size: 1.375rem; color: #d4b976; }

/* 하단 네비 */
.ip-bottomnav { display: flex; justify-content: space-between; padding: 3rem 2rem 5rem; max-width: 1000px; margin: 0 auto; font-size: 0.75rem; letter-spacing: 0.15em; text-transform: uppercase; }
.ip-bottomnav__link { color: #bbb; transition: color 0.2s; }
.ip-bottomnav__link:hover { color: #fff; }
</style>
