ClioApp.factory('DiscussionPost', ['$resource', function($resource) {
  return $resource('/api/project/:id/discussion/:id/post', null, {
    'update': {method: 'PUT'}
  });
}]);