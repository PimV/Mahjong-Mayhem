'use strict';

var constants = require('./common/constants');

require('angular/angular');
require('angular-cookies');
require('angular-animate');
require('angular-aria');
require('angular-material');



require('./app/Theme');
require('./app/Nav');
require('./app/Head');
require('./auth/Auth');
require('./users/Users');
require('./games/Games');

angular.module(constants.appTitle, [
	require('angular-ui-router'),
	'ngMaterial',
	'ngCookies',
	'theme',
	'nav',
	'auth',
	'users',
	'games'
])

//Ui-router Routes
.config(require('./common/routes'))

//Constants
.constant('settings', require('./common/constants'))

//Directives
require('./directives/directives')(constants);

