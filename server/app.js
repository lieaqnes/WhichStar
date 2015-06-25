var express = require('express');
var port = process.env.PORT || 3000;
var app = express();
var mongoose = require('mongoose');
var Star = require('./models/star');

mongoose.connect('mongodb://localhost/stars');

app.listen(port);
console.log('server started on port ' + port);

app.all('*', function(request, response, next) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'X-Requested-With');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Methods', 'GET');
    response.header('Access-Control-Allow-Methods', 'POST');
    response.header('Access-Control-Allow-Methods', 'PUT');
    response.header('Access-Control-Allow-Methods', 'DELETE');
    response.header('Access-Control-Allow-Methods', 'OPTIONS');
    next();
});

app.get('/imageList', function(req, res) {
    console.log('API: imageList');
    res.send(200, [
            '/img/1.jpg',
            '/img/2.jpg',
            '/img/3.jpg',
            '/img/4.jpg',
            '/img/5.jpg',
            '/img/6.jpg',
            '/img/7.jpg',
            '/img/8.jpg',
            '/img/9.jpg'
        ]
    );
});

app.get('/getStarInfoByURL/:url', function(req, res) {
    console.log('API: getStarInfoByURL ' + req.params.url);
    res.send(200, {
        'name': 'AAA',
        'photoURL': '/img/1.jpg',
        'intro': 'she is .....'
    });
});

app.get('/getStarInfoByFaceId/:faceId', function(req, res) {
    console.log('API: getStarInfoByFaceId ' + req.params.faceId);
    if (req.params.faceId === '20b316fbee5128b5e1fbc3c44708d100') {
        Star.findByFaceId('test', function(err, star) {
            res.send(200, {
                'name': star.name,
                'photoURL': '/img/' + star.image_url,
                'intro': star.info
            });
        });
    }
    else {
        res.send(200, {
            'name': 'AAA',
            'photoURL': '/img/1.jpg',
            'intro': 'she is .....'
        });
    }
});

app.post('/a', function(req, res) {
    //var tmp_path = req.aaa.path;
    JSON.stringify(req.aaa);
    debugger;
    console.log('API: a ' + JSON.stringify(req.aaa));
    res.send(200, {
        'status': 'success'
    });
});

//call in the fontend
