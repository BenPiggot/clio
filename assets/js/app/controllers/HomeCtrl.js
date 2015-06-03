ClioApp.controller('HomeCtrl',['$scope','$rootScope','$modal', 'UserService', 'AlertService',
     function($scope, $rootScope, $modal, UserService, AlertService) {

 console.log('home controller loaded')

 $scope.UserService = UserService;



  $scope.showLogin = function() {
    $modal.open({
      templateUrl: '/views/auth/loginModal.html',
      controller: 'AuthLoginModalCtrl'
    })
  }

  $scope.showSignup = function() {
    console.log('sign up modal firing')
    $modal.open({
      templateUrl: '/views/user/SignupModal.html',
      controller: 'SignupModalCtrl'
    }).result.then(function(data) {
      console.log(data)
      AlertService.add('success', 'Welcome to Clio! Please login.')
    })
  }

  $scope.logout = function() {
    UserService.logout(function(err, data){

    })
  }

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


}])