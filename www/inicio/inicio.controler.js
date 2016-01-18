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


        $scope.login = function() {
            Loader.showLoading('Buscando usuario..');
            UserFactory.login($scope.loginData).
            success(function(data) {
                Loader.hideLoading();
                if (data) {
                    UserFactory.setUser(data);
                    $scope.load();
                    $state.go('tab.inventario');
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
