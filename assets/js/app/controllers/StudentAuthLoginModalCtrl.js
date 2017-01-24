ClioApp.controller('StudentAuthLoginModalCtrl', ['$scope', 'StudentUserService', '$modalInstance', '$location', 'AlertService',
              function($scope, StudentUserService, $modalInstance, $location, AlertService) {

// Client-side student login function, sends http request via StudentserService
// service for further handling
  $scope.studentLogin = function() {
    StudentUserService.studentLogin($scope.email, function(err, data) {
      if(err) {
        alert('something horrible happened.');
      } else if (data && data.result) {
        $modalInstance.close();
        $location.path('/projects')

      } else {
        alert('unable to log in')
      }
    });
  }

// Small function that closes modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}])