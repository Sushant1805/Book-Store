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

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat "docker build -t %DOCKER_HUB_REPO%:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(
                    credentialsId: 'dockerhub-creds',
                    usernameVariable: 'DOCKER_USER',
                    passwordVariable: 'DOCKER_PASS'
                )]) {
                    bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
                    bat "docker push %DOCKER_HUB_REPO%:latest"
                }
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                bat '''
                if exist aws.pem del aws.pem
                copy "%AWS_KEY%" aws.pem
                '''

                bat """
                "C:\\Program Files\\Git\\usr\\bin\\ssh.exe" -o StrictHostKeyChecking=no -i aws.pem %AWS_HOST% "docker pull %DOCKER_HUB_REPO%:latest && docker stop reactapp || true && docker rm reactapp || true && docker run -d --name reactapp -p 80:80 %DOCKER_HUB_REPO%:latest"
                """
            }
        }
    }

    post {
        success { echo '✔ Deployment Success!' }
        failure { echo '❌ Pipeline Failed!' }
    }
}
