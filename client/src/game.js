window.randomInt = function(max) {
	return Math.floor(Math.random() * max);
}

angular.module('game', [])
.directive('game', function() {
	var request = media.request({
		character: media.loaders.image(media.dir + 'character.png'),
		player: media.loaders.spriteSheet(media.dir + 'player.png', 50, 50)
	});
	return {
		restrict: 'AC',
		require: 'gameApi',
		link: function(scope, element, attrs, api) {
			var canvasObject = api.addCanvas(),
				canvas = canvasObject.element,
				ctx = canvasObject.ctx;
				ctx.fillStyle = 'rgba(255,0,0,.1)';
			
			request.ready(function(media) {
				var entities = [],
					player = new Player(media, canvas, 25, 25);
				entities.push(player);
				/*
				for(var i = 0; i < 1000; i++) {
					entities.push(new Entity(canvas, randomInt(canvas.width), randomInt(canvas.height), randomInt(50), randomInt(50)))
				}
				*/
				
				/*for(var x = 0; x < canvas.width + 50; x += (canvas.width + 50) / 50) {
					for (var y = 0; y < canvas.height + 50; y += (canvas.height + 50) / 50) {
					entities.push(new Player(media, canvas, x, y));
					};
				}
				alert(entities.length);*/

				api.start(function(time, delta) {
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					for(var e in entities) {
						entities[e].update(time, delta);
					}
					for(var e in entities) {
						entities[e].render(ctx);
					}
				});
			});	
		}
	}
});