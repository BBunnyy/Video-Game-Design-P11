class WormBall {
  constructor(y, x, type) {
    this.type = type
    this.collide = false
    
    //positions in the block grid
    this.xGrid = x;
    this.yGrid = y;

    //set the dimensions of the object
    this.height = gridSize / 2;
    this.width = gridSize / 2;
    
    //player health
    this.health = 1
    this.above = true
    this.dmg = 1

    //set the speed and direction
    this.speed = 2;
    if (type == "Hot") {
      this.speed = 4
    }
    this.toRemove = false

    //initialize physics
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.dir = new p5.Vector(-1,-1)
    this.dest = new p5.Vector(-1,-1)
    
    //initialize animation variables
    this.aniState = -1;
    this.animations = [];
    this.aniTime = 0;
    this.aniLength = 0;
    this.loopAni = true
    
    //animation triggers
    this.spawning = false
    this.dying = false
    
    //push individual animations to the animation array
    this.animations.push(wispSpawn);
    this.animations.push(ballIdle);
    this.animations.push(ballDie);
  }

  //draw the animated player object
  draw() {    
    push()
    translate(this.pos.x, this.pos.y);
    rotate(this.dir.heading() - PI/2 - PI/12)
    
    if (this.type == "Hot") {
      tint(color("firebrick"));
    } else if (this.type == "Cold") {
      tint("lightcyan");
    } else {
      tint(color('indigo'));
    }
    
    //SPAWN
    if(this.spawning == true) {
      if (this.aniState != 0){
        this.aniState = 0
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    //DIE
    else if(this.dying == true) {
      if (this.aniState != 2){
        this.aniState = 2
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    else {
      if (this.aniState != 1){
        this.aniState = 1
        this.aniTime = 0
        this.aniLength = (this.animations[this.aniState].length-1)*5
      }
    }
    
    if (this.aniTime < this.aniLength) {
      this.aniTime++
      var frame = floor(this.aniTime/5)%this.animations[this.aniState].length
      image(this.animations[this.aniState][frame],-25,-25,50,50)
      rotate(PI/6)
      image(this.animations[this.aniState][frame],-25,-25,50,50)
    }
    if (this.aniTime == this.aniLength) {
      if (this.dying == true) {
        this.toRemove = true
      }
      this.aniState = -1
      this.spawning = false
    }
    
    pop();
  }
  
  //change the position of the character
  setPos(x, y) {
    
  }
  
  hurt(dmg) {
    if (this.spawning == false) {
      this.collide = false
      this.dying = true
      this.health = 0
    }
  }
  
  //attacking!
  attack() {
    if (this.health > 0 && dist(this.pos.x, this.pos.y, gameEnv.player.pos.x, gameEnv.player.pos.y) < 25) {
      if (this.type == "Cold") {
        gameEnv.player.slowTime = 120
        gameEnv.player.hurt(1)
      }
      else if (this.type == "Hot") {
        gameEnv.player.hurt(2)
      }
      else {
        gameEnv.player.groundTime = 180
        print("GROUND")
      }
      this.dying = true
      this.health = 0
    }
  }
  
  move() {
    if (this.spawning == false && this.dying == false) {
      if (this.dest.x == -1 && this.dest.y == -1){
        this.dest = gameEnv.player.pos.copy()
      }
      
      this.dir.set(this.dest.x-this.pos.x,this.dest.y-this.pos.y)
      this.dir.normalize()
      this.dir.mult(this.speed)
      this.pos.add(this.dir)
      
      if (dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y) < 5)
          this.dying = true
    }
  }

  
  collision() {
    
  }
}