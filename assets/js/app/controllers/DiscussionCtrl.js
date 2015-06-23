ClioApp.controller('DiscussionCtrl',['$scope','$modal','AlertService', 'Project', 'Discussion','$routeParams', 'UserService', 'StudentUserService', '$location',
  function($scope, $modal, AlertService, Project, Discussion, $routeParams, UserService, StudentUserService, $location) {

  // UserService and StudentUserService loaded into scope to watch for user/student user login
  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })

  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })


// Conditional statement to reroute unauthorized users to homepage
  if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }

// Conditional statement used to create current commenter variable, which will be used if
// instructor user posts a comment
  if (UserService.currentUser) {
    var commenter = UserService.currentUser.firstName + " " + UserService.currentUser.lastName
  }

// Conditional statement used to create current commenter variable, which will be used if
// student user posts a comment
  if (StudentUserService.currentStudentUser) {
    var commenter = StudentUserService.currentStudentUser.firstName + " " + StudentUserService.currentStudentUser.lastName
  }


// http get request that loads current project via Project service
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
      $scope.loadPosts();
  })


// http get request that loads posts associated with the current project via Discussion service
   $scope.loadPosts = function() {
    Discussion.get({id: $scope.project.id},function(data) {
      console.log(data)
      $scope.posts = data;
    })
  }


// http post request that creates a new post database entry and re-renders page with new post;
// request is made via Discussion service
  $scope.addPost = function() {
     var discussion = new Discussion();
     discussion.post = $scope.post;
     discussion.commenter = commenter;
     discussion.$save({id: $scope.project.id},function(data){
        console.log(data);
        $scope.loadPosts()
        $scope.post = ""
      });

  }

// Client side logout function made via http delete request; further handling of logout
// occurs on the server side as well
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