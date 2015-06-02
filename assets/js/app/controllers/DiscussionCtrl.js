ClioApp.controller('DiscussionCtrl',['$scope','$rootScope','$modal','AlertService', 'Project', '$routeParams',
  function($scope, $rootScope, $modal, AlertService, Project, $routeParams) {


  Project.get({id: $routeParams.id}, function(data) {
    $scope.project = data
  })



}])