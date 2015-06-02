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
 .when('/projects/:id', {
    templateUrl: '/views/projects/show.html',
    controller: 'ProjectShowCtrl'
  })
  .when('/projects/:id/maps', {
    templateUrl: '/views/maps/index.html',
    controller: 'MapCtrl'
  })
  .when('/projects/:id/maps/:id', {
    templateUrl: '/views/maps/show.html',
    controller: 'MapShowCtrl'
  })
  .when('/projects/:id/timelines', {
    templateUrl: '/views/timelines/index.html',
    controller: 'TimelineCtrl'
  })
  .when('/projects/:id/discussions', {
    templateUrl: '/views/discussions/index.html',
    controller: 'DiscussionCtrl'
  })
  .when('/about', {
    templateUrl: '/views/about.html',
    controller: 'StaticCtrl'
  })
  .otherwise({
    templateUrl: '/views/404.html'
  })

}])