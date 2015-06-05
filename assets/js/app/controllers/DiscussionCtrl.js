ClioApp.controller('DiscussionCtrl',['$scope','$modal','AlertService', 'Project', 'Discussion','$routeParams', 'UserService',
  function($scope, $modal, AlertService, Project, Discussion, $routeParams, UserService) {

// if(!UserService.currentUser){
//   $location.path('/');
// }

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;

  })

  $scope.firstName = $scope.UserService.currentUser.firstName
  $scope.lastName = $scope.UserService.currentUser.lastName

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
     console.log(discussion.post)
     discussion.$save({id: $scope.project.id},function(data){
        console.log(data);
        $scope.loadPosts()
        $scope.post = ""
      });

  }



}])