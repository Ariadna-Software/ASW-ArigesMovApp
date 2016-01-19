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
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli.alabaranes',
            config: {
                url: '/alabaranes',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-alabaranes.html',
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
                    }
                }
            }
        },{
            state: 'cli.factura',
            config: {
                url: '/factura',
                views: {
                    'menuContent': {
                        templateUrl: 'clientes/cli-factura.html',
                        controller: 'ClientesCtrl'
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
                        controller: 'ClientesCtrl'
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