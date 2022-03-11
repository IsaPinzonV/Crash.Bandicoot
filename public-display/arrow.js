function Arrow(y) {
  this.y= y;
  this.x = 0;
  this.height = 20;
  this.width = 60;
  this.speed = 3;

  this.show = function () {
    image(imgArrow, this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    this.x += this.speed;
  };

  this.outOfScreen = function () {
    return this.x < -this.width ? true : false;
  };
}
