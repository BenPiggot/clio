ClioApp.controller('TimelineCtrl',['$scope','$modal', '$routeParams', 'Project',
    function($scope,$modal,$routeParams, Project) {
    console.log('timeline controller online')

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