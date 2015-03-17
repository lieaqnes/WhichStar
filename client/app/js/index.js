var app = angular.module('whichStarApp', []);

app.controller('helloWorld', function($scope) {
  $scope.greeting = {
    text: 'Hello'
  };
});
app.directive('hello', function() {
  return {
    restrict: 'E',
    template: '<div>Hi everyone!</div>',
    replace: true
  };
});

