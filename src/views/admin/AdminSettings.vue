<template>
  <div class="admin-layout">
    <AdminSidebar />

    <main class="admin-main">
      <header class="admin-header">
        <div>
          <p class="admin-header__label">System</p>
          <h2 class="admin-header__title">Settings</h2>
          <p class="admin-header__desc">시스템 설정 페이지입니다.</p>
        </div>
      </header>

      <div class="admin-preparing">
        <span class="material-symbols-outlined">settings</span>
        <h3 class="admin-preparing__title">준비 중입니다</h3>
        <p class="admin-preparing__desc">해당 기능은 현재 개발 중입니다.</p>
      </div>
    </main>
  </div>
</template>

<script setup>
import AdminSidebar from "@/components/admin/AdminSidebar.vue";
</script>

<style scoped>
.admin-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
  background-color: #f9f9f9;
}

.admin-main {
  padding: 2rem 3rem;
}

.admin-header__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: #777;
}
.admin-header__title {
  font-family: var(--font-headline);
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  font-weight: 900;
  letter-spacing: -0.03em;
  margin-top: 0.75rem;
}
.admin-header__desc {
  margin-top: 1rem;
  font-size: 0.875rem;
  color: #777;
  margin-bottom: 2.5rem;
}

.admin-preparing {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1rem;
  color: #777;
}

.admin-preparing .material-symbols-outlined {
  font-size: 3.5rem;
}
.admin-preparing__title {
  font-family: var(--font-headline);
  font-size: 1.5rem;
  font-weight: 700;
  color: #111;
}
.admin-preparing__desc {
  font-size: 0.875rem;
}
</style>
