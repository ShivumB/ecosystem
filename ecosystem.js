//global variables
var keys = [];

var bunnySprites = [];

var foxSprites = [];

var carrotSprite;

var waterSprite;

var grassSprite;

//simulation
function Ecosystem() {

    this.frame = 0;

    this.names = ["Abigal M", "Ahmed A", "Alex Y", "Andy S", "Claire M", "Claire S", "Diego T", "Dilan R", "Elisa J", "Ella F", "Emerson B", "Griffin T", "Hali D", "Hemza D", "Iliana G", "Ivy Q", "Jack P", "Jenna J", "Jenna N", "Jenna Z", "Kamran R", "Karina P", "Kimberly K", "Kiran G", "Laura S", "Lillian B", "Maddy B", "Marya H", "Neil K", "Nina T", "Noora H", "Prachi S", "Rianna A", "Rishab S", "Samiksha G", "Samita U", "Sarah G", "Shahaan S", "Sarah G", "Shivum B", "Sophia B", "Varun K", "Will R", "Zoe F"];

    this.water = [];

    this.carrots = [];
    this.carrotCap = 1000;
    this.carrotSpawnRate = 1;


    this.bunnies = [];

    /*
        variables are structured as follows:

         - value, then mutation chance, then mutation variability (low), then mutation variability (high)

    */
    this.bunnySpeed = [1, 0.4, 0.8, 1.2];
    this.bunnySpeedCost = [0.005, 0, 1, 1];

    this.bunnyVision = [120, 0.4, 0.8, 1.2];
    this.bunnyVisionCost = [0.005 * 0.01, 0, 1, 1];

    this.bunnyHungerCost = [0.01, 0, 1, 1];
    this.bunnyThirstCost = [0.01, 0, 1, 1];

    this.bunnyHungerFromFood = [2, 0, 1, 1];
    this.bunnyThirstFromWater = [0.5, 0, 1, 1];

    this.bunnyMaturityThreshold = [5, 0, 1, 1];
    this.bunnyOffspringReadiness = [0, 0, 1, 1];

    this.bunnyUrgeThreshold = [3, 0, 1, 1];
    this.bunnyReproductionCost = [5, 0, 1, 1];


    this.foxes = [];

    //settings for foxes
    this.foxSpeed = [1.9, 0.7, 0.8, 1.2];
    this.foxSpeedCost = [0.005, 0, 1, 1];

    this.foxVision = [100, 0.7, 0.8, 1.2];
    this.foxVisionCost = [0.005 * 0.01, 0, 1, 1];

    this.foxHungerCost = [0.01, 0, 1, 1];
    this.foxThirstCost = [0.01, 0, 1, 1];

    this.foxHungerFromFood = [15, 0, 1, 1];
    this.foxThirstFromWater = [0.5, 0, 1, 1];

    this.foxMaturityThreshold = [18, 0, 1, 1];
    this.foxOffspringReadiness = [0, 0, 1, 1];

    this.foxUrgeThreshold = [10, 0, 1, 1];
    this.foxReproductionCost = [5, 0, 1, 1];
}

Ecosystem.prototype.populate = function (water, carrotPop, bunnyPop, foxPop) {

    this.water = [];
    this.carrots = [];
    this.bunnies = [];
    this.foxes = [];

    
    for (let i = 0; i < water.length; i++) {
        this.water.push(new Water(water[i][0], water[i][1], water[i][2]));
    }

    for (let i = 0; i < carrotPop; i++) {

        let tempX = random(10, 1190);
        let tempY = random(10, 590);

        let passed = true;

        //check collisions with water
        for (let j = 0; j < this.water.length; j++) {

            let distX = tempX - this.water[j].x;
            let distY = tempY - this.water[j].y;

            //ASSUMING CARROT RADIUS IS 15
            if (distX * distX + distY * distY < Math.pow(15 + this.water[j].r, 2)) passed = false;
        }

        if (passed) this.carrots.push(new Carrot(tempX, tempY));
    }

    for (let i = 0; i < bunnyPop; i++) {
        addBunnyToArray(this.bunnies, this, random(10, 1190), random(10, 590),
            this.bunnySpeed[0], this.bunnySpeedCost[0],
            this.bunnyVision[0], this.bunnyVisionCost[0],
            this.bunnyHungerCost[0], this.bunnyThirstCost[0],
            this.bunnyHungerFromFood[0], this.bunnyThirstFromWater[0],
            this.bunnyMaturityThreshold[0], this.bunnyOffspringReadiness[0],
            this.bunnyUrgeThreshold[0], this.bunnyReproductionCost[0],
            this.names[Math.floor(random(0, this.names.length))], Math.floor(random(0, bunnySprites.length)));
    }

    for (let i = 0; i < foxPop; i++) {
        addFoxToArray(this.foxes, this, random(10, 1190), random(10, 590),
            this.foxSpeed[0], this.foxSpeedCost[0],
            this.foxVision[0], this.foxVisionCost[0],
            this.foxHungerCost[0], this.foxThirstCost[0],
            this.foxHungerFromFood[0], this.foxThirstFromWater[0],
            this.foxMaturityThreshold[0], this.foxOffspringReadiness[0],
            this.foxUrgeThreshold[0], this.foxReproductionCost[0],
            this.names[Math.floor(random(0, this.names.length))], Math.floor(random(0, foxSprites.length)));
    }
}

