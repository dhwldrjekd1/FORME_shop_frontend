<template>
  <AdminLayout>
    <div class="am">
      <div class="am-head">
        <div><p class="am-code">[ 03 / MEMBERS ]</p><h1 class="am-title">회원 관리</h1></div>
      </div>
      <div class="am-filter">
        <input v-model="search" type="text" placeholder="이름 또는 이메일 검색..." class="am-input" @input="doSearch" />
        <span class="am-count">{{ members.length }}명</span>
      </div>
      <div class="am-wrap">
        <table class="am-table">
          <thead><tr><th>ID</th><th>이름</th><th>이메일</th><th>등급</th><th>상태</th><th>가입일</th><th></th></tr></thead>
          <tbody>
            <tr v-for="m in members" :key="m.id">
              <td class="t-id">{{ m.id }}</td>
              <td class="t-name">{{ m.name }}</td>
              <td>{{ m.email }}</td>
              <td>
                <select class="am-sel" :disabled="gradePending.has(m.id)" :value="m.grade" @change="changeGrade(m, $event)">
                  <option v-for="g in grades" :key="g" :value="g">{{ g }}</option>
                </select>
              </td>
              <td><span class="tag" :class="m.isActive !== false ? 'tag--on' : 'tag--off'">{{ m.isActive !== false ? '활성' : '정지' }}</span></td>
              <td class="t-date">{{ m.createdAt?.slice(0,10) }}</td>
              <td>
                <button v-if="m.isActive !== false" class="t-ban" :disabled="banPending.has(m.id) || showBanModal" @click="startBan(m.id)">정지</button>
                <span v-else class="t-banned">정지됨</span>
              </td>
            </tr>
            <tr v-if="!members.length"><td colspan="7" class="t-empty">회원 없음</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- 본인 계정 정지 확인용 현재 비밀번호 입력 모달 -->
    <Teleport to="body">
      <div v-if="showBanModal" class="modal" @click.self="!banPending.has(banTargetId) && closeBanModal()">
        <div class="modal__box">
          <h2 class="modal__title">본인 계정 정지</h2>
          <p class="modal__desc">본인 확인을 위해 현재 비밀번호를 입력해주세요.</p>
          <input
            v-model="banPassword"
            type="password"
            placeholder="현재 비밀번호"
            class="modal__input"
            :disabled="banPending.has(banTargetId)"
            autocomplete="current-password"
            @keyup.enter="confirmBanSelf"
          />
          <div class="modal__actions">
            <button class="modal__btn modal__btn--ghost" :disabled="banPending.has(banTargetId)" @click="closeBanModal">취소</button>
            <button class="modal__btn modal__btn--fill" :disabled="banPending.has(banTargetId)" @click="confirmBanSelf">{{ banPending.has(banTargetId) ? '처리 중...' : '정지' }}</button>
          </div>
        </div>
      </div>
    </Teleport>
  </AdminLayout>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";
