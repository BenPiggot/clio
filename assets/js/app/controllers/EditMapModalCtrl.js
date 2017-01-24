ClioApp.controller('EditMapModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Map', 'EditMap',
  function($scope, UserService, $modalInstance, Project, $routeParams, Map, EditMap) {

// object of map themes from Mapbox API
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


// http put request to update map parameters made via Edit Map service;
// User zoom and theme inputs are transformed prior to http request
    $scope.updateMap = function() {
      var zoom;
      var theme;
      if($scope.zoom) {
        if ($scope.zoom === "Neighborhood") {
         zoom = 14;
        } else if ($scope.zoom === "City") {
         zoom = 10;
        } else if ($scope.zoom === "Region") {
         zoom = 8;
        } else if ($scope.zoom === "Country") {
        zoom = 5;
        } else if ($scope.zoom === "Continent") {
         zoom = 4;
        } else if ($scope.zoom === "World") {
         zoom = 2;
        }
      } 

      if ($scope.theme) {
        if ($scope.theme === "18th Century") {
          theme = tilesDict.mapbox_pirates;
        } else if ($scope.theme === "Grayscale") {
          theme = tilesDict.mapbox_light;
        } else if ($scope.theme === "Physical Features") {
          theme = tilesDict.mapbox_outdoors;
        } else {
          theme = tilesDict.openstreetmap;
        }
      }

      EditMap.update({id: $routeParams.id},
        {
          name: $scope.name,
          description: $scope.description,
          country: $scope.country,
          city: $scope.city,
          zoom: zoom,
          theme: theme
        },
        function(data){
          $modalInstance.close();
      });
    }
}]);
