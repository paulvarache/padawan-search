'use strict';
let AdsController = {},
    AdsService = require('service/Ads');

AdsController.list = function list(req, res, next) {
    let ads = new AdsService(req.config.es.host);
    if (req.params.q) {
        ads.search(req.params.q).then(function (result) {
            res.send(result);
        }).catch(next);
    } else {
        ads.list().then(function (result) {
            res.send(result);
        }).catch(next);
    }
};

module.exports = AdsController;
