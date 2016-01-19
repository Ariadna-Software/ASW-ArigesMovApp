(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesAlbaranesCtrl', ClientesAlbaranesCtrl);

    ClientesAlbaranesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesAlbaranesCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            albaranes: []
        };

        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
            $scope.getAlbaranes();
        });

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
        }

        $scope.getAlbaranes = function() {
            // búsqueda de indicadores
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getAlbaranes($scope.datos.cliente.codclien).
            success(function(data) {
                Loader.hideLoading();
                // formateo de los datos numéricos
                for (var i = 0; i < data.length; i++) {
                    // formateamos las cabeceras
                    data[i].fechaalb = moment(data[i].fechaalb).format('DD/MM/YYYY');
                    data[i].totalalb = numeral(data[i].totalalb).format('0,0.00 $');
                    // ahora hay que procesar las líneas
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        data[i].lineas[i2].dtoline1 = numeral(data[i].lineas[i2].dtoline1).format('0,0.00');
                        data[i].lineas[i2].dtoline2 = numeral(data[i].lineas[i2].dtoline2).format('0,0.00');
                        data[i].lineas[i2].precioar = numeral(data[i].lineas[i2].precioar).format('0,0.00 $');
                        data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00 $');
                    }
                }
                $scope.datos.albaranes = data;

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

        $scope.goAlbaran = function(albaran) {
            // guardar el cliente en local
            ClientesFactory.saveAlbaranLocal(albaran);
            // ir a la vista adecuada
            $state.go('cli.albaranesDetalle');
        }

        //$scope.load();
    }

})();
