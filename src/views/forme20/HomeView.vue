<template>
  <main class="page-wrapper f20-home">
    <section class="f20-hero">
      <div class="f20-hero__paper">
        <div class="f20-hero__tape f20-hero__tape--left"></div>
        <div class="f20-hero__tape f20-hero__tape--right"></div>
        <p class="f20-hero__hand">— Handmade with care ~</p>
        <h1 class="f20-hero__title">forme</h1>
        <p class="f20-hero__sub">a small atelier, est. 2026 ✿</p>
        <div class="f20-hero__ornament">✦ · ✦ · ✦</div>
        <p class="f20-hero__desc">
          손으로 그린 작은 옷장.<br />
          천천히 고르고, 오래 입는 마음으로.
        </p>
        <RouterLink to="/products" class="f20-cta">↝ see the shop</RouterLink>
      </div>
    </section>

    <section class="f20-brands">
      <h2 class="f20-h">・ the four friends ・</h2>
      <p class="f20-h-sub">네 브랜드를 소개할게요</p>
      <div class="f20-brands__grid">
        <RouterLink v-for="(b,i) in brands" :key="b.id" :to="b.route" class="f20-brand">
          <div class="f20-brand__sticker">{{ ['✿','✤','❋','❀'][i] }}</div>
          <div class="f20-brand__polaroid">
            <img :src="b.image" :alt="b.title" />
            <p class="f20-brand__caption">— {{ b.title }} —</p>
          </div>
          <p class="f20-brand__note">{{ b.note }}</p>
        </RouterLink>
      </div>
    </section>

    <section class="f20-products">
      <h2 class="f20-h">· today's picks ·</h2>
      <div class="f20-products__grid">
        <RouterLink v-for="(p,i) in products.slice(0,6)" :key="p.id" :to="`/products/${p.id}`" class="f20-item">
          <div class="f20-item__sticker">{{ i+1 }}.</div>
          <div class="f20-item__img"><img :src="p.image" :alt="p.name" /></div>
          <p class="f20-item__name">{{ p.name }}</p>
          <p class="f20-item__price">₩ {{ fmt(p.price) }} ♡</p>
        </RouterLink>
      </div>
    </section>

    <section class="f20-letter">
      <div class="f20-letter__paper">
        <p>
          안녕하세요, FORME 에요.<br /><br />
          이곳은 큰 쇼핑몰이 아니에요.<br />
          하나하나 고르고, 직접 입어보고,<br />
          오래 입을 수 있는 것만 골라서 소개해요.<br /><br />
          천천히 둘러보세요.<br />
          마음에 드는 것을 찾으면 좋겠어요.
        </p>
        <p class="f20-letter__sign">— forme, with love ✿</p>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "@/stores/productStore";
import { storeToRefs } from "pinia";
const productStore = useProductStore();
const { products } = storeToRefs(productStore);
onMounted(() => productStore.fetchProducts());
const fmt = (p) => p ? p.toLocaleString() : "";
const brands = [
  { id: 1, title: "Beanpole", note: "서울에서 온 친구",        route: "/beanpole", image: "https://www.beanpole.com/file/BR/BM/MB/FI_2025111311162995014.jpg" },
  { id: 2, title: "Carhartt", note: "미국 워크웨어의 정석",    route: "/carhartt", image: "https://www.carhartt-wip.co.kr/static/media/brand-page-img1.c91bdcc7bf7719c5d9cd.jpg" },
  { id: 3, title: "Levi's",   note: "150년의 파란 청바지",     route: "/levis",    image: "https://levi.co.kr/cdn/shop/files/Jordan_collab-bn_PC-1.png?v=1771552899" },
  { id: 4, title: "Dickies",  note: "텍사스에서 온 튼튼함",   route: "/dickies",  image: "https://dickieskr.com/web/img/lookbook/mmlg/07.jpg" },
];
</script>

<style scoped>
.f20-home {
  background: #fdf8ef;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(168, 140, 100, 0.05) 1px, transparent 1px),
    radial-gradient(circle at 70% 60%, rgba(168, 140, 100, 0.05) 1px, transparent 1px);
  background-size: 60px 60px, 80px 80px;
  color: #4a3a28;
  font-family: "Fraunces", Georgia, serif;
  min-height: 100dvh;
}

