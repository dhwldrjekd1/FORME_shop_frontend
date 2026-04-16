<template>
  <Forme32Layout>
    <div class="mp">
      <!-- ═══ 프로필 헤더 ═══ -->
      <div class="mp-profile">
        <div class="mp-profile__avatar">
          <span class="material-symbols-outlined">person</span>
        </div>
        <div class="mp-profile__info">
          <div class="mp-profile__grade" :class="`mp-profile__grade--${gradeKey}`">
            <span class="material-symbols-outlined">workspace_premium</span>
            {{ gradeLabel }} Member
          </div>
          <h1 class="mp-profile__name">{{ authStore.userName || profile.name }}님</h1>
          <p class="mp-profile__email">{{ authStore.user?.email || profile.email }}</p>
        </div>
        <button class="mp-profile__logout" @click="logout">로그아웃</button>
      </div>

      <!-- ═══ 탭 ═══ -->
      <div class="mp-tabs">
        <button
          v-for="tab in tabs" :key="tab.key"
          class="mp-tabs__btn"
          :class="{ 'mp-tabs__btn--on': activeTab === tab.key }"
          @click="activeTab = tab.key"
        >
          <span class="material-symbols-outlined">{{ tab.icon }}</span>
          {{ tab.label }}
        </button>
      </div>

      <!-- ═══ 주문 내역 ═══ -->
      <section v-if="activeTab === 'orders'" class="mp-sec">
        <div v-if="orders.length === 0" class="mp-empty">
          <span class="material-symbols-outlined">shopping_bag</span>
          <p>주문 내역이 없습니다</p>
          <RouterLink to="/products" class="mp-empty__btn">쇼핑하러 가기</RouterLink>
        </div>
        <div v-else class="mp-orders">
          <div v-for="order in orders" :key="order.id" class="mp-order">
            <div class="mp-order__head">
              <div>
                <span class="mp-order__id">{{ order.id }}</span>
                <span class="mp-order__date">{{ order.date }}</span>
              </div>
              <span class="mp-order__status" :class="getStatusClass(order.status)">{{ order.status }}</span>
            </div>
            <RouterLink v-for="item in order.items" :key="item.name" :to="`/products/${item.productId}`" class="mp-order__item">
              <div class="mp-order__img"><img :src="item.image" :alt="item.name" /></div>
              <div class="mp-order__detail">
                <p class="mp-order__name">{{ item.name }}</p>
                <p class="mp-order__meta">Size: {{ item.size }} · {{ item.quantity }}개</p>
              </div>
              <p class="mp-order__price">₩{{ (item.price * item.quantity).toLocaleString() }}</p>
            </RouterLink>
            <div class="mp-order__foot">
              <span>총 ₩{{ order.totalAmount.toLocaleString() }}</span>
              <button
                v-if="order.rawStatus === 'PENDING' || order.rawStatus === 'PAID'"
                class="mp-order__cancel"
                @click="cancelOrder(order.rawId)"
              >주문 취소</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ 찜 목록 ═══ -->
      <section v-if="activeTab === 'wishlist'" class="mp-sec">
        <div v-if="wishlistStore.items.length === 0" class="mp-empty">
          <span class="material-symbols-outlined">favorite</span>
          <p>찜한 상품이 없습니다</p>
        </div>
        <div v-else class="mp-wish-grid">
          <RouterLink
            v-for="item in wishlistStore.items" :key="item.id"
            :to="`/products/${item.id}`"
            class="mp-wish"
          >
            <div class="mp-wish__img">
              <img :src="item.image" :alt="item.name" />
              <button class="mp-wish__remove" @click.prevent="wishlistStore.remove(item.id)">
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>
            <p class="mp-wish__cat">{{ item.category }}</p>
            <p class="mp-wish__name">{{ item.name }}</p>
            <p class="mp-wish__price">₩{{ item.price?.toLocaleString() }}</p>
          </RouterLink>
        </div>
      </section>

      <!-- ═══ 내 리뷰 ═══ -->
      <section v-if="activeTab === 'reviews'" class="mp-sec">
        <div v-if="myReviews.length === 0" class="mp-empty">
          <span class="material-symbols-outlined">rate_review</span>
          <p>작성한 리뷰가 없습니다</p>
        </div>
        <div v-else class="mp-reviews">
          <div v-for="r in myReviews" :key="r.id" class="mp-review">
            <div class="mp-review__head">
              <RouterLink :to="`/products/${r.productId}`" class="mp-review__product">{{ r.productName }}</RouterLink>
              <span class="mp-review__date">{{ r.createdAt?.slice(0, 10).replace(/-/g, '.') }}</span>
            </div>
            <div class="mp-review__stars">
              <span v-for="s in 5" :key="s" class="material-symbols-outlined" :style="{ fontVariationSettings: s <= r.rating ? '\'FILL\' 1' : '\'FILL\' 0', color: s <= r.rating ? '#111' : '#ddd', fontSize: '0.875rem' }">star</span>
            </div>
            <p v-if="editingReviewId !== r.id" class="mp-review__content">{{ r.content }}</p>
            <!-- 수정 모드 -->
            <div v-if="editingReviewId === r.id" class="mp-review__edit">
              <div class="mp-review__edit-stars">
                <span v-for="s in 5" :key="s" class="material-symbols-outlined" @click="editReviewRating = s"
                  :style="{ fontVariationSettings: s <= editReviewRating ? '\'FILL\' 1' : '\'FILL\' 0', color: s <= editReviewRating ? '#111' : '#ddd', cursor: 'pointer', fontSize: '1rem' }">star</span>
              </div>
              <textarea v-model="editReviewContent" rows="3"></textarea>
              <div class="mp-review__edit-actions">
                <button class="mp-btn mp-btn--ghost mp-btn--sm" @click="editingReviewId = null">취소</button>
                <button class="mp-btn mp-btn--fill mp-btn--sm" @click="updateReview(r.id)">저장</button>
              </div>
            </div>
            <div v-if="r.reply" class="mp-review__reply">
              <span class="mp-review__reply-badge">FORME</span>
              <p>{{ r.reply }}</p>
            </div>
            <div v-if="editingReviewId !== r.id" class="mp-review__actions">
              <button class="mp-review__act" @click="startEditReview(r)">수정</button>
              <button class="mp-review__act mp-review__act--del" @click="deleteReview(r.id)">삭제</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ 내 문의 ═══ -->
      <section v-if="activeTab === 'qna'" class="mp-sec">
        <div v-if="myQna.length === 0" class="mp-empty">
          <span class="material-symbols-outlined">help</span>
          <p>작성한 문의가 없습니다</p>
        </div>
        <div v-else class="mp-qna-list">
          <div v-for="q in myQna" :key="q.id" class="mp-qna">
            <div class="mp-qna__head">
              <span class="mp-qna__title">{{ q.title }}</span>
              <span class="mp-qna__badge" :class="q.isAnswered ? 'mp-qna__badge--done' : ''">{{ q.isAnswered ? '답변완료' : '대기중' }}</span>
            </div>
            <p v-if="editingQnaId !== q.id" class="mp-qna__content">{{ q.content }}</p>
            <!-- 수정 모드 -->
            <div v-if="editingQnaId === q.id" class="mp-qna__edit">
              <input v-model="editQnaTitle" type="text" placeholder="제목" />
              <textarea v-model="editQnaContent" rows="3"></textarea>
              <div class="mp-qna__edit-actions">
                <button class="mp-btn mp-btn--ghost mp-btn--sm" @click="editingQnaId = null">취소</button>
                <button class="mp-btn mp-btn--fill mp-btn--sm" @click="updateQna(q.id)">저장</button>
              </div>
            </div>
            <div v-if="q.answer" class="mp-qna__answer">
              <span class="mp-qna__answer-badge">FORME</span>
              <p>{{ q.answer }}</p>
            </div>
            <div class="mp-qna__meta">
              <span>{{ q.createdAt?.slice(0, 10).replace(/-/g, '.') }}</span>
              <span v-if="q.productName">{{ q.productName }}</span>
            </div>
            <div v-if="editingQnaId !== q.id && !q.isAnswered" class="mp-qna__actions">
              <button class="mp-review__act" @click="startEditQna(q)">수정</button>
              <button class="mp-review__act mp-review__act--del" @click="deleteQna(q.id)">삭제</button>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══ 회원 정보 ═══ -->
      <section v-if="activeTab === 'profile'" class="mp-sec">
        <div class="mp-form">
          <div class="mp-form__field">
            <label>이름</label>
            <input v-model="profile.name" type="text" :disabled="!isEditing" />
          </div>
          <div class="mp-form__field">
            <label>이메일</label>
            <input v-model="profile.email" type="email" :disabled="!isEditing" />
          </div>
          <div class="mp-form__field">
            <label>연락처</label>
            <input v-model="profile.phone" type="tel" :disabled="!isEditing" placeholder="010-0000-0000" />
          </div>
          <div class="mp-form__row">
            <div class="mp-form__field">
              <label>키 (cm)</label>
              <input v-model.number="profile.height" type="number" :disabled="!isEditing" placeholder="170" />
            </div>
            <div class="mp-form__field">
              <label>몸무게 (kg)</label>
              <input v-model.number="profile.weight" type="number" :disabled="!isEditing" placeholder="70" />
            </div>
          </div>
          <div class="mp-form__field">
            <label>선호 핏</label>
            <div class="mp-form__fit-group">
              <button v-for="f in fitOptions" :key="f.value" type="button"
                class="mp-form__fit-btn"
                :class="{ 'mp-form__fit-btn--on': profile.fit === f.value }"
                :disabled="!isEditing"
                @click="isEditing && (profile.fit = f.value)"
              >{{ f.label }}</button>
            </div>
          </div>
          <div class="mp-form__field">
            <label>회원 등급</label>
            <div class="mp-form__grade">
              <span class="mp-form__grade-badge" :class="`mp-form__grade-badge--${gradeKey}`">{{ gradeLabel }}</span>
              <span class="mp-form__grade-desc">{{ gradeDesc }}</span>
            </div>
          </div>
          <div class="mp-form__actions">
            <button v-if="!isEditing" class="mp-btn mp-btn--fill" @click="isEditing = true">정보 수정</button>
            <template v-else>
              <button class="mp-btn mp-btn--ghost" @click="isEditing = false">취소</button>
              <button class="mp-btn mp-btn--fill" @click="saveProfile">저장</button>
            </template>
          </div>
          <div class="mp-form__withdraw">
            <button class="mp-withdraw" @click="withdrawMember">회원 탈퇴</button>
          </div>
        </div>
      </section>
    </div>
  </Forme32Layout>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useAuthStore } from "@/stores/authStore";
