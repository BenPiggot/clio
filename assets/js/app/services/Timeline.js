ClioApp.factory('Timeline', ['$resource',function( $resource) {
    return $resource('/api/project/:projectId/timelines/:id', null, {
      'update': {method: 'PUT'},
      'get': {isArray : true}
    })

}])