var Media = function() {
	var listeners = [],
		loaders = [];

	return {
		ready: function(callback) {
			listeners.push(callback);
		},
		load: function(loader) {
			loaders.push();
			return this;
		},
		start: function() {

		}
	};
}();

var NewMedia = function() {
	var cache = {},
		dir = 'res/';

	var get = function(src) {
		for(var key in cache) {
			if(src === key) {
				return cache[key]
			}
		}
	};

	var respond = function(request) {
		var loaded = {}, onready;
		var check = function() {
			if(Object.keys(loaded).length == Object.keys(request).length) {
				onready(loaded);
			}
		}

		var ondone = function(req) {
			var media = req.get();
			cache[req.src] = media;
			loaded[req.name] = media;
			check();
		}

		for(var name in request) {
			var req = request[name],
				cached = get(req.src);
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
				onready = callback;
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
				done: function(callback) {
					if(image.complete) {
						alert('image.complete in media.js');
						callback(this);
					} else {
						image.onload = function() {
							callback(this);
						};
					}		
				},
				get: function() {
					return image;
				}
			}
		}
	};
	return Media;
}();
/*
Media.request({
	icon: Media.loaders.image('icon.png'),
	song: Media.loaders.sound('song.ogg')
})
.ready(function(media) {

});
*/
