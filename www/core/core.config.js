(function() {

    'use strict';

    angular
        .module('agsMovApp.core')
        .run(appRun);

    function appRun($ionicPlatform,$state,$timeout) {
        $ionicPlatform.ready(function() {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                /* globals cordova */
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                /* globals StatusBar */
                // org.apache.cordova.statusbar required
                StatusBar.styleLightContent();
            }
        });
    }
})();
