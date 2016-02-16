// NavFactory
// Cuando una misma vista puede ser llamada desde distintos orígenes
// este servicio proporciona información del llamante, para que sea
// devuelta la vista al origen

(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('NavFactory', NavFactory);

    NavFactory.$inject = ['LSFactory'];

    function NavFactory(LSFactory) {

        var NavAPI = {
            setNavLocal: function (nav) {
                LSFactory.set('nav', nav);
            },
            getNavLocal: function () {
                return LSFactory.get('nav');
            }
        };

        return NavAPI;
    }
})()
