(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ArticulosFactory', ArticulosFactory);

    ArticulosFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ArticulosFactory($http, LSFactory, ConfigFactory, Loader) {

        var ArticulosAPI = {
            getArticulos: function(parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/articulos', {
                    params: {
                        "parnom": parnom
                    }
                })
            },
            getArticulosCliente: function(codclien, codactiv, codtarif, parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/articulos/cliente', {
                    params: {
                        "codclien": codclien,
                        "codactiv": codactiv,
                        "codtarif": codtarif,
                        "parnom": parnom
                    }
                })
            },
            getArticulosPreciosEspeciales: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/articulos/precios-especiales', {
                    params: {
                        "codclien": codclien
                    }
                })
            },
            getArticulosDescuentosEspeciales: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/articulos/descuentos-especiales', {
                    params: {
                        "codclien": codclien
                    }
                })
            },
            saveArticuloLocal: function(articulo) {
                LSFactory.set('articulo', articulo);
            },
            getArticuloLocal: function() {
                return LSFactory.get('articulo');
            }
        };

        return ArticulosAPI;
    }
})()
