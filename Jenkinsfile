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
                powershell '''
                Write-Host "🐳 Minikube Docker 환경 설정"
                & minikube -p minikube docker-env --shell powershell | Invoke-Expression

                Write-Host "🏗 Docker 이미지 빌드"
                docker build -t myapp:latest .

                Write-Host "📦 빌드된 이미지 확인"
                docker images | Where-Object {$_.Repository -eq "${env.DOCKER_IMAGE}"}
                '''
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                powershell '''
                $env:DOCKER_IMAGE="${env.DOCKER_IMAGE}"
                $env:DOCKER_TAG="${env.DOCKER_TAG}"

                Write-Host "🚀 Deployment 적용"
                envsubst < k8s/deployment.yaml | kubectl apply -f -
                envsubst < k8s/service.yaml | kubectl apply -f -

                Write-Host "📈 Rollout 상태 확인"
                kubectl rollout status deployment/myapp-deployment
                '''
            }
        }
    }
}
