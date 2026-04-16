<template>
  <Teleport to="body">
    <!-- 오버레이 -->
    <Transition name="sp-overlay">
      <div v-if="panelStore.isOpen" class="sp-overlay" @click="panelStore.close()"></div>
    </Transition>

    <!-- 패널 -->
    <Transition name="sp-slide">
      <aside v-if="panelStore.isOpen" class="sp">
        <!-- 헤더 -->
        <div class="sp-head">
          <div class="sp-tabs">
            <button class="sp-tab" :class="{ 'sp-tab--on': panelStore.activeTab === 'cart' }" @click="panelStore.activeTab = 'cart'">
              <span class="material-symbols-outlined">shopping_bag</span>
              장바구니 <em v-if="cartCount">{{ cartCount }}</em>
            </button>
            <button class="sp-tab" :class="{ 'sp-tab--on': panelStore.activeTab === 'wishlist' }" @click="panelStore.activeTab = 'wishlist'">
              <span class="material-symbols-outlined">favorite</span>
              찜 <em v-if="wishCount">{{ wishCount }}</em>
            </button>
            <button class="sp-tab" :class="{ 'sp-tab--on': panelStore.activeTab === 'mypage' }" @click="panelStore.activeTab = 'mypage'">
              <span class="material-symbols-outlined">person</span>
              MY
            </button>
          </div>
          <button class="sp-close" @click="panelStore.close()">
            <span class="material-symbols-outlined">close</span>
          </button>
        </div>

        <!-- ═══ 장바구니 탭 ═══ -->
        <div v-if="panelStore.activeTab === 'cart'" class="sp-body">
          <div v-if="cartItems.length === 0" class="sp-empty">
            <span class="material-symbols-outlined">shopping_bag</span>
            <p>장바구니가 비어있습니다</p>
          </div>
          <template v-else>
            <div class="sp-list">
              <div v-for="item in cartItems" :key="item.id" class="sp-item">
                <RouterLink :to="`/products/${item.productId}`" class="sp-item__img" @click="panelStore.close()">
                  <img :src="item.image" :alt="item.name" />
                </RouterLink>
                <div class="sp-item__info">
                  <p class="sp-item__name">{{ item.name }}</p>
                  <p class="sp-item__meta">{{ item.size }} · {{ item.quantity }}개</p>
                  <p class="sp-item__price">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
                </div>
                <div class="sp-item__actions">
                  <div class="sp-item__qty">
                    <button @click="cartStore.updateQuantity(item.id, item.quantity - 1)" :disabled="item.quantity <= 1">−</button>
                    <span>{{ item.quantity }}</span>
                    <button @click="cartStore.updateQuantity(item.id, item.quantity + 1)">+</button>
                  </div>
                  <button class="sp-item__del" @click="cartStore.removeItem(item.id)">
                    <span class="material-symbols-outlined">delete_outline</span>
                  </button>
                </div>
              </div>
            </div>
            <div class="sp-foot">
              <div class="sp-foot__rows">
                <div class="sp-foot__row">
                  <span>상품 금액</span>
                  <span>₩{{ cartTotal.toLocaleString() }}</span>
                </div>
                <div v-if="gradeDiscount > 0" class="sp-foot__row sp-foot__row--dc">
                  <span>{{ gradeName }} 등급 할인 ({{ gradeDiscount }}%)</span>
                  <span>-₩{{ gradeDiscountAmount.toLocaleString() }}</span>
                </div>
                <div class="sp-foot__row sp-foot__row--total">
                  <span>결제 예정 금액</span>
                  <span>₩{{ finalTotal.toLocaleString() }}</span>
                </div>
              </div>
              <RouterLink to="/payment" class="sp-foot__btn" @click="panelStore.close()">₩{{ finalTotal.toLocaleString() }} 결제하기</RouterLink>
            </div>
          </template>
        </div>

        <!-- ═══ 찜 탭 ═══ -->
        <div v-if="panelStore.activeTab === 'wishlist'" class="sp-body">
          <div v-if="wishItems.length === 0" class="sp-empty">
            <span class="material-symbols-outlined">favorite</span>
            <p>찜한 상품이 없습니다</p>
          </div>
          <div v-else class="sp-list">
            <div v-for="item in wishItems" :key="item.id" class="sp-item">
              <RouterLink :to="`/products/${item.id}`" class="sp-item__img" @click="panelStore.close()">
                <img :src="item.image" :alt="item.name" />
              </RouterLink>
              <div class="sp-item__info">
                <p class="sp-item__name">{{ item.name }}</p>
                <p class="sp-item__meta">{{ item.category }}</p>
                <p class="sp-item__price">₩{{ item.price?.toLocaleString() }}</p>
              </div>
              <button class="sp-item__del" @click="wishlistStore.remove(item.id)">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>
        </div>

        <!-- ═══ 마이페이지 탭 ═══ -->
        <div v-if="panelStore.activeTab === 'mypage'" class="sp-body">
          <div v-if="!isLoggedIn" class="sp-empty">
            <span class="material-symbols-outlined">person</span>
            <p>로그인이 필요합니다</p>
            <RouterLink to="/login" class="sp-empty__btn" @click="panelStore.close()">로그인</RouterLink>
          </div>
          <template v-else>
            <div class="sp-profile">
              <div class="sp-profile__avatar">
                <span class="material-symbols-outlined">person</span>
              </div>
              <div>
                <p class="sp-profile__name">{{ authStore.user?.name }}님</p>
                <p class="sp-profile__email">{{ authStore.user?.email }}</p>
                <span class="sp-profile__grade">{{ authStore.user?.grade || 'BRONZE' }}</span>
              </div>
            </div>
            <nav class="sp-menu">
              <RouterLink to="/mypage" class="sp-menu__item" @click="panelStore.close()">
                <span class="material-symbols-outlined">receipt_long</span>주문 내역
              </RouterLink>
              <RouterLink to="/mypage?tab=wishlist" class="sp-menu__item" @click="panelStore.close()">
                <span class="material-symbols-outlined">favorite</span>찜 목록
              </RouterLink>
              <RouterLink to="/mypage?tab=reviews" class="sp-menu__item" @click="panelStore.close()">
                <span class="material-symbols-outlined">rate_review</span>내 리뷰
              </RouterLink>
              <RouterLink to="/mypage?tab=qna" class="sp-menu__item" @click="panelStore.close()">
                <span class="material-symbols-outlined">help</span>내 문의
              </RouterLink>
              <RouterLink to="/mypage?tab=profile" class="sp-menu__item" @click="panelStore.close()">
                <span class="material-symbols-outlined">settings</span>회원 정보
              </RouterLink>
              <RouterLink v-if="authStore.user?.role === 'ROLE_ADMIN'" to="/admin" class="sp-menu__item sp-menu__item--admin" @click="panelStore.close()">
                <span class="material-symbols-outlined">admin_panel_settings</span>관리자 페이지
              </RouterLink>
              <button class="sp-menu__item sp-menu__item--logout" @click="doLogout">
                <span class="material-symbols-outlined">logout</span>로그아웃
              </button>
            </nav>
          </template>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { usePanelStore } from "@/stores/panelStore";
