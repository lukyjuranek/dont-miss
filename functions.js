function spawn() {
	let x = getRndIntBtwnTwoRanges(spawnRange[0], spawnRange[1], width - spawnRange[1], width);
	let y = getRndIntBtwnTwoRanges(spawnRange[0], spawnRange[1], height - spawnRange[1], height);
	let enemy = new Enemy(x, y);
	spawns.push([x, y]);
	// console.log(x+" "+y);
	enemies.push(enemy);
}

function getRndInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRndIntBtwnTwoRanges(min1, max1, min2, max2) {
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
	rect(spawnRange[0], spawnRange[0], spawnRange[1], spawnRange[1]);
	rect(width - spawnRange[1], spawnRange[0], spawnRange[1], spawnRange[1]);
	rect(width - spawnRange[1], height - spawnRange[1], spawnRange[1], spawnRange[1]);
	rect(spawnRange[0], height - spawnRange[1], spawnRange[1], spawnRange[1]);
}

function drawFrameRate(){
	fill(255);
	stroke(0);
	textSize(20);
	text(fps.toFixed(0), 30, 30);
}

function mousePressed() {
	if(game_state=="MENU"){
		menu_buttons.forEach(button=>{
			if(button.isMouseOnButton()){
				button.press()
			}
		});
	} else if(game_state=="GAME"){
		if (player.bullets > 0) {
			player.bullets -= 1;
			player.shoot();
		} else {
			empty.setVolume(0.3);
			empty.play();
		};
	} else if(game_state=="GAME_OVER"){
		game_over_buttons.forEach(button=>{
			if(button.isMouseOnButton()){
				button.press()
			}
		});
	}
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


const settings = {
	gunShotSound: true,
}