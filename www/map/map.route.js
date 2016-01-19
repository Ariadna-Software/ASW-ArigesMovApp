(function() {
    'use strict';

    angular
        .module('agsMovApp.map')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates(), '/map');
    }

    function getStates() {
        return [{
            state: 'map',
            config: {
                url: '/map',
                templateUrl: 'map/map.html',
                controller: 'MapCtrl'
            }
        }];
    }
})();
