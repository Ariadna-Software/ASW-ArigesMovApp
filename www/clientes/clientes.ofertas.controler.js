(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesOfertasCtrl', ClientesOfertasCtrl);

    ClientesOfertasCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesOfertasCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            ofertas: []
        };

        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
            $scope.getOfertas();
        });

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
        }

        $scope.getOfertas = function() {
            // búsqueda de indicadores
            Loader.showLoading('Buscando datos...');
            ClientesFactory.getOfertas($scope.datos.cliente.codclien).
            success(function(data) {
                Loader.hideLoading();
                // formateo de los datos numéricos
                for (var i = 0; i < data.length; i++) {
                    // formateamos las cabeceras
                    data[i].fecentre = moment(data[i].fecentre).format('DD/MM/YYYY');
                    data[i].fecofert = moment(data[i].fecofert).format('DD/MM/YYYY');
                    data[i].totalofe = numeral(data[i].totalofe).format('0,0.00 $');
                    // ahora hay que procesar las líneas
                    for (var i2 = 0; i2 < data[i].lineas.length; i2++) {
                        data[i].lineas[i2].dtoline1 = numeral(data[i].lineas[i2].dtoline1).format('0,0.00');
                        data[i].lineas[i2].dtoline2 = numeral(data[i].lineas[i2].dtoline2).format('0,0.00');
                        data[i].lineas[i2].precioar = numeral(data[i].lineas[i2].precioar).format('0,0.00 $');
                        data[i].lineas[i2].importel = numeral(data[i].lineas[i2].importel).format('0,0.00 $');
                    }
                }
                $scope.datos.ofertas = data;

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

        $scope.goOferta = function(oferta) {
            // guardar el cliente en local
            ClientesFactory.saveOfertaLocal(oferta);
            // ir a la vista adecuada
            $state.go('cli.ofertasDetalle');
        }

        //$scope.load();
    }

})();
