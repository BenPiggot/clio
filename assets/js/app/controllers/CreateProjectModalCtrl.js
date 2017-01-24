ClioApp.controller('CreateProjectModalCtrl', ['$scope', 'UserService', '$modalInstance', 'Project', '$location',
  function($scope, UserService, $modalInstance, Project, $location) {

// http post request that adds new project with user specifications to database via AddTimeline service
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


// Small function that closes modal
 $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])

