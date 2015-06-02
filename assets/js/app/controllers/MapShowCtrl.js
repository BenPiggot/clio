ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map', function($scope, $modal, $routeParams, Project, Map) {

  $scope.mapShow = false;


  Map.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
     $scope.map = data[0]
     $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom)
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

  $scope.newMarker = function() {
    console.log('new marker!!!!!')
    $modal.open({
      templateUrl:'/views/maps/mapMarkerModal.html',
      controller: 'MapMarkerModalCtrl'
    }).result.then(function(data){
        console.log("added")
        console.log(data)

    });
  };

}])