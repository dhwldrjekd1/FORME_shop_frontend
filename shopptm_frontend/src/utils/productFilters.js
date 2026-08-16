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

const BRAND_KOR_MAP = { '빈폴': 'BEANPOLE', '칼하트': 'CARHARTT', '리바이스': "LEVI'S", '리바이': "LEVI'S", '디키즈': 'DICKIES' };

// 헤더 검색창(실시간 드롭다운)과 검색결과 페이지가 동일한 기준으로 매칭되도록
// 공통 검색 로직을 여기 하나로 모음 (한국어 브랜드명 → 영문 변환 포함)
export function searchProducts(list, query) {
  const q = query?.trim().toLowerCase();
  if (!q) return [];
  const brandMatch = Object.entries(BRAND_KOR_MAP).find(([kor]) => q.includes(kor));
  const brandEng = brandMatch ? brandMatch[1].toLowerCase() : null;

  return list.filter((p) => {
    const name = p.name?.toLowerCase() || '';
    const brand = p.brand?.toLowerCase() || '';
    const cat = p.category?.toLowerCase() || '';
    return name.includes(q) || brand.includes(q) || cat.includes(q) || (brandEng && brand.includes(brandEng));
  });
}
