ClioApp.controller('TimelineShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Timeline', 'AddEvent', 'UserService', '$location','$route',
    function($scope,$modal,$routeParams, Project, Timeline, AddEvent, UserService, $location, $route) {
    console.log('timeline show controller online')

  $scope.UserService = UserService;

  $scope.$watchCollection('UserService', function() {
    $scope.currentUser = UserService.currentUser;
  })

  Project.get({id: $routeParams.projectId}, function(data) {
    $scope.project = data
 });

  // if(!UserService.currentUser){
  //   $location.path('/');
  // }

$scope.date = []
  AddEvent.query({id: $routeParams.id}, function(eventData) {
    for (var i = 0; i < eventData.length; i++) {
      $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
                        "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
                        "headline": eventData[i].title,
                        "text": eventData[i].text,
                        "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
    }
  })

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
                "media":$scope.timeline.medium,
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
          };

        });
    }


    TimelineCreate()

      $scope.newEvent = function() {
        console.log('new event!!!!!')
      $modal.open({
        templateUrl:'/views/timeline/timelineEventModal.html',
        controller: 'TimelineEventModalCtrl'
      }).result.then(function(){
          AddEvent.query({id: $routeParams.id}, function(eventData) {
            for (var i = 0; i < eventData.length; i++) {
              $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
                        "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
                        "headline": eventData[i].title,
                        "text": eventData[i].text,
                        "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
            }
            console.log("This is my test", $scope.date)
          })
      });
    };

    $scope.editTimeline = function() {
    console.log('timeline edit!!!!!')
      $modal.open({
        templateUrl:'/views/timeline/editTimelineModal.html',
        controller: 'TimelineEventModalCtrl'
      }).result.then(function(data){
            console.log("This is my test", data)
          })
    }


  $scope.reloadRoute = function() {
     $route.reload();
  }



$scope.$watchCollection($scope.date, function(){
    $scope.date = []
      AddEvent.query({id: $routeParams.id}, function(eventData) {
        for (var i = 0; i < eventData.length; i++) {
          $scope.date.push({"startDate": moment.utc(eventData[i].startYear).format('YYYY,MM,DD').toString(),
                            "endDate": moment.utc(eventData[i].endYear).format('YYYY,MM,DD').toString(),
                            "headline": eventData[i].title,
                            "text": eventData[i].text,
                            "asset": {"media": eventData[i].medium, "thumbnail": eventData[i].medium}})
        }
      })

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
                    "media":$scope.timeline.medium,
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
              };

            });
        }


        TimelineCreate()
  })

  }])