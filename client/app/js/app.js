var app = angular.module('whichStarApp', ['ui.router', 'testCtrls', 'ngAnimate']);

app.run(function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
});

app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  $stateProvider
    .state('index', {
      url: '/index',
      views: {
        'main': {
          templateUrl: 'templates/hello.html'
        }
      }
    })
    .state('about', {
      url: '/about',
      views: {
        'main': {
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('tech', {
      url: '/techIntro',
      views: {
        'main': {
          templateUrl: 'templates/tech.html'
        }
      }
    });

  // $routeProvider.when('/hello', {
  //   templateUrl: 'templates/hello.html',
  //   controller: 'helloCtrl'
  // }).when('/list', {
  //   templateUrl: 'templates/list.html',
  //   controller: 'listCtrl'
  // }).when('/header', {
  //   templateUrl: 'templates/header.html'
  //   // controller: 'headerCtrl'
  // }).otherwise({
  //   redirectTo: '/hello'
  // });
});

