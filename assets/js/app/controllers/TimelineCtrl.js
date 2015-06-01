ClioApp.controller('TimelineCtrl',['$scope','$modal', function($scope,$modal) {
    console.log('timeline controller online')
$scope.timelineData = {
  "timeline":
  {
    "headline":"Arsenal's 2014 FA Cup victory",
    "type":"default",
    "text":"<p>Still trying to find data from 2015</p>",
    "asset": {
      "media":"http://talksport.com/sites/default/files/styles/large/public/field/image/201405/arsenal-tottenham.jpg?itok=x1VW3FyD",
      "credit":"Credit Name Goes Here",
      "caption":"Caption text goes here"
    },
    "date": [
      {
        "startDate":"2014,5,18",
        "endDate":"2014,5,18",
        "headline":"Giroud, Ramsey, and Flamini",
        "text":"<p>Body text goes here, some HTML is OK</p>",
        "tag":"This is Optional",
        "classname":"optionaluniqueclassnamecanbeaddedhere",
        "asset": {
          "media":"http://resources2.news.com.au/images/2014/05/18/1226921/616438-b48a6818-de18-11e3-9590-3cdf45a9ffaa.jpg",
          "credit":"Credit Name Goes Here",
          "caption":"Caption text goes here"
        }
      }
    ],
    "era": [
      {
        "startDate":"2014,5,18",
        "endDate":"2014,5,18",
        "headline":"Headline Goes Here",
        "text":"<p>Body text goes here, some HTML is OK</p>",
        "tag":"This is Optional"
      }

    ]
  }
};
  }])