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
            postServirAlbaran: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/albaranes/enviar', data);
            },
            postDesServirAlbaran: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/albaranes/desenviar', data);
            },

            saveCobroextLocal: function (cobroext) {
                LSFactory.set('cobroext', cobroext);
            },
            getCobroextLocal: function () {
                return LSFactory.get('cobroext');
            }
        };

        return AlbaranesAPI;
    }
})()
