(function() {
    'use strict';

    angular
        .module('agsMovApp.config')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'tab.config',
            config: {
                url: '/config',
                views: {
                    'tab-inicio': {
                        templateUrl: 'config/tab-config.html',
                        controller: 'ConfigCtrl'
                    }
                }
            }
        }];
    }
})();