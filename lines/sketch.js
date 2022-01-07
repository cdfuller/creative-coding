const CELL_SIZE = 8;
const MAX_LINE_LENGTH = 20;
const NOISE_VARIATION = 0.17;
let horizontalCellCount, verticalCellCount;

let tOffset = 0.0;
let palette = ["#000000", "#FFFFFF"];
let darkest;

function setup() {
  createCanvas(800, 800);
  horizontalCellCount = width / CELL_SIZE;
  verticalCellCount = width / CELL_SIZE;

  strokeWeight(5);
  strokeCap(ROUND);
  noFill();
  processPalette(palette);
}

function draw() {
  background(darkest);
  drawScreen();

  tOffset += 0.0001;
  // noLoop();
}

function keyPressed() {
  console.log(keyCode);
  if (keyCode == 32) {
    redraw();
  } else if (keyCode == 82) {
    randomPalette();
  }
  // } else {
  //   console.log("keyCode:", keyCode);
  // }

  return false;
}

function drawScreen() {
  let maxLineLength = palette.length;
  let yCellIndex = -maxLineLength;
  let yOffset = 0.0

  while(yCellIndex < verticalCellCount) {
    let startY = yCellIndex * CELL_SIZE;
    let endY = yCellIndex * CELL_SIZE;

    let xCellIndex = -maxLineLength;
    let xOffset = 0.0;
    while(xCellIndex < horizontalCellCount) {
      let r = noise(xOffset, yOffset, tOffset)
      let numOfCells = int(r * maxLineLength);
      stroke(palette[numOfCells]);
      let startX = xCellIndex * CELL_SIZE;
      let endX = startX + (numOfCells * CELL_SIZE);

      line(startX, startY, endX, endY);

      xCellIndex += numOfCells + 1;
      xOffset += NOISE_VARIATION;
    }
    
    yCellIndex += 1;
    yOffset += NOISE_VARIATION;
  }
}

function processPalette(colors) {
  let currentDarkest = {
    color: "",
    lightness: 101,
  }
  for (let c of colors) {
    let cLightness = lightness(c);
    if (cLightness < currentDarkest.lightness) {
      currentDarkest.color = c;
      currentDarkest.lightness = cLightness;
    }
  }
  palette = colors.filter(c => c != currentDarkest.color);
  darkest = currentDarkest.color;
}


var url = "http://localhost:4000/api/v0/palettes/random";

function randomPalette() {
    fetch(url)
    .then(data => data.json())
    .then(res => res.data)
    .then(newPalette => {
        processPalette(newPalette.colors);
        // palette = newPalette.colors;
        console.log("New palette:", newPalette.name, newPalette);
        // redraw();
    })
};