import { useWishlistStore } from "@/stores/wishlistStore";
import Forme32Layout from "@/layouts/Forme32Layout.vue";
import api from "@/api";

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

const GRADE_INFO = {
  BRONZE: { label: "Bronze", desc: "기본 회원 · 누적 50만원 미만 · 할인 없음" },
  SILVER: { label: "Silver", desc: "실버 회원 · 누적 50만원 이상 · 5% 할인" },
  GOLD:   { label: "Gold",   desc: "골드 회원 · 누적 100만원 이상 · 8% 할인" },
  VIP:    { label: "VIP",    desc: "VIP 회원 · 누적 150만원 이상 · 12% 할인" },
};
const gradeKey = computed(() => { const g = (authStore.user?.grade || "BRONZE").toUpperCase(); return GRADE_INFO[g] ? g.toLowerCase() : "bronze"; });
const gradeLabel = computed(() => GRADE_INFO[(authStore.user?.grade || "BRONZE").toUpperCase()]?.label ?? "Bronze");
const gradeDesc = computed(() => GRADE_INFO[(authStore.user?.grade || "BRONZE").toUpperCase()]?.desc ?? GRADE_INFO.BRONZE.desc);

const tabs = [
  { key: "orders", label: "주문 내역", icon: "receipt_long" },
  { key: "wishlist", label: "찜 목록", icon: "favorite" },
  { key: "reviews", label: "내 리뷰", icon: "rate_review" },
  { key: "qna", label: "내 문의", icon: "help" },
  { key: "profile", label: "회원 정보", icon: "settings" },
];
const activeTab = ref(route.query.tab ?? "orders");

