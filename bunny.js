function Bunny(x, y,
  speed, speedCost,
  vision, visionCost,
  hungerCost, thirstCost,
  hungerFromFood, thirstFromWater,
  maturityThreshold, offspringReadiness,
  urgeThreshold, reproductionCost,
  name, spriteIndex) {

  //pretend all bunnies are circles, this is the sprite radius
  this.r = 15;

  this.x = x;
  this.y = y;

  this.velX = 0;
  this.velY = 0;

  this.hunger = 0;
  this.selectedFood = -1;

  this.thirst = 0;
  this.selectedWater = -1;

  this.urge = 0;
  this.maturity = 0;
  this.selectedMate = -1;

  this.behavior = -1;
  this.frame = 0;
  this.alive = true;

  //variables are inherited
  this.speed = speed;
  this.speedCost = speedCost;

  this.vision = vision;
  this.visionCost = visionCost;

  this.hungerCost = hungerCost;
  this.thirstCost = thirstCost;

  this.hungerFromFood = hungerFromFood;
  this.thirstFromWater = thirstFromWater;

  this.maturityThreshold = maturityThreshold;
  this.offspringReadiness = offspringReadiness;

  this.urgeThreshold = urgeThreshold;
  this.reproductionCost = reproductionCost;

  this.name = name;
  this.spriteIndex = spriteIndex;
}

