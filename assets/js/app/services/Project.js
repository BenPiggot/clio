ClioApp.factory('Project', ['$resource',function( $resource) {

    return $resource('/api/project', null, {
      'update': {method: 'PUT'}
    })

}])