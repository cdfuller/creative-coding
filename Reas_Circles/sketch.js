var c = [];
var NUMCIRCLES = 10;

function setup() {
  createCanvas(640, 640);
  background(51);
  c = new Circle(200, 299);
  translate(100, 100);
}

function draw() {
  background(51);
  c.draw();
  c.update();
  line(width/2, 0, width/2, height);
  // noLoop();
}

function Circle(x, y){
  this.loc = createVector(x, y);
  this.speed = createVector(2, 2);
  this.vel = this.speed.copy();
  this.diameter = 100;
  this.radius = this.diameter/2;
  this.touching = false;
  // this.direction = this.vel.copy();
  // this.direction.setMag(this.radius);
  // this.direction.add(this.loc);
}

Circle.prototype.update = function(){
  // this.direction = this.vel.copy();
  // this.direction.setMag(this.radius);
  // this.direction.add(this.loc);

  // 
  if (this.loc.x + this.vel.x + this.radius >= width){
    this.vel.rotate(0.01);
    var tempX = this.loc.x;
    this.loc.add(this.vel);
    this.loc.x = tempX;
  } else if (this.loc.x + this.vel.x + this.radius <= this.diameter){
    this.vel.rotate(0.01);
    var tempX = this.loc.x;
    this.loc.add(this.vel);
    this.loc.x = tempX;
  } else if (this.loc.y + this.vel.y + this.radius >= height){
    this.vel.rotate(0.01);
    var tempY = this.loc.y;
    this.loc.add(this.vel);
    this.loc.y = tempY;
  } else if (this.loc.y - this.vel.y + this.radius <= this.diameter){
    this.vel.rotate(0.01);
    var tempY = this.loc.y;
    this.loc.add(this.vel);
    this.loc.y = tempY;
  } else {
    this.loc.add(this.vel);
  }

}


Circle.prototype.draw = function(){
  noFill();
  strokeWeight(0.3);
  stroke(255);
  ellipse(this.loc.x, this.loc.y, this.diameter);
  this.drawArrow();
}

Circle.prototype.drawArrow = function(){
  this.arrow = this.vel.copy();
  this.arrow.setMag(this.diameter / 2);
  this.arrow.add(this.loc);
  line(this.loc.x, this.loc.y, this.arrow.x, this.arrow.y); 
}