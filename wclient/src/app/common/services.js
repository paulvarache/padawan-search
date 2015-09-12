angular.module('Padawan.services', [])
    .service('Api', ['$http', function ($http) {
        function onError(err) {
            console.error(err);
        }
        
        var baseUrl = window.apiConfig.secure ? 'https://' : 'http://';
        baseUrl += window.apiConfig.host;
        baseUrl += ':' + window.apiConfig.port;
        baseUrl += window.apiConfig.prefix ? window.apiConfig.prefix : '';

        return {
            ads: {
                list: function () {
                    return $http.get(baseUrl + '/ads').error(onError);
                },
                search: function (q) {
                    return $http.get(baseUrl + '/ads?q=' + encodeURIComponent(q)).error(onError);
                }
            }
        };
    }]);
