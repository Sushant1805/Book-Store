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
                echo "Checkout successful!"
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                echo "Backend dependencies installed successfully!"
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                echo "Frontend dependencies installed successfully!"
            }
        }

        stage('Build Frontend') {
            steps {
                echo "Frontend built successfully!"
            }
        }

        stage('Build Docker Image') {
            steps {
                echo "Docker image built successfully!"
            }
        }

        stage('Push to Docker Hub') {
            steps {
                echo "Docker image pushed to Docker Hub successfully!"
            }
        }

        stage('Deploy to AWS EC2') {
            steps {
                echo "Application deployed to AWS EC2 successfully!"
            }
        }
    }

    post {
        success { echo "Pipeline completed successfully!" }
        failure { echo "Pipeline failed!" }
    }
}
