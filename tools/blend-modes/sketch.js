let MODES;
let selectedBlendMode;
let checkboxBackground;
let sliderBackground;

function setup() {
  createCanvas(650, 400);
  MODES = {
    "BLEND": BLEND,
    "REMOVE": REMOVE,
    "DARKEST": DARKEST,
    "LIGHTEST": LIGHTEST,
    "DIFFERENCE": DIFFERENCE,
    "MULTIPLY": MULTIPLY,
    "EXCLUSION": EXCLUSION,
    "SCREEN": SCREEN,
    "REPLACE": REPLACE,
    "OVERLAY": OVERLAY,
    "HARD_LIGHT": HARD_LIGHT,
    "SOFT_LIGHT": SOFT_LIGHT,
    "DODGE": DODGE,
    "BURN": BURN,
    "ADD": ADD,
    "SUBTRACT": SUBTRACT,
    }

  selectedBlendMode = createSelect();

  Object.keys(MODES).forEach(mode => selectedBlendMode.option(mode))

  selectedBlendMode.changed((event) => {
    console.log(event.target.value);
    blendMode(MODES[event.target.value])
  })

  checkboxBackground = createCheckbox('Show background', true);
  checkboxBackground.changed(event => {
    console.log("Show background: ", event.srcElement.checked);
  })

  sliderBackground = createSlider(0, 255, 220, 1);

  sliderBackground.changed(event => {
    console.log(event.target.value);
  })
}

function draw() {
  clear();
  if (checkboxBackground.checked()) {
    background(sliderBackground.value());
  }

  push();
  translate(width/4, height/2);
  drawVennRGB();
  pop();
  
  push();
  translate(width/4 * 3, height/2);
  drawVennCMY();
}

function drawVennRGB() {
  let diameter = 200;
  let distance = diameter/4;
  let [x1, y1] = [0, -distance];
  let [x2, y2] = [distance, distance]
  let [x3, y3] = [-distance, distance]

  noStroke();

  // top
  fill(255, 0, 0);
  ellipse(x1, y1, diameter);

  // right
  fill(0, 255, 0);
  ellipse(x2, y2, diameter);

  // left
  fill(0, 0, 255);
  ellipse(x3, y3, diameter);
}

function drawVennCMY() {
  let diameter = 200;
  let distance = diameter/4;
  let [x1, y1] = [0, -distance];
  let [x2, y2] = [distance, distance]
  let [x3, y3] = [-distance, distance]

  noStroke();

  // top
  fill(0, 255, 255);
  ellipse(x1, y1, diameter);

  // right
  fill(255, 0, 255);
  ellipse(x2, y2, diameter);

  // left
  fill(255, 255, 0);
  ellipse(x3, y3, diameter);
}
