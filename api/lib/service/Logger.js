'use strict';
let bunyan = require('bunyan'),
    logger = bunyan.createLogger({
        name: 'Padawan search API',
        serializers: {
            req: bunyan.stdSerializers.req
        }
    });

module.exports = logger;
