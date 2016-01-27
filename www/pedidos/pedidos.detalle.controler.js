(function () {
    'use strict';

    angular.module('agsMovApp.pedidos')
        .controller('PedidosDetalleCtrl', PedidosDetalleCtrl);

    PedidosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', '$ionicPopup', 'PedidosFactory', 'UserFactory', 'ClientesFactory', 'ArticulosFactory', 'Loader'];

    function PedidosDetalleCtrl($rootScope, $scope, $state, $ionicPopup, PedidosFactory, UserFactory, ClientesFactory, ArticulosFactory, Loader) {

        $scope.datos = {
            pedido: null,
            cliente: null,
            linea: null,
            articulo: null,
            cantidad: null,
            parnomcli: "",
            feccab: null,
            clientes: [],
            articulos: []
        };

        $scope.cabped = {
            numpedcl: 0,
            fecpedcl: moment(new Date()).format('DD/MM/YYYY'),
            codclien: null,
            codtraba: 0,
            codagent: 0,
            codforpa: 0
        };

        $scope.linped = {
            numpedcl: 0,
            numlinea: 0,
            codartic: 0,
            codalmac: 1,
            nomartic: "",
            cantidad: 0,
            precioar: 0,
            dtoline1: 0,
            dtoline2: 0,
            importel: 0,
            bultosser: 0
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
            $scope.datos.pedido = PedidosFactory.getPedidoLocal();
            // hay que guardar en carga al menos el código de clinte
            // por si entra en edición.
            if ($scope.datos.pedido) {
                $scope.datos.cliente = {
                    codclien: $scope.datos.pedido.codclien,
                    nomclien: $scope.datos.pedido.nomclien
                };
            } else {
                // si no hay pedido es que es un alta
                $scope.datos.parnomcli = "";
                $scope.datos.feccab = "";
            }
            $scope.searchCliente = false;
            $scope.searchArticulo = false;
            if ($scope.datos.pedido) {
                $scope.enEdicionCabecera = false;
                $scope.enEdicionLinea = false;
                $scope.cabped = {
                    numpedcl: $scope.datos.pedido.numpedcl,
                    fecpedcl: $scope.datos.pedido.fecpedcl,
                    codclien: $scope.datos.pedido.codclien
                };

            } else {
                $scope.enEdicionCabecera = true;
                $scope.enEdicionLinea = false;
            }
        }

        $scope.searchClientes = function () {
            if (!$scope.datos.parnomcli) {
                $scope.searchCliente = false;
                return;
            }
            Loader.showLoading('Buscando clientes..');
            $scope.searchCliente = true;
            ClientesFactory.getClientes($scope.user.codagent, $scope.datos.parnomcli).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.datos.clientes = data;
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
        };
        $scope.selectCliente = function (cliente) {
            $scope.datos.parnomcli = cliente.nomclien;
            $scope.datos.cliente = cliente;
            $scope.searchCliente = false;
        };

        $scope.editarCabecera = function () {
            // ponemos los datos del pedido en los campos de edición
            $scope.user.nomagent = $scope.datos.pedido.nomagent;
            $scope.datos.parnomcli = $scope.datos.pedido.nomclien;
            $scope.datos.feccab = $scope.datos.pedido.fecpedcl;
            $scope.enEdicionCabecera = true;
        };

        var cabDatosOk = function (form) {
            var r = true;
            if (!$scope.datos.cliente) {
                form.cliente.$error = {
                    eCliente: true
                };
                r = false;
            }
            if (!moment($scope.datos.feccab, "DD/MM/YYYY").isValid()) {
                form.fecha.$error = {
                    eFecha: true
                };
                r = false;
            }
            return r;
        };

        $scope.guardarCabecera = function (form) {
            $scope.hayErrCab = true;
            if (!form.$valid) {
                return;
            } else {
                // comprobaciones adicionales al form
                if (!cabDatosOk(form)) {
                    return;
                }
            }
            $scope.hayErrCab = false;
            var dbreturn = null;
            if ($scope.datos.pedido) {
                // es un update
                $scope.cabped.numpedcl = $scope.datos.pedido.numpedcl;
                $scope.cabped.codforpa = $scope.datos.pedido.codforpa;
                $scope.cabped.codagent = $scope.datos.pedido.codagent;
                $scope.cabped.codtraba = $scope.user.codtraba;
                $scope.cabped.fecpedcl = moment($scope.datos.feccab, "DD/MM/YYYY").format("YYYY-MM-DD");
                $scope.cabped.codclien = $scope.datos.cliente.codclien;
                dbreturn = PedidosFactory.putCabPedido($scope.cabped)

            } else {
                // es un insert
                $scope.cabped.codforpa = $scope.datos.cliente.codforpa;
                $scope.cabped.codagent = $scope.datos.cliente.codagent;
                $scope.cabped.codtraba = $scope.user.codtraba;
                $scope.cabped.fecpedcl = moment($scope.datos.feccab, "DD/MM/YYYY").format("YYYY-MM-DD");
                $scope.cabped.codclien = $scope.datos.cliente.codclien;
                dbreturn = PedidosFactory.postCabPedido($scope.cabped)
            }
            Loader.showLoading('Guardando cabecera..');
            dbreturn.
                success(function (data) {
                    Loader.hideLoading();
                    $scope.enEdicionCabecera = false;
                    // al estar guardado en la base de datos lo podemos obtener
                    PedidosFactory.getPedido(data.numpedcl).
                        success(function (data) {
                            data[0].fecpedcl = moment(data[0].fecpedcl).format('DD/MM/YYYY');
                            if (data[0].totalped) {
                                data[0].totalped = numeral(data[0].totalped).format('0,0.00 $');
                            }
                            $scope.datos.pedido = data[0];
                            PedidosFactory.savePedidoLocal(data[0]);
                            Loader.hideLoading();
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
        };

        $scope.cancelarCabecera = function () {
            if ($scope.datos.pedido) {
                $scope.enEdicionCabecera = false;
            }
            else {
                $state.go('tab.pedidos');
            }

        };

        $scope.searchArticulos = function () {
            if ($scope.linped.nomartic == "") {
                $scope.searchArticulo = false;
                return;
            }
            Loader.showLoading('Buscando articulos..');
            $scope.searchArticulo = true;
            ArticulosFactory.getArticulos($scope.linped.nomartic).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.datos.articulos = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    $scope.searchArticulo = false;
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        };
        $scope.selectArticulo = function (articulo) {
            $scope.linped = {
                codartic: articulo.codartic,
                codalmac: 1,
                nomartic: articulo.nomartic,
                precioar: articulo.preciove,
                dtoline1: 0,
                dtoline2: 0,
            };
            $scope.datos.articulo = articulo;
            $scope.searchArticulo = false;
        };

        $scope.cambiaCantidad = function () {
            $scope.linped.importel = round($scope.linped.cantidad * $scope.linped.precioar, 2);
        };

        $scope.crearLinea = function () {
            $scope.linped = {
                numpedcl: 0,
                numlinea: 0,
                codartic: 0,
                codalmac: 1,
                nomartic: "",
                cantidad: 0,
                precioar: 0,
                dtoline1: 0,
                dtoline2: 0,
                importel: 0,
                bultosser: 0
            };
            $scope.enEdicionLinea = true;
        };

        $scope.guardarLinea = function () {
            if (!$scope.linped.numlinea) {
                $scope.linped.numlinea = 0;
            }
            if ($scope.linped.numlinea != 0) {
                // es un update
 
            } else {
                // es un insert
                $scope.linped.numpedcl = $scope.datos.pedido.numpedcl;
                Loader.showLoading('Guardando linea...');
                PedidosFactory.postLinPedido($scope.linped).
                    success(function (data) {
                        Loader.hideLoading();
                        $scope.enEdicionLinea = false;
                        // al estar guardado en la base de datos lo podemos obtener
                        PedidosFactory.getPedido(data.numpedcl).
                            success(function (data) {
                                data[0].fecpedcl = moment(data[0].fecpedcl).format('DD/MM/YYYY');
                                if (data[0].totalped) {
                                    data[0].totalped = numeral(data[0].totalped).format('0,0.00 $');
                                }
                                $scope.datos.pedido = data[0];
                                PedidosFactory.savePedidoLocal(data[0]);
                                Loader.hideLoading();
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
            }

        };

        $scope.cancelarLinea = function () {
            $scope.enEdicionLinea = false;
        };
        
        // A confirm dialog
        $scope.borrarPedido = function () {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Pedidos',
                template: '¿Desea borra el pedido ' + $scope.datos.pedido.numpedcl + ' ?'
            });

            confirmPopup.then(function (res) {
                if (res) {
                    $scope.cabped.numpedcl = $scope.datos.pedido.numpedcl;
                    $scope.cabped.codforpa = $scope.datos.pedido.codforpa;
                    $scope.cabped.codagent = $scope.datos.pedido.codagent;
                    $scope.cabped.codtraba = $scope.user.codtraba;
                    $scope.cabped.fecpedcl = moment($scope.datos.feccab, "DD/MM/YYYY").format("YYYY-MM-DD");
                    $scope.cabped.codclien = $scope.datos.pedido.codclien;
                    PedidosFactory.deleteCabPedido($scope.cabped).
                        success(function (data) {
                            Loader.hideLoading();
                            Loader.toggleLoadingWithMessage("Pedido borrado");
                            $state.go('tab.pedidos');
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
        //$scope.load();
        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

    }

})();
