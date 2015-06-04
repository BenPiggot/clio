ClioApp.controller('EditStudentModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddStudent','$routeParams',
  function($scope, UserService, $modalInstance, Student, $routeParams) {

  console.log($routeParams)

  Student.get({id: $routeParams.id}, function(data) {
    $scope.post = data
  })

  $scope.editStudent = function() {
      Post.update({id: $scope.student.id},
        {firstName: $scope.firstName,
        lastName: $scope.lastName,
        email: $scope.email},
        function(data){
      console.log('updated',data);
        $modalInstance.close();
    });
  }

 $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])