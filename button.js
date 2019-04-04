class Button {
    constructor(text, newstate, x, y, width, height) {
        this.text = text;
        this.newstate = newstate;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    draw(){
        textAlign(CENTER, CENTER);
        noStroke();
        textSize(20);
        rectMode(CENTER);
        fill(255);
        
        if(this.isMouseOnButton()){
            // fill(0, 255, 200);
            // rect(this.x, this.y, this.width, this.height);
            image(plank, this.x, this.y, this.width-this.x/100, this.height-this.y/100);
            textSize(19);
            text(this.text, this.x, this.y);
        } else {
            // fill(0, 255, 0);
            // rect(this.x, this.y, this.width, this.height);
            image(plank, this.x, this.y, this.width, this.height);
            text(this.text, this.x, this.y);
        }
    }
    press(){
        game_state=this.newstate;
        if(this.newstate == "GAME") {
            enemies = [];
            player.x = width / 2;
	        player.y = height / 2;
            player.speed = 1;
            player.bullets = 6;
            player.score = 0;
            player.muzzleflashOn = false;
            player.miss = false;
        }
    }
    isMouseOnButton(){
        return mouseX>this.x-this.width/2 && mouseX<this.x+this.width/2 && mouseY>this.y-this.height/2 && mouseY<this.y+this.height/2;
    }
}