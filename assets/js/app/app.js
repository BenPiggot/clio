var ClioApp = angular.module('ClioApp', ['ngRoute', 'ngResource', 'ui.bootstrap', 'leaflet-directive']);

ClioApp.run(['$rootScope', function($rootScope) {
  console.log('app is up and running')

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