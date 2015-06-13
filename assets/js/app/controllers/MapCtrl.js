ClioApp.controller('MapCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location', 'EditMap', 'AlertService', 'StudentUserService',
 function($scope, $modal, $routeParams, Project, UserService, $location, EditMap, AlertService, StudentUserService) {


  $scope.UserService = UserService;

  $scope.StudentUserService = StudentUserService

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


 if(!UserService.currentUser && !StudentUserService.currentStudentUser){
    $location.path('/');
  }

// L.mapbox.accessToken = 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA';
// // Create a map in the div #map


  var tilesDict = {
      openstreetmap: {
          url: "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          options: {
              attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
      },
      mapbox_light: {
          name: 'Mapbox Satellite',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          options: {
              apikey: 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA',
              mapid: 'mapbox.light'
            }
      },
      mapbox_outdoors: {
          name: 'Mapbox Outdoors',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          options: {
              apikey: 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA',
              mapid: 'mapbox.outdoors'
          }
      },
      mapbox_wheat: {
          name: 'Mapbox Wheat Paste',
          url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
          type: 'xyz',
          options: {
              apikey: 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA',
              mapid: 'mapbox.wheat'
            }
          },
      mapbox_pirates: {
        name: 'Mapbox Pirates',
        url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
        type: 'xyz',
        options: {
              apikey: 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA',
              mapid: 'mapbox.pirates'
          }
        }

  }


  // $('#map-changer').on('change', function() {

  //   var selection = $(this).val()

  //   if (selection === "timapbox_pirates") {
  //     var theme = tilesDict.mapbox_pirates
  //   }
  //   else if (selection === "openstreetmap") {
  //     var theme  = tilesDict.openstreetmap
  //   }
  //   console.log(theme)
  //   $scope.mapRenderInit(25,10,2, theme)
  // });


  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
    });

  $scope.mapRenderInit = function(lat, lng, zoom, theme) {

      angular.extend($scope, {
          center: {
            lat: lat || 25,
            lng: lng || 10,
            zoom: zoom || 2
          },
          defaults: {
            scrollWheelZoom: false
          },
          tiles: tilesDict.openstreetmap
        })
    }

    $scope.mapRenderInit()


  $scope.deleteMap = function(mapId) {
    if (UserService.currentUser){
      if (confirm("Are you sure you want to remove this map?")) {
        EditMap.delete({id: mapId}, function(data) {
          console.log(data)
          AlertService.add('info', 'Map removed')
          $scope.$apply(Project.get({id: $routeParams.id}, function(data) {
          $scope.project = data
          }));
        })
      }
    } else {
      AlertService.add('danger', 'You cannot edit the map list.')
    }
  }

  $scope.newMap = function() {
      $modal.open({
        templateUrl:'/views/maps/addMapModal.html',
        controller: 'AddMapModalCtrl'
      }).result.then(function(){
        $scope.$apply(Project.get({id: $routeParams.id}, function(data) {
        console.log(data.maps[0].id)
        $scope.project = data

      }));
    });
  }

}])


