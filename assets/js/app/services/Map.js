ClioApp.factory('Map', ['$resource',function( $resource) {

    return $resource('/api/project/:id/map/:id', null, {
      'update': {method: 'PUT'}
    })

}])