ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map', function($scope, $modal, $routeParams, Project, Map) {

  $scope.mapShow = false;

  Project.get({id: $routeParams.id}, function(data) {
    console.log(data)
    $scope.project = data
     $scope.mapRenderInit($scope.project.maps[0].latitude, $scope.project.maps[0].longitude, $scope.project.maps[0].zoom)
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