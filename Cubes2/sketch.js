// let d = 100;
// let s = 20;

let r = 0.0;

function setup() {
  createCanvas(800, 800);
  strokeWeight(4);
  strokeJoin(ROUND);
  strokeCap(ROUND);
  // rectMode(CENTER);
}

function draw() {
  background(255);
  // drawCube(250, 250, 300);
  drawGrid();
  noLoop();
}

function drawGrid() {
  let cubeSize = 40;
  for (let y = 0; y < width; y += cubeSize * 1.2) {
    for (let x = 0; x < height; x += cubeSize) {
      drawCube(x, y, cubeSize); 
    }
  }
}

// Simple
function drawCube(x, y, s) {
  push();
  let d = (s / 10) * 3;
  translate(x, y);
  fill(222, 0, 22, 44);
  rect(0, 0, s, s);
  
  fill(22, 0, 222, 44);
  quad(0, 0, d, -d, s + d, -d, s, 0);
  // line(0, 0, d, -d);
  // line(s, 0, s + d, -d);
  fill(0, 222, 22, 44);
  quad(s, 0, s + d, -d, s + d, s - d, s, s);
  // line(s, s, s + d, s - d);
  // line(d, -d, s + d, -d);
  // line(s + d, -d, s + d, s - d);
  pop();
}
// Chaos
// function drawCube(x, y, s) {
//   push();

//   // d += 1;
//   // s += 1;
//   // d = d % 50;
//   // s = s % 100;
//   // let d = -50;
//   let d = -(s / 5) * 2;
//   // let s = 100;
//   translate(x, y);
//   rotate(r/10);
//   shearX(r*r);
//   shearY(r*r);
//   r += 0.1;
//   fill(222, 0, 22, 44);
//   rect(0, 0, s, s);
  
//   fill(22, 0, 222, 44);
//   quad(0, 0, d, -d, s + d, -d, s, 0);
//   // line(0, 0, d, -d);
//   // line(s, 0, s + d, -d);
//   fill(0, 222, 22, 44);
//   quad(s, 0, s + d, -d, s + d, s - d, s, s);
//   // line(s, s, s + d, s - d);
//   // line(d, -d, s + d, -d);
//   // line(s + d, -d, s + d, s - d);
//   pop();
// }