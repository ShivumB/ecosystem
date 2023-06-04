function Water(x, y, r) {
    this.x = x;
    this.y = y;
  
    this.r = r;
  }
  
  Water.prototype.act = function (sprite) {
    
    image(sprite, this.x - this.r, this.y - this.r, 2*this.r, 2*this.r);

  }