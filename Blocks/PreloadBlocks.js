//LOADS ALL IMAGES FOR THE BLOCK AT THE START!
var TrueMiddle,
  TopLeft,
  TopRight,
  TopMiddle,
  MiddleLeft,
  MiddleRight,
  BottomLeft,
  BottomMiddle,
  BottomRight,
  HLine,
  LeftHLine,
  RightHLine,
  VLine,
  TopVLine,
  BottomVLine,
  Single;

var backgroundImg;

function PreloadBlocks() {
  TrueMiddle = loadImage("zImages/Block/TrueMiddle.png");
  TopLeft = loadImage("zImages/Block/TopLeft.png");
  TopRight = loadImage("zImages/Block/TopRight.png");
  TopMiddle = loadImage("zImages/Block/TopMiddle.png");
  MiddleLeft = loadImage("zImages/Block/MiddleLeft.png");
  MiddleRight = loadImage("zImages/Block/MiddleRight.png");
  BottomLeft = loadImage("zImages/Block/BottomLeft.png");
  BottomMiddle = loadImage("zImages/Block/BottomMiddle.png");
  BottomRight = loadImage("zImages/Block/BottomRight.png");
  HLine = loadImage("zImages/Block/HLine.png");
  LeftHLine = loadImage("zImages/Block/LeftHLine.png");
  RightHLine = loadImage("zImages/Block/RightHLine.png");
  VLine = loadImage("zImages/Block/VLine.png");
  TopVLine = loadImage("zImages/Block/TopVLine.png");
  BottomVLine = loadImage("zImages/Block/BottomVLine.png");
  Single = loadImage("zImages/Block/Single.png");

  backgroundImg = loadImage("zImages/Background/Background.png");
}
