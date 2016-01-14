(function() {
    'use strict';

    angular
        .module('agsMovApp.inicio')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'tab.inicio',
            config: {
                url: '/inicio',
                views: {
                    'tab-inicio': {
                        templateUrl: 'inicio/tab-inicio.html',
                        controller: 'InicioCtrl'
                    }
                }
            }
        }];
    }
})();