import { useAuthStore } from "@/stores/authStore";
const authStore = useAuthStore();
const members = ref([]); const search = ref('');
const grades = ['BRONZE','SILVER','GOLD','VIP'];
// 등급변경/정지 진행중인 회원 id — 응답 오기 전에 같은 회원을 또 조작하면 두 요청이 겹쳐
// 나중에 도착한 응답이 아니라 먼저 보낸 요청 순서대로 화면이 어긋날 수 있어 막는다
const gradePending = reactive(new Set());
const banPending = reactive(new Set());
const showBanModal = ref(false);
const banPassword = ref('');
const banTargetId = ref(null);
onMounted(async () => { await loadMembers(); });
async function loadMembers() { try { members.value = await api.get('/admin/members') || []; } catch {} }
async function doSearch() {
  if (!search.value.trim()) { await loadMembers(); return; }
  try { members.value = await api.get(`/admin/members/search?keyword=${encodeURIComponent(search.value)}`) || []; } catch {}
}
// select가 v-model이 아니라 :value 바인딩이라, 취소/실패로 grade를 안 바꾸면
// Vue가 값이 그대로라고 보고 DOM을 되돌려주지 않는다 — 드롭다운엔 방금 고른(반영 안 된)
// 등급이 계속 보이는 채로 남을 수 있어, 취소·실패 시엔 select의 DOM 값도 직접 되돌린다.
// 요청 중 검색(doSearch)으로 members.value가 통째로 교체될 수 있으므로, id/name/기존
// 등급은 미리 값으로 떼어두고 실제 반영은 항상 응답 후 members.value에서 다시 찾아서 한다
async function changeGrade(m, event) {
  const id = m.id, name = m.name, oldGrade = m.grade;
  const grade = event.target.value;
  if (gradePending.has(id) || grade === oldGrade) { event.target.value = oldGrade; return; }
  if (!confirm(`${name}님의 등급을 ${oldGrade} → ${grade}로 변경하시겠습니까?`)) {
    event.target.value = oldGrade;
    return;
  }
  gradePending.add(id);
  try {
    await api.patch(`/admin/members/${id}/grade?grade=${grade}`);
    const cur = members.value.find(x => x.id === id);
    if (cur) cur.grade = grade;
  } catch (e) {
    alert(e.message);
    event.target.value = oldGrade;
  } finally {
    gradePending.delete(id);
  }
}
// 관리자가 자기 자신의 계정을 정지시키려는 경우엔 현재 비밀번호 확인 모달을 띄운다 —
// 안 그러면 관리자 세션이 탈취된 상태에서 진짜 비밀번호를 몰라도 이 API로 본인 계정을
// 비활성화시킬 수 있었음(회원탈퇴 때와 같은 이유). 다른 회원을 정지시키는 경우는 그대로
// confirm()만 거치고 비밀번호 없이 진행한다.
function startBan(id) {
  if (banPending.has(id)) return;
  if (id === authStore.user?.id) {
    if (!confirm('본인 계정을 정지하시겠습니까?')) return;
    banTargetId.value = id;
    banPassword.value = '';
    showBanModal.value = true;
    return;
  }
  if (!confirm('이 회원을 정지하시겠습니까?')) return;
  doBan(id, null);
}
function closeBanModal() {
  showBanModal.value = false;
  banPassword.value = '';
  banTargetId.value = null;
}
function confirmBanSelf() {
  if (banPending.has(banTargetId.value)) return;
  if (!banPassword.value) { alert('현재 비밀번호를 입력해주세요.'); return; }
  doBan(banTargetId.value, banPassword.value);
}
async function doBan(id, currentPassword) {
  banPending.add(id);
  try {
    await api.patch(`/admin/members/${id}/ban`, currentPassword ? { currentPassword } : undefined);
    const m = members.value.find(x => x.id === id);
    if (m) m.isActive = false;
    // 이 성공이 지금 모달이 떠 있는 그 대상(banTargetId)에 대한 것일 때만 모달을 닫는다 —
    // 그렇지 않으면, 본인 계정 정지 모달이 열려 있는 도중에 다른 회원을 정지시킨 요청이
    // 먼저 끝나버려서 이 조건만으로 모달을 닫으면 입력 중이던 비밀번호가 그대로 날아간다.
    if (showBanModal.value && banTargetId.value === id) closeBanModal();
  } catch (e) {
    // 비밀번호가 틀려서 실패했을 수도, 일시적인 네트워크 오류일 수도 있어 여기서 입력값을
    // 지우지 않는다 — 모달을 닫을 때(closeBanModal)만 비운다.
    alert(e.message);
  } finally {
    banPending.delete(id);
  }
}
</script>
<style scoped>
.am-head { margin-bottom: 1.5rem; }
.am-code { font-size: 0.5625rem; font-weight: 800; letter-spacing: 0.2em; color: #FF2D2D; margin-bottom: 0.375rem; }
.am-title { font-size: 1.75rem; font-weight: 900; }
.am-filter { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; }
.am-input { padding: 0.625rem 1rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; outline: none; width: 280px; }
.am-input:focus { border-color: #111; }
.am-count { font-size: 0.6875rem; color: #999; }
.am-wrap { background: #fff; border-radius: 0.5rem; border: 1px solid #eee; overflow-x: auto; }
.am-table { width: 100%; border-collapse: collapse; }
.am-table th { font-size: 0.5625rem; font-weight: 700; letter-spacing: 0.1em; color: #bbb; padding: 0.875rem 0.75rem; text-align: left; }
.am-table td { font-size: 0.8125rem; padding: 0.75rem; border-bottom: 1px solid #f5f5f5; }
.t-id { font-weight: 700; color: #bbb; width: 50px; }
.t-name { font-weight: 600; color: #111; }
.t-date { font-size: 0.6875rem; color: #bbb; }
.t-empty { text-align: center; color: #ccc; padding: 3rem; }
.t-ban { font-size: 0.625rem; color: #e53e3e; cursor: pointer; background: none; border: none; }
.t-ban:disabled { opacity: 0.5; cursor: not-allowed; }
.t-banned { font-size: 0.625rem; color: #bbb; }
.am-sel { font-size: 0.6875rem; padding: 0.375rem 0.5rem; border: 1.5px solid #e8e8e8; border-radius: 0.25rem; cursor: pointer; outline: none; }
.am-sel:disabled { opacity: 0.5; cursor: not-allowed; }
.tag { font-size: 0.5rem; font-weight: 800; letter-spacing: 0.1em; padding: 0.2rem 0.5rem; }
.tag--on { background: #38a169; color: #fff; }
.tag--off { background: #e53e3e; color: #fff; }
.modal { position: fixed; inset: 0; background: rgba(0,0,0,0.45); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 1.5rem; }
.modal__box { background: #fff; width: 100%; max-width: 420px; border-radius: 0.75rem; padding: 2rem; }
.modal__title { font-size: 1.125rem; font-weight: 800; margin-bottom: 0.5rem; }
.modal__desc { font-size: 0.8125rem; color: #666; margin-bottom: 1.25rem; line-height: 1.6; }
.modal__input { width: 100%; padding: 0.875rem; border: 1.5px solid #e8e8e8; border-radius: 0.375rem; font-size: 0.8125rem; font-family: inherit; outline: none; margin-bottom: 1.25rem; }
.modal__input:focus { border-color: #111; }
.modal__input:disabled { background: #fafaf8; color: #999; }
.modal__actions { display: flex; gap: 0.625rem; }
.modal__btn { flex: 1; padding: 0.875rem; font-size: 0.8125rem; font-weight: 700; border-radius: 0.375rem; cursor: pointer; }
.modal__btn--fill { background: #111; color: #fff; }
.modal__btn--fill:disabled, .modal__btn--ghost:disabled { opacity: 0.5; cursor: not-allowed; }
.modal__btn--ghost { border: 1.5px solid #ddd; color: #666; background: #fff; }
</style>
