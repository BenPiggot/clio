ClioApp.controller('EditStudentModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddStudent','$routeParams',
  function($scope, UserService, $modalInstance, Student, $routeParams) {


// http get request using Project service, renders all user projects
  Student.get({id: $routeParams.id}, function(data) {
    $scope.post = data
  })


// http put request for updating student information made via Project service;
// Only logged-in instructors are allowed to update this information.
  $scope.editStudent = function() {
      AddStudent.update({id: $scope.student.id},
        {firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email},
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