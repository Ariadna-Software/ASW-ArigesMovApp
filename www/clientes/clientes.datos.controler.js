(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesDatosCtrl', ClientesDatosCtrl);

    ClientesDatosCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesDatosCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            indicadores: null,
            cobros: []
        };

        // solo en pruebas
        $scope.labels = [];
        $scope.series = ['Media', 'Cliente'];
        $scope.data = [
            [],
            []
        ];

        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
        });

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
            // formateo numérico
            if ($scope.datos.cliente.limiteCredito)
                $scope.datos.cliente.limiteCredito = numeral($scope.datos.cliente.limiteCredito).format('0,0.00 $');
            // búsqueda de indicadores
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getIndicadores($scope.datos.cliente.codclien, $scope.datos.cliente.codmacta).
            success(function(data) {
                Loader.hideLoading();
                $scope.datos.indicadores = data;
                // formateo de los datos numéricos
                $scope.datos.indicadores.saldoPendiente = numeral(data.saldoPendiente).format('0,0.00 $');
                $scope.datos.indicadores.saldoVencido = numeral(data.saldoVencido).format('0,0.00 $');
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
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getVentaAnual($scope.datos.cliente.codclien).
            success(function(data) {
                Loader.hideLoading();
                $scope.labels = data.labels;
                $scope.series = data.series;
                $scope.data = data.data
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
            // búsqueda de cobros
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getCobros($scope.datos.cliente.codmacta).
            success(function(data) {
                Loader.hideLoading();
                $scope.datos.cobros = data;
                // formateo de los datos numéricos y fechas
                for (var i = 0; i < $scope.datos.cobros.length; i++) {
                    var vencimiento = new Date($scope.datos.cobros[i].fechavenci);
                    $scope.datos.cobros[i].fechavenci = moment(new Date($scope.datos.cobros[i].fechavenci)).format('DD/MM/YYYY');
                    $scope.datos.cobros[i].fechafact = moment(new Date($scope.datos.cobros[i].fechafact)).format('DD/MM/YYYY');
                    $scope.datos.cobros[i].total = numeral($scope.datos.cobros[i].total).format('0,0.00 $');
                    // marcar como vencido
                    if (new Date() >= vencimiento) {
                        $scope.datos.cobros[i].vencido = true;
                    } else {
                        $scope.datos.cobros[i].vencido = false;
                    }
                }
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

        $scope.goCobro = function(cobro) {
            ClientesFactory.saveCobroLocal(cobro);
            $state.go('cli.cobro');
        }

        //$scope.load();
    }

})();
