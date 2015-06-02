ClioApp.controller('TimelineCtrl',['$scope','$modal', '$routeParams', 'Project',
    function($scope,$modal,$routeParams, Project) {
    console.log('timeline controller online')

var TimelineCreate = function() {
  Project.get({id: $routeParams.id}, function(data) {

    $scope.project = data

          $scope.timelineData = {
            "timeline":
            {
              "headline": $scope.project.timelines[0].title,
              "type":"default",
              "text": $scope.project.timelines[0].description,
              "asset": {
                "media":$scope.project.timelines[0].medium,
                // "credit":"Credit Name Goes Here",
                // "caption":"Caption text goes here"
              },
              "date": [
                {
                  "startDate":$scope.project.timelines[0].startYear,
                  "endDate":$scope.project.timelines[0].endYear,
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