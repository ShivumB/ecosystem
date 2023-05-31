var bunnies;
var foxes;
var carrots;
var water;

var frame = 0;

var iteration = 0;

var grass;

var spriteCarrot;
var spriteBunny;
var spriteFox;
var spriteWater;

var chosenStat;

var select;
var keys;
//this is for when holding SPACE and spawning animals to prevent accidental spawning
//every 10 frames, if key, spawn
var spawnFrame;

var names;

function setup() {

  spriteBunny = loadImage("images/bunny.png");
  spriteFox = loadImage("images/red_fox.png");
  spriteWater = loadImage("images/water.png");

  angleMode(DEGREES);

  water = [];
  water.push(new Water(300, 300, spriteWater));
  water.push(new Water(900, 300, spriteWater));

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

  names = ["Abigal M", "Ahmed A", "Alex Y", "Andy S", "Claire M", "Claire S", "Diego T", "Dilan R", "Elisa J", "Ella F", "Emerson B", "Griffin T", "Hali D", "Hemza D", "Iliana G", "Ivy Q", "Jack P", "Jenna J", "Jenna N", "Jenna Z", "Kamran R", "Karina P", "Kimberly K", "Kiran G", "Laura S", "Lillian B", "Maddy B", "Marya H", "Neil K", "Nina T", "Noora H", "Prachi S", "Rianna A", "Rishab S", "Samiksha G", "Samita U", "Sarah G", "Shahaan S", "Sarah G", "Shivum B", "Sophia B", "Varun K", "Will R", "Zoe F"];

  bunnies = getItem("BUNNIES");

  if (bunnies == null) {
    bunnies = [];
    for (let i = 0; i < 100; i++) {
      //0.7 - 1.3 speed
      //90 - 110 vision
      bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], Math.random() * .6 + .7, Math.random() * 20 + 90));
    }
  } else {
    for (let i = 0; i < bunnies.length; i++) {

      let temp = new Bunny(-10, -10, "temp", -10);
      temp.r = bunnies[i].r;
      temp.x = bunnies[i].x;
      temp.y = bunnies[i].y;
      temp.velX = bunnies[i].x;
      temp.velY = bunnies[i].y;

      temp.hunger = bunnies[i].hunger;
      temp.thirst = bunnies[i].thirst;

      temp.urge = bunnies[i].urge;
      temp.maturity = bunnies[i].maturity;

      temp.behavior = bunnies[i].behavior;
      temp.frame = bunnies[i].frame;
      temp.name = bunnies[i].name;
      temp.speed = bunnies[i].speed;
      temp.vision = bunnies[i].vision;
      temp.alive = bunnies[i].alive;

      temp.selectedFood = bunnies[i].selectedFood;
      temp.selectedWater = bunnies[i].selectedWater;
      temp.selectedBunny = bunnies[i].selectedBunny;

      bunnies[i] = temp;
    }
  }

  foxes = getItem("FOXES");
  if (foxes == null) {
    foxes = [];
    for (let i = 0; i < 4; i++) {
      //1.3 - 1.9 speed
      //90 - 110 vision
      foxes.push(new Fox(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], 1.3 + Math.random() * .6, Math.random() * 20 + 90));
    }
  } else {
    for (let i = 0; i < foxes.length; i++) {

      let temp = new Fox(-10, -10, "temp", -10);
      temp.r = foxes[i].r;
      temp.x = foxes[i].x;
      temp.y = foxes[i].y;
      temp.velX = foxes[i].x;
      temp.velY = foxes[i].y;

      temp.hunger = foxes[i].hunger;
      temp.thirst = foxes[i].thirst;

      temp.urge = foxes[i].urge;
      temp.maturity = foxes[i].maturity;

      temp.behavior = foxes[i].behavior;
      temp.frame = foxes[i].frame;
      temp.name = foxes[i].name;
      temp.speed = foxes[i].speed;
      temp.vision = foxes[i].vision;
      temp.alive = foxes[i].alive;

      temp.selectedFood = foxes[i].selectedFood;
      temp.selectedWater = foxes[i].selectedWater;
      temp.selectedFox = foxes[i].selectedFox;

      foxes[i] = temp;
    }
  }

  chosenStat = bunnies[0];

  createCanvas(1350, 600);

  grass = loadImage("images/grass.png");
  spriteCarrot = loadImage("images/carrot.png");

  frame = getItem("TIME");

  if (frame == null) frame = 0;

  select = 0;
  keys = [];
  keys[32] = false;
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
      select = 1;
    } else if (mouseY > 500) {
      select = 0;
    }

  }
}


