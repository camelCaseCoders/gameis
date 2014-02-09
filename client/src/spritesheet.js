(function(key) {
	function Sprite(x, y, w ,h) {
		this.draw = function(ctx, image, dx, dy) {
			ctx.drawImage(image, x, y, w, h, dx, dy, w, h);
		}
	}
	var Spritesheet = window.Spritesheet = function(image, sw, sh) {
		var sprites = [];
		this._ = window.underscore(key, {
			sprites: sprites,
			image: image,
			current: {}
		});

		// y and x order inverted because of how the spritesheets are drawn
		for(var y = 0; y < image.height / sh; y++) {
			sprites[y] = [];
			for(var x = 0; x < image.width / sw; x++) {
				sprites[y][x] = new Sprite(x * sw, y * sh, sw, sh);;
			}
		}

	};
	Spritesheet.prototype = {
		drawSprite: function(ctx, y, x, dx, dy) {
			var _ = this._(key);
			_.sprites[y][x].draw(ctx, _.image, dx, dy);
		}
		/*,
		drawNext: function(ctx, y, dx, dy) {
			var _ = this._(key);
			var current =  _.current[y] ||  0;
			this.drawSprite(ctx, y, current, dx, dy);
			_.current = current + 1;
		}*/
	};
})({});