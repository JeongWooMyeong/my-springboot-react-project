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
                    sh 'npm ci'
                }
            }
        }
        stage('Build') {
            steps {
                // Gradle 빌드 실행 (백엔드 + 프론트엔드 포함)
                sh './gradlew clean build'
            }
        }
    }
}
