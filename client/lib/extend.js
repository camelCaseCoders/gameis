(function() {
	//Empty constructor function
	var dummy = function() {};
	window.extend = function(constructor) {
		dummy.prototype = constructor.prototype;
		return new dummy();
	}
})();