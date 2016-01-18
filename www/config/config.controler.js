(function() {
    'use strict';

    angular.module('agsMovApp.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$state', 'ConfigFactory'];

    function ConfigCtrl($scope, $state, ConfigFactory) {
        var config = ConfigFactory.getConfig();
        if (!config) {
            config = {
                urlApi: ""
            }
        }
        $scope.config = config;
        $scope.setConfig = function() {
            ConfigFactory.setConfig($scope.config);
        }
    }

})();
