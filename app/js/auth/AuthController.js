'use strict';

module.exports = function ( $scope,  $stateParams, $state ) {

	var self = this;
	console.log("stateParams");
	console.log($stateParams);
	var username = $stateParams.username;
	var token = $stateParams.token;
	console.log(username, token);

	//Redirect
	// $state.go('games.list');
}