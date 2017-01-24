ClioApp.factory('AddTimeline', ['$resource', function($resource) {
  return $resource('/api/project/:projectId/timelines/:id', null, {
    'update': {method: 'PUT'}
  })
}])