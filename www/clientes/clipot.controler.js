(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClipotCtrl', ClipotCtrl);

    ClipotCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'ClipotsFactory', 'ActividadesFactory', 'UserFactory', 'Loader'];

    function ClipotCtrl($rootScope, $scope, $state, $ionicPopup, ClipotsFactory, ActividadesFactory, UserFactory, Loader) {

        $scope.datos = {
            clipot: dbsclipot,
            nomactiv: "",
            actividades: []
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
            if (!$scope.datos.clipot) {
                $scope.datos.clipot = dbsclipot;
            }
        };


        $scope.guardarClipot = function (form) {
            $scope.hayErrCli = true;
            if (!form.$valid) {
                return;
            } else {
                // comprobaciones adicionales al form
                if (!cliDatosOk(form)) {
                    return;
                }
            }
            $scope.hayErrCli = false;
            // eliminar atributos que no pueden ser guardados en la base de datos
            delete $scope.datos.clipot.nomactiv;
            // agregar / modificar atributos que deben ser guardados y que
            // no ha modificado el propio scope
            if (!$scope.datos.clipot.fechaalt) {
                $scope.datos.clipot.fechaalt = moment(new Date()).format('YYYY-MM-DD');
            } else {
                // confirmar formate correcto de fecha
                $scope.datos.clipot.fechaalt = moment($scope.datos.clipot.fechaalt).format('YYYY-MM-DD');
            }
            $scope.datos.clipot.fechamov = moment(new Date()).format('YYYY-MM-DD');

            var dbreturn = null;
            if ($scope.datos.clipot.codclien) {
                // es una modificación
                dbreturn = ClipotsFactory.putClipot($scope.datos.clipot);
            } else {
                // es un alta
                dbreturn = ClipotsFactory.postClipot($scope.datos.clipot);
            }
            Loader.showLoading('Guardando cliente potencial...');
            dbreturn.
                success(function (data) {
                    ClipotsFactory.saveClipotLocal(data);
                    Loader.hideLoading();
                    $state.go('tab.clientes');
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

        $scope.cancelarClipot = function () {
            $state.go('tab.clientes');
        };

        $scope.borrarClipot = function () {
            if (!$scope.datos.clipot.codclien){
                // es un alta, no hay nada que borrar
                return;
            }
            var confirmPopup = $ionicPopup.confirm({
                title: 'Cliente potencial',
                template: '¿Desea borra cliente potencial ' + $scope.datos.clipot.nomclien + ' ?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    ClipotsFactory.deleteClipot($scope.datos.clipot.codclien).
                        success(function (data) {
                            Loader.hideLoading();
                            Loader.toggleLoadingWithMessage("Cliente borrado");
                            $state.go('tab.clientes');
                        }).
                        error(function (err, statusCode) {
                            Loader.hideLoading();
                            $scope.searchCliente = false;
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

        $scope.searchActividades = function () {
            if (!$scope.datos.clipot.nomactiv) {
                $scope.searchActividad = false;
                return;
            }
            Loader.showLoading('Buscando actividades..');
            $scope.searchActividad = true;
            ActividadesFactory.getActividades($scope.datos.clipot.nomactiv).
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
            $scope.datos.clipot.nomactiv = actividad.nomactiv;
            $scope.datos.clipot.codactiv = actividad.codactiv;
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
