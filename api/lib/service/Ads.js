'use strict';
let elasticsearch = require('elasticsearch');
let _connection = null;
class Ads {
    constructor (host, log) {
        if (!Ads.connection) {
            Ads.connection = new elasticsearch.Client({
                host,
                log: 'info'
            });
        }
    }
    static get connection () {
        return _connection;
    }
    static set connection (value) {
        _connection = value;
    }
    list () {
        return Ads.connection.search({
            index: 'ads',
            type: 'ad',
            body: {
                query: {
                    match_all: {}
                }
            }
        }).then(function (results) {
            return results.hits.hits.map(function (hit) {
                return hit._source;
            });
        });
    }
    search (q) {
        return Ads.connection.search({
            index: 'ads',
            type: 'ad',
            body: {
                query: {
                    query_string: {
                        query: q
                    }
                }
            }
        }).then(function (results) {
            return results.hits.hits.map(function (hit) {
                return hit._source;
            });
        });
    }
    load (indexes) {
        return Ads.connection.bulk({
            body: indexes
        });
    }
}

module.exports = Ads;
