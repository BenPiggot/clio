ClioApp.controller('ProjectCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', 'UserService', '$location', 'StudentUserService',
  function($scope, $rootScope, $modal, AlertService, Project, UserService, $location, StudentUserService) {


// UserService and StudentUserService loaded into scope to watch for user/student user login
  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })

  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })


// Array of images displayed to be desplayed randomly
var imageArray = [
  "../../images/vietnam.jpg",
  "../../images/iran-hostage.jpg",
  "../../images/mexican-revolution.jpg",
  "../../images/mlk.jpg",
  "../../images/che-guevara.jpg",
  "../../images/margaret-thatcher.jpg",
  "../../images/great-depression.jpg",
  "../../images/india-pakistan-1947.jpg",
  "../../images/spanish-civil-war.jpg"
]

// Functionality for displaying random images from imageArray
var number = Math.floor(Math.random() * 9)

$scope.image = imageArray[number]


// Conditional statement to reroute unauthorized users to homepage
  if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }


// Page loads initially without project information
$scope.projects = [];


// Function that opens modal allowing logged-in instructors to create new projects;
// Callback function then re-renders the page with the new project included
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


// Function that loads new projects associated with the logged-in instructor
  $scope.loadProjects = function() {
    console.log('load posts working')
    Project.query({userId: UserService.currentUser.id},function(data) {
      AlertService.clear()
      $scope.projects = data;
    })
  }


// Function that loads new projects associated with the logged-in student
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


// Client-side logout function for instructors
 $scope.logout = function() {
    UserService.logout(function(err, data){
      $location.path('/')
    })
  }


// Client-side logout function for students
 $scope.studentLogout = function() {
    StudentUserService.studentLogout(function(err, data){
      $location.path('/')
    })
  }
}])