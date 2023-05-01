pipeline {
  agent any 
  stages {    
    stage("remove installed node modules") {    
      steps {
          echo 'removing node modules...'
          nodejs('NodeJS') {
            sh 'rm -r node_modules'
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
