pipeline {
    agent any
    tools {
        nodejs "NodeJS_22"   // Jenkins 관리 → Global Tool Configuration에서 등록한 이름
    }
    environment {
        DOCKER_IMAGE     = "jeongwoomyeong/myapp"
        DOCKER_TAG  = "${env.BUILD_NUMBER}"
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

        stage('Docker Build & Push') {
            steps {
                    withCredentials([usernamePassword(credentialsId: 'dockerhub-credentials',
                                                      usernameVariable: 'DOCKER_USER',
                                                      passwordVariable: 'DOCKER_PASS')]) {
                        bat "docker login -u %DOCKER_USER% -p %DOCKER_PASS%"
                        bat "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                        bat "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                        bat "docker tag ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_IMAGE}:latest"
                        bat "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
        }


       stage('Deploy to Kubernetes') {
           steps {
               withEnv(["KUBECONFIG=${env.KUBECONFIG}"]) {
                   bat """
                       kubectl set image deployment/myapp-deployment myapp=${DOCKER_IMAGE}:${DOCKER_TAG} --record
                       kubectl rollout status deployment/myapp-deployment
                   """
               }
           }
       }

    }
}