(function() {

    'use strict';

    angular.module('agsMovApp.core')
        .factory('ImagesFactory', ImagesFactory);

    function ImagesFactory() {
        // Devolver a la imagen a mostrar en la aplicación

        // Some fake testing data
        var images = ['img/bacchus.png','img/ariadna.png'];

        var service = {
            getImage: getImage
        };

        return service;

        //////////////////

        function getImage(numImage) {
            if (!numImage){
                numImage = 0;
            }
            return images[numImage];
        }

    }

})();
