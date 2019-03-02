function drawTerrain(){
    image(terrain, 0, 0, 100, 100);
    for(i=0; i < height/100+1; i++){
        for(j=0; j < width/100+1; j++){
            image(terrain, j*100, i*100, 100, 100);
        }
    }
    // console.log("showTerrain()");
}