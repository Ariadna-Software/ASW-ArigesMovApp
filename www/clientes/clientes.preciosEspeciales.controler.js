(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesPreciosEspecialesCtrl', ClientesPreciosEspecialesCtrl);

    ClientesPreciosEspecialesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'ArticulosFactory', 'Loader'];

    function ClientesPreciosEspecialesCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            cliente: null,
            articulos: []
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
            Loader.showLoading('Buscando articulos..');
            ArticulosFactory.getArticulosPreciosEspeciales($scope.datos.cliente.codclien).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    // formateo de valores numéricos
                    for (var i=0; i < data.length; i++){
                        data[i].precioac = numeral(data[i].precioac).format('0,0.00 $');
                        data[i].dtoespe = numeral(data[i].dtoespe).format('0,0');
                    }
                    $scope.datos.articulos = data;
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
