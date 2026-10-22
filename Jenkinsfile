
pipeline {
    agent any

    options {
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Source code checked out by Jenkins SCM'
            }
        }

        stage('Validate Compose') {
            steps {
                sh 'docker compose config --quiet'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Verify Images') {
            steps {
                sh 'docker images'
            }
        }
    }

    post {
        success {
            echo 'Portfolio Docker images built successfully!'
        }
        failure {
            echo 'Pipeline failed. Check the console output.'
        }
    }
}
