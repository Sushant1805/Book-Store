pipeline {
    agent any

    environment {
        DOCKER_HUB_REPO = 'sushant1805/cnd-repo'
        AWS_HOST = 'ec2-user@13.211.240.134'
        AWS_KEY = credentials('aws-key')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sushant1805/Book-Store.git'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    bat 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend/frontend') {
                    bat 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend/frontend') {
                    bat 'npm run build'
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                bat """
                    docker build -t %DOCKER_HUB_REPO%:latest .
                """
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat """
                        docker login -u %DOCKER_USER% -p %DOCKER_PASS%
                        docker push %DOCKER_HUB_REPO%:latest
                    """
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                sh """
                ssh -o StrictHostKeyChecking=no -i ${AWS_KEY} ${AWS_HOST} '
                    docker pull ${DOCKER_HUB_REPO}:latest &&
                    docker stop myapp || true &&
                    docker rm myapp || true &&
                    docker run -d --name myapp -p 80:3000 ${DOCKER_HUB_REPO}:latest
                '
                """
            }
        }
    }

    post {
        success { echo "Deployment successful!" }
        failure { echo "Pipeline failed!" }
    }
}
