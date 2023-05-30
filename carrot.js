function Carrot(x, y) {

    this.x = x;
    this.y = y;

    this.r = 15;

    this.alive = true;
}

Carrot.prototype.act = function(sprite) {

    if (this.alive) {
        image(sprite, this.x - 15, this.y - 15);
    }

}
