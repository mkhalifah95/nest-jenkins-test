/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    
    stages {
        stage('Checkout') {
            steps {
                cleanWs()
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
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}
