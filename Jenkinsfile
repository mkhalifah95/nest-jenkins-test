/* Requires the Docker Pipeline plugin */
pipeline {
    agent any
    
    stages {      
        stage('Build in Docker') {
            agent {
                docker {
                    image 'node:24.12.0-alpine3.23'
                    args '-u root:root'
                    reuseNode true
                }
            }
            steps {
                timeout(time: 3, unit: 'MINUTES') {
                    sh 'node --version'
                    sh 'npm --version'
                    sh 'ls -la'
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
    }
    post {
        always {
            echo 'This will always run'
        }
        success {
            echo 'This will run only if successful'
        }
        failure {
            echo 'This will run only if failed'
        }
        unstable {
            echo 'This will run only if the run was marked as unstable'
        }
        changed {
            echo 'This will run only if the state of the Pipeline has changed'
            echo 'For example, if the Pipeline was previously failing but is now successful'
        }
    }
}
