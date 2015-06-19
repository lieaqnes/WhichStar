var express = require('express');
var port = process.env.PORT || 3000;
var app = express();

app.listen(port);

app.get('/imageList', function(req, res) {
    console.log('API: imageList');
    res.send(200, {
        'imageURL': [
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
    });
});

app.get('/getStarInfoByURL/:url', function(req, res) {
    console.log('API: getStarInfoByURL ' + req.params.url);
    res.send(200, {
        'name': 'AAA',
        'photoURL': '/img/1.jpg',
        'intro': 'she is .....'
    });
});
