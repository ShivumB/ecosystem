function Water(x, y, sprite) {
    this.x = x;
    this.y = y;
  
    this.r = 150;

    this.sprite = sprite;
  }
  
  Water.prototype.act = function () {
    
    image(this.sprite, this.x - this.r, this.y - this.r, 2*this.r, 2*this.r);

  }