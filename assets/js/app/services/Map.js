ClioApp.factory('Map', ['$resource', function($resource) {
  return $resource('/api/project/:projectId/maps/:id', null, {
    'update': {method: 'PUT'},
    'get': {isArray : true}
  });
}]);