class Heal extends PowerUp {
  xtra() {
    this.rotate = 0
  }
  
  draw() {
    push()
    translate(this.pos.x, this.pos.y)
    image(Cranberry,-12.5,-12.5,25,25)
    pop()
  }
  
  do() {
    if (dist(gameEnv.player.pos.x, gameEnv.player.pos.y, this.pos.x, this.pos.y) < 25) {
      this.remove = true
      gameEnv.player.health += 2
      
      if (gameEnv.player.health > gameEnv.maxHealth)
        gameEnv.player.health = gameEnv.maxHealth
    }
  }
}