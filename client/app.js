angular.module('app', ['ngRoute'])
.config(function($routeProvider) {
	$routeProvider
	.when('/', {
		templateUrl: 'templates/start.html'
	})
	.when('howto', {
		templateUrl: 'templates/howto.html'
	})
	.when('kasta', {
		templateUrl: 'templates/kasta.html'
	})
	.when('slopa', {
		templateUrl: 'templates/slopa.html'
	})
	.when('about', {
		templateUrl: 'templates/about.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});