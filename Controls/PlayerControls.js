var pressingLeft = false
var pressingRight = false

//Detail what to do upon key inputs!
function keyPressed() {
  //if the player is allowed to move,
  if (gameEnv.allowMovements == true) {
    // print("Allowing movement")
    //if space is pressed, and not already jumping, jump
    if (keyCode == 32 && gameEnv.player.jump == 0) {
      gameEnv.player.jump = 1
      gameEnv.player.startJump = 1
    }
    //if the left arrow is pressed, move left
    if (keyCode == LEFT_ARROW) {
      gameEnv.player.vel.x -= gameEnv.player.speed
      pressingLeft = true
    }
    //if the right arrow is pressed, move right
    if (keyCode == RIGHT_ARROW) {
      gameEnv.player.vel.x += gameEnv.player.speed
      pressingRight = true
    }
    //if the "D" key is pressed, attack
    if (keyCode == 68) {
      if (gameEnv.player.attacking == false) {
        gameEnv.player.attacking = true
      }
    }
  }
}

//Detail waht to do on key releases!
function keyReleased() {
  //if player is allowed to move
  if (gameEnv.allowMovements == true) {
    //if the if the left or right arrow is released, reset velocity
    if (keyCode == LEFT_ARROW && (gameEnv.player.vel.x != 0 || pressingRight == true)) {
      gameEnv.player.vel.x += gameEnv.player.speed
      pressingLeft = false
    }
    if (keyCode == RIGHT_ARROW && (gameEnv.player.vel.x != 0 || pressingLeft == true)) {
      gameEnv.player.vel.x -= gameEnv.player.speed
      pressingRight = false
    }
  }
}