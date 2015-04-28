'use strict';
var name = "users";
// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 'ngMaterial' ])

.service('userService', [
	'$q', 
	require('./UserService')
])

.controller('UserController', [
		'userService', 
		'$mdSidenav', 
		'$mdBottomSheet', 
		'$log',
		'$q',
		require('./UserController')
	]
);