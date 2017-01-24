ClioApp.factory('Discussion', ['$resource', function($resource) {
  return $resource('/api/project/:id/discussions', null, {
    'update': {method: 'PUT'},
    'get': {isArray : true}
  });
}]);