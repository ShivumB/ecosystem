function Fox(x, y, sprite, name, speed) {

    this.r = 15;

    this.x = x;
    this.y = y;

    this.velX = 0;
    this.velY = 0;

    this.speed = speed;
    this.vision = 100;

    this.hunger = 0;
    this.selectedFood = -1;

    this.thirst = 0;
    this.selectedWater = -1;

    this.urge = 0;
    this.maturity = 0;
    this.selectedFox = -1;

    this.behavior = -1;

    this.frame = 0;

    this.alive = true;

    this.sprite = sprite;

    this.name = name;

}

Fox.prototype.findFood = function (bunnies) {

    this.selectedFood = -1;
    let minDist = 1000000;

    for (let i = 0; i < bunnies.length; i++) {

        let distX = bunnies[i].x - this.x;
        let distY = bunnies[i].y - this.y;

        if (bunnies[i].alive && distX * distX + distY * distY < Math.pow(this.vision + bunnies[i].r, 2)) {

            if (distX * distX + distY * distY < minDist) {
                minDist = distX * distX + distY * distY;
                this.selectedFood = i;
            }
        }

    }

    let distX = 0;
    let distY = 0;
    if (this.selectedFood >= 0) {

        // fill(100, 0, 0);
        // stroke(0);
        // strokeWeight(1);
        // ellipse(bunnies[this.selectedFood].x, bunnies[this.selectedFood].y, 30, 30);

        distX = bunnies[this.selectedFood].x - this.x;
        distY = bunnies[this.selectedFood].y - this.y;
    }

    if (this.selectedFood >= 0 && distX * distX + distY * distY < Math.pow(bunnies[this.selectedFood].r + this.r, 2)) {

        bunnies[this.selectedFood].alive = false;
        this.hunger = Math.max(0, this.hunger - 10);

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

Fox.prototype.explore = function () {

    if (this.frame == 10) {

        this.velX += Math.random() * 2 - 1 + 0.001 * (width / 2 - this.x);
        this.velY += Math.random() * 2 - 1 + 0.001 * (height / 2 - this.y);

    }

    this.frame++;
    this.frame %= 50;
}

Fox.prototype.reproduce = function (foxes) {


    this.selectedFox = -1;
    let minDist = 1000000;

    let distX = 0;
    let distY = 0;
    for (let i = 0; i < foxes.length; i++) {

        if (foxes[i] == this) continue;

        distX = foxes[i].x - this.x;
        distY = foxes[i].y - this.y;

        if (foxes[i].maturity > 40 && foxes[i].urge > 40 && distX * distX + distY * distY < Math.pow(this.vision + foxes[i].r, 2)) {

            if (distX * distX + distY * distY < minDist) {
                minDist = distX * distX;
                this.selectedFox = i;
            }
        }
    }

    if (this.selectedFox >= 0) {
        distX = foxes[this.selectedFox].x - this.x;
        distY = foxes[this.selectedFox].y - this.y;
    }

    if (this.selectedFox >= 0 && distX * distX + distY * distY < Math.pow(this.r + foxes[this.selectedFox].r, 2)) {
        this.urge = 0;
        foxes[this.selectedFox].urge = 0;

        this.hunger += 5;
        foxes[this.selectedFox].hunger += 5;

        foxes.push(new Fox(this.x, this.y, this.sprite, this.name, (this.speed + foxes[this.selectedFox].speed) / 2));
        this.behavior = -1;
    } else if (this.selectedFox >= 0) {
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

    // 0 - find water, 1 - find food, 2 - reproduce, 3 - flee

    //not doing anything
    if (this.behavior == -1) {

        //first, check water - threshold of 20
        if (this.thirst > 5) {
            this.behavior = 0;

            //then, hunger - threshhold of 30
        } else if (this.hunger > 10) {
            this.behavior = 1;

            //then, reproduce
        } else if (this.maturity > 40 && this.urge > 40) {
            this.behavior = 2;
        }

        //if still doing nothing, then find water
        if (this.behavior == -1 && 2 * this.thirst > this.hunger && this.thirst > 0) {
            this.behavior = 0;
        } else if(this.behavior == -1 && this.hunger > 0) {
            this.behavior = 1;
        }

    }

}

Fox.prototype.act = function (bunnies, foxes, carrots, water) {


    if (!this.alive) {
        fill(255);
        ellipse(this.x, this.y, this.r * 2, this.r * 2);
        return;
    }

    this.decideBehavior(foxes);

    if (this.behavior == 0) {
        this.findWater(water);
    } else if (this.behavior == 1) {
        this.findFood(bunnies);
    } else if (this.behavior == 2) {
        this.reproduce(foxes);
    }


    //DISPLAY FOX
    noStroke();
    textSize(20);
    fill(0);

    textAlign(CENTER);

    // text("hunger: " + (30 - Math.floor(this.hunger)) + "\nthirst:" + (20 - Math.floor(this.thirst)), this.x, this.y - 40);

    // stroke(0);
    // strokeWeight(1);
    // fill(255, 0, 0, 100);
    // ellipse(this.x, this.y, this.vision * 2, this.vision * 2);

    // fill(255, 0, 0);
    // ellipse(this.x, this.y, 30, 30);

    image(this.sprite, this.x - 20, this.y - 20);

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

    //UPDATE STATUS
    if (this.velY < -this.speed) this.velY = -this.speed;
    if (this.velY > this.speed) this.velY = this.speed;
    if (this.velX < -this.speed) this.velX = -this.speed;
    if (this.velX > this.speed) this.velX = this.speed;

    this.x += this.velX;
    this.y += this.velY;

    if (this.x < 0) this.x = 0;
    if (this.x > 1200) this.x = 1200;
    if (this.y < 0) this.y = 0;
    if (this.y > height) this.y = height;

    this.hunger += 0.01 * this.speed;
    this.thirst += 0.01;

    this.urge += 0.01;
    this.maturity += 0.01;


    if (this.hunger > 20) this.alive = false;
    if (this.thirst > 20) this.alive = false;

}