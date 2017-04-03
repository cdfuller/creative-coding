// Daniel Shiffman
// http://codingrainbow.com
// http://patreon.com/codingrainbow
// Code for: https://youtu.be/YcdldZ1E9gU

var inc = 0.07;


var zOff = 0;
var zInc = 0.001;
var vMag = 0.5;
var scl = 5;
var cols, rows;

var fr;

var particles_a = [];
var particles_b = [];
var particles_c = [];

var flowField = [];

function setup() {
  // createCanvas(1920, 1080);
  createCanvas(640, 640);
  background(255);
  cols = floor(width / scl);
  rows = floor(height / scl);
  strokeWeight(1);	

  flowField = new Array(cols * rows);

  var color_a = color(0, 102, 255, 10);
  var color_b = color(215, 34, 235, 10);
  var color_c = color(0, 0, 0, 3);

  for (var i = 0; i < 200; i++){

  	particles_a[i] = new Particle(width * 0.25, height * 0.25, color_a);
  }
for (var i = 0; i < 200; i++){
  	particles_b[i] = new Particle(width * 0.75, height * 0.75, color_b);
  }

for (var i = 0; i < 500; i++){
  	particles_c[i] = new Particle(width * 0.5, height * 0.5, color_c);
  }  

}

function draw() {
  var yOff = 0;
  for (var y = 0; y < rows; y++){
  	var xOff = 0;
  	for (var x = 0; x < cols; x++){
    	var index = (x + y * cols);
    	var angle = noise(xOff, yOff, zOff) * TWO_PI * 4;
    	var v = p5.Vector.fromAngle(angle);
    	v.setMag(vMag);
    	flowField[index] = v;

  		// stroke(0, 50);
  		// strokeWeight(1);

  		// push();
  		// translate(x * scl, y * scl);
  		// rotate(v.heading());
  		// line(0, 0, scl, 0);
  		// pop();


    	xOff += inc;
    }
	yOff += inc;
  }

  for (var i = 0; i < particles_a.length; i++){
  	p = particles_a[i]
  	p.follow(flowField);
  	p.update();
  	p.show();
  }
for (var i = 0; i < particles_b.length; i++){
  	p = particles_b[i]
  	p.follow(flowField);
  	p.update();
  	p.show();
  }

for (var i = 0; i < particles_c.length; i++){
  	p = particles_c[i]
  	p.follow(flowField);
  	p.update();
  	p.show();
  }


  // noLoop();
  zOff += zInc;
  // if(zOff > 5){
  // 	zOff = 0;
  // }
}

function mousePressed(){
	// saveFrames("out", "png", 15, 30);
	// saveCanvas("output", "png");
}