# FORME API & Database Reference

## API Endpoints (총 92개)

### 1. 상품 (Product)
> **Controller:** `product/controller/ProductController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/products` | 전체 상품 목록 조회 | 24 |
| GET | `/api/products/{id}` | 상품 상세 조회 | 31 |
| GET | `/api/products/category?categoryId=` | 카테고리별 상품 조회 | 38 |
| GET | `/api/products/search?keyword=` | 상품 검색 | 46 |
| GET | `/api/products/new` | 신상품 4건 (메인용) | 54 |
| GET | `/api/products/best` | 베스트 4건 (메인용) | 61 |
| GET | `/api/products/recommend` | 추천(큐레이터) 상품 조회 | 68 |
| POST | `/api/admin/products` | 상품 등록 (다중 이미지) | 74 |
| PUT | `/api/admin/products/{id}` | 상품 수정 (다중 이미지) | 82 |
| DELETE | `/api/admin/products/{id}` | 상품 삭제 | 92 |
| DELETE | `/api/admin/products/recommend/reset` | 추천 전체 초기화 | 99 |
| PATCH | `/api/admin/products/{id}/change-id` | 상품 ID 변경 | 107 |

---

### 2. 회원 (Member)
> **Controller:** `member/controller/MemberController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| POST | `/api/register` | 회원가입 | 24 |
| POST | `/api/login` | 로그인 (JWT 토큰 반환) | 31 |
| GET | `/api/members/{id}` | 회원 정보 조회 | 40 |
| PUT | `/api/members/{id}` | 회원 정보 수정 | 48 |
| DELETE | `/api/members/{id}` | 회원 탈퇴 (soft delete) | 58 |

---

### 3. 주문 (Order)
> **Controller:** `order/controller/OrderController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| POST | `/api/members/{memberId}/orders` | 주문 생성 | 22 |
| GET | `/api/members/{memberId}/orders` | 내 주문 목록 | 31 |
| GET | `/api/orders/{orderId}` | 주문 상세 | 39 |
| PATCH | `/api/orders/{orderId}/cancel` | 주문 취소 | 47 |
| GET | `/api/admin/orders` | 전체 주문 목록 (관리자) | 55 |
| PATCH | `/api/admin/orders/{orderId}/status` | 주문 상태 변경 (관리자) | 62 |

---

### 4. 장바구니 (Cart)
> **Controller:** `cart/controller/CartController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/members/{memberId}/cart` | 장바구니 조회 | 22 |
| POST | `/api/members/{memberId}/cart` | 장바구니 추가 | 30 |
| PATCH | `/api/cart/{cartId}` | 수량 변경 | 40 |
| DELETE | `/api/cart/{cartId}` | 단건 삭제 | 50 |
| DELETE | `/api/members/{memberId}/cart` | 전체 비우기 | 58 |

---

### 5. 찜 (Wishlist)
> **Controller:** `wishlist/controller/WishlistController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/members/{memberId}/wishlist` | 찜 목록 조회 | 20 |
| POST | `/api/members/{memberId}/wishlist` | 찜 추가 | 26 |
| DELETE | `/api/members/{memberId}/wishlist/{productId}` | 찜 해제 | 36 |

---

### 6. 리뷰 (Review)
> **Controller:** `review/controller/ReviewController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/products/{productId}/reviews` | 상품 리뷰 목록 | 22 |
| GET | `/api/members/{memberId}/reviews` | 내 리뷰 목록 | 30 |
| POST | `/api/members/{memberId}/reviews` | 리뷰 작성 | 38 |
| PUT | `/api/reviews/{reviewId}` | 리뷰 수정 | 47 |
| DELETE | `/api/reviews/{reviewId}` | 리뷰 삭제 | 57 |
| GET | `/api/admin/reviews` | 전체 리뷰 (관리자) | 65 |
| POST | `/api/admin/reviews/{reviewId}/reply` | 관리자 답글 | 72 |
| DELETE | `/api/admin/reviews/{reviewId}/reply` | 답글 삭제 | 81 |
| DELETE | `/api/admin/reviews/{reviewId}` | 리뷰 삭제 (관리자) | 88 |

