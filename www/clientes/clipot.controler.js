(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClipotCtrl', ClipotCtrl);

    ClipotCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClipotsFactory', 'UserFactory', 'Loader'];

    function ClipotCtrl($rootScope, $scope, $state, ClipotsFactory, UserFactory, Loader) {

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


        //$scope.load();
    }

})();
