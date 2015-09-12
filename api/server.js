'use strict';
let restify = require('restify'),
    logger  = require('service/Logger');

module.exports = function (opts) {

    let server = restify.createServer({
        name: 'Padawan search',
        log: logger
    });

    server.use(restify.CORS())
        .use(restify.queryParser());

    // Load the routes file
    require('./routes/v1/ads')(server);

    // Create a child logger for the request, log the request and add
    // the config to the req object
    server.pre(function (req, res, next) {
        req.log = logger.child({id: req.id});
        req.config = opts.config;
        req.log.info({req: req});
        next();
    });

    server.listen(opts.config.server.port, function () {
        logger.info(`Server listenning on port ${opts.config.server.port}`);
    });
};