import { useCartStore } from "@/stores/cartStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import { useAuthStore } from "@/stores/authStore";

const panelStore = usePanelStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const authStore = useAuthStore();
const router = useRouter();

const cartItems = computed(() => cartStore.items);
const cartTotal = computed(() => cartStore.totalPrice);
const cartCount = computed(() => cartStore.totalCount);
const wishItems = computed(() => wishlistStore.items);
const wishCount = computed(() => wishlistStore.count);
const isLoggedIn = computed(() => authStore.isLoggedIn);

// 등급별 할인율
const GRADE_DISCOUNT = { BRONZE: 0, SILVER: 5, GOLD: 8, VIP: 12 };
const userGrade = computed(() => (authStore.user?.grade || 'BRONZE').toUpperCase());
const gradeName = computed(() => ({ BRONZE: 'Bronze', SILVER: 'Silver', GOLD: 'Gold', VIP: 'VIP' }[userGrade.value] || 'Bronze'));
const gradeDiscount = computed(() => GRADE_DISCOUNT[userGrade.value] || 0);
const gradeDiscountAmount = computed(() => Math.round(cartTotal.value * gradeDiscount.value / 100));
const finalTotal = computed(() => cartTotal.value - gradeDiscountAmount.value);

function doLogout() {
  authStore.logout();
  panelStore.close();
  router.push("/");
}
</script>

