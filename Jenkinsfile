pipeline {
  agent any 
  stages {    
    stage("remove installed node modules") {    
      steps {
          echo 'removing node modules...'
          nodejs('NodeJS') {
            sh 'rm -rf node_modules'
            sh 'rm -f package-lock.json'
            sh 'rm -f yarn.lock'
            sh 'npm cache clean --force'
          }
      }
    } 
    stage("run frontend") {    
      steps {
          echo 'executing node app...'
          nodejs('NodeJS') {
            sh 'npm install'
          }
      }
    }  
  }
}
