ClioApp.controller('MapMarkerModalCtrl', ['$scope', 'UserService', '$modalInstance', '$routeParams', 'Map', 'AddMarker',
  function($scope, UserService, $modalInstance, $routeParams, Map, AddMarker) {

    console.log("Doing better now!!")
    console.log($routeParams)
    console.log($routeParams.projectId)
    console.log($routeParams.id)

  Map.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
    console.log(data[0])
    $scope.map = data[0]
  })


    $scope.addMarker = function() {
      console.log('awesome')
      var marker = new AddMarker()
      marker.address = $scope.address;
      marker.city = $scope.city
      marker.country = $scope.country;
      marker.description = $scope.description;
      marker.image = $scope.image;
      console.log(marker.address)
      marker.$save({ id: $scope.map.id}, function(data) {
        console.log('marker created')
        console.log(data)
        $scope.map = data;
        $modalInstance.close();
      })
    }

  }])
