(function() {
    'use strict';

    angular.module('agsMovApp.proveedores')
        .controller('ProveedoresContactoCtrl', ProveedoresContactoCtrl);

    ProveedoresContactoCtrl.$inject = ['$rootScope', '$scope', '$state', 'ProveedoresFactory', 'UserFactory', 'Loader'];

    function ProveedoresContactoCtrl($rootScope, $scope, $state, ProveedoresFactory, UserFactory, Loader) {

        $scope.datos = {
            proveedor: null,
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
            $scope.datos.proveedor = ProveedoresFactory.getProveedorLocal();
        }

        $scope.verMapa = function() {
            //$state.go('map');
        };

        //$scope.load();
    }

})();
