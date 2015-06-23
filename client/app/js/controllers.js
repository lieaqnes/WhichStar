var HomeCtrls = angular.module('IndexCtrls', ['myCarousel']);
HomeCtrls.controller('homeCtrl', ['$scope', 'imageList', 'getStarInfo', function($scope, imageList, getStarInfo) {
    // $http.get('/data/imagelist.json').success(function(data) {
    //     $scope.imagelist = data.imageURL;
    // });
    $scope.imagelist = imageList.query();
    $scope.res = false;
    $scope.setting = {
        'opacity': 0
    };

    $scope.usePhoto = function() {
        var currURL = $scope.getCurrentSlide();

        $scope.response = getStarInfo.get({url: currURL}, function(response) {
            $scope.res = true;
        });
        // $http.get('/data/response.json').success(function(data) {
        //     $scope.response = data;
        //     $scope.res = true;
        // });
    };

    $scope.uploadImage = function(element) {
        console.log('aaa');
        $scope.$apply(function(scope) {
            var photofile = element.files[0];
            var reader = new FileReader();
            reader.onload = function(e) {
                var api = new FacePP('0ef14fa726ce34d820c5a44e57fef470', '4Y9YXOMSDvqu1Ompn9NSpNwWQFHs1hYD');
                api.request('detection/detect', {
                    url: 'http://cn.faceplusplus.com/static/resources/python_demo/1.jpg'
                }, function(err, result) {
                    if (err) {
                        // TODO handle error
                        return;
                    }
                    console.log(result.face[0].face_id);
                    api.request('person/create', {
                        person_name: 'FanBingbing',
                        face_id: result.face[0].face_id
                    }, function(err, result) {
                        if (err) {
                            // TODO handle error
                            return;
                        }
                        console.log('success');
                    });
                });
            };
            reader.readAsBinaryString(photofile);
        });
    };
}]);

HomeCtrls.controller('listCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});
