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