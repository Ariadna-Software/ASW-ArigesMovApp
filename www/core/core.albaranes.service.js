(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('AlbaranesFactory', AlbaranesFactory);

    AlbaranesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function AlbaranesFactory($http, LSFactory, ConfigFactory, Loader) {

        var AlbaranesAPI = {
            getCobro: function (numserie, codfaccl, fecfaccl, numorden) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/cobros/cobro', {
                    params: {
                        "numserie": numserie,
                        "codfaccl": codfaccl,
                        "fecfaccl": fecfaccl,
                        "numorden": numorden
                    }
                })
            },
            getLinsCobro: function (numserie, codfaccl, fecfaccl, numorden) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/cobros/lineas', {
                    params: {
                        "numserie": numserie,
                        "codfaccl": codfaccl,
                        "fecfaccl": fecfaccl,
                        "numorden": numorden
                    }
                })
            },
            getLinsCobroAgente: function (codagent) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/cobros/lineas/agente', {
                    params: {
                        "codagent": codagent
                    }
                })
            },            
            postLinCobro: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/cobros/lineas', data);
            },
            deleteLinCobro: function (numserie, codfaccl, fecfaccl, numorden, id, importe) {
                return $http.delete(ConfigFactory.getConfig().urlApi + '/api/cobros/lineas', {
                    params: {
                        "numserie": numserie,
                        "codfaccl": codfaccl,
                        "fecfaccl": fecfaccl,
                        "numorden": numorden,
                        "id": id,
                        "importe": importe
                    }
                });
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
