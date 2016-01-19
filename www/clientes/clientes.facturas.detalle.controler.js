(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesFacturaDetalleCtrl', ClientesFacturaDetalleCtrl);

    ClientesFacturaDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesFacturaDetalleCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            factura: null
        };

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
            $scope.datos.factura = ClientesFactory.getFacturaLocal();
        }

       //$scope.load();
    }

})();