ClioApp.controller('AuthLoginModalCtrl', ['$scope', 'UserService', '$modalInstance', '$location', 'AlertService',
              function($scope, UserService, $modalInstance, $location, AlertService) {

// Client-side login function, sends http request via UserService service for further handling
  $scope.login = function() {
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

// Small function that closes modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])