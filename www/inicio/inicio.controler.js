(function() {
    'use strict';

    angular.module('agsMovApp.inicio')
        .controller('InicioCtrl', InicioCtrl);

    InicioCtrl.$inject = ['$rootScope', '$scope', '$state', 'UserFactory', 'Loader'];

    function InicioCtrl($rootScope, $scope, $state, UserFactory, Loader) {
        $scope.loginData = {
            login: "",
            password: ""
        };

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
        }

        // el login debe acceder a dos bases de datos distintas
        // de anhí las llamadas encadenadas
        $scope.login = function() {
            Loader.showLoading('Buscando usuario..');
            UserFactory.login($scope.loginData).
            success(function(data) {
                Loader.hideLoading();
                // hay que obtener el código de agente
                var data1 = data; // guardamos los datos
                UserFactory.getAgente($scope.loginData.login).
                success(function(data) {
                    if (data) {
                        data1.codagent = data.codagent; // ponemos el agente
                        UserFactory.setUser(data1);
                        $scope.load();
                        $state.go('tab.clientes');
                    } else {
                        Loader.toggleLoadingWithMessage("Login o password incorrectos");
                        UserFactory.setUser(null);
                        $scope.load();
                    }
                }).
                error(function(err, statusCode) {
                    Loader.hideLoading();
                    if (err) {
                        var msg = err || err.message;
                        Loader.toggleLoadingWithMessage(msg);
                    } else {
                        Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                    }
                });
            }).
            error(function(err, statusCode) {
                Loader.hideLoading();
                if (err) {
                    var msg = err || err.message;
                    Loader.toggleLoadingWithMessage(msg);
                } else {
                    Loader.toggleLoadingWithMessage("Error de conexión. Revise configuración");
                }
            });
        }

        $scope.logout = function() {
            UserFactory.logout();
            $scope.loginData = {
                login: "",
                password: ""
            };
            $scope.user = null;
            $scope.isUser = false;
        }

        $scope.load();
    }

})();
