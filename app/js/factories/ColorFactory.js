'use strict';
/**
 * Color Factory
 * 
 */
module.exports = function ($mdColorPalette){
	var factory = {};
	
	factory.colors = [
		"red",
		"pink",
		"purple",
		"deep-purple",
		"indigo",
		"blue",
		"light-blue",
		"cyan",
		"teal",
		"green",
		"light-green",
		"lime",
		"yellow",
		"amber",
		"orange",
		"deep-orange",
		"brown",
		"grey",
		"blue-grey"
	];
	
	factory.random = function(){
		return factory.color(factory.colors[Math.floor(Math.random()*factory.colors.length)]);
	};

	/**
	 * Return or bake color 
	 * @param  String IndexOf factory.colors[]
	 * @return {}   Object color()
	 * usage : var red = factory.color('red').toRGB();
	 */
	factory.color = function(index)
	{
		this.index = index;
		this.value = $mdColorPalette[index]['400'].value;
		this.toRGB = function( color ){
			
			return 'rgb('+this.value[0]+', '+this.value[1]+', '+this.value[2]+');';
		};
		this.get = function(){
			return this.value;
		}
		return this;
	}
	
	return factory;
}
