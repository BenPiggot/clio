ClioApp.controller('MapCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location',
 function($scope, $modal, $routeParams, Project, UserService, $location) {


// if(!UserService.currentUser){
//   $location.path('/');
// }

// L.mapbox.accessToken = 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA';
// // Create a map in the div #map


//   var map = L.mapbox.map('map', 'mapbox.pirates',  {
//     center: [30,35],
//     zoom: 2
//   })

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
    });

  $scope.mapRenderInit = function(lat, lng, zoom) {

      angular.extend($scope, {
          center: {
            lat: lat || 35,
            lng: lng || 30,
            zoom: zoom || 2
          }
      })
    }

    $scope.mapRenderInit()
    // global, zoom: 2, continental, zoom: 3, national: zoom 6, regional: zoom 8, urban region: zoom 10, neighborhood: zoom 12


  $scope.newMap = function() {
      $modal.open({
        templateUrl:'/views/maps/addMapModal.html',
        controller: 'AddMapModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data.maps[0].id)
        $scope.project = data

      });
    });
  }

}])


