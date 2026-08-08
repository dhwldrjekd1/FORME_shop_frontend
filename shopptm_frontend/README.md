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

### 관리자 라우터 가드가 위조 가능한 localStorage 값만으로 판단
- **문제**: `router/index.js`의 `requiresAdmin` 가드가 `authStore.user?.role !== "ROLE_ADMIN"`만 검사하는데, `authStore.user`는 `localStorage`에서 그대로 복원한 값이라 서명이나 서버 검증이 없음. 브라우저 devtools에서 `localStorage`의 `role`을 `"ROLE_ADMIN"`으로 바꾸고 새로고침하면, 실제 데이터는 백엔드가 다시 막더라도 관리자 화면 UI 자체는 렌더링됐음.
- **해결**: 가드에서 로컬 값을 신뢰하지 않고, 매번 `GET /api/members/{id}`(본인 정보 조회)로 서버가 실제로 알고 있는 role을 재확인한 뒤 통과 여부를 결정하도록 변경. 요청이 실패하거나(예: `id`를 다른 회원 것으로 조작해 403) 서버가 반환한 role이 `ROLE_ADMIN`이 아니면 홈으로 리다이렉트. 실제 계정으로 자기 자신을 조회하면 DB의 진짜 role이 내려오고, 남의 id로 바꿔도 소유자 검증(`SecurityUtil.checkOwnerOrAdmin`)에 걸려 403이 나므로 두 경우 모두 위조가 통하지 않는 것을 API로 확인함.

### 로그인 시 fetchCart/fetchWishlist 레이스 컨디션
- **문제**: `authStore.login()`이 `fetchCart()`/`fetchWishlist()`를 `await` 없이 호출하고, 두 스토어의 `fetchXxx()`도 응답을 조건 없이 그대로 반영해서, 로그아웃 직후 곧바로 다른 계정으로 로그인하는 경우 먼저 보낸 이전 계정의 응답이 나중에 도착하면 방금 로그인한 새 계정의 장바구니/찜 상태를 덮어쓸 수 있었음. 또한 로그인 직후 바로 이동하는 화면(예: 장바구니 리다이렉트)이 반영되기 전 상태를 보여줄 수도 있었음.
- **해결**: `cartStore.fetchCart()`/`wishlistStore.fetchWishlist()`에 요청 순번 가드를 추가해 "가장 나중에 보낸 요청"의 응답만 반영하고, 먼저 보낸 요청이 나중에 응답해도 무시하도록 함. `authStore.login()`도 두 호출을 `Promise.all`로 기다리도록 변경. 가드 로직만 따로 떼어 Node로 재현 테스트한 결과, 가드가 없으면 실제로 이전 계정 응답이 새 계정 상태를 덮어쓰는 것을 확인했고, 가드 추가 후에는 항상 최신 요청의 응답만 반영되는 것을 확인함.

### 결제 금액이 위조 가능한 localStorage grade 기준으로 계산됨
- **문제**: `PaymentView.vue`가 등급 할인이 적용된 결제 금액(`finalTotal`)을 `authStore.user.grade`(서명 없이 localStorage에서 그대로 복원된 값)로 계산해서 토스 결제창에 넘기고 있었음. 이 값은 devtools로 조작할 수 있을 뿐 아니라, 다른 세션에서 등급이 바뀐 뒤 로컬 캐시가 갱신되지 않은 경우에도 실제와 달라질 수 있었음. 백엔드(`OrderService.createOrder`)는 이미 회원의 진짜 등급으로 금액을 다시 계산해서 결제 승인 금액과 대조하므로 잘못된 금액으로는 주문 자체가 거부되지만, 문제는 그 전 단계인 토스 결제 승인(`/api/payment/confirm`)이 실제 카드 결제를 이미 확정시켜버린다는 점 — 즉 계산이 틀리면 카드는 (틀린 금액으로) 결제됐는데 주문은 안 잡히는 상태가 될 수 있었음.
- **해결**: 결제 화면 진입 시(`onMounted`) `GET /api/members/{id}`로 서버가 알고 있는 최신 등급을 다시 조회해서 할인 계산에 사용하도록 변경, localStorage 값은 초기 표시값으로만 쓰고 결제 금액 계산 전에 항상 서버 값으로 덮어씀. 실제로 회원 등급을 DB에서 직접 바꿔가며 `GET /api/members/{id}`가 항상 DB의 진짜 값을 반환하는 것을 확인함(관리자 라우터 가드 수정 때 검증한 것과 동일한 엔드포인트/신뢰 구조).