function draw() {

  if (keys[32] && spawnFrame++ % 10 == 0) {
    if (select == 0) {
      bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], Math.random() * .6 + .7, Math.random() * 20 + 90));
    } else {
      foxes.push(new Fox(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], 1.3 + Math.random() * .6, Math.random() * 20 + 90));
    }
  }

  //bakcgeround for buttons
  background(100, 100, 255);

  //background
  image(grass, 0, 0);

  //buttons

  fill(255, 255, 0);
  noStroke();
  if (select == 0) {
    rect(1200, 500, 150, 50);
    fill(0);
    textSize(12);
    text("Press or Hold \'SPACE\'", 1275, 520);
  } else {
    rect(1200, 550, 150, 50);
    fill(0);
    textSize(12);
    text("Press or Hold \'SPACE\'", 1275, 570);
  }

  stroke(0);
  line(1200, 500, 1350, 500);
  image(spriteBunny, 1275 - 15, 540 - 19, 30 * 3 / 5, 38 * 3 / 5);
  line(1200, 550, 1350, 550);
  image(spriteFox, 1275 - 20, 590 - 20, 40 * 3 / 5, 40 * 3 / 5);

  line(1200, 200, 1350, 200);
  noStroke();
  fill(0);
  text("click here to RESET", 1275, 225);
  stroke(0);
  line(1200, 240, 1350, 240);

  let avgBunnySpeed = 0;
  let topBunnySpeed = 0;
  let avgFoxSpeed = 0;
  let topFoxSpeed = 0;

  let avgBunnyVision = 0;
  let topBunnyVision = 0;
  let avgFoxVision = 0;
  let topFoxVision = 0;

  for (let i = 0; i < carrots.length; i++) {
    carrots[i].act(spriteCarrot);
  }

  for (let i = 0; i < water.length; i++) {
    water[i].act();
  }

  for (let i = 0; i < bunnies.length; i++) {
    bunnies[i].act(spriteBunny, bunnies, foxes, carrots, water);
    topBunnySpeed = max(topBunnySpeed, bunnies[i].speed);
    avgBunnySpeed += bunnies[i].speed;

    topBunnyVision = max(topBunnyVision, bunnies[i].vision);
    avgBunnyVision += bunnies[i].vision;
  }

  for (let i = 0; i < foxes.length; i++) {
    foxes[i].act(spriteFox, bunnies, foxes, carrots, water);
    topFoxSpeed = max(topFoxSpeed, foxes[i].speed);
    avgFoxSpeed += foxes[i].speed;

    topFoxVision = max(topFoxVision, foxes[i].vision);
    avgFoxVision += foxes[i].vision;
  }

  for (let i = carrots.length - 1; i >= 0; i--) {
    if (!carrots[i].alive) {
      carrots.splice(i, 1);
    }
  }

  for (let i = bunnies.length - 1; i >= 0; i--) {
    if (!bunnies[i].alive) {
      avgBunnySpeed -= bunnies[i].speed;
      avgBunnyVision -= bunnies[i].vision;
      bunnies.splice(i, 1);
    }
  }

  for (let i = foxes.length - 1; i >= 0; i--) {
    if (!foxes[i].alive) {
      avgFoxSpeed -= foxes[i].speed;
      avgFoxVision -= foxes[i].vision;
      foxes.splice(i, 1);
    }
  }

  //gen new carrots
  if (frame % 500 && carrots.length < 1000) {

    let x = Math.random() * 1180 + 10;
    let y = Math.random() * 580 + 10;

    let passed = true;
    for (let i = 0; i < water.length; i++) {
      let distX = x - water[i].x;
      let distY = y - water[i].y;

      if (distX * distX + distY * distY < Math.pow(15 + water[i].r, 2)) {
        passed = false;
      }
    }

    if (passed) carrots.push(new Carrot(x, y));;

  }

  //show stats
  if (chosenStat != null) {
    textSize(18);
    textAlign(CENTER);

    if (chosenStat.alive) {
      fill(0);
    } else {
      fill(255, 0, 0);
    }
    text("speed:" + Math.round(chosenStat.speed * 100) / 100 + "\nvision:" + Math.round(chosenStat.vision * 100) / 100 + "\nhunger:" + Math.floor(chosenStat.hunger) + "\nthirst:" + Math.floor(chosenStat.thirst) + "\nmaturity:" + Math.floor(chosenStat.maturity) + "\nurge:" + Math.floor(chosenStat.urge) + "\nbehavior:" + chosenStat.behavior + "\nname: " + chosenStat.name, 1275, 20);

    fill(0);
    text("bunnies:" + bunnies.length
      + "\navg. speed:" + Math.round(100 * avgBunnySpeed / bunnies.length) / 100
      + "\ntop speed:" + Math.round(100 * topBunnySpeed) / 100
      + "\navg. vision:" + Math.round(100 * avgBunnyVision / bunnies.length) / 100
      + "\ntop vision:" + Math.round(100 * topBunnyVision) / 100
      + "\nfoxes:" + foxes.length
      + "\navg. speed:" + Math.round(100 * avgFoxSpeed / foxes.length) / 100
      + "\ntop speed:" + Math.round(100 * topFoxSpeed) / 100
      + "\navg.vision:" + Math.round(100 * avgFoxVision / foxes.length) / 100
      + "\ntop vision:" + Math.round(100 * topFoxVision) / 100
      + "\ntime:" + (Math.floor(frame / 100)), 1275, 258);

    stroke(0);
    strokeWeight(3);
    noFill();
    ellipse(chosenStat.x, chosenStat.y, 40, 40);
  }

  if (frame % 1000 == 0) {
    storeItem("BUNNIES", bunnies);
    storeItem("FOXES", foxes);
    storeItem("CARROTS", carrots);
    storeItem("TIME", frame);
  }

  frame++;


}
