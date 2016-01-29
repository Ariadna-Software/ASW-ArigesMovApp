(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ClipotsFactory', ClipotsFactory);

    ClipotsFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ClipotsFactory($http, LSFactory, ConfigFactory, Loader) {

        var ClipotsAPI = {
            getClipots: function (parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clipot', {
                    params: {
                        "parnom": parnom
                    }
                })
            },
            postClipot: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/clipot', data);
            },
            putClipot: function (data) {
                return $http.put(ConfigFactory.getConfig().urlApi + '/api/clipot', data);
            },
            deleteClipot: function (codclien) {
                return $http.delete(ConfigFactory.getConfig().urlApi + '/api/clipot', {
                    params: {
                        "codclien": codclien
                    }
                });
            },
            saveClipotLocal: function (clipot) {
                LSFactory.set('clipot', clipot);
            },
            getClipotLocal: function () {
                return LSFactory.get('clipot');
            }
        };

        return ClipotsAPI;
    }
})()
