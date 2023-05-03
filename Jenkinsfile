pipeline {

  agent any
  parameters {
    choice(name: 'VERSION', choices: ['1.1.0', '1.2.0', '1.3.0'], description: 'The first version')
    booleanParam(name: 'executeTests', defaultValue: true, description: 'executing test')
  }
  stages {
    stage("init") {
      steps {
          script {
            gv = load "script.grooovy"
          }
      }
    }
    stage("build") {
      steps {
          script {
            gv.buildApp()
          }
      }
    }
    
    stage("test") {
      when {
        expression {
          params.executeTests
        }
      }
      steps {
          script {
            gv.testApp()
          }
      }
    }
    
    stage("deploy") {
      
      steps {
          script {
            gv.deployApp()
          }
      }
    }
  }
}
