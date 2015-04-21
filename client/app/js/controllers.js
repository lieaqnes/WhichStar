var testCtrls = angular.module('testCtrls', []);
testCtrls.controller('helloCtrl', function($scope, $rootScope) {
  $scope.pageName = 'World';
  $rootScope.departure = 'Angular';
});

testCtrls.controller('listCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});