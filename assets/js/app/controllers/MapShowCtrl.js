ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map', function($scope, $modal, $routeParams, Project, Map) {

  $scope.mapShow = false;
  console.log('route params!!',$routeParams)

  Map.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {

    $scope.map = data[0]
    console.log('map',$scope.map)
    console.log('data',data)
     $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom)
     console.log('$scope',$scope);
    });


  $scope.mapRenderInit = function(lat, lng, zoom) {

      angular.extend($scope, {
          center: {
            lat: lat || 35,
            lng: lng || 30,
            zoom: zoom || 2
          }
      })
      $scope.mapShow = true;
    }

}])