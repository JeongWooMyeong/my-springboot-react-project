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
        stage('Clean Workspace') {
            steps {
                cleanWs()
            }
        }

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
        stage('Docker Build in Minikube') {
            steps {
                // Minikube Docker 데몬을 바라보도록 설정
                sh 'eval $(minikube docker-env)'
                sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                sh """
                  export DOCKER_IMAGE=${DOCKER_IMAGE}
                  export DOCKER_TAG=${DOCKER_TAG}
                  envsubst < k8s/deployment.yaml | kubectl apply -f -
                  envsubst < k8s/service.yaml | kubectl apply -f -
                """
                sh 'kubectl rollout status deployment/myapp-deployment'
            }
        }




    }
}
