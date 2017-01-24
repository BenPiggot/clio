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
  "https://static.awm.gov.au/images/collection/items/ACCNUM_SCREEN/EKN/67/0130/VN.JPG",
  "http://citelighter-cards.s3.amazonaws.com/p179jerr2r1c2b19so8hjc2q1ev80_18242.jpg",
  "https://globalizingmexico.files.wordpress.com/2012/03/revsoldiers1.jpg",
  "http://i.ytimg.com/vi/5110UES-QzE/maxresdefault.jpg",
  "http://www.penccil.com/files/table/U_58_370892199427_09_Burri_ErnestoCheGuevara_Kuba_1963_01.jpg",
  "http://i.telegraph.co.uk/multimedia/archive/02530/thatcher1__1979-do_2530147k.jpg",
  "http://paperboat.studiopod.com/wp-content/uploads/2010/07/great-depression-soup-line-11.jpg",
  "http://upload.wikimedia.org/wikipedia/en/9/9a/Oxcart-train1947.jpg",
  "../../images/spanish-civil-war.jpg"
  // "http://www.thesundaytimes.co.uk/sto/multimedia/dynamic/00245/Spanish-Civil-War-1_245626k.jpg"
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