//Create the socket
let socket = io();
let pantallas = 0;

let player = {
  name: "",
  email: "",
};

let userInput;
let emailInput;

function preload() {
  imgLetsPlay = new loadImage("data/letsPlay.png");
  imgCoupon = new loadImage("data/coupon.png");
  imgForm = new loadImage("data/form.png");
  imgHome = new loadImage("data/homePlayer.png");

  //Sheer screen
  imgPlay = new loadImage("data/play.png");
  imgIns = new loadImage("data/followIns.png");

  //Instructions screens
  imgGoLeft = new loadImage("data/goLeft.png");
  imgGoRight = new loadImage("data/goRight.png");
  imgGoUp = new loadImage("data/goUp.png");
  imgGoDown = new loadImage("data/goDown.png");

  //Winner-Loser screens
  imgWinner = new loadImage("data/winner.png");
  imgLoser = new loadImage("data/loser.png");
}

function setup() {
  frameRate(16);
  createCanvas(windowWidth, windowHeight);

  emailInput = createInput("");
  userInput = createInput("");
}

function draw() {
  //Switch screen
  background(0);

  noStroke();
  noFill();

  switch (pantallas) {
    case 0:
      image(imgLetsPlay, 0, 0);

      //emit change display to home1
      connectionButtons("HOME1", 60, 690, 300, 70);

      //letsPlay button
      if (
        pmouseX > 60 &&
        pmouseX < 60 + 300 &&
        pmouseY > 690 &&
        pmouseY < 690 + 70
      ) {
        pantallas = 1;
      }

      break;

    //instructions screen
    case 1:
      image(imgIns, 0, 0);

      //emit change display to play
      connectionButtons("PLAY", 320, 30, 70, 25);

      //skip button
      if (
        pmouseX > 320 &&
        pmouseX < 320 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      //emit change display to home2
      connectionButtons("HOME2", 30, 400, 360, 150);

      //follow the instruction button
      if (
        pmouseX > 30 &&
        pmouseX < 30 + 360 &&
        pmouseY > 400 &&
        pmouseY < 400 + 150
      ) {
        pantallas = 4;
      }

      break;

    //Play interface
    case 2:
      image(imgPlay, 0, 0);

      //emit change display to homePlayer
      connectionButtons("HOMEPLAYER", 150, 420, 120, 80);

      //play button
      if (
        pmouseX > 150 &&
        pmouseX < 150 + 120 &&
        pmouseY > 420 &&
        pmouseY < 420 + 80
      ) {
        pantallas = 3;
      }

      break;

    //Home page player interfcae
    case 3:
      image(imgHome, 0, 0);

      //emit movement buttons
      movementButton("UP", windowWidth / 2, windowHeight / 3.6);
      movementButton("DOWN", windowWidth / 2, windowHeight / 1.38);
      movementButton("RIGHT", windowWidth / 1.3, windowHeight / 2);
      movementButton("LEFT", windowWidth / 4.5, windowHeight / 2);
      break;

    // left button
    case 4:
      image(imgGoLeft, 0, 0);

      //emit left movement button
      movementButton("LEFT", windowWidth / 4.5, windowHeight / 2);

      //emit change display to play
      connectionButtons("PLAY", 320, 30, 70, 25);

      //skip
      if (
        pmouseX > 320 &&
        pmouseX < 320 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      //change instruction screen
      if (dist(pmouseX, pmouseY, windowWidth / 4.5, windowHeight / 2) < 100) {
        pantallas = 5;
      }

      break;

    //rigth botton
    case 5:
      image(imgGoRight, 0, 0);

      //emit rigth movement button
      movementButton("RIGHT", windowWidth / 1.3, windowHeight / 2);

      //emit change display to play
      connectionButtons("PLAY", 320, 30, 70, 25);

      //skip
      if (
        pmouseX > 320 &&
        pmouseX < 320 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      //change instruction screen
      if (dist(pmouseX, pmouseY, windowWidth / 1.3, windowHeight / 2) < 100) {
        pantallas = 6;
      }

      break;

    //up button
    case 6:
      image(imgGoUp, 0, 0);

      //emit up movement button
      movementButton("UP", windowWidth / 2, windowHeight / 3.6);

      //emit change display to play
      connectionButtons("PLAY", 320, 30, 70, 25);

      //skip
      if (
        pmouseX > 320 &&
        pmouseX < 320 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      //change instruction screen
      if (dist(pmouseX, pmouseY, windowWidth / 2, windowHeight / 3.6) < 100) {
        pantallas = 7;
      }

      break;

    //down button
    case 7:
      image(imgGoDown, 0, 0);

      //emit down movement button
      movementButton("DOWN", windowWidth / 2, windowHeight / 1.38);

      //emit change display to play
      connectionButtons("PLAY", 155, 600, 100, 100);

      //skip
      if (
        pmouseX > 320 &&
        pmouseX < 320 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      //change instruction screen
      if (dist(pmouseX, pmouseY, windowWidth / 2, windowHeight / 1.38) < 100) {
        pantallas = 2;
      }

      break;

    //winner screen
    case 8:
      image(imgWinner, 0, 0);

      //reclaim coupon
      if (
        pmouseX > 270 &&
        pmouseX < 270 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 10;
      }

      break;

    //loser screen
    case 9:
      image(imgLoser, 0, 0);

      //emit change display to home again
      connectionButtons("PLAY", 290, 30, 70, 25);

      //change screen to home again
      if (
        pmouseX > 290 &&
        pmouseX < 290 + 70 &&
        pmouseY > 30 &&
        pmouseY < 30 + 25
      ) {
        pantallas = 2;
      }

      break;

    //form screen
    case 10:
      image(imgForm, 0, 0);

      //continue button
      if (
        pmouseX > 110 &&
        pmouseX < 110 + 200 &&
        pmouseY > 640 &&
        pmouseY < 640 + 50
      ) {
        pantallas = 11;
      }

      //inputs email-name
      emailInput.position(windowWidth / 8.5, windowHeight / 2.35);
      emailInput.size(314, 73);
      emailInput.input(emailInputEvent);

      userInput.position(windowWidth / 8.5, windowHeight / 1.7);
      userInput.size(314, 73);
      userInput.input(nameInputEvent);

      break;

    //coupon screen
    case 11:
      image(imgCoupon, 0, 0);

      emailInput.hide();
      userInput.hide();
      break;
  }
}

function nameInputEvent() {
  player.name = this.value();
}

function emailInputEvent() {
  player.email = this.value();
}

//emit character movements to display
function movementButton(directions, posX, posY) {
  noFill();
  ellipse(posX, posY, 100, 100);
  if (dist(pmouseX, pmouseY, posX, posY) < 50) {
    //Send the direction to the server
    socket.emit("directions", directions);
  }
}

//emit change of screens to display
function connectionButtons(display, buttonX, buttonY, width, height) {
  if (
    pmouseX > buttonX &&
    pmouseX < buttonX + width &&
    pmouseY > buttonY &&
    pmouseY < buttonY + height
  ) {
    socket.emit("display", display);
  }
}

//receive change of screens depending on player buttons
socket.on("displayPlayer", (changePlayer) => {
  switch (changePlayer) {
    case "WINNER":
      pantallas= 8;
      break;

    case "LOSER":
      pantallas = 9;
      break;
  }
});
