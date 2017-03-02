var k = 5.0/8.0;
var n = 5;
var d = 8;
var h = 100;

function setup() {
  createCanvas(640, 640);
  colorMode(360, 100, 100);

  n = createSlider(1, 10, n, 0.1);
  d = createSlider(1, 10, d, 0.1);
  h = createSlider(0, 360, h, 1);
}

function draw() {
  background(51);
  translate(width/2, height/2);

  k = n.value() / d.value();

  noFill();
  beginShape();
  stroke(h.value(), 100, 100);
  strokeWeight(0.7);
  for (var a = 0; a < TWO_PI * d.value(); a += 0.01){
    var r = 250 * cos(k*a);
    var x = r * cos(a);
    var y = r * sin(a);
    vertex(x, y);
  }
  endShape();

}