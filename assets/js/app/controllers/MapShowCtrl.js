ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map','AddMarker', 'UserService', 'StudentUserService',
  function($scope, $modal, $routeParams, Project, Map, AddMarker, UserService, StudentUserService) {


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

  Project.get({id: $routeParams.projectId}, function(data) {
    $scope.project = data
  });


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

   $scope.mapShow = false;
   $scope.markers = []


  AddMarker.query({id: $routeParams.id}, function(markerData) {
    for (var i = 0; i < markerData.length; i++) {
      $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude,
                             message: markerData[i].description, draggable: false})
    }
  })

  Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
       $scope.map = data[0]
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom, $scope.markers, $scope.map.theme)
    })



  $scope.mapRenderInit = function(lat, lng, zoom, markers, theme) {
    console.log(tilesDict.mapbox_pirates)
      angular.extend($scope, {
          center: {
            lat: lat || 35,
            lng: lng || 30,
            zoom: zoom || 2
          },
          defaults: {
            scrollWheelZoom: false
          },
          tiles: theme
        })

      $scope.markers

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
      AddMarker.query({id: $routeParams.id}, function(markerData) {
        for (var i = 0; i < markerData.length; i++) {
            console.log(markerData[i])
            $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude,
                                   message: markerData[i].description, draggable: false})
        }
      })
      Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
       $scope.map = data[0]
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom, $scope.markers, $scope.map.theme)
      })
    });
  };


$scope.editMap = function() {
 $modal.open({
      templateUrl:'/views/maps/editMapModal.html',
      controller: 'EditMapModalCtrl'
    }).result.then(function(data){
      console.log(data)
      AddMarker.query({id: $routeParams.id}, function(markerData) {
        for (var i = 0; i < markerData.length; i++) {
            console.log(markerData[i])
            $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude,
                                   message: markerData[i].description, draggable: false})
        }
      })
      Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
       $scope.map = data[0]
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom, $scope.markers, $scope.map.theme)
      })
    });
  }

}])