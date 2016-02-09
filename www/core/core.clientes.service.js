(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ClientesFactory', ClientesFactory);

    ClientesFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ClientesFactory($http, LSFactory, ConfigFactory, Loader) {

        var ClientesAPI = {
            putCliente: function (data) {
                return $http.put(ConfigFactory.getConfig().urlApi + '/api/clientes', data);
            },
            getClientes: function(agente, parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clientes/clientes-agente', {
                    params: {
                        "agente": agente,
                        "parnom": parnom,
                        "porNomComer": ConfigFactory.getConfig().porNomComer
                    }
                })
            },
            getCliente: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clientes/' + codclien);
            },
            getVentaAnual: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/clientes/vanual/' + codclien);
            },
            saveClienteLocal: function(cliente) {
                LSFactory.set('cliente', cliente);
            },
            saveOfertaLocal: function(oferta) {
                LSFactory.set('oferta', oferta);
            },
            savePedidoLocal: function(pedido) {
                LSFactory.set('pedido', pedido);
            },
            saveAlbaranLocal: function(albaran) {
                LSFactory.set('albaran', albaran);
            },
            saveFacturaLocal: function(factura) {
                LSFactory.set('factura', factura);
            },
            saveCobroLocal: function(cobro) {
                LSFactory.set('cobro', cobro);
            },
            getClienteLocal: function() {
                return LSFactory.get('cliente');
            },
            getOfertaLocal: function() {
                return LSFactory.get('oferta');
            },
            getPedidoLocal: function() {
                return LSFactory.get('pedido');
            },
            getAlbaranLocal: function() {
                return LSFactory.get('albaran');
            },
            getFacturaLocal: function() {
                return LSFactory.get('factura');
            },
            getCobroLocal: function() {
                return LSFactory.get('cobro');
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
            },
            getOfertas: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/ofertas/cliente/' + codclien);
            },
            getPedidos: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/pedidos/cliente/' + codclien);
            },
            getAlbaranes: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/albaranes/cliente/' + codclien);
            },
            getFacturas: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/cliente/' + codclien);
            },
            getFacturaNumserie: function(numserie, cabfaccl, fecfaccl) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/facturas/facserie/' , {
                    params: {
                        "numserie": numserie,
                        "cabfaccl": cabfaccl,
                        "fecfaccl": fecfaccl
                    }
                });
            },            
            getPreciosEspeciales: function(codclien) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/articulos/precios-especiales/' + codclien);
            }
        };

        return ClientesAPI;
    }
})()
