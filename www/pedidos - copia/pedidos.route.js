(function () {
    'use strict';

    angular
        .module('agsMovApp.pedidos')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/pedidos');
    }

    function getStates() {
        return [{
            state: 'tab.pedidos',
            config: {
                url: '/pedidos',
                views: {
                    'tab-pedidos': {
                        templateUrl: 'pedidos/tab-pedidos.html',
                        controller: 'PedidosCtrl'
                    }
                }
            }
        }, {
                state: 'ped',
                config: {
                    url: '/ped',
                    abstract: true,
                    templateUrl: 'pedidos/ped-menu.html'
                }
            }, {
                state: 'ped.detalle',
                config: {
                    url: '/detalle',
                    views: {
                        'menuContent': {
                            templateUrl: 'pedidos/ped-detalle.html',
                            controller: 'PedidosDetalleCtrl'
                        }
                    }
                }
            }];
    }
})();