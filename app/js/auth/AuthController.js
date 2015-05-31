'use strict';

module.exports = function ( $scope,  $stateParams, $state, $cookies) {

	var self = this;
	//Params from the url
	var pUsername = $stateParams.username;
	var pToken = $stateParams.token;

	//Already stored cookie values
	var storedUsername = $cookies.oauth_username;
	var storedToken = $cookies.oauth_access_token;

	//Make username publicly available
	self.username = storedUsername;
	//console.log(storedUsername, storedToken, $stateParams.username, $stateParams.token);

	if(typeof pUsername !== 'undefined' && typeof pToken !== 'undefined') {
		console.log("Cookies can be set !!!");
		$cookies.oauth_username = pUsername;
		$cookies.oauth_access_token = pToken;
		console.log('Cookies overwritten: ', pUsername, pToken);
	} else if(storedUsername && storedToken){
		console.log("There are still some cookies left.", storedUsername, storedToken);
	} else {
		console.log('No cookies available, please login.');
	}

	//Redirect
	$state.go('games.list');
}