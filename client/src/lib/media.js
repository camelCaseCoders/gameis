window.media = function() {
	var cache = {};

	var get = function(req) {
		for(var src in cache) {
			if(src === req.src) {
				for(var type in cache[req]) {
					if(type === req.type) 
						return cache[src][type];
				}
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

			var cached = {type: req.type, media: media};
			if(cache[req.src]) cache[req.src].push(cached);
			else cache[req.src] = [cached];

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

	var media = {};
	media.dir = 'res/';
	media.request = function(request) {
		return respond(request);
	};
	media.loaders = {
		image: function(src) {
			var image = new Image();
			image.src = src;
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
		audio: function(src, vol) {
			var audio = new Audio();
			audio.src = src;
			audio.volume = vol || 1;
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
			var request = media.request({image: media.loaders.image(src)}), sheet;
			return {
				src: src,
				type: 'spritesheet',
				done: function(callback) {
					var self = this;
					request.ready(function(media) {
						sheet = new Spritesheet(media.image, sw, sh);
						callback(self);
					});
				},
				get: function() {
					return sheet;
				}
			}

		},
		imageOverlay: function(src, color) {
			var request = media.request({image: media.loaders.image(src)}), overlay;
			return {
				src: src,
				type: 'overlay',
				done: function(callback) {
					var self = this;
					request.ready(function(media) {
						overlay = createOverlay(media.image, color);
						callback(self);
					});
				},
				get: function() {
					return overlay;
				}
			}
		}
	};
	return media;
}();
/*
media.request({
	icon: media.loaders.image('icon.png'),
	song: media.loaders.sound('song.ogg')
})
.ready(function(media) {

});
*/
