(function () {
    'use strict';

    angular.module('agsMovApp.pedidos')
        .controller('PedidosDetalleCtrl', PedidosDetalleCtrl);

    PedidosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'PedidosFactory', 'UserFactory', 'Loader'];

    function PedidosDetalleCtrl($rootScope, $scope, $state, PedidosFactory, UserFactory, Loader) {

        $scope.datos = {
            pedido: null,
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
            $scope.datos.pedido = PedidosFactory.getPedidoLocal();
        }

        //$scope.load();
    }

})();
