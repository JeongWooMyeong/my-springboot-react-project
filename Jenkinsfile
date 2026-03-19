pipeline {
    agent any
    tools {
            nodejs "NodeJS_18"   // Jenkins 관리 → Global Tool Configuration에서 등록한 이름
        }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JeongWooMyeong/my-springboot-react-project.git',
                    credentialsId: 'githun-token'
                sh 'git clean -fdx'
            }
        }
        stage('Grant Permission') {
            steps {
                sh 'chmod +x gradlew'
            }
        }
        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    // CI 환경에서는 npm ci 권장
                    // 임시: npm install
                    // 장기적으로는 package-lock.json 정리 후 npm ci
                    sh 'npm install'

                }
            }
        }
        stage('Build') {
            steps {
                // Gradle 빌드 실행 (백엔드 + 프론트엔드 포함)
                sh './gradlew clean build'
            }
        }
        stage('Docker Build') {
            steps {
                // Docker 이미지 빌드
                sh 'docker build -t myapp:${BUILD_NUMBER} .'
            }
        }
        stage('Deploy') {
            steps {
                // 기존 컨테이너 종료 후 새 컨테이너 실행
                sh '''
                  docker stop myapp-container || true
                  docker rm myapp-container || true
                  docker run -d --name myapp-container -p 8081:8081 myapp:${BUILD_NUMBER}
                '''
            }
        }

    }
}
