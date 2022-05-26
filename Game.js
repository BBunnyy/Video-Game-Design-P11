//class for the game, details all the components/settings that go into the game, such as a player, enemies, and blocks. Different states of the game determine the settings.
class Game {
  constructor() {
    //initialize game screen size
    this.mapWidth = 0;
    this.mapHeight = 0;
    //initialize background image
    this.back = backgroundImg;
    //player movement lock, and tilemap lock info
    this.allowMovement = false;
    this.lockScreen = false;
    this.lockCoords = new p5.Vector(0, 0);

    //player cheat codes/Stats:
    this.OHK = false;
    this.SS = false;
    this.INF = false;
    this.maxHealth = 6; //MUST BE EVEN

    //game difficulty
    this.difficulty = 1;

    //game states: (starting screen, starting menu, etc.)
    this.state = 0;
    this.lastState = -1;
    this.lastLevel = 3;
    this.States = [
      new StartingScreen(),
      new MenuScreen(),
      new GameOver(),
      new Continue(),
      new Level1(),
      new Level2(),
      new End(),
    ];

    //default gravity:
    this.gravity = new p5.Vector(0, 0.5);

    //initialize objects
    this.blocks = [];
    this.enemies = [];
    this.powerups = [];
    this.player = new Player(0, 0);
  }

  run() {
    push();
    //if the screen isn't locked, follow the player,
    if (this.lockScreen == false) {
      //center of tilemap
      if (
        this.player.pos.x > width / 2 &&
        this.player.pos.x < this.mapWidth - width / 2 - gridSize
      ) {
        translate(-this.player.pos.x + width / 2 - gridSize / 2, 0);
      }
      //right side of tile map
      else if (this.player.pos.x >= this.mapWidth - width / 2 - gridSize) {
        translate(-this.mapWidth + width + gridSize / 2, 0);
      }
      //left side of tilemap
      else {
        translate(-gridSize / 2, 0);
      }
    }
    //if the screen is locked, lock at specific coordinates
    else {
      translate(-this.lockCoords.x - gridSize / 2, 0);
    }

    //if the state changes, initialize(set) the current state
    if (this.lastState != this.state) {
      this.States[this.state].set();
      this.lastState = this.state;
    }
    //run the current state
    this.States[this.state].run();

    pop();

    translate(-25, -25);
    //print non-moving overlay here
    this.States[this.state].overlay();
  }
}
