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
            PedidosFactory.getPedidosAgente($scope.user.codagent).
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    for (var i = 0; i < data.length; i++) {
                        // formateamos las cabeceras
                        data[i].fecpedcl = moment(data[i].fecpedcl).format('DD/MM/YYYY');
                        if (data[i].totalped) {
                            data[i].totalped = numeral(data[i].totalped).format('0,0.00 $');
                        }
                        // ahora hay que procesar las líneas
                        for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                            data[i].lineas[i2].dtoline1 = numeral(data[i].lineas[i2].dtoline1).format('0,0.00');
                            data[i].lineas[i2].dtoline2 = numeral(data[i].lineas[i2].dtoline2).format('0,0.00');
                            data[i].lineas[i2].precioar = numeral(data[i].lineas[i2].precioar).format('0,0.00 $');
                            data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00 $');
                        }
                    }
                    $scope.datos.pedidos = data;
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

        $scope.goPedido = function (pedido) {
            // guardar el proveedor en local
            PedidosFactory.savePedidoLocal(pedido);
            // ir a la vista adecuada
            $state.go('ped.detalle');
        };
        
        $scope.crearPedido = function (pedido){
            // hacemos el pedido local nulo
            PedidosFactory.savePedidoLocal(null);
            $state.go('ped.detalle');
        }

        //$scope.load();
    }

})();
