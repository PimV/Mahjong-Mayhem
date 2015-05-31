'use strict';
/**
 * Navigation Controller
 * @param  {[type]} $mdSidenav [description]
 */
module.exports = function ( $mdSidenav ) {

	var self = this;
	self.toggleLeft = toggleNavLeft;
	self.toggleRight = toggleNavRight;


	function toggleNavLeft(){
		$mdSidenav('left').toggle();
	}
	function toggleNavRight(){
		$mdSidenav('right').toggle();
	}
};