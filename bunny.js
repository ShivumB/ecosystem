
/*
  mutation format = [mutationChance, mutationVariabilityLow, mutationVariabilityHigh]

  mutation variability is a factor by which the trait
  is multiplied (if a mutation occurs)

  these are global variables so that all bunnies share the same mutation characteristics
*/

var bunnyDefaultSpeed = 1;
var bunnySpeedMutation = [0.4, 0.8, 1.2];

var bunnyDefaultSpeedCost = 0.005;
var bunnySpeedCostMutation = [0,1,1];

var bunnyDefaultVision = 120;
var bunnyVisionMutation = [0.4, 0.8, 1.2];

var bunnyDefaultVisionCost = 0.005 * 0.01;
var bunnyVisionCostMutation = [0,1,1];

var bunnyDefaultHungerCost = 0.01;
var bunnyHungerCostMutation = [0,1,1];

var bunnyDefaultThirstCost = 0.01;
var bunnyThirstCostMutation = [0,1,1];

var bunnyDefaultHungerFromFood = 2;
var bunnyHungerFromFoodMutation = [0,1,1];

var bunnyDefaultThirstFromWater = 0.5;
var bunnyThirstFromWaterMutation = [0,1,1];

var bunnyDefaultMaturityThreshold = 5;
var bunnyMaturityThresholdMutation = [0,1,1];

var bunnyDefaultOffspringReadiness = 0;
var bunnyOffspringReadinessMutation = [0,1,1];

var bunnyDefaultUrgeThreshold = 3;
var bunnyUrgeThresholdMutation = [0,1,1];

var bunnyDefaultReproductionCost = 5;
var bunnyReproductionCostMutation = [0,1,1];

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
        this.selectedFood = i;
      }
    }

  }

  distX = 0;
  distY = 0;
  if (this.selectedFood >= 0) {

    distX = carrots[this.selectedFood].x - this.x;
    distY = carrots[this.selectedFood].y - this.y;
  }

  if (this.selectedFood >= 0 && distX * distX + distY * distY < Math.pow(carrots[this.selectedFood].r + this.r, 2)) {

    carrots[this.selectedFood].alive = false;
    this.hunger = Math.max(0, this.hunger - this.hungerFromFood);

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
        this.selectedWater = i;
      }
    }

  }

  distX = 0;
  distY = 0;
  if (this.selectedWater >= 0) {
    distX = water[this.selectedWater].x - this.x;
    distY = water[this.selectedWater].y - this.y;
  }

  if (this.selectedWater >= 0 && distX * distX + distY * distY < Math.pow(water[this.selectedWater].r + this.r + 5, 2)) {

    this.thirst = Math.max(0, this.thirst - this.thirstFromWater);

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

    this.velX += Math.random() * 2 * this.speed - this.speed;
    this.velY += Math.random() * 2 * this.speed - this.speed;

  }

  this.frame++;
  this.frame %= 50;
}

