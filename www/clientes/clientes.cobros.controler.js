(function () {
    'use strict';

    angular.module('agsMovApp.clientes')
        .controller('ClientesCobrosCtrl', ClientesCobrosCtrl);

    ClientesCobrosCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'UserFactory', 'Loader'];

    function ClientesCobrosCtrl($rootScope, $scope, $state, ClientesFactory, UserFactory, Loader) {

        $scope.datos = {
            cliente: null,
            cobro: null
        };

        $scope.cobro = {
            numserie: 0,
            codfaccl: 0,
            fecfaccl: 0,
            numorden: 1,
            codforpa: 5,
            fecultco: 0,
            impcobro: 111.55
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
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
            $scope.datos.cobro = ClientesFactory.getCobroLocal();
            $scope.cobro = {
                numserie: $scope.datos.cobro.numserie,
                codfaccl: $scope.datos.cobro.codfaccl,
                fecfaccl: moment($scope.datos.cobro.fecfaccl,'DD/MM/YYYY').format('YYYY-MM-DD'),
                numorden: $scope.datos.cobro.numorden,
                codforpa: $scope.datos.cobro.codforpa,
                nomforpa: $scope.datos.cobro.nomforpa,
                fecultco: moment(new Date()).format('YYYY-MM-DD'),
                impcobro: 0
            };
        }
        //$scope.load();
    }

})();
