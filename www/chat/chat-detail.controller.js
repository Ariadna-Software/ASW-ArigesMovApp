(function() {
    'use strict';
    angular.module('agsMovApp.chat')
    .controller('ChatDetailCtrl', ChatDetailCtrl);

    ChatDetailCtrl.$inject = ['$scope', '$stateParams', 'Chats'];

    function ChatDetailCtrl ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    }

})();
