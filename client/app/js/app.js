var app = angular.module('whichStarApp', ['ngRoute', 'testCtrls']);

app.config(function($routeProvider) {
  $routeProvider.when('/hello', {
    templateUrl: 'templates/hello.html',
    controller: 'helloCtrl'
  }).when('/list', {
    templateUrl: 'templates/list.html',
    controller: 'listCtrl'
  }).when('/header', {
    templateUrl: 'templates/header.html'
    // controller: 'headerCtrl'
  }).otherwise({
    redirectTo: '/hello'
  });
});

