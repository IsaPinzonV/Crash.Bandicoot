//Create the socket
let socket = io();
let pantallasDisplay = 0;

let speed = 30;

let crash;
let element;

let lives = 1;
let obstacles = [];
let arrows = [];
let imgs = [];

function preload() {
  imgDisplay = new loadImage("data/Home-Player.png");
  imgQR = new loadImage("data/QR-Home.png");
  imgHome = new loadImage("data/Home.png");
  imgIns = new loadImage("data/Instruct.png");
  imgPlay = new loadImage("data/play.png");
  imgLoser = new loadImage("data/loser.png");
  imgWinner = new loadImage("data/winner.png");

  //elements
  imgPrice = new loadImage("data/price.png");
  imgSilverBox = new loadImage("data/silverBox.png");
  imgWoodBox = new loadImage("data/woodBox.png");
  imgArrow = new loadImage("data/arrow.png");

  //crash movements
  imgCrashDown = new loadImage("data/CrashDown.png");
  imgJumping1 = new loadImage("data/Jumping1.png");
  imgJumping2 = new loadImage("data/Jumping2.png");
  imgWalking1 = new loadImage("data/Walking1.png");
  imgWalking2 = new loadImage("data/Walking2.png");
}

function setup() {
  frameRate(60);
  createCanvas(windowWidth, windowHeight);

  imgs.push(imgWalking2);
  imgs.push(imgCrashDown);
  imgs.push(imgJumping1);
  imgs.push(imgJumping2);
  imgs.push(imgWalking1);

  crash = new Crash(imgs);
  price = new Price(
    imgPrice,
    random(50, windowWidth - 50),
    random(windowHeight / 2, windowHeight / 1.38),
    45,
    50
  );
  obstacle = new Obstacle();
  arrow = new Arrow();
}

function draw() {
  background(0);

  switch (pantallasDisplay) {
    //Qr screen
    case 0:
      image(imgQR, 0, 0, windowWidth, windowHeight);
      break;

    //home screen 1
    case 1:
      image(imgHome, 0, 0, windowWidth, windowHeight);

      break;

    //instructions display screen
    case 2:
      image(imgIns, 0, 0, windowWidth, windowHeight);

      crash.update();
      crash.show();

      break;

    //play screen
    case 3:
      image(imgPlay, 0, 0, windowWidth, windowHeight);

      break;

    //home player screen
    case 4:
      image(imgDisplay, 0, 0, windowWidth, windowHeight);

      crash.update();
      crash.show();

      fill(255);
      textSize(20);
      text("Lives: " + lives, 50, 50);

      if (lives <= 0) {
        pantallasDisplay = 6;

        //emit change screen display player
        scoreDisplay("LOSER");

        lives = 1;
      }

      //conditional max 3 lives
      if (lives < 3) {
        pointCounter();
        price.show();
      }

      //winner or loser screen depending on number of lives
      if (frameCount % 1500 == 0 && lives >= 1) {
        pantallasDisplay = 5;

        //emit change screen display player winner
        scoreDisplay("WINNER");

      } else if (frameCount % 1500 == 0 && lives <= 1) {
        pantallasDisplay = 6;

        //emit change screen display player loser
        scoreDisplay("LOSER");
      }

      //obstacles array
      for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].show();
        obstacles[i].update();

        //validates hit with boxes
        if (crash.hits(obstacles[i])) {
          lives -= 1;
          obstacles.splice(i, 1);
          return false;
        }

        //remove from array when exiting screen
        if (obstacles[i].outOfScreen()) {
          obstacles.splice(i, 1);
        }
      }

      //each frame a new obstacle appears
      if (frameCount % 200 == 0) {
        let img = random(0, 2);
        if (Math.floor(img) == 0) {
          obstacles.push(new Obstacle(imgSilverBox));
        } else {
          obstacles.push(new Obstacle(imgWoodBox));
        }
      }

      //arrow array
      for (var i = arrows.length - 1; i >= 0; i--) {
        arrows[i].show();
        arrows[i].update();

        if (crash.hits(arrows[i])) {
          lives -= 1;
          arrows.splice(i, 1);
          return false;
        }

        //remove from array when exiting screen
        if (arrows[i].outOfScreen()) {
          arrows.splice(i, 1);
        }
      }

      //each frame a new obstacle arrow
      if (frameCount % 400 == 0) {
        let y = random(windowHeight / 2, windowHeight / 1.2);
        arrows.push(new Arrow(y));
      }

      break;

    //winner screen
    case 5:
      image(imgWinner, 0, 0, windowWidth, windowHeight);
      break;

    //loser screen
    case 6:
      image(imgLoser, 0, 0, windowWidth, windowHeight);
      break;
  }
}

/*
Listen to the event and use the directions
You may want to use switch-case structure
*/

socket.on("directions", (controllerOrder) => {
  switch (controllerOrder) {
    case "UP":
      if (crash.onBottom()) {
        crash.jump();
        crash.currentImg = 2
      setTimeout(()=>{ crash.currentImg = 0},1000);
      }
      break;
    case "DOWN":
      crash.currentImg = 1
      setTimeout(()=>{ crash.currentImg = 0},1000);
      break;
    case "RIGHT":
      if (crash.x + speed < windowWidth - 80) {
        crash.x += speed;
      }
      crash.currentImg = 4
      break;
    case "LEFT":
      if (crash.x + speed > 50) {
        crash.x -= speed;
      }
      crash.currentImg = 0
      break;
  }
});

//receive change of screens depending on player buttons
socket.on("display", (changeDisplays) => {
  switch (changeDisplays) {
    case "HOME1":
      pantallasDisplay = 1;
      break;
    case "HOME2":
      pantallasDisplay = 2;
      break;

    case "PLAY":
      pantallasDisplay = 3;
      break;

    case "HOMEPLAYER":
      pantallasDisplay = 4;
      break;

    case "TRYAGAIN":
      pantallasDisplay = 1;
      break;
  }
});

//emit change of screens to display
function scoreDisplay(displayPlayer) {
  socket.emit("displayPlayer", displayPlayer);
}

//Counter points
function pointCounter() {
  if (
    price.x + 50 > crash.x &&
    price.x < crash.x + 100 &&
    price.y + 50 > crash.y &&
    price.y < crash.y + 170
  ) {
    price.x = random(50, windowWidth - 50);
    price.y = random(windowHeight / 2, windowHeight / 1.38);

    lives += 1;
  }
}