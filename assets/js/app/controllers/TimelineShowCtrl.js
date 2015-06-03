ClioApp.controller('TimelineShowCtrl',['$scope','$modal', '$routeParams', 'Project', 'Timeline',
    function($scope,$modal,$routeParams, Project, Timeline) {
    console.log('timeline show controller online')

var TimelineCreate = function() {
  Timeline.get({projectId: $routeParams.projectId, id: $routeParams.id}, function(data) {
    console.log(data[0])
    $scope.timeline = data[0]

          $scope.timelineData = {
            "timeline":
            {
              "headline": $scope.timeline.title,
              "type":"default",
              "text": $scope.timeline.description,
              "asset": {
                "media":$scope.timeline.medium,
                // "credit":"Credit Name Goes Here",
                // "caption":"Caption text goes here"
              },
              "date": [
                {
                  "startDate":$scope.timeline.startYear,
                  "endDate":$scope.timeline.endYear,
                  "headline":"Giroud, Ramsey, and Flamini",
                  "text":"<p>Body text goes here, some HTML is OK</p>",
                  "tag":"This is Optional",
                  "classname":"optionaluniqueclassnamecanbeaddedhere",
                  "asset": {
                    "media":"http://resources2.news.com.au/images/2014/05/18/1226921/616438-b48a6818-de18-11e3-9590-3cdf45a9ffaa.jpg"
                    // "credit":"Credit Name Goes Here",
                    // "caption":"Caption text goes here"
                  }
                }
              ]
              // "era": [
              //   {
              //     "startDate":"2014,5,18",
              //     "endDate":"2014,5,18",
              //     "headline":"Headline Goes Here",
              //     "text":"<p>Body text goes here, some HTML is OK</p>",
              //     "tag":"This is Optional"
              //   }

              // ]
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
          TimelineCreate()

        // $scope.mapRenderInit($scope.project.maps[0].latitude, $scope.project.maps[0].longitude, $scope.project.maps[0].zoom)
      });
    };


  }])