class ExtraHeart extends PowerUp {
  xtra() {
    this.rotate = 0
  }
  
  draw() {
    push()
    translate(this.pos.x, this.pos.y)
    image(HeartFull,-12.5,-12.5,25,25)
    pop()
  }
  
  do() {
    if (dist(gameEnv.player.pos.x, gameEnv.player.pos.y, this.pos.x, this.pos.y) < 25) {
      this.remove = true
      gameEnv.maxHealth += 2
      gameEnv.player.health += 2
    }
  }
}