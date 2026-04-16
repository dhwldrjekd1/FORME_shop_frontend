<template>
  <AdminLayout>
    <div class="ac">
      <div class="ac-head">
        <div>
          <p class="ac-code">[ 08 / CATEGORIES ]</p>
          <h1 class="ac-title">카테고리 관리</h1>
        </div>
        <button class="ac-add" @click="openCreate">
          <span class="material-symbols-outlined">add</span> 카테고리 추가
        </button>
      </div>

      <div class="ac-wrap">
        <table class="ac-table">
          <thead>
            <tr><th>ID</th><th>카테고리명</th><th>설명</th><th>정렬</th><th>상태</th><th>등록일</th><th></th></tr>
          </thead>
          <tbody>
            <tr v-for="c in categories" :key="c.id" :class="{ 'ac-inactive': !c.isActive }">
              <td class="t-id">{{ c.id }}</td>
              <td class="t-name">{{ c.name }}</td>
              <td class="t-desc">{{ c.description || '-' }}</td>
              <td class="t-order">{{ c.sortOrder }}</td>
              <td>
                <span class="ac-badge" :class="c.isActive ? 'ac-badge--on' : 'ac-badge--off'">
                  {{ c.isActive ? '활성' : '비활성' }}
                </span>
              </td>
              <td class="t-date">{{ c.createdAt?.slice(0, 10) }}</td>
              <td class="t-actions">
                <button class="t-link" @click="openEdit(c)">수정</button>
                <button class="t-link t-link--del" @click="deleteCategory(c.id)">삭제</button>
              </td>
            </tr>
            <tr v-if="!categories.length"><td colspan="7" class="t-empty">카테고리 없음</td></tr>
          </tbody>
        </table>
      </div>

      <!-- 모달 -->
      <Teleport to="body">
        <div v-if="showModal" class="ac-modal" @click.self="showModal = false">
          <div class="ac-modal__box">
            <header class="ac-modal__head">
              <h2>{{ editId ? '카테고리 수정' : '카테고리 추가' }}</h2>
              <button @click="showModal = false"><span class="material-symbols-outlined">close</span></button>
            </header>
            <form class="ac-modal__form" @submit.prevent="submitCategory">
              <div class="ac-modal__field">
                <label>카테고리명</label>
                <input v-model="form.name" type="text" placeholder="카테고리명" required />
              </div>
              <div class="ac-modal__field">
                <label>설명</label>
                <input v-model="form.description" type="text" placeholder="설명 (선택)" />
              </div>
              <div class="ac-modal__field">
                <label>정렬 순서</label>
                <input v-model.number="form.sortOrder" type="number" placeholder="0" />
              </div>
              <div v-if="editId" class="ac-modal__field">
                <label>상태</label>
                <select v-model="form.isActive">
                  <option :value="true">활성</option>
                  <option :value="false">비활성</option>
                </select>
              </div>
              <p v-if="formError" class="ac-modal__error">{{ formError }}</p>
              <div class="ac-modal__actions">
                <button type="button" class="ac-modal__btn ac-modal__btn--ghost" @click="showModal = false">취소</button>
                <button type="submit" class="ac-modal__btn ac-modal__btn--fill" :disabled="saving">
                  {{ saving ? '처리 중...' : (editId ? '수정' : '등록') }}
                </button>
              </div>
            </form>
          </div>
        </div>
      </Teleport>
    </div>
  </AdminLayout>
</template>

<script setup>
import { ref, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";

const categories = ref([]);
const showModal = ref(false);
const editId = ref(null);
const saving = ref(false);
const formError = ref('');
const form = ref({ name: '', description: '', sortOrder: 0, isActive: true });

onMounted(async () => { await loadCategories(); });

async function loadCategories() {
  try { categories.value = await api.get('/admin/categories') || []; } catch { categories.value = []; }
}

function openCreate() {
  editId.value = null;
  form.value = { name: '', description: '', sortOrder: 0, isActive: true };
  formError.value = '';
  showModal.value = true;
}

function openEdit(c) {
  editId.value = c.id;
  form.value = { name: c.name, description: c.description || '', sortOrder: c.sortOrder || 0, isActive: c.isActive };
  formError.value = '';
  showModal.value = true;
}

async function submitCategory() {
  if (!form.value.name.trim()) { formError.value = '카테고리명을 입력해주세요.'; return; }
  saving.value = true; formError.value = '';
  try {
    if (editId.value) {
      await api.put(`/admin/categories/${editId.value}`, form.value);
    } else {
      await api.post('/admin/categories', { name: form.value.name.trim(), description: form.value.description.trim(), sortOrder: form.value.sortOrder });
    }
    showModal.value = false;
    await loadCategories();
  } catch (e) { formError.value = e?.data?.message || e?.message || '처리 실패'; }
  finally { saving.value = false; }
}

async function deleteCategory(id) {
  if (!confirm('카테고리를 삭제하시겠습니까?')) return;
  try { await api.delete(`/admin/categories/${id}`); await loadCategories(); }
  catch (e) { alert(e?.message || '삭제 실패'); }
}
</script>

<style scoped>
.ac-head { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 1.5rem; }
.ac-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.ac-title { font-size: 1.75rem; font-weight: 900; }
.ac-add {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.625rem 1.25rem; background: #111; color: #fff;
  font-size: 0.6875rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer;
}
.ac-add .material-symbols-outlined { font-size: 1rem; }
.ac-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.ac-table { width: 100%; border-collapse: collapse; }
.ac-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.ac-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #111; width: 3rem; }
.t-name { font-weight: 600; color: #111; }
.t-desc { color: #999; max-width: 200px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.t-order { color: #555; width: 4rem; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-actions { display: flex; gap: 0.375rem; }
.t-link { font-size: 0.625rem; color: #111; cursor: pointer; background: none; border: 1px solid #ddd; padding: 0.2rem 0.625rem; border-radius: 0.25rem; }
.t-link:hover { border-color: #111; }
.t-link--del:hover { border-color: #e53e3e; color: #e53e3e; }
.ac-inactive { opacity: 0.5; }
.ac-badge { display: inline-block; padding: 0.25rem 0.625rem; font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; border-radius: 0.25rem; }
.ac-badge--on { background: #111; color: #fff; }
.ac-badge--off { border: 1.5px solid #ddd; color: #999; }

/* 모달 */
.ac-modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.ac-modal__box { background: #fff; width: 100%; max-width: 480px; border-radius: 0.75rem; overflow: hidden; }
.ac-modal__head { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #eee; }
.ac-modal__head h2 { font-size: 1.125rem; font-weight: 800; }
.ac-modal__head button { background: none; border: none; cursor: pointer; color: #999; display: flex; }
.ac-modal__form { padding: 1.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.ac-modal__field { display: flex; flex-direction: column; gap: 0.375rem; }
.ac-modal__field label { font-size: 0.6875rem; font-weight: 600; color: #555; }
.ac-modal__field input, .ac-modal__field select {
  width: 100%; padding: 0.75rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem;
  font-size: 0.8125rem; font-family: inherit; outline: none;
}
.ac-modal__field input:focus, .ac-modal__field select:focus { border-color: #111; }
.ac-modal__error { font-size: 0.75rem; color: #e53e3e; }
.ac-modal__actions { display: flex; gap: 0.625rem; margin-top: 0.5rem; }
.ac-modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; transition: all 0.2s; }
.ac-modal__btn--fill { background: #111; color: #fff; }
.ac-modal__btn--fill:disabled { opacity: 0.4; cursor: not-allowed; }
.ac-modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
.ac-modal__btn--ghost:hover { border-color: #111; color: #111; }
</style>
