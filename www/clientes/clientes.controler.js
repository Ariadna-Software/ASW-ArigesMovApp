(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesCtrl', ClientesCtrl);

    ClientesCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'ClipotsFactory', 'UserFactory', 'Loader'];

    function ClientesCtrl($rootScope, $scope, $state, ClientesFactory, ClipotsFactory, UserFactory, Loader) {

        $scope.datos = {
            parnom: null,
            parnomPot: null,
            clientes: [],
            clipots: []
        };

        $scope.$on('$ionicView.enter', function (e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
        });

        $scope.load = function () {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.searchComplete = false;
            $scope.searchCompletePot = false;
        }

        $scope.searchClient = function () {
            Loader.showLoading('Buscando clientes..');
            ClientesFactory.getClientes($scope.user.codagent, $scope.datos.parnom).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchComplete = true;
                    $scope.datos.clientes = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        }

        $scope.searchClientPot = function () {
            Loader.showLoading('Buscando clientes potenciales...');
            ClipotsFactory.getClipots($scope.datos.parnomPot).
                success(function (data) {
                    Loader.hideLoading();
                    $scope.searchCompletePot = true;
                    $scope.datos.clipots = data;
                }).
                error(function (err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
        }

        $scope.hideSearch = function () {
            $scope.searchComplete = false;
            $scope.parnom = null;
        };

        $scope.hideSearchPot = function () {
            $scope.searchCompletePot = false;
            $scope.parnomPot = null;
        };

        $scope.goCliente = function (cliente) {
            // guardar el cliente en local
            ClientesFactory.saveClienteLocal(cliente);
            // ir a la vista adecuada
            $state.go('cli.datos');
        };

        $scope.goClipot = function (clipot) {
            // guardar el cliente en local
            ClipotsFactory.saveClipotLocal(clipot);
            // ir a la vista adecuada
            $state.go('tab.clipot');
        };
        
        $scope.crearClipot = function(){
            ClipotsFactory.saveClipotLocal(null);
            $state.go('tab.clipot');
        };

        //$scope.load();
    }

})();