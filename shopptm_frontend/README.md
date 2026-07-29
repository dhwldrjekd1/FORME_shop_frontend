# FORME - 멀티브랜드 쇼핑몰 포트폴리오 (Frontend)

> 리바이스, 칼하트, 빈폴, 딕키즈 4개 브랜드를 하나의 플랫폼에서 운영하는 멀티브랜드 쇼핑몰 포트폴리오입니다.

---

## 프로젝트 개요

| 항목 | 내용 |
|------|------|
| 프로젝트명 | FORME 멀티브랜드 쇼핑몰 |
| 개발 기간 | 2026.03 |
| 개발자 | 최동윤 |
| 개발 인원 | 1인 (풀스택) |
| 배포 환경 | Ubuntu Server + Spring Boot |
| 접속 URL | https://forme.dyy.kr |

---

## 기술 스택

| 구분 | 기술 |
|------|------|
| Framework | Vue.js 3 (Composition API, `<script setup>`) |
| 상태 관리 | Pinia |
| 라우팅 | Vue Router 4 (라우터 가드) |
| 빌드 도구 | Vite |
| 인증 | JWT (axios 인터셉터 자동 갱신) |
| 반응형 | 모바일 퍼스트 반응형 (min-width: 768px) |

---

## 프로젝트 구조

```
src/
├── views/
│   ├── HomeView.vue            # 메인 (멀티브랜드 히어로)
│   ├── BestView.vue            # 베스트 상품
│   ├── NewView.vue             # 신상품
│   ├── SaleView.vue            # 세일
│   ├── DetailView.vue          # 상품 상세
│   ├── ListView.vue            # 상품 목록
│   ├── CartView.vue            # 장바구니
│   ├── PaymentView.vue         # 결제
│   ├── OrderCompleteView.vue   # 주문 완료
│   ├── MyPageView.vue          # 마이페이지
│   ├── LoginView.vue           # 로그인
│   ├── SignupView.vue          # 회원가입
│   ├── FaqView.vue             # FAQ
│   ├── QnaView.vue             # QnA
│   ├── BoardView.vue           # 게시판
│   ├── LevisView.vue           # 리바이스 브랜드 페이지
│   ├── CarharttView.vue        # 칼하트 브랜드 페이지
│   ├── BeanpoleView.vue        # 빈폴 브랜드 페이지
│   ├── DickiesView.vue         # 딕키즈 브랜드 페이지
│   └── admin/
│       ├── AdminDashboard.vue  # 대시보드
│       ├── AdminMembers.vue    # 회원 관리
│       ├── AdminOrders.vue     # 주문 관리
│       ├── AdminProducts.vue   # 상품 관리
│       ├── AdminCategories.vue # 카테고리 관리
│       ├── AdminReviews.vue    # 리뷰 관리
│       ├── AdminAnalytics.vue  # 방문 분석
│       ├── AdminBoard.vue      # 게시판 관리
│       ├── AdminFaq.vue        # FAQ 관리
│       ├── AdminQna.vue        # QnA 관리
│       └── AdminSettings.vue   # 사이트 설정
├── components/
│   ├── TheHeader.vue           # 헤더 (햄버거 메뉴 포함)
│   ├── TheFooter.vue           # 푸터
│   └── SlidePanel.vue          # 사이드 슬라이드 패널
├── layouts/
│   ├── Forme32Layout.vue       # 일반 레이아웃
│   └── AdminLayout.vue         # 관리자 레이아웃
├── stores/
│   ├── authStore.js            # 인증 (JWT)
│   ├── cartStore.js            # 장바구니
│   ├── productStore.js         # 상품
│   ├── wishlistStore.js        # 위시리스트
│   ├── recentStore.js          # 최근 본 상품
│   └── panelStore.js           # 슬라이드 패널
├── api/index.js                # axios 인스턴스 (JWT 인터셉터)
└── utils/
    ├── brandSettings.js        # 브랜드별 설정
    └── pageTracker.js          # 페이지뷰 트래킹
```

---

## 구현 기능

