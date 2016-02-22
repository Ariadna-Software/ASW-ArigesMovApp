(function () {
    'use strict';

    angular.module('agsMovApp.layout')
        .controller('LayoutCtrl', LayoutCtrl);

       LayoutCtrl.$inject =['$scope','$state', 'ConfigFactory', 'UserFactory','Loader'];
       
    function LayoutCtrl($scope, $state, ConfigFactory, UserFactory, Loader) {
        $scope.datos = {
            sinAgente: true
        };
        
        $scope.$on('$ionicView.enter', function(e) {
            $scope.load();
        });
        
        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            if ($scope.user.codagent){
                $scope.datos.sinAgente = false;
            }    
        };
    }
})();
