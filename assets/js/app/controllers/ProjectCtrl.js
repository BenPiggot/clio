ClioApp.controller('ProjectCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', 'UserService', '$location',
  function($scope, $rootScope, $modal, AlertService, Project, UserService, $location) {

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })



  // if(!UserService.currentUser){
  //   $location.path('/');
  // }

  $scope.projects = [];

  $scope.newProject = function() {
    $modal.open({
      templateUrl: '/views/projects/createProjectModal.html',
      controller: 'CreateProjectModalCtrl'
    }).result.then(function(){
    $scope.loadProjects();
    })
  }

  $scope.loadProjects = function() {
    console.log('load posts working')
    Project.query({userId: UserService.currentUser.id},function(data) {
      AlertService.clear()
      $scope.projects = data;
    })
  }


  $scope.loadProjects();

}])