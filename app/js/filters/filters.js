'use strict';
module.exports = function(constants){
	var name = "filters";
	// Prepare the 'users' module for subsequent registration of controllers and delegates
	angular.module(constants.appTitle)
	.filter('stateFilter', require('./stateFilter'));

};