ClioApp.controller('ProjectCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', 'UserService', '$location', 'StudentUserService',
  function($scope, $rootScope, $modal, AlertService, Project, UserService, $location, StudentUserService) {

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })


  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })



var imageArray = [

  "https://static.awm.gov.au/images/collection/items/ACCNUM_SCREEN/EKN/67/0130/VN.JPG",
  "http://citelighter-cards.s3.amazonaws.com/p179jerr2r1c2b19so8hjc2q1ev80_18242.jpg",
  "https://globalizingmexico.files.wordpress.com/2012/03/revsoldiers1.jpg",
  "http://i.ytimg.com/vi/5110UES-QzE/maxresdefault.jpg",
  "http://api.ning.com/files/M8fY2*UDgJxVQ8f9mwuu1gGQ*lGlKRlJHZBllmDgmrrQgaLv5rEtvjcGc51ZBlOBuPm4cRlmdN7fOmxNoczE8RPsh1CIKUBl/cheguevara.jpg",
  "http://i.telegraph.co.uk/multimedia/archive/02530/thatcher1__1979-do_2530147k.jpg",
  "http://paperboat.studiopod.com/wp-content/uploads/2010/07/great-depression-soup-line-11.jpg",
  "http://upload.wikimedia.org/wikipedia/en/9/9a/Oxcart-train1947.jpg"
  // "http://i.imgur.com/jRJpU.jpg"
]

var number = Math.floor(Math.random() * 8)

$scope.image = imageArray[number]

  if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }

$scope.projects = [];


  $scope.newProject = function() {
  if (UserService.currentUser) {
    $modal.open({
      templateUrl: '/views/projects/createProjectModal.html',
      controller: 'CreateProjectModalCtrl'
    }).result.then(function(){
    $scope.loadProjects();
    })
  } else {
  AlertService.add('danger', 'You cannot add a new project.')
}
}


  $scope.loadProjects = function() {
    console.log('load posts working')
    Project.query({userId: UserService.currentUser.id},function(data) {
      AlertService.clear()
      $scope.projects = data;
    })
  }


  $scope.loadStudentProjects = function() {
    Project.query({id: UserService.currentUser.project},function(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].id === StudentUserService.currentStudentUser.project) {
          $scope.projects.push(data[i])
        }
      }
      AlertService.clear()
    })
  }

if (UserService.currentUser) {
  $scope.loadProjects();
}

if (StudentUserService.currentStudentUser) {
  $scope.loadStudentProjects();
}

 $scope.logout = function() {
    UserService.logout(function(err, data){
      $location.path('/')
    })
  }


 $scope.studentLogout = function() {
    StudentUserService.studentLogout(function(err, data){
      $location.path('/')
    })
  }
}])