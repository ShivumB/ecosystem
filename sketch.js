function draw() {

  background(100, 100, 255);

  //background
  image(grassSprite, 0, 0);

  //buttons
  fill(255, 255, 0);
  noStroke();
  if (selectedSpawnButton == 0) {
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

  //animal pictures on buttons
  stroke(0);
  strokeWeight(3);
  line(1200, 500, 1350, 500);
  image(bunnySprites[0], 1275 - 15, 540 - 19, 30 * 3 / 5, 38 * 3 / 5);
  line(1200, 550, 1350, 550);
  image(foxSprites[0], 1275 - 20, 590 - 20, 40 * 3 / 5, 40 * 3 / 5);

  //reset button
  line(1200, 200, 1350, 200);
  noStroke();
  fill(0);
  text("click here to RESET", 1275, 225);
  stroke(0);
  line(1200, 240, 1350, 240);

  //show stats
  if (chosenStat != null) {
    textSize(18);
    textAlign(CENTER);
    fill(0);
    noStroke();

    text("speed:" + Math.round(chosenStat.speed * 100) / 100
    + "\nvision:" + Math.round(chosenStat.vision * 100) / 100
    + "\nhunger:" + Math.floor(chosenStat.hunger)
    + "\nthirst:" + Math.floor(chosenStat.thirst)
    + "\nmaturity:" + Math.floor(chosenStat.maturity)
    + "\nurge:" + Math.floor(chosenStat.urge)
    + "\nbehavior:" + chosenStat.behavior
    + "\nname: " + chosenStat.name, 1275, 20);

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

  //Main drawing
  avgBunnySpeed = 0;
  topBunnySpeed = 0;
  avgBunnyVision = 0;
  topBunnyVision = 0;

  avgFoxSpeed = 0;
  topFoxSpeed = 0;
  avgFoxVision = 0;
  topFoxVision = 0;

  for (let i = 0; i < carrots.length; i++) {
    carrots[i].act(carrotSprite);
  }

  for (let i = 0; i < water.length; i++) {
    water[i].act(waterSprite);
  }

  for (let i = 0; i < bunnies.length; i++) {
    bunnies[i].act(bunnySprites, bunnies, foxes, carrots, water);
    topBunnySpeed = max(topBunnySpeed, bunnies[i].speed);
    avgBunnySpeed += bunnies[i].speed;

    topBunnyVision = max(topBunnyVision, bunnies[i].vision);
    avgBunnyVision += bunnies[i].vision;
  }

  for (let i = 0; i < foxes.length; i++) {
    foxes[i].act(foxSprites, bunnies, foxes, carrots, water);
    topFoxSpeed = max(topFoxSpeed, foxes[i].speed);
    avgFoxSpeed += foxes[i].speed;

    topFoxVision = max(topFoxVision, foxes[i].vision);
    avgFoxVision += foxes[i].vision;
  }

  //delete elements
  for (let i = carrots.length - 1; i >= 0; i--) {
    if (!carrots[i].alive) carrots.splice(i, 1);
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
  if (carrots.length < 1000) {

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

  //gen new bunnies
  if (keys[32] && spawnFrame++ % 10 == 0) {
    if (selectedSpawnButton == 0) {

      let r = Math.random();

      let spriteIndex = 0;

      if (r < 0.6) spriteIndex = 0;
      else if (r < 0.7) spriteIndex = 1;
      else if (r < 0.8) spriteIndex = 2;
      else if (r < 0.9) spriteIndex = 3;
      else spriteIndex = 4;

      bunnies.push(new Bunny(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], 0.9 + 0.2 * Math.random(), 120 + 20 * Math.random(), spriteIndex));
    } else {
      foxes.push(new Fox(Math.random() * 1180 + 10, Math.random() * 580 + 10, names[Math.floor(Math.random() * names.length)], 1.2 + 0.2 * Math.random(), 90 + 20 * Math.random(), 0));
    }
  }

  //autosave
  if (frame % 1000 == 0) {
    storeItem("BUNNIES", bunnies);
    storeItem("FOXES", foxes);
    storeItem("CARROTS", carrots);
    storeItem("TIME", frame);
  }

  frame++;
}
