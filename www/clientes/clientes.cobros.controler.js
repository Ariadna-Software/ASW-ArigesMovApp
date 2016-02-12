(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesCobrosCtrl', ClientesCobrosCtrl);

    ClientesCobrosCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'ClientesFactory', 'CobrosFactory', 'FPagoFactory', 'UserFactory', 'Loader'];

    function ClientesCobrosCtrl($rootScope, $scope, $state, $ionicPopup, ClientesFactory, CobrosFactory, FPagoFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            cobro: null,
            cobroext: null,
            fecha: "",
            nomforpa: "",
            fpagos: []
        };

        
        $scope.searchFPago = false;
        
        $scope.cobro = {
            numserie: 0,
            codfaccl: 0,
            fecfaccl: 0,
            numorden: 1,
            codforpa: 5,
            fecultco: 0,
            impcobro: 111.55
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
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
            $scope.datos.cobro = ClientesFactory.getCobroLocal();
            $scope.datos.cobro.fecfaccl = moment($scope.datos.cobro.fechafact, 'DD/MM/YYYY').format('YYYY-MM-DD');
            $scope.cobro = {
                numserie: $scope.datos.cobro.numserie,
                codfaccl: $scope.datos.cobro.codfaccl,
                fecfaccl: $scope.datos.cobro.fecfaccl,
                numorden: $scope.datos.cobro.numorden,
                codforpa: $scope.datos.cobro.codforpa,
                nomforpa: $scope.datos.cobro.nomforpa,
                fecultco: moment(new Date()).format('YYYY-MM-DD'),
                impcobro: 0
            };
            $scope.lincob = {
                numserie: 0,
                codfaccl: 0,
                fecfaccl: 0,
                numorden: 0,
                id: 0,
                fecha: "",
                importe: 0,
                codforpa: 0,
                codagent: null,
                observa: ""
            };
            $scope.enEdicionLinea = false;
            $scope.searchFPago = false;
            // cargar el cobro extendido
            $scope.getCobroext($scope.datos.cobro);
        };

        $scope.getCobroext = function(cobro) {
            // Primero obtener la cabecera
            Loader.showLoading('Obteniendo cobro...');
            CobrosFactory.getCobro(cobro.numserie, cobro.codfaccl, cobro.fecfaccl, cobro.numorden).
            success(function(data) {
                Loader.hideLoading();
                $scope.datos.cobroext = data;
                // montar para visualización los importes como toca
                $scope.datos.cobroext.importef = numeral(data.impvenci).format('0,0.00 $');
                $scope.datos.cobroext.gastosf = numeral(data.gatos).format('0,0.00 $');
                $scope.datos.cobroext.vencidof = numeral(data.impvenci + data.gastos - data.impcobro - data.imporlin).format('0,0.00 $');
                $scope.datos.cobroext.cobradof = numeral(data.impcobro + data.imporlin).format('0,0.00 $');
                $scope.datos.cobroext.impcobrof = numeral(data.impcobro).format('0,0.00 $');
                $scope.datos.cobroext.imporlinf = numeral(data.imporlin).format('0,0.00 $');
                // al estar guardado en la base de datos lo podemos obtener
                CobrosFactory.getLinsCobro(cobro.numserie, cobro.codfaccl, cobro.fecfaccl, cobro.numorden).
                success(function(data) {
                    for (var i = 0; i < data.length; i++) {
                        data[i].fecha = moment(data[i].fecha).format('DD/MM/YYYY');
                    }
                    $scope.datos.cobroext.lineas = data;
                    CobrosFactory.saveCobroextLocal($scope.datos.cobroext);
                    Loader.hideLoading();
                }).
                error(function(err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchCliente = false;
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
                $scope.searchCliente = false;
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };
        //$scope.load();
        $scope.crearLinea = function() {
            $scope.lincob = {
                numserie: 0,
                codfaccl: 0,
                fecfaccl: 0,
                numorden: 0,
                id: 0,
                fecha: "",
                importe: 0,
                codforpa: 0,
                codagent: null,
                observa: ""
            };
            $scope.datos.nomforpa = $scope.datos.cobroext.nomforpa;
            $scope.datos.fecha = moment(new Date()).format('DD/MM/YYYY');
            $scope.lincob.importe = $scope.datos.cobroext.impvenci + $scope.datos.cobroext.gastos - $scope.datos.cobroext.impcobro - $scope.datos.cobroext.imporlin
            $scope.lincob.importe = roundToTwo($scope.lincob.importe);
            $scope.lincob.codforpa = $scope.datos.cobroext.codforpa;
            $scope.enEdicionLinea = true;
        };

        $scope.cancelarLinea = function() {
            $scope.enEdicionLinea = false;
        };

        var linDatosOk = function(form) {
            var r = true;
            if ($scope.lincob.codforpa == 0) {
                form.fpago.$error = {
                    eFPago: true
                };
                r = false;
            }
            if (!moment($scope.datos.fecha, "DD/MM/YYYY").isValid()) {
                form.fecha.$error = {
                    eFecha: true
                };
                r = false;
            }
            return r;
        };

        $scope.guardarLinea = function(form) {
            $scope.hayErrLin = true;
            if (!form.$valid) {
                return;
            } else {
                // comprobaciones adicionales al form
                if (!linDatosOk(form)) {
                    return;
                }
            }
            $scope.hayErrLin = false;
            if (!$scope.lincob.id) {
                $scope.lincob.id = 0;
            }
            if ($scope.lincob.id != 0) {
                // es un update

            } else {
                // es un insert
                $scope.lincob.codagent = $scope.user.codagent;
                $scope.lincob.numserie = $scope.datos.cobroext.numserie;
                $scope.lincob.codfaccl = $scope.datos.cobroext.codfaccl;
                $scope.lincob.fecfaccl = moment($scope.datos.cobroext.fecfaccl).format('YYYY-MM-DD');
                $scope.lincob.numorden = $scope.datos.cobroext.numorden;
                $scope.lincob.fecha = moment($scope.datos.fecha, 'DD/MM/YYYY').format('YYYY-MM-DD');
                Loader.showLoading('Guardando linea...');
                CobrosFactory.postLinCobro($scope.lincob).
                success(function(data) {
                    Loader.hideLoading();
                    $scope.enEdicionLinea = false;
                    var cobro = {
                        numserie: $scope.lincob.numserie,
                        codfaccl: $scope.lincob.codfaccl,
                        fecfaccl: $scope.lincob.fecfaccl,
                        numorden: $scope.lincob.numorden
                    };
                    // al estar guardado en la base de datos lo podemos obtener
                    $scope.getCobroext(cobro);
                }).
                error(function(err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchCliente = false;
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
            }

        };

        $scope.searchFPago = function() {
            if (!$scope.datos.nomforpa) {
                $scope.searchFPago = false;
                return;
            }
            Loader.showLoading('Buscando formas de pago..');
            $scope.searchFPago = true;
            FPagoFactory.getFPagos($scope.datos.nomforpa).
            success(function(data) {
                Loader.hideLoading();
                $scope.datos.fpagos = data;
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                $scope.searchFPago = false;
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        };

        $scope.selectFPago = function(fpago) {
            $scope.lincob.codforpa = fpago.codforpa;
            $scope.datos.nomforpa = fpago.nomforpa;
            $scope.datos.fpago = fpago;
            $scope.searchFPago = false;
        };

        // A confirm dialog
        $scope.borrarLinea = function(linea) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Pagos',
                template: '¿Borrar la linea ' + linea.id + ' del cobro ' + linea.fecha + ' ?'
            });

            confirmPopup.then(function(res) {
                if (res) {
                    CobrosFactory.deleteLinCobro(linea.numserie, linea.codfaccl, moment(linea.fecfaccl).format('YYYY-MM-DD'), linea.numorden, linea.id, linea.importe).
                    success(function(data) {
                        Loader.hideLoading();
                        Loader.toggleLoadingWithMessage("Linea borrada");
                        var cobro = {
                            numserie: linea.numserie,
                            codfaccl: linea.codfaccl,
                            fecfaccl: linea.fecfaccl,
                            numorden: linea.numorden
                        };
                        $scope.getCobroext($scope.datos.cobro);
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

        // Ver una factura
        $scope.verFactura = function(numserie, cabfaccl, fecfaccl) {
            // la fecha de factura hay que cambiarla de formato
            // DD/MM/YYYY --> YYYY-MM-DD
            fecfaccl = moment(fecfaccl, 'DD/MM/YYYY').format('YYYY-MM-DD');
            Loader.showLoading('Buscando factura..');
            ClientesFactory.getFacturaNumserie(numserie, cabfaccl, fecfaccl).
            success(function(data) {
                Loader.hideLoading();
                ClientesFactory.saveFacturaLocal(data);
                // ir a la vista adecuada
                $state.go('cli.facturasDetalle');

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
    }

})();