### 회원
- 회원가입 / 로그인 / 로그아웃 (JWT, 로그아웃 시 서버에 토큰 폐기 요청)
- 토큰은 httpOnly 쿠키로만 관리 — localStorage에 저장하지 않아 XSS로 인한 탈취 위험 제거
- 마이페이지 (회원정보 조회·수정)
- 라우터 가드 (비로그인·비관리자 접근 차단)
- 인증 만료(401) 응답 시 로그인 정보 정리 후 로그인 페이지로 자동 이동

### 상품
- 멀티브랜드 상품 목록 (브랜드별 독립 페이지)
- 베스트 / 신상품 / 세일 필터
- 상품 상세 (사이즈 선택, 리뷰)
- AI 기반 사이즈 추천 (비회원 포함)

### 장바구니 / 결제
- 장바구니 담기 / 수량 변경 / 삭제
- 토스페이먼츠 결제 연동
- 결제 승인 완료 후, 실제 승인 금액을 주문 생성 요청에 함께 전달해 서버에서 금액 대조

### 커뮤니티
- 게시판 / QnA / FAQ CRUD

### 관리자
- 대시보드 (통계, 방문자 분석)
- 회원·주문·상품·카테고리·리뷰·게시판 관리
- 사이트 설정

### 반응형 (모바일)
- 전체 페이지 모바일 대응 (min-width: 768px 기준)
- 햄버거 메뉴 (모바일 네비게이션)
- iOS Safari 자동 줌인 방지

### 성능
- 히어로 배너 이미지 리사이즈·압축 (원본 대비 대폭 용량 절감)
- 세로형 원본 사진은 `object-position`을 이미지별로 지정해 와이드 배너에서 피사체가 잘리지 않도록 보정

---

## 트러블슈팅

### 저장소에 커밋된 사용자 업로드 파일
- **문제**: 런타임에 사용자가 업로드한 이미지 파일이 `.gitignore`에서 누락되어 소스 저장소에 그대로 커밋되어 있었음.
- **원인**: `uploads/` 디렉터리가 무시 대상 목록에 없었음.
- **해결**: 커밋된 업로드 파일을 git 추적에서 제거하고 (`git rm --cached`), `.gitignore`에 `uploads/`를 추가해 이후 업로드 파일이 다시 커밋되지 않도록 함.

### 빌드 산출물 폴더가 .gitignore에서 누락
- **문제**: `vite.config.js`의 `build.outDir`이 저장소 루트의 `backend/src/main/resources/static`을 가리키도록 설정되어 있는데(빌드 후 백엔드 저장소로 그대로 복사해 넣기 위함), 정작 `.gitignore`에는 `backend/`가 빠져 있어 오래된 빌드 산출물이 디스크에 계속 쌓이고 실수로 커밋될 위험이 있었음.
- **해결**: `.gitignore`에 `backend/`를 추가. (`npm run build`를 실행하면 해당 경로에 산출물이 다시 생성됨 — 삭제해도 되는 캐시성 디렉터리)

### 로그아웃해도 장바구니/찜 화면 상태가 그대로 남음
- **문제**: `authStore.logout()`이 로그인 정보(`user`, localStorage)만 정리하고 `cartStore`/`wishlistStore`의 `items`는 그대로 둬서, 로그아웃 후에도(혹은 같은 브라우저에서 다른 계정으로 로그인하기 전까지) 화면에 이전 사용자의 장바구니·찜 목록이 그대로 보이는 문제. 공유 PC에서 계정을 바꿔가며 쓰는 경우 특히 문제가 됨.
- **해결**: `cartStore`/`wishlistStore`에 서버 데이터는 건드리지 않고 화면 상태만 비우는 `resetLocal()`을 추가하고(기존 `clearCart()`는 서버의 장바구니 자체를 삭제하는 함수라 로그아웃에는 쓸 수 없어 별도로 분리), `authStore.logout()`에서 로그인 정보 정리와 함께 호출하도록 수정.

---

## 빌드 및 배포

```bash
npm run build
# dist/ → Spring Boot static 폴더에 복사 후 서버 재시작
```

---

## 연관 레포지토리

| 구분 | 링크 |
|------|------|
| Backend | [FORME_shop_backend](https://github.com/dhwldrjekd1/FORME_shop_backend) |
