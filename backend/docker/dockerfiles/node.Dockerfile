FROM node:10

# 앱 디렉터리 생성
WORKDIR /usr/src/app

# 의존성 설치
COPY package.json ./
COPY yarn.lock ./

COPY .env ./

RUN yarn install
