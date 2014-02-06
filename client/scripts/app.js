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
$(document).ready(function() {
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	var player = {
		x: 100,
		y: 100,
		width: 20,
		height: 20
	}
	function game() {
		//CLEAR
		ctx.clearRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);

		//DO SHIT
		if(Input.keydown(Input.keys['left-arrow']))
			--player.x;
		if(Input.keydown(Input.keys['right-arrow']))
			++player.x;
		if(Input.keydown(Input.keys['up-arrow']))
			++player.y;
		if(Input.keydown(Input.keys['down-arrow']))
			--player.y;
		//REDRAW
		ctx.fillRect(player.x - player.width / 2, player.y - player.height / 2, player.width, player.height);
	}

	var interval = setInterval(game, 1000 / 60);
});

var Input = function() {
	var keys = {};
	$(window).keydown(function(e) {
		keys[e.keyCode] = true;
	}).keyup(function(e) {
		keys[e.keyCode] = false;
	});
	return {
		keys: {
			'left-arrow': 37,
			'up-arrow': 38,
			'right-arrow': 39,
			'down-arrow': 40,
		},
		keydown: function(key) {
			return keys[key];
		}
	}
}();

