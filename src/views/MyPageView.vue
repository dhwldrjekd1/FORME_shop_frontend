<template>
  <main class="page-wrapper mypage">
    <div class="mypage-inner container--full">
      <!-- 헤더 -->
      <header class="mypage-header">
        <div>
          <span class="mypage-header__label">My Account</span>
          <h1 class="mypage-header__title">마이페이지</h1>
        </div>
        <button class="mypage-logout" @click="logout">로그아웃</button>
      </header>

      <!-- 탭 -->
      <div class="mypage-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          class="mypage-tab"
          :class="{ 'mypage-tab--active': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- 주문 내역 -->
      <section v-if="activeTab === 'orders'" class="mypage-section">
        <div v-if="orders.length === 0" class="mypage-empty">
          <span class="material-symbols-outlined">shopping_bag</span>
          <p>주문 내역이 없습니다.</p>
        </div>

        <div v-else class="mypage-orders">
          <div v-for="order in orders" :key="order.id" class="mypage-order">
            <div class="mypage-order__header">
              <span class="mypage-order__date">{{ order.date }}</span>
              <span class="mypage-order__id">주문번호 {{ order.id }}</span>
              <span
                class="mypage-order__status"
                :class="getOrderStatusClass(order.status)"
                >{{ order.status }}</span
              >
            </div>

            <div
              v-for="item in order.items"
              :key="item.name"
              class="mypage-order__item"
            >
              <div class="mypage-order__img-wrap">
                <img
                  :src="item.image"
                  :alt="item.name"
                  class="mypage-order__img"
                />
              </div>
              <div class="mypage-order__info">
                <p class="mypage-order__name">{{ item.name }}</p>
                <p class="mypage-order__meta">
                  Size: {{ item.size }} · 수량: {{ item.quantity }}
                </p>
                <p class="mypage-order__price">
                  ₩{{ (item.price * item.quantity).toLocaleString() }}
                </p>
              </div>
            </div>

            <div class="mypage-order__footer">
              <span class="mypage-order__total">
                총 결제금액 ₩{{ order.totalAmount.toLocaleString() }}
              </span>
              <button class="mypage-order__btn">주문 상세</button>
            </div>
          </div>
        </div>
      </section>

      <!-- 회원 정보 -->
      <section v-if="activeTab === 'profile'" class="mypage-section">
        <div class="mypage-profile">
          <div class="mypage-profile__group">
            <label class="mypage-profile__label">이름</label>
            <input
              v-model="profile.name"
              type="text"
              class="mypage-profile__input"
              :disabled="!isEditing"
            />
          </div>

          <div class="mypage-profile__group">
            <label class="mypage-profile__label">이메일</label>
            <input
              v-model="profile.email"
              type="email"
              class="mypage-profile__input"
              :disabled="!isEditing"
            />
          </div>

          <div class="mypage-profile__group">
            <label class="mypage-profile__label">연락처</label>
            <input
              v-model="profile.phone"
              type="tel"
              class="mypage-profile__input"
              :disabled="!isEditing"
            />
          </div>

          <div class="mypage-profile__actions">
            <button
              v-if="!isEditing"
              class="mypage-btn mypage-btn--primary"
              @click="isEditing = true"
            >
              정보 수정
            </button>
            <template v-else>
              <button
                class="mypage-btn mypage-btn--outline"
                @click="isEditing = false"
              >
                취소
              </button>
              <button
                class="mypage-btn mypage-btn--primary"
                @click="saveProfile"
              >
                저장
              </button>
            </template>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore";

const router = useRouter();
const authStore = useAuthStore();

// ── 탭 ──
const tabs = [
  { key: "orders", label: "주문 내역" },
  { key: "profile", label: "회원 정보" },
];
const activeTab = ref("orders");

// ── 회원 정보 ──
const isEditing = ref(false);
const profile = ref({
  name: "김보경",
  email: "bokyung@example.com",
  phone: "010-1234-5678",
});

function saveProfile() {
  isEditing.value = false;
  alert("회원 정보가 저장되었습니다.");
}

// ── 주문 내역 ──
const orders = ref([
  {
    id: "#240531",
    date: "2026.04.09",
    status: "배송중",
    totalAmount: 288000,
    items: [
      {
        name: "Levi's 555™ 릴렉스 스트레이트 진",
        size: "32",
        quantity: 1,
        price: 159000,
        image: "/images/levis/201.jpg",
      },
      {
        name: "Beanpole 헤리티지클럽 티셔츠",
        size: "M",
        quantity: 1,
        price: 129000,
        image: "/images/beanpole/404.jpg",
      },
    ],
  },
  {
    id: "#240520",
    date: "2026.03.28",
    status: "배송완료",
    totalAmount: 105000,
    items: [
      {
        name: "디키즈 루즈핏 카펜터 데님 팬츠",
        size: "30",
        quantity: 1,
        price: 105000,
        image: "/images/dickies/301.jpg",
      },
    ],
  },
]);

