(function () {
    'use strict';

    angular
        .module('agsMovApp.cobros')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/tab/cobros');
    }

    function getStates() {
        return [{
            state: 'tab.cobros',
            config: {
                url: '/cobros',
                views: {
                    'tab-cobros': {
                        templateUrl: 'cobros/tab-cobros.html',
                        controller: 'CobrosCtrl'
                    }
                }
            }
        }];
    }
})();