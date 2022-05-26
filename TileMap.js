//size of a grid (block)
var gridSize = 50;

//functions to read tilemap and set game variables
function setTileMap(inTileMap) {
  var blocks = [];
  var enemies = [];
  var player;
  var powerups = [];
  for (var i = 0; i < inTileMap.length; i++) {
    blocks.push([]);
    for (var j = 0; j < inTileMap[i].length; j++) {
      switch (inTileMap[i][j]) {
        case "0":
          blocks[i].push(new Block(i, j));
          break;
        case "O":
          blocks[i].push(new InvisBlock(i, j));
          break;
        default:
          blocks[i].push(new EmptyBlock(i, j));
          switch (inTileMap[i][j]) {
            case "p":
              player = new Player(i, j);
              break;
            case "z":
              enemies.push(new Enemy(i, j));
              break;
            case "w":
              enemies.push(new Wisp(i, j));
              break;
            case "R":
              enemies.push(new Reaper(i, j));
              break;
            case "W":
              enemies.push(new Worm(i, j, "None"));
              break;
            case "F":
              enemies.push(new Worm(i, j, "Hot"));
              break;
            case "I":
              enemies.push(new Worm(i, j, "Cold"));
              break;
            case "!":
              powerups.push(new PowerUp(i, j));
              break;
            case "H":
              powerups.push(new ExtraHeart(i, j));
              break;
            case "h":
              powerups.push(new Heal(i, j));
              break;
          }
      }
    }
  }
  var removeOn = 3 - gameEnv.difficulty;
  var count = 0;
  for (var e = 0; e < enemies.length; e++) {
    if (count % 3 < removeOn) {
      enemies.splice(e, 1);
      e--;
    }
    count++;
  }

  return [blocks, enemies, player, powerups];
}
function setDummy(inTileMap) {
  var player = [];
  for (var i = 0; i < inTileMap.length; i++) {
    for (var j = 0; j < inTileMap[i].length; j++) {
      switch (inTileMap[i][j]) {
        case "d":
          player.push(new Player(i, j));
          break;
        case "e":
          player.push(new Enemy(i, j));
          break;
      }
    }
  }
  return player;
}

//Tile maps! (Make sure each is 10 blocks tall)
var startMap = [
  "             ",
  "             ",
  "             ",
  "             ",
  "             ",
  "00         00",
  "000       000",
  "000       000",
  "000   p   000",
  "0000000000000",
];

var menuMap = [
  "OOOOOOOOOOOOO",
  "OOOOOOOOOOOOO",
  "OOOOO Od   eO",
  "OOOOO O0000OO",
  "OeeeOdOd  OOO",
  "0000000000000",
  "0z       z000",
  "0    p    000",
  "0 z  0  z 000",
  "0000000000000",
];

var level1Map = [
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "0    w      0        0z         w      w          w         w             w                   w     H0  h  w0h       h0",
  "0     z    H0    w   0H                                  h                         w                w0      0         0",
  "0     0 z z00        00 z z z0000                  0000000       w    0zz h zz0                     00      0         0",
  "0    000000           000000000    0  w   0000000           w        00000000000     z0  0000  000 w 0   w00000     000",
  "0 z          w                                         w                    00000 z  00  w           0      0         0",
  "0000        z  000000       w        000        w            000000   w     w  00000000        w     000    0    0    0",
  "0           0  0  w               0z  hz z0          00000       w       00000  00000000             0    0     000   0",
  "0p   0 z z  0zz0   z z  z  z  z  00000000000z z z 000000000 z z z  z00000  z z z  z  z z 0 z  zz  z z  z  0w          0",
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
];

var level2Map = [
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "0WWW0    w wR    000z    0h  w         R           w    w 0000000000w     hhH000       w ww    R    ww   w  0         0",
  "0000              00H     0000        w    w     w     wRww00000  w    w  000000    00000000000000000000000h0         0",
  "0p     000000  W   0000zz    zzz00 W     w              w   00  w          w00Rw  00   w       w       0000 0  00000000",
  "00000       000000   0000zzzz0000000000000    0000  w              w  000    0zzz  zzz W  z zz    00     H0h0        c0",
  "00000     0 0    00    00000000H w00H           0000000   w    000000000000   0000000000000000000000000   0 00        0",
  "0Hh 0zzzzz0 0  0  0  w     w  0R  00   h   00   ww 000000000     w 0000000000  00wR w R w  R00  H    w   R0h00000000  0",
  "0h   00000  0 00       h       0   00     0000      H000000000            w     0000000000000000000     000           0",
  "0ww  zz z z   00z  z zW zz W zz W z z    zzz  W zz zz0000000000 W  zzzz      zzz zzz zz z      zzz   z00000          00",
  "00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
];
