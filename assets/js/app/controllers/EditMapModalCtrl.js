ClioApp.controller('EditMapModalCtrl', ['$scope', 'UserService', '$modalInstance',  'Project', '$routeParams', 'Map', 'EditMap',
  function($scope, UserService, $modalInstance, Project, $routeParams, Map, EditMap) {

    $scope.updateMap = function() {
      console.log('trying')
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

)]}

