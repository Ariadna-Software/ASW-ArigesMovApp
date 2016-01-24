(function () {
    'use strict';

    angular.module('agsMovApp.proveedores')
        .controller('ProveedoresDescuentosRappelesCtrl', ProveedoresDescuentosRappelesCtrl);

    ProveedoresDescuentosRappelesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ProveedoresFactory', 'UserFactory', 'ArticulosFactory', 'Loader'];

    function ProveedoresDescuentosRappelesCtrl($rootScope, $scope, $state, ProveedoresFactory, UserFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            proveedor: null,
            descuentos: []
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
            $scope.searchComplete = false;
            $scope.datos.proveedor = ProveedoresFactory.getProveedorLocal();
            $scope.searchDescuentos();
        }

        $scope.searchDescuentos = function () {
            Loader.showLoading('Buscando descuentos..');
            ProveedoresFactory.getProveedoresDescuentosRappeles($scope.datos.proveedor.codprove).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    // formateo de valores numéricos
                    for (var i=0; i < data.length; i++){
                        data[i].fechadto = moment(data[i].fechadto).format('DD/MM/YYYY');
                        data[i].dtoline1 = numeral(data[i].dtoline1).format('0,0');
                        data[i].dtoline2 = numeral(data[i].dtoline2).format('0,0');
                        data[i].rap1 = numeral(data[i].rap1).format('0,0');
                        data[i].rap2 = numeral(data[i].rap2).format('0,0');
                    }
                    $scope.datos.descuentos = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        }
        //$scope.load();
    }

})();
