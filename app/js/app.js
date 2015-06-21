//'use strict';
require('angular/angular');
var constants = require('./common/constants');
require('angular-animate');
require('angular-aria');	

require('./app/Theme');
require('./app/Nav');
require('./app/Head');
require('./auth/Auth');
require('./users/Users');
require('./games/Games');

angular.module(constants.appTitle, [
	require('angular-material'),
	require('angular-ui-router'),
	require('angular-cookies'),
	'head',
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

require('./filters/filters')(constants);

