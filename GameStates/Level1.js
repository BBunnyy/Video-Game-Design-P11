//Menu screen state! For setting options and learning controls at the start

class Level1{
  constructor() {
  }
  
  //set the game state
  set() {
    //variables needed
    this.bossState = 0 // [0 = not started, 1 = loading, 2 = begin]
    this.bossStart = 0
    
    //Allow the player to move, but lock the screen
    gameEnv.allowMovements = true
    gameEnv.lockScreen = false
    gameEnv.maxHealth = 6 //MUST BE EVEN
    
    //set player blocks and enemies
    var temp = setTileMap(level1Map)
    gameEnv.blocks = temp[0]
    gameEnv.enemies = temp[1]
    gameEnv.player = temp[2]
    gameEnv.powerups = temp[3]
    
    //set the game size
    gameEnv.mapWidth = gameEnv.blocks[0].length*gridSize
    
    //set block images based on neighbor locations
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        if (gameEnv.blocks[i][j].blockType == "SOLID")
          gameEnv.blocks[i][j].set()
      }
    }  
  }
  
  
  run() {    
    //draw the game
    this.draw()
    
    //stop dead player
    if (gameEnv.player.health == 0) {
      gameEnv.allowMovements = false
    }
    
    //Prep boss fight
    if (this.bossState == 0 && gameEnv.player.pos.x > 5650) {
      gameEnv.allowMovements = false
      gameEnv.lockScreen = true
      gameEnv.lockCoords.set(5650-width/2,0)
      gameEnv.player.vel.x = 0
      this.bossState = 1;
      this.bossStart = frameCount
    }
    
    if (this.bossState == 1) {
      if (this.bossStart + 60 == frameCount) { //108 {
        gameEnv.blocks[8][108] = new Block(8,108)
        gameEnv.blocks[8][108].set()
        gameEnv.blocks[9][108].set()
      }
      if (this.bossStart + 90 == frameCount) { //108 {
        gameEnv.blocks[7][108] = new Block(7,108)
        gameEnv.blocks[6][108].set()
        gameEnv.blocks[7][108].set()
        gameEnv.blocks[8][108].set()
      }
      if (this.bossStart + 150 == frameCount) { //108 {
        this.bossState = 2;
        gameEnv.enemies = []
        gameEnv.enemies.push(new Reaper(2, 113))
        gameEnv.enemies[0].boss = true;
        gameEnv.enemies[0].health = 20;
        gameEnv.enemies[0].setPositions = [new p5.Vector(109, 3), new p5.Vector(113, 1), new p5.Vector(117, 3), new p5.Vector(109, 8), new p5.Vector(117, 8)] //positions that it can travel during boss battle
        gameEnv.allowMovements = true
      }
    }
    
    if (gameEnv.player.health <= 0) //game over
      gameEnv.state = 2
    if (gameEnv.enemies.length == 0 && this.bossState == 2) { //game won
      gameEnv.state = 3
      gameEnv.lastLevel = 4  
    }
  }
  
  overlay() {
    push()
    noStroke()
    fill(111, 91, 24)
    square(460,10,30)
    fill(212,175,55)
    square(464,14,22)
    fill(111, 91, 24)
    textAlign(CENTER,CENTER)
    textSize(20)
    text("X",475.5,24)
    //draw health
    for (var h = 0; h < gameEnv.maxHealth/2; h++) {
      if (h <= floor(gameEnv.player.health/2)-1)
        image(HeartFull,h * 25 ,0,25,25)
      else if (h == ceil(gameEnv.player.health/2)-1)
        image(HeartHalf,h * 25 ,0,25,25)
      else
        image(HeartEmpty,h * 25 ,0,25,25)
    }
    pop()
  }
  
  draw() {
    
    // draw blocks
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        gameEnv.blocks[i][j].draw()
      }
    }
    
    ////allow player to attack, move, collide, and be drawn
    gameEnv.player.attack()
    gameEnv.player.move()
    gameEnv.player.collision()
    gameEnv.player.draw()
    
    //move collise and draw enemies
    for (var k = 0; k < gameEnv.enemies.length; k++) {
      gameEnv.enemies[k].move()
      gameEnv.enemies[k].collision()
      gameEnv.enemies[k].attack()
      if (abs(gameEnv.enemies[k].pos.x - gameEnv.player.pos.x) < 450) {
        gameEnv.enemies[k].draw()
      }
      if (gameEnv.enemies[k].toRemove == true) {
        gameEnv.enemies.splice(k,1)
        k--
      }
    }
    
    //move collise and draw enemies
    for (var l = 0; l < gameEnv.powerups.length; l++) {
      gameEnv.powerups[l].draw()
      gameEnv.powerups[l].do()
      if (gameEnv.powerups[l].remove == true) {
        gameEnv.powerups.splice(l,1);
        l--
      }
    }
  }
}