Bunny.prototype.findFood = function (carrots) {


  if(this.selectedFood == -1 || !this.selectedFood.alive) {

    this.selectedFood = -1;
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;
    for (let i = 0; i < carrots.length; i++) {

      distX = carrots[i].x - this.x;
      distY = carrots[i].y - this.y;
      mag = distX * distX + distY * distY;

      if (carrots[i].alive && mag < Math.pow(this.vision + carrots[i].r, 2)) {

        if (mag < minDist) {
          minDist = mag;
          this.selectedFood = carrots[i];
        }
      }

    }
  }

  distX = 0;
  distY = 0;
  if (this.selectedFood != -1) {

    distX = this.selectedFood.x - this.x;
    distY = this.selectedFood.y - this.y;
  }

  if (this.selectedFood != -1 && distX * distX + distY * distY < Math.pow(this.selectedFood.r + this.r, 2)) {

    this.selectedFood.alive = false;
    this.selectedFood = -1;
    this.hunger = Math.max(0, this.hunger - this.hungerFromFood);

    if (this.hunger < 5) this.behavior = -1;

  } else if (this.selectedFood != -1) {

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


  if(this.selectedWater == -1) {    
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;

    for (let i = 0; i < water.length; i++) {

      distX = water[i].x - this.x;
      distY = water[i].y - this.y;
      mag = distX * distX + distY * distY;

      if (mag< Math.pow(this.vision + water[i].r, 2)) {

        if (mag < minDist) {
          minDist = mag;
          this.selectedWater = water[i];
        }
      }

    }
  }

  distX = 0;
  distY = 0;
  if (this.selectedWater != -1) {
    distX = this.selectedWater.x - this.x;
    distY = this.selectedWater.y - this.y;
  }

  if (this.selectedWater != -1 && distX * distX + distY * distY < Math.pow(this.selectedWater.r + this.r + 5, 2)) {

    this.thirst = Math.max(0, this.thirst - this.thirstFromWater);

    if (this.thirst < 10) this.behavior = -1;
    this.selectedWater = -1;

  } else if (this.selectedWater != -1) {

    let theta = Math.atan2(distY, distX);

    this.velX += 1 * Math.cos(theta);
    this.velY += 1 * Math.sin(theta);

  } else {
    this.explore();
  }
}

Bunny.prototype.explore = function () {

  if (this.frame == 10) {

    this.velX += Math.random() * 2 * this.speed - this.speed;
    this.velY += Math.random() * 2 * this.speed - this.speed;

  }

  this.frame++;
  this.frame %= 50;
}

Bunny.prototype.reproduce = function (sim, bunnies) {


  if(this.selectedMate == -1 || !this.selectedMate.alive) {
    this.selectedMate = -1;

    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;
    for (let i = 0; i < bunnies.length && minDist; i++) {

      if (bunnies[i] == this) continue;

      distX = bunnies[i].x - this.x;
      distY = bunnies[i].y - this.y;
      mag = distX * distX + distY * distY;

      if (bunnies[i].maturity > bunnies[i].maturityThreshold && bunnies[i].urge > bunnies[i].urgeThreshold && mag < Math.pow(this.vision + bunnies[i].r, 2)) {

        if (mag < minDist) {
          minDist = mag;
          this.selectedMate = i;
        }

      }
    }
  }

  if (this.selectedMate != -1) {
    distX = this.selectedMate.x - this.x;
    distY = this.selectedMate.y - this.y;
  }

  if (this.selectedMate != -1 && distX * distX + distY * distY < Math.pow(this.r + this.selectedMate.r, 2)) {

    this.urge = 0;
    this.selectedMate.urge = 0;

    this.hunger += this.reproductionCost;
    this.selectedMate.hunger += this.selectedMate.reproductionCost;

    /*independent assortment

      NOTE - it might seem that you can just use this.VARIABLE instead of random genning.
      that may be faulty.
      the array order might not be random.
      
      so: this is to ensure randomness. name and sprite are not random.
      will see if this actually matters later
    */
    let speed = (Math.random() < 0.5) ? this.speed : this.selectedMate.speed;
    let speedCost = (Math.random() < 0.5) ? this.speedCost : this.selectedMate.speedCost;
    let vision = (Math.random() < 0.5) ? this.vision : this.selectedMate.vision;
    let visionCost = (Math.random() < 0.5) ? this.visionCost : this.selectedMate.visionCost;
    let hungerCost = (Math.random() < 0.5) ? this.hungerCost : this.selectedMate.hungerCost;
    let thirstCost = (Math.random() < 0.5) ? this.thirstCost : this.selectedMate.thirstCost;
    let hungerFromFood = (Math.random() < 0.5) ? this.hungerFromFood : this.selectedMate.hungerFromFood;
    let thirstFromWater = (Math.random() < 0.5) ? this.thirstFromWater : this.selectedMate.thirstFromWater;
    let maturityThreshold = (Math.random() < 0.5) ? this.maturityThreshold : this.selectedMate.maturityThreshold;
    let offspringReadiness = (Math.random() < 0.5) ? this.offspringReadiness : this.selectedMate.offspringReadiness;
    let urgeThreshold = (Math.random() < 0.5) ? this.urgeThreshold : this.selectedMate.urgeThreshold;
    let reproductionCost = (Math.random() < 0.5) ? this.reproductionCost : this.selectedMate.reproductionCost;

    addBunnyToArray(bunnies, sim, this.x, this.y,
      speed, speedCost,
      vision, visionCost,
      hungerCost, thirstCost,
      hungerFromFood, thirstFromWater,
      maturityThreshold, offspringReadiness,
      urgeThreshold, reproductionCost,
      this.name, this.selectedMate.spriteIndex);

    this.behavior = -1;
    this.selectedMate = -1;

  } else if (this.selectedMate != -1) {

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
    } else if (this.maturity > this.maturityThreshold && this.urge > this.urgeThreshold) {
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

Bunny.prototype.act = function (sprites, sim, bunnies, foxes, carrots, water) {

  //BEFORE DOING ANYTHING, RUN COLLISIONS WITH BUNNIES
  // let distX = 0;
  // let distY = 0;
  // let theta = 0;

  // for (let i = 0; i < bunnies.length; i++) {
  //   if (bunnies[i] != this) {

  //     distX = bunnies[i].x - this.x;
  //     distY = bunnies[i].y - this.y;

  //     if (distX * distX + distY * distY < 2 * this.r * 2 * this.r) {

  //       theta = Math.atan2(distY, distX);

  //       this.velX -= this.speed * 0.25 * Math.cos(theta);
  //       this.velY -= this.speed * 0.25 * Math.sin(theta);
  //     }

  //   }
  // }

  //THEN, UPDATE BEHAVIOR
  this.decideBehavior(foxes);

  if (this.behavior == 0) {
    this.findWater(water);
  } else if (this.behavior == 1) {
    this.findFood(carrots);
  } else if (this.behavior == 2) {
    this.reproduce(sim, bunnies);
  } else if (this.behavior == 3) {
    this.flee(foxes);
  }


  //DISPLAY BUNNY
  noStroke();
  fill(0);
  textSize(12);
  textAlign(CENTER, BASELINE);
  text(this.name, this.x, this.y - 22);

  image(sprites[this.spriteIndex], this.x - 15, this.y - 19);


  //RUN COLLISIONS WITH WATER
  distX = 0;
  distY = 0;
  let mag = 0;
  let sqrtMag = 0;

  for (let i = 0; i < water.length; i++) {

    distX = this.x - water[i].x;
    distY = this.y - water[i].y;

    mag = distX * distX + distY * distY;
    sqrtMag = Math.sqrt(mag);

    if (mag < (water[i].r + this.r) * (water[i].r + this.r)) {

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

  if (this.x < 0) this.x = 1350;
  if (this.x > 1350) this.x = 0;
  if (this.y < 0) this.y = 600;
  if (this.y > height) this.y = 0;

  this.hunger += this.hungerCost + this.speedCost * this.speed + this.visionCost * this.vision;
  this.thirst += this.thirstCost;

  this.urge += 0.01;
  this.maturity += 0.01;


  if (this.hunger > 20) this.alive = false;
  if (this.thirst > 20) this.alive = false;
}


function addBunnyToArray(arr, sim, x, y, speed, speedCost, vision, visionCost, hungerCost, thirstCost, hungerFromFood, thirstFromWater, maturityThreshold, offspringReadiness, urgeThreshold, reproductionCost, name, spriteIndex) {

  arr.push(new Bunny(x, y, 

    (Math.random() < sim.bunnySpeed[1])? speed*random(sim.bunnySpeed[2], sim.bunnySpeed[3]) : speed,
    (Math.random() < sim.bunnySpeedCost[1])? speedCost*random(sim.bunnySpeedCost[2], sim.bunnySpeedCost[3]) : speedCost,

    (Math.random() < sim.bunnyVision[1])? vision*random(sim.bunnyVision[2], sim.bunnyVision[3]) : vision,
    (Math.random() < sim.bunnyVisionCost[1])? visionCost*random(sim.bunnyVisionCost[2], sim.bunnyVisionCost[3]) : visionCost,

    (Math.random() < sim.bunnyHungerCost[1])? hungerCost*random(sim.bunnyHungerCost[2], sim.bunnyHungerCost[3]) : hungerCost,
    (Math.random() < sim.bunnyThirstCost[1])? thirstCost*random(sim.bunnyThirstCost[2], sim.bunnyThirstCost[3]) : thirstCost,

    (Math.random() < sim.bunnyHungerFromFood[1])? hungerFromFood*random(sim.bunnyHungerFromFood[2], sim.bunnyHungerFromFood[3]) : hungerFromFood,
    (Math.random() < sim.bunnyThirstFromWater[1])? thirstFromWater*random(sim.bunnyThirstFromWater[2], sim.bunnyThirstFromWater[3]) : thirstFromWater,

    (Math.random() < sim.bunnyMaturityThreshold[1])? maturityThreshold*random(sim.bunnyMaturityThreshold[2], sim.bunnyMaturityThreshold[3]) : maturityThreshold,
    (Math.random() < sim.bunnyOffspringReadiness[1])? offspringReadiness*random(sim.bunnyOffspringReadiness[2], sim.bunnyOffspringReadiness[3]) : offspringReadiness,

    (Math.random() < sim.bunnyUrgeThreshold[1])? urgeThreshold*random(sim.bunnyUrgeThreshold[2], sim.bunnyUrgeThreshold[3]) : urgeThreshold,
    (Math.random() < sim.bunnyReproductionCost[1])? reproductionCost*random(sim.bunnyReproductionCost[2], sim.bunnyReproductionCost[3]) : reproductionCost,

    name, spriteIndex));

}