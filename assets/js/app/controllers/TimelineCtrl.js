ClioApp.controller('TimelineCtrl',['$scope','$modal', '$routeParams', 'Project', 'UserService', '$location',
    function($scope,$modal,$routeParams, Project, UserService, $location) {
    console.log('timeline controller online')


var imageArray = [

  "https://static.awm.gov.au/images/collection/items/ACCNUM_SCREEN/EKN/67/0130/VN.JPG",
  "http://citelighter-cards.s3.amazonaws.com/p179jerr2r1c2b19so8hjc2q1ev80_18242.jpg",
  "https://globalizingmexico.files.wordpress.com/2012/03/revsoldiers1.jpg",
  "http://i.ytimg.com/vi/5110UES-QzE/maxresdefault.jpg",
  "http://api.ning.com/files/M8fY2*UDgJxVQ8f9mwuu1gGQ*lGlKRlJHZBllmDgmrrQgaLv5rEtvjcGc51ZBlOBuPm4cRlmdN7fOmxNoczE8RPsh1CIKUBl/cheguevara.jpg",
  "http://i.telegraph.co.uk/multimedia/archive/02530/thatcher1__1979-do_2530147k.jpg",
  "http://paperboat.studiopod.com/wp-content/uploads/2010/07/great-depression-soup-line-11.jpg"

]

var number = Math.floor(Math.random() * 7)

$scope.image = imageArray[number]

  if(!UserService.currentUser){
    $location.path('/');
  }

  Project.get({id: $routeParams.id}, function(data) {
      $scope.project = data
   });

  $scope.newTimeline = function() {
      console.log('trying modal')
      $modal.open({
        templateUrl: '/views/timeline/addTimelineModal.html',
        controller: 'AddTimelineModalCtrl'
      }).result.then(function(){
        Project.get({id: $routeParams.id}, function(data) {
        console.log(data)
        $scope.project = data
      });
      });
  }




  }])