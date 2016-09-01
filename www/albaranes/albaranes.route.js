(function () {
    'use strict';

    angular
        .module('agsMovApp.albaranes')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/albaranes');
    }

    function getStates() {
        return [{
            state: 'tab.albaranes',
            config: {
                url: '/albaranes',
                views: {
                    'tab-albaranes': {
                        templateUrl: 'albaranes/tab-albaranes.html',
                        controller: 'AlbaranesCtrl'
                    }
                }
            }
        }, {
                state: 'alb',
                config: {
                    url: '/alb',
                    abstract: true,
                    templateUrl: 'albaranes/alb-menu.html'
                }
            }, {
                state: 'alb.detalle',
                config: {
                    url: '/detalle',
                    views: {
                        'menuContent': {
                            templateUrl: 'albaranes/alb-detalle.html',
                            controller: 'AlbaranesDetalleCtrl'
                        }
                    }
                }
            }];
    }
})();