const isEditing = ref(false);
const profile = ref({
  name: authStore.user?.name ?? "",
  email: authStore.user?.email ?? "",
  phone: authStore.user?.phone ?? "",
  height: authStore.user?.height ?? null,
  weight: authStore.user?.weight ?? null,
  fit: authStore.user?.fit ?? "standard",
});

const fitOptions = [
  { value: 'slim', label: '슬림' },
  { value: 'standard', label: '스탠다드' },
  { value: 'wide', label: '와이드' },
];
async function saveProfile() {
  const memberId = authStore.user?.id;
  if (!memberId) { alert('로그인 정보가 없습니다.'); return; }
  try {
    await api.put(`/members/${memberId}`, {
      name: profile.value.name,
      phone: profile.value.phone,
      height: profile.value.height,
      weight: profile.value.weight,
      fit: profile.value.fit,
    });
    // localStorage 유저 정보도 갱신
    const user = { ...authStore.user, name: profile.value.name, phone: profile.value.phone, height: profile.value.height, weight: profile.value.weight, fit: profile.value.fit };
    authStore.user.name = user.name;
    authStore.user.phone = user.phone;
    authStore.user.height = user.height;
    authStore.user.weight = user.weight;
    authStore.user.fit = user.fit;
    localStorage.setItem('user', JSON.stringify(user));
    isEditing.value = false;
    alert('✅ 회원 정보가 저장되었습니다.');
  } catch (e) {
    alert(e.data?.message || e.message || '저장에 실패했습니다.');
  }
}

