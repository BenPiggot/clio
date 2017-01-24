ClioApp.controller('MapMarkerModalCtrl', ['$scope', 'UserService', '$modalInstance', '$routeParams', 'Map', 'AddMarker',
  function($scope, UserService, $modalInstance, $routeParams, Map, AddMarker) {


// http get request that loads current map via Map service
  Map.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
    $scope.map = data[0];
  });


// http post request that sends user information about new markers to database;
// the map then re-renders with new marker included
  $scope.addMarker = function() {
    console.log('awesome')
    var marker = new AddMarker()
    marker.address = $scope.address;
    marker.city = $scope.city
    marker.country = $scope.country;
    marker.description = $scope.description;
    marker.image = $scope.image;
    marker.$save({ id: $scope.map.id}, function(data) {
      $scope.map = data;
      $modalInstance.close();
    });
  }


// Small function that closes modal
   $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
}]);
