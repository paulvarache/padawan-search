angular.module('Padawan.ad')
    .directive('adCard', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/ad/card.html',
            scope: {
                ad: '='
            }
        };
    });
