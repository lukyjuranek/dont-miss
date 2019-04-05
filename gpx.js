function drawTerrain(){
    let imgWidth = 300;
    let imgHeight = 300;
    image(terrain, 0, 0, imgWidth, imgHeight);
    for(i=0; i < height/imgHeight+1; i++){
        for(j=0; j < width/imgWidth+1; j++){
            image(terrain, j*imgWidth, i*imgHeight, imgWidth, imgHeight);  //100
        }
    }
    // console.log("showTerrain()");
}