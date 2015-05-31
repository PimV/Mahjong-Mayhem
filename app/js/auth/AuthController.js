'use strict';

module.exports = function ( $scope,  $stateParams, $state, $cookies) {

	var self = this;

	var storedUsername = $cookies.oauth_username;
	var storedToken = $cookies.oauth_access_token;
	self.username = storedUsername;
	if(storedUsername && storedToken) {
		console.log("Cookies set already");
	} else {
		$cookies.oauth_username = $stateParams.username;
		$cookies.oauth_access_token = $stateParams.token;
		console.log("Cookies have been set now");
	}

	//Redirect
	$state.go('games.list');
}