---

### 7. Q&A
> **Controller:** `qna/controller/QnaController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/qna` | 전체 Q&A 목록 | 22 |
| GET | `/api/members/{memberId}/qna` | 내 Q&A 목록 | 29 |
| GET | `/api/products/{productId}/qna` | 상품별 Q&A | 37 |
| GET | `/api/qna/{qnaId}` | Q&A 상세 | 45 |
| POST | `/api/members/{memberId}/qna` | Q&A 작성 | 53 |
| PUT | `/api/qna/{qnaId}` | Q&A 수정 | 62 |
| DELETE | `/api/qna/{qnaId}` | Q&A 삭제 | 72 |
| POST | `/api/admin/qna/{qnaId}/answer` | 관리자 답변 | 80 |
| DELETE | `/api/admin/qna/{qnaId}/answer` | 답변 삭제 | 89 |
| DELETE | `/api/admin/qna/{qnaId}` | Q&A 삭제 (관리자) | 97 |

---

### 8. 게시판 (Board)
> **Controller:** `board/controller/BoardController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/boards` | 게시글 목록 | 21 |
| GET | `/api/boards/{boardId}` | 게시글 상세 + 조회수 증가 | 28 |
| GET | `/api/members/{memberId}/boards` | 내 게시글 | 36 |
| GET | `/api/boards/search?keyword=` | 게시글 검색 | 44 |
| POST | `/api/members/{memberId}/boards` | 게시글 작성 | 52 |
| PUT | `/api/boards/{boardId}` | 게시글 수정 | 61 |
| DELETE | `/api/boards/{boardId}` | 게시글 삭제 | 71 |
| DELETE | `/api/admin/boards/{boardId}` | 게시글 삭제 (관리자) | 79 |

---

### 9. 댓글 (Comment)
> **Controller:** `board/controller/CommentController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/boards/{boardId}/comments` | 게시글 댓글 목록 | 21 |
| GET | `/api/members/{memberId}/comments` | 내 댓글 목록 | 29 |
| POST | `/api/boards/{boardId}/members/{memberId}/comments` | 댓글 작성 | 37 |
| PUT | `/api/comments/{commentId}` | 댓글 수정 | 47 |
| DELETE | `/api/comments/{commentId}` | 댓글 삭제 | 57 |
| DELETE | `/api/admin/comments/{commentId}` | 댓글 삭제 (관리자) | 65 |

---

### 10. 배송 (Delivery)
> **Controller:** `delivery/controller/DeliveryController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/orders/{orderId}/delivery` | 배송 정보 조회 | 21 |
| GET | `/api/admin/deliveries?status=` | 배송 상태별 조회 (관리자) | 29 |
| POST | `/api/admin/orders/{orderId}/delivery` | 배송 등록 (관리자) | 38 |
| PUT | `/api/admin/deliveries/{deliveryId}` | 배송 정보 수정 (관리자) | 47 |

---

### 11. 카테고리 (Category)
> **Controller:** `category/controller/CategoryController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/categories` | 활성 카테고리 목록 | 21 |
| GET | `/api/admin/categories` | 전체 카테고리 (비활성 포함) | 28 |
| GET | `/api/categories/{id}` | 카테고리 상세 | 35 |
| POST | `/api/admin/categories` | 카테고리 생성 | 42 |
| PUT | `/api/admin/categories/{id}` | 카테고리 수정 | 50 |
| DELETE | `/api/admin/categories/{id}` | 카테고리 삭제 | 60 |

---

