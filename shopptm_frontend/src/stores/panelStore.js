import { defineStore } from "pinia";
import { ref } from "vue";

export const usePanelStore = defineStore("panel", () => {
  const isOpen = ref(false);
  const activeTab = ref("cart"); // cart, wishlist, mypage

  function open(tab = "cart") {
    activeTab.value = tab;
    isOpen.value = true;
  }

  function close() {
    isOpen.value = false;
  }

  function toggle(tab) {
    if (isOpen.value && activeTab.value === tab) {
      close();
    } else {
      open(tab);
    }
  }

  return { isOpen, activeTab, open, close, toggle };
});
