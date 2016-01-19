(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesPedidosDetalleCtrl', ClientesPedidosDetalleCtrl);

    ClientesPedidosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesPedidosDetalleCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            pedido: null
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
            $scope.datos.pedido = ClientesFactory.getPedidoLocal();
        }

       //$scope.load();
    }

})();