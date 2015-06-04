ClioApp.controller('TimelineCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location',
    function($scope,$modal,$routeParams, Project, UserService, $location) {
    console.log('timeline controller online')

  // if(!UserService.currentUser){
  //   $location.path('/');
  // }

  Project.get({id: $routeParams.id}, function(data) {
      $scope.project = data
   });

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




  }])