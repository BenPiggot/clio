ClioApp.factory('EditTimeline', ['$resource', function($resource) {
  return $resource('/api/timeline/:id', null, {
    'update': {method: 'PUT'},
  });
}]);