Bunny.prototype.reproduce = function (bunnies) {


  this.selectedMate = -1;
  let minDist = 1000000;

  let distX = 0;
  let distY = 0;
  let mag = 0;
  for (let i = 0; i < bunnies.length; i++) {

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

  if (this.selectedMate >= 0) {
    distX = bunnies[this.selectedMate].x - this.x;
    distY = bunnies[this.selectedMate].y - this.y;
  }

  if (this.selectedMate >= 0 && distX * distX + distY * distY < Math.pow(this.r + bunnies[this.selectedMate].r, 2)) {

    this.urge = 0;
    bunnies[this.selectedMate].urge = 0;

    this.hunger += this.reproductionCost;
    bunnies[this.selectedMate].hunger += bunnies[this.selectedMate].reproductionCost;

    /*independent assortment

      NOTE - it might seem that you can just use this.VARIABLE instead of random genning.
      that may be faulty.
      the array order might not be random.
      
      so: this is to ensure randomness. name and sprite are not random.
      will see if this actually matters later
    */
    let speed = (Math.random() < 0.5) ? this.speed : bunnies[this.selectedMate].speed;
    let speedCost = (Math.random() < 0.5) ? this.speedCost : bunnies[this.selectedMate].speedCost;
    let vision = (Math.random() < 0.5) ? this.vision : bunnies[this.selectedMate].vision;
    let visionCost = (Math.random() < 0.5) ? this.visionCost : bunnies[this.selectedMate].visionCost;
    let hungerCost = (Math.random() < 0.5) ? this.hungerCost : bunnies[this.selectedMate].hungerCost;
    let thirstCost = (Math.random() < 0.5) ? this.thirstCost : bunnies[this.selectedMate].thirstCost;
    let hungerFromFood = (Math.random() < 0.5) ? this.hungerFromFood : bunnies[this.selectedMate].hungerFromFood;
    let thirstFromWater = (Math.random() < 0.5) ? this.thirstFromWater : bunnies[this.selectedMate].thirstFromWater;
    let maturityThreshold = (Math.random() < 0.5) ? this.maturityThreshold : bunnies[this.selectedMate].maturityThreshold;
    let offspringReadiness = (Math.random() < 0.5) ? this.offspringReadiness : bunnies[this.selectedMate].offspringReadiness;
    let urgeThreshold = (Math.random() < 0.5) ? this.urgeThreshold : bunnies[this.selectedMate].urgeThreshold;
    let reproductionCost = (Math.random() < 0.5) ? this.reproductionCost : bunnies[this.selectedMate].reproductionCost;

    addBunnyToArray(bunnies, this.x, this.y,
      speed, speedCost,
      vision, visionCost,
      hungerCost, thirstCost,
      hungerFromFood, thirstFromWater,
      maturityThreshold, offspringReadiness,
      urgeThreshold, reproductionCost,
      this.name, bunnies[this.selectedMate].spriteIndex);

    this.behavior = -1;

  } else if (this.selectedMate >= 0) {

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

Bunny.prototype.act = function (sprites, bunnies, foxes, carrots, water) {

  //BEFORE DOING ANYTHING, RUN COLLISIONS WITH BUNNIES
  let distX = 0;
  let distY = 0;
  let theta = 0;

  for (let i = 0; i < bunnies.length; i++) {
    if (bunnies[i] != this) {

      distX = bunnies[i].x - this.x;
      distY = bunnies[i].y - this.y;

      if (distX * distX + distY * distY < 2 * this.r * 2 * this.r) {

        theta = Math.atan2(distY, distX);

        this.velX -= this.speed * 0.25 * Math.cos(theta);
        this.velY -= this.speed * 0.25 * Math.sin(theta);
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
  fill(0);
  textSize(12);
  textAlign(CENTER);
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

  if (this.x < 0) this.x = 1200;
  if (this.x > 1200) this.x = 0;
  if (this.y < 0) this.y = 600;
  if (this.y > height) this.y = 0;

  this.hunger += this.hungerCost + this.speedCost * this.speed + this.visionCost * this.vision;
  this.thirst += this.thirstCost;

  this.urge += 0.01;
  this.maturity += 0.01;


  if (this.hunger > 20) this.alive = false;
  if (this.thirst > 20) this.alive = false;
}


function addBunnyToArray(arr, x, y, speed, speedCost, vision, visionCost, hungerCost, thirstCost, hungerFromFood, thirstFromWater, maturityThreshold, offspringReadiness, urgeThreshold, reproductionCost, name, spriteIndex) {

  arr.push(new Bunny(x, y, 

    (Math.random() < bunnySpeedMutation[0])? speed*random(bunnySpeedMutation[1], bunnySpeedMutation[2]) : speed,
    (Math.random() < bunnySpeedCostMutation[0])? speedCost*random(bunnySpeedCostMutation[1], bunnySpeedCostMutation[2]) : speedCost,

    (Math.random() < bunnyVisionMutation[0])? vision*random(bunnyVisionMutation[1], bunnyVisionMutation[2]) : vision,
    (Math.random() < bunnyVisionCostMutation[0])? visionCost*random(bunnyVisionCostMutation[1], bunnyVisionCostMutation[2]) : visionCost,

    (Math.random() < bunnyHungerCostMutation[0])? hungerCost*random(bunnyHungerCostMutation[1], bunnyHungerCostMutation[2]) : hungerCost,
    (Math.random() < bunnyThirstCostMutation[0])? thirstCost*random(bunnyThirstCostMutation[1], bunnyThirstCostMutation[2]) : thirstCost,

    (Math.random() < bunnyHungerFromFoodMutation[0])? hungerFromFood*random(bunnyHungerFromFoodMutation[1], bunnyHungerFromFoodMutation[2]) : hungerFromFood,
    (Math.random() < bunnyThirstFromWaterMutation[0])? thirstFromWater*random(bunnyThirstFromWaterMutation[1], bunnyThirstFromWaterMutation[2]) : thirstFromWater,

    (Math.random() < bunnyMaturityThresholdMutation[0])? maturityThreshold*random(bunnyMaturityThresholdMutation[1], bunnyMaturityThresholdMutation[2]) : maturityThreshold,
    (Math.random() < bunnyOffspringReadinessMutation[0])? offspringReadiness*random(bunnyOffspringReadinessMutation[1], bunnyOffspringReadinessMutation[2]) : offspringReadiness,

    (Math.random() < bunnyUrgeThresholdMutation[0])? urgeThreshold*random(bunnyUrgeThresholdMutation[1], bunnyUrgeThresholdMutation[2]) : urgeThreshold,
    (Math.random() < bunnyReproductionCostMutation[0])? reproductionCost*random(bunnyReproductionCostMutation[1], bunnyReproductionCostMutation[2]) : reproductionCost,

    name, spriteIndex));

}