<style>
/* ═══ 슬라이드 패널 ═══ */
.sp-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.35);
  z-index: 900; backdrop-filter: blur(2px);
}
.sp {
  position: fixed; top: 0; right: 0; bottom: 0;
  width: 33.333%; min-width: 360px; max-width: 480px;
  background: #fff; z-index: 901;
  display: flex; flex-direction: column;
  box-shadow: -4px 0 24px rgba(0,0,0,0.08);
}
@media (max-width: 640px) { .sp { width: 100%; max-width: 100%; min-width: 0; } }

/* 트랜지션 */
.sp-overlay-enter-active, .sp-overlay-leave-active { transition: opacity 0.3s; }
.sp-overlay-enter-from, .sp-overlay-leave-to { opacity: 0; }
.sp-slide-enter-active, .sp-slide-leave-active { transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1); }
.sp-slide-enter-from, .sp-slide-leave-to { transform: translateX(100%); }

/* 헤더 */
.sp-head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0 1.25rem; border-bottom: 1px solid #eee; flex-shrink: 0;
}
.sp-tabs { display: flex; gap: 0; }
.sp-tab {
  display: flex; align-items: center; gap: 0.375rem;
  padding: 1rem 1rem; font-size: 0.625rem; font-weight: 700;
  letter-spacing: 0.1em; color: #bbb; cursor: pointer;
  border-bottom: 2px solid transparent; transition: all 0.2s;
  background: none; border-top: none; border-left: none; border-right: none;
  position: relative;
}
.sp-tab .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }
.sp-tab em {
  font-style: normal; font-size: 0.5rem; font-weight: 800;
  background: #FF2D2D; color: #fff; padding: 0 0.25rem;
  border-radius: 999px; min-width: 0.875rem; text-align: center;
}
.sp-tab:hover { color: #111; }
.sp-tab--on { color: #111; border-bottom-color: #111; }
.sp-close {
  background: none; border: none; cursor: pointer; color: #999;
  display: flex; align-items: center; transition: color 0.2s;
}
.sp-close:hover { color: #111; }
.sp-close .material-symbols-outlined { font-size: 1.25rem; font-variation-settings: "wght" 300; }

/* 본문 */
.sp-body { flex: 1; overflow-y: auto; display: flex; flex-direction: column; }

/* 빈 상태 */
.sp-empty {
  flex: 1; display: flex; flex-direction: column;
  align-items: center; justify-content: center; gap: 0.75rem; color: #ccc;
}
.sp-empty .material-symbols-outlined { font-size: 2.5rem; font-variation-settings: "wght" 200; }
.sp-empty p { font-size: 0.8125rem; }
.sp-empty__btn {
  margin-top: 0.5rem; padding: 0.625rem 2rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; text-decoration: none;
  border-radius: 0.375rem;
}

/* 리스트 */
.sp-list { flex: 1; padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0; }
.sp-item {
  display: flex; align-items: center; gap: 0.875rem;
  padding: 0.875rem 0; border-bottom: 1px solid #f0f0f0;
}
.sp-item__img {
  width: 56px; height: 68px; flex-shrink: 0; overflow: hidden;
  background: #f3f1ec; border-radius: 0.25rem;
}
.sp-item__img img { width: 100%; height: 100%; object-fit: cover; }
.sp-item__info { flex: 1; min-width: 0; }
.sp-item__name {
  font-size: 0.8125rem; font-weight: 600; color: #111;
  white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.sp-item__meta { font-size: 0.6875rem; color: #999; margin-top: 0.125rem; }
.sp-item__price { font-size: 0.8125rem; font-weight: 800; margin-top: 0.25rem; }
.sp-item__actions { display: flex; flex-direction: column; align-items: flex-end; gap: 0.375rem; }
.sp-item__qty {
  display: inline-flex; border: 1px solid #e8e8e8; border-radius: 0.25rem;
}
.sp-item__qty button {
  width: 1.5rem; height: 1.5rem; display: flex; align-items: center;
  justify-content: center; background: #fff; font-size: 0.75rem;
  cursor: pointer; border-radius: 0.25rem;
}
.sp-item__qty button:disabled { color: #ddd; cursor: not-allowed; }
.sp-item__qty span {
  min-width: 1.5rem; display: flex; align-items: center; justify-content: center;
  font-size: 0.6875rem; font-weight: 600;
  border-left: 1px solid #e8e8e8; border-right: 1px solid #e8e8e8;
}
.sp-item__del {
  background: none; border: none; cursor: pointer; color: #ccc; display: flex;
  transition: color 0.2s;
}
.sp-item__del:hover { color: #e53e3e; }
.sp-item__del .material-symbols-outlined { font-size: 1rem; font-variation-settings: "wght" 300; }

/* 푸터 (장바구니) */
.sp-foot {
  padding: 1.25rem; border-top: 1px solid #eee; flex-shrink: 0;
}
.sp-foot__rows { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1rem; }
.sp-foot__row { display: flex; justify-content: space-between; font-size: 0.8125rem; color: #555; }
.sp-foot__row--dc { color: #FF2D2D; font-weight: 600; }
.sp-foot__row--total { font-size: 1rem; font-weight: 900; color: #111; padding-top: 0.5rem; border-top: 1px solid #eee; }
.sp-foot__total {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 1rem; font-size: 1rem; font-weight: 900;
}
.sp-foot__btn {
  display: block; width: 100%; padding: 0.875rem; text-align: center;
  background: #111; color: #fff; font-size: 0.8125rem; font-weight: 700;
  border-radius: 0.375rem; text-decoration: none; transition: background 0.2s;
}
.sp-foot__btn:hover { background: #333; }

/* 프로필 */
.sp-profile {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.5rem 1.25rem; border-bottom: 1px solid #eee;
}
.sp-profile__avatar {
  width: 3rem; height: 3rem; border-radius: 50%; background: #f3f1ec;
  display: flex; align-items: center; justify-content: center;
}
.sp-profile__avatar .material-symbols-outlined { font-size: 1.5rem; color: #bbb; font-variation-settings: "wght" 200; }
.sp-profile__name { font-size: 1rem; font-weight: 800; }
.sp-profile__email { font-size: 0.6875rem; color: #999; margin-top: 0.125rem; }
.sp-profile__grade {
  display: inline-block; margin-top: 0.375rem;
  font-size: 0.5rem; font-weight: 800; letter-spacing: 0.15em;
  padding: 0.2rem 0.5rem; background: #111; color: #fff;
}

/* 메뉴 */
.sp-menu { padding: 0.5rem 0; }
.sp-menu__item {
  display: flex; align-items: center; gap: 0.75rem;
  padding: 0.875rem 1.25rem; font-size: 0.8125rem; font-weight: 600;
  color: #333; text-decoration: none; transition: background 0.2s;
  cursor: pointer; background: none; border: none; width: 100%; text-align: left;
}
.sp-menu__item:hover { background: #fafaf8; }
.sp-menu__item .material-symbols-outlined { font-size: 1.125rem; color: #999; font-variation-settings: "wght" 300; }
.sp-menu__item--admin { color: #c9a86b; border-top: 1px solid #f0f0f0; margin-top: 0.5rem; padding-top: 1rem; }
.sp-menu__item--admin .material-symbols-outlined { color: #c9a86b; }
.sp-menu__item--logout { color: #e53e3e; }
.sp-menu__item--logout .material-symbols-outlined { color: #e53e3e; }
</style>
