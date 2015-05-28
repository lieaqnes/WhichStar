angular.module('myCarousel', [])
.controller('CarouselController', ['$scope', '$element', function($scope, $element) {
    var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1;

    self.setting = {
        'width': $element[0].offsetWidth,
        'height': $element[0].offsetHeight,
        'slideWidth': 0,//set for default. will change after first slide insertion
        'slideHeight': 0,//set for default. will change after first slide insertion
        'scale': .9,
        'speed': 500,
        'autoPlay': true
    };
    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        if (slides.length === 1) {
            this.setting.slideWidth = element[0].offsetWidth;
        }
    };

    $scope.name = 'test';
}])
.directive('carousel', function() {
    return {
        restrict: 'E',
        templateUrl: '/templates/widget/carousel.html',
        controller: 'CarouselController',
        transclude: true,
        replace: true
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
