(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('FPagoFactory', FPagoFactory);

    FPagoFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function FPagoFactory($http, LSFactory, ConfigFactory, Loader) {

        var FPagoAPI = {
            getFPagos: function (parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/fpago', {
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

        return FPagoAPI;
    }
})()
