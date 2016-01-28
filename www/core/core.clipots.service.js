(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ClipotsFactory', ClipotsFactory);

    ClipotsFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ClipotsFactory($http, LSFactory, ConfigFactory, Loader) {

        var ClipotsAPI = {
            getClipots: function(parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clipot', {
                    params: {
                        "parnom": parnom
                    }
                })
            },
            saveClipotLocal: function(clipot) {
                LSFactory.set('clipot', clipot);
            },
            getClipotLocal: function() {
                return LSFactory.get('clipot');
            }
        };

        return ClipotsAPI;
    }
})()
