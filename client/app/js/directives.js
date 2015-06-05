angular.module('myCarousel', [])
.controller('CarouselController', ['$scope', '$element', function($scope, $element) {
    var self = this,
        slides = self.slides = $scope.slides = [],
        currentIndex = -1;
    $scope.$on('slideFinish', function() {
        initCarcousel($element);
        currentIndex = 0;
    });
    $scope.left = function() {
        rotate('left');
    };
    $scope.right = function() {
        rotate('right');
    };
    self.setting = {
        'width': 1200,
        'height': 360,
        'slideWidth': 270,//set for default. will change after first slide insertion
        'slideHeight': 360,//set for default. will change after first slide insertion
        'scale': 0.9,
        'opacity': 0.2,
        'speed': 500,
        'autoPlay': true
    };

    function rotate(dir) {
        if (dir === 'left') {
            currentIndex = currentIndex + 1;
            var firstItem = self.slides[0].$element,
                fwidth = firstItem.css('width'),
                fheight = firstItem.css('height'),
                fzIndex = firstItem.css('zIndex'),
                fleft = firstItem.css('left'),
                ftop = firstItem.css('top'),
                fopacity = firstItem.css('opacity'),
                sliceSlide = self.slides.slice(0, self.slides.length - 1),
                last = self.slides[self.slides.length - 1];
            //set css except for the last one
            angular.forEach(sliceSlide, function(value, key) {
                var nextItem = self.slides[(key + 1) % self.slides.length].$element,
                    width = nextItem.css('width'),
                    height = nextItem.css('height'),
                    zIndex = nextItem.css('zIndex'),
                    left = nextItem.css('left'),
                    top = nextItem.css('top'),
                    opacity = nextItem.css('opacity');
                value.$element.css({
                    width: width,
                    height: height,
                    zIndex: zIndex,
                    left: left,
                    top: top,
                    opacity: opacity
                });
            });

            //set last item css
            last.$element.css({
                width: fwidth,
                height: fheight,
                zIndex: fzIndex,
                left: fleft,
                top: ftop,
                opacity: fopacity
            });
        }
        else if (dir === 'right') {
            angular.forEach(self.slides, function(value, key) {
                var prev = self.slides[(key - 1 + self.slides.length) % self.slides.length];
                console.log(prev.$element.html());
            });
        }

    };

    function initCarcousel(element) {
        var h = (self.setting.height - self.setting.slideHeight),
            w = (self.setting.width - self.setting.slideWidth) / 2,
            otherSlide = self.slides.slice(1),
            level = otherSlide.length / 2,
            rightSlide = otherSlide.slice(0, level),
            leftSlide = otherSlide.slice(level);
        //set the carcousel size
        element.css({
            width: self.setting.width + 'px',
            height: self.setting.height + 'px'
        });

        //set the first slide
        slides[0].$element.css({
            top: h + 'px',
            left: w + 'px',
            zIndex: level + 1,
            height: self.setting.height,
            width: self.setting.slideWidth,
            opacity: 1
        });

        //set other slide
        //right slide
        var sh = self.setting.slideHeight * self.setting.scale,
            sw = self.setting.slideWidth * self.setting.scale;
        angular.forEach(rightSlide, function(value, key) {
            value.$element.css({
                top: (self.setting.height - sh) / 2 + 'px',
                left: self.setting.width / 2 + self.setting.slideWidth / 2 + w / level * (key + 1) - sw + 'px',
                zIndex: level - key,
                height: sh + 'px',
                width: sw + 'px',
                opacity: 1 - self.setting.opacity * (key + 1)
            });
            sh = sh * self.setting.scale;
            sw = sw * self.setting.scale;
        });

        //left slide
        sh = sh / self.setting.scale;
        sw = sw / self.setting.scale;
        angular.forEach(leftSlide, function(value, key) {
            value.$element.css({
                top: (self.setting.height - sh) / 2 + 'px',
                left: w / level * key + 'px',
                zIndex: key + 1,
                height: sh + 'px',
                width: sw + 'px',
                opacity: 1 - self.setting.opacity * (level - key)
            });
            sh = sh / self.setting.scale;
            sw = sw / self.setting.scale;
        });
    };

    self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
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
.directive('slide', function($timeout) {
    return {
        restrict: 'EA',
        transclude: true,
        require: '^carousel',
        templateUrl: '/templates/widget/slide.html',
        replace: true,
        link: function(scope, element, attrs, carouselCtrl) {
            carouselCtrl.addSlide(scope, element);
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('slideFinish');
                });
            }
        }
    };
});
