(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesFacturaCtrl', ClientesFacturaCtrl);

    ClientesFacturaCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesFacturaCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            facturas: []
        };

        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
            $scope.getFacturas();
        });

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
        }

        $scope.getFacturas = function() {
            // búsqueda de indicadores
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getFacturas($scope.datos.cliente.codclien).
            success(function(data) {
                Loader.hideLoading();
                // formateo de los datos numéricos
                for (var i = 0; i < data.length; i++) {
                    // formateamos las cabeceras
                    data[i].fecfactu = moment(data[i].fecfactu).format('DD/MM/YYYY');
                    data[i].totalfac = numeral(data[i].totalfac).format('0,0.00 $');
                    data[i].bases = numeral(data[i].bases).format('0,0.00 $');
                    data[i].cuotas = numeral(data[i].cuotas).format('0,0.00 $');
                    // ahora hay que procesar las líneas
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        data[i].lineas[i2].dtoline1 = numeral(data[i].lineas[i2].dtoline1).format('0,0.00');
                        data[i].lineas[i2].dtoline2 = numeral(data[i].lineas[i2].dtoline2).format('0,0.00');
                        data[i].lineas[i2].precioar = numeral(data[i].lineas[i2].precioar).format('0,0.00 $');
                        data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00 $');
                    }
                }
                $scope.datos.facturas = data;

            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        }

        $scope.goFactura = function(factura) {
            // guardar el cliente en local
            ClientesFactory.saveFacturaLocal(factura);
            // ir a la vista adecuada
            $state.go('cli.facturasDetalle');
        }

        //$scope.load();
    }

})();
