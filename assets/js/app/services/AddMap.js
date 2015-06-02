ClioApp.factory('AddMap', ['$resource',function( $resource) {

    return $resource('/api/project/:projectId/maps/:id', null, {
      'update': {method: 'PUT'}
    })
}])