### 12. 분석 (Analytics)
> **Controller:** `analytics/controller/AnalyticsController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| POST | `/api/analytics/track` | 페이지뷰 기록 | 17 |
| GET | `/api/analytics/summary` | 분석 요약 | 31 |
| GET | `/api/analytics/pages` | 페이지별 통계 | 36 |
| GET | `/api/analytics/users` | 사용자 통계 | 41 |
| GET | `/api/analytics/hourly` | 시간대별 통계 | 46 |
| GET | `/api/analytics/recent` | 최근 방문 기록 | 51 |
| GET | `/api/analytics/products` | 상품 조회 통계 | 56 |

---

### 13. 결제 (Payment)
> **Controller:** `payment/TossController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/payment/client-key` | Toss 클라이언트 키 조회 | 18 |
| POST | `/api/payment/confirm` | 결제 승인 | 23 |

---

### 14. 관리자 (Admin)
> **Controller:** `admin/controller/AdminController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/admin/dashboard` | 대시보드 통계 | 24 |
| GET | `/api/admin/members` | 회원 목록 | 31 |
| GET | `/api/admin/members/search?keyword=` | 회원 검색 | 38 |
| PATCH | `/api/admin/members/{id}/ban` | 회원 정지 | 51 |
| PATCH | `/api/admin/members/{id}/grade` | 등급 변경 | 59 |

---

### 15. 파일 (File)
> **Controller:** `common/controller/FileController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/admin/files` | 서버 이미지 파일 목록 | 23 |

---

### 16. 사이트 설정 (Site Settings)
> **Controller:** `settings/controller/SiteSettingController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| GET | `/api/settings/{key}` | 설정값 조회 (공개) | 18 |
| PUT | `/api/admin/settings/{key}` | 설정값 저장 (관리자) | 26 |

**사용중인 key 목록:**
- `hero_slides` — 메인 히어로 슬라이드 이미지
- `brand_settings` — 브랜드 페이지 히어로 이미지/높이/위치
- `magazine` — 매거진 섹션 데이터
- `stories` — 스토리 섹션 데이터
- `store_info` — 매장 정보 (대표, 사업자번호, 연락처)

---

### 17. 사이즈 추천 (Size Recommend)
> **Controller:** `size/controller/SizeRecommendController.java`

| Method | URL | 설명 | Line |
|--------|-----|------|------|
| POST | `/api/size/recommend` | BMI 기반 사이즈 추천 | 18 |

---

## Database Tables (총 15개)

> 모든 엔티티 파일 경로 기준: `backend/src/main/java/com/forme/shop/`

### 1. `member` — 회원
> **Entity:** `member/entity/Member.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| email | String(100) | 이메일 (unique, not null) |
| password | String(255) | BCrypt 암호화 (not null) |
| name | String(50) | 이름 (not null) |
| phone | String(20) | 연락처 |
| address | String(255) | 주소 |
| height | Double | 키 (cm) |
| weight | Double | 몸무게 (kg) |
| fit | String(20) | 선호 핏 (slim/standard/wide) |
| role | String(20) | 권한 (ROLE_USER/ROLE_ADMIN) |
| grade | String(20) | 등급 (BRONZE/SILVER/GOLD/VIP) |
| is_active | Boolean | 활성 여부 (탈퇴 시 false) |
| created_at | DateTime | 가입일 |
| updated_at | DateTime | 수정일 |

**사용처:** 로그인, 회원가입, 마이페이지, 등급할인, 관리자 회원관리

---

### 2. `categories` — 카테고리
> **Entity:** `category/entity/Category.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| name | String(50) | 카테고리명 (not null) |
| description | String(200) | 설명 |
| sort_order | Integer | 정렬 순서 (기본 0) |
| is_active | Boolean | 활성 여부 |
| created_at | DateTime | 등록일 |

**사용처:** 상품 분류, 관리자 카테고리 관리

---