function getOrderStatusClass(status) {
  const map = {
    배송중: "status--shipping",
    배송완료: "status--complete",
    주문완료: "status--paid",
    취소: "status--canceled",
  };
  return map[status] ?? "";
}

// ── 로그아웃 ──
function logout() {
  authStore.logout();
  router.push("/");
}
</script>

<style scoped>
.mypage {
  padding: 3rem 0 6rem;
}

.mypage-inner {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* 헤더 */
.mypage-header {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 3rem;
}

.mypage-header__label {
  display: block;
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.25em;
  color: var(--color-outline);
  margin-bottom: 0.5rem;
}

.mypage-header__title {
  font-family: var(--font-headline);
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: -0.02em;
}

.mypage-logout {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-outline);
  background: none;
  border: none;
  cursor: pointer;
  transition: color 0.2s;
}

.mypage-logout:hover {
  color: var(--color-primary);
}

/* 탭 */
.mypage-tabs {
  display: flex;
  gap: 0;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 2.5rem;
}

.mypage-tab {
  padding: 0.875rem 1.5rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-outline);
  border-bottom: 2px solid transparent;
  cursor: pointer;
  background: none;
  border-top: none;
  border-left: none;
  border-right: none;
  transition:
    color 0.2s,
    border-color 0.2s;
}

.mypage-tab:hover {
  color: var(--color-primary);
}

.mypage-tab--active {
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
  font-weight: 700;
}

/* 빈 상태 */
.mypage-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 5rem 0;
  color: var(--color-outline);
}

.mypage-empty .material-symbols-outlined {
  font-size: 3rem;
}
.mypage-empty p {
  font-size: 0.875rem;
}

/* 주문 목록 */
.mypage-orders {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.mypage-order {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
  background-color: var(--color-surface);
}

.mypage-order__header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
  background-color: var(--color-surface-container-low);
}

.mypage-order__date {
  font-size: 0.75rem;
  color: var(--color-outline);
}

.mypage-order__id {
  font-size: 0.75rem;
  font-weight: 600;
}

.mypage-order__status {
  margin-left: auto;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 0.25rem 0.75rem;
}

.status--shipping {
  background-color: #000;
  color: #fff;
}
.status--complete {
  border: 1px solid #ccc;
  color: #777;
}
.status--paid {
  border: 1px solid #000;
  color: #000;
}
.status--canceled {
  border: 1px solid #ccc;
  color: #ccc;
}

.mypage-order__item {
  display: flex;
  gap: 1rem;
  padding: 1.25rem 1.5rem;
  border-bottom: 0.5px solid rgba(0, 0, 0, 0.06);
}

.mypage-order__img-wrap {
  width: 64px;
  height: 72px;
  background-color: var(--color-surface-container-low);
  flex-shrink: 0;
  overflow: hidden;
}

.mypage-order__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(0.05);
}

.mypage-order__name {
  font-size: 0.875rem;
  font-weight: 500;
}
.mypage-order__meta {
  font-size: 0.75rem;
  color: var(--color-on-surface-variant);
  margin-top: 0.25rem;
}
.mypage-order__price {
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.mypage-order__footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
}

.mypage-order__total {
  font-size: 0.875rem;
  font-weight: 700;
}

.mypage-order__btn {
  font-size: 0.6875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--color-on-surface-variant);
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.mypage-order__btn:hover {
  color: var(--color-primary);
}

/* 회원 정보 */
.mypage-profile {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 480px;
}

.mypage-profile__group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.mypage-profile__label {
  font-size: 0.625rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--color-outline);
}

.mypage-profile__input {
  border: 0.5px solid rgba(0, 0, 0, 0.15);
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  font-family: var(--font-body);
  outline: none;
  transition: border-color 0.2s;
  background-color: #fff;
}

.mypage-profile__input:focus {
  border-color: var(--color-primary);
}
.mypage-profile__input:disabled {
  background-color: var(--color-surface-container-low);
  color: var(--color-outline);
}

.mypage-profile__actions {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
}

.mypage-btn {
  padding: 0.875rem 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  cursor: pointer;
  transition: opacity 0.2s;
  border: none;
}

.mypage-btn--primary {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}
.mypage-btn--outline {
  border: 1px solid var(--color-outline-variant);
  color: var(--color-on-surface);
  background: #fff;
}
.mypage-btn:hover {
  opacity: 0.8;
}
</style>
