var bunnies;
var carrots;
var water;

var frame = 0;

var iteration = 0;

function Bunny(x, y) {
  
  this.x = x;
  this.y = y;
  
  this.hunger = 0;
  this.selectedFood = -1;
  
  this.thirst = 0;
  this.selectedWater = -1;
  
  this.theta = 0;
  
  this.urge = 0;
  
  this.vision = 100;
  
  this.frame = 0;

}

Bunny.prototype.findFood = function(carrots) {
  
  this.selectedFood = -1;
  let minDist = 1000000;
  
  for(let i = 0; i < carrots.length; i++) {
    
    if(carrots[i].alive && Math.abs(carrots[i].x - this.x) < this.vision && Math.abs(carrots[i].y - this.y) < this.vision) { 
      
      let distX = carrots[i].x - this.x;
      let distY = carrots[i].y - this.y;
      
      if(distX * distX + distY * distY < minDist) {
        minDist = distX * distX + distY * distY;
        this.selectedFood = i;
      }  
    }
    
  }
  
  if(this.selectedFood >= 0) {
    
    let xDist = (carrots[this.selectedFood].x - this.x);
    let yDist = (carrots[this.selectedFood].y - this.y);
    let mag = Math.sqrt(xDist*xDist + yDist*yDist);
    
    this.x += 1 * (carrots[this.selectedFood].x - this.x) / mag;
    this.y += 1 * (carrots[this.selectedFood].y - this.y) / mag;
    
  }
  
  if(this.selectedFood >= 0 && Math.abs(carrots[this.selectedFood].x - this.x) < 30 && Math.abs(carrots[this.selectedFood].y - this.y) < 30) {
    carrots[this.selectedFood].alive = false;
    this.hunger -= 100;
  }
}

Bunny.prototype.findWater = function(water) {
  
  this.selectedWater = -1;
  let minDist = 1000000;
  
  for(let i = 0; i < water.length; i++) {
    
    if(Math.abs(water[i].x - this.x) < this.vision && Math.abs(water[i].y - this.y) < this.vision) { 
      
      let distX = water[i].x - this.x;
      let distY = water[i].y - this.y;
      
      if(distX * distX + distY * distY < minDist) {
        minDist = distX * distX + distY * distY;
        this.selectedWater = i;
      }  
    }
    
  }
  
  
  if(this.selectedWater >= 0 && Math.abs(water[this.selectedWater].x - this.x) < 15 + water[this.selectedWater].r && Math.abs(water[this.selectedWater].y - this.y) < 15 + water[this.selectedWater].r) {
    
    this.thirst -= 1;
    
  } else if(this.selectedWater >= 0) {
    
    let xDist = (water[this.selectedWater].x - this.x);
    let yDist = (water[this.selectedWater].y - this.y);
    let mag = Math.sqrt(xDist*xDist + yDist*yDist);
    
    this.x += 1 * (water[this.selectedWater].x - this.x) / mag;
    this.y += 1 * (water[this.selectedWater].y - this.y) / mag;
    
  }
  
}

Bunny.prototype.reproduce = function(bunnies) {
  
}

Bunny.prototype.act = function(carrots, water) {
  
  console.log(this.hunger + ", " + this.thirst);
  
  if(this.hunger >= this.thirst) {
    this.findFood(carrots);
    
  } else if(this.thirst > this.hunger) {
    this.findWater(water);
  }
  
  
  if(this.foundFood == -1 && this.selectedWater == -1) {
    
    console.log("what!");
    
    if(this.frame == 10) {
      this.theta += Math.random()*360;
    } else if(this.frame > 10) {
      this.x += Math.cos(this.theta);
      this.y += Math.cos(this.theta);
    }
    
  }
  
  this.reproduce(bunnies);
  
  
  fill(255, 255, 0);
  ellipse(this.x, this.y, 30, 30);
  
  this.hunger += 2;
  this.thirst += 0.5;
  
  this.frame++;
  this.frame %= 20;
  
}

function Carrot(x, y) {
  
  this.x = x;
  this.y = y;
  
  this.alive = true;
}

Carrot.prototype.act = function() {
  
  if(this.alive) {
    fill(0, 9, 0);
    ellipse(this.x, this.y, 30, 30);
  }

}

function Water(x, y) {
  this.x = x;
  this.y = y;
  
  this.r = 150;
}

Water.prototype.act = function() {
  
  fill(0, 255, 255);
  ellipse(this.x, this.x, 2*this.r, 2*this.r);
  
}

function setup() {

  angleMode(DEGREES);
  
  carrots = [];
  for(let i = 0; i < 100; i++) {
    carrots.push(new Carrot(Math.random()*1180 + 10, Math.random()*580 + 10));
  }
  
  water = [];
  water.push(new Water(300, 300));
  water.push(new Water(900, 300));

  bunnies = [];
  for(let i = 0; i < 10; i++) {
    bunnies.push(new Bunny(Math.random()*1180 + 10, Math.random()*580 + 10));
  }
  
  createCanvas(1200, 600);
  
}

function draw() {
    
  background(100, 255, 100);
    
  for(let i = 0; i < carrots.length; i++) {
    carrots[i].act();
  }
  
  for(let i = 0; i < water.length; i++) {
    water[i].act();
  }

  for(let i = 0; i < bunnies.length; i++) {
    bunnies[i].act(carrots, water);
  }
  
  
}
