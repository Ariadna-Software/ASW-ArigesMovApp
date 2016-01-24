(function() {
    'use strict';

    angular.module('agsMovApp.articulos')
        .controller('ArticulosDetalleCtrl', ArticulosDetalleCtrl);

    ArticulosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'ArticulosFactory', 'UserFactory', 'Loader'];

    function ArticulosDetalleCtrl($rootScope, $scope, $state, ArticulosFactory, UserFactory, Loader) {

        $scope.datos = {
            articulo: null,
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
            $scope.datos.articulo = ArticulosFactory.getArticuloLocal();
        }

        $scope.verMapa = function() {
            //$state.go('map');
        };

        //$scope.load();
    }

})();
