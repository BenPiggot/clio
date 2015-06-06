ClioApp.controller('DiscussionCtrl',['$scope','$modal','AlertService', 'Project', 'Discussion','$routeParams', 'UserService', 'StudentUserService',
  function($scope, $modal, AlertService, Project, Discussion, $routeParams, UserService, StudentUserService) {

// if(!UserService.currentUser){
//   $location.path('/');
// }

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })
  console.log("test", StudentUserService.currentUser)
  console.log("test 2", UserService.currentUser)

  if (UserService.currentUser) {
    var commenter = UserService.currentUser.firstName + " " + UserService.currentUser.lastName
  }

  if (StudentUserService.currentStudentUser) {
    var commenter = StudentUserService.currentStudentUser.firstName + " " + StudentUserService.currentStudentUser.lastName
  }

  console.log(commenter)

  console.log($routeParams)
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
      $scope.loadPosts();
  })


   $scope.loadPosts = function() {
    console.log('load posts working')
    Discussion.get({id: $scope.project.id},function(data) {
      console.log(data)
      $scope.posts = data;
    })
  }

  $scope.addPost = function() {
    console.log('comment function firing')
     var discussion = new Discussion();
     discussion.post = $scope.post;
     discussion.commenter = commenter;
     console.log(discussion.post)
     discussion.$save({id: $scope.project.id},function(data){
        console.log(data);
        $scope.loadPosts()
        $scope.post = ""
      });

  }



}])