const orders = ref([]);
const myReviews = ref([]);
const myQna = ref([]);
const editingReviewId = ref(null);
const editReviewContent = ref('');
const editReviewRating = ref(5);
const editingQnaId = ref(null);
const editQnaTitle = ref('');
const editQnaContent = ref('');

// DB에서 데이터 로드
onMounted(async () => {
  const memberId = authStore.user?.id;
  if (memberId) {
    try {
      const data = await api.get(`/members/${memberId}/orders`);
      if (Array.isArray(data)) {
        orders.value = data.map(o => ({
          id: '#' + o.id,
          rawId: o.id,
          rawStatus: o.status,
          date: o.createdAt?.slice(0, 10).replace(/-/g, '.') || '',
          status: { PENDING: '주문완료', PAID: '결제완료', PREPARING: '준비중', SHIPPED: '배송중', DELIVERED: '배송완료', CANCELLED: '취소' }[o.status] || o.status,
          totalAmount: o.totalPrice || 0,
          items: (o.orderItems || []).map(i => ({
            productId: i.productId,
            name: i.productName || '상품',
            size: i.size || '-',
            quantity: i.quantity || 1,
            price: i.price || 0,
            image: i.productImageUrl || '',
          })),
        }));
      }
    } catch {}
    loadMyReviews();
    loadMyQna();
  }
});

