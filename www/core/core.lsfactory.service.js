(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('LSFactory', LSFactory);

    function LSFactory() {
        var LSAPI = {
            clear: function() {
                return localStorage.clear();
            },
            get: function(key) {
                return JSON.parse(localStorage.getItem(key));
            },
            set: function(key, data) {
                return localStorage.setItem(key, JSON.stringify(data));
            },
            delete: function(key) {
                return localStorage.removeItem(key);
            },
        };

        return LSAPI;
    }

})()
