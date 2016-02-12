(function() {
    'user strict';
    angular.module('agsMovApp.core')
        .factory('ImagesFactory', ImagesFactory);

    function ImagesFactory() {
        var images = ['img/ariadna.png', 'img/bacchus.png'];

        var ImagesAPI = {
            getImage: function(numImage) {
                if (!numImage) {
                    numImage = 0; // la por defecto
                }
                return images[numImage];
            }
        };

        return ImagesAPI;
    }
})()
