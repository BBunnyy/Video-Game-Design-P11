//worm variables
var wormDie = []
var wormSpawn = []
var wormFrozen = []

//ball variables
var ballSpawn = []
var ballIdle = []
var ballImgTest

//reaper variables
var reaperDie = []
var reaperSpawn = []
var reaperFrozen = []

//wisp variables
var wispDie = []
var wispSpawn = []
var wispIdle = []

//skeleton variables:
var skeleWalkAni = []
var skeleFrozenAni = []

//set each animation (series of images in an array)
function PreloadEnemies () {
  //worm:
  wormSpawn = [
    loadImage("zImages/Enemies/Worm/Walk/WormWalk1.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk2.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk3.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk4.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk5.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk6.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk7.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk8.png"),
    loadImage("zImages/Enemies/Worm/Walk/WormWalk9.png"),
  ]
  
  wormDie = wormSpawn;
  wormFrozen = wormSpawn;
  
  //Reaper:
  reaperSpawn = [
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0000_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0001_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0002_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0003_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0004_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0005_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0006_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0007_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0008_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0009_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0010_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0011_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0012_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0013_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0014_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0015_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0016_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0017_1.png")
  ]
  
  reaperFrozen = [
    loadImage("zImages/Enemies/Reaper/Idle/idle_0000_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0000_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0001_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0001_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0002_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0002_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0003_1.png"),
    loadImage("zImages/Enemies/Reaper/Idle/idle_0003_1.png"),
  ]
  
  reaperDie = [
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0017_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0016_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0015_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0017_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0016_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0015_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0017_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0016_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0015_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0014_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0013_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0012_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0011_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0010_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0009_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0008_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0007_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0006_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0005_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0004_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0003_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0002_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0001_1.png"),
    loadImage("zImages/Enemies/Reaper/Die/DeathDie_0000_1.png")
  ]
  
  //Wisp:
  wispDie = [
    loadImage("zImages/Enemies/Wisp/Die/WispDie_0000_1.png"),
    loadImage("zImages/Enemies/Wisp/Die/WispDie_0001_1.png"),
    loadImage("zImages/Enemies/Wisp/Die/WispDie_0002_1.png"),
    loadImage("zImages/Enemies/Wisp/Die/WispDie_0003_1.png"),
    loadImage("zImages/Enemies/Wisp/Die/WispDie_0004_1.png"),
  ]
  
  wispIdle = [
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0000_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0001_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0002_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0003_1.png"),
  ]
  
  wispSpawn = [
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0000_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0001_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0002_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0003_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0004_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0005_1.png"),
  ]
  
  ballIdle = [
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0000_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0001_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0002_1.png"),
    loadImage("zImages/Enemies/Wisp/Idle/WispIdle_0003_1.png"),
  ]
  
  ballDie = [
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0000_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0001_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0002_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0003_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0004_1.png"),
    loadImage("zImages/Enemies/Wisp/Spawn/WispAppear_0005_1.png"),
  ]
  
  //images for animations:
  skeleWalkAni = [
    loadImage(
      "zImages/Enemies/Skeleton/Walk/SKELE_WALK_1.png"
    ),
    loadImage(
      "zImages/Enemies/Skeleton/Walk/SKELE_WALK_2.png"
    ),
    loadImage(
      "zImages/Enemies/Skeleton/Walk/SKELE_WALK_3.png"
    ),
    loadImage(
      "zImages/Enemies/Skeleton/Walk/SKELE_WALK_4.png"
    ),
  ];
  skeleFrozenAni = [
    loadImage(
      "zImages/Enemies/Skeleton/Walk/SKELE_WALK_1.png"
    ),
  ];
}