ClioApp.controller('AddTimelineModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddTimeline', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddTimeline, Project, $routeParams) {

// http get request using Project service, renders all user projects
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

// http post request that adds new timeline with user specifications to database via AddTimeline service
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

// Small function that closes modal
    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

}]);
