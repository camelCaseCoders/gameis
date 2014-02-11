angular.module('blink', [])
.directive('blink', function() {
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		template: '<span ng-transclude></span>',
		scope: {speed: '@'},
		link: function (scope, element, attrs) {
			var visible = true,
				speed = scope.speed || 100;
			
			var blink = function() {
				if(visible) element.css('visibility', 'hidden');
				else element.css('visibility', 'visible');
				visible = !visible;
				window.setTimeout(blink, speed);    
			}
			blink();
		}
	}
});