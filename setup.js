var sim;
var titleSim;

var scene;

//INPUTS
var bunnyInputs;
var bunnyPage;

var foxInputs;
var foxPage;

var carrotCapInput;
var carrotSpawnRateInput;

var inputLabels;

//STATS
var showStats;
var statsPage;
var statsSelect;

var openStatsSprite0;
var openStatsSprite1;
var closeStatsSprite;

var foxIconSprite;
var bunnyIconSprite;

var statsX = 1050;
var statsLabels;

//SETTINGS
var settingsSprite;
var settingsTheta;

//ADD BUNNY/FOX
var spawnFrame;

function setup() {

    createCanvas(1350, 600);
    angleMode(DEGREES);
    textFont(loadFont("fonts/VT323/VT323-Regular.ttf"));

    scene = "title";

    showStats = false;
    statsPage = 0;
    statsSelect = 0;
    openStatsSprite0 = loadImage("images/stats0.png");
    openStatsSprite1 = loadImage("images/stats1.png");
    closeStatsSprite = loadImage("images/close.png");

    foxIconSprite = loadImage("images/fox_red_BIG.png");
    bunnyIconSprite = loadImage("images/bunny_BIG.png");

    statsLabels = [
        "speed:", "speed cost:",
        "vision:", "vision cost:",
        "hunger cost:", "thirst cost:",
        "hunger from food:", "thirst from water:",
        "maturity thresh.:", "offspring readiness:",
        "reprod. urge thresh.:", "reprod. cost:"
    ];

    settingsSprite = loadImage("images/settings.png");
    settingsTheta = 0;

    spawnFrame = 0;

    bunnyInputs = [];
    bunnyPage = 0;

    for (i = 0; i < 6; i++) {

        //VARIABLES, 1
        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 0].position(385, 150);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 1].position(385, 190);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 2].position(300, 230);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 3].position(385, 230);

        //VARIABLES, 2
        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 4].position(385, 350);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 5].position(385, 390);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 6].position(300, 430);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 7].position(385, 430);
    }

    for (let i = 0; i < bunnyInputs.length; i++) {
        bunnyInputs[i].addClass("textbox");
        bunnyInputs[i].addClass("hidden");
        bunnyInputs[i].attribute("type", "number");
    }

    foxInputs = [];
    foxPage = 0;

    for (i = 0; i < 6; i++) {
        //VARIABLES, 1
        foxInputs.push(createInput());
        foxInputs[i * 8 + 0].position(385 + 450, 150);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 1].position(385 + 450, 190);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 2].position(300 + 450, 230);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 3].position(385 + 450, 230);

        //VARIABLES, 2
        foxInputs.push(createInput());
        foxInputs[i * 8 + 4].position(385 + 450, 350);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 5].position(385 + 450, 390);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 6].position(300 + 450, 430);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 7].position(385 + 450, 430);
    }

    for (let i = 0; i < foxInputs.length; i++) {
        foxInputs[i].addClass("textbox");
        foxInputs[i].addClass("hidden");
        foxInputs[i].attribute("type", "number");
    }

    inputLabels = [
        "speed:", "speed cost:",
        "vision:", "vision cost:",
        "hunger cost:", "thirst cost:",
        "hunger from food:", "thirst from water:",
        "maturity threshold:", "offspring readiness:",
        "reproduction urge threshold:", "reproduction cost:"
    ];

    //carrot inputs
    carrotCapInput = createInput();
    carrotCapInput.position(1240, 120);
    carrotCapInput.attribute("type", "number");
    carrotCapInput.addClass("textbox");
    carrotCapInput.addClass("hidden");

    carrotSpawnRateInput = createInput();
    carrotSpawnRateInput.position(1240, 160);
    carrotSpawnRateInput.attribute("type", "number");
    carrotSpawnRateInput.addClass("textbox");
    carrotSpawnRateInput.addClass("hidden");


    //LOAD SPRITES
    bunnySprites.push(loadImage("images/bunny.png"));
    bunnySprites.push(loadImage("images/bunny_rainbow.png"));
    bunnySprites.push(loadImage("images/bunny_trans.png"));


    foxSprites.push(loadImage("images/fox_red.png"));
    foxSprites.push(loadImage("images/fox_lesbian.png"));


    carrotSprite = loadImage("images/carrot.png");

    waterSprite = loadImage("images/water.png");

    grassSprite = loadImage("images/grass.png");

    //MAKE SIM
    sim = new Ecosystem();

    //PUT DEFAULT SIM VALUES INTO INPUTS
    for (let i = 0; i < 4; i++) {

        //BUNNIES
        bunnyInputs[4 * 0 + i].value(sim.bunnySpeed[i]);
        bunnyInputs[4 * 1 + i].value(sim.bunnySpeedCost[i]);

        bunnyInputs[4 * 2 + i].value(sim.bunnyVision[i]);
        bunnyInputs[4 * 3 + i].value(sim.bunnyVisionCost[i]);

        bunnyInputs[4 * 4 + i].value(sim.bunnyHungerCost[i]);
        bunnyInputs[4 * 5 + i].value(sim.bunnyThirstCost[i]);

        bunnyInputs[4 * 6 + i].value(sim.bunnyHungerFromFood[i]);
        bunnyInputs[4 * 7 + i].value(sim.bunnyThirstFromWater[i]);

        bunnyInputs[4 * 8 + i].value(sim.bunnyMaturityThreshold[i]);
        bunnyInputs[4 * 9 + i].value(sim.bunnyOffspringReadiness[i]);

        bunnyInputs[4 * 10 + i].value(sim.bunnyUrgeThreshold[i]);
        bunnyInputs[4 * 11 + i].value(sim.bunnyReproductionCost[i]);


        //FOXES
        foxInputs[4 * 0 + i].value(sim.foxSpeed[i]);
        foxInputs[4 * 1 + i].value(sim.foxSpeedCost[i]);

        foxInputs[4 * 2 + i].value(sim.foxVision[i]);
        foxInputs[4 * 3 + i].value(sim.foxVisionCost[i]);

        foxInputs[4 * 4 + i].value(sim.foxHungerCost[i]);
        foxInputs[4 * 5 + i].value(sim.foxThirstCost[i]);

        foxInputs[4 * 6 + i].value(sim.foxHungerFromFood[i]);
        foxInputs[4 * 7 + i].value(sim.foxThirstFromWater[i]);

        foxInputs[4 * 8 + i].value(sim.foxMaturityThreshold[i]);
        foxInputs[4 * 9 + i].value(sim.foxOffspringReadiness[i]);

        foxInputs[4 * 10 + i].value(sim.foxUrgeThreshold[i]);
        foxInputs[4 * 11 + i].value(sim.foxReproductionCost[i]);
    }

    carrotCapInput.value(sim.carrotCap);
    carrotSpawnRateInput.value(sim.carrotSpawnRate);


    //TITLE SIM (so the title screen looks nice!)
    titleSim = new Ecosystem();
    titleSim.bunnySpeed = [0.7, 0.5, 0.5, 1.5];
    titleSim.bunnySpeedCost[0] = 0;

    titleSim.bunnyVision[0] = 1000;
    titleSim.bunnyVisionCost[0] = 0;

    titleSim.bunnyHungerCost[0] = 0.005;
    titleSim.bunnyThirstCost[0] = 0;

    titleSim.bunnyMaturityThreshold[0] = 10;
    titleSim.bunnyUrgeThreshold[0] = 10;

    titleSim.carrotSpawnRate = 50;
    titleSim.carrotCap = 150;

    titleSim.populate([[150, 150, 75], [1050, 450, 125]], 100, 2, 0);
}

