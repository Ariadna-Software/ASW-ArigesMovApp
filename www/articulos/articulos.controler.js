(function () {
    'use strict';

    angular.module('agsMovApp.articulos')
        .controller('ArticulosCtrl', ArticulosCtrl);

    ArticulosCtrl.$inject = ['$rootScope', '$scope', '$state', 'ArticulosFactory', 'UserFactory', 'FamiliasFactory', 'ProveedoresFactory', 'Loader'];

    function ArticulosCtrl($rootScope, $scope, $state, ArticulosFactory, UserFactory, FamiliasFactory, ProveedoresFactory, Loader) {

        $scope.searchFamilia = false;
        $scope.searchProveedor = false;

        $scope.datos = {
            parnom: null,
            parfam: null,
            parpro: null,
            codigo: null,
            obsole: null,
            articulos: [],
            familias: [],
            proveedores: []
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
            $scope.searchFamilia = false;
            $scope.searchProveedor = false;
            $scope.datos = {
                parnom: null,
                parfam: null,
                parpro: null,
                codigo: null,
                obsole: null,
                articulos: [],
                familias: [],
                proveedores: []
            };
        };

        $scope.searchFamilias = function () {
            if ($scope.datos.parnom == "") {
                $scope.searchFamilia = false;
                return;
            }
            Loader.showLoading('Buscando familias..');
            $scope.searchFamilia = true;
            FamiliasFactory.getFamilias($scope.datos.parfam).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.datos.familias = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchFamilia = false;
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };
        $scope.selectFamilia = function (familia) {
            $scope.datos.parfam = familia.nomfamia;
            $scope.searchFamilia = false;
        };

        $scope.searchProveedores = function () {
            if ($scope.datos.parpro == "") {
                $scope.searchProveedor = false;
                return;
            }
            Loader.showLoading('Buscando proveedores..');
            $scope.searchProveedor = true;
            ProveedoresFactory.getProveedores($scope.datos.parpro).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.datos.proveedores = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchProveedor = false;
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };
        $scope.selectProveedor = function (proveedor) {
            $scope.datos.parpro = proveedor.nomprove;
            $scope.searchProveedor = false;
        };

        $scope.searchArticulos = function () {
            Loader.showLoading('Buscando articulos..');
            ArticulosFactory.getArticulosExt($scope.datos.parnom,
                $scope.datos.parpro,
                $scope.datos.parfam,
                $scope.datos.codigo,
                $scope.datos.obsole).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    // formatear datos
                    for (var i = 0; i < data.length; i++) {
                        data[i].preciove = numeral(data[i].preciove).format('0,0.00 $');
                        data[i].stock = numeral(data[i].stock).format('0,0');
                        data[i].reservas = numeral(data[i].reservas).format('0,0');
                        data[i].pedido = numeral(data[i].pedido).format('0,0');
                        if (data[i].rotacion == 0) {
                            data[i].rotacion = "NO";
                        } else {
                            data[i].rotacion = "SI";
                        }
                    }
                    $scope.datos.articulos = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                        $scope.load();
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };

        $scope.hideSearch = function () {
            $scope.searchComplete = false;
            $scope.parnom = null;
        };

        $scope.goArticulo = function (articulo) {
            // guardar el proveedor en local
            ArticulosFactory.saveArticuloLocal(articulo);
            // ir a la vista adecuada
            $state.go('art.detalle');
        };

        //$scope.load();
    }

})();
