class Wisp {
  constructor(y, x) {
    this.collide= true
    //positions in the block grid
    this.xGrid = x;
    this.yGrid = y;

    //set the dimensions of the object
    this.height = gridSize / 2;
    this.width = gridSize / 2;

    //player health
    this.health = 1;
    this.above = true
    this.dmg = 1;

    //set the speed and direction
    this.speed = 4;
    this.dir = "Right";
    this.active = 0;
    this.chasetime = 90;
    this.range = 200;
    this.toRemove = false;

    //initialize physics
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.dir = new p5.Vector(0, 0);
    this.dest = new p5.Vector(-1, -1);

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
    this.animations.push(wispSpawn);
    this.animations.push(wispIdle);
    this.animations.push(wispDie);
  }

  //draw the animated player object
  draw() {
    push();
    translate(this.pos.x, this.pos.y);

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
      image(this.animations[this.aniState][frame], -50, -50, 100, 100);
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
    if (this.spawning == false) {
      this.dying = true;
      this.health = 0
    }
  }

  //attacking!
  attack() {
    if (this.health > 0 &&
      dist(this.pos.x, this.pos.y, gameEnv.player.pos.x, gameEnv.player.pos.y) <
      25
    ) {
      gameEnv.player.hurt(this.dmg);
      this.dying = true;
    }
  }

  move() {
    if (
      dist(this.pos.x, this.pos.y, gameEnv.player.pos.x, gameEnv.player.pos.y) <
      this.range
    ) {
      if (this.active == 0) {
        this.active = this.chasetime; //follow for 1.5 seconds b4 dying
      }
    }
    if (this.active > 0 && this.spawning == false && this.dying == false) {
      this.active--;
      var lastDir = this.dir.copy();
      this.dest = gameEnv.player.pos.copy();
      this.dir.set(this.dest.x - this.pos.x, this.dest.y - this.pos.y);
      this.dir.normalize();
      this.dir.mult(0.1);
      lastDir.normalize();
      this.dir.add(lastDir);
      this.dir.normalize().mult(this.speed);
      this.pos.add(this.dir);

      this.dir.mult(100);
      stroke(color("red"));

      if (
        this.active <= 0 ||
        dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y) < 5
      )
        this.dying = true;
    }
  }

  collision() {}
}
