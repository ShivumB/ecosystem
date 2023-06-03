
/*
  mutation format = [mutationChance, mutationVariabilityLow, mutationVariabilityHigh]

  mutation variability is a factor by which the trait
  is multiplied (if a mutation occurs)

  these are global variables so that all bunnies share the same mutation characteristics
*/

var foxDefaultSpeed = 1.9;
var foxSpeedMutation = [0.7, 0.8, 1.2];

var foxDefaultSpeedCost = 0.005;
var foxSpeedCostMutation = [0, 1, 1];

var foxDefaultVision = 100;
var foxVisionMutation = [0.7, 0.8, 1.2];

var foxDefaultVisionCost = 0.005 * 0.01;
var foxVisionCostMutation = [0, 1, 1];

var foxDefaultHungerCost = 0.01;
var foxHungerCostMutation = [0, 1, 1];

var foxDefaultThirstCost = 0.01;
var foxThirstCostMutation = [0, 1, 1];

var foxDefaultHungerFromFood = 15;
var foxHungerFromFoodMutation = [0, 1, 1];

var foxDefaultThirstFromWater = 0.5;
var foxThirstFromWaterMutation = [0, 1, 1];

var foxDefaultMaturityThreshold = 18;
var foxMaturityThresholdMutation = [0, 1, 1];

var foxDefaultOffspringReadiness = 0;
var foxOffspringReadinessMutation = [0, 1, 1];

var foxDefaultUrgeThreshold = 10;
var foxUrgeThresholdMutation = [0, 1, 1];

var foxDefaultReproductionCost = 5;
var foxReproductionCostMutation = [0, 1, 1];