### 전역 401 핸들러가 무조건 로그인 화면으로 강제 이동
- **문제**: `api/index.js`의 공용 요청 함수가 어떤 API 호출이든 `401`을 받으면 예외 없이 `window.location.href = "/login"`으로 즉시 하드 리다이렉트했음. 마침 토스 결제 승인(`/api/payment/confirm`)이나 그 직후 주문 생성 호출이 진행되는 도중 세션이 만료돼 401이 나면, 카드 결제는 이미 끝났는데 화면이 강제로 로그인 페이지로 넘어가버려서 결제 실패 안내(`catch` 블록의 `alert`)도 못 보고 주문 생성 시도조차 못 하는 상태가 될 수 있었음. 또한 어디로 이동하든 되돌아갈 경로(`redirect`)를 남기지 않아, 다시 로그인해도 원래 있던 화면으로 못 돌아갔음.
- **해결**: 요청 옵션에 `skipAuthRedirect`를 추가해, 결제 승인/주문 생성처럼 "지금 강제 이동시키면 오히려 해로운" 호출은 이 옵션으로 자동 리다이렉트를 건너뛰고 각 화면의 기존 `catch`가 처리하도록 함. 일반적인 401은 기존처럼 리다이렉트하되, 현재 경로를 `redirect` 쿼리로 남겨 로그인 후 원래 화면으로 돌아올 수 있게 함(로그인 화면은 이미 `route.query.redirect`를 읽어 사용하고 있어 그대로 호환됨). 분기 로직만 따로 떼어 Node로 재현해 `skipAuthRedirect` 값에 따라 리다이렉트 여부가 정확히 갈리는 것을 확인함.

### 새로고침 시 서버 재검증 없이 localStorage만으로 로그인 상태 복원
- **문제**: `main.js`가 앱 기동 시 `localStorage`에 `user`가 있으면 그것만 믿고 곧바로 장바구니/찜을 불러왔음. 로그아웃(서버가 jti를 블랙리스트에 등록)이나 세션 만료로 실제 서버 세션은 이미 무효화됐는데도, 로컬 캐시가 남아있으면 화면은 계속 로그인 상태로 보이다가 실제 보호된 API를 호출할 때가 돼서야 401로 드러났음.
- **해결**: `authStore`에 `verifySession()`을 추가해, 로컬에 `user`가 있으면 `GET /api/members/{id}`로 서버 세션이 실제로 유효한지 먼저 확인하고(무효면 로컬 상태 정리), 유효할 때만 최신 정보로 캐시를 갱신. `main.js`는 이제 장바구니/찜을 바로 불러오지 않고 `verifySession()`이 끝난 뒤 로그인 상태일 때만 불러오도록 변경. 이 확인 요청은 `skipAuthRedirect`를 함께 써서, 세션이 만료된 상태로 아무 페이지나 열었을 때 곧바로 로그인 화면으로 튕겨나가지 않고 조용히 로그아웃 상태로만 정리되게 함. 실제로 로그인 후 로그아웃까지 마친 뒤 같은(무효화된) 쿠키로 `GET /api/members/{id}`를 다시 호출해, 로그아웃 전엔 `200`이던 응답이 로그아웃 후엔 `401`로 바뀌는 것을 확인함.

### (교차검증에서 발견) 결제 화면에서 등급 재확인이 끝나기 전에도 결제 버튼을 누를 수 있었음
- **문제**: 결제 화면 진입 시 서버 최신 등급을 다시 조회하도록 고쳤지만(바로 위 항목), 그 요청이 끝나기 전에도 "결제하기" 버튼이 계속 활성화돼 있었음. 응답이 오기 전에 버튼을 누르면 `finalTotal`이 여전히 `freshGrade`의 초기값(localStorage에서 복원된, 위조/오래된 값)으로 계산돼 토스에 그대로 넘어가서, 애초에 고치려던 문제(잘못된 금액으로 카드 결제가 확정되는 것)의 취약 시간창이 좁아지기만 했을 뿐 완전히 닫히지 않았음.
- **해결**: `gradeLoading` 상태를 추가해 서버 등급 재확인이 끝나기 전까지 결제 버튼을 비활성화(`disabled`)하고 "회원 정보 확인 중..."으로 표시. `handleSubmit()` 함수 내부에도 동일한 조건으로 이중 방어를 걸어, 버튼 비활성화가 어떤 이유로든 우회되더라도 실제 결제 로직 자체가 실행되지 않도록 함.

### 상품 상세 페이지 이미지 확대(줌) 팝업이 창을 좁히면 잘리거나 아예 작동하지 않음 (2026.08.08)
- **문제**: `DetailView.vue`의 이미지 확대 기능이 메인 이미지 오른쪽으로 튀어나오는 팝업 패널(`.dp-gallery__magnified`) 방식으로 구현돼 있는데, 바로 옆에 상품 정보 영역(`.dp-info`)이 붙어 있어 팝업이 들어갈 여유 공간이 원래 없었음. 1023px 이하에서는 팝업을 아예 `display: none`으로 숨겨서 마우스를 올리면 사각형 렌즈만 보이고 확대 화면은 뜨지 않았고, 1024px 이상에서도 창을 좁히면 팝업이 상품 정보 위로 겹치거나 뷰포트 오른쪽 밖으로 넘어가 잘려 보였음.
- **원인**: 확대 화면을 원본 이미지 박스 밖으로 "튀어나오게" 배치하는 구조 자체가, 오른쪽에 다른 콘텐츠가 항상 붙어 있는 이 레이아웃과 맞지 않았음.
- **해결**: 확대 화면을 옆으로 띄우지 않고 원본 이미지와 같은 박스 안에 오버레이로(`position: absolute; inset: 0`) 그리도록 변경. 확대 화면이 항상 원본 이미지의 경계 안에서만 그려지므로 화면 폭과 무관하게 잘리거나 사라지는 문제가 없어짐.
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
