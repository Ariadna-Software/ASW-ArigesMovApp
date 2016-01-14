(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('UserFactory', UserFactory);

    UserFactory.$inject = ['$http', 'LSFactory', 'ConfigFactory', 'Loader'];

    function UserFactory($http, LSFactory, ConfigFactory, Loader) {
        var userKey = "user";

        var UserAPI = {
            login: function(params) {
                return $http.get(ConfigFactory.getConfig().urlApi + '/api/usuarios/login', {
                    params: {
                        "login": params.login,
                        "password": params.password
                    }
                });
            },
            isUser: function() {
                return this.getUser() === null ? false : true;
            },
            getUser: function() {
                return LSFactory.get(userKey);
            },
            setUser: function(user) {
                return LSFactory.set(userKey, user);
            },
            logout: function() {
                LSFactory.set(userKey, null);
                return null;
            }

        };
        return UserAPI;
    }
})()
