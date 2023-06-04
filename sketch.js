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
      if (mouseX > 950 && mouseX < 950 + 350 && mouseY > 500 && mouseY < 500 + 50) fill(0, 255, 0, 151);
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

      //BUNNY, NEXT PAGE
      if (mouseX > 340 && mouseX < 340 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0, 122);
      else fill(0, 51);
      rect(340, 510, 30, 30);

      fill(0);
      triangle(265 + 85, 525 - 10, 265 + 85, 525 + 10, 265 + 85 + 15, 525);

      //BUNNY, LAST PAGE
      if (mouseX > 160 && mouseX < 160 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0, 122);
      else fill(0, 51);
      rect(160, 510, 30, 30);

      fill(0);
      triangle(180, 525 - 10, 180, 525 + 10, 180 - 15, 525);

      //FOX, NEXT PAGE
      if (mouseX > 790 && mouseX < 790 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0, 122);
      else fill(0, 51);
      rect(790, 510, 30, 30);

      fill(0);
      triangle(715 + 85, 525 - 10, 715 + 85, 525 + 10, 715 + 85 + 15, 525);

      //FOX, LAST PAGE
      if (mouseX > 610 && mouseX < 610 + 30 && mouseY > 510 && mouseY < 510 + 30) fill(0, 122);
      else fill(0, 51);
      rect(610, 510, 30, 30);

      fill(0);
      triangle(630, 525 - 10, 630, 525 + 10, 630 - 15, 525);


      break;

    case "game":

      sim.act();

      //STATS PAGE BACKGROUND
      fill(255, 200);
      rect(statsX, 0, 300, 600);

      if (showStats) {
        image(closeStatsSprite, statsX + 10, 10, 20, 20);

      } else if (statsX > 1340) {
        if (mouseX > 1290 && mouseX < 1290 + 40 && mouseY > 20 && mouseY < 20 + 40) {
          image(openStatsSprite1, 1290, 20, 40, 40);
        } else {
          image(openStatsSprite0, 1290, 20, 40, 40);
        }
      }

      //STATS HEADER
      textAlign(CENTER, CENTER);
      textSize(40);
      fill(0);
      noStroke();
      text("statistics", statsX + 300 / 2, 50);


      fill(0, 122);
      noStroke();
      //BUNNY ICON BACKGROUND
      if (statsSelect == 0) rect(statsX + 20, 450, 130, 130);
      //FOX ICON BACKGROUND
      else rect(statsX + 150, 450, 130, 130);


      //TITLE UNDERLINE
      stroke(0);
      strokeWeight(5);
      line(statsX + 20, 80, statsX + 280, 80);

      //BUNNY OR FOX DIVIDER
      line(statsX + 20, 450, statsX + 280, 450);
      line(statsX + 150, 450, statsX + 150, 580);

      //END STATS DIVIDER
      line(statsX + 20, 350, statsX + 280, 350);

      image(bunnyIconSprite, statsX + 50, 470);
      image(foxIconSprite, statsX + 175, 470);

      //STARTING STATS HERE:
      textAlign(LEFT, TOP);
      textSize(20);
      noStroke();
      fill(0);
      text("time:", statsX + 20, 100);
      text("population size:", statsX + 20, 120);

      text("avg. " + statsLabels[statsPage * 2 + 0], statsX + 20, 160);
      text("high " + statsLabels[statsPage * 2 + 0], statsX + 20, 180);
      text("low " + statsLabels[statsPage * 2 + 0], statsX + 20, 200);

      text("avg. " + statsLabels[statsPage * 2 + 1], statsX + 20, 240);
      text("high " + statsLabels[statsPage * 2 + 1], statsX + 20, 260);
      text("low " + statsLabels[statsPage * 2 + 1], statsX + 20, 280);


      //ACTUAL STATS
      textAlign(RIGHT, TOP);
      text(Math.floor(sim.frame / 100), statsX + 280, 100);

      let len = (statsSelect == 0) ? sim.bunnies.length : sim.foxes.length;
      text(len, statsX + 280, 120);

      if (len == 0) {
        text("NaN", statsX + 280, 160);
        text("NaN", statsX + 280, 180);
        text("NaN", statsX + 280, 200);

        text("NaN", statsX + 280, 240);
        text("NaN", statsX + 280, 260);
        text("NaN", statsX + 280, 280);
      } else {
        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 0][0]), statsX + 280, 160);
        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 0][1]), statsX + 280, 180);
        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 0][2]), statsX + 280, 200);

        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 1][0]), statsX + 280, 240);
        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 1][1]), statsX + 280, 260);
        text(formatScientific(sim.stats[statsSelect][statsPage * 2 + 1][2]), statsX + 280, 280);
      }

      textAlign(CENTER, CENTER);
      text("press or hold 'SPACE'", statsX + 150, 390);
      text("to spawn " + ((statsSelect == 0) ? "bunny" : "fox"), statsX + 150, 410);

      //STATS PAGE
      textAlign(CENTER, TOP);
      text("page " + (statsPage + 1) + " of 6", statsX + 150, 320);

      if (mouseX > statsX + 196 && mouseX < statsX + 196 + 20 && mouseY > 322 && mouseY < 322 + 20) fill(0, 121);
      else fill(0, 51);
      rect(statsX + 196, 322, 20, 20);

      if (mouseX > statsX + 83 && mouseX < statsX + 83 + 20 && mouseY > 322 && mouseY < 322 + 20) fill(0, 121);
      else fill(0, 51);
      rect(statsX + 83, 322, 20, 20);

      fill(0);
      triangle(statsX + 200, 332 - 8, statsX + 200, 332 + 8, statsX + 200 + 12, 332);
      triangle(statsX + 100, 332 - 8, statsX + 100, 332 + 8, statsX + 100 - 12, 332);

      //UPDATE STATS POSITION
      if (showStats) {
        statsX += 0.3 * (1050 - statsX);
      } else {
        statsX += 0.3 * (1350 - statsX);
      }

      //SPAWN CREATURES

      if (showStats && keys[32]) {

        if (statsSelect == 0 && spawnFrame % 5 == 0) {
          addBunnyToArray(sim.bunnies, sim, random(10, 1190), random(10, 590),
            sim.bunnySpeed[0], sim.bunnySpeedCost[0],
            sim.bunnyVision[0], sim.bunnyVisionCost[0],
            sim.bunnyHungerCost[0], sim.bunnyThirstCost[0],
            sim.bunnyHungerFromFood[0], sim.bunnyThirstFromWater[0],
            sim.bunnyMaturityThreshold[0], sim.bunnyOffspringReadiness[0],
            sim.bunnyUrgeThreshold[0], sim.bunnyReproductionCost[0],
            sim.names[Math.floor(random(0, sim.names.length))], Math.floor(random(0, bunnySprites.length)));
        } else if (spawnFrame % 5 == 0) {
          addFoxToArray(sim.foxes, sim, random(10, 1190), random(10, 590),
            sim.foxSpeed[0], sim.foxSpeedCost[0],
            sim.foxVision[0], sim.foxVisionCost[0],
            sim.foxHungerCost[0], sim.foxThirstCost[0],
            sim.foxHungerFromFood[0], sim.foxThirstFromWater[0],
            sim.foxMaturityThreshold[0], sim.foxOffspringReadiness[0],
            sim.foxUrgeThreshold[0], sim.foxReproductionCost[0],
            sim.names[Math.floor(random(0, sim.names.length))], Math.floor(random(0, foxSprites.length)));
        }

        spawnFrame++;
      } else {
        spawnFrame = 0;
      }

      break;
  }
}
