const player = {
	x: 0,
	y: 0,
	speed: 1,
	bullets: 6,
	score: {classic: 0, speedy: 0},
	high_score: {classic: 0, speedy: 0},
	muzzleflashOn: false,
	miss: false,
	radius: 30,
	shoot: function() {
		// Set muzzle player.muzzleflashOn to true for 100ms

		if (this.bullets <= 0) {
			if( settings.soundEffects){
				empty.setVolume(0.1);
				empty.play();
			}
		} else {
			this.bullets -= 1;

			this.muzzleflashOn = true;
			setTimeout(() => {
				this.muzzleflashOn = false
			}, 100);

			if (settings.soundEffects == true) {
				shot.setVolume(0.1);
				shot.play();
			};

			let rotation = atan2(mouseX - player.x, mouseY - player.y);
			let a = sin(rotation) * 1000;
			let b = cos(rotation) * 1000;
			// Draws bullet trajectory
			// line(player.x, player.y, player.x + a, player.y + b);

			this.miss = true;
			enemies.forEach((enemy, index) => {
				if (pDistance(enemy.x, enemy.y, player.x, player.y, player.x + a, player.y + b) <= enemy.radius) {
					if(settings.gameMode == "CLASSIC"){
						player.score.classic++;
					} else if(settings.gameMode == "SPEEDY"){
						player.score.speedy++;
					};
					this.miss = false;
					delete enemies[index];
				};
			});

			if (this.miss) {
				game_state = "GAME_OVER"
			};
		};

	},
	reload: function () {
		this.bullets = -1;
		setTimeout(() => {
			this.bullets = 6
			this.reloading = false;
		}, 2000)
		if (settings.soundEffects) {
			reload.setVolume(0.1);
			reload.play();
		};
		console.log("reload");
	},
	draw: function () {
		let rotation = -(180 + atan2(mouseX - this.x, mouseY - this.y));
		// let rotation = 0;
		push();
		translate(this.x, this.y);
		rotate(rotation);
		stroke(255);
		image(gun, 0, -40, 80, 60)
		image(hat, 0, 0, 50, 50);
		if (this.muzzleflashOn) {
			image(muzzleflash, 0, -100, 80, 80);
		};
		// noFill();
		// circle(0, 0, this.radius);
		pop();

		powerups.forEach((powerup, index) => {
			if(dist(powerup.x, powerup.y, player.x, player.y) < powerup.radius+player.radius){
				powerup.activate();
				delete powerups[index];
			};
		});
		
	},
	control: function () {
		// TODO: two buttons at once problem
		let a = this.speed * sin(45); // X-axis
		let b = this.speed * cos(45); // Y-asix
		let topEdge = player.y > 0;
		let rightEdge = player.x < width;
		let leftEdge = player.x > 0;
		let bottomEdge = player.y < height;
		if (keyIsDown(87) && keyIsDown(65) && leftEdge && topEdge) { // WA
			this.x -= a;
			this.y -= b;
		} else if (keyIsDown(65) && keyIsDown(83) && leftEdge && bottomEdge) { //AS
			this.x -= a;
			this.y += b;
		} else if (keyIsDown(83) && keyIsDown(68) && bottomEdge && rightEdge) { //SD
			this.x += a;
			this.y += b;
		} else if (keyIsDown(68) && keyIsDown(87) && topEdge && rightEdge) { //DW
			this.x += a;
			this.y -= b;
		} else if (keyIsDown(87) && topEdge) { //W 87
			this.y -= this.speed;
			// if(key == "w" && !keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)){
			// 	this.y -= this.speed;
			// } else if(key == "w" && keyIsDown(65) && !keyIsDown(83) && !keyIsDown(68)) {
			// 	let a = this.speed * sin(45);
			// 	let b = this.speed * cos(45);
			// 	console.log(a*a+b*b);
			// 	this.x += a;
			// 	this.y -= b;
			// }
		} else if (keyIsDown(65) && leftEdge) { //A
			this.x -= this.speed;
		} else if (keyIsDown(83) && bottomEdge) { //S
			this.y += this.speed;
		} else if (keyIsDown(68) && rightEdge) { //D
			this.x += this.speed;
		};

		if (keyIsDown(82)) { //R
			if (!this.reloading && this.bullets != 6) {
				this.reloading = true;
				this.reload();
			};
		};
	}
}