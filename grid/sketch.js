const CELL_COUNT = 20;

let grid = [];
let CELL_SIZE;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  ellipseMode(CENTER);
  CELL_SIZE = width / CELL_COUNT;
  let currentValue = 0;
  
  for (let y = 0; y < CELL_COUNT; y++) {
    grid[y] = [];
    for (let x = 0; x < CELL_COUNT; x++) {
      grid[y][x] = currentValue;
      currentValue = currentValue ? 0 : 1;
    }
    currentValue = currentValue ? 0 : 1;
  }
  console.log(grid);

  addColorInputs();

}

function draw() {
  background(255);

  drawGrid(grid);
  noLoop();
}

function drawGrid(g) {
  for (let y = 0; y < g.length; y++ ){
    let cellY = y * CELL_SIZE;
    for (let x = 0; x < g.length; x++) {
      let cellX = x * CELL_SIZE;
      drawCell(cellX, cellY, g[y][x]);
    }
  }
}

function drawCell(x, y, v) {
  noStroke();
  // rect(x, y, CELL_SIZE, CELL_SIZE);
  let centerX = x + (CELL_SIZE / 2);
  let centerY = y + (CELL_SIZE / 2);
  
  fill(getNextColor());
  // Top triangle
  // line(x, y, centerX, centerY);
  // line(x, y, x + CELL_SIZE, y);
  // line(x + CELL_SIZE, y, centerX, centerY);
  triangle(x, y, centerX, centerY, x + CELL_SIZE, y);
  
  fill(getNextColor());
  // rect(centerX, y, CELL_SIZE/4, CELL_SIZE/4);
  ellipse(centerX, y, CELL_SIZE/4, CELL_SIZE/4);
  // Left triangle
  // line(x, y, centerX, centerY);
  // line(x, y, x, y + CELL_SIZE);
  // line(x, y + CELL_SIZE, centerX, centerY);
  triangle(x, y, centerX, centerY, x, y + CELL_SIZE);
  
  fill(getNextColor());
  // rect(x, centerY, CELL_SIZE/4, CELL_SIZE/4);
  ellipse(x, centerY, CELL_SIZE/4, CELL_SIZE/4);
  // Bottom triangle
  // line(x, y + CELL_SIZE, centerX, centerY);
  // line(x, y + CELL_SIZE, x + CELL_SIZE, y + CELL_SIZE);
  // line(x + CELL_SIZE, y + CELL_SIZE, centerX, centerY);
  triangle(x, y + CELL_SIZE, centerX, centerY, x + CELL_SIZE, y + CELL_SIZE);
  
  fill(getNextColor());
  // Right triangle
  // line(x + CELL_SIZE, y, centerX, centerY);
  // line(x + CELL_SIZE, y, x + CELL_SIZE, y + CELL_SIZE);
  // line(x + CELL_SIZE, y + CELL_SIZE, centerX, centerY);
  triangle(x + CELL_SIZE, y, centerX, centerY, x + CELL_SIZE, y + CELL_SIZE);

}



