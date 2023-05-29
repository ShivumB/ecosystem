var bunnies;
var foxes;
var carrots;
var water;

var frame = 0;

var iteration = 0;

function Bunny(x, y) {

  this.r = 15;

  this.x = x;
  this.y = y;

  this.velX = 0;
  this.velY = 0;

  this.accelX = 0;
  this.accelY = 0;

  this.speed = 1;
  this.vision = 100;

  this.hunger = 0;
  this.selectedFood = -1;

  this.thirst = 0;
  this.selectedWater = -1;

  this.urge = 0;

  this.behavior = -1;

  this.frame = 0;

}

Bunny.prototype.findFood = function (carrots) {

  this.selectedFood = -1;
  let minDist = 1000000;

  for (let i = 0; i < carrots.length; i++) {

    let distX = carrots[i].x - this.x;
    let distY = carrots[i].y - this.y;

    if (carrots[i].alive && distX * distX + distY * distY < Math.pow(this.vision + carrots[i].r, 2)) {

      if (distX * distX + distY * distY < minDist) {
        minDist = distX * distX + distY * distY;
        this.selectedFood = i;
      }
    }

  }

  let distX = 0;
  let distY = 0;
  if (this.selectedFood >= 0) {
    distX = carrots[this.selectedFood].x - this.x;
    distY = carrots[this.selectedFood].y - this.y;
  }

  if (this.selectedFood >= 0 && distX * distX + distY * distY < Math.pow(carrots[this.selectedFood].r + this.r, 2)) {
    carrots[this.selectedFood].alive = false;
    this.hunger = Math.max(0, this.hunger - 5);

    if (this.hunger < 5) this.behavior = -1;

  } else if (this.selectedFood >= 0) {

    let xDist = (carrots[this.selectedFood].x - this.x);
    let yDist = (carrots[this.selectedFood].y - this.y);
    let mag = Math.sqrt(xDist * xDist + yDist * yDist);

    this.x += 1 * (carrots[this.selectedFood].x - this.x) / mag;
    this.y += 1 * (carrots[this.selectedFood].y - this.y) / mag;

  } else {
    this.explore();
  }
}

Bunny.prototype.findWater = function (water) {

  this.selectedWater = -1;
  let minDist = 1000000;

  for (let i = 0; i < water.length; i++) {

    let distX = water[i].x - this.x;
    let distY = water[i].y - this.y;

    if (distX * distX + distY * distY < Math.pow(this.vision + water[i].r, 2)) {



      if (distX * distX + distY * distY < minDist) {
        minDist = distX * distX + distY * distY;
        this.selectedWater = i;
      }
    }

  }

  let distX = 0;
  let distY = 0;
  if (this.selectedWater >= 0) {
    distX = water[this.selectedWater].x - this.x;
    distY = water[this.selectedWater].y - this.y;
  }

  if (this.selectedWater >= 0 && distX * distX + distY * distY < Math.pow(water[this.selectedWater].r + this.r + 5, 2)) {

    this.thirst = Math.max(0, this.thirst - 5);

    if (this.thirst < 10) this.behavior = -1;

  } else if (this.selectedWater >= 0) {

    let xDist = (water[this.selectedWater].x - this.x);
    let yDist = (water[this.selectedWater].y - this.y);
    let mag = Math.sqrt(xDist * xDist + yDist * yDist);

    this.x += 1 * (water[this.selectedWater].x - this.x) / mag;
    this.y += 1 * (water[this.selectedWater].y - this.y) / mag;

  } else {
    this.explore();
  }
}

Bunny.prototype.explore = function () {

  if (this.frame == 10) {

    this.accelX = Math.random() * 1 - 0.5;
    this.accelY = Math.random() * 1 - 0.5;

  }

  this.frame++;
  this.frame %= 20;

  this.behavior = -1;

}

Bunny.prototype.reproduce = function (bunnies) {

}

Bunny.prototype.flee = function (foxes) {

}

