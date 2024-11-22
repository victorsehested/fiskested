/*

let img; 
let imgSize; 
let growthRate = 10; 
let targetWidth, targetHeight;


function preload () {
 img = loadImage('fisk1.png');
}  


function setup() {
  createCanvas(windowWidth, windowHeight); 


    let aspectRatio = img.height / img.width; 
    imgSize = { width: 150, height: 150 * aspectRatio };

    targetWidth = img.width*2; 
    targetHeight = img.height*2; 


 
}


function draw() {
  background('black'); 
  
  let imgX = width/2 - imgSize.width/2; 
  let imgY = height/2 - imgSizeHeight/2;
  image(img, imgX, imgY, imgSize.width, imgSize.height);



  // draw circle 
  stroke(255,70,162);
  noFill();
  circle(mouseX, mouseY, 25);


  if (
    mouseX > imgX && mouseX < imgSize.width && 
    mouseY > imgY && mouseY < imgSize.height 
  ){
    if (imgSize.width < targetWidth) {
        imgSize.width += growthRate;
        imgSize.height += growthRate * (img.height / img.width);     
    }
    
  }

}

*/