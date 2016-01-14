(function() {
    'use strict';

    angular.module('agsMovApp.inicio')
        .controller('InicioCtrl', InicioCtrl);

    InicioCtrl.$inject = ['$scope', '$state', 'UserFactory'];

    function InicioCtrl($scope, $state, UserFactory) {}

})();
