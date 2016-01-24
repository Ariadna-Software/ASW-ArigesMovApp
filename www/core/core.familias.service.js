(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('FamiliasFactory', FamiliasFactory);

    FamiliasFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function FamiliasFactory($http, LSFactory, ConfigFactory, Loader) {

        var FamiliasAPI = {
            getFamilias: function (parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/familias', {
                    params: {
                        "parnom": parnom
                    }
                });
            },
            saveFamiliaLocal: function (familia) {
                LSFactory.set('familia', familia);
            },
            getFamiliaLocal: function () {
                return LSFactory.get('familia');
            }
        };

        return FamiliasAPI;
    }
})()
