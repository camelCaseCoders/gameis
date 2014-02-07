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
	shell: Media.loaders.audio('shell.mp3'),
	player: Media.loaders.spriteSheet('player.png', 50, 50)
});
$(document).ready(function() {
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');
	
	request.ready(function(media) {
		var player = {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			roation: 0,
			speed: 2,
			currentSprite: media.player.sprites[0][0]
		}
		var ticks = 0;
		function game() {
			//CLEAR
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//DO SHIT
			var xd = 0, yd = 0;
		
			if(Input.keydown(Input.keys['right-arrow']))
				xd = player.speed;
			if(Input.keydown(Input.keys['left-arrow']))
				xd = -player.speed;
			if(Input.keydown(Input.keys['up-arrow']))
				yd = player.speed;
			if(Input.keydown(Input.keys['down-arrow']))
				yd = -player.speed;
			var moving = xd || yd;
			if(moving) {
				++ticks;
				player.roation = Math.atan2(xd, yd);
				player.currentSprite = media.player.sprites[0][Math.floor((ticks / 5) % 16)];
			}

			player.x += xd;
			player.y += yd;
			if(player.x > canvas.width + player.width / 2 && xd > 0)
				player.x = -player.width;
			if(player.x < -player.width / 2 && xd < 0)
				player.x = canvas.width + player.width / 2;
			if(player.y > canvas.height + player.height / 2 && yd > 0)
				player.y = -player.height;
			if(player.y < -player.width / 2 && yd < 0)
				player.y = canvas.height + player.height / 2;
			console.log(player.x);

			//REDRAW
			ctx.save(); 
			ctx.translate(player.x, canvas.height - player.y);
			ctx.rotate(player.roation);
			player.currentSprite.draw(ctx, -player.width / 2, -player.height / 2);
			ctx.restore();

			if(Math.random() > 0.95)
				media.shell.play();

			//rect(ctx, -this.pos.w / 2, -this.pos.h / 2, render.w, render.h, alphaColor(255, 0, 0, .3));
			//ctx.fillRect(player.x - player.width / 2, canvas.height - (player.y - player.height / 2), player.width, player.height);
			//ctx.drawImage(media.character, player.x - player.width / 2,
			//canvas.height - (player.y - player.height / 2), player.width, player.height);
		}

		var interval = setInterval(game, 1000 / 60);
	});
	
});