(function() {
	var cache = {},
		dir = 'res/';

	var get = function(req) {
		for(var src in cache) {
			if(src === req.src) {
				for(var type in cache[req])
					if(type === req.type)
						return cache[src][type];
			}
		}
	};

	var respond = function(request) {
		var loaded = {},
			listeners = [],
			ready = false;
		
		var check = function() {
			if(Object.keys(loaded).length == Object.keys(request).length) {
				ready = true;
				while(listeners.length > 0) {
					listeners.pop()(loaded);
				}
			}
		}

		var ondone = function(req) {
			var media = req.get();
			cache[req.src] = {type: req.type, media: media};
			loaded[req.name] = media;
			check();
		}

		for(var name in request) {
			var req = request[name],
				cached = get(req);
			req.name = name;
			if(cached) {
				loaded[name] = cached;
			} else {
				req.done(ondone);
			}
		}
		check();

		return {
			ready: function(callback) {
				if(ready) callback(loaded);
				else listeners.push(callback);
			}
		}
	}

	var Media = {};
	Media.request = function(request) {
		return respond(request);
	};
	Media.loaders = {
		image: function(src) {
			var image = new Image();
			image.src = dir + src;
			return {
				src: src,
				type: 'image',
				done: function(callback) {
					var self = this;
					if(image.complete) {
						alert('image.complete in media.js');
						callback(self);
					} else {
						image.onload = function() {
							callback(self);
						};
					}		
				},
				get: function() {
					return image;
				}
			}
		},
		audio: function(src) {
			var audio = new Audio();
			audio.src = dir + src;
			return {
				src: src,
				type: 'audio',
				done: function(callback) {
					var self = this;
					audio.oncanplaythrough = function() {
						callback(self);
					}		
				},
				get: function() {
					return audio;
				}
			}
		},
		spriteSheet: function(src, sw, sh) {
			var imageLoader = Media.loaders.image(src);
			var sheet = {};

			var Sprite = function(image, x, y, w ,h) {
				this.draw = function(ctx, dx, dy) {
					ctx.drawImage(image, x, y, w, h, dx, dy, w, h);
				}
			}
			return {
				src: src,
				type: 'spritesheet',
				done: function(callback) {
					var self = this;
					imageLoader.done(function(loader) {
						image = loader.get();
						var sprites = sheet.sprites = [];
						// y and x order inverted. Feels better considering how the spritesheets are drawn
						for(var y = 0; y < image.height / sh; y++) {
							sprites[y] = [];
							for(var x = 0; x < image.width / sw; x++) {
								sprites[y][x] = new Sprite(image, x * sw, y * sh, sw, sh);;
							}
						}
					});
				},
				get: function() {
					return sheet;
				}
			}

		}
	};
	window.Media = Media;
})();
/*
Media.request({
	icon: Media.loaders.image('icon.png'),
	song: Media.loaders.sound('song.ogg')
})
.ready(function(media) {

});
*/
