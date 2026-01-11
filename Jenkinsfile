/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build in Docker') {
            agent {
                docker {
                    image 'node:24.12.0-alpine3.23'
                    args '-u root:root'
                    reuseNode true
                }
            }
            steps {
                sh 'node --version'
                sh 'npm --version'
                sh 'ls -la'
            }
        }
        
        stage('Check Docker') {
            steps {
                sh 'docker version'
                sh 'echo "Docker daemon is reachable via socket"'
            }
        }
    }
}
