(function () {
    'use strict';

    angular.module('agsMovApp.cobros')
        .controller('CobrosCtrl', CobrosCtrl);

    CobrosCtrl.$inject = ['$rootScope', '$scope', '$state', 'CobrosFactory', 'UserFactory', 'Loader'];

    function CobrosCtrl($rootScope, $scope, $state, CobrosFactory, UserFactory, Loader) {

        $scope.datos = {
            cobros: []
        };

        $scope.$on('$ionicView.enter', function (e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
        });

        $scope.load = function () {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.searchCobros();
        };

        $scope.searchCobros = function () {
            Loader.showLoading('Buscando cobros..');
            $scope.searchFamilia = true;
            CobrosFactory.getLinsCobroAgente($scope.user.codagent).
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    for(var i=0; i < data.length; i++){
                        data[i].fecha = moment(data[i]).format('DD/MM/YYYY');
                    }
                    $scope.datos.cobros = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };

        //$scope.load();
    }

})();
