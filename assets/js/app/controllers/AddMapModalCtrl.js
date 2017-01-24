ClioApp.controller('AddMapModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddMap', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddMap, Project, $routeParams) {

// http get request using Project service, renders all user projects
  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

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

// Add map function, http post request to database via AddMap service;
// converts user zoom and map theme inputs for server-side processing
    $scope.addMap = function() {
      var zoom
      var theme
      if($scope.zoom) {
       if ($scope.zoom === "Neighborhood") {
        zoom = 14
       } else if ($scope.zoom === "City") {
        zoom = 10
       } else if ($scope.zoom === "Region") {
        zoom = 8
       } else if ($scope.zoom === "Country") {
        zoom = 5
       } else if ($scope.zoom === "Continent") {
        zoom = 4
       } else if ($scope.zoom === "World") {
        zoom = 2
       } else {
        alert("Please choose either Neighborhood, City, Region, Country, Continent or World")
       }
     }
     if($scope.theme) {
      if ($scope.theme === "18th Century") {
          theme = tilesDict.mapbox_pirates
       }
       else if ($scope.theme === "Grayscale") {
          theme = tilesDict.mapbox_light
       }
       else if ($scope.theme === "Physical Features") {
          theme = tilesDict.mapbox_outdoors
       }
       else {
         theme = tilesDict.openstreetmap
       }
     }
      var map = new AddMap()
      map.name = $scope.name;
      map.description = $scope.description;
      map.country = $scope.country;
      map.city = $scope.city;
      map.zoom = zoom;
      map.theme = theme;
      map.$save({projectId: $scope.project.id}, function(data) {
        $scope.project = data;
        $modalInstance.close();
      })
    }

// Small function that closes modal
   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

}]);
