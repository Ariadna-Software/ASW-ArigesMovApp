(function() {
    'use strict';
    angular.module('agsMovApp.account')
        .controller('AccountCtrl', AccountCtrl);

    AccountCtrl.$inject = ['$scope'];
    function AccountCtrl($scope) {
        $scope.settings = {
            enableFriends: true
        };
    }
})();
