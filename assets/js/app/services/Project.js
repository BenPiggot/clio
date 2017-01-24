ClioApp.factory('Project', ['$resource', function($resource) {
  return $resource('/api/project/:id', null, {
    'update': {method: 'PUT'}
  });
}]);