function Fox(x, y,
    speed, speedCost,
    vision, visionCost,
    hungerCost, thirstCost,
    hungerFromFood, thirstFromWater,
    maturityThreshold, offspringReadiness,
    urgeThreshold, reproductionCost,
    name, spriteIndex) {

    //calculate as if fox is circle
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

Fox.prototype.findFood = function (bunnies) {

    this.selectedFood = -1;
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;
    for (let i = 0; i < bunnies.length; i++) {

        distX = bunnies[i].x - this.x;
        distY = bunnies[i].y - this.y;
        mag = distX * distX + distY * distY;

        if (bunnies[i].alive && mag < Math.pow(this.vision + bunnies[i].r, 2)) {

            if (mag < minDist) {
                minDist = mag;
                this.selectedFood = i;
            }
        }

    }

    distX = 0;
    distY = 0;
    if (this.selectedFood >= 0) {

        distX = bunnies[this.selectedFood].x - this.x;
        distY = bunnies[this.selectedFood].y - this.y;
    }

    if (this.selectedFood >= 0 && distX * distX + distY * distY < Math.pow(bunnies[this.selectedFood].r + this.r, 2)) {

        bunnies[this.selectedFood].alive = false;
        this.hunger = Math.max(0, this.hunger - this.hungerFromFood);

        if (this.hunger < 5) this.behavior = -1;

    } else if (this.selectedFood >= 0) {

        let theta = Math.atan2(distY, distX);

        this.velX += 1 * Math.cos(theta);
        this.velY += 1 * Math.sin(theta);

    } else {
        this.explore();

        if (this.thirst > 15) this.behavior = 0;
    }
}

Fox.prototype.findWater = function (water) {

    this.selectedWater = -1;
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;
    for (let i = 0; i < water.length; i++) {

        let distX = water[i].x - this.x;
        let distY = water[i].y - this.y;
        mag = distX * distX + distY * distY;

        if (mag < Math.pow(this.vision + water[i].r, 2)) {

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

Fox.prototype.explore = function () {

    if (this.frame == 10) {
        this.velX += Math.random() * 2 * this.speed - this.speed;
        this.velY += Math.random() * 2 * this.speed - this.speed;
    }

    this.frame++;
    this.frame %= 50;
}

Fox.prototype.reproduce = function (foxes) {


    this.selectedMate = -1;
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    let mag = 0;
    for (let i = 0; i < foxes.length; i++) {

        if (foxes[i] == this) continue;

        distX = foxes[i].x - this.x;
        distY = foxes[i].y - this.y;
        mag = distX * distX + distY * distY;

        if (foxes[i].maturity > foxes[i].maturityThreshold && foxes[i].urge > foxes[i].urgeThreshold && mag < Math.pow(this.vision + foxes[i].r, 2)) {

            if (mag < minDist) {
                minDist = mag;
                this.selectedMate = i;
            }
        }
    }

    if (this.selectedMate >= 0) {
        distX = foxes[this.selectedMate].x - this.x;
        distY = foxes[this.selectedMate].y - this.y;
    }

    if (this.selectedMate >= 0 && distX * distX + distY * distY < Math.pow(this.r + foxes[this.selectedMate].r, 2)) {

        this.urge = 0;
        foxes[this.selectedMate].urge = 0;

        this.hunger += this.reproductionCost;
        foxes[this.selectedMate].hunger += foxes[this.selectedMate].reproductionCost;

        /*independent assortment

      NOTE - it might seem that you can just use this.VARIABLE instead of random genning.
      that may be faulty.
      the array order might not be random.
      
      so: this is to ensure randomness. name and sprite are not random.
      will see if this actually matters later
    */
        let speed = (Math.random() < 0.5) ? this.speed : foxes[this.selectedMate].speed;
        let speedCost = (Math.random() < 0.5) ? this.speedCost : foxes[this.selectedMate].speedCost;
        let vision = (Math.random() < 0.5) ? this.vision : foxes[this.selectedMate].vision;
        let visionCost = (Math.random() < 0.5) ? this.visionCost : foxes[this.selectedMate].visionCost;
        let hungerCost = (Math.random() < 0.5) ? this.hungerCost : foxes[this.selectedMate].hungerCost;
        let thirstCost = (Math.random() < 0.5) ? this.thirstCost : foxes[this.selectedMate].thirstCost;
        let hungerFromFood = (Math.random() < 0.5) ? this.hungerFromFood : foxes[this.selectedMate].hungerFromFood;
        let thirstFromWater = (Math.random() < 0.5) ? this.thirstFromWater : foxes[this.selectedMate].thirstFromWater;
        let maturityThreshold = (Math.random() < 0.5) ? this.maturityThreshold : foxes[this.selectedMate].maturityThreshold;
        let offspringReadiness = (Math.random() < 0.5) ? this.offspringReadiness : foxes[this.selectedMate].offspringReadiness;
        let urgeThreshold = (Math.random() < 0.5) ? this.urgeThreshold : foxes[this.selectedMate].urgeThreshold;
        let reproductionCost = (Math.random() < 0.5) ? this.reproductionCost : foxes[this.selectedMate].reproductionCost;

        addFoxToArray(foxes, this.x, this.y,
            speed, speedCost,
            vision, visionCost,
            hungerCost, thirstCost,
            hungerFromFood, thirstFromWater,
            maturityThreshold, offspringReadiness,
            urgeThreshold, reproductionCost,
            this.name, foxes[this.selectedMate].spriteIndex);


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

Fox.prototype.decideBehavior = function (foxes) {

    // 0 - find water, 1 - find food, 2 - reproduce

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

        //if still doing nothing, then find water
        if (this.behavior == -1 && this.thirst >= this.hunger) {
            this.behavior = 0;
        } else if (this.behavior == -1) {
            this.behavior = 1;
        }

    }

}

Fox.prototype.act = function (sprites, bunnies, foxes, carrots, water) {

    this.decideBehavior(foxes);

    if (this.behavior == 0) {
        this.findWater(water);
    } else if (this.behavior == 1) {
        this.findFood(bunnies);
    } else if (this.behavior == 2) {
        this.reproduce(foxes);
    }

    noStroke();
    fill(0);
    textSize(12);
    textAlign(CENTER);
    text(this.name, this.x, this.y - 22);

    image(sprites[this.spriteIndex], this.x - 20, this.y - 20);

    //RUN COLLISIONS
    let distX = 0;
    let distY = 0;
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

    //UPDATE STATUS
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

function addFoxToArray(arr, x, y, speed, speedCost, vision, visionCost, hungerCost, thirstCost, hungerFromFood, thirstFromWater, maturityThreshold, offspringReadiness, urgeThreshold, reproductionCost, name, spriteIndex) {

    arr.push(new Fox(x, y,

        (Math.random() < foxSpeedMutation[0]) ? speed * random(foxSpeedMutation[1], foxSpeedMutation[2]) : speed,
        (Math.random() < foxSpeedCostMutation[0]) ? speedCost * random(foxSpeedCostMutation[1], foxSpeedCostMutation[2]) : speedCost,

        (Math.random() < foxVisionMutation[0]) ? vision * random(foxVisionMutation[1], foxVisionMutation[2]) : vision,
        (Math.random() < foxVisionCostMutation[0]) ? visionCost * random(foxVisionCostMutation[1], foxVisionCostMutation[2]) : visionCost,

        (Math.random() < foxHungerCostMutation[0]) ? hungerCost * random(foxHungerCostMutation[1], foxHungerCostMutation[2]) : hungerCost,
        (Math.random() < foxThirstCostMutation[0]) ? thirstCost * random(foxThirstCostMutation[1], foxThirstCostMutation[2]) : thirstCost,

        (Math.random() < foxHungerFromFoodMutation[0]) ? hungerFromFood * random(foxHungerFromFoodMutation[1], foxHungerFromFoodMutation[2]) : hungerFromFood,
        (Math.random() < foxThirstFromWaterMutation[0]) ? thirstFromWater * random(foxThirstFromWaterMutation[1], foxThirstFromWaterMutation[2]) : thirstFromWater,

        (Math.random() < foxMaturityThresholdMutation[0]) ? maturityThreshold * random(foxMaturityThresholdMutation[1], foxMaturityThresholdMutation[2]) : maturityThreshold,
        (Math.random() < foxOffspringReadinessMutation[0]) ? offspringReadiness * random(foxOffspringReadinessMutation[1], foxOffspringReadinessMutation[2]) : offspringReadiness,

        (Math.random() < foxUrgeThresholdMutation[0]) ? urgeThreshold * random(foxUrgeThresholdMutation[1], foxUrgeThresholdMutation[2]) : urgeThreshold,
        (Math.random() < foxReproductionCostMutation[0]) ? reproductionCost * random(foxReproductionCostMutation[1], foxReproductionCostMutation[2]) : reproductionCost,

        name, spriteIndex));

}

function constructFoxFromStorage(storage) {

    let temp = new Fox(random(10, 1190), random(10, 590),
    foxDefaultSpeed, foxDefaultSpeedCost,
    foxDefaultVision, foxDefaultVisionCost,
    foxDefaultHungerCost, foxDefaultThirstCost,
    foxDefaultHungerFromFood, foxDefaultThirstFromWater,
    foxDefaultMaturityThreshold, foxDefaultOffspringReadiness,
    foxDefaultUrgeThreshold, foxDefaultReproductionCost,
    "bugged fox", 0);

    //state variables
    if(storage.r != null) temp.r = storage.r;

    if(storage.x != null) temp.x = storage.x;
    if(storage.y != null) temp.y = storage.y;

    if(storage.velX != null) temp.velX = storage.velX;
    if(storage.velY != null) temp.velY = storage.velY;
    
    if(storage.hunger != null) temp.hunger = storage.hunger;
    if(storage.selectedFood != null) temp.selectedFood = storage.selectedFood;

    if(storage.thirst != null) temp.thirst = storage.thirst;
    if(storage.selectedWater != null) temp.selectedWater = storage.selectedWater;

    if(storage.urge != null) temp.urge = storage.urge;
    if(storage.maturity != null) temp.maturity = storage.maturity;
    if(storage.selectedMate != null) temp.selectedMate = storage.selectedMate;

    if(storage.behavior != null) temp.behavior = storage.behavior;
    if(storage.frame != null) temp.frame = storage.frame;
    if(storage.alive != null) temp.alive = storage.alive;

    //inheritables
    if(storage.speed != null) temp.speed = storage.speed;
    if(storage.speedCost != null) temp.speedCost = storage.speedCost;

    if(storage.vision != null) temp.vision = storage.vision;
    if(storage.visionCost != null) temp.speed = storage.speed;

    if(storage.hungerCost != null) temp.speedCost = storage.speedCost;
    if(storage.thirstCost != null) temp.vision = storage.vision;

    if(storage.hungerFromFood != null) temp.speed = storage.speed;
    if(storage.thirstFromWater != null) temp.speedCost = storage.speedCost;

    if(storage.maturityThreshold != null) temp.vision = storage.vision;
    if(storage.offspringReadiness != null) temp.speed = storage.speed;

    if(storage.urgeThreshold != null) temp.speedCost = storage.speedCost;
    if(storage.reproductionCost != null) temp.vision = storage.vision;

    if(storage.name != null) temp.name = storage.name;
    if(storage.spriteIndex != null) temp.spriteIndex = storage.spriteIndex;

    return temp;
}