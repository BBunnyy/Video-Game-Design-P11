//Defined the default enemy behavior!
//Default enemy object is a skeleton that walks back and forth and bounces off walls.

class Enemy {
  xtra() {
    this.collide = true
    this.aniState = 0;
    this.lastAni = 0;
    this.aniCounter = 0;

    //animation details
    this.animations = [];
    this.aniDim = [];

    //push animations:
    this.animations.push(skeleWalkAni);
    this.animations.push(skeleFrozenAni);
  }

  constructor(y, x) {
    //defines coordinates in the block grid
    this.xGrid = x;
    this.yGrid = y;

    //defines the size of the object
    this.height = gridSize;
    this.width = gridSize / 2;

    //defines the speed and direction of the object
    this.speed = random(.5,2.5);
    var ranDir = floor(random(0,2))
    this.dir = "Right";
    if (ranDir == 0) {
      this.dir = "Left";
    }
    this.health = 1
    this.above = true
    this.toRemove = false

    //defines physics for the objects
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.lastPos = new p5.Vector(x * gridSize, y * gridSize);
    this.jump = 2;
    this.jumpStr = new p5.Vector(0, -7);

    //extra things to initialize (mainly for child classes)
    this.xtra();
  }

  //draw animated objects:
  draw() {
    //shift to object origins
    push();
    translate(this.pos.x, this.pos.y);
    if (this.speed < 1.5)
      tint(color('peru'))

    //flip depending on which way the skelton is facing
    //if walking, animation state is 0
    if (this.vel.x > 0) {
      this.aniState = 0;
    } else if (this.vel.x < 0) {
      this.aniState = 0;
      scale(-1, 1); //flip to face left
    } else {
      //if not walking, they are a still image
      this.aniState = 1;
    }

    //loop each animation, with 5 seconds per frame
    if (this.aniState < this.animations.length) {
      if (frameCount > this.lastAni + 5) {
        this.aniCounter++;
        this.lastAni = frameCount;
      }

      //reset animation counter to 0 if > max frames
      if (this.aniCounter >= this.animations[this.aniState].length) {
        this.aniCounter = 0;
      }

      //draw the image of the frame
      image(
        this.animations[this.aniState][this.aniCounter],
        -75,
        -75,
        150,
        150
      );
    } else {
      //if a non-defined animation state, show a green box where enemies belong
      fill(0, 255, 0);
      rect(-this.width / 2, -this.height / 2, this.width, this.height);
    }
    pop();
  }
  
  hurt(dmg) {
    this.health -= dmg
    this.toRemove = true
  }
  
  attack() {
    
  }

  move() {
    //if player is nearby, turn towards the player:
    if (dist(gameEnv.player.pos.x, 0, this.pos.x, 0) < 70 && 
        dist(gameEnv.player.pos.x, 0, this.pos.x, 0) > 50 &&
        this.pos.y - gameEnv.player.pos.y < 75 && 
        this.pos.y - gameEnv.player.pos.y > -25 ) {
      if (gameEnv.player.pos.x < this.pos.x) {
        this.dir = "Left";
      }
      else {
        this.dir = "Right";
      }
    }
    
    //set velocity depending on which way the skeleton is facing:
    if (this.dir == "Right") {
      this.vel.x = this.speed;
    } else if (this.dir == "Left") {
      this.vel.x = -this.speed;
    }

    //mark the last position before changing position
    this.lastPos = this.pos.copy();

    //if in the air, it is affected by gravity
    if (this.jump == 2) {
      this.acc.set(gameEnv.gravity);
    }
    else if (this.jump == 1) {
      this.jump = 2
      this.acc.add(this.jumpStr)
    }

    //calculate new velocity and position
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    //set location in block grid based upon new position
    this.xGrid = round(this.pos.x / gridSize);
    this.yGrid = round(this.pos.y / gridSize);
  }

