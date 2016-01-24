(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('PedidosFactory', PedidosFactory);

    PedidosFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function PedidosFactory($http, LSFactory, ConfigFactory, Loader) {

        var PedidosAPI = {
            getPedidos: function() {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/pedidos');
            },
            savePedidoLocal: function(pedido) {
                LSFactory.set('pedido', pedido);
            },
            getPedidoLocal: function() {
                return LSFactory.get('pedido');
            }
        };

        return PedidosAPI;
    }
})()
