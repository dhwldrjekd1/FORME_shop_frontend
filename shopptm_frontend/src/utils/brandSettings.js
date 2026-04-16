import api from '@/api';

const defaults = {
  beanpole: { heroImage: '/images/beanpole/beanpole_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 },
  carhartt: { heroImage: '/images/carhartt/carhero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 },
  levis: { heroImage: '/images/levis/levis_hero.png', heroHeight: 600, heroPosition: 'center center', gridCols: 3 },
  dickies: { heroImage: '/images/dickies/dickies_hero.png', heroHeight: 600, heroPosition: 'center top', gridCols: 3 },
};

// 캐시 (한 번 로드하면 세션 동안 유지)
let cachedSettings = null;

export async function getBrandSettings(brandKey) {
  if (!cachedSettings) {
    try {
      const r = await api.get('/settings/brand_settings');
      if (r?.value) cachedSettings = JSON.parse(r.value);
    } catch {}
  }
  if (cachedSettings?.length) {
    const found = cachedSettings.find(b => b.key === brandKey);
    if (found) return found;
  }
  return defaults[brandKey] || defaults.beanpole;
}
