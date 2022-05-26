class Reaper {
  constructor(y, x) {
    this.collide = true
    //positions in the block grid
    this.xGrid = x;
    this.yGrid = y;

    //set the dimensions of the object
    this.height = gridSize;
    this.width = gridSize / 2;
    
    //health
    this.health = 2
    this.hit = 0
    this.above = true
    this.toRemove = false
    this.immuneDuration = 60
    this.lastHit = this.immuneDuration

    //set the speed a  nd direction
    this.speed = 2;
    this.dir = "Right";

    //initialize physics
    this.acc = new p5.Vector(0, 0);
    this.vel = new p5.Vector(0, 0);
    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.direction = new p5.Vector(-1,-1)
    this.dest = new p5.Vector(-1,-1)
    
    //attacking variables
    this.swing = false
    this.attacking = false
    this.charging = false
    this.wisps = []
    this.hold = 0
    
    this.boss = false
    this.setPositions = [new p5.Vector(x, y)] //positions that it can travel during boss battle
//     this.setPositions = [new p5.Vector(109, 3), new p5.Vector(113, 1), new p5.Vector(117, 3), new p5.Vector(109, 8), new p5.Vector(117, 8)] //positions that it can travel during boss battle
    
    //initialize animation variables
    this.aniState = -1;
    this.animations = [];
    this.aniTime = 0;
    this.aniLength = 0;
    this.loopAni = true
    
    //animation triggers
    this.spawning = true
    this.dying = false
    
    //push individual animations to the animation array
    this.animations.push(reaperSpawn);
    this.animations.push(reaperFrozen);
    this.animations.push(reaperDie);
  }

  //draw the animated player object
  draw() {
    this.lastHit++
    
    for (var i = 0; i < this.wisps.length; i++) {
      this.wisps[i].draw()
    }
    
    push()
    translate(this.pos.x, this.pos.y);
    
    if (this.lastHit < this.immuneDuration && this.lastHit % 10 > 5) {
      tint(255,0,0)
    }
    
    if (this.dir == "Left") {
      scale(-1,1)
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
      image(this.animations[this.aniState][frame],-50,-50,100,100)
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
    if (this.lastHit >= this.immuneDuration && this.spawning == false && this.dying == false) {
      this.health -= dmg
      this.lastHit = 0
    }
    if (this.health <= 0) {
      this.dying = true
    }
  }
  
  //attacking!
  attack() {
    for (var i = 0; i < this.wisps.length; i++) {
      this.wisps[i].attack()
    }
    if (this.attacking == true) {
    }
    if (this.boss == true) {
    }
    if (this.attacking == true && (dist(gameEnv.player.pos.x, gameEnv.player.pos.y, this.pos.x, this.pos.y) < 150 || this.boss == true)) { 
      if (dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y) < 15) {    
          this.wisps.push(new Wisp(this.yGrid - 0.5, this.xGrid - 0.5))
          this.wisps[this.wisps.length-1].range = 800
          
          this.wisps.push(new Wisp(this.yGrid - 0.5, this.xGrid + 0.5))
          this.wisps[this.wisps.length-1].range = 800
          
          if (this.health < 15 && this.boss == true) {
            this.wisps[this.wisps.length-2].dmg = 2
            this.wisps[this.wisps.length-1].dmg = 2
            this.wisps.push(new Wisp(this.yGrid + 0.5, this.xGrid - 0.5))
            this.wisps[this.wisps.length-1].dmg = 2
            this.wisps[this.wisps.length-1].range = 800
            this.wisps[this.wisps.length-1].chasetime = 150  
          }
          
          if (this.health < 5 && gameEnv.difficulty >= 3 && this.boss == true) {
            this.wisps[this.wisps.length-3].dmg = 3
            this.wisps[this.wisps.length-2].dmg = 3
            this.wisps[this.wisps.length-1].dmg = 3
            this.wisps.push(new Wisp(this.yGrid + 0.5, this.xGrid + 0.5))
            this.wisps[this.wisps.length-1].range = 800
            this.wisps[this.wisps.length-1].chasetime = 200
            this.wisps[this.wisps.length-1].dmg = 3
          }
          this.hold = random(180,240)
        }
    
      for (var k = 0; k < this.wisps.length; k++) {
        gameEnv.enemies.push(this.wisps[k]);
      }
      this.wisps = []
      
      this.attacking = false
      this.dest = new p5.Vector(-1,-1)
    }
  }
  
  move() {
    for (var i = 0; i < this.wisps.length; i++) {
      this.wisps[i].move()
    }
    for (var j = 0; j < this.wisps.length; j++) {
      if (this.wisps[j].toRemove == true) {
        this.wisps.splice(j,1)
      }
    }
    
    
    if (this.attacking == false && this.spawning == false && this.dying == false && this.charging == false & this.hold <= 0) {
      if (this.swing == false) { //this.boss == true && 
        while (this.dest.x == -1 && this.dest.y == -1){
          this.dest = this.setPositions[floor(random(0,this.setPositions.length))].copy()
          this.dest = toCoords(this.dest)
          if (this.boss == true && (dist(this.dest.x, this.dest.y, this.pos.x, this.pos.y) < 100 || dist(this.dest.x, this.dest.y, gameEnv.player.pos.x, gameEnv.player.pos.y) < 100)) {
            this.dest = new p5.Vector(-1,-1)
          }
        }

      }
      else if (this.swing == true) { //this.boss == true && 
        //find a spot next to the player, move there, swing
      }
      
      this.direction.set(this.dest.x-this.pos.x,this.dest.y-this.pos.y)
      this.direction.normalize()
      this.direction.mult(this.speed)
      this.pos.add(this.direction)
      
      if (this.direction.x < 0)
        this.dir = "Left"
      else if (this.direction.x > 0)
        this.dir = "Right"
      
      if (dist(this.pos.x, this.pos.y, this.dest.x, this.dest.y) < 3) {
        this.pos = this.dest.copy()
        this.attacking = true
      }
    }
    else {
      if (gameEnv.player.pos.x < this.pos.x)
        this.dir = "Left"
      else if (gameEnv.player.pos.x > this.pos.x)
        this.dir = "Right"
    }
    
    this.xGrid = round(this.pos.x / gridSize);
    this.yGrid = round(this.pos.y / gridSize);
    if (this.hold > 0) {
      this.hold--
    }
  }

  
  collision() {
    
  }
}