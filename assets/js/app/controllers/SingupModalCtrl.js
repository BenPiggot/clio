ClioApp.controller('SignupModalCtrl', ['$scope', 'UserService', '$modalInstance', '$location', 'AlertService', 'AddUser',
  function($scope, UserService, $modalInstance, $location, AlertService, AddUser) {


// http post request creating a new user
  $scope.signup = function() {
    var user = new AddUser();
    user.firstName = $scope.firstName;
    user.lastName = $scope.lastName;
    user.email = $scope.email;
    user.password = $scope.password;
    user.$save()
    $modalInstance.close();
    AlertService.add('success', 'Welcome to Clio! Please login as an instructor.');
  }


// Small function that closes modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
