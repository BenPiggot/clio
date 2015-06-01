var ClioApp = angular.module('ClioApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'leaflet-directive', 'pippTimelineDirectives']);


ClioApp.run(['$rootScope', 'UserService', 'AlertService', function($rootScope, UserService, AlertService) {
  console.log('app is up and running')

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        AlertService.clear()
      });

      UserService.check(function(err, data) {
        console.log('check', err, data)
      });

}]);



ClioApp.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

  $locationProvider.html5Mode(true);

  $routeProvider
  .when('/', {
    templateUrl: '/views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/projects', {
    templateUrl: '/views/projects/index.html',
    controller: 'ProjectCtrl'
  })
  .when('/maps', {
    templateUrl: '/views/maps/index.html',
    controller: 'MapCtrl'
  })
  .when('/timeline', {
    templateUrl: '/views/timeline/index.html',
    controller: 'TimelineCtrl'
  })
  .when('/about', {
    templateUrl: '/views/about.html',
    controller: 'StaticCtrl'
  })
  // .when('/post/:id', {
  //   templateUrl: '/views/post/show.html',
  //   controller: 'PostShowCtrl'
  // })
  // .when('/edit/:id', {
  //   templateUrl: '/views/post/edit.html',
  //   controller: 'PostEditCtrl'
  // })
  .otherwise({
    templateUrl: '/views/404.html'
  })

}])