Ecosystem.prototype.act = function () {

    //background
    background(100, 100, 255);

    //fix this later in photoshop
    image(grassSprite, 0, 0);
    image(grassSprite, 1200, 0);


    for (let i = 0; i < this.carrots.length; i++) {
        this.carrots[i].act(carrotSprite);
    }

    for (let i = 0; i < this.water.length; i++) {
        this.water[i].act(waterSprite);
    }

    for (let i = 0; i < this.bunnies.length; i++) {
        this.bunnies[i].act(bunnySprites, this, this.bunnies, this.foxes, this.carrots, this.water);
    }

    for (let i = 0; i < this.foxes.length; i++) {
        this.foxes[i].act(foxSprites, this, this.bunnies, this.foxes, this.carrots, this.water);
    }

    //delete elements
    for (let i = this.carrots.length - 1; i >= 0; i--) {
        if (!this.carrots[i].alive) this.carrots.splice(i, 1);
    }

    for (let i = this.bunnies.length - 1; i >= 0; i--) {
        if (!this.bunnies[i].alive) {
            this.bunnies.splice(i, 1);
        }
    }

    for (let i = this.foxes.length - 1; i >= 0; i--) {
        if (!this.foxes[i].alive) {
            this.foxes.splice(i, 1);
        }
    }

    //gen new carrots
    if (this.carrots.length < this.carrotCap && this.frame % this.carrotSpawnRate == 0) {

        let tempX = Math.random() * (1350 - 20) + 10;
        let tempY = Math.random() * (600 - 20) + 10;

        let passed = true;
        for (let i = 0; i < this.water.length; i++) {
            let distX = tempX - this.water[i].x;
            let distY = tempY - this.water[i].y;

            //ASSUMING CARROT RADIUS IS 15
            if (distX * distX + distY * distY < Math.pow(15 + this.water[i].r, 2)) passed = false;
        }

        if (passed) this.carrots.push(new Carrot(tempX, tempY));;
    }

    this.frame++;
}

