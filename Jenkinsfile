pipeline {
    agent any
    tools {
        nodejs "NodeJS_22"   // Jenkins 관리 → Global Tool Configuration에서 등록한 이름
    }
    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG   = "${BUILD_NUMBER}"
        CONTAINER_NAME = "myapp-container"
        KUBECONFIG = "C:\\Users\\jenkins\\.kube\\config"
    }

    stages {
        stage('Clean Workspace') {
            steps { cleanWs() }
        }

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JeongWooMyeong/my-springboot-react-project.git',
                    credentialsId: 'github-token'
                bat 'git clean -fdx'
            }
        }

        stage('Build') {
            steps {
                // React 프론트엔드 빌드가 gradle task 안에 포함되어 있다면 gradlew.bat만 실행하면 됨
                bat 'gradlew.bat clean build'
            }
        }

        stage('Docker Build') {
            steps {
                bat "docker build -t %DOCKER_IMAGE%:%DOCKER_TAG% ."
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                bat """
                  set DOCKER_IMAGE=%DOCKER_IMAGE%
                  set DOCKER_TAG=%DOCKER_TAG%
                  kubectl apply -f k8s\\deployment.yaml
                  kubectl apply -f k8s\\service.yaml
                """
                bat 'kubectl rollout status deployment/myapp-deployment'
            }
        }
    }
}