(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('PedidosFactory', PedidosFactory);

    PedidosFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function PedidosFactory($http, LSFactory, ConfigFactory, Loader) {

        var PedidosAPI = {
            getPedido: function (numpedcl) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/pedidos/pedido', {
                    params: {
                        "numpedcl": numpedcl
                    }
                });
            },
            getPedidos: function () {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/pedidos');
            },
            getPedidosAgente: function (codagent) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/pedidos/agente', {
                    params: {
                        "codagent": codagent
                    }
                });
            },

            postCabPedido: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/pedidos/cabpedido', data);
            },
            putCabPedido: function (data) {
                return $http.put(ConfigFactory.getConfig().urlApi + '/api/pedidos/cabpedido', data);
            },
            deleteCabPedido: function (data) {
                return $http.delete(ConfigFactory.getConfig().urlApi + '/api/pedidos/cabpedido', {
                    params: {
                        "numpedcl": data.numpedcl
                    }
                });
            },
            postLinPedido: function (data) {
                return $http.post(ConfigFactory.getConfig().urlApi + '/api/pedidos/linpedido', data);
            },
            putLinPedido: function (data) {
                return $http.put(ConfigFactory.getConfig().urlApi + '/api/pedidos/linpedido', data);
            },
            deleteLinPedido: function (numpedcl, numlinea) {
                return $http.delete(ConfigFactory.getConfig().urlApi + '/api/pedidos/linpedido', {
                    params: {
                        "numpedcl": numpedcl,
                        "numlinea": numlinea
                    }
                });
            },
            savePedidoLocal: function (pedido) {
                LSFactory.set('pedido', pedido);
            },
            getPedidoLocal: function () {
                return LSFactory.get('pedido');
            }
        };

        return PedidosAPI;
    }
})()
