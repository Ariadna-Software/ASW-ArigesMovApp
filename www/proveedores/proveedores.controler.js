(function() {
    'use strict';

    angular.module('agsMovApp.proveedores')
        .controller('ProveedoresCtrl', ProveedoresCtrl);

    ProveedoresCtrl.$inject = ['$rootScope', '$scope', '$state', 'ProveedoresFactory', 'UserFactory', 'Loader'];

    function ProveedoresCtrl($rootScope, $scope, $state, ProveedoresFactory, UserFactory, Loader) {

        $scope.datos = {
            parnom: null,
            proveedores: []
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
            $scope.searchComplete = false;
        }

        $scope.searchProveedor = function(){
            Loader.showLoading('Buscando proveedores..');
            ProveedoresFactory.getProveedores($scope.datos.parnom).
            success(function(data){
                Loader.hideLoading();
                $scope.searchComplete = true;
                $scope.datos.proveedores = data;
            }).
            error(function(err, statusCode){
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        }

        $scope.hideSearch = function(){
            $scope.searchComplete = false;
            $scope.parnom = null;
        }

        $scope.goProveedor= function(proveedor){
            // guardar el proveedor en local
            ProveedoresFactory.saveProveedorLocal(proveedor);
            // ir a la vista adecuada
            $state.go('pro.contacto');
        }

        //$scope.load();
    }

})();
