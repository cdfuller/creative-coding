let waveHeight = 0.0;
let rotation = 0;

function setup() {
  createCanvas(1000, 1000);
  background(0);
  colorMode(HSB, 360, 100, 100);
  blendMode(EXCLUSION);

  ellipseMode(CORNERS);

  // fill(0);
  noFill();
  stroke(0);
  strokeWeight(0.4);
  render();
}

function draw() {
  // background(0);
  waveHeight += 0.3;
  render();
  rotation += 0.001;
}

function render() {
  const STEP = PI / 2**8;
  let rOffset = 0;
  for(let a = 0; a < TWO_PI; a += STEP) {
    let angle = a + rotation;
    let x1 = cos(angle) * (300 + tan(rOffset) * waveHeight);
    let y1 = sin(angle) * (300 + cos(rOffset + PI/2) * waveHeight);
    let x2 = cos(a) * (300 + tan(rOffset) * waveHeight - 0.3);
    let y2 = sin(a) * (300 + cos(rOffset + PI/2) * waveHeight - 0.3);
    // ellipse(width/2 + x, height/2 + y, 2);
    push();
    let h = degrees(a);
    stroke(h, 100, 100);
    // stroke(255);
    translate(width/2, height/2);
    // line(x1, y1, x2, y2);
    ellipse(x1, y1, x2, y2);
    pop();

    rOffset += 0.1;
  }
}
