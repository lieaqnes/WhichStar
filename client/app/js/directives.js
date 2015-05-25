angular.module('Collapse', [])
.controller('CollapseController', ['$scope', function($scope) {
    var self = this;
    $scope.customer = {
        name: 'Naomi',
        address: '1600 Amphitheatre'
    };
}])
.directive('carousel', function() {
    return {
        restrict: 'EA',
        templateUrl: 'carousel.html',
        replace: true,
        transclude: true
    };
});
