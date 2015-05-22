'use strict';

module.exports = function ( $scope,  $stateParams, $state, $cookies) {

	console.log("HOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOI");

	var self = this;

	var storedUsername = $cookies.oauth_username;
	var storedToken = $cookies.oauth_access_token;

	if(storedUsername && storedToken) {
		console.log("Cookies set already");
	} else {
		$cookies.oauth_username = $stateParams.username;
		$cookies.oauth_access_token = $stateParams.token;
		console.log("Cookies have been set now");
	}

	// console.log("stateParams");
	// console.log($stateParams);
	// var username = $stateParams.username;
	// var token = $stateParams.token;
	// console.log(username, token);

	//Redirect
	// $state.go('games.list');
}