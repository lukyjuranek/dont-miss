function refreshHighScore() {
	try {
		player.high_score.classic = getCookie("high_score_classic");
		player.high_score.speedy = getCookie("high_score_speedy");
	} catch (err) {
		console.warn(err.message);
	};

	if (player.score.classic > player.high_score.classic) {
		player.high_score.classic = player.score.classic;
		createCookie("high_score_classic", player.high_score.classic)
	}
	if (player.score.speedy > player.high_score.speedy){
		player.high_score.speedy = player.score.speedy;
		createCookie("high_score_speedy", player.high_score.speedy);
	}
}

function spawn() {
	// let x = getRndIntTwoRanges(settings.spawnRange[0], settings.spawnRange[1], width - settings.spawnRange[1], width);
	// let y = getRndIntTwoRanges(settings.spawnRange[0], settings.spawnRange[1], height - settings.spawnRange[1], height);
	// let x;
	// let y;


	// spawns enemies min 500px from player
	// while(true){
	// 	let x = getRndInt(player.x-width/2, player.x+width/2);
	// 	let y = getRndInt(player.y-height/2, player.y+height/2);
	// 	if(dist(x, y, player.x, player.y) > 500){
	// 		let enemy = new Enemy(x, y);
	// 		enemies.push(enemy);
	// 		break;
	// 	};	
	// };

	let rndSpawns = randomSpawn(settings.spawnRange[1]);
	let enemy = new Enemy(rndSpawns[0], rndSpawns[1]);
	spawns.push(rndSpawns);
	enemies.push(enemy);
}

function spawnPowerup() {
	let powerup = new Powerup(getRndInt(0, width), getRndInt(0, height));
	powerups.push(powerup);
}

function randomSpawn(padding){
	let y = getRndInt(-padding, width+padding);
	let x;
	if(y<0 || y>height) {
		x = getRndInt(-padding, width+padding);
	} else if (y>0 || y<height){
		x = getRndIntTwoRanges(-padding, 0, width, width+padding);
	} else {
		console.error("some error")
	};
	return [x, y];
}

function resetGame() {
	try{
		clearInterval(spawnInterval);
		clearInterval(waveInterval);
		clearInterval(spawnPowerupInterval);
	} catch(err) {
		console.warn(err.message);
	};
	enemies = [];
	powerups = [];
	spawns = [];
	player.x = width / 2;
	player.y = height / 2;
	player.speed = 1;
	player.bullets = 6;
	player.score = {classic: 0, speedy: 0},
	player.muzzleflashOn = false;
	player.miss = false;
	wave = 1;
	if(settings.gameMode == "CLASSIC"){
		player.speed = 1;
		Enemy.speed = 1;
		settings.spawnSpeed = 1;
		waveInterval = setInterval(()=>{
			wave++;
			clearInterval(spawnInterval);
			spawnInterval = setInterval(spawn, 1000/(wave+settings.spawnSpeed));
		}, 10000)
	} else if (settings.gameMode == "SPEEDY") {
		player.speed = 3;
		Enemy.speed = 1;
		settings.spawnSpeed = 3;
		waveInterval = setInterval(()=>{
			wave++;
			clearInterval(spawnInterval);
			spawnInterval = setInterval(spawn, 1000/(wave+settings.spawnSpeed));
		}, 10000)
	};
	spawnInterval = setInterval(spawn, 1000/settings.spawnSpeed); // spawn enemy every x seconds
	if(gameMode=="CLASSIC"){
		spawnPowerupInterval = setInterval(spawnPowerup, 5000);
	};
}

function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndIntTwoRanges(min1, max1, min2, max2) {
	let rnd = getRndInt(0, 1);
	if (rnd == 0) {
		return getRndInt(min1, max1);
	} else if (rnd == 1) {
		return getRndInt(min2, max2);
	} else {
		// Error
		console.log("getRndIntegerBtwnTwoRanges(): rnd = " + rnd)
	}
}

function drawCrosshairs() {
	stroke(255, 0, 0);
	noFill();
	line(mouseX - 20, mouseY, mouseX + 20, mouseY);
	line(mouseX, mouseY - 20, mouseX, mouseY + 20);
	ellipse(mouseX, mouseY, 15, 15);
	ellipse(mouseX, mouseY, 30, 30);
	fill(255, 0, 0);
	ellipse(mouseX, mouseY, 3, 3);
}

function drawBullets() {
	let y = 50;
	for (let i = 0; i < player.bullets; i++) {
		image(bullet, width - y, height - 50, 70, 70);
		y += 30;
	}
}

function drawSpawnAreas() {
	stroke(0);
	noFill();
	rectMode(CORNER);

	let w = settings.spawnRange[1] - settings.spawnRange[0];
	let h = settings.spawnRange[1] - settings.spawnRange[0];
	rect(settings.spawnRange[0], settings.spawnRange[0], w, h);
	rect(width - settings.spawnRange[1], settings.spawnRange[0], w, h);
	rect(settings.spawnRange[0], height - settings.spawnRange[1], w, h);
	rect(width - settings.spawnRange[1], height - settings.spawnRange[1], w, h);
}

function drawFrameRate() {
	fill(255);
	stroke(0);
	textSize(settings.textSize*20);
	text(fps.toFixed(0), 50, 40);
}

function mouseClicked() {
	if (game_state == "MENU") {
		UI.buttons.menu.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	} else if (game_state == "GAME") {
		player.shoot();
	} else if (game_state == "SETTINGS") {
		UI.buttons.settings.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	} else if (game_state == "GAME_OVER") {
		UI.buttons.game_over.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	} else if (game_state == "ABOUT") {
		UI.buttons.about.forEach(button => {
			if (button.isMouseOnButton()) {
				button.press()
			}
		});
	}
}

function toggleFullscreen() {
	var elem = document.documentElement;

	if (settings.fullscreen) {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		};

		settings.fullscreen = false;
	} else {
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari & Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		};

		settings.fullscreen = true;
	}

	setTimeout(() => {
		resizeCanvas(displayWidth, windowHeight);
		initButtons();
	}, 200);

}


function pDistance(x, y, x1, y1, x2, y2) {

	var A = x - x1;
	var B = y - y1;
	var C = x2 - x1;
	var D = y2 - y1;

	var dot = A * C + B * D;
	var len_sq = C * C + D * D;
	var param = -1;
	if (len_sq != 0) //in case of 0 length line
		param = dot / len_sq;

	var xx, yy;

	if (param < 0) {
		xx = x1;
		yy = y1;
	} else if (param > 1) {
		xx = x2;
		yy = y2;
	} else {
		xx = x1 + param * C;
		yy = y1 + param * D;
	}

	var dx = x - xx;
	var dy = y - yy;
	return Math.sqrt(dx * dx + dy * dy);
}