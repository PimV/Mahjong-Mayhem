'use strict';

var constants = require('./common/constants');

require('angular/angular');
require('angular-animate');
require('angular-aria');
require('angular-material');

require('./users/Users');

require('./games/Games');

angular.module(constants.appTitle, [
	require('angular-ui-router'),
	'ngMaterial',
	'users',
	'games'
])
.constant('settings', require('./common/constants'))

.config(function($mdThemingProvider, $mdIconProvider){

	$mdIconProvider
	.defaultIconSet("./assets/svg/avatars.svg", 128)
	.icon("menu"       , "./assets/svg/menu.svg"        , 24)
	.icon("share"      , "./assets/svg/share.svg"       , 24)
	.icon("google_plus", "./assets/svg/google_plus.svg" , 512)
	.icon("hangouts"   , "./assets/svg/hangouts.svg"    , 512)
	.icon("twitter"    , "./assets/svg/twitter.svg"     , 512)
	.icon("phone"      , "./assets/svg/phone.svg"       , 512);

	$mdThemingProvider.theme('default')
	.primaryPalette('brown')
	.accentPalette('red');

})
.config(require('./common/routes'));



