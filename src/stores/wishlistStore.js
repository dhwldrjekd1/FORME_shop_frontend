import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useWishlistStore = defineStore("wishlist", () => {
  // ── state ──
  const items = ref([]); // { id, name, price, image, category }

  // ── getters ──
  const count = computed(() => items.value.length);

  function isWished(productId) {
    return items.value.some((i) => i.id === productId);
  }

  // ── actions ──
  function toggle(product) {
    const idx = items.value.findIndex((i) => i.id === product.id);
    if (idx === -1) {
      items.value.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category,
      });
    } else {
      items.value.splice(idx, 1);
    }
  }

  function remove(productId) {
    items.value = items.value.filter((i) => i.id !== productId);
  }

  return { items, count, isWished, toggle, remove };
});
