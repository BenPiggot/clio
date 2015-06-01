ClioApp.controller('AddStudentModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddStudent', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddStudent, Project, $routeParams) {

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

    $scope.addStudent = function() {
      console.log('awesome')
      var student = new AddStudent()
      student.firstName = $scope.firstName;
      student.lastName = $scope.lastName;
      student.email = $scope.email;
      student.$save({projectId: $scope.project.id}, function(data) {
        console.log('student added')
        $scope.project = data;
        $scope.firstName = "";
        $scope.lastName = "";
        $scope.email = "";
        $modalInstance.close();
      })
    }

}]);

