ClioApp.controller('EditProjectModalCtrl', ['$scope', 'UserService', '$modalInstance', 'Project','$routeParams',
  function($scope, UserService, $modalInstance, Project, $routeParams) {


// http get request using Project service, renders all user projects
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })


// http put request for updating project information made via Project service;
// Only logged-in instructors are allowed to update this information.
  $scope.editProject = function() {
      Project.update({id: $scope.project.id},
        {name: $scope.name,
        description: $scope.description},
        function(data){
      console.log('updated',data);
        $modalInstance.close();
    });
  }


// Small function that closes modal
 $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])