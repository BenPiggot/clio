ClioApp.controller('MapCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location', 'EditMap', 'AlertService', 'StudentUserService',
 function($scope, $modal, $routeParams, Project, UserService, $location, EditMap, AlertService, StudentUserService) {


// UserService and StudentUserService loaded into scope to watch for user/student user login
$scope.UserService = UserService;

$scope.StudentUserService = StudentUserService

$scope.$watchCollection('StudentUserService', function() {
  $scope.currentStudentUser = StudentUserService.currentStudentUser;
})

$scope.$watchCollection('UserService', function() {
  $scope.currentUser = UserService.currentUser;
})


// Conditional statement to reroute unauthorized users to homepage
if(!UserService.currentUser && !StudentUserService.currentStudentUser){
  $location.path('/');
}


// Object of map themes from Mapbox API
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


// http get request that loads current project via Project service
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
    });


// Function that renders Leaflet.js map on page load; utilizes
// Angular Leaflet directives from https://github.com/tombatossals/angular-leaflet-directive
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
    });
  }


// Where the mapRenderInit funciton is actually called
  $scope.mapRenderInit();


// http delete request for deleting maps, made via EditMap service;
// Only instructors are allowed to delete maps
  $scope.deleteMap = function(mapId) {
    if (UserService.currentUser){
      if (confirm("Are you sure you want to remove this map?")) {
        EditMap.delete({id: mapId}, function(data) {
          AlertService.add('info', 'Map removed')
          Project.get({id: $routeParams.id}, function(data) {
          $scope.project = data
          });
        })
      }
    } else {
      AlertService.add('danger', 'You cannot edit the map list.')
    }
  }


// Function that opens modal where students/instructors can build enter parameters for a
// new map
  $scope.newMap = function() {
      $modal.open({
        templateUrl:'/views/maps/addMapModal.html',
        controller: 'AddMapModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        $scope.project = data;
      });
    });
  }


// Client-side logout function for instructors
 $scope.logout = function() {
    UserService.logout(function(err, data){
      $location.path('/')
    })
  }


// Client-side logout function for students
 $scope.studentLogout = function() {
    StudentUserService.studentLogout(function(err, data) {
      $location.path('/');
    })
  }
}]);
