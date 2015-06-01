ClioApp.controller('ProjectCtrl',['$scope','$rootScope','$modal','AlertService', 'Project',
  function($scope, $rootScope, $modal, AlertService, Project) {

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
    Project.query(function(data) {
      AlertService.clear()
      $scope.projects = data;
    })
  }

  $scope.loadProjects();

}])