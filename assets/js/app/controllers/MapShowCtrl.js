ClioApp.controller('MapShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Map', '$q','AddMarker',
  function($scope, $modal, $routeParams, Project, Map, $q, AddMarker) {

// L.mapbox.accessToken = 'pk.eyJ1IjoiYmVucGlnZ290IiwiYSI6ImYwU2swWkUifQ.MJDSGs4FaCV1GlurP-nIDA';

     $scope.mapShow = false;
     $scope.markers = []

  AddMarker.query({id: $routeParams.id}, function(markerData) {
    console.log(markerData[4].latitude)
    for (var i = 0; i < markerData.length; i++) {
      console.log(markerData[i])
      $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude,
                             message: markerData[i].description, draggable: false})
    }
    console.log('last', $scope.markers)
  })

  Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
      console.log(data)
       $scope.map = data[0]
       console.log($scope.map)
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom, $scope.markers)
    })





  $scope.mapRenderInit = function(lat, lng, zoom, markers) {

      angular.extend($scope, {
          center: {
            lat: lat || 35,
            lng: lng || 30,
            zoom: zoom || 2
          }
      })
      $scope.markers
       // = [
      //       {
      //           lat: 59,
      //           lng: 10.7,
      //           message: "Awesome",
      //           draggable: false
      //       },
      //         {
      //           lat: 59.91,
      //           lng: 10.75,
      //           message:  "The upward progression in the percentage of Americans seeing these issues as morally acceptable has varied from year to year, but the overall trend clearly points toward a higher level of acceptance of a number of behaviors. In fact, the moral acceptability ratings for 10 of the issues measured since the early 2000s are at record highs. T-bone beef ribs short ribs corned beef pancetta venison meatloaf. Filet mignon turducken pig ball tip ham hock chuck. Corned beef leberkas pancetta sausage tongue bacon ball tip salami. Drumstick pastrami meatloaf, shankle spare ribs strip steak meatball pancetta bacon shoulder swine chicken jowl prosciutto. Shoulder picanha pastrami, pork turducken andouille jerky ground round frankfurter sirloin landjaeger. Landjaeger shoulder doner kevin frankfurter corned beef filet mignon short loin flank jowl meatloaf ham strip steak leberkas brisket. Pig andouille chicken, ham hock beef flank porchetta shankle tri-tip ribeye pork belly doner chuck bacon. Bacon ipsum dolor amet kevin turkey kielbasa t-bone chicken shankle. Tongue picanha tail, spare ribs ground round jowl swine turducken prosciutto corned beef pork belly. Kevin strip steak jowl boudin rump cow. Brisket cow frankfurter beef ribs shoulder, rump pork belly salami tongue shank leberkas ham hock ball tip. Ground round turducken flank beef ribs salami turkey picanha prosciutto.",
      //           draggable: false
      //       },
      //        {
      //           lat: 59.91,
      //           lng: 10.95,
      //           message: "Hi, you're in east Oslo",
      //           draggable: false
      //       }
      // ]
      console.log($scope.markers)
       $scope.mapShow = true;
    }


  $scope.newMarker = function() {
    console.log('new marker!!!!!')
    $modal.open({
      templateUrl:'/views/maps/mapMarkerModal.html',
      controller: 'MapMarkerModalCtrl'
    }).result.then(function(data){
        console.log("added")
        console.log(data)
    AddMarker.query({id: $routeParams.id}, function(markerData) {
    console.log(markerData[4].latitude)
    for (var i = 0; i < markerData.length; i++) {
      console.log(markerData[i])
      $scope.markers.push({lat: markerData[i].latitude, lng: markerData[i].longitude,
                             message: markerData[i].description, draggable: false})
    }
    console.log('last', $scope.markers)
  })
      Map.query({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
      console.log(data)
       $scope.map = data[0]
       console.log($scope.map)
       $scope.mapRenderInit($scope.map.latitude, $scope.map.longitude, $scope.map.zoom, $scope.markers)
    })

    });
  };

}])