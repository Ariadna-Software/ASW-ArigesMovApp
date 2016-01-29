(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ActividadesFactory', ActividadesFactory);

    ActividadesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ActividadesFactory($http, LSFactory, ConfigFactory, Loader) {

        var ActividadesAPI = {
            getActividades: function (parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/actividades', {
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

        return ActividadesAPI;
    }
})()
