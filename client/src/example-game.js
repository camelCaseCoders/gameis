angular.module('example-game', [])
.directive('exampleGame', function() {
	return {
		restrict: 'AC',
		require: 'gameApi',
		controller: ['$scope',
			function(scope) {
				scope.api = function(api) {
					api.addCanvas();
				}
			}
		],
		link: function(scope, element, attrs, api) {
			scope.api(api);
		}
	}
});