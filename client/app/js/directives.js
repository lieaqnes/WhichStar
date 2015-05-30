angular.module('myCarousel', [])
.controller('CarouselController', ['$scope', '$element', function($scope, $element) {
    var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1,
        quantity = 0;

    //TODO: the width and height should be get for the DOM
    self.setting = {
        'width': 800,
        'height': 360,
        'slideWidth': 270,//set for default. will change after first slide insertion
        'slideHeight': 360,//set for default. will change after first slide insertion
        'scale': 0.9,
        'speed': 500,
        'autoPlay': true
    };

    function initCarcousel(item) {
        //TODO: should init all the carousel with $element
        var w = (self.setting.width - self.setting.slideWidth) / 2;
        item.css({
            top: 0,
            left: w + 'px',
            zIndex: 1
        });
    }

    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);

        quantity++;
        if (quantity > 1) {

        }
        else {
            initCarcousel(element);
        }

    };
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
