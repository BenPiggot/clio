ClioApp.controller('EditProjectModalCtrl', ['$scope', 'UserService', '$modalInstance', 'Project','$routeParams',
  function($scope, UserService, $modalInstance, Project, $routeParams) {

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

  $scope.editProject = function() {
      Project.update({id: $scope.project.id},
        {name: $scope.name,
        description: $scope.description},
        function(data){
      console.log('updated',data);
        $modalInstance.close();
    });
  }


}])