(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesPedidosCtrl', ClientesPedidosCtrl);

    ClientesPedidosCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader', 'NavFactory', 'PedidosFactory'];

    function ClientesPedidosCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader, NavFactory, PedidosFactory) {

        $scope.datos = {
            cliente: null,
            pedidos: []
        };

        $scope.$on('$ionicView.enter', function (e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
            $scope.getPedidos();
        });

        $scope.load = function () {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
        }

        $scope.getPedidos = function () {
            // búsqueda de indicadores
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getPedidos($scope.datos.cliente.codclien).
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    for (var i = 0; i < data.length; i++) {
                        // formateamos las cabeceras
                        data[i].fecentre = moment(data[i].fecentre).format('DD/MM/YYYY');
                        data[i].fecpedcl = moment(data[i].fecpedcl).format('DD/MM/YYYY');
                        data[i].totalped = numeral(data[i].totalped).format('0,0.00 $');
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
        }

        $scope.crearPedido = function (pedido) {
            // hacemos el pedido local nulo
            PedidosFactory.savePedidoLocal(null);
            NavFactory.setNavLocal("cliped");
            $state.go('ped.detalle');
        }

        $scope.goPedido = function (pedido) {
            // guardar el cliente en local
            ClientesFactory.savePedidoLocal(pedido);
            // guardando vista para navegación
            NavFactory.setNavLocal("cliped");
            // ir a la vista adecuada
            $state.go('ped.detalle');
        }

        //$scope.load();
    }

})();
