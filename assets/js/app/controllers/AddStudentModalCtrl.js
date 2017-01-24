ClioApp.controller('AddStudentModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddStudent', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddStudent, Project, $routeParams) {

// http get request using Project service, renders all user projects
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

// http post request that adds new studetn to database via AddStudent service
  $scope.addStudent = function() {
    var student = new AddStudent()
    student.firstName = $scope.firstName;
    student.lastName = $scope.lastName;
    student.email = $scope.email;
    student.$save({projectId: $scope.project.id}, function(data) {
      $scope.project = data;
      $modalInstance.close();
    });
  }

// Small function that closes modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);

