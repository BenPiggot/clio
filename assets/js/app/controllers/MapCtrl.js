ClioApp.controller('MapCtrl',['$scope','$modal', '$routeParams', 'Project', function($scope, $modal, $routeParams, Project) {


  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
    });

  //     if ($scope.project.maps) {
  //       $scope.mapRenderInit($scope.project.maps[0].latitude, $scope.project.maps[0].longitude, $scope.project.maps[0].zoom)
  //     } else {

  //     }

  // });


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

        // $scope.mapRenderInit($scope.project.maps[0].latitude, $scope.project.maps[0].longitude, $scope.project.maps[0].zoom)
      });
    });
  }



}])


