angular.module('example-game', [])
.directive('exampleGame', ['media'
	function(media) {
		var request = media.request({
			character: Media.loaders.image(Media.dir + 'character.png'),
			player: Media.loaders.spriteSheet(Media.dir + 'player.png', 50, 50)
		});
		return {
			restrict: 'AC',
			require: 'gameApi',
			link: function(scope, element, attrs, api) {
				var canvasObject = api.addCanvas(),
					canvas = canvasObject.element,
					ctx = canvasObject.ctx;

				var entities = [];
				entities.push(new Player());
				request.ready(function(media) {

				});	
			}
		}
	}
]);