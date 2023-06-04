function draw() {

  switch (scene) {
    case "title":

      titleSim.act();

      //title
      fill(255, 200);
      stroke(0);
      strokeWeight(5);
      rect(275, 105, 800, 150, 50);

      textAlign(CENTER);
      fill(0);
      textSize(80);
      noStroke();
      text("bunny & fox ecosystem", 1350 / 2, 200);

      //new sim button
      if (mouseX > 475 && mouseX < 475 + 400 && mouseY > 300 && mouseY < 300 + 75) {
        fill(180, 200);
      } else {
        fill(255, 200);
      }
      stroke(0);
      strokeWeight(5);
      rect(475, 300, 400, 75, 50);

      fill(0);
      textSize(40);
      noStroke();
      text("new simulation", 1350 / 2, 350);

      //continue last sim button
      if (mouseX > 475 && mouseX < 475 + 400 && mouseY > 400 && mouseY < 400 + 75) {
        fill(180, 200);
      } else {
        fill(255, 200);
      }
      stroke(0);
      strokeWeight(5);
      rect(475, 400, 400, 75, 50);

      fill(0);
      textSize(40);
      noStroke();
      text("load last simulation", 1350 / 2, 450);

      break;

    case "create":
      titleSim.act();

      fill(255, 200);
      stroke(0);
      strokeWeight(5);

      //bunny
      rect(100, 50, 350, 500, 50);

      //foxes
      rect(550, 50, 350, 500, 50);

      //carrots
      rect(950, 50, 350, 150, 50);

      //water
      rect(950, 250, 350, 200, 50);

      //start
      if(mouseX > 950 && mouseX < 950 + 350 && mouseY > 500 && mouseY < 500 + 50) fill(0, 255, 0, 151);
      else fill(0, 255, 0, 100);
      rect(950, 500, 350, 50, 30);

      //all text
      fill(0);
      noStroke();

      //headers
      textSize(40);
      textAlign(CENTER, CENTER);
      text("bunny settings", 100 + 350 / 2, 80);
      text("fox settings", 550 + 350 / 2, 80);
      text("carrot settings", 950 + 350 / 2, 80);
      text("water settings", 950 + 350 / 2, 280);
      text("start simulation", 950 + 350 / 2, 517);

      //inputs
      //HIDE ALL INPUTS, EXCEPT RELEVANT ONES
      for (let i = 0; i < bunnyInputs.length; i++) {
        if (i >= bunnyPage * 8 && i < (bunnyPage + 1) * 8) {
          bunnyInputs[i].removeClass("hidden");
        } else {
          bunnyInputs[i].addClass("hidden");
        }
      }

      for (let i = 0; i < foxInputs.length; i++) {
        if (i >= foxPage * 8 && i < (foxPage + 1) * 8) {
          foxInputs[i].removeClass("hidden");
        } else {
          foxInputs[i].addClass("hidden");
        }
      }
      carrotCapInput.removeClass("hidden");
      carrotSpawnRateInput.removeClass("hidden");

      //bunny inputs 1
      textAlign(LEFT, CENTER);
      textSize(20);
      text(inputLabels[bunnyPage * 2 + 0], 120, 150);
      text("mutation chance:", 120, 190);
      text("mutation variability:      x to       x", 120, 230);


      //bunny inputs 2
      text(inputLabels[bunnyPage * 2 + 1], 120, 350);
      text("mutation chance:", 120, 390);
      text("mutation variability:      x to       x", 120, 430);

      //fox inputs 1
      text(inputLabels[foxPage * 2 + 0], 120 + 450, 150);
      text("mutation chance:", 120 + 450, 190);
      text("mutation variability:      x to       x", 120 + 450, 230);

      //fox inputs 2
      text(inputLabels[foxPage * 2 + 1], 120 + 450, 350);
      text("mutation chance:", 120 + 450, 390);
      text("mutation variability:      x to       x", 120 + 450, 430);


      //carrot inputs
      text("maximum number of carrots:", 980, 125);
      text("frames between carrot spawns:", 980, 160);

      //water input - ???
      text("under construction :(", 980, 350);


      //page numbers
      textAlign(CENTER, CENTER);
      textSize(30);
      text("page " + (bunnyPage + 1) + " of 6", 265, 520);
      text("page " + (foxPage + 1) + " of 6", 715, 520);

      //PAGE BUTTONS
      //BUNNY, RIGHT
      if(mouseX > 340 && mouseX < 340 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0,122);
      else fill(0,51);
      rect(340, 510, 30, 30);

      fill(0);
      triangle(265 + 85, 525 - 10, 265 + 85, 525 + 10, 265 + 85 + 15, 525);

      //BUNNY, LEFT
      if(mouseX > 160 && mouseX < 160 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0,122);
      else fill(0,51);
      rect(160, 510, 30, 30);

      fill(0);
      triangle(180, 525 - 10, 180, 525 + 10, 180 - 15, 525);

      //FOX, RIGHT
      if(mouseX > 790 && mouseX < 790 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0,122);
      else fill(0,51);
      rect(790, 510, 30, 30);

      fill(0);
      triangle(715 + 85, 525 - 10, 715 + 85, 525 + 10, 715 + 85 + 15, 525);

      //FOX, LEFT
      if(mouseX > 610 && mouseX < 610 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0,122);
      else fill(0,51);
      rect(610, 510, 30, 30);

      fill(0);
      triangle(630, 525 - 10, 630, 525 + 10, 630 - 15, 525);


      break;

    case "game":
      sim.act();
      break;
  }
}
