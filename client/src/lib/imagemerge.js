(function() {
	window.imageMerge = function() {
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');
		var first = arguments[0];
		canvas.width = first.width;
		canvas.height = first.height;
		for(var i = 0; i < arguments.length; i++) {
			ctx.drawImage(arguments[i], 0, 0);
		}
		return canvas;
	}
})();