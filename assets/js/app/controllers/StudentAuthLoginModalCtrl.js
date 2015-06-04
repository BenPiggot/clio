ClioApp.controller('StudentAuthLoginModalCtrl', ['$scope', 'StudentUserService', '$modalInstance', '$location', 'AlertService',
              function($scope, StudentUserService, $modalInstance, $location, AlertService) {

  $scope.studentLogin = function() {
    console.log(StudentUserService)
    // alert('you want to login with ' + $scope.email + ' : ' +$scope.password)
    StudentUserService.studentLogin($scope.email, function(err, data) {
      if(err) {
        console.log(err)
        alert('something horrible happened.');
      } else if (data && data.result) {
        $modalInstance.close();
        $location.path('/projects')

      } else {
        console.log(data)
        alert('unable to log in')
      }
    })
  }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])