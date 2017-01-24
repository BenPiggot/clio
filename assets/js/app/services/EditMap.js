ClioApp.factory('EditMap', ['$resource',function($resource) {
  return $resource('/api/map/:id', null, {
    'update': {method: 'PUT'},
  });
}])