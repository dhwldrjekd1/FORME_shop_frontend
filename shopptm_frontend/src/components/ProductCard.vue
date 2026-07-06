<template>
  <RouterLink :to="`/products/${product.id}`" class="pc-card">
    <div class="pc-card__visual">
      <img :src="product.thumbnailUrl || product.imageUrl || product.image" :alt="product.name" />

      <!-- Best: 순위 뱃지 -->
      <span v-if="rank != null" class="pc-card__rank" :class="{ 'pc-card__rank--top': rank < 3 }">{{ rank + 1 }}</span>

      <!-- New: 텍스트 뱃지 -->
      <span v-if="badgeText" class="pc-card__badge">{{ badgeText }}</span>

      <!-- Sale: 할인율 뱃지 -->
      <div v-if="showDiscount" class="pc-card__dc-badge">
        <span class="pc-card__dc-num">{{ product.discountRate }}%</span>
        <span class="pc-card__dc-text">OFF</span>
      </div>

      <button
        class="pc-card__wish" :class="{ 'pc-card__wish--on': wishlistStore.isWished(product.id) }"
        :style="wishlistStore.isWished(product.id) ? { color: getBrandColor(product.brand) } : {}"
        @click.prevent="wishlistStore.toggle(product)"
      >
        <span class="material-symbols-outlined">favorite</span>
      </button>

      <div v-if="showDiscount" class="pc-card__overlay"><span>VIEW →</span></div>
    </div>

    <div class="pc-card__info">
      <p class="pc-card__brand" :style="{ color: getBrandColor(product.brand) }">{{ product.brand }}</p>
      <h3 class="pc-card__name">{{ product.name }}</h3>

      <div v-if="showDiscount" class="pc-card__prices">
        <span class="pc-card__sale-price">₩{{ Math.round(product.price * (1 - product.discountRate / 100)).toLocaleString() }}</span>
        <span class="pc-card__original-price">₩{{ product.price?.toLocaleString() }}</span>
        <span class="pc-card__save">{{ product.discountRate }}% 할인</span>
      </div>
      <p v-else class="pc-card__price">₩{{ product.price?.toLocaleString() }}</p>
    </div>
  </RouterLink>
</template>

<script setup>
import { useWishlistStore } from "@/stores/wishlistStore";
import { getBrandColor } from "@/utils/productFilters";

defineProps({
  product: { type: Object, required: true },
  rank: { type: Number, default: null },       // Best 뷰: 0-based 순위 (표시는 +1)
  badgeText: { type: String, default: null },  // New 뷰: "NEW"
  showDiscount: { type: Boolean, default: false }, // Sale 뷰: 할인 뱃지 + 가격 취소선 + hover 오버레이
});

const wishlistStore = useWishlistStore();
</script>

<style scoped>
.pc-card { display: block; text-decoration: none; color: inherit; }
.pc-card__visual { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec; border-radius: 0.375rem; margin-bottom: 0.875rem; }
.pc-card__visual img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s; }
.pc-card:hover .pc-card__visual img { transform: scale(1.04); }

.pc-card__rank { position: absolute; top: 0.75rem; left: 0.75rem; width: 1.75rem; height: 1.75rem; border-radius: 50%; display: flex; align-items: center; justify-content: center; background: rgba(0,0,0,0.5); color: #fff; font-size: 0.75rem; font-weight: 900; }
.pc-card__rank--top { background: #c9a86b; }

.pc-card__badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #FF2D2D; color: #fff; font-size: 0.5rem; font-weight: 900; letter-spacing: 0.15em; padding: 0.2rem 0.5rem; border-radius: 0.2rem; }

.pc-card__dc-badge { position: absolute; top: 0.75rem; left: 0.75rem; background: #FF2D2D; color: #fff; padding: 0.5rem 0.625rem; border-radius: 0.375rem; text-align: center; line-height: 1; }
.pc-card__dc-num { font-size: 1.125rem; font-weight: 900; display: block; }
.pc-card__dc-text { font-size: 0.4375rem; font-weight: 800; letter-spacing: 0.15em; }

.pc-card__wish { position: absolute; top: 0.75rem; right: 0.75rem; width: 2rem; height: 2rem; border-radius: 50%; background: rgba(255,255,255,0.9); border: none; display: flex; align-items: center; justify-content: center; cursor: pointer; opacity: 0; transition: opacity 0.3s; color: #bbb; }
.pc-card:hover .pc-card__wish { opacity: 1; }
.pc-card__wish--on { opacity: 1 !important; color: #FF2D2D; }
.pc-card__wish .material-symbols-outlined { font-size: 1rem; font-variation-settings: "FILL" 1, "wght" 400; }

.pc-card__overlay { position: absolute; inset: 0; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 1.25rem; background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 40%); opacity: 0; transition: opacity 0.3s; }
.pc-card:hover .pc-card__overlay { opacity: 1; }
.pc-card__overlay span { font-size: 0.625rem; font-weight: 800; letter-spacing: 0.2em; color: #fff; padding: 0.5rem 1.25rem; border: 1px solid rgba(255,255,255,0.6); backdrop-filter: blur(4px); }

.pc-card__brand { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.12em; margin-bottom: 0.25rem; }
.pc-card__name { font-size: 0.9375rem; font-weight: 600; color: #111; margin-bottom: 0.375rem; }
.pc-card__price { font-size: 0.9375rem; font-weight: 800; }

.pc-card__prices { display: flex; align-items: baseline; gap: 0.5rem; flex-wrap: wrap; }
.pc-card__sale-price { font-size: 1.125rem; font-weight: 900; color: #FF2D2D; }
.pc-card__original-price { font-size: 0.75rem; color: #bbb; text-decoration: line-through; }
.pc-card__save { font-size: 0.5rem; font-weight: 800; background: #fff0f0; color: #FF2D2D; padding: 0.15rem 0.375rem; border-radius: 0.2rem; }
</style>