.f20-hero {
  min-height: calc(100dvh - var(--header-height));
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
}
.f20-hero__paper {
  position: relative;
  background: #fffaf0;
  padding: 5rem 4rem;
  max-width: 40rem;
  text-align: center;
  border: 1px solid rgba(168, 140, 100, 0.2);
  box-shadow:
    0 1px 0 rgba(168, 140, 100, 0.3),
    0 20px 40px rgba(74, 58, 40, 0.1);
  transform: rotate(-0.5deg);
}
.f20-hero__tape {
  position: absolute;
  width: 6rem;
  height: 1.25rem;
  background: rgba(255, 213, 79, 0.5);
  border: 1px solid rgba(168, 140, 100, 0.2);
}
.f20-hero__tape--left { top: -0.5rem; left: 2rem; transform: rotate(-6deg); }
.f20-hero__tape--right { top: -0.5rem; right: 2rem; transform: rotate(5deg); }
.f20-hero__hand {
  font-style: italic;
  font-size: 1rem;
  color: #8b6a3a;
  margin-bottom: 1rem;
}
.f20-hero__title {
  font-family: "Caveat", "Fraunces", cursive;
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 400;
  line-height: 0.95;
  color: #4a3a28;
  margin-bottom: 0.5rem;
  font-style: italic;
}
.f20-hero__sub {
  font-style: italic;
  font-size: 1.125rem;
  color: #8b6a3a;
  margin-bottom: 1.5rem;
}
.f20-hero__ornament {
  font-size: 1rem;
  color: #a88c64;
  letter-spacing: 0.2em;
  margin-bottom: 1.5rem;
}
.f20-hero__desc {
  font-size: 1rem;
  line-height: 2;
  color: #6a5540;
  margin-bottom: 2.5rem;
}
.f20-cta {
  display: inline-block;
  padding: 0.875rem 2rem;
  background: #fffaf0;
  border: 2px dashed #8b6a3a;
  color: #4a3a28;
  font-style: italic;
  font-size: 1rem;
  transition: background 0.3s;
}
.f20-cta:hover { background: #fff0c0; }

.f20-h {
  text-align: center;
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 400;
  font-style: italic;
  color: #4a3a28;
  padding-top: 5rem;
  margin-bottom: 0.5rem;
}
.f20-h-sub {
  text-align: center;
  font-size: 0.9375rem;
  font-style: italic;
  color: #8b6a3a;
  margin-bottom: 3.5rem;
}

.f20-brands { padding: 0 3rem 6rem; }
.f20-brands__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 3rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 640px) { .f20-brands__grid { grid-template-columns: 1fr 1fr; } }
@media (min-width: 1024px) { .f20-brands__grid { grid-template-columns: repeat(4, 1fr); } }
.f20-brand {
  position: relative;
  text-align: center;
  color: inherit;
  cursor: pointer;
}
.f20-brand:nth-child(odd) .f20-brand__polaroid { transform: rotate(-2deg); }
.f20-brand:nth-child(even) .f20-brand__polaroid { transform: rotate(2deg); }
.f20-brand:hover .f20-brand__polaroid { transform: rotate(0); }
.f20-brand__sticker {
  position: absolute;
  top: -0.5rem;
  right: 1rem;
  background: #ffd54f;
  color: #4a3a28;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  border: 1.5px solid #8b6a3a;
  z-index: 2;
  transform: rotate(-10deg);
}
.f20-brand__polaroid {
  background: #fffaf0;
  padding: 1rem 1rem 2rem;
  box-shadow: 0 4px 16px rgba(74, 58, 40, 0.12);
  transition: transform 0.4s;
  margin-bottom: 0.75rem;
}
.f20-brand__polaroid img {
  width: 100%;
  aspect-ratio: 1/1;
  object-fit: cover;
  filter: sepia(0.15) saturate(0.85);
}
.f20-brand__caption {
  font-family: "Caveat", "Fraunces", cursive;
  font-style: italic;
  font-size: 1.125rem;
  color: #4a3a28;
  margin-top: 0.75rem;
}
.f20-brand__note {
  font-style: italic;
  font-size: 0.875rem;
  color: #8b6a3a;
}

.f20-products { padding: 0 3rem 6rem; }
.f20-products__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
}
@media (min-width: 768px) { .f20-products__grid { grid-template-columns: repeat(3, 1fr); } }
.f20-item {
  position: relative;
  text-align: center;
  color: inherit;
}
.f20-item__sticker {
  position: absolute;
  top: -0.5rem;
  left: -0.5rem;
  background: #a8c8e0;
  color: #4a3a28;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Caveat", cursive;
  font-size: 1rem;
  font-weight: 700;
  border: 1.5px solid #8b6a3a;
  z-index: 2;
  transform: rotate(-8deg);
}
.f20-item__img {
  aspect-ratio: 1/1;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.3);
  padding: 1.5rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 3px 12px rgba(74, 58, 40, 0.08);
}
.f20-item__img img {
  width: 100%; height: 100%;
  object-fit: contain;
  filter: sepia(0.1);
}
.f20-item__name {
  font-size: 1rem;
  font-style: italic;
  margin-bottom: 0.25rem;
}
.f20-item__price {
  font-size: 0.9375rem;
  color: #8b6a3a;
}

.f20-letter {
  padding: 5rem 3rem 8rem;
}
.f20-letter__paper {
  max-width: 34rem;
  margin: 0 auto;
  background: #fffaf0;
  border: 1px solid rgba(168, 140, 100, 0.25);
  padding: 4rem 3rem;
  text-align: center;
  font-size: 1.0625rem;
  line-height: 2;
  color: #4a3a28;
  box-shadow: 0 8px 24px rgba(74, 58, 40, 0.08);
  transform: rotate(0.5deg);
  font-style: italic;
}
.f20-letter__sign {
  margin-top: 1.5rem;
  font-family: "Caveat", "Fraunces", cursive;
  font-size: 1.5rem;
  color: #8b6a3a;
}
</style>
