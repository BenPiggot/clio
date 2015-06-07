ClioApp.controller('ProjectShowCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', '$routeParams', 'UserService', 'StudentUserService', 'AddStudent', '$location', 'EditStudent',
  function($scope, $rootScope, $modal, AlertService, Project, $routeParams, UserService, StudentUserService, AddStudent, $location, EditStudent) {


    $scope.UserService = UserService;

    $scope.StudentUserService = StudentUserService
    console.log(StudentUserService.currentStudentUser)
    $scope.$watchCollection('StudentUserService', function() {
      $scope.currentStudentUser = StudentUserService.currentStudentUser;
    })

    $scope.$watchCollection('UserService', function() {
      $scope.currentUser = UserService.currentUser;
    })


    Project.get({id: $routeParams.id}, function(data) {
      $scope.project = data
    });

  if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }

  $scope.newStudent = function() {
    if (UserService.currentUser) {
      $modal.open({
        templateUrl: '/views/projects/addStudentModal.html',
        controller: 'AddStudentModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data)
        $scope.project = data
      });
      });
    }
    else {
      AlertService.add('danger', 'You cannot add a new student.')
    }
  }


  $scope.deleteStudent = function(studentId) {
    if (UserService.currentUser){
      if (confirm("Are you sure you want to remove this student?")) {
        EditStudent.delete({id: studentId}, function(data) {
          console.log(data)
          AlertService.add('info', 'Student removed')
        })
      }
    } else {
      AlertService.add('danger', 'You cannot edit the student list.')
    }
  }

  $scope.editStudent = function() {
    $modal.open({
      templateUrl: '/views/projects/editStudentModal.html',
      controller: 'EditStudentModalCtrl'
    })
    console.log('create modal firing')
  }


  $scope.newProject = function() {
   if (UserService.currentUser) {
    $modal.open({
      templateUrl: '/views/projects/editProjectModal.html',
      controller: 'EditProjectModalCtrl'
    }).result.then(function(){
    Project.get({id: $routeParams.id}, function(data) {
      console.log(data)
      $scope.project = data
    });
  })
  } else {
    AlertService.add('danger', 'You cannot edit this project.')
  }
  }


  $scope.newTimeline = function() {
    if (UserService.currentUser) {
      $modal.open({
        templateUrl: '/views/projects/addTimelineModal.html',
        controller: 'AddTimelineModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data)
        $scope.project = data
      });
      });
    } else {
      AlertService.add('danger', 'You cannot add a timeline for this project.')
    }
  }

 $scope.logout = function() {
    UserService.logout(function(err, data){
      $location.path('/')
    })
  }

 $scope.studentLogout = function() {
    StudentUserService.studentLogout(function(err, data){
      $location.path('/')
    })
  }

 $scope.showLogin = function() {
    $modal.open({
      templateUrl: '/views/auth/loginModal.html',
      controller: 'AuthLoginModalCtrl'
    })
  }



}]);