Bunny.prototype.decideBehavior = function (foxes) {

  // 0 - find water, 1 - find food, 2 - reproduce, 3 - flee

  //not doing anything
  if (this.behavior == -1) {

    //first, check water
    if (this.thirst > 20) {
      this.behavior = 0;
    } else if (this.hunger > 10) {
      this.behavior = 1;
    } else if (this.urge > 10) {
      this.behavior = 2;
    }

  } else {
    //finish this behavior, then move on - set behavior to -1 in behavior methods to indicate its over
    //unless being hunted - then go into flight

    for (let i = 0; i < foxes.length; i++) {
      let distX = foxes[i].x - this.x;
      let distY = foxes[i].y - this.y;

      if (distX * distX + distY * distY < this.vision * this.vision) {
        this.behavior = 4;
      }
    }


  }

}

Bunny.prototype.act = function (bunnies, foxes, carrots, water) {


  this.decideBehavior(foxes);

  if (this.behavior == 0) {
    this.findWater(water);
  } else if (this.behavior == 1) {
    this.findFood(carrots);
  } else if (this.behavior == 2) {
    this.reproduce(bunnies);
  } else if (this.behavior == 3) {
    this.flee(foxes);
  }


  //DISPLAY BUNNY
  textSize(20);
  fill(255, 100);
  rect(this.x, this.y - 20, 40, 20);
  fill(0);
  text("hunger: " + Math.floor(this.hunger) + ", thirst:" + Math.floor(this.thirst) + ", found food: " + this.selectedFood + ", found water: " + this.selectedWater + ", behavior: " + this.behavior, this.x, this.y - 20);

  fill(255, 255, 0);
  ellipse(this.x, this.y, 30, 30);

  //RUN COLLISIONS
  for (let i = 0; i < water.length; i++) {

    let distX = this.x - water[i].x;
    let distY = this.y - water[i].y;

    let mag = distX * distX + distY * distY;
    let sqrtMag = Math.sqrt(mag);

    if (distX * distX + distY * distY < (water[i].r + this.r) * (water[i].r + this.r)) {

      this.x = water[i].x + distX / sqrtMag * (water[i].r + this.r);
      this.y = water[i].y + distY / sqrtMag * (water[i].r + this.r);

    }
  }

  //UPDATE POSITION
  this.velX += this.accelX;
  this.velY += this.accelY;

  if (this.velY < -this.speed) this.velY = -this.speed;
  if (this.velY > this.speed) this.velY = this.speed;
  if (this.velX < -this.speed) this.velX = -this.speed;
  if (this.velX > this.speed) this.velX = this.speed;

  this.x += this.velX;
  this.y += this.velY;

  if (this.x < 0) this.x = 0;
  if (this.x > width) this.x = width;
  if (this.y < 0) this.y = 0;
  if (this.y > height) this.y = height;

  this.hunger += 0.01;
  this.thirst += 0.05;
}

function Carrot(x, y) {

  this.x = x;
  this.y = y;

  this.r = 15;

  this.alive = true;
}

Carrot.prototype.act = function () {

  if (this.alive) {
    fill(0, 9, 0);
    ellipse(this.x, this.y, 30, 30);
  }

}

function Water(x, y) {
  this.x = x;
  this.y = y;

  this.r = 150;
}

Water.prototype.act = function () {
  fill(0, 255, 255);
  ellipse(this.x, this.x, 2 * this.r, 2 * this.r);
}

function setup() {

  angleMode(DEGREES);

  water = [];
  water.push(new Water(300, 300));
  //water.push(new Water(900, 300));

  carrots = [];
  for (let i = 0; i < 100; i++) {
    carrots.push(new Carrot(Math.random() * 1180 + 10, Math.random() * 580 + 10));

    let cool = false;

    while (!cool) {

      cool = true;
      for (let j = 0; j < water.length; j++) {
        let distX = carrots[i].x - water[j].x;
        let distY = carrots[i].y - water[j].y;

        if (distX * distX + distY * distY < Math.pow(carrots[i].r + water[j].r, 2)) {
          this.x = Math.random() * 1180 + 10;
          this.y = Math.random() * 580 + 10;
          cool = false;
        }
      }

    }
  }

  bunnies = [];
  for (let i = 0; i < 2; i++) {
    bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10));
  }

  foxes = [];

  createCanvas(1200, 600);

}

function draw() {

  background(100, 255, 100);

  for (let i = 0; i < carrots.length; i++) {
    carrots[i].act();
  }

  for (let i = 0; i < water.length; i++) {
    water[i].act();
  }

  for (let i = 0; i < bunnies.length; i++) {
    bunnies[i].act(bunnies, foxes, carrots, water);
  }


}
