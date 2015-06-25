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
    if (request.method === 'OPTIONS')
        return response.send(200);
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
    Star.findByUrl(req.params.url, function(err, star) {
        console.log(star);
        res.send(200, {
            'name': star.name,
            'photoURL': star.image_url,
            'intro': star.info
        });
    });
});

app.get('/getStarInfoByFaceId/:faceId', function(req, res) {
    console.log('API: getStarInfoByFaceId ' + req.params.faceId);
    Star.findByFaceId(req.params.faceId, function(err, star) {
        console.log(star);
        res.send(200, {
            'name': star.name,
            'photoURL': star.image_url,
            'intro': star.info
        });
    });
});

app.post('/saveStar', function(req, res) {
    console.log(req.body);
    res.send(200, {
        'status': 'success'
    });
});

//call in the fontend
