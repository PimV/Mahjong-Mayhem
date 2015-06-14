'use strict';

var name = "auth";

// Prepare the 'auth' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial',
	'ngCookies'
])
.controller('AuthController', [
		'$scope', 
		'$stateParams', 
		'$state',
		'$cookies',
		require('./AuthController')
	]
);