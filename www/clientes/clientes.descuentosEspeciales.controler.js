(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesDescuentosEspecialesCtrl', ClientesDescuentosEspecialesCtrl);

    ClientesDescuentosEspecialesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'ArticulosFactory', 'Loader'];

    function ClientesDescuentosEspecialesCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            cliente: null,
            descuentos: []
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
            $scope.searchComplete = false;
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
            $scope.searchArticulos();
        }

        $scope.searchArticulos = function () {
            Loader.showLoading('Buscando descuentos..');
            ArticulosFactory.getArticulosDescuentosEspeciales($scope.datos.cliente.codclien).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    // formateo de valores numéricos
                    for (var i=0; i < data.length; i++){
                        data[i].fechadto = moment(data[i].fechadto).format('DD/MM/YYYY');
                        data[i].dtoline1 = numeral(data[i].dtoline1).format('0,0');
                        data[i].dtoline2 = numeral(data[i].dtoline2).format('0,0');
                    }
                    $scope.datos.descuentos = data;
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
        }
        //$scope.load();
    }

})();
