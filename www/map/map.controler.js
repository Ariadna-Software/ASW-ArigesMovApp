(function() {
    'use strict';

    angular.module('agsMovApp.map')
        .controller('MapCtrl', MapCtrl);

    MapCtrl.$inject = ['$rootScope', '$scope', '$state', 'ClientesFactory', 'Loader', 'UserFactory'];

    function MapCtrl($rootScope, $scope, $state, ClientesFactory, Loader, UserFactory) {
        $scope.loginData = {
            login: "",
            password: ""
        };

        $scope.datos = {
            cliente: null,
        };

        $scope.load = function() {
            $scope.isUser = UserFactory.isUser();
            $scope.user = UserFactory.getUser();
            $scope.datos.cliente = ClientesFactory.getClienteLocal();
        }


        $scope.cambia = function() {
            var latLng = new google.maps.LatLng(0, 0);

            var mapOptions = {
                center: latLng,
                zoom: 16,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
            var address = $scope.datos.cliente.domclien +
                " (" + $scope.datos.cliente.codpobla + ")" +
                " " + $scope.datos.cliente.pobclien +
                " " + $scope.datos.cliente.proclien;
            var geocoder = new google.maps.Geocoder();
            geocoder.geocode({
                'address': address
            }, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    $scope.map.setCenter(results[0].geometry.location);
                    var marker = new google.maps.Marker({
                        map: $scope.map,
                        position: results[0].geometry.location
                    });
                } else {
                    alert('Geocode was not successful for the following reason: ' + status);
                }
            });
        };

        $scope.returnToContacto = function() {
            $state.go('cli.contacto');
        };

        // event handlers
        $scope.$on('$ionicView.enter', function(e) {
            if (!UserFactory.isUser()) {
                Loader.toggleLoadingWithMessage("Debe entrar con un usuario");
                $state.go('tab.inicio');
            }
            $scope.load();
            $scope.cambia();
        });

        //$scope.load();
    }

})();
