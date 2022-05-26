//Acts as the invisible walls to prevent movement through them by player
class InvisBlock extends Block{
  xtra() {
    this.blockType = "INVIS"
  }
  
  draw() {
    //nothing!
  }
}