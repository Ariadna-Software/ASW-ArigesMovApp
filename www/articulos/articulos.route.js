(function () {
    'use strict';

    angular
        .module('agsMovApp.articulos')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/articulos');
    }

    function getStates() {
        return [{
            state: 'tab.articulos',
            config: {
                url: '/articulos',
                views: {
                    'tab-articulos': {
                        templateUrl: 'articulos/tab-articulos.html',
                        controller: 'ArticulosCtrl'
                    }
                }
            }
        }, {
                state: 'art',
                config: {
                    url: '/art',
                    abstract: true,
                    templateUrl: 'articulos/art-menu.html'
                }
            }, {
                state: 'art.detalle',
                config: {
                    url: '/detalle',
                    views: {
                        'menuContent': {
                            templateUrl: 'articulos/art-detalle.html',
                            controller: 'ArticulosDetalleCtrl'
                        }
                    }
                }
            }];
    }
})();