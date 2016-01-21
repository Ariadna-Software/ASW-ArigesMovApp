(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesPreciosDetalleCtrl', ClientesPreciosDetalleCtrl);

    ClientesPreciosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'ArticulosFactory', 'Loader'];

    function ClientesPreciosDetalleCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            cliente: null,
            articulo: null
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
            $scope.datos.articulo = ArticulosFactory.getArticuloLocal();
        }

       //$scope.load();
    }

})();