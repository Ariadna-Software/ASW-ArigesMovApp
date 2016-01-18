(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ClientesFactory', ClientesFactory);

    ClientesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ClientesFactory($http, LSFactory, ConfigFactory, Loader) {

        var ClientesAPI = {
            getClientes: function(agente, parnom){
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clientes/clientes-agente',{
                    params: {
                        "agente": agente,
                        "parnom": parnom
                    }
                })
            }
        };
        return ClientesAPI;
    }
})()