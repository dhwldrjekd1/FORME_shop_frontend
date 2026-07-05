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
- 회원가입 / 로그인 / 로그아웃 (JWT)
- 마이페이지 (회원정보 조회·수정)
- 라우터 가드 (비로그인·비관리자 접근 차단)

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
