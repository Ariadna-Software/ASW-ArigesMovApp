(function () {
    'use strict';

    angular.module('agsMovApp.pedidos')
        .controller('PedidosCtrl', PedidosCtrl);

    PedidosCtrl.$inject = ['$rootScope', '$scope', '$state', 'PedidosFactory', 'UserFactory', 'Loader', 'NavFactory'];

    function PedidosCtrl($rootScope, $scope, $state, PedidosFactory, UserFactory, Loader, NavFactory) {

        $scope.datos = {
            pedidos: []
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
            $scope.searchPedidos();
        };

        $scope.searchPedidos = function () {
            if ($scope.datos.parnom == "") {
                $scope.searchFamilia = false;
                return;
            }
            Loader.showLoading('Buscando pedidos..');
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
            NavFactory.setNavLocal("ped");  
            // ir a la vista adecuada
            $state.go('ped.detalle');
        };
        
        $scope.crearPedido = function (pedido){
            // hacemos el pedido local nulo
            PedidosFactory.savePedidoLocal(null);
            NavFactory.setNavLocal("ped");            
            $state.go('ped.detalle');
        }

        //$scope.load();
    }

})();
