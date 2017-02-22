var c;

function setup() {
  createCanvas(640, 640);
  background(51);
  c = new Circle(200, 25);
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
  this.vel = createVector(0.5, 0.5);
  this.diameter = 100;
  this.radius = this.diameter/2;
  // this.direction = this.vel.copy();
  // this.direction.setMag(this.radius);
  // this.direction.add(this.loc);
}

Circle.prototype.update = function(){
  // this.direction = this.vel.copy();
  // this.direction.setMag(this.radius);
  // this.direction.add(this.loc);
  if (this.loc.x + this.vel.x + this.radius >= width / 2){
    this.vel.rotate(0.01);
    var x = this.loc.x;
    this.loc.add(this.vel);
    this.loc.x = x;
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