'use strict';

module.exports = function ( userService, $scope, $location, $stateParams,  $mdSidenav, $mdBottomSheet, $log, $q) {
	/**
	 * Main Controller for the Angular Material Starter App
	 * @param $scope
	 * @param $mdSidenav
	 * @param avatarsService
	 * @constructor
	 */
	
	var self = this;

	self.selected     = null;
	self.users        = [ ];
	self.selectUser   = selectUser;
	self.toggleList   = toggleUsersList;
	self.share        = share;

	// Load all registered users
	self.users = userService.all();
	if (typeof $stateParams.userId !== 'undefined') {
		selectUser($stateParams.userId);
	} else {
		self.selected = self.users[0];
	}
	
	// console.log(self.selected);
	// userService
	// .get()
	// .then( function( users ) {
	// 	self.users    = [].concat(users);
	// 	self.selected = users[0];
	// });

	// *********************************
	// Internal methods
	// *********************************

	/**
	* First hide the bottomsheet IF visible, then
	* hide or Show the 'left' sideNav area
	*/
	function toggleUsersList() {
		var pending = $mdBottomSheet.hide() || $q.when(true);

		pending.then(function(){
			$mdSidenav('left').toggle();
		});
	}

	/**
	* Select the current avatars
	* @param menuId
	*/
	function selectUser ( user ) {
		self.selected = angular.isNumber(parseInt(user)) ? self.users[user] : user;
	}

	/**
	* Show the bottom sheet
	*/
	function share($event) {
		var user = self.selected;

		$mdBottomSheet.show({
			parent: angular.element(document.getElementById('content')),
			templateUrl: 'views/users/users.contact.html',
			controller: [ '$mdBottomSheet', UserSheetController],
			controllerAs: "vm",
			bindToController : true,
			targetEvent: $event
		}).then(function(clickedItem) {
			clickedItem && $log.debug( clickedItem.name + ' clicked!');
		});

		/**
		 * Bottom Sheet controller for the Avatar Actions
		 */
		function UserSheetController( $mdBottomSheet ) {
		 	this.user = user;
		 	this.items = [
		 	{ name: 'Phone'       , icon: 'phone'       , icon_url: 'assets/svg/phone.svg'},
		 	{ name: 'Twitter'     , icon: 'twitter'     , icon_url: 'assets/svg/twitter.svg'},
		 	{ name: 'Google+'     , icon: 'google_plus' , icon_url: 'assets/svg/google_plus.svg'},
		 	{ name: 'Hangout'     , icon: 'hangouts'    , icon_url: 'assets/svg/hangouts.svg'}
		 	];
		 	this.performAction = function(action) {
		 		$mdBottomSheet.hide(action);
		 	};
		}
	}

	self.addUser = function(){
		userService.add($scope.user);
		console.log("new user added", $scope.user); 
		$location.path('/users');
	}

	self.showUser = function($index){
		$location.path("/users/" + $index);	
	}
};



