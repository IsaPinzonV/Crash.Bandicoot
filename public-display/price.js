function Price(img, x, y, width, height) {
  this.img = img;
  this.y = y;
  this.x = x;
  this.width = width;
  this.height = height;

  this.show = function () {
    image(this.img, this.x, this.y, this.width, this.height);
  };
}
