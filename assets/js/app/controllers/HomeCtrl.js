ClioApp.controller('HomeCtrl',['$scope','$rootScope','$modal', 'UserService', 'StudentUserService', 'AlertService',
     function($scope, $rootScope, $modal, UserService, StudentUserService, AlertService) {

 console.log('home controller loaded')

 $scope.UserService = UserService;

var imageArray = [

  "https://static.awm.gov.au/images/collection/items/ACCNUM_SCREEN/EKN/67/0130/VN.JPG",
  "http://citelighter-cards.s3.amazonaws.com/p179jerr2r1c2b19so8hjc2q1ev80_18242.jpg",
  "https://globalizingmexico.files.wordpress.com/2012/03/revsoldiers1.jpg",
  "http://i.ytimg.com/vi/5110UES-QzE/maxresdefault.jpg",
  "http://api.ning.com/files/M8fY2*UDgJxVQ8f9mwuu1gGQ*lGlKRlJHZBllmDgmrrQgaLv5rEtvjcGc51ZBlOBuPm4cRlmdN7fOmxNoczE8RPsh1CIKUBl/cheguevara.jpg",
  "http://i.telegraph.co.uk/multimedia/archive/02530/thatcher1__1979-do_2530147k.jpg",
  "http://paperboat.studiopod.com/wp-content/uploads/2010/07/great-depression-soup-line-11.jpg"

]

var number = Math.floor(Math.random() * 7)

$scope.image = imageArray[number]


  $scope.showStudentLogin = function() {
    console.log('student modal working')
    $modal.open({
      templateUrl: '/views/auth/studentLoginModal.html',
      controller: 'StudentAuthLoginModalCtrl'
    })
  }

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
    })
  }

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


}])