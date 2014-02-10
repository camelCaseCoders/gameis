angular.module('game-api', [])
.directive('gameApi', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<div ng-transclude></div>',
		controller: ['$scope',
			function(scope) {
				this.addCanvas = scope.addCanvas;
				this.test = function() {
					alert('test');
				};
			}
		],
		link: function(scope, element, attrs) {
			var canvases = [];
			scope.addCanvas = function() {
				var canvas = $(document.createElement('canvas'))
				.width(element.width())
				.height(element.height())
				.css('position', 'absolute')
				.css('z-index', canvases.length);

				element.append(canvas);
				canvases.push(canvas);
			}
		}
	}
});
