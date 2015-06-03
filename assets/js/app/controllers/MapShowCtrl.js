ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map', '$timeout','AddMarker',
  function($scope, $modal, $routeParams, Project, Map, $timeout, AddMarker) {

L.mapbox.accessToken = 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA';

       $scope.mapShow = false;


  AddMarker.query({id: $routeParams.id}, function(markerData) {
    console.log(markerData)
    for (var i = 0; i < markerData; i++) {
      $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude, draggable: false})
    }
  })

  Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
      console.log(data)
       $scope.map = data[0]
       console.log($scope.map)
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom)
    })





  $scope.mapRenderInit = function(lat, lng, zoom) {

      angular.extend($scope, {
          center: {
            lat: lat || 35,
            lng: lng || 30,
            zoom: zoom || 2
          }
      })
      // var map = L.mapbox.map('map', 'mapbox.pirates',  {
      //   center: [lat,lng],
      //   zoom: zoom
      // })

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