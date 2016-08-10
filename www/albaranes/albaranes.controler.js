(function() {
    'use strict';

    angular.module('agsMovApp.albaranes')
        .controller('AlbaranesCtrl', AlbaranesCtrl);

    AlbaranesCtrl.$inject = ['$rootScope', '$scope', '$state','$ionicPopup','AlbaranesFactory', 'UserFactory', 'Loader', 'ClientesFactory'];

    function AlbaranesCtrl($rootScope, $scope, $state, $ionicPopup, AlbaranesFactory, UserFactory, Loader, ClientesFactory) {

        $scope.datos = {
            cobros: []
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
            $scope.searchCobros();
        };

        $scope.searchCobros = function() {
            Loader.showLoading('Buscando cobros..');
            $scope.searchFamilia = true;
            AlbaranesFactory.getLinsCobroAgente($scope.user.codagent).
            success(function(data) {
                Loader.hideLoading();
                // formateo de los datos numéricos
                for (var i = 0; i < data.length; i++) {
                    data[i].fecha = moment(data[i]).format('DD/MM/YYYY');
                }
                $scope.datos.cobros = data;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        // A confirm dialog
        $scope.borrarLinea = function(linea) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Pagos',
                template: '¿Borrar la linea ' + linea.id + ' del cobro ' + linea.fecha + ' ?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    AlbaranesFactory.deleteLinCobro(linea.numserie, linea.codfaccl, moment(linea.fecfaccl).format('YYYY-MM-DD'), linea.numorden, linea.id, linea.importe).
                    success(function(data) {
                        Loader.hideLoading();
                        Loader.toggleLoadingWithMessage("Linea borrada");
                        var cobro = {
                            numserie: linea.numserie,
                            codfaccl: linea.codfaccl,
                            fecfaccl: linea.fecfaccl,
                            numorden: linea.numorden
                        };
                        $scope.searchCobros();
                    }).
                    error(function(err, statusCode) {
                        Loader.hideLoading();
                        if (err) {
                            var msg = err || err.message;
                            Loader.toggleLoadingWithMessage(msg);
                        } else {
                            Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                        }
                    });
                } else {
                    return;
                }
            });
        };

        $scope.goCobro = function(cobro) {
            ClientesFactory.saveCobroLocal(cobro);
            $state.go('cli.cobro');
        }

        //$scope.load();
    }

})();
