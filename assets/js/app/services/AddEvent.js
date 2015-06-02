ClioApp.factory('AddEvent', ['$resource',function( $resource) {
    return $resource('/api/project/:projectId/timelines/:id/events', null, {
      'update': {method: 'PUT'},
      'get': {isArray : true}
    })

}])