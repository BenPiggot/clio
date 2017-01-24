ClioApp.controller('TimelineShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Timeline', 'AddEvent', 'UserService', '$location','$route', 'StudentUserService',
    function($scope,$modal,$routeParams, Project, Timeline, AddEvent, UserService, $location, $route, StudentUserService) {


  // UserService and StudentUserService loaded into scope to watch for user/student user login
  $scope.UserService = UserService;
  $scope.StudentUserService = StudentUserService;

  $scope.$watchCollection('StudentUserService', function() {
    $scope.currentStudentUser = StudentUserService.currentStudentUser;
  })

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })


  // Conditional statement to reroute unauthorized users to homepage
  if(!UserService.currentUser && !StudentUserService.currentStudentUser) {
    $location.path('/');
  }


  // http get request that loads current project via Project service
  Project.get({id: $routeParams.projectId}, function(data) {
    $scope.project = data;
  });


  // Logic that sets the height of the timeline depending on screen height;
  // Used primarily for tablet portrait views
  if (screen.height >= 1000) {
    $scope.height = 730;
  } else {
    $scope.height = 550;
  }


  // Array of events for timeline; AJAX database requery returns all associated events;
  // I then loop through the events to populate the the array
  $scope.date = [];
  AddEvent.query({id: $routeParams.id}, function(eventData) {
    for (var i = 0; i < eventData.length; i++) {
      $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
                        "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
                        "headline": eventData[i].title,
                        "text": eventData[i].text,
                        "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
    }
  })


// Function that renders the timeline and associated events
  var TimelineCreate = function() {
  Timeline.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
    $scope.timeline = data[0]
    $scope.timelineData = {
      "timeline":
        {
          "headline": $scope.timeline.title,
          "type":"default",
          "text": $scope.timeline.description,
          "asset": {
            "media": $scope.timeline.medium,
          },
          // "startDate": moment.utc($scope.timeline.startYear).format('YYYY,MM,DD').toString(),
          "date": $scope.date,
          "era": [
            {
              "startDate": moment.utc($scope.timeline.startYear).format('YYYY,MM,DD').toString(),
              "endDate":  moment.utc($scope.timeline.endYear).format('YYYY,MM,DD').toString()
              // "headline":"Headline Goes Here",
              // "text":"<p>Body text goes here, some HTML is OK</p>",
              // "tag":"This is Optional"
            }
          ]
        }
      }
    });
  }

  //  Call timeline creation fucntion
  TimelineCreate();


// Function opens modal where students and users can add events
  $scope.newEvent = function() {
    $modal.open({
      templateUrl:'/views/timeline/timelineEventModal.html',
      controller: 'TimelineEventModalCtrl'
    }).result.then(function() {
        AddEvent.query({id: $routeParams.id}, function(eventData) {
          for (var i = 0; i < eventData.length; i++) {
            $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
                      "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
                      "headline": eventData[i].title,
                      "text": eventData[i].text,
                      "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
          }
          console.log("This is my test", $scope.date);
        })
    });
  };


// Function opens modal where instructors and students can edit the timeline
    $scope.editTimeline = function() {
      $modal.open({
        templateUrl:'/views/timeline/editTimelineModal.html',
        controller: 'TimelineEventModalCtrl'
      }).result.then(function(data){
        console.log("This is my test", data);
      })
    }


// Function allows for view refresh without call to server
  $scope.reloadRoute = function() {
     $route.reload();
  }


// Watch collection call designed so that timeline events are updated automatically via AJAX;
// still trying to get this to work, so not currently included.
// $scope.$watchCollection($scope.date, function(){
//     $scope.date = []
//       AddEvent.query({id: $routeParams.id}, function(eventData) {
//         for (var i = 0; i < eventData.length; i++) {
//           $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
//                             "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
//                             "headline": eventData[i].title,
//                             "text": eventData[i].text,
//                             "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
//         }
//       })

//     var TimelineCreate = function() {
//       Timeline.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {

//         $scope.timeline = data[0]

//               $scope.timelineData = {
//                 "timeline":
//                 {
//                   "headline": $scope.timeline.title,
//                   "type":"default",
//                   "text": $scope.timeline.description,
//                   "asset": {
//                     "media":$scope.timeline.medium,
//                   },
//                   // "startDate": moment.utc($scope.timeline.startYear).format('YYYY,MM,DD').toString(),
//                   "date": $scope.date,
//                   "era": [
//                     {
//                       "startDate": moment.utc($scope.timeline.startYear).format('YYYY,MM,DD').toString(),
//                       "endDate":  moment.utc($scope.timeline.endYear).format('YYYY,MM,DD').toString()
//                       // "headline":"Headline Goes Here",
//                       // "text":"<p>Body text goes here, some HTML is OK</p>",
//                       // "tag":"This is Optional"
//                     }

//                   ]
//                 }
//               };

//             });
//         }

//         TimelineCreate()
//   })


// Client-side logout function for instructors
   $scope.logout = function() {
      UserService.logout(function(err, data) {
        $location.path('/');
      })
    }


// Client-side logout function for students
   $scope.studentLogout = function() {
      StudentUserService.studentLogout(function(err, data) {
        $location.path('/');
      })
    }
  }])