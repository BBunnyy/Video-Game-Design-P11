//STARTING SCREEN STATE

class StartingScreen {
  constructor() {}

  //set the game variables
  set() {
    //prevent character movement
    gameEnv.allowMovements = false;
    gameEnv.lockScreen = false;

    //Initialize player, blocks and enemies
    var temp = setTileMap(startMap);
    gameEnv.blocks = temp[0];
    gameEnv.enemies = temp[1];
    gameEnv.player = temp[2];

    gameEnv.mapWidth = gameEnv.blocks[0].length * gridSize;

    //set block images
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        if (gameEnv.blocks[i][j].blockType == "SOLID")
          gameEnv.blocks[i][j].set();
      }
    }
  }

  overlay() {
    //Draw the Title and author (me)
    push();
    translate(-50, 25);

    textSize(100);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    textLeading(80);
    textWrap(WORD);
    fill(212, 175, 55);
    stroke(111, 91, 24);
    strokeWeight(5);
    text("Knight's Quest", 75, 25, 500);
    textSize(25);
    strokeWeight(4);
    fill(212, 175, 55);
    text("By Bunny Taylor", 95, 160, 500);

    //draw menu and new game buttons
    stroke(111, 91, 24);
    rect(250, 200, 100, 35);
    rect(250, 250, 100, 35);
    noStroke();
    fill(111, 91, 24);
    text("Play", 300, 215);

    // //COVER TO BE DISABLED
    // fill (30,0,0,200)
    // stroke(30,0,0,200)
    // rect(250,200,100,35)
    noStroke();
    fill(111, 91, 24);
    text("Menu", 300, 265);

    noStroke();
    fill(212, 175, 55);
    text("Level Select:   1   2    ", 300, 455);
    if (gameEnv.lastLevel == 3) {
      text("[  ]", 334, 453);
    } else if (gameEnv.lastLevel == 4) {
      text("[  ]", 367, 453);
    } else if (gameEnv.lastLevel == 5) {
      text("[  ]", 402, 453);
    }
    pop();
  }

  //run the state
  run() {
    //spawn enemies randomly from both sides
    if (gameEnv.enemies.length < 3) {
      if (frameCount % 240 == floor(random(0, 80))) {
        gameEnv.enemies.push(new Enemy(4, 0));
      } else if (frameCount % 240 == floor(random(120, 200))) {
        var temp = new Enemy(4, 12);
        temp.dir = "Left";
        gameEnv.enemies.push(temp);
      }
    }

    //if an enemy is near the player, attack the enemy
    for (var e = 0; e < gameEnv.enemies.length; e++) {
      if (dist(gameEnv.player.pos.x, 0, gameEnv.enemies[e].pos.x, 0) < 40) {
        gameEnv.player.attacking = true;
        if (gameEnv.player.pos.x < gameEnv.enemies[e].pos.x) {
          gameEnv.player.dir = "Right";
        }
        if (gameEnv.player.pos.x > gameEnv.enemies[e].pos.x) {
          gameEnv.player.dir = "Left";
        }
      }
    }

    //draw the game
    this.draw();
  }

  //draw the player and enemies
  draw() {
    for (var i = 0; i < gameEnv.blocks.length; i++) {
      for (var j = 0; j < gameEnv.blocks[i].length; j++) {
        gameEnv.blocks[i][j].draw();
      }
    }
    gameEnv.player.attack();
    gameEnv.player.move();
    gameEnv.player.collision();

    for (var k = 0; k < gameEnv.enemies.length; k++) {
      gameEnv.enemies[k].move();
      gameEnv.enemies[k].collision();
      gameEnv.enemies[k].draw();
      if (gameEnv.enemies[k].toRemove == true) {
        gameEnv.enemies.splice(k, 1);
        k--;
      }
    }

    gameEnv.player.draw();
  }
}
