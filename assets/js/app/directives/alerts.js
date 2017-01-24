ClioApp.directive('alerts',function() {

  return {
    restrict: 'E',
    scope: {},
    controller: ['$scope', 'AlertService', function($scope, AlertService) {

      alerts =  [
        {type: 'danger', text: 'this is an error'},
        {type: 'info', text: 'this is some info'},
        {type: 'success', text: 'Success!!'}
      ];

      $scope.getAlerts = function() {
        return AlertService.get();
      }

      $scope.closeAlert = function(idx) {
        AlertService.remove(idx);
      }
    }],
    replace: true,
    template: '<alert ng-repeat="alert in getAlerts()" type="{{alert.type}}" close="$parent.closeAlert($index)">{{alert.text}}</alert>'
  }
});