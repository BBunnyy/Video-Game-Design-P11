//"Air" object (defined a block that can be passed through and is invisible)

class EmptyBlock extends Block {
  xtra() {
    this.blockType = "NULL";
  }

  draw() {
    //nothing!
  }
}
