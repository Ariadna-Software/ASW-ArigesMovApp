(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ClientesFactory', ClientesFactory);

    ClientesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ClientesFactory($http, LSFactory, ConfigFactory, Loader) {

        var ClientesAPI = {
            getClientes: function(agente, parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clientes/clientes-agente', {
                    params: {
                        "agente": agente,
                        "parnom": parnom
                    }
                })
            },
            saveClienteLocal: function(cliente) {
                LSFactory.set('cliente', cliente);
            },
            getClienteLocal: function() {
                return LSFactory.get('cliente');
            },
            getIndicadores: function(codclien, codmacta) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/indicadores', {
                    params: {
                        "codclien": codclien,
                        "codmacta": codmacta
                    }
                })
            },
            getCobros: function(codmacta) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/cobros', {
                    params: {
                        "codmacta": codmacta
                    }
                })
            }
        };

        return ClientesAPI;
    }
})()
