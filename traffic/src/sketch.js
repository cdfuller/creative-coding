console.log("sketch loaded");

// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
const NOISE_SEED = 10003;
const RANDOM_SEED = NOISE_SEED;
const NUM_FRAMES = 5000;
const DEBUG_MODE = false;

let vehicles = [];

function setup() {
  createCanvas(600, 600);
  background(51);
  noiseSeed(NOISE_SEED);
  randomSeed(RANDOM_SEED);

  for (let i = 1; i <= 20; i++) {
    let d = TWO_PI / 20 * i;
    let v = new Vehicle(d);
    vehicles.push(v);
  }
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  ellipse(width / 2, height/2, 450, 450);

  translate(width/2, height/2);
  for ( v of vehicles ) {
    v.update();
    v.draw();
  } 

  if (DEBUG_MODE) {
    if (frameCount % 100 == 0) printStatus();
    if (frameCount == NUM_FRAMES) noLoop();
  }
}

function printStatus() {
}

function keyPressed() {
  switch (key) {
    case 'S':
      loop();
      console.log("Started looping");
      break;
    case ' ':
      noLoop();
      console.log("Stopped looping");
      printStatus();
      break;
    default:
      break;
  }
}
