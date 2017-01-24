ClioApp.controller('TimelineEventModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Timeline', 'EditTimeline', 'AddEvent',
  function($scope, UserService, $modalInstance, Project, $routeParams, Timeline, EditTimeline, AddEvent) {


// http get request that returns all timelines associated with current porject via Timeline service
  Timeline.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
    $scope.timeline = data[0];
  })


// http post request that creates new timeline event via AddEvent service
  $scope.addEvent = function() {
    var event = new AddEvent()
    event.title = $scope.title;
    event.text = $scope.text;
    event.startYear = $scope.startYear;
    event.endYear = $scope.endYear;
    event.medium = $scope.medium;
    event.$save({id: $scope.timeline.id}, function(data) {
      $scope.timeline = data;
      $modalInstance.close();
    })
  }


// http put request that updates timeline via EditTimeline service
  $scope.updateTimeline = function() {
    EditTimeline.update({id: $routeParams.id},
      {
        title: $scope.title,
        description: $scope.description,
        startYear: $scope.startYear,
        endYear: $scope.endYear,
        medium: $scope.medium
      },
      function(data){
        $modalInstance.close();
    });
  }


// Small function that closes modal
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
