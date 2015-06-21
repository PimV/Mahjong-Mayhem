'use strict';
/**
 * CSS Controller
 */
module.exports = function ( ) {
	
	var self = this;
	self.blue = false;

	/**
	 * Check if blue css styling needs to be applied
	 * @return {Boolean} isBlue
	 */
	self.isBlue = function (){
		return self.blue;
	}
};