pipeline {
  agent any 
  stages {    
    stage("run frontend") {    
      steps {
          echo "executing node app..."
          nodejs('NodeJS'){
            sh 'npm install'
          }
      }
    }  
  }
}
