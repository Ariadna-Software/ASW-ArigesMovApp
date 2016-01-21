(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesPreciosCtrl', ClientesPreciosCtrl);

    ClientesPreciosCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'ArticulosFactory', 'Loader'];

    function ClientesPreciosCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            cliente: null,
            parnom: null,
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
        }

        $scope.searchArticulos = function () {
            Loader.showLoading('Buscando articulos..');
            ArticulosFactory.getArticulosCliente($scope.datos.cliente.codclien,
                $scope.datos.cliente.codactiv,
                $scope.datos.cliente.codtarif,
                $scope.datos.parnom).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    // formateo de valores numéricos
                    for (var i=0; i < data.length; i++){
                        data[i].precio.pvp = numeral(data[i].precio.pvp).format('0,0.00 $');
                        data[i].precio.dto1 = numeral(data[i].precio.dto1).format('0,0');
                        data[i].precio.dto2 = numeral(data[i].precio.dto2).format('0,0');
                        data[i].precio.importe = numeral(data[i].precio.importe).format('0,0.00 $');
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

        $scope.hideSearch = function () {
            $scope.searchComplete = false;
            $scope.parnom = null;
        }

        $scope.goArticulo = function (articulo) {
            // guardar el cliente en local
            ArticulosFactory.saveArticuloLocal(articulo);
            // ir a la vista adecuada
            $state.go('cli.preciosDetalle');
        }

        //$scope.load();
    }

})();
