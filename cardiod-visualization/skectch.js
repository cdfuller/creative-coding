
let TOTAL_POINTS = 1500;
let FACTOR = 2;

let LINE_WEIGHT = 0.15;

let radius;

function setup() {
  createCanvas(600, 600);

  radius = width / 2;
  frameRate(1);
}

function draw() {
  background(255);
  translate(width/2, height/2);

  // noFill();
  // ellipse(0, 0, radius*2);
  // for (let i = 0; i < TOTAL_POINTS; i++) {
  //   fill(255);
  //   let v = getVector(i);
  //   ellipse(v.x, v.y, 10);
  // }

  for (let i = 0; i < TOTAL_POINTS; i++) {
    let a = getVector(i);
    let b = getVector(i * FACTOR);
    strokeWeight(LINE_WEIGHT);
    line(a.x, b.x, a.y, b.y);
  }

  FACTOR += 1;
  noLoop();
}

function getVector(index) {
  let angle = map(index % TOTAL_POINTS, 0, TOTAL_POINTS, 0, TWO_PI);
  let v = p5.Vector.fromAngle(angle);
  v.mult(radius * 0.8);
  return v;
}

let totalPointsSlider = document.getElementById('total-points-slider');
let totalPointsDisplay = document.getElementById('total-points-display');
let factorSlider = document.getElementById('factor-slider');
let factorDisplay = document.getElementById('factor-display');

totalPointsDisplay.innerHTML = totalPointsSlider.value;
factorDisplay.innerHTML = factorSlider.value;

totalPointsSlider.oninput = function() {
  TOTAL_POINTS = parseInt(this.value);
  totalPointsDisplay.innerHTML = this.value;
  redraw();
}

factorSlider.oninput = function() {
  FACTOR = parseInt(this.value);
  factorDisplay.innerHTML = this.value;
  redraw();
}