Ecosystem.prototype.loadFoxes = function (foxes) {

    for (let i = 0; i < foxes.length; i++) {

        let storage = foxes[i];

        let temp = new Fox(random(10, 1190), random(10, 590),
            foxSpeed[0], foxSpeedCost[0],
            foxVision[0], foxVisionCost[0],
            foxHungerCost[0], foxThirstCost[0],
            foxHungerFromFood[0], foxThirstFromWater[0],
            foxMaturityThreshold[0], foxOffspringReadiness[0],
            foxUrgeThreshold[0], foxReproductionCost[0],
            "bugged fox", 0);

        //state variables
        if (storage.r != null) temp.r = storage.r;

        if (storage.x != null) temp.x = storage.x;
        if (storage.y != null) temp.y = storage.y;

        if (storage.velX != null) temp.velX = storage.velX;
        if (storage.velY != null) temp.velY = storage.velY;

        if (storage.hunger != null) temp.hunger = storage.hunger;
        if (storage.selectedFood != null) temp.selectedFood = storage.selectedFood;

        if (storage.thirst != null) temp.thirst = storage.thirst;
        if (storage.selectedWater != null) temp.selectedWater = storage.selectedWater;

        if (storage.urge != null) temp.urge = storage.urge;
        if (storage.maturity != null) temp.maturity = storage.maturity;
        if (storage.selectedMate != null) temp.selectedMate = storage.selectedMate;

        if (storage.behavior != null) temp.behavior = storage.behavior;
        if (storage.frame != null) temp.frame = storage.frame;
        if (storage.alive != null) temp.alive = storage.alive;

        //inheritables
        if (storage.speed != null) temp.speed = storage.speed;
        if (storage.speedCost != null) temp.speedCost = storage.speedCost;

        if (storage.vision != null) temp.vision = storage.vision;
        if (storage.visionCost != null) temp.speed = storage.speed;

        if (storage.hungerCost != null) temp.speedCost = storage.speedCost;
        if (storage.thirstCost != null) temp.vision = storage.vision;

        if (storage.hungerFromFood != null) temp.speed = storage.speed;
        if (storage.thirstFromWater != null) temp.speedCost = storage.speedCost;

        if (storage.maturityThreshold != null) temp.vision = storage.vision;
        if (storage.offspringReadiness != null) temp.speed = storage.speed;

        if (storage.urgeThreshold != null) temp.speedCost = storage.speedCost;
        if (storage.reproductionCost != null) temp.vision = storage.vision;

        if (storage.name != null) temp.name = storage.name;
        if (storage.spriteIndex != null) temp.spriteIndex = storage.spriteIndex;

        this.foxes.push(temp);
    }

}

Ecosystem.prototype.loadBunnies = function (bunnies) {
    for (let i = 0; i < bunnies.length; i++) {

        let storage = bunnies[i];

        let temp = new Bunny(random(10, 1190), random(10, 590),
            bunnySpeed[0], bunnySpeedCost[0],
            bunnyVision[0], bunnyVisionCost[0],
            bunnyHungerCost[0], bunnyThirstCost[0],
            bunnyHungerFromFood[0], bunnyThirstFromWater[0],
            bunnyMaturityThreshold[0], bunnyOffspringReadiness[0],
            bunnyUrgeThreshold[0], bunnyReproductionCost[0],
            "bugged bunny", 0);

        //state variables
        if (storage.r != null) temp.r = storage.r;

        if (storage.x != null) temp.x = storage.x;
        if (storage.y != null) temp.y = storage.y;

        if (storage.velX != null) temp.velX = storage.velX;
        if (storage.velY != null) temp.velY = storage.velY;

        if (storage.hunger != null) temp.hunger = storage.hunger;
        if (storage.selectedFood != null) temp.selectedFood = storage.selectedFood;

        if (storage.thirst != null) temp.thirst = storage.thirst;
        if (storage.selectedWater != null) temp.selectedWater = storage.selectedWater;

        if (storage.urge != null) temp.urge = storage.urge;
        if (storage.maturity != null) temp.maturity = storage.maturity;
        if (storage.selectedMate != null) temp.selectedMate = storage.selectedMate;

        if (storage.behavior != null) temp.behavior = storage.behavior;
        if (storage.frame != null) temp.frame = storage.frame;
        if (storage.alive != null) temp.alive = storage.alive;

        //inheritables
        if (storage.speed != null) temp.speed = storage.speed;
        if (storage.speedCost != null) temp.speedCost = storage.speedCost;

        if (storage.vision != null) temp.vision = storage.vision;
        if (storage.visionCost != null) temp.speed = storage.speed;

        if (storage.hungerCost != null) temp.speedCost = storage.speedCost;
        if (storage.thirstCost != null) temp.vision = storage.vision;

        if (storage.hungerFromFood != null) temp.speed = storage.speed;
        if (storage.thirstFromWater != null) temp.speedCost = storage.speedCost;

        if (storage.maturityThreshold != null) temp.vision = storage.vision;
        if (storage.offspringReadiness != null) temp.speed = storage.speed;

        if (storage.urgeThreshold != null) temp.speedCost = storage.speedCost;
        if (storage.reproductionCost != null) temp.vision = storage.vision;

        if (storage.name != null) temp.name = storage.name;
        if (storage.spriteIndex != null) temp.spriteIndex = storage.spriteIndex;

        this.bunnies.push(temp);
    }
}