keyPressed = function () {
    keys[keyCode] = true;
}

keyReleased = function () {
    keys[keyCode] = false;
}

mouseClicked = function () {
    switch (scene) {

        case "title":

            //create simulation
            if (mouseX > 475 && mouseX < 475 + 400 && mouseY > 300 && mouseY < 300 + 75) {
                scene = "create";
            }

            //load simulation
            if (mouseX > 475 && mouseX < 475 + 400 && mouseY > 400 && mouseY < 400 + 75) {

            }
            break;

        case "create":

            if (mouseX > 340 && mouseX < 340 + 30 && mouseY > 510 && mouseY < 510 + 30) bunnyPage = (bunnyPage + 1) % 6;
            if (mouseX > 160 && mouseX < 160 + 30 && mouseY > 510 && mouseY < 510 + 30) bunnyPage = (bunnyPage + 6 - 1) % 6;
            
            if (mouseX > 790 && mouseX < 790 + 30 && mouseY > 510 && mouseY < 510 + 30) foxPage = (foxPage + 1) % 6;
            if (mouseX > 610 && mouseX < 610 + 30 && mouseY > 510 && mouseY < 510 + 30) foxPage = (foxPage + 6 - 1) % 6;
            

            if (mouseX > 950 && mouseX < 950 + 350 && mouseY > 500 && mouseY < 500 + 50) {
                updateSimFromInputs(sim);
                sim.populate([[300, 300, 150], [900, 300, 150]], sim.carrotCap, 100, 4);

                for (let i = 0; i < bunnyInputs.length; i++) {
                    bunnyInputs[i].addClass("hidden");
                    foxInputs[i].addClass("hidden");

                    carrotCapInput.addClass("hidden");
                    carrotSpawnRateInput.addClass("hidden");
                }

                scene = "game";
            }

            break;


        case "game":
            if (!showStats && mouseX > 1290 && mouseX < 1290 + 40 && mouseY > 20 && mouseY < 20 + 40) {
                showStats = true;
            }

            if (showStats) {
                if (mouseX > (statsX + 10) && mouseX < (statsX + 10) + 20 && mouseY > 10 && mouseY < 10 + 20) {
                    showStats = false;
                }
                if (mouseX > (statsX + 20) && mouseX < (statsX + 20) + 130 && mouseY > 450 && mouseY < 450 + 130) {
                    statsSelect = 0;
                    statsPage = 0;
                }
                if (mouseX > (statsX + 150) && mouseX < (statsX + 150) + 130 && mouseY > 450 && mouseY < 450 + 130) {
                    statsSelect = 1;
                    statsPage = 0;
                }
                if (mouseX > (statsX + 196) && mouseX < (statsX + 196) + 20 && mouseY > 322 && mouseY < 322 + 20) {
                    statsPage = (statsPage + 1) % 6;
                }
                if (mouseX > (statsX + 83) && mouseX < (statsX + 83) + 20 && mouseY > 322 && mouseY < 322 + 20) {
                    statsPage = (statsPage + 6 - 1) % 6;
                }
            }

            if (mouseX > 20 && mouseX < 60 && mouseY > 20 && mouseY < 60) {
                scene = "settings";
            }

            image(closeStatsSprite, statsX + 10, 10, 20, 20);
            break;

        case "settings":
            if (mouseX > 340 && mouseX < 340 + 30 && mouseY > 510 && mouseY < 510 + 30) bunnyPage = (bunnyPage + 1) % 6;
            if (mouseX > 160 && mouseX < 160 + 30 && mouseY > 510 && mouseY < 510 + 30) bunnyPage = (bunnyPage + 6 - 1) % 6;

            if (mouseX > 790 && mouseX < 790 + 30 && mouseY > 510 && mouseY < 510 + 30) foxPage = (foxPage + 1) % 6;
            if (mouseX > 610 && mouseX < 610 + 30 && mouseY > 510 && mouseY < 510 + 30) foxPage = (foxPage + 6 - 1) % 6;

            if (mouseX > 950 && mouseX < 950 + 350 && mouseY > 500 && mouseY < 500 + 50) {
                updateSimFromInputs(sim);

                for (let i = 0; i < bunnyInputs.length; i++) {
                    bunnyInputs[i].addClass("hidden");
                    foxInputs[i].addClass("hidden");

                    carrotCapInput.addClass("hidden");
                    carrotSpawnRateInput.addClass("hidden");
                }

                scene = "game";
            }
            break;
    }
}

