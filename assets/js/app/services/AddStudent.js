ClioApp.factory('AddStudent', ['$resource', function($resource) {
  return $resource('/api/project/:projectId/students/:id', null, {
    'update': {method: 'PUT'}
  });
}])