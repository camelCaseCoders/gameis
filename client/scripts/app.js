angular.module('app', [
	'ngRoute',
	'game-api',
	'game',
	'blink'
])
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
	.when('highscores', {
		templateUrl: 'templates/highscores.html'
	})
	.when('about', {
		templateUrl: 'templates/about.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});