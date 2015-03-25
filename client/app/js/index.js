var app = angular.module('whichStarApp', []);

app.controller('helloWorld', function($scope, $rootScope) {
  $scope.greeting = 'World';
  $rootScope.departure = 'Angular';
});

app.controller('ListCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});

app.directive('hello', function() {
  return {
    restrict: 'E',
    template: '<div class="red">Hi everyone!</div>',
    replace: true
  };
});

