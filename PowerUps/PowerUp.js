class PowerUp {
  xtra() {
    //nothing
    return false;
  }
  constructor(y, x) {
    //defines the size of the object
    this.height = gridSize / 2;
    this.width = gridSize / 2;

    this.pos = new p5.Vector(x * gridSize, y * gridSize);
    this.xtra();

    this.remove = false;
  }

  draw() {
    push();
    //print(this.pos)
    translate(this.pos.x, this.pos.y);
    circle(0, 0, 25);
    pop();
  }

  do() {
    if (
      dist(gameEnv.player.pos.x, gameEnv.player.pos.y, this.pos.x, this.pos.y) <
      25
    ) {
      this.remove = true;
    }
  }
}
