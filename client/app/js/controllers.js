var HomeCtrls = angular.module('IndexCtrls', ['myCarousel']);
HomeCtrls.controller('homeCtrl', ['$scope', 'imageList', 'getStarInfo', 'getStar', function($scope, imageList, getStarInfo, getStar) {
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

            var api = new FacePP('d20e534fb1084ab31caeaaaba721408d', 'tMFcEnDsY0T1ZP9hb3Q2-3q_cGyqcd1R');
            api.request('detection/detect', {
                //url: 'http://www.faceplusplus.com.cn/static/resources/python_demo/1.jpg'
                img: photofile
                //img: 'ˇÿˇ‡'
            }, function(err, result) {
                if (err) {
                    console.log('aa');
                    // TODO handle error
                    return;
                }
                console.log(result.face[0].face_id);
                api.request('recognition/search', {
                    faceset_id: 'a251556c0e0ff26582ce06dab4bd4f50',
                    key_face_id: result.face[0].face_id
                }, function(err, result) {
                    if (err) {
                        // TODO handle error
                        return;
                    }
                    console.log('success');
                    $scope.response = getStar.get({faceId: result.candidate[0].face_id}, function(response) {
                        $scope.res = true;
                    });
                });
            });

            // var reader = new FileReader();
            // reader.onload = function(e) {
            //     var date = e.target.result.split(',')[1];
            //     console.log(date);
            //     var api = new FacePP('d20e534fb1084ab31caeaaaba721408d', 'tMFcEnDsY0T1ZP9hb3Q2-3q_cGyqcd1R');
            //     api.request('detection/detect', {
            //         url: 'http://www.faceplusplus.com.cn/static/resources/python_demo/1.jpg'
            //         //img: date
            //         //img: 'ˇÿˇ‡'
            //     }, function(err, result) {
            //         if (err) {
            //             console.log('aa');
            //             // TODO handle error
            //             return;
            //         }
            //         console.log(result.face[0].face_id);
            //         api.request('recognition/search', {
            //             faceset_id: 'a251556c0e0ff26582ce06dab4bd4f50',
            //             key_face_id: result.face[0].face_id
            //         }, function(err, result) {
            //             if (err) {
            //                 // TODO handle error
            //                 return;
            //             }
            //             console.log('success');
            //             $scope.response = getStar.get({faceId: result.candidate[0].face_id}, function(response) {
            //                 $scope.res = true;
            //             });
            //         });
            //     });
            // };
            // reader.readAsDataURL(photofile);
        });
    };
}]);

HomeCtrls.controller('listCtrl', function($scope) {
  $scope.names = ['Amy', 'Nicole', 'Leah', 'Jack'];
});
