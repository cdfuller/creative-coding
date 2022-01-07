const LINE_COUNT = 1000;
const LINE_HEIGHT = 100;

function setup() {
  createCanvas(800, 600);
  background(0);

  // drawRibbon();
}

let a = 0.0;

function draw() {
  background(0);
//  angleTesting(a);
  drawRibbon();
  a += 0.1;
}

function drawRibbon() {
  stroke(255);
  strokeWeight(0.31);

  let centerY = height/2;

  for (let i = 0; i < LINE_COUNT; i++) {
    let x1 = i * (width / LINE_COUNT);
    let y1 = centerY;
    let y2 = sin(i / 100) * LINE_HEIGHT;
    y2 = y2 + centerY;
    let x2 = x1;
    line(x1, y1, x2, y2);
  }
}

function angleTesting(a){
  background(0);
  console.log("angleTesting()");

  stroke(255);
  strokeWeight(5);
 
  let x1 = width/2;
  let y1 = height/2;
  let x2 = x1 + cos(a) * LINE_HEIGHT;
  let y2 = y1 + sin(a) * LINE_HEIGHT;

  fill(255, 0, 0);
  ellipse(x1, y1, 20, 20);
  line(x1, y1, x2, y2);
  console.log(x1, y1, x2, y2);
}
