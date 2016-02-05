(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('CliEditCtrl', CliEditCtrl);

    CliEditCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'ClientesFactory', 'ActividadesFactory', 'UserFactory', 'Loader'];

    function CliEditCtrl($rootScope, $scope, $state, $ionicPopup, ClientesFactory, ActividadesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: dbscliente,
            nomactiv: "",
            actividades: []
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
            $scope.searchCompletePot = false;
            // cargamos el posible cliente potencial
            var c = ClientesFactory.getClienteLocal();
            $scope.datos.cliente = {
                codclien: c.codclien,
                nomclien: c.nomclien,
                nomcomer: c.nomcomer,
                domclien: c.domclien,
                codpobla: c.codpobla,
                pobclien: c.pobclien,
                proclien: c.proclien,
                nifclien: c.nifclien,
                wwwclien: c.wwwclien,
                fechamov: c.fechamov,
                fechaalt: c.fechaalt,
                codactiv: c.codactiv,
                perclie1: c.perclie1,
                telclie1: c.telclie1,
                faxclie1: c.faxclie1,
                maiclie1: c.maiclie1,
                perclie2: c.perclie2,
                maiclie2: c.maiclie2,
                observac: c.observac
            };
            $scope.datos.nomactiv = c.nomactiv;
            $scope.datos.actividad = {
                codactiv: c.codactiv,
                nomactiv: c.nomactiv
            };
        };


        $scope.guardarCliEdit = function(form) {
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
            $scope.datos.cliente.fechaalt = moment($scope.datos.cliente.fechaalt).format('YYYY-MM-DD');
            $scope.datos.cliente.fechamov = moment($scope.datos.cliente.fechamov).format('YYYY-MM-DD');

            var dbreturn = ClientesFactory.putCliente($scope.datos.cliente);
            Loader.showLoading('Guardando cliente...');
            dbreturn.
            success(function(data) {
                Loader.hideLoading();
                // Busacmos y guardamos el cliente que toca
                ClientesFactory.getCliente($scope.datos.cliente.codclien).
                success(function(data) {
                    ClientesFactory.saveClienteLocal(data);
                    $state.go('cli.contacto');
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

        $scope.cancelarCliEdit = function() {
            $state.go('cli.contacto');
        };

        $scope.searchActividades = function() {
            if (!$scope.datos.clipot.nomactiv) {
                $scope.searchActividad = false;
                return;
            }
            Loader.showLoading('Buscando actividades..');
            $scope.searchActividad = true;
            ActividadesFactory.getActividades($scope.datos.clipot.nomactiv).
            success(function(data) {
                Loader.hideLoading();
                $scope.datos.actividades = data;
            }).
            error(function(err, statusCode) {
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

        $scope.selectActividad = function(actividad) {
            $scope.datos.cliente.nomactiv = actividad.nomactiv;
            $scope.datos.cliente.codactiv = actividad.codactiv;
            $scope.datos.actividad = actividad;
            $scope.searchActividad = false;
        };

        var cliDatosOk = function(form) {
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
