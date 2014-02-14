window.randomInt = function(max) {
	return Math.floor(Math.random() * max);
}

angular.module('game', [])
.directive('game', function() {
	var request = Media.request({
		player: Media.loaders.image(Media.dir + 'player.png'),
		bullet: Media.loaders.image(Media.dir + 'bullet.png')
	});
	var controls = [
		{
			'walk-up': [
				key('w')
			],
			'walk-left': [
				key('a')
			],
			'walk-right': [
				key('d')
			],
			'walk-down': [
				key('s')
			],
			//'run': key('1'),
			'fire': key('1')
		},
		{
			'walk-up': [
				key('up-arrow')
			],
			'walk-left': [
				key('left-arrow')
			],
			'walk-right': [
				key('right-arrow')
			],
			'walk-down': [
				key('down-arrow')
			],
			//'run': key('star'),
			'fire': key('star')
		}
	];
	return {
		restrict: 'AC',
		require: 'gameApi',
		link: function(scope, element, attrs, api) {
			api.addCanvas('bullet');
			api.addCanvas('base');

			var base = api.canvases['base'].element;

			request.ready(function(media) {
				window.media = media;
				var level = window.level = new Level(base.width, base.height, api.canvases);

				level.addEntity(new Player(level, 25, 25, '255,0,0', controls[0]));
				level.addEntity(new Player(level, 75, 25, '0,0,255', controls[1]));

				api.start(function(time, delta) {
					//UPDATE LEVEL
					level.update(time, delta);
				});
				window.stop = api.stop;
			});	
		}
	}
});