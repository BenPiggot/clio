ClioApp.controller('AddMapModalCtrl', ['$scope', 'UserService', '$modalInstance', 'AddMap', 'Project', '$routeParams',
  function($scope, UserService, $modalInstance, AddMap, Project, $routeParams) {

  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })

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

    $scope.addMap = function() {
      if($scope.zoom) {
       if ($scope.zoom === "Neighborhood") {
        $scope.zoom = 14
       } else if ($scope.zoom === "City") {
        $scope.zoom = 10
       } else if ($scope.zoom === "Region") {
        $scope.zoom = 8
       } else if ($scope.zoom === "Country") {
        $scope.zoom = 5
       } else if ($scope.zoom === "Continent") {
        $scope.zoom = 4
       } else if ($scope.zoom === "World") {
        $scope.zoom = 2
       } else {
        alert("Please choose either Neighborhood, City, Region, Country, Continent or World")
       }
     }
     if($scope.theme) {
      if ($scope.theme === "18th Century") {
          $scope.theme = tilesDict.mapbox_pirates
          console.log("Big test!!!!!!", $scope.theme)
       }
       else if ($scope.theme === "Grayscale") {
          $scope.theme = tilesDict.mapbox_light
       }
       else if ($scope.theme === "Physical Features") {
          $scope.theme = tilesDict.mapbox_outdoors
       }
       else {
         $scope.theme = tilesDict.openstreetmap
       }
     }
      var map = new AddMap()
      map.name = $scope.name;
      map.description = $scope.description
      map.country = $scope.country;
      map.city = $scope.city;
      map.zoom = $scope.zoom;
      map.theme = $scope.theme;
      map.$save({projectId: $scope.project.id}, function(data) {
        console.log('map created')
        console.log(data)
        $scope.project = data;
        $modalInstance.close();
      })
    }

   $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };

}]);
