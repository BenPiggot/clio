ClioApp.controller('AddTimelineModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddTimeline', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddTimeline, Project, $routeParams) {

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

    $scope.addTimeline = function() {
      console.log('awesome')
      var timeline = new AddTimeline()
      timeline.title = $scope.title;
      timeline.description = $scope.description;
      timeline.startYear = $scope.startYear;
      timeline.endYear = $scope.endYear;
      timeline.medium = $scope.medium;
      timeline.$save({projectId: $scope.project.id}, function(data) {
        console.log('timeline created')
        console.log(data)
        $scope.project = data;
        $modalInstance.close();
      })
    }

}]);


//The Iranian Revolution occurred between 1978 and 1979, but had roots much earlier in Iranian history.