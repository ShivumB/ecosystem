function Bunny(x, y, name, speed, vision, spriteIndex) {

  this.r = 15;

  this.x = x;
  this.y = y;

  this.velX = 0;
  this.velY = 0;

  this.speed = speed;
  this.vision = vision;

  this.hunger = 0;
  this.selectedFood = -1;

  this.thirst = 0;
  this.selectedWater = -1;

  this.urge = 0;
  this.maturity = 0;
  this.selectedBunny = -1;

  this.behavior = -1;

  this.frame = 0;

  this.alive = true;

  this.name = name;
  this.spriteIndex = spriteIndex;
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
    this.hunger = Math.max(0, this.hunger - 2);

    if (this.hunger < 5) this.behavior = -1;

  } else if (this.selectedFood >= 0) {

    //HUNTING
    let theta = Math.atan2(distY, distX);

    this.velX += 1 * Math.cos(theta);
    this.velY += 1 * Math.sin(theta);

  } else {
    this.explore();

    if (this.thirst > 15) this.behavior = 0;
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

    this.thirst = Math.max(0, this.thirst - 0.5);

    if (this.thirst < 10) this.behavior = -1;

  } else if (this.selectedWater >= 0) {

    let theta = Math.atan2(distY, distX);

    this.velX += 1 * Math.cos(theta);
    this.velY += 1 * Math.sin(theta);

  } else {
    this.explore();
  }
}

Bunny.prototype.explore = function () {

  if (this.frame == 10) {

    this.velX += Math.random() * 2*this.speed - this.speed;
    this.velY += Math.random() * 2*this.speed - this.speed;

  }

  this.frame++;
  this.frame %= 50;
}

Bunny.prototype.reproduce = function (bunnies) {


  this.selectedBunny = -1;
  let minDist = 1000000;

  let distX = 0;
  let distY = 0;
  for (let i = 0; i < bunnies.length; i++) {

    if (bunnies[i] == this) continue;

    distX = bunnies[i].x - this.x;
    distY = bunnies[i].y - this.y;

    let mag = distX * distX + distY * distY;

    if (bunnies[i].maturity > 5 && bunnies[i].urge > 3 && mag < Math.pow(this.vision + bunnies[i].r, 2)) {

      if (distX * distX + distY * distY < minDist) {
        minDist = distX * distX;
        this.selectedBunny = i;
      }

    }
  }

  if (this.selectedBunny >= 0) {
    distX = bunnies[this.selectedBunny].x - this.x;
    distY = bunnies[this.selectedBunny].y - this.y;
  }

  if (this.selectedBunny >= 0 && distX * distX + distY * distY < Math.pow(this.r + bunnies[this.selectedBunny].r, 2)) {

    this.urge = 0;
    bunnies[this.selectedBunny].urge = 0;

    this.hunger += 5;
    bunnies[this.selectedBunny].hunger += 5;

    let baseSpeed = (Math.random() < 0.5) ? this.speed : bunnies[this.selectedBunny].speed;
    let baseVision = (Math.random() < 0.5) ? this.vision : bunnies[this.selectedBunny].vision;

    //if random chance, then: anything from 0.99x to 1.01x
    if(Math.random() < 0.03) baseSpeed *= (0.99 + Math.random()*1.01);
    if(Math.random() < 0.03) baseVision *= (0.99 + Math.random()*1.01);

    //use name, sprite to keep track of lineage
    bunnies.push(new Bunny(this.x, this.y, this.name, baseSpeed, baseVision, bunnies[this.selectedBunny].spriteIndex));

    bunnies[this.selectedBunny].velX += 2;
    bunnies[this.selectedBunny].velY += 2;

    this.behavior = -1;

  } else if (this.selectedBunny >= 0) {
    let theta = Math.atan2(distY, distX);

    this.velX += 1 * Math.cos(theta);
    this.velY += 1 * Math.sin(theta);
  } else {
    this.explore();

    if (this.hunger > 10) this.behavior = 1;
    if (this.thirst > 10) this.behavior = 0;
  }
}

Bunny.prototype.flee = function (foxes) {

  this.behavior = -1;

  let distX = 0;
  let distY = 0;
  let mag = 0;

  for (let i = 0; i < foxes.length; i++) {

    distX = foxes[i].x - this.x;
    distY = foxes[i].y - this.y;

    if (distX * distX + distY * distY < Math.pow(this.vision + foxes[i].r, 2)) {
      let theta = Math.atan2(distY, distX);
      this.velX += -this.speed * Math.cos(theta);
      this.velY += -this.speed * Math.sin(theta);

      this.behavior = 3;
    }

  }

}

Bunny.prototype.decideBehavior = function (foxes) {

  // 0 - find water, 1 - find food, 2 - reproduce, 3 - flee

  //not doing anything
  if (this.behavior == -1) {

    //first, check water - threshold of 20
    if (this.thirst > 10) {
      this.behavior = 0;

      //then, hunger - threshhold of 20
    } else if (this.hunger > 10) {
      this.behavior = 1;

      //then, reproduce
    } else if (this.maturity > 5 && this.urge > 3) {
      this.behavior = 2;
    }

    //if still doing nothing, then choose based on what need the most
    if (this.behavior == -1 && this.thirst >= this.hunger) {
      this.behavior = 0;
    } else if (this.behavior == -1) {
      this.behavior = 1;
    }

  }

  //finish this behavior, then move on - set behavior to -1 in behavior methods to indicate its over
  //unless being hunted - then go into flight

  for (let i = 0; i < foxes.length; i++) {
    let distX = foxes[i].x - this.x;
    let distY = foxes[i].y - this.y;

    if (distX * distX + distY * distY < Math.pow(this.vision + foxes[i].r, 2)) {
      this.behavior = 3;
    }
  }


}

Bunny.prototype.act = function (sprites, bunnies, foxes, carrots, water) {

  //BEFORE DOING ANYTHING, RUN COLLISIONS WITH BUNNIES
  let distX = 0;
  let distY = 0;
  let theta = 0;

  for(let i = 0; i < bunnies.length; i++) {
    if(bunnies[i] != this) {

      distX = bunnies[i].x - this.x;
      distY = bunnies[i].y - this.y;

      if(distX * distX + distY * distY < 2*this.r*2*this.r) {

        theta = Math.atan2(distY, distX);
        
        this.velX -= this.speed*0.25*Math.cos(theta);
        this.velY -= this.speed*0.25*Math.sin(theta);
      }

    }
  }

  //THEN, UPDATE BEHAVIOR
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
  noStroke();
  textSize(15);
  fill(0);

  textSize(12);
  textAlign(CENTER);
  text(this.name, this.x, this.y - 22);

  image(sprites[this.spriteIndex], this.x - 15, this.y - 19);


  //RUN COLLISIONS WITH WATER
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

  if (this.velY < -this.speed) this.velY = -this.speed;
  if (this.velY > this.speed) this.velY = this.speed;
  if (this.velX < -this.speed) this.velX = -this.speed;
  if (this.velX > this.speed) this.velX = this.speed;

  this.x += this.velX;
  this.y += this.velY;

  if (this.x < 0) this.x = 1200;
  if (this.x > 1200) this.x = 0;
  if (this.y < 0) this.y = 600;
  if (this.y > height) this.y = 0;

  this.hunger += 0.005 + 0.005 * this.speed + 0.005 * 0.01 * this.vision;
  this.thirst += 0.01;

  this.urge += 0.01;
  this.maturity += 0.01;


  if (this.hunger > 20) this.alive = false;
  if (this.thirst > 20) this.alive = false;
}