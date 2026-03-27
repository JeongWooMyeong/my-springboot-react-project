pipeline {
    agent any
    tools {
        nodejs "NodeJS_22"   // Jenkins 관리 → Global Tool Configuration에서 등록한 이름
    }
    environment {
        DOCKER_IMAGE = "myapp"
        DOCKER_TAG   = "${env.BUILD_NUMBER}"
        CONTAINER_NAME = "myapp-container"
        KUBECONFIG = "C:\\Users\\jwm90\\.kube\\config"
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

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                }
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
                // Jenkins 호스트(쿠버네티스 노드)에 로컬 이미지 빌드
                bat "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Load Image to Node') {
            steps {
                // 필요하다면 tar로 저장 후 로드 (멀티 노드 환경이면 각 노드에 배포 필요)
                bat "docker save ${DOCKER_IMAGE}:latest -o ${DOCKER_IMAGE}.tar"
                bat "docker load -i ${DOCKER_IMAGE}.tar"
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withEnv(["KUBECONFIG=${env.KUBECONFIG}"]) {
                   bat """
                     kubectl apply -f k8s\\service.yaml
                     kubectl apply -f k8s\\deployment.yaml
                     kubectl rollout status deployment/myapp-deployment
                   """
                }
            }
        }
    }
}