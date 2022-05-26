//Detail what to do upon mouse clicks!
function mouseClicked() {
  if (gameEnv.state == gameEnv.States.length-1) {
    gameEnv.state = 0
  }
  else if (gameEnv.state == 2) {
    gameEnv.state = 0
  }
  else if (gameEnv.state == 3) {
    if (gameEnv.lastLevel < gameEnv.States.length - 1) {
      gameEnv.state = gameEnv.lastLevel + 1
    }
    else {
      gameEnv.state = 0
    }
  }
  
  //if on Level 1 screen
  else if (gameEnv.state >= 4) {
    //if clicking on the back arrow, return to starting screen
    if (mouseX > 450 && mouseX < 500 && mouseY > 0 && mouseY < 50) {
      gameEnv.state = 0;
    }
  }
  
  //if on starting screen
  else if (gameEnv.state == 0) {
    if (mouseX > 195 && mouseX < 305 && mouseY > 270 && mouseY < 315) {
      gameEnv.state = 1;
    }
    if (mouseX > 195 && mouseX < 305 && mouseY > 220 && mouseY < 265) {
      if (gameEnv.lastLevel < gameEnv.States.length-1) {
        gameEnv.state = gameEnv.lastLevel + 1; //FIRST LEVEL
      }
      else {
        gameEnv.state = 4; //FIRST LEVEL
        gameEnv.lastLevel = 3
      }
    }
    //if clicking on the back arrow, return to starting screen
    if (mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 50) {
      gameEnv.state = 0;
    }
    fill(255)
    
    // if (click != true) {
    //   click = true
    // }
    // else {
    //   click = false
    // }
    
    square(265,465,35)
    square(265+35,465,35)
    //if clicking on "1" select lvl 1
    if (mouseX > 265 && mouseX < 300 && mouseY > 465 && mouseY < 500) {
      gameEnv.lastLevel = 3;
    }
    //if clicking on "2" select lvl 2
    if (mouseX > 300 && mouseX < 335 && mouseY > 465 && mouseY < 500) {
      gameEnv.lastLevel = 4;
    }
  }

  //if on starting menu
  else if (gameEnv.state == 1) {
    //if clicking on the back arrow, return to starting screen
    if (mouseX > 0 && mouseX < 50 && mouseY > 0 && mouseY < 50) {
      gameEnv.state = 0;
    }
    //if clicking "-" near difficulty, decrease difficulty
    if (mouseX > 13 && mouseX < 37 && mouseY > 163 && mouseY < 187) {
      if (gameEnv.difficulty > 1) {
        gameEnv.difficulty--;
      }
    }
    //if clicking "+" near difficulty, decrease difficulty
    if (mouseX > 163 && mouseX < 187 && mouseY > 163 && mouseY < 187) {
      if (gameEnv.difficulty < 3) {
        gameEnv.difficulty++;
      }
    }
    //if clicking One Hit Kill check box, toggle OHK
    if (mouseX > 150 && mouseX < 175 && mouseY > 50 && mouseY < 75) {
      if (gameEnv.OHK == true) {
        gameEnv.OHK = false;
      } else {
        gameEnv.OHK = true;
      }
    }
    //if clicking Super Speed check box, toggle SS
    if (mouseX > 150 && mouseX < 175 && mouseY > 87.5 && mouseY < 113.5) {
      if (gameEnv.SS == true) {
        gameEnv.SS = false;
      } else {
        gameEnv.SS = true;
      }
    }
    //if clicking Infinite Health check box, toggle INF
    if (mouseX > 150 && mouseX < 175 && mouseY > 125 && mouseY < 150) {
      if (gameEnv.INF == true) {
        gameEnv.INF = false;
      } else {
        gameEnv.INF = true;
      }
    }
  }
}
