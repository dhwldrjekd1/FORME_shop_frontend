// Best/New/Sale 상품 목록 페이지들이 공통으로 쓰는 브랜드·성별 필터 데이터
// (예전엔 이 배열들이 각 뷰 파일마다 그대로 복사되어 있었음)

export const BRAND_CHIPS = [
  { key: 'all', label: 'ALL' },
  { key: 'CARHARTT', label: 'CARHARTT', color: '#9C4F18' },
  { key: "LEVI'S", label: "LEVI'S", color: '#8E1C28' },
  { key: 'DICKIES', label: 'DICKIES', color: '#1A1A1A' },
  { key: 'BEANPOLE', label: 'BEANPOLE', color: '#103728' },
];

export const GENDER_CHIPS = [
  { key: 'all', label: '전체' },
  { key: '남성', label: '남성' },
  { key: '여성', label: '여성' },
  { key: '공용', label: '공용' },
];

const BRAND_COLORS = {
  BEANPOLE: '#103728',
  CARHARTT: '#9C4F18',
  "LEVI'S": '#8E1C28',
  DICKIES: '#1A1A1A',
};

export function getBrandColor(brand) {
  return BRAND_COLORS[brand] || '#111';
}

// Best/New/Sale에서 동일하게 쓰는 브랜드+성별 필터링 로직
export function filterByBrandAndGender(list, brand, gender) {
  let result = list;
  if (brand !== 'all') {
    result = result.filter((p) => p.brand === brand);
  }
  if (gender !== 'all') {
    result = result.filter(
      (p) => !p.gender || p.gender === gender || (gender !== '공용' && p.gender === '공용'),
    );
  }
  return result;
}
