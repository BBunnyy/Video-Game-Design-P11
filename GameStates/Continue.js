//STARTING SCREEN STATE

class Continue{
  constructor() {
  }
  
  //set the game variables
  set() {
    this.timer = 0
    
    gameEnv.enemies = []
    gameEnv.player.vel.set(0,0)
    gameEnv.allowMovement = false
  }
  
  //run the state
  run() {
    this.draw()
  }
  
  overlay() {
    this.timer += 2
    if (this.timer > 60) {
      push()
      translate(250,200)
      
      textSize(100)
      textStyle(BOLD)
      textAlign(CENTER,CENTER)
      textLeading(80)
      textWrap(WORD)
      
      fill(212,175,55,this.timer-60 )
      stroke(111, 91, 24,this.timer-60)
      strokeWeight(5)
      
      text("Level\nComplete",0,0)
      textSize(25)
      noStroke()
      fill(212,175,55,this.timer-150)
      text("Click to Continue",0,125)
      pop()
    }
    
  }
  
  //draw the player and enemies
  draw() {
    push()
    fill(255)
    rect(gameEnv.player.pos.x-600, gameEnv.player.pos.y-600, 1200, 1200)
    gameEnv.player.draw()
    pop()
  }
}