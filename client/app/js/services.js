'use strict';

/* Services */

var whichStarServices = angular.module('whichStarServices', ['ngResource']);
var baseUrl = 'http://localhost:3000/';
whichStarServices.factory('imageList', ['$resource',
  function($resource) {
    return $resource(baseUrl + 'imageList', {}, {
        query: {
            method: 'GET',
            isArray: true
        }
    });
  }
]);
whichStarServices.factory('getStarInfo', ['$resource',
  function($resource) {
    return $resource(baseUrl + 'getStarInfoByURL/:url', {}, {
        query: {
            method: 'GET',
            params: {
                url: 'url'
            },
            isArray: false
        }
    });
  }
]);
whichStarServices.factory('getStar', ['$resource',
  function($resource) {
    return $resource(baseUrl + 'getStarInfoByFaceId/:faceId', {}, {
        query: {
            method: 'GET',
            params: {
                faceId: 'faceId'
            },
            isArray: false
        }
    });
  }
]);
