ClioApp.controller('TimelineEventModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Timeline', 'AddEvent',
  function($scope, UserService, $modalInstance, Project, $routeParams, Timeline, AddEvent) {

console.log($routeParams)

  Timeline.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {

    $scope.timeline = data[0]
  })

    $scope.addEvent = function() {
      console.log('awesome')
      var event = new AddEvent()
      event.title = $scope.title;
      event.text = $scope.text;
      event.startYear = $scope.startYear;
      event.endYear = $scope.endYear;
      event.medium = $scope.medium;
      event.$save({id: $scope.timeline.id}, function(data) {
        console.log('event added')
        console.log(data)
        $scope.timeline = data;
        $modalInstance.close();
      })
    }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
