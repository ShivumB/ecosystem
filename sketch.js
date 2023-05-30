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

var names;

function setup() {

  spriteBunny = loadImage("images/bunny.png");
  spriteFox = loadImage("images/red_fox.png");
  spriteWater = loadImage("images/water.png");

  angleMode(DEGREES);

  water = [];
  water.push(new Water(300, 300, spriteWater));
  water.push(new Water(900, 300, spriteWater));

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

  names = ["Abigal M", "Ahmed A", "Alex Y", "Andy S", "Claire M", "Claire S", "Diego T", "Dilan R", "Elisa J", "Ella F", "Emerson B", "Griffin T", "Hali D", "Hemza D", "Iliana G", "Ivy Q", "Jack P", "Jenna J", "Jenna N", "Jenna Z", "Kamran R", "Karina P", "Kimberly K", "Kiran G", "Laura S", "Lillian B", "Madelaine B", "Marya H", "Neil K", "Nina T", "Noora H", "Prachi S", "Rianna A", "Rishab S", "Samiksha G", "Samita U", "Sarah G", "Shahaan S", "Sarah G", "Shivum B", "Sophia B", "Varun K", "Will R", "Zoe F"];

  bunnies = [];
  for (let i = 0; i < 80; i++) {
    bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10, spriteBunny, names[Math.floor(Math.random()*names.length)], Math.random() * .6 + .7));//CHANGE
  }

  foxes = [];
  for (let i = 0; i < 4; i++) {
    foxes.push(new Fox(Math.random() * 1180 + 10, Math.random() * 580 + 10, spriteFox, names[Math.floor(Math.random()*names.length)]));
  }

  chosenStat = bunnies[0];

  createCanvas(1350, 600);

  grass = loadImage("images/grass.png");
  spriteCarrot = loadImage("images/carrot.png");
}


mouseClicked = function() {
  if(mouseX < 1200) {

    for(let i = 0; i < bunnies.length; i++) {
      if(mouseX > bunnies[i].x - 15 && mouseX < bunnies[i].x + 15 && mouseY > bunnies[i].y - 19 && mouseY < bunnies[i].y + 19) {
        chosenStat = bunnies[i];
      }
    }

    for(let i = 0; i < foxes.length; i++) {
      if(mouseX > foxes[i].x - 20 && mouseX < foxes[i].x + 20 && mouseY > foxes[i].y - 20 && mouseY < foxes[i].y + 20) {
        chosenStat = foxes[i];
      }
    }

  } else {

    if(mouseY > 500) {
      foxes.push(new Fox(Math.random() * 1180 + 10, Math.random() * 580 + 10, spriteFox, names[Math.floor(Math.random()*names.length)] ));
    } else if(mouseY > 400) {
      bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10, spriteBunny, names[Math.floor(Math.random()*names.length)], Math.random() * .6 + .7));//CHANGE
    }

  }
}


function draw() {

  background(100,100,255);

  image(grass, 0, 0);

  //text stats
  if(chosenStat != null) {
    textSize(20);
    textAlign(CENTER);
    text("hunger:" + Math.floor(chosenStat.hunger) + "\nthirst:" + Math.floor(chosenStat.thirst) + "\nmaturity:" + Math.floor(chosenStat.maturity) + "\nurge:" + Math.floor(chosenStat.urge) + "\nbehavior:" + chosenStat.behavior + "\nalive:" + chosenStat.alive + "\nname: " + chosenStat.name, 1275, 100);

    text("bunnies:" + bunnies.length + "\nfoxes:" + foxes.length + "\ntime:" + (Math.floor(frame/100)), 1275, 300);

    stroke(0);
    strokeWeight(3);
    noFill();
    ellipse(chosenStat.x, chosenStat.y, 40, 40);
  }

  line(1200, 400, 1350, 400);

  image(spriteBunny, 1275 - 15, 450 - 19);

  line(1200, 500, 1350, 500);

  image(spriteFox, 1275 - 20, 550 - 20);



  for(let i = 0; i < carrots.length; i++) {
    carrots[i].act(spriteCarrot);
  }

  for (let i = 0; i < water.length; i++) {
    water[i].act();
  }

  for (let i = 0; i < bunnies.length; i++) {
    bunnies[i].act(bunnies, foxes, carrots, water);
  }

  for(let i = 0; i < foxes.length; i++) {
    foxes[i].act(bunnies, foxes, carrots, water);
  }

  for (let i = carrots.length - 1; i >= 0; i--) {
    if (!carrots[i].alive) {
      carrots.splice(i, 1);
    }
  }

  for (let i = bunnies.length - 1; i >= 0; i--) {
    if (!bunnies[i].alive) {
      bunnies.splice(i, 1);
    }
  }

  for(let i = foxes.length - 1; i >= 0; i--) {
    if(!foxes[i].alive) {
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

  frame++;


}
