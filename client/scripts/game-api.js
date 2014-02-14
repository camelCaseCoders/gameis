angular.module('game-api', [])
.directive('gameApi', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		scope: {},
		controller: ['$scope',
			function(scope) {
				var that = this;
				scope.ready = function(public) {
					public.call(that);
				}
				var game, running, lastTime = 0;
				var update = function(time) {
					var delta = (time - lastTime) / 100;
					scope.showFps(Math.round(10 / delta));
					
					game(time, delta);

					lastTime = time;
					if(running)	window.requestAnimationFrame(update);
				}
				this.start = function(fn) {
					game = fn;
					running = true;
					window.requestAnimationFrame(update);
				}
				this.stop = function() {
					running = false;
				}
			}
		],
		link: function(scope, element, attrs) {
			var $fps = $(document.createElement('div'))
				.css('position', 'absolute')
				.css('z-index', 10000)
				.css('color', '#f00');
			element.append($fps)

			var canvases = {};
			var public = function() {
				this.canvases = canvases;
				this.addCanvas = function(name) {
					var canvas = document.createElement('canvas');
					canvas.width = element.width();
					canvas.height = element.height();
					var $canvas = $(canvas)
						.css('position', 'absolute')
						.css('z-index', canvases.length);

					element.append($canvas);
					var obj = {$element: $canvas, element: canvas, ctx: canvas.getContext('2d')};
					canvases[name] = obj;
					return obj;
				};
			}
			scope.showFps = function(fps) {
				$fps.text(fps);
			}
			scope.ready(public);
		}
	}
});
