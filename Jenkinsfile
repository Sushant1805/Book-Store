pipeline { 
    agent any 
 
    environment { 
        DOCKER_HUB_REPO = 'sushant1805/cnd-repo'
        AWS_HOST = 'ec2-user@13.211.240.134'
        AWS_KEY = credentials('aws-key')   // Secret file path on Windows
    } 
 
    stages { 
 
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Sushant1805/Book-Store.git'
            }
        }

        stage('Build') { 
            steps { 
                echo 'Building the project...'
                bat 'mvn clean compile'
            } 
        } 
 
        stage('Test') { 
            steps { 
                echo 'Running test cases...'
                bat 'mvn test'
            } 
        } 
 
        stage('Package') { 
            steps { 
                echo 'Packaging the build...'
                bat 'mvn package -DskipTests'
            } 
        } 
 
        stage('Build Docker Image') { 
            steps { 
                echo 'Building Docker image...'
                bat "docker build -t %DOCKER_HUB_REPO%:latest ."
            } 
        } 
 
        stage('Push to Docker Hub') { 
            steps { 
                echo 'Pushing Docker image to Docker Hub...'
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
                echo 'Deploying container to EC2...'

                // Save PEM key to temp location because Windows cannot use it directly
                bat '''
                if exist aws.pem del aws.pem
                copy "%AWS_KEY%" aws.pem
                '''

                // Use Windows ssh from Git Bash installation
                bat """
                "C:\\Program Files\\Git\\usr\\bin\\ssh.exe" -o StrictHostKeyChecking=no -i aws.pem %AWS_HOST% "docker pull %DOCKER_HUB_REPO%:latest && docker stop myapp || true && docker rm myapp || true && docker run -d --name myapp -p 80:80 %DOCKER_HUB_REPO%:latest"
                """
            } 
        } 
    } 
 
    post { 
        success { echo '✅ Deployment successful!' }
        failure { echo '❌ Pipeline failed!' }
    } 
}
