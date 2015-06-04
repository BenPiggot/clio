ClioApp.controller('AuthLoginModalCtrl', ['$scope', 'UserService', '$modalInstance', '$location', 'AlertService',
              function($scope, UserService, $modalInstance, $location, AlertService) {

  $scope.login = function() {
    // console.log(UserService)
    // alert('you want to login with ' + $scope.email + ' : ' +$scope.password)
    UserService.login($scope.email, $scope.password, function(err, data) {
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