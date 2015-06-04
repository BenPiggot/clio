ClioApp.controller('DiscussionCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', 'Discussion','$routeParams',
  function($scope, $rootScope, $modal, AlertService, Project, Discussion, $routeParams) {

// if(!UserService.currentUser){
//   $location.path('/');
// }

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