### 3. `products` — 상품
> **Entity:** `product/entity/Product.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| category_id | Long (FK) | 카테고리 |
| name | String(100) | 상품명 (not null) |
| description | TEXT | 상품 설명 |
| price | Integer | 가격 (not null) |
| stock | Integer | 총 재고 |
| image_url | String(500) | 대표 이미지 URL |
| image_urls | String(2000) | 다중 이미지 (콤마 구분) |
| thumbnail_url | String(500) | 썸네일 URL |
| curator_image_url | String(500) | 큐레이터 노출 이미지 |
| color_name | String(50) | 색상명 |
| color_hex | String(10) | 색상 코드 |
| features | TEXT | 특징 (줄바꿈 구분) |
| composition | TEXT | 소재 (줄바꿈 구분) |
| size | String(50) | 레거시 단일 사이즈 |
| gender | String(10) | 성별 (남성/여성/공용) |
| brand | String(50) | 브랜드 |
| discount_rate | Integer | 할인율 (%) |
| original_price | Integer | 할인 전 가격 |
| is_new | Boolean | 신상품 여부 |
| is_best | Boolean | 베스트 여부 |
| is_recommend | Boolean | 추천(큐레이터) 여부 |
| is_active | Boolean | 활성 여부 |
| created_at | DateTime | 등록일 |
| updated_at | DateTime | 수정일 |

**사용처:** 상품 목록/상세, 브랜드 페이지, NEW/BEST/SALE, 큐레이터 섹션, 장바구니, 주문, 리뷰, Q&A

---

### 4. `product_sizes` — 사이즈별 재고
> **Entity:** `product/entity/ProductSize.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| product_id | Long (FK) | 상품 |
| size | String(20) | 사이즈 (S/M/L/XL 등) |
| stock | Integer | 해당 사이즈 재고 |

**사용처:** 상품 상세 사이즈 선택, 재고 관리

---

### 5. `cart_items` — 장바구니
> **Entity:** `cart/entity/Cart.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 회원 |
| product_id | Long (FK) | 상품 |
| quantity | Integer | 수량 (기본 1) |
| size | String(20) | 선택 사이즈 |
| created_at | DateTime | 추가일 |
| updated_at | DateTime | 수정일 |

**제약조건:** UNIQUE(member_id, product_id)
**사용처:** 장바구니 페이지, 슬라이드 패널 장바구니

---

### 6. `wishlists` — 찜
> **Entity:** `wishlist/entity/Wishlist.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 회원 |
| product_id | Long (FK) | 상품 |
| created_at | DateTime | 찜한 날짜 |

**제약조건:** UNIQUE(member_id, product_id)
**사용처:** 찜 목록, 상품 하트 버튼, 마이페이지 찜 탭

---

### 7. `orders` — 주문
> **Entity:** `order/entity/Orders.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 주문 회원 |
| total_price | Integer | 총 결제금액 |
| status | String(30) | 상태 (PENDING/PAID/PREPARING/SHIPPED/DELIVERED/CANCELLED) |
| receiver_name | String(50) | 수령인 |
| receiver_phone | String(20) | 수령인 연락처 |
| address | String | 배송 주소 |
| memo | String(255) | 배송 메모 |
| paid_at | DateTime | 결제일 |
| created_at | DateTime | 주문일 |
| updated_at | DateTime | 수정일 |

**사용처:** 결제 흐름, 마이페이지 주문 내역, 관리자 주문 관리, 등급 자동 업그레이드

---

### 8. `order_items` — 주문 상품
> **Entity:** `order/entity/OrderItem.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| order_id | Long (FK) | 주문 |
| product_id | Long (FK) | 상품 |
| quantity | Integer | 수량 |
| unit_price | Integer | 주문 시점 단가 (할인 적용) |
| size | String(20) | 선택 사이즈 |

**사용처:** 주문 상세, 마이페이지 주문 아이템 표시

---

### 9. `deliveries` — 배송
> **Entity:** `delivery/entity/Delivery.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| order_id | Long (FK, unique) | 주문 (1:1) |
| carrier | String(50) | 택배사 (기본 CJ대한통운) |
| tracking_number | String(50) | 운송장 번호 |
| status | String(30) | 상태 (READY/IN_TRANSIT/OUT_FOR_DELIVERY/DELIVERED) |
| shipped_at | DateTime | 출고일 |
| delivered_at | DateTime | 도착일 |
| created_at | DateTime | 등록일 |
| updated_at | DateTime | 수정일 |

**사용처:** 관리자 주문 상세 배송 관리

---

### 10. `boards` — 게시판
> **Entity:** `board/entity/Board.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 작성자 |
| title | String(200) | 제목 (not null) |
| content | TEXT | 내용 (not null) |
| views | Integer | 조회수 (기본 0) |
| is_active | Boolean | 활성 여부 (soft delete) |
| created_at | DateTime | 작성일 |
| updated_at | DateTime | 수정일 |

