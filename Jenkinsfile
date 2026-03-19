pipeline {
    agent any

    tools {
        nodejs "NodeJS_18"   // Jenkins 관리 → Global Tool Configuration에서 등록한 이름
    }

    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG   = "${BUILD_NUMBER}"
        CONTAINER_NAME = "myapp-container"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JeongWooMyeong/my-springboot-react-project.git',
                    credentialsId: 'githuㅜ-token'
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
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Build') {
            steps {
                sh './gradlew clean build'
            }
        }

        stage('Docker Build') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Deploy') {
            steps {
                sh """
                  docker stop ${CONTAINER_NAME} || true
                  docker rm ${CONTAINER_NAME} || true
                  docker run -d --name ${CONTAINER_NAME} -p 8081:8081 ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }
    }

    post {
        always {
            echo "Pipeline finished with status: ${currentBuild.currentResult}"
        }
    }
}
