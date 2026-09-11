pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "jeongwoomyeong/myapp"
        DOCKER_TAG   = "${env.BUILD_NUMBER}"
        KUBECONFIG   = "C:\\Users\\jwm90\\.kube\\config"
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JeongWooMyeong/my-springboot-react-project.git',
                    credentialsId: 'github-token'
            }
        }

        stage('Docker Build & Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-crendentials',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} .
                        docker push ${DOCKER_IMAGE}:${DOCKER_TAG}
                    """
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                withEnv(["KUBECONFIG=${env.KUBECONFIG}"]) {
                    bat """
                        kubectl apply -f C:\\Project\\SpringBootProject\\k8s\\deployment.yaml
                        kubectl set image deployment/myapp-deployment myapp=${DOCKER_IMAGE}:${DOCKER_TAG}
                        kubectl rollout status deployment/myapp-deployment
                    """
                }
            }
        }
    }
}