  //check for collisions
  collision() {
    //initialize a variable to check if standing on a platform
    var onPlatform = false;

    //initialize an array of blocks to check for collision (makes it so only neighboring blocks are checked (max 9))
    var checkBoxes = [];

    //add  blockss to check for collision
    for (var y = -1; y <= 1; y++) {
      for (var x = -1; x <= 1; x++) {
        checkBoxes.push(new p5.Vector(this.xGrid + x, this.yGrid + y));
      }
    }

    //check found boxes for collision
    for (var i = 0; i < checkBoxes.length; i++) {
      var pX = checkBoxes[i].x;
      var pY = checkBoxes[i].y;
      if (
        pX >= 0 &&
        pX < gameEnv.blocks[0].length &&
        pY >= 0 &&
        pY < gameEnv.blocks.length &&
        (gameEnv.blocks[pY][pX].blockType != "NULL")
      ) { //if the block is not NULL (i.e. a valid block to collide with)
        if ( //if square hitboxes overlap
          dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <
            (this.width + gridSize) / 2 &&
          dist(this.pos.y, 0, gameEnv.blocks[pY][pX].y, 0) <
            (this.height + gridSize) / 2
        ) {
          if (
            this.lastPos.y <=
              gameEnv.blocks[pY][pX].y - (this.height + gridSize) / 2 &&
            dist(this.pos.y, 0, gameEnv.blocks[pY][pX].y, 0) <
              (this.height + gridSize) / 2
          ) { //if was above collided block last frame (landed on top of block)
            //set standing on block 
            this.acc.y = 0;
            this.vel.y = 0;
            this.pos.y =
              gameEnv.blocks[pY][pX].y - (this.height + gridSize) / 2;
            this.jump = 0;
            this.startLand = 1;
          }
          else if (
            this.lastPos.x > gameEnv.blocks[pY][pX].x &&
            -(this.lastPos.x + this.width) +
              (gameEnv.blocks[pY][pX].x + gridSize) <=
              gameEnv.blocks[pY][pX].y +
                gridSize -
                (this.lastPos.y + this.height)
          ) {//if colliding on RIGHT side of block
            //move to right edge of block (0 out x velocity and acceleration)
            this.acc.x = 0;
            this.pos.x = gameEnv.blocks[pY][pX].x + (this.width + gridSize) / 2;
            //change direction if colliding with wall to walk away
            if (dist(gameEnv.player.pos.x, 0, this.pos.x, 0) < 70 && 
                this.pos.y - gameEnv.player.pos.y < 75 && 
                this.pos.y - gameEnv.player.pos.y > 0 &&
               this.jump == 0) {
              this.jump = 1
            }
            else if (this.jump == 0 && this.dir == "Left") {
              this.dir = "Right";
            }
          }
          else if (
            this.lastPos.x < gameEnv.blocks[pY][pX].x &&
            this.lastPos.x +
              this.width -
              (gameEnv.blocks[pY][pX].x + gridSize) <=
              gameEnv.blocks[pY][pX].y +
                gridSize -
                (this.lastPos.y + this.height)
          ) {//if colliding on LEFT side of block
            //move to right edge of block (0 out x velocity and acceleration)
            this.acc.x = 0;
            this.pos.x = gameEnv.blocks[pY][pX].x - (this.width + gridSize) / 2;
            if (dist(gameEnv.player.pos.x, 0, this.pos.x, 0) < 70 && 
                this.pos.y - gameEnv.player.pos.y < 75 && 
                this.pos.y - gameEnv.player.pos.y > 0 &&
               this.jump == 0) {
              this.jump = 1
            }
            else if (this.jump == 0 && this.dir == "Right") {
              this.dir = "Left";
            }
          }
          else if (
            this.lastPos.y - this.height / 2 >
            gameEnv.blocks[pY][pX].y + gridSize / 2
          ) {//if colliding on the BOTTOM side of the block
            //move to bottom edge of block (0 out y velocity and acceleration)
            this.vel.y = 0;
            this.pos.y =
              gameEnv.blocks[pY][pX].y + (this.height + gridSize) / 2;
          }
        }

        //check if on a platform (Only for the 3 blocks spaces below the character)
        if (i >= 6) {
          if (dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <= (this.height+gridSize)/2) {
            onPlatform = true;
          }
        }
      }
    }

    //if not on a platform, fall
    if (onPlatform == false && this.jump == 0) {
      this.jump = 2;
      this.falling = 1;
    }

    //prevent from moving left or right out of the tile map!
    if (this.pos.x < this.width / 2 - gridSize / 2) {
      this.pos.x = this.width / 2 - gridSize / 2;
    }
    if (this.pos.x > gameEnv.mapWidth - this.width / 2 - gridSize / 2) {
      this.pos.x = gameEnv.mapWidth - this.width / 2 - gridSize / 2;
    }
  }
}
