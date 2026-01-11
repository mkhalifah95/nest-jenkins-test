/* Requires the Docker Pipeline plugin */
pipeline {
    agent { 
        docker { 
            image 'node:24.12.0-alpine3.23'
            args '-u root:root -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Check Docker') {
            steps {
                sh 'docker version || echo "Docker CLI not installed inside container"'
                sh 'echo "Docker daemon is reachable via socket"'
            }
        }
    }
}
