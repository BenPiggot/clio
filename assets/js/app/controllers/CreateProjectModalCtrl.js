ClioApp.controller('CreateProjectModalCtrl', ['$scope', 'UserService', '$modalInstance', 'Project', '$location',
  function($scope, UserService, $modalInstance, Project, $location) {

    console.log(UserService.currentUser)
  $scope.createProject = function() {

     var project = new Project();
     project.name = $scope.name;
     project.description = $scope.description;
     project.medium = $scope.medium;
     project.userId = UserService.currentUser.id
     project.$save(function(data){
        $modalInstance.close();
      });

  }

 $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])

