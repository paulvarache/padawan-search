'use strict';
/**
 * Parse the CLI params and boot the server/load the data
 */
let argv = require('yargs')
    .usage('Usage: $0 --config [configFile] --log-level [TRACE|DEBUG|INFO|WARN|ERROR|FATAL]')
    .demand('config')
    .describe('config', 'Path to the configuration file')
    .default('log-level', 'INFO')
    .help('h')
    .argv;

let path = require('path');

let opts = {},
    configPath = argv.config;

if (argv.config.substr(0,1) !== '/') {
    configPath = path.join(process.cwd(), configPath);
}

opts.config = require(configPath);
opts.logLevel = argv['log-level'];

// If the params --load is given, just load the data
if (argv.load) {
    let AdsService = require('service/Ads'),
        ads = new AdsService(opts.config.es.host, opts.logLevel.toLowerCase()),
        data = require('./data.json');

        // Create a list of indexes for es
        let esBulk = [];
        for(let i in data.collections) {
            esBulk.push({ index: { _index: 'ads', _type: 'ad', _id: data.collections[i].id } });
            esBulk.push(data.collections[i]);
        }

        // Load the data
        ads.load(esBulk).then(function (resp) {
            console.log(`${resp.items.length} items loaded`);
        }).catch(console.error);
    return;
}

require('./server')(opts);
