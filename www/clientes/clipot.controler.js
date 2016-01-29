(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClipotCtrl', ClipotCtrl);

    ClipotCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClipotsFactory', 'ActividadesFactory', 'UserFactory', 'Loader'];

    function ClipotCtrl($rootScope, $scope, $state, ClipotsFactory, ActividadesFactory, UserFactory, Loader) {

        $scope.datos = {
            clipot: dbsclipot,
            actividades: []
        };

        $scope.guardarClipot = function (form) {
            $scope.hayErrCli = true;
            if (!form.$valid) {
                return;
            }else {
                // comprobaciones adicionales al form
                if (!cliDatosOk(form)) {
                    return;
                }
            }
            $scope.hayErrCli = false;
        };

        $scope.cancelarClipot = function () {
            $state.go('tab.clientes');
        };

        $scope.borrarClipot = function () {

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
            $scope.searchCompletePot = false;
            // cargamos el posible cliente potencial
            $scope.datos.clipot = ClipotsFactory.getClipotLocal();
        }

        $scope.searchActividades = function () {
            if (!$scope.datos.nomactiv) {
                $scope.searchActividad = false;
                return;
            }
            Loader.showLoading('Buscando actividades..');
            $scope.searchActividad = true;
            ActividadesFactory.getActividades($scope.datos.nomactiv).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.datos.actividades = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchActividad = false;
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };
        $scope.selectActividad = function (actividad) {
            $scope.datos.nomactiv = actividad.nomactiv;
            $scope.datos.codactiv = actividad.codactiv;
            $scope.datos.actividad = actividad;
            $scope.searchActividad = false;
        };

        var cliDatosOk = function (form) {
            var r = true;
            if (!$scope.datos.actividad) {
                form.actividad.$error = {
                    eActividad: true
                };
                r = false;
            }
            return r;
        };
        
        //$scope.load();
    }

})();
