var request = Media.request({
	character: Media.loaders.image(Media.dir + 'character.png'),
	smallCharacter: Media.loaders.image(Media.dir + 'favicon.ico'),
	//shell: Media.loaders.audio(Media.dir + 'shell.mp3'),
	//fire: Media.loaders.audio(Media.dir + 'fire.mp3', 0.2),
	player: Media.loaders.spriteSheet(Media.dir + 'player.png', 50, 50)
});
$(document).ready(function() {
	var canvas = document.getElementById('game-canvas'),
		ctx = canvas.getContext('2d');

	var $fps = $('#fps');

	request.ready(function(media) {
		var player = {
			x: 100,
			y: 100,
			width: 50,
			height: 50,
			roation: 0,
			speed: 15,
			runModif: 1.5,
			animation: new Animation(media.player, 100)
		}
		var lastTime = 0;
		function game(time) {
			//CLEAR
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			//DO SHIT

			//CALCULATE DELTA
			var delta = time - lastTime;
			$fps.text(Math.round(1000 / delta));
			delta /= 100;

			//PLAYER MOVEMENT
			var xd = 0, yd = 0, speed = player.speed * delta;
			if(controls.down('run')) {
				speed *= player.runModif;
				player.animation.setSpeed(50);
				//animspeed /= player.runModif;
			} else {
				player.animation.setSpeed(80);
			}
			if(controls.down('walk-right'))
				xd += speed;
			if(controls.down('walk-left'))
				xd -= speed;
			if(controls.down('walk-up'))
				yd += speed;
			if(controls.down('walk-down'))
				yd -= speed;
			if(controls.down('fire')) {
				/*
				media.fire.pause();
				media.fire.currentTime = 0;
				media.fire.play();
				*/
			}

			//SET ROTATION AND CHANGE SPRITE
			var moving = xd || yd;
			if(moving) {
				player.roation = Math.atan2(xd, yd);
				player.animation.update(time);
			} else {
				player.animation.pause();
			}

			//MOVE
			player.x += xd;
			player.y -= yd;

			//CHECKING IF PLAYER IS OUT OF BOUNDS
			if(player.x > canvas.width + player.width / 2 && xd > 0)
				player.x = -player.width / 2;
			if(player.x < -player.width / 2 && xd < 0)
				player.x = canvas.width + player.width / 2;
			if(player.y > canvas.height + player.height / 2 && yd < 0)
				player.y = -player.height / 2;
			if(player.y < -player.width / 2 && yd > 0)
				player.y = canvas.height + player.height / 2;

			//REDRAW

			//ROTATE AND DRAW SPRITE
			ctx.save();
			ctx.translate(player.x, player.y);
			ctx.rotate(player.roation);
			player.animation.render(ctx, 0, -player.width / 2, -player.height / 2);
			ctx.restore();

			//REQUEST NEXT UPDATE
			lastTime = time;
			window.requestAnimationFrame(game);
		}

		window.requestAnimationFrame(game);
	});
	
});