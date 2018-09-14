let zSlider;
let inc = 0.01;
let xOff, yOff;
let zOff = 0.0;
let xScale = 0.01;
let yScale = 0.01;

function setup() {
  let canvas = createCanvas(400, 400);
  canvas.parent("canvas");
  pixelDensity(1);
  zSlider = createSlider(0, 3, 0, 0.01);
  zSlider.style('width', '350px');
  zSlider.parent("zSlider");
  xSlider = createSlider(0, 1, 0.1, 0.001);
  xSlider.style('width', '350px');
  xSlider.parent("xSlider");
  ySlider = createSlider(0, 1, 0.1, 0.001);
  ySlider.style('width', '350px');
  ySlider.parent("ySlider");
}

function draw() {
  zOff = zSlider.value();
  xInc = xSlider.value();
  yInc = ySlider.value();
  // zOff += 0.001;
  loadPixels();
  xOff = 0.0;
  for (let x = 0; x < width; x++) {
    yOff = 0.0;
    for (let y = 0; y < height; y++) {
      let i = (x + y * width) * 4;
      let v = noise(xOff, yOff, zOff) * 255;
      pixels[i + 0] = v;
      pixels[i + 1] = v;
      pixels[i + 2] = v;
      pixels[i + 3] = 255;
      yOff += yInc;
    }
    xOff += xInc;
  }
  updatePixels();
}