(function() {
	window.createOverlay = function(image, color) {
		color = color.split(',');
		var canvas = document.createElement('canvas'),
			ctx = canvas.getContext('2d');
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0);
		var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height),
			data = imageData.data;

		for(var i = 0; i < data.length; i += 4) {
		var r = i, g = i + 1, b = i + 2, a = i + 3; 
			if(data[a]) {
				data[r] = color[0];
				data[g] = color[1];
				data[b] = color[2];
				data[a] = color[3];
			}
		}

		ctx.putImageData(imageData, 0, 0);
		return canvas;
	}
})();