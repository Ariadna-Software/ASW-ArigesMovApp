(function () {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ProveedoresFactory', ProveedoresFactory);

    ProveedoresFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function ProveedoresFactory($http, LSFactory, ConfigFactory, Loader) {

        var ProveedoresAPI = {
            getProveedores: function (parnom) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/proveedores', {
                    params: {
                        "parnom": parnom
                    }
                })
            },
            saveProveedorLocal: function (proveedor) {
                LSFactory.set('proveedor', proveedor);
            },
            getProveedorLocal: function () {
                return LSFactory.get('proveedor');
            },
            getProveedoresDescuentosRappeles: function (codprove) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/proveedores/descuentos-rappeles', {
                    params: {
                        "codprove": codprove
                    }
                })
            }
        };

        return ProveedoresAPI;
    }
})()
