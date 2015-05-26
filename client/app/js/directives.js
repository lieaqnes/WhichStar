angular.module('myCarousel', [])
.controller('CarouselController', ['$scope', function($scope, $element) {
    var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1;
    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
    };

    $scope.name = 'test';
}])
.directive('carousel', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/widget/carousel.html',
        controller: 'CarouselController',
        transclude: true
    };
})
.directive('slide', function() {
    return {
        restrict: 'EA',
        transclude: true,
        require: '^carousel',
        templateUrl: '/templates/widget/slide.html',
        replace: true,
        link: function(scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);
        }
    };
});
