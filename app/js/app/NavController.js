'use strict';
/**
 * Navigation Controller
 * @param  {[type]} $mdSidenav [description]
 */
module.exports = function ( $mdSidenav ) {

	var self = this;
	self.items = ['nav'];
	self.toggleLeft = toggleNavLeft;
	self.toggleRight = toggleNavRight;


	function toggleNavLeft(){
		console.log('toggle left');
		$mdSidenav('left').toggle();
	}
	function toggleNavRight(){
		console.log('toggle Right');

		$mdSidenav('right').toggle();
	}
};