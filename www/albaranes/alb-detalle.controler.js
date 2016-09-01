(function () {
    'use strict';

    angular.module('agsMovApp.albaranes')
        .controller('AlbaranesDetalleCtrl', AlbaranesDetalleCtrl);

    AlbaranesDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'AlbaranesFactory', 'UserFactory', 'Loader', 'ClientesFactory'];

    function AlbaranesDetalleCtrl($rootScope, $scope, $state, $ionicPopup, AlbaranesFactory, UserFactory, Loader, ClientesFactory) {

        $scope.datos = {
            albaranes: []
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
            $scope.searchAlbaran();
        };

        $scope.searchAlbaran = function () {
            Loader.showLoading('Buscando albaran..');
            $scope.searchFamilia = true;
            var albaran = AlbaranesFactory.getAlbaranLocal();
            AlbaranesFactory.getAlbaranDetalle(albaran.codtipom, albaran.numalbar).
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    data.fechaalb = moment(data.fechaalb).format('DD/MM/YYYY');
                    if (data.fecenvio) {
                        data.fecenvio = moment(data.fecenvio).format('DD/MM/YYYY');
                        data.enviado = true;
                    } else {
                        data.enviado = false;
                    }
                    $scope.datos.albaran = data;
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
        };
    }

})();
