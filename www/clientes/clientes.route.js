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
        }];
    }
})();