// 내 리뷰
async function loadMyReviews() {
  const memberId = authStore.user?.id;
  if (!memberId) return;
  try { myReviews.value = await api.get(`/members/${memberId}/reviews`) || []; } catch { myReviews.value = []; }
}
function startEditReview(r) {
  editingReviewId.value = r.id;
  editReviewContent.value = r.content;
  editReviewRating.value = r.rating;
}
async function updateReview(id) {
  if (!editReviewContent.value.trim()) return;
  try {
    await api.put(`/reviews/${id}`, { rating: editReviewRating.value, content: editReviewContent.value.trim() });
    editingReviewId.value = null;
    await loadMyReviews();
  } catch (e) { alert(e?.message || '수정 실패'); }
}
async function deleteReview(id) {
  if (!confirm('리뷰를 삭제하시겠습니까?')) return;
  try { await api.delete(`/reviews/${id}`); await loadMyReviews(); }
  catch (e) { alert(e?.message || '삭제 실패'); }
}

// 내 문의
async function loadMyQna() {
  const memberId = authStore.user?.id;
  if (!memberId) return;
  try { myQna.value = await api.get(`/members/${memberId}/qna`) || []; } catch { myQna.value = []; }
}
function startEditQna(q) {
  editingQnaId.value = q.id;
  editQnaTitle.value = q.title;
  editQnaContent.value = q.content;
}
async function updateQna(id) {
  if (!editQnaTitle.value.trim() || !editQnaContent.value.trim()) return;
  try {
    await api.put(`/qna/${id}`, { title: editQnaTitle.value.trim(), content: editQnaContent.value.trim() });
    editingQnaId.value = null;
    await loadMyQna();
  } catch (e) { alert(e?.message || '수정 실패'); }
}
async function deleteQna(id) {
  if (!confirm('문의를 삭제하시겠습니까?')) return;
  try { await api.delete(`/qna/${id}`); await loadMyQna(); }
  catch (e) { alert(e?.message || '삭제 실패'); }
}

// 회원 탈퇴
async function withdrawMember() {
  if (!confirm('정말 탈퇴하시겠습니까?\n탈퇴 후 복구할 수 없습니다.')) return;
  if (!confirm('모든 주문 내역, 리뷰, 문의가 삭제됩니다.\n정말 진행하시겠습니까?')) return;
  const memberId = authStore.user?.id;
  if (!memberId) return;
  try {
    await api.delete(`/members/${memberId}`);
    authStore.logout();
    alert('회원 탈퇴가 완료되었습니다.');
    router.push('/');
  } catch (e) { alert(e?.message || '탈퇴 실패'); }
}

async function cancelOrder(orderId) {
  if (!confirm('주문을 취소하시겠습니까?')) return;
  try {
    await api.patch(`/orders/${orderId}/cancel`);
    const o = orders.value.find(x => x.rawId === orderId);
    if (o) { o.status = '취소'; o.rawStatus = 'CANCELLED'; }
    alert('주문이 취소되었습니다.');
  } catch (e) { alert(e?.data?.message || e?.message || '취소 실패'); }
}

function getStatusClass(s) {
  return { 배송중: 'st--ship', 배송완료: 'st--done', 주문완료: 'st--paid', 취소: 'st--cancel' }[s] ?? '';
}

function logout() { authStore.logout(); router.push("/"); }
</script>

<style scoped>
.mp { max-width: 960px; margin: 0 auto; padding: 3rem 2rem 6rem; }

