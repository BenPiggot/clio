ClioApp.factory('AddEvent', ['$resource', function($resource) {
    return $resource('/api/timeline/:id/events', null, {
      'update': {method: 'PUT'},
      'get': {isArray : true}
    });
}]);