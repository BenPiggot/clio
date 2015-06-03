ClioApp.factory('AddUser', ['$resource',function( $resource) {

    return $resource('/api/user', null, {
      'update': {method: 'PUT'}
    })

}])