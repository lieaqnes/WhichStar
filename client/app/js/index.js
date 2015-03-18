var app = angular.module('whichStarApp', []);

app.controller('helloWorld', function($scope) {
  $scope.greeting = {
    text: 'Hello',
    A: 'A'
  };
});
app.directive('hello', function() {
  return {
    restrict: 'E',
    template: '<div>Hi everyone!</div>',
    replace: true
  };
});

