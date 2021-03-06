// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'agsMovApp' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'agsMovApp.services' is found in services.js
// 'agsMovApp.controllers' is found in controllers.js
(function() {

    'use strict';

	angular
		.module('agsMovApp', [
			/* Shared modules */
			'ionic',
            'ngMessages',
            'chart.js',
			'agsMovApp.core',
			'agsMovApp.layout',
			/* Feature areas */
			'agsMovApp.inicio',
			'agsMovApp.config',
			'agsMovApp.clientes',
			'agsMovApp.map',
            'agsMovApp.proveedores',
            'agsMovApp.articulos',
            'agsMovApp.pedidos',
            'agsMovApp.cobros',
			'agsMovApp.albaranes'
		]);
})();
