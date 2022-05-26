//Menu screen state! For setting options and learning controls at the start

class MenuScreen {
  constructor() {}

  //set the game state
  set() {
    //variables needed
    this.lastJump = 0;
    this.respawn = 0;
    this.dirChange = 0;

    //Allow the player to move, but lock the screen
    gameEnv.allowMovements = true;
    gameEnv.lockScreen = true;
    gameEnv.lockCoords = new p5.Vector(0, 0);

    //set player blocks and enemies
    var temp = setTileMap(menuMap);
    gameEnv.blocks = temp[0];
    gameEnv.enemies = temp[1];
    gameEnv.player = temp[2];

    //set the game size
    gameEnv.mapWidth = gameEnv.blocks[0].length * gridSize;

    //create dummie player and enemies that move seperately
    this.PlayerDummy = setDummy(menuMap);

    //get initial spot of skeleton dummy
    this.origSpot = this.PlayerDummy[1].pos.copy();
    //prevent difficulty skeletons from moving by setting directions to nothing
    this.PlayerDummy[2].dir = "NULL";
    this.PlayerDummy[3].dir = "NULL";
    this.PlayerDummy[4].dir = "NULL";
    //ensure they have no speed too
    this.PlayerDummy[2].vel.set(0, 0);
    this.PlayerDummy[3].vel.set(0, 0);
    this.PlayerDummy[4].vel.set(0, 0);

    //set block images based on neighbor locations
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        if (gameEnv.blocks[i][j].blockType == "SOLID")
          gameEnv.blocks[i][j].set();
      }
    }
  }

  run() {
    //cause jumping player to jump continuosly
    if (this.PlayerDummy[5].jump == 0 && frameCount > this.lastJump + 120) {
      this.PlayerDummy[5].jump = 1;
      this.lastJump = frameCount;
    }
    //cause moving player to move slowly
    if (this.PlayerDummy[6].vel.x == 0) {
      this.PlayerDummy[6].vel.x = 1;
      this.dirChange = frameCount;
    }
    var change = 1;
    if (gameEnv.SS == true) {
      change = 2;
    }
    //change moving player direction every two seconds
    if (frameCount > this.dirChange + 120 / change) {
      this.PlayerDummy[6].vel.x *= -1;
      this.dirChange = frameCount;
    }

    //make attacking player attack whenever dying skeleton moves near, teleport
    if (dist(this.PlayerDummy[0].pos.x, 0, this.PlayerDummy[1].pos.x, 0) < 40) {
      this.PlayerDummy[0].attacking = true;
      this.PlayerDummy[1].pos = this.origSpot.copy();
      this.PlayerDummy[1].pos.x += 100;
      this.respawn = frameCount;
    }

    //draw the game
    this.draw();
  }

  overlay() {
    //draw rectangles and circles
    push();
    translate(-0, 25);
    fill(212, 175, 55);
    strokeWeight(3);
    stroke(111, 91, 24);

    //One hit kill block and checkbox
    rect(25, 25, 100, 25);
    rect(150, 25, 25, 25);

    //Superspeed block and checkbox
    rect(25, 62.5, 100, 25);
    rect(150, 62.5, 25, 25);

    //Infinite lives block and checkbox
    rect(25, 100, 100, 25);
    rect(150, 100, 25, 25);

    //difficulty control images
    circle(25, 150, 25);
    circle(175, 150, 25);
    rect(50, 137.5, 100, 25);

    //instructions box
    rect(250, 0, 200, 62.5);

    //draw text UI
    strokeWeight(3);
    fill(111, 91, 24);
    textAlign(CENTER, CENTER);
    textSize(20);
    fill(212, 175, 55);
    //OPTIONS TEXT:
    text("Options:", 100, 6.25);
    strokeWeight(0);
    //ARTIST CREDIT
    text(
      "Art purchased or downloaded from free resources on itch.io",
      250,
      250
    );
    text("Artists: OcO, luizmelo", 250, 450);
    //BACK BUTTON
    textSize(40);
    strokeWeight(3);
    text("<-", 25, -6);
    strokeWeight(0);
    //ONE HIT KILL
    textSize(20);
    fill(111, 91, 24);
    text("One Hit Kill", 75, 36);
    if (gameEnv.OHK == true) {
      text("X", 163, 36);
    }
    //SUPER SPEED
    text("Super Speed", 75, 73);
    if (gameEnv.SS == true) {
      text("X", 163, 73);
    }
    //INFINITE LIVES
    text("Inf. Lives", 75, 111);
    if (gameEnv.INF == true) {
      text("X", 163, 111);
    }
    //DIFFICULTY
    textSize(30);
    text("-", 26, 147);
    text("+", 175, 147);
    textSize(20);
    text("Difficulty", 100, 148);

    //CONTROLS TEXT
    textWrap(WORD);
    textLeading(18);
    text(
      "Controls: Press Space to Jump, D to Attack, Right & Left Arrow to Move.",
      252,
      12.5,
      200
    );
    pop();
  }

  draw() {
    // draw blocks
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        gameEnv.blocks[i][j].draw();
      }
    }

    ////allow player to attack, move, collide, and be drawn
    gameEnv.player.attack();
    gameEnv.player.move();
    gameEnv.player.collision();
    gameEnv.player.draw();

    //move collise and draw enemies
    for (var k = 0; k < gameEnv.enemies.length; k++) {
      gameEnv.enemies[k].move();
      gameEnv.enemies[k].collision();
      gameEnv.enemies[k].draw();
      if (gameEnv.enemies[k].toRemove == true) {
        gameEnv.enemies.splice(k, 1);
        k--;
      }
    }

    //move collide and draw dummies, dont draw all dummy skeletons if difficulty isnt 3
    for (var d = 0; d < this.PlayerDummy.length; d++) {
      this.PlayerDummy[d].move();
      this.PlayerDummy[d].collision();

      if (gameEnv.difficulty == 1) {
        if (d == 3 || d == 4) {
          continue;
        }
      }
      if (gameEnv.difficulty == 2) {
        if (d == 4) {
          continue;
        }
      }
      this.PlayerDummy[d].draw();
    }
  }
}
