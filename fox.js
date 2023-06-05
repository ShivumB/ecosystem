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
    this.selectedFood = null;

    this.thirst = 0;
    this.selectedWater = null;

    this.urge = 0;
    this.maturity = 0;
    this.selectedMate = null;

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


    if(this.selectedFood == null || !this.selectedMate.alive) {
        this.selectedFood = null;
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
                    this.selectedFood = bunnies[i];
                }
            }

        }
    }

    distX = 0;
    distY = 0;
    if (this.selectedFood != null) {

        distX = this.selectedFood.x - this.x;
        distY = this.selectedFood.y - this.y;
    }

    if (this.selectedFood != null && distX * distX + distY * distY < Math.pow(this.selectedFood.r + this.r, 2)) {

        this.selectedFood.alive = false;
        this.selectedFood = null;
        this.hunger = Math.max(0, this.hunger - this.hungerFromFood);

        if (this.hunger < 5) this.behavior = -1;

    } else if (this.selectedFood != null) {

        let theta = Math.atan2(distY, distX);

        this.velX += 1 * Math.cos(theta);
        this.velY += 1 * Math.sin(theta);

    } else {
        this.explore();

        if (this.thirst > 15) this.behavior = 0;
    }
}

Fox.prototype.findWater = function (water) {


    if(this.selectedWater == null) {
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
    }

    distX = 0;
    distY = 0;
    if (this.selectedWater != null) {
        distX = this.selectedWater.x - this.x;
        distY = this.selectedWater.y - this.y;
    }

    if (this.selectedWater != null && distX * distX + distY * distY < Math.pow(this.selectedWater.r + this.r + 5, 2)) {

        this.thirst = Math.max(0, this.thirst - this.thirstFromWater);

        this.selectedWater = null;

        if (this.thirst < 10) this.behavior = -1;
            

    } else if (this.selectedWater != null) {

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

Fox.prototype.reproduce = function (sim, foxes) {


    if(this.selectedMate == null || !this.selectedMate.alive) {
        this.selectedMate = null;
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
                    this.selectedMate = foxes[i];
                }
            }
        }
    }

    if (this.selectedMate != null) {
        distX = this.selectedMate.x - this.x;
        distY = this.selectedMate.y - this.y;
    }

    if (this.selectedMate >= 0 && distX * distX + distY * distY < Math.pow(this.r + this.selectedMate.r, 2)) {

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

        addFoxToArray(foxes, sim, this.x, this.y,
            speed, speedCost,
            vision, visionCost,
            hungerCost, thirstCost,
            hungerFromFood, thirstFromWater,
            maturityThreshold, offspringReadiness,
            urgeThreshold, reproductionCost,
            this.name, this.selectedMate.spriteIndex);

        this.selectedMate = null;
        this.behavior = -1;

    } else if (this.selectedMate != null) {
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

Fox.prototype.act = function (sprites, sim, bunnies, foxes, carrots, water) {

    this.decideBehavior(foxes);

    if (this.behavior == 0) {
        this.findWater(water);
    } else if (this.behavior == 1) {
        this.findFood(bunnies);
    } else if (this.behavior == 2) {
        this.reproduce(sim, foxes);
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

    if (this.x < 0) this.x = 350;
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

function addFoxToArray(arr, sim, x, y, speed, speedCost, vision, visionCost, hungerCost, thirstCost, hungerFromFood, thirstFromWater, maturityThreshold, offspringReadiness, urgeThreshold, reproductionCost, name, spriteIndex) {

    arr.push(new Fox(x, y,

        (Math.random() < sim.foxSpeed[1]) ? speed * random(sim.foxSpeed[2], sim.foxSpeed[3]) : speed,
        (Math.random() < sim.foxSpeedCost[1]) ? speedCost * random(sim.foxSpeedCost[2], sim.foxSpeedCost[3]) : speedCost,

        (Math.random() < sim.foxVision[1]) ? vision * random(sim.foxVision[2], sim.foxVision[3]) : vision,
        (Math.random() < sim.foxVisionCost[1]) ? visionCost * random(sim.foxVisionCost[2], sim.foxVisionCost[3]) : visionCost,

        (Math.random() < sim.foxHungerCost[1]) ? hungerCost * random(sim.foxHungerCost[2], sim.foxHungerCost[3]) : hungerCost,
        (Math.random() < sim.foxThirstCost[1]) ? thirstCost * random(sim.foxThirstCost[2], sim.foxThirstCost[3]) : thirstCost,

        (Math.random() < sim.foxHungerFromFood[1]) ? hungerFromFood * random(sim.foxHungerFromFood[2], sim.foxHungerFromFood[3]) : hungerFromFood,
        (Math.random() < sim.foxThirstFromWater[1]) ? thirstFromWater * random(sim.foxThirstFromWater[2], sim.foxThirstFromWater[3]) : thirstFromWater,

        (Math.random() < sim.foxMaturityThreshold[1]) ? maturityThreshold * random(sim.foxMaturityThreshold[2], sim.foxMaturityThreshold[3]) : maturityThreshold,
        (Math.random() < sim.foxOffspringReadiness[1]) ? offspringReadiness * random(sim.foxOffspringReadiness[2], sim.foxOffspringReadiness[3]) : offspringReadiness,

        (Math.random() < sim.foxUrgeThreshold[1]) ? urgeThreshold * random(sim.foxUrgeThreshold[2], sim.foxUrgeThreshold[3]) : urgeThreshold,
        (Math.random() < sim.foxReproductionCost[1]) ? reproductionCost * random(sim.foxReproductionCost[2], sim.foxReproductionCost[3]) : reproductionCost,

        name, spriteIndex));

}