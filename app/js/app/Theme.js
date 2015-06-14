'use strict';
var name = "theme";
// Prepare the 'users' module for subsequent registration of controllers and delegates
angular.module(name, [ 
	'ngMaterial' 
]).config([
	'$mdThemingProvider',
	'$mdIconProvider',
	function($mdThemingProvider, $mdIconProvider){

		$mdIconProvider
			.iconSet("avatar", "./assets/svg/avatars.svg", 128)
			.icon("menu"       , "./assets/svg/menu.svg"        , 24)
			.icon("share"      , "./assets/svg/share.svg"       , 24)
			.icon("google_plus", "./assets/svg/google_plus.svg" , 512)
			.icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
			.icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
			.icon("phone"      , "./assets/svg/phone.svg"       , 512);

		$mdThemingProvider.theme('default')
		.primaryPalette('brown')
		.accentPalette('red');

	}
])
.factory('colorFactory', [
		'$mdColorPalette', 
		require('../factories/ColorFactory')
	]
);