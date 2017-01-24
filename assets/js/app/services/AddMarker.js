ClioApp.factory('AddMarker', ['$resource', function($resource) {
  return $resource('/api/map/:id/markers', null, {
    'update': {method: 'PUT'},
    'get': {isArray : true}
  });
}]);