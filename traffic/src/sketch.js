// Factors of  1200:
// 1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 16, 20, 24, 25, 30, 40, 48, 50, 60, 75, 80, 100, 120, 150, 200, 240, 300, 400, 600, 1200
//
const NOISE_SEED = 10003;
const RANDOM_SEED = NOISE_SEED;
const NUM_FRAMES = 5000;
const DEBUG_MODE = false;

const VEHICLE_COUNT = 50;

let vehicles = [];
let canvas;

let averages = [];

function setup() {
  canvas = createCanvas(800, 800);
  background(51);
  noiseSeed(NOISE_SEED);
  randomSeed(RANDOM_SEED);

  for (let i = 0; i < VEHICLE_COUNT; i++) {
    let d = 1000 / VEHICLE_COUNT * i;
    let v = new Vehicle(d, i);
    vehicles.push(v);
  }

  for (let i = 0; i < vehicles.length; i++) {
    vehicles[i].next = vehicles[(i + 1) % vehicles.length];
  }
}

function draw() {
  background(51);

  stroke(255);
  noFill();
  ellipse(width / 2, height/2, 350, 350);

  let states = [];
  for (let v of vehicles ) {
    v.update();
    states.push(v.getState());
  }

  push();
  translate(width/2, height/2);
  drawCircle(states);
  pop();
  drawGraph(states);

  if (DEBUG_MODE) {
    if (frameCount % 100 == 0) printStatus();
    if (frameCount == NUM_FRAMES) noLoop();
  }
  if (frameCount % 10 == 0) {
    logAvg(averages);
  }
}

function drawCircle(states) {
  strokeWeight(1);
  let r = 175;
  for (p of states) {
    let theta = translateCirclePosition(p.position);
    let x = cos(theta) * r;
    let y = sin(theta) * r;
    ellipse(x, y, 6);
    let pShort = p.position.toFixed(2);
    // text(`${pShort}`, x + 25, y + 25);
  }
}

function translateCirclePosition(position) {
  return position / 1000 * TWO_PI;
}

function drawGraph(states) {
  let scale = 20;
  strokeWeight(1);
  let total = 0;
  for (let p of states) {
    total += p.speed;
    let x = translateGraphPosition(p.position);
    let h = p.speed * scale;
    line(x, height-10, x, height - 10 - h);
  }
  let avg = total / states.length;
  let h = avg * scale;
  strokeWeight(0.3);
  line(0, height-10-h, width, height-10-h);
  insertAvg(avg);
  // console.log("Average: ", avg);
}

  // function drawConnectingLines(states) {
  //   for (let s = 0; s < states.length; s++) {
  //     let theta = translateCirclePosition(s.position);
  //     let x = cos(theta) * r;
  //     let x = cos(theta) * r;
  //   }
  // }

function translateGraphPosition(position) {
  return position / 1000 * width;
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


function insertAvg(v) {
  if (averages.length >= 500) {
    averages.shift();
  }
  averages.push(v);
}

function logAvg() {
  let total = 0;
  for(let a of averages) {
    total += a;
  }
  let avg = total / averages.length;
  console.log(`Average(${averages.length}): ${avg.toFixed(3)}`)
}

