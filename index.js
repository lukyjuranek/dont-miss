
function setup() {
	createCanvas(displayWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	imageMode(CENTER);
	frameRate(60);
	textFont(PressStart2P);
	
	noSmooth();

	// checkboxAreas = createCheckbox('Visible spawn areas', false);
	// checkboxSpawns = createCheckbox('Visible spawns', false);
	
	initButtons();
	

	setInterval(() => {
		fps = frameRate();
		refreshHighScore();
	}, 500)


}

function preload() {
	// GPX
	plank = loadImage('img/plank.png');
	fullscreen = loadImage('img/fullscreen.png');
	logo = loadImage('img/logo.png');
	terrain = loadImage('img/beachsand.jpg');
	enemyHat = loadImage('img/enemy-hat.png');
	hat = loadImage('img/hat.png');
	gun = loadImage('img/gun.png');
	muzzleflash = loadImage('img/muzzleflash.png');
	bullet = loadImage('img/bullet.png');

	speedup = loadImage('img/speedup.png')
	// Sounds
	empty = loadSound('sounds/empty.wav');
	shot = loadSound('sounds/shot.wav');
	reload = loadSound('sounds/reload.wav');
	powerup = loadSound('sounds/powerup.wav');
	powerupoff = loadSound('sounds/powerupoff.wav');
	// Fonts
	PressStart2P = loadFont('fonts/PressStart2P.ttf');
	// Check mobile device
	if(window.mobilecheck()){
		settings.mobile = true
		settings.textSize = 0.8;
		settings.buttonSize = 0.7;
	};
}

function draw_game() {
	background(0);
	drawTerrain();

	enemies.forEach(enemy => {
		enemy.move();
		enemy.draw();
		enemy.checkPlayerDist();
	});
	
	powerups.forEach(powerup => {
		powerup.draw();
	});

	objects.forEach(object => {
		object.draw();
	});

	player.control();
	player.draw();

	// Draw spawns
	// if (true) {
	// 	spawns.forEach(spawn => {
	// 		stroke(255,0,0);
	// 		fill(255,0,0);
	// 		console.log("draw");
	// 		ellipse(spawn[0], spawn[1], 5, 5)
	// 	});
	// };
	// Draw spawn areas
	// if (checkboxAreas.checked()) {
	// 	drawSpawnAreas();
	// };

	if(!settings.mobile){
		drawCrosshairs();
	};
	drawBullets();

	if(settings.showFPS){
		drawFrameRate();
	}

	stroke(0);
	fill(255);
	if(settings.gameMode == "CLASSIC"){
		textSize(settings.textSize*32);
		text(player.score.classic, width - 50, 40)
	} else if(settings.gameMode == "SPEEDY"){
		textSize(settings.textSize*32);
		text(player.score.speedy, width - 50, 40)
	};

	if (player.bullets == 0) {
		player.reload();
	};
}

function draw_menu() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(settings.textSize*50);
	fill(255);
	noStroke();
	text("Don't miss!!!", width / 2, 1*(height/6));

	textSize(settings.textSize*19);
	text("Game mode:", 1.3*(width/6), 2.5*(height/6));

	// Tutorial
	noStroke();
	fill(255);
	
	// Highscores
	textSize(settings.textSize*19);
	text("Highscores:", 4.7*(width/6), 2.5*(height/6) )
	textSize(settings.textSize*12);
	text("CLASSIC - " + player.high_score.classic, 4.7*(width/6), 3*(height/6));
	text("SPEEDY - " + player.high_score.speedy, 4.7*(width/6), 3.3*(height/6));

	UI.buttons.menu.forEach(button => {
		button.draw();
	});

	if(!settings.mobile){
		drawCrosshairs();
	};
}

function draw_settings() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(settings.textSize*40);
	fill(255);
	noStroke();
	text("Settings", width / 2, 1*(height/6));

	UI.buttons.settings.forEach(button => {
		button.draw();
	});

	if(!settings.mobile){
		drawCrosshairs();
	};
}

function draw_game_over() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(settings.textSize*40);
	fill(255);
	noStroke();
	if (player.miss) {
		text("You missed!!!", width / 2, 1*(height/6));
	} else {
		text("You died!!!", width / 2, 1*(height/6));
	};

	if(settings.gameMode == "CLASSIC"){
		textSize(settings.textSize*22);
		text("Score: " + player.score.classic, width / 2, 2*(height/6));
		textSize(settings.textSize*12);
		text("High score: " + player.high_score.classic, width / 2, 2.7*(height/6));
		text("Game mode: " + settings.gameMode, width / 2, 3*(height/6));
	} else if(settings.gameMode == "SPEEDY"){
		textSize(settings.textSize*22);
		text("Score: " + player.score.speedy, width / 2, 2*(height/6));
		textSize(settings.textSize*12);
		text("High score: " + player.high_score.speedy, width / 2, 2.7*(height/6));
		text("Game mode: " + settings.gameMode, width / 2, 3*(height/6));
	};
	UI.buttons.game_over.forEach(button => {
		button.draw();
	})
}

function draw_about() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(settings.textSize*40);
	fill(255);
	noStroke();
	text("About", width / 2, 1*(height/6));

	textSize(settings.textSize*20);
	text("Created by Lukáš Juránek", width / 2, 2.2*(height/6));
	text("github.com/lukyjuranek", width / 2, 3.2*(height/6));
	text("Tools/libraries: p5.js, Krita, Audacity", width / 2, 3.7*(height/6));

	UI.buttons.about.forEach(button => {
		button.draw();
	});

	if(!settings.mobile){
		drawCrosshairs();
	};
}

function draw_tutorial() {
	background(0);
	textAlign(CENTER, CENTER);
	textSize(settings.textSize*40);
	fill(255);
	noStroke();
	text("Tutorial", width / 2, 1*(height/6));

	textSize(settings.textSize*20);
	text("GOALS:", 2*(width/6), 2.4*(height/6) - 40);
	text("- Kill enemies", 2*(width/6), 3.2*(height/6) - 40);
	text("- Don't die!!!", 2*(width/6), 3.6*(height/6) - 40);
	text("- Don't miss!!!", 2*(width/6), 4*(height/6) - 40);

	text("CONTROLS:", width-2*(width/6), 2.4*(height/6) - 40);
	text("WASD - move", width-2*(width/6), 3.2*(height/6) - 40);
	text("Mouse - aim", width-2*(width/6), 3.6*(height/6) - 40);
	text("LMB - shoot", width-2*(width/6), 4*(height/6) - 40);
	text("R - reload", width-2*(width/6), 4.4*(height/6) - 40);
	// Highscores

	UI.buttons.about.forEach(button => {
		button.draw();
	});

	if(!settings.mobile){
		drawCrosshairs();
	};
}

function draw() {
	// var t0 = performance.now();
	if (game_state == "MENU") {
		draw_menu();
	} else if (game_state == "GAME") {
		draw_game();
	} else if (game_state == "GAME_OVER") {
		draw_game_over();
	} else if (game_state == "TUTORIAL") {
		draw_tutorial();
	} else if (game_state == "SETTINGS") {
		draw_settings();
	} else if (game_state == "ABOUT") {
		draw_about();
	} else {
		debugger;
	}


	// var t1 = performance.now();
	// console.log((t1 - t0));
}