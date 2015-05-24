var HomeCtrls = angular.module('IndexCtrls', []);
HomeCtrls.controller('homeCtrl', function($scope, $http) {
    $http.get('/data/imagelist.json').success(function(data) {
        $scope.imagelist = data.imageURL;
    });
});

HomeCtrls.controller('listCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});
