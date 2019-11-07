🙋‍♀️ 🙋‍♂️  바글바글 (Sli.do clone project): 실시간 질의응답 및 투표 공유 서비스

# 참여자 
* 권혁 
* 김근영
* 김유준
* 홍태의

# 아이디어 기획서
## 팀원 (가나다순)
- 권혁
- 김근영
- 김유준
- 홍태의
## 사용자 집단
-	컨퍼런스/세미나/수업 참가자 및 운영자

## 기획 배경 및 필요성
-	수업, 강연, 토론 중 실시간 질의응답 및 투표를 통한 청중의 능동적 참여를 유도함
-	완벽한 한글화 지원 ⇒ 이용자 연령층 확대 (중장년/아동)
-	Front-end, back-end가 적절하게 배분, 4명이 도전적으로 개발할 만한 분량

## 기능 목록
-	3가지 기능(Q&A / Live poll / Analytics), 3가지 모드(Admin / Host / Guest)
-	Q&A(질문하기): 실시간 질문을 할 수 있고, 좋아요를 누를 수 있는 화면
-	Live poll(실시간 투표): 쉽게 사용할 수 있도록 설계 (O/X투표, 별점주기, N지선다형 퀴즈 등)
-	Analytics(통계/보고서): 유료기능을 무료로 지원함 (포맷: excel)

## 도전적 기능
-	질문에 댓글 기능을 추가함
- Realtime & Robust: 실시간 질문 공유, 실시간 투표 및 안정적 서버/클라이언트 동작
-	Localization: 한국인에게 친숙한 UI 개발 (카톡의 투표 UI, 다양한 한글폰트 추가 등)
-	Mobile first: Guest 모드는 스마트폰에 최적화된 UI 개발, 최적화 작업 진행
-	Emoji 적용
-	기타: infinite scroll, D3 library를 이용한 analytics, lighthouse 성능 개선

## 기술 스택
-	Front-end: React, Apollo, D3js, (Websocket/Polling)
-	Back-end: Nginx, nodejs, MySQL2, Sequelize, GraphQL(Yoga), Oauth
-	Deployment: Docker
-	Env: Eslint, babel, webpack, prettier, yarn, github을 충실하게 사용함

