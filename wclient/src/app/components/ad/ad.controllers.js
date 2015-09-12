angular.module('Padawan.ad')
    .controller('AdListController', ['$scope', 'Api', function ($scope, Api) {
        Api.ads.list().success(function (ads) {
            $scope.results = ads;
        });
        $scope.searchBuffer = null;
        $scope.onSearchChange = function () {
            clearTimeout($scope.searchBuffer);
            $scope.searchBuffer = setTimeout($scope.search, 300);
        };
        $scope.search = function () {
            Api.ads.search($scope.q).success(function (ads) {
                $scope.results = ads;
            });
        };
    }]);
