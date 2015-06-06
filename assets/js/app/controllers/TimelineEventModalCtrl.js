ClioApp.controller('TimelineEventModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Timeline', 'EditTimeline', 'AddEvent',
  function($scope, UserService, $modalInstance, Project, $routeParams, Timeline, EditTimeline, AddEvent) {


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

    $scope.updateTimeline = function() {
      console.log('trying')
      EditTimeline.update({id: $routeParams.id},
        {title: $scope.title,
         description: $scope.description,
         startYear: $scope.startYear,
         endYear: $scope.endYear,
         medium: $scope.medium},
        function(data){
        console.log('updated',data);
        $modalInstance.close();
      });
    }

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

}]);
