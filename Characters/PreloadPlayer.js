var walkAni = [];
var idleAni = [];
var jumpAni = [];
var fallAni = [];
var attkAni = [];

//set each animation (series of images in an array)
function PreloadPlayer() {
  walkAni = [
    loadImage("zImages/Player/Walk/PLAYER_WALK_1.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_2.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_3.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_4.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_5.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_6.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_7.png"),
    loadImage("zImages/Player/Walk/PLAYER_WALK_8.png"),
  ];
  idleAni = [
    loadImage("zImages/Player/Idle/PLAYER_IDLE_1.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_2.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_3.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_4.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_5.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_6.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_7.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_8.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_9.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_10.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_11.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_12.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_13.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_14.png"),
    loadImage("zImages/Player/Idle/PLAYER_IDLE_15.png"),
  ];
  jumpAni = [
    loadImage("zImages/Player/Jump/PLAYER_JUMP_1.png"),
    loadImage("zImages/Player/Jump/PLAYER_JUMP_2.png"),
    loadImage("zImages/Player/Jump/PLAYER_JUMP_3.png"),
    loadImage("zImages/Player/Jump/PLAYER_JUMP_4.png"),
    loadImage("zImages/Player/Jump/PLAYER_JUMP_4.png"),
  ];
  fallAni = [
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
    loadImage("zImages/Player/Fall/PLAYER_FALL_1.png"),
  ];
  attkAni = [
    loadImage("zImages/Player/Attack/PLAYER_ATTK_1.png"),
    loadImage("zImages/Player/Attack/PLAYER_ATTK_2.png"),
    loadImage("zImages/Player/Attack/PLAYER_ATTK_3.png"),
    loadImage("zImages/Player/Attack/PLAYER_ATTK_3.png"),
  ];
}
