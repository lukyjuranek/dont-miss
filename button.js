class Button {
    constructor(text, newstate, x, y, width, height, onPress) {
        this.text = text;
        this.newstate = newstate;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onPress = onPress;
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
        game_state = this.newstate;
        try{
            this.onPress();
        } catch(err) {
            // console.warn(this.text + " button doesn't have callback")
            console.warn(err.message);
        }
        refreshHighScore();
    }
    isMouseOnButton(){
        return mouseX>this.x-this.width/2 && mouseX<this.x+this.width/2 && mouseY>this.y-this.height/2 && mouseY<this.y+this.height/2;
    }
}



class imgButton {
    constructor(imgName, x, y, width, height, onPress) {
        this.imgName = imgName;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.onPress = onPress;
    }
    draw(){
        // textAlign(CENTER, CENTER);
        // noStroke();
        // textSize(20);
        imageMode(CENTER);
        // fill(255);
        
        if(this.isMouseOnButton()){
            image(this.imgName, this.x, this.y, this.width-5, this.height-5);
        } else {
            image(this.imgName, this.x, this.y, this.width, this.height);
        }
    }
    press(){
        try{
            this.onPress();
        } catch(err) {
            // console.warn(this.text + " button doesn't have callback")
            console.warn(err.message);
        };
        refreshHighScore();
    }
    isMouseOnButton(){
        return mouseX>this.x-this.width/2 && mouseX<this.x+this.width/2 && mouseY>this.y-this.height/2 && mouseY<this.y+this.height/2;
    }
}