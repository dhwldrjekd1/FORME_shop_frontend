import { defineStore } from "pinia";
import { ref } from "vue";

const STORAGE_KEY = "forme_recent";
const MAX_ITEMS = 10;

export const useRecentStore = defineStore("recent", () => {
  const items = ref(load());

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value));
  }

  function add(product) {
    if (!product?.id) return;
    // 중복 제거
    items.value = items.value.filter((p) => p.id !== product.id);
    // 할인 적용 가격 계산
    const discount = product.discountRate || 0;
    const salePrice = discount > 0 ? Math.round(product.price * (100 - discount) / 100) : product.price;
    // 맨 앞에 추가
    items.value.unshift({
      id: product.id,
      name: product.name,
      price: salePrice,
      originalPrice: discount > 0 ? product.price : null,
      discountRate: discount,
      image: product.image || product.imageUrl,
      category: product.category,
      brand: product.brand,
    });
    // 최대 개수 유지
    if (items.value.length > MAX_ITEMS) {
      items.value = items.value.slice(0, MAX_ITEMS);
    }
    save();
  }

  function clear() {
    items.value = [];
    save();
  }

  return { items, add, clear };
});
