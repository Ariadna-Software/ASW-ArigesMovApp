(function() {
    'use strict';

    angular.module('agsMovApp.config')
        .controller('ConfigCtrl', ConfigCtrl);

    ConfigCtrl.$inject = ['$scope', '$state', 'UserFactory'];

    function ConfigCtrl($scope, $state, UserFactory) {}

})();
