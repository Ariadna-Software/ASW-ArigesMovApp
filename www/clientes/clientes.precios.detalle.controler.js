(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesAlbaranesDetalleCtrl', ClientesAlbaranesDetalleCtrl);

    ClientesAlbaranesDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesAlbaranesDetalleCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            albaran: null
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
            $scope.datos.albaran = ClientesFactory.getAlbaranLocal();
        }

       //$scope.load();
    }

})();