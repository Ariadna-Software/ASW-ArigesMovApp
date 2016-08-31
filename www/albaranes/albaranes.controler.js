(function () {
    'use strict';

    angular.module('agsMovApp.albaranes')
        .controller('AlbaranesCtrl', AlbaranesCtrl);

    AlbaranesCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'AlbaranesFactory', 'UserFactory', 'Loader', 'ClientesFactory'];

    function AlbaranesCtrl($rootScope, $scope, $state, $ionicPopup, AlbaranesFactory, UserFactory, Loader, ClientesFactory) {

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
            $scope.searchAlbaranes();
        };

        $scope.searchAlbaranes = function () {
            Loader.showLoading('Buscando albaranes..');
            $scope.searchFamilia = true;
            AlbaranesFactory.getAlbaranesPendientes().
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    for (var i = 0; i < data.length; i++) {
                        data[i].fechaalb = moment(data[i].fechaalb).format('DD/MM/YYYY');
                        if (data[i].fecenvio) {
                            data[i].fecenvio = moment(data[i].fecenvio).format('DD/MM/YYYY');
                            data[i].enviado = true;
                        } else {
                            data[i].enviado = false;
                        }
                    }
                    $scope.datos.albaranes = data;
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

        $scope.searchAlbaranesServidos = function () {
            Loader.showLoading('Buscando albaranes..');
            $scope.searchFamilia = true;
            AlbaranesFactory.getAlbaranesServidos().
                success(function (data) {
                    Loader.hideLoading();
                    // formateo de los datos numéricos
                    for (var i = 0; i < data.length; i++) {
                        data[i].fechaalb = moment(data[i].fechaalb).format('DD/MM/YYYY');
                        if (data[i].fecenvio) {
                            data[i].fecenvio = moment(data[i].fecenvio).format('DD/MM/YYYY');
                            data[i].enviado = true;
                        } else {
                            data[i].enviado = false;
                        }
                    }
                    $scope.datos.albaranes = data;
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
        // Los botones principales
        $scope.albaranesPendientes = function () {
            // llamamos a pendientes
            $scope.searchAlbaranes();
        }
        $scope.albaranesServidos = function () {
            // llamamos a servidos
            $scope.searchAlbaranesServidos();
        }

        $scope.servirAlbaran = function (albaran) {
            Loader.showLoading('Sirviendo albarán...');
            $scope.searchFamilia = true;
            AlbaranesFactory.postServirAlbaran(albaran).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchAlbaranes();
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

        $scope.desServirAlbaran = function (albaran) {
            Loader.showLoading('Pasando a no pendiente...');
            $scope.searchFamilia = true;
            AlbaranesFactory.postDesServirAlbaran(albaran).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchAlbaranes();
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

        $scope.goAlbaran = function (albaran) {
            AlbaranesFactory.saveAlbaranLocal(albaran);
            $state.go('alb.detalle');
        }

        //$scope.load();
    }

})();
