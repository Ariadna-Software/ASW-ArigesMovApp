(function() {
    'use strict';

    angular
        .module('agsMovApp.clientes')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/inicio');
    }

    function getStates() {
        return [{
            state: 'tab.clientes',
            config: {
                url: '/clientes',
                views: {
                    'tab-clientes': {
                        templateUrl: 'clientes/tab-clientes.html',
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli',
            config: {
                url: '/cli',
                abstract: true,
                templateUrl: 'clientes/cli-menu.html'
            }
        },{
            state: 'cli.contacto',
            config: {
                url: '/contacto',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-contacto.html',
                        controller: 'ClientesContactoCtrl'
                    }
                }
            }
        },{
            state: 'cli.ofertas',
            config: {
                url: '/ofertas',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-ofertas.html',
                        controller: 'ClientesOfertasCtrl'
                    }
                }
            }
        },{
            state: 'cli.ofertasDetalle',
            config: {
                url: '/ofertasDetalle',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-ofertasDetalle.html',
                        controller: 'ClientesOfertasDetalleCtrl'
                    }
                }
            }
        },{
            state: 'cli.pedidos',
            config: {
                url: '/pedidos',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-pedidos.html',
                        controller: 'ClientesPedidosCtrl'
                    }
                }
            }
        },{
            state: 'cli.pedidosDetalle',
            config: {
                url: '/pedidosDetalle',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-pedidosDetalle.html',
                        controller: 'ClientesPedidosDetalleCtrl'
                    }
                }
            }
        },{
            state: 'cli.alabaranes',
            config: {
                url: '/albaranes',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-albaranes.html',
                        controller: 'ClientesAlbaranesCtrl'
                    }
                }
            }
        },{
            state: 'cli.albaranesDetalle',
            config: {
                url: '/albaranesDetalle',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-albaranesDetalle.html',
                        controller: 'ClientesAlbaranesDetalleCtrl'
                    }
                }
            }
        },{
            state: 'cli.facturas',
            config: {
                url: '/facturas',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-facturas.html',
                        controller: 'ClientesFacturaCtrl'
                    }
                }
            }
        },{
            state: 'cli.facturasDetalle',
            config: {
                url: '/facturasDetalle',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-facturasDetalle.html',
                        controller: 'ClientesFacturaDetalleCtrl'
                    }
                }
            }
        },{
            state: 'cli.precios',
            config: {
                url: '/precios',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-precios.html',
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli.preciosEspeciales',
            config: {
                url: '/preciosEspeciales',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-preciosEspeciales.html',
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli.descuentos',
            config: {
                url: '/descuentos',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-descuentos.html',
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli.datos',
            config: {
                url: '/datos',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-datos.html',
                        controller: 'ClientesDatosCtrl'
                    }
                }
            }
        }];
    }
})();