(function() {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesCtrl', ClientesCtrl);

    ClientesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            parnom: null,
            agente: null,
            clientes: []
        };
        
        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
        });

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.searchComplete = false;
            if ($scope.user) {
                $scope.dsatos.agente = $scope.user.codagent;
            }
        }

        $scope.searchClient = function(){
            Loader.showLoading('Buscando clientes..');
            ClientesFactory.getClientes($scope.datos.agente, $scope.datos.parnom).
            success(function(data){
                Loader.hideLoading();
                $scope.searchComplete = true;
                $scope.datos.clientes = data;
            }).
            error(function(err, statusCode){
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        }

        $scope.hideSearch = function(){
            $scope.searchComplete = false;
            $scope.parnom = null;
        }

        //$scope.load();
    }

})();
