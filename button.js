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
        textSize(32);
        rectMode(CENTER);
        
        if(this.isMouseOnButton()){
            fill(0, 255, 200);
            rect(this.x, this.y, this.width, this.height);

            fill(255);
            text(this.text, this.x, this.y);
        } else {
            fill(0, 255, 0);
            rect(this.x, this.y, this.width, this.height);

            fill(255);
            text(this.text, this.x, this.y);
        }
    }
    press(){
        game_state=this.newstate;
    }
    isMouseOnButton(){
        return mouseX>this.x-this.width/2 && mouseX<this.x+this.width/2 && mouseY>this.y-this.height/2 && mouseY<this.y+this.height/2;
    }
}