var terrain, hat, gun, muzzleflash, bullet; 
var empty, shot;
var width, height, tmX, tmY;
let enemies = [];
let spawns = [];
var game_state = "MENU";
let spawnRange = [0, 180];

var menu_buttons = [];
var game_over_buttons = [];

let fps=0;
// TODO: 
// -buttons hover
// -edit revolver
// -shooting behind
// -find better terrain texture
// -multikill

// Not sure if done
// -add random spawn
// -ammo

function setup() {
	createCanvas(displayWidth, windowHeight);
	background(0);
	angleMode(DEGREES);
	imageMode(CENTER);
	
	setInterval(spawn, 500); // spawn enemy every x seconds	
	// checkboxAreas = createCheckbox('Visible spawn areas', false);
	// checkboxSpawns = createCheckbox('Visible spawns', false);
	menu_buttons[0] = new Button("Play", "GAME", width/2, 230, 200, 55);
	menu_buttons[1] = new Button("Settings", "SETTINGS", width/2, 330, 200, 55);
	menu_buttons[2] = new Button("About", "ABOUT", width/2, 430, 200, 55);

	game_over_buttons[0] = new Button("Retry", "GAME", width/2, 270, 280, 55);
	game_over_buttons[1] = new Button("Back to menu", "MENU", width/2, 390, 280, 55);
	// game_over_buttons[2] = new Button("About", "ABOUT", width/2, 400, 150, 50);

	setInterval(()=>{
		fps = frameRate();
	}, 500)

	textFont(PressStart2P);
}

function preload() {
	// GPX
	plank = loadImage('img/plank.png');
	terrain = loadImage('img/terrain.jpg');
	hat = loadImage('img/hat.png');
	gun = loadImage('img/gun.png');
	muzzleflash = loadImage('img/muzzleflash.png');
	bullet = loadImage('img/bullet.png');
	// Sounds
	empty = loadSound('sounds/empty.wav');
	shot = loadSound('sounds/shot.wav');
	reload = loadSound('sounds/reload.mp3');

	PressStart2P = loadFont('fonts/PressStart2P.ttf');
}

function draw_game() {
	background(0);
	drawTerrain();
	
	enemies.forEach(enemy => {
		enemy.move();
		enemy.draw();
	});
	
	player.control();
	player.draw();
	if(player.muzzleflashOn){
		player.drawMuzzleFlash();
	};


	// // Draw spawns
	// if(checkboxSpawns.checked()){
	// 	spawns.forEach(spawn => {
	// 		ellipse(spawn[0], spawn[1], 5, 5)
	// 	});
	// };
	// // Draw spawn areas
	// if(checkboxAreas.checked()){
	// 	drawSpawnAreas();
	// };

	drawCrosshairs();
	drawBullets();
	drawFrameRate();

	textSize(32);
	text(player.score, width-50, 40)

	if(player.bullets == 0){
		player.bullets = -1;
		setTimeout(()=>{player.bullets = 6}, 2000)
		if(settings.gunShotSound){
			reload.play();
		};
		console.log("reload");
	};

	// let rotation = atan2(mouseX - player.x, mouseY - player.y);
	// let a = sin(rotation)*1000;
	// let b = cos(rotation)*1000;
	// line(player.x, player.y, player.x + a, player.y + b);
	// console.log(pDistance(mouseX, mouseY, player.x, player.y, player.x + a, player.y + b));

}

function draw_menu(){
	background(0);	
	textAlign(CENTER, CENTER);
	textSize(50);
	fill(255);
	noStroke();
	text("Don't miss!!!", width/2, 100);
	
	menu_buttons.forEach(button => {
		button.draw();
	})

	drawCrosshairs();
}

function draw_game_over(){
	background(0);	
	textAlign(CENTER, CENTER);
	textSize(40);
	fill(255);
	noStroke();
	if(player.miss){
		text("You missed!!!", width/2, 50);
	} else {
		text("You died!!!", width/2, 50);
	}
	textSize(30);
	text("Your score is: " + player.score, width/2, 120);
	game_over_buttons.forEach(button => {
		button.draw();
	})
}

function draw(){
	if(game_state == "MENU"){
		draw_menu();
	} else if(game_state == "GAME"){
		draw_game();
	} else if(game_state == "GAME_OVER"){
		draw_game_over();
	} else if(game_state == "SETTINGS"){
		game_state = "MENU";
	} else if(game_state == "ABOUT"){
		game_state = "MENU";
	}
	else {
		debugger;
	}
}