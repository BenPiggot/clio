var ClioApp = angular.module('ClioApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'leaflet-directive', 'pippTimelineDirectives']);


ClioApp.run(['$rootScope', 'UserService', 'AlertService', function($rootScope, UserService, AlertService) {
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
  .when('/projects/:projectId/maps/:id', {
    templateUrl: '/views/maps/show.html',
    controller: 'MapShowCtrl'
  })
  .when('/projects/:id/timeline', {
    templateUrl: '/views/timeline/index.html',
    controller: 'TimelineCtrl'
  })
  .when('/projects/:projectId/timeline/:id', {
    templateUrl: '/views/timeline/show.html',
    controller: 'TimelineShowCtrl'
  })
  .when('/projects/:id/discussion', {
    templateUrl: '/views/discussion/index.html',
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