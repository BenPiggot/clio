ClioApp.controller('TimelineEventModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Timeline',
  function($scope, UserService, $modalInstance, Project, $routeParams, Timeline) {

console.log($routeParams)
  Project.get({id: $routeParams.id}, function(data) {
    console.log(data.timelines[0])
    $scope.timeline = data.timelines[0]
  })

    $scope.addEvent = function() {
      console.log('awesome')
      var event = new AddEvent()
      event.title = $scope.title;
      event.text = $scope.text;
      event.startYear = $scope.startYear;
      event.endYear = $scope.endYear;
      event.medium = $scope.medium;
      student.$save({id: $scope.timeline.id}, function(data) {
        console.log('event added')
        $scope.timeline = data;
        $modalInstance.close();
      })
    }

}]);
