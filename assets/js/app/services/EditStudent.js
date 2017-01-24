ClioApp.factory('EditStudent', ['$resource', function($resource) {
  return $resource('/api/student/:id', null, {
    'update': {method: 'PUT'},
  });
}]);