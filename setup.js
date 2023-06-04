var sim;
var titleSim;

var scene;

var bunnyInputs;
var bunnyPage;

var foxInputs;
var foxPage;

var carrotCapInput;
var carrotSpawnRateInput;

var inputLabels;

function setup() {

    createCanvas(1350, 600);
    angleMode(DEGREES);
    textFont(loadFont("fonts/VT323/VT323-Regular.ttf"));

    scene = "title";

    bunnyInputs = [];
    bunnyPage = 0;

    for (i = 0; i < 6; i++) {

        //VARIABLES, 1
        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 0].position(375, 140);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 1].position(375, 180);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 2].position(290, 220);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 3].position(375, 220);

        //VARIABLES, 2
        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 4].position(375, 340);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 5].position(375, 380);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 6].position(290, 420);

        bunnyInputs.push(createInput());
        bunnyInputs[i * 8 + 7].position(375, 420);
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
        foxInputs[i * 8 + 0].position(375 + 450, 140);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 1].position(375 + 450, 180);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 2].position(290 + 450, 220);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 3].position(375 + 450, 220);

        //VARIABLES, 2
        foxInputs.push(createInput());
        foxInputs[i * 8 + 4].position(375 + 450, 340);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 5].position(375 + 450, 380);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 6].position(290 + 450, 420);

        foxInputs.push(createInput());
        foxInputs[i * 8 + 7].position(375 + 450, 420);
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
    carrotCapInput.position(1230, 110);
    carrotCapInput.attribute("type", "number");
    carrotCapInput.addClass("textbox");
    carrotCapInput.addClass("hidden");

    carrotSpawnRateInput = createInput();
    carrotSpawnRateInput.position(1230, 150);
    carrotSpawnRateInput.attribute("type", "number");
    carrotSpawnRateInput.addClass("textbox");
    carrotSpawnRateInput.addClass("hidden");


    //LOAD SPRITES
    bunnySprites.push(loadImage("images/bunny.png"));
    bunnySprites.push(loadImage("images/bunny_rainbow.png"));
    bunnySprites.push(loadImage("images/bunny_trans.png"));

    foxSprites.push(loadImage("images/red_fox.png"));

    carrotSprite = loadImage("images/carrot.png");

    waterSprite = loadImage("images/water.png");

    grassSprite = loadImage("images/grass.png");

    //MAKE SIM
    sim = new Ecosystem();

    //PUT DEFAULT SIM VALUES INTO INPUTS
    for(let i = 0; i < 4; i++) {

        //BUNNIES
        bunnyInputs[4*0 + i].value(sim.bunnySpeed[i]);
        bunnyInputs[4*1 + i].value(sim.bunnySpeedCost[i]);

        bunnyInputs[4*2 + i].value(sim.bunnyVision[i]);
        bunnyInputs[4*3 + i].value(sim.bunnyVisionCost[i]);

        bunnyInputs[4*4 + i].value(sim.bunnyHungerCost[i]);
        bunnyInputs[4*5 + i].value(sim.bunnyThirstCost[i]);

        bunnyInputs[4*6 + i].value(sim.bunnyHungerFromFood[i]);
        bunnyInputs[4*7 + i].value(sim.bunnyThirstFromWater[i]);

        bunnyInputs[4*8 + i].value(sim.bunnyMaturityThreshold[i]);
        bunnyInputs[4*9 + i].value(sim.bunnyOffspringReadiness[i]);

        bunnyInputs[4*10 + i].value(sim.bunnyUrgeThreshold[i]);
        bunnyInputs[4*11 + i].value(sim.bunnyReproductionCost[i]);


        //FOXES
        foxInputs[4*0 + i].value(sim.foxSpeed[i]);
        foxInputs[4*1 + i].value(sim.foxSpeedCost[i]);

        foxInputs[4*2 + i].value(sim.foxVision[i]);
        foxInputs[4*3 + i].value(sim.foxVisionCost[i]);

        foxInputs[4*4 + i].value(sim.foxHungerCost[i]);
        foxInputs[4*5 + i].value(sim.foxThirstCost[i]);

        foxInputs[4*6 + i].value(sim.foxHungerFromFood[i]);
        foxInputs[4*7 + i].value(sim.foxThirstFromWater[i]);

        foxInputs[4*8 + i].value(sim.foxMaturityThreshold[i]);
        foxInputs[4*9 + i].value(sim.foxOffspringReadiness[i]);

        foxInputs[4*10 + i].value(sim.foxUrgeThreshold[i]);
        foxInputs[4*11 + i].value(sim.foxReproductionCost[i]);
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

            if (mouseX > 340 && mouseX < 340 + 30 && mouseY > 510 && mouseY < 510 + 30) {
                bunnyPage = Math.min(5, bunnyPage + 1);
            }

            if (mouseX > 160 && mouseX < 160 + 30 && mouseY > 510 && mouseY < 510 + 30) {
                bunnyPage = Math.max(0, bunnyPage - 1);
            }

            if (mouseX > 790 && mouseX < 790 + 30 && mouseY > 510 && mouseY < 510 + 30) {
                foxPage = Math.min(5, foxPage + 1);
            }

            if (mouseX > 610 && mouseX < 610 + 30 && mouseY > 510 && mouseY < 510 + 30) {
                foxPage = Math.max(0, foxPage - 1);
            }

            if(mouseX > 950 && mouseX < 950 + 350 && mouseY > 500 && mouseY < 500 + 50) {
                updateSimFromInputs(sim);
                sim.populate([[300, 300, 150], [900, 300, 150]], sim.carrotCap, 100, 4);

                for(let i = 0; i < bunnyInputs.length; i++) {
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

    for(let i = 0; i < 4; i++) {
        //0+ to convert to number

        //UPDATE BUNNIES
        sim.bunnySpeed[i] = parseFloat(bunnyInputs[0*4 + i].value());
        sim.bunnySpeedCost[i] = parseFloat(bunnyInputs[1*4 + i].value());

        sim.bunnyVision[i] = parseFloat(bunnyInputs[2*4 + i].value());
        sim.bunnyVisionCost[i] = parseFloat(bunnyInputs[3*4 + i].value());

        sim.bunnyHungerCost[i] = parseFloat(bunnyInputs[4*4 + i].value());
        sim.bunnyThirstCost[i] = parseFloat(bunnyInputs[5*4 + i].value());

        sim.bunnyHungerFromFood[i] = parseFloat(bunnyInputs[6*4 + i].value());
        sim.bunnyThirstFromWater[i] = parseFloat(bunnyInputs[7*4 + i].value());

        sim.bunnyMaturityThreshold[i] = parseFloat(bunnyInputs[8*4 + i].value());
        sim.bunnyOffspringReadiness[i] = parseFloat(bunnyInputs[9*4 + i].value());

        sim.bunnyUrgeThreshold[i] = parseFloat(bunnyInputs[10*4 + i].value());
        sim.bunnyReproductionCost[i] = parseFloat(bunnyInputs[11*4 + i].value());

        //UPDATE FOXES
        sim.foxSpeed[i] = parseFloat(foxInputs[0*4 + i].value());
        sim.foxSpeedCost[i] = parseFloat(foxInputs[1*4 + i].value());

        sim.foxVision[i] = parseFloat(foxInputs[2*4 + i].value());
        sim.foxVisionCost[i] = parseFloat(foxInputs[3*4 + i].value());

        sim.foxHungerCost[i] = parseFloat(foxInputs[4*4 + i].value());
        sim.foxThirstCost[i] = parseFloat(foxInputs[5*4 + i].value());

        sim.foxHungerFromFood[i] = parseFloat(foxInputs[6*4 + i].value());
        sim.foxThirstFromWater[i] = parseFloat(foxInputs[7*4 + i].value());

        sim.foxMaturityThreshold[i] = parseFloat(foxInputs[8*4 + i].value());
        sim.foxOffspringReadiness[i] = parseFloat(foxInputs[9*4 + i].value());

        sim.foxUrgeThreshold[i] = parseFloat(foxInputs[10*4 + i].value());
        sim.foxReproductionCost[i] = parseFloat(foxInputs[11*4 + i].value());
    }

    sim.carrotCap = carrotCapInput.value();
    sim.carrotSpawnRate = carrotSpawnRateInput.value();
}