(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('AlbaranesFactory', AlbaranesFactory);

    AlbaranesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function AlbaranesFactory($http, LSFactory, ConfigFactory, Loader) {

        var AlbaranesAPI = {
            getAlbaranes: function () {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/albaranes');
            },
            getAlbaranesPendientes: function () {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/albaranes/pendientes');
            },
            getAlbaranesServidos: function () {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/albaranes/enviados');
            },
            getAlbaranDetalle: function (codtipom, numalbar) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/albaranes/detalle', {
                    params: {
                        "codtipom": codtipom,
                        "numalbar": numalbar
                    }
                })
            },
            postServirAlbaran: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/albaranes/enviar', data);
            },
            postDesServirAlbaran: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/albaranes/desenviar', data);
            },
            saveAlbaranLocal: function(albaran) {
                LSFactory.set('albaran', albaran);
            },
            getAlbaranLocal: function() {
                return LSFactory.get('albaran');
            }
        };

        return AlbaranesAPI;
    }
})()
