ClioApp.factory('AddStudent', ['$resource',function( $resource) {

    return $resource('/api/project/:projectId/student/:id', null, {
      'update': {method: 'PUT'}
    })

}])