**사용처:** 게시판 페이지, 관리자 게시판 관리

---

### 11. `comments` — 댓글
> **Entity:** `board/entity/Comment.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| board_id | Long (FK) | 게시글 |
| member_id | Long (FK) | 작성자 |
| content | TEXT | 내용 (not null) |
| is_active | Boolean | 활성 여부 (soft delete) |
| created_at | DateTime | 작성일 |
| updated_at | DateTime | 수정일 |

**사용처:** 게시글 상세 댓글 영역

---

### 12. `qna` — Q&A
> **Entity:** `qna/entity/Qna.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 작성자 |
| product_id | Long (FK, nullable) | 상품 (상품별 문의 시) |
| answered_by | Long (FK, nullable) | 답변 관리자 |
| title | String(200) | 제목 (not null) |
| content | TEXT | 내용 (not null) |
| answer | TEXT | 관리자 답변 |
| is_secret | Boolean | 비밀글 여부 |
| is_active | Boolean | 활성 여부 (soft delete) |
| status | String(20) | 상태 (PENDING/ANSWERED) |
| answered_at | DateTime | 답변일 |
| created_at | DateTime | 작성일 |
| updated_at | DateTime | 수정일 |

**사용처:** Q&A 페이지, 상품 상세 Q&A 탭, 마이페이지 내 문의, 관리자 Q&A 관리

---

### 13. `reviews` — 리뷰
> **Entity:** `review/entity/Review.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Long (PK) | 자동증가 |
| member_id | Long (FK) | 작성자 |
| product_id | Long (FK) | 상품 |
| order_id | Long (FK, nullable) | 주문 (구매 인증) |
| rating | Integer | 별점 (1~5) |
| content | TEXT | 리뷰 내용 (not null) |
| reply | TEXT | 관리자 답글 |
| replied_at | DateTime | 답글 작성일 |
| is_active | Boolean | 활성 여부 (soft delete) |
| created_at | DateTime | 작성일 |
| updated_at | DateTime | 수정일 |

**제약조건:** UNIQUE(member_id, order_id, product_id)
**사용처:** 상품 상세 리뷰 탭, 마이페이지 내 리뷰, 관리자 리뷰 관리

---

### 14. `page_views` — 페이지뷰 (분석)
> **Entity:** `analytics/entity/PageView.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| id | Integer (PK) | 자동증가 |
| login_id | String(50) | 로그인 ID (비로그인 시 null) |
| page_name | String(100) | 페이지명 (not null) |
| page_path | String(255) | 페이지 경로 (not null) |
| duration | Integer | 체류 시간 (ms) |
| created_at | DateTime | 방문 시각 |

**사용처:** 관리자 분석 대시보드

---

### 15. `site_settings` — 사이트 설정
> **Entity:** `settings/entity/SiteSetting.java`

| 컬럼 | 타입 | 설명 |
|------|------|------|
| setting_key | String(100, PK) | 설정 키 |
| value | TEXT | 설정 값 (JSON) |
| updated_at | DateTime | 수정일 |

**사용처:** 관리자 설정 (히어로, 브랜드, 매거진, 스토리, 매장정보)

---

## 접근 권한 정리

| 구분 | URL 패턴 | 권한 |
|------|----------|------|
| 공개 | `/api/register`, `/api/login` | 누구나 |
| 공개 | `/api/products/**`, `/api/categories/**` | 누구나 |
| 공개 | `/api/boards/**`, `/api/comments/**`, `/api/qna/**` | 누구나 |
| 공개 | `GET /api/settings/**` | 누구나 |
| 공개 | `/api/analytics/track` | 누구나 |
| 공개 | `/api/size/recommend` | 누구나 |
| 로그인 | `/api/members/**`, `/api/cart/**`, `/api/orders/**` | 회원 |
| 로그인 | `/api/reviews/**`, `/api/wishlist/**` | 회원 |
| 관리자 | `/api/admin/**` | ROLE_ADMIN |
