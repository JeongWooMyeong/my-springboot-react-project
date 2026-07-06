# 1단계: 프론트엔드 빌드
FROM node:20 AS frontend
WORKDIR /app/frontend

# 의존성 캐시 활용
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ .
RUN npm run build

# 2단계: 백엔드 빌드
FROM gradle:8.5-jdk21 AS build
WORKDIR /app

# Gradle 캐시 활용
COPY build.gradle settings.gradle gradlew ./
COPY gradle ./gradle
RUN ./gradlew build -x test --no-daemon || true

# 소스 복사
COPY . .

# 프론트 결과 복사
COPY --from=frontend /app/frontend/dist /app/src/main/resources/static

# clean 제거 → 증분 빌드 가능
RUN ./gradlew bootJar -x buildFrontend --no-daemon

# 3단계: 실행
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]
