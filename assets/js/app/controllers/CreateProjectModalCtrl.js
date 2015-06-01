ClioApp.controller('CreateProjectModalCtrl', ['$scope', 'UserService', '$modalInstance', 'Project', '$location',
  function($scope, UserService, $modalInstance, Project, $location) {


  $scope.createProject = function() {

     var project = new Project();
     project.name = $scope.name;
     project.description = $scope.description;
     project.$save(function(data){
        $modalInstance.close();
      });

  }


}])

