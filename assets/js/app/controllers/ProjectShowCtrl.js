ClioApp.controller('ProjectShowCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', '$routeParams', 'UserService', 'StudentUserService', 'AddStudent', '$location', 'EditStudent',
  function($scope, $rootScope, $modal, AlertService, Project, $routeParams, UserService, StudentUserService, AddStudent, $location, EditStudent) {

// UserService and StudentUserService loaded into scope to watch for user/student user login
  $scope.UserService = UserService;

  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


// http get request that loads current project via Project service
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  });


// Conditional statement to reroute unauthorized users to homepage
  if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }


// Function opening modal that allows logged-in instructors (only) to create
// a new student associated with the current project;
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


// Function that allows logged-in instructors to remove students from the
// current project.
  $scope.deleteStudent = function(studentId) {
    if (UserService.currentUser){
      if (confirm("Are you sure you want to remove this student?")) {
        EditStudent.delete({id: studentId}, function(data) {
          AlertService.add('info', 'Student removed')
          Project.get({id: $routeParams.id}, function(data) {
            $scope.project = data
          });
        })
      }
    } else {
      AlertService.add('danger', 'You cannot edit the student list.')
    }
  }


// Function that opens modal allowing logged-in instructors to edit current studnet information;
// This funcitonality has not yet been implemented.
  $scope.editStudent = function() {
    $modal.open({
      templateUrl: '/views/projects/editStudentModal.html',
      controller: 'EditStudentModalCtrl'
    })
    console.log('create modal firing')
  }


// Function opening modal allowing logged-in users to edit current project details;
// Callback then re-renders the view with updated project infomration.
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


// Function opening modal allowing both students and instructors to create a new timeline
// associated with the project
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


// Client-side logout function for instructors
 $scope.logout = function() {
    UserService.logout(function(err, data){
      $location.path('/')
    })
  }


// Client-side logout function for students
 $scope.studentLogout = function() {
    StudentUserService.studentLogout(function(err, data){
      $location.path('/')
    })
  }


// Function that opens log-in modal; no longer utilized on this page, but might be
// be used again in this view as project develops.
 $scope.showLogin = function() {
    $modal.open({
      templateUrl: '/views/auth/loginModal.html',
      controller: 'AuthLoginModalCtrl'
    })
  }



}]);