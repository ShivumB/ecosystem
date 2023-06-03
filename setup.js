var bunnies;
var foxes;
var carrots;
var water;

var frame = 0;

var grassSprite;
var carrotSprite;
var bunnySprites;
var foxSprites;
var waterSPrite;

var chosenStat;

var selectedSpawnButton;
var keys;

var avgBunnySpeed = 0;
var topBunnySpeed = 0;
var avgBunnyVision = 0;
var topBunnyVision = 0;

var avgFoxSpeed = 0;
var topFoxSpeed = 0;
var avgFoxVision = 0;
var topFoxVision = 0;

//this is for when holding SPACE and spawning animals to prevent accidental spawning
//every 10 frames, if key, spawn
var spawnFrame;

var names;

function setup() {

    createCanvas(1350, 600);

    angleMode(DEGREES);

    clearStorage();

    selectedSpawnButton = 0;
    keys = [];
    keys[32] = false;

    grassSprite = loadImage("images/grass.png");
    carrotSprite = loadImage("images/carrot.png");

    bunnySprites = [];
    bunnySprites.push(loadImage("images/bunny.png"));
    bunnySprites.push(loadImage("images/bunny_rainbow.png"));
    bunnySprites.push(loadImage("images/bunny_trans.png"));

    foxSprites = [];
    foxSprites.push(loadImage("images/red_fox.png"));

    waterSprite = loadImage("images/water.png");

    names = ["Abigal M", "Ahmed A", "Alex Y", "Andy S", "Claire M", "Claire S", "Diego T", "Dilan R", "Elisa J", "Ella F", "Emerson B", "Griffin T", "Hali D", "Hemza D", "Iliana G", "Ivy Q", "Jack P", "Jenna J", "Jenna N", "Jenna Z", "Kamran R", "Karina P", "Kimberly K", "Kiran G", "Laura S", "Lillian B", "Maddy B", "Marya H", "Neil K", "Nina T", "Noora H", "Prachi S", "Rianna A", "Rishab S", "Samiksha G", "Samita U", "Sarah G", "Shahaan S", "Sarah G", "Shivum B", "Sophia B", "Varun K", "Will R", "Zoe F"];

    water = [];
    water.push(new Water(300, 300));
    water.push(new Water(900, 300));

    frame = getItem("TIME");
    if (frame == null) frame = 0;

    carrots = getItem("CARROTS");

    if (carrots == null) {
        carrots = [];
        for (let i = 0; i < 200; i++) {
            carrots.push(new Carrot(Math.random() * 1180 + 10, Math.random() * 580 + 10));

            for (let j = 0; j < water.length; j++) {
                let distX = carrots[i].x - water[j].x;
                let distY = carrots[i].y - water[j].y;

                if (distX * distX + distY * distY < Math.pow(carrots[i].r + water[j].r, 2)) {
                    carrots[i].alive = false;
                }
            }

        }
    } else {
        for (let i = 0; i < carrots.length; i++) {

            let temp = new Carrot(-10, -10);
            temp.x = carrots[i].x;
            temp.y = carrots[i].y;
            temp.r = carrots[i].r;
            temp.alive = carrots[i].alive;

            carrots[i] = temp;

        }
    }

    bunnies = getItem("BUNNIES");
    if (bunnies == null) {
        bunnies = [];
        for (let i = 0; i < 100; i++) {

            addBunnyToArray(bunnies, random(10, 1190), random(10, 590),
                bunnyDefaultSpeed, bunnyDefaultSpeedCost,
                bunnyDefaultVision, bunnyDefaultVisionCost,
                bunnyDefaultHungerCost, bunnyDefaultThirstCost,
                bunnyDefaultHungerFromFood, bunnyDefaultThirstFromWater,
                bunnyDefaultMaturityThreshold, bunnyDefaultOffspringReadiness,
                bunnyDefaultUrgeThreshold, bunnyDefaultReproductionCost,
                names[Math.floor(random(0, names.length + 1))], Math.floor(random(0, bunnySprites.length)));

        }

    }

    foxes = getItem("FOXES");
    if (foxes == null) {
        foxes = [];
        for (let i = 0; i < 4; i++) {

            addFoxToArray(foxes, random(10, 1190), random(10, 590),
                foxDefaultSpeed, foxDefaultSpeedCost,
                foxDefaultVision, foxDefaultVisionCost,
                foxDefaultHungerCost, foxDefaultThirstCost,
                foxDefaultHungerFromFood, foxDefaultThirstFromWater,
                foxDefaultMaturityThreshold, foxDefaultOffspringReadiness,
                foxDefaultUrgeThreshold, foxDefaultReproductionCost,
                names[Math.floor(random(0, names.length + 1))], Math.floor(random(0, foxSprites.length)));
        }
    }

    chosenStat = bunnies[0];
}

keyPressed = function () {
    keys[keyCode] = true;

    if (keyCode == 32) spawnFrame = 0;
}

keyReleased = function () {
    keys[keyCode] = false;
}

mouseClicked = function () {
    if (mouseX < 1200) {

        for (let i = 0; i < bunnies.length; i++) {
            if (mouseX > bunnies[i].x - 15 && mouseX < bunnies[i].x + 15 && mouseY > bunnies[i].y - 19 && mouseY < bunnies[i].y + 19) {
                chosenStat = bunnies[i];
            }
        }

        for (let i = 0; i < foxes.length; i++) {
            if (mouseX > foxes[i].x - 20 && mouseX < foxes[i].x + 20 && mouseY > foxes[i].y - 20 && mouseY < foxes[i].y + 20) {
                chosenStat = foxes[i];
            }
        }

    } else {

        if (mouseY > 200 & mouseY < 240) {
            clearStorage();
            setup();
        }

        if (mouseY > 550) {
            selectedSpawnButton = 1;
        } else if (mouseY > 500) {
            selectedSpawnButton = 0;
        }

    }
}