//Base class to define a standard Block Object.
//Block objects act as platforms/walls for the player and enemy to traverse
//Blocks will take on different appearances depending on how many neighboring blocks are around.

class Block {
  xtra() {
    //empty for base
  }
  
  //set up block positions
  constructor(y,x) {
    this.gridX = x;
    this.gridY = y;
    this.x = x*gridSize;
    this.y = y*gridSize;
    this.blockType = "SOLID"
    this.xtra()
    this.image;
    
    this.imageSet = false;
  }
  
  //sets the block appearances based upon how many neighbors it has, and what direction they are in.
  set() {
    //declare the image as set!
    this.imageSet = true
    
    //Resulting vector meaning: true for block at a location, false for no block at location (X for don't care in the comment)
    // [NW, N, NE], 
    // [W,  C,  E], 
    // [SW, S, SE]
    //find the neighbors of the block
    var neighbors = this.checkNeighbors()
    
    //set appearance of block based on neighbors: (images stored in "./BlockImages")
    // [[X, f, X], 
    // [f, t, t], 
    // [X, t, t]]
    if (neighbors[0][1] == false &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == true &&
       neighbors[2][2] == true) {
      this.image = TopLeft
    }
    // [[t, t, t], 
    // [t, t, t], 
    // [t, t, t]]
    else if (neighbors[0][0] == true &&
       neighbors[0][1] == true &&
       neighbors[0][2] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][0] == true &&
       neighbors[2][1] == true &&
       neighbors[2][2] == true) {
      this.image = TrueMiddle
    }
    // [[X, f, X], 
    // [t, t, false], 
    // [t, t, x]]
    else if (neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][0] == true &&
       neighbors[2][1] == true) {
      this.image = TopRight
    }
    // [[X, f, X], 
    // [t, t, t], 
    // [t, t, t]]
    else if (neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][0] == true &&
       neighbors[2][1] == true &&
       neighbors[2][2] == true) {
      this.image = TopMiddle
    }
    // [[X, t, t], 
    // [f, t, t], 
    // [X, t, t]]
    else if (
       neighbors[0][1] == true &&
       neighbors[0][2] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == true &&
       neighbors[2][2] == true) {
      this.image = MiddleLeft
    }
    // [[t, t, x], 
    // [t, t, f], 
    // [t, t, x]]
    else if (neighbors[0][0] == true &&
       neighbors[0][1] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][0] == true &&
       neighbors[2][1] == true) {
      this.image = MiddleRight
    }
    // [[x, t, t], 
    // [f, t, t], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[0][2] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = BottomLeft
    }
    // [[t, t, x], 
    // [t, t, f], 
    // [x, f, x]]
    else if (neighbors[0][0] == true &&
       neighbors[0][1] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == false) {
       this.image = BottomRight
    }
    // [[t, t, t], 
    // [t, t, t], 
    // [x, f, x]]
    else if (neighbors[0][0] == true &&
       neighbors[0][1] == true &&
       neighbors[0][2] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = BottomMiddle
    }
    // [[x, f, x], 
    // [t, t, t], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = HLine
    }
    // [[x, f, x], 
    // [f, t, t], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == false &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = LeftHLine
    }
    // [[x, f, x], 
    // [t, t, f], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == false) {
      this.image = RightHLine
    }
    // [[x, t, x], 
    // [f, t, f], 
    // [x, t, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == true) {
      this.image = VLine
    }
    // [[x, f, x], 
    // [f, t, f], 
    // [x, t, x]]
    else if (
       neighbors[0][1] == false &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == true) {
      this.image = TopVLine
    }
    // [[x, t, x], 
    // [f, t, f], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == false) {
      this.image = BottomVLine
    }
    // [[x, f, x], 
    // [f, t, f], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == false &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == false) {
      this.image = Single
    }
    //IMPERFECT, BUT GOOD ENOUGH CASES, MAY FIX LATER
    // [[X, f, X], 
    // [f, t, t], 
    // [X, t, X]]
    else if (neighbors[0][1] == false &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == true) {
      this.image = TopLeft
    }
    // [[X, f, X], 
    // [t, t, f], 
    // [f, t, x]]
    else if (neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == true) {
      this.image = TopRight
    }
    // [[X, f, X], 
    // [t, t, t], 
    // [f, t, f]]
    else if (neighbors[0][1] == false &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == true) {
      this.image = TopMiddle
    }
    // [[X, t, X], 
    // [f, t, t], 
    // [X, t, X]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == true) {
      this.image = MiddleLeft
    }
    // [[X, t, x], 
    // [t, t, f], 
    // [X, t, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == true) {
      this.image = MiddleRight
    }
    // [[x, t, X], 
    // [f, t, t], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == false &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = BottomLeft
    }
    // [[X, t, x], 
    // [t, t, f], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == false &&
       neighbors[2][1] == false) {
       this.image = BottomRight
    }
    // [[X, t, X], 
    // [t, t, t], 
    // [x, f, x]]
    else if (
       neighbors[0][1] == true &&
       neighbors[1][0] == true &&
       neighbors[1][1] == true &&
       neighbors[1][2] == true &&
       neighbors[2][1] == false) {
      this.image = BottomMiddle
    }
    else {
      // this.image = Single
      this.image = TrueMiddle
      //print(neighbors)
    }
  }
  
  //draw's the block
  draw() {
    if (dist(this.x,0,gameEnv.player.pos.x,0) < 500) {
      push()
      translate(this.x,this.y)
      image(this.image,-51,-51,102,102)
      pop()
    }
  }
  
  //checks for neighboring blocks:
  checkNeighbors() {
    var output = [[false, false, false], 
                  [false, false, false], 
                  [false, false, false]]
    // [NW, N, NE], 
    // [W,  C,  E], 
    // [SW, S, SE]
    
    //look for neighbors in the area!
    //if on the edge, outter edges are assumed to be neighbors! (out of array scope)
    for (var jShift = -1; jShift < 2; jShift++) {
      if (this.gridY == 0 && jShift == -1) {
        jShift++
        output[0][0] = true
        output[0][1] = true
        output[0][2] = true
      }
      if (this.gridY == gameEnv.blocks.length-1 && jShift == 1) {
        output[2][0] = true
        output[2][1] = true
        output[2][2] = true
        break;
      }
      for (var iShift = -1; iShift < 2; iShift++) {
        if (this.gridX == 0 && iShift == -1) {
          iShift++
          output[0][0] = true
          output[1][0] = true
          output[2][0] = true
        }
        if (this.gridX == gameEnv.blocks[0].length-1 && iShift == 1) {
          output[0][2] = true
          output[1][2] = true
          output[2][2] = true
          break;
        }
        
        //print("Check Neighbor: ",this.gridX+iShift, this.gridY + jShift)
        
        if (gameEnv.blocks[this.gridY + jShift][this.gridX+iShift].blockType == "SOLID") {
          //print("FOUND A BLOCK")
          output[jShift+1][iShift+1] = true;
        }
      }
      
    }
    
    return output
  }
}