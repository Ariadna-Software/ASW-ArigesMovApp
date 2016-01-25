(function () {
    'use strict';

    angular.module('agsMovApp.pedidos')
        .controller('PedidosDetalleCtrl', PedidosDetalleCtrl);

    PedidosDetalleCtrl.$inject = ['$rootScope', '$scope', '$state', 'PedidosFactory', 'UserFactory', 'ClientesFactory', 'ArticulosFactory', 'Loader'];

    function PedidosDetalleCtrl($rootScope, $scope, $state, PedidosFactory, UserFactory, ClientesFactory, ArticulosFactory, Loader) {

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
            if ($scope.datos.parnomcli == "") {
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

        $scope.guardarCabecera = function () {
            if ($scope.datos.pedido) {
                // es un update
 
            } else {
                // es un insert
                $scope.cabped.codforpa = $scope.datos.cliente.codforpa;
                $scope.cabped.codagent = $scope.user.codagent;
                $scope.cabped.codtraba = $scope.user.codtraba;
                $scope.cabped.fecpedcl = moment($scope.datos.feccab).format("YYYY-MM-DD");
                $scope.cabped.codclien = $scope.datos.cliente.codclien;
                Loader.showLoading('Guardando cabecera..');
                PedidosFactory.postCabPedido($scope.cabped).
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
            }
        };

        $scope.cancelarCabecera = function () {
            $state.go('tab.pedidos');
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
            if (!$scope.linped.numlinea){
                $scope.linped.numlinea = 0;
            }
            if ($scope.linped.numlinea != 0) {
                // es un update
 
            } else {
                // es un insert
                $scope.linped.numpedcl = $scope.datos.pedido.numpedcl;
                Loader.showLoading('Guardando linea..');
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
        }
        //$scope.load();
        function round(value, decimals) {
            return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
        }

    }

})();
