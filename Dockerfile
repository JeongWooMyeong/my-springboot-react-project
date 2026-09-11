# =========================
# 1. Frontend Build
# =========================
FROM node:20 AS frontend

WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ .
RUN npm run build


# =========================
# 2. Backend Build
# =========================
FROM gradle:8.5-jdk21 AS build

WORKDIR /app

# Gradle wrapper 및 설정 먼저 복사
COPY gradlew .
COPY gradle ./gradle
COPY build.gradle .
COPY settings.gradle .

# Gradle 의존성 캐시
RUN ./gradlew dependencies --no-daemon

# 소스 복사
COPY . .

# React build 결과를 Spring static으로 복사
COPY --from=frontend /app/frontend/dist /app/src/main/resources/static

# Spring Boot 빌드
RUN ./gradlew bootJar -x test --no-daemon


# =========================
# 3. Runtime
# =========================
FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/build/libs/*.jar app.jar

ENTRYPOINT ["java", "-jar", "app.jar"]