function updateSimFromInputs(sim) {

    for (let i = 0; i < 4; i++) {
        //0+ to convert to number

        //UPDATE BUNNIES
        sim.bunnySpeed[i] = parseFloat(bunnyInputs[0 * 4 + i].value());
        sim.bunnySpeedCost[i] = parseFloat(bunnyInputs[1 * 4 + i].value());

        sim.bunnyVision[i] = parseFloat(bunnyInputs[2 * 4 + i].value());
        sim.bunnyVisionCost[i] = parseFloat(bunnyInputs[3 * 4 + i].value());

        sim.bunnyHungerCost[i] = parseFloat(bunnyInputs[4 * 4 + i].value());
        sim.bunnyThirstCost[i] = parseFloat(bunnyInputs[5 * 4 + i].value());

        sim.bunnyHungerFromFood[i] = parseFloat(bunnyInputs[6 * 4 + i].value());
        sim.bunnyThirstFromWater[i] = parseFloat(bunnyInputs[7 * 4 + i].value());

        sim.bunnyMaturityThreshold[i] = parseFloat(bunnyInputs[8 * 4 + i].value());
        sim.bunnyOffspringReadiness[i] = parseFloat(bunnyInputs[9 * 4 + i].value());

        sim.bunnyUrgeThreshold[i] = parseFloat(bunnyInputs[10 * 4 + i].value());
        sim.bunnyReproductionCost[i] = parseFloat(bunnyInputs[11 * 4 + i].value());

        //UPDATE FOXES
        sim.foxSpeed[i] = parseFloat(foxInputs[0 * 4 + i].value());
        sim.foxSpeedCost[i] = parseFloat(foxInputs[1 * 4 + i].value());

        sim.foxVision[i] = parseFloat(foxInputs[2 * 4 + i].value());
        sim.foxVisionCost[i] = parseFloat(foxInputs[3 * 4 + i].value());

        sim.foxHungerCost[i] = parseFloat(foxInputs[4 * 4 + i].value());
        sim.foxThirstCost[i] = parseFloat(foxInputs[5 * 4 + i].value());

        sim.foxHungerFromFood[i] = parseFloat(foxInputs[6 * 4 + i].value());
        sim.foxThirstFromWater[i] = parseFloat(foxInputs[7 * 4 + i].value());

        sim.foxMaturityThreshold[i] = parseFloat(foxInputs[8 * 4 + i].value());
        sim.foxOffspringReadiness[i] = parseFloat(foxInputs[9 * 4 + i].value());

        sim.foxUrgeThreshold[i] = parseFloat(foxInputs[10 * 4 + i].value());
        sim.foxReproductionCost[i] = parseFloat(foxInputs[11 * 4 + i].value());
    }

    sim.carrotCap = carrotCapInput.value();
    sim.carrotSpawnRate = carrotSpawnRateInput.value();
}

function formatScientific(num) {

    if (num == 0) return 0;

    if (num < 0.01) {
        return Number(num).toExponential(3);
    }

    return Math.round(100 * num) / 100;
}