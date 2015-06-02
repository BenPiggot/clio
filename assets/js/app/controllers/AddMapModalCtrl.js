ClioApp.controller('AddMapModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddMap', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddMap, Project, $routeParams) {

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

    $scope.addMap = function() {
      console.log('awesome')
      var map = new AddMap()
      map.name = $scope.name;
      map.description = $scope.description
      map.country = $scope.country;
      map.city = $scope.city;
      map.zoom = $scope.zoom;
      map.theme = $scope.theme;
      map.$save({projectId: $scope.project.id}, function(data) {
        console.log('map created')
        console.log(data)
        $scope.project = data;
        $modalInstance.close();
      })
    }

}]);
