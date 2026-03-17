# 1단계: 프론트엔드 빌드
FROM node:20 AS frontend
WORKDIR /app/frontend
COPY frontend/ .
RUN npm install && npm run build

# 2단계: 백엔드 빌드
FROM gradle:8.5-jdk21 AS build
WORKDIR /app
COPY . .

RUN chmod +x gradlew

# 프론트 결과 복사
COPY --from=frontend /app/frontend/build /app/src/main/resources/static

# frontend task skip
RUN ./gradlew clean bootJar -x buildFrontend --no-daemon

# 3단계: 실행
FROM eclipse-temurin:21-jdk
WORKDIR /app
COPY --from=build /app/build/libs/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]