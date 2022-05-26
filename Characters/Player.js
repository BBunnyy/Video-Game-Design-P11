//Default class for the player object
//This is what is controlled by the player to move, attack and jump

class Player {
  constructor(y, x) {
    //positions in the block grid
    this.xGrid = x;
    this.yGrid = y;

    //set the dimensions of the object
    this.height = gridSize;
    this.width = gridSize / 2;
    
    //player health
    this.slowTime = 0
    this.groundTime = 0
    this.health = 6
    this.hit = 0
    this.recover = 0

    //set the speed and direction  faced of the player
    this.speed = 4;
    this.dir = "Right";

    //initialize physics
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.lastPos = new p5.Vector(x * gridSize, y * gridSize);
    this.jump = 2;
    this.jumpStr = new p5.Vector(0, -11);

    //an attack
    this.attacking = false
    this.dmg = 1
    
    //initialize animation variables
    this.aniState = -1;
    this.animations = [];
    this.aniTime = 0;
    this.aniLength = 0;
    this.loopAni = true
    
    //push individual animations to the animation array
    this.animations.push(idleAni);
    this.animations.push(walkAni);
    this.animations.push(jumpAni);
    this.animations.push(fallAni);
    this.animations.push(attkAni);
  }

  //draw the animated player object
  draw() {
    push()
    translate(this.pos.x, this.pos.y);
    
    if (this.recover > 0 && this.recover % 30 > 15) {
      tint(255,180,180)
    }
    else if (this.slowTime > 0) {
      tint(color("lightskyblue"))
    }
    
    if (this.groundTime > 0) {
      push()
      rotate(PI*this.groundTime/20)
      fill(color("purple"))
      arc(0,15,35,15,0,PI)
      pop()
    }
    
    if (this.dir == "Left") {
      scale(-1,1)
    }
    
    //ATTACK
    if(this.attacking == true) {
      if (this.aniState != 4){
        this.aniState = 4
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    //JUMP
    else if(this.jump == 2  && this.vel.y < 0) {
      scale(1,0.5)
      if (this.aniState != 2){
        this.aniState = 2
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    else if(this.jump == 2) {
      scale(1,0.5)
      if (this.aniState != 3){
        this.aniState = 3
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    //RUN
    else if(this.vel.x != 0 && this.jump == 0) {
      if (this.aniState != 1){
        this.aniState = 1
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    //IDLE
    else if(this.vel.x == 0 && this.vel.y == 0 && this.jump == 0) {
      if (this.aniState != 0){
        this.aniState = 0
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    
    if (this.aniTime < this.aniLength) {
      this.aniTime++
      var frame = floor(this.aniTime/5)%this.animations[this.aniState].length
      image(this.animations[this.aniState][frame],-50,-50,100,100)
    }
    if (this.aniTime == this.aniLength) {
      this.aniState = -1
      this.attacking = false
    }
    
    pop();
  }
  
  //change the position of the character
  setPos(x, y) {
    this.xGrid = x;
    this.yGrid = y;
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
  }
  
  
  hurt(dmg) {   
    if (this.recover == 0) {     
      if (gameEnv.INF == false) {
        this.health -= dmg
      }

      this.recover = 120
    }  
  }
  
  //attacking!
  attack() {
    if (this.attacking == true) {
      var ohk = 1
      if (gameEnv.OHK == true)
          ohk = 10000
      
      for (var i = 0; i < gameEnv.enemies.length; i++) {
        if (abs(gameEnv.enemies[i].pos.y - this.pos.y) < (this.height + gameEnv.enemies[i].height) / 2){
          //check if you hit any of the enemies while facing right(enemy is closer than 50 pixels and on the right)
          if (this.dir == "Right" && gameEnv.enemies[i].pos.x > this.pos.x && gameEnv.enemies[i].pos.x - this.pos.x < 45 + gameEnv.enemies[i].width/ 2){
            gameEnv.enemies[i].hurt(this.dmg*ohk)
          }
          //check if you hit any of the enemies while facing right(enemy is closer than 50 pixels and on the right)
          if (this.dir == "Left" && gameEnv.enemies[i].pos.x < this.pos.x && this.pos.x - gameEnv.enemies[i].pos.x < 45 + gameEnv.enemies[i].width/ 2){
            gameEnv.enemies[i].hurt(this.dmg*ohk)
          }
        }
      }
    }
  }
  
  move() {
    
    //mark the last position!
    this.lastPos = this.pos.copy();

    if (this.groundTime > 0) {
      this.groundTime--
      this.jumpStr.set(0,-7)
    }
    else {
      this.jumpStr.set(0,-11)
    }
    //if jumping, apply jump force
    if (this.jump == 1) {
      this.acc.set(this.jumpStr);
      this.jump = 2;
    }
    //if falling, apply gravity
    else if (this.jump == 2) {
      this.acc.set(gameEnv.gravity);
    }

    //calculate new velocity and position
    this.vel.add(this.acc);
    
    
    if (this.slowTime > 0) {
      this.slowTime--
      this.pos.x -= this.vel.x/2 
    }
    if (gameEnv.SS == true)
      this.pos.x += this.vel.x 
    this.pos.add(this.vel);

    //recalculate block grid position
    this.xGrid = round(this.pos.x / gridSize);
    this.yGrid = round(this.pos.y / gridSize);

    //face the direction traveling
    if (this.vel.x > 0) {
      this.dir = "Right";
    } else if (this.vel.x < 0) {
      this.dir = "Left";
    }
  }

  
  collision() {
    //collision with enemy is possible, but causes injury
    for (var e = 0; e < gameEnv.enemies.length; e++) {
      if (dist(this.pos.x, 0, gameEnv.enemies[e].pos.x, 0) < (this.width + gameEnv.enemies[e].width)/2 && dist(this.pos.y, 0, gameEnv.enemies[e].pos.y, 0) < (this.height + gameEnv.enemies[e].height)/2) {

        if (gameEnv.enemies[e].collide == true &&  gameEnv.enemies[e].health > 0) {
          this.hurt(1)
        }
      }
    }
    
    if (this.recover > 0) {
      this.recover--
    }
    
    
    //initialize mark if on a platform
    var onPlatform = false;
    
    //initialize b
    var checkBoxes = [];

    for (var y = -1; y <= 1; y++) {
      for (var x = -1; x <= 1; x++) {
        checkBoxes.push(new p5.Vector(this.xGrid + x, this.yGrid + y));
      }
    }

    for (var i = 0; i < checkBoxes.length; i++) {
      var pX = checkBoxes[i].x;
      var pY = checkBoxes[i].y;
      if (
        pX >= 0 &&
        pX < gameEnv.blocks[0].length &&
        pY >= 0 &&
        pY < gameEnv.blocks.length &&
              gameEnv.blocks[pY][pX].blockType == "SOLID" ||
              gameEnv.blocks[pY][pX].blockType == "INVIS"
      ) {

        if (
          dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <
            (this.width + gridSize) / 2 &&
          dist(this.pos.y, 0, gameEnv.blocks[pY][pX].y, 0) <
            (this.height + gridSize) / 2
        ) {
          // print("Collision!")
          //if was above block
          if (
            this.lastPos.y <=
              gameEnv.blocks[pY][pX].y - (this.height + gridSize) / 2 &&
            dist(this.pos.y, 0, gameEnv.blocks[pY][pX].y, 0) <
              (this.height + gridSize) / 2
          ) {
            //set standing on block
            //print("TOP");
            this.acc.y = 0;
            this.vel.y = 0;
            this.pos.y =
              gameEnv.blocks[pY][pX].y - (this.height + gridSize) / 2;
            this.jump = 0;
            this.startLand = 1
          }
          else if (this.lastPos.x < gameEnv.blocks[pY][pX].x + (this.width+gridSize)/2 && 
                  this.lastPos.x > gameEnv.blocks[pY][pX].x - (this.width+gridSize)/2 &&
                  this.lastPos.y > gameEnv.blocks[pY][pX].y) {
            //print("BOTTOM");
            this.vel.y = 0;
            this.pos.y =
              gameEnv.blocks[pY][pX].y + (this.height + gridSize) / 2;
          }
          //if colliding on RIGHT side of block
          else if (
            this.lastPos.x > gameEnv.blocks[pY][pX].x &&
            -(this.lastPos.x + this.width) +
              (gameEnv.blocks[pY][pX].x + gridSize) <=
              gameEnv.blocks[pY][pX].y +
                gridSize -
                (this.lastPos.y + this.height)
          ) {
            //set standing on block
            //print("RIGHT");
            this.acc.x = 0;
            this.pos.x = gameEnv.blocks[pY][pX].x + (this.width + gridSize) / 2 +2;
          }
          //if colliding on LEFT side of block
          else if (
            this.lastPos.x < gameEnv.blocks[pY][pX].x &&
            this.lastPos.x +
              this.width -
              (gameEnv.blocks[pY][pX].x + gridSize) <=
              gameEnv.blocks[pY][pX].y +
                gridSize -
                (this.lastPos.y + this.height)
          ) {
            //set standing on block
            //print("LEFT");
            this.acc.x = 0;
            this.pos.x = gameEnv.blocks[pY][pX].x - (this.width + gridSize) / 2;
          }
          //if colliding on the BOTTOM side of the block
          else if (
            this.lastPos.y - this.height / 2 >
            gameEnv.blocks[pY][pX].y + gridSize / 2
          ) {
            //print("BOTTOM");
            this.vel.y = 0;
            this.pos.y =
              gameEnv.blocks[pY][pX].y + (this.height + gridSize) / 2;
          }
        }

        if (i >= 6) {
          if (dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <= 34) {
            onPlatform = true;
          }
        }
      }
    }

    if (onPlatform == false && this.jump == 0) {
      //print("FALL");
      this.jump = 2;
      this.falling = 1;
    }
    
    if (this.pos.x < this.width/2-gridSize/2) {
      this.pos.x = this.width/2-gridSize/2
    }
    if (this.pos.x > gameEnv.mapWidth-this.width/2 - gridSize/2) {
      this.pos.x = gameEnv.mapWidth-this.width/2 - gridSize/2
    }
  }
}
