(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ConfigFactory', ConfigFactory);

    ConfigFactory.$inject = ['LSFactory'];

    function ConfigFactory() {
        var configKey = "config";

        var CONFIGAPI = {
            isConfig: function() {
                return this.getConfig() === null ? false : true;
            },
            getConfig: function() {
                return LSFactory.get(configKey);
            },
            setConfig: function(config) {
                return LSFactory.set(configKey, config);
            }
        };
        return CONFIGAPI;
    }
})()
