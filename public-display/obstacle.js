function Obstacle(img) {
  this.img= img;
  this.height = 70;
  this.y= height - this.height;
  this.x = width;
  this.width = 70;
  this.speed = 3;

  this.show = function () {
    image(this.img, this.x, this.y, this.width, this.height);
  };

  this.update = function () {
    this.x -= this.speed;
  };

  this.outOfScreen = function () {
    return this.x < -this.width ? true : false;
  };
}
