var gameEnv
var click

function toCoords(gridVec) {
  var temp = gridVec.copy()
  temp = temp.mult(50)
  
  return temp
}

function preload() {
  PreloadBlocks();
  PreloadPlayer();
  PreloadEnemies();
  PreloadUI();
  GameFont = loadFont("Alkhemikal.ttf")
}

function setup() {
  createCanvas(gridSize*10, gridSize*10);
  gameEnv = new Game();
  
  for (var i = 0; i < ballIdle.length; i++) {
    ballIdleImg = ballIdle[i]
    // Load the pixels
    ballIdleImg.loadPixels();

    // Loop through the pixels X and Y
    for (let y = 0; y < ballIdleImg.height; y++) {
      for (let x = 0; x < ballIdleImg.width; x++) {

        // Calculate the pixel index
        const index = (y * ballIdleImg.width + x) * 4;

        // Get the red, green, and blue values
        const r = ballIdleImg.pixels[index + 0];
        const g = ballIdleImg.pixels[index + 1];
        const b = ballIdleImg.pixels[index + 2];

        // Invert the colors
        ballIdleImg.pixels[index + 0] = 255 - r;
        ballIdleImg.pixels[index + 1] = 255 - g;
        ballIdleImg.pixels[index + 2] = 255 - b;

      }
    }
    ballIdleImg.updatePixels();
    ballIdle[i] = ballIdleImg
  }  
  for (var i = 0; i < ballDie.length; i++) {
    ballDieImg = ballDie[i]
    // Load the pixels
    ballDieImg.loadPixels();

    // Loop through the pixels X and Y
    for (let y = 0; y < ballDieImg.height; y++) {
      for (let x = 0; x < ballDieImg.width; x++) {

        // Calculate the pixel index
        const index = (y * ballDieImg.width + x) * 4;

        // Get the red, green, and blue values
        const r = ballDieImg.pixels[index + 0];
        const g = ballDieImg.pixels[index + 1];
        const b = ballDieImg.pixels[index + 2];

        // Invert the colors
        ballDieImg.pixels[index + 0] = 255 - r;
        ballDieImg.pixels[index + 1] = 255 - g;
        ballDieImg.pixels[index + 2] = 255 - b;

      }
    }
    ballDieImg.updatePixels();
    ballDie[i] = ballDieImg
  }
}

function draw() {
  background(220);
  textFont(GameFont)
  
  push()
  translate(width/2,height/2)
  image(gameEnv.back, -444, -250, 888,500)
  pop()
  
  push()
  translate(gridSize/2, gridSize/2)
  gameEnv.run()
  pop()
  if (click == true) {
    fill(255,255,255,150)
    square(265,465,35)
    square(265+35,465,35)
  }
}