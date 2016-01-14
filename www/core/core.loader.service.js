(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('Loader', Loader);

    Loader.$inject = ['$ionicLoading', '$timeout'];

    function Loader($ionicLoading, $timeout) {
        var LOADERAPI = {

            showLoading: function(text) {
                text = text || 'Cargando...';
                $ionicLoading.show({
                    template: text
                });
            },

            hideLoading: function() {
                $ionicLoading.hide();
            },

            toggleLoadingWithMessage: function(text, timeout) {
                var self = this;

                self.showLoading(text);

                $timeout(function() {
                    self.hideLoading();
                }, timeout || 3000);
            }

        };
        return LOADERAPI;
    }

})()
