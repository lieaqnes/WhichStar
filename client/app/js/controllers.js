var HomeCtrls = angular.module('IndexCtrls', ['myCarousel']);
HomeCtrls.controller('homeCtrl', function($scope, $http) {
    $http.get('/data/imagelist.json').success(function(data) {
        $scope.imagelist = data.imageURL;
    });
    $scope.res = false;
    $scope.setting = {
        'opacity': 0
    };

    $scope.usePhoto = function() {
        var currURL = $scope.getCurrentSlide();
        $http.get('/data/response.json').success(function(data) {
            $scope.response = data;
            $scope.res = true;
        });
    };
    $scope.uploadPhoto = function() {
        console.log('upload');
    };
});

HomeCtrls.controller('listCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});
