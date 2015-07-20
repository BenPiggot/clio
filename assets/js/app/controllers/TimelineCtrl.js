ClioApp.controller('TimelineCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location', 'EditTimeline', 'StudentUserService', 'AlertService',
    function($scope,$modal,$routeParams, Project, UserService, $location, EditTimeline, StudentUserService, AlertService) {


// UserService and StudentUserService loaded into scope to watch for user/student user login
  $scope.UserService = UserService;

  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


// Conditional statement to reroute unauthorized users to homepage
 if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }


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


// http get request using Project service, renturns all user projects
  Project.get({id: $routeParams.id}, function(data) {
      $scope.project = data
   });


// Function opens modal where students/instructors can create a new timeline
  $scope.newTimeline = function() {
      console.log('trying modal')
      $modal.open({
        templateUrl: '/views/timeline/addTimelineModal.html',
        controller: 'AddTimelineModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data)
        $scope.project = data
      });
    });
  }


// http delete request allowing instructors to delete timelines
  $scope.deleteTimeline = function(timelineId) {
    if (UserService.currentUser){
      if (confirm("Are you sure you want to remove this timeline?")) {
        EditTimeline.delete({id: timelineId}, function(data) {
          console.log(data)
          Project.get({id: $routeParams.id}, function(data) {
            $scope.project = data
          });
        })
      }
    } else {
      AlertService.add('danger', 'You cannot edit the timeline list.')
    }
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