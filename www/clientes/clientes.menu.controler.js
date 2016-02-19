(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('CliMenuCtrl', CliMenuCtrl);

    CliMenuCtrl.$inject = ['$scope', '$state', 'ConfigFactory'];

    function CliMenuCtrl($scope, $state, ConfigFactory) {
        $scope.$on('$ionicView.enter', function (e) {
            var config = ConfigFactory.getConfig();
            if (!config) {
                config = {
                    urlApi: "",
                    porNomComer: false,
                    numImage: 0
                }
            }
            $scope.config = config;
        });

    }

})();
