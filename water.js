function Water(x, y) {
    this.x = x;
    this.y = y;
  
    this.r = 150;
  }
  
  Water.prototype.act = function (sprite) {
    
    image(sprite, this.x - this.r, this.y - this.r, 2*this.r, 2*this.r);

  }