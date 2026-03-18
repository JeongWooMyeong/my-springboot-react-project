pipeline {
    agent any
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
        stage('Build') {
            steps {
                // Gradle 빌드 실행 (백엔드 + 프론트엔드 포함)
                sh './gradlew clean build'
            }
        }
    }
}
