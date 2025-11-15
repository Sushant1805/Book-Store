pipeline { 
    agent any 
 
    environment { 
        DOCKER_HUB_REPO = 'your_dockerhub_username/your_app' 
        AWS_HOST = 'ec2-user@<YOUR_EC2_PUBLIC_IP>' 
        AWS_KEY = credentials('aws-key') // SSH key added in Jenkins 
    } 
 
    stages { 
 
        stage('Checkout') { 
            steps { 
                git 'https://github.com/your-username/your-repo.git' 
            } 
        } 
 
        stage('Build') { 
            steps { 
                echo 'Building the project...' 
                sh 'mvn clean compile' // For Maven 
                // bat 'npm install' // For Node.js projects 
            } 
        } 
 
        stage('Test') { 
            steps { 
                echo 'Running test cases...' 
                sh 'mvn test' // Or use npm test 
            } 
        } 
 
        stage('Package') { 
            steps { 
                echo 'Packaging the build...' 
                sh 'mvn package -DskipTests' // Produces JAR/WAR 
            } 
        } 
 
        stage('Build Docker Image') { 
            steps { 
                echo 'Building Docker image...' 
                script { 
                    sh "docker build -t ${DOCKER_HUB_REPO}:latest ." 
                } 
            } 
        } 
 
        stage('Push to Docker Hub') { 
            steps { 
                echo 'Pushing Docker image to Docker Hub...' 
                withCredentials([usernamePassword(credentialsId: 'dockerhub-creds', 
usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) { 
                    sh "echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin" 
                    sh "docker push ${DOCKER_HUB_REPO}:latest" 
                } 
            } 
        } 
 
        stage('Deploy to AWS EC2') { 
            steps { 
                echo 'Deploying container to EC2...' 
                script { 
                    sh """ 
                    ssh -o StrictHostKeyChecking=no -i ${AWS_KEY} ${AWS_HOST} ' 
                    docker pull ${DOCKER_HUB_REPO}:latest && 
                    docker stop myapp || true && 
                    docker rm myapp || true && 
                    docker run -d --name myapp -p 80:80 ${DOCKER_HUB_REPO}:latest 
                    ' 
                    """ 
                } 
            } 
        } 
    } 
 
    post { 
        success { 
            echo '✅ Deployment successful!' 
        } 
        failure { 
            echo '❌ Pipeline failed!' 
        } 
    } 
}
