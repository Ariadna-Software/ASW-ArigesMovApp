(function () {
    'use strict';

    angular
        .module('agsMovApp.proveedores')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/proveedores');
    }

    function getStates() {
        return [{
            state: 'tab.provedores',
            config: {
                url: '/proveedores',
                views: {
                    'tab-proveedores': {
                        templateUrl: 'proveedores/tab-proveedores.html',
                        controller: 'ProveedoresCtrl'
                    }
                }
            }
        }, {
                state: 'pro',
                config: {
                    url: '/pro',
                    abstract: true,
                    templateUrl: 'proveedores/pro-menu.html'
                }
            }, {
                state: 'pro.contacto',
                config: {
                    url: '/contacto',
                    views: {
                        'menuContent': {
                            templateUrl: 'proveedores/pro-contacto.html',
                            controller: 'ProveedoresContactoCtrl'
                        }
                    }
                }
            }, {
                state: 'pro.descuentos',
                config: {
                    url: '/descuentos',
                    views: {
                        'menuContent': {
                            templateUrl: 'proveedores/pro-descuentos.html',
                            controller: 'ProveedoresDescuentosRappelesCtrl'
                        }
                    }
                }
            }];
    }
})();