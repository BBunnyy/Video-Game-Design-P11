class Worm {
  constructor(y, x, type) {
    this.collide = true
    //positions in the block grid
    this.xGrid = x;
    this.yGrid = y + 1;

    //set the dimensions of the object
    this.height = gridSize;
    this.width = gridSize;

    //health
    this.health = 3;
    this.hit = 0;
    this.above = false;
    this.toRemove = false;
    this.immuneDuration = 60;
    this.lastHit = this.immuneDuration;

    //set the speed and direction
    this.speed = 4;
    this.leftBlock = false;
    this.leftBlock = false;
    this.moveLen = 51;
    this.dig = 25;
    this.respawnLocations = [
      createVector(111, 3),
      createVector(112, 3),
      createVector(113, 3),
      createVector(114, 3),
      createVector(115, 3),
      createVector(116, 3),
      createVector(117, 3),
      createVector(110, 6),
      createVector(111, 6),
      createVector(112, 6),
      createVector(113, 6),
      createVector(114, 6),
      createVector(115, 6),
      createVector(109, 9),
      createVector(110, 9),
      createVector(111, 9),
      createVector(112, 9),
      createVector(113, 9),
      createVector(114, 9),
      createVector(115, 9),
      createVector(116, 9),
    ];

    //initialize physics
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.pos = new p5.Vector(x * gridSize, (y+1) * gridSize);
    this.lastPos = this.pos.copy();
    this.dir = "Up"
    this.dest = new p5.Vector(-1, -1);

    //attacking variables
    this.attacking = false;
    this.hold = 0;
    this.type = type

    this.boss = false;
    this.setPositions = [new p5.Vector(x, y)];
    this.setWalls = [];

    //initialize animation variables
    this.aniState = -1;
    this.animations = [];
    this.aniTime = 0;
    this.aniLength = 0;
    this.loopAni = true;

    //animation triggers
    this.spawning = true;
    this.dying = false;

    //push individual animations to the animation array
    this.animations.push(wormSpawn);
    this.animations.push(wormFrozen);
    this.animations.push(wormDie);
  }

  //draw the animated player object
  draw() {
    this.lastHit++;
    push();
    translate(this.pos.x, this.pos.y);
    
    if (this.lastHit < this.immuneDuration && this.lastHit % 10 > 5) {
      tint(255, 0, 0);
    } else if (this.type == "Hot") {
      tint(color("lightcoral"));
    }else if (this.type == "Cold") {
      tint(0, 150, 250);
    } else {
      tint(color('indigo'));
    }

    if (this.dir == "Left") {
      scale(-1, 1);
    }

    //SPAWN
    if (this.spawning == true) {
      if (this.aniState != 0) {
        this.aniState = 0;
        this.aniTime = 0;
        this.aniLength = (this.animations[this.aniState].length - 1) * 5;
      }
    }
    //DIE
    else if (this.dying == true) {
      if (this.aniState != 2) {
        this.aniState = 2;
        this.aniTime = 0;
        this.aniLength = (this.animations[this.aniState].length - 1) * 5;
      }
    } else {
      if (this.aniState != 1) {
        this.aniState = 1;
        this.aniTime = 0;
        this.aniLength = (this.animations[this.aniState].length - 1) * 5;
      }
    }

    if (this.aniTime < this.aniLength) {
      this.aniTime++;
      var frame =
        floor(this.aniTime / 5) % this.animations[this.aniState].length;
      image(this.animations[this.aniState][frame], -45, -35, 90, 90);
    }
    if (this.aniTime == this.aniLength) {
      if (this.dying == true) {
        this.toRemove = true;
      }
      this.aniState = -1;
      this.spawning = false;
    }

    pop();
  }

  //change the position of the character
  setPos(x, y) {}

  hurt(dmg) {
    this.collide= false
    if (
      this.lastHit >= this.immuneDuration &&
      this.spawning == false &&
      this.dying == false
    ) {
      this.health -= dmg;
      this.lastHit = 0;
      if (this.health <= 0) {
        this.dying = true;
      }
      if (this.boss == true) {
        this.dir = "Down";
        this.above = false
        this.moveLen = 1000;
        this.dig = 25;
      }
    }
  }

  //attacking!
  attack() {
    if (this.moveLen%60 == 0 && this.moveLen !=0 && this.dir == "None") {
      if (this.boss == false && dist(this.pos.x, this.pos.y, gameEnv.player.pos.x, gameEnv.player.pos.y) < 200) 
      gameEnv.enemies.push(new WormBall(this.pos.y/50, this.pos.x/50, this.type))
      else if (this.boss == true) {
        gameEnv.enemies.push(new WormBall(this.pos.y/50, this.pos.x/50, this.type))
      }
    }
  }

  move() {
    if (this.moveLen <= 0) {
      //pick a new movement
      var ranDir = floor(random(0, 4));
      if (ranDir == 0) {
        this.dir = "Left";
        this.moveLen = 120;
      } else if (ranDir == 1) {
        this.dir = "Right";
        this.moveLen = 120;
      } else {
        this.dir = "None";
      }
      this.moveLen = 60;
    } else {
      this.moveLen--;
    }

    if (this.leftBlock == false && this.dir == "Left") {
      this.dir = "Right";
    }
    if (this.rightBlock == false && this.dir == "Right") {
      this.dir = "Left";
    }

    this.lastPos = this.pos;
    if (this.dir == "Right") {
      this.vel.set(2, 0);
    } else if (this.dir == "Left") {
      this.vel.set(-2, 0);
    } else if (this.dir == "Down") {
      this.vel.set(0, 2);
      this.dig--;
      if (this.dig <= 0) {
        this.dir = "Up";
        this.moveLen = 1000;
        this.dig = 25;
      }
    } else if (this.dir == "Up" && this.health > 0) {
      if (this.dig == 25) {
        var lastGridY = this.yGrid
        if (this.boss == true) {
          var randPos = createVector(-1,-1)
          do {
            var randNum = floor(random(0,this.respawnLocations.length))
            randPos = this.respawnLocations[randNum].copy()
            this.pos = randPos.copy()
            this.pos.mult(50)
          } while (randPos.y == lastGridY || randPos.y == gameEnv.player.yGrid+1)
        }
      }
      this.vel.set(0, -2);
      this.dig--;
      if (this.dig <= 0) {
        this.moveLen = 0;
        this.collide = true
        this.above = true
        this.dir = "None";
      }
    } else {
      this.vel.set(0, 0);
    }

      if (this.health == 0 || this.spawning == true || this.death == true) {
        this.vel.x = 0;
      }
    this.pos.add(this.vel);

    //recalculate block grid position
    this.xGrid = round(this.pos.x / gridSize);
    this.yGrid = round(this.pos.y / gridSize);
  }

  collision() {
    if (this.dig == 0) {
      //initialize mark if on a platform
      var onPlatform = false;

      //initialize b
      var checkBoxes = [];

      for (var y = -1; y <= 1; y++) {
        for (var x = -1; x <= 1; x++) {
          checkBoxes.push(new p5.Vector(this.xGrid + x, this.yGrid + y));
        }
      }

      this.leftBlock = false;
      this.rightBlock = false;
      for (var i = 0; i < checkBoxes.length; i++) {
        var pX = checkBoxes[i].x;
        var pY = checkBoxes[i].y;
        if (
          (pX >= 0 &&
            pX < gameEnv.blocks[0].length &&
            pY >= 0 &&
            pY < gameEnv.blocks.length &&
            gameEnv.blocks[pY][pX].blockType == "SOLID") ||
          gameEnv.blocks[pY][pX].blockType == "INVIS"
        ) {
          if (
            dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <
              (this.width + gridSize) / 2 &&
            dist(this.pos.y, 0, gameEnv.blocks[pY][pX].y, 0) <
              (this.height + gridSize) / 2
          ) {
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
              this.startLand = 1;
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
              this.acc.x = 0;
              this.pos.x =
                gameEnv.blocks[pY][pX].x + (this.width + gridSize) / 2;
              this.dir = "Right";
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
              this.acc.x = 0;
              this.pos.x =
                gameEnv.blocks[pY][pX].x - (this.width + gridSize) / 2;
              this.dir = "Left";
            }
          }

          if (i >= 6) {
            if (dist(this.pos.x, 0, gameEnv.blocks[pY][pX].x, 0) <= 34) {
              onPlatform = true;
            }

            if (this.pos.x - gameEnv.blocks[pY][pX].x > 0) {
              this.leftBlock = true;
            }
            if (gameEnv.blocks[pY][pX].x - this.pos.x > 0) {
              this.rightBlock = true;
            }
          }
        }
      }

      if (onPlatform == false && this.jump == 0) {
        //print("FALL");
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
}