/* 프로필 헤더 */
.mp-profile {
  display: flex; align-items: center; gap: 1.25rem; flex-wrap: wrap;
  padding-bottom: 2.5rem; margin-bottom: 2rem; border-bottom: 1px solid #eee;
}
.mp-profile__avatar {
  width: 4rem; height: 4rem; border-radius: 50%; background: #f3f1ec;
  display: flex; align-items: center; justify-content: center;
}
.mp-profile__avatar .material-symbols-outlined { font-size: 1.75rem; color: #bbb; font-variation-settings: "wght" 200; }
.mp-profile__info { flex: 1; }
.mp-profile__grade {
  display: inline-flex; align-items: center; gap: 0.375rem;
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase;
  padding: 0.25rem 0.75rem; border-radius: 0.25rem; margin-bottom: 0.5rem;
}
.mp-profile__grade .material-symbols-outlined { font-size: 0.875rem; font-variation-settings: "FILL" 1, "wght" 300; }
.mp-profile__grade--bronze { background: rgba(181,101,29,0.08); color: #B5651D; }
.mp-profile__grade--silver { background: rgba(138,138,138,0.1); color: #5C5C5C; }
.mp-profile__grade--gold { background: rgba(201,168,107,0.12); color: #8B7437; }
.mp-profile__grade--vip { background: #1A1A1A; color: #fff; }
.mp-profile__name { font-size: 1.5rem; font-weight: 900; letter-spacing: -0.02em; }
.mp-profile__email { font-size: 0.8125rem; color: #999; margin-top: 0.125rem; }
.mp-profile__logout {
  font-size: 0.6875rem; color: #bbb; background: none; border: none;
  cursor: pointer; transition: color 0.2s; letter-spacing: 0.1em;
}
.mp-profile__logout:hover { color: #e53e3e; }

/* 탭 */
.mp-tabs {
  display: flex; gap: 0; border-bottom: 1px solid #eee; margin-bottom: 2.5rem;
}
.mp-tabs__btn {
  display: flex; align-items: center; gap: 0.5rem;
  padding: 1rem 1.5rem; font-size: 0.75rem; font-weight: 600;
  color: #999; cursor: pointer; border-bottom: 2px solid transparent;
  transition: all 0.2s; background: none; border-top: none; border-left: none; border-right: none;
}
.mp-tabs__btn .material-symbols-outlined { font-size: 1.125rem; font-variation-settings: "wght" 300; }
.mp-tabs__btn:hover { color: #111; }
.mp-tabs__btn--on { color: #111; border-bottom-color: #111; }

/* 빈 상태 */
.mp-empty {
  display: flex; flex-direction: column; align-items: center; gap: 0.75rem;
  padding: 5rem 0; color: #bbb; text-align: center;
}
.mp-empty .material-symbols-outlined { font-size: 3rem; font-variation-settings: "wght" 200; }
.mp-empty__btn {
  margin-top: 0.5rem; padding: 0.75rem 2rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; border-radius: 0.375rem; text-decoration: none;
}

/* 주문 */
.mp-orders { display: flex; flex-direction: column; gap: 1.5rem; }
.mp-order { border: 1px solid #eee; border-radius: 0.5rem; overflow: hidden; }
.mp-order__head {
  display: flex; justify-content: space-between; align-items: center;
  padding: 1rem 1.25rem; background: #fafaf8;
}
.mp-order__id { font-size: 0.8125rem; font-weight: 700; margin-right: 0.75rem; }
.mp-order__date { font-size: 0.6875rem; color: #999; }
.mp-order__status {
  font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em;
  padding: 0.25rem 0.75rem; border-radius: 0.25rem;
}
.st--ship { background: #111; color: #fff; }
.st--done { background: #f0f0f0; color: #666; }
.st--paid { border: 1px solid #111; color: #111; }
.st--cancel { background: #f0f0f0; color: #bbb; }

.mp-order__item {
  display: flex; align-items: center; gap: 1rem;
  padding: 1rem 1.25rem; border-top: 1px solid #f0f0f0;
  text-decoration: none; color: inherit; transition: background 0.2s; cursor: pointer;
}
.mp-order__img { width: 60px; height: 72px; flex-shrink: 0; overflow: hidden; background: #f3f1ec; border-radius: 0.25rem; }
.mp-order__img img { width: 100%; height: 100%; object-fit: cover; }
.mp-order__detail { flex: 1; }
.mp-order__name { font-size: 0.8125rem; font-weight: 600; color: #111; }
.mp-order__meta { font-size: 0.6875rem; color: #999; margin-top: 0.25rem; }
.mp-order__price { font-size: 0.8125rem; font-weight: 700; white-space: nowrap; }
.mp-order__foot {
  display: flex; justify-content: space-between; align-items: center; padding: 0.875rem 1.25rem;
  border-top: 1px solid #f0f0f0; font-size: 0.875rem; font-weight: 800;
}
.mp-order__cancel {
  font-size: 0.6875rem; color: #999; background: none; border: 1px solid #ddd;
  padding: 0.375rem 1rem; border-radius: 0.25rem; cursor: pointer; transition: all 0.2s;
}
.mp-order__cancel:hover { border-color: #e53e3e; color: #e53e3e; }

/* 찜 */
.mp-wish-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 2rem 1.5rem; }
.mp-wish { display: block; text-decoration: none; color: inherit; }
.mp-wish__img { position: relative; aspect-ratio: 3/4; overflow: hidden; background: #f3f1ec; margin-bottom: 0.75rem; border-radius: 0.25rem; }
.mp-wish__img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
.mp-wish:hover .mp-wish__img img { transform: scale(1.04); }
.mp-wish__remove {
  position: absolute; top: 0.5rem; right: 0.5rem;
  width: 1.75rem; height: 1.75rem; border-radius: 50%;
  background: rgba(255,255,255,0.9); border: none;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; opacity: 0; transition: opacity 0.2s; color: #999;
}
.mp-wish:hover .mp-wish__remove { opacity: 1; }
.mp-wish__remove:hover { color: #e53e3e; }
.mp-wish__remove .material-symbols-outlined { font-size: 0.875rem; }
.mp-wish__cat { font-size: 0.5rem; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase; color: #999; margin-bottom: 0.25rem; }
.mp-wish__name { font-size: 0.8125rem; font-weight: 600; color: #111; margin-bottom: 0.25rem; }
.mp-wish__price { font-size: 0.8125rem; font-weight: 800; }

/* 회원 정보 */
.mp-form { max-width: 480px; display: flex; flex-direction: column; gap: 1.5rem; }
.mp-form__field { display: flex; flex-direction: column; gap: 0.375rem; }
.mp-form__field label { font-size: 0.6875rem; font-weight: 600; color: #999; letter-spacing: 0.05em; }
.mp-form__field input {
  padding: 0.875rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.875rem; color: #111; outline: none; transition: border-color 0.2s;
}
.mp-form__field input:focus { border-color: #111; }
.mp-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.mp-form__fit-group { display: flex; gap: 0.5rem; }
.mp-form__fit-btn {
  flex: 1; padding: 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.75rem; font-weight: 600; color: #999; cursor: pointer; background: #fff; transition: all 0.2s;
}
.mp-form__fit-btn:hover:not(:disabled) { border-color: #111; color: #111; }
.mp-form__fit-btn--on { background: #111; border-color: #111; color: #fff; }
.mp-form__fit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
.mp-form__field input:disabled { background: #fafaf8; color: #999; cursor: not-allowed; }
.mp-form__grade { display: flex; align-items: center; gap: 0.75rem; padding: 0.875rem 0; }
.mp-form__grade-badge {
  padding: 0.375rem 0.875rem; font-size: 0.625rem; font-weight: 700;
  letter-spacing: 0.15em; text-transform: uppercase; border-radius: 0.25rem;
}
.mp-form__grade-badge--bronze { background: rgba(181,101,29,0.08); color: #B5651D; }
.mp-form__grade-badge--silver { background: rgba(138,138,138,0.1); color: #5C5C5C; }
.mp-form__grade-badge--gold { background: rgba(201,168,107,0.12); color: #8B7437; }
.mp-form__grade-badge--vip { background: #1A1A1A; color: #fff; }
.mp-form__grade-desc { font-size: 0.75rem; color: #999; }
.mp-form__actions { display: flex; gap: 0.625rem; margin-top: 1rem; }
.mp-btn {
  padding: 0.875rem 2rem; font-size: 0.8125rem; font-weight: 700;
  border-radius: 0.375rem; cursor: pointer; transition: all 0.2s;
}
.mp-btn--fill { background: #111; color: #fff; }
.mp-btn--fill:hover { background: #333; }
.mp-btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.mp-btn--ghost:hover { border-color: #111; color: #111; }
.mp-btn--sm { padding: 0.5rem 1rem; font-size: 0.6875rem; }

/* 내 리뷰 */
.mp-reviews { display: flex; flex-direction: column; gap: 1rem; }
.mp-review { border: 1px solid #eee; border-radius: 0.5rem; padding: 1.25rem; }
.mp-review__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.mp-review__product { font-size: 0.8125rem; font-weight: 700; color: #111; text-decoration: none; }
.mp-review__product:hover { text-decoration: underline; }
.mp-review__date { font-size: 0.6875rem; color: #bbb; }
.mp-review__stars { margin-bottom: 0.5rem; }
.mp-review__content { font-size: 0.8125rem; color: #333; line-height: 1.6; }
.mp-review__reply { margin-top: 0.75rem; padding: 0.75rem 1rem; background: #fafaf8; border-radius: 0.375rem; }
.mp-review__reply-badge { display: inline-block; font-size: 0.5rem; font-weight: 800; letter-spacing: 0.15em; background: #111; color: #fff; padding: 0.125rem 0.5rem; border-radius: 0.25rem; margin-bottom: 0.375rem; }
.mp-review__reply p { font-size: 0.75rem; color: #555; }
.mp-review__actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
.mp-review__act { font-size: 0.625rem; color: #999; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.25rem 0.75rem; border-radius: 0.25rem; transition: all 0.2s; }
.mp-review__act:hover { border-color: #111; color: #111; }
.mp-review__act--del:hover { border-color: #e53e3e; color: #e53e3e; }
.mp-review__edit { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
.mp-review__edit-stars { margin-bottom: 0.25rem; }
.mp-review__edit textarea { width: 100%; padding: 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; resize: vertical; }
.mp-review__edit textarea:focus { border-color: #111; }
.mp-review__edit-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* 내 문의 */
.mp-qna-list { display: flex; flex-direction: column; gap: 1rem; }
.mp-qna { border: 1px solid #eee; border-radius: 0.5rem; padding: 1.25rem; }
.mp-qna__head { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; }
.mp-qna__title { font-size: 0.875rem; font-weight: 700; color: #111; }
.mp-qna__badge { display: inline-block; padding: 0.25rem 0.625rem; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; border-radius: 0.25rem; border: 1.5px solid #ddd; color: #999; }
.mp-qna__badge--done { background: #111; color: #fff; border-color: #111; }
.mp-qna__content { font-size: 0.8125rem; color: #333; line-height: 1.6; }
.mp-qna__answer { margin-top: 0.75rem; padding: 0.75rem 1rem; background: #fafaf8; border-radius: 0.375rem; }
.mp-qna__answer-badge { display: inline-block; font-size: 0.5rem; font-weight: 800; letter-spacing: 0.15em; background: #111; color: #fff; padding: 0.125rem 0.5rem; border-radius: 0.25rem; margin-bottom: 0.375rem; }
.mp-qna__answer p { font-size: 0.75rem; color: #555; }
.mp-qna__meta { display: flex; gap: 1rem; font-size: 0.6875rem; color: #bbb; margin-top: 0.5rem; }
.mp-qna__actions { display: flex; gap: 0.5rem; margin-top: 0.75rem; }
.mp-qna__edit { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem; }
.mp-qna__edit input, .mp-qna__edit textarea { width: 100%; padding: 0.625rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; }
.mp-qna__edit input:focus, .mp-qna__edit textarea:focus { border-color: #111; }
.mp-qna__edit-actions { display: flex; gap: 0.5rem; justify-content: flex-end; }

/* 회원 탈퇴 */
.mp-form__withdraw { margin-top: 3rem; padding-top: 2rem; border-top: 1px solid #eee; }
.mp-withdraw { font-size: 0.6875rem; color: #bbb; background: none; border: none; cursor: pointer; transition: color 0.2s; text-decoration: underline; }
.mp-withdraw:hover { color: #e53e3e; }
</style>
