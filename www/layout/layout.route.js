(function() {
    'use strict';

    angular
        .module('agsMovApp.layout')
        .run(appRun);

    appRun.$inject = ['routerHelper'];

    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [{
            state: 'tab',
            config: {
                url: '/tab',
                abstract: true,
                templateUrl: 'layout/tabs.html',
                controller: 'LayoutCtrl'
            }
        }];
    }
})();
