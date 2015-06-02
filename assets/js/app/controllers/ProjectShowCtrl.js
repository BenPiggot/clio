ClioApp.controller('ProjectShowCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', '$routeParams', 'UserService', 'AddStudent',
  function($scope, $rootScope, $modal, AlertService, Project, $routeParams, UserService, AddStudent) {

    console.log('project show control online')

    $scope.UserService = UserService;

    $scope.$watchCollection('UserService', function() {
      $scope.currentUser = UserService.currentUser;
    })

    Project.get({id: $routeParams.id}, function(data) {
      $scope.project = data
    });

  // var buildTimeline = true;

  // if ($scope.project.timeline) {
  //   buildTimeline = false;
  // }

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


  $scope.newProject = function() {
    $modal.open({
      templateUrl: '/views/projects/editProjectModal.html',
      controller: 'EditProjectModalCtrl'
    }).result.then(function(){
    Project.get({id: $routeParams.id}, function(data) {
      console.log(data)
      $scope.project = data
    });
  })
  }

    $scope.newTimeline = function() {

      $modal.open({
        templateUrl: '/views/projects/addTimelineModal.html',
        controller: 'AddTimelineModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data)
        $scope.project = data
      });
      });

  }



}]);