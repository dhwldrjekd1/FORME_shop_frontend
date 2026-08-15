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
                <button v-if="m.isActive !== false" class="t-ban" :disabled="banPending.has(m.id)" @click="ban(m.id)">정지</button>
                <span v-else class="t-banned">정지됨</span>
              </td>
            </tr>
            <tr v-if="!members.length"><td colspan="7" class="t-empty">회원 없음</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </AdminLayout>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import AdminLayout from "@/layouts/AdminLayout.vue";
import api from "@/api";
const members = ref([]); const search = ref('');
const grades = ['BRONZE','SILVER','GOLD','VIP'];
// 등급변경/정지 진행중인 회원 id — 응답 오기 전에 같은 회원을 또 조작하면 두 요청이 겹쳐
// 나중에 도착한 응답이 아니라 먼저 보낸 요청 순서대로 화면이 어긋날 수 있어 막는다
const gradePending = reactive(new Set());
const banPending = reactive(new Set());
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
async function ban(id) {
  if (banPending.has(id)) return;
  if (!confirm('이 회원을 정지하시겠습니까?')) return;
  banPending.add(id);
  try { await api.patch(`/admin/members/${id}/ban`); const m = members.value.find(x => x.id === id); if (m) m.isActive = false; } catch (e) { alert(e.message); }
  finally { banPending.delete(id); }
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
</style>
