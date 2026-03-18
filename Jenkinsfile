pipeline {
    agent any
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/JeongWooMyeong/my-springboot-react-project.git',
                    credentialsId: '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'
            }
        }
        stage('Backend Build') {
            steps {
                sh './mvnw clean package'
            }
        }
        stage('Frontend Build') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
    }
}