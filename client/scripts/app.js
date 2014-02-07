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
var request = Media.request({
	character: Media.loaders.image('character.png'),
	smallCharacter: Media.loaders.image('favicon.ico'),
	halloween: Media.loaders.audio('halloween.mp3'),
	shell: Media.loaders.audio('shell.mp3')
});
$(document).ready(function() {
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');
	
	request.ready(function(media) {
		var player = {
			x: 100,
			y: 100,
			width: 20,
			height: 20
		}
		function game() {
			//CLEAR
			ctx.clearRect(0, 0, canvas.width, canvas.height);

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
			//ctx.fillRect(player.x - player.width / 2, canvas.height - (player.y - player.height / 2), player.width, player.height);
			ctx.drawImage(media.character, player.x - player.width / 2,
				canvas.height - (player.y - player.height / 2), player.width, player.height);
			if(Math.random() > 0.9)
				media.shell.play();
		}

		var interval = setInterval(game, 1000 / 60);
	});
	
});