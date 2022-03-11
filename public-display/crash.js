function Crash(imgs) {
  this.currentImg=0;
  this.imgs = imgs
  this.size = 30;
  this.y = windowHeight / 2;
  this.x = 200;

  this.gravity = 0.7;
  this.velocity = 0;
  this.jump_height = 23;
  this.score = 0;

  this.show = function () {
    console.log(this.imgs);
    console.log(this.currentImg);
    image(this.imgs[this.currentImg], this.x, this.y, 100, 170);
  };

  this.update = function () {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y + this.size > height - 130) {
      this.y = height - 130 - this.size;
      this.velocity = 0;
    }
  };

  this.onBottom = function () {
    return this.y == height - this.size - 130;
  };

  this.jump = function () {
    this.velocity -= this.jump_height;
  };

  this.hits = function (enemy) {
    if (
      enemy.x >= this.x &&
      enemy.x <= this.x + 100 &&
      enemy.y >=this.y&&
      enemy.y <=this.y+170

    ) {
      return true;
    }else{
      return false;
    }
  };
}
