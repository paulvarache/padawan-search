'use strict';
let AdsController = require('controller/Ads');
module.exports = function (server) {
    server.get({
        path: '/v1/ads'
    }, AdsController.list);
};
