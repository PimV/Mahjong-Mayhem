'use strict';
var name = "head";

angular.module(name, [ 
	'ngMaterial' 
])
.factory('httpRequestInterceptor', function ($cookies) {
	return {    
		request: function (config) { 

			config.headers['x-username'] = $cookies.oauth_username;
			config.headers['x-token'] = $cookies.oauth_access_token;
			return config;
		} 
	}
})
.config(function($httpProvider) {
	$httpProvider.interceptors.push('httpRequestInterceptor');
});

