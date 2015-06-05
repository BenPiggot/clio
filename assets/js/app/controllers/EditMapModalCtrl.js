ClioApp.controller('EditMapModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Map', 'EditMap',
  function($scope, UserService, $modalInstance, Project, $routeParams, Map, EditMap) {

    $scope.updateMap = function() {
      console.log('trying')
       if ($scope.zoom === "Neighborhood") {
        $scope.zoom = 14
       } else if ($scope.zoom === "City") {
        $scope.zoom = 10
       } else if ($scope.zoom === "Region") {
        $scope.zoom = 8
       } else if ($scope.zoom === "Country") {
        $scope.zoom = 6
       } else if ($scope.zoom === "Continent") {
        $scope.zoom = 4
       } else if ($scope.zoom === "World") {
        $scope.zoom = 2
       } else {
        alert("Please choose either Neighborhood, City, Region, Country, Continent, World")
       }
      EditMap.update({id: $routeParams.id},
        {name: $scope.name,
         description: $scope.description,
         country: $scope.country,
         city: $scope.city,
         zoom: $scope.zoom,
         theme: $scope.theme},
        function(data){
        console.log('updated',data);
        $modalInstance.close();
      });
    }

}])

