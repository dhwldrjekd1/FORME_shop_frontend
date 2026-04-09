<template>
  <aside class="admin-sidebar">
    <div class="admin-sidebar__brand">
      <h1 class="admin-sidebar__logo">FORME</h1>
      <p class="admin-sidebar__label">Admin Dashboard</p>
    </div>

    <nav class="admin-sidebar__nav">
      <RouterLink
        v-for="item in navItems"
        :key="item.path"
        :to="item.path"
        class="admin-sidebar__link"
        :class="{ 'admin-sidebar__link--active': route.path === item.path }"
      >
        <span class="material-symbols-outlined">{{ item.icon }}</span>
        {{ item.label }}
      </RouterLink>
    </nav>

    <div class="admin-sidebar__footer">
      <p class="admin-sidebar__footer-label">Logged in as</p>
      <p class="admin-sidebar__footer-name">FORME Admin</p>
    </div>
  </aside>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();

const navItems = [
  { label: "Dashboard", path: "/admin", icon: "dashboard" },
  { label: "Products", path: "/admin/products", icon: "inventory_2" },
  { label: "Orders", path: "/admin/orders", icon: "shopping_bag" },
  { label: "Q&A", path: "/admin/qna", icon: "forum" },
  { label: "FAQ", path: "/admin/faq", icon: "help" },
  { label: "Members", path: "/admin/members", icon: "groups" },
  { label: "Settings", path: "/admin/settings", icon: "settings" },
];
</script>

<style scoped>
.admin-sidebar {
  background-color: #fff;
  border-right: 1px solid #e5e5e5;
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
}

.admin-sidebar__brand {
  margin-bottom: 3rem;
}

.admin-sidebar__logo {
  font-family: var(--font-headline);
  font-size: 1.75rem;
  font-weight: 900;
  letter-spacing: -0.02em;
}

.admin-sidebar__label {
  margin-top: 0.5rem;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #777;
}

.admin-sidebar__nav {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.admin-sidebar__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  font-size: 0.875rem;
  color: #777;
  transition:
    background 0.2s,
    color 0.2s;
}

.admin-sidebar__link:hover {
  background-color: #f3f3f3;
  color: #111;
}

.admin-sidebar__link--active {
  background-color: #000;
  color: #fff;
  border: 1px solid #000;
}

.admin-sidebar__link--active:hover {
  background-color: #000;
  color: #fff;
}

.admin-sidebar__footer {
  margin-top: auto;
  padding-top: 1.5rem;
  border-top: 1px solid #e5e5e5;
}

.admin-sidebar__footer-label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #777;
}

.admin-sidebar__footer-name {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}
</style>
