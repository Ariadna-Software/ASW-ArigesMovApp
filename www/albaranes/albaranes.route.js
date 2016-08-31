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
                state: 'albdetalle',
                config: {
                    url: '/albdetalle',
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